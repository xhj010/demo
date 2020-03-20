<template>

  <div class="home">
    <Header/>
    <van-row>
      <van-col :class="{'active':$route.path=='/home/goods'}" @click="Jump('/home/goods')" span="8">商品</van-col>
      <van-col :class="{'active':$route.path=='/home/evaluate'}" @click="Jump('/home/evaluate')" span="8">评价</van-col>
      <van-col :class="{'active':$route.path=='/home/business'}" @click="Jump('/home/business')" span="8">商家</van-col>
    </van-row>
    <router-view/>
    <ShoppingCart/>
  </div>

</template>

<script>
import Header from '@/components/Header'
import ShoppingCart from '@/components/ShoppingCart'

export default {
  components:{
      Header,
      ShoppingCart
  },
  methods:{
    //点击切换hash
    Jump(path){
      this.$router.push(path)
    }
  }
};
</script>

<style lang="less" scoped>
.home{
  max-width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.van-col{
  text-align: center;
  font-size: 16px;
  padding: 10px;
  border-bottom:1px solid  #e4e7e7;
  &.active{
    color: red;
  }
}
</style>
