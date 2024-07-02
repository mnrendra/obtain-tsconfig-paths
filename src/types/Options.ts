import type { CompilerOptions } from '@mnrendra/types-tsconfig'
import type { SkippedStacks } from '@mnrendra/validate-skipped-stacks'

interface Options extends CompilerOptions {
  skippedStacks?: SkippedStacks
}

export default Options
