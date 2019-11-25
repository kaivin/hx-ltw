<template>
  <el-container>
    <sidebar />
    <el-container>
      <el-header>
        <header-model />
      </el-header>
      <el-main>
        <transition 
          name="fade-transform"
          mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Sidebar , HeaderModel } from './components';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    HeaderModel
  },
  mounted() {
      window.addEventListener('load', () => { // 滚动事件变为 scroll
          if (this.$route.path !== '/default') { // /print 表示首页
                this.$router.replace('/default') // 切换到首页
          }
      });
  },
  computed:{
  },
  methods: {
  }
}
</script>

<style>
.el-header{
  background: none;
  padding:0!important;
  height:64px!important;
}
.el-main {
  background-color: #fff;
  overflow: hidden!important;
  padding:0 0 0 240px!important;
}
</style>