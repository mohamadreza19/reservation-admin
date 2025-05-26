// lib/env.js
import { cleanEnv, str, url } from "envalid";

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_API_URL: url(),
});

export default env;
