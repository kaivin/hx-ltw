<template>
    <div class="module-panel">
        <div class="search-panel">
            <div class="item-search">
                <div class="item-body">
                <div class="inline-body">
                    <div class="inline-font">模块选择</div>
                    <div class="inline-content num-input"><el-input v-model="searchData.publicModuleData.moduleData[4].settingData.randomQty" placeholder=""></el-input></div>
                    <div class="inline-font">条数据</div>
                </div>
                </div>
            </div>
            <div class="item-search">
                <h2>随机数据</h2>
                <div class="item-body">
                <el-radio v-for="(item,index) in searchData.publicModuleData.moduleData[4].settingData.randomData" v-bind:key="index" v-on:change="changeRandomState" v-model="searchData.publicModuleData.moduleData[4].settingData.isRandom" v-bind:label="item.type" border>{{item.name}}</el-radio>
                </div>
            </div>
            <div class="item-search" v-if="searchData.publicModuleData.moduleData[4].settingData.isRandom=='0'">
                <h2>模块唯一标识类名</h2>
                <div class="item-body">
                <div class="inline-body">
                    <div class="inline-content"><el-input v-model="searchData.publicModuleData.moduleData[4].settingData.moduleGUID" placeholder="模块的唯一标识类名"></el-input></div>
                    <div class="inline-content left-font"><el-button type="primary" v-on:click="getModuleData(moduleType)">搜索</el-button></div>
                </div>
                </div>
            </div>
            <div class="item-search" v-if="searchData.publicModuleData.moduleData[4].settingData.isRandom=='0'&&searchData.publicModuleData.moduleData[4].settingData.selectedData.length>0">
                <h2>已选择</h2>
                <div class="item-body">
                <div class="selected-list">
                    <span v-for="(item,index) in searchData.publicModuleData.moduleData[4].settingData.selectedData" v-bind:key="index" v-on:click="deleteSelectedModule(item,index)">{{item.moduleGUID}}</span>
                </div>
                </div>
            </div>
        </div>
        <div class="result-panel">
            <div class="list-data" v-if="searchData.publicModuleData.moduleData[4].settingData.isRandom=='0'&&searchData.publicModuleData.moduleData[4].settingData.listData.length>0">
                <span v-for="(item,index) in searchData.publicModuleData.moduleData[4].settingData.listData" v-bind:key="index" v-bind:class="item.isSelected?'active':''" v-on:click="selectedData(item)">{{item.moduleGUID}}</span>
            </div>
            <div class="empty-panel" v-if="isSearch"><p>该模块在所选有效宽度下暂无数据</p></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'moduleDecorationSearch',
    data(){
      return{
        isSearch:false,
      }
    },
    props:{
      searchData:Object,
      moduleType:String
    },
    methods:{
      // 获取有效宽度已选个数
      getMaxWidthLength:function(){
        var $this = this;
        var len = 0;
        $this.searchData.maxWidthData.forEach(function(item,index){
          if(item.isSelected){
            len = len + 1;
          }
        });
        return len;
      },
      changeRandomState:function(){
        var $this = this;
        if($this.searchData.publicModuleData.moduleData[4].settingData.isRandom=='1'){
          $this.isSearch = false;
        }
      },
      // 获取模块数据
      getModuleData:function(value){
        var $this = this;
        var len = $this.getMaxWidthLength();
        if(len<=0){
          $this.$alert('请先选择有效宽度', '警告', {
              confirmButtonText: '确定',
          });
          return false;
        }
        var searchParams = {};
        searchParams.moduleType = value;
        searchParams.pageType = '';
        searchParams.maxWidth = $this.searchData.selectedMaxWidth.length==0?'':$this.searchData.selectedMaxWidth.join(',');
        searchParams.author = '';
        searchParams.moduleGUID = $this.searchData.publicModuleData.moduleData[0].settingData.moduleGUID;
        var serviceModuleData = [];
        $this.$api.post('/api/Modules/Get',searchParams,function(res){
          if(res.data.code ==1){
            serviceModuleData = res.data.data;
            serviceModuleData.forEach(function(item,index){
              item.isSelected = false;
            });
            if($this.searchData.publicModuleData.moduleData[4].settingData.selectedData.length>0){
              $this.searchData.publicModuleData.moduleData[4].settingData.selectedData.forEach(function(item,index){
                serviceModuleData.forEach(function(items,indexs){
                  if(items.ID == item.ID){
                    items.isSelected = true;
                  }
                });
              });
            }
            if(serviceModuleData.length==0){
              $this.isSearch = true;
            }
            $this.searchData.publicModuleData.moduleData[4].settingData.listData = serviceModuleData;
            $this.$emit("moduleChanged",$this.searchData);
          }else{
              $this.$alert(res.data.msg, '警告', {
                confirmButtonText: '确定',
            });
          }
        });
      },
      // 选择页脚模块数据
      selectedData:function(items){
        var $this = this;
        var len = $this.searchData.publicModuleData.moduleData[4].settingData.selectedData.length;
        if($this.searchData.publicModuleData.moduleData[4].settingData.randomQty==''){
          $this.$alert('请先设置数据选择最大值', '警告', {
              confirmButtonText: '确定',
          });
          return false;
        }else{
          var maxLen = parseInt($this.searchData.publicModuleData.moduleData[4].settingData.randomQty);
          if(len>=maxLen){
            $this.$alert('已设置最多选择'+$this.searchData.publicModuleData.moduleData[4].settingData.randomQty+'条数据', '警告', {
                confirmButtonText: '确定',
            });
            return false;
          }
        }
        if(!items.isSelected){
          $this.searchData.publicModuleData.moduleData[4].settingData.listData.forEach(function(item,index){
            if(items.ID == item.ID){
              item.isSelected = true;
              $this.searchData.publicModuleData.moduleData[4].settingData.selectedData.push(item);
            }
          });
          $this.$emit("moduleChanged",$this.searchData);
        }
      },
      // 删除已选页脚模块数据
      deleteSelectedModule:function(items,indexs){
        var $this = this;
        $this.searchData.publicModuleData.moduleData[4].settingData.selectedData.splice(indexs,1);
        $this.searchData.publicModuleData.moduleData[4].settingData.listData.forEach(function(item,index){
          if(items.ID == item.ID){
            item.isSelected = false;
          }
        });
        $this.$emit("moduleChanged",$this.searchData);
      },
    }
}
</script>

<style lang="scss" scoped>
.item-search{
  width: 100%;
  @extend %clearfix;
  margin-top: 30px;
  h2{
    width: 100%;
    height: 32px;
    line-height: 32px;
    font-size: 20px;
  }
  .item-body{
    width: 100%;
    @extend %clearfix;
    margin-top: 10px;
    .el-radio,.el-checkbox{
        margin:0 10px 10px 0;
        float:left;
    }
    .inline-body{
      float:left;
      .inline-font{
        height: 40px;
        line-height: 40px;
      }
      .left-font{
        margin-left: 20px;
      }
      .num-input{
        width: 60px;
        margin: 0 10px;
      }
      .inline-font,.inline-content{
        float:left;
      }
      .inline-content{
        .iconfont{
          display: inline-block;
          width: 32px;
          height: 32px;
          margin: 4px 20px 0 0;
          border: 1px solid #e6e6e6;
          border-radius: 4px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          font-size: 18px;
          color: $primary;
        }
      }
    }
  }
  .sub-search{
    width: 100%;
    @extend %clearfix;
  }
}
.module-panel{
  width: 100%;
  height:100%;
  overflow: hidden;
  @extend %clearfix;
}
.search-panel{
  padding: 0 60px;
  width: 50%;
  border-right: 1px solid #e6e6e6;
}
.result-panel{
  padding:0 0 20px 0;
  width: 50%;
}
.search-panel,.result-panel{
  float:left;
  height: 100%;
  overflow-y: auto;
}
.list-data{
  width: 100%;
  overflow: hidden;
  span{
    display: block;
    float:left;
    height: 48px;
    padding: 0 20px;
    border: 4px;
    background: #f6f6f6;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    margin: 20px 10px 0;
    line-height: 48px;
    border-radius: 4px;
  }
  span.active{
    background: $primary;
    color: #fff;
  }
}
.selected-list{
  width: 100%;
  overflow: hidden;
  span{
    display: block;
    float:left;
    height: 48px;
    padding: 0 50px 0 20px;
    line-height: 48px;
    font-size: 16px;
    color: #333;
    background: #f6f6f6;
    cursor: pointer;
    margin: 0 5px 10px;
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-radius: 4px;
    &:after{
      content:'\e940';
      display: block;
      width: 30px;
      height: 30px;
      position: absolute;
      right:10px;
      top: 9px;
      font-size: 24px;
      color: #999;
      text-align: center;
      line-height: 30px;
    }
  }
}.empty-panel{
  display: table;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  p{
    display: table-cell;
    font-size: 16px;
    line-height: 32px;
    vertical-align: middle;
    color: #999;
  }
}
</style>