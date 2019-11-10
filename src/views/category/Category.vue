<template>
  <div class="wrapper">
    <ul class="content">
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
      <li>洛天依</li>
    </ul>
  </div>

</template>

<script>
  import BS from "better-scroll";

  export default {
    name: "Category",
    data() {
      return {
        bs: null
      }
    },
    methods: {},
    mounted() {
      this.bs = new BS(document.querySelector(".wrapper"), {
        probeType: 3,
        pullUpLoad: true
      });
      this.bs.on("scroll", position => {
        // console.log(position);
      });
      this.bs.on("pullingUp", () => {
        console.log("上拉加载更多");

      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: #66ccff;
  }
</style>