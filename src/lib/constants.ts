export const getGitCommit = () => {
  try {
    const config = require('../../git-commit.json')
    return config.gitCommit
  } catch (error) {
    return ''
  }
}
