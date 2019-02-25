<template>
   <div class="navigation row">
      <div class="col-8 col-md-4 text-center">
          <h1>My Study Decks</h1>
      </div>
      <div class="col d-flex justify-content-end align-items-center">
         <div class="btn-group btn-group-sm" role="group">
            <button @click="login" class="btn btn-outline-secondary">Sign In</button>
            <button @click="register" class="btn btn-outline-primary">Sign Up</button>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import { resolve } from 'q';
export default {
   name: "navigation",
   props: [],
   data() {
      return {
         loginCreds: {
            email: '',
            password: ''
         }
      }
   },
   computed: {
      ...mapGetters([
         'IsUniqueEmail'
      ])
   },
   methods: {
      login(){
         Swal.mixin({
         input: 'text',
         confirmButtonText: 'Next',
         showCancelButton: true,
         progressSteps: ['<i class="far fa-envelope"></i>', '<i class="fas fa-lock"></i>']
         }).queue([
         {
            title: 'Sign In',
            input: 'email',
            inputPlaceholder: 'Enter your email address',
            preConfirm: (email) => {
               return this.IsUniqueEmail(email)
                  .then(() => {
                     this.loginCreds.email = email
                     resolve()
                  })
                  .catch(e => Swal.showValidationMessage(e.message))
            }
         },
         {
            title: 'Sign In',
            html: 
            '<input id="pw1" autofocus class="swal2-input" type="password" pattern=".{8,}" placeholder="Enter a password">', 
            // '<input id="pw2" class="swal2-input" type="password" placeholder="Confirm password">',
            input: 'password',
            inputPlaceholder: 'Confirm password',
            preConfirm: (password) => {
               if (document.getElementById('pw1').value != password) {
                  Swal.showValidationMessage("Passwords don't match.")
               }
               this.loginCreds.password = password
               this.$store.dispatch('login', this.loginCreds)
               this.loginCreds = {
                  email: '',
                  password: ''
               }
            } 
         }
         ])
      },
      register(){}
   },
   components: {}
}
</script>