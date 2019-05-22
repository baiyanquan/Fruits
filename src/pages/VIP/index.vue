<template>
<i-cell-group>
    <i-cell title="尊贵的会员，您好" ></i-cell>
    <i-cell title="等级" ></i-cell>
    <i-cell title="经验值">
      <i-progress percent="70" status="active"></i-progress>
    </i-cell>
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
        visible1:false,
        URLIndex:'../mainPage/main'
      }
    },
    methods: {
       handleClick:function (  ) {
        console.log("clicked");
        if(this.visible1==false)
          this.visible1=true
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
