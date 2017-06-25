///  <reference path="typings/index.d.ts" />

class Utility {

    public detectCollision(objectOne : GameObject, objectTwo : GameObject) : boolean { 
       return objectOne.boundingBox.intersectsBox(objectTwo.boundingBox);
    }

    public detectReverseCollision(objectOne : GameObject, objectTwo : GameObject) : boolean {
        return !objectOne.boundingBox.intersectsBox(objectTwo.boundingBox);
    }

    public generateRandomNumber( minValue : number,  maxValue : number, negative : boolean = false) : number {
        let result = Math.random() * maxValue + minValue;  

        if(negative){
            if(Math.random() > 0.5){
                result = -result;
            }
        }

        return result;        
    }

}