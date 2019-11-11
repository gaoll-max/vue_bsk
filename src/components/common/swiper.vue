<template>

 <div class="swiper-container" :id="config.id">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!--分页器小圆点-->
    <div class="swiper-pagination" v-if="config.info.pagination"></div>
  </div> 
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props:["config"],//props 当属性变量使用 this.xxx
  mounted() {
    this.$nextTick(() => {
      new Swiper("#"+this.config.id,this.config.info);
    });
  }
};
</script>
<style lang="scss" scoped>
  .swiper-container{
    border-radius: 10px;
  }
</style>

