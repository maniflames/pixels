# pixelsGame

This was a school assignment. The idea was that you could make whatever game you wanted to make as long as you used typescript and used some specific prinicples within object oriented programming. 

### Play and/or install
You can play the game online by going to this website: 
[http://imanidap.nl/game](http://imanidap.nl/game "Pixels").

If you want to install the game you can fork, clone or download this repository. Put it in a folder from where you can host the game locally. If you want to make your own version of the game make sure you install [typescript](https://www.typescriptlang.org/ "Typescript webite").


## UML

The following image is a representation of how the different classes relate to eachother.

![alt text](docs/img/UML_Pixels.jpg "UML")
 
## Classes & Instances
The UML from above shows the different classes I have made. An intance of a class is the same as a new object of that class. 

In my [`Main.ts`](dev/main.ts "Go to main.ts") file I make an intance of the [`Game`](dev/game.ts "Go to the Game Class") class. 

```Typescript
    window.addEventListener("load", function(){
        new Game(); 
    });
```

## Encapsulation
All the properties of an object are private to protect them. I have written getters and setters for properties that are needed outside of the class. Only methods I just want to call within the class and nowhere else are private. 

A short example of this is [`Score`](dev/score.ts "Go to the Score class"). 
```typescript
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

    //Some Code

    private displayScore(points : number) : void {
        this.div.innerHTML = "Score: " + points; 
    }

    public remove() : void {
        this.div.remove(); 
    }

}
```

## Inheritance
To save myself a lot of time I made a class called [`GameObject`](dev/gameObject.ts "Go to the GameObject class"). This class has all the basic properties and methods for object that are part of the game. The constructor makes sure the object is put in the game and creates a boudingbox so collosion with the object can be detected.

An example of a child class form the `GameObject` is [`Laser`](dev/laser.ts "Go to the Laser Class").
```typescript
class Laser extends GameObject{

    constructor(positionX : number, positionY : number, positionZ : number, g : Game){
        super(0x00ff00, 0.1, 0.1, 0.3, 0, g); 
        this.object.position.set(positionX, positionY, positionZ); 
        this._speedZ = -0.1; 
    }

    public move() : void {
        super.move();

        if(this.object.position.z > 10){
            this.game.scene.remove(this.object);
        }

        if(this.object.position.z < -80){
            this.game.scene.remove(this.object); 
        }
    }

    //some code
}
```

## Composition
Instead creating an instance of every class within [`Game`](dev/game.ts "Go to the Game Class") I used composition to distibute the classes. A good example of my use of composition is the relationship between [`Player`](dev/player.ts "Go to the player Class") and [`Health`](dev/health.ts "Go to the health class"). 

Because `Health` is something that the player has I made it a property of player. To check if the player has died I wrote the `checkDeath` method in `Health`. The only thing is that I have to check the health within the `gameLoop` in `Game`. By write a getter for `Health` in `Player` I can execute `checkDeath` without making an instance of `Health` in `Game`.

The explanation above shown as code in `Game`:
```typescript
class Game {
    //A lot of code

    private gameLoop() : void {
        if(this.player){

            //more code
            if(this._player.health.checkDeath()){
            this.endGame();
            return; 
        }

        this._player.move();

        }

        //even more code
    }

}
```