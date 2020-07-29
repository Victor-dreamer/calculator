<template>
  <div class="history">
    <div v-if="historyList.length">
      <div v-for="(item, index) in historyList" v-bind:key="index" class="history-item" @click="historyUse(historyList.length-(index+1))">
        <div class="history-expression">{{ item.expression + ' ' +'=' }}</div>
        <div class="history-result">{{ item.result }}</div>
      </div>
      <div class="delete">
        <span @click="deleteHistory">Del</span>
      </div>
    </div>
    <div v-else>
      暂时没有历史记录
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'history',
  data: function () {
    return {
      showHistoryList: []
    }
  },
  computed: {
    ...mapGetters(['historyList'])
  },
  methods: {
    deleteHistory () {
      this.$store.commit('deleteHistory')
    },
    reverseArray (arr) {
      let list = []
      for (let i = 0; i < arr.length; i++) {
        list[i] = arr[arr.length - (i + 1)]
      }
      return list
    },
    historyUse (index) {
      this.$store.commit('historyUse', index)
    }
  }
}
</script>

<style lang='scss'>
.history {
  height: 415px;
  margin: 10px 5px 5px 5px;
  overflow: auto;
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
  .history-item {
    height: 60px;
    text-align: right;
    &:hover {
      background-color: #9f9f9f;
    }
    .history-expression {
      margin-top: 5px;
      font-size: 16px;
      margin-right: 10px;
    }
    .history-result {
      margin-top: 5px;
      font-size: 24px;
      margin-right: 10px;
    }
  }
}
</style>
