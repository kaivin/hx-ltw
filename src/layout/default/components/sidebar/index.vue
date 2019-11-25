<template>
    <div class="sidebar">
        <div class="sidebar-content">
            <ul class="menu-panel">
                <li class="item-menu" v-for="(item,index) in navList" v-bind:class="item.isActive?'is-active':''" v-bind:key="index">
                    <div class="item-menu-font" v-on:click="goPage(item.linkUrl,item.pageType)"><i class="icon" v-bind:class="item.icon"></i><span class="item-link">{{item.name}}</span></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data:function(){
    return{
      navList:[
        {
            pageType:'index',
            name:'首页',
            icon:'el-icon-s-tools',
            isActive:false,
            linkUrl:'/indexPage'
        },
        {
            pageType:'about',
            name:'关于我们',
            icon:'el-icon-document',
            isActive:false,
            linkUrl:'/aboutPage'
        },
        {
            pageType:'list',
            name:'列表页',
            icon:'el-icon-picture',
            isActive:false,
            linkUrl:'/listPage'
        },
        {
            pageType:'article',
            name:'详情页',
            icon:'el-icon-open',
            isActive:false,
            linkUrl:'/articlePage'
        },
        {
            pageType:'contact',
            name:'联系我们',
            icon:'el-icon-open',
            isActive:false,
            linkUrl:'/contactPage'
        },
        {
            pageType:'ltw',
            name:'长尾词页',
            icon:'el-icon-open',
            isActive:false,
            linkUrl:'/longTailWordsPage'
        },
      ]
    }
  },
  computed:{
  },
  methods:{
    goPage:function(value,type){
      var $this = this;
      var router = $this.$router;
      router.push({path: value});
      $this.navList.forEach(function(item,index){
        if(type == item.pageType){
          item.isActive = true;
        }else{
          item.isActive = false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
    background: #252a2f;
    width: 240px;
    position: absolute;
    left:0;
    top: 64px;
    bottom:0;
    overflow: hidden;
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
                    .icon,.item-link{
                        display: inline-block;
                        vertical-align: middle;
                        height: 56px;
                        line-height: 56px;
                        font-size: 14px;
                        color: #fff;
                    }
                    .icon{
                        color: #909399;
                        font-size: 16px;
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

 
@keyframes rotateMove
{
  0%{
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }
  80%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
  100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
}

@-webkit-keyframes rotateMove /*Safari and Chrome*/
{
  0%{
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }
  80%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
  100%{
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
}

@keyframes opacityMove1
{
  0%{
    opacity: .4;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: .4;
  }
}

@-webkit-keyframes opacityMove1
{
    0%{
        opacity: .4;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: .4;
    }
}
@keyframes opacityMove2
{
  0%{
    opacity: .6;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: .6;
  }
}

@-webkit-keyframes opacityMove2
{
    0%{
        opacity: .6;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: .6;
    }
}
@keyframes opacityMove3
{
  0%{
    opacity: .8;
  }
  50%{
    opacity: .4;
  }
  100%{
    opacity: .8;
  }
}

@-webkit-keyframes opacityMove3
{
    0%{
        opacity: .8;
    }
    50%{
        opacity: .4;
    }
    100%{
        opacity: .8;
    }
}
@keyframes opacityMove4
{
  0%{
    opacity: 1;
  }
  50%{
    opacity: .4;
  }
  100%{
    opacity: 1;
  }
}

@-webkit-keyframes opacityMove4
{
    0%{
        opacity: 1;
    }
    50%{
        opacity: .4;
    }
    100%{
        opacity: 1;
    }
}
</style>
