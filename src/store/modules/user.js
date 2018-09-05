import axios from '../../assets/js/axios'

const state = { //属性
   user:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   userState(state,payload){
      state.user = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   userInfo({commit,state}){
      if(state.user.length) return Promise.resolve(state.user);
      return axios.get('admin').then(user=>{
         commit('userState',user);
         return user;
      })
   }
};

export default {state, getters, mutations, actions};
