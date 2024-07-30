<<<<<<< Updated upstream
import type { CompilerOptions, SkippedStacks } from '.'
=======
import type {
  CompilerOptions,
  SkippedStacks
} from '.'
>>>>>>> Stashed changes

interface Options extends CompilerOptions {
  /**
   * To skip a stack or a list of stacks when you call `@mnrendra/stack-trace`
   * or `@mnrendra/read-stacked-file`. So, you can get the stack(s) of your
   * consumer target file.
   *
   * @default []
   *
   * @see https://github.com/mnrendra/validate-skipped-stacks
   */
  skippedStacks?: SkippedStacks
<<<<<<< Updated upstream

  /**
   * `@mnrendra/stack-trace`'s limit specifies the number of stack frames to be
   * collected by a stack trace.
   *
   * @default 10
   *
   * @see https://github.com/mnrendra/stack-trace
   */
=======
>>>>>>> Stashed changes
  stackTraceLimit?: number
}

export default Options
