<template>
  <div id="app" class="horse-racing-game">
    <header class="game-header">
      <h1>Horse Racing Game Trial Day</h1>
      <GameControls />
    </header>
    
    <main class="game-main">
      <div class="game-layout">
        <aside class="horse-list-panel">
          <HorseList />
        </aside>
        
        <section class="race-track-panel">
          <RaceTrack />
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
import GameControls from "@/components/GameControls.vue"
import HorseList from "@/components/HorseList.vue"
import RaceTrack from "@/components/RaceTrack.vue"
import RaceProgram from "@/components/RaceProgram.vue"
import RaceResults from "@/components/RaceResults.vue"

export default {
  name: "App",
  components: {
    GameControls,
    HorseList,
    RaceTrack,
    RaceProgram,
    RaceResults
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.horse-racing-game {
  min-height: 100vh;
  color: #333;
}

.game-header {
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.game-header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.game-main {
  padding: 2rem;
}

.game-layout {
  display: grid;
  grid-template-columns: 300px 1fr 350px;
  gap: 2rem;
  max-width: 1400px;
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
