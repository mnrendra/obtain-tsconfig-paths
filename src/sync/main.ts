import type { Options, TSConfigPaths } from '../types'

import { readTSConfigSync, validateSkippedStacks } from '@mnrendra/read-tsconfig'

import { SKIPPED_STACK } from '../consts'

import { validateCompilerOptions } from '../utils'

/**
 * Obtain a valid `baseUrl` and `paths` from the `compilerOptions`
 * synchronously, either from the `tsconfig.json` file or from the options.
 *
 * @param {Options} options - `{ skippedStacks }` or `compilerOptions`.
 *
 * @returns {TSConfigPaths} A valid `baseUrl` and `paths`.
 */
const main = (
  options: Options = {}
): TSConfigPaths => {
  // Extract `options` properties.
  const {
    baseUrl,
    paths,
    skippedStacks,
    stackTraceLimit
  } = options ?? {}

  // If there is no `baseUrl` and `paths` in the `options`,
  // then obtain from the `tsconfig.json` file.
  if (baseUrl === undefined && paths === undefined) {
    // Validate skipped stacks.
    const validSkippedStacks = validateSkippedStacks(
      SKIPPED_STACK,
      skippedStacks
    )

    // Obtain the `compilerOptions` from the `tsconfig.json` file.
    const { compilerOptions } = readTSConfigSync({
      skippedStacks: validSkippedStacks,
      stackTraceLimit
    })

    // Return a valid `baseUrl` and `paths` from the `tsconfig.json`.
    return validateCompilerOptions(compilerOptions)
  }

  // Return a valid `baseUrl` and `paths` from the `options`.
  return validateCompilerOptions(options)
}

// Export `main` as the default value.
export default main
