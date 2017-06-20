///  <reference path="typings/index.d.ts" />

class GameObject {
    protected _object : THREE.Mesh;
    protected geometry : THREE.Geometry;
    protected material : THREE.MeshLambertMaterial;
    protected _width : number;
    protected _height : number;
    protected _depth : number;  
    protected _speedX : number; 
    protected _speedY : number; 
    protected _speedZ : number; 
    protected _hexColor : number; 
    protected _boundingBox : THREE.Box3; 
    protected _game : Game;

        public get object() : THREE.Mesh {
            return this._object;
        }

        public get width() : number {
            return this._width;
        }

        public get height() : number {
            return this._height;
        }

        public get depth() : number {
            return this._depth;
        }

        public get speedX() : number {
            return this._speedX;
        }
        public set speedX(value : number) {
            this._speedX = value; 
        }

        public get speedY() : number {
            return this._speedY;
        }
        public set speedY(value : number) {
            this._speedY = value; 
        }

        public get speedZ() : number {
            return this._speedZ;
        }
        public set speedZ(value : number) {
            this._speedZ = value; 
        }

        public get color() : number {
            return this._hexColor;
        }

        public get game() : Game {
            return this._game; 
        }

        public get boundingBox() : THREE.Box3 {
            return this._boundingBox; 
        }

    constructor(hexColor: number, width : number, height : number, depth : number, startPositionZ : number, game : Game){
        this._width = width;
        this._height = height;
        this._depth = depth;
        this._hexColor = hexColor; 
        this.speedX = this.speedY = this.speedZ = 0; 
        this._game = game; 

        this.geometry = new THREE.BoxGeometry(this._width, this._height, this._depth); 
        this.material = new THREE.MeshLambertMaterial({ color: hexColor });

        this._object = new THREE.Mesh(this.geometry, this.material); 
        this._object.position.z = startPositionZ;
        this._object.position.x = 0;  
        game.scene.add(this._object);  

        this._boundingBox = new THREE.Box3(); 
        
    }

    public move() : void {
        this._object.position.x += this._speedX;
        this._object.position.y += this._speedY; 
        this._object.position.z += this._speedZ; 
        this._boundingBox.setFromObject(this._object);  
    }

    

}