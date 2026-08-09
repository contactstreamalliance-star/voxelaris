const { contextBridge, ipcRenderer } = require('electron');

// API minimale exposée à l'interface isolée.
contextBridge.exposeInMainWorld('voxelaris', Object.freeze({
  getAppInfo: () => ipcRenderer.invoke('app:get-info'),
  getDemoCatalog: () => ipcRenderer.invoke('catalog:get-demo'),
  verifyDemoPackage: (projectId) => ipcRenderer.invoke('demo:verify-package', { projectId }),
}));
