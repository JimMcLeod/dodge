window.onload = function() {
	var gameWidth = 360;
	var gameHeight = 640;

	var game;

	var background,
		logo;

	var Menu = {
		preload: function () {
			this.load.image('background', 'img/background.png');
			this.load.image('logo', 'img/logo.png');
		},

		create: function () {
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.refresh();

			background = this.add.image(this.world.centerX, this.world.centerY, 'background');
			background.anchor.setTo(0.5, 0.5);

			background.inputEnabled = true;
			game.input.onDown.add(Menu.tapped, this);

			logo = this.add.sprite(this.world.centerX, 140, 'logo');
			logo.anchor.setTo(0.5, 0.5);

			var style = {font: "20px Arial", fill: "#ffffff", align: "center"};
			var text = this.add.text(this.world.centerX, 400, "TAP TO START", style);
			text.anchor.setTo(0.5, 0.5);

		},

		update: function () {

		},

		tapped: function () {
			game.state.start('Game');
		}
	};


	var Game = {
		player: null,
		ball: null,

		preload: function () {
			this.load.image('player', 'img/player.png');
			this.load.image('ball', 'img/ball.png');
		},

		create: function () {
			this.physics.startSystem(Phaser.Physics.ARCADE);

			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.refresh();

			background = this.add.image(this.world.centerX, this.world.centerY, 'background');
			background.anchor.setTo(0.5, 0.5);

			player = this.add.sprite(this.world.centerX, this.world.centerY, 'player');
			player.anchor.setTo(0.5, 0.5);
			this.physics.enable(player, Phaser.Physics.ARCADE);

			ballGroup = this.add.group();
			for (var i=0; i<10; i++) {
				ballGroup.create(this.world.randomX, this.world.randomY, 'ball');
			}
			ballGroup.setAll('anchor.x', 0.5);
            ballGroup.setAll('anchor.y', 0.5);
		},

		update: function () {
			player.rotation = this.physics.arcade.moveToPointer(player, 60, this.input.activePointer, 500);

			ballGroup.forEach(function (ball) {
				var distance = this.physics.arcade.distanceBetween(player, ball);
            	if (distance < 64) {
					ball.destroy();
				}
            }, this);
		}
	};

	game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');
	game.state.add('Game', Game);
	game.state.add('Menu', Menu);
	game.state.start('Menu');
};