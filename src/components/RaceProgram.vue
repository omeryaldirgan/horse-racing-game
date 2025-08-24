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
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'RaceProgram',
  
  setup() {
    const store = useStore()
    
    const raceSchedule = computed(() => store.getters['races/raceSchedule'])
    
    const getOrdinalSuffix = (num) => {
      const j = num % 10
      const k = num % 100
      if (j === 1 && k !== 11) return 'ST'
      if (j === 2 && k !== 12) return 'ND'
      if (j === 3 && k !== 13) return 'RD'
      return 'TH'
    }
    
    const getRaceStatusClass = (status) => {
      const statusMap = {
        pending: 'status-pending',
        active: 'status-active',
        completed: 'status-completed'
      }
      return statusMap[status] || 'status-pending'
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
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-align: left;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.program-container {
  max-height: 260px;
  overflow-y: auto;
}

.race-item {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.race-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.08);
}

.race-item.status-pending {
  border-left: 3px solid #d1d5db;
}

.race-item.status-active {
  border-left: 3px solid #3b82f6;
  background: rgba(59, 130, 246, 0.01);
}

.race-item.status-completed {
  border-left: 3px solid #10b981;
  background: rgba(16, 185, 129, 0.01);
}

.race-header {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.lap-number {
  font-weight: 600;
  color: #374151;
  font-size: 0.85rem;
}

.race-distance {
  font-weight: 500;
  color: #6b7280;
  font-size: 0.75rem;
}

.race-participants {
  padding: 0.75rem;
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.participants-table th {
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

.participants-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: none;
  background: transparent;
}

.participants-table tr:hover {
  background: rgba(0, 0, 0, 0.02);
}

.position {
  font-weight: 600;
  color: #3b82f6;
  width: 45px;
  font-size: 0.75rem;
}

.horse-name {
  font-weight: 500;
  color: #374151;
  font-size: 0.75rem;
}

.race-status {
  padding: 0.75rem;
  text-align: center;
}

.status-text {
  font-weight: 500;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 0.7rem;
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
