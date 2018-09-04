import axios from '../../assets/js/axios'

const state = { //属性
   partnerList: [] // 合作列表
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   PartnerState(state,payload){
      state.partnerList = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   // 合作站点列表
   PartnerData({commit,state}){
      if(state.partnerList.length) return Promise.resolve(state.partnerList);
      return axios.get('partner?include=brand').then(partner=>{
         let partners = partner.data.map((item)=>{
            let list = {};
            list.text = item.name;
            list.value = item.id;
            return list;
         });
         commit('PartnerState',partners);
         return partners;
      })
   }
};

export default {state, getters, mutations, actions};
