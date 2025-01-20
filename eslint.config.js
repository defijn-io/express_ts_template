import eslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
    {
        // Global ignores
        ignores: ["dist/**", "node_modules/**"],
    },
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
                tsconfigRootDir: ".",
            },
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        plugins: {
            "@typescript-eslint": eslint,
        },
        rules: {
            // TypeScript specific rules
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "warn",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-unsafe-assignment": "warn",
            "@typescript-eslint/no-unsafe-member-access": "warn",
            "@typescript-eslint/no-unsafe-call": "warn",
            "@typescript-eslint/no-floating-promises": "error",

            // General rules
            semi: "warn",
            eqeqeq: "error",
            "no-return-assign": "error",
            "no-useless-return": "error",
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-unused-vars": "off", // Turned off in favor of @typescript-eslint/no-unused-vars

            // Import all recommended TypeScript rules
            ...eslint.configs.recommended.rules,
            ...eslint.configs["recommended-requiring-type-checking"].rules,
        },
        settings: {
            "import/resolver": {
                typescript: true,
                node: true,
            },
        },
    },
];
