<template>
    <div class="header">
        <div class="title">
            <img class="imgLeft" :src="avatar" alt="">
            <div class="titleRight">
                <div><img class="img1" src="../assets/imgs/brand@2x.png" alt=""><span class="TextTitle">{{name}}</span></div>
                <p>{{description}}/{{deliveryTime}}分钟送达</p>
                <div class="discount">
                    <div class="discountLeft"> <img class="img2" src="../assets/imgs/decrease_1@2x.png" alt="">{{notice}}</div>
                    <div class="discountRight" @click="show = true">5个 ></div>
                </div>
            </div>
        </div>
        <van-notice-bar
        :text="bulletin"
        left-icon="volume-o"
        color="#fff"
        background="#3b3630"
        />
       <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <div class="heade">
                    <h2>粥品香坊(大运村)</h2>
                    <van-rate v-model="value" gutter="20px"/>
                </div>
                <van-divider style="color:#fff">优惠信息</van-divider>
                <div class="mian">
                    <p><img src="../assets/imgs/decrease_1@2x.png" alt=""> 在线支付满28减5</p>
                    <p><img src="../assets/imgs/discount_1@2x.png" alt=""> 单人精彩赛</p>
                    <p><img src="../assets/imgs/discount_1@2x.png" alt=""> 清肺雪梨汤8折抢购</p>
                    <p><img src="../assets/imgs/special_1@2x.png" alt=""> 特价饮品8折抢购</p>
                    <p><img src="../assets/imgs/special_1@2x.png" alt=""> 单人特色套餐</p>
                </div>
                <van-divider style="color:#fff">商家公告</van-divider>
                <p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
               <div class="clear"><van-icon name="clear" @click="show = false" color="rgba(0,0,0.7)" size="40" /></div>
                
            </div>
      </van-overlay>
    </div>
    
</template>

<script>
import { seller } from "@/apis/seller.js";
export default {
  data() {
    return {
      name: "",
      avatar: "", //图片路径
      description: "", //配送方式
      deliveryTime: "", //送达时间
      supports: [], //活动
      bulletin: "", //公告
      show: false, //蒙层
      value: 4,//星星评分
    //   volumeUrl:'',
    };
  },
  methods: {},
  created() {
    seller()
      .then(res => {
        // console.log(res);
        let {
          name,
          avatar,
          description,
          deliveryTime,
          supports,
          bulletin
        } = res;
        this.name = name;
        this.avatar = avatar;
        this.description = description;
        this.deliveryTime = deliveryTime;
        this.supports = supports;
        this.bulletin = bulletin;
      })
      .catch(err => {
        console.log(err);
      });
    //   this.volumeUrl=require('../assets/imgs/bulletin@3x.png')
  },
  computed: {
    notice() {
      let discount = "";
      this.supports.map(itme => {
        discount += itme.description;
      });
      return discount;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  background-color: #5d5f64;
  .airing {
    font-size: 14px;
    color: #fff;
  }
  .title {
    display: flex;
    height: 130px;
    .imgLeft {
      width: 100px;
      height: 100px;
      margin-left: 15px;
      margin-top: 16px;
      margin-right: 14px;
    }
    .titleRight {
      margin-top: 22px;
      margin-right: 10px;
      flex: 1;
      .TextTitle {
        display: inline-block;
        font-size: 17px;
        line-height: 19px;
        color: #fff;
        font-weight: bold;
        height: 28px;
      }
      .img1 {
        height: 20px;
        margin-right: 6px;
        vertical-align: top;
      }
      p {
        color: #fff;
        font-size: 14px;
        margin-top: 4px;
      }
      .discount {
        display: flex;
        justify-content: space-between;
        color: #fff;
        width: 95%;
        margin-top: 6px;
        .img2 {
          height: 16px;
          margin-right: 4px;
        }
        .discountRight {
          background-color: #413c34;
          width: 40px;
          height: 24px;
          border-radius: 11px;
          text-align: center;
          line-height: 24px;
          margin-right: 15px;
        }
        .discountLeft {
          width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          line-height: 24px;
        }
      }
    }
  }
  .wrapper {
      max-width: 560px;
      margin-left: 30px;
      margin-right: 30px;
    .heade {
      color: #fff;
      font-size: 16px;
      text-align: center;
      margin-top: 60px;
      .van-rate {
        margin-top: 12px;
      }
    }
    .mian{
        p{
            color: #fff;
            margin-left: 20px;
            margin-bottom: 10px;
            font-size: 12px;
            img{
                width: 14px;
            }
        }
    }
    p{
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .clear{
        text-align: center;
        color: #fff;
        margin-top: 50px;
    }
  }
}
</style>