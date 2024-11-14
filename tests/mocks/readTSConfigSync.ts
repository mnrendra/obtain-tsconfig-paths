import * as originalModule from '@mnrendra/read-tsconfig'

const { readTSConfigSync } = originalModule as jest.Mocked<typeof originalModule>

export default readTSConfigSync
