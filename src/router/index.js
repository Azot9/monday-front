import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrationPage from '../views/RegistrationPage.vue'
import HomePage from '../views/HomePage.vue'
import StandsPage from '../views/StandsPage.vue'
import DetailsPage from '../views/DetailsPage.vue'
import LaboratoriesPage from '../views/LaboratoriesPage.vue'
import OneStand from '../views/OneStand.vue'
import OneLaboratory from '../views/OneLaboratory.vue'
// import OneDetail from '../views/OneDetail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/stands',
    name: 'stands',
    component: StandsPage
  },
  {
    path: '/details',
    name: 'details',
    component: DetailsPage
  },
  {
    path: '/laboratories',
    name: 'laboratories',
    component: LaboratoriesPage
  },
  {
    path: '/stands/:id',
    name: 'one_stand',
    component: OneStand
  },
  {
    path: '/laboratory/:id',
    name: 'one_laboratory',
    component: OneLaboratory
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
