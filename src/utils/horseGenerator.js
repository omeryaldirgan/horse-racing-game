import { HORSE_NAMES, HORSE_COLORS, GAME_CONFIG } from "./constants"

/**
 * Generates a random horse with unique properties
 * @returns {Object} Horse object with id, name, color, and condition
 */
export function generateHorse() {
  const randomNameIndex = Math.floor(Math.random() * HORSE_NAMES.length)
  const randomColorIndex = Math.floor(Math.random() * HORSE_COLORS.length)
  
  return {
    id: Date.now() + Math.random(),
    name: HORSE_NAMES[randomNameIndex],
    color: HORSE_COLORS[randomColorIndex],
    condition: Math.floor(Math.random() * 100) + 1
  }
}

/**
 * Generates a list of horses between MIN_HORSES and MAX_HORSES
 * @returns {Array} Array of horse objects
 */
export function generateHorses() {
  const horses = []
  const usedNames = new Set()
  const usedColors = new Set()
  
  // Generate exactly 20 horses
  for (let i = 0; i < GAME_CONFIG.MAX_HORSES; i++) {
    let horse
    let attempts = 0
    const maxAttempts = 100
    
    do {
      horse = generateHorse()
      attempts++
    } while (
      (usedNames.has(horse.name) || usedColors.has(horse.color)) && 
      attempts < maxAttempts
    )
    
    if (attempts < maxAttempts) {
      usedNames.add(horse.name)
      usedColors.add(horse.color)
      horses.push(horse)
    }
  }
  
  return horses
}

/**
 * Calculates horse speed based on condition and random factor
 * @param {Object} horse - Horse object
 * @returns {number} Speed value
 */
export function calculateHorseSpeed(horse) {
  const baseSpeed = horse.condition / 100
  const randomFactor = 0.5 + Math.random() * 0.5
  return baseSpeed * randomFactor
}
