class Instructions3 extends Phaser.Scene{

    constructor(){
        super("instructions3");
    }

    preload(){
        this.load.image('page3', "./assets/Page3.png");
    }
    create(){
        
        this.page3 = this.add.tileSprite(0, 0, 800, 600, 'page3').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           
            this.scene.start("instructions4");    
          }
    }
}