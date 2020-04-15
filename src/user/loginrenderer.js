const ipcRenderer = require('electron').ipcRenderer;
const { dialog } = require('electron').remote

let btnlogin = document.getElementById('btn-login');
let data;
btnlogin.addEventListener('click', () => {
    var userId = document.getElementById('userId').value;
    var userPassword = document.getElementById('userPassword').value;
    
    user = {
        userId : userId, 
        userPassword: userPassword
    }
    
    ipcRenderer.send('login-request', user);
})

let btnJoin = document.getElementById('btn-join');
btnJoin.addEventListener('click', () => {
    console.log('btnJoin')
    ipcRenderer.send('request-join-modal', true);
});