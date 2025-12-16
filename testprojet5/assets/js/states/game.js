var tinydefence = tinydefence || {};

tinydefence.rungame = {
    pauseGroup: null,
    pauseButton: null,
    soundOnBtn: null,
    soundOffBtn: null,
    pauseStartTime: 0,
    lastPauseClickTime: 0,
    pauseInputDelay: 200,



    preload: function () {
    },

    create: function () {
        this.soundEnabled = (tinydefence.savedSound ? tinydefence.savedSound.enabled : true);
        this.game.input.enabled = true;
        this.game.input.enabledDuringPause = true;
        // Set cavans background
        this.game.stage.backgroundColor = "#1e1a17";
        // this.music = this.game.add.audio("background_music", 0.5, true); // volume, loop
        // this.music.play();
        this.game.time.advancedTiming = true;
        this.game.time.desiredFps = 60;
        this.game.time.slowMotion = 1.0;

        // Create a copy of the intial game settings
        this.model = {
            currentMapIndex: tinydefence.game.model.currentMapIndex,
            money: tinydefence.game.model.money,
            currentWave: tinydefence.game.model.currentWave,
            lives: tinydefence.game.model.lives,
        }

        tinydefence.game.ui = new UI(tinydefence.game);

        this.gameEnd = false;

        this.createMap();

        // ---- PAUSE BUTTON ----
        this.pauseButton = this.game.add.sprite(
            this.game.camera.width - 40,
            10,
            'pauseBtn'
        );

        console.log('pauseButton =', this.pauseButton);

        if (!this.pauseButton) {
            console.error('Pause button not created');
            return;
        }


        this.pauseButton.inputEnabled = true;
        this.pauseButton.input.useHandCursor = true;
        this.pauseButton.fixedToCamera = true;

        this.pauseButton.events.onInputUp.add(() => {
            this.togglePause(true);
        });

        // ---- PAUSE MENU GROUP ----
        this.pauseGroup = this.game.add.group();
        this.pauseGroup.visible = false;


        // Background panel
        let panel = this.game.add.sprite(
            this.game.camera.width / 2,
            this.game.camera.height / 2,
            'pauseMenu'
        );
        panel.anchor.set(0.5);
        panel.fixedToCamera = true;
        this.pauseButton.inputEnabledDuringPause = true;
        this.pauseGroup.add(panel);

        this.game.world.bringToTop(this.pauseGroup);


        let resumeBtn = this.game.add.sprite(
            panel.x,
            panel.y - 70,
            'resumeBtn'
        );

        resumeBtn.anchor.set(0.5);
        resumeBtn.scale.set(0.7);
        resumeBtn.inputEnabled = true;
        resumeBtn.fixedToCamera = true;
        resumeBtn.input.useHandCursor = true;
        resumeBtn.inputEnabledDuringPause = true;
        console.log('resumeBtn created at x=' + panel.x + ', y=' + (panel.y - 50) + ', scale=0.7');

        resumeBtn.events.onInputDown.add(() => {
            console.log('resumeBtn.onInputDown triggered');
        });

        resumeBtn.events.onInputUp.add(() => {
            // mark resume click time to avoid duplicate restart clicks
            console.log('>>> RESUME handler called <<<');
            this.lastPauseClickTime = Date.now();
            console.log('► RESUME clicked at', this.lastPauseClickTime);
            this.togglePause(false);
        });

        this.pauseGroup.add(resumeBtn);

        let restartBtn = this.game.add.sprite(
            panel.x,
            panel.y + 70,
            'restartBtn'
        );

        restartBtn.anchor.set(0.5);
        restartBtn.scale.set(0.7);
        restartBtn.inputEnabled = true;
        restartBtn.fixedToCamera = true;
        restartBtn.input.useHandCursor = true;
        restartBtn.inputEnabledDuringPause = true;
        console.log('restartBtn created at x=' + panel.x + ', y=' + (panel.y + 50) + ', scale=0.7');

        restartBtn.events.onInputDown.add(() => {
            console.log('restartBtn.onInputDown triggered');
        });

        restartBtn.events.onInputUp.add(() => {
            // Preserve sound state across restart
            try {
                tinydefence.savedSound = {
                    enabled: this.soundEnabled,
                    mute: (this.music ? !!this.music.mute : false)
                };
            } catch (e) { }

            // Restart the game cleanly: hide pause UI and restart state.
            this.pauseGroup.visible = false;
            this.pauseButton.inputEnabled = true;
            this.game.paused = false;
            this.game.state.restart();
        });

        this.pauseGroup.add(restartBtn);

        // Place both sound buttons at the same coordinates so toggling doesn't move them
        const soundBtnX = panel.x;
        const soundBtnY = panel.y + 200;

        this.soundOnBtn = this.game.add.sprite(
            soundBtnX,
            soundBtnY,
            'soundOnBtn'
        );

        this.soundOffBtn = this.game.add.sprite(
            soundBtnX,
            soundBtnY,
            'soundOffBtn'
        );

        this.soundOnBtn.anchor.set(0.5);
        this.soundOffBtn.anchor.set(0.5);
        this.soundOnBtn.scale.set(0.5);
        this.soundOffBtn.scale.set(0.5);

        this.soundOnBtn.inputEnabled = true;
        this.soundOffBtn.inputEnabled = true;
        this.soundOnBtn.fixedToCamera = true;
        this.soundOffBtn.fixedToCamera = true;
        this.soundOnBtn.inputEnabledDuringPause = true;
        this.soundOffBtn.inputEnabledDuringPause = true;



        this.soundOnBtn.events.onInputUp.add(() => {
            this.toggleSound(false);
        });

        this.soundOffBtn.events.onInputUp.add(() => {
            this.toggleSound(true);
        });

        this.pauseGroup.add(this.soundOnBtn);
        this.pauseGroup.add(this.soundOffBtn);

        // état initial
        this.soundOnBtn.visible = this.soundEnabled;
        this.soundOffBtn.visible = !this.soundEnabled;


        this.model.currentWave = -1;
        this.nextWaveOrLevel();

        this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).onDown.add(() => {
            this.togglePause(!this.game.paused);
        });

        if (!this.game.backgroundMusic) {
            this.game.backgroundMusic = this.game.add.audio('background_music');
            this.game.backgroundMusic.loop = true;
            this.game.backgroundMusic.volume = 0.5;
            this.game.backgroundMusic.play();
        }

        this.music = this.game.backgroundMusic;
        // restore saved sound state if present
        if (tinydefence.savedSound) {
            try { if (this.music) { this.music.mute = !!tinydefence.savedSound.mute; } } catch (e) { }
        }


    },

    createMap() {
        // Load current map
        this.currentMap = tinydefence.maps[this.model.currentMapIndex];

        // Create tilemap
        this.map = this.game.add.tilemap(this.currentMap.key);
        this.map.addTilesetImage('Sprites', this.currentMap.key + '_sprites');
        this.layer = this.map.createLayer('Level');
        this.layer.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);

        const tilemapData = this.game.cache.getTilemapData(this.currentMap.key).data;

        const levelLayer = tilemapData.layers.find(l => l.name === 'Level');
        const waypointLayer = tilemapData.layers.find(l => l.name === 'Waypoints');

        if (!levelLayer || !waypointLayer) {
            console.error('Layer Level ou Waypoints manquant dans', this.currentMap.key);
            return;
        }

        const mapdata = levelLayer.data;
        const waypointdata = waypointLayer.data;


        this.defencegame = new DefenceGame(
            tinydefence.constants.TILE_WIDTH * tinydefence.scalefactor,
            tinydefence.constants.TILE_HEIGHT * tinydefence.scalefactor,
            30, 15, mapdata, waypointdata, this.game, this.model);

        tinydefence.game.world.bringToTop(tinydefence.game.ui.buttonCoverage);
    },

    nextWaveOrLevel() {

        this.model.currentWave += 1;

        // Next map if no next wave exists and if next map is in array
        if (this.model.currentWave >= this.currentMap.waves.length
            && this.model.currentMapIndex + 1 < tinydefence.maps.length) {

            // Next map/level
            this.model.currentMapIndex++;
            this.createMap();

            // Soft reset the game model for the next level            
            this.model.money = tinydefence.game.model.money;
            this.model.lives = tinydefence.game.model.lives;
            this.model.currentWave = 0;
        }

        // Next wave if exists
        if (this.model.currentWave < this.currentMap.waves.length) {

            // Get current wave and create a clone
            this.wave = Object.assign({}, this.currentMap.waves[this.model.currentWave]);

            this.nextEnemy = this.game.time.now;
            this.wavestart = this.game.time.now + 5000;
        }
    },

    update: function () {

        // Go back to menu on click if the game is over
        if (this.gameEnd && (this.game.input.pointer1.isDown || this.game.input.mousePointer.isDown)) {
            this.game.state.start("Menu");
        }

        // Get a small warm up phase
        if (this.game.time.now < this.wavestart) {

            let now = Math.floor((this.wavestart - this.game.time.now) / 1000);

            if (this.last !== undefined && now !== this.last && now <= 3) {

                let overlay = null;
                // In the first wave show the centered big countdown
                if (this.model.currentWave === 0) {
                    overlay = new UIOverlay(this.game.width / 2, this.game.height / 2, now, this.game, 128);
                    // Add a "Build" in the last run
                    if (now === 1) {
                        let buildOverlay = new UIOverlay(this.game.width / 2, this.game.height / 2, "BUILD", this.game, 128);
                        tinydefence.game.ui.addOverlay(buildOverlay.start(1000));
                    }
                    // Add a small countdown in the infobar in all other waves
                } else {
                    let wavetext = tinydefence.game.ui.waveText;
                    overlay = new UIOverlay(wavetext.x + wavetext.width + 20, wavetext.y, now, this.game, 32);
                    overlay.text.anchor.setTo(0, 0);
                    overlay.yOffset = 0;
                }
                tinydefence.game.ui.addOverlay(overlay.start());
            }

            this.last = Math.floor((this.wavestart - this.game.time.now) / 1000);

        } else {
            // Drop new enemies?
            if (this.game.time.now > this.nextEnemy && this.wave.maxEnemies > 0) {
                this.wave.maxEnemies -= 1;
                this.defencegame.addEnemy(this.wave.enemyHealth, this.wave.enemySpeed, this.wave.points, this.wave.type);
                this.nextEnemy = this.game.time.now + this.wave.dropInMillis;
            }

            // All enemies dead?
            if (this.defencegame.enemies.length === 0 && this.gameEnd === false) {
                // Give a little bonus to frugal players
                let bonus = Math.round(this.model.money * 0.1);
                this.model.money += bonus;

                let moneytext = tinydefence.game.ui.moneyText;
                let overlay = new UIOverlay(moneytext.x + moneytext.width, moneytext.y, "+" + bonus, this.game);
                overlay.text.anchor.setTo(1, 1);

                tinydefence.game.ui.addOverlay(overlay.start());

                this.nextWaveOrLevel();
            }
        }

        this.defencegame.update();

        // Update score
        // // TODO nicht bei jedem update zyklus sondern nur wenn sich wirklich was ändert
        tinydefence.game.ui.setCurrentWave(this.model.currentWave + 1);
        tinydefence.game.ui.setMaxWave(this.currentMap.waves.length);
        tinydefence.game.ui.setMoney(this.model.money);
        tinydefence.game.ui.setLives(this.model.lives);

        if (this.model.currentWave > this.currentMap.waves.length) {
            tinydefence.game.ui.setFullText("You won the game");
            this.gameEnd = true;
        }

        // Is the player dead?
        if (this.model.lives <= 0) {
            tinydefence.game.ui.setFullText("You lost the game");
            this.gameEnd = true;
        }
    },
    togglePause: function (pause) {
        if (pause) {
            // use real time so we can compute duration even if Phaser time is frozen
            console.log('togglePause(true) - pausing game');
            this.pauseStartTime = Date.now();
            this.game.paused = true;
            this.pauseGroup.visible = true;
            this.pauseButton.inputEnabled = false;
            try { if (this.music && this.music.playing) { this.music.pause(); } } catch (e) { }

            // temporarily disable pause menu buttons to prevent accidental double-clicks
            for (let i = 0; i < this.pauseGroup.children.length; i++) {
                try { this.pauseGroup.children[i].inputEnabled = false; } catch (e) { }
            }

            // re-enable inputs after a short delay
            setTimeout(() => {
                this.lastPauseClickTime = Date.now();
                for (let i = 0; i < this.pauseGroup.children.length; i++) {
                    try {
                        this.pauseGroup.children[i].inputEnabled = true;
                        this.pauseGroup.children[i].inputEnabledDuringPause = true;
                    } catch (e) { }
                }
                console.log('  → pause menu inputs re-enabled after delay');
            }, this.pauseInputDelay || 200);

        } else {
            console.log('togglePause(false) - resuming game');
            const pausedDuration = Date.now() - (this.pauseStartTime || Date.now());

            // ⏱️ On décale les timers
            if (typeof this.wavestart === 'number') { this.wavestart += pausedDuration; }
            if (typeof this.nextEnemy === 'number') { this.nextEnemy += pausedDuration; }

            this.game.paused = false;
            this.pauseGroup.visible = false;
            this.pauseButton.inputEnabled = true;

            try { if (this.music && !this.music.mute) { this.music.resume(); } } catch (e) { }
            console.log('  → game resumed, pausedDuration=' + pausedDuration + 'ms');
        }
    },


    toggleSound: function (enable) {
        this.soundEnabled = enable;
        this.music.mute = !enable;

        this.soundOnBtn.visible = enable;
        this.soundOffBtn.visible = !enable;
    },


    render: function () {

        if (tinydefence.constants.DEBUG) {
            this.game.debug.text('render FPS: ' + (this.game.time.fps || '--'), 2, 14, "#00ff00");

            if (this.game.time.suggestedFps !== null) {
                this.game.debug.text('suggested FPS: ' + this.game.time.suggestedFps, 2, 28, "#00ff00");
                this.game.debug.text('desired FPS: ' + this.game.time.desiredFps, 2, 42, "#00ff00");
            }

        }
    }
}