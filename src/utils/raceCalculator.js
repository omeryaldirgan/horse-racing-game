import { calculateHorseSpeed } from './horseGenerator'

/**
 * Simulates a race and returns results
 * @param {Array} horses - Array of participating horses
 * @param {number} raceLength - Length of the race in meters
 * @returns {Array} Array of horses with positions and times
 */
export function simulateRace(horses, raceLength) {
  const raceResults = horses.map(horse => ({
    ...horse,
    speed: calculateHorseSpeed(horse),
    time: 0,
    position: 0,
    progress: 0
  }))
  
  // Simulate race progression
  const maxTime = 120 // Maximum time in seconds
  const timeStep = 0.1 // Time increment in seconds
  
  for (let time = 0; time <= maxTime; time += timeStep) {
    raceResults.forEach(horse => {
      if (horse.progress < raceLength) {
        // Calculate distance covered based on speed and time
        const distance = (horse.speed * raceLength * time) / maxTime
        horse.progress = Math.min(distance, raceLength)
        horse.time = time
      }
    })
    
    // Check if all horses have finished
    if (raceResults.every(horse => horse.progress >= raceLength)) {
      break
    }
  }
  
  // Sort by finish time and assign positions
  raceResults.sort((a, b) => a.time - b.time)
  raceResults.forEach((horse, index) => {
    horse.position = index + 1
  })
  
  return raceResults
}

/**
 * Calculates race statistics
 * @param {Array} raceResults - Results from a race
 * @returns {Object} Race statistics
 */
export function calculateRaceStats(raceResults) {
  const totalTime = raceResults.reduce((sum, horse) => sum + horse.time, 0)
  const avgTime = totalTime / raceResults.length
  
  const fastestHorse = raceResults[0]
  const slowestHorse = raceResults[raceResults.length - 1]
  
  return {
    totalTime,
    averageTime: avgTime,
    fastestHorse: fastestHorse.name,
    slowestHorse: slowestHorse.name,
    timeDifference: slowestHorse.time - fastestHorse.time
  }
}
