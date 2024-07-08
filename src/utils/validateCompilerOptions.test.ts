import type { CompilerOptions } from '@/types'

import { ERROR_MESSAGES } from '@/consts'

import tsConfigPaths from '@tests/dummies/tsConfigPaths'

import validateCompilerOptions from './validateCompilerOptions'

describe('Test `validateCompilerOptions` util:', () => {
  it('Should return the default value when given an empty argument!', () => {
    const received = validateCompilerOptions()
    const expected = tsConfigPaths
    expect(received).toEqual(expected)
  })

  it('Should return the default value when given an `undefined` value!', () => {
    const received = validateCompilerOptions(undefined)
    const expected = tsConfigPaths
    expect(received).toEqual(expected)
  })

  it('Should return the default value when given a `null` value!', () => {
    const received = validateCompilerOptions(null)
    const expected = tsConfigPaths
    expect(received).toEqual(expected)
  })

  it('Should return the default value when given an empty object!', () => {
    const received = validateCompilerOptions({})
    const expected = tsConfigPaths
    expect(received).toEqual(expected)
  })

  it('Should throw an error when given an invalid value!', () => {
    const received = (): void => {
      validateCompilerOptions(0 as CompilerOptions)
    }
    const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
    expect(received).toThrow(expected)
  })

  it('Should throw an error when given an array value!', () => {
    const received = (): void => {
      validateCompilerOptions([] as CompilerOptions)
    }
    const expected = Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
    expect(received).toThrow(expected)
  })

  it('Should throw an error when given an invalid `baseUrl` value!', () => {
    const received = (): void => {
      validateCompilerOptions(JSON.parse('{ "baseUrl": 0 }') as CompilerOptions)
    }
    const expected = Error(ERROR_MESSAGES.NO_BASEURL)
    expect(received).toThrow(expected)
  })

  it('Should throw an error when given an invalid `paths` value!', () => {
    const received = (): void => {
      validateCompilerOptions(JSON.parse('{ "baseUrl": "./src", "paths": 0 }') as CompilerOptions)
    }
    const expected = Error(ERROR_MESSAGES.NO_PATHS)
    expect(received).toThrow(expected)
  })

  it('Should throw an error when given an array value for `paths`!', () => {
    const received = (): void => {
      validateCompilerOptions(JSON.parse('{ "baseUrl": "./src", "paths": [] }') as CompilerOptions)
    }
    const expected = Error(ERROR_MESSAGES.NO_PATHS)
    expect(received).toThrow(expected)
  })

  it('Should return the default `baseUrl` value when given a null value for `baseUrl`!', () => {
    const received = validateCompilerOptions({ baseUrl: null, paths: { '@': ['./'] } })
    const expected = { ...tsConfigPaths, paths: { '@': ['./'] } }
    expect(received).toEqual(expected)
  })

  it('Should return the default `paths` value when given a null value for `paths`!', () => {
    const received = validateCompilerOptions({ baseUrl: './src', paths: null })
    const expected = { ...tsConfigPaths, baseUrl: './src' }
    expect(received).toEqual(expected)
  })

  it('Should return the same value as given in non-above test cases!', () => {
    const received = validateCompilerOptions({ baseUrl: './src', paths: { '@': ['./'] } })
    const expected = { baseUrl: './src', paths: { '@': ['./'] } }
    expect(received).toEqual(expected)
  })
})
