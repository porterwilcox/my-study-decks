<template>
   <div :class="isPrivy ? 'locked' : 'action'" class="deck-card col-6 col-md-4">
      <div :class="'bg-'+ colors[Math.floor(Math.random() * 3)]" class="card m-1 text-center">
          <div class="card-header">
              <h3>{{deck.name}}</h3>
          </div>
          <div class="card-body">
              <h5>{{deck.cards[0].question}}</h5>
          </div>
      </div>
      <i @click="locked" class="fas fa-7x fa-lock lock action"></i>
   </div>
</template>

<script>
export default {
   name: "deck-card",
   props: ["deck"],
   data() {
      return {
          colors: ["primary text-white border-light border", "warning", "light"]
      }
   },
   computed: {
       isPrivy() {
           return this.deck.private && !this.signedIn
       },
       signedIn() {
           let user = this.$store.getters.User
           return user.uid
       }
   },
   methods: {
       locked() {
           this.$store.dispatch('toast', {title: 'This deck is private.', text: 'Please, Sign In or Sign Up', type: 'warning', timer: 2000})
       }
   },
   components: {}
}
</script>
<style scoped>
.locked:hover .card {
    opacity: .3;
    position: relative;
}
.lock {
    display: none;
}
.locked:hover .lock {
    display: block;
    position: absolute;
    z-index: 10;
    top: 3vh;
    left: 10vw;
}
</style>
