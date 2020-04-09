class AlignHelper {
    /**
     * Scales an object to the game canvas' width
     * @param {*} obj image/item to be scaled
     * @param {*} percentage amount you want it to be scaled
     */
    static scaleToGameWidth(obj, percentage) {
        obj.displayWidth = game.config.width * percentage; //Scales an object to nth% of the screen size
        obj.scaleY = obj.scaleX; //Makes sure the scale is proportional
    }

    /**
     * Centers the the object passed
     * @param {*} obj image/item to be centered
     */
    static center(obj) {
        obj.x = game.config.width / 2;
        obj.y = game.config.height / 2;
    }

    /**
     * Centers the object horizontally
     * @param {*} obj image/item to be centered
     */
    static centerHorizontal(obj) {
        obj.x = game.config.width / 2;
    }

    /**
     * Centers the object vertically
     * @param {*} obj image/item to be centered
     */
    static centerVertical(obj) {
        obj.y = game.config.height / 2;
    }
}