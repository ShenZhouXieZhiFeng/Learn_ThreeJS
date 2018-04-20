//main.ts之外的入口

export default class Entrance
{
    public static frameRate: number = 250;//250毫秒刷新一次

    public win: any = null;
    public scene: THREE.Scene = null;
    public camera: THREE.Camera = null;
    public render: THREE.WebGLRenderer = null;

    constructor(win: any,_scene,_camera,_render)
    {
        this.win = win;
        this.scene = _scene;
        this.camera = _camera;
        this.render = _render;
    }

    public show()
    {
        //window.onload = _start;
        //window.addEventListener("resize", _onResize, false);
        console.log("Entrance show");
        window.setInterval(this.Update, Entrance.frameRate);
    }

    private Update()
    {
        //console.log(this.scene);
        //this.scene.traverse(function (obj) { console.log(obj) });
        //this.scene.remove(this.scene.getObjectByName("Cube"));

    }
}