import type { CompilerOptions } from '@mnrendra/types-tsconfig'

import { ERROR_MESSAGES } from '@/consts'

import { readSync as mockedReadSync } from '@tests/mocks'
import { readSync as unmockReadSync } from '@tests/unmocks'
import { tsConfigPaths, tsConfigValues } from '@tests/dummies'

import index from '.'

jest.mock('@mnrendra/read-stacked-file', () => ({
  readSync: jest.fn()
}))

describe('Test sync feature:', () => {
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
        const received = index()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions` is `null`!', () => {
        const received = index()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions` is invalid!', () => {
        const received = (): void => { index() }
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.baseUrl` is `undefined`!', () => {
        const received = index()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions.baseUrl` is `null`!', () => {
        const received = index()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.baseUrl` is invalid!', () => {
        const received = (): void => { index() }
        const expected = Error(ERROR_MESSAGES.NO_BASEURL)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `undefined`!', () => {
        const received = index()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `null`!', () => {
        const received = index()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is invalid!', () => {
        const received = (): void => { index() }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is an array!', () => {
        const received = (): void => { index() }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should return the value from the `tsconfig.json` file when given an empty argument!', () => {
        const received = index()
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
        const received = index(undefined)
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions` is `null`!', () => {
        const received = index(JSON.parse('null') as CompilerOptions)
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions` is invalid!', () => {
        const received = (): void => { index(JSON.parse('false') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.baseUrl` is `undefined`!', () => {
        const received = index({})
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should return the default value when `compilerOptions.baseUrl` is `null`!', () => {
        const received = index({ baseUrl: null })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.baseUrl` is invalid!', () => {
        const received = (): void => { index(JSON.parse('{ "baseUrl": 0 }') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_BASEURL)
        expect(received).toThrow(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `undefined`!', () => {
        const received = index({ baseUrl: './' })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should return the default value when `compilerOptions.paths` is `null`!', () => {
        const received = index({ baseUrl: './', paths: null })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is invalid!', () => {
        const received = (): void => { index(JSON.parse('{ "baseUrl": "./", "paths": 0 }') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should throw an error when `compilerOptions.paths` is an array!', () => {
        const received = (): void => { index(JSON.parse('{ "baseUrl": "./", "paths": [] }') as CompilerOptions) }
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        expect(received).toThrow(expected)
      })

      it('Should return the value from the options when given a valid argument!', () => {
        const received = index({ baseUrl: './src', paths: { '@': ['./'] } })
        const expected = { baseUrl: './src', paths: { '@': ['./'] } }
        expect(received).toEqual(expected)
      })
    })
  })
})
