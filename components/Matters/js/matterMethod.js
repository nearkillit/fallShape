import * as Matter from 'matter-js'
import { UsersStore } from '@/store'

export default class MatterJS {
  constructor(props) {
    // 定数
    // 床
    this.floorSize = {
      width: 800,
      height: 500,
      groundHeight: 50,
      wallWidth: 100,
      color: '#000000',
    }
    this.humanSize = {
      height: 100,
    }
    this.goalSize = {
      width: 90,
      height: 100,
    }
    this.enviroment = {
      density: 0.0005,
      frictionAir: 0.02,
      restitution: 0.8,
      friction: 0.1,
    }
    this.haveShape = {
      x: 1100,
      y: 300,
    }
    this.startShape = ''
    this.goalShape = ''
    this.Engine = Matter.Engine
    this.Render = Matter.Render
    this.World = Matter.World
    this.Constraint = Matter.Constraint
    this.Body = Matter.Body
    this.Bodies = Matter.Bodies
    this.engine = this.Engine.create()
    this.render = this.Render.create({
      element: props.body,
      engine: this.engine,
      options: {
        width: 1400,
        height: 600,
        wireframes: false,
        background: 'rgba(255, 255, 255, 0.5)',
      },
    })
    this.engine.world.gravity.y = 0.98

    this.shapes = []
    this.props = props
    Matter.Events.on(this.engine, 'collisionStart', (event) => {
      this.goalCheck(event)
    })
    this.init()
  }

  // スタート
  init() {
    this.ground()
    this.Engine.run(this.engine)
    this.Render.run(this.render)
  }

  //

  // ユーザーが持っている図形 -----------------------------------------------------
  hasShape(props) {
    let addShape

    if (props.name === 'circle') {
      addShape = this.circle({
        x: this.haveShape.x,
        y: this.haveShape.y,
        width: props.width,
      })
    } else if (props.name === 'rectangle') {
      addShape = this.rectangle({
        x: this.haveShape.x,
        y: this.haveShape.y,
        width: props.width,
        height: props.height,
      })
    } else if (props.name === 'trapezoid') {
      addShape = this.trapezoid({
        x: this.haveShape.x,
        y: this.haveShape.y,
        width: props.width,
        height: props.height,
        slope: props.slope,
      })
    }
    const hS = this.Body.create({
      parts: [addShape],
      isStatic: true,
    })

    this.World.add(this.engine.world, hS)
  }
  //  -----------------------------------------------------------------------

  // 初期状態 ----------------------------------------------------------------
  // 床
  ground() {
    const cylinder = this.Body.create({
      parts: [
        // 下壁
        this.Bodies.rectangle(
          this.floorSize.width / 2,
          this.floorSize.height - this.floorSize.groundHeight / 2,
          this.floorSize.width - this.floorSize.wallWidth * 2,
          this.floorSize.groundHeight,
          {
            render: {
              fillStyle: this.floorSize.color,
            },
          }
        ),
        // 左壁
        this.Bodies.rectangle(
          this.floorSize.wallWidth / 2,
          (this.floorSize.height + this.humanSize.height) / 2,
          this.floorSize.wallWidth,
          this.floorSize.height - this.humanSize.height,
          {
            render: {
              fillStyle: this.floorSize.color,
            },
          }
        ),
        // 右壁
        this.Bodies.rectangle(
          this.floorSize.width - this.floorSize.wallWidth / 2,
          (this.floorSize.height + this.humanSize.height) / 2,
          this.floorSize.wallWidth,
          this.floorSize.height - this.humanSize.height,
          {
            render: {
              fillStyle: this.floorSize.color,
            },
          }
        ),
      ],
      isStatic: true, // 動かない
    })
    this.World.add(this.engine.world, cylinder)
  }

  // ゴール
  goal() {
    const goal = this.Bodies.rectangle(
      this.floorSize.width - this.floorSize.wallWidth / 2,
      this.humanSize.height / 2,
      this.goalSize.width,
      this.goalSize.height,
      {
        render: {
          sprite: {
            texture: '/images/20735.jpg',
          },
        },
      }
    )
    this.goalShape = goal
    this.World.add(this.engine.world, [goal])
  }
  //  --------------------------------------------------------------------------

  // 図形メソッド ----------------------------------------------------------------
  circle(props) {
    // 密度,空気抵抗,反発,摩擦
    const disk = this.Bodies.circle(
      props.x,
      props.y,
      props.width / 2,
      this.enviroment
    )

    this.shapes.push(disk)
    this.World.add(this.engine.world, [disk])
    return disk
  }

  rectangle(props) {
    const rect = this.Bodies.rectangle(
      props.x,
      props.y,
      props.width,
      props.height,
      this.enviroment
    )
    this.shapes.push(rect)
    this.World.add(this.engine.world, [rect])
    return rect
  }

  trapezoid(props) {
    const trape = this.Bodies.trapezoid(
      props.x,
      props.y,
      props.width,
      props.height,
      props.slope,
      this.enviroment
    )
    this.shapes.push(trape)
    this.World.add(this.engine.world, [trape])
    return trape
  }

  polygon(props) {
    const poly = this.Bodies.polygon(
      props.x,
      props.y,
      props.sides,
      props.width,
      this.enviroment
    )
    this.shapes.push(poly)
    this.World.add(this.engine.world, [poly])
    return poly
  }

  //  --------------------------------------------------------------------------

  //  図形のセット ---------------------------------------------------------------
  makeShape(props) {
    const click = { x: 0, y: this.humanSize.height / 2 }
    // 関係ないところクリックしたら何もさせない
    if (props.x > this.floorSize.width) {
      return false
    }
    if (props.x < this.floorSize.wallWidth + props.width / 2) {
      click.x = this.floorSize.wallWidth + props.width / 2
    } else if (
      props.x >
      this.floorSize.width - this.floorSize.wallWidth - props.width / 2
    ) {
      click.x =
        this.floorSize.width - this.floorSize.wallWidth - props.width / 2
    } else {
      click.x = props.x
    }

    const mS = props
    mS.x = click.x
    mS.y = click.y

    if (props.name === 'trapezoid') this.trapezoid(mS)
    else if (props.name === 'circle') this.circle(mS)
    else if (props.name === 'rectangle') this.rectangle(mS)

    return click
  }

  readyShape() {
    const start = { x: this.floorSize.wallWidth / 2, y: 0, width: 60 }
    this.startShape = this.circle(start)
    this.goal()
  }

  start() {
    this.Body.applyForce(
      this.startShape,
      {
        x: this.startShape.position.x,
        y: this.startShape.position.y,
      },
      {
        x: 0.1,
        y: 0,
      }
    )
  }

  reset() {
    this.Body.setVelocity(this.startShape, { x: 0, y: 0 })
    this.Body.setPosition(this.startShape, {
      x: this.floorSize.wallWidth / 2,
      y: 0,
    })
  }
  //  --------------------------------------------------------------------------

  //  汎用メソッド  --------------------------------------------------------------
  goalCheck(e) {
    const pairs = e.pairs
    if (pairs.length > 0) {
      pairs.forEach((p) => {
        if (p.bodyA === this.startShape && p.bodyB === this.goalShape) {
          alert('ゴール！！')
          UsersStore.fetchGoalAt(new Date())
          UsersStore.incrementGoal()
          Matter.Events.off(this.engine, 'collisionStart')
        }
      })
    }
  }

  getPostion(props) {
    const click = { x: 0, y: this.humanSize.height / 2 }
    // 関係ないところクリックしたら何もさせない
    if (props.x > this.floorSize.width) {
      return
    }
    if (props.x < this.floorSize.wallWidth + props.width / 2) {
      click.x = this.floorSize.wallWidth + props.width / 2
    } else if (
      props.x >
      this.floorSize.width - this.floorSize.wallWidth - props.width / 2
    ) {
      click.x =
        this.floorSize.width - this.floorSize.wallWidth - props.width / 2
    } else {
      click.x = props.x
    }

    const mS = props
    mS.x = click.x
    mS.y = click.y
  }

  // 乱数の作成
  // ユーザーID,日時で計算する
  // props: {
  //  id: number
  // }
  // ↓
  // shapeRandom: {
  //  shape_name: trapezoid | circle | rectangle,
  //  shape_width: number(50~200),
  //  shape_height: number(50~200),
  //  shape_slope: number(0.1~2.0)
  // }

  makeShapeStateRandom(id, getToday) {
    let randomSum = 0
    const today = getToday
    const ShapeState = {
      name: '',
      width: 0,
      height: 0,
      slope: 0,
    }

    // shape name
    randomSum =
      id + today.getFullYear() + (today.getMonth() + 1) + today.getDate()
    randomSum = Math.sin(randomSum)
    const shapeNameMath = Math.round((randomSum + 1) * 100) % 3
    if (shapeNameMath === 0) {
      ShapeState.name = 'circle'
    } else if (shapeNameMath === 1) {
      ShapeState.name = 'trapezoid'
    } else {
      ShapeState.name = 'rectangle'
    }

    // shape width
    randomSum =
      id +
      today.getFullYear() +
      (today.getMonth() + 1) +
      today.getDate() * today.getDate()
    randomSum = Math.sin(randomSum)
    ShapeState.width = Math.round(150 + 100 * randomSum)

    // shape height
    randomSum =
      id +
      today.getFullYear() +
      (today.getMonth() + 1) * (today.getMonth() + 1) +
      today.getDate()
    randomSum = Math.sin(randomSum)
    ShapeState.height = Math.round(150 + 100 * randomSum)

    // shpae slope
    randomSum =
      id +
      today.getFullYear() * today.getFullYear() +
      (today.getMonth() + 1) +
      today.getDate()
    randomSum = Math.sin(randomSum)
    ShapeState.slope = 1 + randomSum

    return ShapeState
  }

  //  --------------------------------------------------------------------------
}
