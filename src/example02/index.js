/*
 * Tutorial from:
 * https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
 */

import "./styles.scss";
import * as THREE from "three";

const canvas = document.querySelector("#main");
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const scene = new THREE.Scene();

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
}

const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, 2),
  makeInstance(geometry, 0xaa8844, -2),
];

function render(time) {
  time /= 1000;

  cubes.forEach((cube, index) => {
    const speed = 1 + index * 0.1;
    const rotation = time * speed;
    cube.rotation.x = rotation;
    cube.rotation.y = rotation;
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
