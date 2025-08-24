import { generateHorses } from '@/utils/horseGenerator'

const state = {
  horses: [],
  selectedHorses: []
}

const mutations = {
  SET_HORSES(state, horses) {
    state.horses = horses
  },
  SET_SELECTED_HORSES(state, horses) {
    state.selectedHorses = horses
  }
}

const actions = {
  generateHorseList({ commit }) {
    const horses = generateHorses()
    commit('SET_HORSES', horses)
    return horses
  },
  
  selectRandomHorses({ commit, state }, count = 10) {
    // Select random horses from the available pool
    const availableHorses = [...state.horses]
    const selected = []
    
    for (let i = 0; i < count && availableHorses.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableHorses.length)
      selected.push(availableHorses.splice(randomIndex, 1)[0])
    }
    
    commit('SET_SELECTED_HORSES', selected)
    return selected
  }
}

const getters = {
  allHorses: state => state.horses,
  selectedHorses: state => state.selectedHorses,
  horsesCount: state => state.horses.length,
  selectedHorsesCount: state => state.selectedHorses.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
