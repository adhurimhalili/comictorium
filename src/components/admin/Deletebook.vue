<template>
  <div class="container">
     <div v-for="admins in adminfields" v-bind:key="admins._id">
          <div v-if="admins.email == user.data.email">
          <div class="separator mt-5">A dëshironi ta fshini këtë produkt ?</div>
          <div class="row ">
       
        <div class="col-md-8 forma ">
         
           
            <form @submit="onSubmit">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="Autori">Autori</label>
               <input type="text" class="form-control" v-model="bookfields.author" readonly>
               
              </div>
              
              <div class="col-md-6 mb-3">
                <label for="titulli">Titulli</label>
                <input type="text" class="form-control" v-model="bookfields.title" readonly>
               
              </div>
            </div>
             <div class="row">
            <div class="col-md-6 mb-3">
              <label for="viti">Viti</label>
              <div class="input-group">
               <input type="text" class="form-control" v-model="bookfields.year" readonly>
               
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="cmimi">Cmimi</label>
              <input type="text" class="form-control" v-model="bookfields.price" readonly>
             
            </div>
            </div>
             <div class="mb-3">
              <label for="përshkrimi">Përshkrimi</label>
             <textarea class="form-control" rows="4" v-model="bookfields.description" readonly></textarea>
             
            </div>
           

            <div class="row">
              <div class="col-md-4 mb-3">
                <label for="category">Kategoria</label>
                <div v-for="categories in categoryfields" v-bind:key="categories._id">  
                <p class="form-control" v-if="bookfields.category == categories._id" readonly>{{categories.name}}</p></div>
                <input type="text" class="form-control" v-model="bookfields.category" hidden>
              
              </div>
              <div class="col-md-3 mb-3">
                <label for="isbn">ISBN</label>
                <input type="text" class="form-control" v-model="bookfields.isbn" readonly>
              
              </div>
            </div>
           
            
              
            
           
            <hr class="mb-4">
            <button class="btn btn-danger btn-lg btn-block mb-4" type="submit">Fshije <i class="cil-trash"></i></button>
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
      bookid:this.$route.params.Bid,
      bookfields:{},
      categoryfields:{},
       adminfields:{}
    }
  },
  created () {
    axios.get(`http://localhost:4000/books/` + this.$route.params.Bid)
    .then(response => {
      this.bookfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    axios.get(`http://localhost:4000/category`)
    .then(response => {
      this.categoryfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
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
  methods: {
    onSubmit () {

      axios.put(`http://localhost:4000/books/` + this.$route.params.Bid, this.bookfields,this.bookfields.isDeleted = true)
      .then(response => {
         this.$router.push({name:'adminpanel'});
          this.$router.go()
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>