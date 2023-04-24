const ci = require("miniprogram-ci");
const path = require("path");
const root = process.cwd();
console.log(root);

const appid = "wx219a0e213fb3e37a";

(async () => {
  const project = new ci.Project({
    appid,
    type: "miniProgram",
    projectPath: root + "/dist/build/mp-weixin",
    privateKeyPath: path.resolve(__dirname, `./private.${appid}.key`),
    ignores: ["node_modules/**/*"],
  });
  const uploadResult = await ci.upload({
    project,
    version: "1.1.1",
    desc: "hello",
    setting: {
      es6: true,
    },
    onProgressUpdate: console.log,
  });
  console.log(uploadResult);
})();
