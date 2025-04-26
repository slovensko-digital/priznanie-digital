export const getGitCommit = () => {
  try {
    const config = require("../../git-commit.json");
    return config.gitCommit;
  } catch (_error) {
    return "";
  }
};
