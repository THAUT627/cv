var tinydefence = tinydefence || {};

tinydefence.preload = function (game) { };

tinydefence.preload.prototype = {

	preload: function () {
		this.game.load.image('logo', 'testprojet/assets/images/logo.png');
		this.game.load.spritesheet('selection', 'testprojet/assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'testprojet/assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'testprojet/assets/images/enemyCrab.png', 16, 16);

		this.game.load.image('buildmenu', 'testprojet/assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'testprojet/assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'testprojet/assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'testprojet/assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'testprojet/assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.bitmapFont('font_white',
			'testprojet/assets/fonts/font.png',
			'testprojet/assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green',
			'testprojet/assets/fonts/font_green.png',
			'testprojet/assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red',
			'testprojet/assets/fonts/font_red.png',
			'testprojet/assets/fonts/font_red.fnt');

		// Load all defined maps in maps.js
		tinydefence.maps.forEach(map => {
			this.game.load.tilemap(map.key, map.data, null, Phaser.Tilemap.TILED_JSON);
			this.game.load.image(map.key + '_sprites', map.sprite);
		});

		// Load all tower assets
		tinydefence.towerManager.load();
	},

	create: function () {
		this.game.state.start("Menu");
	}
}