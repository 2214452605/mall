<template>
  <div class="home">
    <nav-bar class="home-nav">
      <template #center>
        购物街
      </template>
    </nav-bar>
    <tab-controller v-show="isfixed"
                    ref="tabController"
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick" class="tab-controll"/>
    <scroll class="content" ref="scroll" :probeType="3"
            @scroll="contentScroll"
            :pullUpload="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <prevail-view/>
      <tab-controller :class="{fixed:isfixed}"
                      ref="tabControll"
                      :titles="['流行','新款','精选']"
                      @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue';
  import Scroll from "components/common/scroll/Scroll.vue";
  import HomeSwiper from "./childComponents/HomeSwiper.vue";
  import RecommendView from "./childComponents/RecommendView.vue";
  import PrevailView from "./childComponents/PrevailView";
  import TabController from "components/content/tabController/TabController";
  import GoodsList from "components/content/goods/GoodsList";
  import {itemListenerMinxi,backTopMinxi} from "../../common/mixin";

  import {
    getHomeMultiData,
    getHomeGoods
  } from "network/home";

  import {debounce} from "../../common/utils";

  export default {
    name: "Home",
    components: {
      PrevailView,
      RecommendView,
      NavBar,
      HomeSwiper,
      TabController,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMinxi,backTopMinxi],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []},
        },
        currentType: 'pop',
        isShow: false,
        tabOffsetTop: 0,
        isfixed: false,
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultiData();
      //请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted(){
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      //事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
        this.$refs.tabController.currentIndex = index;
        this.$refs.tabControll.currentIndex = index;
      },
      contentScroll(position) {
        //1.判断backTop是否显示
        this.isShow = (-position.y) > 1000;
        //2.决定topControll是否吸顶(position:fixed)
        this.isfixed = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControll.$el.offsetTop;
      },
      /***
       * 网络请求相关方法
       *
       *
       */
      getHomeMultiData() {
        getHomeMultiData()
            .then(res => {
              this.banners = res.data.banner.list;
              this.recommends = res.data.recommend.list;
            })
            .catch(error => {
              console.log(error);
            });
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page)
            .then(res => {
              this.goods[type].list.push(...res.data.list);
              this.goods[type].page++;
              //完成上拉加载更多
              this.$refs.scroll.finishPullUp();
            })
            .catch(err => {
              console.log(err);
            });
      },
    },
    deactivated() {
      //取消全局事件监听
      this.$bus.$off("itemImageLoad",this.itemImgListener);
    }
  }
</script>

<style scoped>
  .home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: var(--color-background);
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    z-index: 9;
  }

  .tab-controll {
    position: relative;
    z-index: 10;
  }
</style>
