export const getGitCommit = () => {
  try {
    const config = require('../../git-commit.json')
    return config.gitCommit
  } catch (error) {
    return ''
  }
}

export const googleTagManagerId = 'UA-69285708-14'
