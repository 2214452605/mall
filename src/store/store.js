import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    AddCounter(state,payload){
      payload.count+=1;
    },
    AddToCart(state,payload){
      payload.checked=true;
      state.cartList.push(payload);
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise(((resolve, reject) => {
        let oldProduct = null;
        for (let item of context.state.cartList) {
          if (payload.id === item.id) {
            oldProduct = item;
          }
        }
        if (oldProduct) {
          context.commit("AddCounter",oldProduct);
          resolve("商品数量+1");
        } else {
          payload.count = 1;
          context.commit("AddToCart",payload);
          resolve("添加成功");
        }
      }));
    }
  },
  getters:{
    cartLength(state){
      return state.cartList.length;
    },
    cartList(state){
      return state.cartList;
    }
  }
})
