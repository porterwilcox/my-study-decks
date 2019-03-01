<template>
   <div :class="isPrivy ? 'locked' : 'action'" class="deck-card col-6 col-md-4">
      <div @click="study" class="card mb-4 text-center bg-light">
          <div class="card-header">
              <h3>{{deck.name}}</h3>
          </div>
          <div class="card-body">
              <h5>{{deck.cards[0].question}}</h5>
          </div>
      </div>
      <i v-if="isPrivy" @click="locked" class="fas fa-7x fa-lock lock"></i>
   </div>
</template>

<script>
export default {
   name: "deck-card",
   props: ["deck"],
   data() {
      return { }
   },
   computed: {
       isPrivy() {
           return this.deck.private && !this.signedIn
       },
       signedIn() {
           let user = this.$store.getters.User
           return user.uid != undefined
       }
   },
   methods: {
       locked() {
           this.$store.dispatch('toast', {title: 'This deck is private.', text: 'Please, Sign In or Sign Up', type: 'warning', timer: 2000})
       },
       study() {
           if (this.isPrivy) return this.locked()
            this.$router.push({name: 'study', params: {deckId: this.deck.id.substring(7,13)}})
       }
   },
   components: {}
}
</script>
<style scoped>
.locked:hover .card {
    opacity: .3;
}
.lock {
    opacity: 0;
    position: absolute;
    z-index: 10;
    top: 3vh;
    left: 10vw;
    transition: all .5s ease;
}
.locked:hover .lock {
    opacity: 1;
}
</style>
