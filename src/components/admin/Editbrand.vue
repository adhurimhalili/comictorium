<template>
    <div class="container">
      <div v-for="brand in brandFields" v-bind:key="brand._id">
        <div v-if="brand.email === user.data.email">
          <h1>Edit Brand</h1>
          <form @submit.prevent="onSubmit">
            <div class="col-md-8 mb-3 mx-auto">
              <label for="name">Name</label>
              <input
                type="text"
                v-model="brand.name"
                id="name"
                name="name"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.brand.name.$error }"
              />
              <div v-if="submitted && !$v.brand.name.required" class="invalid-feedback">This field is required</div>
              <div v-if="submitted && !$v.brand.name.alpha" class="invalid-feedback">This field accepts only alphabets and spaces</div>
              <div v-if="submitted && (!$v.brand.name.minLength || !$v.brand.name.maxLength)" class="invalid-feedback">Should be between 2 and 30 characters</div>
            </div>
            <div class="col-md-8 mb-3 mx-auto">
              <label for="description">Description</label>
              <textarea
                v-model="brand.description"
                id="description"
                name="description"
                class="form-control"
                :class="{ 'is-invalid': submitted && $v.brand.description.$error }"
                rows="4"
              ></textarea>
              <div v-if="submitted && !$v.brand.description.required" class="invalid-feedback">This field is required</div>
              <div v-if="submitted && !$v.brand.description.alphanumericsymbol" class="invalid-feedback">This field accepts only alphanumeric characters, symbols, and spaces</div>
              <div v-if="submitted && (!$v.brand.description.minLength || !$v.brand.description.maxLength)" class="invalid-feedback">Should be between 15 and 500 characters</div>
            </div>
            <div class="row">
              <button class="btn btn-success col-md-4 mb-3 mx-auto" type="submit">Update Brand</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { required, minLength, maxLength, helpers } from 'vuelidate/lib/validators';

const alpha = helpers.regex('alpha', /^[a-zA-Z ]*$/);
const alphanumericsymbol = helpers.regex('alphanumericsymbol', /[a-zA-Z0-9~@#^$&*()-_=,.?\s]*/);

export default {
  name: 'BrandEdit',
  data() {
    return {
      brandid: this.$route.params.Bid,
      brand:{},
      brandFields: {}, // Define brandFields property
      submitted: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  created() {
    axios.get('http://localhost:4000/brand')
      .then(response => {
        this.brand = response.data;
      })
      .catch(error => {
        console.error(error);
      });
      
      axios.get(`http://localhost:4000/admin`)
    .then(response => {
      this.adminfields = response.data.filter(x => x.email == this.user.data.email)
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  validations: {
    brand: {
      name: { required, alpha, minLength: minLength(2), maxLength: maxLength(30) },
      description: { required, minLength: minLength(15), maxLength: maxLength(500), alphanumericsymbol }
    }
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const brandId = this.brandFields[0]._id;
      axios.put(`http://localhost:4000/brand/${brandId}`, this.brandFields[0])
        .then(response => {
          console.log(response);
          // Handle successful update
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  }
};
</script>
  