<template>
  <div class="memory">
    <div v-if="memoryList.length" class="memory-list">
      <div v-for="(item, index) in memoryList" v-bind:key="index" class="memory-item" @click="memoryUse(memoryList.length-(index+1))">
        <div class="memory-item-val">{{ item }}</div>
        <div class="memory-item-operator">
          <span @click="memoryCut(memoryList.length-(index+1))">MC</span>
          <span @click="memoryChange([1, memoryList.length-(index+1)])">M+</span>
          <span @click="memoryChange([0, memoryList.length-(index+1)])">M-</span>
        </div>
      </div>
    </div>
    <div v-else class="no-text">
      暂时没有内存记录
    </div>
    <div class="delete" v-if="memoryList.length">
      <span @click="deleteMemory">Del</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'memory',
  data: function () {
    return {
      current: 0
    }
  },
  computed: {
    ...mapState(['screenShow', 'systemType']),
    ...mapGetters(['showMemoryList']),
    memoryList: function () {
      return this.showMemoryList.map((item) => {
        return item.toString(this.systemType)
      })
    }
  },
  methods: {
    memoryCut (index) {
      this.$store.commit('memoryCut', index)
    },
    memoryChange (args) {
      this.$store.commit('memoryChange', args)
    },
    deleteMemory () {
      this.$store.commit('deleteMemory')
    },
    memoryUse (index) {
      this.$store.commit('memoryUse', index)
    }
  }
}
</script>

<style lang='scss'>
.memory {
  width: 100%;
  position: relative;
  .memory-list {
    height: 5.3rem;
    overflow: auto;
    .memory-item {
      width: 100%;
      height: 1.8rem;
      &:hover {
        background-color: #9f9f9f;
        .memory-item-operator {
          display: block;
        }
      }
      .memory-item-val {
        text-align: right;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.6rem;
        padding-top: 0.3rem;
        margin-right: 0.44rem;
      }
      .memory-item-operator {
        text-align: right;
        display: none;
        margin-right: 0.4rem;
        height: 0.8rem;
        line-height: 0.8rem;
        span {
          @include spanText(0.4rem);
          background-color: #fff;
          color: #000;
          margin-right: 0.04rem;
          width: 0.7rem;
          font-size: 0.24rem;
          border: 0.02rem solid rgba($color: #000000, $alpha: 0);
          &:hover {
            border: 0.02rem solid #000000;
            background-color: #0080ff;
          }
        }
      }
    }
  }
  .no-text {
    font-size: 0.5rem;
  }
  .delete {
    // position: absolute;
    // right: 0;
    // bottom: 0;
    width: 100%;
    height: 1rem;
    background-color: $themeColor;
    span {
      float: right;
      height: 100%;
      line-height: 1rem;
      width: 1rem;
      margin: 0 0.5rem 0 0;
      text-align: center;
      font-size: 0.4rem;
      &:hover {
        background-color: $buttonHoverColor;
      }
    }
  }
}
</style>
