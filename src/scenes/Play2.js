class Play2 extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload()
    {
        //this creates the wave effect however refer to the bottom of update for the code that enables the wave to move
        this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline2(this.game));
        this.customPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);
        this.load.image('ground', "./assets/ground.png");
        this.load.image('sky', "./assets/starfield.png");
        this.load.spritesheet('player1Left', "./assets/p1_LeftRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player1Right', "./assets/p1_RightRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player1Idle', "./assets/p1_Idle.png", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('player2Left', "./assets/p2_LeftRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player2Right', "./assets/p2_RightRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player2Idle', "./assets/p2_Idle.png", { frameWidth: 50, frameHeight: 50 });
    }

    create()
    {
        this.player = null;
        this.player2 = null;
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
        this.t = 0;
        this.customPipeline;

        //adding background image
        this.sky = this.add.tileSprite(0, 0, 800, 600, "sky").setOrigin(0,0);


        //physics for interaction with ground
        var platforms = this.physics.add.staticGroup();
        //creating middle divide ground
        platforms.create(400, 300, 'ground').setScale(2).refreshBody();
        //ground for bottom player
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //creating player with physics
        var player = this.physics.add.sprite(100, 450, 'player1Idle');
        var player2 = this.physics.add.sprite(100, 200, 'player2Idle');

        //how much character bounces when hitting the ground
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);

        //////////////////////////Player 1 Animations////////////////////////////////////////
        this.anims.create({
            key: 'p1_left',
            frames: this.anims.generateFrameNumbers('player1Left'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'p1_turn',
            frames: this.anims.generateFrameNumbers('player1Idle'),
            frameRate: 20
        });

        this.anims.create({
            key: 'p1_right',
            frames: this.anims.generateFrameNumbers('player1Right'),
            frameRate: 10,
            repeat: -1
        });
        //////////////////////////Player 2 Animations////////////////////////////////////////

        this.anims.create({
            key: 'p2_left',
            frames: this.anims.generateFrameNumbers('player2Left'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'p2_turn',
            frames: this.anims.generateFrameNumbers('player2Idle'),
            frameRate: 20
        });

        this.anims.create({
            key: 'p2_right',
            frames: this.anims.generateFrameNumbers('player2Right'),
            frameRate: 10,
            repeat: -1
        });



        //controls for character
        this.cursors = this.input.keyboard.createCursorKeys();

        //add in WASD controls for second player
        this.keys = this.input.keyboard.addKeys('W,S,A,D');
        
        //collisions between player and platform
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player2, platforms);

        this.player = player;
        this.player2 = player2;

        //set camera to render the texture
        this.cameras.main.setRenderToTexture(this.customPipeline);
    }

    update()
    {
        var cursors = this.cursors;
        var keys = this.keys;
        var player = this.player;
        var player2 = this.player2;

        //sky movement
        this.sky.tilePositionX -=2;

        ///////////////////////player 1 controls/////////////////////////////////////

        //if left arrow is pressed
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
            player.anims.play('p1_left', true);

        }
        //if right arrow is pressed
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
            player.anims.play('p1_right', true);

        }
        //if no arrow is pressed
        else
        {
            player.setVelocityX(0);
            player.anims.play('p1_turn');

        }
        //if up arrow is pressed
        if (cursors.up.isDown && player.body.touching.down)
        {
            //the speed at which the player ascends
            player.setVelocityY(-500);
        }


        ///////////////////////player 2 controls/////////////////////////////////////

        //A key is down move left
        if(keys.A.isDown){
            player2.setVelocityX(-160);
            player2.anims.play('p2_left', true);
        }

        //D key down move right
        else if(keys.D.isDown){
            player2.setVelocityX(160);
            player2.anims.play('p2_right', true);
        }

        //no key pressed don't move
        else{
            player2.setVelocityX(0);
            player2.anims.play('p2_turn');
        }

        //W key is pressed jump
        if (keys.W.isDown && player2.body.touching.down)
        {
            //the speed at which the player ascends
            player2.setVelocityY(-500);
        }
        //This enables the wave to move
        this.customPipeline.setFloat1('time', this.t);

        this.t += 0.005
    }

}
