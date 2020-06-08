class Instructions1 extends Phaser.Scene{

    constructor(){
        super("instructions1");
    }

    preload(){
        this.load.image('page1', "./assets/Page1.png");
    }
    create(){
        
        this.page1 = this.add.tileSprite(0, 0, 800, 600, 'page1').setOrigin(0,0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start("instructions2");    
          }
    }
}