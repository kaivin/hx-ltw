<template>
    <div class="page-root" v-bind:class="{'is-new':isNew,'is-form':isForm,'is-style':isStyle}">
        <div class="item-page lf-panel">
            <div class="item-data">
                <div class="item-header"><span v-on:click="closeNew">返回</span></div>
                <div class="item-content"></div>
            </div>
            <div class="item-info">
                <div class="item-panel">
                    <p>如果你是个新人，这里将教会你如何运用系统</p>
                    <span v-on:click="getNew">了解详情</span>
                </div>
            </div>
        </div>
        <div class="item-page center-panel">
            <div class="item-data">
                <div class="item-header"><span v-on:click="closeForm">返回</span></div>
                <div class="item-content">
                    <div class="form-panel">
                        <div class="item-form">
                            <div class="item-title">适用页面：</div>
                            <div class="item-body">
                                <el-checkbox v-model="checked3" label="首页" border></el-checkbox>
                                <el-checkbox v-model="checked4" label="关于我们" border></el-checkbox>
                                <el-checkbox v-model="checked3" label="列表页" border></el-checkbox>
                                <el-checkbox v-model="checked4" label="详情页" border></el-checkbox>
                                <el-checkbox v-model="checked3" label="联系我们" border></el-checkbox>
                                <el-checkbox v-model="checked4" label="长尾词页" border></el-checkbox>
                            </div>
                        </div>
                        <div class="item-form">
                            <div class="item-title">适用框架：</div>
                            <div class="item-body">
                                <el-checkbox v-model="checked3" label="上中下" border></el-checkbox>
                                <el-checkbox v-model="checked4" label="上左右下" border></el-checkbox>
                                <el-checkbox v-model="checked3" label="侧边固定导航" border></el-checkbox>
                            </div>
                        </div>
                        <div class="item-form">
                            <div class="item-title">所属模块：</div>
                            <div class="item-body"> 
                                <el-radio v-model="radio7" label="1" border>页头</el-radio>
                                <el-radio v-model="radio7" label="2" border>banner</el-radio>
                                <el-radio v-model="radio7" label="2" border>组合头</el-radio>
                                <el-radio v-model="radio7" label="2" border>服务</el-radio>
                                <el-radio v-model="radio7" label="2" border>合作伙伴</el-radio>
                                <el-radio v-model="radio7" label="2" border>环境</el-radio>
                                <el-radio v-model="radio7" label="2" border>图文列表</el-radio>
                                <el-radio v-model="radio7" label="2" border>文字列表</el-radio>
                                <el-radio v-model="radio7" label="2" border>表单</el-radio>
                                <el-radio v-model="radio7" label="2" border>联系信息</el-radio>
                                <el-radio v-model="radio7" label="2" border>分类列表</el-radio>
                                <el-radio v-model="radio7" label="2" border>页脚</el-radio>
                            </div>
                        </div>
                        <div class="item-form">
                            <div class="item-title">有效宽度：</div>
                            <div class="item-body">
                                <el-checkbox v-model="checked3" label="1440" border></el-checkbox>
                                <el-checkbox v-model="checked4" label="1280" border></el-checkbox>
                                <el-checkbox v-model="checked3" label="960" border></el-checkbox>
                            </div>
                        </div>
                        <div class="item-form">
                            <div class="item-title">添加人：</div>
                            <div class="item-body">
                                <el-radio v-model="radio7" label="1" border>聂亚兵</el-radio>
                                <el-radio v-model="radio7" label="2" border>张校远</el-radio>
                                <el-radio v-model="radio7" label="2" border>赵亚雄</el-radio>
                                <el-radio v-model="radio7" label="2" border>王军凯</el-radio>
                                <el-radio v-model="radio7" label="2" border>聂俊辉</el-radio>
                            </div>
                        </div>
                        <div class="item-form">
                            <div class="item-title">html代码：</div>
                            <div class="item-body">
                                <el-input type="textarea" v-model="formData.htmlString"></el-input>
                            </div>
                        </div>
                        <div class="item-form">
                            <div class="item-title">css样式：</div>
                            <div class="item-body">
                                <el-input type="textarea" v-model="formData.cssString"></el-input>
                            </div>
                        </div>
                        <div class="item-button">
                            <el-button size="medium">提交代码</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-info">
                <div class="item-panel">
                    <p>如果你是贡献者，这里会记录你每一次的贡献</p>
                    <span v-on:click="showForm">贡献代码</span>
                </div>
            </div>
        </div>
        <div class="item-page rt-panel">
            <div class="item-info">
                <div class="item-panel">
                    <p>如果你是搬运者，这里能给你初始化公共样式</p>
                    <span v-on:click="copyStyle">复制样式</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'defaultPage',
    data: function(){
        return {
            isNew:false,
            isForm:false,
            isStyle:false,
            formData:{
                htmlString:'',
                cssString:'',
            }
        }
    },
    beforeCreate:function(){},
    computed:{},
    methods:{
        getNew:function(){
            var $this = this;
            $this.isNew = true;
        },
        closeNew:function(){
            var $this = this;
            $this.isNew = false;
        },
        showForm:function(){
            var $this = this;
            $this.isForm = true;
        },
        closeForm:function(){
            var $this = this;
            $this.isForm = false;
        },
        copyStyle:function(){
            var $this = this;
            $this.isStyle = true;
        }
    },
}
</script>

<style lang="scss" scoped>
.is-new{
    .lf-panel{
        left:0;
        &:before{
            background: none;
        }
        .item-info{
            left: -100%;
        }
        .item-data{
            left:0;
            top: 0;
        }
    }
    .center-panel{
        left: 70%;
    }
    .rt-panel{
        right: -140%;
    }
}
.is-form{
    .lf-panel{
        left:-100%;
    }
    .center-panel{
        .item-data{
            top: 0;
        }
        .item-info{
            top: 100%;
        }   
    }
    .rt-panel{
        right: -100%;
    }
}
.item-page{
    width: 100%;
    position: absolute;
    top:0;
    height: 100%;
    transition: all .5s ease-in-out;
    .item-data{
        width: 100%;
        height: 100%;
        top: -100%;
        background: #fff;
        position: absolute;
        transition: all .5s ease-in-out;
        .item-header{
            width: 100%;
            position: absolute;
            left:0;
            border-bottom: 1px solid #e6e6e6;
            overflow: hidden;
            padding: 10px;
            background: #f5f5f5;
            span{
                display: inline-block;
                line-height: 30px;
                font-size: 14px;
                border: 1px solid #ddd;
                padding: 0 16px;
                border-radius: 5px;
                cursor: pointer;
            }
        }
        .item-content{
            top:51px;
            left:0;
            bottom:0;
            width: 100%;
            overflow-y: auto;
            position: absolute;
        }
    }
    .item-info{
        display: block;
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background: #fff;
        transition: all .5s ease-in-out;
        cursor: pointer;
        &:hover{
            background: #f5f5f5;
        }
        .item-panel{
            width: 100%;
            position: relative;
            overflow: hidden;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
            p{
                width: 100%;
                padding: 0 20%;
                font-size: 24px;
                line-height: 36px;
                color: #333;
                text-align: center;
            }
            span{
                display: inline-block;
                padding: 6px 48px;
                font-size: 24px;
                line-height: 36px;
                border-radius: 5px;
                background: red;
                margin-top: 30px;
                color: #fff;
            }
        }
    }
}
.lf-panel{
    left: -70%;
    z-index: 2;
    &:before{
        content:'';
        display: block;
        width: 1px;
        position: absolute;
        right:0;
        top: 10%;
        bottom: 10%;
        background: #f5f5f5;
        z-index: 2;
    }
    .item-data{
        top:0;
        left: -100%;
    }
    .item-info{
        padding-left: 70%;
    }
}
.center-panel{
    left:0;
    z-index: 1;
    .item-data{
        left:0;
    }
    .item-info{
        padding: 0 30%;
        z-index: 2;
        .item-panel{
            p{
                padding: 0 28%;
            }
        }
    }
}
.rt-panel{
    right: -70%;
    z-index: 2;
    &:before{
        content:'';
        display: block;
        width: 1px;
        position: absolute;
        left:0;
        top: 10%;
        bottom: 10%;
        background: #f5f5f5;
        z-index: 2;
    }
    .item-info{
        padding-right: 70%;
    }
}
.form-panel{
    width: 100%;
    padding: 20px;
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
        }
        .item-body{
            width: 100%;
            @extend %clearfix;
            font-size:0;
            .el-radio,.el-checkbox{
                margin:0 10px 10px 0;
            }
        }
    }
    .item-button{
        margin-top: 20px;
    }
}
</style>