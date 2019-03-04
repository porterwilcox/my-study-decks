<template>
   <div class="study container-fluid">
       <navigation :study="deck.name"></navigation>
       {{deck}}
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "study",
   props: [],
   data() {
      return {
          correct: [],
          wrong: []
      }
   },
   computed: {
       deck() {
           let id = this.$route.params.deckId
           return this.$store.state.decks.find(d => d.id.substring(7,13) == id) || {}
       }
   },
   methods: {},
   components: {
       Navigation
   }
}
</script>