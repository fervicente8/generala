import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals"],
    rules: {
      // React hooks: Asegúrate de que todas las dependencias de useEffect estén correctamente configuradas
      "react-hooks/exhaustive-deps": ["warn", {
        "additionalHooks": "(useCallback|useMemo)" // Agrega otros hooks que quieras monitorear
      }],

      // Evitar el uso de comillas no escapadas
      "react/no-unescaped-entities": ["error", {
        "escape": {
          "quotes": true,
        }
      }],

      // Advertencia para el uso de <img> en lugar de <Image />
      "@next/next/no-img-element": "warn",

      // Evitar el uso condicional de hooks
      "react-hooks/rules-of-hooks": "error",
    },
  }),
];

export default eslintConfig;
