var tinydefence = tinydefence || {};

tinydefence.preload = function (game) { };

tinydefence.preload.prototype = {

	preload: function () {
		this.game.load.image('logo', 'testprojet2/assets/images/logo.png');
		this.game.load.spritesheet('selection', 'testprojet2/assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'testprojet2/assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'testprojet2/assets/images/enemyCrab.png', 16, 16);

		this.game.load.image('buildmenu', 'testprojet2/assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'testprojet2/assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'testprojet2/assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'testprojet2/assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'testprojet2/assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.bitmapFont('font_white',
			'testprojet2/assets/fonts/font.png',
			'testprojet2/assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green',
			'testprojet2/assets/fonts/font_green.png',
			'testprojet2/assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red',
			'testprojet2/assets/fonts/font_red.png',
			'testprojet2/assets/fonts/font_red.fnt');

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