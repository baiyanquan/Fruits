<template>
  <div>
    <i-row>
      <i-tabs :current="page" color="#FAB831" @change="pageChange">
        <i-tab key="tab1" title="商品"></i-tab>
        <i-tab key="tab2" title="详情"></i-tab>
        <i-tab key="tab3" title="评论"></i-tab>
      </i-tabs>
    </i-row>
    <div v-if="page==='tab1'">
      <i-row>
        <i-col span="24" i-class="col-class">
          <image v-bind:src="commodity.resourceDetails.head" style="width:100%;height:700rpx"/>
        </i-col>
      </i-row>
      <i-row>
        <p style="height:80rpx;margin-left:20rpx;font-size: 120%">{{commodity.name}}</p>
      </i-row>
      <i-row>
        <p style="height:60rpx;margin-left:20rpx;color:#F23636;font-size: 120%">¥ {{commodity.price}}元/{{commodity.unit}}</p>
      </i-row>
      <i-row>
        <i-col span="24" class="recommend">
          <div style="background-color:#EFEFEF;height:50rpx"></div>
        </i-col>
      </i-row>
      <i-row>
        <i-cell-group>
          <i-cell is-link url="../addressManagement/main">
            <i-row>
              <i-col span="3">
                <div class="align">
                  <span style="color:#CFCFCF;">送至</span>
                </div>
              </i-col>
              <i-col span="21">
                <i-icon type="coordinates" style="color:#F23636"/>
                <span style="color:#F23636">{{personal_info.address}}</span>
              </i-col>
            </i-row>
          </i-cell>
        </i-cell-group>
      </i-row>
    </div>
    <i-row>
      <i-col span="12">
        <div class="align">
          <i-button style="color:#FFFFFF;background-color:#FAB831;width:60%;text-align: center;border-radius: 10px;" size="large" @click="addToShoppingCart">
            <div style="height:10px"></div>
            <span>加入购物车</span>
            <div style="height:10px"></div>
          </i-button>
        </div>
      </i-col>
      <i-col span="12">
        <div class="align">
          <i-button style="color:#FFFFFF;background-color:#F23636;width:60%;text-align: center;border-radius: 10px;" size="large" @click="buyNow">
            <div style="height:10px"></div>
            <span >立即购买</span>
            <div style="height:10px"></div>
          </i-button>
        </div>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="24" class="recommend">
        <div style="background-color:#EFEFEF;height:100rpx">
          <div style="padding-top: 30rpx">为/你/推/荐</div>
        </div>
      </i-col>
    </i-row>
    <i-row>
      <div style="background-color: #FFFFFF">
        <div style="background-color:#FFFFFF;width:50%;float:left" v-for="(commodity, index) in fruit_list" :key="index" v-if="commodity.id != id"  @click="detailPage(commodity.id)">
          <div style="height:620rpx;background-color:#FFFFFF;;margin-left:10rpx;margin-right:10rpx">
            <img v-bind:src="commodity.resourceDetails.head" style="width:95%;height:400rpx" />
            <p style="width:95%;height:80rpx;padding-left:10rpx;padding-right:10rpx;background-color: white">{{commodity.name}}</p>
            <p style="width:95%;height:60rpx;padding-left:10rpx;padding-right:10rpx;background-color: white;color:#F23636">¥ {{commodity.price}}/{{commodity.unit}}</p>
          </div>
        </div>
      </div>
    </i-row>
    <div style="height:40rpx"></div>
    <i-row>
      <i-tab-bar :current="current" color="#FAB831" @change="handleChange" fixed="true">
        <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页" ></i-tab-bar-item>
        <i-tab-bar-item key="commodity" icon="createtask" current-icon="createtask_fill" title="商品" ></i-tab-bar-item>
        <i-tab-bar-item key="shopping_cart" icon="publishgoods_fill" current-icon="publishgoods_fill" title="购物车"></i-tab-bar-item>
        <i-tab-bar-item key="management" icon="setup" current-icon="setup_fill" title="管理"></i-tab-bar-item>
        <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </i-row>
  </div>
</template>

<script>
  import globalStore from "../../stores/globalStore"

  export default {
    methods:{
      addToShoppingCart(){
        let self = this;
        this.$net.post({
          url: "/commodity/addToCart",
          data:{
              customerId:1,
              commodityId:self.id,
              quantity:1,
          }
        }).then(res => {
          console.log(res);
          if(res.code==="200"){
            let url = "../commodityList/main";
            wx.navigateTo({url})
          }
        })
      },
      buyNow(){
        let url = "../placeOrder/main" + "?pId=" +this.id;
        wx.navigateTo({url})
      },
      search(){
        let url = "../search/main";
        wx.navigateTo({url})
      },
      pageChange(e){
        this.page = e.mp.detail.key
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
      fresh_fruit(){
        let url = "../commodityList/main";
        wx.navigateTo({url})
      },
      detailPage(id){
        let url = "../commodityDetail/main" + "?pId=" +id;
        wx.navigateTo({url})
      },
    },
    data(){
      return {
        id: '',
        value1: '',
        current: 'commodity',
        fruit_list: [],
        page: 'tab1',
        commodity: {},
        personal_info: {
          address: ""
        },
      }
    },
    onLoad:function (options) {
      this.id = options.pId;
      let self = this;
      this.$net.get({
        url: "/commodity/findById",
        data:{"id":self.id}
      }).then(res => {
        if(res.code==="200"){
          self.commodity = res.commodity.commodity;
        }
      });
    },
    onShow:function() {
      this.personal_info.address = globalStore.state.address;
    }
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
.recommend{
  background-color:#CFCFCF;
  text-align: center;
}
</style>
