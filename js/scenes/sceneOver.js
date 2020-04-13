class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload()
    {
        //Load Images
        this.load.image('gameOver', 'images/DED.png');
        this.load.image('button1', 'images/ui/button1.png');
    }
    create() {
        var title = this.add.image(0, 0, 'gameOver'); //Adds the image to the game

        //Add a line grid to line up the title image
        this.alignGrid = new AlignGrid({rows: 11, cols: 11, scene: this});
        //this.alignGrid.showNumbers(); //Displays the grid squares

        AlignHelper.scaleToGameWidth(title, 0.8); //Adjusts the title image to a specific size
        this.alignGrid.placeAtIndex(38, title); //Places the title image at grid square 38

        //Create a button
        var btnStart = new FlatButton({
            scene: this, 
            key: 'button1', 
            text: 'Play again', 
            event: 'start_game'
        });
        this.alignGrid.placeAtIndex(93, btnStart); //Positions the button at grid square 93

        //"Listen" for that start game event
        emitter.on('start_game', this.startGame, this); //When the user clicks on the start game button, execute startGame function below
    }

    startGame() {
        this.scene.start('SceneMain'); //Change scene to sceneMain
    }

    update() {

    }
}