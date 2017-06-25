///  <reference path="typings/index.d.ts" />

class Game {

private _scene : THREE.Scene;
private _camera : THREE.PerspectiveCamera; 
private renderer : THREE.WebGLRenderer; 
private _player : Player;
private _boundingBoxGame : THREE.Box3; 
private _util : Utility;
private _enemies = new Array<Enemy>(); 
private _lasers = new Array<Laser>(); 
private startScreen : StartScreen;
private enemyRenderer : number; 
private gameRenderer : number;
private gameRendererLoop : number; 


    public get scene() : THREE.Scene {
        return this._scene; 
    }

    public get camera() : THREE.PerspectiveCamera {
        return this._camera; 
    }

    public get boundingBoxGame() : THREE.Box3 {
        return this._boundingBoxGame; 
    }

    public get enemies() : Array<Enemy>{
        return this._enemies; 
    }

    public set enemies(array : Array<Enemy>){
         this._enemies = array; 
    }

    public get lasers() : Array<Laser>{
        return this._lasers;
    }

    public set lasers(array : Array<Laser>){
        this._lasers = array; 
    }

    public get util() : Utility {
        return this._util; 
    }

    public get player() : Player {
        return this._player;
    }

    constructor(){
    this._util = new Utility();
    this.setupEnvironment();
    this.startScreen = new StartScreen(this); 

}

    private setupEnvironment() : void {
        let screen = document.createElement("canvas");
        screen.id = "canvas"; 
        document.body.appendChild(screen); 
    
        this._scene = new THREE.Scene(); 
        this._camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
        this._camera.position.z = 15; 
        this.renderer = new THREE.WebGLRenderer({canvas: screen, antialias: true}); 
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight); 

        let ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this._scene.add(ambientLight);

        let pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(0, 0, this._camera.position.z + 15); 
        this._scene.add(pointLight); 

        let geometry = new THREE.PlaneGeometry(window.innerWidth * 4, 10000, 100, 100);
        let material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
        material.wireframe = true; 
        let floor = new THREE.Mesh(geometry, material);
        floor.rotation.x = -90 * Math.PI / 180;
        floor.position.y = - (window.innerHeight / 2);
        this._scene.add(floor);  
            
        this._boundingBoxGame = new THREE.Box3( new THREE.Vector3(-6, -4, -80) , new THREE.Vector3(6,4,8)); 
    }

    public startGame(){ 
        this.startScreen = undefined; 
        this._player = new Player(this,  new Health(this), new Score(), ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
        this.enemyRenderer = window.setInterval(() => this.renderEnemies(), 4000); 
        this.gameRenderer = requestAnimationFrame(() => this.gameLoop()); 
    }

    public endGame() : void {
  
        if(this._player){
                let endScreen = new EndScreen(this._player.score); 
                this._player.remove();  
                this._player = undefined;
            }
             
        window.clearInterval(this.enemyRenderer); 

        for (let enemy of this.enemies){
            enemy.remove(); 
        }

        this.renderer.clear();

        window.clearInterval(this.gameRenderer); 
        window.clearInterval(this.gameRendererLoop);

    }

    public addLaser(positionX : number, positionY : number, positionZ : number) : void{
        if(this._player){
        let laser = new Laser(positionX, positionY, positionZ, this); 
        this._lasers.push(laser); 
        }
    }

    private renderEnemies() : void {
        let amountOfEnemies = this._util.generateRandomNumber(1,5); 
        amountOfEnemies = Math.floor(amountOfEnemies);

        for(var i = 0; i < amountOfEnemies; i++) {
            let enemy = new Enemy(this);
            this._enemies.push(enemy); 
            }
    }

    private gameLoop() : void {

    if(this._player){

        for(var enemyIndex = 0; enemyIndex < this._enemies.length; enemyIndex++ ){
            let enemy = this._enemies[enemyIndex];

            if(this._util.detectCollision(this._player, enemy)){
                this._player.health.percentage -= enemy.damageValue;
                let enemyIndex = this._enemies.indexOf(enemy); 
                enemy.remove(); 
                enemy = undefined; 
                break;
            }       

            for(var laserIndex = 0; laserIndex < this._lasers.length; laserIndex++){
                let laser = this._lasers[laserIndex]; 

                if(this._util.detectCollision(enemy, laser)){
                    this._player.score.points += enemy.pointValue;
                    enemy.remove();
                    laser.remove(laserIndex);
                    enemy = undefined;
                    laser = undefined; 
                    break;  
                }                    
            }
        }
        
        if(this._player.health.checkDeath()){
            this.endGame();
            return; 
        }

        this._player.move(); 
    }

        for(var laser of this._lasers){
            laser.move();
        }

        for(var enemy of this._enemies){
            enemy.move(); 
        }
 
        this.renderer.render(this._scene, this._camera);
        this.gameRendererLoop = requestAnimationFrame(() => this.gameLoop()); 
    }

}

