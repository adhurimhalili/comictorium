<template>
  <div class="container">
      <div v-for="admins in adminfields" v-bind:key="admins._id">
          <div v-if="admins.email == user.data.email">
          <div class="separator mt-5">Konfirmimi i produktit</div>
          <div class="row ">
       
        <div class="col-md-8 forma ">
         
            
            <form @submit="onSubmit">
                
            <div class="row">
                <div class="col-md-6 mb-3">
                <label for="personi">Personi</label>
               <p class="form-control" >{{orderfields.emri}}</p>
               
              </div>
              <div class="col-md-6 mb-3">
                <label for="data">Data e rezervimit</label>
               <p  class="form-control"  >{{orderfields.dataerezervimit | moment("Do MMMM  YYYY, h:mm:ss a")}}</p>
               
              </div>
              <div class="col-md-6 mb-3">
                <label for="Adresa">Adresa</label>
               <p class="form-control" >{{orderfields.adresa}}</p>
               
              </div>
              
              <div class="col-md-6 mb-3">
                <label for="zip">ZIP</label>
                <p class="form-control" >{{orderfields.zip}}</p>
               
              </div>
            </div>
             <div class="row">
            <div class="col-md-6 mb-3">
              <label for="phonenumber">Nr.Telefonit</label>
              <div class="input-group">
               <p  class="form-control" >{{orderfields.phonenumber}}</p>
               
              </div>
            </div>
                
           <div class="col-md-6 mb-3">
                <label for="posta">Posta</label>
                <div v-for="post in postfields" v-bind:key="post._id">  
                <p class="form-control" v-if="orderfields.posta == post._id" >{{post.emri}}</p></div>
              </div>
              
               <div class="col-md-6 mb-3">
               
                <div v-for="book in bookfields" v-bind:key="book._id">  
                <div  v-if="orderfields.prodid == book._id" >
                
                    <label>Autori</label>
                    <p class="form-control">{{book.author}}</p>
                  
                     
                     <label >Titulli</label>
                    <p class="form-control">{{book.title}}</p>
                    
                </div>

              </div>
               </div>
                <div class="col-md-6 mb-3">
               
                <div v-for="book in bookfields" v-bind:key="book._id">  
                <div  v-if="orderfields.prodid == book._id" >
                
                    <label>ISBN</label>
                    <p class="form-control">{{book.isbn}}</p>
                  
                     
                     <label >Cmimi</label>
                    <p class="form-control">{{book.price}}.00€</p>
                    
                </div>

              </div>
             
               </div>
                <div class="col-md-6 mb-3 mx-auto">
                <select class="form-control" v-model="orderfields.status">
                    <option value="1">Aprovo</option>
                     <option value="2">Refuzo</option>
              </select>
                </div>
            </div>
           
            
              
            
             
            <hr class="mb-4">
            <button class="btn btn-primary btn-lg btn-block mb-4" type="submit">Përfundo</button>
          </form>
        </div>
      </div>
          </div>
      </div>
  </div>
</template>


<script>
/* eslint-disable */
import axios from 'axios'
import { mapGetters } from "vuex";
export default {
  name: 'ProductEdit',
  data () {
    return {
      orderid:this.$route.params.Oid,
      orderfields:{},
      postfields:{},
       bookfields:{},
       adminfields:{}
    }
  },
        computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  created () {
      axios.get(`http://localhost:4000/admin`)
    
    .then(response => {
      this.adminfields = response.data.filter(x => x.email == this.user.data.email)
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get(`http://localhost:4000/orders/` + this.$route.params.Oid)
    .then(response => {
      this.orderfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get(`http://localhost:4000/posts`)
    .then(response => {
      this.postfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
      axios.get(`http://localhost:4000/books`)
    .then(response => {
      this.bookfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    
  },
  methods: {
    onSubmit () {

      axios.put(`http://localhost:4000/orders/` + this.$route.params.Oid, this.orderfields)
      .then(response => {
        this.$router.push({
          name: 'rezervimet',
        })
        this.$router.go()
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>