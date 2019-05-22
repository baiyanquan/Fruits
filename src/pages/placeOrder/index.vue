<template>
  <div>
    <i-row>
      <i-cell-group>
        <i-cell is-link url="../addressManagement/main">
          <i-row>
            <span style="color:#4D4D4D;margin-left:20rpx">{{personal_info.nickname}}</span>
            <span style="color:#4D4D4D;margin-left:20rpx">{{phone}}</span>
            <span style="color:#F23636;margin-left:20rpx">默认</span>
          </i-row>
          <i-row>
            <i-col span="24">
              <div style="margin-top: 20rpx">
                <i-icon type="coordinates" style="color:#F23636"/>
                <span style="color:#4D4D4D">{{address}}</span>
              </div>
            </i-col>
          </i-row>
        </i-cell>
      </i-cell-group>
    </i-row>
    <div style="height:20px;background-color: #F0F0F0"></div>
    <i-row>
      <i-cell-group>
        <i-cell>
          <i-row>
            <i-col span="24">
              <span style="margin-top: 40rpx;margin-left:20rpx">鲜果篮子水果店</span>
              <span style="margin-top: 50rpx;margin-left:20rpx">自营</span>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="6">
              <img v-bind:src="commodity.resourceDetails.head" style="width:100%;height: 250rpx;" />
            </i-col>
            <i-col span="18">
              <p style="margin-top: 40rpx;margin-left:20rpx">{{commodity.name}}</p>
              <div style="margin-top: 100rpx;margin-left:20rpx;color:#F23636">
                <i-row>
                  <i-col span="10">
                    <div style="margin-top: 10rpx">
                      <span style="color:#F23636">单价：¥ {{commodity.price}}</span>
                    </div>
                  </i-col>
                  <i-col span="14">
                    <i-row>
                      <i-input-number :value="quantity" min="0" max="100" @change="changeOrderNumber"/>
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
      <i-col span="22" offset="1">
        <p style="font-size:90%;">请选择支付方式：</p>
      </i-col>
    </i-row>
    <div style="height:10px;background-color: #FFFFFF"></div>
    <i-row>
      <i-col span="22" offset="1">
        <i-row class="choosePayMethod">
          <i-col span="6" v-for="(payMethod, index) in payMethodList" :key="index" @click="choosePayMethod(payMethod.id, index)">
            <i-button shape="circle" style="border-radius: 10px;background-color: #FAB831;color:#FFFFFF;display: flex;width:80%;text-align: center;justify-content: center" v-if="payWayIndex == index">{{payMethod.name}}</i-button>
            <i-button shape="circle" style="border-radius: 10px;background-color: #CFCFCF;display: flex;width:80%;text-align: center;justify-content: center" v-else>{{payMethod.name}}</i-button>
          </i-col>
        </i-row>
      </i-col>
    </i-row>
    <div style="height:20px;background-color: #F0F0F0"></div>
    <i-row>
      <i-cell-group>
        <i-cell>
          <i-row>
            <i-col span="20">
              实付款：
            </i-col>
            <i-col span="4" style="color:#F23636">
              ¥ {{commodity.price * quantity}}
            </i-col>
          </i-row>
        </i-cell>
      </i-cell-group>
    </i-row>
    <div style="height:20px;background-color: #F0F0F0"></div>

    <div class="align">
      <i-button class="placeOrder" @click="chooseToPay">
        <p>立即付款</p>
        <div style="height:10px;margin-bottom:10px"></div>
      </i-button>
    </div>
    <i-action-sheet :mask-closable="the_close" :visible="visible" :actions="actions" @click="confirmToPay">
      <view slot="header" style="padding: 16px">
        <i-row>
          <i-col span="3" i-class="col-class">
            <i-icon type="return" @click="returnToIndex" size="22"/>
          </i-col>
          <i-col span ="8" offset="5" style="font-size:140%;color:black">确认付款</i-col>
          <i-col span="3" offset="5" style="color:#1D91E6">
            <i-icon type="feedback"  size="22"/>
          </i-col>
        </i-row>
        <div style="height:30px"></div>
        <i-row class="align">
          <i-col span="24" style="font-size:220%;color:black">
            <span>¥ {{commodity.price * quantity}}</span>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="5" style="font-size:140%">
            <span>订单信息</span>
          </i-col>
          <i-row class="right">
            <i-col span="24" style="font-size:140%;color:black">
              <span>鲜果篮子水果交易平台</span>
            </i-col>
          </i-row>
        </i-row>
        <div style="height:10px"></div>
        <i-row>
          <i-col span="5" style="font-size:140%">
            <span>付款方式</span>
          </i-col>
          <i-row class="right">
            <i-col span="24" style="font-size:140%;color:black">
              <span>花呗</span>
            </i-col>
          </i-row>
        </i-row>
        <div style="height:30px"></div>
      </view>
    </i-action-sheet>
  </div>
</template>

<script>
  import globalStore from "../../stores/globalStore"

  export default {
    computed:{
      actions:function() {
        return [
          {
            name: '确认支付(' + this.commodity.price * this.quantity + '元)',
            color: '#1D91E6',
          },
        ]
      }
    },
    methods:{
      choosePayMethod(id, index){
        this.payWayIndex = index;
        this.payWay = this.payMethodList[index].name
      },
      chooseToCancel(){
        this.visible = false;
      },
      confirmToPay(){
        let self = this;
        self.$net.post({
          url: "/orderInfo/payForOrder",
          data:{
            "orderIds":self.orderId,
            "payMethodId":self.payMethodList[self.payWayIndex].id,
          }
        }).then(res => {
          if(res.code==="200"){
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000,
              mask:true
            })
            let url = "../commodityList/main";
            wx.navigateTo({url})
          }
        });
        this.visible = false;
      },
      chooseToPay(){
        let self = this;
        self.$net.post({
          url: "/orderInfo/addOneOrder",
          data:{
            "commodityId":self.id,
            "quantity":self.quantity,
            "customerId":self.personal_info.id,
            "address":globalStore.state.address_id,
          }
        }).then(res => {
          if(res.code==="200"){
            console.log(res)
            self.orderId = res.orderId;
            self.visible = true;
          }
        });
        self.visible = true;
      },
      changeOrderNumber(e) {
        this.quantity = e.mp.detail.value;
      },
    },
    data(){
      return {
        the_close: false,
        visible: false,
        id:'',
        value1: '',
        current: 'shopping_cart',
        fruit_list: [],
        commodity:{},
        quantity:1,
        personal_info: {},
        address: "",
        phone: "",
        payMethodList:[],
        payWay:"",
        payWayIndex:0,
        orderId:[],
      }
    },
    onLoad:function (options) {
      console.log(options.orderList);
      this.id = options.pId;
      let self = this;
      self.personal_info = globalStore.state.personal_info;
      self.$net.get({
        url: "/commodity/findById",
        data:{"id":self.id}
      }).then(res => {
        if(res.code==="200"){
          self.commodity = res.commodity.commodity;
        }
      });
      self.$net.get({
        url: "/payMethod/findAll",
        data:{"customerId":self.personal_info.id}
      }).then(res => {
        if(res.code==="200"){
          self.payMethodList = res.payMethod;
          self.payWay = "支付方式：" + self.payMethodList[0].name;
        }
      });
    },
    onShow:function() {
      this.address = globalStore.state.address;
      this.phone = globalStore.state.phone;
    }
  }
</script>

<style scoped>
  .choosePayMethod {
    font-size: 80%;
  }
  .align {
    display: flex;
    justify-content: center;
  }
  .right {
    display: flex;
    justify-content: flex-end;
  }
  .recommend{
    background-color:#CFCFCF;
    text-align: center;
  }
  .placeOrder{
    position: fixed;
    bottom: 0;
    display: flex;
    width: 60%;
    justify-content: center;
    color:#FFFFFF;
    background-color:#F23636;
    text-align: center;
    border-radius: 10px;
  }
</style>
