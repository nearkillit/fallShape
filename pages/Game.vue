<template>
  <div>
    <Artwork />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Artwork from "@/components/ArtWork/index.vue";

export default Vue.extend({
  data () {
    return {
      email: "",
      password: ""
    }
  },
  components: {
    Artwork
  },
  methods:{    
           
  }  
})
</script>