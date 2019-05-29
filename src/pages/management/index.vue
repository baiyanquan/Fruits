<template>
  <div>
    <i-row class="align">
      <i-tabs :current="current_scroll" scroll @change="handleChangeScroll">
        <i-tab key="tab1" title="全部"></i-tab>
        <i-tab key="tab2" title="待付款"></i-tab>
        <i-tab key="tab3" title="待发货"></i-tab>
        <i-tab key="tab4" title="待收货"></i-tab>
        <i-tab key="tab5" title="待评价"></i-tab>
      </i-tabs>
    </i-row>
    <i-row>
      <ul v-if="current_scroll === 'tab1'">
      <li v-for="(n,index) in orderList" :key="index" ><goods :oneOrder='orderList[index]'></goods></li>
      </ul>

      <ul v-if="current_scroll === 'tab2'">
      <li v-for="(n,index) in orderList" :key="index" v-if="orderList[index].orderInfo['state'] == 1 "><goods :oneOrder='orderList[index]' ></goods></li>
      </ul>

      <ul v-if="current_scroll === 'tab3'">
      <li v-for="(n,index) in orderList" :key="index" v-if="orderList[index].orderInfo['state'] == 2 "><goods :oneOrder='orderList[index]' ></goods></li>
      </ul>
      <ul v-if="current_scroll === 'tab4'">
      <li v-for="(n,index) in orderList" :key="index" v-if="orderList[index].orderInfo['state'] == 3 "><goods :oneOrder='orderList[index]' ></goods></li>
      </ul>
      <ul v-if="current_scroll === 'tab5'">
      <li v-for="(n,index) in orderList" :key="index" v-if="orderList[index].orderInfo['state'] == 4 "><goods :oneOrder='orderList[index]' ></goods></li>
      </ul>
      <div style="height:60px;background-color: #F0F0F0"></div>
    </i-row>
    <i-tab-bar :current="current" color="#FAB831" @change="handleChange" fixed="true">
      <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="category" icon="createtask" current-icon="createtask_fill" title="分类"></i-tab-bar-item>
      <i-tab-bar-item key="shopping_cart" icon="publishgoods_fill" current-icon="publishgoods_fill" title="购物车"></i-tab-bar-item>
      <i-tab-bar-item key="management" icon="setup" current-icon="setup_fill" title="管理"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
import goods from './goods.vue';
import Mynet from '../../utils/net.js';
import globalStore from "../../stores/globalStore"
export default {
  data(){
      return {
        current_scroll: 'tab1',
        numbers_:10,
        current:"management",
        orderList:[]
      }
    },
    methods: {
       handleChangeScroll:function ( detail ) {
        this.current_scroll=detail.target.key
       },
      handleChange(e){
        let url = ""
        if(e.mp.detail.key === "homepage")
          url = "../index/main";
        else if(e.mp.detail.key === "commodity")
          url = "../commodityList/main";
        else if(e.mp.detail.key === "shopping_cart")
          url = "../shoppingCart/main";
        else if(e.mp.detail.key === "management")
          url = "../management/main";
        else if(e.mp.detail.key === "mine")
          url = "../mainPage/main";
        wx.redirectTo({url})
      },
     },
     components:{
       goods
     },
     computed:{
       reState:function(e){
         console.log(e)
         return true;
       }
     },
     onLoad(){
       var obj = {
         url:'/orderInfo/findOrderListDetails',
         data:{
           customerId:globalStore.state.personal_info.id
         }
       };
       Mynet.get(obj).then(res=>{
         console.log('logging')
         this.orderList = res.orderList
          console.log(res.orderList); for(var n in this.orderList){
         console.log(n)
       }
       })
     }
}
</script>
<style>
.textCenter{
  text-align: center

}
.align {
  display: flex;
  justify-content: center;
}
</style>
