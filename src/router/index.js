import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/Index';
import Login from '@/page/Login';
import Home from '@/page/Home';
import Book from '@/page/books/Book';
import BookDetail from '@/page/books/Detail';
import Notes from '@/page/notes/Notes';
import House from '@/page/house/House';
import HouseDetail from '@/page/house/Detail';
import Community from '@/page/community/Community';
import CommunityDetail from '@/page/community/Detail';
import Buy from '@/page/Buy';
import User from '@/page/user/Index';
import Center from '@/page/user/Center';

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
        path: '/book/:id',
        name: 'BookDetail',
        component: BookDetail,
      }, {
        path: '/notes',
        name: 'Notes',
        component: Notes,
      }, {
        path: '/house',
        name: 'House',
        component: House,
      }, {
        path: '/house/:id',
        name: 'HouseDetail',
        component: HouseDetail,
      }, {
        path: '/community',
        name: 'Community',
        component: Community,
      }, {
        path: '/community/:id',
        name: 'CommunityDetail',
        component: CommunityDetail,
      }, {
        path: '/buy',
        name: 'Buy',
        component: Buy,
      }, {
        path: '/user/:id',
        name: 'User',
        component: User,
      },{
        path: '/center',
        name: 'Center',
        component: Center,
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ],
});
