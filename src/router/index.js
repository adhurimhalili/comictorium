import Messages from '@/components/admin/Messages';
import Home from '@/components/Home';
import Dashboard from '@/components/admin/Dashboard';
import About from '@/components/About';
import Admin from '@/components/admin/Admin';
import Contact from '@/components/Contact';
import Adminpanel from '@/components/admin/Adminpanel';
import Books from '@/components/books/Books';
import Posta from '@/components/admin/Posta';
import Quotes from '@/components/admin/Quotes';
import MyOrders from '@/components/MyOrders';
import Rezervimet from '@/components/admin/Rezervimet';
import Confirm from '@/components/admin/Confirm';
import Bookdetails from '@/components/books/Bookdetails';
import Deletebook from '@/components/admin/Deletebook';
import Editbook from '@/components/admin/Editbook';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Category from '@/components/admin/Category.vue';
import Origin from '@/components/admin/Origin.vue';
import Brand from '@/components/admin/Brand.vue';
import Editbrand from '@/components/admin/Editbrand.vue';
import Ndertesa from '@/components/Ndertesa';
import Ashensor from '@/components/Ashensor';
import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
//importojme gjithe ato komponenta qe do i regjistrojme si routes
Vue.use(Router);

let router = new Router({
 routes : [
    { path:'/', name:'home', component:Home},
    { path: '/about', name:'about', component:About},
    { path: '/messages', name:'messages', component: Messages, meta: {requiresAuth: true}},
    { path: '/contact', name:'contact', component:Contact},
    { path: '/books/:Cid', name:'books', component:Books},
    { path: '/posta', name:'posta', component:Posta, meta: {requiresAuth: true}},
    { path: '/myorders', name:'myorders', component:MyOrders, meta: {requiresAuth: true}},
    { path: '/admin', name:'admin', component:Admin, meta: {requiresAuth: true}},
    { path: '/confirm/:Oid', name:'confirm', component:Confirm, meta: {requiresAuth: true}},
    { path: '/adminpanel', name:'adminpanel', component:Adminpanel, meta: {requiresAuth: true}},
    { path: '/quotes', name:'quotes', component:Quotes, meta: {requiresAuth: true}},
    { path: '/rezervimet/', name:'rezervimet', component:Rezervimet, meta: {requiresAuth: true}},
    { path: '/bookdetails/:Bid', name:'bookdetails', component:Bookdetails},
    { path: '/deletebook/:Bid', name:'deletebook', component:Deletebook, meta: {requiresAuth: true}},
    { path: '/editbook/:Bid', name:'editbook', component:Editbook, meta: {requiresAuth: true}},
    { path: '/category', name:'category', component:Category, meta: {requiresAuth: true}},
    { path: '/dashboard', name:'dashboard', component:Dashboard, meta: {requiresAuth: true}},
    { path: '/login', name:'login', component:Login,meta: { requiresGuest: true}},
    { path: '/register', name:'register', component:Register,meta: { requiresGuest: true}},
    { path: '/origin', name:'origin', component:Origin,meta: { requiresAuth: true}},
    { path: '/brand', name:'brand', component:Brand,meta: { requiresAuth: true}},
    { path: '/editbrand/:Bid', name:'editbrand', component:Editbrand, meta: {requiresAuth: true}},
    
    { path: '/ndertesa', name:'quotes', component:Ndertesa, meta: {requiresAuth: true}},
    { path: '/ashensor', name:'quotes', component:Ashensor, meta: {requiresAuth: true}}
]

});

router.beforeEach((to, from, next) => {
    // Check for requiresAuth guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Check if NO logged user
      if (!firebase.auth().currentUser) {
        // Go to login
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        // Proceed to route
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      // Check if NO logged user
      if (firebase.auth().currentUser) {
        // Go to login
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        // Proceed to route
        next();
      }
    } else {
      // Proceed to route
      next();
    }
  });
  
  export default router;