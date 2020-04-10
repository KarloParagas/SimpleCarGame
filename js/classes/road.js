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

        this.count = 0; //Count how many times the line is being moved

        //Add a car to the game
        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * 0.9, 'cars'); //25% of the road's display width, position the car 90% down on the screen
        AlignHelper.scaleToGameWidth(this.car, 0.10); //Scale the car to 10% of the game's width

        //Add the car to the road/container
        this.add(this.car);

        //Add click event
        this.back.setInteractive(); //Allow the back to take input
        this.back.on('pointerdown', this.changeLanes, this); //When user clicks the mouse, call changeLanes and pass "this" scene
    }

    changeLanes() {
        if (this.car.x > 0) { //If the car if on the right lane
            this.car.x = -this.displayWidth / 4; //Move to the left lane
        }
        else { //If the car is on the left lane
            this.car.x = this.displayWidth / 4; //Move to the right lane
        }
    }

    makeLines() {
        this.lineSpace = this.displayHeight / 10; //Space out the lines to 1/10th of the height of the road

        //Make the lines
        for (var i = 0; i < 20; i++) {
            //Add a line to the line group
            var line = this.scene.add.image(this.x, this.lineSpace * i, 'line'); //.image(x, y, 'ImageKey')
            line.originalY = line.y;
            this.lineGroup.add(line);
            //Note: Each item that get's added to the group are now the first line's children
        }
    }

    moveLines() {
        //Loop through lineGroup's children
        this.lineGroup.children.iterate(function(child){ //Note: iterate() is one of the group() functions
            child.y += this.lineSpace / 20; //Decrease the speed by a factor of 20
        }.bind(this)); //.bind(this) is used to make sure "this" binds/refers to the scene, and not to the group

        //Increment count by 1
        this.count++;

        //If lines have been moved 20 times
        if (this.count == 20) {
            this.count = 0; //Reset the count

            this.lineGroup.children.iterate(function(child){
                child.y = child.originalY; //Reset the new y position to the original y position
            }.bind(this));
        }
    }
}