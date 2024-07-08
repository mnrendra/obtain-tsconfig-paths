import type { Options, TSConfigPaths } from '../types'

import { readTSConfig, validateSkippedStacks } from '@mnrendra/read-tsconfig'

import { SKIPPED_STACK } from '../consts'

import { validateCompilerOptions } from '../utils'

/**
 * Obtain a valid `baseUrl` and `paths` from the `compilerOptions`
 * asynchronously, either from the `tsconfig.json` file or from the options.
 *
 * @param {Options} options - `{ skippedStacks }` or `compilerOptions`.
 *
 * @returns {TSConfigPaths} A valid `baseUrl` and `paths`.
 */
const main = async (
  options: Options = {}
): Promise<TSConfigPaths> => {
  // Extract `options` properties.
  const { baseUrl, paths, skippedStacks: _skippedStacks } = options ?? {}

  // If there is no `baseUrl` and `paths` in the `options`,
  // then obtain from the `tsconfig.json` file.
  if (baseUrl === undefined && paths === undefined) {
    // Validate skipped stacks.
    const skippedStacks = validateSkippedStacks(SKIPPED_STACK, _skippedStacks)

    // Obtain the `compilerOptions` from the `tsconfig.json` file.
    const { compilerOptions } = await readTSConfig({ skippedStacks })

    // Return a valid `baseUrl` and `paths` from the `tsconfig.json`.
    return validateCompilerOptions(compilerOptions)
  }

  // Return a valid `baseUrl` and `paths` from the `options`.
  return validateCompilerOptions(options)
}

// Export `main` as the default value.
export default main
