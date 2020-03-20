import Vue from 'vue'
import Vuex from 'vuex'
import { goods } from './apis/goods'
import moment from 'moment'
Vue.use(Vuex)

 let store= new Vuex.Store({
  //存放各组件公共数据
  state: {
    goodsData: []
  },
  //同步修改数据
  mutations: {
    initGoodsList(state, val) {
      state.goodsData = val
    },
    //商品加减按钮
    addCard(state, { name, n }) {
      for (let itme of state.goodsData) {
        for (let o of itme.foods) {
          if (o.name == name) {
            o.count += n;
            break;
          }
        }
      }
    },
    //点击修改事件
    changeIden(state,val){
      for (let itme of state.goodsData) {
        for (let o of itme.foods){
          if(o.name==val){
            o.Identification=val
          }
        }
      }
    },
    //加入购物车(商品详情页面)
    addCardDetails(state,val){
      for(let i of state.goodsData){
        for(let o of i.foods){
            if(o.name==val){
              o.count+=1
            }
        }
      }
    }
  },
  //异步修改
  actions: {
    //发送请求获取商品数据
    initGoodsList(context) {
      goods().then((res) => {
        res.map(itme => {
          itme.foods.map(val => {
            val.count = 0;
            val.Identification = '';
          })
        })
        context.commit('initGoodsList', res)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  //计算属性
  getters: {
    //筛选被添加购物车的商品数据
    shopCartList(state) {
      let arr = [];
      for (let itme of state.goodsData) {
        for (let o of itme.foods) {
          if (o.count > 0) {
            let flag = false;
            for (let i of arr) {
              if (i.name == o.name) {
                flag = true
              }
            }
            if (flag == false) {
              arr.push(o)
            }
          }
        }
      }
      return arr
    },
    //获取商品详情列表
    addDetails(state) {
      let arr = [];
      for (let itme of state.goodsData) {
        for (let val of itme.foods) {
          if (val.Identification == val.name) {
            let flag = true;
            for (let i of arr) {
              if (i.name == val.name) {
                flag = false
              }
            }
            if (flag==true) {
              arr.push(val)
              arr.map(o=>{
                o.ratings.map(a=>{
                    // 转换时间戳
                    a.rateTime=new Date(a.rateTime);
                    //处理时间格式
                    a.rateTime = moment(a.rateTime).format('YYYY-MM-DD')
                })
              })
            }
          }
        }
      }
      return arr
    },
  },
  modules: {

  }
})
store.dispatch("initGoodsList");
export default store


