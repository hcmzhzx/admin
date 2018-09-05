import axios from '../../assets/js/axios'

const state = { //属性
   beginSaleList:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   beginSaleState(state,payload){
      state.beginSaleList = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   // 售后客服
   beginSale({commit,state}){
      if(state.beginSaleList.length) return Promise.resolve(state.beginSaleList);
      return axios.get('begin_sale/admin').then(partner=>{
         commit('beginSaleState',partner);
         return partner;
      })
   }
};

export default {state, getters, mutations, actions};
