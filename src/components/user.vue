<template>
  <div class="home">
  		<div class="mark" v-show="bool">
        <div class="back" @click="toIndex">
          <i class="fa fa-chevron-left" aria-hidden="true">&nbsp;返回</i>
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model.lazy="uname"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model.lazy="upwd" ></mt-field>
        <button @click="login">登录</button>
        <p>{{err}}</p>
      </div>


      <div class="main">
        <div class="top">
          <img :src="userInfo.userImg" @click="toPath()"> 
          <div class="list">
            <p><span>余额</span><span>{{userInfo.balance}}</span></p>
            <p><span>吉致币</span><span>{{userInfo.jizhibi}}</span></p>
            <p><span>优惠券</span><span>{{userInfo.coupon}}</span></p>
            <p><span>兑换券</span><span>{{userInfo.JYA}}</span></p>
          </div>
        </div>
        <div class="bottom">
         <div>
            <i class="fa fa-file-text-o" aria-hidden="true"></i>
            我的订单
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
         <div>
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            收货地址
            <i class="fa fa-angle-right" aria-hidden="true"></i>
           </div>
        </div>
      </div>
  </div>
</template>

<script>
  import { Field } from 'mint-ui';
  import userInfo from "@/data/data.json";
  import storage from "storejs"; 
    export default {
      data() {
        return {
          uname : "",
          upwd : "",
          userInfo : {},
          err : '',
          bool : true
        }
      },
      mounted() {
        if(storage.get("user")) {
          this.bool = false;
          this.userInfo = storage.get("user");
        }

      },
      methods : {
        toIndex() {
          this.$router.push("/");//路由跳转 ，返回
        },

        login() {  //点击登录按钮  筛选userinfo中的数据与用户输入的数据比较 
          userInfo.map((item,index) => {
            if(item.uname === this.uname){
              if(item.upwd === this.upwd) {
                this.bool = false;//遮罩消失 开始渲染 
                storage.set("user",item);//store存储数据，下次登录
                this.userInfo = storage.get("user");
              }
            }else {
              this.err = "*账号或密码错误";   
            }
          })
          storage.remove("cartList");
          this.$store.state.cartList.splice(0)
        },
        toPath(){
          this.$router.push('/userinfo');
        }
      }
    }
</script>


<style lang="scss" scoped> 
  .mark {
    .back {
      position: absolute;
      top: r(20);
      font-size: r(18);
      color: gray;
      i {
        font-size: r(16);
        margin-right: r(5);
      }
    }
    position: fixed;
    height: 100%;
    width: 100%;
    background: #fff;
    z-index: 99999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include setRem(padding,100,30,0,30);
    a {
      border-bottom:1px solid #ddd; 
      width: 80%;
    }
    button {
      margin-top: r(30);
      border-radius: r(5);
      width: 80%;
      border: none;
      background: #fff;
      height: r(30);
      font-size:r(18);
      background: orangered;
      color: white;
      margin-bottom: r(15);
    }
    p {
      font-size:r(16);
      color: red;
    }
  }
  .main {
    .top {
      padding-top: r(40);
      padding-bottom: r(20);
      img {
        width: r(80);
        height: r(80);
        display: block;
        margin: 0 auto; 
        border-radius: 50%;
        border: 1px solid;
        margin-bottom: r(40);
      }
      .list {
        display: flex;
        p{
          height: r(35);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            display: inline-block;
            width: 100%;
            text-align:center;
          }
          span:nth-child(1) {
            color: gray;
          }
          span:nth-child(2) {
            font-size:r(14);
          }
        }
      }
    }
  }
  .bottom {
      border-top: r(15) solid rgb(247, 247, 247);
      div {
        position: relative;
        width: 100%;
        height: r(50);
        line-height: r(50);
        font-size:r(16);
        margin-left:r(25);
        padding-left: r(5);
        i {
          font-size:r(18);
          margin-right: r(8);
        }
        i:nth-child(2){
          position: absolute;
          color: gray;
          top: 30%;
          right: 10%;
        }
      }
      div:nth-child(1) {
        border-bottom : 1px solid gray;
      }
  }
  .home {
    overflow: hidden;
  }
  </style>