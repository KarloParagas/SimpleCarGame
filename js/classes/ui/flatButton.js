class FlatButton extends Phaser.GameObjects.Container {
    constructor(config) {
        if (!config.scene) { //If there's no scene in the config
            console.log("Missing scene");
            return;
        }
        if (!config.key) { //If the key is missing
            console.log("Missing key");
            return;
        }
        super(config.scene); //Call container's config scene

        this.config = config; //Make a reference to config at a class level
        this.scene = config.scene; //Reference the scene
        this.back = this.scene.add.image(0, 0, config.key); //Add in the button

        this.add(this.back); //Add the back/background

        if (config.text) { //If a text is given when a FlatButton instance is created
            if (config.textConfig) { //If the text is set
                //Add a text field with the 4th parameter (from sceneMain.js' flatButton variable)
                this.text1 = this.scene.add.text(0, 0, config.text, config.textConfig); 
            }
            else { //if the text is NOT set
                this.text1 = this.scene.add.text(0, 0, config.text); //Add a text field
            }
            this.text1.setOrigin(0.5, 0.5); //Set the position of the text in the button
            this.add(this.text1); //Add in the text
        }

        if (config.x) { //If an x is given when a FlatButton instance is created
            this.x = config.x;
        }
        
        if (config.y) { //If an y is given when a FlatButton instance is created
            this.y = config.y; 
        }
        this.scene.add.existing(this); //Add the button in the scene as an existing object

        if (config.event) {
            this.back.setInteractive();
            this.back.on('pointerdown', this.pressed, this); //If the player presses a button, execute the pressed() function
        }

        this.back.on('pointerover', this.hover, this); //If the player hovers over the button, execute the hover() function
        this.back.on('pointerout', this.hoverOut, this); //If the player hovers out the button, execute the hoverOut() function
    }

    /**
     * Moves the button -5 along the y axis
     */
    hover() {
        this.y -= 5;
    }

    /**
     * Moves the button +5 along the y axis
     */
    hoverOut() {
        this.y += 5;
    }

    pressed() {
        if (this.config.params) {
            emitter.emit(this.config.event, this.config.params); 
        }
        else {
            emitter.emit(this.config.event);          
        }
    }
}