import { ipcMain } from 'electron'
import { execFile } from 'child_process'
import path from 'path'
import { promisify } from 'util'

export const ipcHandlers = (): void => {
  ipcMain.handle('loadFile', async (_, args) => {
    // const distPath = 'resources/python/main.exe'
    const exec = promisify(execFile)
    // process.cwd()
    const exePath = path.join(__dirname, '../../python/dist/main/main.exe')

    const { stdout } = await exec(exePath, ['transcribe-audio', args])

    return JSON.parse(stdout)
  })
}
