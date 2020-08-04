<template>
  <div class="bitKeyboard">
      <div v-for="(arr, arrindex) of this.array" :key="arrindex" class="bitKeyboard-array">
        <input v-for="(num, numindex) of arr"
        :key="numindex"  :class="[num===1?'bitKeyboard-array-item is-one':'bitKeyboard-array-item']"
        type="button" :value="num"
        @click="changeValue(arrindex, numindex)"/>
        <div class="bitKeyboard-index">{{64-(arrindex+1)*4}}</div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

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
      array: [
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0),
        new Array(4).fill(0)
      ]
    }
  },
  computed: {
    ...mapState(['screenShow']),
    binArray: function () {
      let temp = []
      for (let i = 0; i < this.array.length; i++) {
        temp = temp.concat(this.array[i])
      }
      return temp
    },
    res: function () {
      if (this.systemType === 10) {
        return this.getDEC(this.binArray)
      } else {
        return parseInt(this.binArray.join(''), 2).toString(this.systemType)
      }
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
          // 只修改表现，没有修改array，得改
          // 初步修改
          this.array[Math.floor(i / 4)].splice(i % 4, 1, 0)
          bt[i].disabled = 'disabled'
        }
      }
    },
    changeValue (arrindex, numindex) {
      const temp = this.array[arrindex]
      const val = this.array[arrindex][numindex] = this.array[arrindex][numindex] === 1 ? 0 : 1
      temp.splice(numindex, 1, val)
      this.array.splice(arrindex, 1, temp)
    },
    changeAccuracy () {
      this.accuracy = 32
    },
    // 获取十进制
    getDEC (arr) {
      let temp
      if (arr[this.accuracy] === 1 || arr[this.accuracy] === '1') { // 负数
        // let temp = arr.slice(this.accuracy + 1)
        temp = parseInt(this.getNeg(arr.slice(this.accuracy + 1)).join(''), 2) + 1
        temp = temp * -1
      } else {
        temp = parseInt(arr.join(''), 2)
      }
      return temp
    },
    // 二进制加1
    getAddOne (arr) {
      let i = arr.length - 1
      while (i >= 0) {
        if (arr[i] + 1 >= 2) {
          arr[i] = 0
          i--
        } else {
          arr[i] = 1
          break
        }
      }
      // console.log('加一：' + arr)
      return arr
    },
    // 按位取反
    getNeg (arr) {
      const temp = arr.map((val) => {
        if (val + 1 >= 2) {
          return 0
        } else {
          return 1
        }
      })
      return temp
    },
    showCurrentNum () {
      if (this.screenShow === 0) {
        return
      }
      let num = parseInt(this.screenShow, this.systemType).toString(2)

      let numarr = num.split('')
      while (numarr.length % 4 !== 0) {
        numarr.splice(0, 0, 0)
      }
      let start = numarr.length / 4
      for (let i = 0; i < start; i++) {
        this.array.splice(16 - start + i, 1, numarr.slice(i * 4, 4))
      }
    }
  },
  mounted: function () {
    this.showCurrentNum()
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
  margin-bottom: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  justify-items: flex-start;
  .bitKeyboard-array {
    flex: 0 0 21%;
    margin: 0 0.2rem;
    text-align: right;
    .bitKeyboard-array-item {
      display: inline-block;
      width: 25%;
      text-align: right;
      border: none;
      outline:none;
      font-size: 0.36rem;
      font-weight: 700;
      background-color: transparent
    }
    .is-one {
      color: #4599db;
    }
  }
  .bitKeyboard-index {
    text-align: right;
    font-size: 0.2rem;
    margin-right: 0.1rem;
  }
}
</style>
