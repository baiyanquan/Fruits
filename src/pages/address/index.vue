<template>
  <div>
      <i-row v-for="(item,index) in address" v-bind:key="index" :id="index">
        <i-col span ="20">
        <i-input :title="'收货地址'+index" :value="item['address']" autofocus placeholder="请输入详细地址"></i-input>
        </i-col>
        <i-col span ='4'>
          <i-tag v-if="item['isDefault'] == 0" class="text2" color="blue">默认</i-tag>
        </i-col>
    </i-row>
    <i-row>
      <i-col span='4'>
      <i-button type="info" shape="square" @click="handleClick" inline size='small'>添加收货地址</i-button>
      </i-col>
    </i-row>
    <i-row>
    <i-button type="success" shape="circle" @click="handleClick">确认</i-button>
    </i-row>
    <i-modal title="添加收货地址" :visible="visible1" @ok="handleconfirm1" @cancel="handleClose1">
        <i-input :value="newAddress" type="textarea" title="详细地址" placeholder="请输入详细地址(最多50字)" maxlength="50" />
      </i-modal>
  </div>
</template>

<script>
import Mynet from '../../utils/net.js';
export default {
  data(){
      return {
        address:[],
        oldPass:'',
        NewPass:'',
        verify:'',
        URLIndex:'../mainPage/main',
        visible1:false,
        switch1 : false,
        newAddress:''
      }
    },
    methods: {
       handleClick:function ( detail ) {
        console.log("clicked")
        if(this.visible1==false)
          this.visible1=true
    },
    handleClose1:function () {
        this.visible1=false;
    },
    handleconfirm1(){
      var obj={
        url:'/address/addAddress',
        data:{
          customerId:1,
          address:this.newAddress,
          isDefault:0,
          phone:this.globalData.userInfo.phoneNum
        }
      };
      Mynet.post(obj).then(res=>{
        this.visible1=false;
        wx.navigateTo({url:this.URLIndex})
      })
    },
    onChange(event){
      console.log(event)
    }
     },
     onLoad(){
       this.address=[]
       var obj = {
         url:'/address/findAllAddress',
         data:{
           customerId:1
         }
       };
       Mynet.get(obj).then(res=>{
         for(var i in res.address){
          var temp ={
            address:res.address[i]["address"],
            isDefault:res.address[i]["isDefault"]
          };
          this.address.push(temp);
         }
         for( i in this.address){
          console.log(this.address[i])
         }
       })
     }
}
</script>
<style>
.myimage{
  width: 150rpx;
  height: 150rpx;
  border-radius: 100rpx;
}
.grayFont{
  color: #999999;
  font-weight: 500;
}
.mybold{
  height:1000rpx;
}
.mycenter{
  text-align: center;
  font-weight: 600;
}
</style>
