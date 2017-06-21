///  <reference path="typings/index.d.ts" />

class Laser extends GameObject{

    constructor(positionX : number, positionY : number, positionZ : number, g : Game){
        super(0x00ff00, 0.1, 0.1, 0.6, 0, g); 
        this.object.position.set(positionX, positionY, positionZ); 
        this._speedZ = -0.1; 
    }

    move() : void {
        super.move();
//         if(this.object.position.z > 10){
//             this.game.scene.remove(this.object);
//         }
//         if(this.object.position.z , -80){
//             this.game.scene.remove(this.object); 
//         }
    }

    remove(index : number) : void {
        this.game.scene.remove(this.game.lasers[index].object);
        this.game.lasers.splice(index, 1);
    }
}
