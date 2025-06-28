<template>
<div class="container"> 
   <div v-for="admins in adminfields" :key="admins._id">
          <div v-if="admins.email == user.data.email">
  <div class="separator mt-5 mb-5">Thëniet</div>
  <div class="row">
     <div class="col-md-7">
  <table class="table table-striped table-dark" >

    <!--Table head-->
    <thead>
      <tr class="text-center">
        <th>Foto</th>
        <th>Emri</th>
        <th>Përshkrimi</th>
        <th>Opsioni</th>
      </tr>
    </thead>
 
    <tbody>
     <tr v-for="quote in displayedQuotes" v-bind:key="quote._id">
       <td width="150" class="align-middle" ><img :src="`http://localhost:5000/images/${quote.image}`" class="img-fluid" ></td>
      <td class="text-center align-middle" width="150">{{ quote.author }}</td>
       
       <td class="text-center align-middle" width="300">{{ quote.description }}</td>
        <td class="text-center align-middle"> <button type="button" class="btn btn-danger" @click.stop="deletequote(quote._id)">Delete </button></td>
       </tr>
    </tbody>
  </table>
    <div class="clearfix"></div>
    <div class="d-flex justify-content-center">
  <nav aria-label="Page navigation example">
            <ul class="pagination float-right">
                <li class="page-item d-flex">
                    <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
                </li>
                <li class="page-item d-flex">
                    <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" v-bind:key="pageNumber" @click="page = pageNumber">{{pageNumber}}</button>
                </li>
                <li class="page-item d-flex">
                    <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
                </li>
            </ul>
        </nav> 
    </div>
          </div>
           <div class="col-md-5">
     <form @submit="addQuote">
              
              <div class="col-md-8 mb-3 mx-auto">
               
       <label for="author">Autori</label>
       <input type="text" v-model="quotes.author" id="author" name="author" class="form-control" :class="{ 'is-invalid': submitted && $v.quotes.author.$error }" />
       <div v-if="submitted && !$v.quotes.author.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.quotes.author.alpha" class="invalid-feedback">Kjo fushë pranon vetëm shkronja dhe hapësirë</div>
        <div v-if="submitted && !$v.quotes.author.minLength || !$v.quotes.author.maxLength" class="invalid-feedback">Duhet të ketë 2 deri 30 shkronja</div>
     
               
            
            
            </div>
                 <div class="col-md-8 mb-3 mx-auto">
              <label for="description">Përshkrimi</label>
       <textarea v-model="quotes.description" id="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && $v.quotes.description.$error }" maxlength="500" rows="4"/>
       <div v-if="submitted && !$v.quotes.description.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.quotes.description.alphanumericsymbol" class="invalid-feedback">Kjo fushë pranon vetëm shkronja dhe hapësirë</div>
        <div v-if="submitted && !$v.quotes.description.minLength || !$v.quotes.description.maxLength" class="invalid-feedback">Duhet të ketë 15 deri 500 shkronja</div>
     
             
            </div>
           

            <div class="row">
               <div class=" col-md-7 mb-3 mx-auto">
                <label for="image">Foto</label>
                <input type="file" id="image" name="image"  class="form-control-file"  @change="onFileChange"  >
                   <p id = "GFG_DOWN" style = "width: 100%;margin-top: .25rem;font-size: 80%;color: #dc3545;"> </p>
              </div>
         
             
            </div>
 
          
            <div class="row mb-4">
            <button class="btn btn-primary col-md-4 mb-3 mx-auto" type="submit">Shto thënie <i class="fa fa-plus-circle pl-2"></i></button>
            </div>
          </form>
           </div>
         
         
 
  </div>
 </div>
   </div>
</div>
 
</template>
 <script>
/* eslint-disable */
import { mapGetters } from "vuex";
import axios from 'axios'
import { required, minLength,maxLength,numeric, helpers} from "vuelidate/lib/validators"
const alpha = helpers.regex('alpha', /^[a-zA-Z ]*$/)
const alphanumeric = helpers.regex('alphanumeric', /^[a-zA-Z0-9 ]*$/)
const alphanumericsymbol = helpers.regex('alphanumericsymbol', /[a-zA-Z0-9~@#\^\$&\*\(\)-_\+=\,\.\?\s]*/)
export default {
  name: 'CreateQuotes',
  data () {
    return {
      quotes: {
        author: "",
        description: "",
        image: "",
      },
     submitted:false,
			          page: 1,
			          perPage: 2,
			          pages: [],
                theniet:[],
                 adminfields:{}
    }
  },
   
  	watch: {
		theniet () {
			this.setPages();
		}
	},
   validations: {
            quotes: {
                author: { required,alpha, minLength: minLength(2), maxLength: maxLength(30)},
                description: {required, minLength: minLength(15), maxLength: maxLength(500), alphanumericsymbol},                
                }
        },
        created () {
          axios.get(`http://localhost:4000/admin`)
    
    .then(response => {
      this.adminfields = response.data.filter(x => x.email == this.user.data.email)
    })
    .catch(e => {
      this.errors.push(e)
    }),
          
     axios.get(`http://localhost:4000/quotes`)
    .then(response => {
      this.theniet = response.data.reverse()
    })
    .catch(e => {
      this.errors.push(e)
    })
    
  },
   computed: {
     ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    }),
		displayedQuotes () {
			return this.paginate(this.theniet)
		}
  },
  methods: {
    setPages () {
			let numberOfPages = Math.ceil(this.theniet.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (theniet) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  theniet.slice(from, to);
		},
    onFileChange(e) {
      const file = e.target.files[0];
      
    },
    addQuote(evt) {

           evt.preventDefault();
              
        var down = document.getElementById('GFG_DOWN'); 
          this.submitted = true;

             this.$v.$touch();
              if ($('#image')[0].files.length === 0) { 
                down.innerHTML = "Zgjedh një foto"; 
                
               return;
            } 
                if (this.$v.$invalid) {
                    return;
                }
      
      
        
          var bodyFormData = new FormData();
          let image = document.getElementById("image");
          bodyFormData.set("author", document.getElementById("author").value);
          bodyFormData.set("description", document.getElementById("description").value);
           bodyFormData.append("image", image.files[0]);

          axios.post(`http://localhost:4000/quotes`, bodyFormData)
      .then(response => {
        //console.log(response);
        this.$router.push({
          name: 'home',
          //params: { id: response.data._id }
        })
        })
        
    },
       deletequote(quoteid){
            axios.delete('http://localhost:4000/quotes/' + quoteid)
            .then((result) => {
              //refresh on same page
              this.$router.go({
               
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
  }
}
</script>