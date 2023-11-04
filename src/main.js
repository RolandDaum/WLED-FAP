const { app, BrowserWindow, Menu, Tray, screen, ipcMain, ipcRenderer } = require('electron')
const path = require('path')
const { Worker } = require('worker_threads')

app.on('ready', boot)
// default mäßig beendet er die app, so aber nicht
app.on('window-all-closed', () => {})



function boot() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
  traySetup()

  // for (let i = 0; i < 6; i++) {
  //   run()
  // }
}
// Gibt es eine Worker ID oder so? Welchen worker habe ich zuerst gecalled etc....
function run() {
  const worker = new Worker('./src/worker.js')
  worker.postMessage('Message from main .js file')
  worker.on('message', (message) => {
    console.log(message)
    if (message === 'close') {
      worker.terminate()
    }
  })
  worker.on('exit', () => {
    console.log('quited worker')
  })
}

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: __dirname + '/assets/icon.png',
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('./src/Home.html')

  ipcMain.on('minimizeWin', () => {
    win.minimize()
  })
  ipcMain.on('maximizeWin', (event) => {
    if (win.isMaximized()) {
      win.restore()
    } else {
      win.maximize()
    }
  })
  win.on('resize', () => {
    win.webContents.send('maximizeWin', win.isMaximized())
  })
  ipcMain.on('closeWin', () => {
    win.close()

    // remove all eventlistener, weil ansonsten noch alte da sind die auf ein destroyed win objekt hören
    ipcMain.removeAllListeners('minimizeWin')
    ipcMain.removeAllListeners('maximizeWin')
    ipcMain.removeAllListeners('closeWin')
  })
}

function traySetup() {
  let tray = new Tray('./src/assets/icon.png')
  // every ctx menu items
  // const contextMenu = Menu.buildFromTemplate([
  //   { label: 'Normaler Eintrag', click: () => console.log('Normaler Eintrag geklickt') },
  //   { type: 'separator' },
  //   { label: 'Checkbox-Eintrag', type: 'checkbox', checked: true },
  //   { label: 'Options-Eintrag 1', type: 'radio', checked: true },
  //   { label: 'Options-Eintrag 2', type: 'radio', checked: false },
  //   {
  //     label: 'Untermenü',
  //     submenu: [
  //       { label: 'Untermenü-Eintrag 1', click: () => console.log('Untermenü-Eintrag 1 geklickt') },
  //       { label: 'Untermenü-Eintrag 2', click: () => console.log('Untermenü-Eintrag 2 geklickt') },
  //     ]
  //   },
  //   { label: 'Deaktivierter Eintrag', enabled: false },
  // ]);
  function refreshToggleTray() { // funciton to refresh and toggle items in the tray ctx Menu
    const pauseIconPath = path.join(__dirname, '/assets/Tray_pause16x16.png')
    const playIconPath = path.join(__dirname, '/assets/Tray_play16x16.png')
    if (contextMenuList[2].icon === pauseIconPath) {
      contextMenuList[2].icon = playIconPath
      contextMenuList[2].label = 'play'
    } else {
      contextMenuList[2].icon = pauseIconPath
      contextMenuList[2].label = 'pause'
    }
    tray.setContextMenu(Menu.buildFromTemplate(contextMenuList))
  }
  let contextMenuList = [ // The acutal ctx menu as a list
    { label: 'WLED - FAP', 
      enabled: false, 
      icon: path.join(__dirname, '/assets/icon16x16.png'),
    },
    { type: 'separator' },
    { label: 'pause',
      icon: path.join(__dirname, '/assets/Tray_pause16x16.png'),
      click: () => { refreshToggleTray() },
    },
    { label: 'settings',
      icon: path.join(__dirname, '/assets/Tray_settings16x16.png') 
    },
    { type: 'separator' },
    { label: 'Quit',
      click: () => {
        console.log('Quiting App ...'),
        app.quit()
      } 
    },
  ]
  tray.setContextMenu(Menu.buildFromTemplate(contextMenuList)) // initial tray ctx menu build
  tray.setToolTip('WLED-FAP')

  tray.on('click', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  });
}