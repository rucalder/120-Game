class Instructions2 extends Phaser.Scene{

    constructor(){
        super("instructions2");
    }

    preload(){
        this.load.image('page2', "./assets/Page2.png");
    }
    create(){
        
        this.page2 = this.add.tileSprite(0, 0, 800, 600, 'page2').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
           
            this.scene.start("instructions3");    
          }
    }
}