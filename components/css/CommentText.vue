<script>
import Vue from 'vue'
import gsap from 'gsap'

export default Vue.extend({
  data(){
    return {        
    }
  },
  props:['textid'],
  computed: {    
    commentStyle() {      
      const random = Math.round(Math.random() * document.documentElement.clientHeight);
      return {        
        'left' : `${document.documentElement.clientWidth}px`,
        'top' : `${random}px`,
      }
    },
  },
  mounted(){    
    this.removeComment()
  },
  methods:{
    async removeComment(){

      await gsap.to(this.$el, 
      { duration: 5, 
        x: -1 * (document.documentElement.clientWidth + this.$el.clientWidth ) 
      });                
      this.$emit('removeComment', this.textid)      
    }
  }
})
</script>

<style scoped>
  /* computedで定義したCSS変数を使って、CSSの値を指定する */
  .text {    
    position: fixed;
    white-space: nowrap;
  }
</style>
<template>
  <!-- 「v-bind:style」でcomputedのプロパティをバインド -->
  <!-- class属性に作ったクラス名を指定する -->
  <div
    class="text"    
    :style="commentStyle"
  >
    <slot></slot>
  </div>
</template>