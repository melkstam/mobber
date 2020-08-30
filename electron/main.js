const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const Store = require('electron-store');

const optionsStore = new Store();

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 720,
    show: false,
    webPreferences: {
      backgroundThrottling: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(
    !app.isPackaged
      ? process.env.ELECTRON_START_URL
      : url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      }),
  );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('minimize', async () => {
  mainWindow.minimize();
});

ipcMain.handle('maximize', async () => {
  mainWindow.restore();
  mainWindow.show();
});

ipcMain.handle('saveOptions', async (_, options) => optionsStore.set('options', options));

ipcMain.handle('getOptions', async () => optionsStore.get('options'));
