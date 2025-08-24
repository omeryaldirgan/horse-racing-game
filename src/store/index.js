import { createStore } from 'vuex'
import horses from './modules/horses'
import races from './modules/races'
import game from './modules/game'

export default createStore({
  modules: {
    horses,
    races,
    game
  },
  
  // Global state
  state: {
    isLoading: false,
    error: null
  },
  
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  
  actions: {
    setLoading({ commit }, isLoading) {
      commit('SET_LOADING', isLoading)
    },
    setError({ commit }, error) {
      commit('SET_ERROR', error)
    }
  },
  
  getters: {
    isLoading: state => state.isLoading,
    error: state => state.error
  }
})
