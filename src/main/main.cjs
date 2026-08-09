const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');

const WINDOW_DEFAULTS = Object.freeze({
  width: 1360,
  height: 860,
  minWidth: 980,
  minHeight: 680,
  backgroundColor: '#0b0d12',
});

// Évite les plantages graphiques observés sur certains pilotes Windows.
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-gpu-compositing');

function createWindow() {
  const window = new BrowserWindow({
    ...WINDOW_DEFAULTS,
    title: 'Voxelaris — Prototype',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: !app.isPackaged,
    },
  });

  window.removeMenu();
  window.loadFile(path.join(__dirname, '..', 'index.html'));
  window.once('ready-to-show', () => window.show());

  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', (event) => event.preventDefault());
}

ipcMain.handle('app:get-info', () => ({
  name: 'Voxelaris',
  version: app.getVersion(),
  platform: process.platform,
  demo: true,
}));

ipcMain.handle('catalog:get-demo', async () => {
  const catalogPath = path.join(__dirname, '..', 'data', 'catalog.json');
  const content = await fs.readFile(catalogPath, 'utf8');
  const projects = JSON.parse(content);
  if (!Array.isArray(projects)) throw new Error('Format du catalogue invalide.');
  return projects;
});

ipcMain.handle('demo:verify-package', (_event, payload) => {
  if (!payload || typeof payload.projectId !== 'string' || payload.projectId.length > 80) {
    throw new Error('Identifiant de projet invalide.');
  }

  const bytes = Buffer.from(`voxelaris-demo:${payload.projectId}:0.1.0`, 'utf8');
  return {
    algorithm: 'SHA-256',
    hash: crypto.createHash('sha256').update(bytes).digest('hex'),
    bytes: bytes.length,
    verified: true,
  };
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
