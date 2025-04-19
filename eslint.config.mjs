import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals"],
    rules: {
      "react-hooks/exhaustive-deps": ["warn", {
        "additionalHooks": "(useCallback|useMemo)"
      }],

      "react/no-unescaped-entities": ["error", {
        "forbid": ["\"", "\"", "`"]
      }],

      "@next/next/no-img-element": "warn",

      "react-hooks/rules-of-hooks": "error",
    },
  }),
];

export default eslintConfig;
