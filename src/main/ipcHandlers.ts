import { execFile } from 'child_process'
import { ipcMain } from 'electron'
import path from 'path'
import { promisify } from 'util'

export const ipcHandlers = (): void => {
  ipcMain.handle('loadFile', async (_, args) => {
    // const distPath = 'resources/python/main.exe'
    const exec = promisify(execFile)
    // process.cwd()
    const exePath = path.join(__dirname, '../../python/dist/main/main.exe')

    const { stdout } = await exec(exePath, ['transcribe-audio', args.path, args.model])

    return JSON.parse(stdout)
  })

  ipcMain.handle('generateVideo', async (_, args) => {
    // const distPath = 'resources/python/main.exe'
    const exec = promisify(execFile)
    // process.cwd()
    const exePath = path.join(__dirname, '../../python/dist/main/main.exe')

    const { stdout } = await exec(exePath, [
      'create-video',
      args.path,
      JSON.stringify(args.segments)
    ])

    console.log(stdout)

    return 'done'
  })
}
