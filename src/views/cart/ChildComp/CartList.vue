<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <car-list-item v-for="(item,index) in cartList"
                     :key='index'
                     :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import CarListItem from "./CartListItem";
  import Scroll from '../../../components/common/scroll/Scroll';
  import {mapGetters} from 'vuex';

  export default {
    name: "CartList",
    components: {
      Scroll,
      CarListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
        this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    position: absolute;
    bottom: 90px;
    left: 0;
    right: 0;
    top: 49px;
    z-index: 0;
  }
  .content {
    height: 100%;
    overflow: hidden;
  }

</style>
