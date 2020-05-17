class powerUp extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        
    }

    create(){
        
    }

    update(){
        
    }

    callTimer(sky){

        this.timer = this.scene.time.delayedCall(1000, () => {
            this.timer.remove()
        }, null, this);
        if(this.timer.getProgress() != 1){
            sky.tilePositionX -= 24
        }
    }

}