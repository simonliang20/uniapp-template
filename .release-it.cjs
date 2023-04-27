module.exports = {
  git: {
    requireBranch: "master",
    commitMessage: "chore: release v${version}",
    requireCommits: true,
    tagName: "v${version}",
    tagAnnotation: `release date: ${new Date().toLocaleString()}`,
  },
  npm: {
    publish: false,
  },
};
