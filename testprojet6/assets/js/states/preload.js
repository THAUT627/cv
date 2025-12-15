var tinydefence = tinydefence || {};

tinydefence.preload = function (game) { };

tinydefence.preload.prototype = {

	preload: function () {
		this.game.load.image('logo', 'testprojet6/assets/images/logo.png');
		this.game.load.spritesheet('selection', 'testprojet6/assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'testprojet6/assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'testprojet6/assets/images/enemyCrab.png', 16, 16);
		this.game.load.spritesheet('chicken', 'testprojet6/assets/images/enemyChicken.png', 16, 16);

		this.game.load.image('buildmenu', 'testprojet6/assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'testprojet6/assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'testprojet6/assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'testprojet6/assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'testprojet6/assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.image('pauseMenu', 'testprojet6/assets/images/ui/pause_menu.png');
		this.game.load.image('resumeBtn', 'testprojet6/assets/images/ui/resume_button.png');
		this.game.load.image('restartBtn', 'testprojet6/assets/images/ui/restart_button.png');
		this.game.load.image('soundOnBtn', 'testprojet6/assets/images/ui/sound_on.png');
		this.game.load.image('soundOffBtn', 'testprojet6/assets/images/ui/sound_off.png');
		this.game.load.image('playBtn', 'testprojet6/assets/images/ui/bouton_play.png');
		this.game.load.image('pauseBtn', 'testprojet6/assets/images/ui/bouton_pause.png');

		this.game.load.bitmapFont('font_white',
			'testprojet6/assets/fonts/font.png',
			'testprojet6/assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green',
			'testprojet6/assets/fonts/font_green.png',
			'testprojet6/assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red',
			'testprojet6/assets/fonts/font_red.png',
			'testprojet6/assets/fonts/font_red.fnt');

		this.game.load.audio("background_music", "testprojet6/assets/audio/bgm.mp3");
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