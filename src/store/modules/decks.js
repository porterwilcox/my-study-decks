import firebase from '../../utils/firebase-init.js'
import router from '../../router.js';

const _db = firebase.firestore
const _auth = firebase.auth

export default {
    mutations: {
        setDecks(state, decks) {
            state.decks = decks
        },
        addDeck(state, deck) {
            state.decks.unshift(deck)
        }
    },
    actions: {
        createDeck({dispatch}, deck) {
            deck["creatorId"] = _auth.currentUser.uid
            _db.collection('decks').add(deck)
                .then(docRef => {
                    dispatch('toast', {title: 'Deck Created!', text: '', type: 'success'})
                    _db.doc(docRef.path).get()
                        .then(doc => {
                            let deck = doc.data()
                            deck['id'] = doc.id
                            dispatch('getDecks')
                            router.push({name: 'home'})
                        })
                })
                .catch(e => console.error(e))
        },
        getDecks({commit}) {
            console.log('getting the decks')
            _db.collection('decks').get()
                .then(snapShot => {
                    let decks = []
                    snapShot.forEach(docRef => {
                        let deck = docRef.data()
                        deck['id'] = docRef.id
                        decks.push(deck)
                    })
                    commit('setDecks', decks)
                })
                .catch(e => console.error(e))
        },
        deleteDeck({dispatch}, deckId) {
            _db.doc('decks/' + deckId).delete()
                .then(() => {
                    dispatch('getDecks')
                    router.push({name: 'home'})
                    dispatch('toast', {title: 'Deleted', type: 'success'})
                })
        },
        editDeck({dispatch}, deck) {
            _db.doc("decks/" + deck.id).update(deck)
                .then(() => {
                    dispatch('getDecks')
                    router.push({name: 'study', params: {deckId: deck.id.substring(7,13)}})
                    dispatch('toast', {title: 'Successfully Updated', text: 'Changes to ' + deck.name + ' have been saved.', type: 'success'})
                })
        }
    }
}