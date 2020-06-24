export const testValidation = (method, scenarios) => {
  scenarios.forEach(({ input, expected }) => {
    const inputJson = JSON.stringify(input)
    const expectedJson = JSON.stringify(expected)

    it(`for ${inputJson} should return ${expectedJson}`, () => {
      const definedErrors = Object.keys(method(input))
      expect(definedErrors).toEqual(expected)
    })
  })
}
