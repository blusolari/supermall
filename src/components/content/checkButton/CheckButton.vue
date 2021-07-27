<template>
  <div id="check-button" >
    <img  class="unchecked" :class="{check: isChecked}" src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
  export default {
    name:'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false

      }
    },
    data () {
      return {

      };
    },
  }
</script>
<style scoped>
.unchecked {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
   background-color: red;
   border-color: red;
}
</style>