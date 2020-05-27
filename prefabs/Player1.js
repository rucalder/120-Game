class Player1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        this.hp = new HealthBar(scene, 20, 330);
        this.alive = true;

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

    damage (amount)
    {
        if (this.hp.decrease(amount))
        {
            this.alive = false;
            this.dead();

        }
    }

    dead(){
        this.setVelocityY(0);
        this.setImmovable();
        this.setVisible(false);
    }
}