<template>
  <div>
    <div v-if="has_info == 1">
    <i-row class="align">
      <i-col span="24" v-if="state==2">
        订单状态：已签收
      </i-col>
      <i-col span="24" v-else-if="state==1">
        订单状态：运输中
      </i-col>
      <i-col span="24" v-else>
        订单状态：等待揽收
      </i-col>
    </i-row>
      <info v-for="n in lengthT" :key="n" :time='time[n-1]' :info='info[n-1]'> </info>
    </div>
    <div v-else>
      <i-row class="align">
        <i-col span="24">
          订单状态：暂无信息
        </i-col>
      </i-row>
      <div class="center" style="height:600px;color:#CFCFCF">暂无相关商品物流信息</div>
    </div>
  </div>
</template>

<script>
  import globalStore from "../../stores/globalStore"
import info from './info.vue';
  import Mynet from '../../utils/net.js';
export default {
  props:['orderId'],
  data(){
      return {
        state:0,
        time:[],
        info:[],
        lengthT:0,
        has_info:1,
      }
    },
    methods: {
     },
     components:{
       info
     },
     onLoad(options){
       //let trans = JSON.parse(globalStore.state.personal_info['trans']);
       let orderId = options.orderId;
       this.state = options.state;
       console.log(this.state);
       let self = this;
       let obj = {
         url:'/logistics/findByOrderId',
         data:{
           orderId:orderId
         }
       };
       Mynet.get(obj).then(res=>{
         console.log(res)
         let trans = JSON.parse(res.logistics.logisticsInfo);
         self.lengthT = Object.keys(trans).length;
         for (let mobj in trans)
         {
           self.time.push(mobj)
           self.info.push(trans[mobj])
           self.has_info = 1;
         }
       }).catch(function (error) {
         self.has_info = 0;
       });
       //
     }
}
</script>
<style>
.textCenter{
  text-align: center

}
.myimage{
  width: 70rpx;
}
.align {
  display: flex;
  justify-content: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items:center;
}
</style>
