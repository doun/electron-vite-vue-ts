import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import cp from 'child_process'
import { Command } from 'commander'
import electron from 'electron'
import { runSensor } from './sensorHost'
import { runElectron } from './electron'

let prg = new Command()

prg.option("-a", "action", "")
prg.action(async ({ a }) => {
  if (!a) {
    runElectron()
  } else {
    await runSensor()
  }
}).parse()

