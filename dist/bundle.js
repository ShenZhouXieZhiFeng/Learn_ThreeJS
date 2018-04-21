(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//main.ts之外的入口
var GameManager_1 = require("./GameManager");
var GameMain = /** @class */ (function () {
    function GameMain() {
        this.win = null;
        //不使用全局无法执行更新
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.player = null;
    }
    GameMain.prototype.Init = function (win, _scene, _camera, _render) {
        console.log("Entrance Init");
        this.win = win;
        this.scene = _scene;
        this.camera = _camera;
        this.renderer = _render;
        GameManager_1.default.instance.Init();
        this.update();
        //for (let v of this.scene.children)
        //{
        //    console.log(v);
        //}
    };
    GameMain.prototype.update = function () {
        GameMain.instance.renderer.clear();
        GameManager_1.default.instance.GameUpdate();
        GameMain.instance.renderer.render(GameMain.instance.scene, GameMain.instance.camera);
        requestAnimationFrame(GameMain.instance.update);
    };
    GameMain.instance = new GameMain();
    return GameMain;
}());
exports.default = GameMain;
},{"./GameManager":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameMain_1 = require("./GameMain");
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.gameMain = null;
        this.player = null;
        this.moveSpeed = 0.2;
    }
    GameManager.prototype.Init = function () {
        var _this = this;
        console.log("GameManager init");
        this.player = GameMain_1.default.instance.scene.getObjectByName("player");
        //document.onmousedown = GameManager.instance.onKeyDown;
        //document.onkeyup = GameManager.instance.onKeyUp;
        document.ontouchmove = this.onTouchMove;
        document.onclick = function () { document.onmousemove = _this.onTouchMove; };
        this.test();
    };
    GameManager.prototype.test = function () {
    };
    GameManager.prototype.GameUpdate = function () {
        //this.player.position.x += 0.2;//右
        //this.player.position.y += 0.2;//上
        //this.player.position.z += 0.2;//后
        this.player.position.z -= 0.1; //前
    };
    GameManager.prototype.onTouchMove = function (event) {
        var curX = event.clientX;
        if (this.preClientX < curX) {
            //console.log("右滑动");
            GameManager.instance.player.position.x += GameManager.instance.moveSpeed;
        }
        else if (this.preClientX > curX) {
            //console.log("左滑动");
            GameManager.instance.player.position.x -= GameManager.instance.moveSpeed;
        }
        this.preClientX = curX;
    };
    GameManager.instance = new GameManager();
    return GameManager;
}());
exports.default = GameManager;
},{"./GameMain":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='typings/tsd.d.ts' />
var GameMain_1 = require("./app/GameMain");
var win = window;
win.main_start = function (scene, camera, renderer) {
    GameMain_1.default.instance.Init(win, scene, camera, renderer);
};
console.log("main.ts loader");
},{"./app/GameMain":1}]},{},[3])

//# sourceMappingURL=bundle.js.map
