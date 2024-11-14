# @mnrendra/obtain-tsconfig-paths
Obtain a valid `baseUrl` and `paths` from the `compilerOptions` in the `tsconfig.json` file so you don't need to import and validate the `tsconfig.json` file manually.

## Install
```bash
npm i @mnrendra/obtain-tsconfig-paths
```

## Usage

Using `CommonJS`:
```javascript
const { obtainTSConfigPaths, obtainTSConfigPathsSync } = require('@mnrendra/obtain-tsconfig-paths')

// Asynchronously
obtainTSConfigPaths()
  .then(({ baseUrl, paths }) => {
    console.log('asynchronously:', baseUrl, paths)
  })

// Synchronously
const { baseUrl, paths } = obtainTSConfigPathsSync()
console.log('synchronously:', baseUrl, paths)
```

Using `ES Module`:
```javascript
import { obtainTSConfigPaths, obtainTSConfigPathsSync } from '@mnrendra/obtain-tsconfig-paths'

// Asynchronously
obtainTSConfigPaths()
  .then(({ baseUrl, paths }) => {
    console.log('asynchronously:', baseUrl, paths)
  })

// Synchronously
const { baseUrl, paths } = obtainTSConfigPathsSync()
console.log('synchronously:', baseUrl, paths)
```

## Options
### • `baseUrl`
*type: `BaseURL|null|undefined`*<br/>
*default: `undefined`*<br/>
`tsconfig.json`'s `compilerOptons.baseUrl`.
### • `paths`
*type: `Paths|null|undefined`*<br/>
*default: `undefined`*<br/>
`tsconfig.json`'s `compilerOptons.paths`.

## Types
```typescript
import type {
  // @mnrendra/types-tsconfig
  TSConfig,
  CompilerOptions,
  BaseURL,
  Paths,
  // @mnrendra/obtain-tsconfig-paths
  TSConfigPaths
} from '@mnrendra/obtain-tsconfig-paths'
```

## License
[MIT](https://github.com/mnrendra/obtain-tsconfig-paths/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
