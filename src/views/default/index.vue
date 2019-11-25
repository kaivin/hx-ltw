<template>
    <div class="page-root" v-bind:class="{'is-new':isNew,'is-form':isForm,'is-style':isStyle}">
        <div class="item-page lf-panel">
            <div class="item-data">
                <div class="item-header"><span v-on:click="closeNew">返回</span></div>
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
            isStyle:false
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

<style lang="scss">
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
        background: #f5f5f5;
        position: absolute;
        transition: all .5s ease-in-out;
        .item-header{
            width: 100%;
            position: absolute;
            left:0;
            border-bottom: 1px solid #e6e6e6;
            overflow: hidden;
            padding: 10px;
            background: #fff;
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
</style>