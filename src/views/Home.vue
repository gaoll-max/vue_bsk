<template>
  <div class="home">
    <div class="banner-btm">
       <mt-tab-item id="tab1">
         <ul>
           <li>
            <span v-for="(item,index)  in pathList" :key="index">
            <i :class="item.font"></i>
            <button @click="toPath(item)" class="btn">{{item.pathname}}</button>
            </span>
            </li>
         </ul>
          
       </mt-tab-item>
    </div>
    <!-- 切换路由组件 -->
     <keep-alive>
          <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" img-set="/img/favicon.ico" />
    </keep-alive>  
          <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title" img-set="/img/favicon.ico" />
  </div>

</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
export default {
  data() {
    return {
      pathList: [
        { pathname: "首页", path: "/index",font:"fa fa-h-square" },
        { pathname: "分类", path: "/list" ,font:"fa fa-bars"},
        { pathname: "购物车", path: "/cart" ,font:"fa fa-bus"},
        { pathname: "我的", path: "/user",font:"fa fa-user-o" },
      ]
    };
  },
 
  methods: {
    toPath(item) {
      this.$router.push(item.path);
    }
  },
};
</script>
<style lang="scss" scoped>
  .banner-btm{
    border-top: 1px solid gainsboro;
    width: 100%;
    height: r(55);
    position: fixed;
    bottom:0;
    z-index: 9;
    border-top: 1px solid red($color: #000000);
    background: white;
    ul{
      width: 100%;
      height: r(50);
      display: flex;
      li{
        width: 100%;
        height:r(50);
        flex: 1;
        span{
          display: flex;
          flex-direction:column;
          height: r(50);
          display: inline-block;
          width: 25%;
          color:red;
          i{
            display: inline-block;
            text-align: center;
            height:16px;
            width: 100%;
          }
          .btn{
            height: r(23);
            width: 100%;
            border: none;
            outline: none;
            background: white;
        }
        }
      }
    }
  }
</style>

