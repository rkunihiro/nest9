/** @type {import("eslint").Linter.Config} */
module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
        jest: true,
    },
    plugins: [
        //
        "@typescript-eslint",
        "import",
        "jest",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: true,
        },
    },
    extends: [
        // "eslint:all",
        "eslint:recommended",
        // "plugin:@typescript-eslint/all",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:jest/recommended",
        "prettier",
    ],
    rules: {
        // ESLint
        "curly": "error",
        "no-else-return": "warn",
        "eqeqeq": "warn",
        "func-style": ["warn", "declaration", { allowArrowFunctions: true }],
        "max-statements": ["warn", 40, { ignoreTopLevelFunctions: true }],
        "one-var": ["warn", "never"],

        // eslint disable from "all" presets
        "id-length": "off",
        "no-console": "off",
        "no-magic-numbers": "off",
        "require-await": "off",
        "sort-keys": "off",
        "sort-imports": "off",

        // @typescript-eslint disable from "all" presets
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",

        // import
        "import/first": "error",
        "import/order": [
            "warn",
            {
                "alphabetize": { order: "asc", caseInsensitive: true },
                "groups": ["builtin", "external", "internal", "parent", "sibling"],
                "newlines-between": "always",
            },
        ],
    },
};
