<template>
  <div class="home container-fluid">
    <navigation></navigation>
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1">
        <div class="row">
          <deck-card v-for="(deck, i) in decks" :key="deck.name" :deck="deck" :i="i"></deck-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import DeckCard from '@/components/DeckCard.vue'
export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {
    decks() {
      return this.$store.state.decks
    }
  },
  components: {
    Navigation,
    DeckCard
  }
}
</script>
