import { generateHorse, generateHorses, calculateHorseSpeed } from '@/utils/horseGenerator'
import { GAME_CONFIG } from '@/utils/constants'

describe('Horse Generator', () => {
  describe('generateHorse', () => {
    it('should generate a horse with required properties', () => {
      const horse = generateHorse()
      
      expect(horse).toHaveProperty('id')
      expect(horse).toHaveProperty('name')
      expect(horse).toHaveProperty('color')
      expect(horse).toHaveProperty('condition')
      expect(typeof horse.id).toBe('number')
      expect(typeof horse.name).toBe('string')
      expect(typeof horse.color).toBe('string')
      expect(typeof horse.condition).toBe('number')
    })
    
    it('should generate horse with condition between 1 and 100', () => {
      const horse = generateHorse()
      
      expect(horse.condition).toBeGreaterThanOrEqual(1)
      expect(horse.condition).toBeLessThanOrEqual(100)
    })
  })
  
  describe('generateHorses', () => {
    it('should generate horses within the specified range', () => {
      const horses = generateHorses()
      
      expect(horses.length).toBeGreaterThanOrEqual(GAME_CONFIG.MIN_HORSES)
      expect(horses.length).toBeLessThanOrEqual(GAME_CONFIG.MAX_HORSES)
    })
    
    it('should generate horses with unique names and colors', () => {
      const horses = generateHorses()
      const names = horses.map(h => h.name)
      const colors = horses.map(h => h.color)
      
      expect(new Set(names).size).toBe(names.length)
      expect(new Set(colors).size).toBe(colors.length)
    })
  })
  
  describe('calculateHorseSpeed', () => {
    it('should calculate speed based on horse condition', () => {
      const horse = { condition: 80 }
      const speed = calculateHorseSpeed(horse)
      
      expect(speed).toBeGreaterThan(0)
      expect(speed).toBeLessThanOrEqual(1)
    })
    
    it('should return different speeds for same horse on multiple calls', () => {
      const horse = { condition: 50 }
      const speed1 = calculateHorseSpeed(horse)
      const speed2 = calculateHorseSpeed(horse)
      
      expect(speed1).not.toBe(speed2)
    })
  })
})
