import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop"
export const itemListenerMinxi = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //防抖动事件
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    //对监听的事件进行保存
    this.itemImgListener = () => {
      refresh();
    };
    // 3.监听item中图片加载完成
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    //所有的组件都有属性$el:用于获取组件中的元素
  }
};
export const backTopMinxi={
  components:{
    BackTop
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
};
