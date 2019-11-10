<template>
  <div class="bottom-bar">
      <div class="check_content">
         <check-button class="check_button"
                       :is-checked="isSelectAll"
                        @click.native="checkClick"
         />
         <span>全选</span>
        <div class="total-price">
          合计:{{totalPrice}}元
        </div>
        <div class="calculate" @click="calculate">
            去结算:{{checkLength}}
        </div>
      </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked;
        }).reduce(((previousValue, currentValue) => {
                return previousValue+currentValue.price*currentValue.count;
        }),0).toFixed(2);
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).length;
      },
      isSelectAll(){
        if (this.$store.state.cartList.length===0)return false;
        return !this.$store.state.cartList.some(item=>!item.checked);
      },
    },
    methods:{
      checkClick(){
         if (this.isSelectAll){//全部选中
           this.$store.state.cartList.forEach(item=>item.checked=false);
         }else{
           this.$store.state.cartList.forEach(item=>item.checked=true);
         }
      },
      calculate(){
        if (!this.isSelectAll){
          this.$toast.show("请选择购买的商品",2000);
        }
      }
    }
  }
</script>

<style scoped>
.bottom-bar{
  position: absolute;
  bottom: 50px;
  height: 40px;
  left: 0;
  width: 100%;
  z-index: 1;
  background-color: #66ccff;
}
.check_content{
  display: flex;
  align-items: center;
  line-height: 40px;
}
  .check_button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .total-price{
    margin-left: 20px;
  }
  .calculate{
    margin-left: 70px;
  }
</style>
