import { expect, it, describe } from 'vitest'
import { alias } from '../src/index'

describe('alias', () => {
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
