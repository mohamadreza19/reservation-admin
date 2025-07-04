import { defineConfig } from "orval";
console.log(process.env.NEXT_PUBLIC_API_URL);
export default defineConfig({
  vaghtban: {
    input: {
      target: "http://localhost:3030/swagger-json", // Path to your NestJS-generated swagger.json
    },
    output: {
      mode: "tags-split",
      target: "src/libs/api/generated", // Output directory for generated files
      schemas: "src/libs/api/generated/models", // Directory for TypeScript models

      clean: true,
      client: "react-query", // Generate React Query hooks
      mock: false, // Optional: Generate MSW mocks
      prettier: true, // Format generated files with Prettier
      indexFiles: true,

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
