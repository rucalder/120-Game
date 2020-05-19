//this is an example of a game in which you can turn the shader on and off and alter how fast the wave distortion is: https://jerenaux.github.io/shaders-phaser/
//this is the code for the game listed above: https://github.com/Jerenaux/shaders-phaser

//this is a great website for learning about shaders (appart from the actual documentation through phaser)
//https://thebookofshaders.com/
//this is a tutorial on phasers website and an intro to using shaders: https://www.dynetisgames.com/2018/12/09/shaders-phaser-3/


/////////////////////////////////////////////////////////////////////////////////////////////////////
//vec2 uv = outTexCoord;
//uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);

//we set the color of one pixel to the color of another pixel located elsewhere in the scene.
//uv is the original coordinate of a pixel in the scene. The second line computes a new y coordinate
//by applying a convoluted formula to it. The returned value depends on the time
//as well as the original x and y coordinate of the pixel. So far, nothing has changed yet, we simply 
//computed a new location. The magic happens in the following line:

//vec4 texColor = texture2D(uMainSampler, uv);

//This basically fetches the color of the texture at the newly computed location, and use it to replace the color 
//at the original location. The long formula above dictates which target pixel to use to replace the color of each original pixel.
//The use of the sine and cosine functions provide the undulations. Feel free to try other formulas and see what effects you get.
/////////////////////////////////////////////////////////////////////////////////////////////////////
var DistortPipeline = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function DistortPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;
            uniform float     time;
            uniform vec2      resolution;
            uniform sampler2D uMainSampler;
            varying vec2 outTexCoord;
            void main( void ) {
                vec2 uv = outTexCoord;
                //uv.y *= -1.0;
                uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);
                vec4 texColor = texture2D(uMainSampler, uv);
                gl_FragColor = texColor;
            }`
        });
    } 

});