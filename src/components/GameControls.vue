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
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'GameControls',
  
  setup() {
    const store = useStore()
    
    const isGenerating = computed(() => false) // Simplified since isLoading was removed
    const isRacing = computed(() => store.getters['races/isRacing'])
    const gameStatus = computed(() => store.getters['game/gameStatus'])
    const canStart = computed(() => store.getters['game/canStart'])
    const canPause = computed(() => store.getters['game/canPause'])
    
    const gameStatusText = computed(() => {
      const statusMap = {
        idle: 'Ready to Start',
        ready: 'Ready to Race',
        racing: 'Race in Progress',
        paused: 'Race Paused',
        finished: 'All Races Complete'
      }
      return statusMap[gameStatus.value] || 'Unknown'
    })
    
    const gameStatusClass = computed(() => {
      return `status-${gameStatus.value}`
    })
    
    const playGenerateSound = () => {
      // Create a preparation gong sound (shorter and softer)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Two oscillators for preparation sound
      const prep1 = audioContext.createOscillator()
      const prep2 = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()
      
      // Connect components
      prep1.connect(gainNode)
      prep2.connect(gainNode)
      gainNode.connect(filter)
      filter.connect(audioContext.destination)
      
      // Softer filter for preparation sound
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1500, audioContext.currentTime)
      filter.Q.setValueAtTime(0.8, audioContext.currentTime)
      
      // Softer frequencies
      prep1.frequency.setValueAtTime(300, audioContext.currentTime) // Medium frequency
      prep2.frequency.setValueAtTime(500, audioContext.currentTime) // Higher harmonic
      
      // Shorter, softer envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.03) // Quick attack
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8) // Medium decay
      
      // Start oscillators
      prep1.start(audioContext.currentTime)
      prep2.start(audioContext.currentTime)
      
      // Stop after 0.8 seconds
      prep1.stop(audioContext.currentTime + 0.8)
      prep2.stop(audioContext.currentTime + 0.8)
    }
    
    const generateProgram = async () => {
      try {
        // Play generate sound
        playGenerateSound()
        await store.dispatch('game/initializeGame')
      } catch (error) {
        console.error('Failed to generate program:', error)
      }
    }
    
    // Audio elements for sound effects
    const gongAudio = new Audio('/sounds/gong.mp3')
    const raceAudio = new Audio('/sounds/race.mp3')
    
    // Set race audio to loop
    raceAudio.loop = true
    
    const playStartSound = () => {
      // Play gong sound
      gongAudio.currentTime = 0
      gongAudio.play()
      
      // Start race background music after gong
      setTimeout(() => {
        raceAudio.currentTime = 0
        raceAudio.play()
      }, 1000) // 1 second delay after gong
    }
    
    const stopRaceMusic = () => {
      raceAudio.pause()
      raceAudio.currentTime = 0
    }
    
    const toggleRace = () => {
      if (isRacing.value) {
        // Pause race and stop background music
        raceAudio.pause()
        store.dispatch('game/pauseGame')
      } else {
        // Play start sound when starting race
        playStartSound()
        store.dispatch('game/startGame')
      }
    }
    
    // Game initialization is handled in App.vue
    
    return {
      isGenerating,
      isRacing,
      gameStatus,
      canStart,
      canPause,
      gameStatusText,
      gameStatusClass,
      generateProgram,
      toggleRace,
      playStartSound,
      playGenerateSound,
      stopRaceMusic
    }
  }
}
</script>

<style scoped>
.game-controls {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.controls-container {
  display: flex;
  gap: 0.75rem;
}

.control-btn {
  padding: 0.6rem 1.2rem;
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  position: relative;
  overflow: hidden;
}

.generate-btn {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 1px 3px rgba(99, 102, 241, 0.3);
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.start-btn {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 1px 3px rgba(16, 185, 129, 0.3);
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.pause-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 0 1px 3px rgba(245, 158, 11, 0.3);
}

.pause-btn:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.game-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 0.75rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.status-label {
  font-weight: 500;
  color: #6b7280;
}

.status-value {
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
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
