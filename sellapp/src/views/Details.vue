<template>
    <div class="Details">
        <div class="header">
            <div class="titelImg">
                <img :src="addDetailsList.image" alt="">
            </div>
            <div class="mian">
                <h2>{{addDetailsList.name}}</h2>
                <p>
                    月售{{addDetailsList.sellCount}}份  好评率{{addDetailsList.rating}}%
                </p>
                <div class="addCard">
                    <div>
                        <span>¥{{addDetailsList.price}}</span>
                        <del>¥{{addDetailsList.oldPrice}}</del>
                    </div>
                    <button @click="addCard(addDetailsList.name)">加入购物车</button>
                </div>
            </div>
        </div>
        <div class="Introduction">
            <h2>商品介绍</h2>
            <p>{{addDetailsList.description}}</p>
        </div>
        <div class="evaluate">
            <div class="title">
                <h2>商品评价</h2>
                <div class="categories">
                    <div class="whole"><span>全部</span><span>57</span></div>
                    <div class="Recommend"><span>推荐</span><span>47</span></div>
                    <div class="debunk"><span>吐槽</span><span>10</span></div>
                </div>
            </div>
        </div>
        <div class="icon">
            <van-icon size="12" name="passed" />
            <span>只看有内容的评价</span>
        </div>
        <div class="Content">
            <div class="ContentList" v-for="(itme,index) in addDetailsList.ratings" :key="index">
                <div class="evaluateTime">
                   <span>{{itme.rateTime}}</span>
                   <span>{{itme.username}} <img :src="itme.avatar" alt=""></span>
                </div>
                <div>
                    <van-icon name="good-job" />
                    <span>{{itme.text}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment'
export default {
    data(){
        return{
        }
    },
    methods:{
        //加入购物车
        addCard(name){  
            this.$store.commit('addCardDetails',name)
            this.$router.push('/home/goods')
        }
    },
    computed:{
        addDetailsList(){
         let arr= this.$store.getters.addDetails;
         let obj=arr[0];
         return obj
        }
    },
   
};
</script>

<style lang="less" scoped>
.Details {
    background-color: #f3f6f6;
  .header {
    .titelImg {
      height: 200px;
      background-color: rgb(233, 155, 155);
      img{
          width: 100%;
          height: 100%;
      }
    }
    .mian{
        padding: 10px;
        background-color: #fff;
        border-bottom: 1px solid #e4e7e7;
    }
    h2 {
      font-size: 14px;
      margin-bottom: 4px;
    }
    p {
      color: #979ba2;
    }
    .addCard {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      div {
        span {
          color: red;
          font-weight: bold;
          margin-right: 4px;
          line-height: 26px;
        }
        del {
          color: #979ba2;
          font-size: 10px;
        }
      }
      button {
        background-color: #00a1dc;
        color: #fff;
        border: none;
        border-radius: 10px;
        height: 24px;
        width: 70px;
      }
    }
  }
  .Introduction{
      background-color: #fff;
      margin-top: 20px;
      border-top: 1px solid #e4e7e7;
      border-bottom: 1px solid #e4e7e7;
      padding: 10px;
      h2{
          margin-bottom: 8px;
          font-size: 14px;
      }
  }
  .evaluate{
      background-color: #fff;
      padding: 10px;
      margin-top: 20px;
      border-top: 1px solid #e4e7e7;
      .title{
           border-bottom: 1px solid #e4e7e7;
        h2{
            font-size: 14px;
        }
        .categories{
            width: 60%;
            display: flex;
           justify-content: space-around;
           div{
               width: 60px;
               height: 30px;
               line-height: 30px;
               text-align: center;
               margin-bottom: 15px;
               margin-top: 10px;
           }
            .whole{
                background-color: #00a1dc;
            }
            .Recommend{
                background-color: #cceef7;
            }
            .debunk{
                background-color: #e9ecec;
            }
        }
      }
  }
  .icon{
      background-color: #fff;
      padding-left: 10px;
      color: #acb1b2;
      font-size: 12px;
  }
  .Content{
      background-color: #fff;
      padding: 10px;
      height: 140px;
      overflow: auto;
      .ContentList{
          border-bottom: 1px solid #e4e7e7;
          padding-bottom: 6px;
      }
      .evaluateTime{
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          img{
              width: 14px;
          }
      }
  }
}
</style>