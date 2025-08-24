import { HORSE_NAMES, HORSE_COLORS, GAME_CONFIG } from './constants'

/**
 * Generates a random horse with unique properties
 * @returns {Object} Horse object with id, name, color, and condition
 */
export function generateHorse(index) {
  // Use index to ensure consistent horses
  const nameIndex = index % HORSE_NAMES.length
  const colorIndex = index % HORSE_COLORS.length
  
  return {
    id: `horse_${index + 1}`,
    name: HORSE_NAMES[nameIndex],
    color: HORSE_COLORS[colorIndex],
    condition: Math.floor(Math.random() * 100) + 1
  }
}

/**
 * Generates a list of horses between MIN_HORSES and MAX_HORSES
 * @returns {Array} Array of horse objects
 */
export function generateHorses() {
  const horses = []
  
  // Generate exactly 20 horses with consistent properties
  for (let i = 0; i < GAME_CONFIG.MAX_HORSES; i++) {
    const horse = generateHorse(i)
    horses.push(horse)
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
