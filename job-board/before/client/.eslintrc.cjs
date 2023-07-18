/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react-refresh", "@typescript-eslint", "import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: true,
    },
  },
  rules: {
    "react-refresh/only-export-components": "warn",
    "import/no-restricted-paths": [
      "error",
      {
        basePath: "./src",
        zones: [
          {
            target: ["./!(features)/**/*", "./!(features)*"],
            from: ["./features/*/!(index.*)", "./features/*/!(index.*)/**/*"],
            message:
              "Cannot import anything except the index file within a feature folder",
          },
        ],
      },
    ],
  },
}
