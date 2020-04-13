class Model {
    constructor() { //This will store all of the game's variables/data
        //Fields
        this._score = 0; 
        this.gameOver = false;
    }

    set score(value) {
        this._score = value;
        emitter.emit(G.SCORE_UPDATED); //Emit that event whenever the score is updated
    }

    get score() {
        return this._score;
    }
}