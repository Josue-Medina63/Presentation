import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "node_modules_broken_*/**"]
  },
  ...nextVitals
];

export default eslintConfig;
