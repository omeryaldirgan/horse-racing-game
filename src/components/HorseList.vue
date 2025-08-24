<template>
  <div class="horse-list">
    <h2 class="panel-title">Horse List ({{ horsesCount }})</h2>
    
    <!-- Debug info -->
    <div v-if="horses.length === 0" class="debug-info">
      <p style="color: red; font-weight: bold;">No horses found! Debug info:</p>
      <p>Horses count: {{ horsesCount }}</p>
      <p>Horses array length: {{ horses.length }}</p>
    </div>
    
    <div class="horse-table-container">
      <table class="horse-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="horses.length === 0">
            <td colspan="3" style="text-align: center; padding: 2rem; color: #666;">
              No horses available. Click "GENERATE PROGRAM" to create horses.
            </td>
          </tr>
          <tr
            v-for="horse in horses"
            :key="horse.id"
            class="horse-row"
            :class="{ 'selected': isHorseSelected(horse.id) }"
          >
            <td class="horse-name">{{ horse.name }}</td>
            <td class="horse-condition">
              <div class="condition-bar">
                <div
                  class="condition-fill"
                  :style="{ width: horse.condition + '%', backgroundColor: horse.color }"
                ></div>
                <span class="condition-text">{{ horse.condition }}</span>
              </div>
            </td>
            <td class="horse-color">
              <div
                class="color-indicator"
                :style="{ backgroundColor: horse.color }"
                :title="horse.color"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="horse-stats">
      <div class="stat-item">
        <span class="stat-label">Total Horses:</span>
        <span class="stat-value">{{ horsesCount }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Selected:</span>
        <span class="stat-value">{{ selectedHorsesCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HorseList',
  
  setup() {
    const store = useStore()
    
    const horses = computed(() => store.getters['horses/allHorses'])
    const selectedHorses = computed(() => store.getters['horses/selectedHorses'])
    const horsesCount = computed(() => store.getters['horses/horsesCount'])
    const selectedHorsesCount = computed(() => store.getters['horses/selectedHorsesCount'])
    
    const isHorseSelected = (horseId) => {
      return selectedHorses.value.some(horse => horse.id === horseId)
    }
    
    return {
      horses,
      selectedHorses,
      horsesCount,
      selectedHorsesCount,
      isHorseSelected
    }
  }
}
</script>

<style scoped>
.horse-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.2rem;
  text-align: left;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.horse-table-container {
  flex: 1;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.horse-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.horse-table th {
  background: rgba(248, 250, 252, 0.8);
  padding: 0.75rem 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 10;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.horse-table td {
  padding: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  vertical-align: middle;
}

.horse-row {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.horse-row:hover {
  background-color: rgba(248, 250, 252, 0.6);
}

.horse-row.selected {
  background-color: rgba(59, 130, 246, 0.05);
  border-left: 3px solid #3b82f6;
}

.horse-name {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.85rem;
}

.horse-condition {
  width: 100px;
}

.condition-bar {
  position: relative;
  height: 18px;
  background: rgba(0, 0, 0, 0.06);
  border-radius: 9px;
  overflow: hidden;
}

.condition-fill {
  height: 100%;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 9px;
}

.condition-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.horse-color {
  width: 50px;
  text-align: center;
}

.color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.horse-stats {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stat-item:last-child {
  margin-bottom: 0;
}

.stat-label {
  font-weight: 500;
  color: #6b7280;
  font-size: 0.8rem;
}

.stat-value {
  font-weight: 600;
  color: #1a1a1a;
  background: rgba(0, 0, 0, 0.06);
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .horse-table th,
  .horse-table td {
    padding: 8px 4px;
    font-size: 0.8rem;
  }
  
  .condition-bar {
    width: 80px;
  }
}
</style>
