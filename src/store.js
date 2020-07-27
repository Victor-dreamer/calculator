import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 计算类型
    calType: 0,
    // 表达式
    expression: [],
    // 当前的屏幕显示
    screenShow: 0,
    inputScreen: [],
    // 计算结果
    result: 0,
    // 内存
    memoryList: [],
    historyList: [{
      expression: '',
      result: ''
    }]
  },
  mutations: {
    changeCalType (state, type) {
      state.calType = type
    },
    inputScreen (state, input) {
      const operator = ['+', '-', '*', '/']
      if (!isNaN(input)) {
        state.inputScreen.push(input)
      }
      // 这里需要对操作符再进行一次判断，区分是可以入栈的运算符，还是立即在当前结果上进行的操作。
      if (operator.indexOf(input) !== -1) {
        if (state.expression.length === 0) {
          let num = parseInt(state.inputScreen.join(''))
          state.expression.push(num)
          state.expression.push(input)
          state.inputScreen = []
        } else if (state.expression.length > 0) {
          let lastOperator = state.expression[state.expression.length - 1]
          if (operator.indexOf(lastOperator) !== -1) {
            state.expression[state.expression.length - 1] = input
          }
        }
      }
      if (input === '=' && state.expression.length !== 0) {
        state.expression.push(parseInt(state.inputScreen.join('')))
        state.inputScreen = []
        let exp = state.expression.join(' ')
        // eslint-disable-next-line no-eval
        state.screenShow = eval(exp)
        state.historyList.push({
          expression: exp,
          result: state.screenShow
        })
        state.expression = []
      }
    }
  },
  getters: {
    calTypeName (state) {
      switch (state.calType) {
        case 1:
          return 'Science'
        case 2:
          return 'Programer'
        default:
          return 'Standard'
      }
    },
    curScreen (state) {
      return parseInt(state.inputScreen.join('')) || state.screenShow
    }
  },
  // 异步操作
  actions: {

  }
})
