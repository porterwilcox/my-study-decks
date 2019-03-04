<template>
   <div class="navigation row mb-4">
      <div class="col d-flex justify-content-center">
          <h1 style="width: fit-content" :class="{action: this.$route.name != 'home'}" @click="$router.push({name: 'home'})">My Study Decks</h1>
      </div>
      <i @click="navCount++" :class="navCount % 2 ? 'far fa-times-circle text-white' : 'fas fa-bars text-primary'" class="fa-2x side-nav-btn action" aria-label="toggle menu" data-target=".side-nav" data-toggle="collapse"></i>
      <div class="side-nav col-5 col-md-2 bg-main-color collapse">
         <div class="d-flex flex-column h-100 w-100">
            <button v-for="l in links" :key="l.name" :class="$route.name == l.routeName ? 'disabled btn-light' : 'btn-outline-light'" class="btn mb-1" @click="$router.push({name: l.routeName})">{{l.name}}</button>
            <div v-if="!user.uid" class="btn-group btn-group-sm" role="group">
               <button @click="login" class="btn btn-outline-light">Sign In</button>
               <button @click="register" class="btn btn-outline-light">Sign Up</button>
            </div>
            <button v-else @click="logout" class="btn btn-outline-light">Logout</button>
         </div>
      </div>
   </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
   name: "navigation",
   props: ["study"],
   data() {
      return {
         creds: {
            email: '',
            username: '',
            password: ''
         },
         navCount: 0,
         links: [{name: "Home", routeName: "home"}, 
         {name: "About", routeName: "about"},
         {name: "Create a Deck", routeName: "create"}]
      }
   },
   computed: {
      user() {
         return this.$store.getters.User
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
            '<input id="pw1" autofocus class="swal2-input" type="password" placeholder="Enter a password">' +
            '<input id="pw2" class="swal2-input" type="password" placeholder="Confirm password">',
            preConfirm: () => {
               let password = document.getElementById('pw1').value
               if (password != document.getElementById('pw2').value) {
                  return Swal.showValidationMessage("Passwords don't match.")
               }
               if (password.length < 8) return Swal.showValidationMessage("Password must be at least 8 characters.")
               this.creds.password = password
               return this.$store.dispatch('auth/register', this.creds)
                  .then(() => {
                     $('.collapse').collapse('hide');
                     this.creds = {
                        email: '',
                        username: '',
                        password: ''
                     }
                  })
                  .catch(e => Swal.showValidationMessage(e.message))
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
            inputPlaceholder: 'Enter your password',
            preConfirm: (password) => {
               this.creds.password = password
               return this.$store.dispatch('auth/login', this.creds)
                  .then(() => {
                     $('.collapse').collapse('hide');
                     this.creds = {
                        email: '',
                        password: ''
                     }
                  })
                  .catch(e => Swal.showValidationMessage(e.message))
            } 
         }
         ])
      },
      logout() {
         $('.collapse').collapse('hide');
         this.$router.push({name: 'home'})
         this.$store.dispatch('auth/logout')
      }
   },
   components: {},
   watch: {
      study: {
         immediate: true,
         handler: function (val) {
            if (val) this.links.unshift({name: this.study, routeName: "study"})
         }
      }
   }
}
</script>

<style>
.navigation {
   box-shadow: 0 -2px 10px 1px black;
}
.side-nav-btn {
    position: fixed;
    right: 1vw;
    top: 1.5vh;
    z-index: 2;
}
.side-nav {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    box-shadow: 0 0 100px 10px black;
    padding-top: 20vh;
    height: 100vh;
    background: var(--primary);
}
</style>
