import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GeometryTypes } from '../models/GeometryTypes';

export class Viewer {
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.drawnFiguresUUIDs = [];

    this.init();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x434343);
    this.camera = new THREE.PerspectiveCamera(70, this.canvas.clientWidth / this.canvas.clientHeight, 1, 1000);
    this.camera.position.z = 20;


    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio (window.devicePixelRatio);
    this.renderer.setSize (this.canvas.clientWidth, this.canvas.clientHeight);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);


    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.7);
    hemisphereLight.position.set(2.5, 10, 5);
    this.scene.add(hemisphereLight);

    this.scene.add(new THREE.AmbientLight(0x404040));

    window.addEventListener('resize', () => {
      this.onResizeWindow();
    });
  }

  onResizeWindow() {
    this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }


  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  draw(figure) {
    let geometry;

    switch(figure.geometryType) {
      case GeometryTypes.BOX:
        geometry = new THREE.BoxGeometry(figure.size, figure.size, figure.size);
        break;

      case GeometryTypes.SPHERE:
        geometry = new THREE.SphereGeometry(figure.size);
        break;

      case GeometryTypes.CYLINDER:
        geometry = new THREE.CylinderGeometry(figure.size, figure.size, this.getRandomNumber(1, 5));
    }

    const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: figure.color}));
    mesh.position.set(this.getRandomNumber(-5,5),this.getRandomNumber(-2/5,2.5),this.getRandomNumber(-5,5));
    mesh.userData.meshID = figure.id;
    this.scene.add(mesh);
    this.drawnFiguresUUIDs.push(figure.id);
  }

  removeFigure(figureId) {
    const meshToRemove = this.scene.children.find(child => child.userData.meshID === figureId);

    if (meshToRemove) {
      this.scene.remove(meshToRemove);
    }
  }

  getRandomNumber(min, max){
    return Math.random() * (max - min) + min;
  }
}