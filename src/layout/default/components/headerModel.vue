<template>
  <div class="header">
      <div class="logo" v-on:click="goDefault">红星长尾词管理系统(组合三)</div>
  </div>
</template>

<script>
export default {
    name:"headerModel",
    methods:{
        goDefault:function(){
            var $this = this;
            var router = $this.$router;
            router.push({path: '/'});
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
        }
    }
</style>