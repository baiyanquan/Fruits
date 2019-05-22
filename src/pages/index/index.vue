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
    <i-row>
      <i-notice-bar icon="systemprompt" loop>
        双11水果特惠还有7天！
      </i-notice-bar>
    </i-row>
    <i-row>
      <i-col span="24" i-class="col-class">
        <image src="cloud://fruit-a15bbb.6672-fruit-a15bbb/image/index/activity1.png" style="width:100%;height:120px"/>
      </i-col>
    </i-row>
    <i-row>
      <i-grid i-class="border:none">
        <i-grid-item @click = "fresh_fruit">
          <i-grid-icon>
            <image src="https://6672-fruit-a15bbb-1259096130.tcb.qcloud.la/image/index/fresh_fruits.png?sign=cace61294972afa676e6268565c72f92&t=1556009521" />
          </i-grid-icon>
          <i-grid-label>新鲜水果</i-grid-label>
        </i-grid-item>
        <i-grid-item>
          <i-grid-icon>
            <image src="https://6672-fruit-a15bbb-1259096130.tcb.qcloud.la/image/index/juice.png?sign=bb41ee75113d9ccfb31dbd0c89808422&t=1556009549" />
          </i-grid-icon>
          <i-grid-label>深加工</i-grid-label>
        </i-grid-item>
        <i-grid-item>
          <i-grid-icon>
            <image src="https://6672-fruit-a15bbb-1259096130.tcb.qcloud.la/image/index/discount.png?sign=08ee529987066fc452f60b25593ee12b&t=1556009480" />
          </i-grid-icon>
          <i-grid-label>活动中心</i-grid-label>
        </i-grid-item>
      </i-grid>
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
        <div style="background-color:#FFFFFF;width:50%;float:left" v-for="(commodity, index) in fruit_list" :key="index" @click="detailPage(commodity.id)">
          <div style="height:620rpx;background-color:#FFFFFF;;margin-left:10rpx;margin-right:10rpx">
            <img v-bind:src="commodity.resourceDetails.head" style="width:95%;height:400rpx" />
            <p style="width:95%;height:80rpx;padding-left:10rpx;padding-right:10rpx;background-color: white">{{commodity.name}}</p>
            <p style="width:95%;height:60rpx;padding-left:10rpx;padding-right:10rpx;background-color: white;color:#F23636">¥ {{commodity.price}}元/{{commodity.unit}}</p>
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
      detailPage(id){
        let url = "../commodityDetail/main" + "?pId=" +id;
        wx.navigateTo({url})
      },
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
      fresh_fruit(){
        let url = "../commodityList/main" + "?keyword=" + '' + "&min_price=" + '' + "&max_price=" + '' +  + "&type=" + '' + "&unit=" + '';
        wx.redirectTo({url})
      },
      getInfo(){
        let self = this;
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
        current: 'homepage',
        fruit_list: []
      }
    },
    onLoad:function (options) {
      this.getInfo();
      let id = 1;
      let self = this;
      this.$net.get({
        url: "/customer/findById",
        data:{"id":id}
      }).then(res => {
        if(res.code==="200"){
          globalStore.state.personal_info = res.customer;
          globalStore.state.address = res.customer.defaultAddress;
          globalStore.state.phone = res.customer.phone;
          self.$net.get({
            url: "/address/findAllAddress",
            data:{"customerId":globalStore.state.personal_info.id}
          }).then(res => {
            if(res.code==="200"){
              let address_list = res.address;
              for(let i in address_list){
                if(address_list[i].isDefault == 1){
                  globalStore.state.address_id = address_list[i].id;
                }
              }
              console.log(globalStore.state.address_id);
            }
          });
        }
      });
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
