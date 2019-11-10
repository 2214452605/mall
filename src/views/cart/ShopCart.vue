<template>
  <div class="cart">
    <nav-bar class="nav-bar">
       <template #center>
         购物车({{length}})
       </template>
    </nav-bar>
<!--    商品的列表-->
  <cart-list></cart-list>
<!--    底部汇总-->
  <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartList from './ChildComp/CartList';
  import NavBar from '../../components/common/navbar/NavBar';
  import {mapGetters} from "vuex";
  import CartBottomBar from "./ChildComp/CartBottomBar";
  export default {
    name: "ShopCart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length:'cartLength',
        carList:'cartList'
      })
    }
  }
</script>

<style scoped>
.nav-bar{
  font-weight: 700;
  background-color:var(--color-tint);
  color: white;
}
</style>
