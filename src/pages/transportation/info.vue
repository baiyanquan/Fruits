<template>
<view class="myview">
  <i-row>
    <i-col span="4" i-class="col-class" offset="1">
      <i-row>{{mydate}}</i-row>
      <i-row class="mytime">{{mytime}}</i-row>
    </i-col>
    <i-col span="3" i-class="col-class-right">
      <i-icon :type="myicon" size="20" />
    </i-col>
    <i-col span="12" i-class="col-class-right">
      <text class="text2">{{myinfo}}</text>
    </i-col>
  </i-row>
  </view>
</template>
<script>
export default {
  props:['time','info'],
  data(){
    return {
      mydate: '',
      myicon:'add',
      mytime:'',
      myinfo:''
    }
  },
  methods: {
       iconClicked:function () {
        console.log("clicked")
    }
     },
     onLoad(){
       let mytime1 = this.time.split(" ")
       this.mydate=mytime1[0]
       this.mytime=mytime1[1]
       this.myinfo=this.info
     }
}
</script>
<style>
.mytime{
  font-size: small;
}
.myview{
  background:#F3F3F3;
}
</style>
