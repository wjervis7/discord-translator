module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    extends: ["plugin:@typescript-eslint/recommended"],
    env: {
        node: true
    },
    rules: {
        "@typescript-eslint/no-non-null-assertion": "off"
    },
    // Don't lint built files
    ignorePatterns: ["dist/**"]
};