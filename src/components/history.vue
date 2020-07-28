<template>
  <div class="history">
    <div v-if="historyList.length">
      <div v-for="(item, index) in historyList" v-bind:key="index" class="history-item">
        <div class="history-expression">{{ item.expression }}</div>
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
import { mapState } from 'vuex'

export default {
  name: 'history',
  data: function () {
    return {
      current: 0
    }
  },
  computed: {
    ...mapState(['historyList'])
  },
  methods: {
    deleteHistory () {
      this.$store.commit('deleteHistory')
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
  }
}
</style>
