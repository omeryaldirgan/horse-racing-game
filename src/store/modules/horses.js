import { generateHorses } from "@/utils/horseGenerator"

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
  },
  UPDATE_HORSE_CONDITION(state, { horseId, condition }) {
    const horse = state.horses.find(h => h.id === horseId)
    if (horse) {
      horse.condition = condition
    }
  }
}

const actions = {
  generateHorseList({ commit }) {
    const horses = generateHorses()
    commit("SET_HORSES", horses)
    return horses
  },
  
  selectRandomHorses({ commit, state }, count = 10) {
    const availableHorses = [...state.horses]
    const selected = []
    
    for (let i = 0; i < count && availableHorses.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableHorses.length)
      selected.push(availableHorses.splice(randomIndex, 1)[0])
    }
    
    commit("SET_SELECTED_HORSES", selected)
    return selected
  },
  
  updateHorseCondition({ commit }, payload) {
    commit("UPDATE_HORSE_CONDITION", payload)
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
