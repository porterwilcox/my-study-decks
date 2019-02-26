import fireApp from '../../utils/firebase-init.js'
import SwalConfigs from '../../utils/swal-configs.js'

const _auth = fireApp.auth

export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        authenticate({ commit }) {
            _auth.onAuthStateChanged(user => {
                if (!user || !user.displayName) return
                commit('setUser', user)
                SwalConfigs.toast('Welcome back, ' + user.displayName, '', 'success')
                if (!user.emailVerified) setTimeout(() => SwalConfigs.toast("", "Verify your email address to unlock more features, including Deck Creation.", "info", 3000), 1000)
            })
        },
        login({ commit }, payload) {
            return _auth.signInWithEmailAndPassword(payload.email, payload.password)
                .then(res => {
                    commit('setUser', res.user)
                    return SwalConfigs.toast('Welcome back, ' + res.user.displayName, '', 'success')
                })
                .catch(e => {
                    console.error(e)
                    throw new Error("Email and/or Password is incorrect.")
                })
        },
        register({ commit, dispatch }, payload) {
            return _auth.createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    _auth.currentUser.updateProfile({ displayName: payload.username })
                    commit('setUser', _auth.currentUser)
                    dispatch('validateEmail')
                    return true
                })
                .catch(e => {
                    console.error(e)
                    throw new Error("Sorry, registration failed.")
                })
        },
        validateEmail({ }) {
            _auth.currentUser.sendEmailVerification({
                url: 'http://localhost:8080/'
            })
                .then(() => {
                    SwalConfigs.toast('Account Created!', 'Verification email has been sent.', 'success', 2500)
                })
        },
        logout({ commit }) {
            _auth.signOut()
                .then(() => {
                    commit('setUser', {})
                    SwalConfigs.toast('Successfully logged out.', '', 'success')
                })
                .catch(e => console.error(e))
        },
    },
    getters: {
        IsUniqueEmail: () => (email) => {
            return _auth.fetchSignInMethodsForEmail(email)
                .then(res => {
                    if (res.length) throw new Error('This email is already in use.')
                    return true
                })
        }
    }
}