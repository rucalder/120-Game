var config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.DOM.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.DOM.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: GameScene
};

var game = new Phaser.Game(config);


function create(){
    
}

// define game settings
game.settings = {
    
}

//reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN;