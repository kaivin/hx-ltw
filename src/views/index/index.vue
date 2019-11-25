<template>
  <div class="page-root" v-bind:class="{'is-model':isModel,'is-page':isPage}">
      <div class="item-data model-panel">
          <div class="item-header"><span v-on:click="closeModel">返回</span></div>
          <div class="model-type-panel">
            <span v-for="(item,index) in modelType" v-bind:class="item.isActive?'is-active':''" v-bind:key="index">{{item.name}}</span>
          </div>
          <div class="item-content">
            <div class="model-list">
              <div class="item-model" v-for="(item,index) in modelData" v-bind:key="index">
                <div class="model-header"><span>模块ID:{{item.id}}</span><span>添加时间：{{item.createdDate}}</span></div>
                <div class="model-body" v-html="item.codeString"></div>
                <div class="model-footer">
                  <span>添加人：{{item.author}}</span>
                  <div class="edit-button">
                    <span>复制代码</span>
                    <span>复制样式</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="item-data page-panel">
          <div class="item-header"><span v-on:click="closePage">返回</span></div>
          <div class="item-content"></div>
      </div>
      <div class="item-page lf-panel">
        <div class="item-info">
            <div class="item-panel">
                <p>这里可以预览该页面所有现有模块</p>
                <span v-on:click="showModel">模块预览</span>
            </div>
        </div>
      </div>
      <div class="item-page rt-panel">
        <div class="item-info">
            <div class="item-panel">
                <p>这里为你自动组合出你想要的页面</p>
                <span v-on:click="showPage">创建页面</span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'indexPage',
    data: function(){
        return {
            isModel:false,
            isPage:false,
            modelType:[
              {key:'header',name:'页头',isActive:true},
              {key:'banner',name:'banner',isActive:false},
              {key:'about',name:'关于我们',isActive:false},
              {key:'product',name:'产品推介',isActive:false},
              {key:'case',name:'案例',isActive:false},
              {key:'news',name:'新闻',isActive:false},
              {key:'footer',name:'页脚',isActive:false},
            ],
            modelData:[
              {id:0,htmlString:'<div class="wjk-header-0001">我是一个模块</div>',sytleString:'.wjk-header-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26',codeString:'<style>.wjk-header-0001{width:100%;height:300px;background:red;color:#fff;font-size:32px;text-align:center;line-height:300px;}</style><div class="wjk-header-0001">我是一个模块</div>'},
              {id:1,htmlString:'<div class="wjk-header-0002">我是一个模块</div>',sytleString:'.wjk-header-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26',codeString:'<style>.wjk-header-0002{width:100%;height:300px;background:green;color:#fff;font-size:32px;text-align:center;line-height:300px;}</style><div class="wjk-header-0002">我是一个模块</div>'},
              {id:2,htmlString:'<div class="wjk-header-0003">我是一个模块</div>',sytleString:'.wjk-header-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26',codeString:'<style>.wjk-header-0003{width:100%;height:300px;background:blue;color:#fff;font-size:32px;text-align:center;line-height:300px;}</style><div class="wjk-header-0003">我是一个模块</div>'},
              {id:3,htmlString:'<div class="wjk-header-0004">我是一个模块</div>',sytleString:'.wjk-header-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26',codeString:'<style>.wjk-header-0004{width:100%;height:300px;background:black;color:#fff;font-size:32px;text-align:center;line-height:300px;}</style><div class="wjk-header-0004">我是一个模块</div>'},
              {id:4,htmlString:'<div class="wjk-header-0005">我是一个模块</div>',sytleString:'.wjk-header-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}',author:'王军凯',createdDate:'2019-11-26',codeString:'<style>.wjk-header-0005{width:100%;height:300px;background:pink;color:#fff;font-size:32px;text-align:center;line-height:300px;}</style><div class="wjk-header-0005">我是一个模块</div>'}
            ]
        }
    },
    beforeCreate:function(){},
    computed:{},
    methods:{
        showModel:function(){
            var $this = this;
            $this.isModel = true;
        },
        closeModel:function(){
            var $this = this;
            $this.isModel = false;
        },
        showPage:function(){
            var $this = this;
            $this.isPage = true;
        },
        closePage:function(){
            var $this = this;
            $this.isPage = false;
        },
    },
}
</script>

<style lang="scss" scoped>
.is-model{
  .model-panel{
    top:0;
  }
  .lf-panel{
    left: -50%;
  }
  .rt-panel{
    right: -50%;
  }
}
.is-page{
  .page-panel{
    top:0;
  }
  .lf-panel{
    left: -50%;
  }
  .rt-panel{
    right: -50%;
  }
}
.item-page{
    width: 50%;
    position: absolute;
    top:0;
    height: 100%;
    transition: all .5s ease-in-out;
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
  left:0;
}
.rt-panel{
  right:0;
}

.item-data{
    width: 100%;
    height: 100%;
    left:0;
    top: -100%;
    background: #fff;
    position: absolute;
    transition: all .5s ease-in-out;
    overflow: hidden;
    .item-header{
        width: 100%;
        position: absolute;
        left:0;
        border-bottom: 1px solid #e6e6e6;
        overflow: hidden;
        padding: 10px;
        background: #f5f5f5;
        z-index: 1;
        span{
            display: inline-block;
            line-height: 30px;
            font-size: 14px;
            border: 1px solid #ddd;
            background: #fff;
            padding: 0 16px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .model-type-panel{
      width:100%;
      top: 51px;
      position: absolute;
      left:0;
      padding: 10px 0;
      text-align: center;
      span{
        display: inline-block;
        margin: 0 10px;
        height:32px;
        line-height: 32px;
        padding: 0 15px;
        font-size: 14px;
        background: #f5f5f5;
        cursor: pointer;
        color: #333;
        border-radius: 5px;
      }
      span.is-active{
        background: red;
        color: #fff;
      }
    }
    .item-content{
      top:103px;
      left:0;
      bottom:0;
      width: 100%;
      overflow-y: auto;
      position: absolute;
    }
}
.model-list{
  width: 100%;
  overflow: hidden;
  padding: 10px 0 20px;
  .item-model{
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    @extend %clearfix;
    margin-bottom: 40px;
    .model-header{
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
    .model-body{
      @extend %clearfix;
      padding: 40px 0;
      width:100%;
    }
    .model-footer{
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
          line-height: 30px;
          border: 1px solid #ddd;
          padding: 0 10px;
          font-size: 14px;
          margin-left: 20px;
          border-radius: 5px;
          color: #333;
          cursor: pointer;
        }
      }
    }
  }
}
</style>