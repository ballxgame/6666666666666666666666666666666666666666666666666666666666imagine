/*jslint node: true */
"use strict";

require('seedrandom');

Math.seedrandom('' + Date.now());

exports.random = x => {
    return x * Math.random();
};
exports.randomAngle = () => {
    return Math.PI * 2 * Math.random();
};
exports.randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};
exports.irandom = i => {
    let max = Math.floor(i);
    return Math.floor(Math.random() * (max + 1));
};
exports.irandomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.gauss = (mean, deviation) => {
    let x1, x2, w;
    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        w = x1 * x1 + x2 * x2;
    } while (0 == w || w >= 1);
    w = Math.sqrt(-2 * Math.log(w) / w);
    return mean + deviation * x1 * w;
};
exports.gaussInverse = (min, max, clustering) => {
    let range = max - min;
    let output = exports.gauss(0, range / clustering);
    while (output < 0) output += range;
    while (output > range) output -= range;
    return output + min;
};
exports.gaussRing = (radius, clustering) => {
    let r = exports.random(Math.PI * 2);
    let d = exports.gauss(radius, radius * clustering);
    return {
        x: d * Math.cos(r),
        y: d * Math.sin(r)
    };
};
exports.chance = prob => {
    return exports.random(1) < prob;
};
exports.dice = sides => {
    return exports.random(sides) < 1;
};
exports.choose = arr => {
    return arr[exports.irandom(arr.length - 1)];
};
exports.chooseN = (arr, n) => {
    let o = [];
    for (let i = 0; i < n; i++) o.push(arr.splice(exports.irandom(arr.length - 1), 1)[0]);
    return o;
};
exports.chooseChance = (...arg) => {
    let totalProb = 0;
    arg.forEach(function(value) {
        totalProb += value;
    });
    let answer = exports.random(totalProb);
    for (let i = 0; i < arg.length; i++) {
        if (answer < arg[i]) return i;
        answer -= arg[i];
    }
};
exports.chooseBotName = () => {
	return exports.choose([
		'Alice',
		'Chen',
		'Ran',
		'Iku',
		'Tenshi',
		'Kogasa',
		'Daiyousei',
		'Marisa',
		'Hong',
		'Shinki',
		'Kyouko',
		'Koakuma',
		'Remilia',
		'Flandre',
		'Junko',
		'Suika',
		'Ellen',
		'Mima',
		'Yuuka',
		'Reimu',
		'Mystia',
		'Sakuya',
		'Wakasigihime',
		'Yatsuhashi',
		'Clownpiece',
		'Benben',
		'Youmu',
		'Lyrica',
		'Hecatia',
		'Satori',
		'Koishi',
		'Mokou',
		'Merlin',
		'Lunasa',
		'Keine',
		'Mike',
		'Kagerou',
		'Gengetsu',
		'Nue',
		'Rin',
		'Utsuho',
		'Doremy',
		'Raiko',
		'Yumeko',
		'Konngara',
		'Rumia',
		'Yukari',
		'Cirno',
		'Yuyuko',
		'Nitori',
		'Hina',
		'Komachi',
		'Shikieiki',
		'Kaguya',
		'Suwako',
		'Kanako',
		'Sanae',
		'Aya',
		'Medicine',
		'Sukuna',
		'Yoshika',
		'Tojiko',
		'Seiga',
		'Sekibanki',
		'Byakuren',
		'Murasa',
		'Seija',
		'Shion',
		'Joon',
		'Lily',
		'Hatate',
		'Nazrin',
		'Eirin',
		'Patchouli',
		'Tewi',
		'Reisen',
		'Orange',
		'Elly',
		'Kurumi',
		'Yuugi',
		'Minoriko',
		'Sumireko',
		'Momiji',
		'Kana',
		'Mugetsu',
		'Wriggle',
		'Kisume',
		'Yamame',
		'Okina',
		'Luna child',
		'Star Sapphir',
		'Sunny Milk',
		'Maribel',
		'Sariel',
		'Kikuri',
		'Parsee',
		'Futo',
		'Layla',
		'Ichirin',
		'Sagume',
		'Ringo',
		'Seiran',
		'Renko',
		'Eternity Larva',
		'Nemuno',
		'Aunn',
		'Narumi',
		'Satono',
		'Mai',
		'Yuki',
		'Rika',
	]);
};
exports.chooseTank = type => {
	switch (type) {
		case 'norm':
			return exports.choose([
				'basic',
				'twin',
				'sniper',
				'machine',
				'pounder',
				'flank',
				'director',
				'double',
				'bent',
				'gunner',
				'dual',
				'tripletwin',
				'split',
				'autoDouble',
				'bentDouble',
				'penta',
				'spread',
				'benthybrid',
				'triple',
				'burst',
				'destroy',
				'builder',
				'artillery',
				'autogunner',
				'nailgun',
				'guntrap',
				'machinegunner',
				'overload',
				'assassin',
				'hunter',
				'mini',
				'rifle',
				'snipeGuard',
				'trapper',
				'triTrapper',
				'flankTrap',
				'minitrap',
				'construct',
				'autoBuilder',
				'engineer',
				'boomer',
				'blaster',
				'spray',
				'autoMachine',
				'triBlaster',
				'gatling',
				'twinBlaster',
				'fortress',
				'hexatrap',
				'tritrap',
				'ranger',
				'falcon',
				'Low',
				'autoAssassin',
				'stalk',
				'branch',
				'predator',
				'rocketeer',
				'twinTrapper',
				'poach',
				'annihilator',
				'hybrid',
				'shotgun2',
				'autoDestroy',
				'skimmer',
				'FatAtome',
				'mortar',
				'autoArtillery',
				'cannon',
				'stream',
				'hybridMini',
				'autoMini',
				'hotshot',
				'autoMaton',
				'flamethrow',
				'fireTrap',
				'twinFlame',
				'megaFlamethrow',
				'hexa',
				'tri',
				'fighter',
				'booster',
				'falcon',
				'bomber',
				'autotri',
				'speeder',
				'dragon',
				'octo',
				'autohexa',
				'autohexatrap',
				'heptaTrap',
				'auto5',
				'heavy3',
				'auto4',
				'sniper3',
				'overseer',
				'cruiser',
				'underseer',
				'factory',
				'fatFactory',
				'sniperFactory',
				'twinFactory',
				'overlord',
				'overtrap',
				'overgunner',
				'autoOverseer',
				'master',
				'manager',
				'necromancer',
				'autoUnderseer',
				//'pentamancer',
				'carrier',
				'battleship',
				'autoCruiser',
				'fatCruiser',
				'overCruiser',
				'fatCarrier',
				'hiveShooter',
				'skimskim',
				'auto8',
				'flankLiner',
				'quint',
				'recruit',
				'conq',
				'bentboomer',
				'Bigboomer',
				'undership',
				'dust',
				'skirmish',
				'trappory'
			]);
		case 'smash':
			return exports.choose([
				'smash',
				'megaSmash',
				'spike',
				'autoSmash',
				'landmine',
				'mega_spike',
				'teleporter'
			]);
		case 'boost':
			return exports.choose([
				'tri',
				'autotri',
				'booster',
				'falcon',
				'skirmish',
				'speeder',
				'dragon'
			]);
	}
};
exports.chooseBuild = type => {
    switch (type) {
        case 'norm':
            return exports.choose([
                [9, 7, 7, 7, 9, 0, 0, 0, 0, 3],
                [9, 7, 7, 7, 7, 0, 0, 0, 0, 5],
                [9, 8, 8, 8, 9, 0, 0, 0, 0, 0],
                [9, 6, 6, 6, 9, 0, 0, 0, 0, 6]
            ]);
        case 'smash':
            return exports.choose([
                [0, 0, 0, 0, 0, 3, 12, 12, 3, 12],
                [6, 0, 0, 0, 0, 0, 12, 12, 0, 12],
                [0, 0, 0, 0, 0, 0, 12, 12, 6, 12],
                [0, 0, 0, 0, 0, 6, 12, 12, 0, 12],
                [0, 0, 0, 0, 0, 10, 10, 10, 0, 12]
            ]);
        case 'boost':
            return exports.choose([
                [9, 0, 0, 0, 0, 3, 9, 9, 3, 9],
                [9, 0, 0, 0, 0, 0, 9, 9, 6, 9],
                [9, 0, 0, 0, 0, 6, 9, 9, 0, 9],
                [9, 0, 0, 0, 0, 8, 8, 8, 0, 9],
                [9, 0, 0, 0, 0, 4, 8, 8, 4, 9]
            ]);
    }
};
exports.chooseBossName = (code, n) => {
	switch (code) {
		case 'a':
			return exports.chooseN([
				'Archimedes',
				'Akilina',
				'Anastasios',
				'Athena',
				'Alkaios',
				'Amyntas',
				'Aniketos',
				'Artemis',
				'Anaxagoras',
				'Apollon',
			], n);
		case 'castle':
			return exports.chooseN([
				'Berezhany',
				'Lutsk',
				'Dobromyl',
				'Akkerman',
				'Palanok',
				'Zolochiv',
				'Palanok',
				'Mangup',
				'Olseko',
				'Brody',
				'Isiaslav',
				'Kaffa',
				'Bilhorod',
			], n);
		default:
			return 'k';
	}
};