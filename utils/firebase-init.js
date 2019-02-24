import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import config from './firebase-config.js'

const firebaseApp = firebase.initializeApp(config)
const firestore = firebaseApp.firestore()
const auth = firebaseApp.auth()

export default { firestore, auth }