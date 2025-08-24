import { HORSE_NAMES, HORSE_COLORS, GAME_CONFIG } from './constants'

export function generateHorse(index) {
  const nameIndex = index % HORSE_NAMES.length
  const colorIndex = index % HORSE_COLORS.length
  
  return {
    id: `horse_${index + 1}`,
    name: HORSE_NAMES[nameIndex],
    color: HORSE_COLORS[colorIndex],
    condition: Math.floor(Math.random() * 100) + 1
  }
}

export function generateHorses() {
  const horses = []
  
  for (let i = 0; i < GAME_CONFIG.MAX_HORSES; i++) {
    const horse = generateHorse(i)
    horses.push(horse)
  }
  
  return horses
}

export function calculateHorseSpeed(horse) {
  const baseSpeed = horse.condition / 100
  const randomFactor = 0.5 + Math.random() * 0.5
  return baseSpeed * randomFactor
}
