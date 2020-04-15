const ipcRenderer = require('electron').ipcRenderer;
const { dialog } = require('electron').remote

let btnJoin = document.getElementById('btn-join');
let data;
btnJoin.addEventListener('click', () => {
    var userId = document.getElementById('userId').value;
    var userPassword = document.getElementById('userPassword').value;
    var userName = document.getElementById('userName').value;
    var user = {
        userId : userId,
        userPassword: userPassword,
        userName: userName
    }
    ipcRenderer.send('join-request', user);
})

let btnClose = document.getElementById('btn-close');
btnClose.addEventListener('click', () => {
    ipcRenderer.send('join-close');
})