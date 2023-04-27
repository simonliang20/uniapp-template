/**
 * 域名最后请以 / 结尾，不然会报错
 */

const HOSTS = {
  development: "https://test-weixin-api.simon.com/", // 开发环境 => yarn dev
  test: "https://test-weixin-api.simon.com/", // 测试环境 => yarn build:test
  staging: "https://staging-weixin-api.simon.com/", // 预发环境 => yarn build:staging
  production: "https://weixin-api.simon.com/", // 正式环境 => yarn build 或者 yarn build:production
};

const ENV_NAME =
  (import.meta.env.VITE_ENV_TYPE as keyof typeof HOSTS) || "production";

console.log("ENV_NAME", import.meta.env.MODE);

export const baseUrl = HOSTS[ENV_NAME];
