<template>
  <div>
    <i-row>
      <i-col span="3" i-class="col-class">
        <i-icon type="return" @click="returnToIndex" size="22"/>
      </i-col>
      <i-col span ="8" offset="5" >&nbsp;编辑个人资料</i-col>
      <i-col span="6" offset ='2'>
      <button type="primary" size="mini" @click='saveInfo'>保存</button>
      </i-col>
    </i-row>
    <i-cell-group>
      <i-cell>
        <i-col span="20" i-class="my-col-class">
          头像
        </i-col>
        <i-col span="4" i-class="col-class">
          <i-avatar :src="headImage" size="large"></i-avatar>
        </i-col>
      </i-cell>
      <i-input :value="nickname" title="昵称" autofocus placeholder="名字" />
      <i-input :value="phoneNum" type="number" title="联系电话" placeholder="请输入手机号" />
</i-cell-group>
  </div>    
</template>

<script>
import Mynet from '../../utils/net.js';
export default {
  data(){
      return {
        nickname:'',
        phoneNum:'',
        headImage:'',
        URLIndex:'../mainPage/main'
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
    returnToIndex:function(){
      wx.navigateTo({url:this.URLIndex})
    },
    getData:function(val){
      console.log(val)
    }
     },
     onLoad(){
       this.nickname=this.globalData.userInfo.nickname;
       this.phoneNum=this.globalData.userInfo.phoneNum;
       this.headImage=this.globalData.userInfo.headImage;
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
  