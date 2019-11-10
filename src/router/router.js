import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {path: "/", redirect: '/home'},
    {path: "/home", component: () => import("../views/home/Home.vue")},
    {path: "/category", component: () => import("../views/category/Category.vue")},
    {path: "/car", component: () => import("../views/cart/ShopCart.vue")},
    {path: "/profile", component: () => import("../views/profile/Profile.vue")},
    {path: "/detail/:id", component: () => import("../views/detail/Detail.vue")},
  ]
});
