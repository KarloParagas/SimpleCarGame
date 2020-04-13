class ScoreBox extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene); //Call the scene container's constructor
        this.scene = config.scene; //Reference the scene

        this.text1 = this.scene.add.text(0, 0, "SCORE: 0"); //Add a text box to hold the score
        this.text1.setOrigin(0.5, 0.5); //Put the text in the senter of the canvas
        this.add(this.text1); //Add text/scorebox to the container

        this.text1.setBackgroundColor("#000000");

        this.scene.add.existing(this); //Add it to the scene

        emitter.on(G.SCORE_UPDATED, this.scoreUpdated, this); //This will "listen" for an event from the model to be emitted
    }

    scoreUpdated() {
        this.text1.setText("SCORE:" + model.score); //Update the text with the current score of the game

    }
}