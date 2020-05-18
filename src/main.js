let config = {
    type: Phaser.CANVAS,
    mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    width: 640,
    height: 480,
    //scene: [Menu, Play2],
    scene: [Menu, Play],
    physics:{
        default: "arcade",
        arcade: {
            
            debug: false
        }
    },
};


let game = new Phaser.Game(config);

function create(){
    
}

// define game settings
game.settings = {
    
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN;