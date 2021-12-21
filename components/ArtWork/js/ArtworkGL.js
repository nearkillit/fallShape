import * as THREE from 'three'
import * as CANNON from 'cannon'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class ArtworkGL {
  constructor(props) {
    this.state = {}
    this.addbox = []
    this.lastTime = ''
    this.fixedTimeStep = 1.0 / 60.0 // seconds
    this.maxSubSteps = 10
    this.CONSTANT = {
      initPoint: { x: 0, y: 0, z: 0 },
      initWeight: 5,
      initMass: 5,
      positionY: 20,
      margin: 20,
      rotate: {
        x: 0,
        y: 0,
        z: 0,
      },

      ground_size: 100,
      axis_rotate: 0,
      limit: 2,
      width: 100,
      height: 100,
      color1: '#cccccc',
    }

    this.world = new CANNON.World()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      80,
      window.innerWidth / window.innerHeight
    )

    this.renderer = new THREE.WebGLRenderer({
      canvas: props.$canvas,
    })
    // this.renderer = new THREE.WebGLRenderer()

    this.props = props
    this.init()
  }

  init() {
    // init World
    this.world.gravity.set(0, -9.82, 0) // m/s²

    this.camera.position.set(0, 0, 100)
    // generate object
    this.generate()
    // light
    // 環境光源
    const ambient = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(ambient)
    // 平行光源
    const direction = new THREE.DirectionalLight(0xffffff, 1)
    this.scene.add(direction)
    // // 点光源
    // const pointLight = new THREE.PointLight(0xffffff, 10, 100, 1.0)
    // pointLight.position.set(7, 0, 0)
    // this.scene.add(pointLight)
    // // 照明を可視化するヘルパー
    // const lightHelper = new THREE.PointLightHelper(pointLight)
    // this.scene.add(lightHelper)
    // controls ------------------------------
    // const controls = new OrbitControls(this.camera, this.props.$canvas)
    // controls.maxDistance = 5000.0
    // renderer
    // const renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // add helper
    // const gridHelper = new THREE.GridHelper(1000, 20) // size, step
    // this.scene.add(gridHelper)
    // const axisHelper = new THREE.AxisHelper(1000, 50)
    // this.scene.add(axisHelper)
    // X軸が赤色、Y軸が緑色、Z軸が青色

    this.render()
    requestAnimationFrame(() => this.animate(0))
  }

  Ground(size) {
    // cannon body ----------
    const body = new CANNON.Body({
      mass: 0, // mass == 0 makes the body static
    })
    body.addShape(new CANNON.Plane())
    // cannonではz軸を上向きの軸としてるので、床を設置するとxy面に床が生成される
    // three.jsだとy軸を上向き軸としがちなので、変な感じにならないようにx軸に90度回転させてあげる。
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    // three mesh ----------
    const geometry = new THREE.PlaneGeometry(size, size)
    const material = new THREE.MeshBasicMaterial({
      color: this.CONSTANT.color1,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.y = 0

    return { body, mesh }
  }

  /**
   * 箱作る
   * @return {body, mesh} ThreejsのmeshとCannon.jsのbodyを返す
   */
  Box(props) {
    const { point, weight, mass } = props
    // cannon body ----------
    const body = new CANNON.Body({
      mass, // kg
      position: new CANNON.Vec3(point.x, point.y, point.z), // m
      shape: new CANNON.Box(
        new CANNON.Vec3(weight / 2, weight / 2, weight / 2)
      ),
    })

    // 回転追加してみる
    // body.angularVelocity.set(Math.random(), Math.random(), 0)
    // three mesh ----------
    const geometry = new THREE.BoxGeometry(weight, weight, weight)
    const material = new THREE.MeshStandardMaterial({
      color: 0xaa0000,
      roughness: 0.0,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(point.x, point.y, point.z)
    return { body, mesh }
  }

  generate() {
    // 床
    const ground = this.Ground(this.CONSTANT.ground_size)
    this.scene.add(ground.mesh)
    this.world.addBody(ground.body)
    const boxPosition = { x: 0, y: this.CONSTANT.positionY, z: 0 }
    const box = (this.state.box = this.Box({
      point: boxPosition,
      weight: this.CONSTANT.initWeight,
      mass: this.CONSTANT.initMass,
    }))

    this.scene.add(box.mesh)
    this.world.addBody(box.body)
  }

  animate(time) {
    const { box } = this.state
    if (this.lastTime !== undefined) {
      const dt = (time - this.lastTime) / 1000
      this.world.step(this.fixedTimeStep, dt, this.maxSubSteps)
    }
    const { mesh, body } = box
    // Cannno.js の Three.js へのつなぎこみは
    // copy で body の position, quaternion を mesh に反映させるだけ！
    mesh.position.copy(body.position)
    mesh.quaternion.copy(body.quaternion)
    // makebox
    this.addbox.map((ab) => {
      ab.mesh.position.copy(ab.body.position)
      ab.mesh.quaternion.copy(ab.body.quaternion)
      return ab
    })
    this.lastTime = time
    this.render()
    // this.camera.lookAt(new THREE.Vector3(200, 0, 100))
    requestAnimationFrame(() => this.animate(0))
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  // add methods
  makeBox(getPostion) {
    const mouse = new THREE.Vector2()
    mouse.x = (getPostion.x / window.innerWidth) * 2 - 1
    mouse.y = -(getPostion.y / window.innerHeight) * 2 + 1
    mouse.y = mouse.y < 0 ? 0.1 : mouse.y

    const boxPosition = {
      x: mouse.x * this.CONSTANT.ground_size,
      y: mouse.y * this.CONSTANT.ground_size,
      z: 0,
    }
    const box = this.Box({
      point: boxPosition,
      weight: this.CONSTANT.initWeight,
      mass: this.CONSTANT.initMass,
    })
    this.addbox.push(box)

    this.scene.add(box.mesh)
    this.world.addBody(box.body)
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
}
