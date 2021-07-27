<template>
  <div id="cart-bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去计算：({{ checkLength }})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "CartBottomBar",
  components: { CheckButton },
  data() {
    return {};
  },
  computed: {
    totalPrice() {
      return (
        "¥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      if (!this.$store.state.cartList.length) return false;
      return !this.$store.state.cartList.some((item) => item.checked == false);
    },
  },
  methods: {
    checkClick() {
      if (!this.$store.state.cartList.length) return false;
      if (this.isSelectAll) {
        this.$store.commit("uncheckAll");
      } else {
        this.$store.commit("checkAll");
      }
    },
    calcClick() {
      if (this.$store.state.cartList.every(item => item.checked==false)) 
      this.$toast.show("请选择购买的商品");
    },
  },
};
</script>
<style scoped>
#cart-bottom-bar {
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 49px;
  justify-content: space-between;
  font-size: 15px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 25px;
}
.calculate {
  width: 90px;
  text-align: center;
  color: #fff;
  background: red;
}
</style>