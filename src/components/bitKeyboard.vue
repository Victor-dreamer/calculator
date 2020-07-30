<template>
  <div>
    <input type="button" value="0" @click="Not">
    <input type="button" value="0" @click="Not">
    <input type="button" value="0" @click="Not">
  </div>
</template>

<script>
export default {
  name: 'bitKeyboard',
  data: function () {
    return {
      result: 0
    }
  },
  methods: {
    Not ($event) {
      let ele = event.srcElement
      ele.value = ele.value === 1 ? 0 : 1
    }
  }
}
</script>

<style>

</style>
