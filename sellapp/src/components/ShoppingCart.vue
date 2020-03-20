<template>
    <div class="ShoppingCart">
        <transition name="slide-fade">
            <div class="Popup" v-show="show">
                <div class="cartList" v-for="itme in shopCarDate" :key="itme.name"> 
                <div class="cartLeft">{{itme.name}}</div>
                <div class="cartRight">
                        <button @click="change(itme.name,-1)">-</button>
                        <span>{{itme.count}}</span>
                        <button @click="change(itme.name,1)">+</button>
                </div>
                </div>
            </div>
      </transition>
       
        <div class="leftBox" @click="Eject">
            <img :src="shopCarDate.length>0?require('../assets/imgs/icon_shopcar.png'):require('../assets/imgs/icon_shopcar_default.png')" alt="">
            <span>¥{{countTotal}}</span>
            <p>另需配送费¥4元</p>
        </div>
        <div class="rightBox">
            ¥20起送
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    Eject() {
      this.show = !this.show;
        // console.log(this.shopCarDate)
    },
    //购物车加减
    change(name, n) {
      this.$store.commit("addCard", { name, n });
    }
  },
  computed: {
    shopCarDate() {
      //获取购物车里的数据
      return this.$store.getters.shopCartList;
    },
    //计算总价
    countTotal() {
      let num = 0;
      this.shopCarDate.map(itme => {
        num += itme.price * itme.count;
      });
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
.ShoppingCart {
  height: 75px;
  background-color: #131d27;
  display: flex;
  position: fixed;
  bottom: 0px;
  width: 100%;
  .leftBox {
    width: 280px;
    display: flex;
    color: #999ba0;
    span {
      font-size: 18px;
      line-height: 80px;
      font-weight: bold;
    }
    p {
      margin-left: 10px;
      text-indent: 10px;
      border-left: 1px solid #2b353f;
      height: 30px;
      line-height: 30px;
      margin-top: 25px;
    }
    img {
      width: 40px;
      height: 40px;
      margin: 20px 20px 20px;
    }
  }
  .rightBox {
    flex: 1;
    height: 100%;
    background-color: #2a353a;
    color: #8d9497;
    font-size: 18px;
    font-weight: bold;
    line-height: 80px;
    text-align: center;
  }
  .Popup {
    height: 140px;
    width: 100%;
    background-color: rgb(144, 150, 144);
    position: fixed;
    bottom: 75px;
    .cartList {
      display: flex;
      justify-content: space-between;
      .cartLeft {
        font-size: 14px;
        font-weight: bold;
      }
      .cartRight {
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
  }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(60px);
  opacity: 0;
}
</style>