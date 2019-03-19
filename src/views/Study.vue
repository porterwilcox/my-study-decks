<template>
   <div class="study container-fluid">
       <navigation :study="deck.name">
           <div v-if="user.uid = deck.creatorId" class="btn-group btn-group-md mb-2 mt-1" role="group">
               <button @click="edit" class="btn btn-outline-light">Edit</button>
               <button @click="deleteDeck" class="btn btn-outline-light">Delete</button>
            </div>
       </navigation>
       <div class="row my-4">
           <div v-for="(card, i) in deck.cards" class="col d-flex justify-content-center">
               <p @click="jumpToCard(card)" :class="{'active': card == activeCard, 'green': correct.has(card), 'red': wrong.has(card)}" class="circle action">{{i+1}}</p>
           </div>
       </div>
       <div class="row justify-content-center align-items-center">
            <flip-card v-on:status="processStatus" :card="activeCard" />
       </div>
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import FlipCard from '@/components/FlipCard.vue'
export default {
   name: "study",
   props: [],
   data() {
      return {
          correct: new Set,
          wrong: new Set,
          activeCard: {}
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
       async deleteDeck() {
           let confirmDelete = await this.$store.dispatch('confirm', {title: 'Are you sure you want to delete this deck?', text: 'Deleted decks cannot be restored.', type: 'warning', confirm: 'Delete'})
           if (confirmDelete) this.$store.dispatch('deleteDeck', this.deck.id)
       },
       edit() {
           this.$router.push({name: 'create', params: {deckToEdit: this.deck}})
       },
       processStatus(prop) {
            this[prop].add(this.activeCard)
            let index = this.deck.cards.indexOf(this.activeCard)
            let next = this.deck.cards[index + 1]
            if (!next) {
                return //end of study logic func call here
            }
            this.activeCard = next
       },
       jumpToCard(card) {
           this.correct.delete(card)
           this.wrong.delete(card)
           this.activeCard = card
       }
   },
   components: {
       Navigation,
       FlipCard
   },
   watch: {
       deck: {
           immediate: true,
           handler: function(deck) {
               if (deck.id) {
                   this.activeCard = deck.cards[0]
               }
           }
       }
   }
}
</script>

<style>
.circle {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: grey;
    text-align: center;
}
.active {
    background: transparent;
    box-shadow: 0 0 5px black;
}
.green {
    background: transparent;
    box-shadow: 0 0 5px var(--success);    
}
.red {
    background: transparent;
    box-shadow: 0 0 5px var(--danger);    
}
</style>