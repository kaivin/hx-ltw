<template>
  <div class="page-root">
        <div class="website-wrapper" v-if="!isPreview">
            <div class="ltw-abs-search">
                <div class="ltw-search-panel">
                    <div class="ltw-item-search ltw-guid-panel"><el-input placeholder="请输入站点ID" v-model="searchID" clearable></el-input></div>
                    <div class="ltw-item-search ltw-btn-panel"><el-button type="primary" v-on:click="getSearchResult">搜索</el-button></div>
                </div>
            </div>
            <div class="reslut-wrapper" v-if="resultData.length>0">
                <div class="result-page" v-loading="loading">
                    <div class="website-list">
                        <div class="item-website" v-for="(item,index) in resultData" v-bind:key="index">
                            <div class="item-wrap" v-bind:class="item.isDeleted =='1'?'is-delete':''">
                                <div class="item-content"><p><span>websiteID<br />{{item.ID}}<br /><strong v-if="item.isDeleted =='1'">激活时间：{{item.freeDate}}</strong></span></p></div>
                                <div class="item-button">
                                    <span v-on:click="previewWebsite(item)"><i class="iconfont icon-yulan"></i>站点预览</span>
                                    <span v-on:click="showWebsiteInfo(item)"><i class="iconfont icon-xinxi"></i>站点信息</span>
                                    <span v-if="item.isDeleted =='1'"><i class="iconfont icon-time"></i>激活中...</span>
                                    <span v-on:click="releaseWebsite(item)" v-else><i class="iconfont icon-jihuo"></i>激活站点</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ltw-page-panel" v-if="!isSinglePage">
                    <el-pagination
                        background
                        v-on:size-change="handleSizeChange"
                        v-on:current-change="handleCurrentChange"
                        v-on:prev-click="handlePrevPage"
                        v-on:next-click="handleNextPage"
                        v-bind:current-page="pageIndex"
                        v-bind:page-sizes="[15, 30, 45, 90]"
                        v-bind:page-size="pageSize"
                        v-bind:pager-count="9"
                        v-bind:hide-on-single-page="isSinglePage"
                        layout="total, sizes, prev, pager, next, jumper"
                        v-bind:total="totalSize"></el-pagination>
                </div>
            </div>
            <div class="empty-panel" v-else>
                <p>暂无已使用站点</p>
            </div>
        </div>
        <div class="search-wrapper" v-else>
            <div class="item-header">
                <span class="iconfont icon-back" v-on:click="goBack">返回</span>
                <div class="ltw-page-list">
                    <template v-for="(item,index) in websiteData.pageData">
                        <span class="iconfont" v-bind:class="[item.icon,item.isActive?'active':'']" v-bind:key="index" v-on:click="goPage(item)">{{item.name}}</span>
                    </template>
                </div>
            </div>
            <div class="ltw-view-panel" v-html="showCode" v-if="pageType=='indexModuleData'"></div>
            <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='aboutModuleData'"></div>
            <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='productListModuleData'"></div>
            <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='productDetailModuleData'"></div>
            <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='caseListModuleData'"></div>
            <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='caseDetailModuleData'"></div>
            <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='contactModuleData'"></div>
            <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='longTailWordModuleData'"></div>
        </div>
        <div class="abs-panel" v-if="isInfoDialog" v-bind:class="[isInfoDialog?'show':'hide']">
            <div class="website-info">
            <div class="info-header"><h2>站点信息</h2><span class="iconfont icon-close" v-on:click="closeInfoDialog"></span></div>
            <div class="info-body">
                <p>站点ID：{{websiteData.ID}}</p>
                <p>导航是否侧边固定：{{websiteData.headerFont}}</p>
                <h3 v-if="websiteData.publicModuleData.length>0">公共模块</h3>
                <div class="ltw-item-module" v-if="websiteData.publicModuleData.length>0">
                    <p v-for="(item,index) in websiteData.publicModuleData" v-bind:key="index">
                        <span>模块分类：<strong>{{item.name}}</strong></span>
                        <span>有效宽度：<strong>{{item.maxWidth}}</strong></span> 
                        <span>模块唯一标识类名：<strong>{{item.moduleGUID}}</strong></span> 
                        <span>添加人：<strong>{{item.author}}</strong></span> 
                    </p>
                </div>
                <h3 v-if="websiteData.pageData.length>0">页面模块</h3>
                <div class="ltw-item-module" v-if="websiteData.pageData.length>0">
                    <div class="item-page" v-for="(item,index) in websiteData.pageData" v-bind:key="index">
                        <h4>{{item.name}}</h4>
                        <p v-for="(items,indexs) in item.moduleData" v-bind:key="indexs">
                            <span>模块分类：<strong>{{items.name}}</strong></span>
                            <span>有效宽度：<strong>{{items.maxWidth}}</strong></span> 
                            <span>模块唯一标识类名：<strong>{{items.moduleGUID}}</strong></span> 
                            <span>添加人：<strong>{{items.author}}</strong></span> 
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'usedWebsitePage',
    data:function(){
        return{
            loading:false,
            ID:'',
            searchID:'',
            isPreview:false,
            isInfoDialog:false,
            isSinglePage:false,
            pageIndex:0,
            pageSize: 15,
            totalSize: 0,
            pageCount:0,
            pageType:'indexModuleData',
            showCode:'',
            publicData:{
                publicCssCode:'/*=========================================全局共用属性CSS nie ===============================================*/ a, abbr, acronym, address, big, blockquote, body, caption, cite, code, dd, dl, dt, fieldset, form, h1,time, h2, h3, h4, h5, h6, html, img, ins, kbd, label, legend, li, ol, p, pre, q, s, samp, small, span, strike, strong, ul {border:0; outline:0; } body{font-family:Arial,"Open Sans",sans-serif,"Heiti SC","Helvetica","HelveticaNeue","Droidsansfallback","Droid Sans";font-size:16px; line-height:32px; text-align:left; background:#fff;font-style: normal;font-weight:100;color:#5a5b5c; -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale; margin:0; padding:0;} article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section{display:block; } a:link,a:active,a:visited,a:hover {-webkit-tap-highlight-color:rgba(0,0,0,0); -webkit-tap-highlight-color:transparent; }/*解决在移动端上，事件监听的元素被点击的时候会被高亮显示*/ button{border-radius:0px; -webkit-border-radius:0px; outline:none; } input{border-radius: 0; -webkit-appearance : none; -webkit-border-radius:0px;}/*input在ios上圆角*/ input,select{border-radius:0; outline:none; } input[type="checkbox"]{-webkit-appearance :checkbox;} input:-ms-clear{display:none; }/*消除 IE10 里面的那个叉号*/ input,textarea{border:0; -webkit-appearance:none; } textarea {resize :none; outline:none; }/*去掉提交框右下角箭头*/ img{border:0; vertical-align:middle; MAX-WIDTH:100%!important; HEIGHT:auto!important; _width:expression(this.width > 100% ? "100%" :this.width)!important; } td{padding:8px 5px; } ul,li{list-style:none; } *{-webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; -webkit-touch-callout:none; margin:0; padding:0;} *:after,*:before{-webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; -webkit-touch-callout:none; margin:0; padding:0;} button{cursor:pointer; } /*这个可以不用*/ h1,h2,h3,h4,h5,h6 {font-weight: 700;font-variant: normal;white-space: normal;} /*全局的字体链接*/ a:link,a:visited{color:#42474e; text-decoration:none; } a:hover,a:active{color:rgb(212, 42, 42); text-decoration:underline; } .clearfix:after{content:"."; display:block; height:0; clear:both; visibility:hidden; font-size:0px; } .container{clear:both;width:1440px;margin:0 auto;padding: 0px;} .container-1280{clear:both;width:1280px;margin:0 auto;padding: 0px;}/*1280分辨率屏幕*/ .container-960{clear:both;width:960px;margin:0 auto;padding: 0px;}/*960分辨率屏幕*/ @media (max-width: 1600px) { body{line-height:28px;} .container{width:1280px;} } @media (max-width: 1440px) { body{line-height: 26px; font-size:14px;} .container{width:1120px;} } @media (max-width: 1280px) { body{line-height: 24px;} .container{width:960px;} .container-1280{width:960px;} } @media screen and (max-width: 992px){ .container{width:750px;} .container-1280{width:750px;} .container-960{width:750px;} } @media screen and (max-width: 782px){ .container,.container-1280,.container-960{width:100%;} }',
                publicHeaderHtmlCode:'',
                publicIndexBannerHtmlCode:'',
                publicOtherBannerHtmlCode:'',
                publicComboHeaderHtmlCode:'',
                publicOtherComboHeaderHtmlCode:'',
                publicDecorationHtmlCode:'',
                publicFooterHtmlCode:'',
                publicModuleCssCode:'',
                indexHtmlCode:'',
                indexCssCode:'',
                aboutHtmlCode:'',
                aboutCssCode:'',
                productListHtmlCode:'',
                productListCssCode:'',
                productDetailHtmlCode:'',
                productDetailCssCode:'',
                caseListHtmlCode:'',
                caseListCssCode:'',
                caseDetailHtmlCode:'',
                caseDetailCssCode:'',
                contactHtmlCode:'',
                contactCssCode:'',
                longTailWordHtmlCode:'',
                longTailWordCssCode:'',
                fixedIframeData:{
                    iframeHtmlCode1:'<div class="aside">',
                    iframeHtmlCode2:'</div><div class="main">',
                    iframeHtmlCode3:'</div>',
                    iframeCssCode:'.aside{width:240px;position:fixed;left:0;top:0;height:100vh;z-index:999;background:#ccc;}.main{clear:both;margin:0 auto;padding:0px 0px 0px 240px;}@media (max-width:1600px){.aside{position:static;height:auto;width:100%;padding:0;}.main{clear:both;margin:0 auto;padding:0;}}',
                },
            },
            websiteData:{
                publicModuleData:[],
                pageData:[]
            },
            resultData:[]
        }
    },
    created: function () {
        var $this = this;
        $this.getWebsiteList();
    },
    methods:{
        // 时间格式转化
        formateDate:function(datetime){
          function addZero(num){
            return (num < 10 ? "0" + num : num);
          }
          var d = new Date(datetime);
          var formatedatetime = d.getFullYear() + '-' + addZero(d.getMonth()+1) + '-' +addZero(d.getDate()) + ' ' + addZero(d.getHours()) + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());
          return formatedatetime;
        },
        // 获取站点列表数据
        getWebsiteList:function(){
            var $this = this;
            $this.loading = true;
            $this.$api.get('/api/Sites/GetSites?ID='+ $this.searchID + '&pageIndex='+ $this.pageIndex +'&pageSize='+ $this.pageSize,null,function(res){
                if(res.data.code ==1){
                    var websiteData = [];
                    console.log(res);
                    websiteData = res.data.data.data;
                    $this.totalSize = res.data.data.count;
                    $this.pageCount = Math.ceil(res.data.data.count/$this.pageSize);
                    if($this.pageCount ==1){
                        $this.isSinglePage = true;
                    }else{
                        $this.isSinglePage = false;
                    }
                    if(websiteData.length>0){
                        websiteData.forEach(function(item,index){
                            item.freeDate = $this.formateDate(item.freeDate);
                        });
                    }
                    $this.resultData = websiteData;
                    console.log($this.resultData);
                    $this.loading = false;
                    if($this.resultData.length==0){
                        $this.isWebsiteEmpty = true;
                    }
                }else{
                    $this.$alert(res.data.msg, '警告', {
                        confirmButtonText: '确定',
                    });
                    $this.loading = false;
                }
            });
        },
        // 每页显示条数改变时触发
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            var $this = this;
            $this.pageSize = val;
            $this.getWebsiteList();
        },
        // 当前页改变时触发
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            var $this = this;
            if(val <= $this.pageCount){
                $this.pageIndex = val;
                $this.getWebsiteList();
            }
        },
        // 上一页点击事件
        handlePrevPage(val) {
            console.log(`上一页： ${val} `);
            var $this = this;
        },
        // 下一页点击事件
        handleNextPage(val) {
            console.log(`下一页: ${val}`);
            var $this = this;
        },
        // 获取搜索结果
        getSearchResult:function(){
          var $this = this;
          $this.getWebsiteList();
        },
        // 返回站点列表页面
        goBack:function(){
            var $this = this;
            $this.isPreview = false;
        },
        // 预览站点页面
        previewWebsite:function(items){
            var $this = this;
            $this.isPreview = true;
            $this.ID = items.ID;
            $this.showCode = "";
            $this.publicHeaderHtmlCode='',
            $this.publicIndexBannerHtmlCode='',
            $this.publicOtherBannerHtmlCode='',
            $this.publicComboHeaderHtmlCode='',
            $this.publicOtherComboHeaderHtmlCode='',
            $this.publicDecorationHtmlCode='',
            $this.publicFooterHtmlCode='',
            $this.publicModuleCssCode='',
            $this.publicData.indexHtmlCode = "";
            $this.publicData.indexCssCode = "";
            $this.publicData.aboutHtmlCode = "";
            $this.publicData.aboutCssCode = "";
            $this.publicData.productListHtmlCode = "";
            $this.publicData.productListCssCode = "";
            $this.publicData.productDetailHtmlCode = "";
            $this.publicData.productDetailCssCode = "";
            $this.publicData.caseListHtmlCode = "";
            $this.publicData.caseListCssCode = "";
            $this.publicData.caseDetailHtmlCode = "";
            $this.publicData.caseDetailCssCode = "";
            $this.publicData.contactHtmlCode = "";
            $this.publicData.contactCssCode = "";
            $this.publicData.longTailWordHtmlCode = "";
            $this.publicData.longTailWordCssCode = "";
            $this.getWebsiteInfo();
        },
        // 预览页面切换页面点击事件
        goPage:function(items){
          var $this = this;
          if($this.websiteData.pageData.length>0){
            $this.websiteData.pageData.forEach(function(item,index){
              if(items.pageType == item.pageType){
                  if(!item.isActive){
                      item.isActive = true;
                      $this.pageType = item.pageType;
                      console.log($this.pageType);
                      if($this.pageType == 'indexModuleData'){
                          $this.showCode = "<style>" + $this.publicData.indexCssCode + "</style>" + $this.publicData.indexHtmlCode;
                      }else if($this.pageType == "aboutModuleData"){
                          $this.showCode = "<style>" + $this.publicData.aboutCssCode + "</style>" + $this.publicData.aboutHtmlCode;
                      }else if($this.pageType == "productListModuleData"){
                          $this.showCode = "<style>" + $this.publicData.productListCssCode + "</style>" + $this.publicData.productListHtmlCode;
                      }else if($this.pageType == "productDetailModuleData"){
                          $this.showCode = "<style>" + $this.publicData.productDetailCssCode + "</style>" + $this.publicData.productDetailHtmlCode;
                      }else if($this.pageType == "caseListModuleData"){
                          $this.showCode = "<style>" + $this.publicData.caseListCssCode + "</style>" + $this.publicData.caseListHtmlCode;
                      }else if($this.pageType == "caseDetailModuleData"){
                          $this.showCode = "<style>" + $this.publicData.caseDetailCssCode + "</style>" + $this.publicData.caseDetailHtmlCode;
                      }else if($this.pageType == "contactModuleData"){
                          $this.showCode = "<style>" + $this.publicData.contactCssCode + "</style>" + $this.publicData.contactHtmlCode;
                      }else if($this.pageType == "longTailWordModuleData"){
                          $this.showCode = "<style>" + $this.publicData.longTailWordCssCode + "</style>" + $this.publicData.longTailWordHtmlCode;
                      }
                  }
              }else{
                  item.isActive = false;
              }
            });
          }
        },
        // 打开站点信息弹窗
        showWebsiteInfo:function(items){
            var $this = this;
            $this.isInfoDialog = true;
            $this.ID = items.ID;
            $this.getWebsiteInfo();
        },
        // 关闭站点信息弹窗
        closeInfoDialog:function(){
            var $this = this;
            $this.isInfoDialog = false;
        },
        // 获取站点相关信息
        getWebsiteInfo:function(){
          var $this = this;
          $this.isLoading = true;
          var serverWebsiteData = {};
          $this.$api.get('/api/Sites/GetSiteDetail?ID='+$this.ID,null,function(res){
            if(res.data.code ==1){
              var serverWebsiteData = res.data.data;
              serverWebsiteData.headerFont = "";
              if(serverWebsiteData.headerFixed == "0"){
                  serverWebsiteData.headerFont = "否";
              }else{
                  serverWebsiteData.headerFont = "是";
              }
              if(serverWebsiteData.pageData.length>0){
                serverWebsiteData.pageData.forEach(function(item,index){
                  item.name = "";
                  item.isActive = false;
                  if(index == 0){
                      item.isActive = true;
                  }
                  if(item.pageType == "indexModuleData"){
                      item.name = "首页";
                      item.icon = "icon-home";
                  }else if(item.pageType == "aboutModuleData"){
                      item.name = "关于我们";
                      item.icon = "icon-about";
                  }else if(item.pageType == "productListModuleData"){
                      item.name = "产品列表";
                      item.icon = "icon-product";
                  }else if(item.pageType == "productDetailModuleData"){
                      item.name = "产品详情";
                      item.icon = "icon-article";
                  }else if(item.pageType == "caseListModuleData"){
                      item.name = "案例列表";
                      item.icon = "icon-case";
                  }else if(item.pageType == "caseDetailModuleData"){
                      item.name = "案例详情";
                      item.icon = "icon-detail";
                  }else if(item.pageType == "contactModuleData"){
                      item.name = "联系我们";
                      item.icon = "icon-contact";
                  }else if(item.pageType == "longTailWordModuleData"){
                      item.name = "长尾词页";
                      item.icon = "icon-ltw";
                  }
                });
              }
              if(serverWebsiteData.publicModuleData.length>0){
                serverWebsiteData.publicModuleData.forEach(function(item,index){
                    $this.publicData.publicModuleCssCode += item.cssCode;
                    item.name = "";
                    if(item.moduleType == "moduleHeader"){
                        $this.publicData.publicHeaderHtmlCode = item.htmlCode;
                        item.name = "页头";
                    }else if(item.moduleType == "moduleBanner"&&item.pageType == "index"){
                        $this.publicData.publicIndexBannerHtmlCode = item.htmlCode;
                        item.name = "banner";
                    }else if(item.moduleType == "moduleBanner"&&item.pageType != "index"){
                        $this.publicData.publicOtherBannerHtmlCode = item.htmlCode;
                        item.name = "banner";
                    }else if(item.moduleType == "moduleComboHeader"&&item.pageType == "index"){
                        $this.publicData.publicComboHeaderHtmlCode = item.htmlCode;
                        item.name = "组合页头";
                    }else if(item.moduleType == "moduleComboHeader"&&item.pageType != "index"){
                        $this.publicData.publicOtherComboHeaderHtmlCode = item.htmlCode;
                        item.name = "组合页头";
                    }else if(item.moduleType == "moduleDecoration"){
                        $this.publicData.publicDecorationHtmlCode = item.htmlCode;
                        item.name = "装饰模块";
                    }else{
                        $this.publicData.publicFooterHtmlCode += item.htmlCode;
                        if(item.moduleType == "moduleFooter"){
                            item.name = "页脚";
                        }else{
                            item.name = "留言板";
                        }
                    }
                });
              }
              if(serverWebsiteData.pageData.length>0){
                serverWebsiteData.pageData.forEach(function(item,index){
                  if(item.moduleData.length>0){
                    item.moduleData.forEach(function(items,indexs){
                        items.name = "";
                        switch(items.moduleType){
                            case "moduleImgList":
                                items.name = "图文列表";
                                break;
                            case "moduleFontList":
                                items.name = "文字列表";
                                break;
                            case "moduleComboList":
                                items.name = "组合列表";
                                break;
                            case "moduleCateList":
                                items.name = "分类列表";
                                break;
                            case "moduleImgArticle":
                                items.name = "图文详情";
                                break;
                            case "moduleMainArticle":
                                items.name = "正文详情";
                                break;
                            case "moduleComboArticle":
                                items.name = "组合详情";
                                break;
                            case "moduleComboLongTailWord":
                                items.name = "组合长尾词";
                                break;
                            case "moduleComboNews":
                                items.name = "组合新闻";
                                break;
                            case "moduleProfile":
                                items.name = "公司简介";
                                break;
                            case "moduleCulture":
                                items.name = "公司文化";
                                break;
                            case "moduleService":
                                items.name = "公司服务";
                                break;
                            case "modulePower":
                                items.name = "公司实力";
                                break;
                            case "modulePartner":
                                items.name = "国际合作";
                                break;
                            case "moduleContact":
                                items.name = "联系方式";
                                break;
                            case "moduleMessage":
                                items.name = "留言板";
                                break;
                            default:
                                items.name = "公共模块";
                                break;
                        }
                        if(item.pageType == "indexModuleData"){
                                $this.publicData.indexHtmlCode += items.htmlCode;
                                $this.publicData.indexCssCode += items.cssCode;
                        }else if(item.pageType == "aboutModuleData"){
                                $this.publicData.aboutHtmlCode += items.htmlCode;
                                $this.publicData.aboutCssCode += items.cssCode;
                        }else if(item.pageType == "productListModuleData"){
                                $this.publicData.productListHtmlCode += items.htmlCode;
                                $this.publicData.productListCssCode += items.cssCode;
                        }else if(item.pageType == "productDetailModuleData"){
                                $this.publicData.productDetailHtmlCode += items.htmlCode;
                                $this.publicData.productDetailCssCode += items.cssCode;
                        }else if(item.pageType == "caseListModuleData"){
                                $this.publicData.caseListHtmlCode += items.htmlCode;
                                $this.publicData.caseListCssCode += items.cssCode;
                        }else if(item.pageType == "caseDetailModuleData"){
                                $this.publicData.caseDetailHtmlCode += items.htmlCode;
                                $this.publicData.caseDetailCssCode += items.cssCode;
                        }else if(item.pageType == "contactModuleData"){
                                $this.publicData.contactHtmlCode += items.htmlCode;
                                $this.publicData.contactCssCode += items.cssCode;
                        }else if(item.pageType == "longTailWordModuleData"){
                                $this.publicData.longTailWordHtmlCode += items.htmlCode;
                                $this.publicData.longTailWordCssCode += items.cssCode;
                        }
                    });
                  }
                });
              }
              if($this.publicData.publicComboHeaderHtmlCode == ""){
                  if(serverWebsiteData.headerFixed == "0"){
                      $this.publicData.indexHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicIndexBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.indexHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.indexCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.indexCssCode;
                      $this.publicData.aboutHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.aboutHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.aboutCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.aboutCssCode;
                      $this.publicData.productListHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.productListHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.productListCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.productListCssCode;
                      $this.publicData.productDetailHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.productDetailHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.productDetailCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.productDetailCssCode;
                      $this.publicData.caseListHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.caseListHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.caseListCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.caseListCssCode;
                      $this.publicData.caseDetailHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.caseDetailHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.caseDetailCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.caseDetailCssCode;
                      $this.publicData.contactHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.contactHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.contactCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.contactCssCode;
                      $this.publicData.longTailWordHtmlCode = $this.publicData.publicHeaderHtmlCode + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.longTailWordHtmlCode + $this.publicData.publicFooterHtmlCode;
                      $this.publicData.longTailWordCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.longTailWordCssCode;
                  }else{
                      $this.publicData.indexHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode2 + $this.publicData.publicIndexBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.indexHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.indexCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.indexCssCode;
                      $this.publicData.aboutHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCod + $this.publicData.fixedIframeData.iframeHtmlCode2e + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.aboutHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.aboutCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.aboutCssCode;
                      $this.publicData.productListHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode2 + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.productListHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.productListCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.productListCssCode;
                      $this.publicData.productDetailHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode2 + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.productDetailHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.productDetailCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.productDetailCssCode;
                      $this.publicData.caseListHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode2 + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.caseListHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.caseListCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.caseListCssCode;
                      $this.publicData.caseDetailHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode2 + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.caseDetailHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.caseDetailCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.caseDetailCssCode;
                      $this.publicData.contactHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode2 + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.contactHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.contactCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.contactCssCode;
                      $this.publicData.longTailWordHtmlCode = $this.publicData.fixedIframeData.iframeHtmlCode1 + $this.publicData.publicHeaderHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode2 + $this.publicData.publicOtherBannerHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.longTailWordHtmlCode + $this.publicData.publicFooterHtmlCode + $this.publicData.fixedIframeData.iframeHtmlCode3;
                      $this.publicData.longTailWordCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.fixedIframeData.iframeCssCode + $this.publicData.longTailWordCssCode;
                  }
              }else{
                  $this.publicData.indexHtmlCode = $this.publicData.publicComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.indexHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.indexCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.indexCssCode;
                  $this.publicData.aboutHtmlCode = $this.publicData.publicOtherComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.aboutHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.aboutCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.aboutCssCode;
                  $this.publicData.productListHtmlCode = $this.publicData.publicOtherComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.productListHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.productListCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.productListCssCode;
                  $this.publicData.productDetailHtmlCode = $this.publicData.publicOtherComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.productDetailHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.productDetailCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.productDetailCssCode;
                  $this.publicData.caseListHtmlCode = $this.publicData.publicOtherComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.caseListHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.caseListCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.caseListCssCode;
                  $this.publicData.caseDetailHtmlCode = $this.publicData.publicOtherComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.caseDetailHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.caseDetailCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.caseDetailCssCode;
                  $this.publicData.contactHtmlCode = $this.publicData.publicOtherComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.contactHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.contactCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.contactCssCode;
                  $this.publicData.longTailWordHtmlCode = $this.publicData.publicOtherComboHeaderHtmlCode + $this.publicData.publicDecorationHtmlCode + $this.publicData.longTailWordHtmlCode + $this.publicData.publicFooterHtmlCode;
                  $this.publicData.longTailWordCssCode = $this.publicData.publicCssCode + $this.publicData.publicModuleCssCode + $this.publicData.longTailWordCssCode;
              }
              console.log(serverWebsiteData);
              $this.websiteData = serverWebsiteData;
              $this.showCode = "<style>" + $this.publicData.indexCssCode + "</style>" + $this.publicData.indexHtmlCode;
              console.log($this.showCode);
              $this.isLoading = false;
            }else{
              $this.$alert(res.data.msg, '警告', {
                confirmButtonText: '确定',
              });
              $this.isLoading = false;
            }
          });
        },
        // 激活站点点击事件
        releaseWebsite:function(items){
            var $this = this;
            $this.ID = items.ID;
            $this.$confirm('此操作将使该站点所有页面可被再次匹配, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $this.isLoading = true;
                $this.$api.post('/api/Sites/Delete?ID='+$this.ID,null,function(res){
                    if(res.data.code ==1){
                        $this.isLoading = false;
                        $this.getWebsiteList();
                        $this.$message({
                            type: 'success',
                            message: '激活成功!'
                        });
                    }else{
                        $this.$alert(res.data.msg, '警告', {
                            confirmButtonText: '确定',
                        });
                        $this.isLoading = false;
                    }
                });
            }).catch(() => {
                $this.$message({
                type: 'info',
                message: '已取消激活'
                });          
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.website-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 81px;
    position: relative;
}
.reslut-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding-bottom: 60px;
}
.ltw-page-panel{
    height: 60px;
    padding: 14px 50px 0;
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    border-top: 1px solid #e6e6e6;
    background: #fff;
    text-align: right;
}
.search-wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 53px;
  position: relative;
  .item-header{
    width: 100%;
    position: absolute;
    left:0;
    border-bottom: 1px solid #e6e6e6;
    overflow: hidden;
    padding: 10px;
    background: #f5f5f5;
    z-index: 11;
    top:0;
    span{
      display: inline-block;
      line-height: 30px;
      font-size: 14px;
      border: 1px solid #ddd;
      background: #fff;
      padding: 0 16px 0 5px;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 10px;
      &:before{
        display: block;
        float:left;
        width: 24px;
        text-align: center;
        font-size: 24px;
        line-height: 30px;
        font-weight: normal;
      }
    }
    span.icon-code{
      &:before{
        margin-right: 4px;
        font-size: 18px;
      }
    }
  }
}
.ltw-abs-search{
    width: 100%;
    @extend %clearfix;
    left:0;
    position: absolute;
    top:0;
    .ltw-menu-panel{
        width: 48px;
        height: 40px;
        border-radius: 0 0 4px 4px;
        background:#fff;
        border: 1px solid #ddd;
        border-top:none;
        position: absolute;
        left: 50%;
        margin-left: -24px;
        bottom:-40px;
        z-index: 2;
        font-size: 36px;
        text-align: center;
        color: red;
        line-height: 40px;
        cursor: pointer;
    }
    .ltw-search-wrap{
        width: 100%;
        overflow: hidden;
    }
}
.ltw-search-panel{
    width:100%;
    padding: 20px 40px;
    overflow: hidden;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .ltw-item-search{
        float:left;
        padding: 0 5px;
        .el-select{
            display: block;
        }
    }
    .ltw-module-select{
        width: 100%;
        margin-bottom: 10px;
    }
    .ltw-width-select,.ltw-author-select{
        width: 36%;
    }
    .ltw-guid-panel{
        width: calc(28% - 80px);
    }
}
.ltw-item-content{
    transition: .2s top linear;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
}
.result-page{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 30px 40px;
}

.website-list{
  margin: 0 -10px;
  @extend %clearfix;
  .item-website{
    width: 20%;
    float:left;
    padding: 0 10px;
    @extend %clearfix;
    margin-bottom: 20px;
    .item-wrap.is-delete{
        .item-content{
            background:#0dc416;
            p{
                span{
                  color: #fff;
                }
            }
        }
        .item-button{
            span{
                color: #333;
                i{
                    color: #333;
                }
            }
        }
    }
    .item-wrap{
      width: 100%;
      border: 1px solid #e6e6e6;
      border-radius: 10px;
      overflow: hidden;
      .item-content{
        height: 160px;
        padding: 20px;
        background: #e6e6e6;
        p{
          display: table;
          width: 100%;
          height: 100%;
          text-align: center;
          border-radius: 10px;
          span{
            display: table-cell;
            vertical-align: middle;
            font-size: 32px;
            line-height: 36px;
            color: #999;
            strong{
                font-size: 18px;
                line-height: 32px;
                font-weight: normal;
            }
          }
        }
      }
      .item-button{
        width: 100%;
        overflow: hidden;
        span{
          display: block;
          float:left;
          width:33.333333%;
          line-height: 40px;
          font-size: 16px;
          padding: 0 10px;
          cursor: pointer;
          transition: all .5s linear;
          color: #999;
          &:hover{
            background: #f5f5f5;
          }
          i{
            display: block;
            float:left;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            color: #999;
            margin-right:5px;
          }
        }
      }
    }
  }
}
.empty-panel{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: table;
  p{
    display: table-cell;
    font-size: 24px;
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
    color:#999;
    span{
      display: inline-block;
      margin: 0 6px;
      border: 1px solid $primary;
      color: #fff;
      padding: 5px 16px;
      border-radius: 4px;
      vertical-align: middle;
      transition: all .5s ease-in-out;
      background: $primary;
      cursor: pointer;
      &:hover{
        opacity: .8;
      }
    }
  }
}
.abs-panel.show{
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.abs-panel.hide{
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.abs-panel{
  position: absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  overflow: hidden;
  z-index: 1080;
  -webkit-transition: .4s all ease-in-out;
  transition: .4s all ease-in-out;
  &:after{
    content:'';
    display: block;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .5;
    position: absolute;
    left:0;
    top:0;
  }
  .website-info{
    width: 960px;
    height: 560px;
    border-radius: 4px;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -280px 0 0 -480px;
    background: #fff;
    z-index: 1;
    padding: 49px 0 0;
    .info-header{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 49px;
      background: #f5f5f5;
      border-bottom: 1px solid #e6e6e6;
      h2{
        float:left;
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        color: #333;
        padding: 0 20px;
      }
      span{
        display: block;
        width: 48px;
        height: 48px;
        float:right;
        text-align: center;
        line-height: 48px;
        font-size: 32px;
        color: #666;
        cursor: pointer;
      }
    }
    .info-body{
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 20px 40px 40px;
      >p{
          width: 100%;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
          margin-top: 10px;
      }
      h3{
          width: 100%;
          font-size: 20px;
          height: 48px;
          line-height: 48px;
          margin-top: 10px;
      }
      h4{
          width: 100%;
          font-size: 18px;
          height: 36px;
          line-height: 36px;
          margin-top: 10px;
      }
      .ltw-item-module{
          width: 100%;
          overflow: hidden;
          .item-page{
              width: 100%;
              overflow: hidden;
          }
          p{
              width: 100%;
              overflow: hidden;
              span{
                  display: inline-block;
                  margin-right: 20px;
                  height: 30px;
                  line-height: 30px;
                  font-size: 16px;
                  strong{
                      font-weight: bold;
                  }
              }
          }
      }
    }
  }
}
.ltw-page-list{
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    span{
        &:before{
            font-size: 18px!important;
        }
        &:hover{
            color: $primary;
            border: 1px solid $primary;
            &:before{
                color: $primary;
            }
        }
    }
    span.active{
        background: $primary;
        border: 1px solid $primary;
        color: #fff;
        &:hover{
            color: #fff;
            &:before{
                color: #fff;
            }
        }
    }
}
.ltw-view-panel{
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>