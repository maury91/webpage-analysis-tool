import { ipcMain, ipcRenderer } from 'electron';
import { AnalyzePageResult } from '../main/analyze';

export const analysePage = (url: string): Promise<AnalyzePageResult> =>
  new Promise((resolve, reject) => {
    ipcRenderer.on('analyze-success', (event: Electron.IpcMessageEvent, eventResult: any) => {
      resolve(eventResult);
    });
    ipcRenderer.on('analyze-error', (event: Electron.IpcMessageEvent, eventResult: any) => {
      reject(eventResult);
    });
    ipcRenderer.send('analyze', url);
  });

export const onAnalysePage = (callback: (url: string) => Promise<AnalyzePageResult>) => {
  ipcMain.on('analyze', (event: Electron.IpcMessageEvent, url: string) => {
    callback(url)
      .then(result => event.sender.send('analyze-success', result))
      .catch(error => event.sender.send('analyze-error', error));
  });
};
