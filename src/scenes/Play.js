class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image("ground", "./assets/ground.png")
        this.load.image("player", "./assets/player.png")
        this.load.image('sky', "./assets/starfield.png");
        this.load.image("p1idle", "./assets/p1_idle.png")
        this.load.image("bullet", "./assets/bulletSample.png")
    }

    create(){
        this.powerCall = 0
        this.tracker = 1
        this.gameOver = false
        this.level = 1

        //this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline2(this.game));
        //this.customPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);
         //Blue sky
        this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0);
        
        //Ground
        this.ground = this.physics.add.sprite(320, 460, "ground")
        this.ground.setImmovable()

        //Player
        //this.player = this.physics.add.sprite(320, 400, "player")
        this.player = new Player(this, 320, 400, "p1idle")
        this.player.setGravityY(1000)

        this.physics.add.collider(this.player, this.ground);

        //this.power = new powerUp(this, 50, 400, "bullet")
        //this.power.setImmovable()

        //this.physics.add.overlap(this.player, this.power);


        this.canon = new Canon(this, 0, 300, "bullet")
        this.bullets = this.physics.add.group()
        this.physics.add.overlap(this.player, this.bullets)


        //Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        this.canonTimer = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),                // ms
            callback: () => {
                this.canonFire();
                this.canonTimer.delay = Phaser.Math.Between(1000, 3000)
           },
            //args: [],
            callbackScope: this,
            loop: true
        });

        this.gameTimer = this.time.addEvent({
            delay: 1000,                // ms
            callback: () => {
                this.level += .1
           },
            //args: [],
            callbackScope: this,
            loop: true
        });
        
        
    }

    update(){
        
        if(this.gameOver == false){
            this.player.update()
            this.sky.tilePositionX -= this.level
            this.canon.update()
        }
        if(this.physics.overlap(this.player, this.bullets)){
            this.gameOver = true
            this.gameOverScreen()
        }
        //console.log(this.gameTimer.getElapsedSeconds())
        /*this.power.update()
        if(this.physics.overlap(this.player, this.power)){
            this.callTimer(this.sky)
            this.power.destroy()
        }
        if(this.powerCall == 1){
            this.sky.tilePositionX -= 1
        }*/
        
        
    }

    gameOverScreen(){
        this.canonTimer.remove()
        this.player.setGravityY(0)
        this.player.setVelocityY(0)
        this.player.setImmovable()
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

    canonFire(){
        var bull = this.physics.add.sprite(this.canon.x, this.canon.y, "bullet")
        this.bullets.add(bull)
        bull.setVelocityX(200)

    }

}