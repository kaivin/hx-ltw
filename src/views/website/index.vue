<template>
  <div class="page-root">
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
        <div class="item-search">
          <h2>公共样式</h2>
          <div class="item-body">
            <el-checkbox v-model="searchData.publicCssData.isSelected" v-bind:label="searchData.publicCssData.name" v-bind:disabled="searchData.publicCssData.isDisabled" border></el-checkbox>
          </div>
        </div>
        <div class="item-search">
          <h2>有效宽度</h2>
          <div class="item-body">
            <el-checkbox v-for="(item,index) in searchData.maxWidthData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeMaxWidthState(item)" v-bind:disabled="item.isDisabled" border></el-checkbox>
          </div>
        </div>
        <div class="item-search">
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
        <div class="item-search">
          <h2>公共模块</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.publicModuleData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changePublicModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
          <div class="sub-search" v-if="searchData.publicModuleData.moduleData[0].isSelected">
            <h2>页头侧边固定</h2>
            <div class="item-body">
              <el-radio v-for="(item,index) in searchData.headerFixedData" v-bind:key="index" v-model="searchData.headerFixed" v-bind:label="item.type" v-on:change="changeHeaderFixedState(item)" border>{{item.name}}</el-radio>
            </div>
          </div>
        </div>
        <div class="item-search">
          <h2>首页</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.indexData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeIndexModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
          <div class="sub-search" v-if="searchData.indexData.moduleData[0].isSelected">
            <h4>关于我们包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.indexData.moduleData[0].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeIndexAboutState(item)" border></el-checkbox>
            </div>
          </div>
          <div class="sub-search" v-if="searchData.indexData.moduleData[1].isSelected">
            <h4>热销产品包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.indexData.moduleData[1].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeIndexProductState(item)" border></el-checkbox>
            </div>
          </div>
          <div class="sub-search" v-if="searchData.indexData.moduleData[2].isSelected">
            <h4>经典案例包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.indexData.moduleData[2].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeIndexCaseState(item)" border></el-checkbox>
            </div>
          </div>
        </div>
        <div class="item-search">
          <h2>关于我们</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.aboutData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeAboutModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search">
          <h2>产品列表</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.productListData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeProductListModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search">
          <h2>产品详情</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.productDetailData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeProductDetailModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search">
          <h2>案例列表</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.caseListData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeCaseListModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search">
          <h2>案例详情</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.caseDetailData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeCaseDetailModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search">
          <h2>联系我们</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.contactData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeContactModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
        </div>
        <div class="item-search" style="min-height: 280px;">
          <h2>长尾词列表</h2>
          <div class="item-body">
            <div class="inline-body" v-for="(item,index) in searchData.longTailWordData.moduleData" v-bind:key="index">
              <el-checkbox v-model="item.isSelected" v-bind:label="item.name" v-bind:disabled="item.isDisabled" v-on:change="changeLongTailWordModuleState(item)" border></el-checkbox>
              <div class="inline-content" v-if="item.isSelected&&searchData.isRandom=='0'"><span class="iconfont icon-search" v-on:click="showDialog(item)"></span></div>
            </div>
          </div>
          <div class="sub-search" v-if="searchData.longTailWordData.moduleData[0].isSelected">
            <h4>热销产品包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.longTailWordData.moduleData[0].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeHotProductState(item)" border></el-checkbox>
            </div>
          </div>
          <div class="sub-search" v-if="searchData.longTailWordData.moduleData[2].isSelected">
            <h4>长尾词列表包含模块</h4>
            <div class="item-body">
              <el-checkbox v-for="(item,index) in searchData.longTailWordData.moduleData[2].sonData" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changeProductListState(item)" border></el-checkbox>
            </div>
          </div>
        </div>
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
       <div class="ltw-view-panel" v-html="showCode" v-if="pageType=='indexPage'"></div>
      <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='aboutPage'"></div>
      <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='productListPage'"></div>
      <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='productDetailPage'"></div>
      <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='caseListPage'"></div>
      <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='caseDetailPage'"></div>
      <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='contactPage'"></div>
      <div class="ltw-view-panel" v-html="showCode" v-else-if="pageType=='longTailWordPage'"></div>
    </div>
    <div class="abs-dialog" v-bind:class="[searchDialog.isSearchDialog?'show':'hide']">
      <div class="dialog-panel">
        <div class="dialog-header"><h2>{{searchDialog.searchDialogTitle}}</h2><span class="iconfont icon-close" v-on:click="closeDialog"></span></div>
        <div class="dialog-body">
          <module-header-search v-if="searchDialog.dialogType=='moduleHeader'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-header-search>
          <module-footer-search v-if="searchDialog.dialogType=='moduleFooter'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-footer-search>
          <module-banner-search v-if="searchDialog.dialogType=='moduleBanner'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-banner-search>
          <module-combo-header-search v-if="searchDialog.dialogType=='moduleComboHeader'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-combo-header-search>
          <module-public-message-search v-if="searchDialog.dialogType=='moduleMessage'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-public-message-search>
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
          <module-ltw-product v-if="searchDialog.dialogType=='longTailWordProduct'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-product>
          <module-ltw-message v-if="searchDialog.dialogType=='longTailWordMessage'" v-bind:searchData="searchData" v-bind:moduleType="searchDialog.dialogType" v-on:moduleChanged="getModuleChanged($event)"></module-ltw-message>
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
import moduleHeaderSearch from '@/components/moduleHeaderSearch/index.vue';
import moduleFooterSearch from '@/components/moduleFooterSearch/index.vue';
import moduleBannerSearch from '@/components/moduleBannerSearch/index.vue';
import moduleComboHeaderSearch from '@/components/moduleComboHeaderSearch/index.vue';
import modulePublicMessageSearch from '@/components/modulePublicMessageSearch/index.vue';
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
import moduleLtwProduct from '@/components/moduleLtwProduct/index.vue';
import moduleLtwMessage from '@/components/moduleLtwMessage/index.vue';
import moduleLtwList from '@/components/moduleLtwList/index.vue';
import moduleLtwCombo from '@/components/moduleLtwCombo/index.vue';
import moduleLtwComboNews from '@/components/moduleLtwComboNews/index.vue';
export default {
    name: 'websitePage',
    components:{
      "module-header-search":moduleHeaderSearch,
      "module-footer-search":moduleFooterSearch,
      "module-banner-search":moduleBannerSearch,
      "module-combo-header-search":moduleComboHeaderSearch,
      "module-public-message-search":modulePublicMessageSearch,
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
      "module-ltw-product":moduleLtwProduct,
      "module-ltw-message":moduleLtwMessage,
      "module-ltw-list":moduleLtwList,
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
        pageType:'indexPage',
        showCode:'',
        publicData:{
            publicCssCode:'@charset "utf-8";*,*:after,*:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-touch-callout:none;margin:0;padding:0;}a,abbr,acronym,address,big,blockquote,body,caption,cite,code,dd,dl,dt,fieldset,form,h1,time,h2,h3,h4,h5,h6,html,img,ins,kbd,label,legend,li,ol,p,pre,q,s,samp,small,span,strike,strong,ul{border:0;outline:0;vertical-align:middle;}body{font-family:Arial,"Open Sans",sans-serif,"Heiti SC","Helvetica","HelveticaNeue","Droidsansfallback","Droid Sans";font-size:16px;line-height:32px;text-align:left;background:#fff;font-style:normal;font-weight:100;color:#5a5b5c;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;margin:0;padding:0;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}a:link,a:active,a:visited,a:hover{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;}button{border-radius:0px;-webkit-border-radius:0px;outline:none;}input{border-radius:0;-webkit-appearance:none;-webkit-border-radius:0px;}input,select{border-radius:0;outline:none;}input:-ms-clear{display:none;}input,textarea{border:0;-webkit-appearance:none;}textarea{resize:none;outline:none;}img{border:0;vertical-align:middle;MAX-WIDTH:100%!important;HEIGHT:auto!important;_width:expression(this.width > 100% ? "100%":this.width)!important;}td{padding:8px 5px;}ul,li{list-style:none;}button{cursor:pointer;}h1,h2,h3,h4,h5,h6{font-weight:700;font-variant:normal;white-space:normal;}a:link,a:visited{color:#42474e;text-decoration:none;}a:hover,a:active{color:rgb(212,42,42);text-decoration:underline;}.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;font-size:0px;}.container{clear:both;width:1440px;margin:0 auto;padding:0px;}@media (max-width:1600px){body{line-height:28px;}.container{width:1280px;}}@media (max-width:1440px){body{line-height:26px;font-size:14px;}.container{width:1120px;}}@media (max-width:1280px){body{line-height:24px;}.container{width:960px;}}@media screen and (max-width:992px){.container{width:750px;}}@media screen and (max-width:782px){.container{width:100%;}}',
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
        searchDialog:{
          isSearchDialog:false,
          searchDialogTitle:'',
          dialogType:'',
        },
        searchData:{
          publicCssData:{isSelected:true,isDisabled:true,name:'公共样式',publicCssCode:'@charset "utf-8";a,abbr,acronym,address,big,blockquote,body,caption,cite,code,dd,dl,dt,fieldset,form,h1,time,h2,h3,h4,h5,h6,html,img,ins,kbd,label,legend,li,ol,p,pre,q,s,samp,small,span,strike,strong,ul{border:0;outline:0;}body{font-family:Arial,"Open Sans",sans-serif,"Heiti SC","Helvetica","HelveticaNeue","Droidsansfallback","Droid Sans";font-size:16px;line-height:32px;text-align:left;background:#fff;font-style:normal;font-weight:100;color:#5a5b5c;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;margin:0;padding:0;}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block;}a:link,a:active,a:visited,a:hover{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-tap-highlight-color:transparent;}button{border-radius:0px;-webkit-border-radius:0px;outline:none;}input{border-radius:0;-webkit-appearance:none;-webkit-border-radius:0px;}input,select{border-radius:0;outline:none;}input[type="checkbox"]{-webkit-appearance:checkbox;}input:-ms-clear{display:none;}input,textarea{border:0;-webkit-appearance:none;}textarea{resize:none;outline:none;}img{border:0;vertical-align:middle;MAX-WIDTH:100%!important;HEIGHT:auto!important;_width:expression(this.width > 100% ? "100%":this.width)!important;}td{padding:8px 5px;}ul,li{list-style:none;}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-touch-callout:none;margin:0;padding:0;}*:after,*:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-touch-callout:none;margin:0;padding:0;}button{cursor:pointer;}h1,h2,h3,h4,h5,h6{font-weight:700;font-variant:normal;white-space:normal;}a:link,a:visited{color:#42474e;text-decoration:none;}a:hover,a:active{color:rgb(212,42,42);text-decoration:underline;}.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;font-size:0px;}.container{clear:both;width:1440px;margin:0 auto;padding:0px;}.container-1280{clear:both;width:1280px;margin:0 auto;padding:0px;}.container-960{clear:both;width:960px;margin:0 auto;padding:0px;}@media (max-width:1600px){body{line-height:28px;}.container{width:1280px;}}@media (max-width:1440px){body{line-height:26px;font-size:14px;}.container{width:1120px;}}@media (max-width:1280px){body{line-height:24px;}.container{width:960px;}.container-1280{width:960px;}}@media screen and (max-width:992px){.container{width:750px;}.container-1280{width:750px;}.container-960{width:750px;}}@media screen and (max-width:782px){.container,.container-1280,.container-960{width:100%;}}'},
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
              {type:'moduleMessage',name:'留言板',isSelected:false,isDisabled:false,
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
          fixedIframeData:{
            iframeHtmlCode1:'<div class="aside">',
            iframeHtmlCode2:'</div><div class="main">',
            iframeHtmlCode3:'</div>',
            iframeCssCode:'.aside{width:240px;position:fixed;left:0;top:0;height:100vh;z-index:999;background:#ccc;}.main{clear:both;margin:0 auto;padding:0px 0px 0px 240px;}@media (max-width:1600px){.aside{position:static;height:auto;width:100%;padding:0;}.main{clear:both;margin:0 auto;padding:0;}}',
          },
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
        websiteData:{},
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
    methods:{
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
          if(items.type == "moduleMessage"&&items.type == item.type){
            if(items.isSelected){
              item.selectedModuleType.push(item.type);
            }else{
              item.selectedModuleType = [];
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
            if(!item.isSelected){
              $this.searchData.indexData.moduleData[0].selectedModuleType = [];
              $this.searchData.indexData.moduleData[0].sonData.forEach(function(item1,index1){
                item1.isSelected = false;
              });
            }
          }
          if(items.type==item.type&&items.type == "indexProduct"){
            if(!item.isSelected){
              $this.searchData.indexData.moduleData[1].selectedModuleType = [];
              $this.searchData.indexData.moduleData[1].sonData.forEach(function(item1,index1){
                item1.isSelected = false;
              });
            }
          }
          if(items.type==item.type&&items.type == "indexCase"){
            if(!item.isSelected){
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
          if((items.type=="productCateList"||items.type == "productImgList")&&items.isSelected){
            if(item.type == "productComboList"&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type=="productComboList"&&items.isSelected){
            if((item.type=="productCateList"||item.type == "productImgList")&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type == item.type&&items.type == "productCateList"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleCateList");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "productImgList"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleImgList");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "productComboList"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleComboList");
            }else{
              item.selectedModuleType = [];
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 产品详情模块选中状态改变事件
      changeProductDetailModuleState:function(items){
        var $this = this;
        $this.searchData.productDetailData.moduleData.forEach(function(item,index){
          if((items.type=="productImgArticle"||items.type == "productMainArticle"||items.type == "productMessage")&&items.isSelected){
            if(item.type == "productComboArticle"&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type=="productComboArticle"&&items.isSelected){
            if((item.type=="productImgArticle"||item.type == "productMainArticle"||item.type == "productMessage")&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type == item.type&&items.type == "productImgArticle"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleImgArticle");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "productMainArticle"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleMainArticle");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "productMessage"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleMessage");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "productComboArticle"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleComboArticle");
            }else{
              item.selectedModuleType = [];
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 案例列表模块选中状态改变事件
      changeCaseListModuleState:function(items){
        var $this = this;
        $this.searchData.caseListData.moduleData.forEach(function(item,index){
          if((items.type=="caseCateList"||items.type == "caseImgList")&&items.isSelected){
            if(item.type == "caseComboList"&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type=="caseComboList"&&items.isSelected){
            if((item.type=="caseCateList"||item.type == "caseImgList")&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type == item.type&&items.type == "caseCateList"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleCateList");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "caseImgList"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleImgList");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "caseComboList"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleComboList");
            }else{
              item.selectedModuleType = [];
            }
          }
        });
        console.log(items.selectedModuleType);
      },
      // 案例详情模块选中状态改变事件
      changeCaseDetailModuleState:function(items){
        var $this = this;
        $this.searchData.caseDetailData.moduleData.forEach(function(item,index){
          if((items.type=="caseImgArticle"||items.type == "caseMainArticle"||items.type == "caseMessage")&&items.isSelected){
            if(item.type == "caseComboArticle"&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type=="caseComboArticle"&&items.isSelected){
            if((item.type=="caseImgArticle"||item.type == "caseMainArticle"||item.type == "caseMessage")&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type == item.type&&items.type == "caseImgArticle"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleImgArticle");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "caseMainArticle"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleMainArticle");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "caseMessage"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleMessage");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type == "caseComboArticle"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleComboArticle");
            }else{
              item.selectedModuleType = [];
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
          if((items.type=="longTailWordProduct"||items.type == "longTailWordList"||items.type=="longTailWordMessage")&&items.isSelected){
            if(item.type == "moduleComboLongTailWord"&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type=="moduleComboLongTailWord"&&items.isSelected){
            if((item.type=="longTailWordProduct"||item.type == "longTailWordList"||item.type=="longTailWordMessage")&&item.isSelected){
              item.isSelected = false;
            }
          }
          if(items.type == item.type&&items.type=="longTailWordMessage"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleMessage");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type=="moduleComboLongTailWord"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleComboLongTailWord");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == item.type&&items.type=="longTailWordComboNews"){
            if(item.isSelected){
              item.selectedModuleType.push("moduleComboNews");
            }else{
              item.selectedModuleType = [];
            }
          }
          if(items.type == "longTailWordProduct"){
            if(items.type==item.type&&!item.isSelected){
              $this.searchData.longTailWordData.moduleData[0].selectedModuleType = [];
              $this.searchData.longTailWordData.moduleData[0].sonData.forEach(function(item1,index1){
                item1.isSelected = false;
              });
            }
          }
          if(items.type == "longTailWordList"){
            if(items.type==item.type&&!item.isSelected){
              $this.searchData.longTailWordData.moduleData[2].selectedModuleType = [];
              $this.searchData.longTailWordData.moduleData[2].sonData.forEach(function(item1,index1){
                item1.isSelected = false;
              });
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
        $this.loading = false;
        var websiteData = [
            {ID:0,isDelete:"0",freeDate:''},
            {ID:1,isDelete:"0",freeDate:''},
            {ID:2,isDelete:"0",freeDate:''},
            {ID:3,isDelete:"0",freeDate:''},
            {ID:4,isDelete:"0",freeDate:''},
            {ID:5,isDelete:"1",freeDate:'2020-12-12 09:30:30'},
            {ID:6,isDelete:"0",freeDate:''},
            {ID:7,isDelete:"0",freeDate:''},
            {ID:8,isDelete:"0",freeDate:''},
            {ID:9,isDelete:"0",freeDate:''},
            {ID:10,isDelete:"0",freeDate:''},
            {ID:11,isDelete:"0",freeDate:''},
            {ID:12,isDelete:"0",freeDate:''},
            {ID:13,isDelete:"0",freeDate:''},
            {ID:14,isDelete:"0",freeDate:''},
            {ID:15,isDelete:"0",freeDate:''},
            {ID:16,isDelete:"0",freeDate:''},
            {ID:17,isDelete:"0",freeDate:''},
            {ID:18,isDelete:"0",freeDate:''},
            {ID:19,isDelete:"0",freeDate:''},
            {ID:20,isDelete:"0",freeDate:''},
            {ID:21,isDelete:"0",freeDate:''},
            {ID:22,isDelete:"0",freeDate:''},
            {ID:23,isDelete:"0",freeDate:''},
            {ID:24,isDelete:"0",freeDate:''},
            {ID:25,isDelete:"0",freeDate:''},
            {ID:26,isDelete:"0",freeDate:''},
            {ID:27,isDelete:"1",freeDate:'2020-10-12 09:30:30'},
            {ID:28,isDelete:"0",freeDate:''},
            {ID:29,isDelete:"0",freeDate:''},
            {ID:30,isDelete:"0",freeDate:''},
            {ID:31,isDelete:"0",freeDate:''},
            {ID:32,isDelete:"0",freeDate:''},
            {ID:33,isDelete:"0",freeDate:''},
            {ID:34,isDelete:"0",freeDate:''},
            {ID:35,isDelete:"0",freeDate:''},
            {ID:36,isDelete:"0",freeDate:''},
            {ID:37,isDelete:"0",freeDate:''},
            {ID:38,isDelete:"0",freeDate:''},
            {ID:39,isDelete:"1",freeDate:'2020-08-12 09:30:30'},
            {ID:40,isDelete:"0",freeDate:''},
            {ID:41,isDelete:"0",freeDate:''},
            {ID:42,isDelete:"0",freeDate:''},
            {ID:43,isDelete:"0",freeDate:''},
            {ID:44,isDelete:"0",freeDate:''},
            {ID:45,isDelete:"0",freeDate:''},
            {ID:46,isDelete:"0",freeDate:''},
            {ID:47,isDelete:"0",freeDate:''},
            {ID:48,isDelete:"0",freeDate:''},
            {ID:49,isDelete:"0",freeDate:''},
        ];
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
            if(bgColor == 0){
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
        $this.isSearch = false;
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
          $this.websiteData.pageData.forEach(function(item,index){
              if(items.pageType == item.pageType){
                  if(!item.isActive){
                      item.isActive = true;
                      $this.pageType = item.pageType;
                      console.log($this.pageType);
                      if($this.pageType == 'indexPage'){
                          $this.showCode = "<style>" + $this.publicData.indexCssCode + "</style>" + $this.publicData.indexHtmlCode;
                      }else if($this.pageType == "aboutPage"){
                          $this.showCode = "<style>" + $this.publicData.aboutCssCode + "</style>" + $this.publicData.aboutHtmlCode;
                      }else if($this.pageType == "productListPage"){
                          $this.showCode = "<style>" + $this.publicData.productListCssCode + "</style>" + $this.publicData.productListHtmlCode;
                      }else if($this.pageType == "productDetailPage"){
                          $this.showCode = "<style>" + $this.publicData.productDetailCssCode + "</style>" + $this.publicData.productDetailHtmlCode;
                      }else if($this.pageType == "caseListPage"){
                          $this.showCode = "<style>" + $this.publicData.caseListCssCode + "</style>" + $this.publicData.caseListHtmlCode;
                      }else if($this.pageType == "caseDetailPage"){
                          $this.showCode = "<style>" + $this.publicData.caseDetailCssCode + "</style>" + $this.publicData.caseDetailHtmlCode;
                      }else if($this.pageType == "contactPage"){
                          $this.showCode = "<style>" + $this.publicData.contactCssCode + "</style>" + $this.publicData.contactHtmlCode;
                      }else if($this.pageType == "longTailWordPage"){
                          $this.showCode = "<style>" + $this.publicData.longTailWordCssCode + "</style>" + $this.publicData.longTailWordHtmlCode;
                      }
                  }
              }else{
                  item.isActive = false;
              }
          });
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
          var serverWebsiteData = {
              ID:'20',
              maxWidth:'1440,100%',
              headerFixed:'0',
              publicModuleData:[
                  {ID: 2008,
                  author: "聂亚兵",
                  coverContact: "",
                  createdDate: "2019-12-13 08:51:40",
                  cssCode: ".nyb0001{background:#000;background:rgba(0,0,0,0.85);top:0;position:relative;width:100%;left:0}.nyb0001 .nyb0001com{padding:20px 0 20px 0;overflow:hidden}.nyb0001 .nyb0001one{float:left}.nyb0001 .nyb0001one span{display:none}.nyb0001 .nyb0001one a{float:left;padding:0;width:170px;margin-top:5px}.nyb0001 .nyb0001two{float:right;position:static;display:inline-block;border-top:0;-webkit-box-shadow:none;box-shadow:none;background:0;padding:0}.nyb0001 .nyb0001two ul{margin:0;padding:0}.nyb0001 .nyb0001two ul li{float:left;padding-left:50px}.nyb0001 .nyb0001two ul li a{position:relative;line-height:24px;display:block;padding:13px 0 0 0;font-weight:400;font-size:16px;color:#fff}@media(max-width:1440px){.nyb0001 .nyb0001two ul li{padding-left:40px}.nyb0001 .nyb0001two ul li a{font-size:14px}}@media(max-width:1280px){.nyb0001 .nyb0001two ul li{padding-left:30px}}@media screen and (max-width:782px){.nyb0001 .nyb0001com{padding:15px 20px}.nyb0001 .nyb0001one{float:none;clear:both;display:block;width:100%}.nyb0001 .nyb0001one a{margin-top:0;width:125px}.nyb0001 .nyb0001one span{position:relative;float:right;padding:0;cursor:pointer;display:inline-block}.nyb0001 .nyb0001one span .icon-bar{display:block;width:30px;background-color:#fff;margin-top:5px;height:3px;border-radius:1px;transition:all .3s}.nyb0001 .nyb0001one span.in .icon-bar:nth-child(2){opacity:0}.nyb0001 .nyb0001one span.in .icon-bar:nth-child(1){transform:rotate(45deg) translateY(11px)}.nyb0001 .nyb0001one span.in .icon-bar:nth-child(3){transform:rotate(-45deg) translateY(-12px)}.nyb0001 .nyb0001two{display:none;overflow-x:visible;padding-right:10px;padding-left:10px;border-top:1px solid transparent;max-height:340px;background:#ff525e;position:absolute;left:0;right:0;top:58px;z-index:5}.nyb0001 .nyb0001two.in{display:block}.nyb0001 .nyb0001two ul{margin:7.5px -10px;padding:0 20px}.nyb0001 .nyb0001two ul li{position:relative;display:block;border-top:1px solid #ff7c85;float:none;clear:both;padding:0}.nyb0001 .nyb0001two ul li:first-child{border-top:0}.nyb0001 .nyb0001two ul li a{position:relative;color:#fff7f5;line-height:24px;display:block;padding:15px 0;font-weight:400;font-size:14px;margin:0}}",
                  headerFixed: "0",
                  htmlCode: '<div class="nyb0001"><div class="container clearfix"><div class="nyb0001com"><div class="nyb0001one clearfix"><span type="button"><i class="icon-bar"></i><i class="icon-bar"></i><i class="icon-bar"></i></span><a href="#"><img src="images/nyb0001-logo.png" alt=""></a></div><div class="nyb0001two"><ul><li><a href="index.asp">顶部固定 fixed</a></li><li><a href="index.asp">HOME</a></li><li><a href="about.asp">COMPANY</a></li><li><a href="prolist.asp">PRODUCTS</a></li><li><a href="solutions.asp">SOLUTIONS</a></li><li><a href="contact.asp">CONTACTS</a></li></ul></div></div></div></div><script>$(".nyb0001one span").click(function(){if($(this).hasClass("in")){$(this).removeClass("in")}else{$(this).addClass("in")};$(".nyb0001two").slideToggle()});window.onresize=resizeBannerImage;function resizeBannerImage(){var W01=$(window).width();if(W01>782){$(".nyb0001one span").removeClass("in");$(".nyb0001two").css("display","inline-block")}else{$(".nyb0001one span").removeClass("in");$(".nyb0001two").css("display","none")}};<\/script>',
                  maxWidth: "1440",
                  moduleGUID: "nyb0001",
                  moduleType: "moduleHeader",
                  pageType: "index,about,list,article,contact,longTailWord",
                  parentModuleGUID: "",
                  usedClasses: "container,nyb0001com,nyb0001one,nyb0001two",},
              ],
              pageData:[
                  {pageType:'indexPage',moduleData:[
                      {
                          ID: 2012,
                          author: "聂亚兵",
                          coverContact: "",
                          createdDate: "2019-12-13 09:42:20",
                          cssCode: ".nyb0005{clear:both;position:relative;background:url(../images/nyb0005_about02.jpg) no-repeat center center;background-size:cover}.nyb0005:after{content:'';position:absolute;left:0;width:100%;top:0;height:100%;background:#ff525e;background:rgba(255,82,94,0.95)}.nyb0005 .container{position:relative;z-index:2;padding:60px 0}.nyb0005 .nyb0005top h2{clear:both;display:block;text-align:center;font-size:50px;color:#fff;line-height:1.1;font-weight:900}.nyb0005 .nyb0005top p{clear:both;display:block;margin-top:29px;font-size:18px;line-height:35px;margin-bottom:0;color:#ffdddf;text-align:center;padding-left:50px;padding-right:50px;font-weight:100}.nyb0005 .nyb0005bom{clear:both;padding:40px 0 0 0;overflow:hidden;margin-left:-3%}.nyb0005 .nyb0005bom li{float:left;background:#98010b;width:47%;padding:25px 35px;margin-left:3%}.nyb0005 .nyb0005bom li p{clear:both;background:url(../images/nyb0005_about01.png) no-repeat left 11px;color:#fff;font-size:16px;padding-left:25px;padding:5px 0 5px 30px;line-height:32px}@media(max-width:1600px){.nyb0005 .nyb0005top h2{font-size:45px}.nyb0005 .nyb0005top p{font-size:16px;line-height:32px}.nyb0005 .nyb0005bom{padding-top:30px}}@media(max-width:1440px){.nyb0005 .container{padding:40px 0}.nyb0005 .nyb0005top h2{font-size:40px}.nyb0005 .nyb0005top p{font-size:14px;line-height:28px}.nyb0005 .nyb0005bom li{padding:20px 25px}.nyb0005 .nyb0005bom li p{font-size:14px;line-height:30px}}@media(max-width:1280px){.nyb0005 .nyb0005top h2{font-size:35px}.nyb0005 .nyb0005top p{line-height:24px}.nyb0005 .nyb0005bom li{padding:20px 20px}.nyb0005 .nyb0005bom li p{line-height:24px;background-position:left 7px}}@media screen and (max-width:992px){.nyb0005 .nyb0005top h2{font-size:30px}.nyb0005 .nyb0005top p{padding-left:10px;padding-right:10px}}@media screen and (max-width:782px){.nyb0005 .container{padding:30px 20px}.nyb0005 .nyb0005top h2{font-size:25px}.nyb0005 .nyb0005top p{margin-top:15px}.nyb0005 .nyb0005bom{padding-top:20px}.nyb0005 .nyb0005bom li{float:none;clear:both;width:100%;margin-top:20px;height:auto}}",
                          headerFixed: "",
                          htmlCode: '<div class="nyb0005"><div class="container"><div class="nyb0005top"><h2>Our Production Capacity</h2><p>After experiencing several years of technical precipitation, ours has launched hundreds of kinds of machines, and the jaw crusher, cone crusher, mobile crushing station and sand making machines are widely preferred by users, and used in mining development, road construction, metallurgy and other fields. Meanwhile, Ours provides users with a one-stop service from research and development to production, analysis and testing, such as project design, process design, standard and non-standard product design and production.</p></div><ul class="nyb0005bom clearfix"><li><p>(HXJQ) covers an area of 350,000 square meters which includes 260,000 square meters of heavy duty industrial workshops.</p><p>Various large and medium-sized gold processing, welding, assembly equipment more than 600 sets.</p><p>There are more than 2300 employees online, among which there are more than 360 management cadres and engineering and technical personnel with intermediate and grade titles.</p></li><li><p>We have framed client-centric business policies</p><p>We are support by a team of qualified and experienced Engineers</p><p>Three large-sized workshops, strict quality control system.</p><p>A Full-service system, such as installation, maintenance, tech support, etc.</p><p>Professional teams, customized solutions.</p><p>Nearby production site visit.</p></li></ul></div></div>',
                          maxWidth: "1440",
                          moduleGUID: "nyb0005",
                          moduleType: "modulePower",
                          pageType: "index,about",
                          parentModuleGUID: "",
                          usedClasses: "nyb0005top,nyb0005bom",
                      }
                  ]},
                  {pageType:'aboutPage',moduleData:[
                      {  
                        ID: 2010,
                        author: "聂亚兵",
                        coverContact: "",
                        createdDate: "2019-12-13 09:15:49",
                        cssCode: ".nyb0003{clear:both;display:block;overflow:hidden}.nyb0003 li{float:left;width:33.3333%;display:block;padding:45px 40px 38px 30px;position:relative;background:#333}.nyb0003 li div{clear:both;display:block;border-left:2px solid #ff525e;padding-left:20px;height:165px}.nyb0003 li div h3{font-size:20px;color:#fff;margin-bottom:15px;position:relative;z-index:2;text-transform:uppercase;font-weight:900;line-height:35px}.nyb0003 li div p{font-size:15px;color:#fff;line-height:25px;position:relative;z-index:2;font-weight:100}@media(max-width:1600px){.nyb0003 li div{height:150px}.nyb0003 li div h3{font-size:18px;line-height:30px}.nyb0003 li div p{font-size:14px}}@media(max-width:1440px){.nyb0003 li{padding:30px 40px 30px 30px}.nyb0003 li div{height:170px}.nyb0003 li div h3{font-size:16px;line-height:28px}}@media(max-width:1280px){.nyb0003 li{padding:30px 40px 30px 30px}.nyb0003 li div{height:170px}.nyb0003 li div h3{font-size:14px}.nyb0003 li div p{line-height:22px}}@media screen and (max-width:992px){.nyb0003 li{padding:30px 10px 30px 10px}.nyb0003 li div{height:270px}.nyb0003 li div h3{font-size:12px}.nyb0003 li div p{line-height:22px}}@media screen and (max-width:782px){.nyb0003{padding-top:15px}.nyb0003 li{float:none;clear:both;display:block;width:100%;margin-bottom:15px;padding:30px 20px}.nyb0003 li div{height:auto}.nyb0003 li div h3{font-size:12px;margin-bottom:5px}.nyb0003 li div p{line-height:22px}}",
                        headerFixed: "",
                        htmlCode: '<ul class="nyb0003 container"><li><div><h3>PRE-SALE SERVICE</h3><p>Provide quality technical consulting services, understand customer needs, according to the actual situation of production capacity, site design reasonable, economic supporting program.</p></div></li><li><div><h3>SALE SERVICE</h3><p>Provide door-to-door installation services, professional technical team door-to-door installation, commissioning equipment, guidance and training personnel, ensure efficient operation of the machine.</p></div></li><li><div><h3>AFTER-SALE SERVICE</h3><p>Provide regular return visit service to help users optimize equipment maintenance and timely analyze and solve the equipment problems feedback from customers.</p></div></li></ul>',
                        maxWidth: "1440",
                        moduleGUID: "nyb0003",
                        moduleType: "moduleService",
                        pageType: "index,about",
                        parentModuleGUID: "",
                        usedClasses: "nyb0003",
                      }
                  ]},
                  {pageType:'productListPage',moduleData:[
                      {
                          ID: 2019,
                          author: "聂亚兵",
                          coverContact: "",
                          createdDate: "2019-12-13 14:57:33",
                          cssCode: ".nyb0012{background:url(../images/nyb0012_about01.jpg) center no-repeat;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;padding:80px 0 80px 0}.nyb0012 .nyb0012top{border-bottom:1px solid rgba(238,238,238,0.2);padding-bottom:40px;margin-bottom:40px}.nyb0012 .nyb0012top .nyb0012toppic{float:right;width:50%}.nyb0012 .nyb0012top .nyb0012topbox{float:left;overflow:hidden;width:50%}.nyb0012 .nyb0012top .nyb0012topbox h2{color:#fff;font-size:50px;line-height:60px;font-weight:700;margin-bottom:42px}.nyb0012 .nyb0012top .nyb0012topbox ul li{float:left;font-size:18px;color:#fff;line-height:26px;width:33.3333%;text-align:center}.nyb0012 .nyb0012top .nyb0012topbox ul li span{clear:both;display:block;margin:0 auto;width:60px}.nyb0012 .nyb0012top .nyb0012topbox p{margin-top:36px;color:#fff;font-size:18px;line-height:35px}.nyb0012 .nyb0012bom{overflow:hidden;padding:0}.nyb0012 .nyb0012bom li{float:left;width:25%;text-align:center}.nyb0012 .nyb0012bom li p{font-size:18px;line-height:35px;color:#fff}.nyb0012 .nyb0012bom li span{font-size:30px;color:#fff;line-height:1.1;display:block;font-family:Impact;margin-bottom:10px}.nyb0012 .nyb0012bom li span strong{font-size:80px;display:inline-block;vertical-align:middle;padding-right:5px}@media(max-width:1600px){.nyb0012{padding-top:70px;padding-bottom:70px}.nyb0012 .nyb0012top .nyb0012topbox h2{font-size:45px;line-height:55px}.nyb0012 .nyb0012top .nyb0012topbox ul li{font-size:16px}.nyb0012 .nyb0012top .nyb0012topbox ul li span{width:50px}.nyb0012 .nyb0012top .nyb0012topbox p{font-size:16px;line-height:30px}.nyb0012 .nyb0012bom li p{font-size:16px;line-height:30px}.nyb0012 .nyb0012bom li span{font-size:24px}.nyb0012 .nyb0012bom li span strong{font-size:70px}}@media(max-width:1440px){.nyb0012{padding-top:60px;padding-bottom:60px}.nyb0012 .nyb0012top{padding-bottom:30px;margin-bottom:25px}.nyb0012 .nyb0012top .nyb0012topbox h2{font-size:38px;line-height:45px}.nyb0012 .nyb0012top .nyb0012topbox ul li{font-size:14px}.nyb0012 .nyb0012top .nyb0012topbox ul li span{width:45px}.nyb0012 .nyb0012top .nyb0012topbox p{font-size:14px;line-height:28px}.nyb0012 .nyb0012bom li p{font-size:14px;line-height:28px}.nyb0012 .nyb0012bom li span{font-size:20px}.nyb0012 .nyb0012bom li span strong{font-size:60px}}@media(max-width:1280px){.nyb0012{padding-top:50px;padding-bottom:50px}.nyb0012 .nyb0012top .nyb0012topbox h2{font-size:30px;line-height:35px;margin-bottom:20px}.nyb0012 .nyb0012top .nyb0012topbox p{line-height:24px;margin-top:17px}.nyb0012 .nyb0012bom li p{line-height:24px}.nyb0012 .nyb0012bom li span strong{font-size:50px}}@media screen and (max-width:992px){.nyb0012{padding-top:40px;padding-bottom:40px}.nyb0012 .nyb0012top .nyb0012toppic{display:none}.nyb0012 .nyb0012top .nyb0012topbox{clear:both;float:none;width:100%}.nyb0012 .nyb0012top .nyb0012topbox h2{font-size:25px;line-height:30px;text-align:center}.nyb0012 .nyb0012top .nyb0012topbox ul{margin:0 -10px}.nyb0012 .nyb0012top .nyb0012topbox ul li{padding:0 10px}.nyb0012 .nyb0012top .nyb0012topbox p{margin-top:20px}.nyb0012 .nyb0012bom{margin:0 -10px}.nyb0012 .nyb0012bom li{padding:0 10px}.nyb0012 .nyb0012bom li span strong{font-size:40px}}@media screen and (max-width:782px){.nyb0012{padding-top:30px;padding-bottom:30px;padding-left:20px;padding-right:20px}.nyb0012 .nyb0012top .nyb0012topbox h2{font-size:20px;line-height:30px;text-align:center}.nyb0012 .nyb0012top .nyb0012topbox p{margin-top:20px}.nyb0012 .nyb0012bom{margin:0 -10px}.nyb0012 .nyb0012bom li{float:left;clear:none;width:50%;padding:0 10px}.nyb0012 .nyb0012bom li span strong{font-size:40px}.nyb0012 .nyb0012bom li p{line-height:24px;height:72px}}@media screen and (max-width:414px){.nyb0012 .nyb0012top .nyb0012topbox h2{font-size:18px;line-height:24px}.nyb0012 .nyb0012bom li{width:100%;padding:10px 0}.nyb0012 .nyb0012bom li p{height:auto}}",
                          headerFixed: "",
                          htmlCode: '<div class="nyb0012"><div class="container clearfix"><div class="nyb0012top clearfix"><p class="nyb0012toppic"><img src="images/nyb0012_about02.png" alt=""></p><div class="nyb0012topbox"><h2>CHINESE FIRST BRAND OF MINING MACHINERY</h2><ul class="clearfix"><li><span><img src="images/nyb0012_about03.png" alt=""></span>Continuing strategic</li><li><span><img src="images/nyb0012_about04.png" alt=""></span>Continuing operations</li><li><span><img src="images/nyb0012_about05.png" alt=""></span>sustainable development</li></ul><p>Our main product categories include crusher equipment,sand making machine,powder grinding mill,ore beneficiation plant, cement production plant. Over the past decades of years, Hongxing Machinery has been exported to over 120 countries, such as India, Indonesia, Malaysia, Saudi Arabic, Kenya, Tanzania, Ethiopia, Nigeria, South Africa, Chile, Brazil, Guyana, etc.</p></div></div><ul class="nyb0012bom clearfix"><li><span><strong>40</strong>+</span><p>Over 40 years development history</p></li><li><span><strong>30</strong>+</span><p>With an area of 300,000 ㎡ standard industrial workshops</p></li><li><span><strong>600</strong>+</span><p>More than 600 sets of various production equipment</p></li><li><span><strong>200</strong>+</span><p>Product export to over 200 countries</p></li></ul></div></div>',
                          maxWidth: "1440",
                          moduleGUID: "nyb0012",
                          moduleType: "moduleCulture",
                          pageType: "index,about",
                          parentModuleGUID: "",
                          usedClasses: "nyb0012top,nyb0012toppic,nyb0012topbox,nyb0012bom",
                      }
                  ]},
                  {pageType:'productDetailPage',moduleData:[
                      {
                          ID: 2011,
                          author: "聂亚兵",
                          coverContact: "",
                          createdDate: "2019-12-13 09:24:28",
                          cssCode: ".nyb0004{padding:60px 50px;position:relative;width:100%;max-width:1920px;margin:0 auto}.nyb0004 li{float:left;width:33.3333%;padding:0 50px;position:relative}.nyb0004 li i{clear:both;display:block;font-size:12px;font-style:normal;text-transform:capitalize;color:#999;position:relative;z-index:2;line-height:1}.nyb0004 li span{position:absolute;left:50%;color:#f5f5f5;font-size:170px;font-weight:bold;display:block;line-height:1;top:50%;margin-left:-95px;margin-top:-85px}.nyb0004 li h3{clear:both;display:block;padding:10px 0 20px 0;color:#ff525e;position:relative;z-index:2;font-size:24px;line-height:1}.nyb0004 li p{clear:both;display:block;font-size:16px;color:#666;line-height:30px;position:relative;z-index:2}@media(max-width:1600px){.nyb0004{padding:50px 40px}.nyb0004 li{padding:0 40px}.nyb0004 li h3{font-size:22px;padding:8px 0 18px 0}.nyb0004 li span{font-size:150px;margin-left:-83px;margin-top:-75px}}@media(max-width:1440px){.nyb0004{padding:40px 30px}.nyb0004 li{padding:0 30px}.nyb0004 li h3{font-size:20px;padding:7px 0 15px 0}.nyb0004 li p{font-size:14px;line-height:28px}.nyb0004 li span{font-size:120px;margin-left:-67px;margin-top:-60px}}@media(max-width:1280px){.nyb0004{padding:30px 20px}.nyb0004 li{padding:0 20px}.nyb0004 li p{line-height:24px}}@media screen and (max-width:992px){.nyb0004{padding:20px 15px}.nyb0004 li{padding:0 15px}.nyb0004 li h3{padding:6px 0 12px 0;font-size:18px}}@media screen and (max-width:782px){.nyb0004 li{float:none;clear:both;width:100%;padding:15px 5px}.nyb0004 li h3{padding:5px 0 10px 0;font-size:16px}}",
                          headerFixed: "",
                          htmlCode: '<ul class="nyb0004 clearfix"><li><i>we are helpers</i><h3>PRE-SALE SERVICE</h3><p>Provide quality technical consulting services, understand customer needs, according to the actual situation of production capacity, site design reasonable, economic supporting program.</p><span>01</span></li><li><i>we are helpers</i><h3>SALE SERVICE</h3><p>Provide door-to-door installation services, professional technical team door-to-door installation, commissioning equipment, guidance and training personnel, ensure efficient operation of the machine.</p><span>02</span></li><li><i>we are helpers</i><h3>AFTER-SALE SERVICE</h3><p>Provide regular return visit service to help users optimize equipment maintenance and timely analyze and solve the equipment problems feedback from customers.</p><span>03</span></li></ul>',
                          maxWidth: "100%",
                          moduleGUID: "nyb0004",
                          moduleType: "moduleService",
                          pageType: "index,about",
                          parentModuleGUID: "",
                          usedClasses: "nyb0004",
                      }
                  ]},
                  {pageType:'caseListPage',moduleData:[
                      {
                          ID: 2014,
                          author: "聂亚兵",
                          coverContact: "",
                          createdDate: "2019-12-13 09:51:39",
                          cssCode: '.nyb0007{padding:60px 0 70px 0}.nyb0007 h2{clear:both;display:block;text-align:center;font-size:50px;font-weight:400;color:#f77b6f;line-height:60px}.nyb0007 .nyb0007tit{clear:both;text-align:center;display:block;margin-top:29px;font-size:18px;font-weight:100;line-height:36px;color:#666}.nyb0007 div{clear:both;display:block;padding-top:50px;overflow:hidden}.nyb0007 div p{float:left;width:700px;position:relative;background:#fff;padding:8px 8px 8px 0;border-radius:20px;margin-right:10px}.nyb0007 div p img{position:relative;border-radius:20px;z-index:3;border-left:0;border-bottom:0}.nyb0007 div p:after{content:"";position:absolute;right:-8px;top:-8px;background:#f77b6f;width:110px;height:110px;border-radius:20px;z-index:-1}.nyb0007 div ul{float:right;border-left:1px dashed #d1d1d1;margin-left:6px;width:700px}.nyb0007 div ul li{position:relative;color:#414655;font-size:18px;line-height:30px;margin-bottom:25px;padding-left:30px}.nyb0007 div ul li:before{content:"";position:absolute;left:-7px;top:7px;width:13px;height:13px;border:2px solid #f77b6f;background-color:#FFF;-webkit-border-radius:50%;-moz-border-radius:50%;-ms-border-radius:50%;-o-border-radius:50%;border-radius:50%;box-sizing:border-box;-webkit-box-sizing:border-box}.nyb0007 div ul li:after{content:"";position:absolute;left:6px;top:20px;width:1px;height:180%;box-sizing:border-box;-webkit-box-sizing:border-box}.nyb0007 div ul li:first-child:after{content:"";position:absolute;left:6px;top:-22px;width:13px;height:100%;background-color:#FFF}.nyb0007 div ul li:last-child:after{content:"";position:absolute;left:-7px;top:22px;width:13px;height:100%;background-color:#FFF}@media(max-width:1600px){.nyb0007{padding:50px 0 60px 0}.nyb0007 h2{font-size:45px;line-height:50px}.nyb0007 .nyb0007tit{margin-top:25px;font-size:16px;line-height:30px}.nyb0007 div{padding-top:40px}.nyb0007 div p{width:650px}.nyb0007 div ul{width:560px}.nyb0007 div ul li{font-size:16px;line-height:28px;margin-bottom:20px;padding-left:25px}.nyb0007 div ul li:before{left:-6px;top:6px;width:12px;height:12px}}@media(max-width:1440px){.nyb0007{padding:50px 0 60px 0}.nyb0007 h2{font-size:40px;line-height:45px}.nyb0007 .nyb0007tit{margin-top:20px;font-size:14px;line-height:24px}.nyb0007 div{padding-top:35px}.nyb0007 div p{width:550px}.nyb0007 div ul{width:500px}.nyb0007 div ul li{font-size:14px;line-height:24px}.nyb0007 div ul li:before{left:-5px;top:5px;width:10px;height:10px}}@media(max-width:1280px){.nyb0007{padding:40px 0 50px 0}.nyb0007 h2{font-size:35px;line-height:40px}.nyb0007 .nyb0007tit{margin-top:15px}.nyb0007 div{padding-top:30px}.nyb0007 div p{width:480px;padding:5px 5px 5px 0}.nyb0007 div p:after{right:-5px;top:-5px}.nyb0007 div ul{width:420px}.nyb0007 div ul li:before{left:-5px;top:5px;width:10px;height:10px}}@media screen and (max-width:992px){.nyb0007{padding:40px 0 40px 0}.nyb0007 h2{font-size:30px;line-height:40px}.nyb0007 div p{width:370px;padding:5px 5px 5px 0}.nyb0007 div p:after{right:-5px;top:-5px}.nyb0007 div ul{width:340px}.nyb0007 div ul li{line-height:24px;margin-bottom:5px}}@media screen and (max-width:782px){.nyb0007{padding:30px 20px}.nyb0007 h2{font-size:30px;line-height:40px}.nyb0007 div{overflow:inherit}.nyb0007 div p{width:100%;padding:5px;float:none;clear:both;display:block;overflow:initial}.nyb0007 div p:after{right:-5px;top:-5px;left:-5px;bottom:-5px;width:auto;height:auto}.nyb0007 div ul{width:100%;float:none;clear:both;display:block;margin-top:35px}.nyb0007 div ul li{line-height:24px;margin-bottom:10px}}',
                          headerFixed: "",
                          htmlCode: '<div class="nyb0007 container"><h2>What We offer?</h2><p class="nyb0007tit">Ours has established a comprehensive service delivery system to ensure stable operation and to save lots of trouble and maintenance costs for you.</p><div><p><img src="images/nyb0007_about01.jpg" alt=""></p><ul><li>Free visit to the factory, workshop</li><li>Free machine test with materials</li><li>Understand the needs and conduct on-site investigations</li><li>Free pick-up by chauffeured car</li><li>Arrangement of the inspection as close as possible</li><li>customizing product solutions for customers</li></ul></div></div>',
                          maxWidth: "1440",
                          moduleGUID: "nyb0007",
                          moduleType: "moduleService",
                          pageType: "about",
                          parentModuleGUID: "",
                          usedClasses: "nyb0007,nyb0007tit",
                      }
                  ]},
                  {pageType:'caseDetailPage',moduleData:[
                      {
                          ID: 2016,
                          author: "聂亚兵",
                          coverContact: "",
                          createdDate: "2019-12-13 11:37:13",
                          cssCode: ".nyb0009{padding-top:70px;padding-bottom:70px}.nyb0009 div{clear:both;text-align:center}.nyb0009 div h2{position:relative;padding-bottom:25px;font-size:35px;margin-bottom:20px}.nyb0009 div h2:after,.nyb0009 div h2:before{content:'';position:absolute;left:50%;transform:translateX(-50%);height:2px;background:#f51e46}.nyb0009 div h2:before{width:45px;bottom:0}.nyb0009 div h2:after{width:80px;bottom:5px}.nyb0009 div p{max-width:1150px;color:#727272;line-height:30px;font-size:16px;margin:0 auto}.nyb0009 ul{position:relative;overflow:hidden;margin-top:35px}.nyb0009 ul li{float:left;width:14%}.nyb0009 ul li span{clear:both;display:block;width:80px;margin:0 auto}.nyb0009 ul li p{color:#48485b;font-weight:lighter;padding:15px 0 0 0;width:100%;text-align:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;font-size:16px;line-height:30px}@media(max-width:1600px){.nyb0009{padding-top:60px;padding-bottom:60px}.nyb0009 div h2{padding-bottom:20px;font-size:32px;margin-bottom:18px}.nyb0009 ul{margin-top:30px}.nyb0009 ul li p{padding:15px 0 0 0;font-size:15px;line-height:30px}}@media(max-width:1440px){.nyb0009{padding-top:50px;padding-bottom:50px}.nyb0009 div h2{padding-bottom:18px;font-size:28px;margin-bottom:15px}.nyb0009 div p{line-height:28px;font-size:14px}.nyb0009 ul{margin-top:25px}.nyb0009 ul li p{font-size:14px}}@media(max-width:1280px){.nyb0009{padding-top:40px;padding-bottom:40px}.nyb0009 ul{margin-top:15px}.nyb0009 ul li{width:25%;padding:10px 0}.nyb0009 ul li p{padding:10px 0 0 0}}@media screen and (max-width:992px){.nyb0009{padding:30px 20px}.nyb0009 ul{margin-top:15px}.nyb0009 ul li{width:25%;padding:10px 0}.nyb0009 ul li p{padding:10px 0 0 0}}@media screen and (max-width:782px){.nyb0009 div h2{padding-bottom:18px;font-size:20px;margin-bottom:15px}.nyb0009 div p{line-height:24px}.nyb0009 ul li{width:33.3333%}}@media screen and (max-width:414px){.nyb0009 ul li{width:50%}}@media screen and (max-width:375px){.nyb0009 ul li{float:none;clear:both;width:100%;position:relative;padding:0 0 0 55px;margin-top:15px}.nyb0009 ul li span{width:40px;position:absolute;left:0;top:0}.nyb0009 ul li p{clear:both;text-align:left;line-height:24px;padding:8px 0;font-size:14px}}",
                          headerFixed: "",
                          htmlCode: '<div class="nyb0009 container"><div><h2>SERVICE AND SUPPORT</h2><p>Ours has set up good service philosophy: timely repair the equipment when it breaks down; provide project design and production flow designing for the customers; formulate the equipment purchase plan for the customers; provide high-quality products; provide considerate customer training; timely and effectively repair the fault of the equipment and test and solve the difficult processing problems for the customers.</p></div><ul><li><span><img src="images/nyb0009_about01.png" alt=""></span><p>Recommended equipment</p></li><li><span><img src="images/nyb0009_about02.png" alt=""></span><p>Drafting a plan</p></li><li><span><img src="images/nyb0009_about03.png" alt=""></span><p>Testing the machine</p></li><li><span><img src="images/nyb0009_about04.png" alt=""></span><p>Site planning</p></li><li><span><img src="images/nyb0009_about05.png" alt=""></span><p>Installation instructions</p></li><li><span><img src="images/nyb0009_about06.png" alt=""></span><p>Technical training</p></li><li><span><img src="images/nyb0009_about07.png" alt=""></span><p>Project acceptance</p></li></ul></div>',
                          maxWidth: "1440",
                          moduleGUID: "nyb0009",
                          moduleType: "moduleService",
                          pageType: "index,about",
                          parentModuleGUID: "",
                          usedClasses: "nyb0009",
                      }
                  ]},
                  {pageType:'contactPage',moduleData:[
                      {
                          ID: 2017,
                          author: "聂亚兵",
                          coverContact: "",
                          createdDate: "2019-12-13 13:49:18",
                          cssCode: ".nyb0010{padding-top:70px;padding-bottom:70px}.nyb0010 p{color:#48485b;width:100%;text-align:left;font-size:16px;line-height:30px}.nyb0010 div{clear:both;text-align:center}.nyb0010 div h2{position:relative;padding-bottom:25px;font-size:35px;margin-bottom:20px}.nyb0010 div h2:after,.nyb0010 div h2:before{content:'';position:absolute;left:50%;transform:translateX(-50%);height:2px;background:#f51e46}.nyb0010 div h2:before{width:45px;bottom:0}.nyb0010 div h2:after{width:80px;bottom:5px}.nyb0010 div p{max-width:1150px;color:#666;margin:0 auto;text-align:center}.nyb0010 ul{position:relative;overflow:hidden;margin-top:35px;margin-left:-3%;margin-bottom:35px}.nyb0010 ul li{float:left;width:30.3333%;margin-left:3%}.nyb0010 ul li span{clear:both;display:block;width:100%;margin-bottom:20px}.nyb0010 ul li span img{width:100%}@media(max-width:1600px){.nyb0010{padding-top:60px;padding-bottom:60px}.nyb0010 div h2{padding-bottom:25px;font-size:32px;margin-bottom:20px}}@media(max-width:1440px){.nyb0010{padding-top:50px;padding-bottom:50px}.nyb0010 p{font-size:14px;line-height:28px}.nyb0010 div h2{padding-bottom:25px;font-size:28px;margin-bottom:20px}.nyb0010 ul{margin-top:30px;margin-bottom:30px}.nyb0010 ul li span{margin-bottom:10px}}@media(max-width:1280px){.nyb0010{padding-top:40px;padding-bottom:40px}.nyb0010 div h2{font-size:24px;margin-bottom:15px}.nyb0010 ul{margin-top:25px;margin-bottom:25px}}@media screen and (max-width:992px){.nyb0010{padding-top:30px;padding-bottom:30px}.nyb0010 p{line-height:24px}.nyb0010 div h2{padding-bottom:15px;font-size:22px;line-height:30px;margin-bottom:10px}.nyb0010 ul{margin-top:20px;margin-bottom:20px}}@media screen and (max-width:782px){.nyb0010{padding-left:20px;padding-right:20px}.nyb0010 div h2{font-size:18px;line-height:24px}.nyb0010 ul{margin-top:20px;margin-bottom:20px}}@media screen and (max-width:414px){.nyb0010 ul{margin-top:10px}.nyb0010 ul li{float:none;padding-top:15px;clear:both;width:100%}}",
                          headerFixed: "",
                          htmlCode: '<div class="nyb0010 container"><div><h2>Intimate After Sale</h2><p>Being customer-oriented, Fote is committed to providing the best solutions and turn-key projects for global customers; and relying on new advanced customer service platform.</p></div><ul><li><span><img src="images/nyb0010_about01.jpg" alt=""></span><p>Send skilled engineers, the entire site installation instruction, until the equipment and stable operation.</p></li><li><span><img src="images/nyb0010_about02.jpg" alt=""></span><p>The tracking service for the customer, regular inspection equipment, to provide customers with free technical advice and guidance.</p></li><li><span><img src="images/nyb0010_about03.jpg" alt=""></span><p>Perfect customer data files, implements the lifelong service for the sales of equipment, and provide all kinds of spare parts and consumables, in a timely manner to solve customer\'s worries.</p></li></ul></div>',
                          maxWidth: "1440",
                          moduleGUID: "nyb0010",
                          moduleType: "moduleService",
                          pageType: "about",
                          parentModuleGUID: "",
                          usedClasses: "nyb0010",
                      }
                  ]},
                  {pageType:'longTailWordPage',moduleData:[
                      {
                          ID: 4022,
                          author: "聂亚兵",
                          coverContact: "",
                          createdDate: "2019-12-13 19:17:35",
                          cssCode: ".nyb0015{clear:both;display:block;overflow:hidden}.nyb0015 .nyb0015fl{float:left;width:50%;padding:70px 0;background:url(../images/nyb0015_about01.jpg) no-repeat right center #00468e;background-size:cover}.nyb0015 .nyb0015fl .nyb0015flbox{float:right;width:700px;height:457px;padding-right:80px}.nyb0015 .nyb0015fl .nyb0015flbox .nyb0015fltit{clear:both;display:block;font-size:14px;color:#bbd9fd;font-weight:100;line-height:1}.nyb0015 .nyb0015fl .nyb0015flbox h2{color:#fff;padding:5px 0 50px 0;font-size:30px;line-height:40px;font-weight:bold}.nyb0015 .nyb0015fl .nyb0015flbox h2 span{color:#df6f2f}.nyb0015 .nyb0015fl .nyb0015flbox .nyb0015fltxt{font-size:18px;line-height:40px;color:#deeeff}.nyb0015 .nyb0015fr{float:left;width:50%;padding:70px 0;background:url(../images/nyb0015_about02.jpg) no-repeat left center #df6f2f;background-size:cover}.nyb0015 .nyb0015fr .nyb0015frbox{float:left;width:700px;padding-left:80px}.nyb0015 .nyb0015fr .nyb0015frbox ul{clear:both;display:block}.nyb0015 .nyb0015fr .nyb0015frbox ul li{float:left;width:50%;padding:15px 10px}.nyb0015 .nyb0015fr .nyb0015frbox ul li i{clear:both;display:block;margin:0 auto;width:90px}.nyb0015 .nyb0015fr .nyb0015frbox ul li p{clear:both;display:block;color:#fff}.nyb0015 .nyb0015fr .nyb0015frbox ul li p strong{clear:both;display:block;font-size:35px;font-weight:bold;line-height:1;padding:15px 0;text-align:center}.nyb0015 .nyb0015fr .nyb0015frbox ul li p span{clear:both;display:block;color:#ffe9dc;font-size:18px;font-weight:100;text-transform:uppercase;font-style:normal;line-height:30px;text-align:center}@media(max-width:1600px){.nyb0015 .nyb0015fl,.nyb0015 .nyb0015fr{padding:60px 0}.nyb0015 .nyb0015fl .nyb0015flbox,.nyb0015 .nyb0015fr .nyb0015frbox{width:640px}.nyb0015 .nyb0015fl .nyb0015flbox{padding-right:60px;height:433px}.nyb0015 .nyb0015fr .nyb0015frbox{padding-left:60px}.nyb0015 .nyb0015fl .nyb0015flbox h2{font-size:28px;line-height:45px;padding-top:10px}.nyb0015 .nyb0015fl .nyb0015flbox .nyb0015fltxt{font-size:16px;line-height:35px}.nyb0015 .nyb0015fr .nyb0015frbox ul li i{width:75px}.nyb0015 .nyb0015fr .nyb0015frbox ul li p span{font-size:16px;line-height:30px}}@media(max-width:1440px){.nyb0015 .nyb0015fl,.nyb0015 .nyb0015fr{padding:50px 0}.nyb0015 .nyb0015fl .nyb0015flbox,.nyb0015 .nyb0015fr .nyb0015frbox{width:560px}.nyb0015 .nyb0015fl .nyb0015flbox{height:392px}.nyb0015 .nyb0015fl .nyb0015flbox h2{font-size:24px;line-height:40px;padding-top:5px;padding-bottom:30px}.nyb0015 .nyb0015fl .nyb0015flbox .nyb0015fltxt{font-size:14px;line-height:30px}.nyb0015 .nyb0015fr .nyb0015frbox ul li i{width:65px}.nyb0015 .nyb0015fr .nyb0015frbox ul li p span{font-size:14px;line-height:24px;text-align:left}}@media(max-width:1280px){.nyb0015 .nyb0015fl,.nyb0015 .nyb0015fr{padding:40px 0}.nyb0015 .nyb0015fl .nyb0015flbox,.nyb0015 .nyb0015fr .nyb0015frbox{width:480px}.nyb0015 .nyb0015fl .nyb0015flbox{padding-right:30px;height:356px}.nyb0015 .nyb0015fl .nyb0015flbox h2{font-size:18px;line-height:24px;padding-bottom:20px}.nyb0015 .nyb0015fl .nyb0015flbox .nyb0015fltxt{line-height:24px}.nyb0015 .nyb0015fr .nyb0015frbox{padding-left:10px}.nyb0015 .nyb0015fr .nyb0015frbox ul li i{width:55px}.nyb0015 .nyb0015fr .nyb0015frbox ul li p strong{padding:10px 0}}@media screen and (max-width:992px){.nyb0015 .nyb0015fl,.nyb0015 .nyb0015fr{padding:30px 0}.nyb0015 .nyb0015fl .nyb0015flbox,.nyb0015 .nyb0015fr .nyb0015frbox{width:375px}.nyb0015 .nyb0015fl .nyb0015flbox{height:340px}.nyb0015 .nyb0015fr .nyb0015frbox{padding-left:10px}.nyb0015 .nyb0015fl .nyb0015flbox h2{font-size:20px;line-height:30px;padding-bottom:25px}.nyb0015 .nyb0015fl .nyb0015flbox .nyb0015fltxt{line-height:28px}.nyb0015 .nyb0015fr .nyb0015frbox ul li{float:none;clear:both;width:100%;padding:10px 0;overflow:hidden}.nyb0015 .nyb0015fr .nyb0015frbox ul li i{width:55px;float:left}.nyb0015 .nyb0015fr .nyb0015frbox ul li p{float:left;clear:none;padding-left:15px;width:300px}.nyb0015 .nyb0015fr .nyb0015frbox ul li p strong{padding:0;text-align:left}}@media screen and (max-width:782px){.nyb0015 .nyb0015fl,.nyb0015 .nyb0015fr{float:none;clear:both;display:block;width:100%;padding:30px 20px;overflow:hidden}.nyb0015 .nyb0015fl .nyb0015flbox{width:100%;height:auto}.nyb0015 .nyb0015fr .nyb0015frbox{width:100%;padding-left:0;height:auto}.nyb0015 .nyb0015fr .nyb0015frbox ul li i{float:none}.nyb0015 .nyb0015fr .nyb0015frbox ul li p{width:100%}.nyb0015 .nyb0015fr .nyb0015frbox ul li p span{text-align:center}.nyb0015 .nyb0015fr .nyb0015frbox ul li p strong{padding:15px 0;text-align:center}}",
                          headerFixed: "",
                          htmlCode: '<div class="nyb0015 clearfix"><div class="nyb0015fl"><div class="nyb0015flbox"><p class="nyb0015fltit">WELCOME TO OUR COMPANY</p><h2>Leading<span>Manufacturer</span> And<span>Export Base</span> of Mining Machinery</h2><p class="nyb0015fltxt">located in Luoyang City,China,is the leading manufacturer and exporter of mining machinery.It has almost 40 year history.Our main product categories include crusher equipment,sand making machine,powder grinding mill,ore beneficiation plant, cement production plant.We provide single equipment and full product plant at 100% factory price for you.</p></div></div><div class="nyb0015fr"><div class="nyb0015frbox"><ul class="clearfix"><li><i><img src="images/nyb0015_about03.png" alt=""></i><p><strong>40</strong><span>40 year development history</span></p></li><li><i><img src="images/nyb0015_about04.png" alt=""></i><p><strong>50</strong><span>Over 50 kinds of products for sale</span></p></li><li><i><img src="images/nyb0015_about05.png" alt=""></i><p><strong>120</strong><span>Export to over 120 countries</span></p></li><li><i><img src="images/nyb0015_about06.png" alt=""></i><p><strong>300</strong><span>More than 300 technical and sales staffs</span></p></li></ul></div></div></div>',
                          maxWidth: "1440",
                          moduleGUID: "nyb0015",
                          moduleType: "modulePower",
                          pageType: "index,about",
                          parentModuleGUID: "",
                          usedClasses: "nyb0015fl,nyb0015fr,nyb0015frbox,nyb0015flbox,nyb0015fltit,nyb0015fltxt",
                      }
                  ]},
              ],
          }
          serverWebsiteData.headerFont = "";
          if(serverWebsiteData.headerFixed == "0"){
              serverWebsiteData.headerFont = "否";
          }else{
              serverWebsiteData.headerFont = "是";
          }
          serverWebsiteData.pageData.forEach(function(item,index){
              item.name = "";
              item.isActive = false;
              if(index == 0){
                  item.isActive = true;
              }
              if(item.pageType == "indexPage"){
                  item.name = "首页";
                  item.icon = "icon-home";
              }else if(item.pageType == "aboutPage"){
                  item.name = "关于我们";
                  item.icon = "icon-about";
              }else if(item.pageType == "productListPage"){
                  item.name = "产品列表";
                  item.icon = "icon-product";
              }else if(item.pageType == "productDetailPage"){
                  item.name = "产品详情";
                  item.icon = "icon-article";
              }else if(item.pageType == "caseListPage"){
                  item.name = "案例列表";
                  item.icon = "icon-case";
              }else if(item.pageType == "caseDetailPage"){
                  item.name = "案例详情";
                  item.icon = "icon-detail";
              }else if(item.pageType == "contactPage"){
                  item.name = "联系我们";
                  item.icon = "icon-contact";
              }else if(item.pageType == "longTailWordPage"){
                  item.name = "长尾词页";
                  item.icon = "icon-ltw";
              }
          });
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
          serverWebsiteData.pageData.forEach(function(item,index){
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
                  if(item.pageType == "indexPage"){
                          $this.publicData.indexHtmlCode += items.htmlCode;
                          $this.publicData.indexCssCode += items.cssCode;
                  }else if(item.pageType == "aboutPage"){
                          $this.publicData.aboutHtmlCode += items.htmlCode;
                          $this.publicData.aboutCssCode += items.cssCode;
                  }else if(item.pageType == "productListPage"){
                          $this.publicData.productListHtmlCode += items.htmlCode;
                          $this.publicData.productListCssCode += items.cssCode;
                  }else if(item.pageType == "productDetailPage"){
                          $this.publicData.productDetailHtmlCode += items.htmlCode;
                          $this.publicData.productDetailCssCode += items.cssCode;
                  }else if(item.pageType == "caseListPage"){
                          $this.publicData.caseListHtmlCode += items.htmlCode;
                          $this.publicData.caseListCssCode += items.cssCode;
                  }else if(item.pageType == "caseDetailPage"){
                          $this.publicData.caseDetailHtmlCode += items.htmlCode;
                          $this.publicData.caseDetailCssCode += items.cssCode;
                  }else if(item.pageType == "contactPage"){
                          $this.publicData.contactHtmlCode += items.htmlCode;
                          $this.publicData.contactCssCode += items.cssCode;
                  }else if(item.pageType == "longTailWordPage"){
                          $this.publicData.longTailWordHtmlCode += items.htmlCode;
                          $this.publicData.longTailWordCssCode += items.cssCode;
                  }
              });
          });
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
          $this.websiteData = serverWebsiteData;
          $this.showCode = "<style>" + $this.publicData.indexCssCode + "</style>" + $this.publicData.indexHtmlCode;
          console.log($this.showCode);
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