import type { CompilerOptions } from '..'

import { ERROR_MESSAGES } from '@/consts'

import tsConfigPaths from '@tests/dummies/tsConfigPaths'
import mockedReadTSConfig from '@tests/mocks/readTSConfig'
import mockedReadTSConfigSync from '@tests/mocks/readTSConfigSync'
import unmockedReadTSConfig from '@tests/unmocks/readTSConfig'
import unmockedReadTSConfigSync from '@tests/unmocks/readTSConfigSync'

import {
  obtainTSConfigPaths,
  obtainTSConfigPathsSync
} from '..'

jest.mock('@mnrendra/read-tsconfig', () => ({
  readTSConfig: jest.fn(),
  readTSConfigSync: jest.fn()
}))

describe('Test all features:', () => {
  afterEach(() => {
    unmockedReadTSConfig(mockedReadTSConfig)
    unmockedReadTSConfigSync(mockedReadTSConfigSync)
  })

  describe('Test `obtainTSConfigPaths` feature:', () => {
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

    it('Should resolve the value from `tsconfig.json` when given an empty argument!', async () => {
      const received = await obtainTSConfigPaths()
      const expected = { baseUrl: './src', paths: { '@': ['./'], '@/*': ['./*'], '@tests': ['../tests'], '@tests/*': ['../tests/*'] } }
      expect(received).toEqual(expected)
    })

    it('Should resolve the value from `tsconfig.json` when given `null` argument!', async () => {
      const received = await obtainTSConfigPaths(null as unknown as CompilerOptions)
      const expected = { baseUrl: './src', paths: { '@': ['./'], '@/*': ['./*'], '@tests': ['../tests'], '@tests/*': ['../tests/*'] } }
      expect(received).toEqual(expected)
    })

    describe('By mocking `readTSConfig` to resolve `compilerOptions` to be `undefined`:', () => {
      beforeEach(() => {
        mockedReadTSConfig.mockResolvedValue({ compilerOptions: undefined })
      })

      afterEach(() => {
        unmockedReadTSConfig(mockedReadTSConfig)
      })

      it('Should resolve the default value when given `compilerOptions` is `undefined`!', async () => {
        const received = await obtainTSConfigPaths()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readTSConfig` to resolve `compilerOptions` to be `null`:', () => {
      beforeEach(() => {
        mockedReadTSConfig.mockResolvedValue({ compilerOptions: null })
      })

      afterEach(() => {
        unmockedReadTSConfig(mockedReadTSConfig)
      })

      it('Should resolve the default value when given `compilerOptions` is `null`!', async () => {
        const received = await obtainTSConfigPaths()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readTSConfig` to resolve `compilerOptions` to be an array:', () => {
      beforeEach(() => {
        mockedReadTSConfig.mockResolvedValue({ compilerOptions: [] as unknown as CompilerOptions })
      })

      afterEach(() => {
        unmockedReadTSConfig(mockedReadTSConfig)
      })

      it('Should reject with an error when `compilerOptions` is invalid!', async () => {
        const received = obtainTSConfigPaths()
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('By mocking `readTSConfig` to resolve `compilerOptions` to be non-object:', () => {
      beforeEach(() => {
        mockedReadTSConfig.mockResolvedValue({ compilerOptions: false as unknown as CompilerOptions })
      })

      afterEach(() => {
        unmockedReadTSConfig(mockedReadTSConfig)
      })

      it('Should reject with an error when `compilerOptions` is invalid!', async () => {
        const received = obtainTSConfigPaths()
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        await expect(received).rejects.toThrow(expected)
      })
    })
  })

  describe('Test `obtainTSConfigPathsSync` feature:', () => {
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

    it('Should return the value from `tsconfig.json` when given an empty argument!', () => {
      const received = obtainTSConfigPathsSync()
      const expected = { baseUrl: './src', paths: { '@': ['./'], '@/*': ['./*'], '@tests': ['../tests'], '@tests/*': ['../tests/*'] } }
      expect(received).toEqual(expected)
    })

    it('Should return the value from `tsconfig.json` when given `null` argument!', () => {
      const received = obtainTSConfigPathsSync(null as unknown as CompilerOptions)
      const expected = { baseUrl: './src', paths: { '@': ['./'], '@/*': ['./*'], '@tests': ['../tests'], '@tests/*': ['../tests/*'] } }
      expect(received).toEqual(expected)
    })

    describe('By mocking `readTSConfig` to return `compilerOptions` to be `undefined`:', () => {
      beforeEach(() => {
        mockedReadTSConfigSync.mockReturnValue({ compilerOptions: undefined })
      })

      afterEach(() => {
        unmockedReadTSConfigSync(mockedReadTSConfigSync)
      })

      it('Should return the default value when given `compilerOptions` is `undefined`!', () => {
        const received = obtainTSConfigPathsSync()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readTSConfig` to return `compilerOptions` to be `null`:', () => {
      beforeEach(() => {
        mockedReadTSConfigSync.mockReturnValue({ compilerOptions: null })
      })

      afterEach(() => {
        unmockedReadTSConfigSync(mockedReadTSConfigSync)
      })

      it('Should return the default value when given `compilerOptions` is `null`!', () => {
        const received = obtainTSConfigPathsSync()
        const expected = tsConfigPaths
        expect(received).toEqual(expected)
      })
    })

    describe('By mocking `readTSConfig` to return `compilerOptions` to be an array:', () => {
      beforeEach(() => {
        mockedReadTSConfigSync.mockReturnValue({ compilerOptions: [] as unknown as CompilerOptions })
      })

      afterEach(() => {
        unmockedReadTSConfigSync(mockedReadTSConfigSync)
      })

      it('Should throw an error when `compilerOptions` is invalid!', () => {
        const received = (): void => { obtainTSConfigPathsSync() }
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `readTSConfig` to return `compilerOptions` to be non-object:', () => {
      beforeEach(() => {
        mockedReadTSConfigSync.mockReturnValue({ compilerOptions: false as unknown as CompilerOptions })
      })

      afterEach(() => {
        unmockedReadTSConfigSync(mockedReadTSConfigSync)
      })

      it('Should throw an error when `compilerOptions` is invalid!', () => {
        const received = (): void => { obtainTSConfigPathsSync() }
        const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
        expect(received).toThrow(expected)
      })
    })
  })
})
