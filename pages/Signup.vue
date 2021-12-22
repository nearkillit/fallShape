<template>
  <v-card>
    <v-card-title>
      <h4>新規ユーザー登録</h4>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field v-model="username" label="username" />
      <v-text-field v-model="email" label="email" />
      <v-text-field v-model="password" label="password" />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="signUp">送信する</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { UsersStore } from '@/store'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
      username: '',
      testURL: 'http://localhost:7000',
    }
  },
  methods: {
    async signUp() {
      if (this.email === '' || this.password === '' || this.username === '') {
        alert('未記入の箇所があります')
        return
      }
      const fetchDate = {
        username: this.username,
        password: this.password,
        email: this.email,
        goal: '0',
      }

      try {
        const { data } = await axios.post(
          `${process.env.APIURL}/signup`,
          fetchDate,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        )
        console.log(data)
        if (data === 'Failure' || data.errors) {
          throw new Error('Failure')
        }
        UsersStore.fetch(data)
        this.$router.push('/')
      } catch (err) {
        alert('既にメールアドレスが登録済みです')
        console.log(err)
      }
    },
  },
})
</script>
