<template>
   <div class="create container-fluid">
        <navigation></navigation>
        <div class="row">
           <div class="col-7">
               <h2>Create a Deck:</h2>
               <input v-model="activeCard.question" type="text">
               <input v-model="activeCard.answer" type="text">
           </div>
           <div class="col-5">
              <h2>Preview:</h2>
              <div class="card bg-info">
                 {{activeCard.question || "Prompt Here..."}}
              </div>
           </div>
        </div>
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "create",
   props: [],
   data() {
      return {
         activeCard: {
            question: '',
            answer: ''
         }
      }
   },
   computed: {},
   methods: {},
   components: {
       Navigation
   }
}
</script>