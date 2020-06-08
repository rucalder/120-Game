class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
      this.load.spritesheet('screen', "./assets/TitleScreen.png", { frameWidth: 1600, frameHeight: 1200 });
      //this.load.image('p1_sky', "./assets/Sky1.png");
        
    }

    create(){
      //this.test = this.add.sprite(this, 100, 100, "p1_sky")


        //text display
      let menuConfig = {
          fontFamily: "Courier",
          fontSize: "26px",
          backgroundColor: "#F3B141",
          color: "#843605",
          align: "right",
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }

      //show menu text
      let centerX = game.config.width/2;
      let centerY = game.config.height/2;
      let textSpacer = 64;



        //this.add.text(centerX, centerY - textSpacer, "Temp", menuConfig).setOrigin(0.5);
        //this.add.text(centerX, centerY, "Press -> to start", menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = "#00FF00";
        //menuConfig.color = "#000";

      
      this.titleScreen = this.add.sprite(this, 0, 0, "screen").setOrigin(0, 0)
      this.anims.create({
        key: "title",
        repeat: -1,
        frames: this.anims.generateFrameNumbers("screen", {start: 0, end: 2, first: 0}),
        frameRate:8
      });
      //this.titleScreen = this.add.sprite(this, 0, 0).setOrigin(0, 0)
      //this.bone = new Obstacle(this, 100, 100).setScale(1.5,1.5)
      this.titleScreen.play("title")

      //this.add.text(20, 20, "Temp Menu");
      //this.scene.start("playScene");

      //define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
              
          }
          //this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
              
          }
          //this.sound.play('sfx_select');
          this.scene.start("instructions1");    
        }
      }

}