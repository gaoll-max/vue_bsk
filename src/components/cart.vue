<template>
  <div>
    <div class="bigbox">
      <div class="clear" v-show="!cartList.length">购物车是空的</div>
      <div class="cart" v-for="(item,index) in cartList" :key="index">
          <div class="one"><img :src="item.bool ? src1 :src2" @change="count" @click="sel(item,index)" alt=""></div>
          
          <div class="two">
            <img :src="item.ImgUrl" alt="">
          </div>
          <div class="three">
             <p class="first">{{item.Name}}</p>
             <p class="second">{{item.Size}}</p>
             <p class="three">{{item.num*item.CurrentPrice}}</p>
          </div> 
          <div class="four">
            <button @click="minu(item)" name="-">-</button>
            <span>{{item.num}}</span>
            <button @click="add(item)" name="+">+</button>
          </div>           
   </div>
   <div class="main"></div>
    <div class="foot">
      <div class="one"><input type="checkbox" v-model="isBool" @click="Allselect">全选</div>
      <div class="two"><button @click="del">清空</button></div> 
      <div class="three">总价:&nbsp;&nbsp;{{allPrice}}.00</div>
      <div class="four"><button @click="buy">立即购买</button></div>
    </div>
    </div>
   
  </div> 
</template>
<script>
import Store from "storejs";
import { Indicator } from 'mint-ui';
import { MessageBox } from "mint-ui";
export default {
  data(){
    return {
      cartList:[],
      allPrice:0,
       isArr:[],
      isBool:false,
      src1:"https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg",
      src2:"https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg",
    }
  },
  mounted(){
    this.cartList=this.$store.state.cartList;
    this.cartList.map((item)=>{
      item.bool=false;
    })
    this.count();
    this.$store.state.cartList.map((item)=>{
      this.num += item.num;
    })
    Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
    });
    setTimeout(()=>{
      Indicator.close();
    },1000);
  },
  methods:{
    sel(item,index){
      item.bool =  !item.bool;
      this.$set(this.cartList,index,item);
      this.count();
    },
    add(item){
      item.num ++;
      this.count();
      Store.set("cartList",this.$store.state.cartList);
      this.num = 0;
      this.$store.state.cartList.map((item)=>{
        this.num += item.num;
      })
    },
    minu(item){
       if(item.num <=1){
          MessageBox.confirm(`确认删除${item.Name}从购物车中`).then(action => {
            this.cartList.splice(item,1);
          }).catch(() => {})
      }else{
        item.num --;
        this.count();
      } 
    },
    buy(){
      MessageBox.confirm("确认购买").then(action => { 
        alert("ok");
      })
      .catch(() => {})
    },
    count(){
      this.allPrice = 0;
      this.isArr = [];
      this.cartList.map((item)=>{
        if(item.bool){
          this.allPrice += item.num* item.CurrentPrice;
          this.isArr.push(item.num* item.CurrentPrice);
        }
      })
      this.isArr.map((item)=>{
        this.allPrice += item
      })
      if(this.isArr.length){
         if(this.isArr.length === this.cartList.length){
        this.isBool=true;
      }else{
        this.isBool = false;
      }
      }else{
        this.bool = false;
      }
    },
     Allselect() {
        if (this.isBool === false) {
        this.cartList.map(item => {
          item.bool = true;
          this.allPrice += item.num * item.CurrentPrice;
        });
      } else {
        this.cartList.map(item => {
          item.bool = false;
          this.allPrice = 0;
        });
      }
    },
    del(){
      MessageBox.confirm("确认清空购物车?").then(action => { 
        this.cartList = "";
      })
      .catch(() => {})
      }
    },
};
</script>
<style lang="scss" scoped>
.bigbox{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .clear{
    margin-top: 10%;
    font-size: 14px;
    width: 100%;
    text-align: center;
  }
  .cart{
    height: r(160);
    width: 100%;
      border-bottom:10px solid ghostwhite; 
      margin-left: 5px;
    .one{
      width: 10%;
      height: r(160);
      float: left;
      display: flex;
      align-items: center;
      img{
        width: r(30);
        height: r(30);
      }
    }
    .two{
      width: 40%;
      height: r(140);
       float: left;
      img{
        width: r(140);
        height:r(140);
      }
    }
     .three{
      width: 30%;
      height: r(120);
       float: left;
       padding-top: 20px;
       p{
         padding-left: 20px;
         width: 100%;
         height: r(25);
       }
       .first{
         font-size: 14px;
       }
       .second{
         color: grey;
       }
       .three{
         font-weight: 800;
       }
    }
     .four{
      width: 20%;
      height: r(100);
       float: left;
      margin-top: r(60);
      font-size: 14px;
      span{
        display: inline-block;
        padding: 0 3px;
      }
      button{
        display: inline-block;
        width: r(20);
        height: r(20);
        border: none;
        background: white;
      }
    }
  }
  .main{
    width: 100%;
    height: r(70);
    background: white;
  }
  .foot{
     border-top: 1px solid gainsboro;
    position: fixed;
    width: 100%;
    bottom: r(50);
    display: flex;
    justify-content: space-around;
    background: white;
    font-size: 14px;
    .one{
      font-size: 14px;
      height: r(50);
      line-height: r(50);
    }
    .two{
      width: r(50);
      height: r(50);
      line-height: r(50);
      button{
        border: none;
        background: white;
      }
    }
    .three{
      width: r(150);
      height: r(50);
      padding-left: r(30);
      line-height: r(50);
      color: red;
    }
    .four{
      float: right;
      width: r(80);
      height: r(50);
      background: #1fb1b8;
      button{
        width: r(80);
        height: r(50);
        background: #1fb1b8;
        color: white;
        border: none;
        outline: none;
      }
    }
  }
}
</style>