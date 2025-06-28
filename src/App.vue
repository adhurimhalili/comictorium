<template>

    <div  class="app" :class="mode">
        <app-Header @toggle="toggle" ></app-Header>
 
                <!--<h1 v-highlight="'red'">Routing</h1>
                <p >Hello World</p>
                <h3>Local Directive</h3>
                <p>{{text | toUpperCase | to-lowercase}}</p> -->
                
        <router-view></router-view>
        <app-Footer></app-Footer>

    </div>
</template>

<script>
/* eslint-disable */
    import Header from './components/partials/Header.vue';
    import Footer from './components/partials/Footer.vue';
    export default {
        data(){
            return{
                 mode: 'light'
            }
        },
        components:{
            appHeader:Header,
            appFooter:Footer
        },
        methods: {
    keyPress (e) {
      if (e.key === 't') {
        this.toggle()
      }
    },
    toggle () {
      if (this.mode === "dark") {
        this.mode = "light"
      } else {
        this.mode = "dark"
      }
    }
  }
    }
</script>

<style>
@import '../src/assets/style.css';
.dark {
  background:#15191b;
}
 .dark .card{
   background-color: #0F0F0F;
   color: white;
 }

 .dark .katroriii{
     background-color: #0F0F0F;
     color: white 
 }
</style>
