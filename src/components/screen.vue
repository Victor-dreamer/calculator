<template>
  <div class="screen">
    <div class="menu-bar">
      <div class="type-menu">
        <span class="span-menu"></span>
        <div class="menu-choose">
          <div class="menu-choose-item" @click="changeType(0)">Standard</div>
          <div class="menu-choose-item" @click="changeType(1)">Science</div>
          <div class="menu-choose-item" @click="changeType(2)">Programer</div>
        </div>
      </div>
      <span class="span-text">{{calTypeName}}</span>
    </div>
    <div class="screen-view">
      {{ curScreen }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'screen',
  data: function () {
    return {
      type: ''
    }
  },
  computed: {
    ...mapState(['calType']),
    ...mapGetters(['calTypeName', 'curScreen'])
  },
  methods: {
    changeType (type) {
      this.$store.commit('changeCalType', type)
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
      &:hover {
        .menu-choose {
          display: block;
        }
      }
      .menu-choose {
        display: none;
        position: absolute;
        bottom: -90px;
        .menu-choose-item {
          background-color: #aaa;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-left: 5px;
          border-bottom: 1px solid #9f9f9f;
          &:hover {
            cursor: pointer;
            background-color: #fff;
          }
        }
      }
    }
    .span-text {
      @include spanText(30px);
      margin-left: 5px;
    }
  }
  .screen-view {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: 700;
    padding-right: 5px;
    text-align: right;
  }
}
</style>
