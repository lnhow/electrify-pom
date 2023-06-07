const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // // Invoke Methods
  // testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
  // // Send Methods
  // testSend: (args) => ipcRenderer.send('test-send', args),
  // // Receive Methods
  // testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) })
  focusTop: (args) => {
    console.log('[Dev Log] -> file: preload.js:11 -> focusTop:')  
    ipcRenderer.send('window:focus-top', args)
  },
  alwaysOnTop: (val) => {
    console.log('[Dev Log] -> file: preload.js:15 -> alwaysOnTop:')  
    ipcRenderer.send('window:always-on-top', val)
  },
})
