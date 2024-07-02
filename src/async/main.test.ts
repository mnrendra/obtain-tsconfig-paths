import type { CompilerOptions } from '@mnrendra/types-tsconfig'

import { ERROR_MESSAGES } from '@/consts'

import { readAsync as mockedReadAsync } from '@tests/mocks'
import { readAsync as unmockReadAsync } from '@tests/unmocks'
import { tsConfigPaths, tsConfigValues } from '@tests/dummies'

import main from './main'

jest.mock('@mnrendra/read-stacked-file', () => ({
  read: jest.fn()
}))

describe('Test `main` async feature:', () => {
  describe('By passing an empty argument:', () => {
    describe('By mocking `@mnrendra/read-stacked-file` to resolve mocked values:', () => {
      let i = 0
      const mockResolvedValues = tsConfigValues

      beforeEach(() => {
        mockedReadAsync.mockResolvedValue(JSON.stringify(mockResolvedValues[i]))
        i++
      })

      afterEach(() => {
        unmockReadAsync(mockedReadAsync)
      })

      it('Should resolve the default value when `compilerOptions` is `undefined`!', async () => {
        const received = await main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should resolve the default value when `compilerOptions` is `null`!', async () => {
        const received = await main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should reject with an error when `compilerOptions` is invalid!', async () => {
        const received = main()
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should resolve the default value when `compilerOptions.baseUrl` is `undefined`!', async () => {
        const received = await main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should resolve the default value when `compilerOptions.baseUrl` is `null`!', async () => {
        const received = await main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should reject with an error when `compilerOptions.baseUrl` is invalid!', async () => {
        const received = main()
        const expected = Error(ERROR_MESSAGES.NO_BASEURL)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should resolve the default value when `compilerOptions.paths` is `undefined`!', async () => {
        const received = await main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should resolve the default value when `compilerOptions.paths` is `null`!', async () => {
        const received = await main()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should reject with an error when `compilerOptions.paths` is invalid!', async () => {
        const received = main()
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should reject with an error when `compilerOptions.paths` is an array!', async () => {
        const received = main()
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should resolve the value from the `tsconfig.json` file when given an empty argument!', async () => {
        const received = await main()
        const expected = { baseUrl: './src', paths: { '@': ['./'] } }
        expect(received).toEqual(expected)
      })
    })
  })

  describe('By passing an argument:', () => {
    describe('By mocking `@mnrendra/read-stacked-file` to resolve mocked values:', () => {
      let i = 0
      const mockResolvedValues = tsConfigValues

      beforeEach(() => {
        mockedReadAsync.mockResolvedValue(JSON.stringify(mockResolvedValues[i]))
        i++
      })

      afterEach(() => {
        unmockReadAsync(mockedReadAsync)
      })

      it('Should resolve the default value when `compilerOptions` is `undefined`!', async () => {
        const received = await main(undefined)
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should resolve the default value when `compilerOptions` is `null`!', async () => {
        const received = await main(JSON.parse('null') as CompilerOptions)
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should reject with an error when `compilerOptions` is invalid!', async () => {
        const received = main(JSON.parse('false') as CompilerOptions)
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should resolve the default value when `compilerOptions.baseUrl` is `undefined`!', async () => {
        const received = await main({})
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should resolve the default value when `compilerOptions.baseUrl` is `null`!', async () => {
        const received = await main({ baseUrl: null })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should reject with an error when `compilerOptions.baseUrl` is invalid!', async () => {
        const received = main(JSON.parse('{ "baseUrl": 0 }') as CompilerOptions)
        const expected = Error(ERROR_MESSAGES.NO_BASEURL)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should resolve the default value when `compilerOptions.paths` is `undefined`!', async () => {
        const received = await main({ baseUrl: './' })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should resolve the default value when `compilerOptions.paths` is `null`!', async () => {
        const received = await main({ baseUrl: './', paths: null })
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })

      it('Should reject with an error when `compilerOptions.paths` is invalid!', async () => {
        const received = main(JSON.parse('{ "baseUrl": "./", "paths": 0 }') as CompilerOptions)
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should reject with an error when `compilerOptions.paths` is an array!', async () => {
        const received = main(JSON.parse('{ "baseUrl": "./", "paths": [] }') as CompilerOptions)
        const expected = Error(ERROR_MESSAGES.NO_PATHS)
        await expect(received).rejects.toThrow(expected)
      })

      it('Should resolve the value from the options when given a valid argument!', async () => {
        const received = await main({ baseUrl: './src', paths: { '@': ['./'] } })
        const expected = { baseUrl: './src', paths: { '@': ['./'] } }
        expect(received).toEqual(expected)
      })
    })
  })
})
