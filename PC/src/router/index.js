import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SetBaseInfo from '../views/register/SetBaseInfo.vue'
import SetDetailInfo from '../views/register/SetDetailInfo.vue'
import SetInfoFinish from '../views/register/SetInfoFinish.vue'
import Home from '../views/Home.vue'
import BaseInfo from '../views/home/BaseInfo.vue'
import SendEvents from '../views/home/SendEvents.vue'
import FinishEvents from '../views/home/FinishEvents.vue'
import PeopleList from '../views/home/PeopleList.vue'
import Management from  '../views/home/Management.vue'
import ActInfo from '../views/webShow/actInfo.vue'
import OrgInfo from '../views/webShow/orgInfo.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register,
      children:[
        {
          path:'step1',
          component:SetBaseInfo
        },
        {
          path:'step2',
          component:SetDetailInfo
        },
        {
          path:'step3',
          component:SetInfoFinish
        }
      ],
      redirect:'/register/step1'
    },
    {
      path: '/home',
      meta:{
        requireAuth: true
      },
      component:Home,
      children:[
        {
          path:':comId/baseInfo',
          component:BaseInfo
        },
        {
          path:':comId/sendEvents',
          component:SendEvents
        },
        {
          path:':comId/finishEvents',
          component:FinishEvents
        },
        {
          path:':comId/events/:id',
          component:PeopleList
        },
        {
          path:':comId/:id',
          component:Management
        }
      ]
    },
    {
      path:'/actInfo/:id',
      component:ActInfo
    },
    {
      path:'/orgInfo/:id',
      component:OrgInfo
    }
  ]
})


