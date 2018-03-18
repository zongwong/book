import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/Index';
import Login from '@/page/Login';
import Home from '@/page/Home';
import Book from '@/page/Book';
import Notes from '@/page/notes/Notes';
import House from '@/page/house/House';
import Community from '@/page/community/Community';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'Home',
        component: Home,
      }, {
        path: '/book',
        name: 'Book',
        component: Book,
      }, {
        path: '/notes',
        name: 'Notes',
        component: Notes,
      }, {
        path: '/house',
        name: 'House',
        component: House,
      }, {
        path: '/community',
        name: 'Community',
        component: Community,
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ],
});
