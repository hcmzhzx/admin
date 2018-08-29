import axios from '../../assets/js/axios'

const state = { //属性
   brandsList:[]  //品牌列表
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   BrandsState(state,payload){
      state.brandsList = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   BrandsData({commit,state}){
      if(state.brandsList.length) return Promise.resolve(state.brandsList);
      return axios.get('brands?sort=1').then(brand=>{
         let brands = brand.data.map((item)=>{
            let list = {};
            list.text = `${item.pinyin.substr(0, 1)}.${item.title}`;
            list.value = item.id;
            return list;
         });
         commit('BrandsState',brands);
         return brands;
      })
   }
};

export default {state, getters, mutations, actions};
