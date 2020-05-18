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
        //this.player = null;
        //this.player2 = null;
        //this.cursors = null;
        this.t = 0;
        this.customPipeline;

        //music
        this.bgmusic = this.sound.add('bgmusic');
        this.bgmusic.play({
            volume: .5,
            loop: true
        })
        
        this.powerCall = 0
        this.tracker = 1
        this.gameOver = false
        this.level = 1
        

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
        this.player = new Player1(this, 100, 450, "player1Right")
        this.player2 = new Player2(this, 100, 200, 'player2Right');
        this.player.setGravityY(1000)
        this.player2.setGravityY(1000)

        //how much character bounces when hitting the ground
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player2.setBounce(0.2);
        this.player2.setCollideWorldBounds(true);

        
        this.canon = new Canon(this, 800, 200, "bullet");
        this.canon2 = new Canon2(this, 800, 500, "bullet")
        this.bullets = this.physics.add.group();
        this.physics.add.overlap(this.player, this.bullets);
        this.physics.add.overlap(this.player2, this.bullets);
        

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
        this.player.play("p1_right")
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
        this.player2.play("p2_right")

        //controls for character
        //Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        //collisions between player and platform
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player2, platforms);

        
        
        this.canonTimer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),                // ms
            callback: () => {
                this.canonFire(this.canon);
                this.canonTimer.delay = Phaser.Math.Between(1000, 3000)
            },
            //args: [],
            callbackScope: this,
            loop: true
         });
         this.canonTimer2 = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),                // ms
            callback: () => {
                this.canonFire(this.canon2);
                this.canonTimer.delay = Phaser.Math.Between(1000, 3000)
            },
            //args: [],
            callbackScope: this,
            loop: true
         });
         // game timer event
        this.gameTimer = this.time.addEvent({
                delay: 1000,                // ms
                callback: () => {
                this.level += .1
            },
            //args: [],
            callbackScope: this,
            loop: true
        });

        //set camera to render the texture
        this.cameras.main.setRenderToTexture(this.customPipeline);
    }

    update()
    {   
        if(this.gameOver == false){
            this.player.update()
            this.player2.update()
            this.sky.tilePositionX += this.level
            this.canon.update()
            this.canon2.update()
        }
        if(this.physics.overlap(this.player, this.bullets) || this.physics.overlap(this.player2, this.bullets)){
            this.gameOver = true
            this.gameOverScreen()
        }


        //This enables the wave to move
        this.customPipeline.setFloat1('time', this.t);

        this.t += 0.005
    }

    
    gameOverScreen(){
        this.canonTimer.remove()
        this.canonTimer2.remove()
        this.player.setGravityY(0)
        this.player.setVelocityY(0)
        this.player.setImmovable()
        this.player2.setGravityY(0)
        this.player2.setVelocityY(0)
        this.player2.setImmovable()
        this.anims.remove("p2_right")
        this.anims.remove("p1_right")
        this.bgmusic.stop()
        
        let menuConfig = {
            fontFamily: "Courier",
            fontSize: "26px",
            backgroundColor: "#8B008B",
            color: "#FFFFFF",
            align: "right",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let centerX = game.config.width/2
        let centerY = game.config.height/2

        this.add.text(centerX, centerY - 100, 'GAME OVER', menuConfig).setOrigin(0.5);
        let restart = this.add.text(centerX - 100, centerY, "Restart", menuConfig).setOrigin(0.5);
        restart.setInteractive();
        restart.on("pointerup", () =>{
            this.time.now = 0
            this.totalTime = 0
            this.scene.restart("playScene");
        })
        let menu = this.add.text(centerX + 100, centerY, "Menu", menuConfig).setOrigin(0.5);
        menu.setInteractive();
        menu.on("pointerup", () =>{
            this.time.now = 0
            this.totalTime = 0
            this.scene.start("menuScene");
        })
           
    }

    callTimer(){
        this.powerCall = 1
        this.timer = this.time.delayedCall(2000, () => {
            this.powerCall = 0
            this.timer.remove()
        }, null, this);
        
    }

    canonFire(canon){
        var bull = this.physics.add.sprite(canon.x, canon.y, "bullet")
        this.bullets.add(bull)
        bull.setVelocityX(-200)

    }
    
}
