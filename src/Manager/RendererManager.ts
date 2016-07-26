import * as THREE from 'three';
import {EventEmitter} from 'events';
import SceneManager from './SceneManager';
import CameraManager from './CameraManager';

export default class RendererManager extends EventEmitter {
  renderer: THREE.Renderer = null;


  constructor() {
    super();
    this.renderer = new THREE.WebGLRenderer();
  }

  initialize(width: number, height: number) {
    this.renderer.setSize(width, height);

    document.body.appendChild(this.renderer.domElement);
  }

  getRenderer(): THREE.Renderer {
    return this.renderer;
  }

  render() {
    
    requestAnimationFrame(this.render.bind(this));

    this.emit("render");

    this.renderer.render(SceneManager.getInstance().getScene(), CameraManager.getInstance().getCamera());
  }


  static instance: RendererManager = null;
  static getInstance(): RendererManager {
    if (!this.instance) {
      this.instance = new RendererManager();
    }
    return this.instance;
  }
}
