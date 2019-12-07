<template>
    <div class="page-root">
        <div class="item-page">
            <h2>如果你需要从这里搬运代码，组合一个长尾词站，以下流程将帮到你：</h2>
            <p>1. 该系统站点所在页面，选择长尾词站各页面模块组合的搜索条件，之后进行搜索</p>
            <p>2. 搜索结果中可以进行站点的页面预览，以及站点的压缩包下载；可先行在系统中预览一个站点的所有页面</p>
            <p>3. 然后点击下载压缩包到本地，本地解压压缩包，压缩包中将包含程序自动组合的一个长尾词站的所有页面</p>
            <p>4. 本地调试页面、包括样式微调、色调统一、文案修正、适配微调、以及部分模块的替换</p>
            <p>5. 如有部分模块需要替换，则需要在该系统模块所在页面，搜索需要的模块，分别复制html代码以及css样式代码，粘贴到本地站点文件中</p>
            <p>6. 当本地调试完成后，将站点页面发给程序即可</p>
            <h2>如果你是代码贡献者，你需要知道：</h2>
            <p>1. 本地写好模块，模块的根标签需要有一个统一样式名，命名格式：“名字首字母-序号”，例如：".wjk-0001"</p>
            <p>2. 有效宽度有四种类型：100%，1440，1280，960</p>
            <p>3. 侧边导航框架类型主体内容可以设置的有效宽度有：1280、960以及通屏三种，适配则需要在1600时将侧边导航隐藏，改为头部导航</p>
            <p>4. 代码适配完成后，在该系统模块所在页面，点击添加模块，填写并提交表单</p>
            <h2>模块属性解释</h2>
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
    </div>
</template>

<script>
export default {
    name: 'defaultPage',
    data: function(){
        return {
        }
    },
    beforeCreate:function(){},
    computed:{},
    methods:{
    },
}
</script>

<style lang="scss" scoped>
.item-page{
    width: 100%;
    height: 100%;
    transition: all .5s ease-in-out;
    overflow-y: auto;
    padding: 0 80px 60px;
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
</style>