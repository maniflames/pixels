///  <reference path="typings/index.d.ts" />

class Health {
    private div : HTMLElement; 
    private _percentage : number; 
    private game : Game; 

    get percentage(){
        return this._percentage; 
    }

    set percentage(value){
        this._percentage = value; 
        this.displayHealth(this._percentage);
    }

    constructor(g : Game){
        this.div = document.createElement("health");
        document.body.appendChild(this.div);
        this.div.style.position = "absolute";
        this.div.style.top = 20 + "px"; 
        this.div.style.left = window.innerWidth - 200 + "px";
        this._percentage = 100; 
        this.displayHealth(this._percentage); 

        this.game = g;
    }

    private displayHealth(percentage : number){
        this.div.innerHTML = "Health: " + percentage + "%"; 
    }

    public checkDeath(){
        if(this._percentage <= 0){
            this.game.endGame(); 
        }
    }

    public remove() {
        this.div.remove(); 
    }

}