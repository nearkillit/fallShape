<template>
  <div class="canvas">
    <span v-if="userid === 0">
      <v-btn text disabled>ログインしてください</v-btn>
    </span>
    <span v-else-if="goalIs">
      <v-btn text @click="start" :disabled="str">start</v-btn>
      <v-btn text @click="reset">reset</v-btn>
    </span>
    <span v-else-if="!goalIs">
      <v-btn text disabled>今日はゴールできました</v-btn>
    </span>
    <span>あと{{ fallShape }}個落ちてきます</span>
    <span>ゴールした回数 {{ goalNumber }}回</span>
    <div v-if="!put || userid === 0 || !putable" class="blind"></div>
    <div ref="matterCanvas" @click="makeShape" />
    <div v-if="userid !== 0" class="haveShape">
      <p>あなたが今日置ける図形</p>
      <div class="shapePostion"></div>
      <v-btn v-if="!putable" text disabled>今日はもう置けません</v-btn>
      <v-btn v-else-if="!put" text @click="putChange">置く</v-btn>
      <v-btn v-else-if="put" text @click="putChange">置かない</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MatterJS from './js/matterMethod.js'
import { UsersStore, ShapesStore } from '@/store'

export default {
  name: 'Matter',
  data() {
    return {
      MatterJS: 0,
      getShapeState: {
        x: 0,
        y: 0,
        name: '',
        width: 0,
        height: 0,
        slope: 0,
      },
      put: false,
      randomMathTest: 0,
      fallShape: 0,
      str: false,
      testURL: 'http://localhost:7000',
    }
  },
  computed: {
    userid() {
      return UsersStore.getUsers.id
    },
    putable() {
      if (UsersStore.getUsers.put_at) {
        return this.dayDiff(UsersStore.getUsers.put_at)
      } else {
        if (UsersStore.getUsers.put_at === null) return true
        return false
      }
    },
    goalIs() {
      if (UsersStore.getUsers.goal_at) {
        return this.dayDiff(UsersStore.getUsers.goal_at)
      } else {
        return false
      }
    },
    goalNumber() {
      return UsersStore.getUsers.goal
    },
  },
  mounted() {
    if (!this.MatterJS) {
      this.MatterJS = new MatterJS({
        body: this.$refs.matterCanvas,
      })
      this.MatterJS.readyShape()
      if (this.userid !== 0) {
        this.getShapeState = this.MatterJS.makeShapeStateRandom(this.userid)
        this.MatterJS.hasShape(this.getShapeState)
      }
      this.fetchShapes()
    }
  },
  methods: {
    makeShape(e) {
      this.getShapeState.x = e.offsetX
      this.getShapeState.y = e.offsetY
      if (this.MatterJS) {
        this.MatterJS.makeShape(this.getShapeState)
        this.putatUpdate()
      }
    },
    start() {
      this.MatterJS && this.MatterJS.start()
      this.str = true
    },
    reset() {
      this.MatterJS && this.MatterJS.reset()
      this.str = false
    },
    putChange() {
      this.put = !this.put
    },
    async putatUpdate() {
      const reqBodyPutAt = {
        id: this.userid,
        put_at: new Date(),
      }

      const reqBodyShapes = {
        user_id: this.userid,
        put_x: this.getShapeState.x,
      }

      try {
        // userのput_atの更新
        await axios.put(`${this.testURL}/`, reqBodyPutAt, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })

        // shapesのuseridの追加
        const { data } = await axios.post(
          `${this.testURL}/shapes`,
          reqBodyShapes,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        )
        ShapesStore.fetch(data)
        // put_at だけnew Dateにして、あとは何も変えない
        UsersStore.fetchPutAt(new Date())
      } catch (err) {
        console.log(err)
      }
    },
    // prettier-ignore
    async fetchShapes() {
      try {
        // userのput_atの更新
        const { data } = await axios.get(`${this.testURL}/shapes`, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })
        this.fallShape = data.length
        
        ShapesStore.fetch(data)

        const getShapes = (d) => {
          return new Promise((resolve) => {
            const data = d
            window.setTimeout(() => {
              const gSS = this.MatterJS.makeShapeStateRandom(data.user_id)
              gSS.x = data.put_x
              gSS.y = 0
              this.MatterJS.makeShape(gSS)
              this.fallShape = this.fallShape - 1
              resolve('ok')
            }, 2000)
          })
        }

        const loop = async () => {
          for await (const d of data) {            
            // 関数の実行結果を格納して表示
            await getShapes(d)            
          }
        }

        loop()

      } catch (err) {
        console.log(err)
      }
    },
    dayDiff(getDate) {
      const today = new Date()
      const putday = new Date(getDate)
      const diffDate = today.getDate() - putday.getDate()
      const diffMonth = today.getMonth() - putday.getMonth()
      const diffYear = today.getFullYear() - putday.getFullYear()
      if (diffDate === 0 && diffMonth === 0 && diffYear === 0) return false
      else return true
    },
  },
}
</script>

<style>
.canvas {
  height: 550px;
}
.haveShape {
  position: absolute;
  font-size: 24px;
  top: 250px;
  left: 960px;
  text-align: center;
}

.shapePostion {
  height: 140px;
  width: 200px;
}

.blind {
  position: absolute;
  background-color: RGB(0, 0, 0, 0.3);
  height: 500px;
  width: 800px;
}
</style>
