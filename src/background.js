'use strict'

import { app, protocol, BrowserWindow, ipcMain, shell} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import invoice from '@/database/stores/invoice'
import credentials from '@/database/stores/credentials'
import * as os from "os";

const isDevelopment = process.env.NODE_ENV !== 'production'
const fs = require('fs')
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1000,
    minHeight: 600,
    title: "Invoice Generator",
    frame: false,
    titleBarStyle: 'hidden',
    icon: __dirname + 'public/favicon.ico',
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      // devTools: false,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('maximize', () => toggleButton())

  win.on('unmaximize', () => toggleButton())
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

function toggleButton() {
  returnChannel('full', win.isMaximized())
}

//titlebar functions
ipcMain.on('close',() => {
  win.close();
})

ipcMain.on('min',() => {
  win.minimize()
})

ipcMain.on('full',() => {
  win.isMaximized()? win.unmaximize() : win.maximize();
})


//invoice db functions
ipcMain.on('addInvoice',(event, data) => {
  returnChannel('progress', true);
  invoice.addInvoice(JSON.parse(data))
      .then(r => returnChannel('addInvoice', r));
})

ipcMain.on('fetchAllInvoices',() => {
  invoice.fetchAllInvoices()
      .then(r => returnChannel('fetchAllInvoices', r));
})

ipcMain.on('fetchInvoice',(event, data) => {
  invoice.fetchInvoice(JSON.parse(data))
      .then(r => returnChannel('fetchInvoice', r));
})

ipcMain.on('deleteInvoice',(event, data) => {
  returnChannel('progress', true);
  invoice.deleteInvoice(JSON.parse(data))
      .then(r => returnChannel('deleteInvoice', r));
})

ipcMain.on('editInvoice',(event, data) => {
  returnChannel('progress', true);
  invoice.editInvoice(JSON.parse(data))
      .then(r => returnChannel('editInvoice', r));
})

ipcMain.on('paycheckInvoice',(event, data) => {
  returnChannel('progress', true);
  console.log(JSON.parse(data))
  invoice.paycheckInvoice(JSON.parse(data))
      .then(r => returnChannel('paycheckInvoice', r));
})

ipcMain.on('paginate',(event, data) => {
  invoice.paginate(JSON.parse(data))
      .then(r => returnChannel('paginate', r));
})

ipcMain.on('pageCount',() => {
  invoice.pageCount()
      .then(r => returnChannel('pageCount', Math.ceil(r / invoice.perPage)));
})


//credentials db functions
ipcMain.on('getCredentials',() => {
  credentials.getCredentials()
      .then(r => returnChannel('getCredentials', r));
})

ipcMain.on('setCredentials',(event, data)=>{
  returnChannel('progress', true);
  credentials.setCredentials(JSON.parse(data))
      .then(r => returnChannel('setCredentials', r));
})

//toasts
ipcMain.on('toast',(event, data)=>{
  returnChannel('toast', data);
})

function returnChannel(channel, data) {
  win.webContents.send(channel, data);
}

ipcMain.on('printPDF', (event, data) => {
  returnChannel('progress', true);

  const folderPath = path.join(os.homedir(), 'Documents', 'Invoices', `${ data.name }.pdf`)
  const pdfPath = path.join(folderPath, `${ data.name }.pdf`)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true
    });
  }

  win.webContents.printToPDF({}).then(data => {
    fs.writeFile(pdfPath, data, (error) => {
      if (error) returnChannel('toast', 'error');
      else {
        returnChannel('toast', 'success');
        shell.showItemInFolder(pdfPath);
      }
    })
  }).catch(() => {
    returnChannel('toast', 'error');
  })
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
