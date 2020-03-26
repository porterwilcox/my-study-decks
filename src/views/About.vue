<template>
   <div class="about container-fluid">
     <navigation></navigation>
      <h2>MyStudyDecks</h2>
      <hr class="mb-5">
      <div class="m-5">
         <h3 class="d-inline">IS</h3>
         <p class="d-inline text-secondary"> a simple web application allowing visitors to study flash card decks, and users to create their own custom flash card decks.</p>
      </div>
      <div class="m-5">
         <h3 class="d-inline">CAN</h3>
         <p class="d-inline text-secondary"> be downloaded onto your mobile device for a seemingly native application experience. ios users wishing to download - view this site via the safari browser application, click on the broswer's settings tab, and select Add to Home Screen.</p>
      </div>
      <div class="m-5">
         <h3 class="d-inline">WAS</h3>
         <p class="d-inline text-secondary"> built with the Vue.js frontend framework and Google's Firebase for user authentication and data storage. View the source code <a href="https://github.com/porterwilcox/my-study-decks" target="_blank">here</a>.</p>
      </div>
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "about",
   props: [],
   data() {
      return {}
   },
   computed: {},
   methods: {},
   components: {
     Navigation
   }
}
</script>
