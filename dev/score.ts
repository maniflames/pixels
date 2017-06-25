///  <reference path="typings/index.d.ts" />

class Score {
    private div : HTMLElement; 
    private _points : number; 

    get points(){
        return this._points; 
    }

    set points(value){
        this._points = value; 
        this.displayScore(this._points);
    }

    constructor(){
        this.div = document.createElement("score");
        this._points = 0; 
        document.body.appendChild(this.div);
        this.displayScore(this._points); 
    }

    private displayScore(points : number) : void {
        this.div.innerHTML = "Score: " + points; 
    }

    public remove() : void {
        this.div.remove(); 
    }

}