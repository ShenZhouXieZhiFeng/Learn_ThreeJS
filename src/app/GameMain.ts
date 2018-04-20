//main.ts之外的入口
import GameManager from './GameManager';

export default class GameMain
{
    public static instance: GameMain = new GameMain();

    public win: any = null;
    //不使用全局无法执行更新
    public scene: THREE.Scene = null;
    public camera: THREE.Camera = null;
    public renderer: THREE.WebGLRenderer = null;

    public player: THREE.Object3D = null;

    constructor()
    {}

    public Init(win: any, _scene, _camera, _render)
    {
        console.log("Entrance Init");
        this.win = win;
        this.scene = _scene;
        this.camera = _camera;
        this.renderer = _render;
        GameManager.instance.Init();
        this.update();
        //for (let v of this.scene.children)
        //{
        //    console.log(v);
        //}
    }

    public update()
    {
        GameMain.instance.renderer.clear();
        GameManager.instance.GameUpdate();
        GameMain.instance.renderer.render(GameMain.instance.scene, GameMain.instance.camera);
        requestAnimationFrame(GameMain.instance.update);
    }
}