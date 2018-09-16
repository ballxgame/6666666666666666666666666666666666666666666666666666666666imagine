/*global require, console, VERSION, localStorage, navigator*/
/*jshint -W097*/
/*jshint browser: true*/
'use strict';

var app = function(e) {
    var t = {};
    function r(a) {
        if (t[a]) return t[a].exports;
        var n = t[a] = {
            i: a,
            l: false,
            exports: {}
        };
        return e[a].call(n.exports, n, n.exports, r), n.l = true, n.exports;
    }
    return r.m = e, r.c = t,
    r.d = function(e, t, a) {
        r.o(e, t) || Object.defineProperty(e, t, {
            configurable: false,
            enumerable: true,
            get: a
        });
    },
    r.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: true
        });
    },
    r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(t, "a", t), t;
    },
    r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    },
    r.p = "",
    r(r.s = 4);
}([function(e, t, r) {
    "use strict";
    e.exports = {
        KEY_ESC: 27,
        KEY_ENTER: 13,
        KEY_CHAT: 13,
        KEY_FIREFOOD: 119,
        KEY_SPLIT: 32,
        KEY_LEFT: 65,
        KEY_UP: 87,
        KEY_RIGHT: 68,
        KEY_DOWN: 83,
        KEY_LEFT_ARROW: 37,
        KEY_UP_ARROW: 38,
        KEY_RIGHT_ARROW: 39,
        KEY_DOWN_ARROW: 40,
        KEY_AUTO_SPIN: 67,
        KEY_RESET_BASIC_TANK: 80,
        KEY_AUTO_FIRE: 69,
        KEY_OVER_RIDE: 82,
        KEY_UPGRADE_ATK: 49,
        KEY_UPGRADE_HTL: 50,
        KEY_UPGRADE_SPD: 51,
        KEY_UPGRADE_STR: 52,
        KEY_UPGRADE_PEN: 53,
        KEY_UPGRADE_DAM: 54,
        KEY_UPGRADE_RLD: 55,
        KEY_UPGRADE_MOB: 56,
        KEY_UPGRADE_RGN: 57,
        KEY_UPGRADE_SHI: 48,
        KEY_MOUSE_0: 32,
        KEY_MOUSE_1: 86,
        KEY_MOUSE_2: 16,
        KEY_CHOOSE_1: 89,
        KEY_CHOOSE_2: 72,
        KEY_CHOOSE_3: 85,
        KEY_CHOOSE_4: 74,
        KEY_CHOOSE_5: 73,
        KEY_CHOOSE_6: 75,
        KEY_CHOOSE_7: 79,
        KEY_CHOOSE_8: 76,
        KEY_LEVEL_UP: 78,
        KEY_DEV_TANK: 191,
        KEY_SUICIDE: 75,
        KEY_DOMINATOR: 72,
        KEY_COLOR_CHANGE: 77,
        KEY_GODMODE: 186,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        gameWidth: 0,
        gameHeight: 0,
        xoffset: -0,
        yoffset: -0,
        gameStart: false,
        disconnected: false,
        died: false,
        kicked: false,
        continuity: false,
        startPingTime: 0,
        toggleMassState: 0,
        backgroundColor: "#f2fbff",
        lineColor: "#000000"
    };
}, function(e, t, r) {
    "use strict";
    var a, n, i, o, l, s, c, d;
    t.encode = (a = new Uint8Array(1),
    n = new Uint16Array(1),
    i = new Uint8Array(n.buffer),
    o = new Uint32Array(1),
    l = new Uint8Array(o.buffer),
    s = new Float32Array(1),
    c = new Uint8Array(s.buffer),
    d = ((e, t) => {
        let r = "";
        switch (e) {
            case "RawUint8":
                return a[0] = t, String.fromCharCode(a[0]);
            case "RawUint16":
                return n[0] = t, String.fromCharCode(i[0], i[1]);
            case "Uint8":
                return a[0] = t, "0" + String.fromCharCode(a[0]);
            case "Uint16":
                return n[0] = t, "1" + String.fromCharCode(i[0], i[1]);
            case "Uint32":
                return o[0] = t, "2" + String.fromCharCode(l[0], l[1], l[2], l[3]);
            case "Sint8":
                return a[0] = -1 - t, "3" + String.fromCharCode(a[0]);
            case "Sint16":
                return n[0] = -1 - t, "4" + String.fromCharCode(i[0], i[1]);
            case "Sint32":
                return o[0] = -1 - t, "5" + String.fromCharCode(l[0], l[1], l[2], l[3]);
            case "Float32":
                return s[0] = t, "6" + String.fromCharCode(c[0], c[1], c[2], c[3]);
            case "String8":
                return "7" + d("RawUint16", t.length) + t;
            case "String16":
                for (let e = 0, a = t.length; e < a; e++) r += d("RawUint16", t.charCodeAt(e));
                return "8" + d("RawUint16", r.length) + r;
            default:
                throw new Error("Unknown encoding type!");
        }
    }),
    (e, t = false) => {
        let r = e.splice(0, 1)[0];
        if ("string" != typeof r) throw new Error("No identification code!");
        e.forEach(e => {
            r += d((e => {
                if ("string" == typeof e) {
                    for (var t = 0; t < e.length; t++)
                        if (e.charCodeAt(t) > 255) return "String16";
                    return "String8";
                }
                if ("boolean" == typeof e) return "Uint8";
                if ("number" != typeof e) throw new Error("Unencodable data type");
                if (e != Math.round(e)) return "Float32";
                if (e < 0) {
                    if (e >= -256) return "Sint8";
                    if (e >= -65535) return "Sint16";
                    if (e >= -4294967295) return "Sint32";
                } else {
                    if (e < 256) return "Uint8";
                    if (e < 65535) return "Uint16";
                    if (e < 4294967295) return "Uint32";
                }
                return "Float32";
            })(e), e);
        });
        let a = r.length,
            n = new ArrayBuffer(a),
            i = new Uint8Array(n);
        for (let e = 0; e < a; e++) i[e] = r.charCodeAt(e);
        return t && (console.log("OUTPUT: " + i),
            console.log("RAW OUTPUT: " + r),
            console.log("SIZE: " + a)), n;
    }),
    t.decode = (() => {
        var e = new Uint16Array(1),
            t = new Uint8Array(e.buffer),
            r = new Uint32Array(1),
            a = new Uint8Array(r.buffer),
            n = new Float32Array(1),
            i = new Uint8Array(n.buffer),
            o = (o, l, s) => {
                switch (l) {
                    case "Uint8":
                        return o.charCodeAt(s++);
                    case "Uint16":
                        for (let e = 0; e < 2; e++) t[e] = o.charCodeAt(s++);
                        return e[0];
                    case "Uint32":
                        for (let e = 0; e < 4; e++) a[e] = o.charCodeAt(s++);
                        return r[0];
                    case "Sint8":
                        return -1 - o.charCodeAt(s++);
                    case "Sint16":
                        for (let e = 0; e < 2; e++) t[e] = o.charCodeAt(s++);
                        return -1 - e[0];
                    case "Sint32":
                        for (let e = 0; e < 4; e++) a[e] = o.charCodeAt(s++);
                        return -1 - r[0];
                    case "Float32":
                        for (let e = 0; e < 4; e++) i[e] = o.charCodeAt(s++);
                        return n[0];
                    default:
                        throw new Error("Unknown decoding type!");
                }
            };
        return e => {
            try {
                let t = new Uint8Array(e),
                    r = "";
                for (let e = 0, a = t.length; e < a; e++) r += String.fromCharCode(t[e]);
                let a = 1,
                    n = [r.charAt(0)];
                for (; a < r.length;) switch (r[a++]) {
                    case "0":
                        n.push(o(r, "Uint8", a)), a++;
                        break;
                    case "1":
                        n.push(o(r, "Uint16", a)), a += 2;
                        break;
                    case "2":
                        n.push(o(r, "Uint32", a)), a += 4;
                        break;
                    case "3":
                        n.push(o(r, "Sint8", a)), a++;
                        break;
                    case "4":
                        n.push(o(r, "Sint16", a)), a += 2;
                        break;
                    case "5":
                        n.push(o(r, "Sint32", a)), a += 4;
                        break;
                    case "6":
                        n.push(o(r, "Float32", a)), a += 4;
                        break;
                    case "7":
                        {
                            let e = o(r, "Uint16", a);a += 2,
                            n.push(r.slice(a, a + e)),
                            a += e;
                        }
                        break;
                    case "8":
                        {
                            let e = o(r, "Uint16", a);a += 2;
                            let t = r.slice(a, a + e),
                                i = new Uint16Array(e / 2);
                            for (let r = 0; r < e; r += 2) i[r / 2] = o(t, "Uint16", r);n.push(String.fromCharCode.apply(null, i)),
                            a += e;
                        }
                        break;
                    default:
                        throw a = r.length, new Error("Unknown decoding command, decoding aborted!");
                }
                return n;
            } catch (e) {
                return console.log(e), -1;
            }
        };
    })();
},
function(e, t, r) {
    var a = r(0);
    e.exports = class {
        constructor(e) {
            this.directionLock = false,
            this.target = a.target,
            this.reenviar = true,
            this.socket = a.socket,
            this.directions = [],
            this.cv = document.getElementById("gameCanvas"),
            this.cv.width = a.screenWidth,
            this.cv.height = a.screenHeight,
            this.cv.addEventListener("mousemove", this.gameInput, false),
            this.cv.addEventListener("keydown", this.keyboardDown, false),
            this.cv.addEventListener("keyup", this.keyboardUp, false),
            this.cv.addEventListener("mousedown", this.mouseDown, false),
            this.cv.addEventListener("mouseup", this.mouseUp, false),
            this.cv.parent = this,
            a.canvas = this;
        }
        keyboardDown(e) {
            switch (e.keyCode) {
                case 13:
                    a.died && this.parent.socket.talk("s", a.playerName, 0), a.died = false;
                    break;
                case a.KEY_UP_ARROW:
                case a.KEY_UP:
                    this.parent.socket.cmd.set(0, true);
                    break;
                case a.KEY_DOWN_ARROW:
                case a.KEY_DOWN:
                    this.parent.socket.cmd.set(1, true);
                    break;
                case a.KEY_LEFT_ARROW:
                case a.KEY_LEFT:
                    this.parent.socket.cmd.set(2, true);
                    break;
                case a.KEY_RIGHT_ARROW:
                case a.KEY_RIGHT:
                    this.parent.socket.cmd.set(3, true);
                    break;
                case a.KEY_MOUSE_0:
                    this.parent.socket.cmd.set(4, true);
                    break;
                case a.KEY_MOUSE_1:
                    this.parent.socket.cmd.set(5, true);
                    break;
                case a.KEY_MOUSE_2:
                    this.parent.socket.cmd.set(6, true);
                    break;
                case a.KEY_LEVEL_UP:
                    this.parent.socket.talk("L");
                    break;
            }
            if (!e.repeat) {
                switch (e.keyCode) {
                    case a.KEY_AUTO_SPIN:
                        this.parent.socket.talk("t", 0);
                        break;
                    case a.KEY_AUTO_FIRE:
                        this.parent.socket.talk("t", 1);
                        break;
                    case a.KEY_OVER_RIDE:
                        this.parent.socket.talk("t", 2);
                        break;
                    case a.KEY_SUICIDE:
                        this.parent.socket.talk("B", 1);
                        break;
                    case a.KEY_DOMINATOR:
                        this.parent.socket.talk('B', 5);
                        break;
                    case a.KEY_GODMODE:
                        this.parent.socket.talk("B", 4);
                        break;
                    case a.KEY_DEV_TANK:
                        this.parent.socket.talk("B", 0);
                        break;
                    case a.KEY_RESET_BASIC_TANK:
                        this.parent.socket.talk("B", 2);
                        break;
                    case a.KEY_COLOR_CHANGE:
                        this.parent.socket.talk("B", 3);
                        break;
                }
                if (a.canSkill) switch (e.keyCode) {
                    case a.KEY_UPGRADE_ATK:
                        this.parent.socket.talk("x", 0);
                        break;
                    case a.KEY_UPGRADE_HTL:
                        this.parent.socket.talk("x", 1);
                        break;
                    case a.KEY_UPGRADE_SPD:
                        this.parent.socket.talk("x", 2);
                        break;
                    case a.KEY_UPGRADE_STR:
                        this.parent.socket.talk("x", 3);
                        break;
                    case a.KEY_UPGRADE_PEN:
                        this.parent.socket.talk("x", 4);
                        break;
                    case a.KEY_UPGRADE_DAM:
                        this.parent.socket.talk("x", 5);
                        break;
                    case a.KEY_UPGRADE_RLD:
                        this.parent.socket.talk("x", 6);
                        break;
                    case a.KEY_UPGRADE_MOB:
                        this.parent.socket.talk("x", 7);
                        break;
                    case a.KEY_UPGRADE_RGN:
                        this.parent.socket.talk("x", 8);
                        break;
                    case a.KEY_UPGRADE_SHI:
                        this.parent.socket.talk("x", 9);
                }
                if (a.canUpgrade) switch (e.keyCode) {
                    case a.KEY_CHOOSE_1:
                        this.parent.socket.talk("U", 0);
                        break;
                    case a.KEY_CHOOSE_2:
                        this.parent.socket.talk("U", 1);
                        break;
                    case a.KEY_CHOOSE_3:
                        this.parent.socket.talk("U", 2);
                        break;
                    case a.KEY_CHOOSE_4:
                        this.parent.socket.talk("U", 3);
                        break;
                    case a.KEY_CHOOSE_5:
                        this.parent.socket.talk("U", 4);
                        break;
                    case a.KEY_CHOOSE_6:
                        this.parent.socket.talk("U", 5);
                        break;
                    case a.KEY_CHOOSE_7:
                        this.parent.socket.talk("U", 6);
                        break;
                    case a.KEY_CHOOSE_8:
                        this.parent.socket.talk("U", 7);
                }
            }
        }
        keyboardUp(e) {
            switch (e.keyCode) {
                case a.KEY_UP_ARROW:
                case a.KEY_UP:
                    this.parent.socket.cmd.set(0, false);
                    break;
                case a.KEY_DOWN_ARROW:
                case a.KEY_DOWN:
                    this.parent.socket.cmd.set(1, false);
                    break;
                case a.KEY_LEFT_ARROW:
                case a.KEY_LEFT:
                    this.parent.socket.cmd.set(2, false);
                    break;
                case a.KEY_RIGHT_ARROW:
                case a.KEY_RIGHT:
                    this.parent.socket.cmd.set(3, false);
                    break;
                case a.KEY_MOUSE_0:
                    this.parent.socket.cmd.set(4, false);
                    break;
                case a.KEY_MOUSE_1:
                    this.parent.socket.cmd.set(5, false);
                    break;
                case a.KEY_MOUSE_2:
                    this.parent.socket.cmd.set(6, false);
            }
        }
        mouseDown(e) {
            switch (e.button) {
                case 0:
                    let t = {
                            x: e.clientX,
                            y: e.clientY
                        },
                        r = a.clickables.stat.check(t);
                    if (-1 !== r) this.parent.socket.talk("x", r);
                    else if (-1 !== a.clickables.skipUpgrades.check(t)) a.clearUpgrades();
                    else {
                        let e = a.clickables.upgrade.check(t); - 1 !== e ? this.parent.socket.talk("U", e) : this.parent.socket.cmd.set(4, true);
                    }
                    break;
                case 1:
                    this.parent.socket.cmd.set(5, true);
                    break;
                case 2:
                    this.parent.socket.cmd.set(6, true);
            }
        }
        mouseUp(e) {
            switch (e.button) {
                case 0:
                    this.parent.socket.cmd.set(4, false);
                    break;
                case 1:
                    this.parent.socket.cmd.set(5, false);
                    break;
                case 2:
                    this.parent.socket.cmd.set(6, false);
            }
        }
        gameInput(e) {
            this.parent.target.x = e.clientX - this.width / 2,
            this.parent.target.y = e.clientY - this.height / 2,
            a.target = this.parent.target,
            a.statHover = 0 === a.clickables.hover.check({
                x: e.clientX,
                y: e.clientY
            });
        }
    };
},
function(e, t) {
    t.submitToLocalStorage = (e => (
        localStorage.setItem(e + "Value", document.getElementById(e).value),
        localStorage.setItem(e + "Checked", document.getElementById(e).checked), false)),
        t.retrieveFromLocalStorage = (e => (document.getElementById(e).value = localStorage.getItem(e + "Value"),
        document.getElementById(e).checked = "true" === localStorage.getItem(e + "Checked"), false)),
        t.handleLargeNumber = ((e, t = false) => t && 0 == e ? "" :
            e < Math.pow(10, 3) ? "" + e.toFixed(0) : e < Math.pow(10, 6) ? (e / Math.pow(10, 3)).toFixed(2) + "k" :
            e < Math.pow(10, 9) ? (e / Math.pow(10, 6)).toFixed(2) + "m" : e < Math.pow(10, 12) ? (e / Math.pow(10, 9)).toFixed(2) + "b" :
            e < Math.pow(10, 15) ? (e / Math.pow(10, 12)).toFixed(2) + "t" : (e / Math.pow(10, 15)).toFixed(2) + "q"),
        t.timeForHumans = (e => {
        let t = e % 60;
        e /= 60;
        let r = (e = Math.floor(e)) % 60;
        e /= 60;
        let a = (e = Math.floor(e)) % 24;
        e /= 24;
        let n = "";
        function i(e, t) {
            e && (n = n + ("" === n ? "" : ", ") + e + " " + t + (e > 1 ? "s" : ""));
        }
        return i(e = Math.floor(e), "day"), i(a, "hour"), i(r, "minute"), i(t, "second"), "" === n && (n = "less than a second"), n;
    }),
    t.addArticle = (e => /[aeiouAEIOU]/.test(e[0]) ? "an " + e : "a " + e),
    t.formatLargeNumber = (e => e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
    t.pullJSON = (e => {
        let t = new XMLHttpRequest,
            r = "/json/" + e + ".json?v=" + VERSION;
        return console.log("Loading JSON from " + r), t.responseType = "json", new Promise((e, a) => {
            t.open("GET", r), t.onload = (() => {
                e(t.response), console.log("JSON load complete.");
            }), t.onerror = (() => {
                a(t.statusText), console.log("JSON load failed."), console.log(t.statusText);
            }), t.send();
        });
    });
},
function(e, t, r) {
    "use strict";
    var a = r(0),
        n = r(3),
        i = {
            graphical: {
                screenshotMode: false,
                borderChunk: 6,
                barChunk: 5,
                mininumBorderChunk: 3,
                deathBlurAmount: 3,
                darkBorders: false,
                fancyAnimations: true,
                colors: "normal",
                pointy: true,
                fontSizeBoost: 1,
                neon: false
            },
            gui: {
                expectedMaxSkillLevel: 9
            },
            lag: {
                unresponsive: false,
                memory: 60
            }
        },
        o = {};
    n.pullJSON("color").then(e => o = e);
    let l = (() => {
        function e(e) {
            return parseInt(e, 16);
        }
        return (t, r, a = .5) => {
            if (1 === a) return r;
            if (0 === a) return t;
            for (var n = "#", i = 1; i <= 6; i += 2) {
                for (var o = e(r.substr(i, 2)), l = e(t.substr(i, 2)), s = Math.floor(l + (o - l) * a).toString(16); s.length < 2;) s = "0" + s;
                n += s;
            }
            return n;
        };
    })();
    function s(e) {
        switch (e) {
            case 0:
                return o.teal;
            case 1:
                return o.lgreen;
            case 2:
                return o.orange;
            case 3:
                return o.yellow;
            case 4:
                return o.lavender;
            case 5:
                return o.pink;
            case 6:
                return o.vlgrey;
            case 7:
                return o.lgrey;
            case 8:
                return o.guiwhite;
            case 9:
                return o.black;
            case 10:
                return o.blue;
            case 11:
                return o.green;
            case 12:
                return o.red;
            case 13:
                return o.gold;
            case 14:
                return o.purple;
            case 15:
                return o.magenta;
            case 16:
                return o.grey;
            case 17:
                return o.dgrey;
            case 18:
                return o.white;
            case 19:
                return o.guiblack;
            case 20:
                return "#307A76";
            case 21:
                return "#47F51E";
            case 22:
                return "#7A42F4";
            case 23:
                return "#4DFAFF";
            case 24:
                return "#BF42F4";
            case 25:
                return "#F64200";
            case 26:
                return "#C90000";
            case 27:
                return "#6BF442";
            case 28:
                return "#E841F4";
            case 'rainbow':
                return '#' + Math.floor(Math.random() * 16777215).toString(16);
            default:
                return "#F00";
        }
    }
    function c(e) {
        let t = i.graphical.neon ? o.white : o.black;
        return i.graphical.darkBorders ? t : l(e, t, o.border);
    }
    function d(e, t) {
        switch (e) {
            case "bas1":
                return o.blue;
            case "bas2":
                return o.green;
            case "bas3":
                return o.red;
            case "bas4":
                return o.pink;
            case "n_b1":
                return o.blue;
            case "n_b2":
                return o.green;
            case "n_b3":
                return o.red;
            case "n_b4":
                return o.pink;
            case "nest":
                return t ? o.purple : o.lavender;
            case "dom1":
                return o.yellow;
            case "dom2":
                return o.yellow;
            case "dom3":
                return o.yellow;
            default:
                return t ? o.white : o.guiwhite;
        }
    }
    function h(e, t) {
        i.graphical.neon ? (e.fillStyle = c(t), e.strokeStyle = t) : (e.fillStyle = t, e.strokeStyle = c(t));
    }
    var u = [];
    function g(e, t = u[e].color) {
        let r = u[e];
        return {
            time: 0,
            index: e,
            x: r.x,
            y: r.y,
            vx: 0,
            vy: 0,
            size: r.size,
            realSize: r.realSize,
            color: t,
            render: {
                status: {
                    getFade: () => 1,
                    getColor: () => "#FFFFFF",
                    getBlend: () => 0,
                    health: {
                        get: () => 1
                    },
                    shield: {
                        get: () => 1
                    }
                }
            },
            facing: r.facing,
            shape: r.shape,
            name: r.name,
            score: 0,
            tiggle: 0,
            layer: r.layer,
            guns: {
                length: r.guns.length,
                getPositions: () => {
                    let e = [];
                    return r.guns.forEach(() => e.push(0)), e;
                },
                update: () => {}
            },
            turrets: r.turrets.map(e => {
                let t = g(e.index);
                return t.realSize = t.realSize / t.size * r.size * e.sizeFactor,
                    t.size = r.size * e.sizeFactor,
                    t.angle = e.angle,
                    t.offset = e.offset,
                    t.direction = e.direction,
                    t.facing = e.direction + e.angle, t;
            })
        };
    }
    n.pullJSON("mockups").then(e => u = e), a.clickables = (() => {
        let e = (() => {
            function e() {
                let e = {
                        x: 0,
                        y: 0,
                        w: 0,
                        h: 0
                    },
                    t = false;
                return {
                    set: (r, a, n, i) => {
                        e.x = r, e.y = a, e.w = n, e.h = i, t = true;
                    },
                    check: r => {
                        let a = Math.round(r.x - e.x),
                            n = Math.round(r.y - e.y);
                        return t && a >= 0 && n >= 0 && a <= e.w && n <= e.h;
                    },
                    hide: () => {
                        t = false;
                    }
                };
            }
            return t => {
                let r = [];
                for (let a = 0; a < t; a++) r.push(e());
                return {
                    place: (e, ...t) => {
                        if (e >= r.length) throw console.log(e), console.log(r), new Error("Trying to reference a clickable outside a region!");
                        r[e].set(...t);
                    },
                    hide: () => {
                        r.forEach(e => e.hide());
                    },
                    check: e => r.findIndex(t => t.check(e))
                };
            };
        })();
        return {
            stat: e(10),
            upgrade: e(8),
            hover: e(1),
            skipUpgrades: e(1)
        };
    })(),
    a.statHover = false,
    a.upgradeHover = false;
    var p = [],
        m = [],
        f = 0,
        k = [],
        w = {
            latency: 0,
            lag: 0,
            rendertime: 0,
            updatetime: 0,
            lastlag: 0,
            lastrender: 0,
            rendergap: 0,
            lastuplink: 0
        },
        y = 0,
        b = 0,
        x = 0,
        E = {
            x: (F = {
                id: -1,
                x: a.screenWidth / 2,
                y: a.screenHeight / 2,
                vx: 0,
                vy: 0,
                renderx: a.screenWidth / 2,
                rendery: a.screenHeight / 2,
                renderv: 1,
                slip: 0,
                view: 1,
                time: 0,
                screenWidth: a.screenWidth,
                screenHeight: a.screenHeight,
                target: {
                    x: a.screenWidth / 2,
                    y: a.screenHeight / 2
                }
            }).x,
            y: F.y
        },
        S = [
            ["norm"]
        ],
        v = {
            getStatNames: e => {
                switch (e) {
                    case 1:
                        return ["Body Damage", "Max Health", "Bullet Speed", "Bullet Health", "Bullet Penetration", "Bullet Damage", "Engine Acceleration", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 2:
                        return ["Body Damage", "Max Health", "Drone Speed", "Drone Health", "Drone Penetration", "Drone Damage", "Respawn Rate", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 3:
                        return ["Body Damage", "Max Health", "Drone Speed", "Drone Health", "Drone Penetration", "Drone Damage", "Max Drone Count", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 4:
                        return ["Body Damage", "Max Health", "Swarm Speed", "Swarm Health", "Swarm Penetration", "Swarm Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 5:
                        return ["Body Damage", "Max Health", "Placement Speed", "Trap Health", "Trap Penetration", "Trap Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    case 6:
                        return ["Body Damage", "Max Health", "Weapon Speed", "Weapon Health", "Weapon Penetration", "Weapon Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                    default:
                        return ["Body Damage", "Max Health", "Bullet Speed", "Bullet Health", "Bullet Penetration", "Bullet Damage", "Reload", "Movement Speed", "Shield Regeneration", "Shield Capacity"];
                }
            },
            skills: [{
                amount: 0,
                color: "purple",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "pink",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "blue",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "lgreen",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "red",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "yellow",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "green",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "teal",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "gold",
                cap: 1,
                softcap: 1
            }, {
                amount: 0,
                color: "orange",
                cap: 1,
                softcap: 1
            }],
            points: 0,
            upgrades: [],
            playerid: -1,
            __s: (() => {
                let e = 0,
                    t = 0,
                    r = 0,
                    a = H(0, 10);
                return {
                    setScore: e => {
                        e ? (a.set(e), t > a.get() && (r = 0, t = 0)) : (a = H(0, 10), r = 0);
                    },
                    update: () => {
                        e = Math.ceil(1.8 * Math.pow(r + 1, 1.8) - 2 * r + 1), a.get() - t >= e && (t += e, r += 1);
                    },
                    getProgress: () => e ? Math.min(1, Math.max(0, (a.get() - t) / e)) : 0,
                    getScore: () => a.get(),
                    getLevel: () => r
                };
            })(),
            type: 0,
            fps: 0,
            color: 0,
            accel: 0,
            topspeed: 1
        };
    a.clearUpgrades = (() => {
        v.upgrades = [];
    });
    var M = (() => {
            let e = {};
            return {
                get: () => {
                    let t = [],
                        r = 1;
                    for (let a in e) {
                        if (!e.hasOwnProperty(a)) continue;
                        let n = e[a].publish();
                        t.push(n), n.score > r && (r = n.score);
                    }
                    return t.sort((e, t) => t.score - e.score), {
                        data: t,
                        max: r
                    };
                },
                remove: t => {
                    if (void 0 === e["_" + t]) return console.log("Warning: Asked to removed an unknown leaderboard entry."), -1;
                    delete e["_" + t];
                },
                add: t => {
                    let r = function(e = "", t = 0, r = 0) {
                        let a = 0,
                            n = H(0, 10);
                        return {
                            update: (e, t) => {
                                a = e, n.set(t);
                            },
                            publish: () => {
                                let i = u[a];
                                return {
                                    image: g(a, r),
                                    position: i.position,
                                    barcolor: s(t),
                                    label: "" === e ? i.name : e + " - " + i.name,
                                    score: n.get()
                                };
                            }
                        };
                    }(t.name, t.barcolor, t.color);
                    r.update(t.index, t.score), e["_" + t.id] = r;
                },
                update: t => {
                    if (void 0 === e["_" + t.id]) return console.log("Warning: Asked to update an unknown leaderboard entry."), -1;
                    e["_" + t.id].update(t.index, t.score);
                },
                purge: () => {
                    e = {};
                }
            };
        })(),
        _ = () => Math.max(a.screenWidth / F.renderv, a.screenHeight / F.renderv / 9 * 16);
    a.target = E,
    a.player = F,
    a.canUpgrade = false,
    a.canSkill = false,
    a.message = "",
    a.time = 0,
    a.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var U = "Unknown Server";
    window.onload = (() => {
        U = "US Cloud9:8082";
        document.getElementById("serverName").innerHTML = '<h4 class="nopadding">' + U + "</h4>",
        n.retrieveFromLocalStorage("playerNameInput"),
        n.retrieveFromLocalStorage("playerKeyInput"),
        n.retrieveFromLocalStorage("optScreenshotMode"),
        n.retrieveFromLocalStorage("optPredictive"),
        n.retrieveFromLocalStorage("optFancy"),
        n.retrieveFromLocalStorage("optColors"),
        n.retrieveFromLocalStorage("optNoPointy"),
        n.retrieveFromLocalStorage("optBorders"),
        "" === document.getElementById("optColors").value && (document.getElementById("optColors").value = "normal"),
        "" === document.getElementById("optBorders").value && (document.getElementById("optBorders").value = "normal"),
        document.getElementById("startButton").onclick = (() => N()),
        document.onkeydown = (e => {
            (e.which || e.keyCode) !== a.KEY_ENTER || !a.dead && a.gameStart || N();
        }),
        window.addEventListener("resize", () => {
            F.screenWidth = C.width = a.screenWidth = window.innerWidth,
            F.screenHeight = C.height = a.screenHeight = window.innerHeight;
        });
    });
    var A = r(2);
    window.canvas = new A;
    var C = window.canvas.cv,
        K = C.getContext("2d"),
        W = document.createElement("canvas").getContext("2d");
    function H(e, t, r = 3) {
        let a = Date.now(),
            n = e,
            i = e;
        return {
            set: t => {
                e !== t && (i = n, e = t, a = Date.now());
            },
            get: () => {
                let o = (Date.now() - a) / 1e3;
                return n = o < t ? i + (e - i) * Math.pow(o / t, 1 / r) : e;
            }
        };
    }
    W.imageSmoothingEnabled = false;
    var R = [],
        P = 0,
        O = 0,
        I = (() => {
            let e = [];
            return {
                get: () => {
                    return e.length ? e.reduce(function(e, t) {
                        return e + t;
                    }) / e.length : 0;
                },
                add: t => {
                    e.push(t), e.length > i.lag.memory && e.splice(0, 1);
                }
            };
        })(),
        Y = () => Date.now() - P - O,
        F = {
            vx: 0,
            vy: 0,
            lastvx: 0,
            lastvy: 0,
            renderx: F.x,
            rendery: F.y,
            lastx: F.x,
            lasty: F.y,
            target: window.canvas.target,
            name: "",
            lastUpdate: 0,
            time: 0
        },
        D = (() => {
            let e = 0,
                t = 0,
                r = 0,
                n = 0;
            return {
                reset: () => {
                    e = 0, t = 0;
                },
                get: () => i.lag.unresponsive ? {
                    x: 0,
                    y: 0
                } : {
                    x: e,
                    y: t
                },
                iterate: i => {
                    if (a.died || a.gameStart) return 0;
                    let o = v.accel / v.topSpeed,
                        l = Math.sqrt(i.x * i.x + i.y * i.y);
                    r += v.accel * i.x / l, n += v.accel * i.y / l;
                    let s = Math.sqrt(r * r + n * n);
                    if (s > 0 && o) {
                        let e = s / (o / 0 + 1);
                        r = e * r / s, n = e * n / s;
                    }
                    e += r, t += n;
                }
            };
        })();
    const T = (() => {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        const e = r(1),
            t = (() => {
                const e = (() => {
                    let e = 0,
                        t = [];
                    return {
                        next: () => {
                            if (e >= t.length) throw console.log(t), new Error("Trying to crawl past the end of the provided data!");
                            return t[e++];
                        },
                        set: r => {
                            t = r, e = 0;
                        }
                    };
                })();
                return {
                    begin: t => e.set(t),
                    data: (() => {
                        const t = (() => {
                            const r = (() => {
                                function e(e) {
                                    e.isUpdated = true, (e.motion || e.position) && (e.motion -= .2 * e.position, e.position += e.motion,
                                    e.position < 0 && (e.position = 0, e.motion = -e.motion), e.motion > 0 && (e.motion *= .5));
                                }
                                return t => {
                                    let r = [];
                                    for (let e = 0; e < t; e++) r.push({
                                        motion: 0,
                                        position: 0,
                                        isUpdated: true
                                    });
                                    return {
                                        getPositions: () => r.map(e => e.position),
                                        update: () => r.forEach(e),
                                        fire: (e, t) => {
                                            r[e].isUpdated && (r[e].motion += Math.sqrt(t) / 20), r[e].isUpdated = false;
                                        },
                                        length: r.length
                                    };
                                };
                            })();
                            return (a = {}) => {
                                let n = null == a.facing,
                                    o = e.next();
                                if (1 & o) a.facing = e.next(), a.layer = e.next();
                                else {
                                    a.interval = w.rendergap, a.id = e.next();
                                    let t = p.findIndex(e => e.id === a.id);
                                    if (-1 !== t && (a = p.splice(t, 1)[0]),
                                        (n = -1 === t) || (
                                            a.render.draws = true,
                                            a.render.lastx = a.x,
                                            a.render.lasty = a.y,
                                            a.render.lastvx = a.vx,
                                            a.render.lastvy = a.vy,
                                            a.render.lastf = a.facing,
                                            a.render.lastRender = F.time
                                        ),
                                        a.index = e.next(),
                                        a.x = e.next(),
                                        a.y = e.next(),
                                        a.vx = e.next(),
                                        a.vy = e.next(),
                                        a.size = e.next(),
                                        a.facing = e.next(),
                                        a.vfacing = e.next(),
                                        a.twiggle = e.next(),
                                        a.layer = e.next(),
                                        a.color = e.next(), n
                                    )
                                    a.health = e.next() / 255,
                                    a.shield = e.next() / 255;
                                    else {
                                        let t = a.health,
                                            r = a.shield;
                                        a.health = e.next() / 255,
                                        a.shield = e.next() / 255,
                                        a.health < t || a.shield < r ? a.render.status.set("injured") :
                                            1 !== a.render.status.getFade() && a.render.status.set("normal");
                                    }
                                    a.drawsHealth = !!(2 & o),
                                    4 & o && (a.name = e.next(),
                                    a.score = e.next()),
                                    a.nameplate = 4 & o,
                                    n && (a.render = {
                                        draws: false,
                                        expandsWithDeath: a.drawsHealth,
                                        lastRender: F.time,
                                        x: a.x,
                                        y: a.y,
                                        lastx: a.x - w.rendergap * i.roomSpeed * (1e3 / 30) * a.vx,
                                        lasty: a.y - w.rendergap * i.roomSpeed * (1e3 / 30) * a.vy,
                                        lastvx: a.vx,
                                        lastvy: a.vy,
                                        lastf: a.facing,
                                        f: a.facing,
                                        h: a.health,
                                        s: a.shield,
                                        interval: w.rendergap,
                                        slip: 0,
                                        status: function() {
                                            let e = "normal",
                                                t = Y();
                                            return {
                                                set: r => {
                                                    r === e && "injured" !== e || ("dying" !== e && (t = Y()), e = r);
                                                },
                                                getFade: () => "dying" === e || "killed" === e ? 1 - Math.min(1, (Y() - t) / 300) : 1,
                                                getColor: () => "#FFFFFF",
                                                getBlend: () => {
                                                    let r = "normal" === e || "dying" === e ? 0 : 1 - Math.min(1, (Y() - t) / 80);
                                                    return Y() - t > 500 && "injured" === e && (e = "normal"), r;
                                                }
                                            };
                                        }(),
                                        health: H(a.health, .5, 5),
                                        shield: H(a.shield, .5, 5)
                                    }),
                                    a.render.health.set(a.health),
                                    a.render.shield.set(a.shield),
                                    n || a.oldIndex === a.index || (n = true),
                                    a.oldIndex = a.index;
                                }
                                let l = e.next();
                                if (n) a.guns = r(l);
                                else if (l !== a.guns.length) throw new Error("Mismatch between data gun number and remembered gun number!");
                                for (let t = 0; t < l; t++) {
                                    let r = e.next(),
                                        n = e.next();
                                    r > F.lastUpdate - w.rendergap && a.guns.fire(t, n);
                                }
                                let s = e.next();
                                if (s) {}
                                if (n) {
                                    a.turrets = [];
                                    for (let e = 0; e < s; e++) a.turrets.push(t());
                                } else {
                                    if (a.turrets.length !== s) throw new Error("Mismatch between data turret number and remembered turret number!");
                                    a.turrets.forEach(e => {
                                        e = t(e);
                                    });
                                }
                                return a;
                            };
                        })();
                        return () => {
                            let r = [];
                            for (let a = 0, n = e.next(); a < n; a++) r.push(t());
                            p.forEach(e => {
                                e.render.status.set(1 === e.health ? "dying" : "killed"),
                                0 !== e.render.status.getFade() && function(e, t, r, n = false) {
                                    let o = _();
                                    return r += i.graphical.borderChunk, n ?
                                        (o *= 2, e > -a.screenWidth / o - r && e < a.screenWidth / o + r &&
                                        t > -a.screenHeight / o - r && t < a.screenHeight / o + r) : e > -r &&
                                        e < a.screenWidth / o + r && t > -r && t < a.screenHeight / o + r;
                                }(
                                    e.render.x - F.renderx,
                                    e.render.y - F.rendery,
                                    e.size, true) ? r.push(e) :
                                    null != e.render.textobjs && e.render.textobjs.forEach(e => e.remove()
                                );
                            }), (p = r).sort((e, t) => {
                                let r = e.layer - t.layer;
                                if (r || (r = t.id - e.id), !r) throw new Error("The fuck is wrong now?");
                                return r;
                            });
                        };
                    })(),
                    gui: () => {
                        let t = e.next(),
                            r = 256 & t,
                            a = 128 & t,
                            n = 64 & t,
                            i = 32 & t,
                            o = 16 & t,
                            l = 8 & t,
                            s = 4 & t,
                            c = 2 & t;
                        if (1 & t && (v.fps = e.next()),
                            c && (v.type = e.next(),
                            v.color = e.next(),
                            v.playerid = e.next()),
                            s && v.__s.setScore(e.next()),
                            l && (v.points = e.next()), o) {
                            v.upgrades = [];
                            for (let t = 0, r = e.next(); t < r; t++) v.upgrades.push(e.next());
                        }
                        if (i) for (let t = 9; t >= 0; t--) v.skills[t].name = e.next(), v.skills[t].cap = e.next(), v.skills[t].softcap = e.next();
                        if (n) {
                            let t = parseInt(e.next(), 36).toString(16);
                            t = "0000000000".substr(t.length) + t,
                            v.skills[0].amount = parseInt(t.slice(0, 1), 16),
                            v.skills[1].amount = parseInt(t.slice(1, 2), 16),
                            v.skills[2].amount = parseInt(t.slice(2, 3), 16),
                            v.skills[3].amount = parseInt(t.slice(3, 4), 16),
                            v.skills[4].amount = parseInt(t.slice(4, 5), 16),
                            v.skills[5].amount = parseInt(t.slice(5, 6), 16),
                            v.skills[6].amount = parseInt(t.slice(6, 7), 16),
                            v.skills[7].amount = parseInt(t.slice(7, 8), 16),
                            v.skills[8].amount = parseInt(t.slice(8, 9), 16),
                            v.skills[9].amount = parseInt(t.slice(9, 10), 16);
                        }
                        a && (v.accel = e.next()),
                        r && (v.topspeed = e.next());
                    },
                    minimap: (() => {
                        let t = (() => {
                            return () => {
                                let t = e.next(),
                                    r = e.next() * a.gameWidth / 255,
                                    n = e.next() * a.gameHeight / 255,
                                    i = e.next();
                                switch (t) {
                                    case -1:
                                        {
                                            let e = m.findIndex(e => (B = e, L = [r, n, i], B[0] === L[0] && B[1] === L[1] &&
                                                B[2] === L[2])); - 1 === e ? console.log("Warning: Remove request for a minimap node we were not aware of.") :
                                                m.splice(e, 1);
                                        }
                                        break;
                                    case 1:
                                        m.push([r, n, i]);
                                        break;
                                    default:
                                        console.log("Unknown minimap update request.");
                                }
                            };
                        })();
                        return () => {
                            for (let r = 0, a = e.next(); r < a; r++) t();
                        };
                    })(),
                    leaderboard: () => {
                        let t = false,
                            r = e.next();
                        if (-1 === r) M.purge();
                        else for (let t = 0, a = r; t < a; t++) M.remove(e.next());
                        for (let r = 0, a = e.next(); r < a; r++) {
                            let r = e.next();
                            if (r < 0) {
                                let t = {
                                    id: -r,
                                    score: e.next(),
                                    index: e.next(),
                                    name: e.next(),
                                    color: e.next(),
                                    barcolor: e.next()
                                };
                                M.add(t);
                            } else {
                                -1 === M.update({
                                    id: r,
                                    score: e.next(),
                                    index: e.next()
                                }) && (t = true);
                            }
                        }
                        return t;
                    }
                };
            })();
        return r => {
            let n = new WebSocket("ws://arras-io-agarian.c9users.io:8082");
            window['help'] = function help() {
                console.log('Here is a list of commands and their usages:');
                console.log('- broadcast("message")');
                console.log('- setColor(colorID)');
                console.log('- setSkill(amount)');
                console.log('- setScore(value)');
                console.log('- setSize(value)');
                console.log('- setTank(exportName)');
                console.log('- setStat("statName", value)');
                console.log('- spawnEntity("exportName", x, y, team)');
                console.log('NOTE: All of the above commands require having a beta-tester token to use!');
            };
            window['broadcast'] = function broadcast(msg) {
                n.talk('D', 0, msg);
                console.log('Broadcasting your message to all players.');
            };
            window['setColor'] = function setColor(id) {
                if (!id) return console.log('Please specify a valid color ID! Note that IDs 0-30 are colors.');
                n.talk('D', 1, id);
                console.log('Changed your color ID to ' + id + '.');
            };
            window['setSkill'] = function setSkill(val) {
                if (isNaN(val) || val < 0 || val > 90)
                    return console.log("Please specify a valid amount of stats! Note that the amount can't be below 0 or above 90.");
                n.talk('D', 2, val);
                console.log('Set your amount of skill points to ' + val + '.');
            };
            window['setScore'] = function setScore(val) {
                if (isNaN(val) || val < 0 || val > 1e23)
                    return console.log("Please specify a valid score!");
                n.talk('D', 3, val);
                console.log('Set your score to ' + val + '.');
            };
            window['setSize'] = function setSize(val) {
                if (isNaN(val) || val < 0 || val > 1e4)
                    return console.log("Please specify a valid size value!");
                n.talk('D', 4, val);
                console.log('Set your size to ' + val + '.');
            };
            window['setTank'] = function setSize(tank) {
                if (!tank || !isNaN(tank)) return console.log("Please specify a valid tank!");
                n.talk('D', 5, tank);
                console.log('Set your tank to ' + tank + '.');
            };
            window['setStat'] = function setStat(stat, value) {
                if (stat != 'weapon_speed' &&
                    stat != 'weapon_reload' &&
                    stat != 'move_speed' &&
                    stat != 'max_health' &&
                    stat != 'body_damage' &&
                    stat != 'names'
                ) return console.log('Invalid stat name! Input setStat("names") for a list of changeable stats.');
                if (stat == 'names') return console.log("Stat Names: weapon_speed, weapon_reload, move_speed, max_health, body_damage."), value = 0;
                if (isNaN(value) || value < 0) return console.log('Please specify a valid value for this stat!');
                n.talk('D', 6, stat, value);
                console.log('Set ' + stat + ' to ' + value + '.');
            };
            window['spawnEntity'] = function spawnEntity(ent, x, y, team) {
                if (!ent || !isNaN(ent)) return console.log("Please specify a valid entity!");
                if (!x || !y || (isNaN(x) && x !== 'me' || isNaN(y) && y !== 'me')) return console.log("Please specify a valid (X,Y) position!");
                if (!team || (isNaN(team) && team !== 'me')) return console.log("Please specify a valid team!");
                n.talk('D', 7, ent, x, y, team);
                console.log('Spawned ' + ent + ' at (' + x + ', ' + y + ') with the team ID ' + team + '.');
            };
            return n.binaryType = "arraybuffer", n.open = false, n.cmd = (() => {
                let e = false,
                    t = [false, false, false, false, false, false, false, false];
                return {
                    set: (r, a) => {
                        t[r] !== a && (t[r] = a, e = true);
                    },
                    talk: () => {
                        e = false;
                        let r = 0;
                        for (let e = 0; e < 8; e++) t[e] && (r += Math.pow(2, e));
                        let a = _();
                        n.talk("C", Math.round(window.canvas.target.x / a),
                            Math.round(window.canvas.target.y / a), r);
                    },
                    check: () => e,
                    getMotion: () => ({
                        x: t[3] - t[2],
                        y: t[1] - t[0]
                    })
                };
            })(),
            n.talk = ((...t) => {
                if (!n.open) return 1;
                n.send(e.encode(t));
            }),
            n.onopen = function() {
                n.open = true,
                a.message = "That token is invalid, expired, or already in use on this server. Please try another one!",
                n.talk("k", a.playerKey), console.log("Token submitted to the server for validation."),
                n.ping = (e => {
                    n.talk("p", e);
                }),
                n.commandCycle = setInterval(() => {
                    n.cmd.check() && n.cmd.talk();
                });
            },
            n.onmessage = function(r) {
                let o = e.decode(r.data);
                if (-1 === o) throw new Error("Malformed packet!");
                switch (o.splice(0, 1)[0]) {
                    case "w":
                        o[0] && (console.log("The server has welcomed us to the game room, sending spawn request."),
                            n.talk("s", a.playerName, 1), a.message = "");
                        break;
                    case "R":
                        a.gameWidth = o[0],
                        a.gameHeight = o[1],
                        S = JSON.parse(o[2]),
                        O = JSON.parse(o[3]),
                        i.roomSpeed = o[4],
                        console.log("Room data recieved. Commencing syncing process."),
                        n.talk("S", Y());
                        break;
                    case "c":
                        F.renderx = F.x = o[0],
                        F.rendery = F.y = o[1],
                        F.renderv = F.view = o[2],
                        console.log("Camera moved!");
                        break;
                    case "S":
                        {
                            let e = o[0],
                                t = o[1],
                                r = (Y() - e) / 2,
                                i = Y() - r - t;
                            if (R.push({
                                    delta: i,
                                    latency: r
                                }), R.length < 10) setTimeout(() => {
                                n.talk("S", Y());
                            }, 10),
                            a.message = "Syncing clocks, please do not tab away! " + R.length + "/10...";
                            else {
                                R.sort((e, t) => e.latency - t.latency);
                                let e = R[Math.floor(R.length / 2)].latency,
                                    t = 0,
                                    r = 0,
                                    n = 0;
                                R.forEach(r => {
                                    t += Math.pow(r.latency - e, 2);
                                }),
                                t = Math.sqrt(t / R.length),
                                R.forEach(a => {
                                    Math.abs(a.latency - e) < t && (r += a.delta, n++);
                                }),
                                P = Math.round(r / n),
                                console.log(R),
                                console.log("Syncing complete, calculated clock difference " + P + "ms. Beginning game."),
                                a.gameStart = true,
                                a.message = "";
                            }
                        }
                        break;
                    case "m":
                        k.push({
                            text: o[0],
                            status: 2,
                            alpha: 0,
                            time: Date.now()
                        });
                        break;
                    case "u":
                        {
                            let e = o[0],
                                r = o[1],
                                i = o[2],
                                l = o[3],
                                s = o[4],
                                c = o[5],
                                d = o.slice(6);e > F.lastUpdate ? (
                                    I.add(Y() - e),
                                    F.time = e + I.get(),
                                    w.rendergap = e - F.lastUpdate,
                                    w.rendergap <= 0 && console.log("yo some bullshit is up wtf"),
                                    F.lastUpdate = e,
                                    t.begin(d),
                                    t.gui(),
                                    t.data(),
                                    F.lastx = F.x,
                                    F.lasty = F.y,
                                    F.lastvx = F.vx,
                                    F.lastvy = F.vy,
                                    F.x = r,
                                    F.y = i,
                                    F.vx = a.died ? 0 : s,
                                    F.vy = a.died ? 0 : c,
                                    isNaN(F.renderx) && (F.renderx = F.x),
                                    isNaN(F.rendery) && (F.rendery = F.y),
                                    D.reset(),
                                    F.view = l,
                                    (isNaN(F.renderv) || 0 === F.renderv) && (F.renderv = 2e3),
                                    w.lastlag = w.lag,
                                    w.lastuplink = Y()
                                ) : console.log("Old data! Last given time: " + F.time + "; offered packet timestamp: " + e + "."),
                            n.talk("d", Math.max(F.lastUpdate, e)),
                            n.cmd.talk(),
                            x++;
                        }
                        break;
                    case "b":
                        t.begin(o),
                        t.minimap(),
                        t.leaderboard() && n.talk("z");
                        break;
                    case "p":
                        w.latency = a.time - o[0];
                        break;
                    case "F":
                        a.finalScore = H(0, 4),
                        a.finalScore.set(o[0]),
                        a.finalLifetime = H(0, 5),
                        a.finalLifetime.set(o[1]),
                        a.finalKills = [H(0, 3), H(0, 4.5), H(0, 2.5)],
                        a.finalKills[0].set(o[2]),
                        a.finalKills[1].set(o[3]),
                        a.finalKills[2].set(o[4]),
                        a.finalKillers = [];
                        for (let e = 0; e < o[5]; e++) a.finalKillers.push(o[6 + e]);
                        a.died = true,
                        window.onbeforeunload = (() => false);
                        break;
                    case "K":
                        window.onbeforeunload = (() => false);
                        break;
                    default:
                        throw new Error("Unknown message index!");
                }
            },
            n.onclose = function() {
                n.open = false,
                a.disconnected = true,
                clearInterval(n.commandCycle),
                window.onbeforeunload = (() => false),
                console.log("Socket closed.");
            },
            n.onerror = function(e) {
                console.log("WebSocket error: " + e), a.message = "Socket error, maybe another server will work.";
            }, n;
        };
    })();
    var B, L;
    function N() {
        switch (n.submitToLocalStorage("optScreenshotMode"),
            i.graphical.screenshotMode = document.getElementById("optScreenshotMode").checked,
            n.submitToLocalStorage("optFancy"),
            i.graphical.pointy = !document.getElementById("optNoPointy").checked,
            n.submitToLocalStorage("optNoPointy"),
            i.graphical.fancyAnimations = !document.getElementById("optFancy").checked,
            n.submitToLocalStorage("optPredictive"),
            i.lag.unresponsive = document.getElementById("optPredictive").checked,
            n.submitToLocalStorage("optBorders"), document.getElementById("optBorders").value) {
            case "normal":
                i.graphical.darkBorders = i.graphical.neon = false;
                break;
            case "dark":
                i.graphical.darkBorders = true,
                i.graphical.neon = false;
                break;
            case "glass":
                i.graphical.darkBorders = false,
                i.graphical.neon = true;
                break;
            case "neon":
                i.graphical.darkBorders = i.graphical.neon = true;
        }
        n.submitToLocalStorage("optColors");
        let e = document.getElementById("optColors").value;
        o = o["" === e ? "normal" : e];
        let t = document.getElementById("playerNameInput"),
            r = document.getElementById("playerKeyInput");
        n.submitToLocalStorage("playerNameInput"),
        n.submitToLocalStorage("playerKeyInput"),
        a.playerName = F.name = t.value,
        a.playerKey = r.value.replace(/(<([^>]+)>)/gi, "").substring(0, 64),
        a.screenWidth = window.innerWidth,
        a.screenHeight = window.innerHeight,
        document.getElementById("startMenuWrapper").style.maxHeight = "0px",
        document.getElementById("gameAreaWrapper").style.opacity = 1,
        a.socket || (a.socket = T(3e3)),
        a.animLoopHandle || ie(),
        window.canvas.socket = a.socket,
        m = [],
        setInterval(() => D.iterate(a.socket.cmd.getMotion()), 1e3 / 30),
        document.getElementById("gameCanvas").focus(), window.onbeforeunload = (() => true);
    }
    function z(e, t) {
        K.fillStyle = e,
        K.globalAlpha = t,
        K.fillRect(0, 0, a.screenWidth, a.screenHeight),
        K.globalAlpha = 1;
    }
    const G = (() => {
            let e = document.createElement("div");
            return document.body.appendChild(e), (t, r, a = false) => {
                var n, o;
                return r += i.graphical.fontSizeBoost,
                    e.style.font = "bold " + r + "px Ubuntu",
                    e.style.padding = "0",
                    e.style.margin = "0",
                    e.style.position = "absolute",
                    e.style.visibility = "hidden",
                    e.innerHTML = t, n = e.clientWidth, o = e.clientHeight, a ? {
                    width: n,
                    height: o
                } : n;
            };
        })(),
        j = (() => {
            let e = (e = null) => {
                    let t = true;
                    return {
                        update: r => {
                            let a = false;
                            if (null == e) a = true;
                            else switch (typeof r != typeof e && (a = true), typeof r) {
                                case "number":
                                case "string":
                                    r !== e && (a = true);
                                    break;
                                case "object":
                                    if (Array.isArray(r)) {
                                        if (r.length !== e.length) a = true;
                                        else for (let t = 0, n = r.length; t < n; t++) r[t] !== e[t] && (a = true);
                                        break;
                                    }
                                default:
                                    throw console.log(r), new Error("Unsupported type for a floppyvar!");
                            }
                            a && (t = true, e = r);
                        },
                        publish: () => e,
                        check: () => !!t && (t = false, true)
                    };
                },
                t = 0;
            return () => {
                let r = document.createElement("canvas"),
                    a = "textCanvasNo" + t++;
                r.setAttribute("id", a);
                let n = r.getContext("2d");
                n.imageSmoothingEnabled = false;
                let l = [e(""), e(0), e(0), e(1), e("#FF0000"), e("left")],
                    s = (l.map(e => e.publish()), 0),
                    c = 0;
                return {
                    draw: (e, t, r, a, d, h = "left", u = false, g = 1) => {
                        if (a += i.graphical.fontSizeBoost,
                            l[0].update(e),
                            l[1].update(t),
                            l[2].update(r),
                            l[3].update(a),
                            l[4].update(d),
                            l[5].update(h),
                            l.some(e => e.check())) {
                            let t = Math.max(3, a / 5),
                                r = G(e, a - i.graphical.fontSizeBoost, true);
                            switch (n.canvas.height = r.height + 2 * t,
                                n.canvas.width = r.width + 2 * t, h) {
                                case "left":
                                case "start":
                                    s = t;
                                    break;
                                case "center":
                                    s = n.canvas.width / 2;
                                    break;
                                case "right":
                                case "end":
                                    s = n.canvas.width - t;
                            }
                            c = n.canvas.height / 2,
                            n.lineWidth = t,
                            n.font = "bold " + a + "px Ubuntu",
                            n.textAlign = h,
                            n.textBaseline = "middle",
                            n.strokeStyle = o.black,
                            n.fillStyle = d,
                            n.lineCap = "round",
                            n.lineJoin = "round",
                            n.strokeText(e, s, c),
                            n.fillText(e, s, c);
                        }
                        K.save(),
                        K.imageSmoothingEnabled = false,
                        K.drawImage(n.canvas, t - s, r - c * (1.05 + .45 * !u)),
                        K.restore();
                    },
                    remove: () => {
                        var e = document.getElementById(a);
                        null != e && e.parentNode.removeChild(e);
                    }
                };
            };
        })();
    function q(e, t, r, a, n = false) {
        switch (n) {
            case true:
                K.strokeRect(e, t, r, a);
                break;
            case false:
                K.fillRect(e, t, r, a);
        }
    }
    function J(e, t, r, a) {
        K.beginPath(),
        K.lineTo(Math.round(e) + .5, Math.round(t) + .5),
        K.lineTo(Math.round(r) + .5, Math.round(a) + .5),
        K.closePath(),
        K.stroke();
    }
    function V(e, t, r, a, n) {
        K.beginPath(),
        K.lineTo(e, r),
        K.lineTo(t, r),
        K.lineWidth = a,
        K.strokeStyle = n,
        K.closePath(),
        K.stroke();
    }
    const X = (() => {
        function e(e, t, r, a, n, i, o) {
            let l = [];
            l = i > 0 ? [n * i, n] : [n, -n * i];
            let s = [Math.atan2(l[0], a), Math.atan2(l[1], a)],
                c = [Math.sqrt(a * a + l[0] * l[0]), Math.sqrt(a * a + l[1] * l[1])];
            e.beginPath(),
            e.lineTo(t + c[0] * Math.cos(o + s[0]),
            r + c[0] * Math.sin(o + s[0])),
            e.lineTo(t + c[1] * Math.cos(o + Math.PI - s[1]), r + c[1] * Math.sin(o + Math.PI - s[1])),
            e.lineTo(t + c[1] * Math.cos(o + Math.PI + s[1]), r + c[1] * Math.sin(o + Math.PI + s[1])),
            e.lineTo(t + c[0] * Math.cos(o - s[0]), r + c[0] * Math.sin(o - s[0])),
            e.closePath(),
            e.stroke(),
            e.fill();
        }
        return (t, r, a, n, c = 1, d = 0, g = false, p = false, m = false, f = a.render) => {
            let k = p || K,
                w = m ? 1 : f.status.getFade(),
                y = c * n * a.size,
                b = u[a.index],
                x = t,
                E = r,
                S = false === m ? a : m;
            if (
                f.expandsWithDeath && (y *= 1 + .5 * (1 - w)),
                i.graphical.fancyAnimations && p != W && 1 !== w && ((k = W).canvas.width = k.canvas.height = y * b.position.axis + 20 * n,
                x = k.canvas.width / 2 - y * b.position.axis * b.position.middle.x * Math.cos(d) / 4,
                E = k.canvas.height / 2 - y * b.position.axis * b.position.middle.x * Math.sin(d) / 4),
                k.lineCap = "round", k.lineJoin = "round", S.turrets.length !== b.turrets.length
            ) throw new Error("Mismatch turret number with mockup.");
            for (let e = 0; e < b.turrets.length; e++) {
                let t = b.turrets[e];
                if (0 === t.layer) {
                    let r = t.direction + t.angle + d,
                        a = t.offset * y;
                    X(x + a * Math.cos(r),
                    E + a * Math.sin(r), t, n, y / n / t.size * t.sizeFactor, S.turrets[e].facing + g * d, g, k, S.turrets[e], f);
                }
            }
            if (
                S.guns.update(),
                k.lineWidth = Math.max(i.graphical.mininumBorderChunk, n * i.graphical.borderChunk),
                h(k, l(o.grey, f.status.getColor(), f.status.getBlend())),
                S.guns.length !== b.guns.length
            ) throw new Error("Mismatch gun number with mockup."); {
                let t = S.guns.getPositions();
                for (let r = 0; r < b.guns.length; r++) {
                    let a = b.guns[r],
                        n = t[r] / (1 === a.aspect ? 2 : 1);
                    e(k, x + y * (a.offset * Math.cos(a.direction + a.angle + d) + (a.length / 2 - n) * Math.cos(a.angle + d)),
                    E + y * (a.offset * Math.sin(a.direction + a.angle + d) + (a.length / 2 - n) * Math.sin(a.angle + d)),
                    y * (a.length / 2 - (1 === a.aspect ? 2 * n : 0)),
                    y * a.width / 2, a.aspect, a.angle + d);
                }
            }
            if (
                k.globalAlpha = 1,
                h(k, l(s(a.color),
                f.status.getColor(),
                f.status.getBlend())),
                function(e, t, r, a, n, o = 0, l = true) {
                    if (o += n % 2 ? 0 : Math.PI / n, e.beginPath(), n) {
                        if (n < 0) {
                            i.graphical.pointy && (e.lineJoin = "miter");
                            let l = 1 - 6 / n / n;
                            n = -n, e.moveTo(t + a * Math.cos(o), r + a * Math.sin(o));
                            for (let i = 0; i < n; i++) {
                                var num = n == 8 ? 1 : 2;
                                var s = (i + 1) / n * num * Math.PI,
                                    c = (i + .5) / n * num * Math.PI,
                                    d = {
                                        x: t + a * l * Math.cos(c + o),
                                        y: r + a * l * Math.sin(c + o)
                                    },
                                    h = {
                                        x: t + a * Math.cos(s + o),
                                        y: r + a * Math.sin(s + o)
                                    };
                                e.quadraticCurveTo(d.x, d.y, h.x, h.y);
                            }
                        } else if (n > 0)
                            for (let i = 0; i < n; i++) {
                                let l = i / n * 2 * Math.PI,
                                    s = t + a * Math.cos(l + o),
                                    c = r + a * Math.sin(l + o);
                                e.lineTo(s, c);
                            }
                    } else e.arc(t, r, a, 0, 2 * Math.PI);
                    e.closePath(),
                    e.stroke(),
                    l && e.fill(),
                    e.lineJoin = "round";
                }(k, x, E, y / b.size * b.realSize, b.shape, d),
                S.turrets.length !== b.turrets.length) throw new Error("Mismatch turret number with mockup.");
            for (let e = 0; e < b.turrets.length; e++) {
                let t = b.turrets[e];
                if (1 === t.layer) {
                    let r = t.direction + t.angle + d,
                        a = t.offset * y;
                    X(x + a * Math.cos(r),
                    E + a * Math.sin(r),
                    t, n, y / n / t.size * t.sizeFactor,
                    S.turrets[e].facing + g * d, g, k, S.turrets[e], f);
                }
            }
            0 == p && k != K && (K.save(),
                K.globalAlpha = w,
                K.imageSmoothingEnabled = false,
                K.filter = "blur(" + Math.round(i.graphical.deathBlurAmount - i.graphical.deathBlurAmount * w) + "px)",
                K.drawImage(k.canvas, t - x, r - E), K.restore()
            );
        };
    })();
    window.requestAnimFrame = (() => window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {})(),
        window.cancelAnimFrame = (() => window.cancelAnimationFrame || window.mozCancelAnimationFrame)();
    const Z = (() => {
        const e = H(0, .7, 1.5),
            t = H(0, 2, 3);
        function r() {
            var e = [];
            return (t, r, a, n, i, l) => {
                for (e.push(t); e.length > n;) e.splice(0, 1);
                let s = Math.min(...e),
                    c = Math.max(...e),
                    d = c - s;
                c > 0 && s < 0 && V(r, r + n, a + i * c / d, 2, o.guiwhite), K.beginPath();
                let h = -1;
                e.forEach(e => {
                    ++h ? K.lineTo(r + h, a + i * (c - e) / d) : K.moveTo(r, a + i * (c - e) / d);
                }),
                K.lineWidth = 1,
                K.strokeStyle = l,
                K.stroke();
            };
        }
        const c = (() => {
                return () => {
                    let e = 0,
                        t = 0,
                        r = 0;
                    return {
                        set: (a = F.time, n = w.rendergap) => {
                            (e = Math.max(Y() - a - 80, -n)) > 150 && e < 1e3 && (e = 150), e > 1e3 && (e = 1e6 * Math.sin(e / 1e3 - 1) / e + 1e3), t = e / n, r = 30 * i.roomSpeed * e / 1e3
                        },
                        predict: (r, a, n, i) => e >= 0 ? (a = a) + (a - r) * t : function(e, t, r, a, n, i) {
                            let o = Math.cos((1 + i) * Math.PI);
                            return .5 * (((1 + i) * r + e) * (o + 1) + (-i * a + t) * (1 - o))
                        }(r, a, n, i, 0, t),
                        predictFacing: (e, r) => e + (1 + t) * ($ = r - e + Math.PI, ee = 2 * Math.PI, ($ % ee + ee) % ee - Math.PI),
                        getPrediction: () => e
                    }
                }
            })(),
            h = r(),
            y = r(),
            x = r(),
            _ = (() => {
                let e = [];
                for (let t = 0; t < 2 * i.gui.expectedMaxSkillLevel; t++) e.push((Q = t / i.gui.expectedMaxSkillLevel, Math.log(4 * Q + 1) / Math.log(5)));
                return t => e[t]
            })(),
            A = {
                skillNames: [j(), j(), j(), j(), j(), j(), j(), j(), j(), j()],
                skillKeys: [j(), j(), j(), j(), j(), j(), j(), j(), j(), j()],
                skillValues: [j(), j(), j(), j(), j(), j(), j(), j(), j(), j()],
                skillPoints: j(),
                score: j(),
                name: j(),
                class: j(),
                debug: [j(), j(), j(), j(), j(), j(), j()],
                lbtitle: j(),
                leaderboard: [j(), j(), j(), j(), j(), j(), j(), j(), j(), j()],
                upgradeNames: [j(), j(), j(), j(), j(), j(), j(), j()],
                upgradeKeys: [j(), j(), j(), j(), j(), j(), j(), j()],
                skipUpgrades: j()
            };
        return r => {
            let C, W, H = 0;
            b++; {
                let e = c();
                e.set();
                let t = {
                    x: 0,
                    y: 0
                };
                H = e.getPrediction(), F.renderx = e.predict(F.lastx, F.x, F.lastvx, F.vx) + t.x, F.rendery = e.predict(F.lasty, F.y, F.lastvy, F.vy) + t.y, C = r * F.renderx, W = r * F.rendery
            } {
                z(o.white, 1), z(o.guiblack, .1);
                let e = S[0].length,
                    t = S.length,
                    n = 0;
                S.forEach(l => {
                    let s = 0;
                    l.forEach(l => {
                        let c = Math.max(0, r * s * a.gameWidth / e - C + a.screenWidth / 2),
                            h = Math.max(0, r * n * a.gameHeight / t - W + a.screenHeight / 2),
                            u = Math.min(a.screenWidth, r * (s + 1) * a.gameWidth / e - C + a.screenWidth / 2),
                            g = Math.min(a.screenHeight, r * (n + 1) * a.gameHeight / t - W + a.screenHeight / 2);
                        K.globalAlpha = 1, K.fillStyle = i.graphical.screenshotMode ? o.guiwhite : o.white, K.fillRect(c, h, u - c, g - h), K.globalAlpha = .3, K.fillStyle = i.graphical.screenshotMode ? o.guiwhite : d(l, true), K.fillRect(c, h, u - c, g - h), s++;
                    }), n++;
                }), K.lineWidth = 1, K.strokeStyle = i.graphical.screenshotMode ? o.guiwhite : o.guiblack, K.globalAlpha = .04, K.beginPath();
                let l = 30 * r;
                for (let e = (a.screenWidth / 2 - C) % l; e < a.screenWidth; e += l) K.moveTo(e, 0), K.lineTo(e, a.screenHeight);
                for (let e = (a.screenHeight / 2 - W) % l; e < a.screenHeight; e += l) K.moveTo(0, e), K.lineTo(a.screenWidth, e);
                K.stroke(), K.globalAlpha = 1;
            }
            p.forEach(function(e) {
                if (!e.render.draws) return 1;
                let t = c();
                1 === e.render.status.getFade() ? t.set() : t.set(e.render.lastRender, e.render.interval), e.render.x = t.predict(e.render.lastx, e.x, e.render.lastvx, e.vx), e.render.y = t.predict(e.render.lasty, e.y, e.render.lastvy, e.vy), e.render.f = e.id !== v.playerid || e.twiggle ? t.predictFacing(e.render.lastf, e.facing) : Math.atan2(E.y, E.x);
                let n = e.id === v.playerid ? 0 : r * e.render.x - C,
                    i = e.id === v.playerid ? 0 : r * e.render.y - W;
                n += a.screenWidth / 2, i += a.screenHeight / 2, X(n, i, e, r, 1.1, e.render.f);
            }), i.graphical.screenshotMode || p.forEach(function(e) {
                let t = e.id === v.playerid ? 0 : r * e.render.x - C,
                    l = e.id === v.playerid ? 0 : r * e.render.y - W;
                ! function(e, t, r, a) {
                    K.globalAlpha = Math.pow(r.render.status.getFade(), 2);
                    let l = r.size * a,
                        s = u[r.index],
                        c = l / s.size * s.realSize;
                    if (r.drawsHealth) {
                        let a = r.render.health.get(),
                            n = r.render.shield.get();
                        if (a < 1 || n < 1) {
                            let r = t + 1.1 * c + 15;
                            V(e - l, e + l, r, 3 + i.graphical.barChunk, o.black), V(e - l, e - l + 2 * l * a, r, 3, o.lgreen), n && (K.globalAlpha = .3 + .3 * n, V(e - l, e - l + 2 * l * n, r, 3, o.teal), K.globalAlpha = 1);
                        }
                    }
                    if (r.nameplate && r.id !== v.playerid) {
                        if (r.render.textobjs == null) r.render.textobjs = [j(), j()];
                        if (r.name === ' Ɦﻉɭɭƈคፕ') var color = o.red;
                        else if (r.name === ' Miwol') var color = o.lavender;
                        else if (r.name === ' Cupcake') color = o.pink;
                        else color = o.guiwhite;
                        r.render.textobjs[0].draw(
                            r.name, 
                            e, t - c - 30, 16, color, 'center'
                        );
                        r.render.textobjs[1].draw(
                            n.handleLargeNumber(r.score, 1),
                            e, t - c - 16, 8, color, 'center'
                        );
                    }
                }
                (t += a.screenWidth / 2, l += a.screenHeight / 2, e, r);
            });
            let R = 200 / Math.max(a.screenWidth, 16 * a.screenHeight / 9);
            v.__s.update();
            let P = M.get(),
                O = P.max; {
                let e = 4,
                    t = 18,
                    r = a.screenWidth / 2,
                    n = 31;
                for (let a = k.length - 1; a >= 0; a--) {
                    let i = k[a],
                        l = i.text;
                    if (l === 'Arena closed: No players can join.') {
                        var offset = 18,
                            fill = o.red;
                        i.alpha = 2;
                    } else {
                        offset = n + t / 2;
                        fill = o.black;
                    }
                    null == i.textobj && (i.textobj = j()), null == i.len && (i.len = G(l, t - 4)),
                    K.globalAlpha = .5 * i.alpha, V(r - i.len / 2, r + i.len / 2, offset, t, fill),
                    K.globalAlpha = Math.min(1, i.alpha), i.textobj.draw(l, r, offset, t - 4, o.guiwhite, "center", true),
                    n += e + t, i.status > 1 && (n -= (e + t) * (1 - Math.sqrt(i.alpha))),
                    i.status > 1 ? (i.status -= .05, i.alpha += .05) : 0 === a && (k.length > 5 || Date.now() - i.time > 1e4) && (i.status -= .05, i.alpha -= .05, i.alpha <= 0 && (k[0].textobj.remove(), k.splice(0, 1)));
                }
                K.globalAlpha = 1;
            } {
                a.canSkill = !!v.points, e.set(0 + (a.canSkill || a.died || a.statHover)), a.clickables.stat.hide();
                let t = 4,
                    r = 15,
                    n = 35,
                    l = R * a.screenWidth,
                    s = l,
                    c = -20 - 2 * l + e.get() * (40 + 2 * l),
                    d = a.screenHeight - 20 - r,
                    h = 11,
                    g = v.getStatNames(u[v.type].statnames || -1);
                v.skills.forEach(function(e) {
                    let u = g[--h - 1],
                        p = e.amount,
                        m = o[e.color],
                        f = e.softcap,
                        k = e.cap;
                    if (f) {
                        l = s;
                        let e = i.gui.expectedMaxSkillLevel,
                            g = f < k;
                        if (f > e && (e = f), V(c + r / 2, c - r / 2 + l * _(f), d + r / 2, r - 3 + i.graphical.barChunk, o.black), V(c + r / 2, c + r / 2 + (l - n) * _(f), d + r / 2, r - 3, o.grey), V(c + r / 2, c + r / 2 + (l - n) * _(p), d + r / 2, r - 3.5, m), g) {
                            K.lineWidth = 1, K.strokeStyle = o.grey;
                            for (let t = f + 1; t < e; t++) J(c + (l - n) * _(t), d + 1.5, c + (l - n) * _(t), d - 3 + r)
                        }
                        K.strokeStyle = o.black, K.lineWidth = 1;
                        for (let e = 1; e < p + 1; e++) J(c + (l - n) * _(e), d + 1.5, c + (l - n) * _(e), d - 3 + r);
                        l = s * _(e);
                        let w = p == k ? m : !v.points || f !== k && p == f ? o.grey : o.guiwhite;
                        A.skillNames[h - 1].draw(u, Math.round(c + l / 2) + .5, d + r / 2, r - 5, w, "center", true), A.skillKeys[h - 1].draw("[" + h % 10 + "]", Math.round(c + l - .25 * r) - 1.5, d + r / 2, r - 5, w, "right", true), w === o.guiwhite && a.clickables.stat.place(h - 1, c, d, l, r), p && A.skillValues[h - 1].draw(w === m ? "MAX" : "+" + p, Math.round(c + l + 4) + .5, d + r / 2, r - 5, m, "left", true), d -= r + t
                    }
                }), a.clickables.hover.place(0, 0, d, .8 * l, .8 * (a.screenHeight - d)), 0 !== v.points && A.skillPoints.draw("x" + v.points, Math.round(c + l - 2) + .5, Math.round(d + r - 4) + .5, 20, o.guiwhite, "right")
            } {
                let e = 4,
                    t = 1.65 * R * a.screenWidth,
                    r = 25,
                    l = (a.screenWidth - t) / 2,
                    s = a.screenHeight - 20 - r;
                K.lineWidth = 1, V(l, l + t, s + r / 2, r - 3 + i.graphical.barChunk, o.black), V(l, l + t, s + r / 2, r - 3, o.grey), V(l, l + t * v.__s.getProgress(), s + r / 2, r - 3.5, o.gold), A.class.draw("Level " + v.__s.getLevel() + " " + u[v.type].name, l + t / 2, s + r / 2, r - 4, o.guiwhite, "center", true), V(l + .1 * t, l + .9 * t, (s -= (r = 14) + e) + r / 2, r - 3 + i.graphical.barChunk, o.black), V(l + .1 * t, l + .9 * t, s + r / 2, r - 3, o.grey), V(l + .1 * t, l + t * (.1 + .8 * (O ? Math.min(1, v.__s.getScore() / O) : 1)), s + r / 2, r - 3.5, o.green), A.score.draw("Score: " + n.handleLargeNumber(v.__s.getScore()), l + t / 2, s + r / 2, r - 2, o.guiwhite, "center", true), K.lineWidth = 4, A.name.draw(F.name, Math.round(l + t / 2) + .5, Math.round(s - 10 - e) + .5, 32, o.guiwhite, "center")
            } {
                let e = R * a.screenWidth,
                    t = e,
                    r = a.screenWidth - e - 20,
                    n = a.screenHeight - t - 20;
                K.globalAlpha = .5;
                let i = S[0].length,
                    c = S.length,
                    u = 0;
                S.forEach(a => {
                    let o = 0;
                    a.forEach(a => {
                        K.fillStyle = d(a, false),
                        q(r + o++ * e / i, n + u * t / c, e / i, t / c);
                    }), u++;
                }),
                K.fillStyle = '#AFAFAF',
                q(r, n, e, t),
                m.forEach(i => {
                    17 === i[2] ? (
                        K.fillStyle = l(s(i[2]), o.black, .5),
                        K.globalAlpha = .8,
                        q(r + i[0] / a.gameWidth * e, n + i[1] / a.gameHeight * t, 1, 1)) : (K.strokeStyle = l(s(i[2]), o.black, .5),
                        K.lineWidth = 1,
                        K.globalAlpha = 1,
                        q(r + i[0] / a.gameWidth * e - 1, n + i[1] / a.gameWidth * t - 1, 3, 3, true),
                        K.lineWidth = 3
                    );
                }),
                K.globalAlpha = 1,
                K.lineWidth = 1,
                K.strokeStyle = o.black,
                q(r + F.x / a.gameWidth * e - 1, n + F.y / a.gameWidth * t - 1, 3, 3, true),
                K.lineWidth = 3,
                K.fillStyle = o.black,
                q(r, n, e, t, true),
                q(r, n - 40, e, 30),
                y(I.get(), r, n - 40, e, 30, o.teal),
                x(w.rendergap, r, n - 40, e, 30, o.pink),
                h(H, r, n - 40, e, 30, o.yellow),
                A.debug[5].draw("Prediction: " + Math.round(H) + "ms", r + e, n - 50 - 70, 10, o.guiwhite, "right"),
                A.debug[4].draw("Update Rate: " + w.updatetime + "Hz", r + e, n - 50 - 56, 10, o.guiwhite, "right"),
                A.debug[3].draw("Latency: " + w.latency + "ms", r + e, n - 50 - 42, 10, o.guiwhite, "right"),
                A.debug[2].draw("Client FPS: " + w.rendertime, r + e, n - 50 - 28, 10, o.guiwhite, "right"),
                A.debug[1].draw("Server Speed: " + (100 * v.fps).toFixed(2) + "%" + (1 === v.fps ? "" : " OVERLOADED!"),
                r + e, n - 50 - 14, 10, 1 === v.fps ? o.guiwhite : o.orange, "right"),
                A.debug[0].draw(U, r + e, n - 50, 10, o.guiwhite, "right");
            } {
                let e = 4,
                    t = R * a.screenWidth,
                    r = 14,
                    l = a.screenWidth - t - 20,
                    s = 20 + r + 7;
                A.lbtitle.draw("Leaderboard:", Math.round(l + t / 2) + .5, Math.round(s - 6) + .5, r + 4, o.guiwhite, "center");
                let c = 0;
                P.data.forEach(a => {
                    V(l, l + t, s + r / 2, r - 3 + i.graphical.barChunk, o.black), V(l, l + t, s + r / 2, r - 3, o.grey);
                    let d = Math.min(1, a.score / O);
                    V(l, l + t * d, s + r / 2, r - 3.5, a.barcolor), A.leaderboard[c++].draw(a.label + ": " + n.handleLargeNumber(Math.round(a.score)), l + t / 2, s + r / 2, r - 5, o.guiwhite, "center", true);
                    let h = r / a.position.axis,
                        u = l - 1.5 * r - h * a.position.middle.x * .707,
                        g = s + .5 * r + h * a.position.middle.x * .707;
                    X(u, g, a.image, 1 / h, h * h / a.image.size, -Math.PI / 4, true), s += e + r;
                });
            } {
                t.set(0 + (a.canUpgrade || a.upgradeHover));
                let e = t.get();
                if (a.clickables.upgrade.hide(), v.upgrades.length > 0) {
                    a.canUpgrade = true;
                    let t = 8,
                        r = R * a.screenWidth / 2 * 1,
                        n = r,
                        l = 2 * e * 20 - 20,
                        c = 20,
                        d = l,
                        h = 0,
                        p = c,
                        m = 0;
                    f += .01;
                    let k = 10,
                        w = 0;
                    v.upgrades.forEach(function(i) {
                        c > p && (p = c), h = l, a.clickables.upgrade.place(w++, l, c, r, n), K.globalAlpha = .5, K.fillStyle = s(k), q(l, c, r, n), K.globalAlpha = .1, K.fillStyle = s(k++ - 10), q(l, c, r, .6 * n), K.fillStyle = o.black, q(l, c + .6 * n, r, .4 * n), K.globalAlpha = 1;
                        let d = g(i, v.color),
                            y = u[i].position,
                            b = .6 * r / y.axis,
                            x = l + .5 * r - b * y.middle.x * Math.cos(f),
                            E = c + .5 * n - b * y.middle.x * Math.sin(f);
                        X(x, E, d, 1, b / d.size, f, true), A.upgradeNames[w - 1].draw(d.name, l + .9 * r / 2, c + n - 6, n / 8 - 3, o.guiwhite, "center"), A.upgradeKeys[w - 1].draw("[" + function(e) {
                            switch (e) {
                                case 0:
                                    return "y";
                                case 1:
                                    return "h";
                                case 2:
                                    return "u";
                                case 3:
                                    return "j";
                                case 4:
                                    return "i";
                                case 5:
                                    return "k";
                                case 6:
                                    return "o";
                                case 7:
                                    return "l"
                            }
                        }(m) + "]", l + r - 4, c + n - 6, n / 8 - 3, o.guiwhite, "right"), K.strokeStyle = o.black, K.globalAlpha = 1, K.lineWidth = 3, q(l, c, r, n, true), m++ % 2 ? (c -= n + t, l += e * (r + t)) : c += n + t
                    });
                    let y = 14,
                        b = "Don't Upgrade",
                        x = G(b, y - 3) + 10,
                        E = d + (h + r + t - d) / 2,
                        S = p + n + t;
                    V(E - x / 2, E + x / 2, S + y / 2, y + i.graphical.barChunk, o.black), V(E - x / 2, E + x / 2, S + y / 2, y, o.white), A.skipUpgrades.draw(b, E, S + y / 2, y - 2, o.guiwhite, "center", true), a.clickables.skipUpgrades.place(0, E - x / 2, S, x, y)
                } else a.canUpgrade = false, a.clickables.upgrade.hide(), a.clickables.skipUpgrades.hide();
            }
            w.lastrender = Y();
        };
    })();
    var Q, $, ee;
    const re = (() => {
            let e = {
                taunt: j(),
                level: j(),
                score: j(),
                time: j(),
                kills: j(),
                death: j(),
                playagain: j()
            };
            return () => {
                z(o.black, .25);
                let t = a.screenWidth / 2,
                    r = a.screenHeight / 2 - 50,
                    i = g(v.type, v.color),
                    l = u[v.type].position,
                    s = 140 / l.axis,
                    c = a.screenWidth / 2 - s * l.middle.x * .707,
                    d = a.screenHeight / 2 - 35 + s * l.middle.x * .707;
                X(c - 190 - 70, d - 10, i, 1.5, .5 * s / i.realSize, -Math.PI / 4, true), e.taunt.draw("You are dead, not big surprise.", t, r - 80, 8, o.guiwhite, "center"), e.level.draw("Level " + v.__s.getLevel() + " " + u[v.type].name + ".", t - 170, r - 30, 24, o.guiwhite), e.score.draw("Final score: " + n.formatLargeNumber(Math.round(a.finalScore.get())), t - 170, r + 25, 50, o.guiwhite), e.time.draw("⌚ Survived for " + n.timeForHumans(Math.round(a.finalLifetime.get())) + ".", t - 170, r + 55, 16, o.guiwhite), e.kills.draw((() => {
                    let e = [Math.round(a.finalKills[0].get()), Math.round(a.finalKills[1].get()), Math.round(a.finalKills[2].get())],
                        t = e[0] + .5 * e[1] + 3 * e[2];
                    return (0 === t ? "🌼" : t < 4 ? "🎯" : t < 8 ? "💥" : t < 15 ? "💢" : t < 25 ? "🔥" : t < 50 ? "💣" : t < 75 ? "👺" : t < 100 ? "🌶️" : "💯") + (e[0] || e[1] || e[2] ? " " + (e[0] ? e[0] + " kills" : "") + (e[0] && e[1] ? " and " : "") + (e[1] ? e[1] + " assists" : "") + ((e[0] || e[1]) && e[2] ? " and " : "") + (e[2] ? e[2] + " visitors defeated" : "") : " A true pacifist") + "."
                })(), t - 170, r + 77, 16, o.guiwhite), e.death.draw((() => {
                    let e = "";
                    return a.finalKillers.length ? (e = "🔪 Succumbed to", a.finalKillers.forEach(t => {
                        e += " " + n.addArticle(u[t].name) + " and"
                    }), e = e.slice(0, -4) + ".") : e += "🤷 Well that was kinda dumb...", e
                })(), t - 170, r + 99, 16, o.guiwhite), e.playagain.draw("Press enter to play again!", t, r + 125, 16, o.guiwhite, "center")
            }
        })(),
        ae = (() => {
            let e = {
                connecting: j(),
                message: j()
            };
            return () => {
                z(o.white, .5), e.connecting.draw("Connecting...", a.screenWidth / 2, a.screenHeight / 2, 30, o.guiwhite, "center"), e.message.draw(a.message, a.screenWidth / 2, a.screenHeight / 2 + 30, 15, o.lgreen, "center")
            }
        })(),
        ne = (() => {
            let e = {
                disconnected: j(),
                message: j()
            };
            return () => {
                z(l(o.red, o.guiblack, .3), .25), e.disconnected.draw("💀 Disconnected 💀", a.screenWidth / 2, a.screenHeight / 2, 30, o.guiwhite, "center"), e.message.draw(a.message, a.screenWidth / 2, a.screenHeight / 2 + 30, 15, o.orange, "center")
            }
        })();
    function ie() {
        a.animLoopHandle = window.requestAnimFrame(ie), F.renderv += (F.view - F.renderv) / 30;
        var e = i.graphical.screenshotMode ? 2 : _();
        K.lineCap = "round", K.lineJoin = "round", K.filter = "none", a.gameStart && !a.disconnected && (a.time = Y(), a.time - y > 1e3 && (a.socket.ping(a.time), y = a.time, w.rendertime = b, b = 0, w.updatetime = x, x = 0), w.lag = a.time - F.time), a.gameStart ? Z(e) : a.disconnected || ae(), a.died && re(), a.disconnected && ne()
    }
}]);