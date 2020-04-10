class CollisionHelper {
    /**
     * Checks if two objects collide
     * @param {*} object1 
     * @param {*} object2 
     */
    static checkCollision(object1, object2) {
        var distanceX = Math.abs(object1.x - object2.x); //Check the x distances between object 1 and 2
        var distanceY = Math.abs(object1.y - object2.y); //Check the y distances between object 1 and 2

        //Note: Math.abs() is used to take off any negative signs if there is one, because negatives doesn't matter

        //If the difference between object 1 and 2's x distance, is less than object 1's width (it's divided by 2 because we're going for the center of the object)
        if (distanceX < object1.width / 2) {
            //If the difference between object 1 and 2's y distance, is less than object 1's height (it's divided by 2 because we're going for the center of the object)
            if (distanceY < object1.height / 2) { 
                return true;
            }
        }
        return false;
    }
}