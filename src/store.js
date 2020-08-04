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
    // 计算结果
    currentNum: '',
    // 内存
    memoryList: [9, 10, 445, 55, 60, 123],
    // 标准计算器的历史纪录
    standardHistory: [],
    // 科学计算器的历史记录
    scienceHistory: [],
    // 是否显示内存
    showMemory: false,
    // 当前进制
    systemType: 10
  },
  mutations: {
    // 更新进制
    changeSystemType (state, value) {
      state.systemType = value
    },
    // 控制是否显示内存
    changeShowMemory (state, value) {
      state.showMemory = value
    },
    // 更新表达式
    commitExpression (state, value) {
      state.expression = value
    },
    // 更新计算结果
    commitCurrentNum (state, value) {
      state.currentNum = value
    },
    // 更新屏幕当前显示数值
    commitNum (state, value) {
      state.screenShow = value
    },
    changeCalType (state, type) {
      state.calType = type
    },
    // 历史记录操作
    commitHistory (state, history) {
      if (state.calType === 0) {
        state.standardHistory.push(history)
      }
      if (state.calType === 1) {
        state.scienceHistory.push(history)
      }
    },
    deleteHistory (state) {
      if (state.calType === 0) {
        state.standardHistory = []
      }
      if (state.calType === 1) {
        state.scienceHistory = []
      }
    },
    historyUse (state, index) {
      if (state.calType === 0) {
        state.currentNum = state.standardHistory[index].result
      }
      if (state.calType === 1) {
        state.currentNum = state.scienceHistory[index].result
      }
    },
    // 内存操作
    memorySave (state, value) {
      state.memoryList.push(value)
    },
    memoryCut (state, index) {
      state.memoryList.splice(index, 1)
    },
    memoryChange (state, args) {
      let val = parseInt(state.screenShow, state.systemType)
      if (args[0] === 1) {
        state.memoryList.splice(args[1], 1, (state.memoryList[args[1]] + val))
      }
      if (args[0] === 0) {
        state.memoryList.splice(args[1], 1, (state.memoryList[args[1]] - val))
      }
    },
    deleteMemory (state) {
      state.memoryList = []
    },
    memoryPop (state) {
      state.memoryList.pop()
    },
    memoryUseLast (state) {
      state.currentNum = state.memoryList[state.memoryList.length - 1]
    },
    memoryUse (state, index) {
      state.currentNum = state.memoryList[index]
    },
    memoryAdd (state, value) {
      let val = state.memoryList[state.memoryList.length - 1] + value
      state.memoryList.pop()
      state.memoryList.push(val)
    },
    memorySub (state, value) {
      let val = state.memoryList[state.memoryList.length - 1] - value
      state.memoryList.pop()
      state.memoryList.push(val)
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
    historyList (state) {
      let arr = []
      if (state.calType === 0) {
        for (let i = 0; i < state.standardHistory.length; i++) {
          arr[i] = state.standardHistory[state.standardHistory.length - (i + 1)]
        }
      }
      if (state.calType === 1) {
        for (let i = 0; i < state.scienceHistory.length; i++) {
          arr[i] = state.scienceHistory[state.scienceHistory.length - (i + 1)]
        }
      }
      return arr
    },
    showMemoryList (state) {
      let arr = []
      for (let i = 0; i < state.memoryList.length; i++) {
        arr[i] = state.memoryList[state.memoryList.length - (i + 1)]
      }
      return arr
    }
  },
  // 异步操作
  actions: {

  }
})
