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
			this.game.load.json(
				tower.key + '_properties',
				'testprojet7/assets/towers/' + tower.key + '/properties.json'
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
				const basePath = 'testprojet7/assets/towers/' + tower.key + '/';

				tier.spritesheet_tower = tower.key + '_' + i + '_tower';
				tier.spritesheet_shot = tower.key + '_' + i + '_shot';

				this.game.load.spritesheet(
					tier.spritesheet_tower,
					basePath + tier.sprites.tower,
					16, 16
				);

				this.game.load.image(
					tier.spritesheet_shot,
					basePath + tier.sprites.shot
				);
			});
		});
	}

	getTowerType(typeName) {
		return this.towerTypes.find(tower => tower.key === typeName);
	}
}
