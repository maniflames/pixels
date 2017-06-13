///  <reference path="typings/index.d.ts" />

class Game {

private _scene : THREE.Scene;
private _camera : THREE.PerspectiveCamera; 
private renderer : THREE.WebGLRenderer; 
private player : Player;
private ray : THREE.Ray; 
private _boundingBoxGame : THREE.Box3; 
private _util : Utility;
private _enemies = new Array<Enemy>(); 
private _lasers = new Array<Laser>(); 
private score : Score; 
private _health : Health;

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

    public get health() : Health {
        return this._health;
    }
    public get util() : Utility {
        return this._util; 
    }

    constructor(){
    this._util = new Utility();
    this.startGame(); 
    //this.showStartScreen(); 
    }

    private gameLoop() : void {

        for(var enemyIndex = 0; enemyIndex < this._enemies.length; enemyIndex++ ){
            let enemy = this._enemies[enemyIndex];

            if(this._util.detectCollision(this.player, enemy)){
                this._health.percentage -= enemy.damageValue;
                let enemyIndex = this._enemies.indexOf(enemy); 
                enemy.remove(enemyIndex); 
                }       

            for(var laserIndex = 0; laserIndex < this._lasers.length; laserIndex++){
                let laser = this._lasers[laserIndex]; 

                if(this._util.detectCollision(enemy, laser)){
                    this.score.points += enemy.pointValue;
                    enemy.remove(enemyIndex);
                    laser.remove(laserIndex); 
                }
                                
            }
        }
         
        this.player.move(); 

        for(var laser of this._lasers){
            laser.move();
        }

        for(var enemy of this._enemies){
            enemy.move(); 
        }

        this.renderer.render(this._scene, this._camera);
        requestAnimationFrame(() => this.gameLoop()); 
    }

    private startGame(){
        this.setupEnvironment();
        this.player = new Player(this,  ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
        window.setInterval(() => this.renderEnemies(), 4000); 
        requestAnimationFrame(() => this.gameLoop()); 
    }

    private renderEnemies(){
        let amountOfEnemies = this._util.generateRandomNumber(1,5); 
        amountOfEnemies = Math.floor(amountOfEnemies);

        for(var i = 0; i < amountOfEnemies; i++) {
            let enemy = new Enemy(this);
            this._enemies.push(enemy); 
        }

        console.log(this._enemies); 
    }

    public addLaser(positionX : number, positionY : number, positionZ : number){
        let laser = new Laser(positionX, positionY, positionZ, this); 
        this._lasers.push(laser); 
    }

    public endGame(){
        console.log("Game Over"); 
    }

//setup the three js environment
    private setupEnvironment() {
        let screen = document.createElement("canvas");
        screen.id = "canvas"; 
        document.body.appendChild(screen); 

        this.score = new Score(); 
        this._health = new Health(this);
    
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

    private showStartScreen(){
        let startscreen = document.createElement("div"); 
        startscreen.id = "startscreen";
        document.body.appendChild(startscreen);
        
        let gameText = document.createElement("div");
        gameText.innerHTML = "PIXELS";
        gameText.style.position = "absolute"; 
        gameText.style.top = (window.innerHeight / 6) + "px";
        gameText.style.left = (window.innerWidth / 2) - ( (1/2) * 96) + "px";
        startscreen.appendChild(gameText);

        let arrowImg = document.createElement("img");
        arrowImg.src = "img/Arrow_keys.png"; 
        arrowImg.style.position = "absolute"; 
        arrowImg.style.top = window.innerHeight / 3 + "px";
        arrowImg.style.left = (window.innerWidth / 2) - (3 * 64) + "px";
        startscreen.appendChild(arrowImg); 

        let moveText = document.createElement("div");
        moveText.innerHTML = "move";
        moveText.style.position = "absolute"; 
        moveText.style.top = (window.innerHeight / 3) + moveText.clientHeight + 64 + "px";
        moveText.style.left = (window.innerWidth / 2) - (3 * 64) + 20 + "px";
        startscreen.appendChild(moveText);  

        let spacebar = document.createElement("img");
        spacebar.src = "img/Spacebar.png"; 
        spacebar.style.position = "absolute"; 
        spacebar.style.top = (window.innerHeight / 3) + 23 + "px";
        spacebar.style.left = (window.innerWidth / 2) + (64) + "px";
        startscreen.appendChild(spacebar);

        let shootText = document.createElement("div");
        shootText.innerHTML = "shoot"; 
        shootText.style.position = "absolute"; 
        shootText.style.top = (window.innerHeight / 3) + shootText.clientHeight + 64 + "px";
        shootText.style.left = (window.innerWidth / 2) + (64) + 40 + "px";
        startscreen.appendChild(shootText);

        let startText = document.createElement("div");
        startText.innerHTML = "start";
        startText.id = "start"; 
        startText.style.position = "absolute"; 
        startText.style.top = (2/3) * (window.innerHeight) + startText.clientHeight + 64 + "px";
        startText.style.left = (window.innerWidth / 2) - ((1/2) * 80 ) + "px";
        startscreen.appendChild(startText);

        startText.addEventListener("click", (e: MouseEvent) => this.removeStartScreen);
    }

    private removeStartScreen(){
        let startscreen = document.getElementById("startscreen"); 
        startscreen.remove(); 
        this.startGame(); 
        console.log(this.startGame); 
    }

}

