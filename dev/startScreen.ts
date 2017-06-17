class StartScreen {
    game : Game; 

    constructor(g : Game){
         this.game = g;
        this.showStartScreen(); 
    }

    private showStartScreen(){ 

        let startscreen = document.createElement("div"); 
        startscreen.id = "startscreen";
        document.body.appendChild(startscreen);
        
        let gameText = document.createElement("h1");
        startscreen.appendChild(gameText);
        gameText.innerHTML = "PIXELS";
        gameText.style.position = "absolute"; 
        gameText.style.top = (window.innerHeight / 6) + "px";
        gameText.style.left = (window.innerWidth / 2) - ( (1/2) * 192) + "px";

        let arrowImg = document.createElement("img");
        arrowImg.src = "img/Arrow_keys.png"; 
        arrowImg.style.position = "absolute"; 
        arrowImg.style.top = window.innerHeight / 3 + "px";
        arrowImg.style.left = (window.innerWidth / 2) - ((1/2) * 101)  + "px";
        startscreen.appendChild(arrowImg);  

        let moveText = document.createElement("div");
        moveText.innerHTML = "move";
        moveText.style.position = "absolute"; 
        moveText.style.top = (window.innerHeight / 3) + moveText.clientHeight + 64 + "px";
        moveText.style.left = (window.innerWidth / 2) - ((1/2) * 101) + 20 + "px";
        startscreen.appendChild(moveText);  

        let spacebar = document.createElement("img");
        spacebar.src = "img/Spacebar.png"; 
        spacebar.style.position = "absolute"; 
        spacebar.style.top = (window.innerHeight / 3) + 23 + 90 + "px";
        spacebar.style.left = (window.innerWidth / 2) - ((1/2) * 159) + "px";
        startscreen.appendChild(spacebar);

        let shootText = document.createElement("div");
        shootText.innerHTML = "shoot"; 
        shootText.style.position = "absolute"; 
        shootText.style.top = (window.innerHeight / 3) + 90 + 64 + "px";
        shootText.style.left = (window.innerWidth / 2) - ((1/2) * 159) + 40 + "px";
        startscreen.appendChild(shootText);


        let startText = document.createElement("div");
        startText.innerHTML = "press [p] to play";
        startText.style.position = "absolute"; 
        startText.style.top = (2/3) * (window.innerHeight) + "px";
        startText.style.left = (window.innerWidth / 2) - ((1/2) * 272) + "px";
        startscreen.appendChild(startText);

       window.addEventListener("keydown", (e : KeyboardEvent) => this.removeStartScreen(e));
    }

      private removeStartScreen(e : KeyboardEvent){
            if(e.key == "p"){
            window.removeEventListener("keydown", (e : KeyboardEvent) => this.removeStartScreen(e));
            let startscreen = document.getElementById("startscreen"); 
            startscreen.remove(); 
            this.game.startGame(); 
          }    
    }
}