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
    <div style="height:20px;background-color: #F0F0F0"></div>
    <i-row>
      <i-cell-group>
        <i-cell v-for="(cart, index) in cart_list" :key="index">
          <i-row>
            <i-col span="24">
              <i-button shape="circle" v-if="choose_list[index] == 1" style="background-color: #FAB831;color:#FFFFFF;border-radius: 50px" @click="changeChoose(index)"><i-icon type="right" /></i-button>
              <i-button shape="circle" v-else @click="changeChoose(index)"><i-icon type="right" /></i-button>
              <span style="margin-top: 40rpx;margin-left:20rpx">鲜果篮子水果店</span>
              <span style="margin-top: 50rpx;margin-left:20rpx">{{cart.type}}</span>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="2">
              <i-button shape="circle" @click="deleteCart(cart.commodity.id)"><i-icon type="close" /></i-button>
            </i-col>
            <i-col span="6">
              <img v-bind:src="cart.commodity.resourceDetails.head" style="width:100%;height: 250rpx;" />
            </i-col>
            <i-col span="16">
              <p style="margin-top: 40rpx;margin-left:20rpx">{{cart.commodity.name}}</p>
              <div style="margin-top: 100rpx;margin-left:20rpx;color:#F23636">
                <i-row>
                  <i-col span="10">
                    <div style="margin-top: 10rpx">
                      <span style="color:#F23636">¥ {{cart.commodity.price * cart.quantity}}</span>
                    </div>
                  </i-col>
                  <i-col span="14">
                    <i-row>
                        <i-input-number :value="cart.quantity" min="0" max="100" @change="changeCartNumber" :id="cart.commodity.id"/>
                    </i-row>
                  </i-col>
                </i-row>
              </div>
            </i-col>
          </i-row>
        </i-cell>
      </i-cell-group>
    </i-row>
    <div style="height:20px;background-color: #F0F0F0"></div>
    <i-row>
      <i-col span="12">
        <div class="align" style="background-color: #F0F0F0">
          <i-button style="color:#FFFFFF;background-color:#FAB831;width:60%;text-align: center;border-radius: 10px;" size="large" @click="clearCart">
            <div style="height:10px"></div>
            <span>清空购物车</span>
            <div style="height:10px"></div>
          </i-button>
        </div>
      </i-col>
      <i-col span="12">
        <div class="align" style="background-color: #F0F0F0">
          <i-button style="color:#FFFFFF;background-color:#F23636;width:60%;text-align: center;border-radius: 10px;" size="large" @click="settle">
            <div style="height:10px"></div>
            <span >结算</span>
            <div style="height:10px"></div>
          </i-button>
        </div>
      </i-col>
    </i-row>
    <i-row>
      <i-tab-bar :current="current" color="#FAB831" @change="handleChange"  fixed="true">
        <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
        <i-tab-bar-item key="commodity" icon="createtask" current-icon="createtask_fill" title="商品"></i-tab-bar-item>
        <i-tab-bar-item key="shopping_cart" icon="publishgoods_fill" current-icon="publishgoods_fill" title="购物车"></i-tab-bar-item>
        <i-tab-bar-item key="management" icon="setup" current-icon="setup_fill" title="管理"></i-tab-bar-item>
        <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
      </i-tab-bar>
    </i-row>
    <div style="height:20px;background-color: #F0F0F0"></div>
    <div style="height:40px"></div>
  </div>
</template>

<script>
  import globalStore from "../../stores/globalStore"

  export default {
    methods:{
      clearCart(){
        let id = globalStore.state.personal_info.id;
        self = this;
        for(let i in self.cart_list){
          self.$net.post({
            url: "/cart/deleteFromCart",
            data:{
              "customerId":id,
              "commodityId":self.cart_list.commodity.id
            }
          }).then(res => {
          });
        }
      },

      settle(){
        self = this;
        let order_list = []
        for(let i in self.choose_list){
          if(self.choose_list[i] == 1){
            order_list.push(self.cart_list[i]);
          }
        }
        let url = "../placeOrderForCart/main" + "?orderList=" +JSON.stringify(order_list);
        wx.navigateTo({url})
      },

      changeChoose(index){
        if(this.choose_list[index] == 1)
          this.choose_list[index] = 0;
        else
          this.choose_list[index] = 1
        this.signal += 1;
      },

      deleteCart(commodityId){
        let id = globalStore.state.personal_info.id;
        let self = this;
        this.$net.post({
          url: "/cart/deleteFromCart",
          data:{
            "customerId":id,
            "commodityId":commodityId
          }
        }).then(res => {
          self.$net.get({
            url: "/cart/findMyCart",
            data:{"customerId":id}
          }).then(res => {
            if(res.code==="200"){
              self.cart_list = res.carts;
              self.choose_list = []
              for(let i in self.cart_list){
                self.choose_list.push(0);
              }
            }
          });
        });
      },

      search(){
        let url = "../search/main";
        wx.navigateTo({url})
      },

      changeCartNumber(e) {
        for(let i=0;i<this.cart_list.length;i++){
          if(this.cart_list[i].commodity.id == e.currentTarget.id){
            this.cart_list[i].quantity = e.mp.detail.value;
            break;
          }
        }
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
    },
    data(){
      return {
        signal: 0,
        value1: '',
        current: 'shopping_cart',
        cart_list:[],
        choose_list:[],
      }
    },
    onLoad:function () {
      let id = globalStore.state.personal_info.id;
      let self = this;
      this.$net.get({
        url: "/cart/findMyCart",
        data:{"customerId":id}
      }).then(res => {
        if(res.code==="200"){
          self.cart_list = res.carts;
          for(let i in self.cart_list){
            self.choose_list.push(0);
          }
        }
      });
    },
    onUnload: function () {
      let id = globalStore.state.personal_info.id;
      self = this;
      for(let i in self.cart_list){
        self.$net.post({
          url: "/cart/changeQuantity",
          data:{
            "customerId":id,
            "commodityId": self.cart_list[i].commodity.id,
            "quantity": self.cart_list[i].quantity,
          }
        }).then(res => {
        });
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
  .recommend{
    background-color:#CFCFCF;
    text-align: center;
  }
</style>
