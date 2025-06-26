<template>
    <div class="container">
      <div v-for="admins in adminfields" v-bind:key="admins._id">
          <div v-if="admins.email == user.data.email">
        <div class="separator mt-5 mb-5">Admin Panel</div>
        <div v-for="(option,index) in options" v-bind:key="index" class="section mb-5 card">
           <img :src="option.image" class="mt-4 mb-4 optionimage">
          <div class="card-footer">
               <router-link :to="option.path" style="text-decoration:none"><h4 class="text-center pt-2">{{option.name}}</h4>  </router-link>
             </div>
         </div>  
          </div></div>    

           <div v-for="admins in adminfields" :key="admins._id">
          <div v-if="admins.email == 'admin@comicbooks.com'">
        <div  class="section mb-5 card">
           <img src="https://media.discordapp.net/attachments/956671700936839259/1084497249465290802/Admin.webp?width=320&height=320" class="mt-4 mb-4 optionimage">
          <div class="card-footer">
               <router-link to="/admin" style="text-decoration:none"><h4 class="text-center pt-2">Admins</h4>  </router-link>
             </div>
         </div>  
          </div></div>      
</div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios';
export default {
  name: 'Adminpanel',
  data () {
    return {
      options: [
        {name: "Porositë", image:"https://media.discordapp.net/attachments/956671700936839259/1084497248701927504/Rezervimet.png?width=640&height=640", path:"rezervimet"},
        {name: "Mesazhet",image:"https://media.discordapp.net/attachments/956671700936839259/1084497248949383231/Mesazhet.png?width=670&height=670",path:"messages"},
        {name: "Shto Libër",image:"https://media.discordapp.net/attachments/956671700936839259/1084497248106315886/Shto_Liber.png?width=640&height=640", path:"dashboard"},
        {name: "Kategoritë",image:"https://media.discordapp.net/attachments/956671700936839259/1084497249201029233/Kategorite.png?width=670&height=670", path:"category"},
        {name: "Posta",image:"https://media.discordapp.net/attachments/956671700936839259/1084497250237042759/Posta.png?width=670&height=670", path:"posta"},
        {name: "Thëniet",image:"https://media.discordapp.net/attachments/956671700936839259/1084497249972781166/Quotes.png?width=670&height=670", path:"quotes"},
      ],
        adminfields:{},
     
    }
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
   
      computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
}
</script>