var CustomPipeline2 = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function CustomPipeline2 (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: [
            "precision mediump float;",

            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform sampler2D uMainSampler;",
            "varying vec2 outTexCoord;",

            "void main( void ) {",

                "vec2 uv = outTexCoord;",
                "//uv.y *= -1.0;",
                "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
                "vec4 texColor = texture2D(uMainSampler, uv);",
                "gl_FragColor = texColor;",

            "}"
            ].join('\n')
        });
    } 

});

var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'gameScene', active: true });

        this.player = null;
        this.player2 = null;
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
        this.t = 0;
        this.customPipeline;
    },

    preload: function ()
    {
        this.load.image('ground', "./assets/ground.png");
        this.load.image('player1', "./assets/player.png");
        this.load.image('player2', "./assets/player2Sample.png");
        this.load.image('sky', "./assets/starfield.png");
    },

    create: function ()
    {
        //creating render in scene
        this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline2(this.game));
        this.customPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);
        //adding background image
        this.add.image(400, 300, 'sky');

        //physics for interaction with ground
        var platforms = this.physics.add.staticGroup();
        //creating middle divide ground
        platforms.create(400, 300, 'ground');
        //ground for bottom player
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //creating player with physics
        var player = this.physics.add.sprite(100, 450, 'player1');
        var player2 = this.physics.add.sprite(100, 200, 'player2');
        //how much character bounces when hitting the ground
        player.setBounce(0);
        player.setCollideWorldBounds(true);

        player2.setBounce(0);
        player2.setCollideWorldBounds(true);
        //controls for character
        this.cursors = this.input.keyboard.createCursorKeys();

        //add in WASD controls for second player
        this.input.keyboard.addKeys('W,S,A,D');
        
        //collisions between player and platform
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player2, platforms);

        this.player = player;
        this.player2 = player2;

        //set camera to render the texture
        this.cameras.main.setRenderToTexture(this.customPipeline);
    },

    update: function ()
    {
        var cursors = this.cursors;
        var player = this.player;
        var player2 = this.player2;

        ///////////////////////player 1 controls/////////////////////////////////////
        //if left arrow is pressed
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

        }
        //if right arrow is pressed
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

        }
        //if no arrow is pressed
        else
        {
            player.setVelocityX(0);

        }
        //if up arrow is pressed
        if (cursors.up.isDown && player.body.touching.down)
        {
            //the speed at which the player ascends
            player.setVelocityY(-450);
        }


        ///////////////////////player 2 controls/////////////////////////////////////
        if (this.input.keyboard.on('keydown_A', function (event) {

            // A key down
            player2.setVelocityX(-160);
       
        }));

        else if (this.input.keyboard.on('keydown_D', function (event) {

            //D key down
            player2.setVelocityX(160);
   
        }));

        //no keys pressed
        else {
            player2.setVelocityX(0);
        }

        //player 2 jump
        if (player2.body.touching.down && this.input.keyboard.on('keydown_W', function (event) {

            // W key down
            player2.setVelocityY(-450);
       
        }));

        this.customPipeline.setFloat1('time', this.t);

        this.t += 0.005
    },

});

var config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.DOM.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.DOM.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: GameScene
};

var game = new Phaser.Game(config);

