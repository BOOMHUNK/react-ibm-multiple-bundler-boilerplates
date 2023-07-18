const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

function replaceIconsReactRecursively (directoryPath) {
  fs.readdirSync(directoryPath).forEach((item) => {
    const itemPath = path.join(directoryPath, item)
    const stats = fs.statSync(itemPath)

    if (stats.isDirectory()) {
      if (item === 'carbon-components-react') {
        console.log(chalk.yellow('Processing folder:'), chalk.gray(itemPath))
        replaceIconsReactInFolder(itemPath)
      } else {
        replaceIconsReactRecursively(itemPath)
      }
    }
  })
}

function replaceIconsReactInFolder (directoryPath) {
  fs.readdirSync(directoryPath).forEach((item) => {
    const itemPath = path.join(directoryPath, item)
    const stats = fs.statSync(itemPath)

    if (stats.isFile() && path.extname(item) === '.js') {
      console.log(chalk.yellow('Processing file:'), chalk.gray(itemPath))
      try {
        const fileContents = fs.readFileSync(itemPath, 'utf8')
        const updatedContents = fileContents.replace(/@carbon\/icons-react(?!\d)/g, '@carbon/icons-react10')
        if (fileContents !== updatedContents) {
          fs.writeFileSync(itemPath, updatedContents, 'utf8')
          console.log(chalk.green('Replaced @carbon/icons-react with @carbon/icons-react10'))
        } else {
          console.log(chalk.blue('No replacement needed'))
        }
      } catch (error) {
        console.error(chalk.red('Error occurred while processing:'), chalk.gray(itemPath))
        console.error(chalk.red(error))
      }
    } else if (stats.isDirectory()) {
      replaceIconsReactInFolder(itemPath)
    }
  })
}

// Usage:
replaceIconsReactRecursively(path.resolve(__dirname, 'node_modules'))
