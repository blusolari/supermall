import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHANGE_CHECK,
} from "./mutation-type"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1;
    payload.checked = false;
    state.cartList.push(payload);
  },
  [CHANGE_CHECK](state, payload) {
    payload.checked = !payload.checked
  },
  uncheckAll(state) {
    state.cartList.forEach(item => item.checked = false);
  },
  checkAll(state) {
    state.cartList.forEach(item => item.checked = true);
  }

}