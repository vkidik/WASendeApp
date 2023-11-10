const { app, BrowserWindow, ipcMain } = require('electron')
app.disableHardwareAcceleration();
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    resizable: false,
    fullscreen: false,
    autoHideMenuBar: true,
    fullscreenable: false,
    skipTaskbar: false,
    webPreferences: {
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('../../index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  console.log("WASender start working")
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

ipcMain.on("next_user",()=>{
  mainWindow.webContents.send("next_suka_user")
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log("WASender stop working");
    app.quit()
}
})