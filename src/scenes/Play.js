class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image("ground", "./assets/ground.png")
        this.load.image("player", "./assets/player.png")
        this.load.image('sky', "./assets/starfield.png");
        this.load.image("p1idle", "./assets/p1_idle.png")
    }

    create(){

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


        //Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    
    }

    update(){
        this.player.update()
        this.sky.tilePositionX -= 2
    }

}