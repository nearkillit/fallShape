import * as Matter from 'matter-js'
import { UsersStore } from '@/store'

export default class MatterJS {
  constructor(props) {
    // 定数
    this.count = 0
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
    // add
    this.getCanvas = props.body
    // this.renders = this.Render.create({
    //   element: props.body,
    //   engine: this.engine,
    //   options: {
    //     width: 1400,
    //     height: 600,
    //     wireframes: false,
    //     background: 'rgba(255, 255, 255, 0.5)',
    //   },
    // })
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
    this.render()
    // this.Render.run(this.renders)
  }

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
    // もし色の指定あれば色も
    const colorPlusEnviroment = Object.assign({}, this.enviroment)
    colorPlusEnviroment.render = {}
    const getDate = new Date(props.updatedAt)
    const getDateProofreading = `${getDate.getFullYear()}-${
      getDate.getMonth() + 1
    }-${getDate.getDate()} ${getDate.getHours()}:${getDate.getMinutes()}.${getDate.getSeconds()}`

    if (props.color && props.sprite) {
      colorPlusEnviroment.render = {
        fillStyle: props.color, // 塗りつぶす色: CSSの記述法で指定
        strokeStyle: 'rgba(0, 0, 0, 0)', // 線の色: CSSの記述法で指定
        lineWidth: 0,
        sprite: props.sprite,
      }
    }

    if (props.username) {
      colorPlusEnviroment.render.text = {
        fillStyle: '#000000',
        content: `${props.username}:::${getDateProofreading}`,
        size: 16,
      }
    }

    const disk = this.Bodies.circle(
      props.x,
      props.y,
      props.width / 2,
      colorPlusEnviroment
    )

    this.shapes.push(disk)
    this.World.add(this.engine.world, [disk])
    return disk
  }

  rectangle(props) {
    const colorPlusEnviroment = Object.assign({}, this.enviroment)
    const getDate = new Date(props.updatedAt)
    const getDateProofreading = `${getDate.getFullYear()}-${
      getDate.getMonth() + 1
    }-${getDate.getDate()} ${getDate.getHours()}:${getDate.getMinutes()}.${getDate.getSeconds()}`

    if (props.username) {
      colorPlusEnviroment.render = {
        text: {
          fillStyle: '#000000',
          content: `${props.username}:::${getDateProofreading}`,
          size: 16,
        },
      }
    }

    const rect = this.Bodies.rectangle(
      props.x,
      props.y,
      props.width,
      props.height,
      colorPlusEnviroment
    )
    this.shapes.push(rect)
    this.World.add(this.engine.world, [rect])
    return rect
  }

  trapezoid(props) {
    const colorPlusEnviroment = Object.assign({}, this.enviroment)
    const getDate = new Date(props.updatedAt)
    const getDateProofreading = `${getDate.getFullYear()}-${
      getDate.getMonth() + 1
    }-${getDate.getDate()} ${getDate.getHours()}:${getDate.getMinutes()}.${getDate.getSeconds()}`

    if (props.username) {
      colorPlusEnviroment.render = {
        text: {
          fillStyle: '#000000',
          content: `${props.username}:::${getDateProofreading}`,
          size: 16,
        },
      }
    }
    const trape = this.Bodies.trapezoid(
      props.x,
      props.y,
      props.width,
      props.height,
      props.slope,
      colorPlusEnviroment
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

    const mS = Object.assign({}, props)
    mS.x = click.x
    mS.y = click.y

    if (props.name === 'trapezoid') this.trapezoid(mS)
    else if (props.name === 'circle') this.circle(mS)
    else if (props.name === 'rectangle') this.rectangle(mS)

    return click
  }

  readyShape() {
    const start = {
      x: this.floorSize.wallWidth / 2,
      y: 0,
      width: 60,
      color: '#FF0000',
      sprite: {
        texture: '/images/me_small.png',
      },
    }
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

  render() {
    const bodies = Matter.Composite.allBodies(this.engine.world)
    const canvas = this.getCanvas
    const context = canvas.getContext('2d')

    // bodies - parts
    window.requestAnimationFrame(this.render.bind(this))

    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.globalAlpha = 1 // 透明度
    context.beginPath()
    context.save()

    for (let i = 0; i < bodies.length; i += 1) {
      for (let ii = 0; ii < bodies[i].parts.length; ii += 1) {
        if (bodies[i].parts.length > 1 && ii === 0) {
          continue
        }
        const part = bodies[i].parts[ii]
        const vertices = bodies[i].parts[ii].vertices
        // console.log(part)
        if (part.render.sprite.texture) {
          // 画像の描写
          const chara = new Image()
          chara.src = part.render.sprite.texture

          const setPostion = { x: part.position.x, y: part.position.y }

          // 図形が円の場合
          if (part.label.includes('Circle')) {
            setPostion.x = part.position.x - part.circleRadius
            setPostion.y = part.position.y - part.circleRadius
            // 長方形の場合
          } else if (part.label.includes('Rectangle')) {
            setPostion.x =
              part.position.x - (part.vertices[2].x - part.vertices[0].x) / 2
            setPostion.y =
              part.position.y - (part.vertices[2].y - part.vertices[0].y) / 2
          }

          // 三角形の場合は考慮しない
          context.drawImage(chara, setPostion.x, setPostion.y)
        } else {
          // 図形の描写

          context.beginPath()
          context.moveTo(vertices[0].x, vertices[0].y)

          for (let j = 1; j < vertices.length; j += 1) {
            context.lineTo(vertices[j].x, vertices[j].y)
          }
          context.fillStyle = part.render.fillStyle || '#000000'
          context.fill()
        }

        // strokeの場合は必要
        // context.lineTo(vertices[0].x, vertices[0].y)
        // context.strokeStyle = '#000000'
        // context.stroke()

        // 文字列の描写
        if (part.render.text) {
          let fontsize = 30
          const fontfamily = part.render.text.family || 'Arial'
          const color = part.render.text.fillStyle || '#FFFFFF'

          if (part.render.text.size) {
            fontsize = part.render.text.size
          } else if (part.circleRadius) {
            fontsize = part.circleRadius / 2
          }

          let content = []
          if (typeof part.render.text === 'string') {
            content = part.render.text.split(':::')
          } else if (part.render.text.content) {
            content = part.render.text.content.split(':::')
          }

          // ::: で改行
          for (let i = 0; i < content.length; i++) {
            context.save()
            context.translate(part.position.x, part.position.y + i * 20)
            context.fillStyle = color || '#000000'
            context.textBaseline = 'middle'
            context.textAlign = 'center'
            context.font = fontsize + 'px ' + fontfamily
            context.fillText(content[i], 0, 0)
            // テキストがなかったかのように
            context.restore()
          }
        }
      }
    }
  }
  //  --------------------------------------------------------------------------
}
