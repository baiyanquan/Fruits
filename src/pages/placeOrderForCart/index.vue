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
      <i-cell-group v-for="(commodity,index) in fruit_list" :key="index">
        <i-cell >
          <i-row>
            <i-col span="24">
              <span style="margin-top: 40rpx;margin-left:20rpx">鲜果篮子水果店</span>
              <span style="margin-top: 50rpx;margin-left:20rpx">自营</span>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="6">
              <img v-bind:src="commodity.commodity.resourceDetails.head" style="width:100%;height: 250rpx;" />
            </i-col>
            <i-col span="18">
              <p style="margin-top: 40rpx;margin-left:20rpx">{{commodity.commodity.name}}</p>
              <div style="margin-top: 100rpx;margin-left:20rpx;color:#F23636">
                <i-row>
                  <i-col span="12">
                    <div style="margin-top: 10rpx">
                      <span style="color:#F23636">单价：¥ {{commodity.commodity.price}}</span>
                    </div>
                  </i-col>
                  <i-col span="12">
                    <i-row>
                      <i-input-number :value="commodity.quantity" min="0" max="100" @change="changeOrderNumber" :id="commodity.commodity.id"/>
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
              ¥ {{sum}}
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
    <i-action-sheet :mask-closable="the_close" :visible="visible" :actions="actions" show-cancel @cancel="chooseToCancel" @click="confirmToPay">
      <view slot="header" style="padding: 16px">
        <i-button shape="circle"><i-icon type="right" /></i-button>
      </view>
    </i-action-sheet>
  </div>
</template>

<script>
  import globalStore from "../../stores/globalStore"

  export default {
    computed:{
      sum:function(){
        let amount = 0;
        for(let i in this.fruit_list)
          amount += this.fruit_list[i].commodity.price * this.fruit_list[i].quantity;
        return amount;
      },
      actions:function() {
        return [
          {
            name: '确认支付(' + this.sum + '元)',
            color: '#F23636'
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
        this.visible = false;
      },
      chooseToPay(){
        this.visible = true;
      },
      changeOrderNumber(e) {
        for(let i=0;i<this.fruit_list.length;i++){
          if(this.fruit_list[i].commodity.id == e.currentTarget.id){
            this.fruit_list[i].quantity = e.mp.detail.value;
            break;
          }
        }
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
        quantity:1,
        personal_info: {},
        address: "",
        phone: "",
        payMethodList:[],
        payWay:"",
        payWayIndex:0,
      }
    },
    onLoad:function (options) {
      this.fruit_list = JSON.parse(options.orderList);
      console.log(this.fruit_list);
      let self = this;
      self.personal_info = globalStore.state.personal_info;
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
