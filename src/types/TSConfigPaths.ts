import type { BaseURL, Paths } from '@mnrendra/read-tsconfig'

/**
 * A valid `baseUrl` and `paths` values.
 *
 * @see https://github.com/mnrendra/obtain-tsconfig-paths#readme
 */
interface TSConfigPaths {
  /**
   * Specify the base directory to resolve non-relative module names.
   *
   * @see https://www.typescriptlang.org/tsconfig#baseUrl
   */
  baseUrl: BaseURL

  /**
   * Specify a set of entries that re-map imports to additional lookup
   * locations.
   *
   * @see https://www.typescriptlang.org/tsconfig#paths
   */
  paths: Paths
}

export default TSConfigPaths
