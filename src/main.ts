/// <reference path='typings/tsd.d.ts' />
import Entrance from './app/Entrance';

let win: any = window as any;

//var scene;
//var camera;
//var renderer;
//var loader;

win.main_start = (scene, camera, renderer) =>
{
    let enter: Entrance = new Entrance(win, scene, camera, renderer);
    enter.show();
}

console.log("main.ts loader");