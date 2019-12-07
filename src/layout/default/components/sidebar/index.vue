<template>
    <div class="sidebar" v-bind:class="isOpened?'show':'hide'">
        <span class="sidebar-menu iconfont" v-bind:class="isOpened?'icon-left':'icon-right'" v-on:click="toggleSidebar"></span>
        <div class="sidebar-content">
            <ul class="menu-panel">
                <li class="item-menu" v-for="(item,index) in navList" v-bind:class="item.isActive?'is-active':''" v-bind:key="index">
                    <div class="item-menu-font" v-on:click="goPage(item.linkUrl,item.pageType)"><i class="iconfont" v-bind:class="item.icon"></i><span class="item-link">{{item.name}}</span></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Sidebar',
  data:function(){
    return{
      navList:[
        {
            pageType:'module',
            name:'模块',
            icon:'icon-module',
            isActive:false,
            linkUrl:'/modulePage'
        },
        {
            pageType:'website',
            name:'站点',
            icon:'icon-site',
            isActive:false,
            linkUrl:'/websitePage'
        },
      ]
    }
  },
  watch:{
    // 监听状态管理中导航的cookie值变化，如果导航是在默认首页，则执行里面的事件
    isDefaultActive:function(val,oldVal){
      var $this = this;
      if(val){
        $this.navList.forEach(function(item,index){
          item.isActive = false;
        });
      }
    }
  },
  mounted() {
    window.addEventListener('load', () => { // 滚动事件变为 scroll
      var $this = this;
      if($this.pageType!=="default"&&!$this.isDefaultActive){
        $this.navList.forEach(function(item,index){
          if(item.pageType == $this.pageType){
            item.isActive = true;
          }
        });
      }
    });
  },
  computed:{
    ...mapGetters([
        'sidebar',
    ]),
    isDefaultActive:function(){
      return this.sidebar.isDefaultActive;
    },
    isOpened(){
      return this.sidebar.opened;
    },
    pageType(){
      return this.sidebar.pageType;
    }
  },
  methods:{
    toggleSidebar() {
        this.$store.dispatch('header/toggleSideBar');
    },
    goPage:function(value,type){
      var $this = this;
      var router = $this.$router;
      $this.$store.dispatch('header/changeActive','');
      $this.$store.dispatch('header/changePageType',type);
      $this.navList.forEach(function(item,index){
        if(!item.isActive){
          if(item.pageType == type){
            router.push({path: value});
            item.isActive = true;
          }else{
            item.isActive = false;
          }
        }else{
          if(item.pageType != type){
            item.isActive = false;
          }
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar.show{
  left:0;
}
.sidebar.hide{
  left: -240px;
}
.sidebar{
    background: #252a2f;
    width: 240px;
    position: absolute;
    left:0;
    top: 64px;
    bottom:0;
    @extend %clearfix;
    transition: left .5s linear;
    z-index: 1080;
    .sidebar-menu{
      width: 48px;
      height: 48px;
      border-radius: 0 5px 5px 0;
      background: #fff;
      border: 1px solid #e6e6e6;
      border-left:0;
      position: absolute;
      right: -48px;
      top: 68px;
      cursor: pointer;
      line-height: 48px;
      text-align: center;
      font-size: 36px;
      color: red;
      &:hover{
        background:fff;
      }
    }
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
