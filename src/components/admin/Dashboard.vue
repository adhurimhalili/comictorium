<template>
  <div class="container">
   
       <div>
          <div>
      <div class="py-5 text-center">
        <h2 id="addbook">Shto Librin</h2>
         </div>

      <div class="row ">
       
        <div class="col-md-8 forma ">
         
           
            <form @submit="onSubmit">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                    
            <label for="author">Autori</label>
            <input type="text" v-model="books.author" id="author" name="author" class="form-control" :class="{ 'is-invalid': submitted && $v.books.author.$error }" />
            <div v-if="submitted && !$v.books.author.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
              <div v-if="submitted && !$v.books.author.alpha" class="invalid-feedback">Kjo fushë pranon vetëm shkronja dhe hapësirë</div>
              <div v-if="submitted && !$v.books.author.minLength || !$v.books.author.maxLength" class="invalid-feedback">Duhet të ketë 2 deri 30 shkronja</div>
          
                    
                    </div>
                    
                      <div class="col-md-6 mb-3">
                    
            <label for="title">Titulli</label>
            <input type="text" v-model="books.title" id="title" name="title" class="form-control" :class="{ 'is-invalid': submitted && $v.books.title.$error }" />
            <div v-if="submitted && !$v.books.title.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
              <div v-if="submitted && !$v.books.title.alphanumeric" class="invalid-feedback">Kjo fushë pranon vetëm shkronja dhe numra. Mos filloni me hapësirë!</div>
              <div v-if="submitted && !$v.books.title.minLength || !$v.books.author.maxLength" class="invalid-feedback">Duhet të ketë 2 deri 30 karaktere</div>
          
                    
                    </div>
                  </div>
             <div class="row">
           
                <div class="col-md-6 mb-3">
               
       <label for="year">Viti</label>
       <input type="text" v-model="books.year" id="year" name="year" class="form-control" :class="{ 'is-invalid': submitted && $v.books.year.$error }" />
       <div v-if="submitted && !$v.books.year.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.books.year.numeric" class="invalid-feedback">Kjo fushë pranon vetëm numra</div>
        <div v-if="submitted && !$v.books.year.maxLength" class="invalid-feedback">Duhet të ketë deri në 4 shifra</div>
     
               
              </div>

            <div class="col-md-6 mb-3">
               
       <label for="price">Çmimi</label>
       <input type="text" v-model="books.price" id="price" name="price" class="form-control" :class="{ 'is-invalid': submitted && $v.books.price.$error }" />
       <div v-if="submitted && !$v.books.price.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.books.price.numeric" class="invalid-feedback">Kjo fushë pranon vetëm numra</div>
        </div>
            </div>
             <div class="mb-3">
              <label for="description">Përshkrimi</label>
       <textarea v-model="books.description" id="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && $v.books.description.$error }" maxlength="500" rows="4"/>
       <div v-if="submitted && !$v.books.description.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.books.description.alphanumericsymbol" class="invalid-feedback">Kjo fushë pranon vetëm shkronja dhe hapësirë</div>
        <div v-if="submitted && !$v.books.description.minLength || !$v.books.description.maxLength" class="invalid-feedback">Duhet të ketë 15 deri 500 shkronja</div>
     
             
            </div>
           

            <div class="row">
              <div class="col-md-5 mb-3">
                <label for="image">Foto</label>
                <input type="file" id="image" name="image"  class="form-control-file"  @change="onFileChange"  >
                   <p id = "GFG_DOWN" style = "width: 100%;margin-top: .25rem;font-size: 80%;color: #dc3545;"> </p>
              </div>
              <div class="col-md-4 mb-3">
                <label for="category">Kategoria</label>
                <select
                    id="category"
                    name="category"
                    class="form-control"
                  >
                    <option v-for="item in categoryfields" :key="item._id" :value="item._id">{{item.name}}</option>
                  </select>
              
              </div>
                <div class="col-md-3 mb-3">
               
       <label for="isbn">ISBN</label>
       <input type="text" v-model="books.isbn" id="isbn" name="isbn" class="form-control" :class="{ 'is-invalid': submitted && $v.books.isbn.$error }" />
       <div v-if="submitted && !$v.books.isbn.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.books.isbn.numeric" class="invalid-feedback">Kjo fushë pranon vetëm numra</div>
        <div v-if="submitted && !$v.books.isbn.minLength || !$v.books.isbn.maxLength" class="invalid-feedback">Duhet të ketë 10 deri 13 shifra</div>
     
        </div>
        
            </div>
           
            
              
            
            
            <hr class="mb-4">
            
             <button class="btn btn-primary btn-lg btn-block" type="submit">Shto Librin <i class="fa fa-plus-circle pl-2"></i></button>
         
          </form>
        </div>
      </div>
      <br><br>
          </div>
       </div>
    
  </div>
</template>
<style>
.dark #addbook{
  color: white
}
</style>
<script>
/* eslint-disable */
import axios from "axios";
import { mapGetters } from "vuex";
import { required, minLength,maxLength,numeric, helpers} from "vuelidate/lib/validators"
const alpha = helpers.regex('alpha', /^[a-zA-Z ]*$/)
const alphanumeric = helpers.regex('alphanumeric', /^[a-zA-Z0-9 ]*$/)
const alphanumericsymbol = helpers.regex('alphanumericsymbol', /[a-zA-Z0-9~@#\^\$&\*\(\)-_\+=\,\.\?\s]*/)
export default {
  name: "CreateProducts",
  data() {
    return {
      books:{
        author: "",
        title: "",
        year: "",
        price: "",
        isbn:"",
        image: ""
      },
      submitted:false,
      categoryfields:{},
        adminfields:{},
    
    };
  },created () {
     axios.get(`http://localhost:4000/admin`)
    
    .then(response => {
      this.adminfields = response.data.filter(x => x.email == this.user.data.email)
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
    })
  },
   validations: {
            books: {
                author: { required,alpha, minLength: minLength(2), maxLength: maxLength(30)},
                title: { required,alphanumeric, minLength: minLength(2), maxLength: maxLength(200)},
                year: {required,numeric, maxLength: maxLength(4)},
                price: {required,numeric},
                description: {required, minLength: minLength(15), maxLength: maxLength(500), alphanumericsymbol},
                isbn: {required,numeric, minLength: minLength(10),maxLength: maxLength(13)},
                
                }
        },
          computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      
    },
    onSubmit(evt) {
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
          bodyFormData.set("title", document.getElementById("title").value);
          bodyFormData.set("year", document.getElementById("year").value);
          bodyFormData.set("price", document.getElementById("price").value);
          bodyFormData.set("isbn", document.getElementById("isbn").value);
          bodyFormData.set("category", document.getElementById("category").value);
          bodyFormData.set("description", document.getElementById("description").value);
           bodyFormData.append("image", image.files[0]);

          axios.post(`http://localhost:4000/books`, bodyFormData)
      .then(response => {
        //console.log(response);
         this.$router.push({name:'adminpanel'});
         
        })
        
    }
  }
};

</script>