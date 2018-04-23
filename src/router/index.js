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
import history from '@/page/user/History';
import order from '@/page/user/Order';
import info from '@/page/user/UserInfo';
import Pbbook from '@/page/user/book';
import Pbnote from '@/page/user/note';
import Pbhouse from '@/page/user/house';
import Pbcommunity from '@/page/user/community';
import publishbook from '@/page/user/BookFrom';
// import publishnote from '@/page/user/NoteFrom';
import publishhouse from '@/page/user/HouseFrom';
import publishpost from '@/page/user/CommunityFrom';
import Post from '@/page/community/Post';
import address from '@/page/address/address';
import SetNick from '@/page/setnick';
import page404 from '@/page/page404';

Vue.use(Router);

export default new Router({
  mode:"history",
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
        path: '/goods/:id',
        name: 'BookDetail',
        component: BookDetail,
      }, {
        path: '/notes',
        name: 'Notes',
        component: Notes,
      },{
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
        path: '/community/post/:id',
        name: 'post',
        component: Post,
      }, {
        path: '/buy/:id',
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
        redirect: '/center/info',
        meta: { requiresAuth: true },
        children:[{
          path: '/center/history',
          name: 'history',
          component: history,
        }, {
          path: '/center/order',
          name: 'order',
          component: order,
        }, {
          path: '/center/info',
          name: 'info',
          component: info,
        }, {
          path: '/center/book',
          name: 'Pbbook',
          component: Pbbook,
        }, {
          path: '/center/note',
          name: 'Pbnote',
          component: Pbnote,
        }, {
          path: '/center/house',
          name: 'Pbhouse',
          component: Pbhouse,
        }, {
          path: '/center/community',
          name: 'Pbcommunity',
          component: Pbcommunity,
        },{
          path: '/center/publish/:cat',
          name: 'publish',
          component: publishbook,
        },{
          path: '/center/publish/:cat/:id',
          name: 'editpublish',
          component: publishbook,
        }, {
          path: '/center/publishhouse',
          name: 'publishhouse',
          component: publishhouse,
        }, {
          path: '/center/publishpost',
          name: 'publishpost',
          component: publishpost,
        },{
          path: '/center/address',
          name: 'address',
          component: address,
        }]
      }]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/setnick',
      name: 'SetNick',
      component: SetNick,
    },{ 
      path: '*', 
      component: page404 
    }
  ],
});
