<template>
    <div class="page-root">
        <div class="sidebar">
            <div class="sidebar-content">
                 <ul class="menu-panel">
                      <li class="item-menu" v-for="(item,index) in navList" v-bind:class="item.isActive?'is-active':''" v-bind:key="index">
                        <div class="item-menu-font" v-on:click="goPage(item.pageType)"><i class="iconfont" v-bind:class="item.icon"></i><span class="item-link">{{item.name}}</span></div>
                    </li>
                 </ul>
            </div>
        </div>
        <div class="item-page">
            <div class="item-content" v-if="pageType=='a'">
                <h2>概念</h2>
                <h3>站点</h3>
                <p>由网站所需要的所有页面组合在一起，形成一个链式循环体，就是一个站点</p>
                <h3>页面</h3>
                <p>前端工作中面对的就是以页面为单位，例如首页、关于我们、产品列表、案例列表、产品详情、案例详情、联系我们等</p>
                <h3>页面模块</h3>
                <p>每一个网站每个页面都是由多个不同的模块组成的，比如首页的导航、banner、关于我们、热销产品、经典案例、页脚等，都是页面模块</p>
                <h3>模块</h3>
                <p>本系统中模块和页面模块有所区别，页面模块可以同时指代多种模块，也可以就是一种模块自身，如首页的关于我们页面模块，其所指代的模块可以同时是公司简介、公司文化、公司服务、公司实力，也可以只是其中一个；再比如关于我们页面的公司简介页面模块，其指代的就是公司简介模块本身</p>
                <h3>模块属性</h3>
                <p>1. <strong>唯一标识类名：</strong>这个是由前端在写模块时，给模块定义的一个独属于这个模块的一个类名，用于前端人员自身去大致识别模块</p>
                <p>2. <strong>模块分类：</strong>模块自身由其自己的分类，比如：页头、页脚、留言板之类的，都是模块的分类</p>
                <p>3. <strong>适用页面：</strong>模块适合在哪些页面里展现，不同模块类别，可能只适用于部分页面、而不会在所有页面中都适用</p>
                <p>4. <strong>有效宽度：</strong>有固定有效宽度的模块，只适合于和相同有效款的模块放在一起</p>
                <p>5. <strong>添加人：</strong>该模块是有哪位前端人员说贡献的</p>
                <p>6. <strong>使用类名：</strong>该模块除了唯一标识类名外，所有在代码中写在`="`的类名，例如 class="header fl"，该例中符合的类名是 header</p>
                <p>7. <strong>html代码：</strong>该模块的html代码</p>
                <p>8. <strong>css样式：</strong>该模块的css代码</p>
            </div>
            <div class="item-content" v-if="pageType=='b'">
                <h2>功能概述</h2>
                <p>1. 前端开发人员本地写好模块，通过该系统提交模块相关代码</p>
                <p>2. 在模块页面添加模块，模块的各种属性配置完成后，点击保存即可</p>
                <p>3. 模块页面可搜索并展示模块，可对模块进行编辑、删除操作、以及复制模块的html和css代码</p>
                <p>4. 站点页面则主要是设置站点各页面需要的模块以及模块的筛选条件、设置好筛选条件后，生成站点，则会展示出设置的筛选条件所能组合出的所有站点</p>
                <p>5. 站点列表有三个功能：站点预览、站点信息、站点下载；站点预览可以预览该站点的所有页面、站点信息将展示该站点所有页面组成模块的类别、ID、唯一标识类名等；站点下载则可以将该组合站点下载到本地使用</p>
            </div>
            <div class="item-content" v-if="pageType=='c'">
                <h2>代码贡献者须知：</h2>
                <p>1. 该系统下所有模块共用一套公用初始化样式，公用初始化样式将包括初始化页面样式、以及所有模块通用的样式</p>
                <p>2. 该系统下所有模块的有效宽度将只有四种：通屏、1440、1280、960</p>
                <p>3. 该系统下所有模块都需要有一个由前端人员自己定义的唯一标识类名，该类名为前端人员自己自增的一个类名，不分模块类别，命名格式：“名字首字母-0001”，例如：".wjk-0001"，序号以4位为基数，如名字首字母相同，则后来者名字可再加一个字母的后缀，如："wjka-0001"</p>
                <p>4. 提交模块的适用类名，在添加模块时，只写类名即可，不得带"."，多个类名用英文逗号隔开</p>
                <p>5. 模块分类属于页头的会分为侧边固定，以及页头显示两种，对应两种页面框架类型</p>
                <p>6. 模块分类属于留言板的会分为带联系方式以及不带联系方式两种</p>
                <p>7. 所有模块都会有适用页面，一个模块可以适用于多种页面，也可以只适用于某一种页面</p>
                <p>8. banner模块在提交时，如果只适用于首页的banner有其搭配使用的内页banner，则再提交完只适用于首页banner后，需再提交一个适用内页的模块，该模块选择适用页面选择为除首页之外，此时该模块将拥有一个父级模块唯一标识类名，这里需要填写上一个提交的首页banner的唯一标识类名，如果适用内页的banner，是每个页面都单独适用，则需要针对每个页面分别提交一个适用于该内页的banner模块，其父级模块唯一标识类名，则同属于一个</p>
                <p>9. 组合页头模块的与banner模块的提交原理相同</p>
                <p>10. 图文、文字、组合列表如果只适用于首页，这适用页面只选择首页即可，只适用内页原理相同</p>
                <p>11. 公司简介、公司文化、公司服务、公司实力如适用于首页，则适用页面除选择关于我们外，也可以勾选首页</p>
                <p>12. 留言板模块分是否带联系方式两种，提交时，需要勾选是否带联系方式，其适用页面如果全选，则该留言板属于页面右下角的浮窗留言板，如不全部勾选，则留言板适用的页面只能选择详情页、联系我们、长尾词页三个页面</p>
                <p>13. 该系统下所有模块禁止适用字体图标，一律以图片或者svg文件代替</p>
                <p>14. 模块中使用的静态图片资源（所有不需要程序进行动态替换的图片资源）由程序提供一个共享文件夹，在模块提交完成后，将模块所涉及到的所有静态图片资源，统一放到共享文件夹内，由于所有图片都存放在这一个共享文件夹内，静态图片资源的命名规则将会有所限制</p>
                <p>15. 针对静态图片资源会出现不同模块不同图片出现相同命名，所有图片图片资源命名都需要在本身的命名上再加个前缀，前缀与模块唯一标识类名相同，例如："wjk0001-icon_phone.png" 其中"wjk0001-"为前缀，根据模块唯一标识而变，"icon_phone"为前端开发者自己自由命名</p>
                <p>16. 针对静态图片资源会出现不同模块相同图片出现不同命名，从而产生不必要的多重资源问题，需尽量做到沿用之前模块的图片资源，也就是说，允许当前模块的图片资源文件夹内出现之前模块的图片资源，命名可以保持为之前模块的图片资源命名</p>
                <p>17. 模块本身的样式中禁止使用以及设置字体，字体一律会在公共样式中设置</p>
                <p>18. 模块添加完成后，可以在本系统的模块页面同过设置搜索条件查看模块，搜索结果的模块展示列表中，模块拥有编辑、删除、复制代码功能</p>
                <p>19. 侧边导航固定框架类型的只需提交框架内的代码，整个页面大框架代码则有系统提供一套固定的代码</p>
                <p>20. 在该系统中不存在左右布局类型框架，所有左右布局的模块统一写成一个大模块，在模块分类中凡是带组合字样的，都属于多模块组合而成，不可拆分的模块</p>
                <p>21. 代码和样式中禁止使用单行注释，有需要用到引号的，尽量都适用双引号，避免适用单引号</p>
            </div>
            <div class="item-content" v-if="pageType=='d'">
                <h2>模块分类详解</h2>
                <p><span>01</span><strong>页头：</strong>分侧边固定显示、页头显示</p>
                <p><span>02</span><strong>banner: </strong>分只适用于首页、不适用首页两种（不适用首页则适用所有其他页面、面包屑模块与该模块一体）</p>
                <p><span>03</span><strong>组合页头：</strong>页头、banner一体（首页以外的页面面包屑与该模块一体）</p>
                <p><span>04</span><strong>图文列表：</strong>所有带图片的列表、包括首页带标题的产品列表、案例列表；列表页的产品列表、案例列表；长尾词页的产品列表、案例列表；详情页的相关产品、案例列表；如匹配到没有标题文本的，自行添加标题文本</p>
                <p><span>05</span><strong>文字列表：</strong>所有不带图片的列表，其他同图文列表</p>
                <p><span>06</span><strong>组合列表：</strong>首页、产品、案例、长尾词列表页，如果是左右布局结构，则写成一个模块，其模块属性是组合列表（首页有独特布局格式的也属于组合列表，只是在选择适用页面时，只适用首页）</p>
                <p><span>07</span><strong>分类列表：</strong>产品列表页的分类模块</p>
                <p><span>08</span><strong>图文详情：</strong>产品、案例详情页的详细参数模块</p>
                <p><span>09</span><strong>正文详情：</strong>产品、案例详情页的正文部分模块</p>
                <p><span>10</span><strong>组合详情：</strong>产品、案例详情页，如果是左右布局结构，则写成一个模块，其模块属性是组合详情</p>
                <p><span>11</span><strong>组合长尾词：</strong>长尾词页面为左右布局结构(留言板也只在一侧显示)</p>
                <p><span>12</span><strong>组合新闻：</strong>只适合放在页脚上方的新闻、产品文字列表组合模块；该模块也可包含联系地址、关于我们等</p>
                <p><span>13</span><strong>公司简介：</strong>隶属于关于我们</p>
                <p><span>14</span><strong>公司文化：</strong>隶属于关于我们</p>
                <p><span>15</span><strong>公司服务：</strong>隶属于关于我们，其包括：服务流程、售后服务</p>
                <p><span>16</span><strong>公司实力：</strong>隶属于关于我们，其包括：生产能力、发展历程、公司荣誉、公司环境、数字化展示模块（整个模块就只是几个突出数字的那种模块）</p>
                <p><span>17</span><strong>国际合作：</strong>隶属于关于我们</p>
                <p><span>18</span><strong>联系方式：</strong>独立的展示邮箱、地址、商务通链接的模块</p>
                <p><span>19</span><strong>留言板：</strong>分带联系方式、不带联系方式两种</p>
                <p><span>20</span><strong>装饰模块：</strong>可适用所有页面，暂定为以引导用户点击或提交邮箱账号用的单独模块，除该作用相关信息外，无其他主要信息展示的模块</p>
                <p><span>21</span><strong>页脚：</strong>页面底部信息，可包含返回顶部、移动端底部商务通</p>
            </div>
            <div class="item-content" v-if="pageType=='e'">
                <h2>代码搬运者须知：</h2>
                <p>1. 组合站点为系统自动组合匹配，可能会出现模块风格迥异的情况，组合站点并非组合完成就不需要再做修改了，组合后的站点同样需要对细节进行调整</p>
                <p>2. 站点中首先要做的是设置站点组合的条件，根据设置每个页面所需要的页面模块以及数据筛选类型、条数，系统会自动匹配所有符合筛选条件，且未被使用、重复度不高的一些组合数据进行展示，而这每一条数据，都会是一个可用的站点</p>
                <p>3. 站点的有效宽度必须先行设置，固定的 1440 1280 960，这三个有效款彼此是不能在同一个页面出现的，但他们都可以和通屏这个有效宽度进行组合，所以有效宽度的选择最多为两项，最少一项</p>
                <p>4. 之后是模块数据筛选规则，是否全局的所有模块都由系统随机抽取数据进行站点组合，如果由系统抽取数据，需要设置抽取数据的条数，数据条数越多，这组合出来的站点越多，但同时，系统后台的运算工作量将指数级增加，组合结果的展示将会耗时很久</p>
                <p>5. 如果需要手动选择某些模块数据，全局随机数据需要选否，之后在所有页面所属模块的后方，都会出现一个该模块筛选条件的专属按钮，可以针对各个模块设置不同的筛选条件，包括抽取数据条数，以及是否随机抽取，本系统在全局选随机数据选否，所有模块本身的是否随机抽取默认为是，如果需要手动选择数据进行站点组合，则将对应模块的是否随机设置为否，此时可以进行搜索数据，在搜索结果列表中点击选择你想要的数据</p>
                <p>6. 页面由不同页面模块组合，该页面模块根据展现内容不同而有所分类，而有些页面模块所对应的模块则可以是多个，在选择了这类页面模块之后，会出现需要选择对应模块的选项，这些也需要做选择，选择几项，则该页面模块最终的数据抽取就从说选择的模块数据中进行抽取</p>
                <p>7. 页面模块的选择有些是可以组合的，有些就是一个整体，如产品详情页：图文详情、正文详情、留言板三个页面模块组合成一个产品详情页，而组合详情自身就还是一个产品详情页，这两者只能二选一</p>
                <p>8. 在所有筛选条件设置完成后，进行生成站点的操作，此时会展示出所有可用站点组合列表，该列表有三个功能：站点预览、站点信息、站点下载</p>
                <p>9. 站点预览可以首先看一下该站点所有页面组合的效果</p>
                <p>10. 站点信息将展示各个页面各个页面模块的分类、页面模块的模块分类、模块唯一标识类名、模块ID</p>
                <p>11. 站点下载则可以将该站点的所有资源的压缩包下载到本地，资源中包括已经生成的各个html页面，css样式文件、该站点所有页面及样式中应用到的静态图片资源、静态JQ库文件</p>
                <p>12. 站点下载后需要本地进行调试，调试内容包括但不限于：文案修改统一、色调统一、模块微调、模块替换，当然此时如果想使用特殊字体，将不再做限制</p>
                <p>13. 站点下载后，会出现可能该组合某个模块并不理想，需要替换，此时可以在本系统的模块页面中根据设置搜索条件，搜索出需要的模块，模块页面展示的模块除了编辑、删除功能外，会有复制HTML代码以及复制CSS代码的功能，找到需要的模块复制模块的HTML代码和CSS代码替换需要替换的模块即可，而该模块所引用的图片资源，需要通过html和css代码中的引用执行去找到并复制到站点的图片资源文件夹中</p>
                <p>14. 当站点本地调试完毕后，才能将站点打包发给对应的程序</p>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'defaultPage',
    data: function(){
        return {
            pageType: "a",
            navList:[
                {
                    pageType:'a',
                    name:'概念',
                    icon:'icon-article',
                    isActive:true,
                },
                {
                    pageType:'b',
                    name:'功能概述',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    pageType:'c',
                    name:'代码贡献者须知',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    pageType:'d',
                    name:'模块分类详解',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    pageType:'e',
                    name:'代码搬运者须知',
                    icon:'icon-article',
                    isActive:false,
                },
            ]
        }
    },
    beforeCreate:function(){},
    computed:{},
    methods:{
        goPage:function(type){
        var $this = this;
        $this.navList.forEach(function(item,index){
            if(item.pageType == type){
                item.isActive = true;
                $this.pageType = item.pageType;
            }else{
                item.isActive = false;
            }
        });
        }
    },
}
</script>

<style lang="scss" scoped>
.item-page{
    width: 100%;
    height: 100%;
    transition: all .5s ease-in-out;
    overflow-y: auto;
    padding: 0 80px 60px 300px;
    .item-content{
        width: 100%;
        overflow: hidden;
    }
    h2{
        font-size: 24px;
        line-height: 48px;
        color: #333;
        margin-top: 40px;
    }
    p{
        font-size: 16px;
        line-height: 28px;
        margin-top: 10px;
        >span{
            font-weight: bold;
            color: #18a900;
            margin-right:10px;
        }
    }
}
.sidebar{
    background: #252a2f;
    width: 240px;
    position: absolute;
    left:0;
    top: 0;
    bottom:0;
    @extend %clearfix;
    transition: left .5s linear;
    z-index: 1080;
    .sidebar-content{
        height:100%;
        overflow-y: auto;
        transition: transform .25s ease-out;
        position: relative;
        &::-webkit-scrollbar {
            width: 4px
        }
        &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 4px
        }
        &:hover::-webkit-scrollbar-thumb {
            background: hsla(0,0%,53%,.4)
        }
        &:hover::-webkit-scrollbar-track {
            background: hsla(0,0%,53%,.1)
        }
        .menu-panel{
            width: 100%;
            overflow: hidden;
            margin:0;
            padding: 20px 0;
            .item-menu{
                width: 100%;
                overflow: hidden;
                .item-menu-font{
                    padding: 0 20px;
                    height: 56px;
                    font-size:0;
                    cursor: pointer;
                    transition: background .5s ease-in-out;
                    &:hover{
                        background: darken(#252a2f,2%);
                    }
                    .iconfont,.item-link{
                        display: inline-block;
                        vertical-align: middle;
                        height: 56px;
                        line-height: 56px;
                        font-size: 14px;
                        color: #fff;
                    }
                    .iconfont{
                        color: #909399;
                        font-size: 20px;
                        margin-right: 10px;
                    }
                }
            }
            .item-menu.is-active{
                .item-menu-font{
                    background: darken(#252a2f,4%);
                    i{
                        color: #fff;
                    }
                }
            }
        }
    }
}

</style>