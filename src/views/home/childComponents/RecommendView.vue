<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .recommend{
    display: flex;
    font-size: 12px;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eeeeee;
    .recommend-item{
      flex-grow: 1;
      img{
        margin-bottom: 10px;
        width: 70px;
        height: 70px;
      }
    }
  }
</style>