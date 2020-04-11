//Container is a collection of objects that can be treated as a single object 
//Each item in a container moves at the same time
class Road extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene); //Pass the scene to Phaser.GameObjects.Container's constructor
        this.scene = config.scene; //Makes a reference to the scene
        this.back = this.scene.add.image(0, 0, 'road'); //Declare a "back" variable containing an image that you want to add
        this.add(this.back); //Add the road inside the container
        this.scene.add.existing(this); //Add it to the scene

        AlignHelper.scaleToGameWidth(this.back, 0.5); //Scale the road/"back" to 50% of the screen size

        this.setSize(this.back.displayWidth, game.config.height); //Set a container size

        this.lineGroup = this.scene.add.group(); //Add a line group

        this.count = 0; //Count how many times the line is being moved

        //Declare a "car" variable containing an image that you want to add
        this.car = this.scene.add.sprite(this.displayWidth / 4, game.config.height * 0.9, 'cars'); //25% of the road's display width, position the car 90% down on the screen
        AlignHelper.scaleToGameWidth(this.car, 0.10); //Scale the car to 10% of the game's width

        //Add the car to the road/container
        this.add(this.car);

        //Add click event
        this.back.setInteractive(); //Allow the back to take input
        this.back.on('pointerdown', this.changeLanes, this); //When user clicks the mouse, call changeLanes and pass "this" scene

        //Add an obstacle in the road
        this.addObject();
    }

    /**
     * Adds a random object in the game's road
     */
    addObject() {
        //Create an array of objects
        var objects = [{key: 'pcar1', speed: 10, scale: 10}, {key: 'pcar2', speed: 10, scale: 10}, {key: 'cone', speed: 20, scale: 5}, {key: 'barrier', speed: 20, scale: 8}];
        var index = Math.floor(Math.random() * 4); //Randomly generate an index between 1 - 3
        var key = objects[index].key; //Key variable containing a randomly generated an object/key from the array
        var speed = objects[index].speed; //Speed variable containing the randomly generated key's speed property
        var scale = objects[index].scale / 100; //Scale variable containing the randomly generated key's scale property

        //Declare an "object" variable containing an image that you want to add
        this.object = this.scene.add.sprite(-this.displayWidth / 4, 0 , key); //(lane(x), startingPosition(y), 'objectImage')
        this.object.speed = speed; //Put the property in the object

        var lane = Math.random() * 100; //Generate a random number between 1 and 100
        if (lane < 50) { //If the randomly generated number is less than 50
            this.object.x = this.displayWidth / 4; //Add the object in the right lane
        }
        AlignHelper.scaleToGameWidth(this.object, scale); //Scale the object to 10% of the game's width
        this.add(this.object); //Add the object in the road, making the object a child of the container
    }

    /**
     * Moves the player car on the left or right lane
     */
    changeLanes() {
        if (this.car.x > 0) { //If the car if on the right lane
            this.car.x = -this.displayWidth / 4; //Move to the left lane
        }
        else { //If the car is on the left lane
            this.car.x = this.displayWidth / 4; //Move to the right lane
        }
    }

    /**
     * Road lines/lane dividers
     */
    makeLines() {
        this.lineSpace = this.displayHeight / 10; //Space out the lines to 1/10th of the height of the road

        //Make the lines
        for (var i = 0; i < 20; i++) {
            //Declare a line variable containing an image that you want to add
            var line = this.scene.add.image(this.x, this.lineSpace * i, 'line'); //.image(SetPositionSameToRoadsX(x), LinePosition(y), 'ImageKey')
            line.originalY = line.y; //Records the original position of the y
            this.lineGroup.add(line); //Add the line in the road, making it a child of the container
            //Note: Each item that get's added to the group are now the first line's children
        }
    }

    /**
     * Moves the lines/lane dividers 
     */
    moveLines() {
        //Loop through lineGroup's children
        this.lineGroup.children.iterate(function(child){ //Note: iterate() is one of the group() functions
            child.y += this.lineSpace / 20; //Decrease the speed of the line along the y axis by 20
        }.bind(this)); //.bind(this) is used to make sure "this" binds/refers to the scene, and not to the group

        //Increment count by 1
        this.count++;

        //If lines have been moved 20 times
        if (this.count == 20) {
            this.count = 0; //Reset the count
            this.lineGroup.children.iterate(function(child){ //Loop through lineGroup's children again
                child.y = child.originalY; //Reset the new y position to the original y position
            }.bind(this));
        }
    }

    /**
     * Moves the object created down the road and also checks for collision
     */
    moveObject() {
        this.object.y += this.lineSpace / this.object.speed; //Decrease the speed of the object along the y axis by 15

        if (CollisionHelper.checkCollision(this.car, this.object) == true) { //If the player car and one of the objects collide
            this.car.alpha = 0.5; //Change the player's car transparency (test code)
        }
        else {
            this.car.alpha = 1; //Don't change the player's car transparency
        }

        if (this.object.y > game.config.height) { //If the object is below the bottom of the game (out of screen)
            emitter.emit(G.UP_POINTS, 1); //Give the player 1 point
            this.object.destroy(); //Remove that object
            this.addObject(); //Add a new object
        }
    }
}