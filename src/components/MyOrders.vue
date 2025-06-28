<template>
  <div class="container app">

          <h1 class="text-center mt-4 mb-4 blerjet"> Blerjet </h1>
               <div v-for="orders in displayedOrders" v-bind:key="orders._id">
                 
                 
                   <div class="sections card">
                   
                   <div  v-for="(book,index) in bookfields" v-bind:key="index" >
                   <div v-if="orders.prodid == book._id ">
                   <img :src="`http://localhost:5000/images/${book.image}`" class="img-fluid quoteauthor float-left p-3">
                   <div class="order">
                     <h3 class="font-weight-bold phone">{{book.title}}</h3>
                   <h4 class="text-muted phone">Autori: {{book.author}}</h4>
                   <h5 class="text-muted phone">ISBN: {{book.isbn}}</h5>
                    <h5 class="phone">Çmimi: <span class="text-danger">{{book.price}}.00€</span></h5>
                   </div>
                   <div class="order3 text-muted"><h5>Statusi</h5>
                   <div v-if="orders.status == 0">
                    <h5 class="text-warning">Në pritje!</h5>
                  <button type="button" class="btn btn-danger"  @click.stop="deleteorder(orders._id)">Anuloje</button>
                   </div>
                    <h5 class="text-success" v-if="orders.status == 1">Aprovuar!</h5>
                 
                   
                    <h5 class="text-danger" v-if="orders.status == 2" >Refuzuar!</h5>
                  
                   </div>
                   <div class="order2">
                   <h5> {{orders.dataerezervimit | moment("Do MMMM  YYYY, h:mm:ss a")}}</h5>
                     <div v-for="posts in postsfields" v-bind:key="posts._id">
                
               <h5 class="text-center" v-if="orders.posta == posts._id">Posta: {{posts.emri}}</h5></div>
                   <h5 class="text-center text-muted">Order ID:</h5>
                    <h5 class="text-danger"> {{orders._id}}</h5>
                   </div>

                  
                           
                   </div></div></div>


        </div>

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
</template>
<style >

.dark .blerjet{
  color: white;
}
</style>
<script>
import { mapGetters } from "vuex";
import axios from 'axios';
    export default {
      name: 'ShowReservations',
        data(){
            return{
              bookfields:{},
              postsfields:{},
              orders : [''],
              page: 1,
              perPage: 3,
              pages: [], 
              
              }
        },
        created () {
           axios.get(`http://localhost:4000/books`)
    
    .then(response => {
      this.bookfields = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
        axios.get(`http://localhost:4000/orders`)
        .then(response => {
          this.orders = response.data.reverse()
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
       computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    }),
    displayedOrders () {
			return this.paginate(this.orders.filter(x =>  x.userid == this.user.data.id));
		}
  },
  //<div v-if="orders.userid == user.data.id">
  methods:{
    deleteorder (orderid){
            axios.delete('http://localhost:4000/orders/' + orderid)
              
              //refresh on same page
              this.$router.go({
               
              });
              window.scrollTo(0, 0)
              
        
            .catch(e => {
              this.errors.push(e)
            })
        },
   
    setPages () {
			let numberOfPages = Math.ceil(this.orders.filter(x =>  x.userid == this.user.data.id).length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (orders) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  orders.slice(from, to);
    },
    
    
  },
  watch: {
		orders () {
			this.setPages();
		}
	},
  
      
      
  }

</script>