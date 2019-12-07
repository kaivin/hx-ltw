<template>
    <div class="module-panel">
        <div class="search-panel">
            <div class="item-search">
                <div class="item-body">
                <div class="inline-body">
                    <div class="inline-font">模块选择</div>
                    <div class="inline-content num-input"><el-input v-model="searchData.longTailWordData.moduleData[1].settingData.randomQty" placeholder=""></el-input></div>
                    <div class="inline-font">条数据</div>
                </div>
                </div>
            </div>
            <div class="item-search">
                <h2>随机数据</h2>
                <div class="item-body">
                <el-radio v-for="(item,index) in searchData.longTailWordData.moduleData[1].settingData.randomData" v-bind:key="index" v-model="searchData.longTailWordData.moduleData[1].settingData.isRandom" v-bind:label="item.type" border>{{item.name}}</el-radio>
                </div>
            </div>
            <div class="item-search" v-if="searchData.longTailWordData.moduleData[1].settingData.isRandom=='0'">
                <h2>模块唯一标识类名</h2>
                <div class="item-body">
                <div class="inline-body">
                    <div class="inline-content"><el-input v-model="searchData.longTailWordData.moduleData[1].settingData.moduleGUID" placeholder="模块的唯一标识类名"></el-input></div>
                    <div class="inline-content left-font"><el-button type="primary" v-on:click="getModuleData(moduleType)">搜索</el-button></div>
                </div>
                </div>
            </div>
            <div class="item-search" v-if="searchData.longTailWordData.moduleData[1].settingData.isRandom=='0'&&searchData.longTailWordData.moduleData[1].settingData.selectedData.length>0">
                <h2>已选择</h2>
                <div class="item-body">
                <div class="selected-list">
                    <span v-for="(item,index) in searchData.longTailWordData.moduleData[1].settingData.selectedData" v-bind:key="index" v-on:click="deleteSelectedModule(item,index)">{{item.moduleGUID}}</span>
                </div>
                </div>
            </div>
        </div>
        <div class="result-panel">
            <div class="list-data">
                <span v-for="(item,index) in searchData.longTailWordData.moduleData[1].settingData.listData" v-bind:key="index" v-bind:class="item.isSelected?'active':''" v-on:click="selectedData(item)">{{item.moduleGUID}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'moduleLtwMessage',
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
        var serviceModuleData = [
            {id:0,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:1,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:2,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:3,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:4,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:5,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:6,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:7,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:8,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:9,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:10,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:11,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:12,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:13,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:14,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:15,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:16,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:17,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:18,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:19,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:20,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:21,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:22,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:23,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:24,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:25,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:26,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:27,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:28,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:29,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:30,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:31,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:32,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:33,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:34,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:35,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:36,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:37,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:38,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:39,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:40,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:41,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:42,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:43,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:44,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:45,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:46,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:47,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:48,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:49,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:50,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:51,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:52,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:53,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:54,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:55,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:56,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:57,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:58,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:59,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:60,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:61,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:62,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:63,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:64,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:65,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:66,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:67,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:68,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
            {id:69,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
        ];
        serviceModuleData.forEach(function(item,index){
          item.isSelected = false;
        });
        if($this.searchData.longTailWordData.moduleData[1].settingData.selectedData.length>0){
          $this.searchData.longTailWordData.moduleData[1].settingData.selectedData.forEach(function(item,index){
             serviceModuleData.forEach(function(items,indexs){
              if(item.id == items.id){
                items.isSelected = true;
              }
            });
          });
        }
        $this.searchData.longTailWordData.moduleData[1].settingData.listData = serviceModuleData;
        $this.$emit("moduleChanged",$this.searchData);
      },
      // 选择页脚模块数据
      selectedData:function(items){
        var $this = this;
        var len = $this.searchData.longTailWordData.moduleData[1].settingData.selectedData.length;
        if($this.searchData.longTailWordData.moduleData[1].settingData.randomQty==''){
          $this.$alert('请先设置数据选择最大值', '警告', {
              confirmButtonText: '确定',
          });
          return false;
        }else{
          var maxLen = parseInt($this.searchData.longTailWordData.moduleData[1].settingData.randomQty);
          if(len>=maxLen){
            $this.$alert('已设置最多选择'+$this.searchData.longTailWordData.moduleData[1].settingData.randomQty+'条数据', '警告', {
                confirmButtonText: '确定',
            });
            return false;
          }
        }
        if(!items.isSelected){
          $this.searchData.longTailWordData.moduleData[1].settingData.listData.forEach(function(item,index){
            if(item.id == items.id){
              item.isSelected = true;
              $this.searchData.longTailWordData.moduleData[1].settingData.selectedData.push(item);
            }
          });
          $this.$emit("moduleChanged",$this.searchData);
        }
      },
      // 删除已选页脚模块数据
      deleteSelectedModule:function(items,indexs){
        var $this = this;
        $this.searchData.longTailWordData.moduleData[1].settingData.selectedData.splice(indexs,1);
        $this.searchData.longTailWordData.moduleData[1].settingData.listData.forEach(function(item,index){
          if(items.id == item.id){
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
}
</style>