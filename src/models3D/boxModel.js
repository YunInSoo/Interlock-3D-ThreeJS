import * as THREE from "three";

let camera, scene, renderer;
let mesh, mesh2;

export function init(elements) {
   
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 800;

	scene = new THREE.Scene();
    const texture = new THREE.TextureLoader().load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/crate.gif' );

    const geometry = new THREE.BoxGeometry( 400, 200, 200 );
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    
    const geometry2 = new THREE.BoxGeometry( 300, 200, 200 );
    const material2 = new THREE.MeshBasicMaterial( { map: texture } );
    
    mesh = new THREE.Mesh( geometry, material );
    mesh2 = new THREE.Mesh( geometry2, material2 );

    scene.add( mesh );
    scene.add( mesh2 );

    renderer = new THREE.WebGLRenderer( { 
        antialias: true,
        alpha: true
    } );
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( 500, 500);
    elements.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize );

}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
export function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    mesh2.rotation.x += 0.02;

    renderer.render( scene, camera );

}
