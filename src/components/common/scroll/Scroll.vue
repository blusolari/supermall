<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo(x, y, time = 300) {
      //先判断scroll是否初始化，这样更严谨，避免网络问题
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
  mounted() {
    //这里用ref去拿可以防止同名类拿错
    this.scroll = new BScroll(this.$refs.wrapper, {
      //对 content 以及 content 子元素 DOM 改变的探测
      observeDOM: true,
      // 当 content 的高度不超过父容器的高度，是不能滚动的

      observeImage: true,
      // 开启对 wrapper 子元素中图片元素的加载的探测
      // 如果图片还没有加载完成就已经开始初始化，
      // 那么计算出的实际高度和你的真实高度就会有大量偏差

      click: true,
      // 它是设置div等标签的点击事件的

      probeType: this.probeType,
      // 设置probeType动态决定是否实时功能

      pullUpLoad: this.pullUpLoad,
    });

    // 监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    // 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style scoped>
</style>