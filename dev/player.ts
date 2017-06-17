///  <reference path="typings/index.d.ts" />

class Player extends GameObject {
    private controls = new Array<string>();
   
    constructor(g : Game, controls : Array<string>, hexColor : number = 0x00ff00){
        super(hexColor, 1, 1, 1, 0, g); 
        this.controls = controls; 

        window.addEventListener("keyup", (e : KeyboardEvent) => this.onKeyUp(e));
        window.addEventListener("keydown", (e : KeyboardEvent) => this.onkeydown(e));
    }

    private onKeyUp(e : KeyboardEvent){
        if(e.key == this.controls[0] || e.key == this.controls[1]){
            this._speedY = 0;
        }

        if(e.key == this.controls[2] || e.key == this.controls[3]){
            this._speedX = 0;
        }
           
    }

    private onkeydown(e : KeyboardEvent) {
        //["ArrowUp", "ArrowDown", "ArrayLeft", "ArrayRight"]

        if(e.key == " "){
            this._game.addLaser(this.object.position.x, this.object.position.y, this.object.position.z); 
        }

        if(e.key == this.controls[0]){
            this._speedY = 0.03;
            
        }

        if(e.key == this.controls[1]){
            this._speedY = -0.03;
             
        }        

        if(e.key == this.controls[2]){
            this._speedX = -0.03;
            
        }

        if(e.key == this.controls[3]){
            this._speedX = 0.03;
            
        }
    }

    public remove(){
        window.removeEventListener("keyup", (e : KeyboardEvent) => this.onKeyUp(e));
        window.removeEventListener("keydown", (e : KeyboardEvent) => this.onkeydown(e));
        this.game.scene.remove(this.object);
    }

}