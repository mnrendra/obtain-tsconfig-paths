import async from './async'
import sync from './sync'

export type {
  TSConfig,
  CompilerOptions,
  BaseURL,
  Paths
} from '@mnrendra/read-tsconfig'

export type {
  TSConfigPaths
} from './types'

export {
  async as obtainTSConfigPaths,
  sync as obtainTSConfigPathsSync
}
