<template>
  <div id="app">
    <div class="cal-left">
      <div class="title">计算器</div>
      <Screen></Screen>
      <div v-if="calType === 1">
        <Science></Science>
      </div>
      <div v-else-if="calType === 2">
        <Programmer></Programmer>
      </div>
      <div v-else>
        <Standard></Standard>
      </div>
    </div>
    <div class="cal-right">
      <div class="cal-right-title">
        <div v-if="calType !== 2">
          <span :class="isHistory" @click="changeCurrent(0)">历史记录</span>
        </div>
        <span :class="isMemory" @click="changeCurrent(1)">内存</span>
      </div>
      <div v-if="current === 1">
        <Memory></Memory>
      </div>
      <div v-else>
        <History></History>
      </div>
    </div>
  </div>
</template>

<script>
import Screen from './components/screen.vue'
import Standard from './components/standard.vue'
import Memory from './components/memory.vue'
import Science from './components/science.vue'
import Programmer from './components/programmer.vue'
import History from './components/history.vue'
// import './style/common.scss'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Screen,
    Standard,
    Memory,
    Science,
    Programmer,
    History
  },
  data: function () {
    return {
      current: 0
    }
  },
  watch: {
    calType: function (val) {
      if (val === 2) {
        this.current = 1
      } else {
        this.current = 0
      }
    }
  },
  computed: {
    ...mapState(['calType']),
    isHistory: function () {
      if (this.current === 0) {
        return 'current'
      } else {
        return ''
      }
    },
    isMemory: function () {
      if (this.current === 1) {
        return 'current'
      } else {
        return ''
      }
    }
  },
  methods: {
    changeCurrent (val) {
      this.current = val
    }
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
  background-color: rgba(200, 200, 200, 0.7);
  border: 1px solid #000000;
  box-shadow: 0 0 15px #666;
  padding: 5px;
  .cal-left {
    min-width: 280px;
    display: table-cell;
    background-color: rgba(200, 200, 200, 0.7);
    .title {
      margin: 0 0 10px 0;
      width: 80px;
      font-size: 20px;
      text-align: center;
    }
  }
  .cal-right {
    display: table-cell;
    position: relative;
    width: 300px;
    height: 500px;
    background-color: rgba(200, 200, 200, 0.7);
    .cal-right-title {
      div {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 10px 10px ;
        font-size: 16px;
        font-weight: 700;
        border-bottom: 4px solid rgba(200, 200, 200, 0);
      }
      .current {
        border-bottom: 4px solid #0080ff
      }
    }
  }
}
</style>
