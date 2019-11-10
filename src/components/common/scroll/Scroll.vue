<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpload:{
        type:Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click:true,
        pullUpLoad:this.pullUpload,
        probeType:this.probeType
      });
      //2.监听滚动位置
      this.scroll.on("scroll",(position)=>{
          this.$emit("scroll",position);
      });
      //3.监听上拉事件
      this.pullUpload&&this.scroll.on("pullingUp",()=>{
          this.$emit("pullingUp");
      });
    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll&&this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.scroll&&this.scroll.finishPullUp();
      },
      refresh(){
        this.scroll&&this.scroll.refresh();
      }
    }
  }
</script>

<style scoped>

</style>
