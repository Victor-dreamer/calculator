import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 计算类型
    calType: 2,
    // 表达式
    expression: [],
    // 当前的屏幕显示
    screenShow: 0,
    inputScreen: [],
    // 计算结果
    result: 0,
    // 内存
    memoryList: [9, 10, 445, 55, 60, 123],
    historyList: [{
      expression: '0',
      result: '0'
    },
    {
      expression: '0',
      result: '0'
    },
    {
      expression: '0',
      result: '0'
    },
    {
      expression: '0',
      result: '0'
    },
    {
      expression: '0',
      result: '0'
    }
    ]
  },
  mutations: {
    changeCalType (state, type) {
      state.calType = type
    },
    inputNum (state, num) {
      state.inputScreen.push(num)
      state.screenShow = parseInt(state.inputScreen.join(''))
    },
    // 这里需要对操作符再进行一次判断，区分是可以入栈的运算符，还是立即在当前结果上进行的操作。
    inputOperator (state, operator) {
      let reg = /['+', '-', '*', '/']/
      if (state.inputScreen.length !== 0) {
        state.expression.push(state.screenShow)
        state.expression.push(operator)
        state.inputScreen = []
      }
      if (state.inputScreen.length !== 0 && state.expression.length > 1) {
        let lastOperator = state.expression[state.expression.length - 1]
        // 多次按操作符以最新的为准
        if (reg.test(lastOperator)) {
          state.expression[state.expression - 1] = operator
        } else {
          state.expression.push(operator)
        }
      }
    },
    getResult (state) {
      if (state.inputScreen !== 0) {
        state.expression.push(state.screenShow)
        state.inputScreen = []
      }
      if (state.expression.length === 0) {
        state.historyList.push({
          expression: 0,
          result: 0
        })
        state.screenShow = 0
      }
      if (state.expression.length === 1) {
        state.historyList.push({
          expression: state.expression[0],
          result: state.expression[0]
        })
      }
      if (state.expression.length > 1) {
        let reg = /['+', '-', '*', '/']/
        let lastOperator = state.expression[state.expression.length - 1]
        if (reg.test(lastOperator)) {
          state.expression.pop()
        }
        let exp = state.expression.join(' ')
        console.log(exp)
        // eslint-disable-next-line no-eval
        let res = eval(exp)
        // 存入历史记录
        state.historyList.push({
          expression: exp,
          result: res
        })
        state.screenShow = res
        state.expression = []
      }
    },
    deleteHistory (state) {
      state.historyList = []
    },
    deleteMemory (state) {
      state.memoryList = []
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
