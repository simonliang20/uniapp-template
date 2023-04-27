import { createSSRApp } from "vue";
import App from "./App.vue";

import { baseUrl } from "@/services/api-prefix";

console.log("baseUrl", baseUrl);

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
