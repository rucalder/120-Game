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
        
        
    
    }

    update(){
        this.player.update()
        this.sky.tilePositionX -= 2
        /*this.power.update()
        if(this.physics.overlap(this.player, this.power)){
            this.callTimer(this.sky)
            this.power.destroy()
        }
        if(this.powerCall == 1){
            this.sky.tilePositionX -= 1
        }*/
        this.canon.update()
        
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
        bull.setVelocityX(200)
    }

}