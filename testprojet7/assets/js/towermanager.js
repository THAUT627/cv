class TowerManager {

	constructor(game) {
		this.game = game;

		this.towerTypes = [
			{
				key: 'Cannon'
			},
			{
				key: 'antiChicken'
			}
		];
	}

	load() {
		this.towerTypes.forEach(tower => {
			const basePath = 'testprojet7/assets/towers/' + tower.key + '/';

			// load JSON
			this.game.load.json(
				tower.key + '_properties',
				basePath + 'properties.json'
			);

			// ⚠️ on précharge aussi les sprites ici
			// (on sait qu'il n'y a qu'un tier pour l’instant)
			this.game.load.spritesheet(
				tower.key + '_0_tower',
				basePath + 'tower_1.png',
				16, 16
			);

			this.game.load.image(
				tower.key + '_0_shot',
				basePath + 'bullet_1.png'
			);
		});
	}

	init() {
		this.towerTypes.forEach(tower => {
			const props = this.game.cache.getJSON(tower.key + '_properties');

			if (!props) {
				console.error('JSON manquant pour', tower.key);
				return;
			}

			tower.color = props.color;
			tower.tiers = props.tiers;

			props.tiers.forEach((tier, i) => {
				tier.spritesheet_tower = tower.key + '_' + i + '_tower';
				tier.spritesheet_shot = tower.key + '_' + i + '_shot';
			});
		});
	}

	getTowerType(typeName) {
		return this.towerTypes.find(tower => tower.key === typeName);
	}
}
