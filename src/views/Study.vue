<template>
   <div class="study container-fluid">
       <navigation :study="deck.name">
           <div v-if="user.uid = deck.creatorId" class="btn-group btn-group-md mb-2 mt-1" role="group">
               <button @click="edit" class="btn btn-outline-light">Edit</button>
               <button @click="deleteDeck" class="btn btn-outline-light">Delete</button>
            </div>
       </navigation>
       <div class="row my-4">
           <div :key="i" v-for="(card, i) in deck.cards" class="col d-flex justify-content-center">
               <p @click="jumpToCard(card)" :class="{'active': card == activeCard, 'green': correct.has(card), 'red': wrong.has(card)}" class="circle action">{{i+1}}</p>
           </div>
       </div>
       <div class="row justify-content-center align-items-center">
            <flip-card class="col-10 col-md-6 text-center" v-on:status="processStatus" :card="activeCard">
                <template v-if="finished" #front>
                    <h1>You got {{percent}}% correct!</h1>
                </template>
                <template v-if="finished" #back>
                    <h2>What would you like to do?</h2>
                    <div class="btn-group-vertical btn-group-md" role="group">
                        <button v-if="percent < 100" @click="studyMissed" class="btn btn-outline-secondary">Study the cards I missed</button>
                        <button @click="shuffleStudy" class="btn btn-outline-secondary">Shuffle the deck</button>
                        <button @click="$router.push({name: 'home'})" class="btn btn-outline-secondary">Back to Home</button>
                    </div>
                </template>
            </flip-card>
       </div>
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import FlipCard from '@/components/FlipCard.vue'
export default {
   name: "study",
   props: [],
   beforeRouteLeave(_, __, next) {
       this.deck.cards = this.restore
       if(this.result.results.length) {
           this.$store.dispatch('saveStudyResult', {deckId: this.deck.id, ...this.result})
       }
       this.$store.commit('results', [])
       next()
   },
   mounted() {
       if (this.deck.id) {
           this.$store.dispatch('getStudyResults', this.deck.id)
       }
   },
   data() {
      return {
          correct: new Set,
          wrong: new Set,
          activeCard: {},
          percent: '',
          restore: [],
          studied: new Set,
          result: {
              studyDate: Date.now(),
              results: []
          }
      }
   },
   computed: {
       deck() {
           let id = this.$route.params.deckId
           return this.$store.state.decks.find(d => d.id.substring(7,13) == id) || {cards: []}
       },
       user() {
           return this.$store.getters.User
       },
       finished() { //TODO - this isn't running more than just on component mount!
            let over = this.correct.size + this.wrong.size == this.deck.cards.length && this.deck.cards.length != 0
            if (over) this.setResult()
            return over
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
            this[prop] = new Set(this[prop])
            let index = this.deck.cards.indexOf(this.activeCard)
            this.studied.add(index)
            let next = this.calcNext(index)
            if (!next) {
                return 
            }
            this.activeCard = next
       },
       calcNext(index) {
           for(let i = 0; i < this.deck.cards.length; i++) {
               if (this.studied.has(i)) continue
               return this.deck.cards[i]
           }
           return null
       },
       jumpToCard(card) {
           if (this.finished) return
           this.correct.delete(card)
           this.wrong.delete(card)
           this.activeCard = card
       },
       shuffleStudy() {
            let cards = []
            let copy = [...this.restore]
            while(copy.length) {
                cards.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0])
            }
            this.deck.cards = cards
            this.resetStudy()
       },
       studyMissed() {
            this.deck.cards = Array.from(this.wrong)
            this.resetStudy()
       },
       resetStudy() {
            this.activeCard = this.deck.cards[0]
            this.correct = new Set
            this.wrong = new Set
            this.studied = new Set
       },
       setResult() {
            this.percent = (this.correct.size/this.deck.cards.length).toFixed(2) * 100
            let type = 'review incorrect'
            if(this.restore.length == this.deck.cards.length) {
                type = 'entire deck'
            }
            this.result.results.push({
                type,
                percent: this.percent
            })
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
                   this.restore = deck.cards
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