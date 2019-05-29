<template>
    <i-cell-group>
      <i-cell title="指纹/面容支付" label="开启生物支付，安全又便捷"><switch slot="footer" checked /></i-cell>
      <i-cell title="开启首页摇一摇" label="摇一摇参与电视节目互动，更有身边限时优惠"><switch slot="footer" checked /></i-cell>
      <i-cell title="截屏后提示分享" label="开启后，在宝贝及店铺相关页面截屏时，出现分享提示"><switch slot="footer" checked /></i-cell>
      <i-cell title="WIFI下自动播放视频" label="开启后，详情和微淘视频将自动播放"><switch slot="footer" checked /></i-cell>
      <i-cell title="清除缓存" label="包括图片、数据等" @click="handleClick"></i-cell>
    </i-cell-group>
</template>

<script>
export default {
  data(){
      return {
        userName:'白眼圆小花',
        phoneNum:'18117167116',
        headImage:'https://n.sinaimg.cn/fashion/transform/20161115/Kep6-fxxswfv2198202.jpg',
        address:'',
        URLIndex:'../mainPage/main',
        visible1:false
      }
    },
    methods: {
       handleChangeScroll:function ( detail ) {
        this.current_scroll=detail.target.key
    },
    handleClick:function (  ) {
        wx.showToast({
          title: '清楚缓存成功',
          icon: 'success',
        })
    },
    handleClose1:function () {
        this.visible1=false
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
