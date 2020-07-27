<template>
  <div id="app">
    <div class="cal-left">
      <div class="title">计算器</div>
      <Screen></Screen>
      <div v-if="calType === 1">
        <Science></Science>
      </div>
      <div v-else-if="calType === 2">
        <Programer></Programer>
      </div>
      <div v-else>
        <Standard></Standard>
      </div>
    </div>
    <div class="cal-right">
      <Memory></Memory>
    </div>
  </div>
</template>

<script>
import Screen from './components/screen.vue'
import Standard from './components/standard.vue'
import Memory from './components/memory.vue'
import Science from './components/science.vue'
import Programer from './components/programer.vue'
// import './style/common.scss'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Screen,
    Standard,
    Memory,
    Science,
    Programer
  },
  computed: {
    ...mapState(['calType'])
  }
}
</script>

<style lang="scss">
// @import url(./style/common.scss);
#app {
  display: table;
  margin: 50px auto;
  width: 70%;
  min-width: 700px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #000000;
  box-shadow: 0 0 15px #666;
  padding: 5px;
  .cal-left {
    min-width: 280px;
    display: table-cell;
    background-color: rgba(200, 200, 200, 0.7);
    .title {
      margin: 5px 0;
      font-size: 16px;
    }
  }
  .cal-right {
    display: table-cell;
    width: 300px;
    height: 500px;
    background-color: $themeColor;
    opacity: 0.8;
  }
}
</style>
