let config = {
    type: Phaser.WEBGL,
    // width: 640,
    // height: 480,
    width: 800,
    height: 600,
    //scene: [Menu, Play2],
    scene: [Menu, Instructions1, Instructions2, Instructions3, Instructions4, Play2],
    physics: {
        default: 'arcade',
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
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyW, keyA, keyS, keyD;