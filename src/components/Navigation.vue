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
import Swal from 'sweetalert2'
export default {
   name: "navigation",
   props: [],
   data() {
      return {}
   },
   computed: {},
   methods: {
      login(){
         Swal.mixin({
         input: 'text',
         confirmButtonText: 'Next',
         showCancelButton: true,
         progressSteps: ['<i class="far fa-envelope"></i>', '<i class="fas fa-lock"></i>']
         }).queue([
         {
            title: 'Email',
         },
         'Password',
         ])
      },
      register(){}
   },
   components: {}
}
</script>