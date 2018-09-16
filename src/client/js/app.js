/*global require, console, localStorage, VERSION, navigator*/
/*jshint -W097*/
/*jshint browser: 1*/
"use strict";

var serverPort = '8081';
var colors = ['#1F1244', '#2E513B'];
var chance = Math.floor(Math.random() * colors.length);
var _createClass = function() {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || 0;
			descriptor.configurable = 1;
			if ("value" in descriptor) descriptor.writable = 1;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function(Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ?
	function(obj) {
		return typeof obj;
	} :
	function(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function!");
}

var app = function(modules) {
		var installedModules = {};
		function __webpack_require__(moduleId) {
			if (installedModules[moduleId]) return installedModules[moduleId].exports;
			var module = installedModules[moduleId] = {
				exports: {},
				id: moduleId,
				loaded: 0
			};
			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
			module.loaded = 1;
			return module.exports;
		}
		__webpack_require__.m = modules;
		__webpack_require__.c = installedModules;
		__webpack_require__.p = "";
		return __webpack_require__(0);
	}(
		[
			function(module, exports, __webpack_require__) {
				"use strict";
				var global = __webpack_require__(1);
				var util = __webpack_require__(2);
				var config = {
					graphical: {
						screenshotMode: 0,
						borderChunk: 6,
						barChunk: 5,
						mininumBorderChunk: 3,
						deathBlurAmount: 3,
						darkBorders: 0,
						fancyAnimations: 1,
						colors: 'normal',
						pointy: 1,
						fontSizeBoost: 1,
						neon: 0
					},
					gui: {
						expectedMaxSkillLevel: 9
					},
					lag: {
						unresponsive: 0,
						memory: 60
					}
				};
				var color = {};
				util.pullJSON('color').then(function(data) {
					return color = data;
				});
				var mixColors = function() {
					function d2h(d) {
						return d.toString(16);
					}
					function h2d(h) {
						return parseInt(h, 16);
					}
					return function(color_2, color_1) {
						var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
						if (weight === 1) return color_1;
						if (weight === 0) return color_2;
						var col = "#";
						for (var i = 1; i <= 6; i += 2) {
							var v1 = h2d(color_1.substr(i, 2)),
								v2 = h2d(color_2.substr(i, 2)),
								val = d2h(Math.floor(v2 + (v1 - v2) * weight));
							while (val.length < 2) val = '0' + val;
							col += val;
						}
						return col;
					};
				}();
				function getColor(colorNumber) {
					switch (colorNumber) {
						case 0:
							return color.teal;
						case 1:
							return color.lgreen;
						case 2:
							return color.orange;
						case 3:
							return color.yellow;
						case 4:
							return color.lavender;
						case 5:
							return color.pink;
						case 6:
							return color.vlgrey;
						case 7:
							return color.lgrey;
						case 8:
							return color.guiwhite;
						case 9:
							return color.black;
						case 10:
							return color.blue;
						case 11:
							return color.green;
						case 12:
							return color.red;
						case 13:
							return color.gold;
						case 14:
							return color.purple;
						case 15:
							return color.magenta;
						case 16:
							return color.grey;
						case 17:
							return color.dgrey;
						case 18:
							return color.white;
						case 19:
							return color.guiblack;
						case 20:
							return "#307A76";
						case 21:
							return "#47F51E";
						case 22:
							return "#9264EF";
						case 23:
							return "#4DFAFF";
						case 24:
							return "#B35ED8";
						case 25:
							return "#EB6230";
						case 26:
							return "#C90000";
						case 27:
							return "#6BF442";
						case 28:
							return "#E841F4";
						case 29:
							return '#44AA34';
						case 30:
							return '#1D00FF';
						case 32:
							return '#FAC577';
						case 33:
							return '#C1FF89';
						case 34:
							return '#FFA347';
						case 35:
							return '#FF478A';
						case 39:
							return '#B1FD6D';
						case 40:
							return '#FDA54D';
						// Rainbow mode colors
						case 100:
							return '#FF0000';
						case 101:
							return '#FF2000';
						case 102:
							return '#FF4000';
						case 103:
							return '#FF6000';
						case 104:
							return '#FF8000';
						case 105:
							return '#FFA000';
						case 106:
							return '#FFC000';
						case 107:
							return '#FFE000';
						case 107:
							return '#FFFF00';
						case 108:
							return '#C0FF00';
						case 109:
							return '#80FF00';
						case 110:
							return '#40FF00';
						case 111:
							return '#00FF00';
						case 112:
							return '#00C040';
						case 113:
							return '#008080';
						case 114:
							return '#0040C0';
						case 115:
							return '#0000FF';
						case 116:
							return '#1200C0';
						case 117:
							return '#250080';
						case 118:
							return '#380040';
						case 119:
							return '#4B0082';
						case 120:
							return '#5C00A1';
						case 121:
							return '#6D00C0';
						case 122:
							return '#7B00DF';
						case 123:
							return '#8F00FF';
						case 124:
							return '#AB00C0';
						case 125:
							return '#C70080';
						case 126:
							return '#E30040';
						case 'rainbow':
							return '#' + Math.floor(Math.random() * 16777215).toString(16);
						default:
							return '#FF0000';
					}
				}
				function getColorDark(givenColor) {
					var dark = config.graphical.neon ? color.white : color.black;
					if (config.graphical.darkBorders) return dark;
					return mixColors(givenColor, dark, color.border);
				}
				function getZoneColor(cell, real) {
					switch (cell) {
						case 'bas1':
							return color.blue;
						case 'bas2':
							return color.green;
						case 'bas3':
							return color.red;
						case 'bas4':
							return color.pink;
						case 'nest':
							return real ? color.purple : color.lavender;
						case "n_b1":
							return color.blue;
						case "n_b2":
							return color.green;
						case "n_b3":
							return color.red;
						case "n_b4":
							return color.pink;
						default:
							return real ? color.white : color.guiwhite;
					}
				}
				function setColor(context, givenColor) {
					if (config.graphical.neon) {
						context.fillStyle = getColorDark(givenColor);
						context.strokeStyle = givenColor;
					} else {
						context.fillStyle = givenColor;
						context.strokeStyle = getColorDark(givenColor);
					}
				}
				var mockups = [];
				util.pullJSON('mockups').then(function(data) {
					return mockups = data;
				});
				function getEntityImageFromMockup(index, _color) {
					// Need to fix tank color mockup here
					var mockup = mockups[index];
					var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mockup.color;
					return {
						time: 0,
						index: index,
						x: mockup.x,
						y: mockup.y,
						vx: 0,
						vy: 0,
						size: mockup.size,
						realSize: mockup.realSize,
						color: color,
						render: {
							status: {
								getFade: function getFade() {
									return 1;
								},
								getColor: function getColor() {
									return '#FFF';
								},
								getBlend: function getBlend() {
									return 0;
								},
								health: {
									get: function get() {
										return 1;
									}
								},
								shield: {
									get: function get() {
										return 1;
									}
								}
							}
						},
						facing: mockup.facing,
						shape: mockup.shape,
						name: mockup.name,
						score: 0,
						tiggle: 0,
						layer: mockup.layer,
						guns: {
							length: mockup.guns.length,
							getPositions: function getPositions() {
								var a = [];
								mockup.guns.forEach(function() {
									return a.push(0);
								});
								return a;
							},
							update: function update() {}
						},
						turrets: mockup.turrets.map(function(t) {
							var o = getEntityImageFromMockup(t.index);
							o.realSize = o.realSize / o.size * mockup.size * t.sizeFactor;
							o.size = mockup.size * t.sizeFactor;
							o.angle = t.angle;
							o.offset = t.offset;
							o.direction = t.direction;
							o.facing = t.direction + t.angle;
							return o;
						})
					};
				}
				global.clickables = function() {
					var Region = function() {
						function Clickable() {
							var region = {
								x: 0,
								y: 0,
								w: 0,
								h: 0
							};
							var active = 0;
							return {
								set: function set(x, y, w, h) {
									region.x = x;
									region.y = y;
									region.w = w;
									region.h = h;
									active = 1;
								},
								check: function check(target) {
									var dx = Math.round(target.x - region.x);
									var dy = Math.round(target.y - region.y);
									return active && dx >= 0 && dy >= 0 && dx <= region.w && dy <= region.h;
								},
								hide: function hide() {
									active = 0;
								}
							};
						}
						return function(size) {
							var data = [];
							for (var i = 0; i < size; i++) {
								data.push(Clickable());
							}
							return {
								place: function place(index) {
									var _data$index;
									for (var _len = arguments.length,
										a = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) a[_key - 1] = arguments[_key];
									if (index >= data.length) {
										console.log(index);
										console.log(data);
										throw new Error('Trying to reference a clickable outside a region!');
									}
									(_data$index = data[index]).set.apply(_data$index, a);
								},
								hide: function hide() {
									data.forEach(function(r) {
										return r.hide();
									});
								},
								check: function check(x) {
									return data.findIndex(function(r) {
										return r.check(x);
									});
								}
							};
						};
					}();
					return {
						stat: Region(10),
						upgrade: Region(8),
						hover: Region(1),
						skipUpgrades: Region(1)
					};
				}();
				global.statHover = 0;
				global.upgradeHover = 0;
				var player = {
					id: -1,
					x: global.screenWidth / 2,
					y: global.screenHeight / 2,
					vx: 0,
					vy: 0,
					renderx: global.screenWidth / 2,
					rendery: global.screenHeight / 2,
					renderv: 1,
					slip: 0,
					view: 1,
					time: 0,
					screenWidth: global.screenWidth,
					screenHeight: global.screenHeight,
					target: {
						x: global.screenWidth / 2,
						y: global.screenHeight / 2
					}
				};
				var entities = [],
					users = [],
					minimap = [],
					upgradeSpin = 0,
					messages = [],
					messageFade = 0,
					newMessage = 0,
					metrics = {
						latency: 0,
						lag: 0,
						rendertime: 0,
						updatetime: 0,
						lastlag: 0,
						lastrender: 0,
						rendergap: 0,
						lastuplink: 0
					},
					lastPing = 0,
					renderTimes = 0,
					updateTimes = 0,
					target = {
						x: player.x,
						y: player.y
					},
					roomSetup = [
						['norm']
					],
					roomSpeed = 0;
				var _gui = {
					getStatNames: function getStatNames(num) {
						switch (num) {
							case 1:
								return ['Body Damage', 'Max Health', 'Bullet Speed', 'Bullet Health', 'Bullet Penetration',
									'Bullet Damage', 'Acceleration', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
							case 2:
								return ['Body Damage', 'Max Health', 'Drone Speed', 'Drone Health', 'Drone Penetration',
									'Drone Damage', 'Respawn Rate', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
							case 3:
								return ['Body Damage', 'Max Health', 'Drone Speed', 'Drone Health', 'Drone Penetration',
									'Drone Damage', 'Max Drone Count', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
							case 4:
								return ['Body Damage', 'Max Health', 'Swarm Speed', 'Swarm Health', 'Swarm Penetration',
									'Swarm Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
							case 5:
								return ['Body Damage', 'Max Health', 'Placement Speed', 'Trap Health', 'Trap Penetration',
									'Trap Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
							case 6:
								return ['Body Damage', 'Max Health', 'Weapon Speed', 'Weapon Health', 'Weapon Penetration',
									'Weapon Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
							case 7:
								return ['Body Damage', 'Max Health', 'Bullet Speed', 'Bullet Health', 'Bullet Penetration',
									'Bullet Damage', 'Reload/Acceleration', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
							default:
								return ['Body Damage', 'Max Health', 'Bullet Speed', 'Bullet Health', 'Bullet Penetration',
									'Bullet Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
						}
					},
					skills: [{
						amount: 0,
						color: 'purple',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'pink',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'blue',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'lgreen',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'red',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'yellow',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'green',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'teal',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'gold',
						cap: 1,
						softcap: 1
					}, {
						amount: 0,
						color: 'orange',
						cap: 1,
						softcap: 1
					}],
					points: 0,
					upgrades: [],
					playerid: -1,
					__s: function() {
						var truscore = 0;
						var levelscore = 0;
						var deduction = 0;
						var level = 0;
						var score = Smoothbar(0, 10);
						return {
							setScore: function setScore(s) {
								if (s) {
									score.set(s);
									if (deduction > score.get()) {
										level = 0;
										deduction = 0;
									}
								} else {
									score = Smoothbar(0, 10);
									level = 0;
								}
							},
							update: function update() {
								levelscore = Math.ceil(1.8 * Math.pow(level + 1, 1.8) - 2 * level + 1);
								if (score.get() - deduction >= levelscore) {
									deduction += levelscore;
									level += 1;
								}
							},
							getProgress: function getProgress() {
								return levelscore ? Math.min(1, Math.max(0, (score.get() - deduction) / levelscore)) : 0;
							},
							getScore: function getScore() {
								return score.get();
							},
							getLevel: function getLevel() {
								return level;
							}
						};
					}(),
					type: 0,
					fps: 0,
					color: 0,
					accel: 0,
					topspeed: 1
				};
				global.clearUpgrades = function() {
					_gui.upgrades = [];
				};
				var _leaderboard = function() {
					var entries = {};
					function Entry() {
						var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
						var bar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
						var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
						var index = 0,
							truscore = 0,
							score = Smoothbar(0, 10);
						return {
							update: function update(i, s) {
								index = i;
								score.set(s);
							},
							publish: function publish() {
								// Return the data package
								var ref = mockups[index];
								return {
									image: getEntityImageFromMockup(index, color),
									position: ref.position,
									barcolor: getColor(bar),
									label: name === '' ? ref.name : name + ' - ' + ref.name,
									score: score.get()
								};
							}
						};
					}
					return {
						get: function get() {
							var out = [],
								maxscore = 1;
							for (var e in entries) {
								if (!entries.hasOwnProperty(e)) continue;
								var data = entries[e].publish();
								out.push(data);
								if (data.score > maxscore) maxscore = data.score;
							}
							out.sort(function(a, b) {
								return b.score - a.score;
							});
							return {
								data: out,
								max: maxscore
							};
						},
						remove: function remove(index) {
							if (entries['_' + index] === undefined) {
								console.log('Warning: Asked to removed an unknown leaderboard entry.');
								return -1;
							}
							delete entries['_' + index];
						},
						add: function add(data) {
							var newentry = Entry(data.name, data.barcolor, data.color);
							newentry.update(data.index, data.score);
							entries['_' + data.id] = newentry;
						},
						update: function update(data) {
							if (entries['_' + data.id] === undefined) {
								console.log('Warning: Asked to update an unknown leaderboard entry.');
								return -1;
							}
							entries['_' + data.id].update(data.index, data.score);
						},
						purge: function purge() {
							entries = {};
						}
					};
				}();
				var getRatio = function getRatio() {
					return Math.max(global.screenWidth / player.renderv, global.screenHeight / player.renderv / 9 * 16);
				};
				global.target = target;
				global.player = player;
				global.canUpgrade = 0;
				global.canSkill = 0;
				global.message = '';
				global.time = 0;
				global.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
				var serverName = 'Unknown Server';
				window.onload = function() {
					serverName = 'Cloud9-US-8082 :4TDM:';
					document.getElementById('serverName').innerHTML = '<h4 class="nopadding">' + serverName + '</h4>';
					util.retrieveFromLocalStorage('playerNameInput');
					util.retrieveFromLocalStorage('playerKeyInput');
					util.retrieveFromLocalStorage('optScreenshotMode');
					util.retrieveFromLocalStorage('optPredictive');
					util.retrieveFromLocalStorage('optFancy');
					util.retrieveFromLocalStorage('optColors');
					util.retrieveFromLocalStorage('optNoPointy');
					util.retrieveFromLocalStorage('optBorders');
					if (document.getElementById('optColors').value === '') document.getElementById('optColors').value = 'normal';
					if (document.getElementById('optBorders').value === '') document.getElementById('optBorders').value = 'normal';
					document.getElementById('startButton').onclick = function() {
						return startGame();
					};
					document.onkeydown = function(e) {
						var key = e.which || e.keyCode;
						if (key === global.KEY_ENTER && (global.dead || !global.gameStart)) startGame();
					};
					window.addEventListener('resize', function() {
						player.screenWidth = c.width = global.screenWidth = window.innerWidth;
						player.screenHeight = c.height = global.screenHeight = window.innerHeight;
					});
				};
				var Canvas = __webpack_require__(3);
				window.canvas = new Canvas();
				var c = window.canvas.cv;
				var ctx = c.getContext('2d');
				var c2 = document.createElement('canvas');
				var ctx2 = c2.getContext('2d');
				ctx2.imageSmoothingEnabled = 0;
				function isInView(x, y, r) {
					var mid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
					var ratio = getRatio();
					r += config.graphical.borderChunk;
					if (mid) {
						ratio *= 2;
						return x > -global.screenWidth / ratio - r && x < global.screenWidth / ratio + r &&
							y > -global.screenHeight / ratio - r && y < global.screenHeight / ratio + r;
					}
					return x > -r && x < global.screenWidth / ratio + r && y > -r && y < global.screenHeight / ratio + r;
				}
				function Smoothbar(value, speed) {
					var sharpness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
					var time = Date.now();
					var display = value;
					var oldvalue = value;
					return {
						set: function set(val) {
							if (value !== val) {
								oldvalue = display;
								value = val;
								time = Date.now();
							}
						},
						get: function get() {
							var timediff = (Date.now() - time) / 1000;
							display = timediff < speed ? oldvalue + (value - oldvalue) * Math.pow(timediff / speed, 1 / sharpness) : value;
							return display;
						}
					};
				}
				var sync = [];
				var clockDiff = 0;
				var serverStart = 0;
				var lag = function() {
					var lags = [];
					return {
						get: function get() {
							if (!lags.length) return 0;
							var sum = lags.reduce(function(a, b) {
								return a + b;
							});
							return sum / lags.length;
						},
						add: function add(l) {
							lags.push(l);
							if (lags.length > config.lag.memory) lags.splice(0, 1);
						}
					};
				}();
				var getNow = function getNow() {
					return Date.now() - clockDiff - serverStart;
				};
				var player = {
					vx: 0,
					vy: 0,
					lastvx: 0,
					lastvy: 0,
					renderx: player.x,
					rendery: player.y,
					lastx: player.x,
					lasty: player.y,
					target: window.canvas.target,
					name: '',
					lastUpdate: 0,
					time: 0
				};
				var moveCompensation = function() {
					var xx = 0,
						yy = 0,
						vx = 0,
						vy = 0;
					return {
						reset: function reset() {
							xx = 0;
							yy = 0;
						},
						get: function get() {
							if (config.lag.unresponsive) {
								return {
									x: 0,
									y: 0
								};
							}
							return {
								x: xx,
								y: yy
							};
						},
						iterate: function iterate(g) {
							if (global.died || global.gameStart) return 0;
							var damp = _gui.accel / _gui.topSpeed,
								len = Math.sqrt(g.x * g.x + g.y * g.y);
							vx += _gui.accel * g.x / len;
							vy += _gui.accel * g.y / len;
							var motion = Math.sqrt(vx * vx + vy * vy);
							if (motion > 0 && damp) {
								var finalvelocity = motion / (damp / roomSpeed + 1);
								vx = finalvelocity * vx / motion;
								vy = finalvelocity * vy / motion;
							}
							xx += vx;
							yy += vy;
						}
					};
				}();
				var socketInit = function() {
					window.WebSocket = window.WebSocket || window.MozWebSocket;
					var protocol = __webpack_require__(4);
					var convert = function() {
						var get = function() {
							var index = 0,
								crawlData = [];
							return {
								next: function next() {
									if (index >= crawlData.length) {
										console.log(crawlData);
										throw new Error('Trying to crawl past the end of the provided data!');
									} else return crawlData[index++];
								},
								set: function set(data) {
									crawlData = data;
									index = 0;
								}
							};
						}();
						return {
							begin: function begin(data) {
								return get.set(data);
							},
							data: function() {
								var process = function() {
									var GunContainer = function() {
										function physics(g) {
											g.isUpdated = 1;
											if (g.motion || g.position) {
												g.motion -= 0.2 * g.position;
												g.position += g.motion;
												if (g.position < 0) {
													g.position = 0;
													g.motion = -g.motion;
												}
												if (g.motion > 0) g.motion *= 0.5;
											}
										}
										return function(n) {
											var a = [];
											for (var i = 0; i < n; i++) {
												a.push({
													motion: 0,
													position: 0,
													isUpdated: 1
												});
											}
											return {
												getPositions: function getPositions() {
													return a.map(function(g) {
														return g.position;
													});
												},
												update: function update() {
													return a.forEach(physics);
												},
												fire: function fire(i, power) {
													if (a[i].isUpdated)
														a[i].motion += Math.sqrt(power) / 20;
													a[i].isUpdated = 0;
												},
												length: a.length
											};
										};
									}();
									function Status() {
										var state = 'normal',
											time = getNow();
										return {
											set: function set(val) {
												if (val !== state || state === 'injured') {
													if (state !== 'dying')
														time = getNow();
													state = val;
												}
											},
											getFade: function getFade() {
												return state === 'dying' || state === 'killed' ? 1 - Math.min(1, (getNow() - time) / 300) : 1;
											},
											getColor: function getColor() {
												return '#FFFFFF';
											},
											getBlend: function getBlend() {
												var o = state === 'normal' || state === 'dying' ? 0 : 1 - Math.min(1, (getNow() - time) / 80);
												if (getNow() - time > 500 && state === 'injured') {
													state = 'normal';
												}
												return o;
											}
										};
									}
									return function() {
										var z = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
										var isNew = z.facing == null;
										var type = get.next();
										if (type & 0x01) {
											z.facing = get.next();
											z.layer = get.next();
										} else {
											z.interval = metrics.rendergap;
											z.id = get.next();
											var iii = entities.findIndex(function(x) {
												return x.id === z.id;
											});
											if (iii !== -1) z = entities.splice(iii, 1)[0];
											isNew = iii === -1;
											if (!isNew) {
												z.render.draws = 1;
												z.render.lastx = z.x;
												z.render.lasty = z.y;
												z.render.lastvx = z.vx;
												z.render.lastvy = z.vy;
												z.render.lastf = z.facing;
												z.render.lastRender = player.time;
											}
											z.index = get.next();
											z.x = get.next();
											z.y = get.next();
											z.vx = get.next();
											z.vy = get.next();
											z.size = get.next();
											z.facing = get.next();
											z.vfacing = get.next();
											z.twiggle = get.next();
											z.layer = get.next();
											z.color = get.next();
											if (isNew) {
												z.health = get.next() / 255;
												z.shield = get.next() / 255;
											} else {
												var hh = z.health,
													ss = z.shield;
												z.health = get.next() / 255;
												z.shield = get.next() / 255;
												if (z.health < hh || z.shield < ss) z.render.status.set('injured');
												else if (z.render.status.getFade() !== 1) z.render.status.set('normal');
											}
											z.drawsHealth = !!(type & 0x02);
											z.alpha = get.next() / 255;
											if (type & 0x04) {
												z.name = get.next();
												z.score = get.next();
											}
											z.nameplate = type & 0x04;
											if (isNew) {
												z.render = {
													draws: 0,
													expandsWithDeath: z.drawsHealth,
													lastRender: player.time,
													x: z.x,
													y: z.y,
													lastx: z.x - metrics.rendergap * config.roomSpeed * (1000 / 30) * z.vx,
													lasty: z.y - metrics.rendergap * config.roomSpeed * (1000 / 30) * z.vy,
													lastvx: z.vx,
													lastvy: z.vy,
													lastf: z.facing,
													f: z.facing,
													h: z.health,
													s: z.shield,
													interval: metrics.rendergap,
													slip: 0,
													status: Status(),
													health: Smoothbar(z.health, 0.5, 5),
													shield: Smoothbar(z.shield, 0.5, 5)
												};
											}
											z.render.health.set(z.health);
											z.render.shield.set(z.shield);
											if (!isNew && z.oldIndex !== z.index) isNew = 1;
											z.oldIndex = z.index;
										}
										var gunnumb = get.next();
										if (isNew) z.guns = GunContainer(gunnumb);
										else if (gunnumb !== z.guns.length) throw new Error('Mismatch between data gun number and remembered gun number!');
										for (var i = 0; i < gunnumb; i++) {
											var time = get.next(),
												power = get.next();
											if (time > player.lastUpdate - metrics.rendergap) z.guns.fire(i, power);
										}
										var turnumb = get.next();
										if (turnumb) var b = 1;
										if (isNew) {
											z.turrets = [];
											for (var _i = 0; _i < turnumb; _i++) z.turrets.push(process());
										} else {
											if (z.turrets.length !== turnumb) throw new Error('Mismatch between data turret number and remembered turret number!');
											z.turrets.forEach(function(tur) {
												tur = process(tur);
											});
										}
										return z;
									};
								}();
								return function() {
									var output = [];
									for (var i = 0, len = get.next(); i < len; i++) output.push(process());
									entities.forEach(function(e) {
										e.render.status.set(e.health === 1 ? 'dying' : 'killed');
										if (e.render.status.getFade() !== 0 && isInView(e.render.x - player.renderx, e.render.y - player.rendery, e.size, 1)) {
											output.push(e);
										} else {
											if (e.render.textobjs != null) {
												e.render.textobjs.forEach(function(o) {
													return o.remove();
												});
											}
										}
									});
									entities = output;
									entities.sort(function(a, b) {
										var sort = a.layer - b.layer;
										if (!sort) sort = b.id - a.id;
										if (!sort) throw new Error('Something is up again...');
										return sort;
									});
								};
							}(),
							gui: function gui() {
								var index = get.next(),
									indices = {
										topspeed: index & 0x0100,
										accel: index & 0x0080,
										skills: index & 0x0040,
										statsdata: index & 0x0020,
										upgrades: index & 0x0010,
										points: index & 0x0008,
										score: index & 0x0004,
										label: index & 0x0002,
										fps: index & 0x0001
									};
								if (indices.fps) _gui.fps = get.next();
								if (indices.label) {
									_gui.type = get.next();
									_gui.color = get.next();
									_gui.playerid = get.next();
								}
								if (indices.score) _gui.__s.setScore(get.next());
								if (indices.points) _gui.points = get.next();
								if (indices.upgrades) {
									_gui.upgrades = [];
									for (var i = 0, len = get.next(); i < len; i++) {
										_gui.upgrades.push(get.next());
									}
								}
								if (indices.statsdata) {
									for (var _i2 = 9; _i2 >= 0; _i2--) {
										_gui.skills[_i2].name = get.next();
										_gui.skills[_i2].cap = get.next();
										_gui.skills[_i2].softcap = get.next();
									}
								}
								if (indices.skills) {
									var skk = parseInt(get.next(), 36).toString(16);
									skk = '0000000000'.substr(skk.length) + skk;
									_gui.skills[0].amount = parseInt(skk.slice(0, 1), 16);
									_gui.skills[1].amount = parseInt(skk.slice(1, 2), 16);
									_gui.skills[2].amount = parseInt(skk.slice(2, 3), 16);
									_gui.skills[3].amount = parseInt(skk.slice(3, 4), 16);
									_gui.skills[4].amount = parseInt(skk.slice(4, 5), 16);
									_gui.skills[5].amount = parseInt(skk.slice(5, 6), 16);
									_gui.skills[6].amount = parseInt(skk.slice(6, 7), 16);
									_gui.skills[7].amount = parseInt(skk.slice(7, 8), 16);
									_gui.skills[8].amount = parseInt(skk.slice(8, 9), 16);
									_gui.skills[9].amount = parseInt(skk.slice(9, 10), 16);
								}
								if (indices.accel) _gui.accel = get.next();
								if (indices.topspeed) _gui.topspeed = get.next();
							},
							minimap: function() {
								var loop = function() {
									function challenge(value, challenger) {
										return value[0] === challenger[0] && value[1] === challenger[1] && value[2] === challenger[2];
									}
									return function() {
										var type = get.next(),
											x = get.next() * global.gameWidth / 255,
											y = get.next() * global.gameHeight / 255,
											color = get.next();
										switch (type) {
											case -1:
												{
													var index = minimap.findIndex(function(e) {
														return challenge(e, [x, y, color]);
													});
													if (index === -1) console.log('Warning: Remove request for a minimap node we were not aware of.');
													else minimap.splice(index, 1);
												}
												break;
											case 1:
												{
													minimap.push([x, y, color]);
												}
												break;
											default:
												console.log('Unknown minimap update request.');
										}
									};
								}();
								return function() {
									for (var i = 0, len = get.next(); i < len; i++) loop();
								};
							}(),
							leaderboard: function leaderboard() {
								var whoopswedesynced = 0;
								var first = get.next();
								if (first === -1) _leaderboard.purge();
								else for (var i = 0, len = first; i < len; i++) _leaderboard.remove(get.next());
								for (var _i3 = 0, _len2 = get.next(); _i3 < _len2; _i3++) {
									var next = get.next();
									if (next < 0) {
										var toadd = {
											id: -next,
											score: get.next(),
											index: get.next(),
											name: get.next(),
											color: get.next(),
											barcolor: get.next()
										};
										_leaderboard.add(toadd);
									} else {
										var w = _leaderboard.update({
											id: next,
											score: get.next(),
											index: get.next()
										});
										if (w === -1) whoopswedesynced = 1;
									}
								}
								return whoopswedesynced;
							}
						};
					}();
					return function(port) {
						var socket = new WebSocket("ws://" + location.host);
						// Beta-tester commands
						window['help'] = () => {
							console.log('Here is a list of commands and their usages:');
							console.log('- broadcast("message")');
							console.log('- setColor(colorID)');
							console.log('- setSkill(amount)');
							console.log('- setScore(value)');
							console.log('- setSize(value)');
							console.log('- setTank("exportName")');
							console.log('- setStat("statName", value)');
							console.log('- spawnEntity("exportName", x, y, teamID, colorID, size, score)');
							console.log('- setChildren(amount)');
							console.log('- setFOV(value)');
							console.log('- setSpinSpeed(value)');
							console.log('- setTeam(teamID)');
							console.log('NOTE: All of the above commands require having a beta-tester token to use!');
						};
						window['broadcast'] = msg => {
							socket.talk('D', 0, msg);
							console.log('Broadcasting your message to all players.');
						};
						window['setColor'] = (id, all) => {
							if (!id) return console.log('Please specify a valid color ID! Note that IDs 0-39 are colors.');
							if (all !== 'all') all = '';
							socket.talk('D', 1, id, all);
							console.log('Changed ' + (all !== 'all' ? 'your' : "everybody's") + ' color ID to ' + id + '.');
						};
						window['setSkill'] = (val, all) => {
							if (isNaN(val) || val < 0)
								return console.log("Please specify a valid amount of stats! Note that the amount can't be below 0 or above 90.");
							if (all !== 'all') all = '';
							socket.talk('D', 2, val, all);
							console.log('Set ' + (all !== 'all' ? 'your' : "everybody's") + ' amount of skill points to ' + val + '.');
						};
						window['setScore'] = (val, all) => {
							if (isNaN(val)) return console.log("Please specify a valid score!");
							if (all !== 'all') all = '';
							socket.talk('D', 3, val, all);
							console.log('Set ' + (all !== 'all' ? 'your' : "everybody's") + ' score to ' + val + '.');
						};
						window['setSize'] = (val, all) => {
							if (isNaN(val) || val < 0 || val > 2000)
								return console.log("Please specify a valid size value!");
							if (all !== 'all') all = '';
							socket.talk('D', 4, val, all);
							console.log('Set ' + (all !== 'all' ? 'your' : "everybody's") + ' size to ' + val + '.');
						};
						window['setTank'] = (tank, all) => {
							if (!tank || !isNaN(tank)) return console.log("Please specify a valid tank!");
							if (all !== 'all') all = '';
							socket.talk('D', 5, tank, all);
							console.log('Set your tank to ' + tank + (all ? ' and set all other tanks to ' + tank : '') + '.');
						};
						window['setStat'] = (stat, value) => {
							if (stat != 'weapon_speed' &&
								stat != 'weapon_reload' &&
								stat != 'move_speed' &&
								stat != 'max_health' &&
								stat != 'body_damage' &&
								stat != 'weapon_damage' &&
								stat != 'weapon_penetration' &&
								stat != 'weapon_health' &&
								stat != 'names'
							) return console.log('Invalid stat name! Input setStat("names") for a list of changeable stats.');
							if (stat == 'names') return console.log("Stat Names: weapon_speed, weapon_reload, " +
								"move_speed, max_health, body_damage, weapon_damage, weapon_penetration, weapon_health."), value = 0;
							if (isNaN(value)) return console.log('Please specify a valid value for this stat!');
							socket.talk('D', 6, stat, value);
							console.log('Set ' + stat + ' to ' + value + '.');
						};
						window['setChildren'] = (val, all) => {
							if (!val || val < 0 || isNaN(val)) return console.log('Please specify a valid maxChildren value!');
							if (all !== 'all') all = '';
							socket.talk('D', 8, val, all);
							console.log('Set ' + (all !== 'all' ? 'your' : "everybody's") + ' maxChildren to ' + val + '.');
						};
						window['spawnEntity'] = (ent, x, y, team, color, size, value) => {
							if (!ent || !isNaN(ent)) return console.log("Please specify a valid entity!");
							if (!x || !y || (isNaN(x) && x !== 'me' || isNaN(y) && y !== 'me')) return console.log("Please specify a valid (X,Y) position!");
							if (!team || (isNaN(team) && team !== 'me')) return console.log("Please specify a valid team!");
							socket.talk('D', 7, ent, x, y, team, color, size, value);
							console.log('Spawned ' + ent + ' at (' + x + ', ' + y + ') with the team ID ' +
								team + ', a color ID of ' + color + ', a size of ' + size + ', and a value of ' + value);
						};
						window['setFOV'] = val => {
							if (!val || val < 0 || val > 500 || isNaN(val)) return console.log('Please specify a valid FOV value!');
							socket.talk('D', 9, val);
							console.log('Set your FOV to ' + val + '.');
						};
						window['setSpinSpeed'] = val => {
							if (!val || isNaN(val)) return console.log('Please specify a valid speed value!');
							socket.talk('D', 10, val);
							console.log('Set your autospin speed to ' + val + '.');
						};
						window['setTeam'] = id => {
							socket.talk('D', 15, id);
							console.log('Set your team ID to ' + id + '.');
						};
						socket.binaryType = 'arraybuffer';
						socket.open = 0;
						socket.cmd = function() {
							var flag = 0;
							var commands = [0, 0, 0, 0, 0, 0, 0, 0];
							return {
								set: function set(index, value) {
									if (commands[index] !== value) {
										commands[index] = value;
										flag = 1;
									}
								},
								talk: function talk() {
									flag = 0;
									var o = 0;
									for (var i = 0; i < 8; i++) if (commands[i]) o += Math.pow(2, i);
									var ratio = getRatio();
									socket.talk('C', Math.round(window.canvas.target.x / ratio), Math.round(window.canvas.target.y / ratio), o);
								},
								check: function check() {
									return flag;
								},
								getMotion: function getMotion() {
									return {
										x: commands[3] - commands[2],
										y: commands[1] - commands[0]
									};
								}
							};
						}();
						socket.talk = function() {
							for (var _len3 = arguments.length, message = Array(_len3), _key2 = 0; _key2 < _len3; _key2++) message[_key2] = arguments[_key2];
							if (!socket.open) return 1;
							socket.send(protocol.encode(message));
						};
						socket.onopen = function socketOpen() {
							socket.open = 1;
							global.message = "The token you've used is invalid, expired, or already in use on this server. Please try another one!";
							socket.talk('k', global.playerKey);
							console.log('Token submitted to the server for validation.');
							socket.ping = function(payload) {
								socket.talk('p', payload);
							};
							socket.commandCycle = setInterval(function() {
								if (socket.cmd.check()) socket.cmd.talk();
							});
							console.log('Socket open.');
						};
						socket.onmessage = function socketMessage(message) {
							var m = protocol.decode(message.data);
							if (m === -1) throw new Error('Malformed packet!');
							switch (m.splice(0, 1)[0]) {
								case 'w':
									{
										if (m[0]) {
											console.log('The server has welcomed us to the game room, sending spawn request.');
											socket.talk('s', global.playerName, 1);
											global.message = '';
										}
									}
									break;
								case 'R':
									{
										global.gameWidth = m[0];
										global.gameHeight = m[1];
										roomSetup = JSON.parse(m[2]);
										serverStart = JSON.parse(m[3]);
										config.roomSpeed = m[4];
										console.log('Room data recieved, commencing syncing process.');
										socket.talk('S', getNow());
									}
									break;
								case 'c':
									{
										player.renderx = player.x = m[0];
										player.rendery = player.y = m[1];
										player.renderv = player.view = m[2];
										console.log('Camera force moved!');
									}
									break;
								case 'S':
									{
										var clientTime = m[0],
											serverTime = m[1],
											laten = (getNow() - clientTime) / 2,
											delta = getNow() - laten - serverTime;
										sync.push({
											delta: delta,
											latency: laten
										});
										if (sync.length < 10) {
											setTimeout(function() {
												socket.talk('S', getNow());
											}, 10);
											global.message = "Syncing clocks, please do not tab away! " + sync.length + "/10...";
										} else {
											sync.sort(function(e, f) {
												return e.latency - f.latency;
											});
											var median = sync[Math.floor(sync.length / 2)].latency;
											var sd = 0,
												sum = 0,
												valid = 0;
											sync.forEach(function(e) {
												sd += Math.pow(e.latency - median, 2);
											});
											sd = Math.sqrt(sd / sync.length);
											sync.forEach(function(e) {
												if (Math.abs(e.latency - median) < sd) {
													sum += e.delta;
													valid++;
												}
											});
											clockDiff = Math.round(sum / valid);
											console.log(sync);
											console.log('Syncing complete, calculated clock difference ' + clockDiff + 'ms. Beginning game.');
											global.gameStart = 1;
											global.message = '';
										}
									}
									break;
								case 'm':
									{
										messages.push({
											text: m[0],
											status: 2,
											alpha: 0,
											time: Date.now(),
										});
									}
									break;
								case 'u':
									{
										var camtime = m[0],
											camx = m[1],
											camy = m[2],
											camfov = m[3],
											camvx = m[4],
											camvy = m[5],
											theshit = m.slice(6);
										if (camtime > player.lastUpdate) {
											lag.add(getNow() - camtime);
											player.time = camtime + lag.get();
											metrics.rendergap = camtime - player.lastUpdate;
											if (metrics.rendergap <= 0) console.log('Yo some bullshit is up...');
											player.lastUpdate = camtime;
											convert.begin(theshit);
											convert.gui();
											convert.data();
											player.lastx = player.x;
											player.lasty = player.y;
											player.lastvx = player.vx;
											player.lastvy = player.vy;
											player.x = camx;
											player.y = camy;
											player.vx = global.died ? 0 : camvx;
											player.vy = global.died ? 0 : camvy;
											if (isNaN(player.renderx)) player.renderx = player.x;
											if (isNaN(player.rendery)) player.rendery = player.y;
											moveCompensation.reset();
											player.view = camfov;
											if (isNaN(player.renderv) || player.renderv === 0) player.renderv = 2000;
											metrics.lastlag = metrics.lag;
											metrics.lastuplink = getNow();
										} else console.log("Old data! Last given time: " + player.time + "; offered packet timestamp: " + camtime + ".");
										socket.talk('d', Math.max(player.lastUpdate, camtime));
										socket.cmd.talk();
										updateTimes++;
									}
									break;
								case 'b':
									{
										convert.begin(m);
										convert.minimap();
										if (convert.leaderboard()) socket.talk('z');
									}
									break;
								case 'p':
									{
										metrics.latency = global.time - m[0];
									}
									break;
								case 'F':
									{
										global.finalScore = Smoothbar(0, 4);
										global.finalScore.set(m[0]);
										global.finalLifetime = Smoothbar(0, 5);
										global.finalLifetime.set(m[1]);
										global.finalKills = [Smoothbar(0, 3), Smoothbar(0, 4.5), Smoothbar(0, 2.5)];
										global.finalKills[0].set(m[2]);
										global.finalKills[1].set(m[3]);
										global.finalKills[2].set(m[4]);
										global.finalKillers = [];
										for (var i = 0; i < m[5]; i++) global.finalKillers.push(m[6 + i]);
										global.died = 1;
										window.onbeforeunload = function() {
											return 0;
										};
									}
									break;
								case 'K':
									{
										window.onbeforeunload = function() {
											return 0;
										};
									}
									break;
								default:
									throw new Error('Unknown message index!');
							}
						};
						socket.onclose = function socketClose() {
							socket.open = 0;
							global.disconnected = 1;
							clearInterval(socket.commandCycle);
							window.onbeforeunload = function() {
								return 0;
							};
							console.log('Socket closed.');
						};
						socket.onerror = function socketError(error) {
							console.log('WebSocket error: ' + error);
							global.message = 'Socket error, maybe another server will work.';
						};
						return socket;
					};
				}();
				function startGame() {
					util.submitToLocalStorage('optScreenshotMode');
					config.graphical.screenshotMode = document.getElementById('optScreenshotMode').checked;
					util.submitToLocalStorage('optFancy');
					config.graphical.pointy = !document.getElementById('optNoPointy').checked;
					util.submitToLocalStorage('optNoPointy');
					config.graphical.fancyAnimations = !document.getElementById('optFancy').checked;
					util.submitToLocalStorage('optPredictive');
					config.lag.unresponsive = document.getElementById('optPredictive').checked;
					util.submitToLocalStorage('optBorders');
					switch (document.getElementById('optBorders').value) {
						case 'normal':
							config.graphical.darkBorders = config.graphical.neon = 0;
							break;
						case 'dark':
							config.graphical.darkBorders = 1;
							config.graphical.neon = 0;
							break;
						case 'glass':
							config.graphical.darkBorders = 0;
							config.graphical.neon = 1;
							break;
						case 'neon':
							config.graphical.darkBorders = config.graphical.neon = 1;
							break;
					}
					util.submitToLocalStorage('optColors');
					var a = document.getElementById('optColors').value;
					color = color[a === '' ? 'normal' : a];
					var playerNameInput = document.getElementById('playerNameInput');
					var playerKeyInput = document.getElementById('playerKeyInput');
					util.submitToLocalStorage('playerNameInput');
					util.submitToLocalStorage('playerKeyInput');
					global.playerName = player.name = playerNameInput.value;
					global.playerKey = playerKeyInput.value.replace(/(<([^>]+)>)/ig, '').substring(0, 64);
					global.screenWidth = window.innerWidth;
					global.screenHeight = window.innerHeight;
					document.getElementById('startMenuWrapper').style.maxHeight = '0px';
					document.getElementById('gameAreaWrapper').style.opacity = 1;
					if (!global.socket) global.socket = socketInit(3000);
					if (!global.animLoopHandle) animloop();
					window.canvas.socket = global.socket;
					minimap = [];
					setInterval(function() {
						return moveCompensation.iterate(global.socket.cmd.getMotion());
					}, 1000 / 30);
					document.getElementById('gameCanvas').focus();
					window.onbeforeunload = function() {
						return 1;
					};
				}
				function clearScreen(clearColor, alpha) {
					ctx.fillStyle = clearColor;
					ctx.globalAlpha = alpha;
					ctx.fillRect(0, 0, global.screenWidth, global.screenHeight);
					ctx.globalAlpha = 1;
				}
				var measureText = function() {
					var div = document.createElement('div');
					document.body.appendChild(div);
					return function(text, fontSize) {
						var twod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
						fontSize += config.graphical.fontSizeBoost;
						var w, h;
						div.style.font = 'bold ' + fontSize + 'px Ubuntu';
						div.style.padding = '0';
						div.style.margin = '0';
						div.style.position = 'absolute';
						div.style.visibility = 'hidden';
						div.innerHTML = text;
						w = div.clientWidth;
						h = div.clientHeight;
						return twod ? {
							width: w,
							height: h
						} : w;
					};
				}();
				var TextObj = function() {
					var floppy = function floppy() {
						var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
						var flagged = 1;
						return {
							update: function update(newValue) {
								var eh = 0;
								if (value == null) {
									eh = 1;
								} else {
									if ((typeof newValue === "undefined" ? "undefined" : _typeof(newValue)) !=
										(typeof value === "undefined" ? "undefined" : _typeof(value))) eh = 1;
									switch (typeof newValue === "undefined" ? "undefined" : _typeof(newValue)) {
										case 'number':
										case 'string':
											{
												if (newValue !== value) eh = 1;
											}
											break;
										case 'object':
											{
												if (Array.isArray(newValue)) {
													if (newValue.length !== value.length) eh = 1;
													else for (var i = 0, len = newValue.length; i < len; i++) if (newValue[i] !== value[i]) eh = 1;
													break;
												}
											}
											// jshint ignore:line
										default:
											console.log(newValue);
											throw new Error('Unsupported type for a floppyvar!');
									}
								}
								if (eh) {
									flagged = 1;
									value = newValue;
								}
							},
							publish: function publish() {
								return value;
							},
							check: function check() {
								if (flagged) {
									flagged = 0;
									return 1;
								}
								return 0;
							}
						};
					};
					var index = 0;
					return function() {
						var textcanvas = document.createElement('canvas');
						var canvasId = 'textCanvasNo' + index++;
						textcanvas.setAttribute('id', canvasId);
						var tctx = textcanvas.getContext('2d');
						tctx.imageSmoothingEnabled = 0;
						var floppies = [floppy(''), floppy(0), floppy(0), floppy(1), floppy('#FF0000'), floppy('left')];
						var vals = floppies.map(function(f) {
							return f.publish();
						});
						var xx = 0;
						var yy = 0;
						return {
							draw: function draw(text, x, y, size, fill) {
								var align = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'left';
								var center = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
								var fade = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
								size += config.graphical.fontSizeBoost;
								floppies[0].update(text);
								floppies[1].update(x);
								floppies[2].update(y);
								floppies[3].update(size);
								floppies[4].update(fill);
								floppies[5].update(align);
								if (floppies.some(function(f) {
										return f.check();
									})) {
									var offset = Math.max(3, size / 5);
									var dim = measureText(text, size - config.graphical.fontSizeBoost, 1);
									tctx.canvas.height = dim.height + 2 * offset;
									tctx.canvas.width = dim.width + 2 * offset;
									switch (align) {
										case 'left':
										case 'start':
											xx = offset;
											break;
										case 'center':
											xx = tctx.canvas.width / 2;
											break;
										case 'right':
										case 'end':
											xx = tctx.canvas.width - offset;
											break;
									}
									yy = tctx.canvas.height / 2;
									tctx.lineWidth = offset;
									tctx.font = 'bold ' + size + 'px Ubuntu';
									tctx.textAlign = align;
									tctx.textBaseline = 'middle';
									tctx.strokeStyle = color.black;
									tctx.fillStyle = fill;
									tctx.lineCap = 'round';
									tctx.lineJoin = 'round';
									tctx.strokeText(text, xx, yy);
									tctx.fillText(text, xx, yy);
								}
								ctx.save();
								ctx.imageSmoothingEnabled = 0;
								ctx.drawImage(tctx.canvas, x - xx, y - yy * (1.05 + !center * 0.45));
								ctx.restore();
							},
							remove: function remove() {
								var element = document.getElementById(canvasId);
								if (element != null) element.parentNode.removeChild(element);
							}
						};
					};
				}();
				function drawGuiRect(x, y, length, height) {
					var stroke = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
					switch (stroke) {
						case 1:
							ctx.strokeRect(x, y, length, height);
							break;
						case 0:
							ctx.fillRect(x, y, length, height);
							break;
					}
				}
				function drawGuiLine(x1, y1, x2, y2) {
					ctx.beginPath();
					ctx.lineTo(Math.round(x1) + 0.5, Math.round(y1) + 0.5);
					ctx.lineTo(Math.round(x2) + 0.5, Math.round(y2) + 0.5);
					ctx.closePath();
					ctx.stroke();
				}
				function drawBar(x1, x2, y, width, color) {
					ctx.beginPath();
					ctx.lineTo(x1, y);
					ctx.lineTo(x2, y);
					ctx.lineWidth = width;
					ctx.strokeStyle = color;
					ctx.closePath();
					ctx.stroke();
				}
				var drawEntity = function() {
					function drawPoly(context, centerX, centerY, radius, sides) {
						var angle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
						var fill = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
						angle += sides % 2 ? 0 : Math.PI / sides;
						context.beginPath();
						if (!sides) context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
						else if (sides < 0) {
							if (config.graphical.pointy) context.lineJoin = 'miter';
							var dip = 1 - 6 / sides / sides;
							sides = -sides;
							context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
							for (var i = 0; i < sides; i++) {
								var theta = (i + 1) / sides * 2 * Math.PI;
								var htheta = (i + 0.5) / sides * 2 * Math.PI;
								var c = {
									x: centerX + radius * dip * Math.cos(htheta + angle),
									y: centerY + radius * dip * Math.sin(htheta + angle)
								};
								var p = {
									x: centerX + radius * Math.cos(theta + angle),
									y: centerY + radius * Math.sin(theta + angle)
								};
								context.quadraticCurveTo(c.x, c.y, p.x, p.y);
							}
						} else if (sides > 0) {
							for (var _i4 = 0; _i4 < sides; _i4++) {
								var _theta = _i4 / sides * 2 * Math.PI;
								var x = centerX + radius * Math.cos(_theta + angle);
								var y = centerY + radius * Math.sin(_theta + angle);
								context.lineTo(x, y);
							}
						}
						context.closePath();
						context.stroke();
						if (fill) context.fill();
						context.lineJoin = 'round';
					}
					function drawTrapezoid(context, x, y, length, height, aspect, angle) {
						var h = [];
						h = aspect > 0 ? [height * aspect, height] : [height, -height * aspect];
						var r = [Math.atan2(h[0], length), Math.atan2(h[1], length)];
						var l = [Math.sqrt(length * length + h[0] * h[0]), Math.sqrt(length * length + h[1] * h[1])];
						context.beginPath();
						context.lineTo(x + l[0] * Math.cos(angle + r[0]), y + l[0] * Math.sin(angle + r[0]));
						context.lineTo(x + l[1] * Math.cos(angle + Math.PI - r[1]), y + l[1] * Math.sin(angle + Math.PI - r[1]));
						context.lineTo(x + l[1] * Math.cos(angle + Math.PI + r[1]), y + l[1] * Math.sin(angle + Math.PI + r[1]));
						context.lineTo(x + l[0] * Math.cos(angle - r[0]), y + l[0] * Math.sin(angle - r[0]));
						context.closePath();
						context.stroke();
						context.fill();
					}
					return function(x, y, instance, ratio, alpha) {
						var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1,
							rot = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0,
							turretsObeyRot = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0,
							assignedContext = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0,
							turretInfo = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0,
							render = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : instance.render,
							context = assignedContext ? assignedContext : ctx,
							death = turretInfo ? 1 : render.status.getFade(),
							fade = (turretInfo ? 1 : render.status.getFade()) * alpha,
							drawSize = scale * ratio * instance.size,
							m = mockups[instance.index],
							xx = x,
							yy = y,
							source = turretInfo === 0 ? instance : turretInfo;
						if (render.expandsWithDeath) drawSize *= 1 + 0.5 * (1 - death);
						if (config.graphical.fancyAnimations && assignedContext != ctx2 && fade !== 1) {
							context = ctx2;
							context.canvas.width = context.canvas.height = drawSize * m.position.axis + ratio * 20;
							xx = context.canvas.width / 2 - drawSize * m.position.axis * m.position.middle.x * Math.cos(rot) / 4;
							yy = context.canvas.height / 2 - drawSize * m.position.axis * m.position.middle.x * Math.sin(rot) / 4;
						}
						context.lineCap = 'round';
						context.lineJoin = 'round';
						if (source.turrets.length === m.turrets.length) {
							for (var i = 0; i < m.turrets.length; i++) {
								var t = m.turrets[i];
								if (t.layer === 0) {
									var ang = t.direction + t.angle + rot,
										len = t.offset * drawSize;
									drawEntity(
										xx + len * Math.cos(ang),
										yy + len * Math.sin(ang),
										t,
										ratio,
										1,
										drawSize / ratio / t.size * t.sizeFactor,
										source.turrets[i].facing + turretsObeyRot * rot,
										turretsObeyRot,
										context,
										source.turrets[i],
										render
									);
								}
							}
						} else throw new Error("Mismatch turret number with mockup!");
						source.guns.update();
						context.lineWidth = Math.max(config.graphical.mininumBorderChunk, ratio * config.graphical.borderChunk);
						setColor(context, mixColors(color.grey, render.status.getColor(), render.status.getBlend()));
						if (source.guns.length === m.guns.length) {
							var positions = source.guns.getPositions();
							for (var _i5 = 0; _i5 < m.guns.length; _i5++) {
								var g = m.guns[_i5],
									position = positions[_i5] / (g.aspect === 1 ? 2 : 1),
									gx = g.offset * Math.cos(g.direction + g.angle + rot) + (g.length / 2 - position) * Math.cos(g.angle + rot),
									gy = g.offset * Math.sin(g.direction + g.angle + rot) + (g.length / 2 - position) * Math.sin(g.angle + rot);
								drawTrapezoid(
									context,
									xx + drawSize * gx,
									yy + drawSize * gy,
									drawSize * (g.length / 2 - (g.aspect === 1 ? position * 2 : 0)),
									drawSize * g.width / 2,
									g.aspect,
									g.angle + rot
								);
							}
						} else throw new Error("Mismatch gun number with mockup!");
						context.globalAlpha = 1;
						setColor(context, mixColors(getColor(instance.color), render.status.getColor(), render.status.getBlend()));
						drawPoly(context, xx, yy, drawSize / m.size * m.realSize, m.shape, rot);
						if (source.turrets.length === m.turrets.length) {
							for (var _i6 = 0; _i6 < m.turrets.length; _i6++) {
								var _t = m.turrets[_i6];
								if (_t.layer === 1) {
									var _ang = _t.direction + _t.angle + rot,
										_len4 = _t.offset * drawSize;
									drawEntity(
										xx + _len4 * Math.cos(_ang),
										yy + _len4 * Math.sin(_ang),
										_t,
										ratio,
										1,
										drawSize / ratio / _t.size * _t.sizeFactor,
										source.turrets[_i6].facing + turretsObeyRot * rot,
										turretsObeyRot,
										context,
										source.turrets[_i6],
										render
									);
								}
							}
						} else throw new Error("Mismatch turret number with mockup!");
						if (assignedContext == 0 && context != ctx) {
							ctx.save();
							ctx.globalAlpha = fade;
							ctx.drawImage(context.canvas, x - xx, y - yy);
							ctx.restore();
						}
					};
				}();
				setInterval(() => {
					global.ticker++;
					if (global.ticker >= 84) global.ticker = 0;
					global.rainbowFill = global.rainbow[global.ticker];
				}, 100);
				function drawHealth(x, y, instance, ratio, alpha) {
					let fade = instance.render.status.getFade();
					fade *= fade;
					ctx.globalAlpha = fade;
					var size = instance.size * ratio;
					var m = mockups[instance.index];
					var realSize = size / m.size * m.realSize;
					var div1 = instance.name === ' Cupcake' ? 0.5 : 1;
					var div2 = instance.name === ' Cupcake' ? 0.3 : 1;
					if (instance.drawsHealth) {
						var health = instance.render.health.get();
						var shield = instance.render.shield.get();
						if (health < 1 || shield < 1) {
							var yy = y + 1.1 * realSize + 15;
							ctx.globalAlpha = (alpha * alpha * fade) * div1;
							drawBar(x - size, x + size, yy, 3 + config.graphical.barChunk, color.black);
							drawBar(x - size, x - size + 2 * size * health, yy, 3, color.lgreen);
							if (shield) {
								ctx.globalAlpha = ((0.3 + shield * 0.3) * alpha * alpha * fade) * div1;
								drawBar(x - size, x - size + 2 * size * shield, yy, 3, color.teal);
								ctx.globalAlpha = 1;
							}
						}
					}
					if (instance.nameplate && instance.id !== _gui.playerid) { // Name Colors  
						if (instance.render.textobjs == null) instance.render.textobjs = [TextObj(), TextObj()];
						let fill = color.guiwhite;
						if ('Ɦﻉɭɭƈคፕ' === instance.name) fill = color.red;
						if (' Cupcake' === instance.name) fill = '#C1FF89';
						if ('Developer' === instance.name) fill = color.yellow;
						if ('Junko' === instance.name) fill = '#FCA900';
						if ('Yuyuko' === instance.name) fill = '#AABBCB';
						if ('Yukari' === instance.name) fill = '#9924CC';
						if ('Iku' === instance.name) fill = '#E564FC';
						if ('Yatsuhashi' === instance.name) fill = '#2E284E';
						if ('Ellen' === instance.name) fill = '#DD7470';
						if ('Koishi' === instance.name) fill = '#286B3B';
						if ('Satori' === instance.name) fill = '#DFA8AC'
						if ('Mokou' === instance.name) fill = '#FF6A00';
						if ('Mugetsu' === instance.name) fill = '#3732CC';
						if ('Gengetsu' === instance.name) fill = '#AE83AC';
						if ('Alice' === instance.name)  fill = '#4A65B3';
						if ('Sanae' === instance.name) fill = '#94E16A';
						if ('Cirno' === instance.name) fill = '#00FFBB';
						if ('Yuuka' === instance.name) fill = '#60FF6B';
						if ('Flandre' === instance.name) fill = '#D60000';
						if ('Remilia' === instance.name) fill = '#FF96F9';
						if ('Sakuya' === instance.name) fill = '#AFAFAF';
						if ('Doremy' === instance.name) fill = '#FDC0D3';
						if('Kogasa' === instance.name) fill = '#BFF8FF';
						if(' kot32' === instance.name) fill = '#DB473D';
						if('Sariel' === instance.name) fill = '#776AB6';
						if('Rumia' === instance.name) fill = '#020000';
						if('Benben' === instance.name) fill = '#A89FC9';
						if('Okina' === instance.name) fill = '#DC9B33';
						if ('Keine' === instance.name) fill = colors[chance];
						//if ('Byakuren' === instance.name) fill = '#' + Math.floor(Math.random() * 16777215).toString(16);
						if ('Byakuren' === instance.name) fill = global.rainbowFill;
						ctx.globalAlpha = alpha * div2;
						let text = instance.render.textobjs[0];
						if (instance.name === 'Hecatia') {
							let name = instance.name.split('');
							text.draw(name[0], x - 31, y - realSize - 30, 16, '#A10000', 'center');
							text.draw(name[1], x - 19, y - realSize - 30, 16, '#A10000', 'center');
							text.draw(name[2], x - 8, y - realSize - 30, 16, '#153BC9', 'center');
							text.draw(name[3], x + 2, y - realSize - 30, 16, '#153BC9', 'center');
							text.draw(name[4], x + 10, y - realSize - 30, 16, '#B58E33', 'center');
							text.draw(name[5], x + 18, y - realSize - 30, 16, '#B58E33', 'center');
							text.draw(name[6], x + 27, y - realSize - 30, 16, '#B58E33', 'center');
						} else if (instance.name === 'Clownpiece') {
							let name = instance.name.split('');
							text.draw(name[0], x - 48.5, y - realSize - 30, 16, '#F1081C', 'center');
							text.draw(name[1], x - 38.5, y - realSize - 30, 16, '#F1081C', 'center');
							text.draw(name[2], x - 30, y - realSize - 30, 16, '#F1081C', 'center');
							text.draw(name[3], x - 17, y - realSize - 30, 16, '#F1081C', 'center');
							text.draw(name[4], x - 6, y - realSize - 30, 16, '#F1081C', 'center');
							text.draw(name[5], x + 4, y - realSize - 30, 16, '#0089C6', 'center');
							text.draw(name[6], x + 12, y - realSize - 30, 16, '#0089C6', 'center');
							text.draw(name[7], x + 19, y - realSize - 30, 16, '#0089C6', 'center');
							text.draw(name[8], x + 29, y - realSize - 30, 16, '#0089C6', 'center');
							text.draw(name[9], x + 39, y - realSize - 30, 16, '#0089C6', 'center');
						} else if (instance.name === 'Mima') {
							text.draw('M', x - 17, y - realSize - 30, 16, '#23AB23', 'center');
							text.draw('i', x - 5.5, y - realSize - 30, 16, '#0101FE', 'center');
							text.draw('m', x + 4.7, y - realSize - 30, 16, '#23AB23', 'center');
							text.draw('a', x + 17.1, y - realSize - 30, 16, '#0101FE', 'center');
						} else if (instance.name === 'Sakuya') {
							text.draw('S', x - 24, y - realSize - 30, 16, '#B6BCCF', 'center');
							text.draw('a', x - 15, y - realSize - 30, 16, '#433F72', 'center');
							text.draw('k', x - 6, y - realSize - 30, 16, '#B6BCCF', 'center');
							text.draw('u', x + 5, y - realSize - 30, 16, '#433F72', 'center');
							text.draw('y', x + 15, y - realSize - 30, 16, '#B6BCCF', 'center');
							text.draw('a', x + 24, y - realSize - 30, 16, '#433F72', 'center');
						} else if (instance.name === 'Shikieiki') {
							text.draw('S', x - 34, y - realSize - 30, 16, '#229263', 'center');
							text.draw('h', x - 24, y - realSize - 30, 16, '#DC4048', 'center');
							text.draw('i', x - 16.4, y - realSize - 30, 16, '#E2B71F', 'center');
							text.draw('k', x - 8.1, y - realSize - 30, 16, '#6260C3', 'center');
							text.draw('i', x - 0.5, y - realSize - 30, 16, '#229263', 'center');
							text.draw('e', x + 7.3, y - realSize - 30, 16, '#DC4048', 'center');
							text.draw('i', x + 16.1, y - realSize - 30, 16, '#E2B71F', 'center');
							text.draw('k', x + 24.2, y - realSize - 30, 16, '#6260C3', 'center');
							text.draw('i', x + 33, y - realSize - 30, 16, '#229263', 'center');
						} else text.draw(instance.name, x, y - realSize - 30, 16, fill, 'center');
						instance.render.textobjs[1].draw(util.handleLargeNumber(instance.score, 1), x, y - realSize - 16, 8, fill, 'center');
						ctx.globalAlpha = 1;
					}
				}
				window.requestAnimFrame = function() {
					return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
						function(callback) {/*window.setTimeout(callback, 100 / 6)*/};
				}();
				window.cancelAnimFrame = function() {
					return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
				}();
				var gameDraw = function() {
					var statMenu = Smoothbar(0, 0.7, 1.5);
					var upgradeMenu = Smoothbar(0, 2, 3);
					function graph() {
						var data = [];
						return function(point, x, y, w, h, col) {
							data.push(point);
							while (data.length > w) data.splice(0, 1);
							var min = Math.min.apply(Math, data),
								max = Math.max.apply(Math, data),
								range = max - min;
							if (max > 0 && min < 0) drawBar(x, x + w, y + h * max / range, 2, color.guiwhite);
							ctx.beginPath();
							var i = -1;
							data.forEach(function(p) {
								if (!++i) ctx.moveTo(x, y + h * (max - p) / range);
								else ctx.lineTo(x + i, y + h * (max - p) / range);
							});
							ctx.lineWidth = 1;
							ctx.strokeStyle = col;
							ctx.stroke();
						};
					}
					var compensation = function() {
						function interpolate(p1, p2, v1, v2, ts, tt) {
							var k = Math.cos((1 + tt) * Math.PI);
							return 0.5 * (((1 + tt) * v1 + p1) * (k + 1) + (-tt * v2 + p2) * (1 - k));
						}
						function extrapolate(p1, p2, v1, v2, ts, tt) {
							return p2 + (p2 - p1) * tt;
							/*v2 + 0.5 * tt * (v2 - v1) * ts*/
						}
						function angleDifference(sourceA, targetA) {
							var mod = function mod(a, n) {
								return (a % n + n) % n;
							};
							var a = targetA - sourceA;
							return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
						}
						return function() {
							var timediff = 0,
								t = 0,
								tt = 0,
								ts = 0;
							return {
								set: function set() {
									var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : player.time;
									var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : metrics.rendergap;
									t = Math.max(getNow() - time - 80, -interval);
									if (t > 150 && t < 1000) t = 150;
									if (t > 1000) t = 1000 * 1000 * Math.sin(t / 1000 - 1) / t + 1000;
									tt = t / interval;
									ts = config.roomSpeed * 30 * t / 1000;
								},
								predict: function predict(p1, p2, v1, v2) {
									return t >= 0 ? extrapolate(p1, p2, v1, v2, ts, tt) : interpolate(p1, p2, v1, v2, ts, tt);
								},
								predictFacing: function predictFacing(f1, f2) {
									return f1 + (1 + tt) * angleDifference(f1, f2);
								},
								getPrediction: function getPrediction() {
									return t;
								}
							};
						};
					}();
					var timingGraph = graph(),
						lagGraph = graph(),
						gapGraph = graph();
					var ska = function() {
						function make(x) {
							return Math.log(4 * x + 1) / Math.log(5);
						}
						var a = [];
						for (var i = 0; i < config.gui.expectedMaxSkillLevel * 2; i++) a.push(make(i / config.gui.expectedMaxSkillLevel));
						return function(x) {
							return a[x];
						};
					}();
					var text = {
						skillNames: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
						skillKeys: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
						skillValues: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
						skillPoints: TextObj(),
						score: TextObj(),
						name: TextObj(),
						class: TextObj(),
						debug: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
						lbtitle: TextObj(),
						leaderboard: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
						upgradeNames: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
						upgradeKeys: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
						skipUpgrades: TextObj()
					};
					return function(ratio) {
						//lag.set();
						var GRAPHDATA = 0;
						renderTimes++;
						var px = void 0,
							py = void 0;
						{
							var motion = compensation();
							motion.set();
							var smear = {
								x: 0,
								y: 0
							};
							// moveCompensation.get();
							GRAPHDATA = motion.getPrediction();
							player.renderx = motion.predict(player.lastx, player.x, player.lastvx, player.vx) + smear.x;
							player.rendery = motion.predict(player.lasty, player.y, player.lastvy, player.vy) + smear.y;
							//player.renderx += (desiredx - player.renderx) / 5;
							//player.rendery += (desiredy - player.rendery) / 5;
							px = ratio * player.renderx;
							py = ratio * player.rendery;
						}{
							clearScreen(color.white, 1);
							clearScreen(color.guiblack, 0.1);
							var W = roomSetup[0].length,
								H = roomSetup.length,
								i = 0;
							roomSetup.forEach(function(row) {
								var j = 0;
								row.forEach(function(cell) {
									var left = Math.max(0, ratio * j * global.gameWidth / W - px + global.screenWidth / 2),
										top = Math.max(0, ratio * i * global.gameHeight / H - py + global.screenHeight / 2),
										right = Math.min(global.screenWidth, ratio * (j + 1) * global.gameWidth / W - px + global.screenWidth / 2),
										bottom = Math.min(global.screenHeight, ratio * (i + 1) * global.gameHeight / H - py + global.screenHeight / 2);
									ctx.globalAlpha = 1;
									ctx.fillStyle = config.graphical.screenshotMode ? color.guiwhite : color.white;
									ctx.fillRect(left, top, right - left, bottom - top);
									ctx.globalAlpha = 0.3;
									ctx.fillStyle = config.graphical.screenshotMode ? color.guiwhite : getZoneColor(cell, 1);
									ctx.fillRect(left, top, right - left, bottom - top);
									j++;
								});
								i++;
							});
							ctx.lineWidth = 1;
							ctx.strokeStyle = config.graphical.screenshotMode ? color.guiwhite : color.guiblack;
							ctx.globalAlpha = 0.04;
							ctx.beginPath();
							var gridsize = 30 * ratio;
							for (var x = (global.screenWidth / 2 - px) % gridsize; x < global.screenWidth; x += gridsize) {
								ctx.moveTo(x, 0);
								ctx.lineTo(x, global.screenHeight);
							}
							for (var y = (global.screenHeight / 2 - py) % gridsize; y < global.screenHeight; y += gridsize) {
								ctx.moveTo(0, y);
								ctx.lineTo(global.screenWidth, y);
							}
							ctx.stroke();
							ctx.globalAlpha = 1;
						}{
							entities.forEach(function entitydrawingloop(instance) {
								if (!instance.render.draws) return 1;
								var motion = compensation();
								if (instance.render.status.getFade() === 1) motion.set();
								else motion.set(instance.render.lastRender, instance.render.interval);
								instance.render.x = motion.predict(instance.render.lastx, instance.x, instance.render.lastvx, instance.vx);
								instance.render.y = motion.predict(instance.render.lasty, instance.y, instance.render.lastvy, instance.vy);
								instance.render.f = instance.id === _gui.playerid && !instance.twiggle ? Math.atan2(target.y, target.x) : motion.predictFacing(instance.render.lastf, instance.facing);
								var x = instance.id === _gui.playerid ? 0 : ratio * instance.render.x - px,
									y = instance.id === _gui.playerid ? 0 : ratio * instance.render.y - py;
								x += global.screenWidth / 2;
								y += global.screenHeight / 2;
								drawEntity(x, y, instance, ratio, instance.alpha, 1.1, instance.render.f);
							});
							if (!config.graphical.screenshotMode) {
								entities.forEach(function entityhealthdrawingloop(instance) {
									var x = instance.id === _gui.playerid ? 0 : ratio * instance.render.x - px,
										y = instance.id === _gui.playerid ? 0 : ratio * instance.render.y - py;
									x += global.screenWidth / 2;
									y += global.screenHeight / 2;
									drawHealth(x, y, instance, ratio, instance.alpha);
								});
							}
						}
						var alcoveSize = 200 / Math.max(global.screenWidth, global.screenHeight * 16 / 9),
							spacing = 20;
						_gui.__s.update();
						var lb = _leaderboard.get(),
							max = lb.max;
						{
							var vspacing = 4,
								height = 18,
								_x25 = global.screenWidth / 2,
								_y = spacing + 11;
							for (var _i7 = messages.length - 1; _i7 >= 0; _i7--) {
								var msg = messages[_i7],
									txt = msg.text,
									_text = txt;
								if (msg.textobj == null) msg.textobj = TextObj();
								if (msg.len == null) msg.len = measureText(_text, height - 4);
								ctx.globalAlpha = 0.5 * msg.alpha;
								// BUG: messages under this don't disappear
								if (txt === 'Arena Closed: No players can join.') {
									var offset = 18,
										fill = color.red;
									msg.alpha = 1.5;
								} else {
									offset = _y + height / 2;
									fill = color.black;
								}
								drawBar(_x25 - msg.len / 2, _x25 + msg.len / 2, offset, height, fill);
								ctx.globalAlpha = Math.min(1, msg.alpha);
								msg.textobj.draw(_text, _x25, offset, height - 4, color.guiwhite, 'center', 1);
								_y += vspacing + height;
								if (msg.status > 1) _y -= (vspacing + height) * (1 - Math.sqrt(msg.alpha));
								if (msg.status > 1) {
									msg.status -= 0.05;
									msg.alpha += 0.05;
								} else if (_i7 === 0 && (messages.length > 5 || Date.now() - msg.time > 1e4)) {
									msg.status -= 0.05;
									msg.alpha -= 0.05;
									if (msg.alpha <= 0) {
										messages[0].textobj.remove();
										messages.splice(0, 1);
									}
								}
							}
							ctx.globalAlpha = 1;
						}{
							global.canSkill = !!_gui.points;
							statMenu.set(0 + (global.canSkill || global.died || global.statHover));
							global.clickables.stat.hide();
							var _vspacing = 4,
								_height = 15,
								gap = 35,
								_len5 = alcoveSize * global.screenWidth,
								save = _len5,
								_x26 = -spacing - 2 * _len5 + statMenu.get() * (2 * spacing + 2 * _len5),
								_y2 = global.screenHeight - spacing - _height,
								ticker = 11,
								namedata = _gui.getStatNames(mockups[_gui.type].statnames || -1);
							_gui.skills.forEach(function drawASkillBar(skill) {
								ticker--;
								var name = namedata[ticker - 1],
									level = skill.amount,
									col = color[skill.color],
									cap = skill.softcap,
									maxLevel = skill.cap;
								if (cap) {
									_len5 = save;
									var _max = config.gui.expectedMaxSkillLevel,
										extension = cap > _max,
										blocking = cap < maxLevel;
									if (extension) _max = cap;
									drawBar(_x26 + _height / 2, _x26 - _height / 2 + _len5 * ska(cap), _y2 + _height / 2, _height - 3 + config.graphical.barChunk, color.black);
									drawBar(_x26 + _height / 2, _x26 + _height / 2 + (_len5 - gap) * ska(cap), _y2 + _height / 2, _height - 3, color.grey);
									drawBar(_x26 + _height / 2, _x26 + _height / 2 + (_len5 - gap) * ska(level), _y2 + _height / 2, _height - 3.5, col);
									if (blocking) {
										ctx.lineWidth = 1;
										ctx.strokeStyle = color.grey;
										for (var j = cap + 1; j < _max; j++) {
											drawGuiLine(_x26 + (_len5 - gap) * ska(j), _y2 + 1.5, _x26 + (_len5 - gap) * ska(j), _y2 - 3 + _height);
										}
									}
									ctx.strokeStyle = color.black;
									ctx.lineWidth = 1;
									for (var _j = 1; _j < level + 1; _j++) {
										drawGuiLine(_x26 + (_len5 - gap) * ska(_j), _y2 + 1.5, _x26 + (_len5 - gap) * ska(_j), _y2 - 3 + _height);
									}
									_len5 = save * ska(_max);
									var textcolor = level == maxLevel ? col : !_gui.points || cap !== maxLevel && level == cap ? color.grey : color.guiwhite;
									text.skillNames[ticker - 1].draw(name, Math.round(_x26 + _len5 / 2) + 0.5,
										_y2 + _height / 2, _height - 5, textcolor, 'center', 1);
									text.skillKeys[ticker - 1].draw('[' + ticker % 10 + ']', Math.round(_x26 + _len5 - _height * 0.25) - 1.5,
										_y2 + _height / 2, _height - 5, textcolor, 'right', 1);
									if (textcolor === color.guiwhite) global.clickables.stat.place(ticker - 1, _x26, _y2, _len5, _height);
									if (level) text.skillValues[ticker - 1].draw(textcolor === col ? 'MAX' : '+' + level,
										Math.round(_x26 + _len5 + 4) + 0.5, _y2 + _height / 2, _height - 5, col, 'left', 1);
									_y2 -= _height + _vspacing;
								}
							});
							global.clickables.hover.place(0, 0, _y2, 0.8 * _len5, 0.8 * (global.screenHeight - _y2));
							if (_gui.points !== 0) text.skillPoints.draw('x' + _gui.points, Math.round(_x26 + _len5 - 2) + 0.5,
								Math.round(_y2 + _height - 4) + 0.5, 20, color.guiwhite, 'right');
						}{
							var _vspacing2 = 4;
							var _len6 = 1.65 * alcoveSize * global.screenWidth;
							var _height2 = 25;
							var _x27 = (global.screenWidth - _len6) / 2;
							var _y3 = global.screenHeight - spacing - _height2;
							ctx.lineWidth = 1;
							drawBar(_x27, _x27 + _len6, _y3 + _height2 / 2, _height2 - 3 + config.graphical.barChunk, color.black);
							drawBar(_x27, _x27 + _len6, _y3 + _height2 / 2, _height2 - 3, color.grey);
							drawBar(_x27, _x27 + _len6 * _gui.__s.getProgress(), _y3 + _height2 / 2, _height2 - 3.5, color.gold);
							text.class.draw('Level ' + _gui.__s.getLevel() + ' ' + mockups[_gui.type].name,
								_x27 + _len6 / 2, _y3 + _height2 / 2, _height2 - 4, color.guiwhite, 'center', 1);
							_height2 = 14;
							_y3 -= _height2 + _vspacing2;
							drawBar(_x27 + _len6 * 0.1, _x27 + _len6 * 0.9, _y3 + _height2 / 2, _height2 - 3 + config.graphical.barChunk, color.black);
							drawBar(_x27 + _len6 * 0.1, _x27 + _len6 * 0.9, _y3 + _height2 / 2, _height2 - 3, color.grey);
							drawBar(_x27 + _len6 * 0.1, _x27 + _len6 * (0.1 + 0.8 * (max ? Math.min(1, _gui.__s.getScore() / max) : 1)),
								_y3 + _height2 / 2, _height2 - 3.5, color.green);
							text.score.draw('Score: ' + util.formatLargeNumber(Math.round(_gui.__s.getScore())),
								_x27 + _len6 / 2, _y3 + _height2 / 2, _height2 - 2, color.guiwhite, 'center', 1);
							ctx.lineWidth = 4;
							text.name.draw(player.name, Math.round(_x27 + _len6 / 2) + 0.5, Math.round(_y3 - 10 - _vspacing2) + 0.5, 32, color.guiwhite, 'center');
						}{
							var _len7 = alcoveSize * global.screenWidth;
							var _height3 = _len7;
							var _x28 = global.screenWidth - _len7 - spacing;
							var _y4 = global.screenHeight - _height3 - spacing;
							var _y7 = 66;
							ctx.globalAlpha = 0.5;
							var _W = roomSetup[0].length,
								_H = roomSetup.length,
								_i8 = 0;
							roomSetup.forEach(function(row) {
								var j = 0;
								row.forEach(function(cell) {
									ctx.fillStyle = getZoneColor(cell, 0);
									drawGuiRect(_x28 + j++ * _len7 / _W, _y4 + _i8 * _height3 / _H, _len7 / _W, _height3 / _H);
								});
								_i8++;
							});
							ctx.fillStyle = color.grey;
							drawGuiRect(_x28, _y4, _len7, _height3);
							minimap.forEach(function(o) {
								if (o[2] === 17) {
									ctx.fillStyle = mixColors(getColor(o[2]), color.black, 0.5);
									ctx.globalAlpha = 0.8;
									drawGuiRect(_x28 + o[0] / global.gameWidth * _len7, _y4 + o[1] / global.gameHeight * _height3, 1, 1);
								} else {
									ctx.strokeStyle = mixColors(getColor(o[2]), color.black, 0.5);
									ctx.lineWidth = 1;
									ctx.globalAlpha = 1;
									drawGuiRect(_x28 + o[0] / global.gameWidth * _len7 - 1, _y4 + o[1] / global.gameWidth * _height3 - 1, 3, 3, 1);
									ctx.lineWidth = 3;
								}
							});
							ctx.globalAlpha = 1;
							ctx.lineWidth = 1;
							ctx.strokeStyle = color.black;
							drawGuiRect(
								_x28 + player.x / global.gameWidth * _len7 - 1, _y4 + player.y / global.gameWidth * _height3 - 1, 3, 3, 1
							);
							ctx.lineWidth = 3;
							ctx.fillStyle = color.black;
							drawGuiRect(_x28, _y4, _len7, _height3, 1);
							if (global.lpressed && !global.died) {
								drawGuiRect(_x28, _y4 - 40, _len7, 30);
								lagGraph(lag.get(), _x28, _y4 - 40, _len7, 30, color.teal);
								gapGraph(metrics.rendergap, _x28, _y4 - 40, _len7, 30, color.pink);
								timingGraph(GRAPHDATA, _x28, _y4 - 40, _len7, 30, color.yellow);
								_y4 -= 40;
							}
							if (global.lpressed && !global.died) {
								_y7 = 94;
								text.debug[4].draw("Prediction: " + Math.round(GRAPHDATA) + "ms", _x28 + _len7, _y4 - 78, 10, color.guiwhite, "right");
								text.debug[3].draw("Update Rate: " + metrics.updatetime + "Hz", _x28 + _len7, _y4 - 64, 10, color.guiwhite, "right");
							}
							text.debug[5].draw("Arras.io", _x28 + _len7, _y4 - _y7, 15, "#F685FF", "right");
							text.debug[2].draw("Client FPS: " + metrics.rendertime, _x28 + _len7, _y4 - 50, 10, metrics.rendertime > 15 ? color.guiwhite : color.orange, "right");
							text.debug[1].draw("Server Speed: " + (100 * _gui.fps).toFixed(2) + "%", _x28 + _len7, _y4 - 22, 10, _gui.fps === 1 ? color.guiwhite : color.orange, "right");
							text.debug[3].draw('Latency: ' + metrics.latency + 'ms', _x28 + _len7, _y4 - 36, 10, metrics.latency < 200 ? color.guiwhite : color.orange, 'right');
							text.debug[0].draw(serverName, _x28 + _len7, _y4 - 8, 10, color.guiwhite, 'right');
						}{
							var _vspacing3 = 4;
							var _len8 = alcoveSize * global.screenWidth;
							var _height4 = 14;
							var _x29 = global.screenWidth - _len8 - spacing;
							var _y5 = spacing + _height4 + 7;
							text.lbtitle.draw('Leaderboard:', Math.round(_x29 + _len8 / 2) + 0.5, Math.round(_y5 - 6) + 0.5, _height4 + 4, color.guiwhite, 'center');
							var _i9 = 0;
							lb.data.forEach(function(entry) {
								drawBar(_x29, _x29 + _len8, _y5 + _height4 / 2, _height4 - 3 + config.graphical.barChunk, color.black);
								drawBar(_x29, _x29 + _len8, _y5 + _height4 / 2, _height4 - 3, color.grey);
								var shift = Math.min(1, entry.score / max);
								drawBar(_x29, _x29 + _len8 * shift, _y5 + _height4 / 2, _height4 - 3.5, entry.barcolor);
								text.leaderboard[_i9++].draw(entry.label + ': ' + util.handleLargeNumber(
									Math.round(entry.score)), _x29 + _len8 / 2, _y5 + _height4 / 2, _height4 - 5, color.guiwhite, 'center', 1
								);
								var scale = _height4 / entry.position.axis,
									xx = _x29 - 1.5 * _height4 - scale * entry.position.middle.x * 0.707,
									yy = _y5 + 0.5 * _height4 + scale * entry.position.middle.x * 0.707;
								drawEntity(xx, yy, entry.image, 1 / scale, 1, scale * scale / entry.image.size, -Math.PI / 4, 1);
								_y5 += _vspacing3 + _height4;
							});
						}{
							upgradeMenu.set(0 + (global.canUpgrade || global.upgradeHover));
							var glide = upgradeMenu.get();
							global.clickables.upgrade.hide();
							if (_gui.upgrades.length > 0) {
								global.canUpgrade = 1;
								var getClassUpgradeKey = function getClassUpgradeKey(number) {
									switch (number) {
										case 0:
											return 'y';
										case 1:
											return 'g';
										case 2:
											return 'u';
										case 3:
											return 'h';
										case 4:
											return 'i';
										case 5:
											return 'j';
										case 6:
											return 'o';
										case 7:
											return 'l';
									}
								};
								var internalSpacing = 8;
								var _len9 = alcoveSize * global.screenWidth / 2 * 1;
								var _height5 = _len9;
								var _x30 = glide * 2 * spacing - spacing;
								var _y6 = spacing;
								var xo = _x30;
								var xxx = 0;
								var yo = _y6;
								var _ticker = 0;
								upgradeSpin += 0.01;
								var colorIndex = 10;
								var _i10 = 0;
								_gui.upgrades.forEach(function drawAnUpgrade(model) {
									if (_y6 > yo)
										yo = _y6;
									xxx = _x30;
									global.clickables.upgrade.place(_i10++, _x30, _y6, _len9, _height5);
									ctx.globalAlpha = 0.5;
									ctx.fillStyle = getColor(colorIndex);
									drawGuiRect(_x30, _y6, _len9, _height5);
									ctx.globalAlpha = 0.1;
									ctx.fillStyle = getColor(-10 + colorIndex++);
									if (colorIndex === 16) colorIndex = 34;
									drawGuiRect(_x30, _y6, _len9, _height5 * 0.6);
									ctx.fillStyle = color.black;
									drawGuiRect(_x30, _y6 + _height5 * 0.6, _len9, _height5 * 0.4);
									ctx.globalAlpha = 1;
									var picture = getEntityImageFromMockup(model, _gui.color),
										position = mockups[model].position,
										scale = 0.6 * _len9 / position.axis,
										xx = _x30 + 0.5 * _len9 - scale * position.middle.x * Math.cos(upgradeSpin),
										yy = _y6 + 0.5 * _height5 - scale * position.middle.x * Math.sin(upgradeSpin);
									drawEntity(xx, yy, picture, 1, 1, scale / picture.size, upgradeSpin, 1);
									text.upgradeNames[_i10 - 1].draw(
										picture.name, _x30 + 0.9 * _len9 / 2, _y6 + _height5 - 6, _height5 / 8 - 3, color.guiwhite, 'center'
									);
									text.upgradeKeys[_i10 - 1].draw(
										'[' + getClassUpgradeKey(_ticker) + ']', _x30 + _len9 - 4, _y6 + _height5 - 6, _height5 / 8 - 3, color.guiwhite, 'right'
									);
									ctx.strokeStyle = color.black;
									ctx.globalAlpha = 1;
									ctx.lineWidth = 3;
									drawGuiRect(_x30, _y6, _len9, _height5, 1);
									if (_ticker++ % 2) {
										_y6 -= _height5 + internalSpacing;
										_x30 += glide * (_len9 + internalSpacing);
									} else _y6 += _height5 + internalSpacing;
								});
								var h = 14,
									_msg = "Ignore",
									m = measureText(_msg, h - 3) + 10;
								var xx = xo + (xxx + _len9 + internalSpacing - xo) / 2,
									yy = yo + _height5 + internalSpacing;
								drawBar(xx - m / 2, xx + m / 2, yy + h / 2, h + config.graphical.barChunk, color.black);
								drawBar(xx - m / 2, xx + m / 2, yy + h / 2, h, color.white);
								text.skipUpgrades.draw(_msg, xx, yy + h / 2, h - 2, color.guiwhite, 'center', 1);
								global.clickables.skipUpgrades.place(0, xx - m / 2, yy, m, h);
							} else {
								global.canUpgrade = 0;
								global.clickables.upgrade.hide();
								global.clickables.skipUpgrades.hide();
							}
						}
						metrics.lastrender = getNow();
					};
				}();
				var gameDrawDead = function() {
					var text = {
						taunt: TextObj(),
						level: TextObj(),
						score: TextObj(),
						time: TextObj(),
						kills: TextObj(),
						death: TextObj(),
						playagain: TextObj()
					};
					var getKills = function getKills() {
						var finalKills = [Math.round(global.finalKills[0].get()), Math.round(global.finalKills[1].get()), Math.round(global.finalKills[2].get())];
						var b = finalKills[0] + 0.5 * finalKills[1] + 3 * finalKills[2];
						return (
							b === 0 ? '🌼' : b < 4 ? '🎯' : b < 8 ? '💥' : b < 15 ? '💢' : b < 25 ? '🔥' : b < 50 ? '💣' : b < 75 ? '👺' : b < 100 ? '🌶️' : '💯') +
							(finalKills[0] || finalKills[1] || finalKills[2] ? ' ' + (finalKills[0] ? finalKills[0] + ' kills' : '') +
							(finalKills[0] && finalKills[1] ? ' and ' : '') + (finalKills[1] ? finalKills[1] + ' assists' : '') +
							((finalKills[0] || finalKills[1]) && finalKills[2] ? ' and ' : '') +
							(finalKills[2] ? finalKills[2] + ' visitors defeated' : '') : ' A true pacifist'
						) + '.';
					};
					var getDeath = function getDeath() {
						var txt = '';
						if (global.finalKillers.length) {
							txt = '🔪 Succumbed to';
							global.finalKillers.forEach(function(e) {
								txt += ' ' + util.addArticle(mockups[e].name) + ' and';
							});
							txt = txt.slice(0, -4) + '.';
						} else txt += '🤷 Well that was kinda dumb, huh?';
						return txt;
					};
					return function() {
						clearScreen(color.black, 0.25);
						var x = global.screenWidth / 2,
							y = global.screenHeight / 2 - 50,
							picture = getEntityImageFromMockup(_gui.type, _gui.color),
							len = 140,
							position = mockups[_gui.type].position,
							scale = len / position.axis,
							xx = global.screenWidth / 2 - scale * position.middle.x * 0.707,
							yy = global.screenHeight / 2 - 35 + scale * position.middle.x * 0.707;
						drawEntity(xx - 190 - len / 2, yy - 10, picture, 1.5, 1, 0.5 * scale / picture.realSize, -Math.PI / 4, 1);
						text.taunt.draw('You are dead, not big surprise.', x, y - 80, 8, color.guiwhite, 'center');
						text.level.draw('Level ' + _gui.__s.getLevel() + ' ' + mockups[_gui.type].name, x - 170, y - 30, 24, color.guiwhite);
						text.score.draw('Final Score: ' + util.formatLargeNumber(Math.round(global.finalScore.get())), x - 170, y + 25, 50, color.guiwhite);
						text.time.draw('⌚ Survived for ' + util.timeForHumans(Math.round(global.finalLifetime.get())) + '.', x - 170, y + 55, 16, color.guiwhite);
						text.kills.draw(getKills(), x - 170, y + 77, 16, color.guiwhite);
						text.death.draw(getDeath(), x - 170, y + 99, 16, color.guiwhite);
						text.playagain.draw('Press enter to play again!', x, y + 125, 16, color.guiwhite, 'center');
					};
				}();
				var gameDrawBeforeStart = function() {
					var text = {
						connecting: TextObj(),
						message: TextObj()
					};
					return function() {
						clearScreen(color.white, 0.5);
						text.connecting.draw('Connecting...', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
						text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.lgreen, 'center');
					};
				}();
				var gameDrawDisconnected = function() {
					var text = {
						disconnected: TextObj(),
						message: TextObj()
					};
					return function() {
						clearScreen(mixColors(color.red, color.guiblack, 0.3), 0.25);
						text.disconnected.draw('💀 Disconnected 💀', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
						text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.orange, 'center');
					};
				}();
				function animloop() {
					global.animLoopHandle = window.requestAnimFrame(animloop);
					player.renderv += (player.view - player.renderv) / 30;
					var ratio = config.graphical.screenshotMode ? 2 : getRatio();
					ctx.lineCap = 'round';
					ctx.lineJoin = 'round';
					ctx.filter = 'none';
					if (global.gameStart && !global.disconnected) {
						global.time = getNow();
						if (global.time - lastPing > 1000) {
							global.socket.ping(global.time);
							lastPing = global.time;
							metrics.rendertime = renderTimes;
							renderTimes = 0;
							metrics.updatetime = updateTimes;
							updateTimes = 0;
						}
						metrics.lag = global.time - player.time;
					}
					if (global.gameStart) gameDraw(ratio);
					else if (!global.disconnected) gameDrawBeforeStart();
					if (global.died) gameDrawDead();
					if (global.disconnected) gameDrawDisconnected();
				}
			},
			function(module, exports) {
				/*jslint esversion: 6*/
				/*global require, module, exports, console*/
				/*jshint -W097*/
				"use strict";
				module.exports = { // Keys
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
					KEY_CHOOSE_2: 71,
					KEY_CHOOSE_3: 85,
					KEY_CHOOSE_4: 72,
					KEY_CHOOSE_5: 73,
					KEY_CHOOSE_6: 74,
					KEY_CHOOSE_7: 79,
					KEY_CHOOSE_8: 76,
					KEY_LEVEL_UP: 78,
					KEY_DEV_TANK: 191,
					KEY_DEV_TANK_2: 111,
					KEY_RESET_BASIC_TANK: 80,
					KEY_SUICIDE: 75,
					KEY_GODMODE: 186,
					KEY_COLOR_CHANGE: 66,
					KEY_RAINBOW: 187,
					KEY_MAX_STATS: 77,
					KEY_TELEPORT: 84,
					KEY_PASSIVE_MODE: 88,
					KEY_L: 76,
					screenWidth: window.innerWidth,
					screenHeight: window.innerHeight,
					gameWidth: 0,
					gameHeight: 0,
					xoffset: -0,
					yoffset: -0,
					gameStart: 0,
					disconnected: 0,
					died: 0,
					kicked: 0,
					continuity: 0,
					startPingTime: 0,
					toggleMassState: 0,
					backgroundColor: '#F2FBFF',
					lineColor: '#000000',
					lpressed: 0,
					ticker: 0,
					rainbowFill: '#FF0000',
					rainbow: [
						'#FF0000',
						'#FF2A00',
						'#FF4300',
						'#FF5D00',
						'#FF7200',
						'#FF7700',
						'#FF9400',
						'#FF9900',
						'#FFA500',
						'#FFBB00',
						'#FFCC00',
						'#FFDD00',
						'#FFE900',
						'#FFFA00',
						'#EEFF00',
						'#DDFF00',
						'#D0FF00',
						'#B6FF00',
						'#AAFF00',
						'#88FF00',
						'#6EFF00',
						'#54FF00',
						'#32FF00',
						'#19FF00',
						'#04FF00',
						'#00FF15',
						'#00FF26',
						'#00FF3F',
						'#00FF55',
						'#00FF6E',
						'#00FF7F',
						'#00FF99',
						'#00FFA5',
						'#00FFBB',
						'#00FFCB',
						'#00FFD8',
						'#00FFED',
						'#00FFFA',
						'#00E9FF',
						'#00D8FF',
						'#00C3FF',
						'#00BBFF',
						'#00AEFF',
						'#00A1FF',
						'#0090FF',
						'#007FFF',
						'#0077FF',
						'#006EFF',
						'#005DFF',
						'#0048FF',
						'#0037FF',
						'#0026FF',
						'#0019FF',
						'#0004FF',
						'#0C00FF',
						'#2200FF',
						'#2E00FF',
						'#3B00FF',
						'#5400FF',
						'#6A00FF',
						'#7F00FF',
						'#9000FF',
						'#A100FF',
						'#B600FF',
						'#BF00FF',
						'#D000FF',
						'#DC00FF',
						'#E900FF',
						'#FA00FF',
						'#FF00F6',
						'#FF00E1',
						'#FF00CB',
						'#FF00B6',
						'#FF00AA',
						'#FF00A5',
						'#FF0090',
						'#FF007B',
						'#FF006E',
						'#FF005D',
						'#FF0059',
						'#FF0043',
						'#FF003B',
						'#FF0026',
						'#FF001D',
						'#FF000C'
					]
				};
			},
			function(module, exports) {
				exports.submitToLocalStorage = function(name) {
					localStorage.setItem(name + 'Value', document.getElementById(name).value);
					localStorage.setItem(name + 'Checked', document.getElementById(name).checked);
					return 0;
				};
				exports.retrieveFromLocalStorage = function(name) {
					document.getElementById(name).value = localStorage.getItem(name + 'Value');
					document.getElementById(name).checked = localStorage.getItem(name + 'Checked') === 'true';
					return 0;
				};
				exports.handleLargeNumber = function(x) {
					var cullZeroes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
					if (cullZeroes && x == 0) return '';
					if (x < Math.pow(10, 3)) return '' + x.toFixed(0);
					if (x < Math.pow(10, 6)) return (x / Math.pow(10, 3)).toFixed(2) + "k";
					if (x < Math.pow(10, 9)) return (x / Math.pow(10, 6)).toFixed(2) + "m";
					if (x < Math.pow(10, 12)) return (x / Math.pow(10, 9)).toFixed(2) + "b";
					if (x < Math.pow(10, 15)) return (x / Math.pow(10, 12)).toFixed(2) + "t";
					if (x < Math.pow(10, 18)) return (x / Math.pow(10, 15)).toFixed(2) + "qd";
					if (x < Math.pow(10, 21)) return (x / Math.pow(10, 18)).toFixed(2) + "qt";
					if (x < Math.pow(10, 24)) return (x / Math.pow(10, 21)).toFixed(2) + "sx";
					if (x < Math.pow(10, 27)) return (x / Math.pow(10, 24)).toFixed(2) + "sp";
					if (x < Math.pow(10, 30)) return (x / Math.pow(10, 27)).toFixed(2) + "o";
					if (x < Math.pow(10, 33)) return (x / Math.pow(10, 30)).toFixed(2) + "n";
					if (x > 1e38) return "Infinity";
					if (isNaN(x)) return "NaN";
					return (x / Math.pow(10, 33)).toFixed(2) + "d";
				};
				exports.timeForHumans = function(x) {
					var seconds = x % 60;
					x /= 60;
					x = Math.floor(x);
					var minutes = x % 60;
					x /= 60;
					x = Math.floor(x);
					var hours = x % 24;
					x /= 24;
					x = Math.floor(x);
					var days = x;
					var y = '';
					function weh(z, text) {
						if (z) y = y + (y === '' ? '' : ', ') + z + ' ' + text + (z > 1 ? 's' : '');
					}
					weh(days, 'day');
					weh(hours, 'hour');
					weh(minutes, 'minute');
					weh(seconds, 'second');
					if (y === '') y = 'less than a second';
					return y;
				};
				exports.addArticle = function(string) {
					return (/[aeiouAEIOU]/.test(string[0]) ? 'an ' + string : 'a ' + string);
				};
				exports.formatLargeNumber = function(x) {
					return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				};
				exports.pullJSON = function(filename) {
					var request = new XMLHttpRequest();
					var url = "/json/" + filename + ".json?v=" + VERSION;
					console.log("Loading JSON from " + url);
					request.responseType = 'json';
					return new Promise(function(resolve, reject) {
						request.open('GET', url);
						request.onload = function() {
							resolve(request.response);
							console.log('JSON load complete.');
						};
						request.onerror = function() {
							reject(request.statusText);
							console.log('JSON load failed!');
							console.log(request.statusText);
						};
						request.send();
					});
				};
			},
			function(module, exports, __webpack_require__) {
				var global = __webpack_require__(1);
				var Canvas = function() {
					function Canvas(params) {
						_classCallCheck(this, Canvas);
						this.directionLock = 0;
						this.target = global.target;
						this.reenviar = 1;
						this.socket = global.socket;
						this.directions = [];
						this.maxStats = false;
						var self = this;
						this.cv = document.getElementById('gameCanvas');
						this.cv.width = global.screenWidth;
						this.cv.height = global.screenHeight;
						this.cv.addEventListener('mousemove', this.gameInput, 0);
						this.cv.addEventListener('keydown', this.keyboardDown, 0);
						this.cv.addEventListener('keyup', this.keyboardUp, 0);
						this.cv.addEventListener("mousedown", this.mouseDown, 0);
						this.cv.addEventListener("mouseup", this.mouseUp, 0);
						this.cv.parent = self;
						global.canvas = this;
					}
					_createClass(Canvas, [{
						key: "keyboardDown",
						value: function keyboardDown(event) {
							switch (event.keyCode) {
								case 13:
									if (global.died) this.parent.socket.talk('s', global.playerName, 0);
									global.died = 0;
									break;
								case global.KEY_UP_ARROW:
								case global.KEY_UP:
									this.parent.socket.cmd.set(0, 1);
									break;
								case global.KEY_DOWN_ARROW:
								case global.KEY_DOWN:
									this.parent.socket.cmd.set(1, 1);
									break;
								case global.KEY_LEFT_ARROW:
								case global.KEY_LEFT:
									this.parent.socket.cmd.set(2, 1);
									break;
								case global.KEY_RIGHT_ARROW:
								case global.KEY_RIGHT:
									this.parent.socket.cmd.set(3, 1);
									break;
								case global.KEY_MOUSE_0:
									this.parent.socket.cmd.set(4, 1);
									break;
								case global.KEY_MOUSE_1:
									this.parent.socket.cmd.set(5, 1);
									break;
								case global.KEY_MOUSE_2:
									this.parent.socket.cmd.set(6, 1);
									break;
								case global.KEY_LEVEL_UP:
									this.parent.socket.talk('L');
									break;
							}
							if (!event.repeat) {
								switch (event.keyCode) {
									case global.KEY_AUTO_SPIN:
										this.parent.socket.talk('t', 0);
										break;
									case global.KEY_AUTO_FIRE:
										this.parent.socket.talk('t', 1);
										break;
									case global.KEY_OVER_RIDE:
										this.parent.socket.talk('t', 2);
										break;
									case global.KEY_L:
										global.lpressed = 1;
										break;
									// Beta tester keys
									case global.KEY_DEV_TANK:
										this.parent.socket.talk('l');
										break;
									case global.KEY_DEV_TANK_2:
										this.parent.socket.talk('B', 0);
										break;
									case global.KEY_SUICIDE:
										this.parent.socket.talk('B', 1);
										break;
									case global.KEY_RESET_BASIC_TANK:
										this.parent.socket.talk('B', 2);
										break;
									case global.KEY_COLOR_CHANGE:
										this.parent.socket.talk('B', 3);
										break;
									case global.KEY_GODMODE:
										this.parent.socket.talk('B', 4);
										break;
									case global.KEY_TELEPORT:
										this.parent.socket.talk('B', 6);
										break;
									case global.KEY_MAX_STATS:
										this.maxStats = true;
										break;
									case global.KEY_PASSIVE_MODE:
										this.parent.socket.talk('B', 7);
										break;
									case global.KEY_RAINBOW:
										this.parent.socket.talk('B', 8);
										break;
								}
								if (global.canSkill) {
									let amount = this.maxStats ? 12 : 1;
									do {
										switch (event.keyCode) {
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
												break;
										}
									} while (--amount);
								}
								if (global.canUpgrade) {
									switch (event.keyCode) {
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
											break;
									}
								}
							}
						}
					}, {
						key: "keyboardUp",
						value: function keyboardUp(event) {
							switch (event.keyCode) {
								case global.KEY_UP_ARROW:
								case global.KEY_UP:
									this.parent.socket.cmd.set(0, 0);
									break;
								case global.KEY_DOWN_ARROW:
								case global.KEY_DOWN:
									this.parent.socket.cmd.set(1, 0);
									break;
								case global.KEY_LEFT_ARROW:
								case global.KEY_LEFT:
									this.parent.socket.cmd.set(2, 0);
									break;
								case global.KEY_RIGHT_ARROW:
								case global.KEY_RIGHT:
									this.parent.socket.cmd.set(3, 0);
									break;
								case global.KEY_MOUSE_0:
									this.parent.socket.cmd.set(4, 0);
									break;
								case global.KEY_MOUSE_1:
									this.parent.socket.cmd.set(5, 0);
									break;
								case global.KEY_MOUSE_2:
									this.parent.socket.cmd.set(6, 0);
									break;
								case global.KEY_MAX_STATS:
									this.maxStats = false;
									break;
								case global.KEY_L:
									global.lpressed = 0;
									break;
							}
						}
					}, {
						key: "mouseDown",
						value: function mouseDown(mouse) {
							switch (mouse.button) {
								case 0:
									var mpos = {
										x: mouse.clientX,
										y: mouse.clientY
									};
									var statIndex = global.clickables.stat.check(mpos);
									if (statIndex !== -1) this.parent.socket.talk('x', statIndex);
									else if (global.clickables.skipUpgrades.check(mpos) !== -1) global.clearUpgrades();
									else {
										var upgradeIndex = global.clickables.upgrade.check(mpos);
										if (upgradeIndex !== -1) this.parent.socket.talk('U', upgradeIndex);
										else this.parent.socket.cmd.set(4, 1);
									}
									break;
								case 1:
									this.parent.socket.cmd.set(5, 1);
									break;
								case 2:
									this.parent.socket.cmd.set(6, 1);
									this.parent.socket.talk('T');
									break;
							}
						}
					}, {
						key: "mouseUp",
						value: function mouseUp(mouse) {
							switch (mouse.button) {
								case 0:
									this.parent.socket.cmd.set(4, 0);
									break;
								case 1:
									this.parent.socket.cmd.set(5, 0);
									break;
								case 2:
									this.parent.socket.cmd.set(6, 0);
									break;
							}
						}
					}, {
						key: "gameInput",
						value: function gameInput(mouse) {
							this.parent.target.x = mouse.clientX - this.width / 2;
							this.parent.target.y = mouse.clientY - this.height / 2;
							global.target = this.parent.target;
							global.statHover = global.clickables.hover.check({
								x: mouse.clientX,
								y: mouse.clientY
							}) === 0;
						}
					}]);
					return Canvas;
				}();
				module.exports = Canvas;
			},
			function(module, exports) {
				/*jslint esversion: 6*/
				/*global require, exports, console*/
				/*jshint -W097*/
				"use strict";
				function checkEndian() {
					var arrayBuffer = new ArrayBuffer(2);
					var uint8Array = new Uint8Array(arrayBuffer);
					var uint16array = new Uint16Array(arrayBuffer);
					uint8Array[0] = 0xAA;
					uint8Array[1] = 0xBB;
					if (uint16array[0] === 0xBBAA) return 0;
					if (uint16array[0] === 0xAABB) return 1;
					else throw new Error("Something crazy just happened!");
				}
				/*var isBigEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12;
				var isLittleEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;*/
				exports.encode = function() {
					var arrUint8 = new Uint8Array(1);
					var arrUint16 = new Uint16Array(1);
					var charUint16 = new Uint8Array(arrUint16.buffer);
					var arrUint32 = new Uint32Array(1);
					var charUint32 = new Uint8Array(arrUint32.buffer);
					var arrFloat32 = new Float32Array(1);
					var charFloat32 = new Uint8Array(arrFloat32.buffer);
					var typeEncoder = function typeEncoder(type, number) {
						var output = '';
						switch (type) {
							case 'RawUint8':
								arrUint8[0] = number;
								return String.fromCharCode(arrUint8[0]);
							case 'RawUint16':
								arrUint16[0] = number;
								return String.fromCharCode(charUint16[0], charUint16[1]);
							case 'Uint8':
								arrUint8[0] = number;
								return '0' + String.fromCharCode(arrUint8[0]);
							case 'Uint16':
								arrUint16[0] = number;
								return '1' + String.fromCharCode(charUint16[0], charUint16[1]);
							case 'Uint32':
								arrUint32[0] = number;
								return '2' + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);
							case 'Sint8':
								arrUint8[0] = -1 - number;
								return '3' + String.fromCharCode(arrUint8[0]);
							case 'Sint16':
								arrUint16[0] = -1 - number;
								return '4' + String.fromCharCode(charUint16[0], charUint16[1]);
							case 'Sint32':
								arrUint32[0] = -1 - number;
								return '5' + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);
							case 'Float32':
								arrFloat32[0] = number;
								return '6' + String.fromCharCode(charFloat32[0], charFloat32[1], charFloat32[2], charFloat32[3]);
							case 'String8':
								return '7' + typeEncoder('RawUint16', number.length) + number;
							case 'String16':
								for (var i = 0, strLen = number.length; i < strLen; i++) output += typeEncoder('RawUint16', number.charCodeAt(i));
								return '8' + typeEncoder('RawUint16', output.length) + output;
							default:
								throw new Error('Unknown encoding type!');
						}
					};
					var findType = function findType(value) {
						if (typeof value === 'string') {
							for (var i = 0; i < value.length; i++) if (value.charCodeAt(i) > 255) return 'String16';
							return 'String8';
						}
						if (typeof value === 'boolean') return 'Uint8';
						if (typeof value !== 'number') throw new Error('Unencodable data type!');
						if (value != Math.round(value)) return 'Float32';
						if (value < 0) {
							if (value >= -256) return 'Sint8';
							if (value >= -65535) return 'Sint16';
							if (value >= -4294967295) return 'Sint32';
						} else {
							if (value < 256) return 'Uint8';
							if (value < 65535) return 'Uint16';
							if (value < 4294967295) return 'Uint32';
						}
						return 'Float32';
					};
					return function(arr) {
						var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
						var output = arr.splice(0, 1)[0];
						if (typeof output !== 'string') throw new Error('No identification code!');
						arr.forEach(function(value) {
							output += typeEncoder(findType(value), value);
						});
						var len = output.length;
						var buffer = new ArrayBuffer(len);
						var integerView = new Uint8Array(buffer);
						for (var i = 0; i < len; i++) integerView[i] = output.charCodeAt(i);
						if (verbose) {
							console.log('OUTPUT: ' + integerView);
							console.log('RAW OUTPUT: ' + output);
							console.log('SIZE: ' + len);
						}
						return buffer;
					};
				}();
				exports.decode = function() {
					var arrUint16 = new Uint16Array(1);
					var charUint16 = new Uint8Array(arrUint16.buffer);
					var arrUint32 = new Uint32Array(1);
					var charUint32 = new Uint8Array(arrUint32.buffer);
					var arrFloat32 = new Float32Array(1);
					var charFloat32 = new Uint8Array(arrFloat32.buffer);
					var typeDecoder = function typeDecoder(str, type, offset) {
						switch (type) {
							case 'Uint8':
								return str.charCodeAt(offset++);
							case 'Uint16':
								for (var i = 0; i < 2; i++) charUint16[i] = str.charCodeAt(offset++);
								return arrUint16[0];
							case 'Uint32':
								for (var _i11 = 0; _i11 < 4; _i11++) charUint32[_i11] = str.charCodeAt(offset++);
								return arrUint32[0];
							case 'Sint8':
								return -1 - str.charCodeAt(offset++);
							case 'Sint16':
								for (var _i12 = 0; _i12 < 2; _i12++) charUint16[_i12] = str.charCodeAt(offset++);
								return -1 - arrUint16[0];
							case 'Sint32':
								for (var _i13 = 0; _i13 < 4; _i13++) charUint32[_i13] = str.charCodeAt(offset++);
								return -1 - arrUint32[0];
							case 'Float32':
								for (var _i14 = 0; _i14 < 4; _i14++) charFloat32[_i14] = str.charCodeAt(offset++);
								return arrFloat32[0];
							default:
								throw new Error('Unknown decoding type!');
						}
					};
					return function(raw) {
						try {
							var intView = new Uint8Array(raw);
							var str = '';
							for (var i = 0, len = intView.length; i < len; i++) str += String.fromCharCode(intView[i]);
							var offset = 1;
							var output = [str.charAt(0)];
							while (offset < str.length) {
								switch (str[offset++]) {
									case '0':
										output.push(typeDecoder(str, 'Uint8', offset));
										offset++;
										break;
									case '1':
										output.push(typeDecoder(str, 'Uint16', offset));
										offset += 2;
										break;
									case '2':
										output.push(typeDecoder(str, 'Uint32', offset));
										offset += 4;
										break;
									case '3':
										output.push(typeDecoder(str, 'Sint8', offset));
										offset++;
										break;
									case '4':
										output.push(typeDecoder(str, 'Sint16', offset));
										offset += 2;
										break;
									case '5':
										output.push(typeDecoder(str, 'Sint32', offset));
										offset += 4;
										break;
									case '6':
										output.push(typeDecoder(str, 'Float32', offset));
										offset += 4;
										break;
									case '7':
										{
											var _len10 = typeDecoder(str, 'Uint16', offset);
											offset += 2;
											output.push(str.slice(offset, offset + _len10));
											offset += _len10;
										}
										break;
									case '8':
										{
											var _len11 = typeDecoder(str, 'Uint16', offset);
											offset += 2;
											var arr = str.slice(offset, offset + _len11);
											var buf = new Uint16Array(_len11 / 2);
											for (var _i15 = 0; _i15 < _len11; _i15 += 2) buf[_i15 / 2] = typeDecoder(arr, 'Uint16', _i15);
											output.push(String.fromCharCode.apply(null, buf));
											offset += _len11;
										}
										break;
									default:
										offset = str.length;
										throw new Error('Unknown decoding command, decoding exited!');
								}
							}
							return output;
						} catch (err) {
							console.log(err);
							return -1;
						}
					};
				}();
			}
		]
	);