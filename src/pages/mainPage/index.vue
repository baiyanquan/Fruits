<template>
  <div>
    <i-cell-group>
      <i-cell is-link url="/pages/personalData/main">
        <i-col span="6" i-class="col-class">
          <i-avatar :src="headImage" size="large"></i-avatar>
        </i-col>
        <i-col span="16" i-class="col-class">
          <i-row>{{nickname}}</i-row>
          <i-row class="grayFont">用户名：{{userName}}</i-row>
        </i-col>
      </i-cell>
      <i-cell title="手机号">{{phoneNum}}</i-cell>
      <i-cell title="收货地址" is-link url="../address/main"></i-cell>
      <i-cell title="账户与安全" is-link url="../modifyPasseord/main"></i-cell>
      <i-cell title="通用" is-link url="../common/main"></i-cell>
      <i-cell title="会员" is-link url="../VIP/main"></i-cell>
      <i-cell title="帮助手册" @click="handleClick" is-link only-tap-footer></i-cell>
      <i-cell class="mycenter" title="退出登录"></i-cell>
</i-cell-group>
    <i-row>
      <i-tab-bar :current="current" color="#FAB831"  @change="handleChange"  fixed="true">
        <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
        <i-tab-bar-item key="commodity" icon="createtask" current-icon="createtask_fill" title="商品"></i-tab-bar-item>
        <i-tab-bar-item key="shopping_cart" icon="publishgoods_fill" current-icon="publishgoods_fill" title="购物车"></i-tab-bar-item>
        <i-tab-bar-item key="management" icon="setup" current-icon="setup_fill" title="管理"></i-tab-bar-item>
        <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </i-row>
  </div>
</template>

<script>
import Mynet from '../../utils/net.js';
import globalStore from "../../stores/globalStore"
export default {
  data(){
      return {
        userName:'',
        nickname:'',
        phoneNum:'',
        headImage:'',
        address:'',
        visible1:false,
        id:0,
        current:"mine",

      }
    },
    methods: {
       handleClick:function (  ) {
        wx.showModal({
            title: '帮助',
            content: '鲜果篮子，是为客户度身定制的购物软件，让您随时随地拥有宝贝搜索、浏览、购买、收藏、在线沟通等在线功能。鲜果篮子众多商品随手掌握。',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }else{
                   console.log('用户点击取消')
                }

            }
        })
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
    handleClose1:function () {
        this.visible1=false
    },
    returnToIndex:function(){
      wx.navigateTo({url:this.URLIndex})
    }
     },
     onLoad(){
       var obj = {
         url:'/customer/findById',
         data:{
           id:globalStore.state.personal_info.id
         }
       }
       Mynet.get(obj).then(res=>{
         var userInfo=res.customer;
         this.userName=userInfo.username;
         this.nickname=userInfo.nickname;
         this.phoneNum=userInfo.phone;
         this.address=userInfo.defaultAddress;
         this.id=userInfo.id;
         this.headImage=userInfo.head;
         this.globalData.userInfo = {username:this.userName,
         nickname:this.nickname,
         phoneNum:this.phoneNum,
         address:this.address,
         id:this.id,
         headImage:this.headImage}
       console.log(this.globalData.userInfo)

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
.col-class{
  text-align: left;
  font-weight: 600;
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
  font-size: small;
}
</style>
