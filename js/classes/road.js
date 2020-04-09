//Container is a collection of objects that can be treated as a single object 
//Each item in a container moves at the same time
class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene); //Pass the scene to Phaser.GameObjects.Container's constructor
        this.scene = config.scene; //Makes a reference to the scene
        this.back = this.scene.add.image(0, 0, 'road'); //Places the image of the road in this class
        this.add(this.back); //Places the road inside the container
        this.scene.add.existing(this); //Add it to the scene

        //Scale the road/"back" to 50% of the screen size
        AlignHelper.scaleToGameWidth(this.back, 0.5)

        //Set a container size
        this.setSize(this.back.displayWidth, game.config.height);
    }
}