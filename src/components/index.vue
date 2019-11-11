<template>
  <div>
    <!-- logo -->
    <div class="logo">
      <p>
        <img src="https://res.bestcake.com/images/newIndex/localtion.png" alt="" class="img1">
        <span>上海</span>
        <img src="https://res.bestcake.com/images/newIndex/more.png" alt="" class="img2">
      </p>
    </div>
      <!-- 轮播图组件 -->
      <div v-if="SwiperBannerList.length!==0" class="swiper-banner"> 
        <swiper :config="{id:'banner',info:{pagination:'.swiper-pagination',
        autoplay:{
          disableOnInteraction:false,
        },speed:1000
        }}">
            <div class="swiper-slide" v-for="(item,index) in SwiperBannerList" :key="index">
              <img class="banner_img" :src="item.ImgUrl" >
            </div>
        </swiper>
      </div>
      <div  class="title_img1">
         <img src="https://res.bestcake.com/images/newIndex/title.png?v=1" alt="">
      </div>
      <div class="title_img2">
          <img src="https://res.bestcake.com/m-images/banner1_list/865091713750555400.jpg" alt="">
      </div>
      <div class="iconList">
        <div v-for="(value,idx) in TopIconList" :key="idx" class="iconList-item">
        <img :src="value.ImgUrl" alt=""  class="iconList-item">
        <p>{{value.ActName}}</p>
        </div>
      </div>
      <!--通知栏-->
      <div class="boardcast">
        <span>通知</span>
        <div class="boardcastA">
          <div class="text">贝思客官方申明：我司近期发现有客户通过非正常渠道售卖的代金卡无法正常使用，目前我司正通过法律途径解决此问题。我司在此郑重申明，从未授权过任何渠道售卖我司代金卡，请客户通过正常渠道（如：官网、公司销售）进行购买消费。
          </div>
        </div>
      </div>
      <!--商品展示-->
      <div class="special-cart">
        <div v-for="(itm,idx) in CenterContentList" :key="idx" class="cart-show">
          <img :src="itm.ImgUrl" alt="">
        </div>
      </div>
      <!--中间大图-->
      <div v-for="(item,index) in SaleList" :key="index">
        <img :src="item.TabImgUrl" alt=""  class="title_img">
        <div class="bigbox">
           <swiper :config="{id:'banner'+index,info:{  slidesPerView:2.3,spaceBetween:30}}">
          <div class="swiper-slide list-cart" v-for="(value,idx) in item.CakeList" :key="idx">
            <img class="banner_img" :src="value.ImgUrl" />
            <p>{{value.Name}}</p>
            <p><span class="span2">￥{{value.Price}}</span><span class="span1">{{value.Size}}</span></p>
          </div>
        </swiper>
        </div>
      </div>
      <div class="foot"></div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  data(){
    return {
      SwiperBannerList:[],//ImgUrl
      SaleList:[],
      TopIconList:[],
      CenterContentList:[]
    }
  },
  mounted(){
    this.$apis.getIndexData().then((res)=>{
      /*console.log(res)*/
      var res=res.data.Tag.mainresult;
      var SaleList = res.SaleList;
      SaleList.map((item)=>{
        item.CakeList = JSON.parse(item.CakeList);
        item.CakeList.map((item)=>{
          item.ImgUrl = this.$global.setImgUrl(item);
        })
      })
      this.TopIconList = res.TopIconList;
      this.CenterContentList = res.CenterContentList;
      this.SaleList = SaleList;
      this.SwiperBannerList=res.SwiperBannerList;
    });
    Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
    });
    setTimeout(()=>{
      Indicator.close();
    },1000)
  },
  methods:{
    
  }
};
</script>
<style lang="scss" scoped>
.logo{
  width: 91vw;
  height: r(44);
  margin: 0 auto;
  p{
    padding:15px 5px 5px 5px;
    .img1{
    width: 5vw;
    height: 5.5vw;
    float: left;
    }
    span{
      display: inline-block;
      font-size: 3.7vw;
    }
    .img2{
    margin-left: 1.0667vw;
    width: 2.4vw;
    height: 4.2667vw;
    }
  }
} 
h2{
  text-align: center;
}
.swiper-banner{
  margin: 10px;
}
.banner_img{
  width:100%;
  height:100%;
}
.title_img{
  width: 100%;
  height: r(142);
}
.title_img1>img{
  width: 100%;
  height: 36px;
}
.title_img2{
  width: 100%;
  height: 86px;
  img{
    width: 100%;
    height: 100%;
  }
}
.iconList{
  padding: 0 5.5vw;
  padding-bottom: 5.3vw;
  height: 200px;
    .iconList-item{
      float: left;
      width: 15.866vw;
      margin:10px 6.3vw 0 0;
    }
    p{
      padding: 5px 0 5px 0;
      text-align: center;
    }
}
.boardcast{
  width: 100%;
  height: 15vw;
  color: #1fb1b8;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  color: white;
   box-shadow: 0 0 8px rgb(243, 236, 236) ;
  span{
    width: 9.6vw;
    height: 4.8vw;
    line-height: 4.8vw;
    text-align: center;
    margin-left: 4.2667vw;
    background: #1fb1b8;
    margin-top: 3vw;
    border-radius: 1.0667vw;
    float: left;
  }
  .boardcastA{
    position: relative;
    margin-right: 6.4vw;
    width: 78.4vw;
    height: 100%;
    top: 0;
    overflow: hidden;
    float:right;
    .text{
    height: 4.8vw;
    line-height: 4.8vw;
    position: absolute;
    top: 3vw;
    white-space: nowrap;
    animation: go 25s linear infinite;
    font-size: 3.7334vw;
    color: #1fb1b8;
  }
        @keyframes go{
           0% {
          transform: translateX(30%);
      }
            100% {
          transform: translateX(-100%);
      }
  }  
  }
} 
.special-cart{
    padding: 4.2667vw;
    background: #fff;
    .cart-show{
      background: #f9f9f9;
      border-radius: 1.8vw;
      width: 44.533vw;
      height: 26.667vw;
      margin-right: 0.5vw;
      margin-bottom: 2.4vw;
      position: relative;
      overflow: hidden;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
}
.bigbox{
  overflow: hidden;
  .list-cart{
    width: 20.6vw;
    background: #fff;
    border-radius: 2vw;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    img{
      width: 32vw;
    height: 32vw;
    display: block;
    margin: 0 auto ;
    }
    p{
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 500;
      width:100%;
      text-align: center;
    }
    span{
      display: inline-block;
      text-align: center;
    }
    .span2{
      color: red;

    }
    .span2{
      overflow: hidden;
    }
  }
}
.foot{
  height: r(50.98);
}
</style>
