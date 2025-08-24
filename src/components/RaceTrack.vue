<template>
  <div class="race-track">
    <h2 class="panel-title" :class="{ 'racing': isRacing }">Race Track</h2>
    
    <div class="track-container">
      <div class="track-lanes">
        <div
          v-for="lane in 10"
          :key="lane"
          class="track-lane"
          :class="{ 'active': isRacing }"
        >
          <div class="lane-number">{{ lane }}</div>
          <div class="lane-track">
            <div class="lane-dashes"></div>
            <div
              v-if="getHorseInLane(lane)"
              class="horse-silhouette"
              :style="getHorseStyle(lane)"
            >
              🐎
            </div>
          </div>
        </div>
      </div>
      
      <div class="track-info">
        <div class="lap-info">
          <span class="lap-text">{{ currentLapText }}</span>
          <span class="distance-text">{{ currentDistance }}m</span>
        </div>
        
        <div class="finish-line">
          <span class="finish-icon">🏁</span>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import { computed, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'RaceTrack',
  
  emits: ['race-completed'],
  
  setup(props, { emit }) {
    const store = useStore()
    const raceProgress = ref(0)
    const animationInterval = ref(null)
    
    const isRacing = computed(() => store.getters['races/isRacing'])
    const currentRace = computed(() => store.getters['races/currentRace'])
    const selectedHorses = computed(() => store.getters['horses/selectedHorses'])
    const currentLap = computed(() => store.getters['races/currentLap'])
    
    const currentLapText = computed(() => {
      if (!currentRace.value) return 'No Race'
      return `${currentRace.value.lap}${getOrdinalSuffix(currentRace.value.lap)} Lap`
    })
    
    const currentDistance = computed(() => {
      return currentRace.value ? currentRace.value.length : 0
    })
    
    const getOrdinalSuffix = (num) => {
      const j = num % 10
      const k = num % 100
      if (j === 1 && k !== 11) return 'ST'
      if (j === 2 && k !== 12) return 'ND'
      if (j === 3 && k !== 13) return 'RD'
      return 'TH'
    }
    
    const getHorseInLane = (lane) => {
      if (selectedHorses.value.length >= lane) {
        return selectedHorses.value[lane - 1]
      }
      return null
    }
    
    const getHorseStyle = (lane) => {
      const horse = getHorseInLane(lane)
      if (!horse) return {}
      
      const horseSpeed = horse.condition / 100
      const horseProgress = isRacing.value ? 
        Math.min(raceProgress.value * horseSpeed, 100) : 0
      
      return {
        color: horse.color,
        left: `${horseProgress}%`
      }
    }
    
    const startRaceAnimation = () => {
      raceProgress.value = 0
      animationInterval.value = setInterval(() => {
        raceProgress.value += 0.5
        if (raceProgress.value >= 100) {
          clearInterval(animationInterval.value)
          const raceResults = findRaceWinner()
          store.dispatch('races/completeRace', raceResults)
          
          emit('race-completed')
        }
      }, 50)
    }
    
    const findRaceWinner = () => {
      const horsesWithResults = selectedHorses.value.map(horse => {
        const baseTime = currentDistance.value / (horse.condition * 0.1)
        const randomFactor = 0.8 + Math.random() * 0.4
        const finalTime = baseTime * randomFactor
        
        return {
          ...horse,
          time: finalTime
        }
      })
      
      return horsesWithResults.sort((a, b) => a.time - b.time)
    }
    
    const stopRaceAnimation = () => {
      if (animationInterval.value) {
        clearInterval(animationInterval.value)
        animationInterval.value = null
      }
    }
    
    onUnmounted(() => {
      stopRaceAnimation()
    })
    
    watch(isRacing, (newValue) => {
      if (newValue) {
        startRaceAnimation()
      } else {
        stopRaceAnimation()
      }
    })
    
    return {
      isRacing,
      currentRace,
      selectedHorses,
      currentLap,
      currentLapText,
      currentDistance,
      raceProgress,
      getHorseInLane,
      getHorseStyle,
      findRaceWinner
    }
  }
}
</script>

<style scoped>
.race-track {
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
  padding-bottom: 0.5rem;
  position: relative;
}

.panel-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  background: #e9ecef;
  transition: width 0.3s ease;
  width: 100%;
}

.panel-title.racing::after {
  background: linear-gradient(90deg, #3b82f6 0%, #10b981 50%, #f59e0b 100%);
  width: v-bind(raceProgress + '%');
  transition: width 0.1s linear;
}

.track-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.track-lanes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.track-lane {
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.track-lane.active {
  background: #e3f2fd;
  border-color: #2196f3;
}

.lane-number {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6c757d;
  color: white;
  font-weight: 700;
  border-radius: 8px 8px 0 0;
  transform: rotate(270deg);
  font-size: 0.9rem;
}

.lane-track {
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.lane-dashes {
  height: 100%;
  background-image: repeating-linear-gradient(
    to right,
    transparent,
    transparent 20px,
    #dee2e6 20px,
    #dee2e6 40px
  );
}

.horse-silhouette {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scaleX(-1);
  font-size: 24px;
  transition: left 0.1s linear;
  z-index: 10;
}





.track-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.track-info:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.lap-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.lap-text {
  font-weight: 700;
  color: #1a202c;
  font-size: 1.1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.distance-text {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
  opacity: 0.9;
}

.finish-line {
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.finish-icon {
  font-size: 1.8rem;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.finish-line:hover {
  transform: scale(1.1);
}



@media (max-width: 768px) {
  .track-lane {
    height: 30px;
  }
  
  .lane-number {
    width: 30px;
    font-size: 0.8rem;
  }
  
  .horse-silhouette {
    font-size: 18px;
  }
}
</style>
