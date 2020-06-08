class Player2Shadow extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        this.alive = true;

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)

    }

    
    update(){
        //movement
        if (keyA.isDown && this.x >= 0){
            this.x -= 4;
        }
        if (keyD.isDown && this.x <= 800){
            this.x += 4;
            
        }
       
    }



    dead(){
        this.setVelocityY(0);
        this.setImmovable();
        this.setVisible(false);
    }

}