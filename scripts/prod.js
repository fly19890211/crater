#!/usr/bin/env babel-node
// @flow

import {run as supervisor} from 'supervisor'
import asyncScript from './util/asyncScript'
import installMeteorDeps from './installMeteorDeps'
import path from 'path'
import build from './build'
import buildDir from '../buildDir'

process.on('SIGINT', (): any => process.exit(1))

process.env.NODE_ENV = 'production'
process.env.USE_DOTENV = '1'

asyncScript(async (): Promise<any> => {
  await build()
  await installMeteorDeps()
  supervisor(['-w', buildDir, path.join(buildDir, 'index.js')])
}, {
  exitOnSuccess: false,
})
