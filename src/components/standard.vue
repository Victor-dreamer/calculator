<template>
  <div class='standard'>
    <div class='memory-button'>
      <div class="memory-button-item">MC</div>
      <div class="memory-button-item">MR</div>
      <div class="memory-button-item">M+</div>
      <div class="memory-button-item">M-</div>
      <div class="memory-button-item">MS</div>
    </div>
    <div class="standard-button">
      <div class="standard-button-item">%</div>
      <div class="standard-button-item">?</div>
      <div class="standard-button-item">?</div>
      <div class="standard-button-item">1/x</div>
      <div class="standard-button-item">CE</div>
      <div class="standard-button-item">C</div>
      <div class="standard-button-item">?</div>
      <div class="standard-button-item operators" @click="input('/')">/</div>
      <div class="standard-button-item num" @click="input(7)">7</div>
      <div class="standard-button-item num" @click="input(8)">8</div>
      <div class="standard-button-item num" @click="input(9)">9</div>
      <div class="standard-button-item operators" @click="input('*')">X</div>
      <div class="standard-button-item num" @click="input(4)">4</div>
      <div class="standard-button-item num" @click="input(5)">5</div>
      <div class="standard-button-item num" @click="input(6)">6</div>
      <div class="standard-button-item operators" @click="input('-')">-</div>
      <div class="standard-button-item num" @click="input(1)">1</div>
      <div class="standard-button-item num" @click="input(2)">2</div>
      <div class="standard-button-item num" @click="input(3)">3</div>
      <div class="standard-button-item operators" @click="input('+')">+</div>
      <div class="standard-button-item">+-</div>
      <div class="standard-button-item num" @click="input(0)">0</div>
      <div class="standard-button-item">.</div>
      <div class="standard-button-item operators" @click="input('=')">=</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'standard',
  methods: {
    input (value) {
      this.$store.commit('inputScreen', value)
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
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        margin: 1px 0;
        // width: 30%;
        border: 1px solid rgba($color: #000000, $alpha: 0);
        &:hover {
          background-color: rgba($color: #999, $alpha: 0.5);
          border: 1px solid rgba($color: #999999, $alpha: 1);
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
