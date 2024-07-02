const tsConfigValues = [
  {},
  { compilerOptions: null },
  { compilerOptions: 0 },
  { compilerOptions: {} },
  { compilerOptions: { baseUrl: null } },
  { compilerOptions: { baseUrl: 0 } },
  { compilerOptions: { baseUrl: './' } },
  { compilerOptions: { baseUrl: './', paths: null } },
  { compilerOptions: { baseUrl: './', paths: 0 } },
  { compilerOptions: { baseUrl: './', paths: [] } },
  { compilerOptions: { baseUrl: './src', paths: { '@': ['./'] } } }
]

export default tsConfigValues
