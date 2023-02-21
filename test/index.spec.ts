import { expect, it, describe } from 'vitest'
import { alias } from '../src/index'

describe('alias', () => {
  describe('entries is object', () => {
    it('should replace when match success', () => {
      const aliasObj: any = alias({
        entries: {
          '@': './utils'
        }
      })
      expect(aliasObj.resolveId('@/add')).toBe('./utils/add.js')
    })

    it('should not replace when match fail', () => {
      const aliasObj: any = alias({
        entries: {
          '@': './utils'
        }
      })
      expect(aliasObj.resolveId('!/add')).toBe('!/add')
    })
  })

  describe('entries is array', () => {
    it('should replace when match success', () => {
      const aliasObj: any = alias({
        entries: [
          { find: '@', replacement: './utils' },
          { find: '!', replacement: './page' }
        ]
      })
      expect(aliasObj.resolveId('@/add')).toBe('./utils/add.js')
      expect(aliasObj.resolveId('!/add')).toBe('./page/add.js')
    })

    it('should not replace when match fail', () => {
      const aliasObj: any = alias({
        entries: [{ find: '@', replacement: './utils' }]
      })
      expect(aliasObj.resolveId('!/add')).toBe('!/add')
    })

    it('should replace when find is regexp match success', () => {
      const aliasObj: any = alias({
        entries: [{ find: /^(.*)\.js$/, replacement: '$1.alias' }]
      })
      expect(aliasObj.resolveId('add.js')).toBe('add.alias.js')
    })
  })
})
