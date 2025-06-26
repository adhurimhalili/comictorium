<template>
  <div>
  <div class="container">

  <div class="row">

    
    <!-- /.col-lg-3 -->

    
          <div class="col-lg-2">

      <h2 class="my-4 ml-5 bookscat" style="font-size: 100px;">Librat</h2>
      <div v-for="categories in categoryfields" v-bind:key="categories._id">
      <div v-if="catId == categories._id">
    <h2 class="my-4 ml-5 bookscat">{{categories.name}}</h2>
        </div>
        </div>
       
   <div class="btn-group ml-5" >
<button type="button" class="btn btn-danger">Kategoritë</button>
<button type="button" class="btn btn-danger dropdown-toggle px-3" data-toggle="dropdown" aria-haspopup="true"
  aria-expanded="false">
  
</button>

<div class="dropdown-menu" >
  <button class="dropdown-item" @click=" goTobookcategory('all')">Të gjitha</button>
  <div v-for="categories in categoryfields" v-bind:key="categories._id">
  <button class="dropdown-item" @click=" goTobookcategory(categories._id)">{{ categories.name }}</button>
  </div>
</div>
</div>
   </div>
      


        <!-- <div  class="col-lg-9 mb-4" > 
      <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <img class="d-block img-fluid" src="../../assets/slider1.jpg" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block img-fluid" src="../../assets/slider2.jpg" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block img-fluid" src="../../assets/slider3.jpg" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
     
       </div> -->
      <!-- /.row -->

    </div>
  


<input type="text" v-model="search" placeholder="   Kërko..." id="kerko">
<div class="container">
    
      
 <div  v-for="(book,index) in displayedPosts" v-bind:key="index" >
        
        
      <div class="section mb-5 card" style="display: flex;">
              
           <h4 class="text-center pt-3 ">{{book.title}}</h4>
         <img :src="`http://localhost:5000/images/${book.image}`" class="img-fluid rrite">
         <hr>
         <span class="lead pl-4" style="font-weight: 500;">{{book.author}}</span>
         <span class="float-right lead pl-4"><span class="text-danger">{{book.price}}.00€</span></span>
         <div class="card-footer mt-2 pb-3 px-2">
          <div v-if="user.loggedIn">
            <div class="d-flex">
              <button type="button" class="btn btn-success ml-2" @click="goTodetail(book._id)">Shiko <i class="cil-book"></i></button>
                <div  v-for="admins in adminfields" v-bind:key="admins._id">
                  <div v-if="admins.email == user.data.email" style="display: flex; justify-content: ">
                    <button type="button" class="btn btn-danger ml-2 " @click.stop="deletebook(book._id)">Delete <i class="cil-trash"></i></button>
                    <button type="button" class="btn btn-warning ml-2 text-white" @click.stop="editbook(book._id)">Edit <i class="far fa-edit"></i></button>                  
                  </div>
                </div>
            </div>
          </div>
            <div v-else>
            
            <button type="button" class="btn btn-warning ml-2" @click="goTodetail(book._id)">Detajet <i class="cil-book"></i></button>
          </div>
         
       
         
         </div>
     
     
      </div>

       
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
     
     </div>
      </div>
</template>

<style>
.dark .bookscat{
color:white
}
</style>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import axios from 'axios'
export default {
  name: 'Get',
 data () {
  return {
      catId:this.$route.params.Cid,
      bokId:this.$route.params.Bid,
      bookfields:{},
      categoryfields:{},
      posts : [''],
    page: 1,
    perPage: 6,
    pages: [],
    adminfields:{},
    search:''
    
   
     }},
      created() {
  axios.get(`http://localhost:4000/admin`)
  
  .then(response => {
    this.adminfields = response.data.filter(x => x.email == this.user.data.email)
  })
  .catch(e => {
    this.errors.push(e)
  })
         axios.get(`http://localhost:4000/books` ) 
  .then(response => {
    this.posts = response.data.reverse()
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
   },
   computed: {
  ...mapGetters({
    user: "user"
  }),
  displayedPosts () {
    if(this.$route.params.Cid == 'all'){ return this.paginate(this.posts.filter((book)=>{
              return book.title.toLowerCase().match(this.search.toLowerCase()) && book.isDeleted == false;
          }) )}
   
   else{
     return this.paginate(this.posts.filter((book)=>{
              return book.title.toLowerCase().match(this.search.toLowerCase()) && book.category == this.$route.params.Cid && book.isDeleted == false;
          }) )
   }
     
    
  }
},
   watch:{
       $route(){
           this.updatePage(this.$route.params.Cid)
       },
       posts () {
    this.setPages();
  }
   },
  
    methods: {
  setPages () {
    if(this.$route.params.Cid == 'all'){let numberOfPages = Math.ceil(this.posts.filter(x => x.isDeleted == false).length / this.perPage);
    for (let index = 1; index <= numberOfPages; index++) {
      this.pages.push(index);
    }}
    else{
      let numberOfPages = Math.ceil(this.posts.filter(x => x.category === this.$route.params.Cid && x.isDeleted == false).length / this.perPage);
       for (let index = 1; index <= numberOfPages; index++) {
      this.pages.push(index);
    }
    }
    
  },
  paginate (posts) {
    let page = this.page;
    let perPage = this.perPage;
    let from = (page * perPage) - perPage;
    let to = (page * perPage);
    return  posts.slice(from, to);
  },
  goTodetail(bookId) {
  let bokId=bookId
  
  this.$router.push({name:'bookdetails',params:{Bid:bokId}}
  
  
  )
    this.$router.go({name:'bookdetails',params:{Bid:bokId}}) ;
    window.scrollTo(0, 0);
},  
      goTobookcategory(categoryId) {
  let catId=categoryId
  this.$router.push({name:'books',params:{Cid:catId}})
  this.$router.go({name:'books',params:{Cid:catId}}) ;
    window.scrollTo(0, 0);
},
deletebook(bookid){
    let bokId=bookid
    this.$router.push({name:'deletebook',params:{Bid:bokId}})
    this.$router.params.Bid
},
  editbook(bookid){
    let bokId=bookid
    this.$router.push({name:'editbook',params:{Bid:bokId}})
    this.$router.params.Bid
}
          
          },             
          
          
}
</script>