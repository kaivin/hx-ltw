<template>
  <div class="header">
      <div class="logo" v-on:click="clickDefault"><router-link to="/">红星长尾词管理系统(组合三)</router-link></div>
  </div>
</template>

<script>
export default {
    name:"headerModel",
    methods:{
        clickDefault:function(){
            this.$store.dispatch('header/changeActive','default');
            this.$store.dispatch('header/changePageType','default');
        }
    }
}
</script>

<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 64px;
        background: darken(#252a2f, 6%);
        position: fixed;
        left:0;
        top:0;
        .logo{
            float:left;
            height: 64px;
            line-height: 64px;
            font-size: 16px;
            color: #fff;
            padding:0 20px;
            cursor: pointer;
            a{
                line-height: 64px;
                font-size: 16px;
                color: #fff;
            }
        }
    }
</style>