<template>

    <div class="container features">
        <div v-for="admins in adminfields" v-bind:key="admins._id">
              <div v-if="admins.email == user.data.email">
     <div class="separator mb-5 mt-4">Listimi dhe krijimi i brands</div>
      <div class="row">
        <div class="col-md-7">
             <table class="table table-striped table-dark" >
                <thead>
                    <tr class="text-center">
                    <th scope="col">Emri</th>
                    <th scope="col">Përshkrimi</th>
                    <th scope="col">Opsioni</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  class="text-center" v-for="brands in displayedBrand" v-bind:key="brands._id">
                                    <td>{{ brands.name }}</td>
                                    <td>{{ brands.description }}</td>
                                    <td><button type="button" class="btn btn-danger"  @click.stop="deletebrand(brands._id)">Delete </button>
                                      <button type="button" class="btn btn-warning ml-2 text-white" @click.stop="editbrand(brands._id)">Edit <i class="far fa-edit"></i></button> </td>
                                    <!-- <td><button type="button" class="btn btn-danger"  @click.stop="editbrand(brands._id)">Edit </button></td> -->
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
        <form @submit.prevent="onSubmit">
          <div class="col-md-8 mb-3 mx-auto">
           <label for="name">Emri</label>
           <input type="text" v-model="brand.name" id="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && $v.origin.name.$error }" />
           <div v-if="submitted && !$v.brand.name.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
           <div v-if="submitted && !$v.brand.name.alpha" class="invalid-feedback">Kjo fushë pranon vetëm shkronja</div>
           <div v-if="submitted && !$v.brand.name.minLength || !$v.brand.name.maxLength" class="invalid-feedback">Duhet të ketë 5 deri 15 shkronja</div>
        </div>
         <div class="col-md-8 mb-3 mx-auto">
           <label for="name">Përshkrimi</label>
           <input type="text" v-model="brand.description" id="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && $v.origin.description.$error }" />
           <div v-if="submitted && !$v.brand.description.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
            <div v-if="submitted && !$v.brand.description.alphanumericsymbol" class="invalid-feedback">Mos përdor karaktere të veçanta</div>
            <div v-if="submitted && !$v.brand.description.minLength || !$v.brand.description.maxLength" class="invalid-feedback">Duhet të ketë 5 deri 20 shkronja</div>
         
        </div>
        <div class="row">
                <button class="btn btn-success col-md-4 mb-3 mx-auto" type="submit">Shto kategorinë <i class="fa fa-plus-circle pl-2"></i></button>
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
    import axios from 'axios'
    import { mapGetters } from "vuex";
    import { required, minLength,maxLength,helpers} from "vuelidate/lib/validators";
    const alpha = helpers.regex('alpha', /^[a-zA-Z ]*$/)
    const alphanumericsymbol = helpers.regex('alphanumericsymbol',  /^[a-zA-Z0-9  ëçÇË?.,-]*$/)
    export default {
      name: 'CreateBrand',
      data () {
        return { 
            brand: {
                       name: "",
                       description:""
                    },
                    submitted: false,
                    page: 1,
                          perPage: 5,
                          pages: [],
                          brandfields:[],	
                    adminfields:{}
        }
    },
     computed: {
        ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
          user: "user"
        }),
            displayedBrand () {
                return this.paginate(this.brandfields)
            }
      },
          watch: {
            brandfields () {
                this.setPages();
            }
        },
       validations: {
        brand: {
                    name: { required, minLength: minLength(5), maxLength: maxLength(15), alpha},
                    description: {required, minLength: minLength(5), maxLength: maxLength(50), alphanumericsymbol}
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
        axios.get(`http://localhost:4000/brand`)
        .then(response => {
          this.brandfields = response.data.reverse()
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
    
      methods: {
            setPages () {
                let numberOfPages = Math.ceil(this.brandfields.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (brandfields) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  brandfields.slice(from, to);
            },
        onSubmit () {
           this.submitted = true;
    
                 this.$v.$touch();
                    if (this.$v.$invalid) {
                        return;
                    }
            axios.post(`http://localhost:4000/brand/`, this.brand)
          .then(response => {
            console.log(response);
            this.$router.go({
            
           })
            })
          
        }
        ,deletebrand (brandid){
                axios.delete('http://localhost:4000/brand/' + brandid)
                .then((result) => {
                  //refresh on same page
                  this.$router.go({
                   
                  })
                })
                .catch(e => {
                  this.errors.push(e)
                })
            },
            
            editbrand(brandid){
            let BrId=brandid
            this.$router.push({name:'editbrand',params:{Bid:BrId}})
            this.$router.params.Bid
}
}
      }
    </script>