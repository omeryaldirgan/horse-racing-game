import { RACE_LENGTHS } from '@/utils/constants'

const state = {
  raceSchedule: [],
  currentRace: null,
  raceResults: [],
  isRacing: false,
  currentLap: 0
}

const mutations = {
  SET_RACE_SCHEDULE(state, schedule) {
    state.raceSchedule = schedule
  },
  SET_CURRENT_RACE(state, race) {
    state.currentRace = race
  },
  SET_RACE_RESULTS(state, results) {
    state.raceResults = results
  },
  SET_RACING_STATUS(state, status) {
    state.isRacing = status
  },
  SET_CURRENT_LAP(state, lap) {
    state.currentLap = lap
  },
  ADD_RACE_RESULT(state, result) {
    state.raceResults.push(result)
  }
}

const actions = {
  generateRaceSchedule({ commit }) {
    const schedule = RACE_LENGTHS.map((length, index) => ({
      id: index + 1,
      lap: index + 1,
      length,
      status: 'pending',
      participants: [],
      result: null
    }))
    
    commit('SET_RACE_SCHEDULE', schedule)
    
    // Initialize with empty results
    commit('SET_RACE_RESULTS', [])
    
    return schedule
  },
  
  startRace({ commit, state, rootGetters }) {
    console.log('Starting race - current lap:', state.currentLap)
    console.log('Race schedule length:', state.raceSchedule.length)
    
    if (state.currentLap >= state.raceSchedule.length) {
      console.log('No more races available')
      return false
    }
    
    const selectedHorses = rootGetters['horses/selectedHorses']
    console.log('Selected horses for race:', selectedHorses)
    
    commit('SET_RACING_STATUS', true)
    
    const currentRace = state.raceSchedule[state.currentLap]
    currentRace.participants = selectedHorses
    commit('SET_CURRENT_RACE', currentRace)
    
    console.log('Race started:', currentRace)
    return currentRace
  },
  
  pauseRace({ commit }) {
    commit('SET_RACING_STATUS', false)
  },
  
  completeRace({ commit, state }, result) {
    const currentRace = state.raceSchedule[state.currentLap]
    currentRace.status = 'completed'
    currentRace.result = result
    
    commit('ADD_RACE_RESULT', {
      lap: currentRace.lap,
      length: currentRace.length,
      result: result
    })
    
    commit('SET_CURRENT_LAP', state.currentLap + 1)
    commit('SET_RACING_STATUS', false)
    
    return currentRace
  }
}

const getters = {
  raceSchedule: state => state.raceSchedule,
  currentRace: state => state.currentRace,
  raceResults: state => state.raceResults,
  isRacing: state => state.isRacing,
  currentLap: state => state.currentLap,
  hasMoreRaces: state => state.currentLap < state.raceSchedule.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
