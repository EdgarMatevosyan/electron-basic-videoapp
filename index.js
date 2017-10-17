// Super base electron setup
// const electron = require('electron');
// const { app, BrowserWindow } = electron;
//
// app.on('ready', () => {
//   const mainWindow = new BrowserWindow({});
//
//   /*
//     NOTE / might have to be \ on Windows
//      __dirnam global variable provided by nodejs
//   */
//
//   mainWindow.loadURL(`file://${__dirname}/index.html`);
// });

const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const ffmpeg = require('fluent-ffmpeg');
/*
  NOTE let mainWindow; this creates a variable
*/
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});

  /*
    NOTE / might have to be \ on Windows
     __dirnam global variable provided by nodejs
  */

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    // NOTE this function is a callback so this runs AFTER ffprobe is done
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});
