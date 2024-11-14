import * as originalModule from '@mnrendra/read-tsconfig'

const { readTSConfig } = originalModule as jest.Mocked<typeof originalModule>

export default readTSConfig
