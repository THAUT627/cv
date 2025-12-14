var tinydefence = tinydefence || {};

tinydefence.preload = function (game) { };

tinydefence.preload.prototype = {

	preload: function () {
		this.game.load.image('logo', 'testprojet4/assets/images/logo.png');
		this.game.load.spritesheet('selection', 'testprojet4/assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'testprojet4/assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'testprojet4/assets/images/enemyCrab.png', 16, 16);

		this.game.load.image('buildmenu', 'testprojet4/assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'testprojet4/assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'testprojet4/assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'testprojet4/assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'testprojet4/assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.image('pauseMenu', 'assets/images/ui/PauseMenu.png');
		this.game.load.image('resumeBtn', 'assets/images/ui/ResumeButton.png');
		this.game.load.image('restartBtn', 'assets/images/ui/RestartButton.png');
		this.game.load.image('soundOnBtn', 'assets/images/ui/SoundOnButton.png');
		this.game.load.image('soundOffBtn', 'assets/images/ui/SoundOffButton.png');

		this.game.load.bitmapFont('font_white',
			'testprojet4/assets/fonts/font.png',
			'testprojet4/assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green',
			'testprojet4/assets/fonts/font_green.png',
			'testprojet4/assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red',
			'testprojet4/assets/fonts/font_red.png',
			'testprojet4/assets/fonts/font_red.fnt');

		this.game.load.audio("background_music", "testprojet4/assets/audio/bgm.mp3");
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