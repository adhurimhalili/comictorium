<template>

<div class="container features">
  <h1 class="text-center con">Contact</h1><br>
    <div class="row">
  
</div>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <div class="bordermaps">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d692.4172661844858!2d21.14660960887951!3d42.65368371329267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549f3f9c98dcad%3A0x34f016cddf4a9928!2sDukagjini%20Center!5e0!3m2!1sen!2s!4v1678628236017!5m2!1sen!2s"  width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
      </div>
      </div>
<div class="col-lg-6 col-md-6 col-sm-12">
        <form @submit.prevent="onSubmit">
    <div class="form-group">
       <label for="name">Emri</label>
       <input type="text" v-model="messages.name" id="firstName" name="name" class="form-control" :class="{ 'is-invalid': submitted && $v.messages.name.$error }" />
       <div v-if="submitted && !$v.messages.name.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
       <div v-if="submitted && !$v.messages.name.alpha" class="invalid-feedback">Kjo fushë pranon vetëm shkronja</div>
       <div v-if="submitted && !$v.messages.name.minLength || !$v.messages.name.maxLength" class="invalid-feedback">Duhet të ketë 5 deri 15 shkronja</div>
    </div>
     <div class="form-group">
      <label for="email">Email</label>
      <input type="email" v-model="messages.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.messages.email.$error }" />
     <div v-if="submitted && $v.messages.email.$error" class="invalid-feedback">
     <span v-if="!$v.messages.email.required">Email është i nevojshëm</span>
        <span v-if="!$v.messages.email.email">Email nuk është valid</span>
           </div>
           </div>
   <div class="form-group">
       <label for="description">Mesazhi</label>
       <textarea v-model="messages.description" id="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && $v.messages.description.$error }" maxlength="500" rows="4"/>
       <div v-if="submitted && !$v.messages.description.required" class="invalid-feedback">Kjo fushë është e domosdoshme</div>
        <div v-if="submitted && !$v.messages.description.alphanumericsymbol" class="invalid-feedback">Mos përdorni karaktere të veçanta</div>
        <div v-if="submitted && !$v.messages.description.minLength || !$v.messages.description.maxLength" class="invalid-feedback">Duhet të ketë 15 deri 500 shkronja</div>
     
    </div>
     <button class="btn btn-success btn-block" type="submit">Dërgo <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
    </form>
</div>
    </div>
</div>
</template>
<style>
.dark .con{
  color:white
}
.dark label{
  color:white
}
</style>
<script>
/* eslint-disable */
import axios from 'axios'
import { required, minLength,maxLength, email, helpers} from "vuelidate/lib/validators"
const alpha = helpers.regex('alpha', /[a-zA-Z][a-zA-Z ]+/)
const alphanumericsymbol = helpers.regex('alphanumericsymbol', /[a-zA-Z0-9~@#\^\$&\*\(\)-_\+=\,\.\?\s]*/)
export default {
  name: 'CreateContacts',
  data () {
    return {
      messages:{
        name: "",
        email: "",
        description: "",
      },
      submitted:false,
    }
  },
     validations: {
            messages: {
                name: { required, minLength: minLength(5), maxLength: maxLength(15), alpha},
                email: {required,email},
                description: {required, minLength: minLength(15), maxLength: maxLength(500), alphanumericsymbol}
            }
        },
  methods: {
    onSubmit () {
       this.submitted = true;

             this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      axios.post(`http://localhost:4000/messages`, this.messages)
      .then(response => {
        //console.log(response);
        this.$router.push({
          name: '/home',
          //params: { id: response.data._id }
        })
        this.$router.go();
        })
      
    }
  }
}

</script>