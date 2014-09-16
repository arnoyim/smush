/**
 * Created by Arno on 8/17/2014.
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('sky', 'sky2.png');
    game.load.image('ground', 'cloudplatform.png');
    game.load.spritesheet('dude', 'dude.png', 32, 48, 9);
    game.load.image('attackLeft', 'spriteAtkLeft.png', 46, 48, 3);
    game.load.image('sword', 'sword.png');
}

var platforms;
var playerLives;
var P1text;
var P2text;
var player2Lives;
var winner1;
var winner2;


var middlePoint;


function createplayer1() {

    player = game.add.sprite(500, game.world.height - 300, 'dude');
    player.tint = 0xf08080;
    player.events.onOutOfBounds.add(fallout, this);
    player.checkWorldBounds = true;
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300;
    player.anchor.setTo(0.5, 0.5);
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    playerStomp = game.input.keyboard.addKey(Phaser.Keyboard.QUESTION_MARK);

    playerJumpkey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    jumpCheck = function () {
        if (player.jumpCount < 2) {
            player.body.velocity.y = -200;
            player.jumpCount++;


        }
    };
    playerJumpkey.onDown.add(jumpCheck, player);
}

function createplayer2() {

    player2 = game.add.sprite(250, game.world.height - 300, 'dude');
    player2.tint = 0xffff00;
    player2.events.onOutOfBounds.add(fallout2, this);
    player2.checkWorldBounds = true;
    game.physics.arcade.enable(player2);
    player2.body.bounce.y = 0.1;
    player2.body.gravity.y = 300;
    player2.anchor.setTo(0.5, 0.5);
    player2.animations.add('left', [0, 1, 2, 3], 10, true);
    player2.animations.add('right', [5, 6, 7, 8], 10, true);
    reset = game.input.keyboard.addKey(Phaser.Keyboard.P);
    player2Jumpkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    jumpCheck2 = function () {
        if (player2.jumpCount < 2) {
            player2.body.velocity.y = -200;
            player2.jumpCount++;


        }
    };
    player2Jumpkey.onDown.add(jumpCheck2, player2);


}


function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision = true;
    game.world.setBounds(0, 0, 800, 600);
    playerLives = 4;
    player2Lives = 4;






    backgroundSky = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('sky').height, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

    var ledge = platforms.create(150, 400, 'ground');
    ledge.body.immovable = true;
    ledge2.body.immovable = true;
    game.add.tween(ledge.body).to({ x: '+100' }, 2000,Phaser.Easing.Linear.None).to({x:'-100'}, 2000,Phaser.Easing.Linear.None).yoyo().loop().start();

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.onDown.add(gofull, this);

    createplayer1();
    createplayer2();



    P1text = game.add.text(700, game.world.height - 600, 'Player 1: 4', { font: "20px Arial", fill: "#ffffff", align: "left" });
    P2text = game.add.text(10, game.world.height - 600, 'Player 2: 4', { font: "20px Arial", fill: "#ffffff", align: "left" });


    winner1 = game.add.text(250, game.world.height - 500, 'Player 1 WINS \n Press P to restart', { font: "40px Arial", fill: "#ffffff", align: "center" });
    winner2 = game.add.text(250, game.world.height - 500, 'Player 2 WINS \n Press P to restart', { font: "40px Arial", fill: "#ffffff", align: "center" });
    winner1.visible = false;
    winner2.visible = false;
}




function update() {

    backgroundSky.tilePosition.x += 1;


    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player2, platforms);
    game.physics.arcade.collide(player, player2);
    px = player2.x;
    py = player2.y;
    game.physics.arcade.overlap(player, null, this);
    player.body.velocity.x = 0;


    if (playerStomp.isDown) {
        player.body.velocity.y = 1000;
    }
    if (cursors.left.isDown) {

        player.body.velocity.x = -150;
        player.animations.play('left');

    }
    else if (cursors.right.isDown) {

        player.body.velocity.x = 150;

        player.animations.play('right');
        playerFacing = 'rightside'
    }
    else {

        player.animations.stop();

        player.frame = 4;
    }

    if (player.body.touching.down) {
        player.jumpCount = 0;
    }


    if (cursors.down.isDown) {
        player.body.velocity.y = 200;
    }
// killing when touching world bounds

    playerA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    playerS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    playerD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    playerF = game.input.keyboard.addKey(Phaser.Keyboard.F);
//  Reset the players velocity (movement)
    player2.body.velocity.x = 0;

    if (reset.isDown){
        restart();
    }

    if (playerA.isDown) {
//  Move to the left
        player2.body.velocity.x = -150;


        player2.animations.play('left');

    }
    else if (playerD.isDown) {
//  Move to the right
        player2.body.velocity.x = 150;

        player2.animations.play('right');
    }
    else {
//  Stand still
        player2.animations.stop();

        player2.frame = 4;
    }

//  Allow the player to double jump if they are touching the ground.
    if (player2.body.touching.down) {
        player2.jumpCount = 0;
    }

    if (playerS.isDown) {
        player2.body.velocity.y = 200;

    }
    if (playerF.isDown) {
        player2.body.velocity.y = 1000;


    }


}

function fallout() {
    playerLives--;
    P1text.text = 'Player 1: ' + playerLives;



    if (playerLives === 0 && player2Lives > 0) {
        winner2.visible = true;
        winner2.vibrate = true;
    }
    else {
        player.reset(500, game.world.height - 300);

    }

}
function fallout2() {
    player2Lives--;
    P2text.text = 'Player 2: ' + player2Lives;


    if (player2Lives === 0 && playerLives > 0) {
        winner1.visible = true;
    }
    else {
        player2.reset(250, game.world.height - 300);

    }

}
function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen();
    }

}

function restart(){
    player2.reset(250, game.world.height - 300);
    player.reset(500, game.world.height - 300);

    playerLives = 4;
    player2Lives = 4;
    P2text.text = 'Player 2: ' + player2Lives;
    P1text.text = 'Player 1: ' + playerLives;
    winner1.visible = false;
    winner2.visible= false;

}




