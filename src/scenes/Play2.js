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
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
        this.t = 0;
        this.customPipeline;
    },

    preload: function ()
    {
        this.load.image('ground', "./assets/ground.png");
        this.load.image('dude', "./assets/player.png");
        this.load.image('sky', "./assets/starfield.png");
    },

    create: function ()
    {
        this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline2(this.game));
        this.customPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);

        this.add.image(400, 300, 'sky');

        var platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        var player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);

        this.player = player;

        this.cameras.main.setRenderToTexture(this.customPipeline);
        // this.cameras.main.setRenderToTexture();
    },

    update: function ()
    {
        var cursors = this.cursors;
        var player = this.player;

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

        }
        else
        {
            player.setVelocityX(0);

        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }

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
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: GameScene
};

var game = new Phaser.Game(config);

