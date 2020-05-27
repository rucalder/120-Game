class Canon extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.tracker = 0
    }


    update(){
        this.move()
    }

    move(){
        if(this.y <= 500 && this.tracker == 0){
            this.y += 2
        }
        if(this.y > 500){
            this.tracker = 1
        }
        if(this.y >= 350 && this.tracker == 1){
            this.y -= 2
        }
        if(this.y < 350){
            this.tracker = 0
        }
    }

}