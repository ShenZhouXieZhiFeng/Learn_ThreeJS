//main.ts之外的入口

export default class Entrance
{
    public win: any = null;
    public scene: THREE.Scene = null;
    public camera: THREE.Camera = null;
    public render: THREE.WebGLRenderer = null;

    constructor(win:any)
    {
        this.win = win;
        this.scene = win.scene;
        this.camera = win.camera;
        this.render = win.renderer;
    }

    public show()
    {
        window.onload = this.win.start;
        window.addEventListener("resize", this.win.onResize, false);
        console.log("Entrance show");
    }
}