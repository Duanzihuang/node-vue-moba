import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesEdit from '../views/categories/Edit.vue'
import CategoriesList from '../views/categories/List.vue'
import ItemsEdit from '../views/items/Edit.vue'
import ItemsList from '../views/items/List.vue'
import HerosEdit from '../views/heros/Edit.vue'
import HerosList from '../views/heros/List.vue'

Vue.use(VueRouter)

const routes = [
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
      { path: '/heros/list', component: HerosList }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
