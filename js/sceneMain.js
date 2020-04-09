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

    }

    //This function is for defining objects
    //Ex: Spaceships, bullets
    create() {
        
    }

    //This function is a contant running loop. Anything that needs to be checked over and over
    //Ex: Collision, constantly update something
    update() {
        
    }

    /*
        Note:
        preload(), create(), and update() are the main functions, but you can also have custom/helper functions
        to help achieve whats needed
    */
}