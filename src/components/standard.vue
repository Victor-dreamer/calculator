<template>
  <div class='standard'>
    <div class='memory-button'>
      <div class="memory-button-item" @click="memoryPop">MC</div>
      <!-- 调用最后加入的内存 -->
      <div class="memory-button-item" @click="memoryUseLast">MR</div>
      <div class="memory-button-item" @click="memoryAdd">M+</div>
      <div class="memory-button-item" @click="memorySub">M-</div>
      <div class="memory-button-item" @click="memorySave">MS</div>
    </div>
    <div class="standard-button">
      <div class="standard-button-item" @click="special('%')">%</div>
      <div class="standard-button-item" @click="special('√')">√</div>
      <div class="standard-button-item" @click="special('x2')"><img src="../assets/imgs/x_2.png" ></div>
      <div class="standard-button-item" @click="special('x1')"><img src="../assets/imgs/1_x.png" ></div>
      <div class="standard-button-item" @click="clearInput">CE</div>
      <div class="standard-button-item" @click="clearAll">C</div>
      <div class="standard-button-item" @click="clearOne">☚</div>
      <div class="standard-button-item operators" @click="inputOperator('÷')">÷</div>
      <div class="standard-button-item num" @click="inputNum(7)">7</div>
      <div class="standard-button-item num" @click="inputNum(8)">8</div>
      <div class="standard-button-item num" @click="inputNum(9)">9</div>
      <div class="standard-button-item operators" @click="inputOperator('×')">×</div>
      <div class="standard-button-item num" @click="inputNum(4)">4</div>
      <div class="standard-button-item num" @click="inputNum(5)">5</div>
      <div class="standard-button-item num" @click="inputNum(6)">6</div>
      <div class="standard-button-item operators" @click="inputOperator('-')">-</div>
      <div class="standard-button-item num" @click="inputNum(1)">1</div>
      <div class="standard-button-item num" @click="inputNum(2)">2</div>
      <div class="standard-button-item num" @click="inputNum(3)">3</div>
      <div class="standard-button-item operators" @click="inputOperator('+')">+</div>
      <div class="standard-button-item">±</div>
      <div class="standard-button-item num" @click="inputNum(0)">0</div>
      <div class="standard-button-item" @click="inputNum('.')">.</div>
      <div class="standard-button-item operators" @click="getResult">=</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'standard',
  data: function () {
    return {
      // currentNum: '',
      inputScren: [],
      isDecimalAdded: false,
      isInputOperator: false,
      expressions: []
    }
  },
  computed: {
    ...mapState(['currentNum']),
    currentShow: function () {
      return this.currentNum || parseFloat(this.inputScren.join('') || 0)
    }
  },
  watch: {
    currentShow: function (val) {
      this.$store.commit('commitNum', val)
    }
  },
  methods: {
    isOperator (val) {
      let reg = /['+', '-', '×', '÷']/
      return reg.test(val)
    },
    inputNum (value) {
      if (this.currentNum !== '') {
        if (value === '.') {
          this.$store.commit('commitCurrentNum', '')
          this.inputScren.push(0)
          this.inputScren.push('.')
          this.isDecimalAdded = true
          this.isInputOperator = false
          return
        } else {
          this.$store.commit('commitCurrentNum', '')
        }
      }
      if (value === '.') {
        if (this.isDecimalAdded) {
          return
        } else {
          if (this.inputScren.length === 0) {
            this.inputScren.push(0)
            this.inputScren.push('.')
          } else {
            this.inputScren.push('.')
          }
          this.isDecimalAdded = true
          this.isInputOperator = false
        }
        return
      }
      // Number
      if (this.inputScren.length === 0) {
        this.inputScren.push(value)
      } else {
        if (this.inputScren[0] === 0) {
          this.inputScren[0] = value
        } else {
          this.inputScren.push(value)
        }
      }
      this.isInputOperator = false
    },
    inputOperator (value) {
      // 判断是否有上一步运算结果
      if (this.currentNum !== '') {
        this.expressions.push(this.currentNum)
        this.$store.commit('commitCurrentNum', '')
        this.expressions.push(value)
        this.isInputOperator = true
        this.isDecimalAdded = false
        return
      }
      if (this.inputScren.length !== 0) {
        this.expressions.push(this.currentShow)
        this.inputScren = []
        this.expressions.push(value)
        this.isInputOperator = true
        this.isDecimalAdded = false
        return
      }
      if (this.inputScren.length === 0) {
        if (this.isInputOperator) {
          this.expressions[this.expressions.length - 1] = value
        }
      }
      // this.$store.commit('inputOperator', value)
    },
    getResult () {
      if (this.inputScren.length === 0 && this.expressions.length === 0) {
        if (this.currentNum === '') {
          this.$store.commit('commitHistory', {
            expression: 0,
            result: 0
          })
          return
        }
        if (this.currentNum !== '') {
          // 将当前结果进行上一个表达式的最后一步操作运算，待完善
          // 暂时设定为存入当前结果
          // this.$store.commit('commitHistory', {
          //   expression: this.currentNum,
          //   result: this.currentNum
          // })
          this.expressions.push(this.currentNum)
          this.$store.commit('commitCurrentNum', '')
        }
      }
      if (this.inputScren.length !== 0) {
        this.expressions.push(this.currentShow)
        this.inputScren = []
      }
      let reg = /['+', '-', '×', '÷']/
      let lastOperator = this.expressions[this.expressions.length - 1]
      if (reg.test(lastOperator)) {
        this.expressions.pop()
      }
      let exp = this.expressions.join(' ')
      console.log(exp)
      // eslint-disable-next-line no-eval
      let res = eval(exp.replace(new RegExp('×', 'g'), '*').replace(new RegExp('÷', 'g'), '/')) // 将乘号和除号转为运算符
      this.$store.commit('commitCurrentNum', res)
      // 存入历史
      this.$store.commit('commitHistory', {
        expression: exp,
        result: res
      })
      this.expressions = []
      this.isDecimalAdded = false
      this.isInputOperator = false
      // this.$store.commit('getResult')
    },
    //  特殊操作
    special (value) {
      let temp = 0
      if (this.currentNum !== '') {
        temp = this.currentNum
      } else if (this.inputScren.length !== 0) {
        temp = parseFloat(this.inputScren.join(''))
        this.inputScren = []
      }
      switch (value) {
        case '%':
          // 将前一个数字转为百分比然后与当前数相乘
          let num = 0
          if (this.expressions.length > 1) {
            num = this.expressions[this.expressions.length - 2]
            while (num > 1) {
              num = num / 10
            }
          }
          this.$store.commit('commitCurrentNum', temp * num)
          break
        case '√':
          temp = Math.sqrt(temp)
          this.$store.commit('commitCurrentNum', temp)
          break
        case 'x2':
          temp = temp * temp
          this.$store.commit('commitCurrentNum', temp)
          break
        case 'x1':
          temp = 1 / temp
          this.$store.commit('commitCurrentNum', temp)
          break
      }
    },
    // 内存操作
    memorySave () {
      let value = this.currentShow
      this.$store.commit('memorySave', value)
    },
    memoryPop () {
      this.$store.commit('memoryPop')
    },
    memoryAdd () {
      this.$store.commit('memoryAdd', this.currentShow)
    },
    memorySub () {
      this.$store.commit('memorySub', this.currentShow)
    },
    memoryUseLast () {
      this.$store.commit('memoryUseLast')
    },
    // 其他操作
    clearOne () {
      if (this.inputScren.length !== 0) {
        this.inputScren.pop()
      }
    },
    clearInput () {
      this.inputScren = []
    },
    clearAll () {
      this.inputScren = []
      this.expressions = []
      this.currentNum = ''
    }
  }
}
</script>

<style lang='scss'>
  .standard {
    margin-top: 10px;
    .memory-button {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .memory-button-item {
        flex: 1;
        margin: 0 5px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid rgba($color: #999, $alpha: 0);
        &:hover {
          border: 1px solid rgba($color: #999, $alpha: 1);
          background-color: rgba($color: #999, $alpha: 1);
        }
      }
    }
    .standard-button {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-content: flex-start;
      align-items: center;
      margin: 10px 0 0 0;
      .standard-button-item {
        box-sizing: border-box;
        flex: 0 0 24.5%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        font-size: 20px;
        margin: 1px 0;
        // width: 30%;
        border: 1px solid rgba($color: #000000, $alpha: 0);
        &:hover {
          background-color: rgba($color: #999, $alpha: 0.5);
          border: 1px solid rgba($color: #999999, $alpha: 1);
        }
        img {
          width: 25px;
        }
      }
      .num {
        background-color: rgba($color: #fff, $alpha: 0.5);
      }
      .operators:hover {
        background-color: rgba($color: #0080ff, $alpha: 0.8);
      }
    }
  }
</style>
