import * as THREE from 'three';

export default class CameraManager {
  camera: THREE.Camera = null;


  constructor() {
    this.camera = new THREE.Camera();
  }

  initialize(fov: number = 75, aspect: number = window.innerWidth / window.innerHeight, near: number = 0.1, far: number = 1000) {
    // カメラを作成
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  }

  // カメラ位置を設定
  setPosition(position: Vector3) {
    if (position.x) {
      this.camera.position.x = position.x;
    }
    if (position.y) {
      this.camera.position.y = position.y;
    }
    if (position.z) {
      this.camera.position.z = position.z;
    }
  }

  // カメラ角度を設定
  setRotation() {

  }

  getCamera(): THREE.Camera {
    return this.camera;
  }


  static instance: CameraManager = null;
  static getInstance(): CameraManager {
    if (!this.instance) {
      this.instance = new CameraManager();
    }
    return this.instance;
  }
}
