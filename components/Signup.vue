<template>
  <v-card>
    <v-card-title>
     <h4>会員情報入力</h4>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>  
      <v-text-field v-model="username" label="username" />            
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
import axios from 'axios';

export default Vue.extend({
  data () {
    return {
      username: "",
      password: ""
    }
  },
  methods:{
    async signUp(){      
      await axios.get('http://localhost:7000')
        .then(res => 
          console.log(res));      
    }
  }  
})
</script>