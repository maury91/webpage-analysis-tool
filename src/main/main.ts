import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { onAnalysePage } from '../common/communication';
import { analyzePage } from './analyze';
import { installExtensions, isDev } from './devUtils';
import { downloadFile } from './download';

let win: BrowserWindow | null;

const createWindow = async () => {
  if (isDev) {
    await installExtensions();
  }

  win = new BrowserWindow({ width: 800, height: 600, resizable: false });

  if (isDev) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

onAnalysePage(async rawUrl => {
  const url = rawUrl.startsWith('http') ? rawUrl : `http://${rawUrl}`;
  console.log('Downloading ', url);
  const html = await downloadFile(url);
  console.log('Analyzing', url);
  return analyzePage(html);
});
