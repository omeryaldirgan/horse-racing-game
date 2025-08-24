const state = {
  gameStatus: 'idle'
}

const mutations = {
  SET_GAME_STATUS(state, status) {
    state.gameStatus = status
  }
}

const actions = {
  async initializeGame({ commit, dispatch }) {
    commit('SET_GAME_STATUS', 'idle')
    
    await dispatch('horses/generateHorseList', null, { root: true })
    await dispatch('horses/selectRandomHorses', 10, { root: true })
    await dispatch('races/generateRaceSchedule', null, { root: true })
    
    commit('SET_GAME_STATUS', 'ready')
  },
  
  startGame({ commit, dispatch }) {
    commit('SET_GAME_STATUS', 'racing')
    dispatch('races/startRace', null, { root: true })
  },
  
  pauseGame({ commit, dispatch }) {
    commit('SET_GAME_STATUS', 'paused')
    dispatch('races/pauseRace', null, { root: true })
  },
  
  resetGame({ commit, dispatch }) {
    commit('SET_GAME_STATUS', 'idle')
    
    dispatch('horses/selectRandomHorses', 10, { root: true })
    dispatch('races/generateRaceSchedule', null, { root: true })
    
    commit('SET_GAME_STATUS', 'ready')
  }
}

const getters = {
  gameStatus: state => state.gameStatus,
  canStart: state => state.gameStatus === 'ready' || state.gameStatus === 'paused',
  canPause: state => state.gameStatus === 'racing'
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
