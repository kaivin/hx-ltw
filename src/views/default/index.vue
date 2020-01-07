<template>
    <div class="page-root">
        <div class="sidebar">
            <div class="sidebar-content">
                 <ul class="menu-panel">
                      <li class="item-menu" v-for="(item,index) in navList" v-bind:class="item.isActive?'is-active':''" v-bind:key="index">
                        <div class="item-menu-font" v-on:click="goPage(item.tabType)"><i class="iconfont" v-bind:class="item.icon"></i><span class="item-link">{{item.name}}</span></div>
                    </li>
                 </ul>
            </div>
        </div>
        <div class="item-page">
            <div class="item-content" v-if="tabType=='a'">
                <h3>流程</h3>
                <p>模块——页面模块——页面——站点</p>
                <h3>站点</h3>
                <p>由网站所需要的所有页面组合在一起，就是一个站点</p>
                <h3>页面</h3>
                <p>前端工作中面对的就是以页面为单位，例如首页、关于我们、产品列表、案例列表、产品详情、案例详情、联系我们等</p>
                <h3>页面模块</h3>
                <p>每一个网站每个页面都是由多个不同的模块组成的，比如首页的导航、banner、关于我们、热销产品、经典案例、页脚等，都是页面模块</p>
                <h3>模块</h3>
                <p>本系统中模块和页面模块有所区别，页面模块可以同时指代多种模块，也可以就是一种模块自身，如首页的关于我们页面模块，其所指代的模块可以同时是公司简介、公司文化、公司服务、公司实力，也可以只是其中一个；再比如关于我们页面的公司简介页面模块，其指代的就是公司简介模块本身</p>
            </div>
            <div class="item-content" v-if="tabType=='b'">
                <p></p>
                <p><span>01.</span> <strong>唯一标识类名：</strong>这个是由前端在写模块时，给模块定义的一个独属于这个模块的一个类名，用于前端人员自身去大致识别模块</p>
                <p><span>02.</span> <strong>模块分类：</strong>模块自身有其自己的分类，比如：页头、页脚、留言板之类的，都是模块的分类</p>
                <p><span>03.</span> <strong>侧边固定：</strong>模块分类是页头的，会有该属性，页头是否侧边固定</p>
                <p><span>04.</span> <strong>父级模块标识类名：</strong>模块分类是banner或者组合页头的，会有该属性，填写父级唯一标识类名，这两个模块分类由于都涉及到banner，banner在首页和其他页是有区分的，如果首页和内页的banner必须搭配使用，则需要先添加首页该模块，再添加一个其他页该模块，其他页该模块就需要知道其首页模块唯一标识类名做关联</p>
                <p><span>05.</span> <strong>选择列表类型：</strong>模块分类属于组合列表、正文详情、组合详情、组合长尾词、组合新闻的，会有该属性，这些模块分类都会包含列表，且列表类型会是固定的，根据模块代码从上到下原则，列表类型顺序展示，这里顺序选择类型，可多选，可重复选择</p>
                <p></p>
                <p><span>06.</span> <strong>适用页面：</strong>模块适合在哪些页面里展现，不同模块类别，可能只适用于部分页面、而不会在所有页面中都适用</p>
                <p><span>07.</span> <strong>有效宽度：</strong>有固定有效宽度的模块，只适合于和相同有效款宽度的模块放在一起</p>
                <p><span>08.</span> <strong>添加人：</strong>该模块是有哪位前端人员所贡献的</p>
                <p><span>09.</span> <strong>使用类名：</strong>该模块除了公共样式和唯一标识类名外，其他类名</p>
                <p><span>10.</span> <strong>html代码：</strong>该模块的html代码</p>
                <p></p>
                <p><span>11.</span> <strong>css样式：</strong>该模块的css代码</p>
            </div>
            <div class="item-content" v-if="tabType=='c'">
                <p></p>
                <p><span>01</span><strong>页头：</strong>分侧边固定显示、页头显示</p>
                <p><span>02</span><strong>banner: </strong>分只适用于首页、不适用首页两种（不适用首页则适用所有其他页面、面包屑模块与该模块一体）</p>
                <p><span>03</span><strong>组合页头：</strong>页头、banner一体（首页以外的页面面包屑与该模块一体）</p>
                <p><span>04</span><strong>图文列表：</strong>所有带图片的列表、包括首页带标题的产品列表、案例列表；列表页的产品列表、案例列表；长尾词页的产品列表、案例列表；详情页的相关产品、案例列表；如匹配到没有标题文本的，自行添加标题文本</p>
                <p><span>05</span><strong>文字列表：</strong>所有不带图片的列表，其他同图文列表</p>
                <p></p>
                <p><span>06</span><strong>组合列表：</strong>首页、产品、案例、长尾词列表页，如果是左右布局结构，则写成一个模块，其模块属性是组合列表（首页有独特布局格式的也属于组合列表，只是在选择适用页面时，只适用首页）</p>
                <p><span>07</span><strong>分类列表：</strong>产品列表页的分类模块</p>
                <p><span>08</span><strong>图文详情：</strong>产品、案例详情页的详细参数模块</p>
                <p><span>09</span><strong>正文详情：</strong>产品、案例详情页的正文部分模块</p>
                <p><span>10</span><strong>组合详情：</strong>产品、案例详情页，如果是左右布局结构，则写成一个模块，其模块属性是组合详情</p>
                <p></p>
                <p><span>11</span><strong>组合长尾词：</strong>长尾词页面为左右布局结构(留言板也只在一侧显示)</p>
                <p><span>12</span><strong>组合新闻：</strong>只适合放在页脚上方的新闻、产品文字列表组合模块；该模块也可包含联系地址、关于我们等</p>
                <p><span>13</span><strong>公司简介：</strong>隶属于关于我们</p>
                <p><span>14</span><strong>公司文化：</strong>隶属于关于我们</p>
                <p><span>15</span><strong>公司服务：</strong>隶属于关于我们，其包括：服务流程、售后服务</p>
                <p></p>
                <p><span>16</span><strong>公司实力：</strong>隶属于关于我们，其包括：生产能力、发展历程、公司荣誉、公司环境、数字化展示模块（整个模块就只是几个突出数字的那种模块）</p>
                <p><span>17</span><strong>国际合作：</strong>隶属于关于我们</p>
                <p><span>18</span><strong>联系方式：</strong>独立的展示邮箱、地址、商务通链接的模块</p>
                <p><span>19</span><strong>留言板：</strong>分带联系方式、不带联系方式两种</p>
                <p><span>20</span><strong>装饰模块：</strong>可适用所有页面，暂定为以引导用户点击商务通用的单独模块，除该作用相关信息外，无其他主要信息展示的模块</p>
                <p></p>
                <p><span>21</span><strong>页脚：</strong>页面底部信息，可包含返回顶部、移动端底部商务通</p>
            </div>
            <div class="item-content item-code" v-if="tabType=='d'">
                <p></p>
                <p>01. 该系统下所有模块共用一套公用初始化样式，公用初始化样式将包括初始化页面样式、以及所有模块通用的样式 <em v-clipboard:copy="publicCssCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制公共样式</em></p>
                <p>02. 侧边导航固定的框架类型，框架使用本系统提供的统一框架 <em v-clipboard:copy="iframeHtmlCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制框架代码</em><em v-clipboard:copy="iframeCssCode" v-clipboard:success="onCopy" v-clipboard:error="onError">复制框架样式</em></p>
                <p>03. 该系统下所有模块的有效宽度将只有四种：通屏、1440、1280、960</p>
                <p>04. 该系统下所有模块都需要有一个由前端人员自己定义的唯一标识类名，该类名为前端人员自己自增的一个类名，不分模块类别，命名格式：“名字首字母-0001”，例如：".wjk-0001"，序号以4位为基数，如名字首字母相同，则后来者名字可再加一个字母的后缀，如："wjka-0001"</p>
                <p>05. 模块本身的样式中禁止使用以及设置字体，字体一律会在公共样式中设置</p>
                <p></p>
                <p>06. 代码和样式中禁止使用单行注释，有需要用到引号的，尽量都使用双引号，避免使用单引号</p>
                <p>07. 该系统下所有模块禁止适用字体图标，一律以图片或者svg文件代替</p>
                <p>08. 类名的命名规则：<span>英文字母</span>、<span>-</span>、<span>数字</span>，只允许出现这三种字符，禁止类名中出现这三种以外的字符</p>
                <p>09. <strong>不同模块如果出现使用相同类名的情况，该类名不可为最外层级，防止样式冲突，模块所有样式均需通过模块唯一标识类名进行控制</strong></p>
                <p>10. <strong>禁止出现和标签、js关键字以及样式关键字相同的类名</strong></p>
                <p></p>
                <p>11. 禁止图片命名中出现包含类名的命名</p>
                <p>12. 针对不同前端人员可能出现相同图片命名的情况，图片命名统一加前缀名字缩写</p>
                <p>13. 针对静态图片资源会出现不同模块不同图片出现相同命名，自行注意图片命名，可自己定义一个命名规则，防止这种情况发生</p>
                <p>14. 针对静态图片资源会出现不同模块相同图片出现不同命名，从而产生不必要的多重资源问题，需尽量做到沿用之前模块的图片资源，也就是说，允许当前模块引用之前模块的图片资源，命名可以保持为之前模块的图片资源命名</p>
                <p>15. 面包屑代码使用ul li写 <code>&lt;li&gt;&lt;a href="url"&gt;二级&lt;/a&gt;&nbsp;&gt;&nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;三级&lt;/span&gt;&lt;/li&gt;</code></p>
                <p></p>
                <p>16. 列表中有参数的，必须用p标签，p标签内需设置span，strong标签的样式</p>
                <p>17. 产品分类列表的当前项类名规定为`active`</p>
                <p>18. 详情页技术参数模块，pc和移动端参数分别用一个div包裹，并分别给一个id，PC的id固定为：pcParam，移动的id固定为：mParam</p>
                <p>19. 模块间的间距在没有padding以及背景的情况下，规定默认间距90像素，适配在1440时为70像素，适配在992时为50像素，适配在782时为30像素</p>
            </div>
            <div class="item-content tags" v-if="tabType=='e'">
                <h2>公司名称</h2>
                <p>程序标签：<span v-clipboard:copy="'$company$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$company$</span></p>
                <p>使用规则: 所有模块的文字中，凡是表示公司名的，一律使用 $company$ 替代，在站点下载操作时，会弹窗让输入该站点公司名，公司名需先预览该站点，看logo是否包含公司名，如logo包含公司名，则输入的公司名即logo代表的公司名，如不包含，则公司名随意定即可</p>
                <h2>导航链接</h2>
                <p>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页： <span v-clipboard:copy="'/'" v-clipboard:success="onCopy" v-clipboard:error="onError">/</span></p>
                <p>产&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品： <span v-clipboard:copy="'/product.html'" v-clipboard:success="onCopy" v-clipboard:error="onError">/product.html</span></p>
                <p>案&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例： <span v-clipboard:copy="'/solution.html'" v-clipboard:success="onCopy" v-clipboard:error="onError">/solution.html</span></p>
                <p>关于我们： <span v-clipboard:copy="'/company.html'" v-clipboard:success="onCopy" v-clipboard:error="onError">/company.html</span></p>
                <p>联系我们： <span v-clipboard:copy="'/contact.html'" v-clipboard:success="onCopy" v-clipboard:error="onError">/contact.html</span></p>
                <h2>面包屑导航</h2>
                <p>程序标签：<span v-clipboard:copy="'$breadcrumbNav$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$breadcrumbNav$</span></p>
                <p>使用规则：面包屑导航需要以ul li的形式写，首页默认存在，后面的则直接适用程序标签替代</p>
                <h2>留言板</h2>
                <p>程序标签：<span v-clipboard:copy="'$messageJSInside$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$messageJSInside$</span>，标题写在文本框内的留言板</p>
                <p>程序标签：<span v-clipboard:copy="'$messageJSOutside$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$messageJSOutside$</span>，标题写在文本框外的留言板</p>
                <p>使用规则：留言板从form标签开始到结束相关代码整体用程序标签替代</p>
                <h2>列表循环</h2>
                <p>开始标签：<span v-clipboard:copy="'$startFor$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$startFor$</span></p>
                <p>结束标签：<span v-clipboard:copy="'$endFor$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$endFor$</span></p>
                <h2>循环项参数</h2>
                <p>序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<span v-clipboard:copy="'$listNumber$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listNumber$</span>，该字段只在长尾词页有使用</p>
                <p>链&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接：<span v-clipboard:copy="'$listLink$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listLink$</span></p>
                <p>图片&nbsp;&nbsp;&nbsp;url：<span v-clipboard:copy="'$listImgUrl$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listImgUrl$</span></p>
                <p>图片&nbsp;&nbsp;&nbsp;alt：<span v-clipboard:copy="'$listImgAlt$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listImgAlt$</span></p>
                <p>图片&nbsp;&nbsp;title：<span v-clipboard:copy="'$listImgTitle$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listImgTitle$</span></p>
                <p>标题&nbsp;&nbsp;title：<span v-clipboard:copy="'$listTitle$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listTitle$</span></p>
                <p>分类类名：<span v-clipboard:copy="'$listClass$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listClass$</span>，分类列表中表示当前项的类名，使用该变量替换，该类名统一使用 'active'</p>
                <p>参&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：<span v-clipboard:copy="'$listParam$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listParam$</span>，参数格式：外层p标签，内层可能存在span/strong标签，写样式时需同时设置span/strong标签样式</p>
                <p>描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span v-clipboard:copy="'$listDescription$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listDescription$</span></p>
                <p>附加图片：<span v-clipboard:copy="'$listImg$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$listImg$</span>，该字段只在长尾词页有使用</p>
                <h2>详情页</h2>
                <p>图片&nbsp;&nbsp;&nbsp;url：<span v-clipboard:copy="'$detailImgUrl$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailImgUrl$</span></p>
                <p>图片&nbsp;&nbsp;&nbsp;alt：<span v-clipboard:copy="'$detailImgAlt$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailImgAlt$</span></p>
                <p>图片&nbsp;title：<span v-clipboard:copy="'$detailImgTitle$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailImgTitle$</span></p>
                <p>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：<span v-clipboard:copy="'$detailName$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailName$</span></p>
                <p>参&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：<span v-clipboard:copy="'$detailParam$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailParam$</span></p>
                <p>描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述：<span v-clipboard:copy="'$detailDescription$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailDescription$</span></p>
                <p>正文信息：<span v-clipboard:copy="'$detailContent$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailContent$</span></p>
                <p>PC&nbsp;&nbsp;参数：<span v-clipboard:copy="'$detailTechdataPc$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailTechdataPc$</span>，pc和移动技术参数分别用一个div包裹，并分别给一个id，PC的id固定为：pcParam，移动的id固定为：mParam</p>
                <p>移动参数：<span v-clipboard:copy="'$detailTechdataM$'" v-clipboard:success="onCopy" v-clipboard:error="onError">$detailTechdataM$</span></p>
            </div>
            <div class="item-content" v-if="tabType=='f'">
                <h2>添加模块</h2>
                <p>01. 模块分类属于页头的会分为侧边固定，以及页头显示两种，对应两种页面框架类型</p>
                <p>02. 侧边导航固定框架类型的只需提交框架内的代码，整个页面大框架代码则由本系统提供一套固定的代码</p>
                <p>03. 在该系统中不存在左右布局类型框架，所有左右布局的模块统一写成一个大模块，在模块分类中凡是带组合字样的，都属于多模块组合而成，不可拆分的模块</p>
                <p>04. 模块分类属于banner的，如果只适用于首页的banner有其搭配使用的内页banner，则在提交完只适用于首页banner后，需再提交一个适用内页的banner模块，该模块选择适用页面选择为除首页之外，此时该模块将拥有一个父级模块唯一标识类名，这里需要填写上一个提交的首页banner的唯一标识类名，如果适用内页的banner，是每个页面都单独适用，则需要针对每个页面分别提交一个适用于该内页的banner模块，其父级模块唯一标识类名，则同属于一个</p>
                <p>05. 组合页头模块与banner模块的原理相同</p>                 
                <p></p>
                <p>06. 组合列表、正文详情、组合详情、组合长尾词、组合新闻因模块本身会包含一个或多个列表，所以需要选择这些模块中的列表类型，如果是多个，则按在代码中从上到下的原则，按顺序选择列表类型，列表类型可多选，可重复选择</p>
                <p>07. 模块分类属于留言板的，会分为带联系方式以及不带联系方式两种</p>
                <p>08. 所有模块都会有适用页面，一个模块可以适用于多种页面，也可以只适用于某一种页面</p>
                <p>09. 图文、文字、组合列表如果只适用于首页，则适用页面只选择首页即可，只适用内页原理相同</p>
                <p>10. 公司简介、公司文化、公司服务、公司实力如适用于首页，则适用页面除选择关于我们外，也可以勾选首页</p>
                <p></p>
                <p>11. 模块的使用类名，在添加模块时，只写类名即可，不得带"."，多个类名用英文逗号隔开，公共样式中的类名不需要写在使用类名中</p>
                <p>12. 模块中使用的静态图片资源（所有不需要程序进行动态替换的图片资源）由程序提供一个共享文件夹，在模块提交完成后，将模块所涉及到的所有静态图片资源，统一放到共享文件夹内，由于所有图片都存放在这一个共享文件夹内，静态图片资源的命名规则将会有所限制</p>
                <h2>搜索模块</h2>
                <p>模块可根据模块类型、适用页面、有效宽度、添加人、以及唯一标识类名这些搜索条件来进行搜索</p>
                <h2>编辑模块</h2>
                <p>模块添加后，可进行编辑修改操作，模块搜索后的列表中有编辑操作按钮</p>
                <h2>删除模块</h2>
                <p>模块也可以删除，模块列表中有删除操作按钮</p>
            </div>
            <div class="item-content" v-if="tabType=='g'">
                <p></p>
                <p>01. 设置每个页面所需要的页面模块以及数据筛选类型、条数，系统会自动匹配所有符合筛选条件，且未被使用、重复度不高的组合数据进行展示，而这每一条数据，都是一个可用的站点</p>
                <p>02. 站点的有效宽度必须先行设置，固定的 1440 1280 960，一个站点，只会同时存在一种有效宽度的模块，但他们都可以和通屏这个有效宽度进行组合，所以有效宽度的选择最多为两项，最少一项</p>
                <p>03. 模块数据筛选规则，是否全局的所有模块都由系统随机抽取数据进行站点组合，如果由系统抽取数据，需要设置抽取数据的条数，数据条数越多，则组合出来的站点越多，但同时，系统后台的运算工作量将指数级增加，组合结果的展示将会耗时很久</p>
                <p>04. 如果需要手动选择某些模块数据，全局随机数据需要选否，之后在所有页面所属模块的后方，都会出现一个该模块筛选条件的专属按钮，可以针对各个模块设置不同的筛选条件，包括抽取数据条数，以及是否随机抽取，本系统在全局选随机数据选否，所有模块本身的是否随机抽取默认为是，如果需要手动选择数据进行站点组合，则将对应模块的是否随机设置为否，此时可以进行搜索数据，在搜索结果列表中点击选择你想要的数据</p>
                <p>05. 页面由不同页面模块组合，该页面模块根据展现内容不同而有所分类，而有些页面模块所对应的模块则可以是多个，在选择了这类页面模块之后，会出现需要选择对应模块的选项，这些也需要做选择，选择几项，则该页面模块最终的数据抽取就从所选择的模块数据中进行抽取</p>
                <p></p>
                <p>06. 页面模块的选择有些是可以组合的，有些就是一个整体，如产品详情页：图文详情、正文详情、留言板三个页面模块组合成一个产品详情页，而组合详情自身就还是一个产品详情页，这两者只能二选一</p>
                <p>07. 在所有筛选条件设置完成后，进行生成站点的操作，此时会展示出所有可用站点组合列表，该列表有三个功能：站点预览、站点信息、站点下载</p> 
            </div>
            <div class="item-content" v-if="tabType=='h'">
                <p></p>
                <p>01. 站点预览可以首先看一下该组合出来的站点所有页面组合的效果</p>
                <p>02. 站点信息将展示站点ID、各个页面的各个页面模块的分类、页面模块的模块分类、模块唯一标识类名、添加人、有效宽度</p>
            </div>
            <div class="item-content" v-if="tabType=='i'">
                <p></p>
                <p>01. 站点下载可以将该站点的所有资源的压缩包下载到本地，资源中包括已经生成的各个html页面，css样式文件、该站点所有页面及样式中应用到的静态图片资源、静态JQ库文件以及站点信息文本文件</p>
                <p>02. 组合站点为系统自动组合匹配，可能会出现模块风格迥异的情况，组合站点并非组合完成就不需要再做修改了，组合后的站点同样需要对细节进行调整</p>
                <p>03. 站点下载后需要本地进行调试，调试内容包括但不限于：色调统一、模块微调、模块替换，当然此时如果想使用特殊字体，将不再做限制</p>
                <p>04. 站点下载后，会出现可能该组合某个模块并不理想，需要替换，此时可以在本系统的模块页面中根据设置搜索条件，搜索出需要的模块，模块页面展示的模块除了编辑、删除功能外，会有复制HTML代码以及复制CSS代码的功能，找到需要的模块复制模块的HTML代码和CSS代码替换需要替换的模块即可，而该模块所引用的图片资源，需要通过html和css代码中的引用自行去找到并复制到站点的图片资源文件夹中</p>
                <p>05. 当站点本地调试完毕后，才能将站点打包发给对应的程序</p>
            </div>
            <div class="item-content" v-if="tabType=='j'">
                <p></p>
                <p>01. 已使用站点是已经下载过的站点，这里会做记录</p>
                <p>02. 已使用站点可以预览、查看站点信息、激活站点</p>
                <p>03. 激活站点操作需要线上该站被K，则在线上该站的服务器里找到该站点的站点信息文档，查看该站点的ID，在这里搜索该站点，进行激活站点操作</p>
                <p>04. 激活站点后，站点列表中，会显示该站点会在什么时间激活，激活时间为一个月，一个月后，该站点所记录的页面组合将可以再次被系统组合出来，以供再次使用</p>
            </div>
        </div>
    </div>
</template>

<script>
import {publicCode}  from '@/utils/index.js';
export default {
    name: 'defaultPage',
    data: function(){
        return {
            publicCssCode:'',
            iframeHtmlCode:'',
            iframeCssCode:'',
            tabType: "a",
            navList:[
                {
                    tabType:'a',
                    name:'概念',
                    icon:'icon-article',
                    isActive:true,
                },
                {
                    tabType:'b',
                    name:'模块属性',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'c',
                    name:'模块分类详解',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'d',
                    name:'模块编写注意事项',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'e',
                    name:'模块程序标签使用',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'f',
                    name:'模块的增删改查',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'g',
                    name:'组合站点注意事项',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'h',
                    name:'生成站点须知',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'i',
                    name:'下载站点须知',
                    icon:'icon-article',
                    isActive:false,
                },
                {
                    tabType:'j',
                    name:'已使用站点须知',
                    icon:'icon-article',
                    isActive:false,
                },
            ]
        }
    },
    beforeCreate:function(){
        var $this = this;
    },
    created:function(){},
    mounted(){
        var $this = this;
        $this.getPublicCode();
    },
    computed:{},
    methods:{
        getPublicCode:function(){
            var $this = this;
            var publicCodes = publicCode();
            $this.publicCssCode = publicCodes.publicCssCode;
            $this.iframeHtmlCode = publicCodes.fixedIframeData.iframeHtmlCode1 + publicCodes.fixedIframeData.iframeHtmlCode2 + publicCodes.fixedIframeData.iframeHtmlCode3;
            $this.iframeCssCode = publicCodes.fixedIframeData.iframeCssCode;
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
        goPage:function(type){
            var $this = this;
            $this.navList.forEach(function(item,index){
                if(item.tabType == type){
                    item.isActive = true;
                    $this.tabType = item.tabType;
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
        padding-top: 20px;
    }
    h2,h3{
        font-size: 24px;
        line-height: 36px;
        color: #333;
        margin-top: 30px;
    }
    p{
        font-size: 16px;
        line-height: 28px;
        min-height: 20px;
        margin-top: 10px;
        >span{
            font-weight: bold;
            color: #18a900;
            margin-right:10px;
        }
    }
}
.tags span{
        display: inline-block;
        height:28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0 10px;
        margin: 0 10px;
        border-radius: 4px;
        background: #e6e6e6;
        font-style: normal;
        color: #18a900;
        cursor: pointer;
}
.item-code{
    em{
        display: inline-block;
        height:28px;
        line-height: 28px;
        font-size: 14px;
        padding: 0 10px;
        margin: 0 10px;
        border-radius: 4px;
        background: #e6e6e6;
        font-style: normal;
        color: #18a900;
        cursor: pointer;
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