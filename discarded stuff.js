// Over Pro
/*exports.OverPro = {
    PARENT: [exports.genericTank],
    LABEL: 'OverPro',
    DANGER: 7,
    STAT_NAMES: statNames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.1
    },
    MAX_CHILDREN: 8,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: [exports.overlord, {
				HITS_OWN_TYPE: 'hard',
				FACING_TYPE: 'smoothToTarget',
				BODY: {
					FOV: 0.4,
					SPEED: 1,
					ACCELERATION: 0.4,
					HEALTH: 3,
					SHIELD: 0,
					DAMAGE: 1,
					RESIST: 1,
					PENETRATION: 1,
					DENSITY: 0.4
				},
				AI: {
					blind: true
				},
				CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
				DRAW_HEALTH: false,
				CLEAR_ON_MASTER_UPGRADE: true,
				GIVE_KILL_MESSAGE: false,
				CAN_BE_ON_LEADERBOARD: false
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: [exports.overlord, {
				HITS_OWN_TYPE: 'hard',
				FACING_TYPE: 'smoothToTarget',
				BODY: {
					FOV: 0.4,
					SPEED: 1,
					ACCELERATION: 0.4,
					HEALTH: 3,
					SHIELD: 0,
					DAMAGE: 1,
					RESIST: 1,
					PENETRATION: 1,
					DENSITY: 0.4
				},
				AI: {
					blind: true
				},
				CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
				DRAW_HEALTH: false,
				CLEAR_ON_MASTER_UPGRADE: true,
				GIVE_KILL_MESSAGE: false,
				CAN_BE_ON_LEADERBOARD: false
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: [exports.overlord, {
				HITS_OWN_TYPE: 'hard',
				FACING_TYPE: 'smoothToTarget',
				BODY: {
					FOV: 0.4,
					SPEED: 1,
					ACCELERATION: 0.4,
					HEALTH: 3,
					SHIELD: 0,
					DAMAGE: 1,
					RESIST: 1,
					PENETRATION: 1,
					DENSITY: 0.4
				},
				AI: {
					blind: true
				},
				CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
				DRAW_HEALTH: false,
				CLEAR_ON_MASTER_UPGRADE: true,
				GIVE_KILL_MESSAGE: false,
				CAN_BE_ON_LEADERBOARD: false
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: [exports.overlord, {
				HITS_OWN_TYPE: 'hard',
				FACING_TYPE: 'smoothToTarget',
				BODY: {
					FOV: 0.4,
					SPEED: 1,
					ACCELERATION: 0.4,
					HEALTH: 3,
					SHIELD: 0,
					DAMAGE: 1,
					RESIST: 1,
					PENETRATION: 1,
					DENSITY: 0.4
				},
				AI: {
					blind: true
				},
				CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
				DRAW_HEALTH: false,
				CLEAR_ON_MASTER_UPGRADE: true,
				GIVE_KILL_MESSAGE: false,
				CAN_BE_ON_LEADERBOARD: false
            }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true
        }
    }]
};*/
// Dominator AI
/*exports.dominatorAI = {
    PARENT: [exports.genericTank],
    LABEL: 'Dominator',
    DANGER: 10,
    COLOR: 13,
    SIZE: 48,
    SKILL: skillSet({ 
        dam: 2,
        pen: 2,
        str: 1
    }),
    BODY: {
        RESIST: 100,
        SPEED: 0,
        HEALTH: 250, 
        DAMAGE: 10, 
        PENETRATION: 0.25, 
        FOV: 0.7,
        PUSHABILITY: 0,
        HETERO: 0,
        SHIELD: base.SHIELD * 1.25,
        REGEN: base.REGEN * 0.75
    },
    CONTROLLERS: ['nearestDifferentMaster', 'spinWhileIdle'],
    TURRETS: [{
        POSITION: [22, 0, 0, 0, 360, 0],
        TYPE: exports.dominationBody
    }],
    CAN_BE_ON_LEADERBOARD: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false
};
exports.destroyerDominatorAI = {
    PARENT: [exports.dominatorAI],
    GUNS: [{
        POSITION: [15.25, 6.75, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.destroyDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 6.75, -1.6, 6.75, 0, 0, 0]
    }]
};
exports.gunnerDominatorAI = {
    PARENT: [exports.dominatorAI],
    GUNS: [{
        POSITION: [14.25, 3, 1, 0, -2, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [14.25, 3, 1, 0, 2, 0, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [15.85, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunnerDominator]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 8.5, -1.6, 6.25, 0, 0, 0]
    }]
};
exports.trapperDominatorAI = {
    PARENT: [exports.dominatorAI],
    FACING_TYPE: 'autospin',
    SKILL: skillSet({ 
        dam: 1.7,
        pen: 1.8,
        str: 1,
        spd: 0.2
    }),
    GUNS: [{
        POSITION: [3.5, 3.75, 1, 8, 0, 0, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }, {
        POSITION: [3.5, 3.75, 1, 8, 0, 45, 0],
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }, {
        POSITION: [3.5, 3.75, 1, 8, 0, 90, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }, {
        POSITION: [3.5, 3.75, 1, 8, 0, 135, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }, {
        POSITION: [3.5, 3.75, 1, 8, 0, 180, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }, {
        POSITION: [3.5, 3.75, 1, 8, 0, 225, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }, {
        POSITION: [3.5, 3.75, 1, 8, 0, 270, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }, {
        POSITION: [3.5, 3.75, 1, 8, 0, 315, 0]
    }, {
        POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
            TYPE: exports.trap,
            AUTOFIRE: true
        }
    }]
};*/
// Circle
/*exports.circleMinion = {
    PARENT: [exports.minion],
    TYPE: 'k',
    BODY: {
        HEALTH: 1e5,
        SHIELD: 1e5,
        RESIST: 1e5,
        REGEN: 1e5,
    },
    HITS_OWN_TYPE: 'hardWithBuffer',
    GUNS: [{
        POSITION: [17, 9, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet
        }
    }]
};
exports.circle = {
    PARENT: [exports.genericTank],
    LABEL: 'Circle',
    DANGER: 8,
    STAT_NAMES: statNames.drone,
    BODY: {
        SPEED: base.SPEED * 0.8,
        FOV: 1.1,
        HEALTH: 1e5,
        SHIELD: 1e5,
        RESIST: 1e5,
        REGEN: 1e5
    },
    MAX_CHILDREN: 12,
    GUNS: [{
        POSITION: [5, 11, 1, 10.5, 0, 0, 0]
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.circleMinion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [4, 14, 1, 8, 0, 0, 0]
    }, {
        POSITION: [5, 11, 1, 10.5, 0, 60, 0]
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 60, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.circleMinion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [4, 14, 1, 8, 0, 60, 0]
    }, {
        POSITION: [5, 11, 1, 10.5, 0, 120, 0]
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 120, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.circleMinion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [4, 14, 1, 8, 0, 120, 0]
    }, {
        POSITION: [5, 11, 1, 10.5, 0, 180, 0]
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.circleMinion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [4, 14, 1, 8, 0, 180, 0]
    }, {
        POSITION: [5, 11, 1, 10.5, 0, 240, 0]
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 240, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.circleMinion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [4, 14, 1, 8, 0, 240, 0]
    }, {
        POSITION: [5, 11, 1, 10.5, 0, 300, 0]
    }, {
        POSITION: [2, 14, 1, 15.5, 0, 300, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.factory]),
            TYPE: exports.circleMinion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [4, 14, 1, 8, 0, 300, 0]
    }],
};*/
// Testing Items
/*exports.blank = {
    PARENT: [exports.genericTank],
    LABEL: 'Blank',
    GUNS: [{
        //POSITION: [length, width, aspect, x, y, angle, delay]
        POSITION: [18, 8, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.blank]),
            TYPE: exports.bullet
        }
    }]
};
exports.Testing = {
    PARENT: [exports.genericTank],
    LABEL: 'UUUCutie',
    FACING_TYPE: 'autospin',
    DANGER: 7,
    TURRETS: [{
        POSITION: [8, 8, 0, 0, 180, 0],
        TYPE: exports.destroy,
    }, {
        POSITION: [8, 8, 0, 45, 180, 0],
        TYPE: exports.shotgun2,
    }, {
        POSITION: [8, 8, 0, 90, 180, 0],
        TYPE: exports.skimmer,
    }, {
        POSITION: [8, 8, 0, 135, 180, 0],
        TYPE: exports.mortar,
    }, {
        POSITION: [8, 8, 0, 180, 180, 0],
        TYPE: exports.bent,
    }, {
        POSITION: [8, 8, 0, 225, 180, 0],
        TYPE: exports.machinegunner,
    }, {
        POSITION: [8, 8, 0, 270, 180, 0],
        TYPE: exports.arena_closer,
    }, {
        POSITION: [8, 8, 0, 315, 180, 0],
        TYPE: exports.octogeddonControlled,
    }],
};
exports.test = {
    PARENT: [exports.genericTank],
    LABEL: 'k',
    DANGER: 7,
    FACING_TYPE: 'autospin',
    TURRETS: [{
        // POSITION: [length, x, y, rotation, angle rotation limit, layer]
        POSITION: [11, 8, 0, 0, 190, 0],
        TYPE: exports.carrier,
    }, {
        POSITION: [11, 8, 0, 72, 190, 0],
        TYPE: exports.rocketeer,
    }, {
        POSITION: [11, 8, 0, 144, 190, 0],
        TYPE: exports.hunter,
    }, {
        POSITION: [11, 8, 0, 216, 190, 0],
        TYPE: exports.construct,
    }, {
        POSITION: [11, 8, 0, 288, 190, 0],
        TYPE: exports.pentaDroneSpawner,
    }],
};
exports.autoTest = makeAuto(exports.basic, 'UNDEFINED SHIT', {
    type: exports.hexatrap,
    size: 10,
    independent: true
});
exports.pentaDroneSpawner = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
    COLOR: 16,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.penta_drone
        }
    }]
};*/
// None?
/*exports.None = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: -0
    },
    LABEL: 'Sadness',
    VALUE: -13,
    SHAPE: -0,
    SIZE: 5,
    COLOR: "blue",
    BODY: {
        DAMAGE: -500,
        DENSITY: 5,
        HEALTH: 850,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 0,
        REGEN: 0.5
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
    PERSISTS_AFTER_DEATH: true
};*/
// Manager 1 and 2?
/*exports.Manager = {
    PARENT: [exports.genericTank],
    LABEL: 'Director',
    STAT_NAMES: statNames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.1
    },
    MAX_CHILDREN: 5,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.Manager2,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone
        }
    }]
};
exports.Manager2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Director',
    STAT_NAMES: statNames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.1
    },
    MAX_CHILDREN: 2,
    GUNS: [{
        POSITION: [6, 12, 1.2, 8, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.Manager,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone
        }
    }]
};*/
// Palisade
/*exports.palisade = (() => {
    let props = {
        SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.half_reload, g.half_reload]),
        TYPE: exports.minion,
        STAT_CALCULATOR: gunCalcNames.drone,
        AUTOFIRE: true,
        MAX_CHILDREN: 1,
        SYNCS_SKILLS: true,
        WAIT_TO_CYCLE: true,
    };
    return {
        PARENT: [exports.miniboss],
        LABEL: 'Rogue Palisade',
        COLOR: 17,
        SHAPE: 6,
        SIZE: 28,
        VALUE: 5e5,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 2,
            DAMAGE: base.DAMAGE * 3,
        },
        GUNS: [{
            POSITION: [4, 6, -1.6, 8, 0, 0, 0],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 60, 0],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 120, 0],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                TYPE: exports.minion,
                STAT_CALCULATOR: gunCalcNames.drone,
                AUTOFIRE: true,
                MAX_CHILDREN: 1,
                SYNCS_SKILLS: true,
                WAIT_TO_CYCLE: true,
            },
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 240, 0],
            PROPERTIES: props,
        }, {
            POSITION: [4, 6, -1.6, 8, 0, 300, 0],
            PROPERTIES: props,
        }],
        TURRETS: [{
            POSITION: [5, 10, 0, 30, 110, 0],
            TYPE: exports.trapTurret,
        }, {
            POSITION: [5, 10, 0, 90, 110, 0],
            TYPE: exports.trapTurret,
        }, {
            POSITION: [5, 10, 0, 150, 110, 0],
            TYPE: exports.trapTurret,
        }, {
            POSITION: [5, 10, 0, 210, 110, 0],
            TYPE: exports.trapTurret,
        }, {
            POSITION: [5, 10, 0, 270, 110, 0],
            TYPE: exports.trapTurret,
        }, {
            POSITION: [5, 10, 0, 330, 110, 0],
            TYPE: exports.trapTurret,
        }],
    };
})();*/
// Old beta-tester keys
/*'BETATESTERQKF66ffbMNZfi59xFOJy4moPYyHiqEZkBETATESTER',
'BETATESTERncXahnlpV8BW00wgT5aUOWo2pu1nOoegBETATESTER',
'BETATESTERqM9HSyqrROLrmEO5aCK6QfeRefnY3zxNBETATESTER',
'BETATESTERpt90iu70cmJ1MN34vAp3sbYOWCAD2eYMBETATESTER',
'BETATESTERHEBaDx3VfVqq5Le5v5CqJ5anGIqlp9sdBETATESTER',
'BETATESTERjVb20BAUCHJ4KgTkmrJF5gblIfR6am98BETATESTER',
'BETATESTERCW2zPY4QI9AJzDxFfBGuvMpQs9P8JZCABETATESTER',
'BETATESTERMubGO5aNINYtWsyzwglPQYarUYPt8NEbBETATESTER',*/
// Elemental
/*exports.square_drone = {
    PARENT: [exports.droneAI],
    SHAPE: 4,
};
exports.elemental = {
    PARENT: [exports.boss_ai],
    LABEL: 'Elemental',
    SIZE: 20,
    DANGER: 8,
    COLOR: 20,
    STAT_NAMES: statNames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.5,
        SPEED: base.SPEED * 0.25,
        FOV: base.FOV * 1.15,
        HEALTH: 3000,
        REGEN: base.REGEN * 0.5,
    },
    SHAPE: 4,
    FACING_TYPE: 'autospin',
    GUNS: [{
        POSITION: [5, 12, 1.2, 8, 0, 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.element_drone]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 6,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 270, 0.5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.element_sunchip]),
            TYPE: exports.square_drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 14,
            STAT_CALCULATOR: gunCalcNames.necro,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 0, 0.25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.element]),
            TYPE: exports.swarm,
            MAX_CHILDREN: 10,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, {
        POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.penta_drone]),
            TYPE: exports.pentaDrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 5,
            STAT_CALCULATOR: gunCalcNames.drone,
        },
    }],
};
    element_sunchip: [2, 1, 1, 0.65, 0.4, 0.35, 0.5, 0.975, 1, 1, 0.8, 1, 1],
    penta_drone: [4, 1, 1, 1, 0.68, 0.35, 0.5, 0.975, 1, 1, 0.8, 1, 1],
    element: [0.25, 1, 1, 0.225, 1.1, 1.1, 1, 1, 0.85, 1, 1, 1, 1.1],
    element_drone: [1.25, 1, 1, 0.58, 0.7, 0.95, 1, 1, 0.9, 1, 2, 1, 1],*/
// Legendary Hybrid
/*exports.anniAuto = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2.25
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.fast_more_range, g.half_reload]),
			TYPE: exports.bullet
		}
	}],
	HAS_NO_RECOIL: true
};
exports.legendaryHybridBody = {
	CONTROLLERS: ['slowSpin'],
	COLOR: 9,
	SHAPE: -6,
	INDEPENDENT: true
};
exports.legendaryHybridProp = {
	SHOOT_SETTINGS: combineStats([g.drone, g.over]),
	TYPE: [exports.drone, {
		BODY: {
			PENETRATION: 1.25,
			PUSHABILITY: 0.5,
			ACCELERATION: 0.03,
			HEALTH: 1,
			DAMAGE: -1,
			SPEED: 3.75,
			RANGE: 50,
			RESIST: 1.25,
			FOV: 2,
			DENSITY: 0.05
		},
		IGNORE_SHAPES: true,
		INDEPENDENT: true
	}],
	AUTOFIRE: true,
	SYNCS_SKILLS: true,
	STAT_CALCULATOR: gunCalcNames.drone,
	WAIT_TO_CYCLE: true,
	MAX_CHILDREN: 2,
};
exports.legendaryHybrid = makeAuto({
	PARENT: [exports.genericTank],
	DANGER: 7,
	SHAPE: 16,
	SIZE: 30,
	IS_LEGENDARY_HYBRID: true,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: 0.72,
		SPEED: 1.5,
		HEALTH: 7008,
		REGEN: 0.01875,
		PUSHABILITY: 0.15,
		DAMAGE: 14,
		DENSITY: 0.25
	},
	GUNS: [{
		POSITION: [4.3, 3.1, 1.2, 8, 0, 22.5, 1],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 45, 0.0625],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 67.5, 0.9375],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 112.5, 0.875],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 135, 0.1875],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 157.5, 0.8125],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 202.5, 0.75],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 225, 0.3125],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 247.5, 0.6875],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 292.5, 0.625],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 315, 0.4375],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 337.5, 0.5625],
		PROPERTIES: exports.legendaryHybridProp
	}, {
		POSITION: [4.5, 4.5, 1, 8, 0, 0, 0]
	}, {
		POSITION: [0.5, 4.5, 1.2, 12.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
			TYPE: exports.block
		}
	}, {
		POSITION: [4.5, 4.5, 1, 8, 0, 90, 0]
	}, {
		POSITION: [0.5, 4.5, 1.2, 12.5, 0, 90, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
			TYPE: exports.block
		}
	}, {
		POSITION: [4.5, 4.5, 1, 8, 0, 180, 0]
	}, {
		POSITION: [0.5, 4.5, 1.2, 12.5, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
			TYPE: exports.block
		}
	}, {
		POSITION: [4.5, 4.5, 1, 8, 0, 270, 0]
	}, {
		POSITION: [0.5, 4.5, 1.2, 12.5, 0, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
			TYPE: exports.block
		}
	}],
	TURRETS: [{
		POSITION: [28, 0, 0, 0, 360, 0],
		TYPE: exports.legendaryHybridBody
	}]
}, 'Legendary Hybrid', {
	type: exports.anniAuto,
	size: 8
});
if (bodyCheck && body.isLegendaryHybrid && !body.colorSet) {
	body.colorSet = true;
	body.color = 14;
	setTimeout(() => {
		body.color = 11;
	}, 666.7);
	setTimeout(() => {
		body.color = 12;
	}, 1333.3);
	setTimeout(() => {
		body.colorSet = false;
	}, 2000);
}*/
// Fly Feature
/*
case 9: // Set flight
	if (bodyCheck) {
		player.body.canFly = m[1];
		player.body.flyTimer1 = m[2] * 1000;
		player.body.flyTimer2 = m[3] * 1000;
	}
	break;

case 'Q': // Fly feature (WIP)
	{
		if (m.length !== 0) return 1, socket.kick('Ill-sized flight request!');
		let pressed = false;
		if (pressed === true) return;
		if (bodyCheck && player.body.canFly !== false) {
			pressed = true;
			player.body.transparent = true;
			player.body.LAYER = 12;
			player.body.RESIST = 0;
			player.body.SIZE += 18;
			setTimeout(() => {
				setTimeout(() => {
					pressed = false;
				}, player.body.flyTimer2);
				setTimeout(() => {
					player.body.transparent = false;
				}, 5000);
				player.body.RESIST = 1;
				player.body.SIZE -= 18;
				player.body.LAYER = 5;
			}, player.body.flyTimer1);
		}
	}
	break;*/
// Constellation
/*exports.constBody1 = {
	LABEL: '',
	COLOR: 13,
	SHAPE: 4,
	INDEPENDENT: true,
};
exports.constBody2 = {
	PARENT: [exports.constBody1],
	COLOR: 32,
};
exports.constGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
			TYPE: [exports.bullet, {
				COLOR: 13
			}]
		}
	}],
	HAS_NO_RECOIL: true
};
exports.const = {
	PARENT: [exports.genericTank],
	LABEL: 'Constellation',
	DANGER: 10,
	SIZE: 24,
	FACING_TYPE: 'spinSlowly',
	SHAPE: 4,
	COLOR: 16,
	BODY: {
		FOV: base.FOV * 1.25,
		HEALTH: 13250,
		SHIELD: 2,
		REGEN: 0.0125,
		DAMAGE: 10,
		SPEED: base.SPEED * 0.15,
		ACCELERATION: base.ACCEL * 0.45
	},
	GUNS: [],
	TURRETS: [{
		POSITION: [30, 0, 0, 45, 360, 0],
		TYPE: exports.constBody1,
	}, {
		POSITION: [21.25, 13, 13, 0, 360, 1],
		TYPE: exports.constBody2,
	}, {
		POSITION: [21.25, 13, -13, 0, 360, 1],
		TYPE: exports.constBody2,
	},{
		POSITION: [21.25, -13, 13, 0, 360, 1],
		TYPE: exports.constBody2,
	}, {
		POSITION: [21.25, -13, -13, 0, 360, 1],
		TYPE: exports.constBody2,
	}, {
		POSITION: [6, 19, 0, 45, 360, 1],
		TYPE: exports.constGun
	}, {
		POSITION: [6, 19, 0, -45, 360, 1],
		TYPE: exports.constGun
	}, {
		POSITION: [6, 19, 0, -135, 360, 1],
		TYPE: exports.constGun
	}, {
		POSITION: [6, 19, 0, 135, 360, 1],
		TYPE: exports.constGun
	}],
	BROADCAST_MESSAGE: 'A Constellation boss has been defeated!',
};*/
// Glitch
/*exports.trapBullet = {
	PARENT: [exports.bullet],
	SHAPE: -4
};
exports.chipDrone = {
	PARENT: [exports.droneAI],
	SHAPE: -3
};
exports.glitch = {
	PARENT: [exports.genericTank],
	LABEL: 'exports.genericTank',
	SHAPE: -11,
	COLOR: 10,
	SIZE: 25,
	MAX_CHILDREN: 12,
	BODY: {
		HEALTH: 6186,
		DAMAGE: base.DAMAGE * 1.1
	},
	SKILL: skillSet({
		rld: 0.3,
		dam: 1,
		pen: 1,
		str: 0.7,
		spd: 0.5,
		atk: 1,
		hlt: 1,
		shi: 0.2,
		rgn: 0.1,
		mob: 0.1
	}),
	GUNS: [{
		POSITION: [12, 1, 30, 0, 0, 0, 0]
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 86, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.single]),
			TYPE: exports.trapBullet,
			AUTOFIRE: true
		}
	}, {
		POSITION: [18, 6, 1.5, 0, 0, -51, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.droneAI,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			MAX_CHILDREN: 6
		}
	}, {
		POSITION: [18, 6, -1.5, 0, 0, -51, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.chipDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			MAX_CHILDREN: 6
		}
	}],
	TURRETS: [{
		POSITION: [11, 2, 0, 180, 180, 0],
		TYPE: exports.auto3gun
	}],
	DIES_TO_TEAM_BASE: false,
};*/
// Harvester
/*exports.harvest = {
	PARENT: [exports.genericTank],
	LABEL: 'Harvester',
	STAT_NAMES: statNames.trap,
	DANGER: 7,
	COLOR: 12,
	LEVEL: 60,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.7,
		FOV: base.FOV * 1.15
	},
	GUNS: [{
		POSITION: [18, 18, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 18, 1.2, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g._construct]),
			TYPE: [exports.block, {
				BODY: {
					HEALTH: 20,
					DAMAGE: 10,
				},
				VALUE: 10000
			}]
		}
	}, {
		POSITION: [5, 11, 1.2, 8, 0, 100, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak2]),
			TYPE: [exports.drone, {
				INDEPENDENT: true,
				VALUE: 5000
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 4
		}
	}, {
		POSITION: [5, 11, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak2]),
			TYPE: [exports.drone, {
				INDEPENDENT: true,
				VALUE: 5000
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 4
		}
	}, {
		POSITION: [5, 11, 1.2, 8, 0, 260, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak2]),
			TYPE: [exports.drone, {
				INDEPENDENT: true,
				VALUE: 5000
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 4
		}
	}]
};
weak2: [2, 1, 1, 0.6, 0.6, 0.6, 0.8, 0.8, 0.7, 0.25, 0.3, 1, 1],
_construct: [1.25, 1, 1, 0.5, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
*/
// Neko
/*exports.cake = makeAuto(exports.mothership, 'Auto-Mothership', {
	type: exports.autoPound,
	size: 15
});
exports.neko = {
	PARENT: [exports.genericTank],
	LABEL: 'Neko',
	DANGER: 7,
	COLOR: 14,
	TEAM: -5,
	INVISIBLE: [0.08, 0.03, 0.1],
	BODY: {
		SPEED: base.SPEED * 1.35,
		FOV: 1.5,
		HEALTH: base.HEALTH * 4,
		DAMAGE: base.DAMAGE * 2
	},
	GUNS: [{
		POSITION: [24, 7, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.low_damage]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 7, -1.6, 8, 0, 0, 0]
	}]
};*/
// Necro Santa
/*exports.sunchip_santa = {
	PARENT: [exports.drone],
	SHAPE: 4,
	COLOR: 27,
	VALUE: Math.random() * (5000 - 1000) + 1000,
	HITS_OWN_TYPE: 'hard',
	BODY: {
		FOV: 0.5,
	},
	AI: {
		BLIND: true,
		FARMER: true,
	},
	DRAW_HEALTH: false,
};
exports.necroSanta = {
	PARENT: [exports.genericTank],
	LABEL: 'Necro-Santa',
	DANGER: 2,
	STAT_NAMES: statNames.necro,
	BODY: {
		ACCELERATION: base.ACCEL * 0.85,
		SPEED: base.SPEED * 0.85,
		FOV: base.FOV * 1.25,
		HEALTH: 1e8,
		SHIELD: 1e8,
		REGEN: 1e8,
		RESIST: 1e8,
	},
	COLOR: 26,
	SHAPE: 4,
	FACING_TYPE: 'locksFacing',
	GUNS: [{
		POSITION: [5, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.very_weak]),
			TYPE: exports.sunchip_santa,
			MAX_CHILDREN: 3,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.very_weak]),
			TYPE: exports.sunchip_santa,
			MAX_CHILDREN: 3,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.very_weak]),
			TYPE: exports.sunchip_santa,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			MAX_CHILDREN: 3,
			STAT_CALCULATOR: gunCalcNames.necro,
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.very_weak]),
			TYPE: exports.sunchip_santa,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			MAX_CHILDREN: 3,
			STAT_CALCULATOR: gunCalcNames.necro,
		}
	}]
};*/
// Non-obfuscated tokens
/*'Miss_Cutie',
'2hu_Koishi_Komeiji',
'STILL_NOT_A_BACKDOOR',
// Beta Tester Token Level 1
'BT1QKF66fGbMnZfi59xFoJy4moPYyHiqEZkBT1',
'BT1ncXahnlpV8BW01wgT5aUoWo2Pu1nOoRgBT1',
'BT1qM7HSyQrROLvmEO5aNK6QfeBefnY9zxNBT1',
'BT1pt90iu72cmJ1mN34vAp3sbY0WCaD2eYMBT1',
// Beta Tester Token Level 2
'BT2HEBaDx3VfVqQ5Le2v5CqJ5bnGLqlp9sdBT2',
'BT2jVb28BAucHJ4JgTkMrJF3gblIfR6am98BT2',
'BT2CW2zPy3QI6AJzDxFfGUuvMpQs9P8JZCABT2',
'BT2muBGO1DxiKYtWsYz3glPqLarUyPt6NrbBT2',
// Beta Tester Token Level 3
'BT3oS3rcmxDlW6aCPzu9yLJdpwt2k1TeMcEBT3',
'BT3m88EonvhvBzeNKDvIHcB5T6Yt7ApwZ3VBT3',
'BT3gthpTCeIz5Hiav6OeUBom4Y1osIiL1DlBT3',
'BT3fXOmnZdrkmV0xJoCip6ZUK5ljrd3Ii8MBT3',*/