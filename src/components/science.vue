<template>
  <div class='science'>
    <div class="science-function">
      <div class="science-function-item">DEG</div>
      <div class="science-function-item">HYP</div>
      <div class="science-function-item">F-E</div>
    </div>
    <div class='memory-button'>
      <div class="memory-button-item">MC</div>
      <div class="memory-button-item">MR</div>
      <div class="memory-button-item">M+</div>
      <div class="memory-button-item">M-</div>
      <div class="memory-button-item">MS</div>
    </div>
    <div class="science-button">
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
      <div class="science-button-item">1</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.science {
  .science-function {
    text-align: left;
    height: 30px;
    margin-left: 10px;
    .science-function-item {
      width: 12%;
      height: 25px;
      line-height: 25px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 2px;
      text-align: center;
      border: 1px solid rgba($color: #999, $alpha: 0);
      &:hover {
        border: 1px solid rgba($color: #999, $alpha: 1);
        background-color: rgba($color: #999, $alpha: 0.5);
      }
    }
  }
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
        background-color: rgba($color: #999, $alpha: 0.5);
      }
    }
  }
  .science-button {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: flex-start;
    align-items: center;
    margin: 10px 0 0 0;
    .science-button-item {
      box-sizing: border-box;
      flex: 0 0 20%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      margin: 1px 0;
      border: 1px solid rgba($color: #000000, $alpha: 0);
      &:hover {
        background-color: rgba($color: #999, $alpha: 0.5);
        border: 1px solid rgba($color: #999999, $alpha: 1);
      }
    }
  }
}
</style>
