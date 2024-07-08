import type { CompilerOptions } from '@/types'

import { ERROR_MESSAGES } from '@/consts'

import tsConfigPaths from '@tests/dummies/tsConfigPaths'
import tsConfigValues from '@tests/dummies/tsConfigValues'
import mockedReadSync from '@tests/mocks/readSync'
import unmockReadSync from '@tests/unmocks/readSync'

import main from './main'

jest.mock('@mnrendra/read-stacked-file', () => ({
  readSync: jest.fn(),
  validateSkippedStacks: jest.fn()
}))

describe('Test `main` sync feature:', () => {
  describe('By passing an empty argument:', () => {
    describe('By mocking `@mnrendra/read-stacked-file` to return mocked values:', () => {
      let i = 0
      const mockReturnValues = tsConfigValues

      beforeEach(() => {
        mockedReadSync.mockReturnValue(JSON.stringify(mockReturnValues[i]))
        i++
      })

      afterEach(() => {
        unmockReadSync(mockedReadSync)
      })

      it('Should return the default value when `compilerOptions` is `undefined`!', () => {
        const received = main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions` is `null`!', () => {
        const received = main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions` is invalid!', () => {
        const received = (): void => { main() }
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.baseUrl` is `undefined`!', () => {
        const received = main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions.baseUrl` is `null`!', () => {
        const received = main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.baseUrl` is invalid!', () => {
        const received = (): void => { main() }
        const expected = Error(ERROR_MESSAGES.NO_BASEURL)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `undefined`!', () => {
        const received = main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `null`!', () => {
        const received = main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is invalid!', () => {
        const received = (): void => { main() }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is an array!', () => {
        const received = (): void => { main() }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should return the value from the `tsconfig.json` file when given an empty argument!', () => {
        const received = main()
        const expected = { baseUrl: './src', paths: { '@': ['./'] } }
        expect(received).toEqual(expected)
      })
    })
  })

  describe('By passing an argument:', () => {
    describe('By mocking `@mnrendra/read-stacked-file` to return mocked values:', () => {
      let i = 0
      const mockReturnValues = tsConfigValues

      beforeEach(() => {
        mockedReadSync.mockReturnValue(JSON.stringify(mockReturnValues[i]))
        i++
      })

      afterEach(() => {
        unmockReadSync(mockedReadSync)
      })

      it('Should return the default value when `compilerOptions` is `undefined`!', () => {
        const received = main(undefined)
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions` is `null`!', () => {
        const received = main(JSON.parse('null') as CompilerOptions)
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions` is invalid!', () => {
        const received = (): void => { main(JSON.parse('false') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.baseUrl` is `undefined`!', () => {
        const received = main({})
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should return the default value when `compilerOptions.baseUrl` is `null`!', () => {
        const received = main({ baseUrl: null })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.baseUrl` is invalid!', () => {
        const received = (): void => { main(JSON.parse('{ "baseUrl": 0 }') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_BASEURL)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `undefined`!', () => {
        const received = main({ baseUrl: './' })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `null`!', () => {
        const received = main({ baseUrl: './', paths: null })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is invalid!', () => {
        const received = (): void => { main(JSON.parse('{ "baseUrl": "./", "paths": 0 }') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is an array!', () => {
        const received = (): void => { main(JSON.parse('{ "baseUrl": "./", "paths": [] }') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should return the value from the options when given a valid argument!', () => {
        const received = main({ baseUrl: './src', paths: { '@': ['./'] } })
        const expected = { baseUrl: './src', paths: { '@': ['./'] } }
        expect(received).toEqual(expected)
      })
    })
  })
})
