import * as THREE from 'three';

const audio = document.querySelector('#audio');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//
const canvasContainer = document.querySelector('#canvas-container');

// document.body.appendChild(renderer.domElement);
canvasContainer.appendChild(renderer.domElement);

// resize canvas on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// draw a sphere with a panorama image as a texture
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
// enable both sides of the material
material.side = THREE.DoubleSide;
// assign the panorama image as a texture
const texture = new THREE.TextureLoader().load(
  './assets/ab61d8a3-b71b-4100-8898-4ba4dbc35e8e.jpg'
);
material.map = texture;
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  renderer.render(scene, camera);
  if (audio.paused) {
    return;
  }
  cube.rotation.y += 0.01;
}

renderer.setAnimationLoop(animate);
