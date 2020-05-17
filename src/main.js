let config = {
    type: Phaser.WEBGL,
    mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
    width: 800,
    height: 600,
    scene: [Menu, Play2],
    //scene: [Menu, Play],
    physics:{
        default: "arcade",
        arcade: {
            gravity: { y: 1000 },
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