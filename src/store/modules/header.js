import Cookies from 'js-cookie';

const state = {
    // 设置全局可访问的state对象
    sidebar: {// 侧边导航相关的状态管理
        // 导航是否在默认页上，如果cookie不存在，则证明是默认打开，还没有点击事件，没生成cookie，此时默认在默认页上，所以是true
        // !! 是逻辑非非判断，这里cookie取值是数字类型的0和1，0的非非逻辑是false，1的非非逻辑是true
        isDefaultActive: Cookies.get('isDefault') ? !!+Cookies.get('isDefault') : true,
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        pageType: Cookies.get('pageType') ? Cookies.get('pageType') : 'default',
    },
};
  
  
const mutations = {// 是一个对象，主要存放改变state初始值得方法
    CHANGE_ACTIVE (state,type) {// 这里可以额外传参数，额外参数即mutation的载荷（payload）,载荷一般应该是个对象，这样可以包含多个字段
        if(type=='default'){
            state.sidebar.isDefaultActive = true;
        }else{
            state.sidebar.isDefaultActive = false;
        }
        if (state.sidebar.isDefaultActive) {
            Cookies.set('isDefault', 1);
        } else {
            Cookies.set('isDefault', 0);
        }
        console.log(state.sidebar.isDefaultActive);
    },
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened;
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1);
        } else {
            Cookies.set('sidebarStatus', 0);
        }
    },
    changePageType(state,pageType){
        state.sidebar.pageType = pageType;
        Cookies.set('pageType', pageType);
    },
};

const actions = {
    // 在需要调用的事件方法里 后面的参数根据需要进行填写，可以是对象
    // $this.$store.dispatch('header/changeActive','');
    changeActive(ctx,type) {// 这里接收额外传入的参数
        ctx.commit('CHANGE_ACTIVE',type);
    },
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR');
    },
    changePageType(ctx,pageType) {
        ctx.commit('changePageType',pageType);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};