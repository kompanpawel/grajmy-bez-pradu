module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier"
  ],
  "env": {
    "jest": true,
    "node": true,
    "commonjs": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "trailingComma": "es5",
        "printWidth": 120,
        "semi": true,
        "singleQuote": false,
        "endOfLine": "auto",
        "arrowParens": "always"
      }
    ],
    "no-console": "warn",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "none",
        "ignoreRestSiblings": false
      }
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        "functions": false
      }
    ],
    "@typescript-eslint/prefer-interface": "off"
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "parser": "@typescript-eslint/parser"
}

