var tinydefence = tinydefence || {};

tinydefence.preload = function (game) { };

tinydefence.preload.prototype = {

	preload: function () {
		this.game.load.image('logo', 'testprojet7/assets/images/logo.png');
		this.game.load.spritesheet('selection', 'testprojet7/assets/images/selection.png', 16, 16);
		this.game.load.spritesheet('enemy', 'testprojet7/assets/images/enemy.png', 16, 16);
		this.game.load.spritesheet('crab', 'testprojet7/assets/images/enemyCrab.png', 16, 16);
		this.game.load.spritesheet('chicken', 'testprojet7/assets/images/enemyChicken.png', 16, 16);

		this.game.load.image('buildmenu', 'testprojet7/assets/images/ui/menuElements.png');
		this.game.load.spritesheet('buildmenuButtons', 'testprojet7/assets/images/ui/menuButtons.png', 16, 16);

		this.game.load.spritesheet('buttonCoverage', 'testprojet7/assets/images/ui/buttonCoverage.png', 32, 18);
		this.game.load.spritesheet('buttonLevel', 'testprojet7/assets/images/ui/buttonLevel.png', 225, 35);
		this.game.load.spritesheet('buttonMenuNav', 'testprojet7/assets/images/ui/buttonMenuNav.png', 20, 18);

		this.game.load.image('pauseMenu', 'testprojet7/assets/images/ui/pause_menu.png');
		this.game.load.image('resumeBtn', 'testprojet7/assets/images/ui/resume_button.png');
		this.game.load.image('restartBtn', 'testprojet7/assets/images/ui/restart_button.png');
		this.game.load.image('soundOnBtn', 'testprojet7/assets/images/ui/sound_on.png');
		this.game.load.image('soundOffBtn', 'testprojet7/assets/images/ui/sound_off.png');
		this.game.load.image('playBtn', 'testprojet7/assets/images/ui/bouton_play.png');
		this.game.load.image('pauseBtn', 'testprojet7/assets/images/ui/bouton_pause.png');

		this.game.load.bitmapFont('font_white',
			'testprojet7/assets/fonts/font.png',
			'testprojet7/assets/fonts/font.fnt');
		this.game.load.bitmapFont('font_green',
			'testprojet7/assets/fonts/font_green.png',
			'testprojet7/assets/fonts/font_green.fnt');
		this.game.load.bitmapFont('font_red',
			'testprojet7/assets/fonts/font_red.png',
			'testprojet7/assets/fonts/font_red.fnt');

		this.game.load.audio("background_music", "testprojet7/assets/audio/bgm.mp3");
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