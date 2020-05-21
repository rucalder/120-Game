class Play2 extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload()
    {
        //assets
        this.load.image('ground', "./assets/ground.png");
        this.load.image('p1_sky', "./assets/Sky1.png");
        this.load.image('p2_sky', "./assets/Sky2.png");
        this.load.image('bullet', "./assets/Ball.png");
        this.load.audio("bgmusic", "./assets/pirateGameSong.wav");
        this.load.spritesheet('player1Left', "./assets/p1_LeftRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player1Right', "./assets/p1_RightRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player1Idle', "./assets/p1_Idle.png", { frameWidth: 50, frameHeight: 50 });
        this.load.spritesheet('player2Left', "./assets/p2_LeftRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player2Right', "./assets/p2_RightRun.png", { frameWidth: 50, frameHeight: 51 });
        this.load.spritesheet('player2Idle', "./assets/p2_Idle.png", { frameWidth: 50, frameHeight: 50 });
    }

    create()
    {
        //initializing two cameras (one is affected by distort while the other isn't)
        var cam1 = this.cameras.main;
        var cam2 = this.cameras.add(0, 0, 800, 600);

        //setting up the distortion pipeline
        this.t = 0; // time variable for the distor shader
        this.tIncrement = 0.0005;
        this.distortPipeline = this.game.renderer.addPipeline('Distort', new DistortPipeline(this.game));
        // Pass the game resolution to the shader to use for position-based computations
        this.distortPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);

        this.renderMode = {
            distort: true,
        }
        this.applyPipeline(); 

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
        //var sky = this.add.tileSprite(0, 0, 800, 600, "sky").setOrigin(0,0);
        this.p1_sky = this.add.tileSprite(0, 0, 800, 300, "p1_sky").setOrigin(0,0);
        this.p2_sky = this.add.tileSprite(0, 300, 800, 300, "p2_sky").setOrigin(0,0);
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
        this.canon2 = new Canon2(this, 800, 500, "bullet");
        this.bullets = this.physics.add.group();
        
        

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
                //added the code from the canon Fire function to be able to use the cam ignore 
                //attribute so that duplicate bullets didn't show up
                var bull = this.physics.add.sprite(this.canon.x, this.canon.y, "bullet")
                bull.setScale(0.8,0.8)
                this.bullets.add(bull)
                bull.setVelocityX(-200)
                cam2.ignore([ bull ])
                this.canonTimer.delay = Phaser.Math.Between(1000, 3000)
            },
            //args: [],
            callbackScope: this,
            loop: true
         });
         this.canonTimer2 = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),                // ms
            callback: () => {
                //added the code from the canon Fire function to be able to use the cam ignore
                //attribute so that duplicate bullets didn't show up
                var bull = this.physics.add.sprite(this.canon2.x, this.canon2.y, "bullet")
                bull.setScale(0.8,0.8)
                this.bullets.add(bull)
                bull.setVelocityX(-200)
                cam2.ignore([ bull ])
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

        //if cam2 ignores an asset it will be affected by the wave effect
        cam2.ignore([ this.p1_sky, this.p2_sky, this.player, this.player2, platforms, this.canon, this.canon2]);
        //log to console to see which cam is ignoring the asset
        //console.log('sky', sky.willRender(cam1), sky.willRender(cam2));
        cam2.setRenderToTexture(this.customPipeline);


        //delay to warp increase effect
        this.clock = this.time.delayedCall(1000, () => {
        }, null, this);
        //making the warp increase over time
        this.timer = this.time.addEvent({delay: 2000, callback: function(){
            if(this.clock.getProgress() == 1){
                if(this.tIncrement != .1){
                    this.tIncrement += .0005
                }
            }
        }, callbackScope:this, loop: true });

        //Graphical User Interface to test warp 
        //this.createGUI()
        
    }

    update()
    {   
        if(this.gameOver == false){
            this.player.update()
            this.player2.update()
            this.canon.update()
            this.canon2.update()
            this.p1_sky.tilePositionX += this.level
            this.p2_sky.tilePositionX += this.level
        }
        if(this.physics.overlap(this.player, this.bullets) || this.physics.overlap(this.player2, this.bullets)){
            this.gameOver = true
            this.gameOverScreen()
        }

        //update pipeline temporal aspect
        this.t += this.tIncrement;    
        if(this.renderMode.distort) this.distortPipeline.setFloat1('time', this.t);
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

        let gameOver = this.add.text(centerX, centerY - 100, 'GAME OVER', menuConfig).setOrigin(0.5);
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

        this.cameras.main.ignore([ restart, menu, gameOver ]);
           
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
    // Apply the shader currently marked as true in `renderMode`
    applyPipeline(){
        if(this.renderMode.distort){
            this.cameras.main.setRenderToTexture(this.distortPipeline);
        }
    }

    createGUI(){
        var _this = this;
        var gui = new dat.GUI({ width: 300 });
        gui.add(this.renderMode, "distort").name('Distortion').listen().onChange(function(){
            this.changeMode("distort");
        }.bind(this));
        gui.add(this,"tIncrement").name("Distortion intensity").min(0).max(0.1).step(0.005);
    }
    
}
