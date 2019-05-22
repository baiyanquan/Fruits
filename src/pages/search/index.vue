<template>
  <div>
    <i-row>
      <i-col span="12" i-class="col-class" :offset="7">
        <i-row class="search">
          <i-col span="3">
            <i-icon type="search" size="20"/>
          </i-col>
          <i-col span="21">
            <input style="color: #CFCFCF" mode="wrapped" placeholder=" 请输入想要搜索的内容" focus="true" @confirm="confirm($event)" v-model="keyword"/>
          </i-col>
        </i-row>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="6" offset="1">
        <div class="align" style="margin-top:40rpx;">
          相关信息
        </div>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="8">
        <div class="align">
          <i-button type="ghost" class="choose" @click="valueChange1">
            <span v-if="value1===0">促销</span>
            <span v-else style="color:#F23636"><i-icon type="right" />促销</span>
          </i-button>
        </div>
      </i-col>
      <i-col span="8">
        <div class="align">
          <i-button type="ghost" class="choose" @click="valueChange2">
            <span v-if="value2===0">本地购</span>
            <span v-else style="color:#F23636"><i-icon type="right" />本地购</span>
          </i-button>
        </div>
      </i-col>
      <i-col span="8">
        <div class="align">
          <i-button class="choose" @click="valueChange3">
            <span v-if="value3===0">仅看有货</span>
            <span v-else style="color:#F23636"><i-icon type="right" />仅看有货</span>
          </i-button>
        </div>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="6" offset="1">
        <div class="align" style="margin-top:40rpx;">
          价格区间
        </div>
      </i-col>
    </i-row>
    <i-row class="align">
      <i-col span="18" class="align">
        <i-row class="align">
          <div style="margin-top:40rpx;">
            <i-col span="10" style="text-align: center">
              <input style="background-color: #CFCFCF" placeholder="最低价" type="number" v-model="min_price"/>
            </i-col>
            <i-col span="4">
              <span class="align" style="text-align: center">-</span>
            </i-col>
            <i-col span="10" style="text-align: center">
              <input style="background-color: #CFCFCF" placeholder="最高价" type="number" v-model="max_price"/>
            </i-col>
          </div>
        </i-row>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="6" offset="1">
        <div class="align" style="margin-top:40rpx;">
          加工方式
        </div>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="8">
        <div class="align">
          <i-button type="ghost" class="choose" @click="valueChange4">
            <span v-if="value4===1" style="color:#F23636"><i-icon type="right" />加工</span>
            <span v-else>加工</span>
          </i-button>
        </div>
      </i-col>
      <i-col span="8">
        <div class="align">
          <i-button type="ghost" class="choose" @click="valueChange5">
            <span v-if="value4===2" style="color:#F23636"><i-icon type="right" />不加工</span>
            <span v-else>不加工</span>
          </i-button>
        </div>
      </i-col>
      <i-col span="8">
        <div class="align">
          <i-button class="choose" @click="valueChange6">
            <span v-if="value4===3" style="color:#F23636"><i-icon type="right" />深加工</span>
            <span v-else>深加工</span>
          </i-button>
        </div>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="6" offset="1">
        <div class="align" style="margin-top:40rpx;">
          计价方式
        </div>
      </i-col>
    </i-row>
    <i-row>
      <i-col span="12">
        <div class="align">
          <i-button type="ghost" class="choose" @click="valueChange7">
            <span v-if="value5===1" style="color:#F23636"><i-icon type="right" />按重量</span>
            <span v-else>按重量</span>
          </i-button>
        </div>
      </i-col>
      <i-col span="12">
        <div class="align">
          <i-button type="ghost" class="choose" @click="valueChange8">
            <span v-if="value5===2" style="color:#F23636"><i-icon type="right" />按个数</span>
            <span v-else>按个数</span>
          </i-button>
        </div>
      </i-col>
    </i-row>
    <div class="align">
      <i-button class="searchCommodity" @click="searchCommodity">
        <p>搜索</p>
        <div style="height:10px;margin-bottom:10px"></div>
      </i-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      confirm(e) {
        let url = "../commodityList/main" + "?keyword=" + this.keyword + "&min_price=" + this.min_price + "&max_price=" + this.max_price + "&type=" + this.value4 + "&unit=" + this.value5;
        wx.navigateTo({url})
      },
      searchCommodity(){
        let url = "../commodityList/main" + "?keyword=" + this.keyword + "&min_price=" + this.min_price + "&max_price=" + this.max_price + "&type=" + this.value4 + "&unit=" + this.value5;
        wx.navigateTo({url})
      },
      valueChange1(){
        if(this.value1 === 0)
          this.value1 = 1;
        else
          this.value1 = 0;
      },
      valueChange2(){
        if(this.value2 === 0)
          this.value2 = 1;
        else
          this.value2 = 0;
      },
      valueChange3(){
        if(this.value3 === 0)
          this.value3 = 1;
        else
          this.value3 = 0;
      },
      valueChange4(){
        if(this.value4 === 1)
          this.value4 = 0;
        else
          this.value4 = 1;
      },
      valueChange5(){
        if(this.value4 === 2)
          this.value4 = 0;
        else
          this.value4 = 2;
      },
      valueChange6(){
        if(this.value4 === 3)
          this.value4 = 0;
        else
          this.value4 = 3;
      },
      valueChange7(){
        if(this.value5 === 1)
          this.value5 = 0;
        else
          this.value5 = 1;
      },
      valueChange8(){
        if(this.value5 === 2)
          this.value5 = 0;
        else
          this.value5 = 2;
      },
    },
    data(){
      return {
        keyword: '',
        min_price: '',
        max_price: '',
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
        value5: 0,
        value6: 0,
        value7: 0,
        value8: 0,
      }
    },
    created () {
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
  .choose{
    font-size:80%;
    color:#4D4D4D;
    margin-top:40rpx;
  }
  .searchCommodity{
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
