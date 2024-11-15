import type { CompilerOptions } from '@mnrendra/read-tsconfig'

import type { TSConfigPaths } from '../types'

import { ERROR_MESSAGES } from '../consts'

const validateCompilerOptions = (
  compilerOptions?: null | CompilerOptions
): TSConfigPaths => {
  // Intialize the default value.
  const tsConfigPaths: TSConfigPaths = { baseUrl: './', paths: {} }

  // If `compilerOptions` is `undefined` or `null`, return the default value.
  if (compilerOptions === undefined || compilerOptions === null) {
    return tsConfigPaths
  }

  // If `compilerOptions` is not an object or an array, then throw an error.
  if (typeof compilerOptions !== 'object' || Array.isArray(compilerOptions)) {
    throw new Error(ERROR_MESSAGES.NO_COMPILEROPTIONS)
  }

  // Extract `baseUrl` and `paths` from `compilerOptions`.
  const { baseUrl, paths } = compilerOptions

  // If `baseUrl` is not `undefined`, `null`, or a string, then throw an error.
  if (baseUrl !== undefined && baseUrl !== null && typeof baseUrl !== 'string') {
    throw new Error(ERROR_MESSAGES.NO_BASEURL)
  }

  // If `paths` is not `undefined`, `null`, or an object, or an array,
  // then throw an error.
  if (
    (paths !== undefined && paths !== null && typeof paths !== 'object') ||
    Array.isArray(paths)
  ) {
    throw new Error(ERROR_MESSAGES.NO_PATHS)
  }

  // Assign the default value if the value is `undefined` or `null`.
  tsConfigPaths.baseUrl = baseUrl ?? './'

  // Assign the default value if the value is `undefined` or `null`.
  tsConfigPaths.paths = paths ?? {}

  // Return a valid `baseUrl` and `paths`.
  return tsConfigPaths
}

export default validateCompilerOptions
