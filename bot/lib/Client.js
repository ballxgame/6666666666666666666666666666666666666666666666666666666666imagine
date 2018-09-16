"use strict";

const CategoryChannel = require("./structures/CategoryChannel"),
	  Collection = require("./util/Collection"),
	  Constants = require("./Constants"),
	  Endpoints = require("./rest/Endpoints"),
	  ExtendedUser = require("./structures/ExtendedUser"),
	  GroupChannel = require("./structures/GroupChannel"),
	  Guild = require("./structures/Guild"),
	  GuildAuditLogEntry = require("./structures/GuildAuditLogEntry"),
	  GuildIntegration = require("./structures/GuildIntegration"),
	  Invite = require("./structures/Invite"),
	  Member = require("./structures/Member"),
	  Message = require("./structures/Message"),
	  PrivateChannel = require("./structures/PrivateChannel"),
	  Relationship = require("./structures/Relationship"),
	  RequestHandler = require("./rest/RequestHandler"),
	  Role = require("./structures/Role"),
	  ShardManager = require("./gateway/ShardManager"),
	  TextChannel = require("./structures/TextChannel"),
	  UnavailableGuild = require("./structures/UnavailableGuild"),
	  User = require("./structures/User"),
	  VoiceChannel = require("./structures/VoiceChannel"),
	  VoiceConnectionManager = require("./voice/VoiceConnectionManager");

var EventEmitter;
try {
	EventEmitter = require("eventemitter3");
} catch (err) {
	EventEmitter = require("events").EventEmitter;
}
var Erlpack;
try {
	Erlpack = require("erlpack");
} catch (e) {}

class Client extends EventEmitter {
	constructor(token, options) {
		super();
		this.options = {
			autoreconnect: true,
			compress: false,
			connectionTimeout: 30000,
			defaultImageFormat: "jpg",
			defaultImageSize: 128,
			disableEvents: {},
			disableEveryone: true,
			firstShardID: 0,
			getAllUsers: false,
			guildCreateTimeout: 2000,
			largeThreshold: 250,
			latencyThreshold: 30000,
			maxShards: 1,
			messageLimit: 100,
			opusOnly: false,
			ratelimiterOffset: 0,
			restMode: false,
			seedVoiceConnections: false,
			ws: {}
		};
		if (typeof options === "object") {
			for (var property of Object.keys(options)) {
				this.options[property] = options[property];
			}
		}
		if (this.options.lastShardID === undefined && this.options.maxShards !== "auto") {
			this.options.lastShardID = this.options.maxShards - 1;
		}
		if (typeof window !== "undefined") {
			this.options.compress = false; // zlib does not like Blobs, Pako is not here
		}
		if (!~Constants.ImageFormats.indexOf(this.options.defaultImageFormat.toLowerCase())) {
			throw new TypeError("Invalid default image format: " + this.options.defaultImageFormat);
		}
		var defaultImageSize = this.options.defaultImageSize;
		if (defaultImageSize < 16 || defaultImageSize > 1024 || (defaultImageSize & (defaultImageSize - 1))) {
			throw new TypeError("Invalid default image size: " + defaultImageSize);
		}
		this.token = token;
		this.requestHandler = new RequestHandler(this);
		this.ready = false;
		this.bot = this.options.restMode && this.token ? this.token.startsWith("Bot ") : true;
		this.startTime = 0;
		this.lastConnect = 0;
		this.channelGuildMap = {};
		this.shards = new ShardManager(this);
		this.groupChannels = new Collection(GroupChannel);
		this.guilds = new Collection(Guild);
		this.privateChannelMap = {};
		this.privateChannels = new Collection(PrivateChannel);
		this.guildShardMap = {};
		this.unavailableGuilds = new Collection(UnavailableGuild);
		this.relationships = new Collection(Relationship);
		this.users = new Collection(User);
		this.presence = {
			game: null,
			status: "offline"
		};
		this.userGuildSettings = [];
		this.userSettings = {};
		this.notes = {};
		this.voiceConnections = new VoiceConnectionManager();
	}
	get uptime() {
		return this.startTime ? Date.now() - this.startTime : 0;
	}
	connect() {
		const gatewayPromise = this.options.maxShards === "auto" ? this.getBotGateway() : this.getGateway();
		return gatewayPromise.then((data) => {
			if (!data.url || (this.options.maxShards === "auto" && !data.shards)) {
				return Promise.reject(new Error("Invalid response from gateway REST call"));
			}
			if (data.url.includes("?")) {
				data.url = data.url.substring(0, data.url.indexOf("?"));
			}
			if (!data.url.endsWith("/")) {
				data.url += "/";
			}
			this.gatewayURL = data.url + "?v=" + Constants.GATEWAY_VERSION + "&encoding=" + (Erlpack ? "etf" : "json");
			if (this.options.compress) {
				this.gatewayURL += "&compress=zlib-stream";
			}
			if (this.options.maxShards === "auto") {
				if (!data.shards) {
					return Promise.reject(new Error("Failed to autoshard due to lack of data from Discord."));
				}
				this.options.maxShards = data.shards;
				if (this.options.lastShardID === undefined) {
					this.options.lastShardID = data.shards - 1;
				}
			}
			for (var i = this.options.firstShardID; i <= this.options.lastShardID; ++i) {
				this.shards.spawn(i);
			}
		}).catch((err) => {
			if (!this.options.autoreconnect) {
				return Promise.reject(err);
			}
			this.emit("error", err);
			return new Promise((res, rej) => {
				setTimeout(() => this.connect().then(res).catch(rej), 2000);
			});
		});
	}
	getGateway() {
		return this.requestHandler.request("GET", Endpoints.GATEWAY);
	}
	getBotGateway() {
		if (!this.token.startsWith("Bot ")) {
			this.token = "Bot " + this.token;
		}
		return this.requestHandler.request("GET", Endpoints.GATEWAY_BOT, true);
	}
	disconnect(options) {
		this.ready = false;
		this.shards.forEach((shard) => {
			shard.disconnect(options);
		});
		this.shards.connectQueue = [];
	}
	joinVoiceChannel(channelID, options) {
		var channel = this.getChannel(channelID);
		if (!channel) {
			return Promise.reject(new Error("Channel not found"));
		}
		if (channel.guild && !(channel.permissionsOf(this.user.id).allow & Constants.Permissions.voiceConnect)) {
			return Promise.reject(new Error("Insufficient permission to connect to voice channel"));
		}
		this.shards.get(this.guildShardMap[this.channelGuildMap[channelID]] || 0).sendWS(Constants.GatewayOPCodes.VOICE_STATE_UPDATE, {
			guild_id: this.channelGuildMap[channelID] || null,
			channel_id: channelID || null,
			self_mute: false,
			self_deaf: false
		});
		options = options || {};
		if (options.opusOnly === undefined) {
			options.opusOnly = this.options.opusOnly;
		}
		return this.voiceConnections.join(this.channelGuildMap[channelID] || "call", channelID, options);
	}
	leaveVoiceChannel(channelID) {
		if (!channelID) {
			return;
		}
		if (!this.channelGuildMap[channelID]) {
			return;
		}
		this.closeVoiceConnection(this.channelGuildMap[channelID]);
	}
	closeVoiceConnection(guildID) {
		this.shards.get(this.guildShardMap[guildID] || 0).sendWS(Constants.GatewayOPCodes.VOICE_STATE_UPDATE, {
			guild_id: guildID || null,
			channel_id: null,
			self_mute: false,
			self_deaf: false
		});
		this.voiceConnections.leave(guildID || "call");
	}
	editAFK(afk) {
		this.presence.afk = !!afk;
		this.shards.forEach((shard) => {
			shard.editAFK(afk);
		});
	}
	editStatus(status, game) {
		if (game === undefined && typeof status === "object") {
			game = status;
			status = undefined;
		}
		if (status) {
			this.presence.status = status;
		}
		if (game !== undefined) {
			this.presence.game = game;
		}
		this.shards.forEach((shard) => {
			shard.editStatus(status, game);
		});
	}
	editGame(game) {
		if (game !== undefined) {
			this.presence.game = game;
		}
		this.shards.forEach((shard) => {
			shard.editGame(game);
		});
	}
	getChannel(channelID) {
		if (!channelID) {
			throw new Error(`Invalid channel ID: ${channelID}`);
		}
		if (this.channelGuildMap[channelID] && this.guilds.get(this.channelGuildMap[channelID])) {
			return this.guilds.get(this.channelGuildMap[channelID]).channels.get(channelID);
		}
		return this.privateChannels.get(channelID) || this.groupChannels.get(channelID);
	}
	createChannel(guildID, name, type, reason, parentID) {
		var guild = this.guilds.get(guildID);
		return this.requestHandler.request("POST", Endpoints.GUILD_CHANNELS(guildID), true, {
			name,
			type,
			reason,
			parent_id: parentID
		}).then((channel) => {
			if (channel.type === 0) {
				return new TextChannel(channel, guild);
			} else if (channel.type === 2) {
				return new VoiceChannel(channel, guild);
			} else if (channel.type === 4) {
				return new CategoryChannel(channel, guild);
			} else {
				return channel;
			}
		});
	}
	editChannel(channelID, options, reason) {
		return this.requestHandler.request("PATCH", Endpoints.CHANNEL(channelID), true, {
			name: options.name,
			icon: options.icon,
			owner_id: options.ownerID,
			topic: options.topic,
			nsfw: options.nsfw,
			bitrate: options.bitrate,
			user_limit: options.userLimit,
			parent_id: options.parentID,
			reason: reason
		}).then((data) => {
			if (!data.type || data.type === 2 || data.type === 4) {
				var guild = this.channelGuildMap[channelID];
				if (guild) {
					guild = this.guilds.get(guild);
				}
				if (data.type === 0) {
					return new TextChannel(data, guild);
				} else if (data.type === 2) {
					return new VoiceChannel(data, guild);
				} else if (data.type === 4) {
					return new CategoryChannel(data, guild);
				} else {
					return data;
				}
			} else {
				return new GroupChannel(data, this);
			}
		});
	}
	editChannelPosition(channelID, position) {
		var channels = this.guilds.get(this.channelGuildMap[channelID]).channels;
		var channel = channels.get(channelID);
		if (!channel) {
			return Promise.reject(new Error(`Channel ${channelID} not found`));
		}
		if (channel.position === position) {
			return Promise.resolve();
		}
		var min = Math.min(position, channel.position);
		var max = Math.max(position, channel.position);
		channels = channels.filter((chan) => chan.type === channel.type && chan.parentID === channel.parentID && min <= chan.position && chan.position <= max && chan.id !== channelID).sort((a, b) => a.position - b.position);
		if (position > channel.position) {
			channels.push(channel);
		} else {
			channels.unshift(channel);
		}
		return this.requestHandler.request("PATCH", Endpoints.GUILD_CHANNELS(this.channelGuildMap[channelID]), true, channels.map((channel, index) => ({
			id: channel.id,
			position: index + min
		})));
	}
	deleteChannel(channelID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.CHANNEL(channelID), true, {
			reason
		});
	}
	sendChannelTyping(channelID) {
		return this.requestHandler.request("POST", Endpoints.CHANNEL_TYPING(channelID), true);
	}
	editChannelPermission(channelID, overwriteID, allow, deny, type, reason) {
		return this.requestHandler.request("PUT", Endpoints.CHANNEL_PERMISSION(channelID, overwriteID), true, {
			allow,
			deny,
			type,
			reason
		});
	}
	deleteChannelPermission(channelID, overwriteID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.CHANNEL_PERMISSION(channelID, overwriteID), true, {
			reason
		});
	}
	getChannelInvites(channelID) {
		return this.requestHandler.request("GET", Endpoints.CHANNEL_INVITES(channelID), true).then((invites) => invites.map((invite) => new Invite(invite, this)));
	}
	createChannelInvite(channelID, options, reason) {
		options = options || {};
		return this.requestHandler.request("POST", Endpoints.CHANNEL_INVITES(channelID), true, {
			max_age: options.maxAge,
			max_uses: options.maxUses,
			temporary: options.temporary,
			unique: options.unique,
			reason: reason
		}).then(invite => new Invite(invite, this));
	}
	getChannelWebhooks(channelID) {
		return this.requestHandler.request("GET", Endpoints.CHANNEL_WEBHOOKS(channelID), true);
	}
	getWebhook(webhookID, token) {
		return this.requestHandler.request("GET", token ? Endpoints.WEBHOOK_TOKEN(webhookID, token) : Endpoints.WEBHOOK(webhookID), !token);
	}
	createChannelWebhook(channelID, options, reason) {
		options.reason = reason;
		return this.requestHandler.request("POST", Endpoints.CHANNEL_WEBHOOKS(channelID), true, options);
	}
	editWebhook(webhookID, options, token, reason) {
		options.reason = reason;
		return this.requestHandler.request("PATCH", token ? Endpoints.WEBHOOK_TOKEN(webhookID, token) : Endpoints.WEBHOOK(webhookID), !token, options);
	}
	executeWebhook(webhookID, token, options) {
		if (!options.content && !options.file && !options.embeds) {
			return Promise.reject(new Error("No content, file, or embeds"));
		}
		if (options.content && (options.disableEveryone !== undefined ? options.disableEveryone : this.options.disableEveryone)) {
			options.content = options.content.replace(/@everyone/g, "@\u200beveryone").replace(/@here/g, "@\u200bhere");
		}
		return this.requestHandler.request("POST", (token ? Endpoints.WEBHOOK_TOKEN(webhookID, token) : Endpoints.WEBHOOK(webhookID)) + (options.wait ? "?wait=true" : ""), !token, {
			content: options.content,
			embeds: options.embeds,
			username: options.username,
			avatar_url: options.avatarURL,
			tts: options.tts
		}, options.file);
	}
	executeSlackWebhook(webhookID, token, options) {
		var wait = !!options.wait;
		options.wait = undefined;
		return this.requestHandler.request("POST", (token ? Endpoints.WEBHOOK_TOKEN_SLACK(webhookID, token) : Endpoints.WEBHOOK_SLACK(webhookID)) + (wait ? "?wait=true" : ""), !token, options);
	}
	deleteWebhook(webhookID, token, reason) {
		return this.requestHandler.request("DELETE", token ? Endpoints.WEBHOOK_TOKEN(webhookID, token) : Endpoints.WEBHOOK(webhookID), !token, {
			reason
		});
	}
	getGuildWebhooks(guildID) {
		return this.requestHandler.request("GET", Endpoints.GUILD_WEBHOOKS(guildID), true);
	}
	getGuildAuditLogs(guildID, limit, before, actionType) {
		return this.requestHandler.request("GET", Endpoints.GUILD_AUDIT_LOGS(guildID), true, {
			limit: limit || 50,
			before: before,
			action_type: actionType
		}).then((data) => {
			var guild = this.guilds.get(guildID);
			return {
				users: data.users.map((user) => this.users.add(user, this)),
				entries: data.audit_log_entries.map((entry) => new GuildAuditLogEntry(entry, guild))
			};
		});
	}
	createGuildEmoji(guildID, options, reason) {
		options.reason = reason;
		return this.requestHandler.request("POST", Endpoints.GUILD_EMOJIS(guildID), true, options);
	}
	editGuildEmoji(guildID, emojiID, options, reason) {
		options.reason = reason;
		return this.requestHandler.request("PATCH", Endpoints.GUILD_EMOJI(guildID, emojiID), true, options);
	}
	deleteGuildEmoji(guildID, emojiID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.GUILD_EMOJI(guildID, emojiID), true, {
			reason
		});
	}
	createRole(guildID, options, reason) {
		options.reason = reason;
		return this.requestHandler.request("POST", Endpoints.GUILD_ROLES(guildID), true, options).then((role) => new Role(role, this.guilds.get(guildID)));
	}
	editRole(guildID, roleID, options, reason) {
		options.reason = reason;
		return this.requestHandler.request("PATCH", Endpoints.GUILD_ROLE(guildID, roleID), true, options).then((role) => new Role(role, this.guilds.get(guildID)));
	}
	editRolePosition(guildID, roleID, position) {
		if (guildID === roleID) {
			return Promise.reject(new Error("Cannot move default role"));
		}
		var roles = this.guilds.get(guildID).roles;
		var role = roles.get(roleID);
		if (!role) {
			return Promise.reject(new Error(`Role ${roleID} not found`));
		}
		if (role.position === position) {
			return Promise.resolve();
		}
		var min = Math.min(position, role.position);
		var max = Math.max(position, role.position);
		roles = roles.filter((role) => min <= role.position && role.position <= max && role.id !== roleID).sort((a, b) => a.position - b.position);
		if (position > role.position) {
			roles.push(role);
		} else {
			roles.unshift(role);
		}
		return this.requestHandler.request("PATCH", Endpoints.GUILD_ROLES(guildID), true, roles.map((role, index) => ({
			id: role.id,
			position: index + min
		})));
	}
	deleteRole(guildID, roleID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.GUILD_ROLE(guildID, roleID), true, {
			reason
		});
	}
	getPruneCount(guildID, days) {
		return this.requestHandler.request("GET", Endpoints.GUILD_PRUNE(guildID), true, {
			days
		}).then((data) => data.pruned);
	}
	pruneMembers(guildID, days, reason) {
		return this.requestHandler.request("POST", Endpoints.GUILD_PRUNE(guildID), true, {
			days,
			reason
		}).then((data) => data.pruned);
	}
	getVoiceRegions(guildID) {
		return guildID ? this.requestHandler.request("GET", Endpoints.GUILD_VOICE_REGIONS(guildID), true) : this.requestHandler.request("GET", Endpoints.VOICE_REGIONS, true);
	}
	getInvite(inviteID, withCounts) {
		return this.requestHandler.request("GET", Endpoints.INVITE(inviteID), true, {
			with_counts: withCounts
		}).then((invite) => new Invite(invite, this));
	}
	acceptInvite(inviteID) {
		return this.requestHandler.request("POST", Endpoints.INVITE(inviteID), true).then((invite) => new Invite(invite, this));
	}
	deleteInvite(inviteID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.INVITE(inviteID), true, {
			reason
		});
	}
	getSelf() {
		return this.requestHandler.request("GET", Endpoints.USER("@me"), true).then((data) => new ExtendedUser(data, this));
	}
	editSelf(options) {
		return this.requestHandler.request("PATCH", Endpoints.USER("@me"), true, options).then((data) => new ExtendedUser(data, this));
	}
	getDMChannel(userID) {
		if (this.privateChannelMap[userID]) {
			return Promise.resolve(this.privateChannels.get(this.privateChannelMap[userID]));
		}
		return this.requestHandler.request("POST", Endpoints.USER_CHANNELS("@me"), true, {
			recipients: [userID],
			type: 1
		}).then((privateChannel) => new PrivateChannel(privateChannel, this));
	}
	createGroupChannel(userIDs) {
		return this.requestHandler.request("POST", Endpoints.USER_CHANNELS("@me"), true, {
			recipients: userIDs,
			type: 3
		}).then((privateChannel) => new GroupChannel(privateChannel, this));
	}
	getMessage(channelID, messageID) {
		return this.requestHandler.request("GET", Endpoints.CHANNEL_MESSAGE(channelID, messageID), true).then((message) => new Message(message, this));
	}
	getMessages(channelID, limit, before, after, around) {
		if (limit && limit > 100) {
			return new Promise((resolve, reject) => {
				var logs = [];
				var get = (_before, _after) => {
					this.requestHandler.request("GET", Endpoints.CHANNEL_MESSAGES(channelID), true, {
						limit: 100,
						before: _before || undefined,
						after: _after || undefined
					}).then((messages) => {
						if (limit <= messages.length) {
							return resolve((_after ? messages.slice(messages.length - limit, messages.length).map((message) => new Message(message, this)).concat(logs) : logs.concat(messages.slice(0, limit).map((message) => new Message(message, this)))));
						}
						limit -= messages.length;
						logs = (_after ? messages.map((message) => new Message(message, this)).concat(logs) : logs.concat(messages.map((message) => new Message(message, this))));
						if (messages.length < 100) {
							return resolve(logs);
						}
						this.emit("debug", `Getting ${limit} more messages during getMessages for ${channelID}: ${_before} ${_after}`, -1);
						get((_before || !_after) && messages[messages.length - 1].id, _after && messages[0].id);
					}).catch(reject);
				};
				get(before, after);
			});
		}
		return this.requestHandler.request("GET", Endpoints.CHANNEL_MESSAGES(channelID), true, {
			limit: limit || 50,
			before,
			after,
			around
		}).then((messages) => messages.map((message) => {
			try {
				return new Message(message, this);
			} catch (err) {
				this.emit("error", `Error creating message from channel messages\n${err.stack}\n${JSON.stringify(messages)}`);
				return null;
			}
		}));
	}
	getPins(channelID) {
		return this.requestHandler.request("GET", Endpoints.CHANNEL_PINS(channelID), true).then((messages) => messages.map((message) => new Message(message, this)));
	}
	createMessage(channelID, content, file) {
		if (content !== undefined) {
			if (typeof content !== "object" || content === null) {
				content = {
					content: "" + content
				};
			} else if (content.content !== undefined && typeof content.content !== "string") {
				content.content = "" + content.content;
			} else if (content.content === undefined && !content.embed && !file) {
				return Promise.reject(new Error("No content, file, or embed"));
			}
			if (content.content && (content.disableEveryone !== undefined ? content.disableEveryone : this.options.disableEveryone)) {
				content.content = content.content.replace(/@everyone/g, "@\u200beveryone").replace(/@here/g, "@\u200bhere");
			}
		} else if (!file) {
			return Promise.reject(new Error("No content, file, or embed"));
		}
		return this.requestHandler.request("POST", Endpoints.CHANNEL_MESSAGES(channelID), true, content, file).then((message) => new Message(message, this));
	}
	editMessage(channelID, messageID, content) {
		if (content !== undefined) {
			if (typeof content !== "object" || content === null) {
				content = {
					content: "" + content
				};
			} else if (content.content !== undefined && typeof content.content !== "string") {
				content.content = "" + content.content;
			} else if (content.content === undefined && !content.embed) {
				return Promise.reject(new Error("No content or embed"));
			}
			if (content.content && (content.disableEveryone !== undefined ? content.disableEveryone : this.options.disableEveryone)) {
				content.content = content.content.replace(/@everyone/g, "@\u200beveryone").replace(/@here/g, "@\u200bhere");
			}
		}
		return this.requestHandler.request("PATCH", Endpoints.CHANNEL_MESSAGE(channelID, messageID), true, content).then((message) => new Message(message, this));
	}
	pinMessage(channelID, messageID) {
		return this.requestHandler.request("PUT", Endpoints.CHANNEL_PIN(channelID, messageID), true);
	}
	unpinMessage(channelID, messageID) {
		return this.requestHandler.request("DELETE", Endpoints.CHANNEL_PIN(channelID, messageID), true);
	}
	getMessageReaction(channelID, messageID, reaction, limit, before, after) {
		if (reaction === decodeURI(reaction)) {
			reaction = encodeURIComponent(reaction);
		}
		return this.requestHandler.request("GET", Endpoints.CHANNEL_MESSAGE_REACTION(channelID, messageID, reaction), true, {
			limit: limit || 100,
			before: before,
			after: after
		}).then((users) => users.map((user) => new User(user, this)));
	}
	addMessageReaction(channelID, messageID, reaction, userID) {
		if (reaction === decodeURI(reaction)) {
			reaction = encodeURIComponent(reaction);
		}
		return this.requestHandler.request("PUT", Endpoints.CHANNEL_MESSAGE_REACTION_USER(channelID, messageID, reaction, userID || "@me"), true);
	}
	removeMessageReaction(channelID, messageID, reaction, userID) {
		if (reaction === decodeURI(reaction)) {
			reaction = encodeURIComponent(reaction);
		}
		return this.requestHandler.request("DELETE", Endpoints.CHANNEL_MESSAGE_REACTION_USER(channelID, messageID, reaction, userID || "@me"), true);
	}
	removeMessageReactions(channelID, messageID) {
		return this.requestHandler.request("DELETE", Endpoints.CHANNEL_MESSAGE_REACTIONS(channelID, messageID), true);
	}
	deleteMessage(channelID, messageID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.CHANNEL_MESSAGE(channelID, messageID), true, {
			reason
		});
	}
	deleteMessages(channelID, messageIDs, reason) {
		if (messageIDs.length === 0) {
			return Promise.resolve();
		}
		if (messageIDs.length === 1) {
			return this.deleteMessage(channelID, messageIDs[0]);
		}
		var oldestAllowedSnowflake = (Date.now() - 1421280000000) * 4194304;
		var invalidMessage = messageIDs.find((messageID) => messageID < oldestAllowedSnowflake);
		if (invalidMessage) {
			return Promise.reject(new Error(`Message ${invalidMessage} is more than 2 weeks old.`));
		}
		if (messageIDs.length > 100) {
			return this.requestHandler.request("POST", Endpoints.CHANNEL_BULK_DELETE(channelID), true, {
				messages: messageIDs.splice(0, 100),
				reason: reason
			}).then(() => this.deleteMessages(channelID, messageIDs));
		}
		return this.requestHandler.request("POST", Endpoints.CHANNEL_BULK_DELETE(channelID), true, {
			messages: messageIDs,
			reason: reason
		});
	}
	purgeChannel(channelID, limit, filter, before, after) {
		if (typeof filter === "string") {
			filter = (msg) => msg.content.includes(filter);
		}
		return new Promise((resolve, reject) => {
			var toDelete = [];
			var deleted = 0;
			var done = false;
			var checkToDelete = () => {
				var messageIDs = (done && toDelete) || (toDelete.length >= 100 && toDelete.splice(0, 100));
				if (messageIDs) {
					deleted += messageIDs.length;
					this.deleteMessages(channelID, messageIDs).then(() => {
						if (done) {
							return resolve(deleted);
						}
						setTimeout(() => {
							checkToDelete();
						}, 1000);
					}).catch(reject);
				} else if (done) {
					return resolve(deleted);
				} else {
					setTimeout(() => {
						checkToDelete();
					}, 250);
				}
			};
			var del = (_before, _after) => {
				this.getMessages(channelID, 100, _before, _after).then((messages) => {
					if (limit === 0) {
						done = true;
						return;
					}
					for (var message of messages) {
						if (limit === 0) {
							break;
						}
						if (message.timestamp < Date.now() - 1209600000) { // 14d * 24h * 60m * 60s * 1000ms
							done = true;
							return;
						}
						if (!filter || filter(message)) {
							toDelete.push(message.id);
						}
						limit--;
					}
					if (limit === 0 || messages.length < 100) {
						done = true;
						return;
					}
					del((_before || !_after) && messages[messages.length - 1].id, _after && messages[0].id);
				}).catch(reject);
			};
			del(before, after);
			checkToDelete();
		});
	}
	getGuildEmbed(guildID) {
		return this.requestHandler.request("GET", Endpoints.GUILD_EMBED(guildID), true);
	}
	getGuildIntegrations(guildID) {
		var guild = this.guilds.get(guildID);
		return this.requestHandler.request("GET", Endpoints.GUILD_INTEGRATIONS(guildID), true).then((integrations) => integrations.map((integration) => new GuildIntegration(integration, guild)));
	}
	editGuildIntegration(guildID, integrationID, options) {
		return this.requestHandler.request("PATCH", Endpoints.GUILD_INTEGRATION(guildID, integrationID), true, {
			expire_behavior: options.expireBehavior,
			expire_grace_period: options.expireGracePeriod,
			enable_emoticons: options.enableEmoticons
		});
	}
	deleteGuildIntegration(guildID, integrationID) {
		return this.requestHandler.request("DELETE", Endpoints.GUILD_INTEGRATION(guildID, integrationID), true);
	}
	syncGuildIntegration(guildID, integrationID) {
		return this.requestHandler.request("POST", Endpoints.GUILD_INTEGRATION_SYNC(guildID, integrationID), true);
	}
	getGuildInvites(guildID) {
		return this.requestHandler.request("GET", Endpoints.GUILD_INVITES(guildID), true).then((invites) => invites.map((invite) => new Invite(invite, this)));
	}
	banGuildMember(guildID, userID, deleteMessageDays, reason) {
		if (!isNaN(deleteMessageDays) && (deleteMessageDays < 0 || deleteMessageDays > 7)) {
			return Promise.reject(new Error(`Invalid deleteMessageDays value (${deleteMessageDays}), should be a number between 0-7 inclusive`));
		}
		return this.requestHandler.request("PUT", Endpoints.GUILD_BAN(guildID, userID), true, {
			"delete-message-days": deleteMessageDays || 0,
			queryReason: reason
		});
	}
	unbanGuildMember(guildID, userID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.GUILD_BAN(guildID, userID), true, {
			reason
		});
	}
	createGuild(name, region, icon) {
		icon = icon || null;
		return this.requestHandler.request("POST", Endpoints.GUILDS, true, {
			name,
			region,
			icon
		}).then((guild) => new Guild(guild, this));
	}
	editGuild(guildID, options, reason) {
		return this.requestHandler.request("PATCH", Endpoints.GUILD(guildID), true, {
			name: options.name,
			region: options.region,
			icon: options.icon,
			verification_level: options.verificationLevel,
			default_message_notifications: options.defaultNotifications,
			afk_channel_id: options.afkChannelID,
			afk_timeout: options.afkTimeout,
			splash: options.splash,
			owner_id: options.ownerID,
			reason: reason
		}).then((guild) => new Guild(guild, this));
	}

	/**
	 * Get the ban list of a guild
	 * @arg {String} guildID The ID of the guild
	 * @returns {Promise<Object[]>} Resolves with an array of {reason: String, user: User}
	 */
	getGuildBans(guildID) {
		return this.requestHandler.request("GET", Endpoints.GUILD_BANS(guildID), true).then((bans) => {
			bans.forEach((ban) => {
				ban.user = new User(ban.user, this);
			});
			return bans;
		});
	}

	/**
	 * Edit a guild member
	 * @arg {String} guildID The ID of the guild
	 * @arg {String} memberID The ID of the member
	 * @arg {Object} options The properties to edit
	 * @arg {String[]} [options.roles] The array of role IDs the member should have
	 * @arg {String} [options.nick] Set the member's server nickname, "" to remove
	 * @arg {Boolean} [options.mute] Server mute the member
	 * @arg {Boolean} [options.deaf] Server deafen the member
	 * @arg {String} [options.channelID] The ID of the voice channel to move the member to (must be in voice)
	 * @arg {String} [reason] The reason to be displayed in audit logs
	 * @returns {Promise}
	 */
	editGuildMember(guildID, memberID, options, reason) {
		return this.requestHandler.request("PATCH", Endpoints.GUILD_MEMBER(guildID, memberID), true, {
			roles: options.roles && options.roles.filter((roleID, index) => options.roles.indexOf(roleID) === index),
			nick: options.nick,
			mute: options.mute,
			deaf: options.deaf,
			channel_id: options.channelID,
			reason: reason
		});
	}

	/**
	 * Add a role to a guild member
	 * @arg {String} guildID The ID of the guild
	 * @arg {String} memberID The ID of the member
	 * @arg {String} roleID The ID of the role
	 * @arg {String} [reason] The reason to be displayed in audit logs
	 * @returns {Promise}
	 */
	addGuildMemberRole(guildID, memberID, roleID, reason) {
		return this.requestHandler.request("PUT", Endpoints.GUILD_MEMBER_ROLE(guildID, memberID, roleID), true, {
			reason
		});
	}

	/**
	 * Remve a role from a guild member
	 * @arg {String} guildID The ID of the guild
	 * @arg {String} memberID The ID of the member
	 * @arg {String} roleID The ID of the role
	 * @arg {String} [reason] The reason to be displayed in audit logs
	 * @returns {Promise}
	 */
	removeGuildMemberRole(guildID, memberID, roleID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.GUILD_MEMBER_ROLE(guildID, memberID, roleID), true, {
			reason
		});
	}

	/**
	 * Edit the bot's nickname in a guild
	 * @arg {String} guildID The ID of the guild
	 * @arg {String} nick The nickname
	 * @arg {String} [reason] The reason to be displayed in audit logs
	 * @returns {Promise}
	 */
	editNickname(guildID, nick, reason) {
		return this.requestHandler.request("PATCH", Endpoints.GUILD_MEMBER_NICK(guildID, "@me"), true, {
			nick,
			reason
		});
	}

	/**
	 * Kick a user from a guild
	 * @arg {String} guildID The ID of the guild
	 * @arg {String} userID The ID of the user
	 * @arg {String} [reason] The reason to be displayed in audit logs
	 * @returns {Promise}
	 */
	kickGuildMember(guildID, userID, reason) {
		return this.requestHandler.request("DELETE", Endpoints.GUILD_MEMBER(guildID, userID), true, {
			reason
		});
	}

	/**
	 * Delete a guild (bot user must be owner)
	 * @arg {String} guildID The ID of the guild
	 * @returns {Promise}
	 */
	deleteGuild(guildID) {
		return this.requestHandler.request("DELETE", Endpoints.GUILD(guildID), true);
	}

	/**
	 * Leave a guild
	 * @arg {String} guildID The ID of the guild
	 * @returns {Promise}
	 */
	leaveGuild(guildID) {
		return this.requestHandler.request("DELETE", Endpoints.USER_GUILD("@me", guildID), true);
	}

	/**
	 * Get data on an OAuth2 application
	 * @arg {String} [appID="@me"] The client ID of the application to get data for. "@me" refers to the logged in user's own application
	 * @returns {Promise<Object>} The bot's application data. Refer to [the official Discord API documentation entry](https://discordapp.com/developers/docs/topics/oauth2#get-current-application-information) for object structure
	 */
	getOAuthApplication(appID) {
		return this.requestHandler.request("GET", Endpoints.OAUTH2_APPLICATION(appID || "@me"), true);
	}

	/**
	 * Create a relationship with a user
	 * @arg {String} userID The ID of the target user
	 * @arg {Boolean} [block=false] If true, block the user. Otherwise, add the user as a friend
	 * @returns {Promise}
	 */
	addRelationship(userID, block) {
		return this.requestHandler.request("PUT", Endpoints.USER_RELATIONSHIP("@me", userID), true, {
			type: block ? 2 : undefined
		});
	}

	/**
	 * Remove a relationship with a user
	 * @arg {String} userID The ID of the target user
	 * @returns {Promise}
	 */
	removeRelationship(userID) {
		return this.requestHandler.request("DELETE", Endpoints.USER_RELATIONSHIP("@me", userID), true);
	}

	/**
	 * Add a user to a group
	 * @arg {String} groupID The ID of the target group
	 * @arg {String} userID The ID of the target user
	 * @returns {Promise}
	 */
	addGroupRecipient(groupID, userID) {
		return this.requestHandler.request("PUT", Endpoints.CHANNEL_RECIPIENT(groupID, userID), true);
	}

	/**
	 * Remove a user from a group
	 * @arg {String} groupID The ID of the target group
	 * @arg {String} userID The ID of the target user
	 * @returns {Promise}
	 */
	removeGroupRecipient(groupID, userID) {
		return this.requestHandler.request("DELETE", Endpoints.CHANNEL_RECIPIENT(groupID, userID), true);
	}

	/**
	 * Get profile data for a user (user accounts only)
	 * @arg {String} userID The ID of the target user
	 * @returns {Promise<Object>} The user's profile data.
	 */
	getUserProfile(userID) {
		return this.requestHandler.request("GET", Endpoints.USER_PROFILE(userID), true);
	}

	/**
	 * Edit the current user's note for another user (user accounts only)
	 * @arg {String} userID The ID of the target user
	 * @arg {String} note The note
	 * @returns {Promise}
	 */
	editUserNote(userID, note) {
		return this.requestHandler.request("PUT", Endpoints.USER_NOTE("@me", userID), true, {
			note: note
		});
	}

	/**
	 * Delete the current user's note for another user (user accounts only)
	 * @returns {Promise}
	 */
	deleteUserNote(userID) {
		return this.requestHandler.request("DELETE", Endpoints.USER_NOTE("@me", userID), true);
	}

	/**
	 * Get the connections for the current user (user accounts only)
	 * @returns {Promise<Object>} The user's connections
	 */
	getSelfConnections() {
		return this.requestHandler.request("GET", Endpoints.USER_CONNECTIONS("@me"), true);
	}

	/**
	 * Edit a connection for the current user (user accounts only)
	 * @arg {String} platform The connection platform (e.g. "twitch", "reddit")
	 * @arg {String} id The connection ID
	 * @arg {Object} data The connection data
	 * @arg {Boolean} [data.friendSync] Whether to sync friends from the connection or not
	 * @arg {Number} [data.visibility] The visibility level for the connection. 0 = hidden, 1 = shown on profile
	 * @returns {Promise<Object>} The updated connection data
	 */
	editSelfConnection(platform, id, data) {
		return this.requestHandler.request("PATCH", Endpoints.USER_CONNECTION_PLATFORM("@me", platform, id), true, {
			visibility: data.visibility,
			friend_sync: data.friendSync
		});
	}

	/**
	 * Delete a connection for the current user (user accounts only)
	 * @arg {String} platform The connection platform (e.g. "twitch", "reddit")
	 * @arg {String} id The connection ID
	 * @returns {Promise}
	 */
	deleteSelfConnection(platform, id) {
		return this.requestHandler.request("DELETE", Endpoints.USER_CONNECTION_PLATFORM("@me", platform, id), true);
	}

	/**
	 * Get settings for the current user (user accounts only)
	 * @returns {Promise<Object>} The user's settings data.
	 */
	getSelfSettings() {
		return this.requestHandler.request("GET", Endpoints.USER_SETTINGS("@me"), true);
	}

	/**
	 * Edit settings for the current user (user accounts only)
	 * @arg {Object} data The user settings data
	 * @arg {Boolean} [data.convertEmoticons] Whether to convert emoticons or not (e.g. :D => 😄)
	 * @arg {Boolean} [data.detectPlatformAccounts] Whether to automatically detect accounts from other platforms or not (Blizzard, Skype, etc.)
	 * @arg {Boolean} [data.developerMode] Whether to enable developer mode or not
	 * @arg {Boolean} [data.enableTTSCommand] Whether to respect usage of the TTS command or not
	 * @arg {Object} [data.friendSourceFlags] An object representing allowed friend request sources
	 * @arg {Boolean} [data.friendSourceFlags.all] Whether to allow friends requests from anywhere or not
	 * @arg {Boolean} [data.friendSourceFlags.mutualFriends] Whether to allow friend requests from people with mutual friends or not
	 * @arg {Boolean} [data.friendSourceFlags.mutualGuilds] Whether to allow friend requests from people in mutual guilds or not
	 * @arg {Array<String>} [data.guildPositions] An ordered array of guild IDs representing the guild list order in the Discord client
	 * @arg {Boolean} [data.inlineAttachmentMedia] Whether to show attachment previews or not
	 * @arg {Boolean} [data.inlineEmbedMedia] Whether to show embed images or not
	 * @arg {String} [data.locale] The locale to use for the Discord UI
	 * @arg {Boolean} [data.messageDisplayCompact] Whether to use compact mode or not
	 * @arg {Boolean} [data.renderEmbeds] Whether to show embeds or not
	 * @arg {Boolean} [data.renderReactions] Whether to show reactions or not
	 * @arg {Array<String>} [data.restrictedGuilds] An array of guild IDs where direct messages from guild members are disallowed
	 * @arg {Boolean} [data.showCurrentGame] Whether to set the user's status to the current game or not
	 * @arg {String} [data.status] The status of the user, either "invisible", "dnd", "away", or "online"
	 * @arg {String} [data.theme] The theme to use for the Discord UI, either "dark" or "light"
	 * @returns {Promise<Object>} The user's settings data.
	 */
	editSelfSettings(data) {
		var friendSourceFlags = undefined;
		if (data.friendSourceFlags) {
			friendSourceFlags = {};
			if (data.friendSourceFlags.all) {
				friendSourceFlags.all = true;
			}
			if (data.friendSourceFlags.mutualFriends) {
				friendSourceFlags.mutual_friends = true;
			}
			if (data.friendSourceFlags.mutualGuilds) {
				friendSourceFlags.mutual_guilds = true;
			}
		}
		return this.requestHandler.request("PATCH", Endpoints.USER_SETTINGS("@me"), true, {
			convert_emoticons: data.convertEmoticons,
			detect_platform_accounts: data.detectPlatformAccounts,
			developer_mode: data.developerMode,
			enable_tts_command: data.enableTTSCommand,
			friend_source_flags: friendSourceFlags,
			guild_positions: data.guildPositions,
			inline_attachment_media: data.inlineAttachmentMedia,
			inline_embed_media: data.inlineEmbedMedia,
			locale: data.locale,
			message_display_compact: data.messageDisplayCompact,
			render_embeds: data.renderEmbeds,
			render_reactions: data.renderReactions,
			restricted_guilds: data.restrictedGuilds,
			show_current_game: data.showCurrentGame,
			status: data.status,
			theme: data.theme,
		});
	}

	/**
	 * Get the MFA backup codes for the current user (user accounts only)
	 * @arg {String} password The password for the current user
	 * @arg {Boolean} [regenerate] Whether to regenerate the MFA backup codes or not
	 * @returns {Promise<Object>} The user's MFA codes
	 */
	getSelfMFACodes(password, regenerate) {
		return this.requestHandler.request("POST", Endpoints.USER_MFA_CODES("@me"), true, {
			password: password,
			regenerate: !!regenerate
		});
	}

	/**
	 * Enable TOTP authentication for the current user (user accounts only)
	 * @arg {String} secret The TOTP secret used to generate the auth code
	 * @arg {String} code The timed auth code for the current user
	 * @returns {Promise<Object>} An object containing the user's new authorization token and backup codes
	 */
	enableSelfMFATOTP(secret, code) {
		return this.requestHandler.request("POST", Endpoints.USER_MFA_TOTP_ENABLE("@me"), true, {
			secret,
			code
		}).then((data) => {
			if (data.token) {
				this.token = data.token;
			}
		});
	}

	/**
	 * Disable TOTP authentication for the current user (user accounts only)
	 * @arg {String} code The timed auth code for the current user
	 * @returns {Promise<Object>} An object containing the user's new authorization token
	 */
	disableSelfMFATOTP(code) {
		return this.requestHandler.request("POST", Endpoints.USER_MFA_TOTP_DISABLE("@me"), true, {
			code
		}).then((data) => {
			if (data.token) {
				this.token = data.token;
			}
		});
	}

	/**
	 * Get the billing info for the current user (user accounts only)
	 * @returns {Promise<Object>} The user's billing info
	 */
	getSelfBilling() {
		return this.requestHandler.request("GET", Endpoints.USER_BILLING("@me"), true);
	}

	/**
	 * Get the payment history for the current user (user accounts only)
	 * @returns {Promise<Object>} The user's payment history
	 */
	getSelfPayments() {
		return this.requestHandler.request("GET", Endpoints.USER_BILLING_PAYMENTS("@me"), true);
	}

	/**
	 * Purchase a premium subscription (Nitro) for the current user (user accounts only)
	 * You must get a Stripe card token from the Stripe API for this to work
	 * @arg {String} token The Stripe credit card token
	 * @arg {String} plan The plan to purchase, either "premium_month" or "premium_year"
	 * @returns {Promise}
	 */
	addSelfPremiumSubscription(token, plan) {
		return this.requestHandler.request("PUT", Endpoints.USER_BILLING_PREMIUM_SUBSCRIPTION("@me"), true, {
			token: token,
			payment_gateway: "stripe",
			plan: plan
		});
	}

	/**
	 * Cancel the premium subscription (Nitro) for the current user (user accounts only)
	 * @returns {Promise}
	 */
	deleteSelfPremiumSubscription() {
		return this.requestHandler.request("DELETE", Endpoints.USER_BILLING_PREMIUM_SUBSCRIPTION("@me"), true);
	}

	/**
	 * Get a channel's data via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} channelID The ID of the channel
	 * @returns {Promise<CategoryChannel | GroupChannel | PrivateChannel | TextChannel | VoiceChannel>}
	 */
	getRESTChannel(channelID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.CHANNEL(channelID), true).then((channel) => {
			if (channel.type === 0) {
				return new TextChannel(channel, null, this.options.messageLimit);
			} else if (channel.type === 1) {
				return new PrivateChannel(channel, this);
			} else if (channel.type === 2) {
				return new VoiceChannel(channel, null);
			} else if (channel.type === 3) {
				return new GroupChannel(channel, this);
			} else if (channel.type === 4) {
				return new CategoryChannel(channel, null);
			} else {
				return channel;
			}
		});
	}

	/**
	 * Get a guild's data via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} guildID The ID of the guild
	 * @returns {Promise<Guild>}
	 */
	getRESTGuild(guildID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.GUILD(guildID), true).then((guild) => new Guild(guild, this));
	}

	/**
	 * Get a list of the user's guilds via the REST API. REST mode is required to use this endpoint.
	 * @arg {Number} [limit=100] The max number of guilds to get (1 to 1000)
	 * @arg {String} [before] The lowest guild ID of the next page
	 * @arg {String} [after] The highest guild ID of the previous page
	 * @returns {Promise<Guild[]>}
	 */
	getRESTGuilds(limit, before, after) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.USER_GUILDS("@me"), true, {
			limit,
			before,
			after
		}).then((guilds) => guilds.map((guild) => new Guild(guild, this)));
	}

	/**
	 * Get a guild's channels via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} guildID The ID of the guild
	 * @returns {Promise<(CategoryChannel[] | TextChannel[] | VoiceChannel[])>}
	 */
	getRESTGuildChannels(guildID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.GUILD_CHANNELS(guildID), true).then((channels) => channels.map((channel) => {
			if (channel.type === 0) {
				return new TextChannel(channel, null, this.options.messageLimit);
			} else if (channel.type === 2) {
				return new VoiceChannel(channel, null);
			} else if (channel.type === 4) {
				return new CategoryChannel(channel, null);
			} else {
				return channel;
			}
		}));
	}

	/**
	 * Get a guild's emojis via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} guildID The ID of the guild
	 * @returns {Promise<Object[]>} An array of guild emoji objects
	 */
	getRESTGuildEmojis(guildID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.GUILD_EMOJIS(guildID), true);
	}

	/**
	 * Get a guild emoji via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} guildID The ID of the guild
	 * @arg {String} emojiID The ID of the emoji
	 * @returns {Promise<Object>} An emoji object
	 */
	getRESTGuildEmoji(guildID, emojiID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.GUILD_EMOJI(guildID, emojiID), true);
	}

	/**
	 * Get a guild's members via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} guildID The ID of the guild
	 * @arg {Number} [limit=1] The max number of members to get (1 to 1000)
	 * @arg {String} [after] The highest user ID of the previous page
	 * @returns {Promise<Member[]>}
	 */
	getRESTGuildMembers(guildID, limit, after) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.GUILD_MEMBERS(guildID), true, {
			limit,
			after
		}).then((members) => members.map((member) => new Member(member, null)));
	}

	/**
	 * Get a guild's members via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} guildID The ID of the guild
	 * @arg {String} memberID The ID of the member
	 * @returns {Promise<Member>}
	 */
	getRESTGuildMember(guildID, memberID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.GUILD_MEMBER(guildID, memberID), true).then((member) => new Member(member, null));
	}

	/**
	 * Get a guild's roles via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} guildID The ID of the guild
	 * @returns {Promise<Role[]>}
	 */
	getRESTGuildRoles(guildID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.GUILD_ROLES(guildID), true).then((roles) => roles.map((role) => new Role(role, null)));
	}

	/**
	 * Get a user's data via the REST API. REST mode is required to use this endpoint.
	 * @arg {String} userID The ID of the user
	 * @returns {Promise<User>}
	 */
	getRESTUser(userID) {
		if (!this.options.restMode) {
			return Promise.reject(new Error("Eris REST mode is not enabled"));
		}
		return this.requestHandler.request("GET", Endpoints.USER(userID), true).then((user) => new User(user, this));
	}

	/**
	 * Search a channel's messages
	 * @arg {String} channelID The ID of the channel
	 * @arg {Object} query Search parameters
	 * @arg {String} [query.sortBy="timestamp"] What to sort by, either "timestamp" or "relevance"
	 * @arg {String} [query.sortOrder="desc"] What order to sort by, either "asc" or "desc"
	 * @arg {String} [query.content] Filter results by a content string
	 * @arg {String} [query.authorID] Filter results by an author ID
	 * @arg {String} [query.minID] The minimum message ID to return results for
	 * @arg {String} [query.maxID] The maximum message ID to return results for
	 * @arg {Number} [query.limit=25] How many messages to return, 1 <= limit <= 25
	 * @arg {Number} [query.offset=0] The query index of the first message to be returned, 0 <= offset <= 5000
	 * @arg {Number} [query.contextSize=2] How many context messages around each result to return.
	 * For example, if you searched for `6` and contextSize was 2, `[4, 5, 6, 7, 8]` would be returned
	 * @arg {String} [query.has] Only return messages with an "attachment", "embed", or "link"
	 * @arg {String} [query.embedProviders] Filter results by embed provider
	 * @arg {String} [query.embedTypes] Filter results by embed type
	 * @arg {String} [query.attachmentExtensions] Filter results by attachment extension
	 * @arg {String} [query.attachmentFilename] Filter results by attachment filename
	 * @returns {Promise<Object>} A search result object. The object will have a `totalResults` key and `results` key.
	 * Each entry in the result array is an array of Message objects.
	 * In each array, the message where `Message.hit === true` is the matched message, while the other messages are context messages.
	 * Sample return: ```
	 * {
	 *     totalResults: 2,
	 *     results: [
	 *         [Message, Message, Message (Message.hit = true), Message],
	 *         [Message, Message, Message (Message.hit = true), Message, Message]
	 *     ]
	 * }
	 * ```
	 */
	searchChannelMessages(channelID, query) {
		return this.requestHandler.request("GET", Endpoints.CHANNEL_MESSAGES_SEARCH(channelID), true, {
			sort_by: query.sortBy,
			sort_order: query.sortOrder,
			content: query.content,
			author_id: query.authorID,
			min_id: query.minID,
			max_id: query.maxID,
			limit: query.limit,
			offset: query.offset,
			context_size: query.contextSize,
			has: query.has,
			embed_providers: query.embedProviders,
			embed_types: query.embedTypes,
			attachment_extensions: query.attachmentExtensions,
			attachment_filename: query.attachmentFilename
		}).then((results) => ({
			totalResults: results.total_results,
			results: results.messages && results.messages.map((result) => result.map((message) => new Message(message, this)))
		}));
	}

	/**
	 * Search a guild's messages
	 * @arg {String} guildID The ID of the guild
	 * @arg {Object} query Search parameters
	 * @arg {String} [query.sortBy="timestamp"] What to sort by, either "timestamp" or "relevance"
	 * @arg {String} [query.sortOrder="desc"] What order to sort by, either "asc" or "desc"
	 * @arg {String} [query.content] Filter results by a content string
	 * @arg {String} [query.authorID] Filter results by an author ID
	 * @arg {String} [query.minID] The minimum message ID to return results for
	 * @arg {String} [query.maxID] The maximum message ID to return results for
	 * @arg {Number} [query.limit=25] How many messages to return, 1 <= limit <= 25
	 * @arg {Number} [query.offset=0] The query index of the first message to be returned, 0 <= offset <= 5000
	 * @arg {Number} [query.contextSize=2] How many context messages around each result to return.
	 * For example, if you searched for `6` and contextSize was 2, `[4, 5, 6, 7, 8]` would be returned
	 * @arg {String} [query.has] Only return messages with an "attachment", "embed", or "link"
	 * @arg {String} [query.embedProviders] Filter results by embed provider
	 * @arg {String} [query.embedTypes] Filter results by embed type
	 * @arg {String} [query.attachmentExtensions] Filter results by attachment extension
	 * @arg {String} [query.attachmentFilename] Filter results by attachment filename
	 * @arg {String[]} [query.channelIDs] Filter results by channel ID
	 * @returns {Promise<Object>} A search result object. The object will have a `totalResults` key and `results` key.
	 * Each entry in the result array is an array of Message objects.
	 * In each array, the message where `Message.hit === true` is the matched message, while the other messages are context messages.
	 * Sample return: ```
	 * {
	 *     totalResults: 2,
	 *     results: [
	 *         [Message, Message, Message (Message.hit = true), Message],
	 *         [Message, Message, Message (Message.hit = true), Message, Message]
	 *     ]
	 * }
	 * ```
	 */
	searchGuildMessages(guildID, query) {
		return this.requestHandler.request("GET", Endpoints.GUILD_MESSAGES_SEARCH(guildID), true, {
			sort_by: query.sortBy,
			sort_order: query.sortOrder,
			content: query.content,
			author_id: query.authorID,
			min_id: query.minID,
			max_id: query.maxID,
			limit: query.limit,
			offset: query.offset,
			context_size: query.contextSize,
			has: query.has,
			embed_providers: query.embedProviders,
			embed_types: query.embedTypes,
			attachment_extensions: query.attachmentExtensions,
			attachment_filename: query.attachmentFilename,
			channel_id: query.channelIDs
		}).then((results) => ({
			totalResults: results.total_results,
			results: results.messages && results.messages.map((result) => result.map((message) => new Message(message, this)))
		}));
	}

	toJSON() {
		var base = {};
		for (var key in this) {
			if (this.hasOwnProperty(key) && !key.startsWith("_")) {
				if (!this[key]) {
					base[key] = this[key];
				} else if (this[key] instanceof Set) {
					base[key] = Array.from(this[key]);
				} else if (this[key] instanceof Map) {
					base[key] = Array.from(this[key].values());
				} else if (typeof this[key].toJSON === "function") {
					base[key] = this[key].toJSON();
				} else {
					base[key] = this[key];
				}
			}
		}
		return base;
	}
}

module.exports = Client;