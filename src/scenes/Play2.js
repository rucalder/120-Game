class Play2 extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload()
    {
        //this creates the wave effect however refer to the bottom of update for the code that enables the wave to move
        this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline2(this.game));
        this.customPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);
        //assets
        this.load.image('ground', "./assets/ground.png");
        this.load.image('sky', "./assets/starfield.png");
        this.load.spritesheet('player1Left', "./assets/p1_LeftRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player1Right', "./assets/p1_RightRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player1Idle', "./assets/p1_Idle.png", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('player2Left', "./assets/p2_LeftRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player2Right', "./assets/p2_RightRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player2Idle', "./assets/p2_Idle.png", { frameWidth: 50, frameHeight: 50 });
        this.load.image("bullet", "./assets/bulletSample.png");
        this.load.audio("bgmusic", "./assets/pirateGameSong.wav");
    }

    create()
    {
        this.player = null;
        this.player2 = null;
        this.cursors = null;
        this.t = 0;
        this.customPipeline;

        //music
        this.bgmusic = this.sound.add('bgmusic');
        this.bgmusic.play({
            volume: .5,
            loop: true
        })
        //////////////////////////////////////////RUBEN CODE FROM PLAY///////////////////////////////////
        // this.powerCall = 0
        // this.tracker = 1
        // this.gameOver = false
        // this.level = 1
        ////////////////////////////////////////////////////////////////////////////////////////////////

        //adding background image
        this.sky = this.add.tileSprite(0, 0, 800, 600, "sky").setOrigin(0,0);

        //physics for interaction with ground
        var platforms = this.physics.add.staticGroup();
        //roof border
        platforms.create(400, 32, 'ground').setScale(2).refreshBody();
        //middle border 
        platforms.create(400, 300, 'ground').setScale(2).refreshBody();
        //bottom border
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //creating player with physics
        var player = this.physics.add.sprite(100, 450, 'player1Idle');
        var player2 = this.physics.add.sprite(100, 200, 'player2Idle');

        //how much character bounces when hitting the ground
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);

        ////////////////////////////////////////////////////////RUBEN CODE///////////////////////////////////
        // this.canon = new Canon(this, 0, 100, "bullet");
        // this.bullets = this.physics.add.group();
        // this.physics.add.overlap(this.player, this.bullets);
        // this.physics.add.overlap(this.player2, this.bullets);
        /////////////////////////////////////////////////////////////////////////////////////////////////////

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

        ///////////////////////////////////////////////RUBEN CODE///////////////////////////////////////
        //cannon timer event
        // this.canonTimer = this.time.addEvent({
        //     delay: Phaser.Math.Between(1000, 5000),                // ms
        //     callback: () => {
        //         this.canonFire();
        //         this.canonTimer.delay = Phaser.Math.Between(1000, 3000)
        //    },
        //     //args: [],
        //     callbackScope: this,
        //     loop: true
        // });
        // // game timer event
        // this.gameTimer = this.time.addEvent({
        //     delay: 1000,                // ms
        //     callback: () => {
        //         this.level += .1
        //    },
        //     //args: [],
        //     callbackScope: this,
        //     loop: true
        // });
        ////////////////////////////////////////////////////////////////////////////////////////////

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

        ////////////////////////////////////////////////RUBEN CODE////////////////////////////////////////////
        // if(this.gameOver == false){
        //     this.player.update()
        //     this.sky.tilePositionX -= this.level
        //     this.canon.update()
        // }
        // if(this.physics.overlap(this.player, this.bullets)){
        //     this.gameOver = true
        //     this.gameOverScreen()
        // }
        //////////////////////////////////////////////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////RUBEN CODE/////////////////////////////////////////////////
    // gameOverScreen(){
    //     this.canonTimer.remove()
    //     this.player.setGravityY(0)
    //     this.player.setVelocityY(0)
    //     this.player.setImmovable()
    //     let menuConfig = {
    //         fontFamily: "Courier",
    //         fontSize: "26px",
    //         backgroundColor: "#8B008B",
    //         color: "#FFFFFF",
    //         align: "right",
    //         padding: {
    //             top: 5,
    //             bottom: 5,
    //         },
    //         fixedWidth: 0
    //     }

    //     let centerX = game.config.width/2
    //     let centerY = game.config.height/2

    //     this.add.text(centerX, centerY - 100, 'GAME OVER', menuConfig).setOrigin(0.5);
    //     let restart = this.add.text(centerX - 100, centerY, "Restart", menuConfig).setOrigin(0.5);
    //     restart.setInteractive();
    //     restart.on("pointerup", () =>{
    //         this.time.now = 0
    //         this.totalTime = 0
    //         this.scene.restart("playScene");
    //     })
    //     let menu = this.add.text(centerX + 100, centerY, "Menu", menuConfig).setOrigin(0.5);
    //     menu.setInteractive();
    //     menu.on("pointerup", () =>{
    //         this.time.now = 0
    //         this.totalTime = 0
    //         this.scene.start("menuScene");
    //     })
           
    // }

    // callTimer(){
    //     this.powerCall = 1
    //     this.timer = this.time.delayedCall(2000, () => {
    //         this.powerCall = 0
    //         this.timer.remove()
    //     }, null, this);
        
    // }

    // canonFire(){
    //     var bull = this.physics.add.sprite(this.canon.x, this.canon.y, "bullet")
    //     this.bullets.add(bull)
    //     bull.setVelocityX(200)

    // }
    /////////////////////////////////////////////////////////////////////////////////////////
}
