//Make the game a global object, so it's accessible anywhere
var game;
var model;
var emitter;
var G;
var controller;

window.onload = function() {
    var config = {
        //Graphics mode
        type: Phaser.AUTO, //.AUTO lets the browser decide which graphics mode to use

        //Game width
        width: 480,

        //Game height
        height: 640,

        //This allows you to place the game anywhere you want in the html code
        //It has to match the div id name
        parent: 'phaser-game', //'(div id)'

        //These are where game screens in a game will be. Ex: Title screen, game over screen
        scene: [
            SceneTitle,
            SceneMain,
            SceneOver
        ]
    };
    //Create a constants instance
    G = new Constants();

    //Create a model instance
    model = new Model();

    //Creates the game itself
    game = new Phaser.Game(config);
}