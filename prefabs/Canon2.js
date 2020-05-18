class Canon2 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.tracker = 0
    }

    creeate(){
        //this.tracker = 1
    }

    update(){
        this.move()
    }

    move(){
        if(this.y <= 250 && this.tracker == 0){
            this.y += 2
        }
        if(this.y > 250){
            this.tracker = 1
        }
        if(this.y >= 100 && this.tracker == 1){
            this.y -= 2
        }
        if(this.y < 100){
            this.tracker = 0
        }
    }

}