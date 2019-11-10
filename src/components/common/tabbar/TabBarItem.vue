<template>
  <div class="tab-bar-item" @click="handleItemClick">
    <div v-if="!isActive">
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style="activeStyle">
      <slot name='item-text'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data() {
      return {
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1;
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      handleItemClick(){
        this.$router.push(this.path);
      }
    }
  }
</script>

<style scoped lang="less">
  .tab-bar-item {
    flex-grow: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;

    img {
      margin-top: 3px;
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }

    div {
      margin-top: 2px;
      display: block;
    }
  }
</style>