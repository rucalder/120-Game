class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image("ground", "./assets/ground.png")
        this.load.image("player", "./assets/player.png")
    }

    create(){
       

        //Blue sky
        this.add.rectangle(0, 0, 640, 480, 0x87ceeb).setOrigin(0, 0);
        
        //Ground
        this.ground = this.add.rectangle(0, 440, 640, 40, 0x9b7653).setOrigin(0, 0);

        
        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
    
    }

    update(){

    }

}