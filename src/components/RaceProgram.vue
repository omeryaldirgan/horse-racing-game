<template>
  <div class="race-program">
    <h3 class="section-title">Program</h3>
    
    <div class="program-container">
      <div
        v-for="race in raceSchedule"
        :key="race.id"
        class="race-item"
        :class="getRaceStatusClass(race.status)"
      >
        <div class="race-header">
          <span class="lap-number">{{ race.lap }}{{ getOrdinalSuffix(race.lap) }} Lap</span>
          <span class="race-distance">- {{ race.length }}m</span>
        </div>
        
        <div class="race-participants" v-if="race.participants.length > 0">
          <table class="participants-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(horse, index) in race.participants"
                :key="horse.id"
                class="participant-row"
              >
                <td class="position">{{ index + 1 }}</td>
                <td class="horse-name">{{ horse.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="race-status" v-else>
          <span class="status-text">{{ race.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  name: "RaceProgram",
  
  setup() {
    const store = useStore()
    
    const raceSchedule = computed(() => store.getters["races/raceSchedule"])
    
    const getOrdinalSuffix = (num) => {
      const j = num % 10
      const k = num % 100
      if (j === 1 && k !== 11) return "ST"
      if (j === 2 && k !== 12) return "ND"
      if (j === 3 && k !== 13) return "RD"
      return "TH"
    }
    
    const getRaceStatusClass = (status) => {
      const statusMap = {
        pending: "status-pending",
        active: "status-active",
        completed: "status-completed"
      }
      return statusMap[status] || "status-pending"
    }
    
    return {
      raceSchedule,
      getOrdinalSuffix,
      getRaceStatusClass
    }
  }
}
</script>

<style scoped>
.race-program {
  margin-bottom: 2rem;
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

.program-container {
  max-height: 300px;
  overflow-y: auto;
}

.race-item {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.race-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.race-item.status-pending {
  border-left: 4px solid #6c757d;
}

.race-item.status-active {
  border-left: 4px solid #007bff;
  background: #e3f2fd;
}

.race-item.status-completed {
  border-left: 4px solid #28a745;
  background: #d4edda;
}

.race-header {
  background: #e9ecef;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
}

.lap-number {
  font-weight: 700;
  color: #2c3e50;
  font-size: 1rem;
}

.race-distance {
  font-weight: 600;
  color: #6c757d;
  font-size: 0.9rem;
}

.race-participants {
  padding: 1rem;
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.participants-table th {
  background: #f8f9fa;
  padding: 8px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
}

.participants-table td {
  padding: 8px;
  border-bottom: 1px solid #e9ecef;
}

.position {
  font-weight: 700;
  color: #007bff;
  width: 60px;
}

.horse-name {
  font-weight: 600;
  color: #2c3e50;
}

.race-status {
  padding: 1rem;
  text-align: center;
}

.status-text {
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .race-header {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
  
  .participants-table {
    font-size: 0.8rem;
  }
  
  .participants-table th,
  .participants-table td {
    padding: 6px 4px;
  }
}
</style>
