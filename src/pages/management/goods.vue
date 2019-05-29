<template>
<div>
  <i-row>
    <i-col span="16" i-class="col-class">
      <i-icon type="shop_fill" size="23" color="#ff9999" />
      <text class="text1">{{oneOrder.shopName}}</text>
      <i-icon type="enter" />
    </i-col>
    <i-col span="8" i-class="col-class-right">
      <i-tag color="green">{{reState}}</i-tag>
    </i-col>
  </i-row>
  <i-row>
    <item v-for="(j,i) in oneOrder.commodities.length" v-bind:key="i" :items="oneOrder.commodities[i]" :quantity="oneOrder.quantity[i]"></item>
    <i-row class="col-class-right">
      {{rePrice}}
    </i-row>
      <i-row>
    <i-col span="10" offset='16'>
      <i-tag class="i-tags" name="查看物流" type='border' @click="transContent">查看物流</i-tag>
      <i-tag class="i-tags" name="评价" type='border' color='yellow' @click="buttonClicked"><text v-if="oneOrder.orderInfo.state == 1 ||oneOrder.orderInfo.state == 4 ">&nbsp;&nbsp;&nbsp;</text>{{reButton}}<text v-if="oneOrder.orderInfo.state == 1 ||oneOrder.orderInfo.state == 4 ">&nbsp;&nbsp;&nbsp;</text></i-tag>
    </i-col>
  </i-row>
    <div style="height:20px;background-color: #F0F0F0"></div>
  </i-row>
</div>
</template>
<script>
import item from './item.vue';
import Mynet from '../../utils/net.js';
export default {
  props:['oneOrder'],
  data(){
      return {
        headImage : "",
        visible1: false,
        current:"management",
      }
    },
  methods: {
    orderContent:function(){
      this.visible1=true
    },
    handleClose1 () {
        this.visible1=false
    },
    transContent(){
      let url = "../transportation/main" + "?orderId=" + this.oneOrder.orderInfo.id + "&state=" + this.oneOrder.orderInfo.state+"&headImage="+this.headImage;
      wx.navigateTo({url})
    },
    buttonClicked(){
      if(this.oneOrder.orderInfo.state == 1){
        //前去付款
      }else if(this.oneOrder.orderInfo.state == 2){
        wx.showToast({
          title: '提醒发货成功',
          icon: 'success',
        })
      }
      else if(this.oneOrder.orderInfo.state == 3)
      {
        wx.showToast({
          title: '收货成功',
          icon: 'success',
        })
      }
      else if(this.oneOrder.orderInfo.state == 4){
        let url = "../comment/main";
      wx.navigateTo({url})
      }
      else if(this.oneOrder.orderInfo.state == 5)
        return "已完成"
    }
     },
     components:{
       item
     },
     computed:{
       reState:function(){
         if(this.oneOrder.orderInfo.state == 1)
          return "待付款"
        else if(this.oneOrder.orderInfo.state == 2)
        return "待发货"
        else if(this.oneOrder.orderInfo.state == 3)
        return "待收货"
        else if(this.oneOrder.orderInfo.state == 4)
        return "待评价"
        else if(this.oneOrder.orderInfo.state == 5)
        return "已完成"
       },
       reButton:function(){
         if(this.oneOrder.orderInfo.state == 1)
           return  "付款"
         else if(this.oneOrder.orderInfo.state == 2)
           return "提醒发货"
         else if(this.oneOrder.orderInfo.state == 3)
           return "确认收货"
         else if(this.oneOrder.orderInfo.state == 4)
           return "评价"
         else if(this.oneOrder.orderInfo.state == 5)
           return "已完成"
       },
       reName:function(){
         let fruitName = this.oneOrder.commodities[0]['name'] + '等';
         return fruitName
       },
       rePrice:function(){
         var myPrice = 0;
         for(var i in this.oneOrder.quantity){
           myPrice = myPrice + this.oneOrder.quantity[i] * this.oneOrder.commodities[i]['price']
         }
         return '共' + this.oneOrder.quantity.length+' '+'合计：￥'+myPrice;
       }
     },
     onLoad(){
       console.log("oneorder:");
       console.log(this.oneOrder)
       let resource=JSON.parse(this.oneOrder.commodities[0]['resource'])
       this.headImage = resource["head"]
     }
}
</script>
<style>
.myimage{
  width: 100rpx
}
.col-class-right{
  text-align: right
}
.text1{
  font-weight: bold;
  font-size:small
}
.text2{
  font-size:small
}
</style>
