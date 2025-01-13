import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Add rules to disable them
      "react/no-unescaped-entities": "off", // Example: Disable unescaped entities rule
      "@next/next/no-img-element": "off", // Example: Allow <img> tags instead of <Image>
      "no-console": "off", // Example: Allow console logs
    },
  },
];

export default eslintConfig;
