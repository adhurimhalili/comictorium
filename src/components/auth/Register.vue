<template>
<div class="view">
  <div class="container">
  <div class="d-flex justify-content-center h-100">
    <div class="card1">
      <div class="card-header">
        <h3>Register</h3>
      </div>
      <div class="card-body">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <br>
        <form action="#" @submit.prevent="submit">
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
            </div>
            <input
                    placeholder="Name"
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"/>
            
          </div>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-envelope"></i></span>
            </div>
            <input
                    placeholder="Email"
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    required
                    v-model="form.email"
                  />
          </div>
          <div class="input-group form-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-key"></i></span>
            </div>
            <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
          </div>
          <div class="row align-items-center remember">
            <input type="checkbox">Remember Me
          </div>
          <div class="form-group">
            <input type="submit" value="SignUp" class="btn float-right login_btn">
          </div>
        </form>
         
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
/* eslint-disable*/
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            this.$router.push({name: 'home',})
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>