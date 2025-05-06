import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Figure } from '../models/Figure'


export class Viewer {
  private canvas: HTMLCanvasElement | null;
  private scene: THREE.Scene | null;
  private camera: THREE.PerspectiveCamera | null;
  private renderer: THREE.WebGLRenderer | null;
  private controls: OrbitControls | null;
  private drawnFiguresUUIDs: string[];

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.drawnFiguresUUIDs = [];

    this.init();
    this.animate();
  }

  init() {
    // Створюємо сцену
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x434343);

    // Створюємо камеру
    this.camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 20;

    // Створюємо рендерер
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas!, antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const container = this.canvas!.parentElement!;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.renderer.setSize(width,height);

    // Створюємо контролери для навігації
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Додаємо світло
    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.7);
    hemisphereLight.position.set(2.5, 10, 5);
    this.scene.add(new THREE.AmbientLight(0x404040), hemisphereLight);

    // Обробка зміни розміру вікна
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.renderer && this.scene && this.camera && this.controls) {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
    }
  }

  draw(figure: Figure) {
    
    let geometry: THREE.BufferGeometry;

    switch (figure.geometryType) {
      case 'BOX':
        geometry = new THREE.BoxGeometry(figure.size, figure.size, figure.size);
        break;
      case 'SPHERE':
        geometry = new THREE.SphereGeometry(figure.size);
        break;
      case 'CYLINDER':
        geometry = new THREE.CylinderGeometry(figure.size, figure.size, this.getRandomNumber(1, 5));
        break;
      default:
        throw new Error(`Unknown geometry type: ${figure.geometryType}`);
    }

    const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: figure.color}));
    mesh.position.set(this.getRandomNumber(-5, 5), this.getRandomNumber(-2.5, 2.5), this.getRandomNumber(-5, 5));
    mesh.userData.meshID = figure.id;
    this.scene!.add(mesh);
    this.drawnFiguresUUIDs.push(figure.id);
  }

  remove(figureID: string) {
    const meshToRemove = this.scene!.children.find(child => child.userData.meshID === figureID);
    if (meshToRemove) {
      this.scene!.remove(meshToRemove);
    }
  }

  getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}