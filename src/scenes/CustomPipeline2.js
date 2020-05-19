//this is a great website for learning about shaders (appart from the actual documentation through phaser)
//  https://www.gamefromscratch.com/post/2014/05/16/OpenGL-Shader-Programming-Resources-Round-up.aspx
//this is a tutorial on phasers website and an intro to using shaders: https://www.dynetisgames.com/2018/12/09/shaders-phaser-3/
var CustomPipeline2 = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function CustomPipeline2 (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: [
            //this is the precison
            "precision mediump float;",
            //these are the uniforms
            "uniform float     time;",
            //this is the resolution 
            "uniform vec2      resolution;",
            //this is the actual texture
            "uniform sampler2D uMainSampler;",
            //this is the texture coordinate
            "varying vec2 outTexCoord;",
            //this is the shader entry point
            "void main( void ) {",

                "vec2 uv = outTexCoord;",
                "//uv.y *= -1.0;",
                "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
                "vec4 texColor = texture2D(uMainSampler, uv);",
                //this is the ultimate output of the shader
                "gl_FragColor = texColor;",

            "}"
            ].join('\n')
        });
    } 

});