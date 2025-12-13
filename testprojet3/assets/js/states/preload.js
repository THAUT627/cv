var tinydefence = tinydefence || {};

tinydefence.preload = function (game) { };

tinydefence.preload.prototype = {

	preload: function () {
		this.game.load.image('logo', 'testprojet3/assets/images/logo.png');
		this.game.load.spritesheet('selection', 'testprojet3/assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'testprojet3/assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'testprojet3/assets/images/enemyCrab.png', 16, 16);

		this.game.load.image('buildmenu', 'testprojet3/assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'testprojet3/assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'testprojet3/assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'testprojet3/assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'testprojet3/assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.bitmapFont('font_white',
			'testprojet3/assets/fonts/font.png',
			'testprojet3/assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green',
			'testprojet3/assets/fonts/font_green.png',
			'testprojet3/assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red',
			'testprojet3/assets/fonts/font_red.png',
			'testprojet3/assets/fonts/font_red.fnt');

		this.game.load.audio("background_music", "testprojet3/assets/audio/bgm.mp3");
		// Load all defined maps in maps.js
		// Load all defined maps in maps.js
		tinydefence.maps.forEach(map => {

			// Case: map with variants (ex: LavaDefense)
			if (map.variants && map.variants.length > 0) {

				map.variants.forEach(variant => {

					this.game.load.tilemap(
						variant.key,
						variant.data,
						null,
						Phaser.Tilemap.TILED_JSON
					);

					this.game.load.image(
						variant.key + '_sprites',
						variant.sprite
					);
				});

			}
			// Case: simple map (level1, BeachDefense)
			else {

				this.game.load.tilemap(
					map.key,
					map.data,
					null,
					Phaser.Tilemap.TILED_JSON
				);

				this.game.load.image(
					map.key + '_sprites',
					map.sprite
				);
			}
		});

		// Load all tower assets
		tinydefence.towerManager.load();
	},

	create: function () {
		this.game.state.start("Menu");
	}
}