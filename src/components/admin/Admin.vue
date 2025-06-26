<template>
<div class="container">
  
     <div v-for="admins in adminfields" v-bind:key="admins._id">
       <div class="separator mt-5">Admins</div>
          <div v-if="admins.email == 'admin@comicbooks.com'">
              <div class="row mt-5 mb-5">
                

                   <div class="col-md-5">
         <table class="table table-striped table-dark" >
            <thead>
                <tr class="text-center">
                <th scope="col">Emri</th>
                
                <th scope="col">Opsioni</th>
                </tr>
            </thead>
            <tbody>
                <tr  class="text-center" v-for="adminusers in admintableusers" v-bind:key="adminusers._id">
                                <td>{{adminusers.email}}</td>
                                
<td v-if="adminusers.email !== 'admin@comicbooks.com'"><button type="button" class="btn btn-danger"  @click.stop="deleteadmin(adminusers._id)">Delete </button></td>                                
                            </tr>
            </tbody>
        </table>
                  </div>
                  <div class="col-md-5">
                  <form @submit.prevent="onSubmit">
      <div class="col-md-8 mb-3 mx-auto">
       <label for="email">Email</label>
        <input type="text" v-model="admin.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.admin.email.$error }" />
       <div v-if="submitted && !$v.admin.email.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
       <div v-if="submitted && !$v.admin.email.email" class="invalid-feedback">Kjo fushë pranon vetëm email-format</div>
       
      </div>
    <div class="row">
            <button class="btn btn-success col-md-4 mb-3 mx-auto" type="submit">Shto adminin <i class="fa fa-plus-circle pl-2"></i></button>
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
import { required,email} from "vuelidate/lib/validators";
import axios from 'axios';
export default {
  
    name: 'Get',
   data () {

    return {
      admin: {
                   email: "",
                  
                },
                submitted: false,
        adminfields:{},
        admintableusers:{}
       }},
        created() {
    axios.get(`http://localhost:4000/admin`)
    
    .then(response => {
      this.adminfields = response.data.filter(x => x.email == this.user.data.email)
    })
    .catch(e => {
      this.errors.push(e)
    })
     
    axios.get(`http://localhost:4000/admin`)
    
    .then(response => {
      this.admintableusers = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
   
     },
     validations: {
            admin: {
                email: { required, email}
            }
        },
      computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  
      methods: {
             onSubmit () {
                this.submitted = true;

             this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      
        axios.post(`http://localhost:4000/admin`, this.admin)
      .then(response => {
        console.log(response);
        this.$router.go({
        
       })
        })
 
    },
    deleteadmin (adminid){
            axios.delete('http://localhost:4000/admin/' + adminid)
            .then((result) => {
              //refresh on same page
              this.$router.go({
               
              })
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
   
            
            },
            

}


</script>

