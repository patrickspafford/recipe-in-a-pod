module.exports = {
    root: true,
    extends: [
      'airbnb',
      'standard',
      'standard-react',
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parser: 'babel-eslint',
    plugins: ['flowtype'],
    rules: {
      strict: 'error',
      complexity: 0,
      'max-nested-callbacks': ['error', 3],
      'no-useless-escape': 0,
      'react/no-unused-prop-types': 0,
      'react/jsx-no-bind': 0,
      'no-restricted-syntax': 0,
      'max-params': ['error', 8],
      'max-depth': ['error', 3],
      'new-cap': 0,
      'no-nested-ternary': 0,
      'max-len': [
        'error',
        {
          ignoreStrings: true,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'require-await': 'error',
      'no-func-assign': 'error',
      'object-shorthand': [
        'error',
        'methods',
        {
          avoidExplicitReturnArrows: false,
        },
      ],
      'arrow-parens': 0,
      'object-curly-spacing': ['error', 'always'],
      'object-curly-newline': 0,
      'space-before-function-paren': 0,
      'no-useless-return': 'error',
      'no-else-return': 'error',
      'no-return-await': 'error',
      'no-underscore-dangle': 0,
      'implicit-arrow-linebreak': 0,
      'react/prefer-stateless-function': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/require-optimization': 0,
      'react/require-default-props': 0,
      'jsx-a11y/accessible-emoji': 0,
      'react/no-unescaped-entities': 0,
      'no-var': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'react/jsx-indent': 0,
      'react/display-name': 0,
      'react/destructuring-assignment': 0,
      'react/no-array-index-key': 0,
      'react/default-props-match-prop-types': 0,
      'flowtype/space-after-type-colon': [
        'error',
        'always',
        {
          allowLineBreak: true,
        },
      ],
      'global-require': 0,
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.js', '.jsx'],
        },
      ],
      'react/prop-types': 0,
      'react/sort-comp': 0,
      'react/jsx-space-before-closing': 0,
      'react/jsx-closing-tag-location': 0,
      'react/jsx-tag-spacing': [
        'error',
        {
          beforeSelfClosing: 'always',
        },
      ],
      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: ['.storybook/**', 'stories/**'],
        },
      ],
    },
    globals: {
      it: false,
      expect: false,
      describe: false,
      beforeEach: false,
      afterEach: false,
      jest: false,
      fetch: false,
      navigator: false,
      __DEV__: false,
      XMLHttpRequest: false,
      FormData: false,
      React$Element: false,
      Generator: false,
      TimeoutID: false,
    },
    env: {
      es6: true,
      jest: true,
      browser: true,
      node: true,
    },
    settings: {
      'import/resolver': {
        'babel-module': {},
      },
    },
  }
  