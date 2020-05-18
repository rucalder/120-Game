class Player1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

    }

    
    update(){
        //movement
        if (keyLEFT.isDown && this.x >= 0){
            this.x -= 4;
            
        }
        if (keyRIGHT.isDown && this.x <= 800){
            this.x += 4;
            
        }
        this.jump()
    }

    jump(){
        if (keyUP.isDown && this.body.touching.down){
            this.setVelocityY(-500);
        }
    }
}