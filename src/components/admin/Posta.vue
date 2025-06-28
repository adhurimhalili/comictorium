<template>

<div class="container">
   <div v-for="admins in adminfields" v-bind:key="admins._id">
          <div v-if="admins.email == user.data.email">
<div class="separator mt-5 mb-5">Listimi dhe krijimi i postave </div>
  <div class="row">
    
    <div class="col-md-7">
         <table class="table table-striped table-dark" >
            <thead>
                <tr class="text-center">
                <th scope="col">Emri</th>
                <th scope="col">Koha e dërgimit</th>
                <th scope="col">Cmimi</th>
                <th scope="col">Opsioni</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-center " v-for="posts in displayedPosts" v-bind:key="posts._id">
                                <td>{{ posts.emri }}</td>
                                <td>{{ posts.koha }}</td>
                                 <td>{{ posts.cmimi }}.00€</td>
                                <td><button type="button" class="btn btn-danger"  @click.stop="deletepost(posts._id)">Delete </button></td>
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
    <form @submit="onSubmit">
    <div class="col-md-8 mb-3 mx-auto">
       <label for="name">Emri</label>
       <input type="text" v-model="postspost.emri" id="emri" name="emri" class="form-control" :class="{ 'is-invalid': submitted && $v.postspost.emri.$error }" />
       <div v-if="submitted && !$v.postspost.emri.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
       <div v-if="submitted && !$v.postspost.emri.alphanumeric" class="invalid-feedback">Kjo fushë pranon vetëm shkronja</div>
       <div v-if="submitted && !$v.postspost.emri.minLength || !$v.postspost.emri.maxLength" class="invalid-feedback">Duhet të ketë 2 deri 30 shkronja</div>
    </div>
     
    <div class="col-md-8 mb-3 mx-auto">
       <label for="koha">Koha</label>
       <input type="text" v-model="postspost.koha" id="koha" name="koha" class="form-control" :class="{ 'is-invalid': submitted && $v.postspost.koha.$error }" />
       <div v-if="submitted && !$v.postspost.koha.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
       <div v-if="submitted && !$v.postspost.koha.alphanumeric" class="invalid-feedback">Kjo fushë pranon vetëm shkronja dhe numra</div>
       <div v-if="submitted && !$v.postspost.koha.minLength || !$v.postspost.koha.maxLength" class="invalid-feedback">Duhet të ketë 5 deri 30 shkronja</div>
    </div>
    
    <div class="col-md-4 mb-3 mx-auto">
               
       <label for="cmimi">Çmimi</label>
       <input type="text" v-model="postspost.cmimi" id="cmimi" name="cmimi" class="form-control" :class="{ 'is-invalid': submitted && $v.postspost.cmimi.$error }" />
       <div v-if="submitted && !$v.postspost.cmimi.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.postspost.cmimi.numeric" class="invalid-feedback">Kjo fushë pranon vetëm numra</div>
        </div>
        <div class="row">
            <button class="btn btn-success col-md-4 mb-3 mx-auto" type="submit">Shto postën <i class="fa fa-plus-circle pl-2"></i></button>
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
const alphanumeric = helpers.regex('alphanumeric', /^[a-zA-Z0-9  ëçÇË-]*$/)
export default {
  name: 'CreatePost',
  data () {
    return {
      postspost:{
        emri:"",
        cmimi:"",
        koha:"",

      },
      submitted:false,
       page: 1,
			          perPage: 5,
			          pages: [],
                postsfields:[],	
                 adminfields:{}
    }
  },created () {
    axios.get(`http://localhost:4000/posts`)
    .then(response => {
      this.postsfields = response.data.reverse()
    })
    .catch(e => {
      this.errors.push(e)
    }),
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
    }),
		displayedPosts () {
			return this.paginate(this.postsfields)
		}
  },
  	watch: {
		postsfields () {
			this.setPages();
		}
	},
  validations: {
            postspost: {
                emri: { required,alphanumeric, minLength: minLength(2), maxLength: maxLength(30)},
                cmimi: {required,numeric},    
                koha: {required, alphanumeric,minLength: minLength(5), maxLength: maxLength(30)}            
                }
        },
  methods: {
      setPages () {
			let numberOfPages = Math.ceil(this.postsfields.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (postsfields) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  postsfields.slice(from, to);
		},
    onSubmit (evt) {
      evt.preventDefault();
              
       this.submitted = true;

             this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      axios.post(`http://localhost:4000/posts`, this.postspost)
      .then(response => {
        console.log(response);
        this.$router.go({
          //params: { id: response.data._id }
       })
        })
      
    },deletepost (postsid){
            axios.delete('http://localhost:4000/posts/' + postsid)
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