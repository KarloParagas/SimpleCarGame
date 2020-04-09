//Container is a collection of objects that can be treated as a single object 
//Each item in a container moves at the same time
class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene); //Pass the scene to Phaser.GameObjects.Container's constructor
        this.scene = config.scene; //Makes a reference to the scene
        this.back = this.scene.add.image(0, 0, 'road'); //Places the image of the road in this class
        this.add(this.back); //Places the road inside the container
        this.scene.add.existing(this); //Add it to the scene

        AlignHelper.scaleToGameWidth(this.back, 0.5); //Scale the road/"back" to 50% of the screen size

        this.setSize(this.back.displayWidth, game.config.height); //Set a container size

        this.lineGroup = this.scene.add.group(); //Add a line group
    }

    makeLines() {
        this.lineSpace = this.displayHeight / 10; //Space out the lines to 1/10th of the height of the road

        //Make the lines
        for (var i = 0; i < 100; i++) {
            //Add a line to the line group
            var line = this.scene.add.image(this.x, this.lineSpace * i, 'line'); //.image(x, y, 'ImageKey')
            this.lineGroup.add(line);
        }
    }
}