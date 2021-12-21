<template>
  <div>
    <Matters />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Matters from '@/components/Matters/index.vue'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
    }
  },
  components: {
    Matters,
  },
  methods: {},
})
</script>
