import { validateSkippedStacks } from '@mnrendra/read-stacked-json'

import async from './async'
import sync from './sync'

export type {
  // @mnrendra/types-tsconfig
  TSConfig,
  CompilerOptions,
  BaseURL,
  Paths,
  // @mnrendra/obtain-tsconfig-paths
  Options,
  TSConfigPaths,
  // @mnrendra/validate-skipped-stacks
  SkippedStacks,
  ValidSkippedStacks
} from './types'

export {
  async as obtainTSConfigPaths,
  sync as obtainTSConfigPathsSync,
  validateSkippedStacks
}
