import GameMain from './GameMain';

export default class GameManager {

    public static instance: GameManager = new GameManager();
    public gameMain: GameMain = null;
    public player: THREE.Object3D = null;

    public moveSpeed = 0.2;

    constructor()
    { }

    public Init()
    {
        console.log("GameManager init");
        this.player = GameMain.instance.scene.getObjectByName("player");
        //document.onmousedown = GameManager.instance.onKeyDown;
        //document.onkeyup = GameManager.instance.onKeyUp;
        document.ontouchmove = this.onTouchMove;
        document.onclick = () => { document.onmousemove = this.onTouchMove; };
        this.test();
    }

    public test()
    {

    }

    public GameUpdate()
    {
        //this.player.position.x += 0.2;//右
        //this.player.position.y += 0.2;//上
        //this.player.position.z += 0.2;//后
        this.player.position.z -= 0.1;//前
    }

    private preClientX;
    public onTouchMove(event)
    {
        let curX = event.clientX;
        if (this.preClientX < curX) {
            //console.log("右滑动");
            GameManager.instance.player.position.x += GameManager.instance.moveSpeed;
        }
        else if (this.preClientX > curX)
        {
            //console.log("左滑动");
            GameManager.instance.player.position.x -= GameManager.instance.moveSpeed;
        }
        this.preClientX = curX;
    }
}