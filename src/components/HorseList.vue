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
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  name: "HorseList",
  
  setup() {
    const store = useStore()
    
    const horses = computed(() => store.getters["horses/allHorses"])
    const selectedHorses = computed(() => store.getters["horses/selectedHorses"])
    const horsesCount = computed(() => store.getters["horses/horsesCount"])
    const selectedHorsesCount = computed(() => store.getters["horses/selectedHorsesCount"])
    
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.horse-table-container {
  flex: 1;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.horse-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.horse-table th {
  background: #f8f9fa;
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  position: sticky;
  top: 0;
  z-index: 10;
}

.horse-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e9ecef;
  vertical-align: middle;
}

.horse-row {
  transition: background-color 0.2s ease;
}

.horse-row:hover {
  background-color: #f8f9fa;
}

.horse-row.selected {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.horse-name {
  font-weight: 600;
  color: #2c3e50;
}

.horse-condition {
  width: 120px;
}

.condition-bar {
  position: relative;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.condition-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 10px;
}

.condition-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.horse-color {
  width: 60px;
  text-align: center;
}

.color-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.horse-stats {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-top: 2px solid #e9ecef;
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
  font-weight: 600;
  color: #6c757d;
}

.stat-value {
  font-weight: 700;
  color: #2c3e50;
  background: #e9ecef;
  padding: 4px 8px;
  border-radius: 4px;
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
