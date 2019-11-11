<template>
  <div class="big">
    <div class="table">
      <button @click="selecData(1)" :class="{active:num==1}">自营</button>
      <button @click="selecData(2)" :class="{active:num==2}">贝式严选</button>
    </div>
    <div class="one">
        <ul>
        <li v-for="(item,index) in listData" :key="index">
          <button class="title-list" @click="check(index)" ><span :class="{ liBackground:changeLeftBackground == index}">{{item.title}}</span></button>
        </li>
      </ul>
    </div>
    <div class="two">
       <ul>
          <li v-for="(it,idx) in listcake" :key="idx">
            <a href="javascripts:;" id="img1"><img :src="it.ImgUrl" alt="" @click="toPath(it)"></a>
            <p>{{it.Name}}</p>
            <div>{{it.Means}}</div>
            <span class="span1">￥{{it.CurrentPrice}}</span><span class="span2">/{{it.LabelText}}</span>
            <a href="JavaScript:;" id="img2" @click="add(it)"><img src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" alt=""></a>
          </li>
       </ul>
     </div>
    
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
     <div class="foot"></div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      goodsLIst: [
        { title: "女神", mark: "NS", list: [] },
        { title: "经典", mark: "KSK", list: [] },
        { title: "伴手礼", mark: "JZ", list: [] },

        { title: "乳品", mark: "RP", list: [] }
      ],
      listData:[],
      listcake:[],
      num:1,
      changeLeftBackground: 0,
    };
  },
  mounted() {
    this.selecData(1);
    this.pageInit();
    this.check(0);
     Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
    });
    setTimeout(()=>{
      Indicator.close();
    },1000)
  },
  methods: {
    pageInit() {
      this._getListData(res => {
        var res = res.data.Tag.cakelist;
        this.goodsLIst.map((item, index) => {
          res.map(it => {
            if (it.SupplyNo.indexOf(item.mark) !== -1) {
              item.list.push(it);
              it.ImgUrl = this.$global.setImgUrl(it);
            }
          });
        });
        this.selecData(1)
      });
    },
    check(index){
     this.listcake = this.listData[index].list;
     this.changeLeftBackground = index;
    },
    selecData(status) {
      this.num = status;
      if (status === 1) {
        this.listData = this.goodsLIst.slice(0, 3);
        this.check(0);
      } else {
        this.listData = this.goodsLIst.slice(3);
        this.check(0);
      }
    },
    add(it){
      var temp={
        ID:it.ID,
        Name:it.Name,
        CurrentPrice:it.CurrentPrice,
        ImgUrl:it.ImgUrl,
        Size:it.Size,
      }
      console.log(temp);
      MessageBox('提示', `${it.Name}已加入购物车`);
      this.$store.commit("add",temp);
      // console.log(temp);
    },
    toPath(it){
      this.$router.push({path:"/show",query:{SupplyNo:it.SupplyNo,Name:it.Name,ID:it.ID,ImgUrl:it.ImgUrl}});
    },
    _getListData(callBack) {
      this.$apis.getListData().then(res => {
        callBack(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.big{
  width: 100%;
  .table{
    width: 100%;
    height: r(40);
    button{
      width: 50%;
      height: 100%;
      border: none;
      outline: none;
      background: white;
    }
    .active{
      border-bottom: 6px solid #1fb1b8;
    }
  }
  .one{
    width: 100%;
    height: r(40);
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      li{
        width: 33%;
        height: 100%;
        float: left;
         border-bottom:2px solid ghostwhite;
        .title-list{
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: r(40); 
          border: none;
          background: white;
        }
        .liBackground {
      border-bottom: 4px solid #1fb1b8;
        }
      }
    }
  }
  .two{
    width: 100%;
    display: flex;
    float:1;
    border-bottom:15px solid ghostwhite; 
    ul{
      width: 100%;
      li{
        width: 45%;
        float: left;
        height: r(232);
        padding: 5px;
        #img1{
          display: block;
          width:100%;
          height: r(150);
          img{
            width: 100%;
            height: r(150);
          }
        }
        p{
          padding: 5px;
        }
        div{
          padding: 5px;
          width: 90%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .span1{
          color: red;
          display: inline-block;
        }
        .span2{
          display: inline-block;
        }
        #img2{
          display: inline-block;
          width: 20px;
          height: 20px;
          float: right;
          img{
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
 .three{
  width: 100%;
  height: r(180);
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
    height: r(90);
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
  height: r(50.98);
}
</style>
            