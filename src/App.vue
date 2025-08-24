<template>
  <div id="app" class="horse-racing-game">
    <header class="game-header">
      <h1>Horse Racing Game Trial Day</h1>
      <GameControls ref="gameControls" />
    </header>
    
    <main class="game-main">
      <div class="game-layout">
        <aside class="horse-list-panel">
          <HorseList />
        </aside>
        
        <section class="race-track-panel">
          <RaceTrack @race-completed="onRaceCompleted" />
        </section>
        
        <aside class="race-info-panel">
          <RaceProgram />
          <RaceResults />
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import GameControls from '@/components/GameControls.vue'
import HorseList from '@/components/HorseList.vue'
import RaceTrack from '@/components/RaceTrack.vue'
import RaceProgram from '@/components/RaceProgram.vue'
import RaceResults from '@/components/RaceResults.vue'

export default {
  name: 'App',
  components: {
    GameControls,
    HorseList,
    RaceTrack,
    RaceProgram,
    RaceResults
  },
  
  async mounted() {
    await this.$store.dispatch('game/initializeGame')
  },
  
  methods: {
    onRaceCompleted() {
      this.$refs.gameControls.stopRaceMusic()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
}

.horse-racing-game {
  min-height: 100vh;
  color: #333;
}

.game-header {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  padding: 1rem 2.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.game-header h1 {
  color: #1a1a1a;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.02em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.game-main {
  padding: 2rem;
}

.game-layout {
  display: grid;
  grid-template-columns: 300px 1fr 350px;
  gap: 2rem;
  margin: 0 auto;
  min-height: 80vh;
}

.horse-list-panel,
.race-info-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.race-track-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1200px) {
  .game-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .horse-list-panel,
  .race-info-panel {
    order: 2;
  }
  
  .race-track-panel {
    order: 1;
  }
}
</style>
