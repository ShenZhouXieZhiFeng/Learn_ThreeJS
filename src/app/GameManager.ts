import GameMain from './GameMain';

export default class GameManager {

    public static instance: GameManager = new GameManager();
    public gameMain: GameMain = null;
    public player: THREE.Object3D = null;

    constructor()
    { }

    public Init()
    {
        console.log("GameManager init");
        this.player = GameMain.instance.scene.getObjectByName("player");
        //document.onmousedown = GameManager.instance.onKeyDown;
        //document.onkeyup = GameManager.instance.onKeyUp;
        this.test();
    }

    public test()
    {
        //GameMain.instance.camera.position.x = this.player.position.x;
        //GameMain.instance.camera.position.y = this.player.position.y + 10;
        //GameMain.instance.camera.position.z = this.player.position.z;
        //GameMain.instance.camera.lookAt(this.player.position);
        //this.player.rotation.x = 0;
        //this.player.rotation.y = 0;
        //this.player.rotation.z = 0;
    }

    public GameUpdate()
    {
        //this.player.position.x += 0.2;//右
        //this.player.position.y += 0.2;//上
        //this.player.position.z += 0.2;//后

    }

    public onKeyDown(event)
    {
        //console.log()
    }

    public onKeyUp(event)
    {

    }
}