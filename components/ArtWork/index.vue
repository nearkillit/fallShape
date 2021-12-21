<template>
  <section class="artwork">
    <canvas ref="canvas" class="artwork__canvas" @click="makeBox"></canvas>
  </section>
</template>

<script>
import ArtworkGL from "./js/ArtworkGL";

export default {
  name: 'artwork',
  data () {
    return {
        artworkGL: 0,
        boxStatus: {
          x: 0,
          y: 0,          
        }        
    }
  },
  mounted () {
    if(!this.artworkGL) this.artworkGL = new ArtworkGL({
      $canvas: this.$refs.canvas
    });
    // this.artworkGL.init() 
  },
  
  methods: {
    makeBox(e){        
      if(this.artworkGL){
        this.boxStatus.x = e.offsetX
        this.boxStatus.y = e.offsetY  

        this.artworkGL.makeBox({
            x:this.boxStatus.x,
            y:this.boxStatus.y
        })
      }
    },    
  }
};
</script>
<style>
  .artwork{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #EAF2F5;
  }
</style>