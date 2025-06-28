<template>
<div>

   
  <nav class="navbar navbar-expand-lg navbar-dark static-top font header">
    
    <div class="container">
      <router-link to="/"><img style="width:50px" src="../../assets/logo.png"></router-link>       
      <router-link to="/"><a class="navbar-brand"  href="#">Comictorium</a></router-link> 
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item ">
            <router-link to="/" tag="li" active-class="active" exact> <a class="nav-link">Home</a></router-link>
          </li>
          <li class="nav-item">
             <router-link to="/about" tag="li" active-class="active" exact> <a class="nav-link" >About</a></router-link>
          </li>
           <li class="nav-item">
             <router-link to="/books/all" tag="li" active-class="active" exact><a class="nav-link" @click=" goTobookcategory()">Books</a></router-link>
          </li>
         
   <div v-for="admins in adminfields" :key="admins._id">
          <div v-if="admins.email == user.data.email">
           <li class="nav-item ">
            <router-link to="/adminpanel" tag="li" active-class="active" exact> <a class="nav-link">Admin</a></router-link>
          </li>
          </div>
          </div>
       
           <li class="nav-item ">
            <router-link to="/contact" tag="li" active-class="active" exact> <a class="nav-link">Contact</a></router-link>
          </li>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
              <li class="nav-item ">
            <router-link to="/myorders" tag="li" active-class="active" exact> <a class="nav-link">Blerjet</a></router-link>
          </li>
            <div class="nav-item">
             <a class="nav-link">Hi {{user.data.displayName}}!  </a>
                        </div>
            <li class="nav-item">
               <router-link to="/" tag="li"  exact @click.prevent="signOut" ><a class="nav-link" @click.prevent="signOut"><i class="cil-account-logout"></i></a></router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link"><i class="cil-user"></i></router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link"><i class="cil-user-follow"></i></router-link>
            </li>
          </template>
        </ul>
      </div>
        </ul>
      </div>
    </div>
    <Toggle :mode="mode" @toggle="$emit('toggle')" />
  </nav>


</div>

</template>
<style>
.header{
  background-color: rgb(33, 37, 41);
}

</style>
<script>
import { mapGetters } from "vuex";
import Toggle from '@/components/Toggle'
import axios from 'axios';
import firebase from "firebase";
export default {
    name: 'Get',
   data () {

    return {
        adminfields:{},
       
       }},
        props: ['mode'],
  components: {
    Toggle
  },
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
        created() {
    axios.get(`http://localhost:4000/admin`)
    
    .then(response => {
      this.adminfields = response.data.filter(x => x.email == this.user.data.email)
    })
    .catch(e => {
      this.errors.push(e)
    })
   
     },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({
            name: "home"
          });
        });
    },
    goTobookcategory() {
    this.$router.push({name:'books',params:{Cid:'all'}})
    this.$router.go() ;
      window.scrollTo(0, 0);

  },

  }
};
</script>
