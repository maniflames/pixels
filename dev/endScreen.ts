class EndScreen {
    private score : Score; 
    
    constructor(score : Score){
        this.score = score; 

        let gameOver = document.createElement("h1");
        document.body.appendChild(gameOver);
        gameOver.innerHTML = "GAME OVER";
        gameOver.style.position = "absolute";
        gameOver.style.top = window.innerHeight / 3 + "px";
        gameOver.style.left = (window.innerWidth / 2) - (288 / 2) + "px";

        let endScore = document.createElement("h3");
        document.body.appendChild(endScore);
        endScore.innerHTML = score.points.toString(); 
        endScore.style.position = "absolute";
        endScore.style.top = (window.innerHeight / 3) + 140 + "px";
        endScore.style.left = (window.innerWidth / 2) - (endScore.clientWidth / 2) + "px"; 

        let restart = document.createElement("h3"); 
        document.body.appendChild(restart);
        restart.innerHTML = "press [f5] to restart";
        restart.style.position = "absolute";
        restart.style.top = (2/3) * window.innerHeight  + "px";
        restart.style.left = (window.innerWidth / 2) - (392 / 2) + "px";
    }
}