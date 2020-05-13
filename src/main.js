let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    physics:{
        default: "arcade",
        arcade: {
            //gravity: {y: 1000},
            debug: true
        }
    }
}

let game = new Phaser.Game(config);

function create(){
    
}

// define game settings
game.settings = {
    
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN;