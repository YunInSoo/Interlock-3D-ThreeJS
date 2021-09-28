import * as THREE from 'three';

import { DRACOLoader } from './jsm/DRACOLoader';
import { GLTFLoader } from './jsm/GLTFLoader';
import { OrbitControls } from './jsm/OrbitControls';
import { RoomEnvironment } from './jsm/RoomEnvironment.js';
import Stats from './jsm/stats.module.js';

const startCityModel = () => {
    let model;

    let mixer;

    const clock = new THREE.Clock();
    const container = document.getElementById('container');

    // const stats = new Stats();
    // container.appendChild( stats.dom );

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(
        new RoomEnvironment(),
        0.04
    ).texture;

    const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        100
    );
    camera.position.set(0, 0, 10);

    // const controls = new OrbitControls( camera, renderer.domElement );
    // // controls.target.set( 0, 0.5, 0 );
    // controls.enablePan = false;
    // controls.enableDamping = false;
    // controls.enableZoom = false;
    // controls.update();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./assets/gltf/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
        './assets/models/LittlestTokyo.glb',
        function (gltf) {
            model = gltf.scene;
            model.position.set(1, 1, 1);
            model.scale.set(0.01, 0.01, 0.01);
            scene.add(model);

            mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(gltf.animations[0]).play();

            animate();
        },
        undefined,
        function (e) {
            console.error(e);
        }
    );

    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    function animate() {
        requestAnimationFrame(animate);

        // const delta = clock.getDelta();

        // mixer.update( delta );
        model.rotation.z += 0.005;
        model.rotation.y += 0.005;
        // camera.rotation.z += 0.005;
        // camera.rotation.y += 0.005;
        // stats.update();

        renderer.render(scene, camera);
    }
};
export default startCityModel;
