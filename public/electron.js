const path = require('path')

const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = !app.isPackaged

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '/preload.js')
    },
  })

  ipcMain.on('focus-top', () => {
    // let alwaysOnTopLevel = "normal";
    // // Mac OS requires a different level for our drag/drop and overlay
    // // functionality to work as expected.
    // if (process.platform === "darwin") {
    //   alwaysOnTopLevel = "floating";
    // }
    if (win.isMinimized()) {
      win.restore()
    }
    win.on('show', () => {
      setTimeout(() => {
        win.setAlwaysOnTop(false, "floating")
        // win.setVisibleOnAllWorkspaces(false, { visibleOnFullScreen: false })
        win.focus()
      }, 200);
    })
    // win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })
    win.setAlwaysOnTop(true, "floating")
    win.show()
  })

  win.loadURL(
    isDev
      ? 'http://localhost:12001'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
