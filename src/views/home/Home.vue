<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 因为better-scroll实现原理造成的tabControl跟着一起滚，我们这里用障眼法实现吸顶功能
    实际上，scroll里的tab-control已经跟着滚出去了 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；
      如果用在子组件上，引用就指向组件实例，
      可以通过实例直接调用组件的方法或访问数据 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- 组件要想监听点击，要加上native修饰符 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(positon) {
      // 判断BackTop是否显示
      this.isShowBackTop = -positon.y > 1000;

      // 决定tabControl是否吸顶
      this.isTabFixed = -positon.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 组件本身没有offsetTop属性，所以我们需要先得到组件，
      // 再获得组件内的div元素，即使用$el获得
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关方法
    //这里将数据的保存抽离出了方法，
    //使created中只写主要的操作，不写具体代码
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        //...可以将数组中的每个数据解析出来push
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  activated() {
    // 这里必须要先刷新再跳转 
    // 不进行刷新多次点击，keep-alive还是会失效
    if (this.$refs.scroll.scroll != null) {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    }
  },

  deactivated() {
    if (this.$refs.scroll.scroll != null) {
      this.saveY = this.$refs.scroll.getScrollY();
    }
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时的设置，
  这里已经使用了better-scroll的局部滚动了，就不用脱离标准流了
   position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0; */
}

#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  /* 通过定位来获取需要滚动的范围
  这样就不用了费力计算滚动区域了 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>