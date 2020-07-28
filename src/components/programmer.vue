<template>
  <div class='programmer'>
    <div class="programmer-system">
      <div class="programmer-system-item">
        <div class="system-name">HEX</div>
        <div class="system-val">1</div>
      </div>
      <div class="current-system programmer-system-item">
        <div class="system-name">DEC</div>
        <div class="system-val">1</div>
      </div>
      <div class="programmer-system-item">
        <div class="system-name">OCT</div>
        <div class="system-val">1</div>
      </div>
      <div class="programmer-system-item">
        <div class="system-name">BIN</div>
        <div class="system-val">1</div>
      </div>
    </div>
    <div class="programmer-menu">
      <div>all</div>
      <div>byte</div>
      <div class="chooseSystem">choose</div>
      <div class="memory-button">MC</div>
    </div>
    <div v-if="menu" class="programmer-content">
      <div class="programmer-button">
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
        <div class="programmer-button-item">A</div>
      </div>
    </div>
    <div v-else>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'programmer',
  data: function () {
    return {
      menu: 1
    }
  },
  methods: {

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
      width: 50px;
      height: 20px;
      line-height: 20px;
      margin-right: 10px;
      text-align: center;
      float: left;
      &:hover {
        background-color: rgba($color: #999, $alpha: 0.5);
      }
    }
    .chooseSystem {
      width: 80px;
      margin: 0 20px;
    }
    .memory-button {
      float: right;
      font-size: 14px;
    }
  }
  .programmer-content {
    height: 240px;
    margin-top: 10px;
    .programmer-button {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-content: flex-start;
      align-items: center;
      .programmer-button-item {
        box-sizing: border-box;
        flex: 0 0 16.2%;
        height: 38px;
        line-height: 38px;
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
}
</style>
