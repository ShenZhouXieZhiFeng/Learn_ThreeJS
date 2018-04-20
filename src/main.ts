/// <reference path='typings/tsd.d.ts' />
import GameMain from './app/GameMain';

let win: any = window as any;

win.main_start = (scene, camera, renderer) =>
{
    GameMain.instance.Init(win, scene, camera, renderer)
}
console.log("main.ts loader");