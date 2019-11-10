<template>
  <div class="tab-controller">
    <div v-for="(item,index) in titles"
         class="tab-controller-item" :class="{active:index===currentIndex}" @click="handleClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabController",
    props: {
      titles: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      handleClick(index){
        this.currentIndex=index;
        this.$emit("tabClick",index);
      }
    }
  }
</script>

<style scoped lang="less">
  .tab-controller {
    display: flex;
    text-align: center;
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    background-color:  #ffffff;
    /*z-index: 10;*/

    .tab-controller-item {
      flex-grow: 1;
      span {
        border-bottom: 3px solid transparent;
        padding-bottom: 2px;
      }
    }
  }

  .active {
    color: var(--color-high-text);

    span {
      border-bottom-color: var(--color-high-text) !important;
    }
  }
</style>