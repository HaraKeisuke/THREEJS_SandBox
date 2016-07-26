///<reference path="../typings/tsd.d.ts" />

import * as THREE from 'three';
import SceneManager from './Manager/SceneManager';
import RendererManager from './Manager/RendererManager';
import CameraManager from './Manager/CameraManager';

let initialize = () => {
  //レンダラーの初期化
  RendererManager.getInstance().initialize(window.innerWidth, window.innerHeight);

  //シーンの作成・初期化
  SceneManager.getInstance().initialize();

  //カメラの作成・初期化
  CameraManager.getInstance().initialize();
  CameraManager.getInstance().setPosition({ z: 5 });


  // 立方体のジオメトリーを作成
  let geometry = new THREE.BoxGeometry(Math.random() * 5 / 10, 0.3, 0.3);
  // 緑のマテリアルを作成
  let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // 上記作成のジオメトリーとマテリアルを合わせてメッシュを生成
  let cube = new THREE.Mesh(geometry, material);
  // メッシュをシーンに追加
  SceneManager.getInstance().getScene().add(cube);

  console.log(SceneManager.getInstance().getScene());

  RendererManager.getInstance().addListener("render", () => {
    // 立方体メッシュを自転
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  });


  //レンダリング
  RendererManager.getInstance().render();
};



// ウィンドウがロードされた時
window.addEventListener("load", function() {
  initialize();
  // アプリケーションの起動
  // var threeJSTest = new ThreeJSTest();
  // threeJSTest.render();

}, false);
