const { app, ipcMain, BrowserWindow, Notification } = require('electron');
const path = require('node:path');

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1279,
    height: 868,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    autoHideMenuBar: true,
    frame: false,
    icon: path.join(__dirname, './assets/logo.png')
  });

  mainWindow.loadFile('index.html');

  let iconAddress = path.join(__dirname, './assets/logo.png');
  let randomNotificationMessages = ['Application loaded'];
  let notificationText = randomNotificationMessages[Math.floor(Math.random() * randomNotificationMessages.length)];
  const notif = new Notification({
    title: 'Application:',
    body: notificationText,
    icon: iconAddress,
    silent: false,
    timeoutType: 'default',
  });

  notif.show();
  setTimeout(() => {
    notif.close();
  }, 3000);

  ipcMain.handle('get-app-version', () => app.getVersion());

  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    let iconAddress = path.join(__dirname, './assets/logo.png');
    const notification = new Notification({
      icon: iconAddress,
      title: 'Application Termination',
      body: 'The application will be terminated shortly.',
      timeoutType: 'default'
    });

    notification.show();

    setTimeout(() => {
      notification.close();
      app.quit();
    }, 3000);
  }
});
