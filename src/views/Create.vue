<template>
   <div class="create container-fluid">
        <navigation></navigation>
        <div class="row">
            <div class="col-12 col-md-6">
               <h2>{{deckToEdit ? "Edit your" : "Create a"}} Deck:</h2>
               <h4>Card info:</h4>
               <div class="d-block">
                  <label>Prompt:</label>
                  <input @focus="answerInputFocused = false" class="w-50 ml-2" v-model="activeCard.question" type="text">
               </div>
               <div class="d-block">
                  <label>Answer:</label>
                  <input @focus="answerInputFocused = true" @blur="answerInputFocused = false" class="w-50 ml-2" v-model="activeCard.answer" type="text">
               </div>
               <button @click="addCard" :disabled="!activeCard.question && !activeCard.answer" :class="activeCard.question && activeCard.answer ? 'btn-outline-primary' : 'disabled'" class="btn">{{cards.includes(activeCard) ? 'Update Card' : 'Add Card to Deck'}}</button>
               <button @click="removeCard" v-if="cards.includes(activeCard)" class="btn btn-outline-primary btn-sm">Remove Card</button>
               <h4 class="mt-5">Deck info:</h4>
               <div class="d-block">
                  <label>Deck Name:</label>
                  <input class="w-50 ml-2" v-model="deck.name" type="text">
               </div>
               <div class="d-block">
                  <label>Cards in Deck: {{cards.length}}</label>
               </div>
               <div class="d-block">
                  <label>Private:</label>
                  <input class="ml-4" type="checkbox" v-model="deck.private" :checked="deck.private">
               </div>             
               <button @click="submitDeck" :disabled="cards.length < 6" :class="cards.length >= 6 ? 'btn-outline-primary' : 'disabled'" class="btn">{{cards.length >= 6 ? 'Publish this Deck' : 'Must have at least 6 cards to publish a deck'}}</button>
           </div>
           <div class="col-12 col-md-6">
              <h2>Preview:</h2>
              <div class="row">
                 <div class="col-10 offset-1">
                     <div class="d-flex row">
                        <div @click="activeCard = card" v-for="(card, i) in cards" :class="activeCard == card ? 'border-primary' : 'action text-muted' " class="col-1 border" :key="i">{{i+1}}</div>
                     </div>
                 </div>
              </div>
              <div class="row d-flex flex-column justify-content-center align-items-center h60">
                 <div class="btn-group btn-group-toggle mb-2" data-toggle="buttons">
                    <label @click="answerInputFocused = false" :class="{active: !answerInputFocused}" class="btn btn-outline-primary action">
                        <input type="radio"> Front
                    </label>
                    <label @click="answerInputFocused = true" :class="{active: answerInputFocused}" class="btn btn-outline-primary action">
                        <input type="radio"> Back
                    </label>
                 </div>
                  <div class="card col-6 h-50 d-flex align-items-center justify-content-center">
                     <h4 v-if="!answerInputFocused">{{activeCard.question || "Prompt Here..."}}</h4>
                     <h4 v-else>{{activeCard.answer || "Answer Here..."}}</h4>
                  </div>
              </div>
           </div>
        </div>
   </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
export default {
   name: "create",
   beforeRouteLeave(to, from, next){
      if(this.cards.length && !this.published) {
         this.$store.dispatch('confirm', {title: "Are you sure you want to leave?", text: "You'll lose your unpublished deck.", type: "warning", confirm: "Stay with the Deck", cancel: "Leave Anyway"})
            .then(stay => next(stay ? false : true))
      } else next()
   },
   props: ["deckToEdit"],
   data() {
      return {
         published: false,
         answerInputFocused: false,
         activeCard: {
            question: '',
            answer: ''
         },
         cards: [],
         deck: {
            name: '',
            private: false
         }

      }
   },
   computed: {},
   methods: {
      addCard() {
         if(!this.cards.includes(this.activeCard)) this.cards.push(this.activeCard)
         this.activeCard = {
            question: '',
            answer: ''
         }
      },
      removeCard() {
         this.cards.splice(this.cards.indexOf(this.activeCard), 1)
         this.activeCard = {
            question: '',
            answer: ''
         }
      },
      submitDeck() {
         this.deck['cards'] = this.cards
         if (!this.deckToEdit) {
            this.$store.dispatch('createDeck', this.deck)
         } else {
            let updated = {...this.deckToEdit, ...this.deck}
            this.$store.dispatch('editDeck', updated)
         }
         this.published = true
      }
   },
   components: {
       Navigation
   },
   watch: {
      deckToEdit: {
         immediate: true,
         handler: function(deck) {
            if (deck) {
               let {name, private: p, cards} = deck
               this.deck.name = name
               this.deck.private = p
               this.cards = cards.map(c => {return {...c}})
            }
         }
      }
   }
}
</script>
