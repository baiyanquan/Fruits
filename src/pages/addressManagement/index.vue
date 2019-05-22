<template>
  <div>
    <i-row>
      <i-cell-group>
        <i-cell v-for="(each_address, index) in address_list" :key="index">
          <i-row>
            <i-col span="3">
              <i-button shape="circle" class="select" v-if="each_address.id == address_id" size="large"><i-icon type="right" /></i-button>
              <i-button shape="circle" class="unselect" v-else size="large" @click="changeAddress(each_address.id, each_address.phone, each_address.address)"><i-icon type="right" /></i-button>
            </i-col>
            <i-col span="20">
              <i-row>
                <span style="color:#4D4D4D;margin-left:20rpx">{{personal_info.nickname}}</span>
                <span style="color:#4D4D4D;margin-left:20rpx">{{each_address.phone}}</span>
                <span style="color:#F23636;margin-left:20rpx" v-if="each_address.isDefault == 1">默认</span>
              </i-row>
              <i-row>
                <i-col span="24">
                  <div style="margin-top: 20rpx">
                    <i-icon type="coordinates" style="color:#F23636"/>
                    <span style="color:#4D4D4D">{{each_address.address}}</span>
                  </div>
                </i-col>
              </i-row>
            </i-col>
          </i-row>
        </i-cell>
      </i-cell-group>
    </i-row>

  </div>
</template>

<script>
  import globalStore from "../../stores/globalStore"

  export default {
    methods:{
      changeAddress(id, phone, address){
        globalStore.state.address_id = id;
        this.address_id = id;
        globalStore.state.phone = phone;
        globalStore.state.address = address;
      }
    },
    data(){
      return {
        visible: false,
        value1: '',
        current: 'shopping_cart',
        fruit_list: [],
        commodity:{},
        quantity:1,
        personal_info: {
          nickname: "白眼圈小花",
        },
        address_list: [],
        address_id: 0,
      }
    },
    onLoad:function (options) {
      this.address = globalStore.state.address;
      this.phone = globalStore.state.phone;
      this.address_id = globalStore.state.address_id;
      let self = this;
      this.$net.get({
        url: "/address/findAllAddress",
        data:{"customerId":globalStore.state.personal_info.id}
      }).then(res => {
        console.log(res);
        if(res.code==="200"){
          self.address_list = res.address;
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
  .select{
    display: flex;
    width: 60%;
    justify-content: center;
    color:#FFFFFF;
    background-color:#FAB831;
    text-align: center;
    border-radius: 50px;
  }
  .unselect{
    display: flex;
    width: 60%;
    justify-content: center;
    color:#FAB831;
    background-color:#CFCFCF;
    text-align: center;
    border-radius: 50px;
  }
</style>
