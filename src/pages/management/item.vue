<template>
<i-row>
    <i-col span="4" i-class="col-class">
        <image class="myimage" :src="headImage" mode="widthFix"/>
    </i-col>
    <i-col span="17" i-class="col-class">
        <text class="text2">{{items['name']}}</text>
    </i-col>
    <i-col span="3" i-class="col-class">
        <p>{{'￥' + items['price']}}</p>
        <p class='col-class-right'>{{'*'+quantity+items['unit']}}</p>
    </i-col>
</i-row>
</template>
<script>
export default {
  props:['items','quantity'],
  data(){
      return {
          headImage:'',
      }
    },
  methods: {
    orderContent:function(){
      this.visible1=true
    },
    handleClose1 () {
        this.visible1=false
    },
    transContent(){
      let url = "../transportation/main" + "?orderId=" + this.oneOrder.orderInfo.id + "&state=" + this.oneOrder.orderInfo.state;
      wx.navigateTo({url})
    }
     },
     onLoad(){
         console.log("item:")
       console.log(this.items);
       let resource=JSON.parse(this.items['resource'])
       this.headImage = resource["head"]
     }
}
</script>
<style>
.myimage{
  width: 100rpx
}
.col-class-right{
  text-align: right;
  font-size: small;
}
.text1{
  font-weight: bold;
  font-size:small
}
.text2{
  font-size:small
}
</style>