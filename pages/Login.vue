<template>
  <v-card>
    <v-card-title>
      <h4 ref="title">ログイン画面</h4>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field v-model="email" name="email" label="email" />
      <v-text-field
        v-model="password"
        name="password"
        label="password"
        type="password"
      />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="login">送信する</v-btn>
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
    }
  },
  methods: {
    async login() {
      if (this.email === '' || this.password === '') {
        alert('未記入の箇所があります')
        return
      }
      const fetchDate = {
        password: this.password,
        email: this.email,
      }
      try {
        const { data } = await axios.post(
          `${process.env.APIURL}/login`,
          fetchDate,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        )
        if (data === 'Failure') {
          throw new Error('Failure')
        }
        UsersStore.fetch(data)
        this.$router.push('/')
      } catch (err) {
        alert('IDかパスワードが違います')
        console.log(err)
      }
    },
  },
})
</script>
