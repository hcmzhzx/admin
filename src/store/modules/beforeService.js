import axios from '../../assets/js/axios'

const state = { //属性
   saleList:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   SaleState(state,payload){
      state.saleList = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   // 售后客服
   beginSale({commit,state}){
      if(state.saleList.length) return Promise.resolve(state.saleList);
      return axios.get('begin_sale/admin').then(partner=>{
         commit('SaleState',partner);
         return partner;
      })
   }
};

export default {state, getters, mutations, actions};
