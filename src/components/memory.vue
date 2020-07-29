<template>
  <div class="memory">
    <div v-if="showMemoryList.length" class="memory-list">
      <div v-for="(item, index) in showMemoryList" v-bind:key="index" class="memory-item" @click="memoryUse(showMemoryList.length-(index+1))">
        <div class="memory-item-val">{{ item }}</div>
        <div class="memory-item-operator">
          <span @click="memoryCut(showMemoryList.length-(index+1))">MC</span>
          <span @click="memoryChange([1, showMemoryList.length-(index+1)])">M+</span>
          <span @click="memoryChange([0, showMemoryList.length-(index+1)])">M-</span>
        </div>
      </div>
      <div class="delete">
        <span @click="deleteMemory">Del</span>
      </div>
    </div>
    <div v-else>
      暂时没有内存记录
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
    ...mapState(['screenShow']),
    ...mapGetters(['showMemoryList'])
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
  .memory-list {
    height: 400px;
    overflow: auto;
    .memory-item {
      width: 100%;
      height: 70px;
      &:hover {
        background-color: #9f9f9f;
        .memory-item-operator {
          display: block;
        }
      }
      .memory-item-val {
        text-align: right;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        margin-right: 22px;
      }
      .memory-item-operator {
        text-align: right;
        display: none;
        margin-right: 20px;
        span {
          display: inline-block;
          vertical-align: middle;
          background-color: #fff;
          color: #000;
          margin-right: 2px;
          width: 35px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          text-align: center;
          border: 1px solid rgba($color: #000000, $alpha: 0);
          &:hover {
            border: 1px solid #000000;
            background-color: #0080ff;
          }
        }
      }
    }
    .delete {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      span {
        float: right;
        height: 25px;
        line-height: 25px;
        width: 50px;
        margin: 0 5px 15px 0;
        text-align: center;
        border: solid 1px rgba($color: #000000, $alpha: 0);
        &:hover {
          border: 1px solid #666;
          background-color: #999;
        }
      }
    }
  }
}
</style>
