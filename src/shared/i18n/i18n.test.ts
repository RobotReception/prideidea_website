import ar from './locales/ar.json'
import en from './locales/en.json'
import { getDirection } from './config'

const keysOf = (obj: object, prefix = ''): string[] =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? keysOf(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )

describe('i18n', () => {
  it('has identical keys in every locale', () => {
    expect(keysOf(ar).sort()).toEqual(keysOf(en).sort())
  })

  it('resolves text direction', () => {
    expect(getDirection('ar')).toBe('rtl')
    expect(getDirection('en')).toBe('ltr')
  })
})
