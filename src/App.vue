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
      <div v-if="showMemory">
        <div class="hideBg" @click="changeShowMemory"></div>
        <div class="memory">
          <Memory></Memory>
        </div>
      </div>
    </div>
    <!-- <div class="cal-right">
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
    </div> -->
  </div>
</template>

<script>
import Screen from './components/screen.vue'
import Standard from './components/standard.vue'
import Memory from './components/memory.vue'
import Science from './components/science.vue'
import Programmer from './components/programmer.vue'
// import History from './components/history.vue'
// import './style/common.scss'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Screen,
    Standard,
    Memory,
    Science,
    Programmer
    // History
  },
  data: function () {
    return {
      current: 1,
      showMemoryList: 0
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
    ...mapState(['calType', 'showMemory']),
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
    changeShowMemory () {
      this.$store.commit('changeShowMemory', !this.showMemory)
    },
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
  margin: 0.5rem auto;
  width: 80%;
  // min-width: 10rem;
  height: 12rem;
  background-color: $themeColor;
  border: 0.02rem solid #000000;
  box-shadow: 0 0 0.33rem #999;
  padding: 0.1rem;
  .cal-left {
    position: relative;
    min-width: 6.8rem;
    display: table-cell;
    background-color: $themeColor;
    .title {
      margin: 0 0 0.2rem 0;
      width: 1.6rem;
      font-size: 0.4rem;
      text-align: center;
    }
    .hideBg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background-color: #999;
      opacity: 0.5;
    }
    .memory {
      // display: none;
      width: 100%;
      height: 6.3rem;
      position: absolute;
      z-index: 3;
      bottom: 0;
      left: 0;
      background-color: #f1f1f1;
    }
  }
  .cal-right {
    display: table-cell;
    // 暂时设置为隐藏，后续需要改为自适应显示
    display: none;
    position: relative;
    width: 6rem;
    height: 10rem;
    background-color: rgba(200, 200, 200, 0.7);
    .cal-right-title {
      div {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        @include spanText(1rem);
        margin: 0.2rem 0.2rem;
        font-size: 0.32rem;
        font-weight: 700;
        border-bottom: 0.08rem solid rgba(200, 200, 200, 0);
      }
      .current {
        border-bottom: 0.08rem solid #0080ff;
      }
    }
  }
}
</style>
