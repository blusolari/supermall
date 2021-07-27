<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar 
  },
  computed: {
    //  mapGetters是一个辅助函数，是将store中的getter映射到局部计算属性
    ...mapGetters(["cartList", "cartLength"]),
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;
}
.cart {
  height: 100vh;
  position: relative;
}

.content {
  /* 通过定位来获取需要滚动的范围
  这样就不用了费力计算滚动区域了 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>