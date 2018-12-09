module.exports = {
    "extends": "./node_modules/@zelz/crank/eslint-config.js",
    "parser": "typescript-eslint-parser",
    "plugins": [
      "react-hooks"
    ],
    "rules": {
        "arrow-body-style": "off",
        "no-shadow": "off",
        "semi": "off",
        "no-console": "off",
        "react-hooks/rules-of-hooks": "error",
        // Overrides for typescript parsing
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-restricted-globals": "off"
    }
}
