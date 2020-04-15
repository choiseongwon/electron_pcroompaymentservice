const ipcRenderer = require('electron').ipcRenderer;

let kakao_request_btn = document.getElementById('kakao-request');
kakao_request_btn.addEventListener('click', () => {
    ipcRenderer.send('kakao-request');
})