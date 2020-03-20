<template>
    <div class="goods">
       <div class="goodsLeft" @click="activeNav">
           <div><div :class="{active:fName==itme.name}"  :data-name="itme.name" v-for="itme in vuexGoodsData" :key="itme.name">{{itme.name}}</div></div>
       </div>
       <div class="goodsRight">
           <div>
           <div class="goodsList" :id="itme.name" v-for="itme in vuexGoodsData" :key="itme.name">
               <div class="title">{{itme.name}}</div>
               <div class="Commodity-content" v-for="(val,index) in itme.foods" :key="index">
                   <img class="leftUrl"  @click="Jump(val.name)" :src="val.image"  alt="">
                   <div class="rightContent">
                       <h2>{{val.name}}</h2>
                       <p>{{val.description}}</p>
                       <p>月售{{val.sellCount}}份  好评率{{val.rating}}%</p>
                       <div>
                           <div class="price">
                               <span>¥{{val.price}}</span>
                               <del>¥{{val.oldPrice}}</del>
                           </div>
                            <div class="button">
                                <button v-show="val.count>0" @click="change(val.name,-1)">-</button>
                                <span v-show="val.count>0">{{val.count}}</span> 
                                <button @click="change(val.name,1)">+</button>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
           </div>
       </div>
    </div>
</template>

<script>
// import { goods } from "../apis/goods.js";
import BScroll from "better-scroll";  //引入better-scroll
export default {
  data() {
    return {
      fName:"热销榜",
    }
  },
  methods: {
    // getGoods() {
    //   goods()
    //     .then(res => {
    //       console.log(res);
    //       this.this.$store.state.goodsData = res;
    //     //等待模板编译完成后执行的方法
    //      this.$nextTick(()=>{
    //            this.getHeight();
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //点击添加购物车事件
    change(name,n){
      this.$store.commit('addCard',{name,n})
    },
    //点击跳转商品详情页
    Jump(name){
        this.$router.push('/details')
        this.$store.commit('changeIden',name);
    },
    activeNav(e){
        // console.log(e.target)
        //导航颜色切换
        this.fName=e.target.getAttribute('data-name')
        //右边商品联动
        this.scrollRight.scrollToElement(`#${this.fName}`,400)
    },
     //滚动监听事件的函数
    scrollFun(obj){
        // console.log(Math.abs(obj.y))
        const CurrentCoordinates=Math.abs(obj.y)
        //比对坐标
        this.arr.map(itme=>{
            if(itme.min<=CurrentCoordinates && CurrentCoordinates<=itme.max){
                this.fName=itme.Areaname
            }
        })
    },
    //获取盒子高度并构建数组结构
    getHeight(){
        this.arr=[];
        let initialMin=0;
        this.vuexGoodsData.map(itme=>{
            const height=document.getElementById(`${itme.name}`).offsetHeight
            const Calculationobj={min:initialMin,Areaname:itme.name,max:initialMin+height}
            this.arr.push(Calculationobj)
            initialMin+=height
        })
        // console.log(this.arr)
    }
  },
  computed:{
      vuexGoodsData(){
        let list=this.$store.state.goodsData
        // 等待模板编译完成后执行的方法
        if(list.length){
          this.$nextTick(()=>{
               this.getHeight();
          });
        }
        return list
      },
  },
  created() {
    // this.getGoods();
  },
  mounted() {
    this.scrollLeft = new BScroll('.goodsLeft', {click:true});
    this.scrollRight = new BScroll('.goodsRight', {click:true});
    this.scrollRight = new BScroll('.goodsRight', {probeType:3});
    //设置滚动监听
    this.scrollRight.on('scroll',this.scrollFun)

    //Vuex获取数据
    // this.$store.dispatch("initGoodsList");

  },
  // updated(){
  //   console.log(this.$store.state.goodsData)
  // }
};
</script>

<style lang="less" scoped>
.goods {
  flex: 1;
  display: flex;
  overflow: hidden;
  .goodsLeft {
    overflow: hidden;
    height: 376px;
    & > div {
      div {
        background-color: #f3f6f6;
        padding: 14px;
        width: 60px;
        text-align: center;
        border-bottom: 1px solid #dcdfdf;
        &.active{
            background-color: #fff;
        }
      }
    }
  }
  .goodsRight {
    height: 376px;
    flex: 1;
    overflow: hidden;
    .title {
      background-color: #f3f6f6;
      padding: 5px;
      color: #aeb3b4;
      border-left: 2px solid #dadee2;
    }
    .Commodity-content {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #dbdede;
      .leftUrl {
        width: 90px;
      }
      .rightContent {
        flex: 1;
        margin-left: 10px;
        div {
          display: flex;
          justify-content: space-between;
          .price {
            span {
              color: red;
              font-size: 14px;
              margin-right: 4px;
            }
            del {
              display: inline-block;
              color: #a5a8a8;
              font-size: 10px;
              line-height: 24px;
            }
          }
          .button {
            button {
              width: 15px;
              height: 15px;
              line-height: 3px;
              background-color: #02a1de;
              border: none;
              border-radius: 8px;
              color: #fff;
            }
          }
        }
        p {
          font-size: 12px;
          color: #a5a8a8;
        }
      }
    }
  }
}
</style>