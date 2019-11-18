const x = true
const a = {}
const b = {}

describe('Verificar que la varaible es true', () => {
  it('x es true', () => {
    expect(x).toBeTruthy()
  })

  it('comparando variables primitivas', () => {
    expect(x).toBe(true)
    expect(x).toEqual(true)
  })

  it('Comparando objetos', () => {
    expect(a).toEqual(b) // para comparar el contenido y no la referencia
  })
})
