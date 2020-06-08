class Instructions4 extends Phaser.Scene{

    constructor(){
        super("instructions4");
    }

    preload(){
        this.load.image('page4', "./assets/Page4.png");
    }
    create(){
        
        this.page4 = this.add.tileSprite(0, 0, 800, 600, 'page4').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           
            this.scene.start("playScene");    
          }
    }
}