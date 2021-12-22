<template>
  <div>
    <span v-show="userid !== 0" class="font-weight-black">
      ようこそ! {{ username }}さん
    </span>
    <v-btn text @click="checkstate">CheckState</v-btn>
    <v-btn text @click="game">GAME</v-btn>
    <v-btn text @click="signUp">新規登録</v-btn>
    <v-btn v-if="userid === 0" text @click="login">ログイン</v-btn>
    <v-btn v-else-if="userid !== 0" text @click="logout">ログアウト</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { UsersStore, ShapesStore } from '@/store'

export default Vue.extend({
  data() {
    return {
      testURL: 'http://localhost:7000',
    }
  },
  computed: {
    userid() {
      return UsersStore.getUsers.id
    },
    username() {
      return UsersStore.getUsers.username
    },
  },
  methods: {
    checkstate() {
      console.log(UsersStore.getUsers, 'UsersStore')
      console.log(ShapesStore.getShapes, 'ShapesStore')
    },
    login() {
      this.$router.push({ name: 'Login' })
    },
    signUp() {
      this.$router.push({ name: 'Signup' })
    },
    game() {
      this.$router.push('/')
    },
    async logout() {
      try {
        const { data } = await axios.post(`${process.env.APIURL}/logout`, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })
        UsersStore.logout()
        console.log(data)
      } catch (err) {
        alert('ログアウトに失敗しました')
        console.log(err)
      }
    },
  },
})
</script>
