const state = {
  gameStatus: 'idle', // idle, ready, racing, paused, finished
  raceProgress: 0,
  animationSpeed: 50
}

const mutations = {
  SET_GAME_STATUS(state, status) {
    state.gameStatus = status
  },
  SET_RACE_PROGRESS(state, progress) {
    state.raceProgress = progress
  },
  SET_ANIMATION_SPEED(state, speed) {
    state.animationSpeed = speed
  }
}

const actions = {
  async initializeGame({ commit, dispatch }) {
    commit('SET_GAME_STATUS', 'idle')
    commit('SET_RACE_PROGRESS', 0)
    
    // Generate horses and race schedule
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
    commit('SET_RACE_PROGRESS', 0)
    
    // Don't regenerate horses - keep the same 20 horses
    dispatch('horses/selectRandomHorses', 10, { root: true })
    dispatch('races/generateRaceSchedule', null, { root: true })
    
    commit('SET_GAME_STATUS', 'ready')
  }
}

const getters = {
  gameStatus: state => state.gameStatus,
  raceProgress: state => state.raceProgress,
  animationSpeed: state => state.animationSpeed,
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
