"use strict";

const Client = require("../Client");
const Command = require("./Command");
const Message = require("../structures/Message");

class CommandClient extends Client {
    constructor(token, options, commandOptions) {
        super(token, options);
        this.commandOptions = {
            defaultHelpCommand: true,
            description: "An Eris-based Discord bot",
            ignoreBots: true,
            ignoreSelf: true,
            name: null,
            owner: "an unknown user",
            prefix: "@mention ",
            defaultCommandOptions: {}
        };
        if (typeof commandOptions === "object") {
            for (var property of Object.keys(commandOptions)) {
                this.commandOptions[property] = commandOptions[property];
            }
        }
        this.guildPrefixes = {};
        this.commands = {};
        this.commandAliases = {};
        this.activeMessages = {};
        this.once("shardPreReady", () => {
            this.preReady = true;
            if (!this.commandOptions.name) {
                this.commandOptions.name = `**${this.user.username}**`;
            }
            if (Array.isArray(this.commandOptions.prefix)) {
                for (let i in this.commandOptions.prefix) {
                    this.commandOptions.prefix[i] = this.commandOptions.prefix[i].replace(/@mention/g, this.user.mention);
                }
            } else {
                this.commandOptions.prefix = this.commandOptions.prefix.replace(/@mention/g, this.user.mention);
            }
            for (var key in this.guildPrefixes) {
                if (Array.isArray(this.guildPrefixes[key])) {
                    for (let i in this.guildPrefixes[key]) {
                        this.guildPrefixes[key][i] = this.guildPrefixes[key][i].replace(/@mention/g, this.user.mention);
                    }
                } else {
                    this.guildPrefixes[key] = this.guildPrefixes[key].replace(/@mention/g, this.user.mention);
                }
            }
        });
        this.on("messageCreate", this.onMessageCreate);
        this.on("messageReactionAdd", this.onMessageReactionEvent);
        this.on("messageReactionRemove", this.onMessageReactionEvent);
        if (this.commandOptions.defaultHelpCommand) {
            this.registerCommand("help", (msg, args) => {
                var result = "";
                if (args.length > 0) {
                    var cur = this.commands[this.commandAliases[args[0]] || args[0]];
                    if (!cur) {
                        return "Command not found";
                    }
                    var label = cur.label;
                    for (var i = 1; i < args.length; ++i) {
                        cur = cur.subcommands[cur.subcommandAliases[args[i]] || args[i]];
                        if (!cur) {
                            return "Command not found";
                        }
                        label += " " + cur.label;
                    }
                    result += `**${msg.prefix}${label}** ${cur.usage}\n${cur.fullDescription}`;
                    if (Object.keys(cur.aliases).length > 0) {
                        result += `\n\n**Aliases:** ${cur.aliases.join(", ")}`;
                    }
                    if (Object.keys(cur.subcommands).length > 0) {
                        result += "\n\n**Subcommands:**";
                        for (var subLabel in cur.subcommands) {
                            if (cur.subcommands[subLabel].permissionCheck(msg)) {
                                result += `\n  **${subLabel}** - ${cur.subcommands[subLabel].description}`;
                            }
                        }
                    }
                } else {
                    result += `${this.commandOptions.name} - ${this.commandOptions.description}\n`;
                    if (this.commandOptions.owner) {
                        result += `by ${this.commandOptions.owner}\n`;
                    }
                    result += "\n";
                    result += "**Commands:**\n";
                    for (label in this.commands) {
                        if (this.commands[label] && this.commands[label].permissionCheck(msg) && !this.commands[label].hidden) {
                            result += `  **${msg.prefix}${label}** - ${this.commands[label].description}\n`;
                        }
                    }
                    result += `\nType ${msg.prefix}help <command> for more info on a command.`;
                }
                return result;
            }, {
                description: "This help text",
                fullDescription: "This command is used to view information of different bot commands, including this one."
            });
            if (!this.commandOptions.defaultCommandOptions.invalidUsageMessage) {
                this.commandOptions.defaultCommandOptions.invalidUsageMessage = "Invalid usage. Do `%prefix%help %label%` to view proper usage.";
            }
        } else if (!this.commandOptions.defaultCommandOptions.invalidUsageMessage) {
            this.commandOptions.defaultCommandOptions.invalidUsageMessage = "Invalid usage.";
        }
    }
    onMessageCreate(msg) {
        if (!this.ready) {
            return;
        }
        if (!msg.author) {
            this.emit("warn", `Message ${msg.id} has author=${msg.author} | Channel ${msg.channel.id}, timestamp ${Date.now()}`);
            return;
        }
        msg.command = false;
        if ((!this.commandOptions.ignoreSelf || msg.author.id !== this.user.id) && (!this.commandOptions.ignoreBots || !msg.author.bot) && (msg.prefix = this.checkPrefix(msg))) {
            var args = msg.content.replace(/<@!/g, "<@").substring(msg.prefix.length).split(" ");
            var label = args.shift();
            var command = this.resolveCommand(label);
            if (command !== undefined) {
                msg.command = command;
                Promise.resolve(msg.command.process(args, msg)).then((resp) => {
                    if (resp != null && !(resp instanceof Message)) {
                        return this.createMessage(msg.channel.id, resp);
                    }
                    return resp;
                }).then((newMsg) => {
                    if (newMsg != null) {
                        if (msg.command.reactionButtons) {
                            msg.command.reactionButtons.forEach((button) => newMsg.addReaction(button.emoji));
                            this.activeMessages[newMsg.id] = {
                                args: args,
                                command: msg.command,
                                timeout: setTimeout(() => {
                                    this.unwatchMessage(newMsg.id, newMsg.channel.id);
                                }, msg.command.reactionButtonTimeout)
                            };
                        }
                    }
                    if (msg.command.hooks.postCommand) {
                        msg.command.hooks.postCommand(msg, args, newMsg);
                    }
                }).catch((err) => {
                    this.emit("error", err);
                    if (msg.command.hooks.postExecution) {
                        msg.command.hooks.postExecution(msg, args, false);
                    }
                    var promise = Promise.resolve();
                    if (msg.command.errorMessage) {
                        if (typeof msg.command.errorMessage === "function") {
                            var reply = msg.command.errorMessage();
                            if (reply !== undefined) {
                                promise = this.createMessage(msg.channel.id, reply);
                            }
                        } else {
                            promise = this.createMessage(msg.channel.id, msg.command.errorMessage);
                        }
                    }
                    promise.then((newMsg) => {
                        if (msg.command.hooks.postCommand) {
                            msg.command.hooks.postCommand(msg, args, newMsg);
                        }
                    });
                });
            }
        }
    }
    resolveCommand(label) {
        label = this.commandAliases[label] || label;
        var command = this.commands[label];
        if (command) {
            return command;
        }
        label = label.toLowerCase();
        label = this.commandAliases[label] || label;
        command = this.commands[label];
        if (command && command.caseInsensitive) {
            return command;
        }
    }
    onMessageReactionEvent(msg, emoji, userID) {
        if (!this.ready || userID === this.user.id || !(msg.content || msg.embeds || msg.attachments)) {
            return;
        }
        emoji = emoji.id ? `${emoji.name}:${emoji.id}` : emoji.name;
        var activeMessage = this.activeMessages[msg.id];
        if (activeMessage && activeMessage.command.reactionButtons) {
            var action = activeMessage.command.reactionButtons.find((button) => button.emoji === emoji);
            if (!action) {
                return;
            }
            switch (action.type) {
                case "cancel":
                    {
                        this.unwatchMessage(msg.id, msg.channel.guild && msg.channel.id);
                        Promise.resolve(action.execute(msg, activeMessage.args, userID)).then((resp) => {
                            if (resp != null) {
                                return this.editMessage(msg.channel.id, msg.id, resp);
                            }
                        }).catch(function() {});
                        break;
                    }
                case "edit":
                    {
                        Promise.resolve(action.execute(msg, activeMessage.args, userID)).then((resp) => {
                            if (resp != null) {
                                return this.editMessage(msg.channel.id, msg.id, resp);
                            }
                        }).catch(function() {});
                        break;
                    }
            }
        }
    }
    registerGuildPrefix(guildID, prefix) {
        if (!this.preReady) {
            this.guildPrefixes[guildID] = prefix;
        } else {
            if (Array.isArray(prefix)) {
                for (var i in prefix) {
                    prefix[i] = prefix[i].replace(/@mention/g, this.user.mention);
                }
                this.guildPrefixes[guildID] = prefix;
            } else {
                this.guildPrefixes[guildID] = prefix.replace(/@mention/g, this.user.mention);
            }
        }
    }
    checkPrefix(msg) {
        var prefixes = this.commandOptions.prefix;
        if (msg.channel.guild !== undefined && this.guildPrefixes[msg.channel.guild.id] !== undefined) {
            prefixes = this.guildPrefixes[msg.channel.guild.id];
        }
        if (typeof prefixes === "string") {
            return msg.content.replace(/<@!/g, "<@").startsWith(prefixes) && prefixes;
        } else if (Array.isArray(prefixes)) {
            return prefixes.find((prefix) => msg.content.replace(/<@!/g, "<@").startsWith(prefix));
        }
        throw new Error("Unsupported prefix format | " + prefixes);
    }
    registerCommandAlias(alias, label) {
        var caseInsensitiveLabel = false;
        if (!this.commands[label] && !(this.commands[(label = label.toLowerCase())] && (caseInsensitiveLabel = this.commands[label.toLowerCase()].caseInsensitive))) {
            throw new Error("No command registered for " + label);
        }
        alias = caseInsensitiveLabel === true ? alias.toLowerCase() : alias;
        if (this.commandAliases[alias]) {
            throw new Error(`Alias ${alias} already registered`);
        }
        this.commandAliases[alias] = label;
        this.commands[label].aliases.push(alias);
    }
    registerCommand(label, generator, options) {
        if (label.includes(" ")) {
            throw new Error("Command label may not have spaces");
        }
        var lowercaseCommand = label.toLowerCase();
        if (this.commands[label] || (this.commands[lowercaseCommand] && this.commands[lowercaseCommand].caseInsensitive)) {
            throw new Error("You have already registered a command for " + label);
        }
        // Aliases are not deleted when deleting commands
        var command = this.commandAliases[label]; // Just to make the following if statement less messy
        lowercaseCommand = this.commandAliases[label.toLowerCase()];
        if (this.commands[command] || (this.commands[lowercaseCommand] && this.commands[lowercaseCommand].caseInsensitive)) {
            throw new Error(`Alias ${label} already registered`);
        }
        options = options || {};
        options.defaultSubcommandOptions = options.defaultSubcommandOptions || {};
        for (var key in this.commandOptions.defaultCommandOptions) {
            if (options[key] === undefined) {
                options[key] = this.commandOptions.defaultCommandOptions[key];
                options.defaultSubcommandOptions[key] = this.commandOptions.defaultCommandOptions[key];
            }
        }
        label = options.caseInsensitive === true ? label.toLowerCase() : label;
        if (this.commands[label]) {
            throw new Error("You have already registered a command for " + label);
        }
        command = this.commandAliases[label];
        if (this.commands[command]) {
            throw new Error(`Alias ${command} already registered`);
        }
        if (options.aliases) {
            options.aliases.forEach((alias) => {
                lowercaseCommand = alias.toLowerCase();
                if (this.commands[alias] || (this.commands[lowercaseCommand] && this.commands[lowercaseCommand].caseInsensitive)) {
                    throw new Error("You have already registered a command for alias " + alias);
                }
                command = this.commandAliases[alias];
                lowercaseCommand = this.commandAliases[alias.toLowerCase()];
                if (this.commands[command] || (this.commands[lowercaseCommand] && this.commands[lowercaseCommand].caseInsensitive)) {
                    throw new Error(`Alias ${alias} already registered`);
                }
                alias = options.caseInsensitive === true ? alias.toLowerCase() : alias;
                if (this.commands[alias]) {
                    throw new Error("You have already registered a command for alias " + alias);
                }
                command = this.commandAliases[alias];
                if (this.commands[command]) {
                    throw new Error(`Alias ${alias} already registered`);
                }
                this.commandAliases[alias] = label;
            });
        }
        this.commands[label] = new Command(label, generator, options);
        return this.commands[label];
    }
    unregisterCommand(label) {
        var original = this.commandAliases[label];
        if (original) {
            this.commands[original].aliases.splice(this.commands[original].aliases.indexOf(label), 1);
            delete this.commandAliases[label];
        } else {
            delete this.commands[label];
        }
    }
    unwatchMessage(id, channelID) {
        delete this.activeMessages[id];
        if (channelID) {
            this.removeMessageReactions(channelID, id).catch(function() {});
        }
    }
}

module.exports = CommandClient;