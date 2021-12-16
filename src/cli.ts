import inquirer from 'inquirer'
import { converter } from './index'
import { customInspect } from './utils/log'
import { CONFIG_PATH } from './utils/config'
const tempConfig = require(CONFIG_PATH)
const { protoPath, serviceName } = tempConfig

if (!protoPath || !serviceName) {
  inquirer
    .prompt([
      {
        name: 'protoPath',
        type: 'input',
      },
      {
        name: 'serviceName',
        type: 'input',
      },
    ])
    .then(async ({ protoPath, serviceName }) => {
      await converter(protoPath, serviceName)
    })
    .catch((error) => {
      if (error.isTtyError) {
        customInspect("Prompt couldn't be rendered in the current environment")
      } else {
        customInspect(error)
      }
    })

} else {
  try {
    converter(protoPath, serviceName)
  } catch (error) {
    customInspect(error)
  }
}

