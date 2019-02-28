import firebase from '../../utils/firebase-init.js'

const _db = firebase.firestore
const _auth = firebase.auth

export default {
    state: {},
    mutations: {},
    actions: {
        createDeck({commit, dispatch}, deck) {
            deck["creatorId"] = _auth.currentUser.uid
            _db.collection('decks').add(deck)
                .then(res => {
                    console.log(res)
                    dispatch('toast', {title: 'Deck Created!', text: '', type: 'success'})
                })
        }
    },
}