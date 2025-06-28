<template>
<div>
 <!-- Footer -->
 <footer class="footer">
  <div class="container">
    <img style="width:170px; float:left" src="../../assets/logo.png">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12" style="float:right;padding-left:10%;">
      <h6 class="text-uppercase font-weight-bold text-center">Informacione shtesë</h6>
      <p>
        <router-link to="/about" active-class="active" exact><a>About Us: </a></router-link>
        <br>
        Mësoni më shumë rreth misionit, ekipit dhe angazhimit tonë për të ofruar një përzgjedhje të cilësisë së lartë të librave komikë.
      </p>
      <p>
        <router-link to="/contact" active-class="active" exact><a>Contact Us:</a></router-link>
        <br>
        Na kontaktoni nëse keni pyetje, komente ose shqetësime. Ne jemi gjithmonë të lumtur të dëgjojmë nga klientët tanë.
      </p>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12" style="float:right;padding-left:15%;">
      <h6 class="text-uppercase font-weight-bold">Address:</h6>
      <p>Rrexhep Bislimi, Ferizaj
      <br/>info@comictorium.com
      <!-- <br/>+ 383 45 123 456
      <br/>+ 383 44 123 456 -->
    </p>
    </div>
  </div>
  </div>
  <div class="footer-copyright text-center">© 2023 Copyright: Comictorium</div>
</footer>
</div>


</template>
