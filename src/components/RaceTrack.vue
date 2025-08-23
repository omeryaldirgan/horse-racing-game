<template>
  <div class="race-track">
    <h2 class="panel-title">Race Track</h2>
    
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
          <span class="finish-text">FINISH</span>
        </div>
      </div>
    </div>
    
    <div class="race-progress" v-if="isRacing">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: raceProgress + '%' }"
        ></div>
      </div>
      <span class="progress-text">{{ Math.round(raceProgress) }}%</span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { useStore } from "vuex"

export default {
  name: "RaceTrack",
  
  setup() {
    const store = useStore()
    const raceProgress = ref(0)
    const animationInterval = ref(null)
    
    const isRacing = computed(() => store.getters["races/isRacing"])
    const currentRace = computed(() => store.getters["races/currentRace"])
    const selectedHorses = computed(() => store.getters["horses/selectedHorses"])
    const currentLap = computed(() => store.getters["races/currentLap"])
    
    const currentLapText = computed(() => {
      if (!currentRace.value) return "No Race"
      return `${currentRace.value.lap}${getOrdinalSuffix(currentRace.value.lap)} Lap`
    })
    
    const currentDistance = computed(() => {
      return currentRace.value ? currentRace.value.length : 0
    })
    
    const getOrdinalSuffix = (num) => {
      const j = num % 10
      const k = num % 100
      if (j === 1 && k !== 11) return "ST"
      if (j === 2 && k !== 12) return "ND"
      if (j === 3 && k !== 13) return "RD"
      return "TH"
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
      
      // Calculate individual horse progress based on condition
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
        raceProgress.value += 0.5 // Slower increment for smoother animation
        if (raceProgress.value >= 100) {
          clearInterval(animationInterval.value)
          // Race completed - find the winner based on actual progress
          const winner = findRaceWinner()
          store.dispatch("races/completeRace", {
            participants: selectedHorses.value,
            winner: winner
          })
        }
      }, 50) // Faster updates for smoother animation
    }
    
    const findRaceWinner = () => {
      // Find horse with highest progress based on condition
      let winner = selectedHorses.value[0]
      let maxProgress = 0
      
      selectedHorses.value.forEach(horse => {
        const horseProgress = Math.min(raceProgress.value * (horse.condition / 100), 100)
        if (horseProgress > maxProgress) {
          maxProgress = horseProgress
          winner = horse
        }
      })
      
      return winner
    }
    
    const stopRaceAnimation = () => {
      if (animationInterval.value) {
        clearInterval(animationInterval.value)
        animationInterval.value = null
      }
    }
    
    onMounted(() => {
      // Initialize race progress
    })
    
    onUnmounted(() => {
      stopRaceAnimation()
    })
    
    // Watch for race status changes
    watch(isRacing, (newValue) => {
      console.log("Race status changed:", newValue)
      if (newValue) {
        console.log("Starting race animation")
        startRaceAnimation()
      } else {
        console.log("Stopping race animation")
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
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.track-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.track-lanes {
  flex: 1;
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
  border-radius: 8px 0 0 8px;
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
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-top: 2px solid #e9ecef;
}

.lap-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.lap-text {
  font-weight: 700;
  color: #2c3e50;
  font-size: 1.1rem;
}

.distance-text {
  font-weight: 600;
  color: #6c757d;
  font-size: 0.9rem;
}

.finish-line {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.race-progress {
  margin-top: 1rem;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  transition: width 0.1s linear;
  border-radius: 10px;
}

.progress-text {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
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
