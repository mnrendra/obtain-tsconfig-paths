# @mnrendra/obtain-tsconfig-paths
Obtain a valid `baseUrl` and `paths` from the `compilerOptions` in `tsconfig.json` file.</br>
So, you don't need to import and validate the `tsconfig.json` file manually.

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

# Options
```javascript
// Skip your module stack:
obtainTSConfigPaths({
  skippedStacks: 'your-module-name', // To skip your module stack when you want to publish your package and allow your consumer's `tsconfig.json` to be read.
  stackTraceLimit: 10 // To specify the number of stack frames to be collected by `@mnrendra/stack-trace`.
})

// Or by passing your `baseUrl` and `paths` manually:
obtainTSConfigPaths({
  baseUrl: './src',
  paths: {
    '@': ['./']
  }
})
```

## Utility
```javascript
import {
  validateSkippedStacks // To validate the list of stacks to be skipped. More info: @mnrendra/validate-skipped-stacks
} from '@mnrendra/obtain-tsconfig-paths'
```

## Types
```typescript
import type {
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
} from '@mnrendra/obtain-tsconfig-paths'
```

## License
[MIT](https://github.com/mnrendra/obtain-tsconfig-paths/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
