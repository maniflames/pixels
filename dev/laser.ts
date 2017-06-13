///  <reference path="typings/index.d.ts" />

class Laser extends GameObject{

    constructor(positionX : number, positionY : number, positionZ : number, g : Game){
        super(0x00ff00, 0.1, 0.1, 0.3, 0, g); 
        this.object.position.set(positionX, positionY, positionZ); 
        this._speedZ = -0.1; 
    }

    move(){
        super.move();
        if(this.object.position.z > 10){
                this.game.scene.remove(this.object);
        }
    }

    remove(index : number){
        this.game.scene.remove(this.game.lasers[index].object);
        this.game.lasers.splice(index);
    }
}