
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
Vue.use(Vuex)

const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  // mutations中的每个方法尽可能完成事情比较单一一点
  actions,
  getters
})

export default store

