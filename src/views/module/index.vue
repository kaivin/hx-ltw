<template>
  <div class="page-root">
      <div class="module-panel" v-bind:style="{paddingTop:searchData.isSearchAbsolute&&searchData.isSearchShow?searchData.searchHeight + 53 +'px':'53px'}">
          <div class="item-header"><span class="iconfont icon-add" v-on:click="showModuleDialog('add')">添加模块</span></div>
          <div class="abs-search" ref="search" v-bind:class="{'show':searchData.isSearchShow,'abs':searchData.isSearchAbsolute}" v-bind:style="{top:searchData.isSearchAbsolute&&searchData.isSearchShow?'53px':searchData.isSearchAbsolute&&!searchData.isSearchShow?-(searchData.searchHeight-53) +'px':'0'}">
            <div class="search-panel">
              <div class="item-search module-select">
                <el-select v-model="searchData.selectedModuleType" v-on:change="changeSelectedModuleType" multiple clearable placeholder="请选择模块类型">
                  <el-option
                    v-for="item in searchData.moduleType"
                    :key="item.type"
                    :label="item.name"
                    :value="item.type">
                  </el-option>
                </el-select>
              </div>
              <div class="item-search width-select">
                <el-select v-model="searchData.selectedMaxWidth" v-on:change="changeSelectedMaxWidth" multiple clearable placeholder="请选择有效宽度">
                  <el-option
                    v-for="item in searchData.maxWidth"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <div class="item-search author-select">
                <el-select v-model="searchData.selectedAuhtor" v-on:change="changeSelectedAuthor" multiple clearable placeholder="请选择添加人">
                  <el-option
                    v-for="item in searchData.authors"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <div class="item-search guid-panel"><el-input placeholder="请输入模块唯一标识类名" v-model="searchData.moduleGUID" clearable></el-input></div>
              <div class="item-search btn-panel"><el-button type="primary" v-on:click="getSearchResult">搜索</el-button></div>
            </div>
            <span class="menu-panel iconfont" v-if="searchData.isSearchAbsolute" v-bind:class="searchData.isSearchShow?'icon-up':'icon-down'" v-on:click="toggleSearchPanel"></span>
          </div>
          <div class="item-content" v-bind:class="searchData.isSearchShow?'show':'hide'">
            <div class="module-list" v-if="searchData.isModuleShow">
              <div class="item-module" v-for="(item,index) in moduleData" v-bind:key="index">
                <div class="module-header"><span>模块标识：{{item.moduleGUID}}</span><span>添加时间：{{item.createdDate}}</span></div>
                <div class="module-body" v-html="item.showCode"></div>
                <div class="module-footer">
                  <span>添加人：{{item.author}}</span>
                  <div class="edit-button">
                    <span class="copy-code" v-clipboard:copy="item.copyHtmlCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制代码</span>
                    <span class="copy-code" v-clipboard:copy="item.copyCssCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制样式</span>
                    <span class="btn-edit" v-on:click="showModuleDialog('',item)">编辑</span>
                    <span class="btn-delete" v-on:click="deleteModel(item)">删除</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="empty-panel" v-else>
              <p v-if="searchData.isModuleEmpty">暂无相关模块数据，可以在这里<span v-on:click="showModuleDialog('add')">添加模块</span>相关数据</p>
              <p v-else>请选择你要查询的模块类型</p>
            </div>
          </div>
          <div class="abs-dialog" v-bind:class="moduleDialog.isModuleDialog?'show':'hide'">
            <div class="dialog-panel">
              <div class="dialog-header"><h2>{{moduleDialog.moduleDialogTitle}}</h2><span class="iconfont icon-close" v-on:click="closeModuleDialog"></span></div>
              <div class="dialog-body">
                <div class="form-panel">
                    <div class="item-form">
                        <div class="item-title">模块标识类名：</div>
                        <div class="item-body">
                            <el-input v-model="formData.moduleGUID" v-bind:disabled="moduleDialog.isDisabled" placeholder="模块的唯一标识类名"></el-input>
                        </div>
                    </div>
                    <div class="item-form">
                        <div class="item-title">所属模块：</div>
                        <div class="item-body"> 
                            <el-radio v-for="(item,index) in formData.moduleType" v-bind:key="index" v-model="formData.selectedModuleType" v-bind:label="item.type" v-on:change="changeModuleTypeState" v-bind:disabled="moduleDialog.isDisabled" border>{{item.name}}</el-radio>
                        </div>
                        <div class="item-des">{{formData.selectedModuleTypeDes}}</div>
                    </div>
                    <div class="item-form" v-if="isHeader">
                        <div class="item-title">侧边固定：</div>
                        <div class="item-body"> 
                            <el-radio v-for="(item,index) in formData.headerFixedData" v-bind:key="index" v-model="formData.headerFixed" v-bind:label="item.type" v-on:change="changeHeaderFixedState" border>{{item.name}}</el-radio>
                        </div>
                    </div>
                    <div class="item-form" v-if="isContactMessage">
                        <div class="item-title">是否包含联系方式：</div>
                        <div class="item-body"> 
                            <el-radio v-for="(item,index) in formData.coverContactInfo" v-bind:key="index" v-model="formData.coverContact" v-bind:label="item.type" v-on:change="changeCoverContactState" border>{{item.name}}</el-radio>
                        </div>
                    </div>
                    <div class="item-form" v-if="isBanner">
                        <div class="item-title">父级模块标识类名：<span>banner以及组合页头会存在首页和内页必须成套搭配的情况，提交时内页的该模块需要在这里填上首页的模块唯一标识类名</span></div>
                        <div class="item-body">
                            <el-input v-model="formData.parentModuleGUID" placeholder="模块的唯一标识类名"></el-input>
                        </div>
                    </div>
                    <div class="item-form">
                        <div class="item-title">适用页面：</div>
                        <div class="item-body">
                            <el-checkbox v-for="(item,index) in formData.pageType" v-bind:key="index" v-model="item.isSelected" v-bind:label="item.name" v-on:change="changePageTypeState(item)" v-bind:disabled="item.isDisabled" border></el-checkbox>
                        </div>
                    </div>
                    <div class="item-form">
                        <div class="item-title">有效宽度：</div>
                        <div class="item-body">
                            <el-radio v-for="(item,index) in formData.maxWidthData" v-bind:key="index" v-model="formData.selectedMaxWidth" v-bind:label="item.type" v-on:change="changeMaxWdithState" border>{{item.name}}</el-radio>
                        </div>
                    </div>
                    <div class="item-form">
                        <div class="item-title">添加人：</div>
                        <div class="item-body">
                            <el-radio v-for="(item,index) in formData.authorData" v-bind:key="index" v-model="formData.selectedAuthor" v-bind:label="item.type" v-on:change="changeAuthorState" border>{{item.name}}</el-radio>
                        </div>
                    </div>
                    <div class="item-form">
                        <div class="item-title">使用类名：<span>模块中的所有靠近<em>="</em>的类名；例：class="wrapper wjk-0001"，其中wrapper符合规则</span></div>
                        <div class="item-body">
                            <el-input v-model="formData.usedClasses" placeholder="多个类名使用逗号分隔"></el-input>
                        </div>
                    </div>
                    <div class="item-form">
                        <div class="item-title">html代码：</div>
                        <div class="item-body">
                            <el-input type="textarea" v-model="formData.htmlCode"></el-input>
                        </div>
                    </div>
                    <div class="item-form">
                        <div class="item-title">css样式：</div>
                        <div class="item-body">
                            <el-input type="textarea" v-model="formData.cssCode"></el-input>
                        </div>
                    </div>
                </div>
              </div>
              <div class="dialog-footer"><el-button type="primary" v-on:click="saveModuleData">保存</el-button><el-button v-on:click="closeModuleDialog" type="info" plain>取消</el-button></div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'modulePage',
    data: function(){
        return {
            moduleDialog:{
              isModuleDialog:false,
              moduleDialogTitle:'',
              isDisabled:false,
            },
            searchData:{
              selectedModuleType:'',
              moduleType:[
                {type:'moduleHeader',name:'页头'},
                {type:'moduleBanner',name:'banner'},
                {type:'moduleComboHeader',name:'组合页头'},
                {type:'moduleImgList',name:'图文列表'},
                {type:'moduleFontList',name:'文字列表'},
                {type:'moduleComboList',name:'组合列表'},
                {type:'moduleCateList',name:'分类列表'},
                {type:'moduleImgArticle',name:'图文详情'},
                {type:'moduleMainArticle',name:'正文详情'},
                {type:'moduleComboArticle',name:'组合详情'},
                {type:'moduleComboLongTailWord',name:'组合长尾词'},
                {type:'moduleComboNews',name:'组合新闻'},
                {type:'moduleProfile',name:'公司简介'},
                {type:'moduleCulture',name:'公司文化'},
                {type:'moduleService',name:'公司服务'},
                {type:'modulePower',name:'公司实力'},
                {type:'modulePartner',name:'国际合作'},
                {type:'moduleContact',name:'联系方式'},
                {type:'moduleMessage',name:'留言板'},
                {type:'moduleDecoration',name:'装饰模块'},
                {type:'moduleFooter',name:'页脚'},
              ],
              selectedMaxWidth:'',
              maxWidth:[
                {key:"100%",name:"通屏"},
                {key:"1440",name:"1440"},
                {key:"1280",name:"1280"},
                {key:"960",name:"960"},
              ],
              selectedAuthor:"",
              authors:[
                  {key:"nyb",name:"聂亚兵"},
                  {key:"zxy",name:"张校远"},
                  {key:"zyx",name:"赵亚雄"},
                  {key:"wjk",name:"王军凯"},
                  {key:"njh",name:"聂俊辉"},
              ],
              moduleGUID:'',
              isModuleShow:false,
              isModuleEmpty:false,
              isSearchShow:true,
              isSearchAbsolute:false,
              searchHeight:'',
            },
            moduleData:[],
            isHeader: false,
            isContactMessage:false,
            isBanner:false,
            formData:{
                selectedModuleType:"",
                selectedModuleTypeDes:"",
                moduleType:[
                    {type:'moduleHeader',name:'页头',descript:"分侧边固定显示、页头显示"},
                    {type:'moduleBanner',name:'banner',descript:"分只适用于首页、不适用首页两种（不适用首页则适用所有其他页面、面包屑模块与该模块一体）"},
                    {type:'moduleComboHeader',name:'组合页头',descript:"页头、banner一体（首页以外的页面面包屑与该模块一体）"},
                    {type:'moduleImgList',name:'图文列表',descript:"所有带图片的列表、包括首页带标题的产品列表、案例列表；列表页的产品列表、案例列表；长尾词页的产品列表、案例列表；详情页的相关产品、案例列表；如匹配到没有标题文本的，自行添加标题文本"},
                    {type:'moduleFontList',name:'文字列表',descript:"所有不带图片的列表，其他同图文列表"},
                    {type:'moduleComboList',name:'组合列表',descript:"首页、产品、案例、长尾词列表页，如果是左右布局结构，则写成一个模块，其模块属性是组合列表（首页有独特布局格式的也属于组合列表，只是在选择适用页面时，只适用首页）"},
                    {type:'moduleCateList',name:'分类列表',descript:"产品列表页的分类模块"},
                    {type:'moduleImgArticle',name:'图文详情',descript:"产品、案例详情页的详细参数模块"},
                    {type:'moduleMainArticle',name:'正文详情',descript:"产品、案例详情页的正文部分模块"},
                    {type:'moduleComboArticle',name:'组合详情',descript:"产品、案例详情页，如果是左右布局结构，则写成一个模块，其模块属性是组合详情"},
                    {type:'moduleComboLongTailWord',name:'组合长尾词',descript:"长尾词页面为左右布局结构(留言板也只在一侧显示)"},
                    {type:'moduleComboNews',name:'组合新闻',descript:"只适合放在页脚上方的新闻、产品文字列表组合模块；该模块也可包含联系地址、关于我们等"},
                    {type:'moduleProfile',name:'公司简介',descript:"隶属于关于我们"},
                    {type:'moduleCulture',name:'公司文化',descript:"隶属于关于我们"},
                    {type:'moduleService',name:'公司服务',descript:"隶属于关于我们，其包括：服务流程、售后服务"},
                    {type:'modulePower',name:'公司实力',descript:"隶属于关于我们，其包括：生产能力、发展历程、公司荣誉、公司环境、数字化展示模块（整个模块就只是几个突出数字的那种模块）"},
                    {type:'modulePartner',name:'国际合作',descript:"隶属于关于我们"},
                    {type:'moduleContact',name:'联系方式',descript:"独立的展示邮箱、地址、商务通链接的模块"},
                    {type:'moduleMessage',name:'留言板',descript:"分带联系方式、不带联系方式两种"},
                    {type:'moduleDecoration',name:'装饰模块',descript:"可适用所有页面，暂定为以引导用户点击或提交邮箱账号用的单独模块，除该作用相关信息外，无其他主要信息展示的模块"},
                    {type:'moduleFooter',name:'页脚',descript:"页面底部信息，可包含返回顶部、移动端底部商务通"},
                ],
                headerFixed:"",
                headerFixedData:[
                    {type:'0',name:"否"},
                    {type:'1',name:"是"},
                ],
                coverContact:'',
                coverContactInfo:[
                    {type:'0',name:"否"},
                    {type:'1',name:"是"},
                ],
                pageType:[
                    {type:'index',name:'首页',isSelected:false,isDisabled:false},
                    {type:'about',name:'关于我们',isSelected:false,isDisabled:false},
                    {type:'list',name:'列表页',isSelected:false,isDisabled:false},
                    {type:'article',name:'详情页',isSelected:false,isDisabled:false},
                    {type:'contact',name:'联系我们',isSelected:false,isDisabled:false},
                    {type:'longTailWord',name:'长尾词页',isSelected:false,isDisabled:false},
                ],
                selectedMaxWidth:"",
                maxWidthData:[
                    {type:"100%",name:"通屏"},
                    {type:"1440",name:"1440"},
                    {type:"1280",name:"1280"},
                    {type:"960",name:"960"},
                ],
                selectedAuthor:"",
                authorData:[
                    {type:"nyb",name:"聂亚兵"},
                    {type:"zxy",name:"张校远"},
                    {type:"zyx",name:"赵亚雄"},
                    {type:"wjk",name:"王军凯"},
                    {type:"njh",name:"聂俊辉"},
                ],
                usedClasses:'',
                parentModuleGUID:'',
                moduleGUID:'',
                htmlCode:'',
                cssCode:'',
            },
            saveData:{}
        }
    },
    beforeCreate:function(){},
    computed:{},
    methods:{
        clickDefault:function(){
          var $this = this;
          var router = $this.$router;
          $this.$store.dispatch('header/changeActive','default');
          $this.$store.dispatch('header/changePageType','default');
          router.push({path: '/'});
        },
        // 代码复制成功提示
        onCopy: function (e) {
            this.$message({
                message: '恭喜你，复制成功！',
                type: 'success'
            });
        },
        // 代码复制失败提示
        onError: function (e) {
            this.$message.error('很遗憾，复制失败!');
        },
        // 添加/编辑模块显示弹窗的点击事件
        showModuleDialog:function(type,items){
          var $this = this;
          $this.moduleDialog.isModuleDialog = true;
          if(type=='add'){
            $this.moduleDialog.isDisabled = false;
            $this.moduleDialog.moduleDialogTitle = "添加模块";
          }else{
            $this.moduleDialog.isDisabled = true;
            $this.moduleDialog.moduleDialogTitle = "编辑模块";
            $this.formData.selectedModuleType = items.moduleType;
            $this.formData.moduleType.forEach(function(item,index){
              if(item.type == items.selectedModuleType){
                $this.formData.selectedModuleTypeDes = item.descript;
              }
            });
            if(items.selectedModuleType == "moduleHeader"){
              $this.isHeader = true;
            }
            $this.formData.headerFixed = items.headerFixed;
            if(items.selectedModuleType == "moduleMessage"){
              $this.isContactMessage = true;
            }
            if(items.selectedModuleType == "moduleBanner"||items.selectedModuleType == "moduleComboHeader"){
              $this.isBanner = true;
            }
            $this.formData.pageType.forEach(function(item,index){
              var isExist = $this.patch(item.type,items.pageType);
              console.log(item.name+":"+isExist);
              if(isExist>0){
                item.isSelected = true;
              }
              if(items.selectedModuleType == "moduleHeader"||items.selectedModuleType == "moduleCateList"||items.selectedModuleType == "moduleImgArticle"||items.selectedModuleType == "moduleMainArticle"||items.selectedModuleType == "moduleComboArticle"||items.selectedModuleType == "moduleComboLongTailWord"||items.selectedModuleType == "moduleContact"||$this.formData.selectedModuleType == "moduleComboNews"||$this.formData.selectedModuleType == "moduleDecoration"||$this.formData.selectedModuleType == "moduleFooter"){
                item.isDisabled = true;
              }else if(items.selectedModuleType == "moduleImgList"||items.selectedModuleType == "moduleFontList"||items.selectedModuleType == "moduleComboList"){
                if(item.type=="about"||item.type=="contact"){
                    item.isDisabled = true;
                }
              }else if(items.selectedModuleType == "moduleProfile"||items.selectedModuleType == "moduleCulture"||items.selectedModuleType == "moduleService"||items.selectedModuleType == "modulePower"||items.selectedModuleType == "modulePartner"){
                if(item.type!="index"){
                    item.isDisabled = true;
                }
              }
            });
            $this.formData.coverContact = items.coverContact;
            $this.formData.selectedMaxWidth = items.maxWidth;
            $this.formData.authorData.forEach(function(item,index){
              if(item.name == items.author){
                $this.formData.selectedAuthor = item.type;
              }
            });
            $this.formData.usedClasses = items.usedClasses;
            $this.formData.moduleGUID = items.moduleGUID;
            $this.formData.parentModuleGUID = items.parentModuleGUID;
            $this.formData.htmlCode = items.htmlCode;
            $this.formData.cssCode = items.cssCode;
          }
        },
        // 关闭添加/编辑模块弹窗
        closeModuleDialog:function(){
          var $this = this;
          $this.moduleDialog.isModuleDialog = false;
          $this.resetForm();
        },
        // 搜索模块类型选择改变触发事件
        changeSelectedModuleType:function(){
          var $this = this;
          console.log($this.searchData.selectedModuleType);
        },
        // 搜索有效宽度选择改变触发事件
        changeSelectedMaxWidth:function(){
          var $this = this;
          console.log($this.searchData.selectedMaxWidth);
        },
        // 搜索添加人选择改变触发事件
        changeSelectedAuthor:function(){
          var $this = this;
          console.log($this.searchData.selectedAuthor);
        },
        // 隐藏/显示搜索条件
        toggleSearchPanel:function(){
          var $this = this;
          $this.searchData.isSearchShow = !$this.searchData.isSearchShow;
          $this.searchData.searchHeight = $this.$refs.search.offsetHeight;
        },
        // 获取搜索结果
        getSearchResult:function(){
          var $this = this;
          $this.searchData.isSearchAbsolute = true;
          $this.searchData.searchHeight = $this.$refs.search.offsetHeight;
          if($this.searchData.selectedModuleType==""&&$this.searchData.selectedMaxWidth==""&&$this.searchData.selectedAuthor==""&&$this.searchData.moduleGUID==""){
            $this.$alert('请至少选择一个搜索条件', '警告', {
                confirmButtonText: '确定',
            });
            return false;
          }
          var serviceModuleData = [
              {id:0,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-info',moduleGUID:"wjk-0001",htmlCode:'<div class="wrapper wjk-0001"><p class="product-info"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-info{display:none;}.wjk-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
              {id:1,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-data',moduleGUID:"wjk-0002",htmlCode:'<div class="wrap wjk-0002"><p class="product-data"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-data{display:none;}.wjk-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
              {id:2,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'1440',parentModuleGUID:'',usedClasses:'wrapper,product-img',moduleGUID:"wjk-0003",htmlCode:'<div class="wrapper wjk-0003"><p class="product-img"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-img{display:none;}.wjk-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
              {id:3,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'1',coverContact:'',maxWidth:'1280',parentModuleGUID:'',usedClasses:'wrap,product-font',moduleGUID:"wjk-0004",htmlCode:'<div class="wrap wjk-0004"><p class="product-font"></p>我是一个模块</div>',cssCode:'.wrap{width:100%;overflow:hidden;}.wrap .product-font{display:none;}.wjk-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'},
              {id:4,moduleType:'moduleHeader',pageType:'index,about,list,article,contact,longTailWord',headerFixed:'0',coverContact:'',maxWidth:'960',parentModuleGUID:'',usedClasses:'wrapper,product-link',moduleGUID:"wjk-0005",htmlCode:'<div class="wrapper wjk-0005"><p class="product-link"></p>我是一个模块</div>',cssCode:'.wrapper{width:100%;overflow:hidden;}.wrapper .product-link{display:none;}.wjk-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26'}
          ];
          // 处理数据，将所有html代码和样式代码中的类名替换为随机生成的相同位数的字符串
          serviceModuleData.forEach(function(item,index){
            var classArr = item.usedClasses.split(",");
            var guidLen = item.moduleGUID.length;
            var newGuidClass = $this.randomString(false,guidLen);
            var guidHtmlZZ = item.moduleGUID;
            var guidCssZZ = "." + item.moduleGUID;
            var copyHtmlCode = item.htmlCode;
            var copyCssCode = item.cssCode;
            copyHtmlCode = copyHtmlCode.replace(eval("/"+guidHtmlZZ+"/g"),newGuidClass);
            copyCssCode = copyCssCode.replace(eval("/"+guidCssZZ+"/g"),"."+newGuidClass);
            classArr.forEach(function(item1,index1){
              var len = item1.length;
              var newClass = $this.randomString(false,len);
              var classHtmlZZ = '="' + item1;
              var classStyleZZ = '.' + item1;
              copyHtmlCode = copyHtmlCode.replace(eval("/"+classHtmlZZ+"/g"),'="' + newClass);
              copyCssCode = copyCssCode.replace(eval("/"+classStyleZZ+"/g"),'.' + newClass);
            });
            item.copyHtmlCode = copyHtmlCode;
            item.copyCssCode = copyCssCode;
            item.showCode = "<style>" + item.cssCode + "</style>" + item.htmlCode;
          });
          $this.moduleData = serviceModuleData;
          if($this.moduleData.length>0){
            $this.searchData.isModuleShow = true;
            $this.searchData.isModuleEmpty = false;
          }else{
            $this.searchData.isModuleShow = false;
            $this.searchData.isModuleEmpty = true;
          }
        },
        // 替换类名字符串
        // 随机生成任意长度字母数字特殊符号组合的字符串
        // randomFlag 是否任意长度，值为true/false;min 任意长度最小位数（如果调用函数没传max值，则这里表示固定位数）；max 任意长度最大位数
        randomString:function(randomFlag,min,max){
          var $this = this;
          var str = "";
          var range = min;// 先声明一个变量等于最小位数
          var arrFirst = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
          var arr =['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','-','_'];
          // 如果选择产生随机位数，这里将range赋值为随机位数
          if(randomFlag){
              range = Math.round(Math.random() * (max-min)) + min;
          }
          // 先随机获取第一位的字符，第一位必须是字母
          var strFirst = Math.round(Math.random() * (arrFirst.length-1));
          // 赋值给 str
          str += arrFirst[strFirst];
          // 用随机位数减去第一位之后的位数做循环，取arr数组中随机一条数据累加到str变量中，得到随机位数字符串
          for(var i=0; i<range-1; i++){
              var pos = Math.round(Math.random() * (arr.length-1));
              str += arr[pos];
          }
          return str;
        },
        // 删除模块
        deleteModel:function(item){
          var $this = this;
          $this.$confirm('此操作将永久删除该模块, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            $this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            $this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
        },
        // 返回指定字符串在另一个字符串中出现的次数
        patch:function(res,s){
          var reg=eval("/"+res+"/g");
          var sArr = s.match(reg);
          if(sArr){
            return s.match(reg).length;
          }else{
            return 0;
          }
        },
        // 模块属性点击事件
        changeModuleTypeState:function(){
            var $this = this;
            console.log(this.formData.selectedModuleType);
            // 选中模块属性后，显示该属性模块的注意事项
            $this.formData.moduleType.forEach(function(item,index){
                if(item.type == $this.formData.selectedModuleType){
                    $this.formData.selectedModuleTypeDes = item.descript;
                }
            });
            // 模块属性点击的独特逻辑判断
            if($this.formData.selectedModuleType == "moduleHeader"){
                $this.isHeader = true;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    item.isSelected = true;
                    item.isDisabled = true;
                });
            }else if($this.formData.selectedModuleType == "moduleBanner"||$this.formData.selectedModuleType == "moduleComboHeader"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = true;
                $this.formData.pageType.forEach(function(item,index){
                    item.isSelected = false;
                    item.isDisabled = false;
                });
            }else if($this.formData.selectedModuleType == "moduleImgList"||$this.formData.selectedModuleType == "moduleFontList"||$this.formData.selectedModuleType == "moduleComboList"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    if(item.type=="about"||item.type=="contact"){
                        item.isSelected = false;
                        item.isDisabled = true;
                    }else{
                        item.isSelected = false;
                        item.isDisabled = false;
                    }
                });
            }else if($this.formData.selectedModuleType == "moduleCateList"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    if(item.type=="list"){
                        item.isSelected = true;
                        item.isDisabled = true;
                    }else{
                        item.isSelected = false;
                        item.isDisabled = true;
                    }
                });
            }else if($this.formData.selectedModuleType == "moduleImgArticle"||$this.formData.selectedModuleType == "moduleMainArticle"||$this.formData.selectedModuleType == "moduleComboArticle"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    if(item.type=="article"){
                        item.isSelected = true;
                        item.isDisabled = true;
                    }else{
                        item.isSelected = false;
                        item.isDisabled = true;
                    }
                });
            }else if($this.formData.selectedModuleType == "moduleComboLongTailWord"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    if(item.type=="longTailWord"){
                        item.isSelected = true;
                        item.isDisabled = true;
                    }else{
                        item.isSelected = false;
                        item.isDisabled = true;
                    }
                });
            }else if($this.formData.selectedModuleType == "moduleProfile"||$this.formData.selectedModuleType == "moduleCulture"||$this.formData.selectedModuleType == "moduleService"||$this.formData.selectedModuleType == "modulePower"||$this.formData.selectedModuleType == "modulePartner"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    if(item.type=="about"){
                        item.isSelected = true;
                        item.isDisabled = true;
                    }else if(item.type == "index"){
                        item.isSelected = false;
                        item.isDisabled = false;
                    }else{
                        item.isSelected = false;
                        item.isDisabled = true;
                    }
                });
            }else if($this.formData.selectedModuleType == "moduleContact"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    if(item.type=="contact"){
                        item.isSelected = true;
                        item.isDisabled = true;
                    }else{
                        item.isSelected = false;
                        item.isDisabled = true;
                    }
                });
            }else if($this.formData.selectedModuleType == "moduleMessage"){
                $this.isHeader = false;
                $this.isContactMessage = true;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    item.isSelected = false;
                    item.isDisabled = false;
                });
            }else if($this.formData.selectedModuleType == "moduleComboNews"||$this.formData.selectedModuleType == "moduleDecoration"||$this.formData.selectedModuleType == "moduleFooter"){
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    item.isSelected = true;
                    item.isDisabled = true;
                });
            }else{
                $this.isHeader = false;
                $this.isContactMessage = false;
                $this.isBanner = false;
                $this.formData.pageType.forEach(function(item,index){
                    item.isSelected = false;
                    item.isDisabled = false;
                });
            }
        },
        // 侧边固定点击事件
        changeHeaderFixedState:function(){
            console.log(this.formData.headerFixedData);
        },
        // 是否包含联系方式点击事件
        changeCoverContactState:function(){
            var $this = this;
        },
        // 页面属性点击事件
        changePageTypeState:function(items){
            var $this = this;
            if($this.formData.selectedModuleType == "moduleBanner"||$this.formData.selectedModuleType == "moduleComboHeader"){
                if(items.type=="index"){
                    if(items.isSelected){
                        $this.formData.pageType.forEach(function(item,index){
                            if(item.type!="index"){
                                item.isSelected = false;
                                item.isDisabled = true;
                            }
                        });
                    }else{
                        $this.formData.pageType.forEach(function(item,index){
                            if(item.type!="index"){
                                item.isSelected = false;
                                item.isDisabled = false;
                            }
                        });
                    }
                }else{
                    if(items.isSelected){
                        $this.formData.pageType.forEach(function(item,index){
                            if(item.type!="index"){
                                item.isSelected = true;
                                item.isDisabled = false;
                            }else{
                                item.isSelected = false;
                                item.isDisabled = true;
                            }
                        });
                    }else{
                        var len = 0;
                        $this.formData.pageType.forEach(function(item,index){
                            if(item.isSelected){
                                len = len + 1;
                            }
                        });
                        if(len == 0){
                            $this.formData.pageType.forEach(function(item,index){
                                if(item.type=="index"){
                                    item.isSelected = false;
                                    item.isDisabled = false;
                                }
                            });
                        }
                    }
                }
            }
        },
        // 有效宽度点击事件
        changeMaxWdithState:function(){
            console.log(this.formData.maxWidthData);
        },
        // 添加人点击事件
        changeAuthorState:function(){
            console.log(this.formData.authorData);
        },
        // 提交表单点击事件
        saveModuleData:function(){
            var $this = this;
            if($this.formData.moduleGUID==""){
                $this.$alert('模块标识类名不能为空', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.selectedModuleType==""){
                $this.$alert('请选择所属模块', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.selectedModuleType=="moduleHeader"&&$this.formData.headerFixed==""){
                $this.$alert('请选择是否侧边固定', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.selectedModuleType=="moduleMessage"&&$this.formData.coverContact==""){
                $this.$alert('请选择留言板是否包含联系方式', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            var pageTypeArr = [];
            $this.formData.pageType.forEach(function(item,index){
                if(item.isSelected){
                    pageTypeArr.push(item.type);
                }
            });
            if(pageTypeArr.length == 0){
                $this.$alert('请选择适用页面', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.selectedMaxWidth==""){
                $this.$alert('请选择有效宽度', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.selectedAuthor==""){
                $this.$alert('请选择添加人', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.usedClasses==""){
                $this.$alert('使用类名不能为空', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.htmlCode==""){
                $this.$alert('html代码不能为空', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            if($this.formData.cssCode==""){
                $this.$alert('css样式不能为空', '警告', {
                    confirmButtonText: '确定',
                });
                return false;
            }
            $this.saveData.moduleType = $this.formData.selectedModuleType;
            $this.saveData.pageType = pageTypeArr.join(",");
            $this.saveData.headerFixed = $this.formData.headerFixed;
            $this.saveData.coverContact = $this.formData.coverContact;
            $this.saveData.maxWidth = $this.formData.selectedMaxWidth;
            $this.saveData.author = $this.formData.selectedAuthor;
            $this.saveData.parentModuleGUID = $this.formData.parentModuleGUID;
            $this.saveData.usedClasses = $this.formData.usedClasses;
            $this.saveData.moduleGUID = $this.formData.moduleGUID;
            $this.saveData.htmlCode = $this.formData.htmlCode;
            $this.saveData.cssCode = $this.formData.cssCode;
            console.log($this.saveData);
            setTimeout(() => {
                $this.isEdit = false;
                $this.resetForm();
            }, 1000);
        },
        // 重置表单
        resetForm:function(){
            var $this = this;
            $this.isHeader = false;
            $this.isContactMessage = false;
            $this.isBanner = false;
            $this.formData.selectedModuleType = "";
            $this.formData.selectedModuleTypeDes = "";
            $this.formData.headerFixed = "";
            $this.formData.coverContact = "";
            $this.formData.selectedMaxWidth = "";
            $this.formData.selectedAuthor = "";
            $this.formData.usedClasses = "";
            $this.formData.moduleGUID = "";
            $this.formData.parentModuleGUID = "";
            $this.formData.htmlCode = "";
            $this.formData.cssCode = "";
            $this.formData.pageType.forEach(function(item,index){
                item.isSelected = false;
                item.isDisabled = false;
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.module-panel{
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    position: relative;
    padding-top: 53px;
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
    }
    .abs-search.abs{
      position: absolute;
      left:0;
      z-index: 10;
    }
    .abs-search{
      width: 100%;
      @extend %clearfix;
      // left:0;
      .menu-panel{
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
      .search-wrap{
        width: 100%;
        overflow: hidden;
      }
    }
    .search-panel{
      width:100%;
      padding: 20px 80px;
      overflow: hidden;
      background: #fff;
      border-bottom: 1px solid #ddd;
      .item-search{
        float:left;
        padding: 0 5px;
        .el-select{
          display: block;
        }
      }
      .module-select{
        width: 100%;
        margin-bottom: 10px;
      }
      .width-select,.author-select{
        width: 36%;
      }
      .guid-panel{
        width: calc(28% - 80px);
      }
    }
    .item-content{
      transition: .2s top linear;
      width: 100%;
      height: 100%;
      position: relative;
      overflow-y: auto;
    }
}
.module-list{
  width: 100%;
  overflow: hidden;
  padding: 50px 0 20px;
  .item-module{
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    @extend %clearfix;
    margin-bottom: 40px;
    .module-header{
      width: 100%;
      padding: 10px 20px;
      overflow: hidden;
      border-bottom: 1px solid #e6e6e6;
      span{
        float:left;
        display: block;
        font-size: 14px;
        line-height: 32px;
      }
      span+span{
        float:right;
      }
    }
    .module-body{
      @extend %clearfix;
      padding: 40px 0;
      width:100%;
    }
    .module-footer{
      width: 100%;
      @extend %clearfix;
      padding: 10px 20px;
      border-top: 1px solid #e6e6e6;
      >span{
        display: block;
        float:left;
        font-size: 14px;
        line-height: 32px;
      }
      .edit-button{
        float:right;
        text-align: right;
        span{
          display: inline-block;
          height: 30px;
          line-height: 28px;
          border: 1px solid #ddd;
          padding: 0 10px;
          font-size: 14px;
          margin-left: 20px;
          border-radius: 4px;
          color: #333;
          cursor: pointer;
          transition: opacity .5s linear;
          &:hover{
            opacity: .8;
          }
        }
        span.copy-code{
          border: 1px solid $primary;
          background: $primary;
          color: #fff;
        }
        span.btn-edit{
          border: 1px solid $primary;
          color: $primary;
        }
        span.btn-delete{
          background: #f5f5f5;
          color: #999;
        }
      }
    }
  }
}
.module-panel{
  .abs-dialog{
    position: absolute;
    .dialog-panel{
      left: 60px;
      top: 60px;
      right:60px;
      bottom: 60px;
      border-radius: 4px;
      padding: 49px 0 81px;
    }
  }
}
.empty-panel{
  width: 100%;
  height: 100%;
  display: table;
  overflow: hidden;
  margin-top: -30px;
  p{
    display: table-cell;
    text-align: center;
    line-height: 48px;
    font-size: 20px;
    color: #ccc;
    vertical-align: middle;
    span{
      display: inline-block;
      margin: 0 6px;
      border: 1px solid $primary;
      color: #fff;
      padding: 0 16px;
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
    left: 0;
    top: 0;
    right:0;
    bottom: 0;
    overflow: hidden;
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

.form-panel{
    width: 100%;
    padding: 0 40px 30px;
    @extend %clearfix;
    .item-form{
        width: 100%;
        @extend %clearfix;
        position: relative;
        margin-top: 20px;
        .item-title{
            width:100%;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
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
        .item-body{
            width: 100%;
            @extend %clearfix;
            font-size:0;
            .el-radio,.el-checkbox{
                margin:0 10px 10px 0;
            }
        }
        .item-des{
            width: 100%;
            min-height: 24px;
            font-size: 14px;
            color: #999;
        }
    }
    .item-button{
        margin-top: 20px;
    }
}
</style>