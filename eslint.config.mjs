import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,

  rules: {
    'ts/consistent-type-definitions': ['error', 'type'],

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
})
