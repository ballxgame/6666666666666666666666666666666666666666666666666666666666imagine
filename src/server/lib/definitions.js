// Tank Definitions
// TO DO: Finish removing uneccessary/trailing commas

const combineStats = function(array) {
	try {
		let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
		array.forEach(function(component) {
			for (let i = 0; i < data.length; ++i) data[i] *= component[i];
		});
		return {
			reload: data[0],
			recoil: data[1],
			shudder: data[2],
			size: data[3],
			health: data[4],
			damage: data[5],
			pen: data[6],
			speed: data[7],
			maxSpeed: data[8],
			range: data[9],
			density: data[10],
			spray: data[11],
			resist: data[12]
		};
	} catch (e) {
		console.log(e);
		console.log(JSON.stringify(array));
	}
};
const c = require('../../../config.json');
const skillSet = (() => {
	let skcnv = {
		rld: 0, // Weapon Reload
		pen: 1, // Weapon Penetration
		str: 2, // Weapon Health
		dam: 3, // Weapon Damage
		spd: 4, // Weapon Speed
		shi: 5, // Body Shield
		atk: 6, // Body Damage
		hlt: 7, // Body Health
		rgn: 8, // Shield Regen
		mob: 9  // Move Speed
	};
	return args => {
		let skillCap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (const key of Object.keys(args)) {
			skillCap[skcnv[key]] = Math.round(c.MAX_SKILL * args[key]);
		}
		return skillCap;
	};
})();
const g = {
	/* RELOAD, RECOIL, SHUDDER, SIZE, HEALTH, DAMAGE, PEN, SPEED, MAX, RANGE, DENSITY, SPRAY, RESIST */
	blank: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	custom_size: [1, 1, 1, 0.55, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	trap: [35, 1, 0.25, 0.6, 1, 0.75, 1, 5, 1, 1, 1, 15, 3],
	swarm: [18, 0.25, 0.05, 0.4, 1, 0.3, 1, 4, 1, 1, 1, 5, 1],
	drone: [50, 0.25, 0.1, 0.6, 1, 1, 1, 2, 1, 1, 1, 0.1, 1],
	factory: [60, 1, 0.1, 0.7, 1, 0.75, 1, 3, 1, 1, 1, 0.1, 1],
	basic: [18, 1.4, 0.1, 1, 1, 0.75, 1, 4.5, 1, 1, 1, 15, 1],
	spam: [1.1, 1, 1, 1.05, 1, 1.1, 1, 0.9, 0.7, 1, 1, 1, 1.05],
	minion: [1, 1, 2, 1, 0.4, 0.4, 1.2, 1, 1, 0.75, 1, 2, 1],
	single: [1.05, 1, 1, 1, 1, 1, 1, 1.05, 1, 1, 1, 1, 1],
	sniper: [1.35, 1, 0.25, 1, 1, 0.8, 1.1, 1.5, 1.5, 1, 1.5, 0.2, 1.15],
	rifle: [0.8, 0.8, 1.5, 1, 0.8, 0.8, 0.9, 1, 1, 1, 1, 2, 1],
	assass: [1.65, 1, 0.25, 1, 1.15, 0.875, 1.1, 1.18, 1.18, 1, 3, 1, 1.3],
	hunter: [1.5, 0.7, 1, 0.95, 1, 0.9, 1, 1.1, 0.8, 1, 1.2, 1, 1.15],
	hunter2: [1, 1, 1, 0.9, 2, 0.5, 1.5, 1, 1, 1, 1.2, 1, 1.1],
	preda: [1.4, 1, 1, 0.8, 1.5, 0.9, 1.2, 0.9, 0.9, 1, 1, 1, 1],
	mach: [0.5, 0.8, 1.7, 1, 0.7, 0.7, 1, 1, 0.8, 1, 1, 2.5, 1],
	blaster: [1, 1.2, 1.25, 1.1, 1.5, 1, 0.6, 0.8, 0.33, 0.6, 0.5, 1.5, 0.8],
	chain: [1.25, 1.33, 0.8, 1, 0.8, 1, 1.1, 1.25, 1.25, 1.1, 1.25, 0.5, 1.1],
	mini: [1.25, 0.6, 1, 0.8, 0.55, 0.45, 1.25, 1.33, 1, 1, 1.25, 0.5, 1.1],
	stream: [1.1, 0.6, 1, 1, 1, 0.65, 1, 1.24, 1, 1, 1, 1, 1],
	shotgun: [8, 0.4, 1, 1.5, 1, 0.4, 0.8, 1.8, 0.6, 1, 1.2, 1.2, 1],
	flank: [1, 1.2, 1, 1, 1.02, 0.81, 0.9, 1, 0.85, 1, 1.2, 1, 1],
	tri: [1, 0.9, 1, 1, 0.9, 1, 1, 0.8, 0.8, 0.6, 1, 1, 1],
	tri_front: [1, 0.2, 1, 1, 1, 1, 1, 1.3, 1.1, 1.5, 1, 1, 1],
	thruster: [1, 1.5, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
	auto: [1.8, 0.75, 0.5, 0.8, 0.9, 0.6, 1.2, 1.1, 1, 0.8, 1.3, 1, 1.25],
	five: [1.15, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1.1, 2, 1, 1],
	auto_snipe: [1, 1, 1, 1.4, 2, 1, 1, 1, 1, 1, 1, 1, 1],
	pound: [2, 1.6, 1, 1, 1, 2, 1, 0.85, 0.8, 1, 1.5, 1, 1.15],
	destroy: [2.2, 1.8, 0.5, 1, 2, 2, 1.2, 0.65, 0.5, 1, 2, 1, 3],
	anni: [0.85, 1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	hive: [1.5, 0.8, 1, 0.8, 0.7, 0.3, 1, 1, 0.6, 1, 1, 1, 1],
	arty: [1.2, 0.7, 1, 0.9, 1, 1, 1, 1.15, 1.1, 1, 1.5, 1, 1],
	mortar: [1.2, 1, 1, 1, 1.1, 1, 1, 0.8, 0.8, 1, 1, 1, 1],
	spread_main: [0.78125, 0.25, 0.5, 1, 0.5, 1, 1, 1.5/0.78, 0.9/0.78, 1, 1, 1, 1],
	spread: [1.5, 1, 0.25, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 0.25, 1],
	skim: [1.33, 0.8, 0.8, 0.9, 1.35, 0.8, 2, 0.3, 0.3, 1, 1, 1, 1.1],
	twin: [1, 0.5, 0.9, 1, 0.9, 0.7, 1, 1, 1, 1, 1, 1.2, 1],
	bent: [1.1, 1, 0.8, 1, 0.9, 1, 0.8, 1, 1, 1, 0.8, 0.5, 1],
	triple: [1.2, 0.667, 0.9, 1, 0.85, 0.85, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
	quint: [1.5, 0.667, 0.9, 1, 1, 1, 0.9, 1, 1, 1, 1.1, 0.9, 0.95],
	dual: [2, 1, 0.8, 1, 1.5, 1, 1, 1.3, 1.1, 1, 1, 1, 1.25],
	double: [1, 1, 1, 1, 1, 0.9, 1, 1, 1, 1, 1, 1, 1],
	hewn: [1.25, 1.5, 1, 1, 0.9, 0.85, 1, 1, 0.9, 1, 1, 1, 1],
	pure_gunner: [1, 0.25, 1.5, 1.2, 1.35, 0.25, 1.25, 0.8, 0.65, 1, 1.5, 1.5, 1.2],
	machgun: [0.66, 0.8, 2, 1, 1, 0.75, 1, 1.2, 0.8, 1, 1, 2.5, 1],
	gunner: [1.25, 0.25, 1.5, 1.1, 1, 0.35, 1.35, 0.9, 0.8, 1, 1.5, 1.5, 1.2],
	power: [1, 1, 0.6, 1.2, 1, 1, 1.25, 2, 1.7, 1, 2, 0.5, 1.5],
	nail: [0.85, 2.5, 1, 0.8, 1, 0.7, 1, 0.75, 1, 1, 2, 1, 1],
	fast: [1, 1, 1, 1, 1, 1, 1, 1.2, 1, 1, 1, 1, 1],
	turret: [2, 1, 1, 1, 0.8, 0.6, 0.7, 1, 1, 1, 0.1, 1, 1],
	auto_turret: [2, 1, 1, 1, 0.8, 0.85, 0.9, 0.7, 1, 1, 0.1, 1, 1],
	battle: [0.975, 1, 1, 1, 1.1, 1.1, 1, 1, 0.85, 1, 1, 1, 1.1],
	bees: [1.3, 1, 1, 1.4, 1, 1.5, 0.5, 3, 1.5, 1, 0.25, 1, 1],
	carrier: [1.5, 1, 1, 1, 1, 0.8, 1, 1.3, 1.2, 1.2, 1, 1, 1],
	hexatrap: [1.3, 1, 1.25, 1, 1, 1, 1, 0.8, 1, 0.5, 1, 1, 1],
	block: [1.1, 2, 0.1, 1.5, 2, 1, 1.25, 1.5, 2.5, 1.25, 1, 1, 1.25],
	construct: [1.3, 1, 1, 0.9, 1, 1, 1, 1, 1.1, 1, 1, 1, 1],
	boomerang: [0.8, 1, 1, 1, 0.5, 0.5, 1, 0.75, 0.75, 1.333, 1, 1, 1],
	mother: [1.5, 1, 1, 0.875, 0.7, 1, 0.95, 1, 0.9, 1, 2, 1, 1],
	over: [1.25, 1, 1, 0.85, 0.7, 0.95, 1, 1, 0.9, 1, 2, 1, 1],
	meta: [1.333, 1, 1, 1, 1, 0.667, 1, 1, 1, 1, 1, 1, 1],
	weak: [2, 1, 1, 1, 0.6, 0.6, 0.8, 0.5, 0.7, 0.25, 0.3, 1, 1],
	very_weak: [1.25, 0, 1, 0.65, 0.05, 0.05, 0.05, 0.75, 0.7, 0.25, 0.3, 1, 0.25],
	master: [3, 1, 1, 0.7, 0.45, 0.9, 1, 1, 1, 0.1, 0.5, 1, 1],
	sunchip: [5, 1, 1, 1.4, 0.5, 0.4, 0.6, 1, 1, 1, 0.8, 1, 1],
	low_power: [1, 1, 2, 1, 0.5, 0.5, 0.7, 1, 1, 1, 1, 0.5, 0.7],
	low_power2: [1, 1, 2, 1, 0.7, 0.7, 0.7, 1, 1, 1, 1, 0.9, 0.7],
	half_recoil: [1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	more_recoil: [1, 1.15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	much_more_recoil: [1, 1.35, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	lots_more_recoil: [1, 1.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	tons_more_recoil: [1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	double_reload: [0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	more_reload: [0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	one_fourth_reload: [1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	half_reload: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	one_third_reload: [1.33333, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	gun_dominator: [0.8, 0, 1, 0.5, 1, 1.5, 1.5, 1.25, 1, 1, 1, 1, 1],
	dominator: [7.5, 0, 1, 0.975, 15, 15, 15, 0.8, 1, 1, 1, 1, 1],
	trapperDominator: [1.275, 0, 0.1, 0.975, 1.75, 1.5, 1.75, 0.75, 2, 0.45, 1, 1, 1],
	drone_dominator: [1.25, 1, 1, 1, 1.25, 1.25, 1.25, 1, 0.9, 1, 2, 1, 1],
	less_reload: [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	more_speed: [1, 1, 1, 1, 1, 1, 1, 1.3, 1.3, 1, 1, 1, 1],
	slow: [1, 1, 1, 1, 1, 1, 1, 0.7, 0.7, 1, 1, 1, 1],
	not_dense: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1, 1],
	half_range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1],
	fake: [1, 1, 1, 0.00001, 0.0001, 1, 1, 0.00001, 2, 0, 1, 1, 1],
	op: [0.5, 1.3, 1, 1, 9, 9, 9, 3.25, 2, 1.5, 5, 2, 1],
	closer: [1, 0, 1, 1, 1e5, 100, 1e5, 2.5, 2, 1, 5, 1.75, 1],
	protector_swarm: [5, 0, 1, 1.75, 100, 2.5, 2.5, 1, 1, 0.6, 5, 1, 10],
	launcher: [1.75, 1.5, 0.1, 1.25, 1, 0.75, 0.85, 1, 1, 1, 1, 1, 1],
	protector:[5, 0, 1, 1, 100, 10, 100, 1, 1, 0.5, 5, 1, 10],
	levi_five: [1.45, 1, 1, 1, 0.95, 0.95, 0.95, 1.125, 1.1, 1.15, 2, 1.1, 1],
	levi: [2, 1, 1.25, 1, 1, 1, 1, 0.65, 1, 0.75, 1, 1, 1],
	super_auto: [6, 0, 0.65, 0.9, 2, 2, 2, 1.1, 1.05, 1.35, 1.25, 1.05, 1.25],
	defend_five: [1.25, 1, 5, 1, 1.1, 1.1, 1.1, 1.45, 1.1, 1.15, 2, 1.1, 1],
	defend: [1.225, 1, 0.25, 0.75, 1.1, 1.1, 1.1, 0.85, 1, 2.25, 1, 1, 1],
	octogeddon: [1.6, 1, 0.25, 1.45, 0.6, 0.6, 1, 0.45, 1, 1, 1, 1, 1],
	fallen: [0.15, 1, 1, 0.295, 0.5, 0.5, 0.5, 0.95, 0.9, 1, 2, 1, 1],
	closer_ai: [1, 1.1, 1, 1.1, 20, 20, 20, 5, 2, 1.4, 4, 0.1, 1],
	dem_trap: [1.35, 0, 0.5, 1.25, 1.05, 1, 1.25, 0.5, 1.55, 1, 1, 0.5, 1],
	dem_mach: [2.65, 0, 1, 0.5, 1, 1, 1, 1.2, 1, 1, 1, 1.3, 1],
	dem_factory: [185, 0, 0.25, 0.325, 0.5, 0.5, 0.5, 2.45, 1, 1, 1, 0.5, 1],
	dem_minion: [1.3, 0.95, 1.85, 0.9, 0.4, 0.35, 0.4, 0.5, 1, 0.75, 1, 1.85, 1],
	sweep: [2, 1.75, 0.25, 1000, 1e9, 1e9, 1e9, 5, 1, 1, 1, 1, 1],
	smaller: [1, 1, 1, 0.75, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	gang: [50, 1, 0.1, 2.25, 1.5, 1, 1, 0.75, 1, 1, 1, 0.1, 1],
	fast_more_range: [1, 1, 1, 1, 1, 1, 1, 1.5, 1, 1.5, 1, 1, 1],
	low_damage: [1, 0, 1.25, 1, 0.5, 0.5, 0.75, 1, 1, 1, 1, 1.25, 1],
	michael_rosen: [0.5, 0.1, 1, 1, 1e99, 1e99, 1e99, 7, 2, 1.4, 4, 1.5, 1e9],
	stronger: [0.85, 1, 1.25, 1, 1.15, 1.15, 1.15, 1.15, 1, 1, 1, 1, 1],
	bore: [1.25, 1, 1, 1, 1, 1, 1, 1.5, 1, 1, 1, 1, 1],
	more_damage: [1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1],
	op2: [0.02, 0, 0.5, 5, 5, 5, 2000, 5, 1, 2, 10, 0.01, 100],
	less_recoil: [1, 0.65, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	no_recoil: [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	pounder: [1, 0.9, 1, 1, 1.50, 1.05, 1.06, 1, 0.5, 1, 2, 1, 3],
	branch: [1.25, 1, 1, 1, 1, 1.15, 1.2, 1.25, 1, 1.1, 1, 1, 1],
	rocket: [0.4, 2, 1.5, 0.85, 0.25, 0.25, 0.25, 0.75, 1, 0.5, 1, 1.25, 1],
	rocketr: [2, 2, 1, 0.85, 1.5, 1, 1.5, 0.15, 0.5, 1, 1, 1, 1],
	hotshot: [1, 1, 1.5, 1, 1, 0.75, 1, 1, 1, 1, 1, 0.75, 0.75],
	tri_builder: [1.15, 0.5, 1.25, 1, 1, 1, 1, 0.6, 1, 1, 1, 1.25, 1],
	flame: [0.15, 0.25, 2, 1, 1, 0.25, 0.98, 1, 1, 0.3, 1, 2, 1],
	mega_flame: [0.15, 0.3, 2, 1, 0.35, 1, 1.3, 1, 1, 0.23, 1, 2, 1],
	overload: [1, 0.2, 1.5, 1.2, 1, 0.10, 1.15, 0.8, 0.7, 1, 1.5, 1.5, 1.2],
	bit_less_power: [1, 1, 1, 1, 0.95, 0.95, 1, 1, 1, 1, 1, 1, 1],
	bit_more_power: [1, 1, 1, 1, 1, 1.2, 1, 1, 1, 1, 1, 1, 1],
	mega_boomerang: [0.8, 1, 1, 1.3, 0.75, 0.75, 1, 0.85, 0.75, 1 + 1/3, 1, 1, 1],
	penta_sunchip: [1.15, 1, 1, 1, 1, 0.75, 1, 0.6, 0.85, 1, 1, 1, 1],
	double_size: [1, 1, 1, 1.8667, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	a_lotta_damage: [1.25, 1, 1, 1.2, 1.5, 1.75, 1.25, 1, 1, 1, 1, 1, 1],
	guardian: [1, 8, 1, 0.7, 2, 1, 1, 1, 1, 1.75, 0.25, 1, 0.25],
	summon: [0.35, 1, 1, 1.125, 0.25, 0.25, 0.15, 1, 1, 1, 0.8, 1, 1],
	trap_minion: [1, 1, 1, 1.15, 0.5, 0.5, 1.15, 1, 1, 0.75, 1, 1.1, 1],
	baby_factory: [1.5, 1, 1, 1, 1, 1, 1, 1, 1.35, 1, 1, 1, 1],
	more_spread: [1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1],
};
const statNames = {
	smasher: 1,
	drone: 2,
	necro: 3,
	swarm: 4,
	trap: 5,
	generic: 6
};
const gunCalcNames = {
	default: 0,
	bullet: 1,
	drone: 2,
	swarm: 3,
	fixedReload: 4,
	thruster: 5,
	sustained: 6,
	necro: 7,
	trap: 8
};

exports.genericEntity = {
	NAME: '',
	LABEL: 'Generic Entity',
	TYPE: 'unknown',
	DAMAGE_CLASS: 0,
	DANGER: 0,
	VALUE: 0,
	SHAPE: 0,
	COLOR: 16,
	INDEPENDENT: false,
	HAS_SKILL_POINTS: true,
	HAS_NO_SKILL_POINTS: false,
	CONTROLLERS: ['doNothing'],
	HAS_NO_MASTER: false,
	MOTION_TYPE: 'glide',
	FACING_TYPE: 'toTarget',
	DRAW_HEALTH: false,
	DRAW_SELF: true,
	DAMAGE_EFFECTS: true,
	RATEFFECTS: true,
	MOTION_EFFECTS: true,
	INTANGIBLE: false,
	ACCEPTS_SCORE: true,
	GIVE_KILL_MESSAGE: false,
	CAN_GO_OUTSIDE_ROOM: false,
	HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer, normal
	DIE_AT_LOW_SPEED: false,
	DIE_AT_RANGE: false,
	CLEAR_ON_MASTER_UPGRADE: false,
	PERSISTS_AFTER_DEATH: false,
	VARIES_IN_SIZE: false,
	HEALTH_WITH_LEVEL: true,
	CAN_BE_ON_LEADERBOARD: true,
	HAS_NO_RECOIL: false,
	AUTO_UPGRADE: 'none',
	BUFF_VS_FOOD: false,
	OBSTACLE: false,
	CRAVES_ATTENTION: false,
	NECRO: false,
	UPGRADES_TIER_1: [],
	UPGRADES_TIER_2: [],
	UPGRADES_TIER_3: [],
	SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	LEVEL: 0,
	SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
	GUNS: [],
	MAX_CHILDREN: 0,
	BODY: {
		ACCELERATION: 1,
		SPEED: 0,
		HEALTH: 1,
		RESIST: 1,
		SHIELD: 0,
		REGEN: 0,
		DAMAGE: 1,
		PENETRATION: 1,
		RANGE: 0,
		FOV: 1,
		DENSITY: 1,
		STEALTH: 1,
		PUSHABILITY: 1,
		HETERO: 2
	},
	FOOD: {
		LEVEL: -1
	},
	DIES_TO_TEAM_BASE: true,
	IGNORE_SHAPES: false,
	LAYER: -1,
	DONT_HIT_OBSTACLES: false,
	INVISIBLE: [0, 0, 1]
};
exports.food = {
	TYPE: 'food',
	DAMAGE_CLASS: 1,
	CONTROLLERS: ['moveInCircles'],
	HITS_OWN_TYPE: 'repel',
	MOTION_TYPE: 'drift',
	FACING_TYPE: 'turnWithSpeed',
	VARIES_IN_SIZE: true,
	BODY: {
		STEALTH: 30,
		PUSHABILITY: 1
	},
	DAMAGE_EFFECTS: false,
	RATEFFECTS: false,
	HEALTH_WITH_LEVEL: false,
	TURRETS: [],
	GUNS: [],
	CAN_BE_ON_LEADERBOARD: false
};
exports.octagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 5
	},
	LABEL: 'Octagon',
	VALUE: 25000,
	SHAPE: -8,
	SIZE: 70,
	COLOR: 28,
	BODY: {
		DAMAGE: 3.25,
		DENSITY: 85,
		HEALTH: 850,
		RESIST: Math.pow(1.25, 3),
		SHIELD: 110,
		REGEN: 0.5
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.hexagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 5,
	},
	LABEL: 'Hexagon',
	VALUE: 15000,
	SHAPE: -6,
	SIZE: 64,
	COLOR: 22,
	BODY: {
		DAMAGE: 2.5,
		DENSITY: 85,
		HEALTH: 350 * 2,
		RESIST: Math.pow(1.25, 3),
		SHIELD: 45 * 2,
		REGEN: 0.45
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.heptagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 5
	},
	LABEL: 'Heptagon',
	VALUE: 20000,
	SHAPE: -7,
	SIZE: 68,
	COLOR: 24,
	BODY: {
		DAMAGE: 3,
		DENSITY: 80,
		HEALTH: 400 * 2,
		RESIST: Math.pow(1.25, 3),
		SHIELD: 50 * 2,
		REGEN: 0.5
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.bigPentagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 4
	},
	LABEL: 'Beta Pentagon',
	VALUE: 2500,
	SHAPE: 5,
	SIZE: 30,
	COLOR: 14,
	BODY: {
		DAMAGE: 2,
		DENSITY: 30,
		HEALTH: 50 * 2,
		RESIST: Math.pow(1.25, 2),
		SHIELD: 20 * 2,
		REGEN: 0.2
	},
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true
};
exports.pentagon = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 3
	},
	LABEL: 'Pentagon',
	VALUE: 400,
	SHAPE: 5,
	SIZE: 16,
	COLOR: 14,
	BODY: {
		DAMAGE: 1.5,
		DENSITY: 8,
		HEALTH: 10 * 2,
		RESIST: 1.25,
		PENETRATION: 1.1
	},
	DRAW_HEALTH: true
};
exports.triangle = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 2
	},
	LABEL: 'Triangle',
	VALUE: 120,
	SHAPE: 3,
	SIZE: 9,
	COLOR: 2,
	BODY: {
		DAMAGE: 1,
		DENSITY: 6,
		HEALTH: 3 * 2,
		RESIST: 1.15,
		PENETRATION: 1.5
	},
	DRAW_HEALTH: true
};
exports.square = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 1
	},
	LABEL: 'Square',
	VALUE: 30,
	SHAPE: 4,
	SIZE: 10,
	COLOR: 13,
	BODY: {
		DAMAGE: 1,
		DENSITY: 4,
		HEALTH: 2,
		PENETRATION: 2
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false
};
exports.egg = {
	PARENT: [exports.food],
	FOOD: {
		LEVEL: 0
	},
	LABEL: 'Egg',
	VALUE: 10,
	SHAPE: 0,
	SIZE: 5,
	COLOR: 6,
	INTANGIBLE: true,
	BODY: {
		DAMAGE: 0,
		DENSITY: 2,
		HEALTH: 0.0011,
		PUSHABILITY: 0
	},
	DRAW_HEALTH: false
};
exports.greenpentagon = {
	PARENT: [exports.genericEntity],
	LABEL: 'Pentagon',
	VALUE: 3e4,
	SHAPE: 5,
	SIZE: 16,
	COLOR: 27,
	BODY: {
		DAMAGE: 3,
		DENSITY: 8,
		HEALTH: 200,
		RESIST: 1.25,
		PENETRATION: 1.1
	},
	DRAW_HEALTH: true
};
exports.greentriangle = {
	PARENT: [exports.genericEntity],
	LABEL: 'Triangle',
	VALUE: 7000,
	SHAPE: 3,
	SIZE: 9,
	COLOR: 27,
	BODY: {
		DAMAGE: 1,
		DENSITY: 6,
		HEALTH: 60,
		RESIST: 1.15,
		PENETRATION: 1.5
	},
	DRAW_HEALTH: true
};
exports.greensquare = {
	PARENT: [exports.genericEntity],
	LABEL: 'Square',
	VALUE: 2000,
	SHAPE: 4,
	SIZE: 10,
	COLOR: 27,
	BODY: {
		DAMAGE: 0.5,
		DENSITY: 4,
		HEALTH: 20,
		PENETRATION: 2
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false
};
exports.gem = {
	PARENT: [exports.food],
	LABEL: 'Gem',
	VALUE: 2000,
	SHAPE: 6,
	SIZE: 5,
	COLOR: 0,
	BODY: {
		DAMAGE: 0.25,
		DENSITY: 4,
		HEALTH: 10,
		PENETRATION: 2,
		RESIST: 2,
		PUSHABILITY: 0.25
	},
	DRAW_HEALTH: true,
	INTANGIBLE: false
};
exports.obstacle = {
	TYPE: 'wall',
	DAMAGE_CLASS: 1,
	LABEL: 'Obstacle',
	FACING_TYPE: 'turnWithSpeed',
	SHAPE: -9,
	BODY: {
		PUSHABILITY: 0,
		HEALTH: 1e4,
		SHIELD: 1e4,
		REGEN: 1000,
		DAMAGE: 1,
		RESIST: 100,
		STEALTH: 1
	},
	VALUE: 0,
	SIZE: 60,
	COLOR: 16,
	VARIES_IN_SIZE: true,
	GIVE_KILL_MESSAGE: true,
	ACCEPTS_SCORE: false,
	GUNS: [],
	TURRETS: []
};
exports.babyObstacle = {
	PARENT: [exports.obstacle],
	SIZE: 25,
	SHAPE: -7,
	LABEL: 'Obstacle'
};

const baseHealthFactor = 0.5;
const baseDamageFactor = 1.5;

exports.bullet = {
	LABEL: 'Bullet',
	TYPE: 'bullet',
	ACCEPTS_SCORE: false,
	BODY: {
		PENETRATION: 1,
		SPEED: 3.75,
		RANGE: 90,
		DENSITY: 1.25,
		HEALTH: 0.33 * baseHealthFactor,
		DAMAGE: 4 * baseDamageFactor,
		PUSHABILITY: 0.3
	},
	FACING_TYPE: 'smoothWithMotion',
	CAN_GO_OUTSIDE_ROOM: true,
	HITS_OWN_TYPE: 'never',
	DIE_AT_RANGE: true,
	GUNS: [],
	TURRETS: []
};
exports.casing = {
	PARENT: [exports.bullet],
	LABEL: 'Shell',
	TYPE: 'swarm'
};
exports.swarm = {
	LABEL: 'Swarm Drone',
	TYPE: 'swarm',
	ACCEPTS_SCORE: false,
	SHAPE: 3,
	MOTION_TYPE: 'swarm',
	FACING_TYPE: 'smoothWithMotion',
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	CRAVES_ATTENTION: true,
	BODY: {
		ACCELERATION: 3,
		PENETRATION: 1.5,
		HEALTH: 0.35 * baseHealthFactor,
		DAMAGE: 1.5 * baseDamageFactor,
		SPEED: 4.5,
		RESIST: 1.6,
		RANGE: 225,
		DENSITY: 12,
		PUSHABILITY: 0.5,
		FOV: 1.5
	},
	DIE_AT_RANGE: true,
	BUFF_VS_FOOD: true
};
exports.bee = {
	PARENT: [exports.swarm],
	PERSISTS_AFTER_DEATH: true,
	SHAPE: 4,
	LABEL: 'Drone',
	HITS_OWN_TYPE: 'hardWithBuffer'
};
exports.autoswarm = {
	PARENT: [exports.swarm],
	AI: {
		FARMER: true
	},
	INDEPENDENT: true
};
exports.trap = {
	LABEL: 'Trap',
	TYPE: 'trap',
	ACCEPTS_SCORE: false,
	SHAPE: -3,
	MOTION_TYPE: 'glide',
	FACING_TYPE: 'turnWithSpeed',
	HITS_OWN_TYPE: 'push',
	DIE_AT_RANGE: true,
	BODY: {
		HEALTH: 0.5,
		DAMAGE: 3,
		RANGE: 450,
		DENSITY: 2.5,
		RESIST: 2.5,
		SPEED: 0
	}
};
exports.block = {
	LABEL: 'Trap',
	PARENT: [exports.trap],
	SHAPE: -4,
	MOTION_TYPE: 'motor',
	CONTROLLERS: ['goToMasterTarget'],
	BODY: {
		SPEED: 1,
		DENSITY: 5
	}
};
exports.boomerang = {
	LABEL: 'Boomerang',
	PARENT: [exports.trap],
	CONTROLLERS: ['boomerang'],
	MOTION_TYPE: 'motor',
	HITS_OWN_TYPE: 'never',
	SHAPE: -5,
	BODY: {
		SPEED: 1.25,
		RANGE: 120
	}
};
exports.droneAI = {
	LABEL: 'Drone',
	TYPE: 'drone',
	ACCEPTS_SCORE: false,
	DANGER: 2,
	CONTROL_RANGE: 0,
	MOTION_TYPE: 'chase',
	FACING_TYPE: 'smoothToTarget',
	CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster'],
	AI: {
		BLIND: true
	},
	BODY: {
		PENETRATION: 1.2,
		PUSHABILITY: 0.6,
		ACCELERATION: 0.05,
		HEALTH: 0.6 * baseHealthFactor,
		DAMAGE: 2.25 * baseDamageFactor,
		SPEED: 3.8,
		RANGE: 200,
		DENSITY: 0.03,
		RESIST: 1.5,
		FOV: 0.8
	},
	HITS_OWN_TYPE: 'hard',
	DRAW_HEALTH: false,
	CLEAR_ON_MASTER_UPGRADE: true,
	BUFF_VS_FOOD: true,
	GUNS: [],
	TURRETS: []
};
exports.drone = {
	PARENT: [exports.droneAI],
	SHAPE: 3
};
exports.autoTurret = {
	LABEL: '',
	BODY: {
		FOV: 0.75
	},
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.more_recoil, g.auto_turret]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoDrone = makeAuto(exports.drone);
/*exports.driverdrone = {
	PARENT: [exports.droneAI],
	LABEL: '',
	SHAPE: 3,
	BODY: {
		FOV: 2,
		SPEED: 0.9
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [16, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 14, 1.8, 16, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.half_reload]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true
		}
	}],
	HAS_NO_RECOIL: true
};*/
exports.obstacleDrone = {
	PARENT: [exports.droneAI],
	LABEL: 'Rock',
	TYPE: 'wall',
	SHAPE: -9,
	FACING_TYPE: 'turnWithSpeed',
	COLOR: 16,
	GUNS: [],
	TURRETS: []
};
exports.mothership_drone = {
	PARENT: [exports.drone],
	BODY: {
		PENETRATION: 1.25,
		PUSHABILITY: 0.5,
		ACCELERATION: 0.03,
		HEALTH: 1,
		DAMAGE: 3.5,
		SPEED: 3.95,
		RANGE: 100,
		RESIST: 1.25,
		FOV: 0.75,
		DENSITY: 0.05
	}
};
exports.protector = {
	LABEL: 'Drone',
	TYPE: 'drone',
	ACCEPTS_SCORE: false,
	CAN_BE_ON_LEADERBOARD: false,
	CONTROL_RANGE: 0.5,
	SHAPE: 3,
	SIZE: 5,
	MAX_CHILDREN: 30,
	MOTION_TYPE: 'chase',
	FACING_TYPE: 'smoothToTarget',
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'hangOutNearMaster'],
	AI: {
		BLIND: true
	},
	BODY: {
		PENETRATION: 50.5,
		PUSHABILITY: 0.6,
		ACCELERATION: 0.05,
		HEALTH: 8000 * baseHealthFactor,
		DAMAGE: 7.00 * baseDamageFactor,
		SPEED: 10.8,
		RANGE: 200,
		DENSITY: 0.03,
		RESIST: 3.5,
		FOV: 0.8
	},
	HITS_OWN_TYPE: 'hard',
	DRAW_HEALTH: false,
	CLEAR_ON_MASTER_UPGRADE: true,
	BUFF_VS_FOOD: true
};
exports.sunchip = {
	PARENT: [exports.drone],
	SHAPE: 4,
	NECRO: true,
	HITS_OWN_TYPE: 'hard',
	BODY: {
		FOV: 0.5
	},
	AI: {
		BLIND: true,
		FARMER: true
	},
	DRAW_HEALTH: false
};
exports.gunchip = {
	PARENT: [exports.drone],
	SHAPE: -2,
	NECRO: true,
	HITS_OWN_TYPE: 'hard',
	BODY: {
		FOV: 0.5
	},
	AI: {
		BLIND: true,
		FARMER: true
	},
	DRAW_HEALTH: false
};
exports.missile = {
	PARENT: [exports.bullet],
	LABEL: 'Missile',
	INDEPENDENT: true,
	BODY: {
		RANGE: 120
	},
	GUNS: [{
		POSITION: [14, 6, 1, 0, -2, 130, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}, {
		POSITION: [14, 6, 1, 0, 2, 230, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}]
};
exports.hypermissile = {
	PARENT: [exports.missile],
	GUNS: [{
		POSITION: [14, 6, 1, 0, -2, 150, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}, {
		POSITION: [14, 6, 1, 0, 2, 210, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}, {
		POSITION: [14, 6, 1, 0, -2, 90, 0.5],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}]
		}
	}, {
		POSITION: [14, 6, 1, 0, 2, 270, 0.5],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.more_recoil, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}]
		}
	}]
};
exports.hypermissile2 = {
	PARENT: [exports.missile],
	BODY: {
		RANGE: 140
	},
	GUNS: [{
		POSITION: [14, 7, 1.25, 0, -2, 150, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.lots_more_recoil, g.more_speed, g.more_reload]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}, {
		POSITION: [14, 7, 1.25, 0, 2, 210, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.lots_more_recoil, g.more_speed, g.more_reload]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}]
};
exports.hive = {
	PARENT: [exports.bullet],
	LABEL: 'Hive',
	BODY: {
		RANGE: 90,
		FOV: 0.5
	},
	FACING_TYPE: 'turnWithSpeed',
	INDEPENDENT: true,
	CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf'],
	AI: {
		NO_LEAD: true
	},
	GUNS: [{
		POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
			TYPE: exports.bee,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};

const base = {
	ACCEL: 1.6,
	SPEED: 5.25,
	HEALTH: 20,
	DAMAGE: 3,
	RESIST: 1,
	PENETRATION: 1.05,
	SHIELD: 8,
	REGEN: 0.025,
	DENSITY: 0.5
};

exports.genericTank = {
	LABEL: 'Unknown Class',
	TYPE: 'tank',
	DAMAGE_CLASS: 2,
	DANGER: 5,
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'toTarget',
	SIZE: 12,
	MAX_CHILDREN: 0,
	DAMAGE_EFFECTS: false,
	BODY: {
		ACCELERATION: 1.6,
		SPEED: 5.25,
		HEALTH: 20,
		DAMAGE: 3,
		PENETRATION: 1.05,
		SHIELD: 8,
		REGEN: 0.025,
		FOV: 1,
		DENSITY: 0.5,
		PUSHABILITY: 0.9,
		HETERO: 3
	},
	GUNS: [],
	TURRETS: [],
	GIVE_KILL_MESSAGE: true,
	DRAW_HEALTH: true,
	HAS_SKILL_POINTS: true,
	COLOR_OVERRIDE: -1,
	HAS_NO_SKILL_POINTS: false,
	IGNORE_SHAPES: false,
	LAYER: -1,
	DONT_HIT_OBSTACLES: false,
	INVISIBLE: [0, 0, 1],
	IS_TELEPORTER: false,
	ALPHA: 1
};
exports.defenderAutoGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [24, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.defend_five]),
			TYPE: exports.bullet
		}
	}]
};
exports.auto3gun = {
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
			TYPE: exports.bullet
		}
	}]
};
exports.machine3gun = {
	PARENT: [exports.genericTank],
	LABEL: 'Turret',
	COLOR: 16,
	BODY: {
		FOV: 5
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	GUNS: [{
		POSITION: [14, 11, 1.3, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.more_recoil, g.turret, g.mach, g.slow, g.smaller]),
			TYPE: exports.bullet
		}
	}]
};
exports.trishot3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	GUNS: [{
		POSITION: [19, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.auto5gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [24, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
			TYPE: exports.bullet
		}
	}]
};
exports.heavy3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2,
		SPEED: 0.9
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
			TYPE: exports.bullet
		}
	}]
};
exports.trap_turret = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2,
		SPEED: 0.9
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [16, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 14, 1.8, 16, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.half_reload]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true
		}
	}],
	HAS_NO_RECOIL: true
};
exports.sentry_turret = {
	PARENT: [exports.heavy3gun],
	HAS_NO_RECOIL: true
};
exports.superHeavyGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [4.5, 14, 1, 10, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.super_auto]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [11, 14, -1.35, 0, 0, 0, 0]
	}]
};
exports.superHeavyMach = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [14.25, 5, 1, 3, -3.25, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_mach]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14.25, 5, 1, 3, 3.25, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_mach]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15.85, 5, 1, 3, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_mach]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12.25, 14, -1.35, 0, 0, 0, 0]
	}]
};
exports.octo_trap_turret = {
	PARENT: [exports.genericTank],
	LABEL: 'Turret',
	BODY: {
		FOV: 0.5
	},
	INDEPENDENT: true,
	CONTROLLERS: ['nearestDifferentMaster'],
	COLOR: 16,
	AI: {
		SKYNET: true,
		FULL_VIEW: true
	},
	GUNS: [{
		POSITION: [16, 9, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 9, 1.8, 16, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.half_reload, g.octogeddon]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true
		}
	}],
	HAS_NO_RECOIL: true
};
exports.penta_trap = {
	LABEL: 'Thrown Trap',
	TYPE: 'trap',
	ACCEPTS_SCORE: false,
	SHAPE: -5,
	MOTION_TYPE: 'glide',
	FACING_TYPE: 'turnWithSpeed',
	HITS_OWN_TYPE: 'push',
	DIE_AT_RANGE: true,
	BODY: {
		HEALTH: 1 * baseHealthFactor,
		DAMAGE: 2 * baseDamageFactor,
		RANGE: 450,
		DENSITY: 2.5,
		RESIST: 2.5,
		SPEED: 0
	}
};
exports.levi_gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.levi_five]),
			TYPE: exports.bullet
		}
	}]
};
exports.masterGun = {
	PARENT: [exports.genericTank],
	LABEL: 'Master Turret',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['nearestDifferentMaster'],
	COLOR: 16,
	MAX_CHILDREN: 3,
	AI: {
		NO_LEAD: true,
		SKYNET: true,
		FULL_VIEW: true
	},
	GUNS: [{
		POSITION: [8, 14, 1.3, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.master]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.sniper3gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 5
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [27, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.auto_snipe]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 9, -1.5, 8, 0, 0, 0]
	}]
};
exports.bansheegun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	INDEPENDENT: true,
	GUNS: [{
		POSITION: [26, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.less_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.auto4gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [16, 4, 1, 0, -3.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
			TYPE: exports.bullet
		}
	}]
};
exports.bigAuto3Gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [14, 5, 1, 0, -4.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 5, 1, 0, 4.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.tritrapgun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	GUNS: [{
		POSITION: [20, 16, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 16, 1.1, 20, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
			TYPE: exports.block
		}
	}]
};
exports.smasherBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: 6,
	INDEPENDENT: true
};
exports.CubyBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: 4,
	INDEPENDENT: true
};
exports.teleporterBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: 8,
	INDEPENDENT: true
};
exports.spikeBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: -4,
	INDEPENDENT: true
};
exports.megaSmashBody = {
	LABEL: '',
	CONTROLLERS: ['spin'],
	COLOR: 9,
	SHAPE: -6,
	INDEPENDENT: true
};
exports.dominationBody = {
	LABEL: '',
	CONTROLLERS: ['dontTurn'],
	COLOR: 9,
	SHAPE: 6,
	INDEPENDENT: true
};
exports.demolishBody = {
	LABEL: '',
	COLOR: 9,
	SHAPE: 6
};
exports.baseSwarmTurret = {
	PARENT: [exports.genericTank],
	LABEL: 'Base Protector',
	COLOR: 16,
	IGNORE_SHAPES: true,
	BODY: {
		FOV: 0.75
	},
	CONTROLLERS: ['nearestDifferentMaster'],
	AI: {
		NO_LEAD: true,
		LIKES_SHAPES: false
	},
	INDEPENDENT: true,
	GUNS: [{
		POSITION: [5, 4.5, 0.6, 7, 2, 0, 0.15],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.protector_swarm]),
			TYPE: [exports.swarm, {
				INDEPENDENT: true,
				IGNORE_SHAPES: true,
				HITS_OWN_TYPE: 'never'
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [5, 4.5, 0.6, 7, -2, 0, 0.15],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.protector_swarm]),
			TYPE: [exports.swarm, {
				INDEPENDENT: true,
				IGNORE_SHAPES: true,
				HITS_OWN_TYPE: 'never'
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [5, 4.5, 0.6, 7.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.protector_swarm]),
			TYPE: [exports.swarm, {
				INDEPENDENT: true,
				IGNORE_SHAPES: true,
				HITS_OWN_TYPE: 'never'
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.baseGunTurret = {
	PARENT: [exports.genericTank],
	LABEL: 'Base Protector',
	BODY: {
		FOV: 5
	},
	ACCEPTS_SCORE: false,
	CONTROLLERS: ['nearestDifferentMaster'],
	INDEPENDENT: true,
	COLOR: 16,
	GUNS: [{
		POSITION: [12, 12, 1, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [11, 13, 1, 6, 0, 0, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [7, 13, -1.3, 6, 0, 0, 0]
	}]
};
exports.baseProtector = {
	PARENT: [exports.genericTank],
	LABEL: 'Base Protector',
	TYPE: 'wall',
	HITS_OWN_TYPE: 'hard',
	SIZE: 70,
	DAMAGE_CLASS: 0,
	MAX_CHILDREN: 30,
	ACCEPTS_SCORE: false,
	CAN_BE_ON_LEADERBOARD: false,
	SKILL: skillSet({
		rld: 1,
		dam: 1,
		pen: 1,
		spd: 1,
		str: 1
	}),
	BODY: {
		SPEED: 0,
		HEALTH: 1e4,
		DAMAGE: 10,
		PENETRATION: 0.25,
		SHIELD: 10000,
		REGEN: 500,
		FOV: 1,
		PUSHABILITY: 0,
		HETERO: 0
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [25, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody
	}, {
		POSITION: [12, 7, 0, 45, 100, 0],
		TYPE: exports.baseSwarmTurret
	}, {
		POSITION: [12, 7, 0, 135, 100, 0],
		TYPE: exports.baseSwarmTurret
	}, {
		POSITION: [12, 7, 0, 225, 100, 0],
		TYPE: exports.baseSwarmTurret
	}, {
		POSITION: [12, 7, 0, 315, 100, 0],
		TYPE: exports.baseSwarmTurret
	}],
	GUNS: [{
		POSITION: [4.5, 11.5, -1.3, 6, 0, 45, 0]
	}, {
		POSITION: [4.5, 11.5, -1.3, 6, 0, 135, 0]
	}, {
		POSITION: [4.5, 11.5, -1.3, 6, 0, 225, 0]
	}, {
		POSITION: [4.5, 11.5, -1.3, 6, 0, 315, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 45, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 135, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 225, 0]
	}, {
		POSITION: [4.5, 8.5, -1.5, 7, 0, 315, 0]
	}]
};
exports.minion = {
	PARENT: [exports.genericTank],
	LABEL: 'Minion',
	TYPE: 'minion',
	DAMAGE_CLASS: 0,
	HITS_OWN_TYPE: 'hardWithBuffer',
	FACING_TYPE: 'smoothToTarget',
	BODY: {
		FOV: 0.5,
		SPEED: 3,
		ACCELERATION: 0.4,
		HEALTH: 5,
		SHIELD: 0,
		DAMAGE: 1.2,
		RESIST: 1,
		PENETRATION: 1,
		DENSITY: 0.4,
		RANGE: 200
	},
	AI: {
		BLIND: true
	},
	DRAW_HEALTH: false,
	CLEAR_ON_MASTER_UPGRADE: true,
	GIVE_KILL_MESSAGE: false,
	CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
	GUNS: [{
		POSITION: [17, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
			WAIT_TO_CYCLE: true,
			TYPE: exports.bullet
		}
	}]
};
exports.demolishMinion = {
	PARENT: [exports.minion],
	GUNS: [{
		POSITION: [17, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dem_minion]),
			WAIT_TO_CYCLE: true,
			TYPE: exports.bullet
		}
	}]
};
exports.demolishFactory = {
	PARENT: [exports.genericTank],
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['nearestDifferentMaster'],
	COLOR: 16,
	MAX_CHILDREN: 4,
	AI: {
		NO_LEAD: true,
		SKYNET: true,
		FULL_VIEW: true
	},
	GUNS: [{
		POSITION: [2, 12.65, 1.1, 11.25, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.dem_factory]),
			TYPE: exports.demolishMinion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}]
};
exports.demolishProp = {
	GUNS: [{
		POSITION: [17.5, 107.5, 1.4, 86.5, -80, -60, 0]
	}]
};
exports.pillboxTurret = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	BODY: {
		FOV: 2
	},
	HAS_NO_RECOIL: true,
	GUNS: [{
		POSITION: [22, 11, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.not_dense]),
			TYPE: exports.bullet
		}
	}]
};
exports.pillbox = {
	LABEL: 'Engineer Trap',
	PARENT: [exports.trap],
	SHAPE: -4,
	MOTION_TYPE: 'motor',
	CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
	INDEPENDENT: true,
	BODY: {
		SPEED: 1,
		DENSITY: 5
	},
	DIE_AT_RANGE: true,
	TURRETS: [{
		POSITION: [11, 0, 0, 0, 360, 1],
		TYPE: exports.pillboxTurret
	}]
};
exports.skimturret = {
	PARENT: [exports.genericTank],
	BODY: {
		FOV: 2
	},
	COLOR: 16,
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	LABEL: '',
	GUNS: [{
		POSITION: [10, 14, -0.5, 9, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
			TYPE: exports.hypermissile
		}
	}, {
		POSITION: [17, 15, 1, 0, 0, 0, 0]
	}]
};
exports.skimboss = {
	PARENT: [exports.genericTank],
	BODY: {
		HEALTH: 300,
		DAMAGE: 2,
		SHIELD: 200
	},
	SHAPE: 3,
	COLOR: 2,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [15, 5, 0, 60, 170, 0],
		TYPE: exports.skimturret
	}, {
		POSITION: [15, 5, 0, 180, 170, 0],
		TYPE: exports.skimturret
	}, {
		POSITION: [15, 5, 0, 300, 170, 0],
		TYPE: exports.skimturret
	}]
};

function makeAuto(type, name = -1, options = {}) {
	let turret = {
		type: exports.autoTurret,
		size: 10,
		independent: true
	};
	if (options.type != null) turret.type = options.type;
	if (options.size != null) turret.size = options.size;
	if (options.independent != null) turret.independent = options.independent;
	let output = JSON.parse(JSON.stringify(type));
	let autogun = {
		POSITION: [turret.size, 0, 0, 180, 360, 1],
		TYPE: [turret.type, {
			CONTROLLERS: ['nearestDifferentMaster'],
			INDEPENDENT: turret.independent
		}]
	};
	if (type.GUNS != null) output.GUNS = type.GUNS;
	output.TURRETS = type.TURRETS == null ? [autogun] : [...type.TURRETS, autogun];
	output.LABEL = name == -1 ? 'Auto-' + type.LABEL : name;
	output.DANGER = type.DANGER + 1;
	return output;
}
function makeHybrid(type, name = -1) {
	let output = JSON.parse(JSON.stringify(type));
	let spawner = {
		POSITION: [7, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
			TYPE: [exports.drone, {
				INDEPENDENT: true
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 3
		}
	};
	if (type.TURRETS != null) output.TURRETS = type.TURRETS;
	output.GUNS = type.GUNS == null ? [spawner] : [...type.GUNS, spawner];
	output.LABEL = name == -1 ? 'Hybrid ' + type.LABEL : name;
	return output;
}

exports.basic = {
	PARENT: [exports.genericTank],
	LABEL: 'Basic',
	DANGER: 4,
	FACING_TYPE: 'locksFacing',
	LEVEL: -1,
	RESET_UPGRADES: true,
	SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic]),
			TYPE: exports.bullet,
			LABEL: '',
			STAT_CALCULATOR: 0,
			WAIT_TO_CYCLE: false,
			AUTOFIRE: false,
			SYNCS_SKILLS: false,
			MAX_CHILDREN: 0,
			ALT_FIRE: false,
			NEGATIVE_RECOIL: false
		}
	}],
	DAMAGE_CLASS: 2,
	CAN_BE_ON_LEADERBOARD: true,
	DIES_TO_TEAM_BASE: true,
	IS_SMASHER: false
};
exports.single = {
	PARENT: [exports.genericTank],
	LABEL: 'Single',
	GUNS: [{
		POSITION: [19, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.single]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
	}]
};
exports.smash = {
	PARENT: [exports.genericTank],
	LABEL: 'Smasher',
	DANGER: 6,
	BODY: {
		FOV: 1.05,
		DENSITY: base.DENSITY * 2,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925
	},
	TURRETS: [{
		POSITION: [21.5, 0, 0, 0, 360, 0],
		TYPE: exports.smasherBody
	}],
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher
};
exports.megaSmash = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega-Smasher',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 1.05,
		FOV: 1.1,
		DENSITY: base.DENSITY * 4,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925
	},
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher,
	TURRETS: [{
		POSITION: [24, 0, 0, 0, 360, 0],
		TYPE: exports.megaSmashBody
	}]
};
exports.spike = {
	PARENT: [exports.genericTank],
	LABEL: 'Spike',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.95,
		DAMAGE: base.DAMAGE * 1.1,
		FOV: 1.05,
		DENSITY: base.DENSITY * 2,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925
	},
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher,
	TURRETS: [{
		POSITION: [20.5, 0, 0, 0, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [20.5, 0, 0, 120, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [20.5, 0, 0, 240, 360, 0],
		TYPE: exports.spikeBody
	}]
};
exports.ball = {
	PARENT: [exports.genericTank],
	LABEL: 'Ball',
	DANGER: 7,
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher,
	BODY: {
		DAMAGE: base.DAMAGE * 10,
		FOV: 1.05,
		DENSITY: base.DENSITY * 2,
		SPEED: base.SPEED * 1.25,
		HEALTH: base.HEALTH * 7.5
	}
};
exports.autoSmash = makeAuto(exports.smash, 'Auto Smasher', {
	size: 11
});
exports.autoSmash.SKILL_CAP = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
exports.twin = {
	PARENT: [exports.genericTank],
	LABEL: 'Twin',
	GUNS: [{
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			TYPE: exports.bullet
		}
	}]
};
exports.gunner = {
	PARENT: [exports.genericTank],
	LABEL: 'Gunner',
	DANGER: 6,
	GUNS: [{
		POSITION: [12, 3.5, 1, 0, 7.25, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 3.5, 1, 0, -7.25, 0, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 3.5, 1, 0, 3.75, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast]),
			TYPE: exports.bullet
		}
	}]
};
exports.machinegunner = {
	PARENT: [exports.genericTank],
	LABEL: 'Machine Gunner',
	DANGER: 6,
	BODY: {
		SPEED: base.SPEED * 0.9
	},
	GUNS: [{
		POSITION: [14, 3, 4.0, -3, 5, 0, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, -3, -5, 0, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, 0, 2.5, 0, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, 0, -2.5, 0, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 3, 4.0, 3, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.machgun]),
			TYPE: exports.bullet
		}
	}]
};
exports.autogunner = makeAuto(exports.gunner);
exports.nailgun = {
	PARENT: [exports.genericTank],
	LABEL: 'Nailgun',
	DANGER: 7,
	BODY: {
		FOV: 1.1,
		SPEED: base.SPEED * 0.9
	},
	GUNS: [{
		POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 2, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
	}]
};
exports.double = {
	PARENT: [exports.genericTank],
	LABEL: 'Flank Twin',
	DANGER: 6,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
			TYPE: exports.bullet
		}
	}]
};
exports.tripletwin = {
	PARENT: [exports.genericTank],
	LABEL: 'Triple Twin',
	DANGER: 7,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 120, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 240, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoDouble = makeAuto(exports.double, 'Auto-Double');
exports.split = {
	PARENT: [exports.genericTank],
	LABEL: 'Hewn Double',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, 5.5, 25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, -5.5, -25, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 5.5, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, -5.5, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
			TYPE: exports.bullet
		}
	}]
};
exports.bent = {
	PARENT: [exports.genericTank],
	LABEL: 'Triple Shot',
	DANGER: 6,
	BODY: {
		SPEED: base.SPEED * 0.9
	},
	GUNS: [{
		POSITION: [19, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}]
};
exports.bentDouble = {
	PARENT: [exports.genericTank],
	LABEL: 'Bent Double',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, -1, -25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 1, 25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, -1, 155, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 1, -155, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
			TYPE: exports.bullet
		}
	}]
};
exports.penta = {
	PARENT: [exports.genericTank],
	LABEL: 'Penta Shot',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.85
	},
	GUNS: [{
		POSITION: [16, 8, 1, 0, -3, -30, 0.667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8, 1, 0, 3, 30, 0.667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, -2, -15, 0.333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 15, 0.333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}]
};
exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');
exports.triple = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	BODY: {
		FOV: 1.05
	},
	LABEL: 'Triplet',
	GUNS: [{
		POSITION: [18, 10, 1, 0, 5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 10, 1, 0, -5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
			TYPE: exports.bullet
		}
	}]
};
exports.quint = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	BODY: {
		FOV: 1.1
	},
	LABEL: 'Quintuplet',
	GUNS: [{
		POSITION: [16, 10, 1, 0, -5, 0, 0.667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 10, 1, 0, 5, 0, 0.667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 10, 1, 0, -3, 0, 0.333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 10, 1, 0, 3, 0, 0.333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
			TYPE: exports.bullet
		}
	}]
};
exports.dual = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	BODY: {
		ACCEL: base.ACCEL * 0.8,
		FOV: 1.1
	},
	LABEL: 'Dual',
	GUNS: [{
		POSITION: [18, 7, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.low_power]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 7, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.low_power]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8.5, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8.5, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
			TYPE: exports.bullet
		}
	}]
};
exports.sniper = {
	PARENT: [exports.genericTank],
	LABEL: 'Sniper',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [24, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
			TYPE: exports.bullet
		}
	}]
};
exports.rifle = {
	PARENT: [exports.genericTank],
	LABEL: 'Rifle',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.225
	},
	GUNS: [{
		POSITION: [24, 6.85, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 6.85, -1.6, 8, 0, 0, 0]
	}]
};
exports.assassin = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	LABEL: 'Assassin',
	BODY: {
		ACCELERATION: base.ACCEL * 0.7,
		SPEED: base.SPEED * 0.85,
		FOV: 1.4
	},
	GUNS: [{
		POSITION: [27, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}]
};
exports.ranger = {
	PARENT: [exports.genericTank],
	LABEL: 'Ranger',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.65,
		SPEED: base.SPEED * 0.85,
		FOV: 1.5
	},
	GUNS: [{
		POSITION: [32, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}]
};
exports.autoAssassin = makeAuto(exports.assassin, 'Auto Assassin');
exports.hunter = {
	PARENT: [exports.genericTank],
	LABEL: 'Hunter',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.25
	},
	GUNS: [{
		POSITION: [24, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 12, 1, 0, 0, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
			TYPE: exports.bullet
		}
	}]
};
exports.predator = {
	PARENT: [exports.genericTank],
	LABEL: 'Predator',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.3
	},
	GUNS: [{
		POSITION: [24, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 12, 1, 0, 0, 0, 0.15],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 16, 1, 0, 0, 0, 0.3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
			TYPE: exports.bullet
		}
	}]
};
exports.poach = makeHybrid(exports.hunter, 'Poacher');
exports.rocket = {
	PARENT: [exports.bullet],
	LABEL: 'Rocket',
	INDEPENDENT: true,
	BODY: {
		RANGE: 120
	},
	GUNS: [{
		POSITION: [6, 10.5, 1.5, 9, 0, 180, 7.5],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.rocket]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}]
};
exports.rocketeer = {
	PARENT: [exports.genericTank],
	LABEL: 'Rocketeer',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.65,
		SPEED: base.SPEED * 0.75,
		FOV: 1.25
	},
	GUNS: [{
		POSITION: [10, 12.5, -0.5, 9.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.rocketr]),
			TYPE: exports.rocket,
			STAT_CALCULATOR: gunCalcNames.sustained
		}
	}, {
		POSITION: [16.5, 11.5, -1.5, 0, 0, 0, 0]
	}]
};
/*exports.sidewind = {
	PARENT: [exports.genericTank],
	LABEL: 'Sidewinder',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.25
	},
	GUNS: [{
		POSITION: [6, 11, -0.5, 14, 0, 0, 0]
	}, {
		POSITION: [17.5, 12, -1.1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
			TYPE: exports.snake,
			STAT_CALCULATOR: gunCalcNames.sustained
		}
	}]
};*/
exports.director = {
	PARENT: [exports.genericTank],
	LABEL: 'Director',
	STAT_NAMES: statNames.drone,
	DANGER: 5,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.1
	},
	MAX_CHILDREN: 5,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.overseer = {
	PARENT: [exports.genericTank],
	LABEL: 'Overseer',
	DANGER: 6,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.1
	},
	MAX_CHILDREN: 8,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}]
};
exports.overlord = {
	PARENT: [exports.genericTank],
	LABEL: 'Overlord',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.1
	},
	MAX_CHILDREN: 8,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}]
};
exports.master = {
	PARENT: [exports.genericTank],
	LABEL: 'Master',
	STAT_NAMES: statNames.drone,
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.1
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [16, 1, 0, 0, 0, 0],
		TYPE: exports.masterGun
	}, {
		POSITION: [16, 1, 0, 120, 0, 0],
		TYPE: exports.masterGun
	}, {
		POSITION: [16, 1, 0, 240, 0, 0],
		TYPE: exports.masterGun
	}]
};
exports.overtrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Overtrapper',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		ACCELERATION: base.ACCEL * 0.6,
		SPEED: base.SPEED * 0.8,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [6, 11, 1.2, 8, 0, 125, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 235, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [14, 8, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 8, 1.5, 14, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.banshee = {
	PARENT: [exports.genericTank],
	LABEL: 'Banshee',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: 1.1
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [10, 8, 0, 0, 80, 0],
		TYPE: exports.bansheegun
	}, {
		POSITION: [10, 8, 0, 120, 80, 0],
		TYPE: exports.bansheegun
	}, {
		POSITION: [10, 8, 0, 240, 80, 0],
		TYPE: exports.bansheegun
	}],
	GUNS: [{
		POSITION: [6, 11, 1.2, 8, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}]
};
exports.autoOverseer = makeAuto(exports.overseer, 'Auto-Overseer');
exports.overgunner = {
	PARENT: [exports.genericTank],
	LABEL: 'Overgunner',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		ACCELERATION: base.ACCEL * 0.8,
		SPEED: base.SPEED * 0.8,
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [6, 11, 1.2, 8, 0, 125, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 235, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [19, 2, 1, 0, -2.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lots_more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lots_more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 11, 1, 0, 0, 0, 0]
	}]
};
exports.cruiser = {
	PARENT: [exports.genericTank],
	LABEL: 'Cruiser',
	DANGER: 6,
	FACING_TYPE: 'locksFacing',
	STAT_NAMES: statNames.swarm,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.autoCruiser = makeAuto(exports.cruiser, 'Auto Cruiser');
exports.flankCruiser = {
	PARENT: [exports.genericTank],
	LABEL: 'Flank Cruiser',
	DANGER: 6,
	FACING_TYPE: 'locksFacing',
	STAT_NAMES: statNames.swarm,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 4, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic]),
			TYPE: exports.bullet
		}
	}]
};
exports.battleship = {
	PARENT: [exports.genericTank],
	LABEL: 'Battleship',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	FACING_TYPE: 'locksFacing',
	BODY: {
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
			TYPE: exports.autoswarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.autoswarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.carrier = {
	PARENT: [exports.genericTank],
	LABEL: 'Carrier',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	FACING_TYPE: 'locksFacing',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 2, 40, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -2, -40, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.fortress = {
	PARENT: [exports.genericTank],
	LABEL: 'Fortress',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		SPEED: base.SPEED * 0.8,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 120, 1 / 3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 240, 2 / 3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [14, 9, 1, 0, 0, 60, 0]
	}, {
		POSITION: [4, 9, 1.5, 14, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.half_range, g.slow]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [14, 9, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 9, 1.5, 14, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.half_range, g.slow]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [14, 9, 1, 0, 0, 300, 0]
	}, {
		POSITION: [4, 9, 1.5, 14, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.half_range, g.slow]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.underseer = {
	PARENT: [exports.genericTank],
	LABEL: 'Underseer',
	DANGER: 6,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.1
	},
	SHAPE: 4,
	MAX_CHILDREN: 14,
	GUNS: [{
		POSITION: [5, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}]
};
exports.autoUnderseer = makeAuto(exports.underseer, 'Auto Underseer');
exports.necromancer = {
	PARENT: [exports.genericTank],
	LABEL: 'Necromancer',
	DANGER: 7,
	STAT_NAMES: statNames.necro,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	SHAPE: 4,
	FACING_TYPE: 'autospin',
	MAX_CHILDREN: 14,
	GUNS: [{
		POSITION: [5, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.double_reload]),
			TYPE: exports.sunship,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			MAX_CHILDREN: 4,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [5, 12, 1.2, 8, 0, 180, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.double_reload]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			MAX_CHILDREN: 4,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}]
};
exports.factory = {
	PARENT: [exports.genericTank],
	LABEL: 'Factory',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: 1.1,
	},
	MAX_CHILDREN: 6,
	GUNS: [{
		POSITION: [5, 11, 1, 10.5, 0, 0, 0]
	}, {
		POSITION: [2, 14, 1, 15.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory]),
			TYPE: exports.minion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [4, 14, 1, 8, 0, 0, 0]
	}]
};
exports.machine = {
	PARENT: [exports.genericTank],
	LABEL: 'Machine Gun',
	DANGER: 6,
	GUNS: [{
		POSITION: [12, 10, 1.4, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoMachine = makeAuto(exports.machine, 'Machine-Auto');
exports.spray = {
	PARENT: [exports.genericTank],
	LABEL: 'Sprayer',
	DANGER: 7,
	GUNS: [{
		POSITION: [23, 7, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.low_power, g.mach, g.more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [12, 10, 1.4, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
			TYPE: exports.bullet
		}
	}]
};
exports.mini = {
	PARENT: [exports.genericTank],
	LABEL: 'Minigun',
	DANGER: 6,
	BODY: {
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [22, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 8, 1, 0, 0, 0, 0.333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 0, 0.667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoMini = makeAuto(exports.mini, 'Auto Minigun');
exports.stream = {
	PARENT: [exports.genericTank],
	LABEL: 'Streamliner',
	DANGER: 7,
	BODY: {
		FOV: 1.3
	},
	GUNS: [{
		POSITION: [25, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [23, 8, 1, 0, 0, 0, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 8, 1, 0, 0, 0, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 0, 0, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 8, 1, 0, 0, 0, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}]
};
exports.hybridMini = makeHybrid(exports.mini, 'Hybrid-Minigun');
exports.minitrap = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	LABEL: 'Minigun Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [24, 8, 1, 0, 0, 0, 0],
	}, {
		POSITION: [4, 8, 1.3, 22, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.half_range]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [4, 8, 1.3, 18, 0, 0, 0.3333],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.half_range]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [4, 8, 1.3, 14, 0, 0, 0.6667],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.half_range]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.destroy = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75
	},
	LABEL: 'Destroyer',
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoDestroy = makeAuto(exports.destroy, 'Auto Destroyer');
exports.annihilator = {
	PARENT: [exports.genericTank],
	BODY: {
		ACCELERATION: 1.2,
		SPEED: base.SPEED * 0.85
	},
	LABEL: 'Annihilator',
	DANGER: 7,
	GUNS: [{
		POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
			TYPE: exports.bullet
		}
	}]
};
exports.hiveShooter = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85
	},
	LABEL: 'Hive Shooter',
	GUNS: [{
		POSITION: [14, 14, -1.2, 5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
			TYPE: exports.hive
		}
	}, {
		POSITION: [15, 12, 1, 5, 0, 0, 0]
	}]
};
exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
exports.shotgun2 = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Shotgun',
	BODY: {
		ACCELERATION: base.ACCEL * 0.7
	},
	GUNS: [{
		POSITION: [4, 3, 1, 11, -3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 3, 1, 11, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 4, 1, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 4, 1, 12, -1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 4, 1, 11, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 3, 1, 13, -1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 3, 1, 13, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 2, 1, 13, 2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 2, 1, 13, -2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [15, 14, 1, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [8, 14, -1.3, 4, 0, 0, 0]
	}]
};
exports.builder = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	LABEL: 'Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.9,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [18, 12, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 12, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block
		}
	}]
};
exports.engineer = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Engineer',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [5, 11, 1, 10.5, 0, 0, 0]
	}, {
		POSITION: [3, 14, 1, 15.5, 0, 0, 0]
	}, {
		POSITION: [2, 14, 1.3, 18, 0, 0, 0],
		PROPERTIES: {
			MAX_CHILDREN: 6,
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.pillbox,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [4, 14, 1, 8, 0, 0, 0]
	}]
};
exports.construct = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega Trapper',
	STAT_NAMES: statNames.trap,
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [18, 18, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 18, 1.2, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
			TYPE: exports.block
		}
	}]
};
exports.autoBuilder = makeAuto(exports.builder);
exports.conq = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Conqueror',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.75
	},
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 14, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block
		}
	}]
};
exports.bentboomer = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Bent Boomer',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [8, 10, 1, 8, -2, -35, 0]
	}, {
		POSITION: [8, 10, 1, 8, 2, 35, 0]
	}, {
		POSITION: [2, 10, 1.3, 16, -2, -35, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
			TYPE: exports.boomerang
		}
	}, {
		POSITION: [2, 10, 1.3, 16, 2, 35, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
			TYPE: exports.boomerang
		}
	}]
};
exports.boomer = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Boomer',
	STAT_NAMES: statNames.trap,
	FACING_TYPE: 'locksFacing',
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [5, 10, 1, 14, 0, 0, 0]
	}, {
		POSITION: [6, 10, -1.5, 7, 0, 0, 0]
	}, {
		POSITION: [2, 10, 1.3, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
			TYPE: exports.boomerang
		}
	}]
};
exports.quadtrapper = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Quad-Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.8,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [14, 6, 1, 0, 0, 45, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 45, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}, {
		POSITION: [14, 6, 1, 0, 0, 135, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 135, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}, {
		POSITION: [14, 6, 1, 0, 0, 225, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 225, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}, {
		POSITION: [14, 6, 1, 0, 0, 315, 0]
	}, {
		POSITION: [2, 6, 1.1, 14, 0, 315, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
			TYPE: exports.block
		}
	}]
};
exports.artillery = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	LABEL: 'Artillery',
	GUNS: [{
		POSITION: [17, 3, 1, 0, -6, -7, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 3, 1, 0, 6, 7, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoArtillery = makeAuto(exports.artillery);
exports.mortar = {
	PARENT: [exports.genericTank],
	LABEL: 'Mortar',
	DANGER: 7,
	GUNS: [{
		POSITION: [13, 3, 1, 0, -8, -7, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 3, 1, 0, 8, 7, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 3, 1, 0, -6, -7, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 3, 1, 0, 6, 7, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
			TYPE: exports.bullet
		}
	}]
};
exports.skimmer = {
	PARENT: [exports.genericTank],
	BODY: {
		FOV: 1.15
	},
	LABEL: 'Skimmer',
	DANGER: 7,
	GUNS: [{
		POSITION: [10, 14, -0.5, 9, 0, 0, 0]
	}, {
		POSITION: [17, 15, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
			TYPE: exports.missile,
			STAT_CALCULATOR: gunCalcNames.sustained
		}
	}]
};
exports.spread = {
	PARENT: [exports.genericTank],
	LABEL: 'Spreadshot',
	DANGER: 7,
	GUNS: [{
		POSITION: [13, 4, 1, 0, -0.8, -75, 5/6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14.5, 4, 1, 0, -1.0, -60, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 4, 1, 0, -1.6, -45, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17.5, 4, 1, 0, -2.4, -30, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 4, 1, 0, -3.0, -15, 1/6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 4, 1, 0, 0.8, 75, 5/6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14.5, 4, 1, 0, 1.0, 60, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 4, 1, 0, 1.6, 45, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17.5, 4, 1, 0, 2.4, 30, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 4, 1, 0, 3.0, 15, 1/6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8.5, 1.3, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spread_main, g.spread]),
			TYPE: exports.bullet
		}
	}]
};
exports.flank = {
	PARENT: [exports.genericTank],
	LABEL: 'Flank Guard',
	DANGER: 6,
	BODY: {
		SPEED: base.SPEED * 1.1,
	},
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
			TYPE: exports.bullet,
		},
	}],
};
exports.hexa = {
	PARENT: [exports.genericTank],
	LABEL: 'Hexa Tank',
	DANGER: 6,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 60, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 300, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet,
		},
	}],
};
exports.autohexa = makeAuto(exports.hexa, 'Auto-Hexa Tank');
exports.octo = {
	PARENT: [exports.genericTank],
	LABEL: 'Octo Tank',
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 45, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 135, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 225, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 315, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
			TYPE: exports.bullet,
		},
	}],
};
exports.hexatrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Hexa Trapper',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.8,
	},
	STAT_NAMES: statNames.trap,
	HAS_NO_RECOIL: true,
	GUNS: [{
		POSITION: [15, 7, 1, 0, 0, 0, 0],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 60, 0.5],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 60, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 120, 0],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 180, 0.5],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 240, 0],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 300, 0.5],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 300, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}],
};
exports.autohexatrap = makeAuto({
	PARENT: [exports.genericTank],
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.8,
	},
	STAT_NAMES: statNames.trap,
	HAS_NO_RECOIL: true,
	GUNS: [{
		POSITION: [15, 7, 1, 0, 0, 0, 0],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 60, 0.5],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 60, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 120, 0],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 180, 0.5],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 240, 0],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [15, 7, 1, 0, 0, 300, 0.5],
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 300, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}],
}, 'Auto-Hexa Trapper');
exports.tri = {
	PARENT: [exports.genericTank],
	LABEL: 'Tri-Angle',
	BODY: {
		HEALTH: base.HEALTH * 0.8,
		SHIELD: base.SHIELD * 0.8,
		SPEED: base.SPEED * 0.95,
		ACCEL: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.6,
	},
	DANGER: 6,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.tons_more_recoil]),
			TYPE: exports.bullet,
			LABEL: 'Front',
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}],
};
exports.booster = {
	PARENT: [exports.genericTank],
	LABEL: 'Booster',
	BODY: {
		HEALTH: base.HEALTH * 0.75,
		SHIELD: base.SHIELD * 0.75,
		SPEED: base.SPEED * 0.95,
		ACCEL: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.5,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.much_more_recoil]),
			TYPE: exports.bullet,
			LABEL: 'Front',
		},
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}],
};
exports.fighter = {
	PARENT: [exports.genericTank],
	LABEL: 'Fighter',
	BODY: {
		DENSITY: base.DENSITY * 0.6,
		SPEED: base.SPEED * 0.95,
		ACCEL: base.ACCEL * 0.95,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
			LABEL: 'Front',
		},
	}, {
		POSITION: [16, 8, 1, 0, -1, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
			LABEL: 'Side',
		},
	}, {
		POSITION: [16, 8, 1, 0, 1, -90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
			LABEL: 'Side',
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}],
};
exports.brutalizer = {
	PARENT: [exports.genericTank],
	LABEL: 'Surfer',
	BODY: {
		HEALTH: base.HEALTH * 0.75,
		SHIELD: base.SHIELD * 0.75,
		SPEED: base.SPEED * 0.95,
		ACCEL: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.6,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
			LABEL: 'Front',
		},
	}, {
		POSITION: [7, 7.5, 0.6, 7, -1, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: [exports.autoswarm],
			STAT_CALCULATOR: gunCalcNames.swarm,
		},
	}, {
		POSITION: [7, 7.5, 0.6, 7, 1, -90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: [exports.autoswarm],
			STAT_CALCULATOR: gunCalcNames.swarm,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}],
};
exports.bomber = {
	PARENT: [exports.genericTank],
	LABEL: 'Bomber',
	BODY: {
		DENSITY: base.DENSITY * 0.6,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet,
			LABEL: 'Front',
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 130, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
			TYPE: exports.bullet,
			LABEL: 'Wing',
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 230, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
			TYPE: exports.bullet,
			LABEL: 'Wing',
		},
	}, {
		POSITION: [14, 8, 1, 0, 0, 180, 0],
	}, {
		POSITION: [4, 8, 1.5, 14, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.more_recoil]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}],
};
exports.autotri = makeAuto(exports.tri);
exports.falcon = {
	PARENT: [exports.genericTank],
	LABEL: 'Falcon',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.8,
		FOV: 1.2,
	},
	GUNS: [{
		POSITION: [27, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.less_reload]),
			TYPE: exports.bullet,
			LABEL: 'Assassin',
			ALT_FIRE: true,
		},
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0],
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 180, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}],
};
exports.auto3 = {
	PARENT: [exports.genericTank],
	LABEL: 'Auto-3',
	DANGER: 6,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 190, 0],
		TYPE: exports.auto3gun,
	}, {
		POSITION: [11, 8, 0, 120, 190, 0],
		TYPE: exports.auto3gun,
	}, {
		POSITION: [11, 8, 0, 240, 190, 0],
		TYPE: exports.auto3gun,
	}],
};
exports.auto5 = {
	PARENT: [exports.genericTank],
	LABEL: 'Auto-5',
	DANGER: 7,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 190, 0],
		TYPE: exports.auto5gun,
	}, {
		POSITION: [11, 8, 0, 72, 190, 0],
		TYPE: exports.auto5gun,
	}, {
		POSITION: [11, 8, 0, 144, 190, 0],
		TYPE: exports.auto5gun,
	}, {
		POSITION: [11, 8, 0, 216, 190, 0],
		TYPE: exports.auto5gun,
	}, {
		POSITION: [11, 8, 0, 288, 190, 0],
		TYPE: exports.auto5gun,
	}],
};
exports.heavy3 = {
	BODY: {
		SPEED: base.SPEED * 0.95,
	},
	PARENT: [exports.genericTank],
	LABEL: 'Mega-3',
	DANGER: 7,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [14, 8, 0, 0, 190, 0],
		TYPE: exports.heavy3gun,
	}, {
		POSITION: [14, 8, 0, 120, 190, 0],
		TYPE: exports.heavy3gun,
	}, {
		POSITION: [14, 8, 0, 240, 190, 0],
		TYPE: exports.heavy3gun,
	}],
};
exports.tritrap = {
	LABEL: 'Tri-Trapper',
	BODY: {
		SPEED: base.SPEED * 1.1,
	},
	PARENT: [exports.genericTank],
	DANGER: 6,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [12, 8, 0, 0, 190, 0],
		TYPE: exports.tritrapgun,
	}, {
		POSITION: [12, 8, 0, 120, 190, 0],
		TYPE: exports.tritrapgun,
	}, {
		POSITION: [12, 8, 0, 240, 190, 0],
		TYPE: exports.tritrapgun,
	}],
};
exports.autoSniper = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Auto Sniper',
	BODY: {
		ACCELERATION: base.ACCEL * 0.6,
		SPEED: base.SPEED * 0.8,
		FOV: 1.25,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 8, 0, 0, 170, 0],
		TYPE: exports.sniper3gun,
	}, {
		POSITION: [13, 8, 0, 120, 170, 0],
		TYPE: exports.sniper3gun,
	}, {
		POSITION: [13, 8, 0, 240, 170, 0],
		TYPE: exports.sniper3gun,
	}],
};
exports.auto4 = {
	PARENT: [exports.genericTank],
	DANGER: 5,
	LABEL: 'Auto-4',
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 6, 0, 45, 160, 0],
		TYPE: exports.auto4gun,
	}, {
		POSITION: [13, 6, 0, 135, 160, 0],
		TYPE: exports.auto4gun,
	}, {
		POSITION: [13, 6, 0, 225, 160, 0],
		TYPE: exports.auto4gun,
	}, {
		POSITION: [13, 6, 0, 315, 160, 0],
		TYPE: exports.auto4gun,
	}],
};
exports.machine3 = {
	PARENT: [exports.genericTank],
	LABEL: 'Machine-3',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 8, 0, 0, 170, 0],
		TYPE: exports.machine3gun
	}, {
		POSITION: [13, 8, 0, 120, 170, 0],
		TYPE: exports.machine3gun
	}, {
		POSITION: [13, 8, 0, 240, 170, 0],
		TYPE: exports.machine3gun
	}]
};
exports.trishot3 = {
	PARENT: [exports.genericTank],
	LABEL: 'Triple-Shot-3',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [13, 8, 0, 0, 170, 0],
		TYPE: exports.trishot3gun
	}, {
		POSITION: [13, 8, 0, 120, 170, 0],
		TYPE: exports.trishot3gun
	}, {
		POSITION: [13, 8, 0, 240, 170, 0],
		TYPE: exports.trishot3gun
	}]
};
exports.flankTrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Trap Guard',
	STAT_NAMES: statNames.generic,
	DANGER: 6,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [13, 8, 1, 0, 0, 180, 0],
	}, {
		POSITION: [4, 8, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}],
};
exports.guntrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Gunner Trapper',
	DANGER: 7,
	STAT_NAMES: statNames.generic,
	BODY: {
		FOV: 1.25,
	},
	GUNS: [{
		POSITION: [19, 2, 1, 0, -2.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tons_more_recoil, g.lots_more_recoil]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tons_more_recoil, g.lots_more_recoil]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [12, 11, 1, 0, 0, 0, 0],
	}, {
		POSITION: [13, 11, 1, 0, 0, 180, 0],
	}, {
		POSITION: [4, 11, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.half_recoil]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}],
};
exports.snipeGuard = {
	PARENT: [exports.genericTank],
	LABEL: 'Snipe Guard',
	BODY: {
		ACCELERATION: base.ACCEL * 0.7,
		FOV: 1.2,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [24, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.more_recoil]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 180, 0],
	}, {
		POSITION: [4, 8.5, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}],
};
exports.eliteSprayerControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Elite Sprayer',
	SHAPE: 3,
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 1,
		dam: 0.9,
		pen: 0.9,
		str: 0.9,
		spd: 1,
		atk: 0.9,
		hlt: 0.9,
		shi: 0.9,
		rgn: 0.9,
		mob: 0.9,
	}),
	BODY: {
		FOV: 1.3,
		SPEED: base.SPEED * 0.5,
		ACCELERATION: base.ACCEL * 0.5,
		HEALTH: base.HEALTH * 2,
		REGEN: base.REGEN,
		DAMAGE: base.DAMAGE * 2.5,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [14, 6, 0, 180, 190, 0],
		TYPE: exports.spray,
	}, {
		POSITION: [14, 6, 0, 60, 190, 0],
		TYPE: exports.spray,
	}, {
		POSITION: [14, 6, 0, -60, 190, 0],
		TYPE: exports.spray,
	}],
};
exports.mothership = {
	PARENT: [exports.genericTank],
	LABEL: 'Mothership',
	DANGER: 7,
	SHAPE: 16,
	SIZE: 30,
	LEVEL: 140,
	ACCEPTS_SCORE: false,
	STAT_NAMES: statNames.drone,
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 0.1,
		dam: 1,
		pen: 1,
		str: 1,
		spd: 1,
		atk: 1,
		hlt: 1,
		shi: 1,
		rgn: 0.1,
		mob: 1,
	}),
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.25,
		HEALTH: 7008,
		PUSHABILITY: 0.1,
		DAMAGE: 50,
		DENSITY: base.DENSITY * 0.25,
	},
	GUNS: [{
		POSITION: [4.3, 3.1, 1.2, 8, 0, 22.5, 1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 45, 0.0625],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 67.5, 0.9375],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 90, 0.125],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 112.5, 0.875],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 135, 0.1875],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 157.5, 0.8125],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 180, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 202.5, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 225, 0.3125],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 247.5, 0.6875],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 270, 0.375],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 292.5, 0.625],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 315, 0.4375],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 337.5, 0.5625],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: [exports.mothership_drone, {
				INDEPENDENT: true,
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}, {
		POSITION: [4.3, 3.1, 1.2, 8, 0, 360, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.mother]),
			TYPE: exports.mothership_drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2,
		},
	}],
};
exports.arena_closer = {
	PARENT: [exports.genericTank],
	LABEL: 'Arena Closer',
	DANGER: 10,
	SIZE: 40,
	COLOR: 13,
	LAYER: 13,
	DONT_HIT_OBSTACLES: true,
	ACCEPTS_SCORE: true,
	BODY: {
		SHIELD: 1e7,
		REGEN: 1e7,
		HEALTH: 1e7,
		DENSITY: 30,
		DAMAGE: 1e4,
		FOV: 1.15,
		SPEED: 9.25
	},
	GUNS: [{
		POSITION: [14, 9.6, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.closer]),
			TYPE: [exports.bullet, {
				DIES_TO_TEAM_BASE: false,
				DONT_HIT_OBSTACLES: true,
				LAYER: 12
			}]
		}
	}],
	DIES_TO_TEAM_BASE: false,
	CAN_BE_ON_LEADERBOARD: false
};
exports.destroyerDominator = {
	PARENT: [exports.genericTank],
	DANGER: 10,
	SIZE: 30,
	BODY: {
		FOV: 1.15,
		HEALTH: 6148,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.75,
		RESIST: 50,
		PUSHABILITY: 0.15,
	},
	LABEL: 'Dominator',
	GUNS: [{
		POSITION: [14.75, 7, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.dominator]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [5, 7, -1.6, 6, 0, 0, 0],
	}],
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody,
	}],
	GIVE_KILL_MESSAGE: true,
	ACCEPTS_SCORE: false,
	BROADCAST_MESSAGE: 'A Dominator has been killed!',
};
exports.gunnerDominator = {
	PARENT: [exports.genericTank],
	DANGER: 10,
	SIZE: 30,
	BODY: {
		FOV: 1.15,
		HEALTH: 6148,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.75,
		RESIST: 50,
		PUSHABILITY: 0.15,
	},
	LABEL: 'Gunner Dominator',
	GUNS: [{
		POSITION: [14, 3, 1, 0, -2, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [14, 3, 1, 0, 2, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [15.75, 3.25, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gun_dominator]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [5, 8.5, -1.6, 6, 0, 0, 0],
	}],
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody,
	}],
	GIVE_KILL_MESSAGE: true,
	ACCEPTS_SCORE: false,
	BROADCAST_MESSAGE: 'A Dominator has been killed!',
};
exports.trapperDominator = {
	PARENT: [exports.genericTank],
	DANGER: 10,
	SIZE: 30,
	BODY: {
		FOV: 1.15,
		HEALTH: 6148,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.75,
		RESIST: 50,
		PUSHABILITY: 0.15,
	},
	LABEL: 'Trapper Dominator',
	FACING_TYPE: 'autospin',
	GUNS: [{
		POSITION: [3.5, 3.75, 1, 8, 0, 0, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 45, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 45, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 90, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 135, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 135, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 180, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 225, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 225, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 270, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 3.75, 1, 8, 0, 315, 0],
	}, {
		POSITION: [1.25, 3.75, 1.7, 12, 0, 315, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}],
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody,
	}],
	GIVE_KILL_MESSAGE: true,
	ACCEPTS_SCORE: false,
	BROADCAST_MESSAGE: 'A Dominator has been killed!',
};
exports.facter = {
	PARENT: [exports.genericTank],
	LABEL: 'Launcher',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.1,
	},
	DANGER: 7,
	MAX_CHILDREN: 4,
	GUNS: [{
		POSITION: [5, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.launcher]),
			TYPE: [exports.booster, {
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
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster'],
				DRAW_HEALTH: false,
				ACCEPTS_SCORE: false,
				CLEAR_ON_MASTER_UPGRADE: true,
				GIVE_KILL_MESSAGE: false,
				CAN_BE_ON_LEADERBOARD: false
			}]
		},
	}, {
		POSITION: [18.75, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.6]
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.6]
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.1]
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.1]
	}]
};
exports.launcher = {
	PARENT: [exports.genericTank],
	LABEL: 'Facter',
	MAX_CHILDREN: 1,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.8,
		FOV: 1.1,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.launcher]),
			TYPE: [exports.booster, {
				SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
				BODY: {
					HEALTH: base.HEALTH * 0.5,
					SHIELD: base.SHIELD * 0.5,
					SPEED: base.SPEED * 0.25,
					ACCEL: base.ACCEL * 0.5,
					DENSITY: base.DENSITY * 0.5,
				},
				HITS_OWN_TYPE: 'hard',
				FACING_TYPE: 'smoothToTarget',
				CONTROLLERS: [
					'nearestDifferentMaster',
					'canRepel',
					'mapTargetToGoal',
					'hangOutNearMaster',
				],
				AI: {
					BLIND: true,
				},
				CAN_BE_ON_LEADERBOARD: false,
				GIVE_KILL_MESSAGE: false,
				ACCEPTS_SCORE: false
			}],
			MAX_CHILDREN: 1,
		},
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.launcher]),
			TYPE: [exports.overlord, {
				SHOOT_SETTINGS: combineStats([g.drone, g.over]),
				BODY: {
					HEALTH: base.HEALTH * 0.5,
					SHIELD: base.SHIELD * 0.5,
					SPEED: base.SPEED * 0.2,
					ACCEL: base.ACCEL * 0.5,
					DENSITY: base.DENSITY * 0.5,
				},
				HITS_OWN_TYPE: 'hard',
				FACING_TYPE: 'smoothToTarget',
				CONTROLLERS: [
					'nearestDifferentMaster',
					'mapAltToFire',
					'minion',
					'canRepel',
					'hangOutNearMaster',
				],
				AI: {
					BLIND: true,
				},
				CAN_BE_ON_LEADERBOARD: false,
				GIVE_KILL_MESSAGE: false,
				ACCEPTS_SCORE: false
			}],
			MAX_CHILDREN: 1,
		},
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.launcher]),
			TYPE: [exports.builder, {
				SHOOT_SETTINGS: combineStats([g.trap]),
				BODY: {
					HEALTH: base.HEALTH * 0.5,
					SHIELD: base.SHIELD * 0.5,
					SPEED: base.SPEED * 0.2,
					ACCEL: base.ACCEL * 0.5,
					DENSITY: base.DENSITY * 0.5,
				},
				HITS_OWN_TYPE: 'hard',
				FACING_TYPE: 'locksFacing',
				CONTROLLERS: [
					'nearestDifferentMaster',
					'mapAltToFire',
					'canRepel',
					'minion',
					'hangOutNearMaster',
				],
				AI: {
					BLIND: true,
				},
				CAN_BE_ON_LEADERBOARD: false,
				GIVE_KILL_MESSAGE: false,
				ACCEPTS_SCORE: false
			}],
			MAX_CHILDREN: 1,
		},
	}],
};
exports.twinTrapper = {
	PARENT: [exports.genericTank],
	DANGER: 10,
	LABEL: 'Twin Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.95,
		FOV: 1.1,
	},
	GUNS: [{
		POSITION: [18, 8, 1, 0, 5.5, 0, 0],
	}, {
		POSITION: [2, 8, 1.1, 18, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block,
		},
	}, {
		POSITION: [18, 8, 1, 0, -5.5, 0, 0.5],
	}, {
		POSITION: [2, 8, 1.1, 18, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.block,
		},
	}],
};
exports.eliteGunnerControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Elite Gunner',
	SHAPE: 3,
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 1,
		dam: 0.9,
		pen: 0.9,
		str: 0.9,
		spd: 1,
		atk: 0.9,
		hlt: 0.9,
		shi: 0.9,
		rgn: 0.9,
		mob: 0.9,
	}),
	GUNS: [{
		POSITION: [14, 16, 1, 0, 0, 180, 0],
	}, {
		POSITION: [4, 16, 1.5, 14, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: [exports.pillbox, {
				INDEPENDENT: true,
			}],
		},
	}, {
		POSITION: [6, 14, -2, 2, 0, 60, 0],
	}, {
		POSITION: [6, 14, -2, 2, 0, 300, 0],
	}],
	AI: {
		NO_LEAD: false,
	},
	TURRETS: [{
		POSITION: [14, 8, 0, 60, 180, 0],
		TYPE: [exports.auto4gun],
	}, {
		POSITION: [14, 8, 0, 300, 180, 0],
		TYPE: [exports.auto4gun],
	}],
};
exports.testbed_parent = {
	PARENT: [exports.genericTank],
	LABEL: 'Testbed Parent',
	DANGER: 8,
	BODY: {
		SHIELD: 1500,
		REGEN: 5,
		HEALTH: 15,
		DAMAGE: 5,
		DENSITY: 15,
		FOV: 1.25,
		SPEED: base.SPEED * 1.25
	},
	TURRETS: [],
	GUNS: [{
		POSITION: [18, 10, -1.4, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.op]),
			TYPE: [exports.bullet, {
				SHAPE: 4
			}]
		}
	}]
};
exports.testbed = {
	PARENT: [exports.testbed_parent],
	LABEL: 'TESTBED',
	RESET_UPGRADES: true,
	SKILL_CAP: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
};
exports.testbed_bosses = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Bosses'
};
exports.testbed_bosses_2 = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Page 2'
};
exports.testbed_dominators = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Dominators'
};
exports.testbed_sentries = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Sentries'
};
exports.testbed_misc = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Miscellaneous'
};
exports.testbed_misc_2 = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Page 2'
};
exports.testbed_misc_3 = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Page 3'
};
exports.testbed_events = {
	PARENT: [exports.testbed_parent],
	LABEL: 'Events'
};
exports.crasherSpawner = {
	PARENT: [exports.genericTank],
	LABEL: '',  
	STAT_NAMES: statNames.drone,
	CONTROLLERS: ['nearestDifferentMaster'], 
	AI: {
		chase: true
	},
	MAX_CHILDREN: 4,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 0, 0], 
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
			TYPE: [exports.drone, {
				LABEL: 'Crasher',
				VARIES_IN_SIZE: true,
				DRAW_HEALTH: false
			}],
			SYNCS_SKILLS: true,
			AUTOFIRE: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.crasherSpawner2 = {
	PARENT: [exports.crasherSpawner],
	COLOR: 5,
	INDEPENDENT: true
};
exports.eliteDestroyerControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Elite Destroyer',
	SHAPE: 3,
	SIZE: 20,
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 1,
		dam: 0.9,
		pen: 0.9,
		str: 0.9,
		spd: 1,
		atk: 0.9,
		hlt: 0.9,
		shi: 0.9,
		rgn: 0.9,
		mob: 0.9,
	}),
	BODY: {
		FOV: 1.05,
		HEALTH: base.HEALTH * 1.5,
		SHIELD: base.SHIELD * 1.25,
		DAMAGE: base.DAMAGE * 2.5,
	},
	GUNS: [{
		POSITION: [5, 16, 1, 6, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [5, 16, 1, 6, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [5, 16, 1, 6, 0, -60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet,
		},
	}],
	TURRETS: [{
		POSITION: [11, 0, 0, 180, 360, 0],
		TYPE: exports.crasherSpawner
	}, {
		POSITION: [11, 0, 0, 60, 360, 0],
		TYPE: exports.crasherSpawner
	}, {
		POSITION: [11, 0, 0, -60, 360, 0],
		TYPE: exports.crasherSpawner
	}, {
		POSITION: [11, 0, 0, 0, 360, 1],
		TYPE: exports.bigAuto3Gun,
	}],
};
exports.leviathon = makeAuto({
	PARENT: [exports.genericTank],
	LABEL: 'Leviathan',
	SHAPE: 5,
	COLOR: 14,
	SIZE: 30,
	FACING_TYPE: 'autospin',
	DANGER: 8,
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 1,
		dam: 0.9,
		pen: 0.9,
		str: 0.9,
		spd: 1,
		atk: 0.9,
		hlt: 0.9,
		shi: 0.9,
		rgn: 0.9,
		mob: 0.9,
	}),
	BODY: {
		FOV: 1.1,
		HEALTH: base.HEALTH * 5,
		SHIELD: base.SHIELD * 1.25,
		DAMAGE: base.DAMAGE * 3.25,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5,
	},
	DRAW_HEALTH: true,
	GUNS: [{
		POSITION: [3, 8.9, 1.05, 8, 0, 36, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.penta_trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 108, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.penta_trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 180, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.penta_trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 252, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.penta_trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3, 8.9, 1.05, 8, 0, 324, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.levi]),
			TYPE: exports.penta_trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}],
	TURRETS: [{
		POSITION: [3.25, 9.85, 0, 0, 190, 1],
		TYPE: exports.levi_gun,
	}, {
		POSITION: [3.25, 9.85, 0, 72, 190, 1],
		TYPE: exports.levi_gun,
	}, {
		POSITION: [3.25, 9.85, 0, 144, 190, 1],
		TYPE: exports.levi_gun,
	}, {
		POSITION: [3.25, 9.85, 0, 216, 190, 1],
		TYPE: exports.levi_gun,
	}, {
		POSITION: [3.25, 9.85, 0, 288, 190, 1],
		TYPE: exports.levi_gun,
	}],
}, 'Leviathan', {
	type: exports.superHeavyGun,
	size: 7,
	independent: true,
});
exports.defender_controlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Defender',
	SIZE: 20,
	SHAPE: 3,
	COLOR: 2,
	COLOR_OVERRIDE: 13,
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 1,
		dam: 0.9,
		pen: 0.9,
		str: 0.9,
		spd: 1,
		atk: 0.9,
		hlt: 0.9,
		shi: 0.9,
		rgn: 0.9,
		mob: 0.9,
	}),
	BODY: {
		FOV: 1.15,
		HEALTH: 1000,
		DAMAGE: base.DAMAGE * 1.1,
		SPEED: base.SPEED * 0.45,
		ACCELARATION: base.ACCEL * 0.25,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [4.85, 6.7, 0, 0, 360, 1],
		TYPE: exports.defenderAutoGun,
	}, {
		POSITION: [4.85, 6.7, 0, 120, 360, 1],
		TYPE: exports.defenderAutoGun,
	}, {
		POSITION: [4.85, 6.7, 0, 240, 360, 1],
		TYPE: exports.defenderAutoGun,
	}],
	GUNS: [{
		POSITION: [15, 7, 1, -2, 0, 60, 0],
	}, {
		POSITION: [3, 7, 1.7, 13, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.defend]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [15, 7, 1, -2, 0, 180, 0],
	}, {
		POSITION: [3, 7, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.defend]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [15, 7, 1, -2, 0, 300, 0],
	}, {
		POSITION: [3, 7, 1.7, 13, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.defend]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true,
		},
	}],
};
exports.spike_triangle = {
	PARENT: [exports.genericTank],
	COLOR: 9,
	SHAPE: 3,
	INDEPENDENT: true,
};
exports.smasherBody_ = {
	PARENT: [exports.genericTank],
	COLOR: 9,
	SHAPE: 6,
	INDEPENDENT: true,
};
exports.mega_spike = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega Spike',
	DANGER: 8,
	FACING_TYPE: 'autospin',
	BODY: {
		FOV: 1.05,
		DENSITY: base.DENSITY * 3,
		HEALTH: base.HEALTH * 0.95,
		SHIELD: base.SHIELD * 0.95,
		DAMAGE: base.DAMAGE * 1.15,
	},
	TURRETS: [{
		POSITION: [22.75, 0, 0, 0, 360, 0],
		TYPE: exports.smasherBody_,
	}, {
		POSITION: [2.1, 13, 3.6, 0, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, -3.6, 0, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 0, 0, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 3.6, 60, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, -3.6, 60, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 0, 60, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 3.6, 120, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, -3.6, 120, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 0, 120, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 3.6, 180, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, -3.6, 180, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 0, 180, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 3.6, 240, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, -3.6, 240, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 0, 240, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 3.6, 300, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, -3.6, 300, 360, 0],
		TYPE: exports.spike_triangle,
	}, {
		POSITION: [2.1, 13, 0, 300, 360, 0],
		TYPE: exports.spike_triangle,
	}],
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher,
};
exports.demolishor = {
	PARENT: [exports.genericTank],
	LABEL: 'Demolishor',
	SHAPE: 6,
	COLOR: 21,
	SIZE: 40,
	DANGER: 8,
	FACING_TYPE: 'spinSlowly',
	BODY: {
		SPEED: base.SPEED * 0.25,
		ACCELERATION: base.ACCEL * 0.25,
		HEALTH: 500,
		REGEN: base.REGEN * 0.75,
	},
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 1,
		dam: 0.8,
		pen: 0.8,
		str: 0.8,
		spd: 1,
		atk: 0.8,
		hlt: 0.8,
		shi: 0.5,
		rgn: 0.5,
		mob: 1,
	}),
	GUNS: [{
		POSITION: [3.5, 2.5, 1, 7, 3, 0, 0],
	}, {
		POSITION: [1, 2.5, 1.7, 11, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 2.5, 1, 7, -3, 0, 0],
	}, {
		POSITION: [1, 2.5, 1.7, 11, -3, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 2.5, 1, 7, 3, 120, 0],
	}, {
		POSITION: [1, 2.5, 1.7, 11, 3, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 2.5, 1, 7, -3, 120, 0],
	}, {
		POSITION: [1, 2.5, 1.7, 11, -3, 120, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 2.5, 1, 7, 3, 240, 0],
	}, {
		POSITION: [1, 2.5, 1.7, 11, 3, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}, {
		POSITION: [3.5, 2.5, 1, 7, -3, 240, 0],
	}, {
		POSITION: [1, 2.5, 1.7, 11, -3, 240, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.dem_trap]),
			TYPE: exports.trap,
			AUTOFIRE: true,
		},
	}],
	TURRETS: [{
		POSITION: [1.3, 6, 0, 0, 0, 1],
		TYPE: exports.demolishProp,
	}, {
		POSITION: [1.3, 6, 0, 120, 0, 1],
		TYPE: exports.demolishProp,
	}, {
		POSITION: [1.3, 6, 0, 240, 0, 1],
		TYPE: exports.demolishProp,
	}, {
		POSITION: [5, 6, 0, 0, 120, 1],
		TYPE: exports.superHeavyMach,
	}, {
		POSITION: [5, 6, 0, 120, 120, 1],
		TYPE: exports.superHeavyMach,
	}, {
		POSITION: [5, 6, 0, 240, 120, 1],
		TYPE: exports.superHeavyMach,
	}, {
		POSITION: [21.15, 0, 0, 0, 0, 0],
		TYPE: exports.demolishBody,
	}, {
		POSITION: [16, 1, 0, 60, 0, 0],
		TYPE: exports.demolishFactory,
	}, {
		POSITION: [16, 1, 0, 180, 0, 0],
		TYPE: exports.demolishFactory,
	}, {
		POSITION: [16, 1, 0, 300, 0, 0],
		TYPE: exports.demolishFactory,
	}],
};
exports.spikeBody1 = {
	LABEL: '',
	CONTROLLERS: ['fastspin'],
	COLOR: 9,
	SHAPE: 3,
	INDEPENDENT: true,
};
exports.spikeBody2 = {
	LABEL: '',
	CONTROLLERS: ['reversespin'],
	COLOR: 9,
	SHAPE: 3,
	INDEPENDENT: true,
};
exports.weirdspike = {
	PARENT: [exports.genericTank],
	LABEL: 'Weird Spike',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.95,
		DAMAGE: base.DAMAGE * 1.15,
		FOV: 1.05,
		DENSITY: base.DENSITY * 1.5,
		HEALTH: base.HEALTH * 0.925,
		SHIELD: base.SHIELD * 0.925,
	},
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher,
	TURRETS: [{
		POSITION: [20.5, 0, 0, 0, 360, 0],
		TYPE: exports.spikeBody1,
	}, {
		POSITION: [20.5, 0, 0, 180, 360, 0],
		TYPE: exports.spikeBody2,
	}],
};
exports.sentry_parent = {
	PARENT: [exports.genericTank],
	LABEL: 'Sentry',
	DANGER: 5,
	SHAPE: 3,
	COLOR: 5,
	BODY: {
		FOV: 1.05,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
	},
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'locksFacing',
	DRAW_HEALTH: true,
	GIVE_KILL_MESSAGE: true,
};
exports.sentrySwarmControlled = {
	PARENT: [exports.sentry_parent],
	LABEL: 'Swarm Sentry',
	DANGER: 3,
	SHAPE: 3,
	SIZE: 10,
	BODY: {
		FOV: 1.15,
	},
	MOTION_TYPE: 'motor',
	GUNS: [{
		POSITION: [7, 14, 0.6, 7, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil]),
			TYPE: [exports.swarm, {
				INDEPENDENT: true,
				FACING_TYPE: 'smoothToTarget',
				CONTROLLERS: [
					'nearestDifferentMaster',
					'canRepel',
					'mapTargetToGoal',
					'hangOutNearMaster'
				],
				AI: {
					BLIND: true,
				},
			}],
			AUTOFIRE: true,
			STAT_CALCULATOR: gunCalcNames.swarm,
		},
	}],
};
exports.sentryGunControlled = makeAuto(exports.sentry_parent, 'Auto Sentry', {
	type: exports.sentry_turret,
	size: 12,
});
exports.sentryTrapControlled = makeAuto(exports.sentry_parent, 'Trap Sentry', {
	type: exports.trap_turret,
	size: 12,
});
exports.minion_controlled = {
	PARENT: [exports.minion],
	LABEL: 'Minion',
	SIZE: 6.35,
	FACING_TYPE: 'locksFacing',
};
exports.trapTurret = {
	LABEL: '',
	COLOR: 16,
	INDEPENDENT: true,
	GUNS: [{
		POSITION: [16, 14, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 14, 1.8, 16, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.half_reload]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true
		}
	}],
	HAS_NO_RECOIL: true
};
exports.palisadeControlled = {
	PARENT: [exports.genericTank],
	SHAPE: 6,
	SIZE: 30,
	LABEL: 'Palisade',
	FACING_TYPE: 'autospin',
	DANGER: 10,
	COLOR: 19,
	BODY: {
		FOV: 1.15,
		RESIST: 50,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5,
		HEALTH: 250, 
		DAMAGE: 10, 
		PENETRATION: 0.25, 
		PUSHABILITY: 0,
		HETERO: 0,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.15
	},
	GUNS: [{
		POSITION: [4, 6, -1.6, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [4, 6, -1.6, 8, 0, 300, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
			TYPE: [exports.minion, {
				ACCEPTS_SCORE: false
			}],
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			MAX_CHILDREN: 1,
			SYNCS_SKILLS: true,
			WAIT_TO_CYCLE: true
		}
	}],
	TURRETS: [{
		POSITION: [5, 10, 0, 30, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 90, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 150, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 210, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 270, 110, 0],
		TYPE: exports.trapTurret
	}, {
		POSITION: [5, 10, 0, 330, 110, 0],
		TYPE: exports.trapTurret
	}]
};
exports.sweeper = {
	PARENT: [exports.genericTank],
	LABEL: 'Sweeper',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
	},
	DANGER: 7,
	TEAM: -69,
	COLOR: 17,
	GUNS: [{
		POSITION: [20.5, 19.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sweep]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [20.5, 19.5, 1, 0, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sweep]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [20.5, 19.5, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sweep]),
			TYPE: exports.bullet,
		},
	}, {
		POSITION: [20.5, 19.5, 1, 0, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sweep]),
			TYPE: exports.bullet,
		},
	}],
};
exports.speeder = {
	PARENT: [exports.genericTank],
	LABEL: 'Speeder',
	BODY: {
		HEALTH: base.HEALTH * 0.5,
		SHIELD: base.SHIELD * 0.5,
		SPEED: base.SPEED * 0.95,
		ACCELARATION: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.25,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.lots_more_recoil]),
			TYPE: exports.bullet,
			LABEL: 'Front',
		},
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 155, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [18, 8, 1, 0, 0, 205, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}],
};
exports.octogeddonTurret = {
	PARENT: [exports.genericTank],
	LABEL: 'Turret',
	BODY: {
		FOV: 0.5
	},
	INDEPENDENT: true,
	CONTROLLERS: ['nearestDifferentMaster'],
	COLOR: 16,
	AI: {
		SKYNET: true,
		FULL_VIEW: true
	},
	GUNS: [{
		POSITION: [16, 9, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 9, 1.8, 16, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.low_power, g.half_reload, g.octogeddon]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
			AUTOFIRE: true
		}
	}],
	HAS_NO_RECOIL: true
};
exports.octogeddonControlled = {
	PARENT: [exports.genericTank],
	LABEL: 'Octogeddon',
	SIZE: 22,
	SHAPE: 8,
	DANGER: 8,
	BODY: {
		FOV: 1.15,
		HEALTH: 2750,
		DAMAGE: base.DAMAGE * 1.25,
		REGEN: base.REGEN * 0.75,
		SPEED: base.SPEED * 0.3,
		ACCELARATION: base.ACCEL * 0.5
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [6, 4.7, 0, 0, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [6, 4.7, 0, 120, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [6, 4.7, 0, 240, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [6, 9.75, 0, 0, 160, 0],
		TYPE: exports.octogeddonTurret,
	}, {
		POSITION: [6, 9.75, 0, 45, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 90, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 135, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 180, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 225, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 270, 160, 0],
		TYPE: exports.octogeddonTurret
	}, {
		POSITION: [6, 9.75, 0, 315, 160, 0],
		TYPE: exports.octogeddonTurret
	}]
};
exports.gangMinion = {
	PARENT: [exports.genericTank],
	LABEL: 'Minion',
	TYPE: 'minion',
	DAMAGE_CLASS: 0,
	HITS_OWN_TYPE: 'hardWithBuffer',
	FACING_TYPE: 'smoothToTarget',
	BODY: {
		FOV: 2,
		SPEED: 3,
		ACCELERATION: 0.4,
		HEALTH: 5,
		SHIELD: 0,
		DAMAGE: 1.2,
		RESIST: 1,
		PENETRATION: 1,
		DENSITY: 0.4
	},
	DRAW_HEALTH: false,
	CLEAR_ON_MASTER_UPGRADE: true,
	GIVE_KILL_MESSAGE: false,
	CONTROLLERS: ['mirrorMaster', 'nearestDifferentMaster'],
	GUNS: [{
		POSITION: [17, 9, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
			WAIT_TO_CYCLE: true,
			TYPE: exports.bullet
		}
	}]
};
exports.gang = {
	PARENT: [exports.genericTank],
	LABEL: 'Gang',
	SIZE: 7,
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		SPEED: base.SPEED * 0.75,
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.15,
		HEALTH: base.HEALTH * 2,
		DAMAGE: base.DAMAGE * 2
	},
	MAX_CHILDREN: 3,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.gang]),
			TYPE: exports.gangMinion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}]
};
exports.michaelRosen = {
	PARENT: [exports.genericTank],
	LABEL: 'Michael Rosen',
	DANGER: 20,
	BODY: {
		HEALTH: 1e99,
		DAMAGE: 1e99,
		REGEN: 1e9,
		SPEED: 10,
		FOV: 2,
		RESIST: 1e9,
	},
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.michael_rosen]),
			TYPE: exports.bullet
		}
	}],
	DIES_TO_TEAM_BASE: false,
};
exports.hive_tank = {
	PARENT: [exports.genericTank],
	LABEL: 'Hive',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	FACING_TYPE: 'autospin',
	BODY: {
		ACCELARATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	MAX_CHILDREN: 21,
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.bee, {
				DIE_AT_RANGE: false,
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
			AUTOFIRE: true
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 60, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.bee, {
				DIE_AT_RANGE: false,
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
			AUTOFIRE: true
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 120, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.bee, {
				DIE_AT_RANGE: false,
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
			AUTOFIRE: true
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.bee, {
				DIE_AT_RANGE: false,
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
			AUTOFIRE: true
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 240, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.bee, {
				DIE_AT_RANGE: false,
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
			AUTOFIRE: true
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 0, 300, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
			TYPE: [exports.bee, {
				DIE_AT_RANGE: false,
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
			AUTOFIRE: true
		}
	}]
};
exports.boostAuto = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 3
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.lots_more_recoil, g.half_reload]),
			TYPE: exports.bullet,
			LABEL: 'Front'
		}
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil, g.half_reload]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil, g.half_reload]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_reload]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_reload]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.autoSmashBooster = makeAuto(exports.smash, 'Auto Smasher', {
	type: exports.boostAuto,
	size: 11,
});
exports.autoSmashBooster.SKILL_CAP = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12];
exports.pentaDrone = {
	PARENT: [exports.sunchip],
	SHAPE: 5
};
exports.pentamancer = {
	PARENT: [exports.genericTank],
	LABEL: 'Pentamancer',
	DANGER: 8,
	STAT_NAMES: statNames.necro,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	SHAPE: 5,
	FACING_TYPE: 'autospin',
	MAX_CHILDREN: 12,
	GUNS: [{
		POSITION: [4, 11, 1.2, 8, 0, 36, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.penta_sunchip]),
			TYPE: exports.pentaDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [4, 11, 1.2, 8, 0, 108, 1/5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.penta_sunchip]),
			TYPE: exports.pentaDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [4, 11, 1.2, 8, 0, 180, 2/5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.penta_sunchip]),
			TYPE: exports.pentaDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [4, 11, 1.2, 8, 0, 252, 3/5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.penta_sunchip]),
			TYPE: exports.pentaDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}, {
		POSITION: [4, 11, 1.2, 8, 0, 324, 4/5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.penta_sunchip]),
			TYPE: exports.pentaDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}]
};
// NPCS:
exports.crasher = {
	TYPE: 'crasher',
	LABEL: 'Crasher',
	COLOR: 5,
	SHAPE: 3,
	SIZE: 5,
	VARIES_IN_SIZE: true,
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		NO_LEAD: true   
	},
	CAN_BE_ON_LEADERBOARD: false,
	BODY: {
		SPEED: 6,
		ACCEL: 0.01,
		HEALTH: 0.5,
		DAMAGE: 4,
		PENETRATION: 2,
		PUSHABILITY: 0.5,
		DENSITY: 10,
		RESIST: 2
	},
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'smoothWithMotion',
	HITS_OWN_TYPE: 'hard',
	HAS_NO_MASTER: true,
	DRAW_HEALTH: true,
	GUNS: [],
	TURRETS: []
};
exports.sentry = {
	PARENT: [exports.genericTank],
	TYPE: 'crasher',
	LABEL: 'Sentry',
	DANGER: 3,
	ACCEL: 0.01,
	COLOR: 5,
	SHAPE: 3,
	SIZE: 10,
	SKILL: skillSet({
		rld: 0.5,
		dam: 0.8,
		pen: 0.8,
		str: 0.1,
		spd: 1,
		atk: 0.5,
		hlt: 0,
		shi: 0,
		rgn: 0.7,
		mob: 0,
	}),
	VALUE: 1500,
	VARIES_IN_SIZE: true,
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		NO_LEAD: true,
	},
	BODY: {
		FOV: 0.5,
		ACCEL: 0.006,
		SPEED: base.SPEED / 2,
	},
	MOTION_TYPE: 'motor',
	FACING_TYPE: 'smoothToTarget',
	HITS_OWN_TYPE: 'hard',
	HAS_NO_MASTER: true,
	DRAW_HEALTH: true,
	CAN_BE_ON_LEADERBOARD: false,
	GIVE_KILL_MESSAGE: true,
};
exports.sentrySwarm = {
	PARENT: [exports.sentry],
	DANGER: 3,
	GUNS: [{
		POSITION: [7, 14, 0.6, 7, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm,
		},
	}],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', {
	type: exports.heavy3gun,
	size: 12,
});
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', {
	type: exports.trapTurret,
	size: 12,
});
exports.miniboss = {
	PARENT: [exports.genericTank],
	TYPE: 'miniboss',
	DANGER: 6,
	CAN_BE_ON_LEADERBOARD: false,
	SKILL: skillSet({
		rld: 0.7,
		dam: 0.5,
		pen: 0.8,
		str: 0.8,
		spd: 0.2,
		atk: 0.3,
		hlt: 1,
		shi: 0.7,
		rgn: 0.7,
		mob: 0,
	}),
	LEVEL: 45,
	CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
	AI: {
		NO_LEAD: true,
	},
	FACING_TYPE: 'autospin',
	HITS_OWN_TYPE: 'hard',
	BROADCAST_MESSAGE: 'A boss has been killed!',
};
exports.elite = {
	PARENT: [exports.miniboss],
	LABEL: 'Elite Crasher',
	COLOR: 5,
	SHAPE: 3,
	SIZE: 20,
	VARIES_IN_SIZE: true,
	VALUE: 15e4,
	BODY: {
		FOV: 1.3,
		SPEED: base.SPEED * 0.25,
		HEALTH: base.HEALTH * 1.5,
		SHIELD: base.SHIELD * 1.25,
		DAMAGE: base.DAMAGE * 2.5,
	},
};
exports.boss_ai = {
	PARENT: [exports.genericTank],
	LABEL: 'AI',
	LEVEL: 45,
	CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
	AI: {
		NO_LEAD: false,
	},
	HITS_OWN_TYPE: 'hard',
	CAN_BE_ON_LEADERBOARD: false,
	BROADCAST_MESSAGE: 'A boss has been killed!',
	VALUE: 15e4,
};
exports.elite_destroyer = {
	PARENT: [exports.elite],
	LABEL: 'Elite Destroyer',
	BODY: {
		FOV: 1.15,
		HEALTH: base.HEALTH * 25,
		SHIELD: base.SHIELD * 1.5,
		DAMAGE: base.DAMAGE * 2,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.75
	},
	GUNS: [{
		POSITION: [5, 16, 1, 6, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 16, 1, 6, 0, 60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 16, 1, 6, 0, -60, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
			TYPE: exports.bullet
		}
	}],
	TURRETS: [{
		POSITION: [11, 0, 0, 180, 360, 0],
		TYPE: exports.crasherSpawner2
	}, {
		POSITION: [11, 0, 0, 60, 360, 0],
		TYPE: exports.crasherSpawner2
	}, {
		POSITION: [11, 0, 0, -60, 360, 0],
		TYPE: exports.crasherSpawner2
	}, {
		POSITION: [11, 0, 0, 0, 360, 1],
		TYPE: [exports.bigAuto3Gun, {
			INDEPENDENT: true,
			COLOR: 5
		}]
	}],
	BROADCAST_MESSAGE: 'An Elite Destroyer has been killed!'
};
exports.elite_gunner = {
	PARENT: [exports.elite],
	GUNS: [{
		POSITION: [14, 16, 1, 0, 0, 180, 0],
	}, {
		POSITION: [4, 16, 1.5, 14, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: [exports.pillbox, {
				INDEPENDENT: true,
			}],
		},
	}, {
		POSITION: [6, 14, -2, 2, 0, 60, 0],
	}, {
		POSITION: [6, 14, -2, 2, 0, 300, 0],
	}],
	AI: {
		NO_LEAD: false,
	},
	TURRETS: [{
		POSITION: [14, 8, 0, 60, 180, 0],
		TYPE: [exports.auto4gun],
	}, {
		POSITION: [14, 8, 0, 300, 180, 0],
		TYPE: [exports.auto4gun],
	}],
};
exports.elite_sprayer = {
	PARENT: [exports.elite],
	AI: {
		NO_LEAD: false,
	},
	TURRETS: [{
		POSITION: [14, 6, 0, 180, 190, 0],
		TYPE: [exports.spray, {
			COLOR: 5,
		}],
	}, {
		POSITION: [14, 6, 0, 60, 190, 0],
		TYPE: [exports.spray, {
			COLOR: 5,
		}],
	}, {
		POSITION: [14, 6, 0, -60, 190, 0],
		TYPE: [exports.spray, {
			COLOR: 5,
		}],
	}, ],
};
exports.octogeddon = {
	PARENT: [exports.boss_ai],
	LABEL: 'Octogeddon',
	SIZE: 25,
	SHAPE: 8,
	COLOR: 2,
	HAS_SKILL_POINTS: false,
	SKILL: skillSet({
		rld: 1,
		dam: 0.9,
		pen: 0.9,
		str: 0.9,
		spd: 1,
		atk: 0.9,
		hlt: 0.9,
		shi: 0.9,
		rgn: 0.9,
		mob: 0.9,
	}),
	BODY: {
		FOV: 1.15,
		HEALTH: 1000,
		DAMAGE: base.DAMAGE * 1.25,
		REGEN: base.REGEN * 0.75,
		SPEED: base.SPEED * 0.4,
		ACCELARATION: base.ACCEL * 0.25,
	},
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [6, 5, 0, 0, 360, 1],
		TYPE: exports.superHeavyGun,
	}, {
		POSITION: [6, 5, 0, 120, 360, 1],
		TYPE: exports.superHeavyGun,
	}, {
		POSITION: [6, 5, 0, 240, 360, 1],
		TYPE: exports.superHeavyGun,
	}, {
		POSITION: [6, 10, 0, 0, 160, 0],
		TYPE: exports.octo_trap_turret,
	}, {
		POSITION: [6, 10, 0, 45, 160, 0],
		TYPE: exports.octo_trap_turret,
	}, {
		POSITION: [6, 10, 0, 90, 160, 0],
		TYPE: exports.octo_trap_turret,
	}, {
		POSITION: [6, 10, 0, 135, 160, 0],
		TYPE: exports.octo_trap_turret,
	}, {
		POSITION: [6, 10, 0, 180, 160, 0],
		TYPE: exports.octo_trap_turret,
	}, {
		POSITION: [6, 10, 0, 225, 160, 0],
		TYPE: exports.octo_trap_turret,
	}, {
		POSITION: [6, 10, 0, 270, 160, 0],
		TYPE: exports.octo_trap_turret,
	}, {
		POSITION: [6, 10, 0, 315, 160, 0],
		TYPE: exports.octo_trap_turret,
	}],
};
exports.arena_closer_ai = {
	PARENT: [exports.genericTank],
	LABEL: 'Arena Closer',
	NAME: 'Arena Closer',
	HITS_OWN_TYPE: 'hard',
	DANGER: 20,
	SIZE: 60,
	COLOR: 13,
	LAYER: 13,
	DONT_HIT_OBSTACLES: true,
	SKILL: skillSet({
		dam: 1,
		pen: 1,
		str: 1
	}),
	BODY: {
		SHIELD: 1e6,
		REGEN: 1e6,
		HEALTH: 1e6,
		DENSITY: 30,
		FOV: 50,
		SPEED: 8
	},
	AI: {
		skynet: true
	},
	GUNS: [{
		POSITION: [14, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.closer_ai, g.double_reload]),
			TYPE: [exports.bullet, {
				DIES_TO_TEAM_BASE: false,
				DONT_HIT_OBSTACLES: true,
				LAYER: 12
			}]
		}
	}],
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	DRAW_HEALTH: false,
	CAN_GO_OUTSIDE_ROOM: true,
	CAN_BE_ON_LEADERBOARD: false,
	DIES_TO_TEAM_BASE: false
};
exports.fallen_overlord = {
	PARENT: [exports.genericTank],
	LABEL: 'Fallen Overlord',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	SIZE: 20,
	COLOR: 18,
	LEVEL: 60,
	TYPE: 'miniboss',
	FACING_TYPE: 'autospin',
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		NO_LEAD: true
	},
	SKILL: skillSet({
		rld: 1,
		dam: 0.8,
		pen: 0.8,
		str: 0.8,
		spd: 1
	}),
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.25,
		FOV: 1.1,
		HEALTH: 3000
	},
	MAX_CHILDREN: 28,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.fallen]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 180, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.fallen]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.fallen]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 0, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.fallen]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}],
	CAN_BE_ON_LEADERBOARD: false,
	BROADCAST_MESSAGE: 'The Fallen Overlord has been killed!'
};
exports.fallen_booster = {
	PARENT: [exports.genericTank],
	TYPE: 'miniboss',
	LABEL: 'Fallen Booster',
	FACING_TYPE: 'smoothToTarget',
	COLOR: 18,
	SIZE: 20,
	LEVEL: 60,
	VALUE: 3e4,
	SKILL: skillSet({
		rld: 1,
		dam: 0.2,
		pen: 0.2,
		str: 0.2,
		spd: 0.5
	}),
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		skynet: true
	},
	BODY: {
		HEALTH: 1500,
		REGEN: base.REGEN * 0.5,
		ACCELARATION: base.ACCEL * 0.75,
		DENSITY: 0.15
	},
	DANGER: 8,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.much_more_recoil]),
			TYPE: exports.bullet,
		}
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}],
	CAN_BE_ON_LEADERBOARD: false,
	BROADCAST_MESSAGE: 'The Fallen Booster has been killed!'
};
exports.ultraElite = makeAuto({
	PARENT: [exports.genericTank],
	DANGER: 8,
	SHAPE: 5,
	SIZE: 22,
	COLOR: 2,
	FACING_TYPE: 'autospin',
	BODY: {
		HEALTH: 2000
	},
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 190, 0],
		TYPE: exports.skimturret
	}, {
		POSITION: [11, 8, 0, 72, 190, 0],
		TYPE: exports.spray
	}, {
		POSITION: [11, 8, 0, 144, 190, 0],
		TYPE: exports.skimturret
	}, {
		POSITION: [11, 8, 0, 216, 190, 0],
		TYPE: exports.skimturret
	}, {
		POSITION: [11, 8, 0, 288, 190, 0],
		TYPE: exports.spray
	}]
}, 'Ultra Elite', {
	type: exports.bigAuto3Gun
});
exports.auto8gun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2.75
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.half_recoil, g.one_fourth_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.auto8 = {
	PARENT: [exports.genericTank],
	LABEL: 'Auto-8',
	FACING_TYPE: 'autospin',
	DANGER: 7,
	TURRETS: [{
		POSITION: [8, 8, 0, 0, 180, 0],
		TYPE: exports.auto8gun,
	}, {
		POSITION: [8, 8, 0, 45, 180, 0],
		TYPE: exports.auto8gun,
	}, {
		POSITION: [8, 8, 0, 90, 180, 0],
		TYPE: exports.auto8gun,
	}, {
		POSITION: [8, 8, 0, 135, 180, 0],
		TYPE: exports.auto8gun,
	}, {
		POSITION: [8, 8, 0, 180, 180, 0],
		TYPE: exports.auto8gun,
	}, {
		POSITION: [8, 8, 0, 225, 180, 0],
		TYPE: exports.auto8gun,
	}, {
		POSITION: [8, 8, 0, 270, 180, 0],
		TYPE: exports.auto8gun,
	}, {
		POSITION: [8, 8, 0, 315, 180, 0],
		TYPE: exports.auto8gun,
	}],
};
exports.auto4old = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Auto-4',
	TURRETS: [{
		POSITION: [10, 8, 0, 45, 160, 0],
		TYPE: exports.auto3gun,
	}, {
		POSITION: [10, 8, 0, 135, 160, 0],
		TYPE: exports.auto3gun,
	}, {
		POSITION: [10, 8, 0, 225, 160, 0],
		TYPE: exports.auto3gun,
	}, {
		POSITION: [10, 8, 0, 315, 160, 0],
		TYPE: exports.auto3gun,
	}],
};
exports.stalk = {
	PARENT: [exports.genericTank],
	LABEL: 'Stalker',
	INVISIBLE: [0.1, 0.05, 0.01],
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: 1.35
	},
	GUNS: [{
		POSITION: [25, 8.5, -1.75, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.less_recoil]),
			TYPE: exports.bullet
		}
	}]
};
exports.landmineBody = {
	CONTROLLERS: ['slowSpin'],
	COLOR: 9,
	SHAPE: 6,
	INDEPENDENT: true
};
exports.landmine = {
	PARENT: [exports.genericTank],
	LABEL: 'Landmine',
	INVISIBLE: [0.08, 0.01, 0.01],
	DANGER: 7,
	BODY: {
		FOV: 1.05,
		DENSITY: base.DENSITY * 2
	},
	TURRETS: [{
		POSITION: [21.5, 0, 0, 0, 360, 0],
		TYPE: exports.smasherBody
	}, {
		POSITION: [21.5, 0, 0, 90, 360, 0],
		TYPE: exports.landmineBody
	}],
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher
};
exports.manager = {
	PARENT: [exports.genericTank],
	LABEL: 'Manager',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: 1.25
	},
	INVISIBLE: [0.8, 0.03, 0.01],
	MAX_CHILDREN: 8,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.more_reload]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone
		}
	}]
};
exports.derogatorGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 1.75
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [22, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.one_third_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.derogator = makeAuto({
	PARENT: [exports.genericTank],
	DANGER: 8,
	COLOR: 2,
	SHAPE: 16,
	SIZE: 30,
	FACING_TYPE: 'spinSlowly',
	BODY: {
		SPEED: 1.5,
		ACCELERATION: 1.2,
		HEALTH: 1250,
		SHIELD: 6,
		DAMAGE: 4,
		REGEN: 0.02125
	},
	TURRETS: [{
		POSITION: [3.75, 10, 0, 0, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 22.5, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 45, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 67.5, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 90, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 112.5, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 135, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 157.5, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 180, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 202.5, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 225, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 247.5, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 270, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 292.5, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 315, 45, 0],
		TYPE: exports.derogatorGun
	}, {
		POSITION: [3.75, 10, 0, 337.5, 45, 0],
		TYPE: exports.derogatorGun
	}]
}, 'Derogator', {
	type: exports.superHeavyGun,
	size: 6
});
exports.hexadecagor = {
	PARENT: [exports.genericTank],
	LABEL: 'Hexadecagor',
	FACING_TYPE: 'spinSlowly',
	SIZE: 30,
	SHAPE: 16,
	DANGER: 8,
	BODY: {
		HEALTH: 2500,
		SPEED: base.SPEED * 0.25,
		ACCELARATION: base.ACCEL * 0.5,
		FOV: 0.85
	},
	GUNS: [{
		POSITION: [2.2, 2.25, 1, 9, 0, 0, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 22.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 22.5, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 45, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 45, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 67.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 67.5, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 90, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 112.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 112.5, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 135, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 135, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 157.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 157.5, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 180, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 202.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 202.5, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 225, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 225, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 247.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 247.5, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 270, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 292.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 292.5, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 315, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 315, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}, {
		POSITION: [2.2, 2.25, 1, 9, 0, 337.5, 0]
	}, {
		POSITION: [0.5, 2.25, 1.7, 11.5, 0, 337.5, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trapperDominator, g.one_third_reload, g.low_damage]),
			TYPE: exports.trap
		}
	}],
	TURRETS: [{
		POSITION: [4.85, 6.5, 0, 0, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [4.85, 6.5, 0, 90, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [4.85, 6.5, 0, 180, 360, 1],
		TYPE: exports.superHeavyGun
	}, {
		POSITION: [4.85, 6.5, 0, 270, 360, 1],
		TYPE: exports.superHeavyGun
	}]
};
exports.Spawner = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega Spawner',
	STAT_NAMES: statNames.trap,
	DANGER: 7,
	//COLOR_OVERRIDE: 3,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [20, 10, 0.0001, 8, 0, 0, 0]
	}, {
		POSITION: [18, 18, 0.7, 0, 0, 0, 0]
	}, {
		POSITION: [3, 18, 1.2, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct, g.double_reload]),
			TYPE: [exports.mothership, {
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
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'mapTargetToGoal', 'hangOutNearMaster'],
				//CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
				DRAW_HEALTH: false,
				CLEAR_ON_MASTER_UPGRADE: true,
				GIVE_KILL_MESSAGE: false,
				CAN_BE_ON_LEADERBOARD: false
			}],
			MAX_CHILDREN: 6
		}
	}]
};
exports.Low = {
	PARENT: [exports.genericTank],
	LABEL: 'Lower',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.90,
		FOV: 0.75
	},
	GUNS: [{
		POSITION: [19, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.double_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5.5, 8, -1.8, 6.5, 0, 0, 0]
	}]
};
exports.FactoryAuto = {
	PARENT: [exports.genericTank],
	LABEL: 'Factory-3',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: 1.1
	},
	MAX_CHILDREN: 6,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 190, 0],
		SHOOT_SETTINGS: combineStats([g.factory]),
		TYPE: exports.factory
	}, {
		POSITION: [11, 8, 0, 120, 190, 0],
		SHOOT_SETTINGS: combineStats([g.factory]),
		TYPE: exports.factory
	}, {
		POSITION: [11, 8, 0, 240, 190, 0],
		SHOOT_SETTINGS: combineStats([g.factory]),
		TYPE: exports.factory
	}]
};
exports.mothershipAI = {
	PARENT: [exports.mothership],
	COLOR: 8,
	VALUE: 1e5,
	CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
	AI: {
		NO_LEAD: true,
		FOV: 2
	},
	CAN_BE_ON_LEADERBOARD: false,
	HITS_OWN_TYPE: 'hard',
	SKILL: skillSet({
		dam: 0.8,
		pen: 0.8,
		str: 0.8,
		spd: 0.7,
		mob: 0.3
	}),
	BROADCAST_MESSAGE: 'The Mothership has been defeated!'
};
exports.borerAutoGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	BODY: {
		FOV: 2.25
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [20, 3.5, 1, 0, 3.65, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast, g.stronger, g.bore, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 3.5, 1, 0, -3.65, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pure_gunner, g.fast, g.stronger, g.bore, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.teleporterTurret = {
	SHAPE: 8,
	CONTROLLERS: ['spin'],
	INDEPENDENT: true,
	COLOR: 16,
};
exports.propTurret = {
	COLOR: 16,
	GUNS: [],
	TURRETS: []
};
exports.aiBullet = {
	PARENT: [exports.drone],
	LABEL: 'Homing Bullet',
	SHAPE: 0,
	AI: {
		BLIND: true,
		FARMER: true
	},
	BODY: {
		PENETRATION: 1,
		SPEED: 3.75,
		RANGE: 90,
		DENSITY: 1.25,
		HEALTH: 0.165,
		DAMAGE: 6,
		PUSHABILITY: 0.3,
		ACCELERATION: 0.05,
		RESIST: 1.5,
		FOV: 0.75
	},
	TURRETS: [{
		POSITION: [9, 0, 0, 0, 0, 1],
		TYPE: exports.propTurret
	}],
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	HITS_OWN_TYPE: 'never',
	INDEPENDENT: true,
	DIE_AT_RANGE: true
};
exports.homing = {
	PARENT: [exports.genericTank],
	LABEL: 'Homing Shot',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, -3, -45, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 3, 45, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 8, 1, 0, -2, -22.5, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.low_power]),
			TYPE: exports.aiBullet
		}
	}, {
		POSITION: [14, 8, 1, 0, 2, 22.5, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.low_power]),
			TYPE: exports.aiBullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}]
};
exports.FallenBooster = {
	PARENT: [exports.genericTank],
	LABEL: 'Fallen Booster',
	HAS_NO_SKILL_POINTS: false,
	GIVE_KILL_MESSAGE: true,
	CAN_BE_ON_LEADERBOARD: false,
	COLOR: 18,
	SIZE: 22,
	LEVEL: 45,
	DIES_TO_TEAM_BASE: false,
	SKILL: [9, 4, 4, 4, 5, 0, 9, 9, 0, 9],
	BODY: {
		HEALTH: 3000,
		SHIELD: base.SHIELD * 0.75,
		SPEED: base.SPEED * 0.95,
		ACCEL: base.ACCEL * 0.95,
		DENSITY: base.DENSITY * 0.5,
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.much_more_recoil]),
			TYPE: exports.bullet,
			LABEL: 'Front',
		},
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster,
		},
	}],
};
exports.masterSpark = {
	PARENT: [exports.genericTank],
	LABEL: 'Master Spark',
	DANGER: 7,
	COLOR: 29,
	COLOR_OVERRIDE: 30,
	LAYER: 13,
	DIES_TO_TEAM_BASE: false,
	TEAM: -6,
	BODY: {
		SPEED: base.SPEED * 0.5,
		ACCELERATION: base.ACCEL * 0.75,
		HEALTH: 2500,
		SHIELD: 8,
		DAMAGE: 6,
		FOV: 1.45
	},
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.more_damage]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.more_damage, g.no_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.more_damage]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 45, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.more_damage]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 135, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.more_damage]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 225, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.more_damage]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 315, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam, g.more_damage]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 19.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.op2]),
			TYPE: [exports.bullet, {
				DONT_HIT_OBSTACLES: true,
				DIES_TO_TEAM_BASE: false,
				LAYER: 12
			}]
		}
	}]
};
exports.ultraSmash = {
	PARENT: [exports.genericTank],
	LABEL: 'Ultra Smasher',
	DANGER: 8,
	COLOR: 33,
	BODY: {
		FOV: 1.15,
		DENSITY: base.DENSITY * 5,
		HEALTH: base.HEALTH * 3,
		DAMAGE: base.DAMAGE * 2,
		RESIST: 2,
		SPEED: base.SPEED * 1.75
	},
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher,
	TURRETS: [{
		POSITION: [27, 0, 0, 0, 360, 0],
		TYPE: exports.megaSmashBody
	}]
};
exports.stalkDev = {
	PARENT: [exports.stalk],
	NAME: 'Developer',
	COLOR: 12,
	TEAM: -5,
	GUNS: [{
		POSITION: [25, 8.5, -1.75, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.half_recoil, g.more_damage]),
			TYPE: exports.bullet
		}
	}],
	BODY: {
		RESIST: 100,
		PUSHABILITY: 0
	},
	CAN_BE_ON_LEADERBOARD: false
};
exports.pounder = {
	PARENT: [exports.genericTank],
	DANGER: 4,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75
	},
	LABEL: 'Pounder',
	GUNS: [{
		POSITION: [19, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pounder]),
			TYPE: exports.bullet
		}
	}]
};
exports.flankLiner = {
	PARENT: [exports.genericTank],
	LABEL: 'Flank-Liner',
	DANGER: 7,
	GUNS: [{
		POSITION: [18, 8, 1, 0, 2, 20, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8, 1, 0, 2, 20, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 8, 1, 0, 2, 20, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, -2, -20, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8, 1, 0, -2, -20, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 8, 1, 0, -2, -20, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 0, 0, 0.2],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 8, 1, 0, 0, 0, 0.4],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 8, 1, 0, 0, 0, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8, 1, 0, 0, 0, 0.8],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}]
};
exports.branch = {
	PARENT: [exports.genericTank],
	LABEL: 'Branch',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.65,
		SPEED: base.SPEED * 0.75,
		FOV: 1.6
	},
	GUNS: [{
		POSITION: [34, 8.5, -1.45, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.branch]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [6, 10.25, -1.5, 7, 0, 0, 0]
	}]
};
exports.hotshot = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega Shot',
	DANGER: 7,
	BODY: {
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [22, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.hotshot]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 12, 1, 0, 0, 0, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.hotshot]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 12, 1, 0, 0, 0, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound, g.hotshot]),
			TYPE: exports.bullet
		}
	}]
};
exports.recruit = {
	PARENT: [exports.genericTank],
	LABEL: 'Shredder',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	FACING_TYPE: 'locksFacing',
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 2, 40, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -2, -40, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [8, 7.5, 0.6, 7, 1, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [8, 7.5, 0.6, 7, -1, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.teleporter = {
	PARENT: [exports.genericTank],
	LABEL: 'Teleporter',
	DANGER: 8,
	IS_TELEPORTER: true,
	BODY: {
		FOV: 0.9,
		DENSITY: base.DENSITY * 2,
		SPEED: base.SPEED * 0.8
	},
	TURRETS: [{
		POSITION: [24, 0, 0, 0, 360, 0],
		TYPE: exports.teleporterBody
	}, {
		POSITION: [10, 0, 0, 0, 360, 1],
		TYPE: exports.teleporterTurret
	}],
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher
};
/*exports.triBuilder = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Triple Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: 3.94,
		ACCELERATION: 0.8,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [18, 12, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 12, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.tri_builder]),
			TYPE: exports.block
		}
	}, {
		POSITION: [2, 12, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.tri_builder]),
			TYPE: exports.block
		}
	}, {
		POSITION: [2, 12, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.tri_builder]),
			TYPE: exports.block
		}
	}]
};*/
exports.triBuilder = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Triple Trapper',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: 3.94,
		ACCELERATION: 0.8,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [2, 10, 1.1, 14, -6, 20, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.tri_builder]),
			TYPE: exports.block
		}
	}, {
		POSITION: [2, 10, 1.1, 14, 6, -20, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.tri_builder]),
			TYPE: exports.block
		}
	}, {
		POSITION: [18, 12, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 12, 1.1, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.tri_builder]),
			TYPE: exports.block
		}
	}]
};
exports.flamethrow = {
	PARENT: [exports.genericTank],
	LABEL: 'Flamethrower',
	DANGER: 7,
	BODY: {
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [18, 0.1, -145, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
			TYPE: exports.bullet
		}
	}]
};
exports.fireTrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Flame Trapper',
	DANGER: 7,
	BODY: {
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [17, 0.1, -145, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 11, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 11, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.half_recoil]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.twinFlame = {
	PARENT: [exports.genericTank],
	LABEL: 'Dual Thrower',
	DANGER: 7,
	BODY: {
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [18, 0.1, -145, 0, 2, 20, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 8.5, 1, 0, 2, 20, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 0.1, -145, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 8.5, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
			TYPE: exports.bullet
		}
	}]
};

exports.overload = {
	PARENT: [exports.genericTank],
	LABEL: 'Overloader',
	DANGER: 7,
	GUNS: [{
		POSITION: [15.1, 3, 1, 0, 3.35, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.overload, g.fast, g.more_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15.1, 3, 1, 0, -3.35, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.overload, g.fast, g.more_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [11, 4, 1, 0, 5, 0, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.overload, g.fast, g.more_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [11, 4, 1, 0, -5, 0, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.overload, g.fast, g.more_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 4, 1, 0, 0, 0, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.overload, g.fast, g.more_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.burst = {
	PARENT: [exports.genericTank],
	LABEL: 'Burst Shot',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.85
	},
	GUNS: [{
		POSITION: [13, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.fast, g.fast, g.less_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.trapper = {
	PARENT: [exports.genericTank],
	LABEL: 'Trapper',
	DANGER: 6,
	STAT_NAMES: statNames.trap,
	GUNS: [{
		POSITION: [13, 8.5, 1, 0, 0, 0, 0]
	}, {
		POSITION: [3.5, 8.5, 1.85, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.triTrapper = {
	PARENT: [exports.genericTank],
	LABEL: 'Tri-Trapper',
	DANGER: 6,
	STAT_NAMES: statNames.trap,
	GUNS: [{
		POSITION: [13, 8.5, 1, 0, 0, 0, 0]
	}, {
		POSITION: [3.5, 8.5, 1.85, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.bit_less_power]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 0, 0]
	}, {
		POSITION: [3.5, 8.5, 1.85, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.bit_less_power]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap,
		},
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 0, 0]
	}, {
		POSITION: [3.5, 8.5, 1.85, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.bit_less_power]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.heptaTrap = {
	PARENT: [exports.genericTank],
	LABEL: 'Hepta-Trapper',
	DANGER: 7,
	BODY: {
		SPEED: 3.94,
		ACCELERATION: 1.2
	},
	STAT_NAMES: statNames.trap,
	HAS_NO_RECOIL: true,
	GUNS: [{
		POSITION: [15, 7, 1, 0, 0, 0, 0]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 51.4286, 4/7]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 51.4286, 4/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 102.8572, 1/7]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 102.8572, 1/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 154.2858, 5/7]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 154.2858, 5/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 205.7144, 2/7]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 205.7144, 2/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 257.143, 6/7]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 257.143, 6/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}, {
		POSITION: [15, 7, 1, 0, 0, 308.5716, 3/7]
	}, {
		POSITION: [3, 7, 1.7, 15, 0, 308.5716, 3/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.droneDominator = {
	PARENT: [exports.genericTank],
	LABEL: 'Drone Dominator',
	DANGER: 10,
	SIZE: 30,
	BODY: {
		FOV: 1.15,
		HEALTH: 6148,
		SHIELD: base.SHIELD * 1.25,
		REGEN: base.REGEN * 0.75,
		RESIST: 50,
		PUSHABILITY: 0.15,
	},
	FACING_TYPE: 'autospin',
	GUNS: [{
		POSITION: [3.75, 4, 1.2, 8.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [3.75, 4.45, -1.6, 7.2, 0, 0, 0]
	}, {
		POSITION: [3.75, 4, 1.2, 8.5, 0, 60, 1/6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [3.75, 4.45, -1.6, 7.2, 0, 60, 0]
	}, {
		POSITION: [3.75, 4, 1.2, 8.5, 0, 120, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [3.75, 4.45, -1.6, 7.2, 0, 120, 0]
	}, {
		POSITION: [3.75, 4, 1.2, 8.5, 0, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [3.75, 4.45, -1.6, 7.2, 0, 180, 0]
	}, {
		POSITION: [3.75, 4, 1.2, 8.5, 0, 240, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [3.75, 4.45, -1.6, 7.2, 0, 240, 0]
	}, {
		POSITION: [3.75, 4, 1.2, 8.5, 0, 300, 5/6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.drone_dominator]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [3.75, 4.45, -1.6, 7.2, 0, 300, 0]
	}],
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.dominationBody
	}],
	GIVE_KILL_MESSAGE: true
};
exports.undership = {
	PARENT: [exports.genericTank],
	LABEL: 'Undership',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	FACING_TYPE: 'locksFacing',
	BODY: {
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: exports.autoswarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 4, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: exports.autoswarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 180, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 4, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: exports.autoswarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 90, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, 4, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: exports.autoswarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.one_third_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['canRepel']
			}],
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.Bigboomer = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Mega Boomer',
	STAT_NAMES: statNames.trap,
	FACING_TYPE: 'locksFacing',
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [5, 10, 1, 14, 0, 0, 0]
	}, {
		POSITION: [2.25, 10, -1.5, 12, 0, 0, 0]
	}, {
		POSITION: [12, 15, 1, 0, 0, 0, 0]
	}, {
		POSITION: [2, 10, 1.3, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.mega_boomerang]),
			TYPE: exports.boomerang
		}
	}]
	/*GUNS: [{
		POSITION: [5, 15, 1, 14, 0, 0, 0]
	}, {
		POSITION: [6, 10, -1.5, 7, 0, 0, 0]
	}, {
		POSITION: [2, 20, 1.3, 18, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
			TYPE: exports.boomerang
		}
	}]*/
};
exports.megaFlamethrow = {
	PARENT: [exports.genericTank],
	LABEL: 'Spray',
	DANGER: 7,
	BODY: {
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [19, 0.1, -188, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mega_flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [14, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mega_flame]),
			TYPE: exports.bullet
		}
	}]
};
exports.overCruiser = {
	PARENT: [exports.genericTank],
	LABEL: 'Overcruiser',
	DANGER: 7,
	FACING_TYPE: 'locksFacing',
	STAT_NAMES: statNames.swarm,
	BODY: {
		ACCELERATION: 0.8,
		SPEED: 3.94,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 125, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}, {
		POSITION: [6, 11, 1.2, 8, 0, 235, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true,
			MAX_CHILDREN: 2
		}
	}]
};
exports.dragon = {
	PARENT: [exports.genericTank],
	LABEL: 'Dragon',
	DANGER: 7,
	BODY: {
		HEALTH: base.HEALTH * 0.75,
		SHIELD: base.SHIELD * 0.75,
		DENSITY: base.DENSITY * 0.25
	},
	GUNS: [{
		POSITION: [18, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front, g.much_more_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8, 1, 0, -1, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8, 1, 0, 1, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.tri_front]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8, 1, 0, -1, 120, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [13, 8, 1, 0, 1, 240, 0.6],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.destroyMinion = {
	PARENT: [exports.minion],
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.minion]),
			TYPE: exports.bullet
		}
	}]
};
exports.fatFactory = {
	PARENT: [exports.genericTank],
	LABEL: 'Destroyer Factory',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		SPEED: base.SPEED * 0.5,
		ACCELERATION: base.ACCEL * 0.75,
		FOV: 1.1
	},
	MAX_CHILDREN: 4,
	GUNS: [{
		POSITION: [5, 13, 1, 10.5, 0, 0, 0]
	}, {
		POSITION: [2, 16, 1, 15.5, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory]),
			TYPE: exports.destroyMinion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [4, 16, 1, 8, 0, 0, 0]
	}]
};
exports.assassinMinion = {
	PARENT: [exports.minion],
	BODY: {
		FOV: 0.6,
		SPEED: 2.75,
		ACCELERATION: 0.25,
		HEALTH: 5,
		SHIELD: 0,
		DAMAGE: 1.2,
		RESIST: 1,
		PENETRATION: 1,
		DENSITY: 0.4
	},
	GUNS: [{
		POSITION: [27, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.minion]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [5, 8.5, -1.6, 8, 0, 0, 0]
	}]
};
exports.sniperFactory = {
	PARENT: [exports.genericTank],
	LABEL: 'Assassin Factory',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		SPEED: 3.94,
		ACCELERATION: 0.8,
		FOV: 1.1
	},
	MAX_CHILDREN: 3,
	GUNS: [{
		POSITION: [4.5, 10, 1, 10.5, 0, 0, 0]
	}, {
		POSITION: [1, 12, 1, 15, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory]),
			TYPE: exports.assassinMinion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [3.5, 12, -1.15, 8, 0, 0, 0]
	}]
};
exports.twinMinion = {
	PARENT: [exports.minion],
	GUNS: [{
		POSITION: [17, 7.75, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 7.75, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
			TYPE: exports.bullet
		}
	}]
};
exports.twinFactory = {
	PARENT: [exports.genericTank],
	LABEL: 'Twin Factory',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		SPEED: base.SPEED * 0.75,
		FOV: 1.1
	},
	MAX_CHILDREN: 4,
	GUNS: [{
		POSITION: [5, 6, 1, 10.5, 5.5, 0, 0]
	}, {
		POSITION: [2, 7.5, 1, 15.5, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.double_size]),
			TYPE: exports.twinMinion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [8, 7.5, 1, 4, 5.5, 0, 0]
	}, {
		POSITION: [5, 6, 1, 10.5, -5.5, 0, 0]
	}, {
		POSITION: [2, 7.5, 1, 15.5, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.factory, g.double_size]),
			TYPE: exports.twinMinion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}, {
		POSITION: [8, 7.5, 1, 4, -5.5, 0, 0]
	}]
};
exports.skimskim = {
	PARENT: [exports.genericTank],
	LABEL: 'Mega Skimmer',
	DANGER: 7,
	BODY: {
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [12, 17, -0.5, 9, 0, 0, 0]
	}, {
		POSITION: [19, 18, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.bit_more_power, g.more_speed, g.more_speed]),
			TYPE: exports.hypermissile2,
			STAT_CALCULATOR: gunCalcNames.sustained
		}
	}]
};
exports.heopr67d = {
	PARENT: [exports.genericTank],
	LABEL: 'Koishi',
	ALPHA: 0.05,
	BODY: {
		RESIST: 1e6,
	},
	GOD_MODE: true,
	COLOR: 39,
	DANGER: 8,
	CAN_BE_ON_LEADERBOARD: false,
	TEAM: -100,
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.no_recoil]),
			TYPE: [exports.bullet, {
				ALPHA: 0.03
			}]
		}
	}, {
		POSITION: [13, 8, 1, 0, -1, 135, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: [exports.bullet, {
				ALPHA: 0.03
			}],
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [13, 8, 1, 0, 1, 225, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.half_recoil]),
			TYPE: [exports.bullet, {
				ALPHA: 0.03
			}],
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 145, 0.0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: [exports.bullet, {
				ALPHA: 0.03
			}],
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 215, 0.0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: [exports.bullet, {
				ALPHA: 0.03
			}],
			LABEL: gunCalcNames.thruster
		}
	}]
};
exports.cannon = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Cannoneer',
	GUNS: [{
		POSITION: [17, 3, 1, 0, -6.25, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.double_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 3, 1, 0, 6.25, 0, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.double_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
			TYPE: exports.bullet
		}
	}]
};
exports.cutter = {
	PARENT: [exports.genericTank],
	LABEL: 'X Predator',
	DANGER: 7,
	BODY: {
		ACCELERATION: 0.8,
		SPEED: 3.84,
		FOV: 1.3
	},
	GUNS: [{
		POSITION: [24, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.hunter2, g.preda]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [22, 11, 1, 0, 0, 0, 0.15],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [20, 14, 1, 0, 0, 0, 0.3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [18, 17, 1, 0, 0, 0, 0.45],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoMatonGun = {
	PARENT: [exports.genericTank],
	LABEL: '',
	SHAPE: 4,
	BODY: {
		FOV: 2
	},
	CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
	COLOR: 16,
	GUNS: [{
		POSITION: [26, 12, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 12, 1, 0, 0, 0, 1/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.half_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 12, 1, 0, 0, 0, 2/3],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.half_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoMaton = {
	PARENT: [exports.genericTank],
	LABEL: 'Automaton',
	DANGER: 7,
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 90, 0],
		TYPE: exports.autoMatonGun
	}]
};
exports.FatAtome = {
	PARENT: [exports.genericTank],
	LABEL: 'Decentralizer',
	BODY: {
		ACCELERATION: 0.8,
		SPEED: 3.85
	},
	DANGER: 7,
	GUNS: [{
		POSITION: [21, 19.5, 1.2, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.a_lotta_damage]),
			TYPE: exports.bullet
		}
	}]
};
exports.fatCruiser = {
	PARENT: [exports.genericTank],
	LABEL: 'Frigate',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	BODY: {
		ACCELERATION: 0.8,
		SPEED: 3.94,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [9, 12, 0.6, 5, 3, 25, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [9, 12, 0.6, 5, -3, -25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.fatCarrier = {
	PARENT: [exports.genericTank],
	LABEL: 'Fat Carrier',
	DANGER: 7,
	STAT_NAMES: statNames.swarm,
	BODY: {
		ACCELERATION: 0.8,
		SPEED: 3.75,
		FOV: 1.2
	},
	GUNS: [{
		POSITION: [9, 12, 0.6, 5, 3, 25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [9, 12, 0.6, 5, -3, -25, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}, {
		POSITION: [9, 11, 0.6, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
			TYPE: exports.swarm,
			STAT_CALCULATOR: gunCalcNames.swarm
		}
	}]
};
exports.guardian = {
	PARENT: [exports.genericTank],
	LABEL: 'Guardian',
	DANGER: 7,
	SHAPE: 3,
	COLOR: 5,
	SIZE: 20,
	MAX_CHILDREN: 24,
	TEAM: -100,
	DIES_TO_TEAM_BASE: false,
	STAT_NAMES: statNames.drone,
	SKILL: skillSet({
		hlt: 0.4,
		atk: 0.4,
		rld: 1,
		dam: 0.7,
		pen: 0.7,
		str: 0.7,
		spd: 1,
		mob: 0.1,
		rgn: 0.1,
		shi: 0.1
	}),
	BODY: {
		FOV: 1.25,
		HEALTH: 3000,
		REGEN: 0.0038,
		SPEED: 1.58,
		ACCELERATION: 1.04
	},
	HAS_NO_SKILL_POINTS: true,
	GUNS: [{
		POSITION: [6, 12, 1.25, 6, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.swarm, g.more_recoil, g.guardian, g.double_reload]),
			TYPE: [exports.swarm, {
				CONTROLLERS: ['nearestDifferentMaster', 'canRepel', 'hangOutNearMaster'],
				HITS_OWN_TYPE: 'hard',
				DIES_TO_TEAM_BASE: false
			}],
			STAT_CALCULATOR: gunCalcNames.swarm,
			AUTOFIRE: true
		}
	}]
};
exports.squareDrone = {
	PARENT: [exports.drone],
	SHAPE: 4,
	DIES_TO_TEAM_BASE: false
};
exports.summoner = {
	PARENT: [exports.genericTank],
	LABEL: 'Summoner',
	DANGER: 7,
	STAT_NAMES: statNames.necro,
	COLOR: 13,
	SIZE: 22,	
	COLOR_OVERRIDE: 32,
	TEAM: -100,
	DIES_TO_TEAM_BASE: false,
	SKILL: skillSet({
		hlt: 0.2,
		atk: 0.2,
		rld: 1,
		dam: 0.9,
		pen: 0.9,
		str: 0.9,
		spd: 0.4,
		rgn: 0.2,
		shi: 0.2
	}),
	HAS_NO_SKILL_POINTS: true,
	BODY: {
		ACCELERATION: 0.8,
		SPEED: 1.32,
		FOV: 1.1,
		HEALTH: 3000,
		REGEN: 0.0063
	},
	SHAPE: 4,
	FACING_TYPE: 'spinSlowly',
	MAX_CHILDREN: 28,
	GUNS: [{
		POSITION: [3.5, 8.65, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.summon]),
			TYPE: exports.squareDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [3.5, 8.65, 1.2, 8, 0, 270, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.summon]),
			TYPE: exports.squareDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [3.5, 8.65, 1.2, 8, 0, 0, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.summon]),
			TYPE: exports.squareDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [3.5, 8.65, 1.2, 8, 0, 180, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.summon]),
			TYPE: exports.squareDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}]
};
exports.guardianAI = {
	PARENT: [exports.guardian],
	NAME: 'Guardian',
	LEVEL: 45,
	TYPE: 'miniboss',
	TEAM: -100,
	DIES_TO_TEAM_BASE: false,
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
	AI: {
		NO_LEAD: true
	},
	BODY: {
		FOV: 1.25,
		RANGE: 50
	},
	BROADCAST_MESSAGE: 'The Guardian has been defeated!',
	CAN_BE_ON_LEADERBOARD: false
};
exports.summonerAI = {
	PARENT: [exports.summoner],
	NAME: 'Summoner',
	LEVEL: 45,
	TYPE: 'miniboss',
	TEAM: -100,
	DIES_TO_TEAM_BASE: false,
	CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
	AI: {
		NO_LEAD: true
	},
	BODY: {
		FOV: 1.25,
		RANGE: 50
	},
	BROADCAST_MESSAGE: 'The Summoner has been defeated!',
	CAN_BE_ON_LEADERBOARD: false
};
exports.observer = {
	PARENT: [exports.genericTank],
	LABEL: 'Observer',
	ALPHA: 0,
	BODY: {
		FOV: 4,
		SPEED: 16,
		ACCELERATION: 3.75,
		HEALTH: 1e66,
		SHIELD: 1e6,
		REGEN: 1e66,
		RESIST: 1e6,
		DAMAGE: 0.0001,
		PUSHABILITY: 0.15
	},
	DONT_HIT_OBSTACLES: true,
	HAS_NO_SKILL_POINTS: true,
	SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
	DIES_TO_TEAM_BASE: false,
	CAN_GO_OUTSIDE_ROOM: true,
	CAN_BE_ON_LEADERBOARD: false,
	PASSIVE: true
};
exports.bot = {
	ACCEPTS_SCORE: true,
	FACING_TYPE: 'looseToTarget',
	SIZE: 12,
	LEVEL: 60,
	CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'],
	AI: {
		STRAFE: true
	}
};
exports.bot2 = {
	ACCEPTS_SCORE: true,
	FACING_TYPE: 'looseToTarget',
	SIZE: 12,
	LEVEL: 60,
	CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal', 'fleeAtLowHealth2'],
	AI: {
		STRAFE: true
	}
};
exports.blaster = {
	PARENT: [exports.genericTank],
	LABEL: 'Blaster',
	BODY: {
		SPEED: 3.94
	},
	GUNS: [{
		POSITION: [9, 10, 1.6, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
			TYPE: exports.bullet
		}
	}]
};
exports.triBlaster = {
	PARENT: [exports.genericTank],
	LABEL: 'Tri-Blaster',
	BODY: {
		SPEED: 3.94
	},
	GUNS: [{
		POSITION: [9, 10, 1.6, 8, 2, 16, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.one_fourth_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [9, 10, 1.6, 8, -2, -16, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.one_fourth_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [11, 10, 1.6, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.one_fourth_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.gatling = {
	PARENT: [exports.genericTank],
	LABEL: 'Gatling Gun',
	DANGER: 7,
	BODY: {
		FOV: 1.1,
		SPEED: 4.5
	},
	GUNS: [{
		POSITION: [17, 10, 1.4, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
			TYPE: exports.bullet
		}
	}]
};
exports.twinBlaster = {
	PARENT: [exports.genericTank],
	LABEL: 'Dual Blaster',
	DANGER: 7,
	BODY: {
		SPEED: 3.94
	},
	GUNS: [{
		POSITION: [9, 10, 1.6, 12, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.fast]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [9, 10, 1.6, 7, 0, 0, 1],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.more_reload]),
			TYPE: exports.bullet
		}
	}]
};
exports.dust = {
	PARENT: [exports.genericTank],
	LABEL: 'Duster',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, 5.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, -5.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 3, 1, 0, -8, -7, 0.25],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 3, 1, 0, 8, 7, 0.75],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
			TYPE: exports.bullet
		}
	}]
};
exports.autoSmashTurret = {
	PARENT: [exports.genericTank],
	LABEL: '',
	COLOR: 16,
	GUNS: [{
		POSITION: [19, 6, 1, 0, -5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lots_more_recoil, g.half_reload, g.slow]),
			TYPE: exports.bullet,
			STAT_CALCULATOR: gunCalcNames.fixedReload
		}
	}, {
		POSITION: [19, 6, 1, 0, 5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lots_more_recoil, g.half_reload, g.slow]),
			TYPE: exports.bullet,
			STAT_CALCULATOR: gunCalcNames.fixedReload
		}
	}]
};
exports.skirmish = makeAuto({
	PARENT: [exports.genericTank],
	BODY: {
		HEALTH: base.HEALTH * 0.6,
		SHIELD: base.SHIELD * 0.5,
		DENSITY: base.DENSITY * 0.2
	},
	DANGER: 6,
	GUNS: [{
		POSITION: [16, 4, 1, 0, -3.5, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.tri, g.tri_front]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 4, 1, 0, 3.5, 0, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.tri, g.tri_front]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 150, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}, {
		POSITION: [16, 8, 1, 0, 0, 210, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
			TYPE: exports.bullet,
			LABEL: gunCalcNames.thruster
		}
	}]
}, 'Skirmisher', {
	type: exports.autoSmashTurret
});
exports.FuckLiner = {
	PARENT: [exports.genericTank],
	LABEL: 'Slider',
	DANGER: 7,
	BODY: {
		SPEED: base.SPEED * 0.85,
		ACCELERATION: base.ACCEL * 0.95,
		FOV: 1.3
	},
	GUNS: [, {
		POSITION: [25, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [23, 8, 1, 0, 0, 0, 1/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [21, 8, 1, 0, 0, 0, 2/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 0, 0, 3/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 8, 1, 0, 0, 0, 4/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [15, 8, 1, 0, 0, 0, 5/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8, 1, 0, 0, 0, 6/7],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
			TYPE: exports.bullet
		}
	}]
};
exports.hybridFlamethrower = makeHybrid(exports.flamethrow, 'Hybrid Thrower');
exports.tmissile = {
	PARENT: [exports.bullet],
	LABEL: 'Twisting Missile',
	INDEPENDENT: true,
	turnwithSpeed: true,
	//VARIES_IN_SIZE: true,
	FACING_TYPE: 'autospin',
	BODY: {
		RANGE: 280
	},
	GUNS: [{
		POSITION: [14, 6, 1, 0, 0, 180, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}, {
		POSITION: [14, 6, 1, 0, 0, 0, 0],
		PROPERTIES: {
			AUTOFIRE: true,
			SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.double_reload, g.low_power, g.much_more_recoil, g.more_speed, g.more_speed]),
			TYPE: [exports.bullet, {
				PERSISTS_AFTER_DEATH: true
			}],
			STAT_CALCULATOR: gunCalcNames.thruster
		}
	}]
};
exports.twister = {
	PARENT: [exports.genericTank],
	BODY: {
		FOV: 1.15
	},
	LABEL: 'Twister',
	DANGER: 7,
	GUNS: [{
		POSITION: [10, 14, 0.9, 9, 0, 0, 0]
	}, {
		POSITION: [17, 12, 1.4, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.double_size, g.smaller]),
			TYPE: exports.tmissile,
			STAT_CALCULATOR: gunCalcNames.sustained
		}
	}]
};
exports.smashCube = {
	PARENT: [exports.genericTank],
	LABEL: 'Cuby',
	DANGER: 6,
	Shape: 4,
	BODY: {
		FOV: 1.05,
		DENSITY: base.DENSITY * 2,
		HEALTH: base.HEALTH * 1.925,
		SHIELD: base.SHIELD * 1.925
	},
	TURRETS: [{
		POSITION: [22, 0, 0, 0, 360, 0],
		TYPE: exports.CubyBody
	}],
	IS_SMASHER: true,
	SKILL_CAP: [12, 0, 0, 0, 0, 12, 12, 12, 12, 12],
	STAT_NAMES: statNames.smasher
};
exports.trapion = {
	PARENT: [exports.minion],
	GUNS: [{
		POSITION: [13, 8, 1, 0, 0, 0, 0]
	}, {
		POSITION: [4, 8, 1.7, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.trap_minion]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
exports.trappory = {
	PARENT: [exports.genericTank],
	LABEL: 'Trappory',
	STAT_NAMES: statNames.generic,
	DANGER: 7,
	SHAPE: -3,
	GUNS: [{
		POSITION: [7, 12, 1.2, 7, 0, 180, 0],
		PROPERTIES: {
			MAX_CHILDREN: 4,
			SHOOT_SETTINGS: combineStats([g.factory, g.baby_factory]),
			TYPE: exports.trapion,
			STAT_CALCULATOR: gunCalcNames.drone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true
		}
	}]
};
exports.miniShot = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Mini-Shotgun',
	BODY: {
		SPEED: 3.94,
		ACCELERATION: 0.8,
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [4, 2, 1, 11, -3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 2, 1, 11, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 3, 1, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 3, 1, 12, -1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 3, 1, 11, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 2, 1, 13, -1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 2, 1, 13, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 1, 1, 13, 2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 1, 1, 13, -2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.low_power2, g.sniper]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [18, 11, 1, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.sniper]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [8, 11, -1.3, 4, 0, 0, 0]
	}]
};
exports.carbine = {
	PARENT: [exports.genericTank],
	LABEL: 'Carbine',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: 1.4
	},
	GUNS: [{
		POSITION: [27, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.more_spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [27, 10, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.more_spread]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [7, 10, -1.5, 6, 0, 0, 0]
	}]
};
exports.necroseer = {
	PARENT: [exports.genericTank],
	LABEL: 'Necroseer',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	INVISIBLE: [0.08, 0.01, 0.01],
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.5,
		FOV: 1.15
	},
	SHAPE: 4,
	MAX_CHILDREN: 13,
	GUNS: [{
		POSITION: [5, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
			TYPE: exports.sunchip,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.necro
		}
	}]
};
exports.quintAuto = {
	PARENT: [exports.genericTank],
	LABEL: 'Branch-5',
	DANGER: 7,
	FACING_TYPE: 'autospin',
	TURRETS: [{
		POSITION: [11, 8, 0, 0, 190, 0],
		TYPE: exports.branch,
	}, {
		POSITION: [11, 8, 0, 72, 190, 0],
		TYPE: exports.branch,
	}, {
		POSITION: [11, 8, 0, 144, 190, 0],
		TYPE: exports.branch,
	}, {
		POSITION: [11, 8, 0, 216, 190, 0],
		TYPE: exports.branch,
	}, {
		POSITION: [11, 8, 0, 288, 190, 0],
		TYPE: exports.branch,
	}],
};
exports.squareProp = {
	PARENT: [exports.genericTank],
	SHAPE: 4,
	COLOR: 16
};
exports.overdrunk = {
	PARENT: [exports.genericTank],
	LABEL: 'Overdrive',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.85,
		FOV: 1.1
	},
	MAX_CHILDREN: 5,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.autoDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.autoDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}],
	TURRETS: [{
		POSITION: [9, 0, 0, 0, 360, 1],
		TYPE: exports.squareProp
	}]
};
exports.overwork = {
	PARENT: [exports.genericTank],
	LABEL: 'Overworker',
	DANGER: 7,
	STAT_NAMES: statNames.drone,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75,
		FOV: 1.1
	},
	MAX_CHILDREN: 6,
	GUNS: [{
		POSITION: [6, 12, 1.2, 8, 0, 90, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.autoDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 270, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.autoDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.autoDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
			TYPE: exports.autoDrone,
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: true
		}
	}],
	TURRETS: [{
		POSITION: [9, 0, 0, 0, 360, 1],
		TYPE: exports.squareProp
	}]
};
exports.m2 = {
	PARENT: [exports.genericTank],
	DANGER: 7,
	LABEL: 'Meister',
	BODY: {
		ACCELERATION: base.ACCEL * 0.7
	},
	GUNS: [{
		POSITION: [10, 10, 1, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload, g.more_speed]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 3, 1, 11, -3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 3, 1, 11, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [4, 4, 1, 13, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 4, 1, 12, -1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 4, 1, 11, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 3, 1, 13, -1, 0, 0, ],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 3, 1, 13, 1, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [1, 2, 1, 13, 2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [1, 2, 1, 13, -2, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [15, 14, 1, 6, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.double_reload, g.double_reload, g.fake]),
			TYPE: exports.casing
		}
	}, {
		POSITION: [8, 14, -1.3, 4, 0, 0, 0]
	}]
};
exports.SBullet = {
	PARENT: [exports.bullet],
	LABEL: 'Skyker',
	INDEPENDENT: true,
	BODY: {
		RANGE: 120
	},
	TURRETS: [{
		POSITION: [20.5, 0, 0, 0, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [20.5, 0, 0, 90, 360, 0],
		TYPE: exports.spikeBody
	}]
};
exports.SBlock = {
	PARENT: [exports.trap],
	SHAPE: -4,
	TURRETS: [{
		POSITION: [20.5, 0, 0, 0, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [20.5, 0, 0, 120, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [20.5, 0, 0, 240, 360, 0],
		TYPE: exports.spikeBody
	}]
};
exports.spyker = {
	PARENT: [exports.genericTank],
	DANGER: 6,
	LABEL: 'Spyker',
	STAT_NAMES: statNames.trap,
	BODY: {
		SPEED: base.SPEED * 0.8,
		FOV: 1.15
	},
	GUNS: [{
		POSITION: [18, 12, 1, 0, 0, 0, 0],
	}, {
		POSITION: [2, 12, 0.9, 18, 0, 0, 0]
	}, {
		POSITION: [2, 12, 1.1, 20, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap, g.block]),
			TYPE: exports.SBlock
		}
	}]
};
exports.skyker = {
	PARENT: [exports.genericTank],
	LABEL: 'Skyker',
	DANGER: 7,
	BODY: {
		ACCELERATION: base.ACCEL * 0.5,
		SPEED: base.SPEED * 0.65,
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [7.1, 0.1, -28, 22, 3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.fake, g.no_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [7.1, 0.1, -28, 22, -3, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.fake, g.no_recoil]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [23.5, 11.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.more_damage]),
			TYPE: exports.SBullet
		}
	}, {
		POSITION: [21, 14, 1, 0, 0, 0, 0.25]
	}]
};
exports.destroy_ = {
	PARENT: [exports.genericTank],
	LABEL: 'Skyker',
	DANGER: 6,
	BODY: {
		ACCELERATION: base.ACCEL * 0.75,
		SPEED: base.SPEED * 0.75
	},
	GUNS: [{
		POSITION: [21, 14, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
			TYPE: exports.SBullet
		}
	}],
	TURRETS: [{
		POSITION: [16, 16, 0, 0, 360, 0],
		TYPE: exports.spikeBody
	}, {
		POSITION: [16, -11.31, -11.31, 135, 360, 0],
		TYPE: exports.spikeBody
	}]
};
exports.triFlame = {
	PARENT: [exports.genericTank],
	LABEL: 'Tri-Thrower',
	DANGER: 7,
	BODY: {
		FOV: 1.1
	},
	GUNS: [{
		POSITION: [17, 0.1, -145, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 0.1, -145, 0, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 120, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [17, 0.1, -145, 0, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame, g.fake]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [13, 8.5, 1, 0, 0, 240, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flame]),
			TYPE: exports.bullet
		}
	}]
};

// TESTBED UPGRADE PATHS
exports.testbed.UPGRADES_TIER_1 = [exports.testbed_bosses, exports.testbed_dominators, exports.testbed_misc, exports.testbed_sentries, exports.testbed_events];
exports.testbed_bosses.UPGRADES_TIER_2 = [exports.eliteSprayerControlled, exports.eliteGunnerControlled, exports.eliteDestroyerControlled,
	exports.leviathon, exports.defender_controlled, exports.demolishor, exports.palisadeControlled, exports.testbed_bosses_2];
exports.testbed_bosses_2.UPGRADES_TIER_3 = [exports.octogeddonControlled, exports.summoner, exports.guardian];
exports.testbed_dominators.UPGRADES_TIER_2 = [exports.destroyerDominator, exports.gunnerDominator, exports.trapperDominator, exports.droneDominator];
exports.testbed_sentries.UPGRADES_TIER_2 = [exports.sentrySwarmControlled, exports.sentryTrapControlled, exports.sentryGunControlled];
exports.testbed_misc.UPGRADES_TIER_2 = [exports.autoSmashBooster, exports.brutalizer, exports.mothership,
	exports.arena_closer, exports.baseProtector, exports.quint, exports.trishot3, exports.testbed_misc_2];
exports.testbed_misc_2.UPGRADES_TIER_3 = [exports.hive_tank, exports.observer,
	exports.overdrunk, exports.overwork, exports.m2, exports.spyker, exports.skyker, exports.testbed_misc_3];
exports.testbed_misc_3.UPGRADES_TIER_3 = [exports.smashCube];
exports.testbed_events.UPGRADES_TIER_2 = [exports.ball, exports.facter, exports.launcher,
	exports.weirdspike, exports.minion_controlled, exports.sweeper, exports.gang];
// NORMAL UPGRADE PATHS
exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.pounder, exports.flank, exports.director];
exports.basic.UPGRADES_TIER_2 = [exports.smash];
exports.smash.UPGRADES_TIER_3 = [exports.megaSmash, exports.spike, exports.autoSmash, exports.landmine];
exports.spike.UPGRADES_TIER_4 = [exports.mega_spike];
exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner];
exports.twin.UPGRADES_TIER_3 = [exports.dual, exports.dust];
exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autoDouble, exports.bentDouble];
exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentDouble, exports.triple, exports.burst];
exports.pounder.UPGRADES_TIER_2 = [exports.destroy, exports.builder, exports.artillery];
exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.machinegunner, exports.guntrap];
exports.machinegunner.UPGRADES_TIER_4 = [exports.overload];
exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini];
exports.sniper.UPGRADES_TIER_3 = [exports.snipeGuard, exports.rifle];
exports.trapper.UPGRADES_TIER_2 = [exports.builder, exports.triTrapper, exports.flankTrap];
exports.trapper.UPGRADES_TIER_3 = [exports.minitrap];
exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autoBuilder, exports.engineer, exports.boomer, exports.twinTrapper];
exports.triTrapper.UPGRADES_TIER_3 = [exports.fortress, exports.hexatrap, exports.tritrap];
exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.autoAssassin, exports.stalk, exports.carbine];
exports.stalk.UPGRADES_TIER_4 = [exports.branch];
exports.ranger.UPGRADES_TIER_4 = [exports.branch];
exports.hunter.UPGRADES_TIER_3 = [exports.predator, exports.poach, exports.rocketeer];
exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autoBuilder, exports.engineer, exports.boomer, exports.guntrap];
exports.machine.UPGRADES_TIER_2 = [exports.destroy, exports.artillery, exports.mini, exports.gunner, exports.blaster];
exports.machine.UPGRADES_TIER_3 = [exports.spray, exports.autoMachine];
exports.blaster.UPGRADES_TIER_3 = [exports.triBlaster, exports.twinBlaster];
exports.destroy.UPGRADES_TIER_3 = [exports.annihilator, exports.hybrid, exports.shotgun2, exports.autoDestroy, exports.skimmer, exports.rocketeer];
exports.annihilator.UPGRADES_TIER_4 = [exports.FatAtome];
exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.autoArtillery, exports.spread, exports.cannon];
exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridMini, exports.autoMini, exports.hotshot, exports.flamethrow, exports.autoMaton];
exports.flamethrow.UPGRADES_TIER_4 = [exports.fireTrap, exports.twinFlame, exports.megaFlamethrow, exports.hybridFlamethrower];
exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flankTrap];
exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri];
exports.autotri.UPGRADES_TIER_4 = [exports.skirmish];
exports.booster.UPGRADES_TIER_4 = [exports.speeder, exports.dragon];
exports.fighter.UPGRADES_TIER_4 = [exports.dragon];
exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap, exports.autohexa];
exports.hexatrap.UPGRADES_TIER_4 = [exports.autohexatrap, exports.heptaTrap];
exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.autoSniper, exports.tritrap];
exports.flankTrap.UPGRADES_TIER_3 = [exports.snipeGuard, exports.guntrap, exports.fortress, exports.bomber];
exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer];
exports.director.UPGRADES_TIER_3 = [exports.factory];
exports.factory.UPGRADES_TIER_4 = [exports.fatFactory, exports.sniperFactory, exports.twinFactory, exports.trappory];
exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.autoOverseer, exports.master, exports.manager];
exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.autoUnderseer, exports.necroseer];
exports.necromancer.UPGRADES_TIER_4 = [exports.pentamancer];
exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.autoCruiser, exports.fatCruiser];
exports.cruiser.UPGRADES_TIER_4 = [exports.overCruiser];
exports.fatCruiser.UPGRADES_TIER_4 = [exports.fatCarrier];
exports.carrier.UPGRADES_TIER_4 = [exports.fatCarrier];
exports.rocketeer.UPGRADES_TIER_4 = [exports.hiveShooter];
exports.skimmer.UPGRADES_TIER_4 = [exports.hiveShooter, exports.skimskim, exports.twister];
exports.auto5.UPGRADES_TIER_4 = [exports.auto8];
exports.stream.UPGRADES_TIER_4 = [exports.flankLiner, exports.FuckLiner];
exports.triple.UPGRADES_TIER_4 = [exports.quint];
exports.penta.UPGRADES_TIER_4 = [exports.quint];
exports.carrier.UPGRADES_TIER_4 = [exports.recruit];
exports.autoSmash.UPGRADES_TIER_4 = [exports.teleporter];
exports.builder.UPGRADES_TIER_4 = [exports.conq, exports.fireTrap];
exports.destroy.UPGRADES_TIER_4 = [exports.conq];
exports.boomer.UPGRADES_TIER_4 = [exports.bentboomer, exports.Bigboomer];
exports.battleship.UPGRADES_TIER_4 = [exports.undership];
exports.overlord.UPGRADES_TIER_4 = [exports.undership];
exports.predator.UPGRADES_TIER_4 = [exports.cutter];
exports.shotgun2.UPGRADES_TIER_4 = [exports.miniShot];
exports.rifle.UPGRADES_TIER_3 = [exports.Low]