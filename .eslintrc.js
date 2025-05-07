module.exports = {
  extends: ['next', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
   
    '@typescript-eslint/no-explicit-any': 'off',
  },
};