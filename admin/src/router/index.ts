import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesEdit from '../views/categories/Edit.vue'
import CategoriesList from '../views/categories/List.vue'
import ItemsEdit from '../views/items/Edit.vue'
import ItemsList from '../views/items/List.vue'
import HerosEdit from '../views/heros/Edit.vue'
import HerosList from '../views/heros/List.vue'
import ArticlesEdit from '../views/articles/Edit.vue'
import ArticlesList from '../views/articles/List.vue'
import AdsEdit from '../views/ads/Edit.vue'
import AdsList from '../views/ads/List.vue'
import AdminUserEdit from '../views/admin_users/Edit.vue'
import AdminUserList from '../views/admin_users/List.vue'
import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoriesEdit },
      { path: '/categories/edit/:id', component: CategoriesEdit, props: true },
      { path: '/categories/list', component: CategoriesList },
      { path: '/items/create', component: ItemsEdit },
      { path: '/items/edit/:id', component: ItemsEdit, props: true },
      { path: '/items/list', component: ItemsList },
      { path: '/heros/create', component: HerosEdit },
      { path: '/heros/edit/:id', component: HerosEdit, props: true },
      { path: '/heros/list', component: HerosList },
      { path: '/articles/create', component: ArticlesEdit },
      { path: '/articles/edit/:id', component: ArticlesEdit, props: true },
      { path: '/articles/list', component: ArticlesList },
      { path: '/ads/create', component: AdsEdit },
      { path: '/ads/edit/:id', component: AdsEdit, props: true },
      { path: '/ads/list', component: AdsList },
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
