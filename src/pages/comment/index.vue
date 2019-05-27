<template>
  <div>
    <i-row>
      <i-col span="3" i-class="col-class">
        <i-icon type="return" @click="returnToIndex" size="22"/>
      </i-col>
      <i-col span ="8" offset="6" >&nbsp;&nbsp;发表评价</i-col>
    </i-row>
    <div style="height:10px"></div>
    <i-row>
    <i-col span="4" i-class="col-class1">
        <image class="myimage" :src="headImage" mode="widthFix"/>
    </i-col>
    <i-col span='20' i-class="col-class">
      <view class='myview'>
      <textarea auto-height='true' fixed='true' class="myview" :value="mycomment"  placeholder="请输入详细地址(最多50字)" maxlength="-1" />
      </view>
      
    </i-col>
    </i-row>
    <div style="height:30px;background-color: #F0F0F0"></div>
    <i-cell-group>
    <i-cell title="店铺评分">
      <i-row>
      <i-col span="5" i-class="col-class1">
        物流服务
      </i-col>
      <i-col span='19' i-class="col-class1">
        <i-rate @change="onChange1" :value="starIndex1">
        </i-rate>
      </i-col>
    </i-row>

    <i-row>
      <i-col span="5" i-class="col-class1">
        服务态度
    </i-col>
    <i-col span='19' i-class="col-class1">
        <i-rate @change="onChange2" :value="starIndex2">
        </i-rate>
    </i-col>
    </i-row>

    </i-cell>
</i-cell-group>
<i-row class="mybottom">
<button class='mybutton' @click="handleClick" type="primary" size='mini'>评价</button>
</i-row>

  </div>    
</template>

<script>
import Mynet from '../../utils/net.js';
export default {
  data(){
      return {
        headImage:'',
        mycomment:'',
        starIndex1:0,
        starIndex2:0
      }
    },
    methods: {
      saveInfo:function(){
        var obj={
          url:'/customer/updateCustomerInfo',
          data:{
            id:this.globalData.userInfo.id,
            nickname:this.nickname,
            phone:this.phoneNum
          }
        };
        this.globalData.userInfo.nickname=this.nickname;
        this.globalData.userInfo.phoneNum=this.phoneNum;
        Mynet.post(obj).then(res=>{
          console.log(res);
          wx.navigateTo({url:this.URLIndex})
        })
      },
       handleChangeScroll:function ( detail ) {
        this.current_scroll=detail.target.key
    },
    onChange1:function(detail){
      this.starIndex1=detail.target.index
    },
    onChange2:function(detail){
      this.starIndex2=detail.target.index
    },
    returnToIndex:function(){
      wx.navigateTo({url:this.URLIndex})
    },
    getData:function(val){
      console.log(val)
    }
     },
     onLoad(){
       let resource=JSON.parse(this.globalData.userInfo.oneOrder.commodities[0]['resource'])
       this.headImage = resource["head"]
     }
}
</script>
<style>
.myimage{
  width: 100rpx
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
.myview{
  width:100%; 
  position: relative;
}
.col-class1{
  position: relative;
  font-size: small;
  display: flex;
}
.mybottom{
  position: fixed;
  bottom: 0;
}.mybutton{
  width: 100%;
}
</style>