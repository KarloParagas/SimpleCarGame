class SceneMain extends Phaser.Scene { //All properties and functions of Phaser.Scene is now inherited by SceneMain
    //This gets called as soon as the screen comes into existence
    constructor() {
        //super() calls the Phaser.Scene constructor
        super('SceneMain'); 
        //Note: The parameter has to match the class name
    }

    //This function is for loading all resources before using them
    //Ex: Images, sounds
    preload() {
        //Load images
        this.load.image('road', 'images/road.jpg');
        this.load.image('line', 'images/line.png');
        this.load.image('cars', 'images/cars.png', {framewidth: 60, frameHeight: 126});
    }

    //This function is for defining objects
    //Ex: Spaceships, bullets
    create() {
        //Create a road
        this.road = new Road({scene: this});

        //Put the road in the center
        this.road.x = game.config.width / 2;  
        
        //Add lines to the road image
        this.road.makeLines();
    }

    //This function is a contant running loop. Anything that needs to be checked over and over
    //Ex: Collision, constantly update something
    update() {
        //Simulate movement of the lines so it looks like the car sprites (when added) are driving through the road
        this.road.moveLines();
    }

    /*
        Note:
        preload(), create(), and update() are the main functions, but you can also have custom/helper functions
        to help achieve whats needed
    */
}