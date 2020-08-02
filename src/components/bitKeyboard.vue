<template>
  <div class="content">
    <div class="bitKeyboard">
      <input v-for="(item, index) in this.array" :key="index" type="button"
      :value="item" @click="change(index)"
      :class="'item'+(index>3?index%4:index)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'bitKeyboard',
  props: {
    // 精度：0 64位，31：32位。。。
    accuracy: Number,
    // 进制
    systemType: Number
  },
  data: function () {
    return {
      array: new Array(64).fill(0)
    }
  },
  computed: {
    res: function () {
      return this.getDEG(this.array)
    }
  },
  watch: {
    accuracy: function (val) {
      this.changeButtonDis(val)
    },
    res: function (val) {
      this.$store.commit('commitCurrentNum', val)
    }
  },
  methods: {
    // 禁用按钮
    changeButtonDis (val) {
      const bt = document.querySelectorAll('.bitKeyboard input')
      if (val === 0) {
        for (let i = 0; i < bt.length; i++) {
          bt[i].disabled = ''
        }
      } else {
        for (let i = 0; i < val; i++) {
          bt[i].disabled = 'disabled'
        }
      }
    },
    change (index) {
      const val = this.array[index] === 1 ? 0 : 1
      this.array.splice(index, 1, val)
    },
    changeAccuracy () {
      this.accuracy = 32
    },
    // 获取十进制
    getDEG (arr) {
      let flag = 1
      let temp
      if (arr[this.accuracy] === 1 || arr[this.accuracy] === '1') { // 负数
        flag = -1
        temp = (parseInt(this.getNeg(arr.slice(this.accuracy + 1)).join(''), 2) + 1)
      } else {
        temp = parseInt(arr.join(''), 2)
      }
      return temp * flag
    },
    // 按位取反
    getNeg (arr) {
      const temp = arr.map((val) => {
        if (val === 1) {
          return 0
        } else {
          return 1
        }
      })
      return temp
    }
  },
  mounted: function () {
    this.changeButtonDis(this.accuracy)
  }
}
</script>

<style lang='scss'>
.content {
  margin-left: 0.02rem;
}

.bitKeyboard {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  input {
    flex: 0 0 5%;
    display: inline-block;
    width: 5%;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    font-size: 0.4rem;
    border: none;
    margin: 0.04rem 0;
    outline: none;
    background: none;
  }
  .item0,
  .item1,
  .item2 {
    margin-right: 0.2%;
  }
  .item3 {
    margin-right: 4%;
  }
}
</style>
