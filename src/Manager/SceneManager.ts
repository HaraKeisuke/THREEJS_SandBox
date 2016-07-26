import * as THREE from 'three';

export default class SceneManager {
  scene: THREE.Scene = null;


  constructor() {
    this.scene = new THREE.Scene();
  }

  initialize() {
    
  }

  getScene(): THREE.Scene {
    return this.scene;
  }


  static instance: SceneManager = null;
  static getInstance(): SceneManager {
    if (!this.instance) {
      this.instance = new SceneManager();
    }
    return this.instance;
  }
}
