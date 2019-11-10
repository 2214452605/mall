<template>
  <div class="detail">
    <!--      导航栏-->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" :probeType="3" ref="scroll" @scroll="contentScroll">
      <detail-swiper :images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
    <toast :message="message" :is-show="show"/>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import Scroll from "components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "./childComponents/DetailCommentInfo";
  import DetailBottomBar from './childComponents/DetailBottomBar';
  import GoodsList from "components/content/goods/GoodsList";
  import {debounce} from "../../common/utils";
  import {itemListenerMinxi,backTopMinxi} from "../../common/mixin";
  import {mapActions} from "vuex";
  import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Detail",
    components: {
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      Toast
    },
    data() {
      return {
        topImages: [],
        id: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        topOffsetYs: [],
        currentIndex:null,
        message:"",
        show:false
      }
    },
    mixins: [itemListenerMinxi,backTopMinxi],
    created() {
      this.id = this.$route.params.id;
      getDetail(this.id).then(res => {
        const data = res.result;
        //获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //保存商品详情数据
        this.detailInfo = data.detailInfo;
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        this.$nextTick(()=>{
          // 根据最新的数据，对应的DOM是已经被渲染出来
          // 但是图片依然是没有加载完，
          // 数组置空
          this.topOffsetYs=[];
          this.topOffsetYs.push(0, this.$refs.params.$el.offsetTop, this.$refs.comment.$el.offsetTop, this.$refs.recommend.$el.offsetTop);
        });

      }).catch(error => {
        console.log(error)
      });
      //请求推荐数据
      getRecommend()
          .then(res => {
            this.recommends = res.data.list;
          }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      ...mapActions(['addCart']),
      addToCart(){
        //1.获取购物车需要展示的信息
        const product={};
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.id=this.goods.id;
        //2.添加到vuex中
        // this.$store.dispatch("addCart",product).then(res=>{
        //   console.log(res);
        // });
        this.addCart(product).then(res=>{
            this.$toast.show(res,1500);
        });
      },
      imageLoad() {
        this.$refs.scroll.refresh();
        this.topOffsetYs=[];
        this.topOffsetYs.push(0, this.$refs.params.$el.offsetTop, this.$refs.comment.$el.offsetTop, this.$refs.recommend.$el.offsetTop);
        console.log(this.topOffsetYs);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.topOffsetYs[index], 200);
      },
      contentScroll(position){
        //1.获取y值
        const y=-position.y;
        //2.topOffsetYs和主题中的值进行对比
        let length=this.topOffsetYs.length;
        for (let i=0;i<length;i++){
          if (this.currentIndex!==i&&((i<length-1&&y>=this.topOffsetYs[i]&&y<=this.topOffsetYs[i+1])||
           (i===length-1&&y>=this.topOffsetYs[i]))){
                this.currentIndex=i;
                this.$refs.nav.currentIndex=this.currentIndex;
          }
        }
        this.isShow = (-position.y) > 1000;
      }
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off("itemImageLoad", this.itemImgListener);
    },

  }
</script>

<style scoped lang="less">
  .detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background: white;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    z-index: 10;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }

  .detail-nav {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 20;
    background: white;
  }
</style>
