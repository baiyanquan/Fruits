<template>
  <div>
    <i-panel title="修改密码">
      <i-input :value="oldPass" title="旧密码" autofocus placeholder="旧密码" />
      <i-input :value="NewPass" title="新密码" autofocus placeholder="输入新密码" />
      <i-input :value="verify" title="确认新密码" autofocus placeholder="输入新密码" />
    </i-panel>
    <i-row>
    <i-button type="success" shape="circle" @click="handleClick">确认</i-button>
    </i-row>
    <i-modal title="帮助" :visible="visible1" @ok="handleClose1" @cancel="handleClose1">
        <view class="myview" slot="content">
          修改成功！
        </view>
      </i-modal>
  </div>
</template>

<script>
export default {
  data(){
      return {
        oldPass:'',
        NewPass:'',
        verify:'',
        URLIndex:'../mainPage/main',
        visible1:false
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
        wx.navigateTo({url:this.URLIndex})
    },
     },
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
