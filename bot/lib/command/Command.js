"use strict";

class Command {
    constructor(label, generator, options, parentCommand) {
        this.parentCommand = parentCommand;
        this.label = label;
        this.description = options.description || "No description";
        this.fullDescription = options.fullDescription || "No full description";
        this.usage = options.usage || "";
        this.aliases = options.aliases || [];
        this.caseInsensitive = !!options.caseInsensitive;
        this.hooks = options.hooks || {};
        this.requirements = options.requirements || {};
        if (!this.requirements.userIDs) {
            this.requirements.userIDs = [];
        }
        if (!this.requirements.permissions) {
            this.requirements.permissions = {};
        }
        this.deleteCommand = !!options.deleteCommand;
        this.argsRequired = !!options.argsRequired;
        this.guildOnly = !!options.guildOnly;
        this.dmOnly = !!options.dmOnly;
        this.cooldown = options.cooldown || 0;
        this.cooldownExclusions = options.cooldownExclusions || {};
        if (!this.cooldownExclusions.userIDs) this.cooldownExclusions.userIDs = [];
        if (!this.cooldownExclusions.guildIDs) this.cooldownExclusions.guildIDs = [];
        if (!this.cooldownExclusions.channelIDs) this.cooldownExclusions.channelIDs = [];
        this.restartCooldown = !!options.restartCooldown;
        this.cooldownReturns = options.cooldownReturns || 0;
        this.cooldownMessage = options.cooldownMessage || false;
        this.invalidUsageMessage = options.invalidUsageMessage || false;
        this.permissionMessage = options.permissionMessage || false;
        this.errorMessage = options.errorMessage || "";
        this.reactionButtons = options.reactionButtons ? options.reactionButtons.map((button, index) => {
            if (typeof button.response === "string") {
                button.execute = () => button.response;
                return button;
            } else if (Array.isArray(button.response)) {
                button.responses = button.response.map((item, otherIndex) => {
                    if (typeof item === "string") {
                        return () => item;
                    } else if (typeof item === "function") {
                        return item;
                    } else {
                        throw new Error(`Invalid reaction button response generator (index ${index}:${otherIndex})`);
                    }
                });
                button.execute = () => button.responses[Math.floor(Math.random() * button.responses.length)]();
                return button;
            } else if (typeof button.response === "function") {
                button.execute = button.response;
                return button;
            } else if (button.type === "cancel") {
                return button;
            } else {
                throw new Error("Invalid reaction button response generator (index " + index + ")");
            }
        }) : null;
        this.reactionButtonTimeout = options.reactionButtonTimeout || 60000;
        if (this.cooldown !== 0) {
            this.usersOnCooldown = new Set();
            if (this.restartCooldown) {
                this.cooldownTimeouts = {};
            }
            if (this.cooldownReturns) {
                this.cooldownAmounts = {};
            }
        }
        if (typeof generator === "string") {
            this.response = generator;
            this.execute = () => this.response;
        } else if (Array.isArray(generator)) {
            this.responses = generator.map((item, index) => {
                if (typeof item === "string") {
                    return () => item;
                } else if (typeof item === "function") {
                    return item;
                } else {
                    throw new Error("Invalid command response generator (index " + index + ")");
                }
            });
            this.execute = () => this.responses[Math.floor(Math.random() * this.responses.length)]();
        } else if (typeof generator === "function") {
            this.execute = generator;
        } else {
            throw new Error("Invalid command response generator");
        }
        this.defaultSubcommandOptions = options.defaultSubcommandOptions || {};
        this.subcommands = {};
        this.subcommandAliases = {};
        this.hidden = !!options.hidden;
    }
    get fullLabel() {
        if (this.parentCommand) {
            return this.parentCommand.fullLabel + " " + this.label;
        } else {
            return this.label;
        }
    }
    permissionCheck(msg) {
        var req = false;
        if (this.requirements.custom && typeof this.requirements.custom === "function") {
            req = true;
            if (this.requirements.custom(msg)) {
                return true;
            }
        }
        if (typeof this.requirements.userIDs === "function") {
            req = true;
            if (~this.requirements.userIDs(msg).indexOf(msg.author.id)) {
                return true;
            }
        } else if (this.requirements.userIDs.length > 0) {
            req = true;
            if (~this.requirements.userIDs.indexOf(msg.author.id)) {
                return true;
            }
        }
        if (!msg.channel.guild) {
            return !this.guildOnly && !req;
        } else if (this.dmOnly) {
            return false;
        }
        var keys = typeof this.requirements.permissions === "function" ? Object.keys(this.requirements.permissions(msg)) : Object.keys(this.requirements.permissions);
        if (keys.length > 0) {
            req = true;
            var permissions = msg.channel.permissionsOf(msg.author.id).json;
            for (var key of keys) {
                if (this.requirements.permissions[key] !== permissions[key]) {
                    req = false;
                    break;
                }
            }
            if (req) {
                return true;
            }
            req = true;
        }
        if (msg.member) {
            var roles = msg.member.roles || [];
            if (this.requirements.roleIDs) {
                req = true;
                var requiredRoleIDs = this.requirements.roleIDs;
                if (typeof requiredRoleIDs === "function") {
                    requiredRoleIDs = this.requirements.roleIDs(msg);
                }
                for (var roleID of requiredRoleIDs) {
                    if (~roles.indexOf(roleID)) {
                        return true;
                    }
                }
            }
            if (this.requirements.roleNames) {
                req = true;
                roles = roles.map((roleID) => msg.channel.guild.roles.get(roleID).name);
                var requiredRoleNames = this.requirements.roleNames;
                if (typeof requiredRoleNames === "function") {
                    requiredRoleNames = this.requirements.roleNames(msg);
                }
                for (var roleName of requiredRoleNames) {
                    if (~roles.indexOf(roleName)) {
                        return true;
                    }
                }
            }
        }
        return !req;
    }
    cooldownExclusionCheck(msg) {
        if (this.cooldownExclusions.channelIDs.indexOf(msg.channel.id) > -1) {
            return true;
        }
        if (this.cooldownExclusions.userIDs.indexOf(msg.author.id) > -1) {
            return true;
        }
        if (msg.channel.guild && this.cooldownExclusions.guildIDs.indexOf(msg.channel.guild.id) > -1) {
            return true;
        }
        return false;
    }
    cooldownCheck(msg) {
        if (this.cooldownExclusionCheck(msg)) {
            return true;
        }
        var userID = msg.author.id;
        if (this.usersOnCooldown.has(userID)) {
            if (this.cooldownReturns) {
                this.cooldownAmounts[userID]++;
            }
            if (this.restartCooldown) {
                clearTimeout(this.cooldownTimeouts[userID]);
                this.cooldownTimeouts[userID] = setTimeout(() => {
                    this.usersOnCooldown.delete(userID);
                }, this.cooldown);
            }
            return false;
        }
        if (this.cooldownReturns) {
            this.cooldownAmounts[userID] = 0;
        }
        this.usersOnCooldown.add(userID);
        if (this.restartCooldown) {
            this.cooldownTimeouts[userID] = setTimeout(() => {
                this.usersOnCooldown.delete(userID);
            }, this.cooldown);
        } else {
            setTimeout(() => {
                this.usersOnCooldown.delete(userID);
            }, this.cooldown);
        }
        return true;
    }
    process(args, msg) {
        var shouldDelete = this.deleteCommand && msg.channel.guild && msg.channel.permissionsOf(msg._client.user.id).has("manageMessages");
        if (this.hooks.preCommand) {
            this.hooks.preCommand(msg, args);
        }
        var reply;
        if (!this.permissionCheck(msg)) {
            if (this.hooks.postCheck) {
                this.hooks.postCheck(msg, args, false);
            }
            if (shouldDelete) {
                msg.delete();
            }
            reply = typeof this.permissionMessage === "function" ? this.permissionMessage(msg) : this.permissionMessage;
            if (reply) {
                msg.channel.createMessage(reply);
            }
            return;
        }
        if (args.length === 0) {
            if (shouldDelete) {
                msg.delete();
            }
            if (this.argsRequired) {
                if (this.hooks.postCheck) {
                    this.hooks.postCheck(msg, args, false);
                }
                reply = typeof this.invalidUsageMessage === "function" ? this.invalidUsageMessage(msg) : this.invalidUsageMessage;
                if (reply) {
                    msg.channel.createMessage(reply.replace(/%prefix%/g, msg.prefix).replace(/%label%/g, this.fullLabel));
                }
                return;
            }
            if (this.cooldown !== 0 && !this.cooldownCheck(msg)) {
                if (this.hooks.postCheck) {
                    this.hooks.postCheck(msg, args, false);
                }
                if (this.cooldownMessage && (!this.cooldownReturns || this.cooldownAmounts[msg.author.id] <= this.cooldownReturns)) {
                    reply = typeof this.cooldownMessage === "function" ? this.cooldownMessage(msg) : this.cooldownMessage;
                    if (reply) {
                        msg.channel.createMessage(reply);
                    }
                }
                return;
            }
            return this.executeCommand(msg, args);
        }
        var label = this.subcommandAliases[args[0]] || args[0];
        var subcommand;
        if ((subcommand = this.subcommands[label]) !== undefined || ((subcommand = this.subcommands[label.toLowerCase()]) !== undefined && subcommand.caseInsensitive)) {
            msg.command = subcommand;
            return subcommand.process(args.slice(1), msg);
        } else {
            if (shouldDelete) {
                msg.delete();
            }
            if (this.cooldown !== 0 && !this.cooldownCheck(msg)) {
                if (this.hooks.postCheck) {
                    this.hooks.postCheck(msg, args, false);
                }
                if (this.cooldownMessage && (!this.cooldownReturns || this.cooldownAmounts[msg.author.id] <= this.cooldownReturns)) {
                    reply = typeof this.cooldownMessage === "function" ? this.cooldownMessage(msg) : this.cooldownMessage;
                    if (reply) {
                        msg.channel.createMessage(reply);
                    }
                }
                return;
            }
            return this.executeCommand(msg, args);
        }
    }
    executeCommand(msg, args) {
        if (this.hooks.postCheck) {
            this.hooks.postCheck(msg, args, true);
        }
        let ret = this.execute(msg, args);
        if (this.hooks.postExecution) {
            this.hooks.postExecution(msg, args, true);
        }
        return ret;
    }
    registerSubcommandAlias(alias, label) {
        if (!this.subcommands[label]) {
            throw new Error("No subcommand registered for " + label);
        }
        if (this.subcommandAliases[alias]) {
            throw new Error(`Alias ${label} already registered`);
        }
        this.subcommandAliases[alias] = label;
        this.subcommands[label].aliases.push(alias);
    }
    registerSubcommand(label, generator, options) {
        if (label.includes(" ")) {
            throw new Error("Subcommand label may not have spaces");
        }
        if (this.subcommands[label]) {
            throw new Error("You have already registered a subcommand for " + label);
        }
        options = options || {};
        options.defaultSubcommandOptions = options.defaultSubcommandOptions || {};
        for (var key in this.defaultSubcommandOptions) {
            if (options[key] === undefined) {
                options[key] = this.defaultSubcommandOptions[key];
                options.defaultSubcommandOptions[key] = this.defaultSubcommandOptions[key];
            }
        }
        label = options.caseInsensitive === true ? label.toLowerCase() : label;
        this.subcommands[label] = new Command(label, generator, options, this);
        if (options.aliases) {
            options.aliases.forEach((alias) => {
                this.subcommandAliases[alias] = label;
            });
        }
        return this.subcommands[label];
    }
    unregisterSubcommand(label) {
        var original = this.subcommandAliases[label];
        if (original) {
            this.subcommands[original].aliases.splice(this.subcommands[original].aliases.indexOf(label), 1);
            delete this.subcommandAliases[label];
        } else {
            delete this.subcommands[label];
        }
    }
}

module.exports = Command;