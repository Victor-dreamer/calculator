<template>
  <div class="screen">
    <div class="menu-bar">
      <div class="type-menu">
        <span class="span-menu" @click="showChoose">≡</span>
        <div v-show="show" class="menu-choose" @mouseleave="hideMenu">
          <div class="menu-choose-item" @click="changeType(0)">Standard</div>
          <div class="menu-choose-item" @click="changeType(1)">Science</div>
          <div class="menu-choose-item" @click="changeType(2)">Programer</div>
        </div>
      </div>
      <span class="span-text">{{calTypeName}}</span>
    </div>
    <div class="show-expression">
      {{ expressionShow }}
    </div>
    <div class="screen-view">
      {{ screenShow }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'screen',
  data: function () {
    return {
      show: 0
    }
  },
  computed: {
    ...mapState(['calType', 'expression', 'screenShow']),
    ...mapGetters(['calTypeName']),
    expressionShow: function () {
      return this.expression.join(' ') || ''
    }
  },
  watch: {
    calType: function () {
      if (this.show === 1) {
        this.show = 0
      }
    }
  },
  methods: {
    hideMenu () {
      this.show = 0
    },
    changeType (type) {
      this.$store.commit('changeCalType', type)
    },
    showChoose () {
      this.show = 1
    }
  }
}
</script>

<style lang='scss'>
.screen {
  .menu-bar {
    .type-menu {
      position: relative;
      display: inline-block;
      .span-menu {
        display: inline-block;
        vertical-align: middle;
        width: 0.6rem;
        height: 0.62rem;
        line-height: 0.6rem;
        font-size: 0.7rem;
        text-align: center;
        font-weight: 100;
        &:hover {
          background-color: rgba($color: #999, $alpha: 0.5) ;
        }
      }
      .menu-choose {
        // display: none;
        position: absolute;
        bottom: -1.8rem;
        left: -0.1rem;
        .menu-choose-item {
          background-color: #aaa;
          width: 3rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          font-size: 0.4rem;
          margin-left: 0.1rem;
          border-bottom: 0.02rem solid #9f9f9f;
          &:hover {
            cursor: pointer;
            background-color: #fff;
          }
        }
      }
    }
    .span-text {
      @include spanText(0.6rem);
      margin-left: 0.1rem;
      font-size: 0.5rem;
    }
  }
  .show-expression {
    text-align: right;
    margin-right: 0.2rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.24rem;
  }
  .screen-view {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0.6rem;
    font-weight: 500;
    padding-right: 0.4rem;
    text-align: right;
    overflow: auto;
    // &::-webkit-scrollbar {
    //   width: 0.1rem;
    //   height: 0.16rem;
    //   background-color: #aaa;
    // }
    // &::-webkit-scrollbar-button {
    //   content: '';
    //   border: 0.1rem solid blue;
    //   border-top: transparent;
    //   background-color: blue;
    // }
    // &:decrement {
    //   background-color: blue;
    // }
  }
}
</style>
