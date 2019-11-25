import Vue from 'vue';
import Router from 'vue-router';

/* 1. 定义路由组件 Layout */
import Layout from '@/layout/default';

Vue.use(Router);

/* 2. 定义路由 */
const routes = [
    {
        path: '/',
        redirect: 'default',
        component: Layout,
        children: [
            {
                path: 'default',
                component: () => import('@/views/default'),
                name: 'defaultPage',
            },
        ]
    },
    {
        path: '/indexPage',
        redirect: 'indexPage',
        component: Layout,
        children: [
            {
                path: 'indexPage',
                component: () => import('@/views/index'),
                name: 'indexPage',
            },
        ]
    },
    {
        path: '/aboutPage',
        redirect: 'aboutPage',
        component: Layout,
        children: [
            {
                path: 'aboutPage',
                component: () => import('@/views/about'),
                name: 'aboutPage',
            },
        ]
    },
    {
        path: '/listPage',
        redirect: 'listPage',
        component: Layout,
        children: [
            {
                path: 'listPage',
                component: () => import('@/views/list'),
                name: 'listPage',
            },
        ]
    },
    {
        path: '/articlePage',
        redirect: 'articlePage',
        component: Layout,
        children: [
            {
                path: 'articlePage',
                component: () => import('@/views/article'),
                name: 'articlePage',
            },
        ]
    },
    {
        path: '/contactPage',
        redirect: 'contactPage',
        component: Layout,
        children: [
            {
                path: 'contactPage',
                component: () => import('@/views/contact'),
                name: 'contactPage',
            },
        ]
    },
    {
        path: '/longTailWordsPage',
        redirect: 'longTailWordsPage',
        component: Layout,
        children: [
            {
                path: 'longTailWordsPage',
                component: () => import('@/views/longTailWords'),
                name: 'longTailWordsPage',
            },
        ]
    },
];

const createRouter = () => new Router({
    routes: routes
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

// const createRouter = () => new Router({
//     // mode: 'history', // require service support
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRoutes
// });
// const router = createRouter();
// export function resetRouter() {
//     const newRouter = createRouter();
//     router.matcher = newRouter.matcher; // reset router
// }

/* 3. 创建 router 实例 */
// const router = new Router({
//     /* 4. 传 `routes` 配置，这里是缩写，相当于 routes: routes */
//     routes 
// });

/* 5. 暴露出该文件 */
export default router;