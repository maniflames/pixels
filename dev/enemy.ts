///  <reference path="typings/index.d.ts" />
///  <reference path="gameObject.ts" /> //Enemy wordt voor gameObject ingeladen

class Enemy extends GameObject{ 
private _pointValue : number; 
private _damageValue : number;

get pointValue(){
    return this._pointValue;
}

get damageValue(){
    return this._damageValue; 
}

    constructor(g : Game){
        let randomZ = -(Math.random() * 30) - 30;
        super(0xff0000, 1, 1, 1, randomZ, g);

        let randomX = this.game.util.generateRandomNumber(-3, 6, true);
        let randomY = this.game.util.generateRandomNumber(-2, 4, true); 

        this._object.position.x = randomX; 
        this._object.position.y = randomY; 
        
        this._speedZ = 0.1;  

        this._pointValue = 15; 
        this._damageValue = 10; 
    }

    move(){
        super.move();
        if(this._object.position.z > 25){
            let search = this.game.enemies.indexOf(this);
            if(search == -1){
                console.log("Error 404"); 
            } else {
                this.remove(search); 
            }
        }
    }

    remove(index : number){
        this.game.scene.remove(this.game.enemies[index].object);
        this.game.enemies.splice(index);
    }

}