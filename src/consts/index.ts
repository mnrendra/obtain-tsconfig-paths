import { normalize } from 'node:path'

export const SCOPE = '@mnrendra'

export const NAME = 'obtain-tsconfig-paths'

export const DIST_NAME = `${SCOPE}/${NAME}`

export const DIST_PATH = `node_modules/${DIST_NAME}`

export const SKIPPED_STACK = normalize(DIST_PATH)

export const ERROR_MESSAGES = {
  NO_COMPILEROPTIONS: 'Invalid `compilerOptions`: the value must be an object!',
  NO_BASEURL: 'Invalid `compilerOptions.baseUrl`: the value must be a string!',
  NO_PATHS: 'Invalid `compilerOptions.paths`: the value must be an object!'
}
