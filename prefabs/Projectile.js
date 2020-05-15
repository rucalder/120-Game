//Projectiles prefabs
class Projectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
    }

    create(){
        var speed;
        speed = Phaser.Math.GetSpeed(600, 3);

    }

    update() {    
        this.x += speed * delta;

        if (this.x > 864)
        {
            this.x = 64;
        }
    }
}