import type {
  Options,
  TSConfigPaths
} from './types'

import async from './async'
import sync from './sync'

export type {
  Options,
  TSConfigPaths
}

export {
  async as obtainTSConfigPaths,
  sync as obtainTSConfigPathsSync
}
