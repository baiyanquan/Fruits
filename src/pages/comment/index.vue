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
      <textarea auto-height='true' fixed='true' class="myview" :value="mycomment"  @input='handleInput' placeholder="请输入评价" maxlength="-1" />
      </view>

    </i-col>
    </i-row>
    <div style="height:30px;background-color: #F0F0F0"></div>
    <i-cell-group>
    <i-cell title="水果评分">
        <i-rate @change="onChange1" :value="starIndex1">
        </i-rate>
    </i-cell>
</i-cell-group>
<i-row class="mybottom">
<button class='mybutton' @click="commentCo" type="primary" size='mini'>评价</button>
</i-row>

  </div>
</template>

<script>
import globalStore from "../../stores/globalStore"
import Mynet from '../../utils/net.js';
export default {
  data(){
      return {
        headImage:'',
        mycomment:'',
        starIndex1:0,
        commodityId:''
      }
    },
    methods: {
      handleInput:function(e){
        this.mycomment=e.target.value
      },
      commentCo:function(){
        var obj={
          url:'/evaluation/add',
          data:{
            customerId:globalStore.state.personal_info.id,
            commodityId:this.commodityId,
            rate:this.starIndex1,
            comment:this.mycomment
          }
        };
        Mynet.post(obj).then(res=>{
          console.log(res);
          wx.showToast({
          title: '评价成功',
          icon: 'success',
        })
          wx.navigateTo({url:'../management/main'})
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
      wx.navigateTo({url:'../management/main'})
    },
    getData:function(val){
      console.log(val)
    }
     },
     onLoad(options){
       this.commodityId = options.commodityId
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
