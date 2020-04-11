class AlignGrid {
    constructor(config) {
        this.config = config; //Make a reference to the config so it can be used anywhere in the class
        if (!config.scene) { //If there's no scene in the config
            console.log("Missing scene");
            return;
        }
        if (!config.rows) { //If the rows are missing
            config.rows = 5; //Default value from the configuration in main.js
        }
        if (!config.cols) { //If the columns are missing
            config.cols = 5; //Default value from the configuration in main.js
        }
        if (!config.height) { //If the height is missing
            config.height = game.config.height; //Default value from the configuration in main.js
        }
        if (!config.width) { //If the width is missing
            config.width = game.config.width;
        }
        this.scene = config.scene; //Make a reference to the config's scene
        this.cellWidth = config.width / config.cols; //Define a cell width
        this.cellHeight = config.height / config.rows; //Define a cell height
    }

    /**
     * Draws a grid in the canvas
     */
    show() {
        this.graphics = this.scene.add.graphics(); //Define graphics
        this.graphics.lineStyle(2, 0xff000); //Specify a line style
        for (var i = 0; i < this.config.width; i += this.cellWidth) { //Loop to draw a line from top to bottom (columns)
            this.graphics.moveTo(i, 0); //Starting position
            this.graphics.lineTo(i , this.config.height); //How far the line goes down from moveTo(i, 0) then down to lineTo(i, this.config.height)
        }
        for (var i = 0; i < this.config.height; i += this.cellHeight) { //Loop to draw a line from left to right (rows)
            this.graphics.moveTo(0, i); //Starting position
            this.graphics.lineTo(this.config.height, i); //How far the line goes down from moveTo(i, 0) then down to lineTo(i, this.config.height)
        }
        this.graphics.strokePath(); //The call to draw the lines
    }

    /**
     * Places an object/image at a specified position
     * @param {*} xx x position
     * @param {*} yy y position
     * @param {*} object image that you want to place at the specified x and y position
     */
    placeAt(xx, yy, object) {
        //Calculate position based on cellWidth and cellHeight
        var x2 = this.cellWidth * xx + this.cellWidth / 2;
        var y2 = this.cellHeight * yy + this.cellHeight / 2;

        object.x = x2;
        object.y = y2;
    }

    /**
     * Places an object at the specified grid square index
     * @param {*} index 
     * @param {*} object 
     */
    placeAtIndex(index, object) {
        //Calculate the x and y grid position
        var yy = Math.floor(index / this.config.cols);
        var xx = index - (yy * this.config.cols);
        this.placeAt(xx, yy, object);
    }

    /**
     * Displays a number in each grid square
     */
    showNumbers() {
        this.show();
        var count = 0;
        for (var i = 0; i < this.config.rows; i++) {
            for (var j = 0; j < this.config.cols; j++) {
                var numText = this.scene.add.text(0, 0, count, {color: '#ff0000'});
                numText.setOrigin(0.5, 0.5);
                this.placeAtIndex(count, numText);
                count++;
            }
        }
    }
}