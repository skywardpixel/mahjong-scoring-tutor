import { describe, it, expect, vi } from 'vitest'
import { generateRandomHand, calculateScore } from '../handGenerator'

describe('handGenerator', () => {
  describe('generateRandomHand', () => {
    it('should generate a valid hand structure', () => {
      const hand = generateRandomHand()
      
      expect(hand).toHaveProperty('hand')
      expect(hand).toHaveProperty('condition')
      expect(hand).toHaveProperty('yaku')
      expect(hand).toHaveProperty('han')
      expect(hand).toHaveProperty('fu')
      expect(hand).toHaveProperty('basePoints')
      expect(hand).toHaveProperty('answer')
    })

    it('should generate valid fu values', () => {
      const hand = generateRandomHand()
      
      expect(hand.fu).toBeGreaterThanOrEqual(30)
      expect(hand.fu % 10).toBe(0) // Fu should be rounded to nearest 10
    })

    it('should generate valid han values', () => {
      const hand = generateRandomHand()
      
      expect(hand.han).toBeGreaterThanOrEqual(1)
      expect(hand.han).toBeLessThanOrEqual(13)
    })

    it('should generate valid base points', () => {
      const hand = generateRandomHand()
      
      const expectedBasePoints = hand.fu * Math.pow(2, hand.han)
      expect(hand.basePoints).toBe(expectedBasePoints)
    })

    it('should have consistent answer values', () => {
      const hand = generateRandomHand()
      
      expect(hand.answer.fu).toBe(hand.fu)
      expect(hand.answer.han).toBe(hand.han)
      expect(hand.answer.basePoints).toBe(hand.basePoints)
    })

    it('should generate valid yaku array', () => {
      const hand = generateRandomHand()
      
      expect(Array.isArray(hand.yaku)).toBe(true)
      expect(hand.yaku.length).toBeGreaterThanOrEqual(1)
    })

    it('should generate valid win conditions', () => {
      const hand = generateRandomHand()
      
      expect(['ron', 'tsumo']).toContain(hand.condition.win)
      expect(typeof hand.condition.dealer).toBe('boolean')
      expect(typeof hand.condition.riichi).toBe('number')
      expect(hand.condition.riichi).toBeGreaterThanOrEqual(0)
    })

    it('should generate hands with proper tile display format', () => {
      const hand = generateRandomHand()
      
      expect(typeof hand.hand.tiles).toBe('string')
      expect(hand.hand.tiles.length).toBeGreaterThan(0)
    })
  })

  describe('calculateScore', () => {
    it('should calculate ron scores correctly for non-dealer', () => {
      const score = calculateScore(30, 1, false, true)
      expect(score).toBe(240) // 30 * 2^1 * 4
    })

    it('should calculate ron scores correctly for dealer', () => {
      const score = calculateScore(30, 1, true, true)
      expect(score).toBe(360) // 30 * 2^1 * 6
    })

    it('should calculate tsumo scores correctly for non-dealer', () => {
      const score = calculateScore(30, 1, false, false)
      
      expect(score).toHaveProperty('fromDealer')
      expect(score).toHaveProperty('fromNonDealer')
      expect(score).toHaveProperty('total')
      expect(score.fromDealer).toBe(120) // 30 * 2^1 * 2
      expect(score.fromNonDealer).toBe(60) // 30 * 2^1 * 1
      expect(score.total).toBe(240) // 120 + 60 + 60
    })

    it('should calculate tsumo scores correctly for dealer', () => {
      const score = calculateScore(30, 1, true, false)
      expect(score).toBe(120) // 30 * 2^1 * 2 (each non-dealer pays this)
    })

    it('should handle higher fu and han values', () => {
      const score = calculateScore(60, 3, false, true)
      expect(score).toBe(1920) // 60 * 2^3 * 4 = 60 * 8 * 4
    })
  })
})