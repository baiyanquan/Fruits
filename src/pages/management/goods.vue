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
    <div style="height:20px;background-color: #F0F0F0"></div>
  </i-row>
  <i-modal title="订单详情" :visible="visible1" @ok="handleClose1" @cancel="handleClose1">
    <i-cell-group>
    <i-cell :title="'下单时间：'+oneOrder.orderInfo['createTime']"></i-cell>
    <i-cell :title="'收货地址：' + oneOrder.addressInfo['address']"></i-cell>
    <i-cell :title="'收货电话：' + oneOrder.addressInfo['phone']"></i-cell>
    <i-cell :title="'店铺名：' + oneOrder.shopName"></i-cell>
    <i-cell :title="'订单信息'"></i-cell>
    <i-cell v-for="(j,i) in oneOrder.commodities.length" v-bind:key="i" :title="'商品名称：'+oneOrder.commodities[i]['name'] + '    产地：'+oneOrder.commodities[i]['place']+'    数量：'+oneOrder.quantity[i]+oneOrder.commodities[i]['unit']+'    总价：'+oneOrder.commodities[i]['price'] "></i-cell>
</i-cell-group>
</i-modal>
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
      let url = "../transportation/main" + "?orderId=" + this.oneOrder.orderInfo.id + "&state=" + this.oneOrder.orderInfo.state;
      wx.navigateTo({url})
    }
     },
     components:{
       item
     },
     computed:{
       reState:function(){
         if(this.oneOrder.orderInfo.state == 1)
          return "交易成功"
        else if(this.oneOrder.orderInfo.state == 2)
        return "待评价"
       },
       reName:function(){
         let fruitName = this.oneOrder.commodities[0]['name'] + '等';
         return fruitName
       },
       rePrice:function(){
         var myPrice = 0;
         for(var i in this.oneOrder.quantity.length){
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
