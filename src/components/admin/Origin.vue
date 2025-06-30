<template>

    <div class="container features">
        <div v-for="admins in adminfields" v-bind:key="admins._id">
              <div v-if="admins.email == user.data.email">
     <div class="separator mb-5 mt-4">Listimi dhe krijimi i origjinave</div>
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
                    <tr  class="text-center" v-for="origins in displayedOrigin" v-bind:key="origins._id">
                                    <td>{{ origins.name }}</td>
                                    <td>{{ origins.description }}</td>
                                    <td><button type="button" class="btn btn-danger"  @click.stop="deleteorigin(origins._id)">Delete </button></td>
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
           <input type="text" v-model="origin.name" id="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && $v.origin.name.$error }" />
           <div v-if="submitted && !$v.origin.name.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
           <div v-if="submitted && !$v.origin.name.alpha" class="invalid-feedback">Kjo fushë pranon vetëm shkronja</div>
           <div v-if="submitted && !$v.origin.name.minLength || !$v.origin.name.maxLength" class="invalid-feedback">Duhet të ketë 5 deri 15 shkronja</div>
        </div>
         <div class="col-md-8 mb-3 mx-auto">
           <label for="name">Përshkrimi</label>
           <input type="text" v-model="origin.description" id="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && $v.origin.description.$error }" />
           <div v-if="submitted && !$v.origin.description.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
            <div v-if="submitted && !$v.origin.description.alphanumericsymbol" class="invalid-feedback">Mos përdor karaktere të veçanta</div>
            <div v-if="submitted && !$v.origin.description.minLength || !$v.origin.description.maxLength" class="invalid-feedback">Duhet të ketë 5 deri 20 shkronja</div>
         
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
      name: 'CreateOrigin',
      data () {
        return { 
            origin: {
                       name: "",
                       description:""
                    },
                    submitted: false,
                    page: 1,
                          perPage: 5,
                          pages: [],
                          originfields:[],	
                    adminfields:{}
        }
    },
     computed: {
        ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
          user: "user"
        }),
            displayedOrigin () {
                return this.paginate(this.originfields)
            }
      },
          watch: {
            originfields () {
                this.setPages();
            }
        },
       validations: {
        origin: {
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
        axios.get(`http://localhost:4000/origin`)
        .then(response => {
          this.originfields = response.data.reverse()
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
    
      methods: {
            setPages () {
                let numberOfPages = Math.ceil(this.originfields.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
            },
            paginate (originfields) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                return  originfields.slice(from, to);
            },
        onSubmit () {
           this.submitted = true;
    
                 this.$v.$touch();
                    if (this.$v.$invalid) {
                        return;
                    }
            axios.post(`http://localhost:4000/origin/`, this.origin)
          .then(response => {
            console.log(response);
            this.$router.go({
            
           })
            })
          
        }
        ,deleteorigin (originid){
                axios.delete('http://localhost:4000/origin/' + originid)
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