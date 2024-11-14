import type originalModule from '@mnrendra/read-tsconfig'

import type mockedModule from '@tests/mocks/readTSConfig'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

const unmock = (
  mockedModule: MockedModule
): void => {
  const actualModule: OriginalModule = jest.requireActual('@mnrendra/read-tsconfig')
  mockedModule.mockImplementation(actualModule.readTSConfig)
}

export default unmock
