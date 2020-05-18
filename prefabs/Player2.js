class Player2 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

    }

    
    update(){
        //movement
        if (keyA.isDown && this.x >= 0){
            this.x -= 4;
        }
        if (keyD.isDown && this.x <= 640){
            this.x += 4;
            
        }
        this.jump()
    }

    jump(){
        if (keyW.isDown && this.body.touching.down){
            this.setVelocityY(-500);
        }
    }
}