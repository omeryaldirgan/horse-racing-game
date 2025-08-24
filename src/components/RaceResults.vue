<template>
  <div class="race-results">
    <h3 class="section-title">Results</h3>
      
    <div class="results-container">
      <div
        v-for="result in raceResults"
        :key="result.lap"
        class="result-item"
      >
        <div class="result-header">
          <span class="lap-number">{{ result.lap }}{{ getOrdinalSuffix(result.lap) }} Lap</span>
          <span class="race-distance">- {{ result.length }}m</span>
        </div>
        
        <div class="result-content">
          <table class="results-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(horse, index) in result.result"
                :key="horse.id"
                class="result-row"
                :class="getPositionClass(index + 1)"
              >
                <td class="position">
                  <span class="position-badge" v-if="index + 1 > 3">{{ index + 1 }}</span>
                  <span class="position-badge trophy" v-else-if="index + 1 === 1">🏆</span>
                  <span class="position-badge medal" v-else-if="index + 1 === 2">🥈</span>
                  <span class="position-badge medal" v-else-if="index + 1 === 3">🥉</span>
                </td>
                <td class="horse-name">{{ horse.name }}</td>
                <td class="horse-time">{{ formatTime(horse.time) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div v-if="raceResults.length === 0" class="no-results">
        <p class="no-results-text">No race results yet</p>
        <p class="no-results-subtext">Complete races to see results here</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'RaceResults',
  
  setup() {
    const store = useStore()
    
    const raceResults = computed(() => store.getters['races/raceResults'])
    const currentLap = computed(() => store.getters['races/currentLap'])
    const gameStatus = computed(() => store.getters['game/gameStatus'])
    
    const getOrdinalSuffix = (num) => {
      const j = num % 10
      const k = num % 100
      if (j === 1 && k !== 11) return 'ST'
      if (j === 2 && k !== 12) return 'ND'
      if (j === 3 && k !== 13) return 'RD'
      return 'TH'
    }
    
    const getPositionClass = (position) => {
      if (position === 1) return 'position-first'
      if (position === 2) return 'position-second'
      if (position === 3) return 'position-third'
      return 'position-other'
    }
    
    const formatTime = (time) => {
      if (!time) return 'N/A'
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      const milliseconds = Math.floor((time % 1) * 100)
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }
    
    return {
      raceResults,
      currentLap,
      gameStatus,
      getOrdinalSuffix,
      getPositionClass,
      formatTime
    }
  }
}
</script>

<style scoped>
.race-results {
  margin-top: 1.5rem;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.875rem;
  text-align: left;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.results-container {
  max-height: 260px;
  overflow-y: auto;
}

.result-item {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.result-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.08);
}

.result-header {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  color: #065f46;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.lap-number {
  font-weight: 600;
  font-size: 0.85rem;
}

.race-distance {
  font-weight: 500;
  font-size: 0.75rem;
  opacity: 0.8;
}

.result-content {
  padding: 0.75rem;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.results-table th {
  background: transparent;
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.results-table th:last-child {
  text-align: right;
}

.results-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: none;
  background: transparent;
}

.results-table tr:hover {
  background: rgba(0, 0, 0, 0.02);
}

.position {
  width: 50px;
  text-align: center;
}

.position-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #9ca3af;
  color: white;
  text-align: center;
  line-height: 24px;
  font-weight: 600;
  font-size: 0.7rem;
}

.position-badge.trophy {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: #92400e;
  font-size: 1rem;
  width: 28px;
  height: 28px;
  line-height: 28px;
}

.position-badge.medal {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  color: #ffffff;
  font-size: 0.9rem;
  width: 26px;
  height: 26px;
  line-height: 26px;
}

.position-first .position-badge {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: #92400e;
}

.position-second .position-badge {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  color: #ffffff;
}

.position-third .position-badge {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  color: #ffffff;
}

.horse-name {
  font-weight: 500;
  color: #374151;
  font-size: 0.75rem;
}

.horse-time {
  font-weight: 500;
  color: #374151;
  font-size: 0.75rem;
  text-align: right;
}

.no-results {
  text-align: center;
  padding: 1.5rem 1rem;
  color: #9ca3af;
}

.no-results-text {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.no-results-subtext {
  font-size: 0.75rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .result-header {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
  
  .results-table {
    font-size: 0.8rem;
  }
  
  .results-table th,
  .results-table td {
    padding: 6px 4px;
  }
}
</style>
