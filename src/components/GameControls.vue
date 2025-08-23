<template>
  <div class="game-controls">
    <div class="controls-container">
      <button
        @click="generateProgram"
        :disabled="isGenerating || isRacing"
        class="control-btn generate-btn"
      >
        GENERATE PROGRAM
      </button>
      
      <button
        @click="toggleRace"
        :disabled="!canStart && !canPause"
        class="control-btn start-btn"
        :class="{ 'pause-btn': isRacing }"
      >
        {{ isRacing ? "PAUSE" : "START" }}
      </button>
    </div>
    
    <div class="game-status">
      <span class="status-label">Status:</span>
      <span class="status-value" :class="gameStatusClass">
        {{ gameStatusText }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

export default {
  name: "GameControls",
  
  setup() {
    const store = useStore()
    
    const isGenerating = computed(() => store.getters.isLoading)
    const isRacing = computed(() => store.getters["races/isRacing"])
    const gameStatus = computed(() => store.getters["game/gameStatus"])
    const canStart = computed(() => store.getters["game/canStart"])
    const canPause = computed(() => store.getters["game/canPause"])
    
    const gameStatusText = computed(() => {
      const statusMap = {
        idle: "Ready to Start",
        ready: "Ready to Race",
        racing: "Race in Progress",
        paused: "Race Paused",
        finished: "All Races Complete"
      }
      return statusMap[gameStatus.value] || "Unknown"
    })
    
    const gameStatusClass = computed(() => {
      return `status-${gameStatus.value}`
    })
    
    const generateProgram = async () => {
      try {
        await store.dispatch("game/initializeGame")
      } catch (error) {
        console.error("Failed to generate program:", error)
      }
    }
    
    const toggleRace = () => {
      if (isRacing.value) {
        store.dispatch("game/pauseGame")
      } else {
        store.dispatch("game/startGame")
      }
    }
    
    onMounted(() => {
      store.dispatch("game/initializeGame")
    })
    
    return {
      isGenerating,
      isRacing,
      gameStatus,
      canStart,
      canPause,
      gameStatusText,
      gameStatusClass,
      generateProgram,
      toggleRace
    }
  }
}
</script>

<style scoped>
.game-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.controls-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.control-btn {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.generate-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.start-btn {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  color: white;
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(86, 171, 47, 0.4);
}

.pause-btn {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.pause-btn:hover:not(:disabled) {
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.game-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  font-size: 0.9rem;
}

.status-label {
  font-weight: 600;
  color: #666;
}

.status-value {
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.status-idle { background: #f8f9fa; color: #6c757d; }
.status-ready { background: #d4edda; color: #155724; }
.status-racing { background: #d1ecf1; color: #0c5460; }
.status-paused { background: #fff3cd; color: #856404; }
.status-finished { background: #d1e7dd; color: #0f5132; }

@media (max-width: 768px) {
  .controls-container {
    flex-direction: column;
    width: 100%;
  }
  
  .control-btn {
    width: 100%;
  }
}
</style>
