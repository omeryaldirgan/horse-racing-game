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
                  <span class="position-badge">{{ index + 1 }}</span>
                </td>
                <td class="horse-name">{{ horse.name }}</td>
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
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  name: "RaceResults",
  
  setup() {
    const store = useStore()
    
    const raceResults = computed(() => store.getters["races/raceResults"])
    
    const getOrdinalSuffix = (num) => {
      const j = num % 10
      const k = num % 100
      if (j === 1 && k !== 11) return "ST"
      if (j === 2 && k !== 12) return "ND"
      if (j === 3 && k !== 13) return "RD"
      return "TH"
    }
    
    const getPositionClass = (position) => {
      if (position === 1) return "position-first"
      if (position === 2) return "position-second"
      if (position === 3) return "position-third"
      return "position-other"
    }
    
    return {
      raceResults,
      getOrdinalSuffix,
      getPositionClass
    }
  }
}
</script>

<style scoped>
.race-results {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.results-container {
  max-height: 300px;
  overflow-y: auto;
}

.result-item {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.result-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.result-header {
  background: #28a745;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
}

.lap-number {
  font-weight: 700;
  font-size: 1rem;
}

.race-distance {
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.9;
}

.result-content {
  padding: 1rem;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.results-table th {
  background: #f8f9fa;
  padding: 8px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
}

.results-table td {
  padding: 8px;
  border-bottom: 1px solid #e9ecef;
}

.position {
  width: 60px;
}

.position-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #6c757d;
  color: white;
  text-align: center;
  line-height: 24px;
  font-weight: 700;
  font-size: 0.8rem;
}

.position-first .position-badge {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #856404;
}

.position-second .position-badge {
  background: linear-gradient(135deg, #c0c0c0 0%, #e9ecef 100%);
  color: #495057;
}

.position-third .position-badge {
  background: linear-gradient(135deg, #cd7f32 0%, #d4a574 100%);
  color: #8b4513;
}

.horse-name {
  font-weight: 600;
  color: #2c3e50;
}

.no-results {
  text-align: center;
  padding: 2rem 1rem;
  color: #6c757d;
}

.no-results-text {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.no-results-subtext {
  font-size: 0.9rem;
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
