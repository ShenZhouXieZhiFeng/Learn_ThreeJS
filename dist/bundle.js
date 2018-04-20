(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
//main.ts之外的入口
Object.defineProperty(exports, "__esModule", { value: true });
var Entrance = /** @class */ (function () {
    function Entrance(win, _scene, _camera, _render) {
        this.win = null;
        this.scene = null;
        this.camera = null;
        this.render = null;
        this.win = win;
        this.scene = _scene;
        this.camera = _camera;
        this.render = _render;
    }
    Entrance.prototype.show = function () {
        //window.onload = _start;
        //window.addEventListener("resize", _onResize, false);
        console.log("Entrance show");
        window.setInterval(this.Update, Entrance.frameRate);
    };
    Entrance.prototype.Update = function () {
        //console.log(this.scene);
        //this.scene.traverse(function (obj) { console.log(obj) });
        //this.scene.remove(this.scene.getObjectByName("Cube"));
    };
    Entrance.frameRate = 250; //250毫秒刷新一次
    return Entrance;
}());
exports.default = Entrance;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='typings/tsd.d.ts' />
var Entrance_1 = require("./app/Entrance");
var win = window;
//var scene;
//var camera;
//var renderer;
//var loader;
win.main_start = function (scene, camera, renderer) {
    var enter = new Entrance_1.default(win, scene, camera, renderer);
    enter.show();
};
console.log("main.ts loader");
},{"./app/Entrance":1}]},{},[2])

//# sourceMappingURL=bundle.js.map
