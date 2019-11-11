<template>
  <div>
      <div class="back"><button @click="back">&lt;&nbsp;返回</button></div>
      <div class="banner">
        <swiper  :config="{id:'show_banner',info:{pagination:'.swiper-pagination'}}">
          <div class="swiper-slide" v-for="(item,index) in swipers" :key="index">
          <img  style="width:100%;height:100%" :src="banners+`${item}.jpg`" />
          </div>
        </swiper>
      </div>
      <!--轮播图---------------------------->
      <div class="main"><p>{{info.Name}}</p></div>
      <!--商品名称------------- -->
      <div v-if="isLoad" class="connect">
        <div class="left"><p>甜品</p></div><div class="right"><img :src="sweet" alt=""></div>
        <div class="left"><p>口味</p></div><div class="right">{{info.CategoryName}}</div>
        <div class="left"><p>原材料</p></div><div class="right">{{info.Resource || info.Resourse}}</div>
        <div class="left"><p>适合人群</p></div><div class="right">所有人群</div>
        <div class="left"><p>保鲜条件</p></div><div class="right">{{info.KeepFresh}}</div>
      </div>
      <!--商品详情------------------>

    <div class="btn-buy">
      <li style="list-style:none;" v-for="(item,index) in types" :key="index">
          <button @click="userSelct(index)" class="btn-kg" :class="{ liBackground:changeLeftBackground == index}">{{item.Size}}</button>
      </li>
    </div>
    <!--商品规格选择---------->
    <div class="more">
      <div class="left"><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1-round.png?v=112" alt=""><span>{{ProductConfig.configsize}}</span></div>
      <div class="right"><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt=""><span>{{ProductConfig.configpeople}}</span></div>
      <div class="left"><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt=""><span>{{ProductConfig.configware}}</span></div>
      <div class="right"><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt=""><span>{{ProductConfig.configtips}}</span></div>
    </div>
    <div class="choose">
      <div class="left">购买数量</div>
      <div class="right" >
        <button @click="minu">-</button>
        <span>{{num}}</span>
        <button @click="add">+</button>
      </div>
    </div>
    <!--商品购买--> 

     <div class="three">
      <div class="text1">
        <div class="left">划线价格</div>
        <div class="right">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</div>
       </div>
      <div class="text2">
        <div class="left">未划线价格</div>
        <div class="right">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
      </div>
     </div>
     <!--购买注意事项：---------------->

     <div class="foot">
       <div class="left">
          <span>{{`￥` + currentType.CurrentPrice*num + `.00` ||0 + `.00`}}</span>
       </div>
       <div class="center"><button @click="add">加入购物车</button></div>
       <div class="right"><button @click="isAdd">立即购买</button></div>
     </div>
  </div>

</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      params: {},
      //轮播
      swipers:[1,2,3,4],
      //图片
      banners:"",
      //type
      types:[],
      //名称价格之类
      info:{},
      isLoad:false,
      currentType:{},
      num:1,
      isLoad:false,
      sweet:"",
      allPrice:0,
      changeLeftBackground: 0,
      ProductConfig:{configpeople: "适合4-5人分享",configsize: "直径15cm",configtips: "至少需提前一天预约",configware: "含五人份餐具",}
    }
  },
  mounted() {
    this.params = this.$route.query;
    this.params.city = this.$store.state.city;
    this.pageInit();
  },
  methods: {
    pageInit() {
      var currentPro;
      if(this.params.SupplyNo.indexOf("NS")!==-1){
           this.banners= this.setImgUel("ns-detail");
           currentPro=this.$apis.getShowDataOne({Name:this.params.Name,m:"GetNSCakeByName"});
      }else if(this.params.SupplyNo.indexOf("KSK")!==-1){
          this.banners= this.setImgUel("jd-detail");
          currentPro=this.$apis.getShowDataTwo({City:this.params.city,ProName:this.params.Name,c:'Product',m:"GetCakeByName"});
      }else if(this.params.SupplyNo.indexOf("JZ")!==-1){
          this.banners= this.setImgUel("jz-detail");
           currentPro=this.$apis.getShowDataTwo({City:this.params.city,ProName:this.params.Name,c:'IndexCenter',m:"GetjzCakeInfo"});
      }else if(this.params.SupplyNo.indexOf("RP")!==-1){
          this.banners= this.setImgUel("rp-detail");
          currentPro=this.$apis.getShowDataOne({Name:this.params.Name,m:"GetRuPCakeByName"});
      }
      currentPro.then((res)=>{
        var res=res.data.Tag;
        if(res.length){
          res.map((item)=>{//数组
          if(item.City==this.params.city){
              this.types.push(item);
            }
          })
           if(this.types.length===0){
            this.types=res;
          }
          this.info=this.types[0];

         }else{//对象
          this.types=res.infos.CakeType;
          this.info=res.infos;
        }
        this.sweet = `https://res.bestcake.com/m-images/ww/jz/tiandu_${this.info.Sweet ? this.info.Sweet : this.info.CakeType[0].Sweet}.png`;
        this.CurrentPrice = this.info.CurrentPrice ? this.info.CurrentPrice : this.info.CakeType[0].CurrentPrice;
        this.isLoad=true;
        this.userSelct(0);
       // this.configpeople = JSON.parse(this.info.ProductConfig)
       /* console.log(this.configpeople);*/
      })
    },
    add(){
      this.num ++;
    },
    back(){
        this.$router.back(-1);
    },
    minu(){
      if(this.num <=0 ){
        this.num = 0;
      }else{
        this.num --;
      } 
    },
    userSelct(index){
     this.currentType=this.types[index];
     this.changeLeftBackground = index;
    /* console.log(this.types[index]);*/
    },
     isAdd() {
      var temp = {
        ID: this.currentType.Id||this.currentType.ID,
        Name: this.params.Name,
        CurrentPrice: this.currentType.CurrentPrice,
        ImgUrl: this.params.ImgUrl,
        Size: this.currentType.Size,
        num:this.num
      };
      MessageBox.confirm("确认加入购物车?").then(action => {
        // console.log("run");
        this.$store.commit("add",temp);
      })
      .catch(() => {});
    },
    setImgUel(no){
      return `https://res.bestcake.com/m-images/${no}/${this.params.Name}/${this.params.Name}-`; //1.jpg
    }
  }
};
</script>
<style lang="scss" scoped>
  .back{
    height: r(30);
    position: fixed;
    left: r(20);
    top:r(20);
    z-index: 99;
    
    button{
      width: 100%;
      height: 100%;
      border: none;background:white;
    }
  }
 .main{
   width: 100%;
   height: r(60);
   border-bottom: 15px solid ghostwhite;
   p{
     font-size: 16px;
     text-align: center;
     line-height: r(60);
   }
 }
  .connect{
    font-size: 14px;
    width: 100%;
    height: r(250);
    border-bottom: 20px solid ghostwhite;
    .left{
      width: 25%;
      float: left;
      height: r(45);
      margin-top: 10px;
    }
    .right{
      float: left;
      width: 70%;
      height: r(45);
       margin-top: 10px;
    }
    p{
      padding-left:20px;
      color: grey;
    }
  }
  .btn-buy{
    padding-top: r(35);
    width: 100%;
    height: r(70);
    border-bottom:15px solid ghostwhite; 
    .liBackground {
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#1fb1b8), to(#1fb1b8));
}
    li{
      float: left;
      height: r(40);
      width: 33%;
      .btn-kg{
        margin-left: 20%;
        color:white;
        width: 70%;
        height: 70%;
        border: none;
      }
    }
  }
   .more{
      width: 100%;
      height: r(90);
      .left{
        width: 40%;
        height: r(45);
        padding-left: r(15);
        float: left;
        display: flex;
        align-items: center;
        img{
          width: r(20);
          height: r(20);
          line-height: r(20);
        }
        span{
          padding-left: r(5);
        }
      }
      .right{
         display: flex;
        align-items: center;
        width: 45%;
        height: r(45);
        float: left;
         padding-left: r(10);
         img{
          width: r(20);
          height: r(20);
           line-height: r(20);
        }
        span{
          padding-left: r(5);
        }
      }
    }
  .choose{
    width: 100%;
   height: r(70);
   text-align: center;
   padding-top: 20px;
    border-bottom:15px solid ghostwhite; 
   .left{
     float: left;
     width: 20%;
     height: r(70);
     font-size: 14px;
   }
   .right{
     float: right;
     width: 20%;
     height: r(70);
     button{
       border: none;
       outline: none;
       background: white;
     }
     span{
       display: inline-block;
       padding: 0 5px;
     }
   }
  }
  .three{
  width: 100%;
  height: r(230);
  margin-top: 20px;
  .text1{
    width: 100%;
    height: r(70);
    .left{
      padding-left: 15px;
      width: 20%;
      float: left;
      height: 100%;
      line-height: 18px;
    }
    .right{
      width: 70%;
      height: 100%;
      float: right;color: gray;
      padding-right: 15px;
      line-height: 18px;
    }
  }
  .text2{
    width: 100%;
    height: r(100);
     .left{
      padding-left: 15px;
      width: 20%;
      float: left;
      height: 100%;
      line-height: 18px;
    }
    .right{
      width: 70%;
      height: 100%;
      float: right; color: gray;
      padding-right: 15px;
      line-height: 18px;
    }
  }
}
.foot{
  width: 100%;
  height: r(50);
  position: fixed;
  bottom: 0;
  z-index:111;
  background: white;
  border-top: 1px solid gainsboro;
  .left{
    width: 30%;
    height: r(50);
    float: left;
    color: red;
    padding-left: 15px;
    font-size: 14px;
    line-height: r(40)
  }
  .center{
    float: left;
    width: 35%;
    button{
      width: 100%;
      height: r(50);
      border: none;
      outline: none;
      font-size: 14px;
      line-height: r(50);
      background: white;
    }
  }
  .right{
    width: 30%;
    height: r(50);
    float: right;
    button{
      width: 100%;
      height: r(50);
      background: #1fb1b8;
      border: none;
      outline: none;
      font-size: 14px;
      line-height: r(50);
      color: white;
      font-weight: 600;
    }
  }
}
</style>