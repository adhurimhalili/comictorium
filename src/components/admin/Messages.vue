<template>
<div class="table-responsive container">
   <div v-for="admins in adminfields" v-bind:key="admins._id">
          <div v-if="admins.email == user.data.email">
   <div class="separator mt-4 mb-4">Mesazhet</div>
  <table class="table table-striped table-dark" >

    <!--Table head-->
    <thead>
      <tr>
        <th>Emri</th>
        <th>Email</th>
        <th>Përshkrimi</th>
        <th>Opsioni</th>
      </tr>
    </thead>
 
    <tbody>
     <tr v-for="message in displayedMessages" v-bind:key="message._id">
      <td>{{ message.name }}</td>
       <td >{{ message.email }}</td>
       <td id="fit">{{ message.description }}</td>
        <td> <button type="button" class="btn btn-danger"   @click.stop="deletecontact(message._id)">Delete </button></td>
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
   </div>
  <!--Table-->
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapGetters } from "vuex";
    export default {
      name: 'ShowMessages',
        data(){
            return{
                messages : [''],
			          page: 1,
			          perPage: 5,
                pages: [],
                adminfields:{}
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
        axios.get(`http://localhost:4000/messages/`)
        .then(response => {
          this.messages = response.data.reverse()
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
		displayedMessages () {
			return this.paginate(this.messages)
		}
  },
  	watch: {
		messages () {
			this.setPages();
		}
	},
        methods: {
          setPages () {
			let numberOfPages = Math.ceil(this.messages.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (messages) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  messages.slice(from, to);
		},
          deletecontact (messageid){
            axios.delete('http://localhost:4000/messages/' + messageid)
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