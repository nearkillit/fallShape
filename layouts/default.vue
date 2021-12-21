<template>
  <div>
    <Nav />
    <Nuxt /> <!-- パスと一致するページファイルが呼び出しされる -->
    <Comment v-if="userid !== 0"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UsersStore } from '@/store'

export default Vue.extend({
computed:{
    userid(){
      return UsersStore.getUsers.id
    }
  },    
})
</script>