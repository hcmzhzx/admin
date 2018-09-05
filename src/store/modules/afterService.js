import axios from '../../assets/js/axios'

const state = { //属性
   afterSaleList:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   afterSaleState(state,payload){
      state.afterSaleList = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   // 售后客服
   afterSale({commit,state}){
      if(state.afterSaleList.length) return Promise.resolve(state.afterSaleList);
      return axios.get('after_sale/admin').then(partner=>{
         commit('afterSaleState',partner);
         return partner;
      })
   }
};

export default {state, getters, mutations, actions};
