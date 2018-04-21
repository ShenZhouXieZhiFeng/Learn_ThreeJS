
var SCREEN_WIDTH = 1080;
var SCREEN_HEIGHT = 1920;

var scene = new THREE.Scene();
var loader = new THREE.ObjectLoader();
var renderer = new THREE.WebGLRenderer();
var camera, controls;
var mixer;
var clock = new THREE.Clock();
var loadComplete = false;

var container = document.getElementById('container');

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
container.appendChild(renderer.domElement);

//var rootPath = "obj/Sky_Cubemap";
var rootPath = "obj/01";

function onStartEnd()
{
    window.main_start(scene, camera, renderer);
}

function start() {
    var num = 0;
    $.getJSON(rootPath + "/ExportPackageInfo.json", function (data) {
        $.each(data, function (i, v) {
            var compressionType = v.compressionType;
            var url = rootPath + "/Models/" + v.name;
            switch (compressionType) {
                case "none":
                    loader.load(url, function (obj) {
                        objLoad(obj);
                    });
                    break;
                case "gzip":
                    var ajax = new XMLHttpRequest();
                    ajax.open("GET", url, true);
                    ajax.responseType = "arraybuffer";
                    ajax.onload = function () {
                        var buffer = new Uint8Array(ajax.response);
                        var b64Data = new TextDecoder("utf-8").decode(buffer);
                        var gzipString = ungzip(b64Data);
                        loader.texturePath = rootPath + "/Textures/";
                        loader.parse(JSON.parse(gzipString), function (obj) {
                            objLoad(obj);
                        });
                    };
                    ajax.send();
                    break;
                case "zip":
                    JSZipUtils.getBinaryContent(url, function (err, data) {
                        if (err) {
                            throw err; // or handle err
                        }
                        var new_zip = new JSZip();
                        new_zip.loadAsync(data).then(function (zip) {
                            var urlSplit = v.name.split('.');
                            var tempFileName = urlSplit[0] + ".json";
                            return zip.file(tempFileName).async("string");
                        }).then(function (text) {
                            loader.texturePath = rootPath + "/Textures/";
                            loader.parse(JSON.parse(text), function (obj) {
                                objLoad(obj);
                            });
                        });
                    });
                    break;
                case "lzma":
                    var ajax = new XMLHttpRequest();
                    ajax.open("GET", url, true);
                    ajax.responseType = "arraybuffer";
                    ajax.onload = function () {
                        var buffer = new Uint8Array(ajax.response);
                        var my_lzma = new LZMA("js/libs/lzma_worker.js");
                        my_lzma.decompress(buffer, function on_finish(text) {
                            loader.texturePath = rootPath + "/Textures/";
                            loader.parse(JSON.parse(text), function (obj) {
                                objLoad(obj);
                            });
                        });
                    };
                    ajax.send();
                    break;
            }
        })

        function ungzip(b64Data) {
            var strData = atob(b64Data);
            var charData = strData.split('').map(function (x) {
                return x.charCodeAt(0);
            });
            var binData = new Uint8Array(charData);
            var data = pako.inflate(binData, { to: 'string' });
            //strData = String.fromCharCode.apply(null, new Uint16Array(data));
            return data;
        }

        function objLoad(obj) {
            scene.add(obj);
            initInfo(obj);
            update();
            num++;
            if (num == data.length) {
                //所有资料加载完毕，执行回调函数
                //加载完成后强行渲染一次
                renderer.render(scene, camera);
                loadComplete = true;
                onStartEnd();
            }
        }
    });
}

var fps = 30;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

//用于记录上帧和当前帧相机的位置
var cameraThenPos = new THREE.Vector3(), cameraNowPos = new THREE.Vector3();

function update() {
    if (camera == null)
        return;
    renderer.render(scene, camera);
    //console.log("update");
    //这边的持续更新被停用，在ts中调用更新
    return;
    //requestAnimationFrame(update);
    //渲染优化,1.间隔渲染; 2.判断相机有无运动,无运动则停止渲染
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);

        if (camera != null)
            cameraThenPos = camera.position.clone();

        if (camera != null) {
            if (cameraNowPos != null || cameraThenPos != null) {
                if (cameraNowPos.x != cameraThenPos.x || cameraNowPos.y != cameraThenPos.y || cameraNowPos.z != cameraThenPos.z || !loadComplete) {
                    renderer.render(scene, camera);
                    cameraNowPos = camera.position.clone();
                }
            }
        }

        //动画更新
        var delta = 0.75 * clock.getDelta();
        if (mixer) {
            renderer.render(scene, camera);
            mixer.update(delta);
        }

        //LOD更新
        scene.traverse(function (object) {
            if (object instanceof THREE.LOD) {
                if (camera != null)
                    object.update(camera);
            }
        });
    }
}

function onResize() {
    if (camera != null) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }
}

function initInfo(node) {
    //雾效
    if (node.fog != null) {
        scene.fog = new THREE.FogExp2(node.fog.color, node.fog.density);
        scene.fog = new THREE.Fog(node.fog.color, node.fog.near, node.fog.far);
    }

    //获取动画物体并且播放动画
    //if (node.animations) {
    //    var sceneAnimationClip = node.animations[0];
    //    if (sceneAnimationClip != null) {
    //        mixer = new THREE.AnimationMixer(node);
    //        mixer.clipAction(sceneAnimationClip).play();
    //    }
    //}

    //针对实时阴影透明贴图阴影显示问题
    if (node.material != null) {
        var setCustomDepthMaterail = false;
        var mainTexture = node.material.map;
        var matType = node.material.type;

        if (matType == "MultiMaterial") {
            var mats = node.material.materials;
            for (var i = 0; i < mats.length; i++) {
                if (mats[i].transparent == true) {
                    setCustomDepthMaterail = true;
                    mainTexture = mats[i].map;
                }
            }
        }
        else {
            if (node.material.transparent == true) {
                setCustomDepthMaterail = true;
            }
        }

        if (setCustomDepthMaterail == true) {
            var uniforms = { texture: { value: mainTexture } };
            var vertexShader = document.getElementById('vertex_ShaderDepth').textContent;
            var fragmentShader = document.getElementById('fragment_ShaderDepth').textContent;

            node.customDepthMaterial = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.DoubleSide
            });
        }
    }

    ///相机初始化设置
    if (node instanceof THREE.PerspectiveCamera) {
        camera = node;

        scene.updateMatrixWorld(true);
        //renderer = new THREE.WebGLRenderer();

        //controls = new THREE.OrbitControls(camera);

        ////判断相机下是否有CameraTarget子物体,CameraTarget用于设置相机初始化聚焦点
        //var cameraTarget = camera.getObjectByName("CameraTarget");
        //if (cameraTarget != null) {
        //    var cameraTargetPosition = new THREE.Vector3();
        //    cameraTargetPosition.setFromMatrixPosition(cameraTarget.matrixWorld);
        //    camera.lookAt(cameraTargetPosition);
        //    controls.target = cameraTargetPosition;
        //}

        //开启相机阴影渲染
        renderer.shadowMap.enabled = true;
        renderer.shadowMapSoft = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        //renderer.shadowMap.renderReverseSided = false;

        //相机加载完成后刷新
        onResize();
        //document.getElementById("WebGL_Output").appendChild(renderer.domElement);
    }

    ///灯光实时阴影初始化设置
    if (node instanceof THREE.DirectionalLight) {
        //设置灯光target物体为子物体
        var lighTarge = node.getObjectByName("LightTarget");
        node.target = lighTarge;

        node.castShadow = true;
        node.shadow.mapSize.width = 1024;
        node.shadow.mapSize.height = 1024;

        var d = 20;

        node.shadow.camera.left = -d;
        node.shadow.camera.right = d;
        node.shadow.camera.top = d;
        node.shadow.camera.bottom = -d;
        //node.shadow.camera.near = 0;
        //node.shadow.camera.far = d;
        node.shadow.bias = -0.0005;
        node.shadow.camera.far = 20;
    }
        for (var i = 0; i < node.children.length; i++) {
            initInfo(node.children[i]);
        }
    }

window.onload = start;
window.addEventListener("resize", onResize, false);