import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly'
      }
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single']
    }
  }
]