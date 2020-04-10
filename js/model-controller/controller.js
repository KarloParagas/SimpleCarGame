class Controller {
    constructor() {
        //This is where the game "listens" to events from the emitter
        emitter.on(G.SET_SCORE, this.setScore);
        emitter.on(G.UP_POINTS, this.upPoints);
    }

    setScore(score) {
        model.score = score; //This lets me directly set the score in the model
    }

    upPoints(points) {
        var score = model.score; //Grab the current score set by setScore() functions
        score += points; //Add new points
        model.score = score; //Set the new score in the model
    }
}
