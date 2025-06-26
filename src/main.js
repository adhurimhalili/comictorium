import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router';
import firebase from 'firebase';
import Vuelidate from 'vuelidate';
import './components/firebaseInit';
//fajlli routes importohet te kjo pjese dhe ne at file kemi deklaruar routat e ndryshem se cila route te cila komponent dergon gjate klikut
//vue router e instalojme me npm install vue-router pastaj e thirrim ne main.js me import VueRouter from 'vue-router'

import store from "./store";
//regjistrimi i filterit global per zvogelimin e shkronjave
Vue.filter('to-lowercase',function(value){
  return value.toLowerCase();
});
Vue.use(Vuelidate)
//regjistrimi i direktives globable highlight 
Vue.directive('highlight',{

  /* eslint-disable */
  bind(el, binding, vnode){
    //el.style.backgroundColor='blue';
    //el.style.backgroundColor=binding.value;
    if(binding.arg=='background'){
      el.style.backgroundColor=binding.value;
    }else{
      el.style.color=binding.value;
    }
  }
});
Vue.use(VueRouter);

let app;
firebase.auth().onAuthStateChanged(function(user){
  store.dispatch("fetchUser", user);
  if(!app){
  app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
  });
}
});