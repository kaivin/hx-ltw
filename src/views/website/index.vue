<template>
  <div class="page-root" v-loading="loading">
    <div class="search-wrapper" v-if="!isSearch&&!isPreview">
      <div class="item-header"><span class="iconfont icon-combo" v-on:click="showSearchPage">组合站点</span></div>
      <div class="result-page" v-if="resultData.length>0" v-loading="loading">
        <div class="website-list">
          <div class="item-website" v-for="(item,index) in resultData" v-bind:key="index">
            <div class="item-wrap">
              <div class="item-content" v-bind:class="item.bgColor"><p><span>websiteID<br />{{item.ID}}</span></p></div>
              <div class="item-button">
                <span v-on:click="previewWebsite(item)"><i class="iconfont icon-yulan"></i>站点预览</span>
                <span v-on:click="showWebsiteInfo(item)"><i class="iconfont icon-xinxi"></i>站点信息</span>
                <span v-on:click="downloadWebsite(item)"><i class="iconfont icon-zip"></i>站点下载</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty-panel" v-else>
        <p v-if="isWebsiteEmpty">该组合条件暂无可用站点数据，可重新进行<span v-on:click="showSearchPage">组合站点</span>的数据筛选</p>
        <p v-else>需要先进行<span v-on:click="showSearchPage">组合站点</span>的数据筛选</p>
      </div>
    </div>
    <div class="search-wrapper" v-else-if="isSearch&&!isPreview">
        <div class="item-header"><span class="iconfont icon-back" v-on:click="goBack">返回</span><span class="iconfont icon-code" v-on:click="getWebsiteList">生成站点</span></div>
      <div class="search-page">
        <div class="item-search" style="width: 140px;float:left;">
          <h2>公共样式</h2>
          <div class="item-body">
            <el-checkbox v-model="searchData.publicCssData.isSelected" v-bind:label="searchData.publicCssData.name" v-bind:disabled="searchData.publicCssData.isDisabled" border></el-checkbox>
          </div>
        </div>
        <div class="item-search" style="width: 400px;float:left">
          <h2>有效宽度</h2>
          <div class="item-body">
            <el-checkbox v-for="(item,index) in searchData.maxWidthData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeMaxWidthState(item)" v-bind:disabled="item.isDisabled" border></el-checkbox>
          </div>
        </div>
        <div class="item-search" style="width: 500px;float:left;">
          <h2>全局随机数据</h2>
          <div class="item-body">
            <el-radio v-for="(item,index) in searchData.randomData" v-bind:key="index" v-model="searchData.isRandom" v-bind:label="item.type" border>{{item.name}}</el-radio>
            <div class="inline-body" v-if="searchData.isRandom=='1'">
              <div class="inline-font left-font">各模块分别随机选择</div>
              <div class="inline-content num-input"><el-input v-model="searchData.randomQty" placeholder=""></el-input></div>
              <div class="inline-font">条数据</div>
            </div>
          </div>
        </div>
        <div class="ltw-clear ltw-line"></div>
        <div class="item-search">
          <h2>公共模块</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.publicModuleData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changePublicModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
          <div class="sub-search" v-if="searchData.publicModuleData.moduleData[0].isSelected">
            <h4>页头侧边固定</h4>
            <div class="item-body">
              <el-radio v-for="(item,index) in searchData.headerFixedData" v-bind:key="index" v-model="searchData.headerFixed" v-bind:label="item.type" v-on:change="changeHeaderFixedState(item)" border>{{item.name}}</el-radio>
            </div>
          </div>
        </div>
        <div class="ltw-clear ltw-line"></div>
        <div class="item-search">
          <h2>首页</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.indexData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeIndexModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
          <div class="sub-search" style="width: 520px;float:left;" v-if="searchData.indexData.moduleData[0].isSelected">
            <h4>关于我们包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.indexData.moduleData[0].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeIndexAboutState(item)" border></el-checkbox>
            </div>
          </div>
          <div class="sub-search" style="width: 270px;float:left;" v-if="searchData.indexData.moduleData[1].isSelected">
            <h4>热销产品包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.indexData.moduleData[1].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeIndexProductState(item)" border></el-checkbox>
            </div>
          </div>
          <div class="sub-search" style="width: 270px;float:left;" v-if="searchData.indexData.moduleData[2].isSelected">
            <h4>经典案例包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.indexData.moduleData[2].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeIndexCaseState(item)" border></el-checkbox>
            </div>
          </div>
        </div>
        <div class="ltw-clear ltw-line"></div>
        <div class="item-search">
          <h2>长尾词列表</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.longTailWordData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeLongTailWordModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
          <div class="sub-search" style="width: 270px;float:left;" v-if="searchData.longTailWordData.moduleData[2].isSelected">
            <h4>热销产品包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.longTailWordData.moduleData[2].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeHotProductState(item)" border></el-checkbox>
            </div>
          </div>
          <div class="sub-search" style="width: 380px;float:left;" v-if="searchData.longTailWordData.moduleData[4].isSelected">
            <h4>长尾词列表包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.longTailWordData.moduleData[4].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeProductListState(item)" border></el-checkbox>
            </div>
          </div>
        </div>
        <div class="ltw-clear ltw-line"></div>
        <div class="item-search" style="width: 900px;float:left;">
          <h2>关于我们</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.aboutData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeAboutModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search" style="width: 500px;float:left;">
          <h2>联系我们</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.contactData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeContactModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="ltw-clear ltw-line"></div>
        <div class="item-search" style="width: 490px;float:left;">
          <h2>产品列表</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.productListData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeProductListModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search" style="width: 680px;float:left;">
          <h2>产品详情</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.productDetailData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeProductDetailModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="ltw-clear ltw-line"></div>
        <div class="item-search" style="width: 490px;float:left;">
          <h2>案例列表</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.caseListData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeCaseListModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search" style="width: 680px;float:left;">
          <h2>案例详情</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.caseDetailData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeCaseDetailModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="ltw-clear ltw-line"></div>
      </div>
    </div>
    <div class="search-wrapper" v-else-if="!isSearch&&isPreview">
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
    <div class="abs-dialog" v-bind:class="[searchDialog.isSearchDialog?'show':'hide']">
      <div class="dialog-panel">
        <div class="dialog-header"><h2>{{searchDialog.searchDialogTitle}}</h2><span class="iconfont icon-close" v-on:click="closeDialog"></span></div>
        <div class="dialog-body">
          <module-header-search v-if="searchDialog.dialogType=='moduleHeader'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-header-search>
          <module-footer-search v-if="searchDialog.dialogType=='moduleFooter'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-footer-search>
          <module-banner-search v-if="searchDialog.dialogType=='moduleBanner'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-banner-search>
          <module-combo-header-search v-if="searchDialog.dialogType=='moduleComboHeader'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-combo-header-search>
          <module-decoration-search v-if="searchDialog.dialogType=='moduleDecoration'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-decoration-search>
          <module-index-about v-if="searchDialog.dialogType=='indexAbout'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-index-about>
          <module-index-product v-if="searchDialog.dialogType=='indexProduct'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-index-product>
          <module-index-case v-if="searchDialog.dialogType=='indexCase'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-index-case>
          <module-index-news v-if="searchDialog.dialogType=='indexNews'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-index-news>
          <module-index-combo-news v-if="searchDialog.dialogType=='indexComboNews'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-index-combo-news>
          <module-profile-search v-if="searchDialog.dialogType=='moduleProfile'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-profile-search>
          <module-culture-search v-if="searchDialog.dialogType=='moduleCulture'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-culture-search>
          <moduleServiceSearch v-if="searchDialog.dialogType=='moduleService'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></moduleServiceSearch>
          <module-power-search v-if="searchDialog.dialogType=='modulePower'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-power-search>
          <module-partner-search v-if="searchDialog.dialogType=='modulePartner'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-partner-search>
          <product-cate-list v-if="searchDialog.dialogType=='productCateList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></product-cate-list>
          <product-img-list v-if="searchDialog.dialogType=='productImgList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></product-img-list>
          <product-combo-list v-if="searchDialog.dialogType=='productComboList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></product-combo-list>
          <case-cate-list v-if="searchDialog.dialogType=='caseCateList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></case-cate-list>
          <case-img-list v-if="searchDialog.dialogType=='caseImgList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></case-img-list>
          <case-combo-list v-if="searchDialog.dialogType=='caseComboList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></case-combo-list>
          <product-img-article v-if="searchDialog.dialogType=='productImgArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></product-img-article>
          <product-main-article v-if="searchDialog.dialogType=='productMainArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></product-main-article>
          <product-message v-if="searchDialog.dialogType=='productMessage'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></product-message>
          <product-combo-article v-if="searchDialog.dialogType=='productComboArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></product-combo-article>
          <case-img-article v-if="searchDialog.dialogType=='caseImgArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></case-img-article>
          <case-main-article v-if="searchDialog.dialogType=='caseMainArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></case-main-article>
          <case-message v-if="searchDialog.dialogType=='caseMessage'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></case-message>
          <case-combo-article v-if="searchDialog.dialogType=='caseComboArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></case-combo-article>
          <module-contact v-if="searchDialog.dialogType=='moduleContact'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-contact>
          <contact-message v-if="searchDialog.dialogType=='contactMessage'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></contact-message>
          <module-ltw-img-article v-if="searchDialog.dialogType=='longTailWordImgArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-img-article>
          <module-ltw-main-article v-if="searchDialog.dialogType=='longTailWordMainArticle'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-main-article>
          <module-ltw-product v-if="searchDialog.dialogType=='longTailWordProduct'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-product>
          <module-ltw-message v-if="searchDialog.dialogType=='longTailWordMessage'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-message>
          <module-ltw-about-news v-if="searchDialog.dialogType=='longTailWordHotList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-about-news>
          <module-ltw-list v-if="searchDialog.dialogType=='longTailWordList'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-list>
          <module-ltw-combo v-if="searchDialog.dialogType=='moduleComboLongTailWord'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-combo>
          <module-ltw-combo-news v-if="searchDialog.dialogType=='longTailWordComboNews'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-combo-news>
        </div>
        <div class="dialog-footer">
          <el-button type="primary" v-on:click="closeDialog">确定</el-button>
        </div>
      </div>
    </div>
    <div class="abs-panel" v-if="isInfoDialog" v-bind:class="[isInfoDialog?'show':'hide']">
      <div class="website-info">
        <div class="info-header"><h2>站点信息</h2><span class="iconfont icon-close" v-on:click="closeInfoDialog"></span></div>
        <div class="info-body" v-loading="loading">
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
              <template v-for="(item,index) in websiteData.pageData">
              <div class="item-page" v-bind:key="index" v-if="item.moduleData.length>0">
                  <h4>{{item.name}}</h4>
                  <p v-for="(items,indexs) in item.moduleData" v-bind:key="indexs">
                      <span>模块分类：<strong>{{items.name}}</strong></span>
                      <span>有效宽度：<strong>{{items.maxWidth}}</strong></span> 
                      <span>模块唯一标识类名：<strong>{{items.moduleGUID}}</strong></span> 
                      <span>添加人：<strong>{{items.author}}</strong></span> 
                  </p>
              </div>
              </template>
          </div>
        </div>
      </div>
    </div>
    <div class="abs-panel ltw-download" v-bind:class="[downloadData.isDownload?'show':'hide']">
      <div class="website-info">
        <div class="info-header"><h2>站点下载</h2><span class="iconfont icon-close" v-on:click="closeDownloadDialog"></span></div>
        <div class="info-body">
          <div class="ltw-item-form">
              <div class="ltw-item-title">站点公司名称：</div>
              <div class="ltw-item-body">
                  <el-input v-model="downloadData.companyName" placeholder="该站点的公司名称，如logo包含公司名，则必须与logo一致"></el-input>
              </div>
          </div>
          <div class="ltw-item-form">
              <div class="ltw-item-title">后台程序语言：</div>
              <div class="ltw-item-body">
                  <el-radio v-for="(item,index) in downloadData.oolData" v-bind:key="index" v-model="downloadData.selectedOol" v-bind:label="item.type" v-on:change="changeOolState" border>{{item.name}}</el-radio>
              </div>
          </div>
        </div>
        <div class="dialog-footer">
          <el-button type="primary" v-on:click="downloadZIP">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {publicCode}  from '@/utils/index.js'
import moduleHeaderSearch from '@/components/moduleHeaderSearch/index.vue';
import moduleFooterSearch from '@/components/moduleFooterSearch/index.vue';
import moduleBannerSearch from '@/components/moduleBannerSearch/index.vue';
import moduleComboHeaderSearch from '@/components/moduleComboHeaderSearch/index.vue';
import moduleDecorationSearch from '@/components/moduleDecorationSearch/index.vue';
import moduleIndexAbout from '@/components/moduleIndexAbout/index.vue';
import moduleIndexProduct from '@/components/moduleIndexProduct/index.vue';
import moduleIndexCase from '@/components/moduleIndexCase/index.vue';
import moduleIndexNews from '@/components/moduleIndexNews/index.vue';
import moduleIndexComboNews from '@/components/moduleIndexComboNews/index.vue';
import moduleProfileSearch from '@/components/moduleProfileSearch/index.vue';
import moduleCultureSearch from '@/components/moduleCultureSearch/index.vue';
import moduleServiceSearch from '@/components/moduleServiceSearch/index.vue';
import modulePowerSearch from '@/components/modulePowerSearch/index.vue';
import modulePartnerSearch from '@/components/modulePartnerSearch/index.vue';
import productCateList from '@/components/productCateList/index.vue';
import productImgList from '@/components/productImgList/index.vue';
import productComboList from '@/components/productComboList/index.vue';
import caseCateList from '@/components/caseCateList/index.vue';
import caseImgList from '@/components/caseImgList/index.vue';
import caseComboList from '@/components/caseComboList/index.vue';
import productImgArticle from '@/components/productImgArticle/index.vue';
import productMainArticle from '@/components/productMainArticle/index.vue';
import productMessage from '@/components/productMessage/index.vue';
import productComboArticle from '@/components/productComboArticle/index.vue';
import caseImgArticle from '@/components/caseImgArticle/index.vue';
import caseMainArticle from '@/components/caseMainArticle/index.vue';
import caseMessage from '@/components/caseMessage/index.vue';
import caseComboArticle from '@/components/caseComboArticle/index.vue';
import moduleContact from '@/components/moduleContact/index.vue';
import contactMessage from '@/components/contactMessage/index.vue';
import moduleLtwImgArticle from '@/components/moduleLtwImgArticle/index.vue';
import moduleLtwMainArticle from '@/components/moduleLtwMainArticle/index.vue';
import moduleLtwProduct from '@/components/moduleLtwProduct/index.vue';
import moduleLtwMessage from '@/components/moduleLtwMessage/index.vue';
import moduleLtwList from '@/components/moduleLtwList/index.vue';
import moduleLtwAboutNews from '@/components/moduleLtwAboutNews/index.vue';
import moduleLtwCombo from '@/components/moduleLtwCombo/index.vue';
import moduleLtwComboNews from '@/components/moduleLtwComboNews/index.vue';
export default {
    name: 'websitePage',
    components:{
      "module-header-search":moduleHeaderSearch,
      "module-footer-search":moduleFooterSearch,
      "module-banner-search":moduleBannerSearch,
      "module-combo-header-search":moduleComboHeaderSearch,
      "module-decoration-search":moduleDecorationSearch,
      "module-index-about":moduleIndexAbout,
      "module-index-product":moduleIndexProduct,
      "module-index-case":moduleIndexCase,
      "module-index-news":moduleIndexNews,
      "module-index-combo-news":moduleIndexComboNews,
      "module-profile-search":moduleProfileSearch,
      "module-culture-search":moduleCultureSearch,
      "module-service-search":moduleServiceSearch,
      "module-power-search":modulePowerSearch,
      "module-partner-search":modulePartnerSearch,
      "product-cate-list":productCateList,
      "product-img-list":productImgList,
      "product-combo-list":productComboList,
      "case-cate-list":caseCateList,
      "case-img-list":caseImgList,
      "case-combo-list":caseComboList,
      "product-img-article":productImgArticle,
      "product-main-article":productMainArticle,
      "product-message":productMessage,
      "product-combo-article":productComboArticle,
      "case-img-article":caseImgArticle,
      "case-main-article":caseMainArticle,
      "case-message":caseMessage,
      "case-combo-article":caseComboArticle,
      "module-contact":moduleContact,
      "contact-message":contactMessage,
      "module-ltw-img-article":moduleLtwImgArticle,
      "module-ltw-main-article":moduleLtwMainArticle,
      "module-ltw-product":moduleLtwProduct,
      "module-ltw-message":moduleLtwMessage,
      "module-ltw-list":moduleLtwList,
      "module-ltw-about-news":moduleLtwAboutNews,
      "module-ltw-combo":moduleLtwCombo,
      "module-ltw-combo-news":moduleLtwComboNews,
    },
    data: function(){
      return {
        loading: false,
        ID:'',
        isSearch: false,
        isWebsiteEmpty:false,
        isPreview:false,
        isInfoDialog:false,
        pageType:'indexModuleData',
        showCode:'',
        publicData:{
            publicCssCode:'',
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
            fixedIframeData:'',
        },
        searchDialog:{
          isSearchDialog:false,
          searchDialogTitle:'',
          dialogType:'',
        },
        searchData:{
          publicCssData:{isSelected:true,isDisabled:true,name:'公共样式',publicCssCode:publicCode.publicCssCode},
          selectedMaxWidth:['100%','1280'],
          maxWidthData:[
              {type:"100%",name:"通屏",isSelected:true,isDisabled:false},
              {type:"1440",name:"1440",isSelected:false,isDisabled:false},
              {type:"1280",name:"1280",isSelected:true,isDisabled:false},
              {type:"960",name:"960",isSelected:false,isDisabled:false},
          ],
          publicModuleData:{
            moduleData:[
              {type:'moduleHeader',name:'页头',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleHeader'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'moduleBanner',name:'banner',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleBanner'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'moduleComboHeader',name:'组合页头',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'moduleDecoration',name:'装饰模块',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'moduleFooter',name:'页脚',isSelected:true,isDisabled:true,
                selectedModuleType:['moduleFooter'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          isRandom:"1",
          randomData:[
              {type:'1',name:"是"},
              {type:'0',name:"否"},
          ],
          randomQty:"3",
          headerFixed:"0",
          headerFixedData:[
              {type:'1',name:"是"},
              {type:'0',name:"否"},
          ],
          fixedIframeData:publicCode.fixedIframeData,
          indexData:{
            moduleData:[
              {type:'indexAbout',name:'关于我们',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleProfile','moduleCulture','moduleService','modulePower'],
                sonData:[
                  {type:'moduleProfile',name:'公司简介',isSelected:true,isDisabled:false},
                  {type:'moduleCulture',name:'公司文化',isSelected:true,isDisabled:false},
                  {type:'moduleService',name:'公司服务',isSelected:true,isDisabled:false},
                  {type:'modulePower',name:'公司实力',isSelected:true,isDisabled:false},
                ],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'indexProduct',name:'热销产品',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgList','moduleComboList'],
                sonData:[
                  {type:'moduleImgList',name:'图文列表',isSelected:true,isDisabled:false},
                  {type:'moduleComboList',name:'组合列表',isSelected:true,isDisabled:false},
                ],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'indexCase',name:'经典案例',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgList','moduleComboList'],
                sonData:[
                  {type:'moduleImgList',name:'图文列表',isSelected:true,isDisabled:false},
                  {type:'moduleComboList',name:'组合列表',isSelected:true,isDisabled:false},
                ],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'indexNews',name:'热点新闻',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleFontList'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'indexComboNews',name:'组合新闻',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleComboNews'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          aboutData:{
            moduleData:[
              {type:'moduleProfile',name:'公司简介',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleProfile'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'moduleCulture',name:'公司文化',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleCulture'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'moduleService',name:'公司服务',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleService'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'modulePower',name:'公司实力',isSelected:true,isDisabled:false,
                selectedModuleType:['modulePower'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'modulePartner',name:'国际合作',isSelected:true,isDisabled:false,
                selectedModuleType:['modulePartner'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          productListData:{
            moduleData:[
              {type:'productCateList',name:'分类列表',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleCateList'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'productImgList',name:'图文列表',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgList'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'productComboList',name:'组合列表',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          productDetailData:{
            moduleData:[
              {type:'productImgArticle',name:'图文详情',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgArticle'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'productMainArticle',name:'正文详情',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleMainArticle'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'productMessage',name:'留言板',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleMessage'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'productComboArticle',name:'组合详情',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          caseListData:{
            moduleData:[
              {type:'caseCateList',name:'分类列表',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleCateList'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'caseImgList',name:'图文列表',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgList'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'caseComboList',name:'组合列表',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          caseDetailData:{
            moduleData:[
              {type:'caseImgArticle',name:'图文详情',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgArticle'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'caseMainArticle',name:'正文详情',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleMainArticle'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'caseMessage',name:'留言板',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleMessage'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'caseComboArticle',name:'组合详情',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          contactData:{
            moduleData:[
              {type:'moduleContact',name:'联系方式',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleContact'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'contactMessage',name:'留言板',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleMessage'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
          longTailWordData:{
            moduleData:[
              {type:'longTailWordImgArticle',name:'图文详情',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'longTailWordMainArticle',name:'正文详情',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'longTailWordProduct',name:'热销产品',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgList','moduleComboList'],
                sonData:[
                  {type:'moduleImgList',name:'图文列表',isSelected:true,isDisabled:false},
                  {type:'moduleComboList',name:'组合列表',isSelected:true,isDisabled:false},
                ],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'longTailWordMessage',name:'留言板',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleMessage'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'longTailWordList',name:'长尾词列表',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleImgList','moduleFontList','moduleComboList'],
                sonData:[
                  {type:'moduleImgList',name:'图文列表',isSelected:true,isDisabled:false},
                  {type:'moduleFontList',name:'文字列表',isSelected:true,isDisabled:false},
                  {type:'moduleComboList',name:'组合列表',isSelected:true,isDisabled:false},
                ],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'longTailWordHotList',name:'相关长尾词',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleFontList'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'moduleComboLongTailWord',name:'组合长尾词',isSelected:false,isDisabled:false,
                selectedModuleType:[],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
              {type:'longTailWordComboNews',name:'组合新闻',isSelected:true,isDisabled:false,
                selectedModuleType:['moduleComboNews'],
                sonData:[],
                settingData:{
                  randomQty:"3",
                  isRandom:"1",
                  randomData:[
                      {type:'1',name:"是"},
                      {type:'0',name:"否"},
                  ],
                  listData:[],
                  moduleGUID:'',
                  selectedData:[]
                }
              },
            ]
          },
        },
        requestionData:{},
        websiteData:{
          publicModuleData:[],
          pageData:[],
        },
        resultData:[],
        downloadData:{
          isDownload:false,
          companyName:'',
          selectedOol:'',
          oolData:[
            {type:".NET",name:'.net语言'},
            {type:"PHP",name:'php语言'}
          ],
        }
      }
    },
    mounted(){
        var $this = this;
        $this.getPublicCode();
    },
    methods:{
      getPublicCode:function(){
          var $this = this;
          var publicCodes = publicCode();
          $this.publicData.publicCssCode = publicCodes.publicCssCode;
          $this.searchData.publicCssData.publicCssCode = publicCodes.publicCssCode;
          $this.publicData.fixedIframeData = publicCodes.fixedIframeData;
          console.log($this.publicData.fixedIframeData);
      },
      // 有效宽度点击切换触发事件
      changeMaxWidthState:function(items){
        var $this = this;
        if(items.type=="1440"&&$this.searchData.headerFixed=="1"){
            $this.$alert('1440有效宽度不适用于侧边导航固定框架', '警告', {
                confirmButtonText: '确定',
            });
            $this.searchData.maxWidthData[1].isSelected = false;
            return false;
        }
        $this.searchData.maxWidthData.forEach(function(item,index){
          if(items.type!=="100%"&&item.type!==items.type&&item.type!='100%'){
            item.isSelected=false;
          }
        });
        $this.searchData.selectedMaxWidth=[];
        $this.searchData.maxWidthData.forEach(function(item,index){
          if(item.isSelected){
            $this.searchData.selectedMaxWidth.push(item.type);
          }
        });
        console.log($this.searchData.selectedMaxWidth);
      },
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
      // 页头侧边固定点击切换触发事件
      changeHeaderFixedState:function(items){
        var $this = this;
        var len = $this.getMaxWidthLength();
        if(items.type=='1'){
          if(len<=0){
            $this.$alert('请先选择有效宽度', '警告', {
                confirmButtonText: '确定',
            });
            $this.searchData.headerFixed = "";
            return false;
          }else{
            if($this.searchData.maxWidthData[1].isSelected){
              $this.$alert('1440有效宽度不适用于侧边导航固定框架', '警告', {
                  confirmButtonText: '确定',
              });
              $this.searchData.headerFixed = "";
              return false;
            }
          }
        }
      },
      // 公共模块点击切换触发事件
      changePublicModuleState:function(items){
        var $this = this;
        $this.searchData.publicModuleData.moduleData.forEach(function(item,index){
          if(items.type == "moduleHeader"||items.type == "moduleBanner"){
            if(items.isSelected){
              if(item.type=="moduleHeader"||item.type=="moduleBanner"){
                item.isSelected = true;
                item.selectedModuleType.push(item.type);
              }else if(item.type=="moduleComboHeader"){
                item.selectedModuleType = [];
                item.isSelected = false;
              }
            }else{
              if(item.type=="moduleHeader"||item.type=="moduleBanner"){
                item.selectedModuleType = [];
                item.isSelected = false;
              }else if(item.type=="moduleComboHeader"){
                item.isSelected = true;
                item.selectedModuleType.push(item.type);
              }
            }
          }
          if(items.type == "moduleComboHeader"){
            if(items.isSelected){
              if(items.type == item.type){
                item.selectedModuleType.push(item.type);
              }else{
                if(item.type=="moduleHeader"||item.type=="moduleBanner"){
                  item.selectedModuleType = [];
                  item.isSelected = false;
                }
              }
            }else{
              if(items.type == item.type){
                  item.selectedModuleType = [];
              }else{
                if(item.type=="moduleHeader"||item.type=="moduleBanner"){
                  item.isSelected = true;
                  item.selectedModuleType.push(item.type);
                }
              }
            }
          }
          if(items.type == "moduleDecoration"&&items.type == item.type){
            if(items.isSelected){
              item.selectedModuleType.push(item.type);
            }else{
              item.selectedModuleType = [];
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 显示弹窗点击事件
      showDialog:function(items){
        var $this = this;
        $this.searchDialog.isSearchDialog = true;
        $this.searchDialog.searchDialogTitle = "编辑"+items.name+"筛选条件";
        $this.searchDialog.dialogType = items.type;
      },
      // 关闭筛选条件弹窗
      closeDialog:function(){
        var $this = this;
        $this.searchDialog.isSearchDialog = false;
      },
      // 监听并获取模块子组件数据改变
      getModuleChanged:function(obj){
        var $this = this;
        $this.searchData = obj;
      },
      // 首页模块选中状态改变事件
      changeIndexModuleState:function(items){
        var $this = this;
        $this.searchData.indexData.moduleData.forEach(function(item,index){
          if(items.type == item.type&&items.type=="indexNews"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleFontList");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type=="indexComboNews"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleComboNews");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type==item.type&&items.type == "indexAbout"){
            if(item.isSelected){
              $this.searchData.indexData.moduleData[0].selectedModuleType = ['moduleProfile','moduleCulture','moduleService','modulePower'];
              $this.searchData.indexData.moduleData[0].sonData.forEach(function(item1,index1){
                item1.isSelected = true;
              });
            }else{
              $this.searchData.indexData.moduleData[0].selectedModuleType = [];
              $this.searchData.indexData.moduleData[0].sonData.forEach(function(item1,index1){
                item1.isSelected = false;
              });
            }
          }
          if(items.type==item.type&&items.type == "indexProduct"){
            if(item.isSelected){
              $this.searchData.indexData.moduleData[1].selectedModuleType = ['moduleImgList','moduleComboList'];
              $this.searchData.indexData.moduleData[1].sonData.forEach(function(item1,index1){
                item1.isSelected = true;
              });
            }else{
              $this.searchData.indexData.moduleData[1].selectedModuleType = [];
              $this.searchData.indexData.moduleData[1].sonData.forEach(function(item1,index1){
                item1.isSelected = false;
              });
            }
          }
          if(items.type==item.type&&items.type == "indexCase"){
            if(item.isSelected){
              $this.searchData.indexData.moduleData[2].selectedModuleType = ['moduleImgList','moduleComboList'];
              $this.searchData.indexData.moduleData[2].sonData.forEach(function(item1,index1){
                item1.isSelected = true;
              });
            }else{
              $this.searchData.indexData.moduleData[2].selectedModuleType = [];
              $this.searchData.indexData.moduleData[2].sonData.forEach(function(item1,index1){
                item1.isSelected = false;
              });
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 首页的关于我们模块包换模块选中状态改变事件
      changeIndexAboutState:function(items){
        var $this = this;
        $this.searchData.indexData.moduleData[0].selectedModuleType = [];
        $this.searchData.indexData.moduleData[0].sonData.forEach(function(item,index){
          if(item.isSelected){
            $this.searchData.indexData.moduleData[0].selectedModuleType.push(item.type);
          }
        });
        console.log($this.searchData.indexData.moduleData[0].selectedModuleType);
      },
      // 首页的热销产品模块包换模块选中状态改变事件
      changeIndexProductState:function(items){
        var $this = this;
        $this.searchData.indexData.moduleData[1].selectedModuleType = [];
        $this.searchData.indexData.moduleData[1].sonData.forEach(function(item,index){
          if(item.isSelected){
            $this.searchData.indexData.moduleData[1].selectedModuleType.push(item.type);
          }
        });
        console.log($this.searchData.indexData.moduleData[1].selectedModuleType);
      },
      // 首页的经典案例模块包换模块选中状态改变事件
      changeIndexCaseState:function(items){
        var $this = this;
        $this.searchData.indexData.moduleData[2].selectedModuleType = [];
        $this.searchData.indexData.moduleData[2].sonData.forEach(function(item,index){
          if(item.isSelected){
            $this.searchData.indexData.moduleData[2].selectedModuleType.push(item.type);
          }
        });
        console.log($this.searchData.indexData.moduleData[2].selectedModuleType);
      },
      // 关于我们模块选中状态改变事件
      changeAboutModuleState:function(items){
        var $this = this;
        $this.searchData.aboutData.moduleData.forEach(function(item,index){
          if(items.type == item.type&&item.isSelected){
            item.selectedModuleType.push(item.type);
          }else{
            item.selectedModuleType = [];
          }
        });
        console.log(items.selectedModuleType);
      },
      // 产品列表模块选中状态改变事件
      changeProductListModuleState:function(items){
        var $this = this;
        $this.searchData.productListData.moduleData.forEach(function(item,index){
          if(items.type=="productCateList"||items.type == "productImgList"){
            if(items.isSelected){
              if(item.type == "productComboList"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="productCateList"||item.type == "productImgList"){
                item.isSelected = true;
                if(item.type=="productCateList"){
                  item.selectedModuleType = ["moduleCateList"];
                }
                if(item.type == "productImgList"){
                  item.selectedModuleType = ["moduleImgList"];
                }
              }
            }else{
              if(item.type == "productComboList"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboList"];
              }
              if(item.type=="productCateList"||item.type == "productImgList"){
                item.isSelected = false;
                if(item.type=="productCateList"){
                  item.selectedModuleType = [];
                }
                if(item.type == "productImgList"){
                  item.selectedModuleType = [];
                }
              }
            }
          }
          if(items.type=="productComboList"){
            if(items.isSelected){
              if(item.type == "productComboList"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboList"];
              }
              if(item.type=="productCateList"||item.type == "productImgList"){
                item.isSelected = false;
                if(item.type=="productCateList"){
                  item.selectedModuleType = [];
                }
                if(item.type == "productImgList"){
                  item.selectedModuleType = [];
                }
              }
            }else{
              if(item.type == "productComboList"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="productCateList"||item.type == "productImgList"){
                item.isSelected = true;
                if(item.type=="productCateList"){
                  item.selectedModuleType = ["moduleCateList"];
                }
                if(item.type == "productImgList"){
                  item.selectedModuleType = ["moduleImgList"];
                }
              }
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 产品详情模块选中状态改变事件
      changeProductDetailModuleState:function(items){
        var $this = this;
        $this.searchData.productDetailData.moduleData.forEach(function(item,index){
          if(items.type=="productImgArticle"||items.type == "productMainArticle"||items.type == "productMessage"){
            if(items.isSelected){
              if(item.type=="productImgArticle"||item.type == "productMainArticle"||item.type == "productMessage"){
                item.isSelected = true;
                if(item.type == "productImgArticle"){
                    item.selectedModuleType = ["moduleImgArticle"];
                }
                if(item.type == "productMainArticle"){
                    item.selectedModuleType = ["moduleMainArticle"];
                }
                if(item.type == "productMessage"){
                    item.selectedModuleType = ["moduleMessage"];
                }
              }
              if(item.type == "productComboArticle"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
            }else{
              if(item.type=="productImgArticle"||item.type == "productMainArticle"||item.type == "productMessage"){
                item.isSelected = false;
                if(item.type == "productImgArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "productMainArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "productMessage"){
                    item.selectedModuleType = [];
                }
              }
              if(item.type == "productComboArticle"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboArticle"];
              }
            }
          }
          if(items.type=="productComboArticle"){
            if(items.isSelected){
              if(item.type == "productComboArticle"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboArticle"];
              }
              if(item.type=="productImgArticle"||item.type == "productMainArticle"||item.type == "productMessage"){
                item.isSelected = false;
                if(item.type == "productImgArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "productMainArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "productMessage"){
                    item.selectedModuleType = [];
                }
              }
            }else{
              if(item.type=="productImgArticle"||item.type == "productMainArticle"||item.type == "productMessage"){
                item.isSelected = true;
                if(item.type == "productImgArticle"){
                    item.selectedModuleType = ["moduleImgArticle"];
                }
                if(item.type == "productMainArticle"){
                    item.selectedModuleType = ["moduleMainArticle"];
                }
                if(item.type == "productMessage"){
                    item.selectedModuleType = ["moduleMessage"];
                }
              }
              if(item.type == "productComboArticle"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 案例列表模块选中状态改变事件
      changeCaseListModuleState:function(items){
        var $this = this;
        $this.searchData.caseListData.moduleData.forEach(function(item,index){
          if(items.type=="caseCateList"||items.type == "caseImgList"){
            if(items.isSelected){
              if(item.type == "caseComboList"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="caseCateList"||item.type == "caseImgList"){
                item.isSelected = true;
                if(item.type=="caseCateList"){
                  item.selectedModuleType = ["moduleCateList"];
                }
                if(item.type == "caseImgList"){
                  item.selectedModuleType = ["moduleImgList"];
                }
              }
            }else{
              if(item.type == "caseComboList"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboList"];
              }
              if(item.type=="caseCateList"||item.type == "caseImgList"){
                item.isSelected = false;
                if(item.type=="caseCateList"){
                  item.selectedModuleType = [];
                }
                if(item.type == "caseImgList"){
                  item.selectedModuleType = [];
                }
              }
            }
          }
          if(items.type=="caseComboList"){
            if(items.isSelected){
              if(item.type == "caseComboList"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboList"];
              }
              if(item.type=="caseCateList"||item.type == "caseImgList"){
                item.isSelected = false;
                if(item.type=="caseCateList"){
                  item.selectedModuleType = [];
                }
                if(item.type == "caseImgList"){
                  item.selectedModuleType = [];
                }
              }
            }else{
              if(item.type == "caseComboList"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="caseCateList"||item.type == "caseImgList"){
                item.isSelected = true;
                if(item.type=="caseCateList"){
                  item.selectedModuleType = ["moduleCateList"];
                }
                if(item.type == "caseImgList"){
                  item.selectedModuleType = ["moduleImgList"];
                }
              }
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 案例详情模块选中状态改变事件
      changeCaseDetailModuleState:function(items){
        var $this = this;
        $this.searchData.caseDetailData.moduleData.forEach(function(item,index){
          if(items.type=="caseImgArticle"||items.type == "caseMainArticle"||items.type == "caseMessage"){
            if(items.isSelected){
              if(item.type=="caseImgArticle"||item.type == "caseMainArticle"||item.type == "caseMessage"){
                item.isSelected = true;
                if(item.type == "caseImgArticle"){
                    item.selectedModuleType = ["moduleImgArticle"];
                }
                if(item.type == "caseMainArticle"){
                    item.selectedModuleType = ["moduleMainArticle"];
                }
                if(item.type == "caseMessage"){
                    item.selectedModuleType = ["moduleMessage"];
                }
              }
              if(item.type == "caseComboArticle"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
            }else{
              if(item.type=="caseImgArticle"||item.type == "caseMainArticle"||item.type == "caseMessage"){
                item.isSelected = false;
                if(item.type == "caseImgArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "caseMainArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "caseMessage"){
                    item.selectedModuleType = [];
                }
              }
              if(item.type == "caseComboArticle"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboArticle"];
              }
            }
          }
          if(items.type=="caseComboArticle"){
            if(items.isSelected){
              if(item.type == "caseComboArticle"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboArticle"];
              }
              if(item.type=="caseImgArticle"||item.type == "caseMainArticle"||item.type == "caseMessage"){
                item.isSelected = false;
                if(item.type == "caseImgArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "caseMainArticle"){
                    item.selectedModuleType = [];
                }
                if(item.type == "caseMessage"){
                    item.selectedModuleType = [];
                }
              }
            }else{
              if(item.type=="caseImgArticle"||item.type == "caseMainArticle"||item.type == "caseMessage"){
                item.isSelected = true;
                if(item.type == "caseImgArticle"){
                    item.selectedModuleType = ["moduleImgArticle"];
                }
                if(item.type == "caseMainArticle"){
                    item.selectedModuleType = ["moduleMainArticle"];
                }
                if(item.type == "caseMessage"){
                    item.selectedModuleType = ["moduleMessage"];
                }
              }
              if(item.type == "caseComboArticle"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 联系我们模块选中状态改变事件
      changeContactModuleState:function(items){
        var $this = this;
        $this.searchData.contactData.moduleData.forEach(function(item,index){
          if(items.type=="contactMessage"&&items.type == item.type&&item.isSelected){
            item.selectedModuleType.push("moduleMessage");
          }else if(items.type=="moduleContact"&&items.type == item.type&&item.isSelected){
            item.selectedModuleType.push("moduleContact");
          }else{
            item.selectedModuleType = [];
          }
        });
        console.log(items.selectedModuleType);
      },
      // 长尾词页模块选中状态改变事件
      changeLongTailWordModuleState:function(items){
        var $this = this;
        $this.searchData.longTailWordData.moduleData.forEach(function(item,index){
          if(items.type=="longTailWordImgArticle"||items.type == "longTailWordMainArticle"){
            if(items.isSelected){
              if(item.type == "moduleComboLongTailWord"||item.type == "longTailWordList"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="longTailWordImgArticle"||item.type == "longTailWordMainArticle"||item.type=="longTailWordProduct"||item.type=="longTailWordMessage"||item.type=="longTailWordHotList"){
                item.isSelected = true;
                if(item.type=="longTailWordImgArticle"){
                    item.selectedModuleType =["moduleImgArticle"];
                }
                if(item.type=="longTailWordMainArticle"){
                    item.selectedModuleType =["moduleMainArticle"];
                }
                if(item.type=="longTailWordProduct"){
                  item.selectedModuleType = ['moduleImgList','moduleComboList'];
                  $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item1,index1){
                    item1.isSelected = true;
                  });
                }
                if(item.type=="longTailWordHotList"){
                    item.selectedModuleType =["moduleFontList"];
                }
                if(item.type=="longTailWordMessage"){
                  item.selectedModuleType = ["moduleMessage"];
                }
              }
            }else{
              if(item.type=="longTailWordImgArticle"||item.type == "longTailWordMainArticle"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
            }
          }
          if(items.type=="longTailWordList"){
            if(items.isSelected){
              if(item.type == "moduleComboLongTailWord"||item.type=="longTailWordImgArticle"||item.type == "longTailWordMainArticle"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="longTailWordProduct"||item.type=="longTailWordList"||item.type=="longTailWordMessage"||item.type=="longTailWordHotList"){
                item.isSelected = true;
                if(item.type=="longTailWordProduct"){
                  item.selectedModuleType = ['moduleImgList','moduleComboList'];
                  $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item1,index1){
                    item1.isSelected = true;
                  });
                }
                if(item.type=="longTailWordList"){
                  item.selectedModuleType = ['moduleImgList','moduleFontList','moduleComboList'];
                  $this.searchData.longTailWordData.moduleData[4].sonData.forEach(function(item1,index1){
                    item1.isSelected = true;
                  });
                }
                if(item.type=="longTailWordHotList"){
                    item.selectedModuleType =["moduleFontList"];
                }
                if(item.type=="longTailWordMessage"){
                  item.selectedModuleType = ["moduleMessage"];
                }
              }
            }else{
              if(item.type == "longTailWordList"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
            }
          }
          if(items.type=="longTailWordProduct"||items.type=="longTailWordMessage"||items.type=="longTailWordHotList"){
            if(items.isSelected){
              if(item.type == "moduleComboLongTailWord"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="longTailWordProduct"||item.type=="longTailWordMessage"||item.type=="longTailWordHotList"){
                item.isSelected = true;
                if(item.type=="longTailWordProduct"){
                  item.selectedModuleType = ['moduleImgList','moduleComboList'];
                  $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item1,index1){
                    item1.isSelected = true;
                  });
                }
                if(item.type=="longTailWordList"){
                  item.selectedModuleType = ['moduleImgList','moduleFontList','moduleComboList'];
                  $this.searchData.longTailWordData.moduleData[4].sonData.forEach(function(item2,index2){
                    item2.isSelected = true;
                  });
                }
                if(item.type=="longTailWordHotList"){
                    item.selectedModuleType =["moduleFontList"];
                }
                if(item.type=="longTailWordMessage"){
                  item.selectedModuleType = ["moduleMessage"];
                }
              }
            }else{
              if(item.type == "moduleComboLongTailWord"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboLongTailWord"];
              }
              if(item.type=="longTailWordImgArticle"||item.type == "longTailWordMainArticle"||item.type=="longTailWordProduct"||item.type == "longTailWordList"||item.type=="longTailWordMessage"||item.type=="longTailWordHotList"){
                item.isSelected = false;
                if(item.type=="longTailWordProduct"){
                  item.selectedModuleType = [];
                  $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item1,index1){
                    item1.isSelected = false;
                  });
                }
                if(item.type=="longTailWordList"){
                  item.selectedModuleType = [];
                  $this.searchData.longTailWordData.moduleData[4].sonData.forEach(function(item2,index2){
                    item2.isSelected = false;
                  });
                }
                if(item.type=="longTailWordHotList"||item.type=="longTailWordMessage"||item.type=="longTailWordImgArticle"||item.type == "longTailWordMainArticle"){
                    item.selectedModuleType =[];
                }
              }
            }
          }
          if(items.type=="moduleComboLongTailWord"){
            if(items.isSelected){
              if(item.type == "moduleComboLongTailWord"){
                item.isSelected = true;
                item.selectedModuleType = ["moduleComboLongTailWord"];
              }
              if(item.type=="longTailWordImgArticle"||item.type == "longTailWordMainArticle"||item.type=="longTailWordProduct"||item.type == "longTailWordList"||item.type=="longTailWordMessage"||item.type=="longTailWordHotList"){
                item.isSelected = false;
                if(item.type=="longTailWordProduct"){
                  item.selectedModuleType = [];
                  $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item1,index1){
                    item1.isSelected = false;
                  });
                }
                if(item.type=="longTailWordList"){
                  item.selectedModuleType = [];
                  $this.searchData.longTailWordData.moduleData[4].sonData.forEach(function(item2,index2){
                    item2.isSelected = false;
                  });
                }
                if(item.type=="longTailWordImgArticle"||item.type == "longTailWordMainArticle"||item.type=="longTailWordHotList"||item.type=="longTailWordMessage"){
                    item.selectedModuleType =[];
                }
              }
            }else{
              if(item.type == "moduleComboLongTailWord"){
                item.isSelected = false;
                item.selectedModuleType = [];
              }
              if(item.type=="longTailWordProduct"||item.type=="longTailWordMessage"||item.type=="longTailWordHotList"){
                item.isSelected = true;
                if(item.type=="longTailWordProduct"){
                  item.selectedModuleType = ['moduleImgList','moduleComboList'];
                  $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item1,index1){
                    item1.isSelected = true;
                  });
                }
                if(item.type=="longTailWordHotList"){
                    item.selectedModuleType =["moduleFontList"];
                }
                if(item.type=="longTailWordMessage"){
                  item.selectedModuleType = ["moduleMessage"];
                }
              }
            }
          }
          if(item.type=="longTailWordComboNews"){
            if(item.isSelected){
              item.selectedModuleType = ["moduleComboNews"];
            }else{
              item.selectedModuleType = [];
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 长尾词页热销产品选中状态改变事件
      changeHotProductState:function(items){
        var $this = this;
        $this.searchData.longTailWordData.moduleData[0].selectedModuleType = [];
        $this.searchData.longTailWordData.moduleData[0].sonData.forEach(function(item,index){
          if(item.isSelected){
            $this.searchData.longTailWordData.moduleData[0].selectedModuleType.push(item.type);
          }
        });
        console.log($this.searchData.longTailWordData.moduleData[0].selectedModuleType);
      },
      // 长尾词页长尾词列表选中状态改变事件
      changeProductListState:function(items){
        var $this = this;
        $this.searchData.longTailWordData.moduleData[2].selectedModuleType = [];
        $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item,index){
          if(item.isSelected){
            $this.searchData.longTailWordData.moduleData[2].selectedModuleType.push(item.type);
          }
        });
        console.log($this.searchData.longTailWordData.moduleData[2].selectedModuleType);
      },
      // 显示组合站点搜索条件页面
      showSearchPage:function(){
        var $this = this;
        $this.isSearch = true;
      },
      // 获取站点列表数据
      getWebsiteList:function(){
        var $this = this;
        var maxWidthLen = $this.getMaxWidthLength();
        if(maxWidthLen==0){
          $this.$alert('请先选择有效宽度', '警告', {
              confirmButtonText: '确定',
          });
          return false;
        }
        $this.requestionData.pageData = {};
        $this.requestionData.pageData.publicModuleData = [];
        $this.requestionData.pageData.indexModuleData = [];
        $this.requestionData.pageData.aboutModuleData = [];
        $this.requestionData.pageData.productListModuleData = [];
        $this.requestionData.pageData.productDetailModuleData = [];
        $this.requestionData.pageData.caseListModuleData = [];
        $this.requestionData.pageData.caseDetailModuleData = [];
        $this.requestionData.pageData.contactModuleData = [];
        $this.requestionData.pageData.longTailWordModuleData = [];
        $this.searchData.publicModuleData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.publicModuleData.push(obj);
          }
        });
        $this.searchData.indexData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.indexModuleData.push(obj);
          }
        });
        $this.searchData.aboutData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.aboutModuleData.push(obj);
          }
        });
        $this.searchData.productListData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.productListModuleData.push(obj);
          }
        });
        $this.searchData.productDetailData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.productDetailModuleData.push(obj);
          }
        });
        $this.searchData.caseListData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.caseListModuleData.push(obj);
          }
        });
        $this.searchData.caseDetailData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.caseDetailModuleData.push(obj);
          }
        });
        $this.searchData.contactData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.contactModuleData.push(obj);
          }
        });
        $this.searchData.longTailWordData.moduleData.forEach(function(item,index){
          var obj = {};
          if(item.isSelected){
            obj.type = item.type;
            obj.name = item.name;
            obj.selectedModuleType = item.selectedModuleType;
            obj.isRandom = item.settingData.isRandom;
            obj.randomQty = item.settingData.randomQty;
            obj.selectedData = item.settingData.selectedData;
            $this.requestionData.pageData.longTailWordModuleData.push(obj);
          }
        });
        var isTrue = true;
        if($this.searchData.isRandom == "0"){
          $this.requestionData.randomQty = "";
          $this.requestionData.pageData.publicModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('公共模块的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.indexModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('首页的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.aboutModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('关于我们的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.productListModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('产品列表的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.productDetailModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('产品详情的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.caseListModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('案例列表的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.caseDetailModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('案例详情的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.contactModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('联系我们的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          $this.requestionData.pageData.longTailWordModuleData.forEach(function(item,index){
            if(item.isRandom == "0"&& item.selectedData.length==0){
              $this.$alert('长尾词页的'+item.name+'已设置为手动选择数据，但未选择数据', '警告', {
                  confirmButtonText: '确定',
              });
              isTrue = false;
              return false;
            }
          });
          if(!isTrue){
            return false;
          }
        }else{
          $this.requestionData.randomQty = $this.searchData.randomQty;
        }
        $this.requestionData.headerFixed = $this.searchData.headerFixed;
        $this.requestionData.fixedIframeData = $this.searchData.fixedIframeData;
        $this.requestionData.isRandom = $this.searchData.isRandom;
        $this.requestionData.publicCssCode = $this.searchData.publicCssData.publicCssCode;
        $this.requestionData.maxWidth = [];
        $this.searchData.maxWidthData.forEach(function(item,index){
          if(item.isSelected){
            $this.requestionData.maxWidth.push(item.type);
          }
        });
        console.log($this.requestionData);
        console.log(JSON.stringify($this.requestionData));
        $this.isSearch = false;
        $this.loading = true;
        var websiteData = [];
        $this.$api.post('/api/Sites/BuildSite',$this.requestionData,function(res){
          if(res.data.code ==1){
            websiteData = res.data.data;
            var bgColor = 0;
            var maxNum = 30;
            var flag = true;
            websiteData.forEach(function(item,index){
              if(flag){
                ++bgColor;
                if(bgColor == maxNum){
                  flag = false;
                }
              }else{
                --bgColor;
                if(bgColor == 1){
                  flag = true;
                }
              }
              item.bgColor = "bgColor-" + bgColor;
            });
            $this.resultData = websiteData;
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
      // 返回站点列表页面
      goBack:function(){
        var $this = this;
        $this.isSearch = false;
        $this.isPreview = false;
      },
      // 预览站点页面
      previewWebsite:function(items){
        var $this = this;
        $this.isPreview = true;
        $this.isSearch = false;
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
          $this.$api.get('/api/Sites/GetCacheDetails?ID='+$this.ID,null,function(res){
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
      // 站点下载弹窗事件
      downloadWebsite:function(items){
        var $this = this;
        $this.downloadData.isDownload = true;
        $this.ID = items.ID;
      },
      // 关闭站点下载弹窗
      closeDownloadDialog:function(){
        var $this = this;
        $this.downloadData.isDownload = false;
        $this.downloadData.companyName = "";
        $this.downloadData.selectedOol = "";
      },
      // 后台程序语言选中状态切换事件
      changeOolState:function(items){
        var $this = this;
        console.log(this.downloadData.selectedOol);
      },
      // 确认下载站点压缩包
      downloadZIP:function(){
        var $this = this;
        if($this.downloadData.companyName == ""){
            $this.$alert('公司名称不能为空', '警告', {
                confirmButtonText: '确定',
            });
            return false;
        }
        if($this.downloadData.selectedOol == ""){
            $this.$alert('未选择后台程序语言', '警告', {
                confirmButtonText: '确定',
            });
            return false;
        }
        window.open("https://www.baidu.com/companyName=" + $this.downloadData.companyName + "&selectedOol=" + $this.downloadData.selectedOol,"_blank");
        $this.downloadData.isDownload = false;
        $this.downloadData.companyName = "";
        $this.downloadData.selectedOol = "";
      }
    }
}
</script>

<style lang="scss" scoped>
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
.result-page{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 30px 40px;
}
.search-page{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 30px 80px;
}
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
    margin: -280px 0 0 -480px;
    border-radius: 4px;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
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
.abs-dialog{
    position: absolute;
    .dialog-panel{
      border-radius: 4px;
    }
  }
.abs-dialog.hide{
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}

.abs-dialog.show{
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.abs-dialog{
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
  .dialog-panel{
    position: absolute;
    background: #fff;
    z-index: 1;
    overflow: hidden;
    left: 60px;
    top: 60px;
    right:60px;
    bottom: 60px;
    padding: 49px 0 81px;
    .dialog-header{
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
    .dialog-body{
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .dialog-footer{
      padding: 20px;
      border-top: 1px solid #e6e6e6;
      overflow: hidden;
      position: absolute;
      left:0;
      bottom:0;
      width:100%;
      text-align: right;
    }
  }
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
    .item-wrap{
      width: 100%;
      border: 1px solid #e6e6e6;
      border-radius: 10px;
      overflow: hidden;
      .item-content{
        height: 160px;
        padding: 20px;
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
            color: #fff;
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
          &:hover{
            background: #f5f5f5;
          }
          i{
            display: block;
            float:left;
            height: 40px;
            line-height: 40px;
            font-size: 20px;
            color: #333;
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
.ltw-download{
    .dialog-footer{
      padding: 20px;
      border-top: 1px solid #e6e6e6;
      overflow: hidden;
      position: absolute;
      left:0;
      bottom:0;
      width:100%;
      text-align: right;
    }
    .website-info{
      width: 640px;
      height: 400px;
      margin: -200px 0 0 -320px;
      padding: 49px 0 81px;
    }
}
.ltw-item-form{
        width: 100%;
        @extend %clearfix;
        position: relative;
        margin-top: 20px;
        .ltw-item-title{
            width:100%;
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            color: #333;
            span{
                color: #999;
                em{
                    margin: 0 10px;
                    font-weight: bold;
                    color: red;
                }
            }
        }
        .ltw-item-body{
            width: 100%;
            @extend %clearfix;
            font-size:0;
            .el-radio,.el-checkbox{
                margin:0 10px 10px 0;
            }
        }
        .ltw-item-des{
            width: 100%;
            min-height: 24px;
            font-size: 14px;
            color: #999;
        }
    }
</style>