<template>
  <div>
    <i-row>
      <i-col span="12" class="align">
        <i-button @click="search" type="ghost" class="search">
          <i-row>
            <i-col span="4">
              <i-icon type="search" size="20"/>
            </i-col>
            <i-col span="20">
              <span>请输入想要搜索的内容</span>
            </i-col>
          </i-row>
        </i-button>
      </i-col>
    </i-row>
    <i-row class="condition">
      <i-col span="6" i-class="col-class">
        <div style="width:100%;text-align: center" @click="order_by_general">
          <span style="color:#FAB831" v-if="order===0">综合</span>
          <span style="color:#4D4D4D" v-else>综合</span>
          <i-icon type="unfold"  style="color:#FAB831" v-if="order===0"/>
          <i-icon type="unfold"  style="color:#4D4D4D" v-else/>
        </div>
      </i-col>
      <i-col span="6" i-class="col-class">
        <div style="width:100%;text-align: center" @click="order_by_selling">
          <span style="color:#FAB831" v-if="order===1">销量</span>
          <span style="color:#4D4D4D" v-else>销量</span>
        </div>
      </i-col>
      <i-col span="6" i-class="col-class">
        <div style="width:100%;text-align: center" @click="order_by_price">
          <span style="color:#FAB831" v-if="order===2||order===3">价格</span>
          <span style="color:#4D4D4D" v-else>价格</span>
          <i-icon type="packup" v-if="order === 2" style="color:#FAB831"/>
          <i-icon type="unfold" v-if="order === 3" style="color:#FAB831"/>
        </div>
      </i-col>
      <i-col span="6" i-class="col-class">
        <div style="width:100%;text-align: center">筛选<i-icon type="commodity" /></div>
      </i-col>
    </i-row>
    <i-row>
      <i-cell-group>
        <i-cell v-for="(commodity, index) in commodity_list" :key="index"  @click="detailPage(commodity.id)">
          <i-row>
            <i-col span="6">
              <img v-bind:src="commodity.resourceDetails.head" style="width:100%;height: 250rpx;" />
            </i-col>
            <i-col span="18">
              <p style="margin-top: 40rpx;margin-left:20rpx">{{commodity.name}}</p>
              <p style="margin-top: 50rpx;margin-left:20rpx;color:#F23636">¥ {{commodity.price}}/{{commodity.unit}}</p>
              <span style="margin-top: 50rpx;margin-left:20rpx;color:#F23636">自营</span>
              <span style="margin-top: 50rpx;margin-left:20rpx;color:#4D4D4D">0条评论</span>
              <span style="margin-top: 50rpx;margin-left:20rpx;color:#4D4D4D">库存量：{{commodity.inventory}}</span>
            </i-col>
          </i-row>
        </i-cell>
      </i-cell-group>
    </i-row>
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
  export default {
    methods:{
      search(){
        let url = "../search/main";
        wx.navigateTo({url})
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
      detailPage(id){
        let url = "../commodityDetail/main" + "?pId=" +id;
        wx.navigateTo({url})
      },
      order_by_general(){
        this.order = 0;
      },
      order_by_selling(){
        this.order = 1;
      },
      order_by_price(){
        if(this.order === 2)
          this.order = 3;
        else
          this.order = 2;
      },
      fresh_fruit(){
        var url = "../commodityList/main";
        wx.navigateTo({url})
      },
      getInfo(){
        let self = this
        this.$net.get({
          url: "/commodity/findAll"
        }).then(res => {
          if(res.code==="200"){
            self.fruit_list = res.commodities;
          }
        })
      }
    },
    data(){
      return {
        value1: '',
        current: 'commodity',
        fruit_list: [],
        order:0,
        commodity_list:[]
      }
    },
    onLoad:function (options) {
      let keyword = options.keyword;
      let min_price = options.min_price;
      let max_price = options.max_price;
      let type = options.type;
      let unit = options.unit;
      let self = this;
      console.log(unit)
      console.log(max_price)
      console.log(type)
      if(unit == 1){
        unit = "kg"
      }
      else if(unit == 2){
        unit = "个"
      }
      else{
        unit = ""
      }
      if(type == 0){
        type = '';
      }
      if(min_price != ''&&max_price != ''&&type==''&&unit!=''){
        this.$net.get({
          url: "/commodity/findByPrice",
          data:{"unit":unit, "least": min_price, "most": max_price,}
        }).then(res => {
          if(res.code==="200"){
            self.commodity_list = res.commodities;
          }
        });
      }
      else if(min_price == '' && max_price == '' && type!='' && unit==''){
        this.$net.get({
          url: "/commodity/findByType",
          data:{"type":type}
        }).then(res => {
          if(res.code==="200"){
            self.commodity_list = res.commodities;
          }
        });
      }
      else if(min_price != '' && max_price != '' && type!='' && unit!=''){
        this.$net.get({
          url: "/commodity/specialSearch",
          data:{"unit":unit, "least": min_price, "most": max_price, "type": type}
        }).then(res => {
          if(res.code==="200"){
            self.commodity_list = res.commodities;
          }
        });
      }
      else{
        this.$net.get({
          url: "/commodity/findAll"
        }).then(res => {
          if(res.code==="200"){
            self.commodity_list = res.commodities;
          }
        })
      }
    },
  }
</script>

<style scoped>
  .search {
    font-size: 80%;
    color: #CFCFCF;
    border-radius: 10px;
  }
  .align {
    display: flex;
    justify-content: center;
  }
  .condition{
    font-size:80%;
    color:#4D4D4D;
  }
  .recommend{
    background-color:#CFCFCF;
    text-align: center;
  }
  .align {
    display: flex;
    justify-content: center;
  }
</style>
