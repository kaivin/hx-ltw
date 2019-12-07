<template>
  <el-container>
    <sidebar />
    <el-container>
      <el-header>
        <header-model />
      </el-header>
      <el-main v-bind:class="isOpened?'show':'hide'">
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
import { mapGetters } from 'vuex';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    HeaderModel
  },
  mounted() {
  },
  computed:{
    ...mapGetters([
        'sidebar',
    ]),
    isOpened(){
      return this.sidebar.opened;
    },
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
}
.el-main.show{
  padding:0 0 0 240px!important;
}
.el-main.hide{
  padding:0!important;
}
</style>