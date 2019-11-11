import Vue from "vue";
import Vuex from "vuex";
import apis from "@/core/api/apis";
import Store from "storejs";
Vue.use(Vuex);  

export default new Vuex.Store({
  state: {
    city: "上海",
    cartList:Store.get("cartList")||[]

  },
  mutations:{
    add(state,data){
      var bool =true;
      state.cartList.map((item)=>{
        //重复
        if(item.ID===data.ID){
          if(data.num >1){
            item.num = item.num + data.num;
            bool = false;
            return;
          }
          item.num ++;
          bool = false;
        }
      })
      if(bool){
        // 新增数据    ||
        data.num=data.num||1;
        state.cartList.push(data);
      }
      Store.set("cartList",state.cartList)
    },
    test(state){
      console.log(state.cartList)
    }
  },
  getters:{},
  actions:{}
});

