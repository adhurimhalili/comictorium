<template>
<div>
  <div class="container">

  <!-- Portfolio Item Heading -->
  
  <div class="separator mt-5">Detajet</div>

 
 <div v-for="(book,index) in bookfields" v-bind:key="index" >
            <div class="col-md-12 mb-5 " v-if="bokId == book._id">
       
          <br>

        <div class="row bookdetajet">
          <div class="features">
         <img :src="`http://localhost:5000/images/${book.image}`" class="img-fluid" style="height:480px;" >
         </div>
         <div class="col-md-5 ">
           
              <h2 class="pt-4 desc" style="display:inline-block">Titulli:</h2><h2 style="display:inline-block" class="ml-2">{{book.title}}</h2>
              <span class="btn btn-primary float-right mt-4">{{book.price}}.00€</span>
              <hr>
              
               <div class="row detailsbox">
                  <div class="detailsbox1">
                    <h4 class="desc">Autori:  </h4>           
              </div>
              <div class="detailsbox2">
               <p>{{book.author}}</p></div>
              </div>
              <div class="row detailsbox">
                  <div class="detailsbox1">
                    <h4 class="desc">Viti:  </h4>           
              </div>
              <div class="detailsbox2">
               <p>{{book.year}}</p></div>
              </div>

               <div class="row detailsbox">
                  <div class="detailsbox1">
                    <h4 class="desc">ISBN:  </h4>           
              </div>
              <div class="detailsbox2">
               <p>{{book.isbn}}</p></div>
              </div>

               <div class="row detailsbox">
                  <div class="detailsbox1">
                    <h4 class="desc">Kategoria:  </h4>           
              </div>
              <div class="detailsbox2">
              <div v-for="categories in categoryfields" v-bind:key="categories._id">
                
               <p v-if="book.category == categories._id">{{categories.name}}</p></div>
              </div>
              </div>

              <div class="row detailsbox">
                  <div class="detailsbox1">
                    <h4 class="desc">Përshkrimi:  </h4>           
              </div>
              <div class="detailsbox3">
               <p>{{book.description}}</p></div>
              </div>
              
              <hr>
              <template v-if="user.loggedIn">
                 <form @submit="onSubmit">
            <div class="row">
             

               <input type="text" class="form-control"  id="prodid" :value="book._id" hidden>             
              <input type="text" class="form-control"  id="userid" :value="user.data.id" hidden>
               <input type="text" class="form-control"  id="emri" :value="user.data.displayName" hidden>
          
            <div class="col-md-6">
                    
            <label for="phonenumber">Nr.Telefonit</label>
            <input type="text" v-model="buy.phonenumber" id="phonenumber" name="phonenumber" class="form-control" :class="{ 'is-invalid': submitted && $v.buy.phonenumber.$error }" />
            <div v-if="submitted && !$v.buy.phonenumber.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
              <div v-if="submitted && !$v.buy.phonenumber.alpha" class="invalid-feedback">Kjo fushë pranon vetëm shkronja dhe -</div>
              <div v-if="submitted && !$v.buy.phonenumber.minLength || !$v.buy.phonenumber.maxLength" class="invalid-feedback">Duhet të ketë 2 deri 20 shifra</div>
          
                    
                    </div>
                <div class="col-md-6">
                    
            <label for="adresa">Adresa</label>
            <input type="text" v-model="buy.adresa" id="adresa" name="adresa" class="form-control" :class="{ 'is-invalid': submitted && $v.buy.adresa.$error }" />
            <div v-if="submitted && !$v.buy.adresa.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
              <div v-if="submitted && !$v.buy.adresa.alphasymbol" class="invalid-feedback">Mos përdorni karaktere të veçanta</div>
              <div v-if="submitted && !$v.buy.adresa.minLength || !$v.buy.adresa.maxLength" class="invalid-feedback">Duhet të ketë 5 deri 30 shkronja</div>
          
                    
                    </div>
             <div class="col-md-6 mb-3 mt-3">
              <label for="posta">Posta</label>
          <select
                    id="posta"
                    name="posta"
                    class="form-control "
                  >
                    <option v-for="item in postsfields" v-bind:key="item._id" :value="item._id">{{item.emri}} - {{item.koha}}</option>
                  </select>
        </div>
        <div class="col-md-6 mt-3">
                    
            <label for="zip">ZIP</label>
            <input type="text" v-model="buy.zip" id="zip" name="zip" class="form-control" :class="{ 'is-invalid': submitted && $v.buy.zip.$error }" />
            <div v-if="submitted && !$v.buy.zip.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
              <div v-if="submitted && !$v.buy.zip.numeric" class="invalid-feedback">Kjo fushë pranon vetëm numra</div>
              <div v-if="submitted && !$v.buy.zip.minLength || !$v.buy.zip.maxLength" class="invalid-feedback">Duhet të ketë 2 deri 15 shifra</div>
          
                    
                    </div>
        </div>
               
            

            <button class="btn btn-success btn-lg btn-block mt-3" type="submit">Porosit <i class="cil-book"></i></button>
          </form>
              </template>
          
           
              
              
              
       
        
        
        </div>
        </div>
      </div>
      </div>
  
         


  <!-- Portfolio Item Row -->
  
  <!-- /.row -->

  <!-- Related Projects Row -->
  
   <div class="separator">Thënia e ditës</div>
              <div v-for="quote in quotes.slice(-1)" v-bind:key="quote._id" class="sections card shadow-lg mt-4 mb-5">
                   
                   
                    <img :src="`http://localhost:5000/images/${quote.image}`" class="img-fluid quoteauthor float-left p-3">
                   <div class="quote float-left">
                    <h3 id="quotes">{{quote.author}}</h3>
                   </div>
                   <div class="quotedesc">
                     <p>{{quote.description}}</p>
                   </div>

                   </div>




</div>
         
</div>
</template>
<style>
.dark .bookdetajet{
  color: white
}
</style>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import axios from 'axios';
import { required, minLength,maxLength,numeric, helpers} from "vuelidate/lib/validators"
const alpha = helpers.regex('alpha', /^[0-9-]*$/)
const alphasymbol = helpers.regex('alphasymbol', /^[a-zA-Z0-9  ëçÇË?.,-]*$/)
export default {
  
    name: 'Get',
   data () {

    return {
        bokId:this.$route.params.Bid,
        bookfields:{},
        categoryfields:{},
        postsfields:{},
        quotes:{},
       buy: {
                   phonenumber: "",
                   adresa:"",
                   zip:""
                },
                submitted: false,

        
     
       }},
        created() {
    axios.get(`http://localhost:4000/books`)
    
    .then(response => {
      this.bookfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://localhost:4000/category`)
    .then(response => {
      this.categoryfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
     axios.get(`http://localhost:4000/quotes`)
    .then(response => {
      this.quotes = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://localhost:4000/posts`)
    .then(response => {
      this.postsfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
     },
     validations: {
            buy: {
                phonenumber: { required,alpha, minLength: minLength(2), maxLength: maxLength(20)},
               adresa: { required,alphasymbol, minLength: minLength(5), maxLength: maxLength(30)},
                 zip: {required, numeric, minLength: minLength(2), maxLength: maxLength(15)},
            }
        },
      computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  
      methods: {
    goTodetail(bookId) {
    let bokId=bookId
    
    this.$router.push({name:'bookdetails',params:{Bid:bokId}}
    
    
    )
      this.$router.go({name:'bookdetails',params:{Bid:bokId}}) ;
      window.scrollTo(0, 0);
  },
     onSubmit(evt) {
      evt.preventDefault();

       
             this.submitted = true;

             this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      
        
          var bodyFormData = new FormData();
    
          bodyFormData.set("prodid", document.getElementById("prodid").value);
          bodyFormData.set("userid", document.getElementById("userid").value);
          bodyFormData.set("adresa", document.getElementById("adresa").value);
          bodyFormData.set("posta", document.getElementById("posta").value);
          bodyFormData.set("zip", document.getElementById("zip").value);
          bodyFormData.set("emri", document.getElementById("emri").value);
          bodyFormData.set("phonenumber", document.getElementById("phonenumber").value);
          axios.post(`http://localhost:4000/orders`, bodyFormData)
      .then(response => {
        //console.log(response);
        this.$router.push({
          name: 'myorders',
          //params: { id: response.data._id }
        })
        })
        
    }
   
            
            },
            

}


</script>

