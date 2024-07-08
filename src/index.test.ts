import type { CompilerOptions } from '.'

import { ERROR_MESSAGES } from '@/consts'

import tsConfigPaths from '@tests/dummies/tsConfigPaths'
import tsConfigValues from '@tests/dummies/tsConfigValues'
import mockedReadAsync from '@tests/mocks/readAsync'
import mockedReadSync from '@tests/mocks/readSync'
import unmockReadAsync from '@tests/unmocks/readAsync'
import unmockReadSync from '@tests/unmocks/readSync'

import {
  obtainTSConfigPaths,
  obtainTSConfigPathsSync,
  validateSkippedStacks
} from '.'

jest.mock('@mnrendra/read-stacked-file', () => ({
  read: jest.fn(),
  readSync: jest.fn(),
  validateSkippedStacks: jest.fn()
}))

describe('Test all features:', () => {
  describe('Test async feature:', () => {
    describe('By passing an empty argument:', () => {
      describe('By mocking `@mnrendra/read-stacked-file` to resolve mocked values:', () => {
        let i = 0
        const mockResolvedValues = tsConfigValues

        beforeEach(() => {
          mockedReadAsync
            .mockResolvedValue(JSON.stringify(mockResolvedValues[i]))
          i++
        })

        afterEach(() => {
          unmockReadAsync(mockedReadAsync)
        })

        it('Should resolve the default value when `compilerOptions` is `undefined`!', async () => {
          const received = await obtainTSConfigPaths()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should resolve the default value when `compilerOptions` is `null`!', async () => {
          const received = await obtainTSConfigPaths()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should reject with an error when `compilerOptions` is invalid!', async () => {
          const received = obtainTSConfigPaths()
          const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should resolve the default value when `compilerOptions.baseUrl` is `undefined`!', async () => {
          const received = await obtainTSConfigPaths()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should resolve the default value when `compilerOptions.baseUrl` is `null`!', async () => {
          const received = await obtainTSConfigPaths()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should reject with an error when `compilerOptions.baseUrl` is invalid!', async () => {
          const received = obtainTSConfigPaths()
          const expected = Error(ERROR_MESSAGES.NO_BASEURL)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should resolve the default value when `compilerOptions.paths` is `undefined`!', async () => {
          const received = await obtainTSConfigPaths()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should resolve the default value when `compilerOptions.paths` is `null`!', async () => {
          const received = await obtainTSConfigPaths()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should reject with an error when `compilerOptions.paths` is invalid!', async () => {
          const received = obtainTSConfigPaths()
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should reject with an error when `compilerOptions.paths` is an array!', async () => {
          const received = obtainTSConfigPaths()
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should resolve the value from the `tsconfig.json` file when given an empty argument!', async () => {
          const received = await obtainTSConfigPaths()
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
          mockedReadAsync
            .mockResolvedValue(JSON.stringify(mockResolvedValues[i]))
          i++
        })

        afterEach(() => {
          unmockReadAsync(mockedReadAsync)
        })

        it('Should resolve the default value when `compilerOptions` is `undefined`!', async () => {
          const received = await obtainTSConfigPaths(undefined)
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should resolve the default value when `compilerOptions` is `null`!', async () => {
          const received = await obtainTSConfigPaths(JSON.parse('null') as CompilerOptions)
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should reject with an error when `compilerOptions` is invalid!', async () => {
          const received = obtainTSConfigPaths(JSON.parse('false') as CompilerOptions)
          const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should resolve the default value when `compilerOptions.baseUrl` is `undefined`!', async () => {
          const received = await obtainTSConfigPaths({})
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })
      })

      describe('Without mocking anything:', () => {
        it('Should resolve the default value when `compilerOptions.baseUrl` is `null`!', async () => {
          const received = await obtainTSConfigPaths({ baseUrl: null })
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should reject with an error when `compilerOptions.baseUrl` is invalid!', async () => {
          const received = obtainTSConfigPaths(JSON.parse('{ "baseUrl": 0 }') as CompilerOptions)
          const expected = Error(ERROR_MESSAGES.NO_BASEURL)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should resolve the default value when `compilerOptions.paths` is `undefined`!', async () => {
          const received = await obtainTSConfigPaths({ baseUrl: './' })
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should resolve the default value when `compilerOptions.paths` is `null`!', async () => {
          const received = await obtainTSConfigPaths({ baseUrl: './', paths: null })
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should reject with an error when `compilerOptions.paths` is invalid!', async () => {
          const received = obtainTSConfigPaths(JSON.parse('{ "baseUrl": "./", "paths": 0 }') as CompilerOptions)
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should reject with an error when `compilerOptions.paths` is an array!', async () => {
          const received = obtainTSConfigPaths(JSON.parse('{ "baseUrl": "./", "paths": [] }') as CompilerOptions)
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          await expect(received).rejects.toThrow(expected)
        })

        it('Should resolve the value from the options when given a valid argument!', async () => {
          const received = await obtainTSConfigPaths({ baseUrl: './src', paths: { '@': ['./'] } })
          const expected = { baseUrl: './src', paths: { '@': ['./'] } }
          expect(received).toEqual(expected)
        })
      })
    })
  })

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
          const received = obtainTSConfigPathsSync()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should return the default value when `compilerOptions` is `null`!', () => {
          const received = obtainTSConfigPathsSync()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should throw an error when `compilerOptions` is invalid!', () => {
          const received = (): void => { obtainTSConfigPathsSync() }
          const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
          expect(received).toThrow(expected)
        })

        it('Should return the default value when `compilerOptions.baseUrl` is `undefined`!', () => {
          const received = obtainTSConfigPathsSync()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should return the default value when `compilerOptions.baseUrl` is `null`!', () => {
          const received = obtainTSConfigPathsSync()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should throw an error when `compilerOptions.baseUrl` is invalid!', () => {
          const received = (): void => { obtainTSConfigPathsSync() }
          const expected = Error(ERROR_MESSAGES.NO_BASEURL)
          expect(received).toThrow(expected)
        })

        it('Should return the default value when `compilerOptions.paths` is `undefined`!', () => {
          const received = obtainTSConfigPathsSync()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should return the default value when `compilerOptions.paths` is `null`!', () => {
          const received = obtainTSConfigPathsSync()
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should throw an error when `compilerOptions.paths` is invalid!', () => {
          const received = (): void => { obtainTSConfigPathsSync() }
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          expect(received).toThrow(expected)
        })

        it('Should throw an error when `compilerOptions.paths` is an array!', () => {
          const received = (): void => { obtainTSConfigPathsSync() }
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          expect(received).toThrow(expected)
        })

        it('Should return the value from the `tsconfig.json` file when given an empty argument!', () => {
          const received = obtainTSConfigPathsSync()
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
          const received = obtainTSConfigPathsSync(undefined)
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should return the default value when `compilerOptions` is `null`!', () => {
          const received = obtainTSConfigPathsSync(JSON.parse('null') as CompilerOptions)
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should throw an error when `compilerOptions` is invalid!', () => {
          const received = (): void => { obtainTSConfigPathsSync(JSON.parse('false') as CompilerOptions) }
          const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
          expect(received).toThrow(expected)
        })

        it('Should return the default value when `compilerOptions.baseUrl` is `undefined`!', () => {
          const received = obtainTSConfigPathsSync({})
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })
      })

      describe('Without mocking anything:', () => {
        it('Should return the default value when `compilerOptions.baseUrl` is `null`!', () => {
          const received = obtainTSConfigPathsSync({ baseUrl: null })
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should throw an error when `compilerOptions.baseUrl` is invalid!', () => {
          const received = (): void => { obtainTSConfigPathsSync(JSON.parse('{ "baseUrl": 0 }') as CompilerOptions) }
          const expected = Error(ERROR_MESSAGES.NO_BASEURL)
          expect(received).toThrow(expected)
        })

        it('Should return the default value when `compilerOptions.paths` is `undefined`!', () => {
          const received = obtainTSConfigPathsSync({ baseUrl: './' })
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should return the default value when `compilerOptions.paths` is `null`!', () => {
          const received = obtainTSConfigPathsSync({ baseUrl: './', paths: null })
          const expected = tsConfigPaths
          expect(received).toEqual(expected)
        })

        it('Should throw an error when `compilerOptions.paths` is invalid!', () => {
          const received = (): void => { obtainTSConfigPathsSync(JSON.parse('{ "baseUrl": "./", "paths": 0 }') as CompilerOptions) }
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          expect(received).toThrow(expected)
        })

        it('Should throw an error when `compilerOptions.paths` is an array!', () => {
          const received = (): void => { obtainTSConfigPathsSync(JSON.parse('{ "baseUrl": "./", "paths": [] }') as CompilerOptions) }
          const expected = Error(ERROR_MESSAGES.NO_PATHS)
          expect(received).toThrow(expected)
        })

        it('Should return the value from the options when given a valid argument!', () => {
          const received = obtainTSConfigPathsSync({ baseUrl: './src', paths: { '@': ['./'] } })
          const expected = { baseUrl: './src', paths: { '@': ['./'] } }
          expect(received).toEqual(expected)
        })
      })
    })
  })

  describe('Test `validateSkippedStacks` util:', () => {
    it('Should return a valid skipped-stacks when given a skipped-stack!', () => {
      const received = validateSkippedStacks('any')
      const expected = ['any']

      expect(received).toEqual(expected)
    })

    it('Should return a valid skipped-stacks when given a skipped-stack and a `skippedStacks` option with a string!', () => {
      const received = validateSkippedStacks('any', 'any')
      const expected = ['any', 'any']

      expect(received).toEqual(expected)
    })

    it('Should return a valid skipped-stacks when given a skipped-stack and a `skippedStacks` option with a list of strings!', () => {
      const received = validateSkippedStacks('any', ['any'])
      const expected = ['any', 'any']

      expect(received).toEqual(expected)
    })
  })
})
