import { makeEmptyChild } from '../src/lib/initialValues'

describe('makeEmptyChild', () => {
  it('should return a child object with default values', () => {
    const child = makeEmptyChild()
    expect(child).toMatchObject({
      priezviskoMeno: '',
      rodneCislo: '',
      wholeYear: true,
      monthFrom: '0',
      monthTo: '11',
    })
  })

  it('should assign a numeric id', () => {
    const child = makeEmptyChild()
    expect(typeof child.id).toBe('number')
  })

  it('should increment id with each call', () => {
    const child1 = makeEmptyChild()
    const child2 = makeEmptyChild()
    expect(child2.id).toBe(child1.id + 1)
  })
})
