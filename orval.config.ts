import { defineConfig } from "orval";

export default defineConfig({
  vaghtban: {
    input: {
      target: "./swagger.json", // Path to your NestJS-generated swagger.json
    },
    output: {
      mode: "tags-split",
      target: "src/libs/api/generated", // Output directory for generated files
      schemas: "src/libs/api/generated/models", // Directory for TypeScript models

      clean: true,
      client: "react-query", // Generate React Query hooks
      mock: true, // Optional: Generate MSW mocks
      prettier: true, // Format generated files with Prettier

      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: "limit",
        },
        mutator: {
          path: "./src/libs/api/factories/apiClientFactory.ts",
          name: "apiClientFactory",
        },
      },
    },
  },
});
