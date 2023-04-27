const inquirer = require("inquirer");
const { execSync, spawn } = require("child_process");

// 获取打包的环境配置
const { packageName, targetEnvironment } = require("./config.cjs");

const currentBranch = execSync("git symbolic-ref --short -q HEAD")
  .toString()
  .trim();
const allBranches = getBranches();
const promptList = [
  {
    choices: allBranches,
    default: allBranches.indexOf(currentBranch),
    message: "请选择要打包的分支:",
    name: "source",
    type: "list",
  },
  {
    choices: Object.keys(targetEnvironment),
    name: "target",
    message: "请选择目标分支:",
    type: "list",
  },
  {
    default: false,
    message: function (answers) {
      return (
        "请\033[31m 确保 \033[0m你的分支 (\033[32m" +
        answers.source +
        "\033[0m) 是最新的分支!\n \033[31m确定要继续吗?\033[0m"
      );
    },
    name: "confirm",
    type: "confirm",
  },
];

function getBranches(stdout) {
  try {
    const tagetBranches = Object.values(targetEnvironment);
    const result = execSync("git branch").toString().trim();

    const branches = [];
    result.split("\n").forEach((item, index) => {
      const branchName = item.trim().replace("* ", ""); // 去除当前分支名前的 * 号

      if (!tagetBranches.includes(branchName)) {
        branches.push(branchName);
      }
    });
    return branches;
  } catch (err) {
    console.log("error =", err);
    return [];
  }
}

function build(answers) {
  const child = spawn("sh", ["scripts/build/sub-build.sh"], {
    stdio: "inherit",
    env: Object.assign(
      {
        SOURCE_BRANCH: answers.source,
        TARGET_BRANCH: targetEnvironment[answers.target],
        PACKAGE_NAME: packageName,
      },
      process.env
    ),
  });

  child.on("close", (code) => {
    // console.log(`exit：${code}`)

    execSync("git checkout " + currentBranch);
  });
}

async function main() {
  let answers = await inquirer.prompt(promptList);
  // console.log(answers) // 返回的结果

  if (answers.confirm) {
    build(answers);
  }
}

main();
