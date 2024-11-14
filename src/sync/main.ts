import type { TSConfigPaths } from '../types'

import { type CompilerOptions, readTSConfigSync } from '@mnrendra/read-tsconfig'

import { validateCompilerOptions } from '../utils'

/**
 * Obtain a valid `baseUrl` and `paths` from the `compilerOptions` in the
 * `tsconfig.json` file synchronously.
 *
 * @param {CompilerOptions} options - A `compilerOptions` object.
 *
 * @returns {TSConfigPaths} A valid `baseUrl` and `paths` values.
 *
 * @see https://github.com/mnrendra/obtain-tsconfig-paths#readme
 */
const main = (
  options: CompilerOptions = {}
): TSConfigPaths => {
  // Extract `options` properties.
  const { baseUrl, paths } = options ?? {}

  // If there is no `baseUrl` and `paths` in the `options`,
  // then obtain from the `tsconfig.json` file.
  if (baseUrl === undefined && paths === undefined) {
    // Obtain the `compilerOptions` from the `tsconfig.json` file.
    const { compilerOptions } = readTSConfigSync()

    // Return a valid `baseUrl` and `paths` from the `tsconfig.json`.
    return validateCompilerOptions(compilerOptions)
  }

  // Return a valid `baseUrl` and `paths` from the `options`.
  return validateCompilerOptions(options)
}

export default main
