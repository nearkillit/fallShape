import * as THREE from 'three'

export default class ArtworkGL {
  constructor(props) {
    this.props = props
    this.init()
  }

  init() {
    // サイズを指定
    const width = 960
    const height = 540

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: this.props.$canvas,
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    // シーンを作成
    const scene = new THREE.Scene()

    // カメラを作成
    // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
    const camera = new THREE.PerspectiveCamera(30, width / height)
    camera.position.set(0, 0, +1000)

    // 箱を作成
    const geometry = new THREE.BoxGeometry(400, 400, 400)
    const material = new THREE.MeshNormalMaterial()
    const box = new THREE.Mesh(geometry, material)
    scene.add(box)

    tick()

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      //   box.rotation.y += 0.01;
      renderer.render(scene, camera) // レンダリング

      requestAnimationFrame(tick)
    }
  }
}
