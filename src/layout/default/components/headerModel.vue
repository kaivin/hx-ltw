<template>
  <div class="ltw-header">
    <div class="ltw-logo" v-on:click="clickDefault"><router-link to="/">红星长尾词管理系统(组合三)</router-link></div>
    <ul class="ltw-menu-panel">
        <li class="ltw-item-menu" v-for="(item,index) in navList" v-bind:class="item.isActive?'is-active':''" v-bind:key="index">
            <div class="ltw-item-menu-font" v-on:click="goPage(item.linkUrl,item.pageType)"><i class="iconfont" v-bind:class="item.icon"></i><span class="ltw-item-link">{{item.name}}</span></div>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name:"headerModel",
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
            {
                pageType:'usedWebsite',
                name:'已使用站点',
                icon:'icon-lock',
                isActive:false,
                linkUrl:'/usedWebsitePage'
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
        clickDefault:function(){
            this.$store.dispatch('header/changeActive','default');
            this.$store.dispatch('header/changePageType','default');
        },
        goPage:function(value,type){
            var $this = this;
            var router = $this.$router;
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
            $this.$store.dispatch('header/changeActive','');
            $this.$store.dispatch('header/changePageType',type);
        }
    },
}
</script>

<style lang="scss" scoped>
    .ltw-header{
        width: 100%;
        height: 64px;
        background: darken(#252a2f, 6%);
        position: fixed;
        left:0;
        top:0;
        .ltw-logo{
            float:left;
            height: 64px;
            line-height: 64px;
            font-size: 16px;
            color: #fff;
            padding:0 20px;
            cursor: pointer;
            background: darken(#252a2f, 6%);
            transition: background .5s ease-in-out;
            &:hover{
                background: darken(#252a2f,2%);
            }
            a{
                display: block;
                line-height: 64px;
                font-size: 16px;
                color: #fff;
                &:hover{
                    text-decoration: none;
                }
            }
        }
    }
    .ltw-menu-panel{
        overflow: hidden;
        margin:0;
        padding: 0;
        float:left;
        .ltw-item-menu{
            float:left;
            overflow: hidden;
            .ltw-item-menu-font{
                padding: 0 20px;
                height: 64px;
                font-size:0;
                cursor: pointer;
                transition: background .5s ease-in-out;
                &:hover{
                    background: darken(#252a2f,2%);
                }
                .iconfont,.ltw-item-link{
                    display: inline-block;
                    vertical-align: middle;
                    height: 64px;
                    line-height: 64px;
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
        .ltw-item-menu.is-active{
            .ltw-item-menu-font{
                background: darken(#252a2f,4%);
                i{
                    color: #fff;
                }
            }
        }
    }
</style>