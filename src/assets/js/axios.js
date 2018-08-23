import axios from 'axios'
import ElementUi from 'element-ui'
import {API_URL} from './api'

//初始化axios
axios.defaults.baseURL=`${API_URL}/admin/`;

// 添加请求拦截器
axios.interceptors.request.use(config=>{
   config.headers['Authorization'] = localStorage.getItem('access_token');

   return config;
});

// 添加响应拦截器
axios.interceptors.response.use(res=>{

   return res.data;
},err=>{
   const errDate = err.response.data;

   ElementUi.Message({
      message: errDate.message,
      type: 'warning'
   });

   return Promise.reject(errDate)
})

export default axios;
