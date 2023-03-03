module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  rules: {
    'no-console': 'off',
    'no-void': 'off',
    '@typescript-eslint/restrict-template-expressions' : 'off'
  }
};
