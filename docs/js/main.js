var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(hexColor, width, height, depth, startPositionZ, game) {
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
    Object.defineProperty(GameObject.prototype, "object", {
        get: function () {
            return this._object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "depth", {
        get: function () {
            return this._depth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "speedX", {
        get: function () {
            return this._speedX;
        },
        set: function (value) {
            this._speedX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "speedY", {
        get: function () {
            return this._speedY;
        },
        set: function (value) {
            this._speedY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "speedZ", {
        get: function () {
            return this._speedZ;
        },
        set: function (value) {
            this._speedZ = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "color", {
        get: function () {
            return this._hexColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "game", {
        get: function () {
            return this._game;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "boundingBox", {
        get: function () {
            return this._boundingBox;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.move = function () {
        this._object.position.x += this._speedX;
        this._object.position.y += this._speedY;
        this._object.position.z += this._speedZ;
        this._boundingBox.setFromObject(this._object);
    };
    return GameObject;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(g) {
        var _this = this;
        var randomZ = -(Math.random() * 30) - 30;
        _this = _super.call(this, 0xff0000, 1, 1, 1, randomZ, g) || this;
        var randomX = _this.game.util.generateRandomNumber(-3, 6, true);
        var randomY = _this.game.util.generateRandomNumber(-2, 4, true);
        _this._object.position.x = randomX;
        _this._object.position.y = randomY;
        _this._speedZ = 0.1;
        _this._pointValue = 15;
        _this._damageValue = 10;
        return _this;
    }
    Object.defineProperty(Enemy.prototype, "pointValue", {
        get: function () {
            return this._pointValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "damageValue", {
        get: function () {
            return this._damageValue;
        },
        enumerable: true,
        configurable: true
    });
    Enemy.prototype.move = function () {
        _super.prototype.move.call(this);
        if (this._object.position.z > 25) {
            var search = this.game.enemies.indexOf(this);
            if (search == -1) {
                console.log("Error 404");
            }
            else {
                this.remove(search);
            }
        }
    };
    Enemy.prototype.remove = function (index) {
        this.game.scene.remove(this.game.enemies[index].object);
        this.game.enemies.splice(index);
    };
    return Enemy;
}(GameObject));
var Game = (function () {
    function Game() {
        this._enemies = new Array();
        this._lasers = new Array();
        this._util = new Utility();
        this.startGame();
    }
    Object.defineProperty(Game.prototype, "scene", {
        get: function () {
            return this._scene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "camera", {
        get: function () {
            return this._camera;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "boundingBoxGame", {
        get: function () {
            return this._boundingBoxGame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "enemies", {
        get: function () {
            return this._enemies;
        },
        set: function (array) {
            this._enemies = array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "lasers", {
        get: function () {
            return this._lasers;
        },
        set: function (array) {
            this._lasers = array;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "health", {
        get: function () {
            return this._health;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "util", {
        get: function () {
            return this._util;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var enemyIndex = 0; enemyIndex < this._enemies.length; enemyIndex++) {
            var enemy_1 = this._enemies[enemyIndex];
            if (this._util.detectCollision(this.player, enemy_1)) {
                this._health.percentage -= enemy_1.damageValue;
                var enemyIndex_1 = this._enemies.indexOf(enemy_1);
                enemy_1.remove(enemyIndex_1);
            }
            for (var laserIndex = 0; laserIndex < this._lasers.length; laserIndex++) {
                var laser_1 = this._lasers[laserIndex];
                if (this._util.detectCollision(enemy_1, laser_1)) {
                    this.score.points += enemy_1.pointValue;
                    enemy_1.remove(enemyIndex);
                    laser_1.remove(laserIndex);
                }
            }
        }
        this.player.move();
        for (var _i = 0, _a = this._lasers; _i < _a.length; _i++) {
            var laser = _a[_i];
            laser.move();
        }
        for (var _b = 0, _c = this._enemies; _b < _c.length; _b++) {
            var enemy = _c[_b];
            enemy.move();
        }
        this.renderer.render(this._scene, this._camera);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.startGame = function () {
        var _this = this;
        this.setupEnvironment();
        this.player = new Player(this, ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
        window.setInterval(function () { return _this.renderEnemies(); }, 4000);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.renderEnemies = function () {
        var amountOfEnemies = this._util.generateRandomNumber(1, 5);
        amountOfEnemies = Math.floor(amountOfEnemies);
        for (var i = 0; i < amountOfEnemies; i++) {
            var enemy = new Enemy(this);
            this._enemies.push(enemy);
        }
        console.log(this._enemies);
    };
    Game.prototype.addLaser = function (positionX, positionY, positionZ) {
        var laser = new Laser(positionX, positionY, positionZ, this);
        this._lasers.push(laser);
    };
    Game.prototype.endGame = function () {
        console.log("Game Over");
    };
    Game.prototype.setupEnvironment = function () {
        var screen = document.createElement("canvas");
        screen.id = "canvas";
        document.body.appendChild(screen);
        this.score = new Score();
        this._health = new Health(this);
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
        this._camera.position.z = 15;
        this.renderer = new THREE.WebGLRenderer({ canvas: screen, antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this._scene.add(ambientLight);
        var pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(0, 0, this._camera.position.z + 15);
        this._scene.add(pointLight);
        var geometry = new THREE.PlaneGeometry(window.innerWidth * 4, 10000, 100, 100);
        var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        material.wireframe = true;
        var floor = new THREE.Mesh(geometry, material);
        floor.rotation.x = -90 * Math.PI / 180;
        floor.position.y = -(window.innerHeight / 2);
        this._scene.add(floor);
        this._boundingBoxGame = new THREE.Box3(new THREE.Vector3(-6, -4, -80), new THREE.Vector3(6, 4, 8));
    };
    Game.prototype.showStartScreen = function () {
        var _this = this;
        var startscreen = document.createElement("div");
        startscreen.id = "startscreen";
        document.body.appendChild(startscreen);
        var gameText = document.createElement("div");
        gameText.innerHTML = "PIXELS";
        gameText.style.position = "absolute";
        gameText.style.top = (window.innerHeight / 6) + "px";
        gameText.style.left = (window.innerWidth / 2) - ((1 / 2) * 96) + "px";
        startscreen.appendChild(gameText);
        var arrowImg = document.createElement("img");
        arrowImg.src = "img/Arrow_keys.png";
        arrowImg.style.position = "absolute";
        arrowImg.style.top = window.innerHeight / 3 + "px";
        arrowImg.style.left = (window.innerWidth / 2) - (3 * 64) + "px";
        startscreen.appendChild(arrowImg);
        var moveText = document.createElement("div");
        moveText.innerHTML = "move";
        moveText.style.position = "absolute";
        moveText.style.top = (window.innerHeight / 3) + moveText.clientHeight + 64 + "px";
        moveText.style.left = (window.innerWidth / 2) - (3 * 64) + 20 + "px";
        startscreen.appendChild(moveText);
        var spacebar = document.createElement("img");
        spacebar.src = "img/Spacebar.png";
        spacebar.style.position = "absolute";
        spacebar.style.top = (window.innerHeight / 3) + 23 + "px";
        spacebar.style.left = (window.innerWidth / 2) + (64) + "px";
        startscreen.appendChild(spacebar);
        var shootText = document.createElement("div");
        shootText.innerHTML = "shoot";
        shootText.style.position = "absolute";
        shootText.style.top = (window.innerHeight / 3) + shootText.clientHeight + 64 + "px";
        shootText.style.left = (window.innerWidth / 2) + (64) + 40 + "px";
        startscreen.appendChild(shootText);
        var startText = document.createElement("div");
        startText.innerHTML = "start";
        startText.id = "start";
        startText.style.position = "absolute";
        startText.style.top = (2 / 3) * (window.innerHeight) + startText.clientHeight + 64 + "px";
        startText.style.left = (window.innerWidth / 2) - ((1 / 2) * 80) + "px";
        startscreen.appendChild(startText);
        startText.addEventListener("click", function (e) { return _this.removeStartScreen; });
    };
    Game.prototype.removeStartScreen = function () {
        var startscreen = document.getElementById("startscreen");
        startscreen.remove();
        this.startGame();
        console.log(this.startGame);
    };
    return Game;
}());
var Health = (function () {
    function Health(g) {
        this.div = document.createElement("health");
        document.body.appendChild(this.div);
        this.div.style.position = "absolute";
        this.div.style.top = 20 + "px";
        this.div.style.left = window.innerWidth - 200 + "px";
        this._percentage = 100;
        this.displayHealth(this._percentage);
        this.game = g;
    }
    Object.defineProperty(Health.prototype, "percentage", {
        get: function () {
            return this._percentage;
        },
        set: function (value) {
            this._percentage = value;
            this.displayHealth(this._percentage);
        },
        enumerable: true,
        configurable: true
    });
    Health.prototype.displayHealth = function (percentage) {
        this.div.innerHTML = "Health: " + percentage + "%";
    };
    Health.prototype.checkDeath = function () {
        if (this._percentage <= 0) {
            this.game.endGame();
        }
    };
    return Health;
}());
var Laser = (function (_super) {
    __extends(Laser, _super);
    function Laser(positionX, positionY, positionZ, g) {
        var _this = _super.call(this, 0x00ff00, 0.1, 0.1, 0.3, 0, g) || this;
        _this.object.position.set(positionX, positionY, positionZ);
        _this._speedZ = -0.1;
        return _this;
    }
    Laser.prototype.move = function () {
        _super.prototype.move.call(this);
        if (this.object.position.z > 10) {
            this.game.scene.remove(this.object);
        }
    };
    Laser.prototype.remove = function (index) {
        this.game.scene.remove(this.game.lasers[index].object);
        this.game.lasers.splice(index);
    };
    return Laser;
}(GameObject));
window.addEventListener("load", function () {
    new Game();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(g, controls, hexColor) {
        if (hexColor === void 0) { hexColor = 0x00ff00; }
        var _this = _super.call(this, hexColor, 1, 1, 1, 0, g) || this;
        _this.controls = new Array();
        _this.controls = controls;
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        window.addEventListener("keydown", function (e) { return _this.onkeydown(e); });
        return _this;
    }
    Player.prototype.onKeyUp = function (e) {
        if (e.key == this.controls[0] || e.key == this.controls[1]) {
            this._speedY = 0;
        }
        if (e.key == this.controls[2] || e.key == this.controls[3]) {
            this._speedX = 0;
        }
    };
    Player.prototype.onkeydown = function (e) {
        if (e.key == " ") {
            this._game.addLaser(this.object.position.x, this.object.position.y, this.object.position.z);
        }
        if (e.key == this.controls[0]) {
            this._speedY = 0.03;
        }
        if (e.key == this.controls[1]) {
            this._speedY = -0.03;
        }
        if (e.key == this.controls[2]) {
            this._speedX = -0.03;
        }
        if (e.key == this.controls[3]) {
            this._speedX = 0.03;
        }
    };
    return Player;
}(GameObject));
var Score = (function () {
    function Score() {
        this.div = document.createElement("score");
        this._points = 0;
        document.body.appendChild(this.div);
        this.displayScore(this._points);
    }
    Object.defineProperty(Score.prototype, "points", {
        get: function () {
            return this._points;
        },
        set: function (value) {
            this._points = value;
            this.displayScore(this._points);
        },
        enumerable: true,
        configurable: true
    });
    Score.prototype.displayScore = function (points) {
        this.div.innerHTML = "Score: " + points;
    };
    return Score;
}());
var Utility = (function () {
    function Utility() {
    }
    Utility.prototype.detectCollision = function (objectOne, objectTwo) {
        return objectOne.boundingBox.intersectsBox(objectTwo.boundingBox);
    };
    Utility.prototype.detectReverseCollision = function (objectOne, objectTwo) {
        return !objectOne.boundingBox.intersectsBox(objectTwo.boundingBox);
    };
    Utility.prototype.generateRandomNumber = function (minValue, maxValue, negative) {
        if (negative === void 0) { negative = false; }
        var result = Math.random() * maxValue + minValue;
        if (negative) {
            if (Math.random() > 0.5) {
                result = -result;
            }
        }
        return result;
    };
    return Utility;
}());
//# sourceMappingURL=main.js.map