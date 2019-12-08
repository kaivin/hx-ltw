<template>
  <el-container>
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
import { HeaderModel } from './components';
import { mapGetters } from 'vuex';
export default {
  name: 'Layout',
  components: {
    HeaderModel
  },
  mounted() {
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
  transition: padding .5s linear;
  padding:0!important;
}
</style>