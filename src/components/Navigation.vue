<template>
   <div class="navigation row">
      <div class="col text-center">
          <h1>My Study Decks</h1>
      </div>
      <div class="col-auto d-flex justify-content-end align-items-center">
         <div v-if="!user.uid" class="btn-group btn-group-sm" role="group">
            <button @click="login" class="btn btn-outline-secondary">Sign In</button>
            <button @click="register" class="btn btn-outline-primary">Sign Up</button>
         </div>
         <button v-else @click="$store.dispatch('auth/logout')" class="btn btn-outline-primary">Logout</button>
      </div>
   </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
   name: "navigation",
   props: [],
   data() {
      return {
         creds: {
            email: '',
            username: '',
            password: ''
         }
      }
   },
   computed: {
      user() {
         return this.$store.getters.user
      }
   },
   methods: {
      register(){
         Swal.mixin({
         confirmButtonText: 'Next',
         showCancelButton: true,
         progressSteps: ['<i class="fas fa-envelope"></i>', '<i class="fas fa-user"></i>' , '<i class="fas fa-lock"></i>']
         }).queue([
         {
            title: 'Sign Up',
            input: 'email',
            inputPlaceholder: 'Enter your email address',
            preConfirm: (email) => {
               return this.$store.getters["auth/IsUniqueEmail"](email)
                  .then(() => {
                     this.creds.email = email
                  })
                  .catch(e => Swal.showValidationMessage(e.message))
            }
         },
         {
            title: 'Sign Up',
            input: 'text',
            inputPlaceholder: 'Enter a username',
            preConfirm: (text) => {
               if(text.length < 2) return Swal.showValidationMessage("Username must have at least 2 characters.")
               if (text.match(/\W/)) return Swal.showValidationMessage("Username can only contain alpha-numeric characters.")
               this.creds.username = text
               }
         },
         {
            title: 'Sign Up',
            html: 
            '<input id="pw1" autofocus class="swal2-input" type="password" pattern=".{8,}" placeholder="Enter a password">' +
            '<input id="pw2" class="swal2-input" type="password" placeholder="Confirm password">',
            preConfirm: (password) => {
               if (document.getElementById('pw1').value != document.getElementById('pw2').value) {
                  return Swal.showValidationMessage("Passwords don't match.")
               }
               this.creds.password = document.getElementById('pw1').value
               this.$store.dispatch('auth/register', this.creds)
               this.creds = {
                  email: '',
                  username: '',
                  password: ''
               }
            } 
         }
         ])
      },
      login(){
          Swal.mixin({
         confirmButtonText: 'Next',
         showCancelButton: true,
         progressSteps: ['<i class="fas fa-envelope"></i>', '<i class="fas fa-lock"></i>']
         }).queue([
         {
            title: 'Sign In',
            input: 'email',
            inputPlaceholder: 'Enter your email address',
            preConfirm: (email) => this.creds.email = email
         },
         {
            title: 'Sign In',
            input: 'password',
            preConfirm: (password) => {
               this.creds.password = password
               return this.$store.dispatch('auth/login', this.creds)
                  .then(() => {
                     this.creds = {
                        email: '',
                        password: ''
                     }
                  })
                  .catch(e => Swal.showValidationMessage(e.message))
            } 
         }
         ])
      }
   },
   components: {}
}
</script>