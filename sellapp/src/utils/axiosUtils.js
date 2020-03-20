import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:3333';

// 添加请求拦截器
axios.interceptors.request.use(config=>{
    const token="2333"
    if(token){
        axios.defaults.token=token
    }

    if(config.method=='post'){
        config.data=qs.stringify(config.data)
    }

    // 在发送请求之前做些什么
    return config
},error=>{
    // 对请求错误做些什么
    return Promise.reject(error)
});


// 添加响应拦截器
axios.interceptors.response.use(response=>{

    // 对响应数据做点什么
    return response.data.data
}, error=>{
    // 对响应错误做点什么
    return Promise.reject(error)
});