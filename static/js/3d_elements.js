import * as THREE from '/node_modules/three/build/three.module.js';

let scene, camera, renderer;
let cube;

function init() {
    console.log('Initializing Three.js scene');
    // Create scene
    scene = new THREE.Scene();
    console.log('Scene created');

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    console.log('Camera created and positioned at z =', camera.position.z);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById('three-container');
    if (container) {
        container.appendChild(renderer.domElement);
        console.log('Renderer added to the DOM');
        // Set z-index to ensure it's above other elements
        renderer.domElement.style.zIndex = '10';
    } else {
        console.error('three-container not found in the DOM');
    }

    // Create a cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    console.log('Cube created and added to the scene');

    // Position the cube
    cube.position.set(0, 0, 0);
    console.log('Cube positioned at:', cube.position);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('Window resized, renderer and camera updated');
}

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Export the init function
export { init };

console.log('3d_elements.js loaded');
