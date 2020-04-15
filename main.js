const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const request = require('request')
// const mysql = require('mysql')
// const dbconfig = require('./resources/db/dbconfig.js')
// const connection = mysql.createConnection(dbconfig)

let joinWindow;
let loginWindow;
let mainWindow;
function createWindow() {
  // 회원가입 창
  // 브라우저 창을 생성합니다.
  joinWindow = new BrowserWindow({
    width: 800,
    height: 400,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    frame:false
  })

  joinWindow.loadFile('src/user/join.html')

  // 개발자 도구를 엽니다.
  joinWindow.webContents.openDevTools();

  //로그인 창
  loginWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  loginWindow.loadFile('src/user/login.html');

  // 메인 팝업
  // 브라우저 창을 생성합니다.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 800,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('src/mainwindow/mainwin.html')
  
  // // 개발자 도구를 엽니다.
  mainWindow.webContents.openDevTools();
}

// 이 메소드는 Electron의 초기화가 완료되고
// 브라우저 윈도우가 생성될 준비가 되었을때 호출된다.
// 어떤 API는 이 이벤트가 나타난 이후에만 사용할 수 있습니다.
app.whenReady().then(createWindow)

// 모든 윈도우가 닫히면 종료된다.
app.on('window-all-closed', () => {
  // macOS에서는 사용자가 명확하게 Cmd + Q를 누르기 전까지는
  // 애플리케이션이나 메뉴 바가 활성화된 상태로 머물러 있는 것이 일반적입니다.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS에서는 dock 아이콘이 클릭되고 다른 윈도우가 열려있지 않았다면
  // 앱에서 새로운 창을 다시 여는 것이 일반적입니다.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// joinrenderer 회원가입 버튼 누르면 넘어옴
ipcMain.on('join-request', (event, user) => {
  console.log('user : ' + user);

  request.post({
    headers: { 'content-type': 'application/json' },
    url: 'http://127.0.0.1:3000/users/join',
    body: JSON.stringify(user)
  }, (error, response, body) => {
    dialog.showMessageBox(joinWindow, {
      message: body,
      title: 'JOIN RESULT'
    })
  })
});

// joinRenderer close 버튼 누르면 넘어옴
ipcMain.on('join-close', (event) => {
  // 창 닫힘
  joinWindow.close();
})
// =====join 끝=====

// loginRnderer 
ipcMain.on('login-request', (event, user) => {
  console.log('user', user);

  request.post({
    headers: { 'content-type': 'application/json' },
    url: 'http://127.0.0.1:3000/users/login',
    body: JSON.stringify(user)
  }, (error, response, body) => {
     dialog.showMessageBox(loginWindow, {
       message: body
     });
     // 로그인 성공하면 창 꺼지고 main 뜨도록
     loginWindow.close();
     mainWindow.show();
  })
})

// loginRenderer에서 회원가입 버튼 누르면 넘어옴
ipcMain.on('request-join-modal', (event) => {
  console.log('main event', event)
  if(event!=null) {
    joinWindow.show();
  }
})

ipcMain.on('kakao-request', () => {
  request.post( {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8',
      'cid': 'TC0ONETIME',
      'partner_order_id': 'partner_order_id',
      'partner_user_id': 'partner_user_id',
      'item_name': '피씨방결제',
      'quantity': '1',
      'total_amount': '2200',
      'vat_amount': '200',
      'tax_free_amount': '0',
      'approval_url': 'https://developers.kakao.com/success',
      'fail_url': 'https://developers.kakao.com/fail',
      'cancel_url': 'https://developers.kakao.com/cancel'
    },
    url: 'https://kapi.kakao.com/v1/payment/ready',
  })
})