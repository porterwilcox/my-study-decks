<template>
   <div class="study container-fluid">
       <navigation :study="deck.name"></navigation>
       {{deck}}
       <button v-if="user.uid == deck.creatorId" @click="edit">Edit</button>
       <button v-if="user.uid == deck.creatorId" @click="deleteDeck">Delete</button>
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
       },
       user() {
           return this.$store.getters.User
       }
   },
   methods: {
       deleteDeck() {
           this.$store.dispatch('deleteDeck', this.deck.id)
       },
       edit() {
           this.$router.push({name: 'create', params: {deckToEdit: this.deck}})
       }
   },
   components: {
       Navigation
   }
}
</script>