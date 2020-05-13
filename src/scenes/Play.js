class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image("ground", "./assets/ground.png")
        this.load.image("player", "./assets/player.png")
    }

    create(){
        this.onGround = false

        //Blue sky
        this.add.rectangle(0, 0, 640, 480, 0x87ceeb).setOrigin(0, 0);
        
        //Ground
        this.ground = this.physics.add.sprite(320, 460, "ground")
        this.ground.setImmovable()

        //Player
        //this.player = this.physics.add.sprite(320, 400, "player")
        this.player = new Player(this, 320, 400, "player")
        this.player.setGravityY(1000)

        this.physics.add.collider(this.player, this.ground, function(){
            this.onGround = true
        });


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
        console.log(this.onGround)
        
    }

}