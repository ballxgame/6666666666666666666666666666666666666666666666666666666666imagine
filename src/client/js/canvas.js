var global = require('./lib/global');
class Canvas {
    constructor() {
        this.directionLock = !1,
        this.target = global.target,
        this.reenviar = !0,
        this.socket = global.socket,
        this.directions = [];
        var b = this;
        this.cv = document.getElementById('gameCanvas'),
        this.cv.width = global.screenWidth,
        this.cv.height = global.screenHeight,
        this.cv.addEventListener('mousemove', this.gameInput, !1),
        this.cv.addEventListener('keydown', this.keyboardDown, !1),
        this.cv.addEventListener('keyup', this.keyboardUp, !1),
        this.cv.addEventListener('mousedown', this.mouseDown, !1),
        this.cv.addEventListener('mouseup', this.mouseUp, !1),
        this.cv.parent = b,
        global.canvas = this;
    }
    keyboardDown(a) {
        switch (a.keyCode) {
            case 13:
                global.died && this.parent.socket.talk('s', global.playerName, 0), global.died = !1;
                break;
            case global.KEY_UP_ARROW:
            case global.KEY_UP:
                this.parent.socket.cmd.set(0, !0);
                break;
            case global.KEY_DOWN_ARROW:
            case global.KEY_DOWN:
                this.parent.socket.cmd.set(1, !0);
                break;
            case global.KEY_LEFT_ARROW:
            case global.KEY_LEFT:
                this.parent.socket.cmd.set(2, !0);
                break;
            case global.KEY_RIGHT_ARROW:
            case global.KEY_RIGHT:
                this.parent.socket.cmd.set(3, !0);
                break;
            case global.KEY_MOUSE_0:
                this.parent.socket.cmd.set(4, !0);
                break;
            case global.KEY_MOUSE_1:
                this.parent.socket.cmd.set(5, !0);
                break;
            case global.KEY_MOUSE_2:
                this.parent.socket.cmd.set(6, !0);
                break;
            case global.KEY_LEVEL_UP:
                this.parent.socket.talk('L');
                break;
        }
        if (!a.repeat) {
            switch (a.keyCode) {
                case global.KEY_AUTO_SPIN:
                    this.parent.socket.talk('t', 0);
                    break;
                case global.KEY_AUTO_FIRE:
                    this.parent.socket.talk('t', 1);
                    break;
                case global.KEY_OVER_RIDE:
                    this.parent.socket.talk('t', 2);
                    break;
                case global.KEY_SUICIDE:
                    this.parent.socket.talk('B', 1);
                    break;
                case global.KEY_DOMINATOR:
                    this.parent.socket.talk('B', 5);
                    break;
                case global.KEY_GODMODE:
                    this.parent.socket.talk('B', 4);
                    break;
                case global.KEY_DEV_TANK:
                    this.parent.socket.talk('B', 0);
                    break;
                case global.KEY_RESET_BASIC_TANK:
                    this.parent.socket.talk('B', 2);
                    break;
                case global.KEY_COLOR_CHANGE:
                    this.parent.socket.talk('B', 3);
                    break;
                
            }
            if (global.canSkill) switch (a.keyCode) {
                case global.KEY_UPGRADE_ATK:
                    this.parent.socket.talk('x', 0);
                    break;
                case global.KEY_UPGRADE_HTL:
                    this.parent.socket.talk('x', 1);
                    break;
                case global.KEY_UPGRADE_SPD:
                    this.parent.socket.talk('x', 2);
                    break;
                case global.KEY_UPGRADE_STR:
                    this.parent.socket.talk('x', 3);
                    break;
                case global.KEY_UPGRADE_PEN:
                    this.parent.socket.talk('x', 4);
                    break;
                case global.KEY_UPGRADE_DAM:
                    this.parent.socket.talk('x', 5);
                    break;
                case global.KEY_UPGRADE_RLD:
                    this.parent.socket.talk('x', 6);
                    break;
                case global.KEY_UPGRADE_MOB:
                    this.parent.socket.talk('x', 7);
                    break;
                case global.KEY_UPGRADE_RGN:
                    this.parent.socket.talk('x', 8);
                    break;
                case global.KEY_UPGRADE_SHI:
                    this.parent.socket.talk('x', 9);
            }
            if (global.canUpgrade) switch (a.keyCode) {
                case global.KEY_CHOOSE_1:
                    this.parent.socket.talk('U', 0);
                    break;
                case global.KEY_CHOOSE_2:
                    this.parent.socket.talk('U', 1);
                    break;
                case global.KEY_CHOOSE_3:
                    this.parent.socket.talk('U', 2);
                    break;
                case global.KEY_CHOOSE_4:
                    this.parent.socket.talk('U', 3);
                    break;
                case global.KEY_CHOOSE_5:
                    this.parent.socket.talk('U', 4);
                    break;
                case global.KEY_CHOOSE_6:
                    this.parent.socket.talk('U', 5);
                    break;
                case global.KEY_CHOOSE_7:
                    this.parent.socket.talk('U', 6);
                    break;
                case global.KEY_CHOOSE_8:
                    this.parent.socket.talk('U', 7);
            }
        }
    }
    keyboardUp(a) {
        switch (a.keyCode) {
            case global.KEY_UP_ARROW:
            case global.KEY_UP:
                this.parent.socket.cmd.set(0, !1);
                break;
            case global.KEY_DOWN_ARROW:
            case global.KEY_DOWN:
                this.parent.socket.cmd.set(1, !1);
                break;
            case global.KEY_LEFT_ARROW:
            case global.KEY_LEFT:
                this.parent.socket.cmd.set(2, !1);
                break;
            case global.KEY_RIGHT_ARROW:
            case global.KEY_RIGHT:
                this.parent.socket.cmd.set(3, !1);
                break;
            case global.KEY_MOUSE_0:
                this.parent.socket.cmd.set(4, !1);
                break;
            case global.KEY_MOUSE_1:
                this.parent.socket.cmd.set(5, !1);
                break;
            case global.KEY_MOUSE_2:
                this.parent.socket.cmd.set(6, !1);
        }
    }
    mouseDown(a) {
        switch (a.button) {
            case 0:
                let b = {
                        x: a.clientX,
                        y: a.clientY
                    },
                    c = global.clickables.stat.check(b);
                if (-1 !== c) this.parent.socket.talk('x', c);
                else if (-1 !== global.clickables.skipUpgrades.check(b)) global.clearUpgrades();
                else {
                    let d = global.clickables.upgrade.check(b); - 1 === d ? this.parent.socket.cmd.set(4, !0) : this.parent.socket.talk('U', d);
                }
                break;
            case 1:
                this.parent.socket.cmd.set(5, !0);
                break;
            case 2:
                this.parent.socket.cmd.set(6, !0);
        }
    }
    mouseUp(a) {
        switch (a.button) {
            case 0:
                this.parent.socket.cmd.set(4, !1);
                break;
            case 1:
                this.parent.socket.cmd.set(5, !1);
                break;
            case 2:
                this.parent.socket.cmd.set(6, !1);
        }
    }
    gameInput(a) {
        this.parent.target.x = a.clientX - this.width / 2, this.parent.target.y = a.clientY - this.height / 2, global.target = this.parent.target, global.statHover = 0 === global.clickables.hover.check({
            x: a.clientX,
            y: a.clientY
        });
    }
}
module.exports = Canvas;