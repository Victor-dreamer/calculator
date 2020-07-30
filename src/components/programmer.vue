<template>
  <div class='programmer'>
    <div class="programmer-system">
      <div :class="[(systemType === 16)?'programmer-system-item current-system':'programmer-system-item']" @click="changeSystem(16, showHEX)">
        <div class="system-name">HEX</div>
        <div class="system-val">{{ showHEX }}</div>
      </div>
      <div :class="[(systemType === 10)?'programmer-system-item current-system':'programmer-system-item']" @click="changeSystem(10)">
        <div class="system-name">DEC</div>
        <div class="system-val">{{ showDEC }}</div>
      </div>
      <div :class="[(systemType === 8)?'programmer-system-item current-system':'programmer-system-item']" @click="changeSystem(8, showOCT)">
        <div class="system-name">OCT</div>
        <div class="system-val">{{ showOCT }}</div>
      </div>
      <div :class="[(systemType === 2)?'programmer-system-item current-system':'programmer-system-item']" @click="changeSystem(2, showBIN)">
        <div class="system-name">BIN</div>
        <div class="system-val">{{ showBIN }}</div>
      </div>
    </div>
    <div class="programmer-menu">
      <div>▩</div>
      <div>▓</div>
      <div class="chooseSystem">choose</div>
      <div class="memory-button">MC</div>
    </div>
    <div v-if="menu" class="programmer-content">
      <div class="programmer-button">
        <!-- 1 -->
        <div class="programmer-button-item"><button class="background">Lsh</button></div>
        <div class="programmer-button-item"><button class="background">Rsh</button></div>
        <div class="programmer-button-item"><button class="background">Or</button></div>
        <div class="programmer-button-item"><button class="background">Xor</button></div>
        <div class="programmer-button-item"><button class="background">Not</button></div>
        <div class="programmer-button-item"><button class="background">And</button></div>
        <!-- 2 -->
        <div class="programmer-button-item"><button class="background">↑</button></div>
        <div class="programmer-button-item"><button class="background">Mod</button></div>
        <div class="programmer-button-item"><button class="background" @click="clearInput">CE</button></div>
        <div class="programmer-button-item"><button class="background" @click="clearAll">C</button></div>
        <div class="programmer-button-item"><button class="background" @click="clearOne">←</button></div>
        <div class="programmer-button-item">
          <button class="background operator" @click="inputOperator('÷')">÷</button>
        </div>
        <!-- 3 -->
        <div class="programmer-button-item">
          <button :disabled='systemType!==16' @click="inputNum('A')">A</button>
        </div>
        <div class="programmer-button-item">
          <button :disabled='systemType!==16' @click="inputNum('B')">B</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(7)" :disabled='systemType===2'>7</button>
          </div>
        <div class="programmer-button-item">
          <button @click="inputNum(8)" :disabled="systemType===2||systemType===8">8</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(9)" :disabled="systemType===2||systemType===8">9</button>
        </div>
        <div class="programmer-button-item">
          <button class="background operator" @click="inputOperator('×')">×</button>
        </div>
        <!-- 4 -->
        <div class="programmer-button-item">
          <button :disabled='systemType!==16' @click="inputNum('C')">C</button>
        </div>
        <div class="programmer-button-item">
          <button :disabled='systemType!==16' @click="inputNum('D')">D</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(4)" :disabled='systemType===2'>4</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(5)" :disabled='systemType===2'>5</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(6)" :disabled='systemType===2'>6</button>
        </div>
        <div class="programmer-button-item">
          <button class="background operator" @click="inputOperator('-')">-</button>
        </div>
        <!-- 5 -->
        <div class="programmer-button-item">
          <button :disabled='systemType!==16' @click="inputNum('E')">E</button>
        </div>
        <div class="programmer-button-item">
          <button :disabled='systemType!==16' @click="inputNum('F')">F</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(1)">1</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(2)" :disabled='systemType===2'>2</button>
        </div>
        <div class="programmer-button-item">
          <button @click="inputNum(3)" :disabled='systemType===2'>3</button>
        </div>
        <div class="programmer-button-item">
          <button class="background operator" @click="inputOperator('+')">+</button>
        </div>
        <!-- 6 -->
        <div class="programmer-button-item"><button class="background">(</button></div>
        <div class="programmer-button-item"><button class="background">)</button></div>
        <div class="programmer-button-item"><button class="background">±</button></div>
        <div class="programmer-button-item"><button @click="inputNum(0)">0</button></div>
        <div class="programmer-button-item background">.</div>
        <div class="programmer-button-item">
          <button class="background operator" @click="getResult">=</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'programmer',
  data: function () {
    return {
      menu: 1,
      systemType: 10,
      isbitkeyboard: false,
      bitkeyboardType: 64,
      inputScren: [],
      isInputOperator: false,
      expressions: [],
      centerNum: 0
    }
  },
  watch: {
    currentShow: function (val) {
      this.$store.commit('commitNum', val)
    }
  },
  computed: {
    ...mapState(['currentNum']),
    currentShow: function () {
      return this.currentNum || this.inputScren.join('') || 0
    },
    showDEC: function () {
      return parseInt(this.currentShow, this.systemType)
    },
    showHEX: function () {
      return this.showDEC.toString(16)
    },
    showOCT: function () {
      return this.showDEC.toString(8)
    },
    showBIN: function () {
      return this.showDEC.toString(2)
    }
  },
  methods: {
    changeSystem (val) {
      let num
      switch (val) {
        case 16:
          num = this.showHEX
          break
        case 10:
          num = this.showDEC
          break
        case 8:
          num = this.showOCT
          break
        case 2:
          num = this.showBIN
          break
        default:
          break
      }
      this.$store.commit('commitCurrentNum', num)
      this.inputScren = []
      this.systemType = val
    },
    // 输入及计算操作
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
        return
      }
      if (this.inputScren.length !== 0) {
        this.expressions.push(this.currentShow)
        this.inputScren = []
        this.expressions.push(value)
        this.isInputOperator = true
        return
      }
      if (this.inputScren.length === 0) {
        if (this.isInputOperator) {
          this.expressions[this.expressions.length - 1] = value
        }
      }
    },
    getResult () {
      if (this.inputScren.length === 0 && this.expressions.length === 0) {
        if (this.currentNum === '') {
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
      // 对不同进制进行转换
      let arr = this.expressions.map((item) => {
        if (!reg.test(item)) {
          return parseInt(item, this.systemType)
        } else {
          return item
        }
      })
      let exp = arr.join(' ')
      console.log(exp)
      // eslint-disable-next-line no-eval
      let res = eval(exp.replace(new RegExp('×', 'g'), '*').replace(new RegExp('÷', 'g'), '/')) // 将乘号和除号转为运算符
      res = res.toString(this.systemType)
      this.$store.commit('commitCurrentNum', res)
      this.expressions = []
      this.isInputOperator = false
    },
    // 清除操作
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
.programmer {
  .programmer-system {
    .programmer-system-item {
      margin-top: 2px;
      padding-left: 10px;
      height: 20px;
      line-height: 20px;
      border-left: 4px solid rgba($color: #999, $alpha: 0);
      &:hover {
        background-color: rgba($color: #999, $alpha: 0.5);
      }
      div {
        display: inline-block;
        font-size: 10px;
      }
      .system-val {
        margin-left: 15px;
      }
      .system-name {
        width: 30px;
      }
    }
    .current-system {
      border-left: 4px solid #0080ff;
    }
  }
  .programmer-menu {
    overflow: hidden;
    margin-top: 10px;
    div {
      width: 16.2%;
      height: 38px;
      line-height: 38px;
      margin-right: 2px;
      text-align: center;
      float: left;
      &:hover {
        background-color: rgba($color: #999, $alpha: 0.5);
      }
    }
    .chooseSystem {
      width: 80px;
      margin: 0 40px;
    }
    .memory-button {
      float: right;
      font-size: 14px;
    }
  }
  .programmer-content {
    height: 240px;
    margin-top: 2px;
    .programmer-button {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-content: flex-start;
      align-items: center;
      .programmer-button-item {
        position: relative;
        box-sizing: border-box;
        flex: 0 0 16.2%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 20px;
        margin: 1px 0;
        button {
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          position: absolute;
          left: 0;
          top: 0;
          background-color: rgba($color: #fff, $alpha: 0.8);
          border: 1px solid rgba($color: #000000, $alpha: 0);
          &:hover {
            background-color: rgba($color: #999, $alpha: 0.5);
            border: 1px solid rgba($color: #999999, $alpha: 1);
          }
        }
        button[disabled] {
          &:hover {
            background-color: rgba($color: #fff, $alpha: 0.8);
            border: 1px solid rgba($color: #999999, $alpha: 0);
          }
        }
        .operator:hover {
          background-color: rgba($color: #0080ff, $alpha: 0.8);
        }
        .background {
          background-color: rgba($color: #eeeeee, $alpha: 0.5);
        }
      }
    }
  }
}
</style>
