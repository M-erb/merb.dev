// -------------------
// Ship off built files
// -------------------
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import notifier from 'node-notifier'
import dotenv from 'dotenv'
import env from 'dotenv-cast'
import fse from 'fs-extra'
import { execSync } from 'node:child_process'

dotenv.config()
const __dirname = path.dirname(new URL(import.meta.url).pathname)
const root = path.join(__dirname, '../')

const log = console.log

const shipCommandStag = env('SHIP_STAG', '')
const shipCommandProd = env('SHIP_PROD', '')

async function init () {
  log(chalk.bgBlueBright('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'))
  log(chalk.bgBlueBright('-==Lets get this thing deployed!==-'))
  log(chalk.bgBlueBright('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'))

  if (!shipCommandStag || !shipCommandProd) {
    log(chalk.redBright('> Oops, I ether cannot find a ".env" file or the ship commands are not given there.'))
    return
  }

  const questions = [
    {
      type: 'list',
      name: 'envTo',
      message: 'Which Enviorment?',
      choices: [
        {
          name: 'Staging',
          value: 'stag'
        },
        {
          name: 'Production',
          value: 'prod'
        }
      ]
    },
    {
      type: 'list',
      name: 'isConfirmed',
      message: 'Are you sure you want to ship to prod?',
      choices: [
        {
          name: 'No',
          value: false,
          short: '"No" - Cancelled ship'
        },
        {
          name: 'Yes',
          value: true,
          short: 'Yes'
        }
      ],
      when (curAnswers) {
        return curAnswers.envTo === 'prod'
      }
    }
  ]

  const answers = await inquirer.prompt(questions)
  const HOST = answers.envTo === 'prod' ? env('PROD_DOMAIN', 'prod site') : env('STAG_DOMAIN', 'staging site')

  if (answers.envTo === 'prod' && !answers.isConfirmed) {
    log('')
    log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
    log('.....' + chalk.red('CANCELLED!...........'))
    log('.....' + chalk.red('ENV: Prod............'))
    log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
    log('')

    return
  }

  if (!fse.existsSync(root, './dist')) {
    log('')
    log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
    log('.....' + chalk.red('SITE FILES NOT FOUND!'))
    log('.....' + chalk.red('ENV: Prod............'))
    log('.....' + chalk.red('Could not find.......'))
    log('.....' + chalk.red('folder "./dist"......'))
    log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
    log('')
    return
  }

  if (answers.envTo === 'prod' && !shipCommandProd) return log(chalk.bgRed('Oops, I cannot find the SHIP_PROD command'))
  if (answers.envTo === 'stag' && !shipCommandStag) return log(chalk.bgRed('Oops, I cannot find the SHIP command'))

  const executeOrder = `rsync -rvzz ./dist/ ${answers.envTo === 'prod' ? shipCommandProd : shipCommandStag} --progress`

  try {
    execSync(executeOrder, { stdio: [0, 1, 2] })
  } catch (error) {
    return errorNoty(error, HOST)
  }

  notifier.notify({
    title: `SHIPPED to ${answers.envTo === 'stag' ? 'Staging' : 'Prod'}`,
    message: HOST
  })

  log('')
  log('.....' + chalk.bgGreen('=-=-=-=-=-=-=-=-=-=-='))
  log('.....' + chalk.green('SHIPPED!'))
  log('.....' + chalk.green(`ENV: ${answers.envTo === 'stag' ? 'Staging' : 'Prod'}`))
  log('.....' + chalk.green(`For: ${HOST}`))
  log('.....' + chalk.bgGreen('=-=-=-=-=-=-=-=-=-=-='))
  log('')
}

function errorNoty (err, domain) {
  notifier.notify({
    title: 'SHIPPED FAIILD',
    message: `${domain} - check console`
  })

  log('')
  log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
  log('.....' + chalk.red('Something went wrong with the ship command, please check it'))
  log('.....' + chalk.bgRed('=-=-=-=-=-=-=-=-=-=-='))
  log('')

  log(chalk.red(err))
}

init()
