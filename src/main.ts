/// <reference path='typings/tsd.d.ts' />
import Entrance from './app/Entrance';

let win: any = window as any;

//let scene: THREE.Scene = win.scene;
//let camera: THREE.Camera = win.camera;
//let render: THREE.WebGLRenderer = win.renderer;

let enter: Entrance = new Entrance(win);
enter.show();

