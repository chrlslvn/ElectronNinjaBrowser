const {
	app,
	BrowserWindow,
	Menu,
	ipcMain,
    session
} = require('electron');

const path = require('path');
const url = require('url');
const fs = require('fs');

/**
 * tries to find widevineCdm to be able to play protected content
 * @return {boolean} returns true if found and registered, false otherwise
 */
function registerWidevine(){
	var chromeDir,
		widevineDir,
		widevinePlugin,
		versions,
		manifest;

	// if (process.platform == 'win32') {
	// 	chromeDir = 'C:\"Program Files (x86)"\Google\Chrome\Application';
	// 	widevineDir = "\WidevineCdm";
	// 	widevinePlugin = "_platform_specific\win_x64\widevinecdm.dll";
	// }
	// try{
	// 	versions = fs.readdirSync(chromeDir);
	// 	// filter same major version
	// 	sameVersion = versions.filter(version=>{
	// 		return process.versions.chrome.split('.')[0] == version.split('.')[0];
	// 	});
	// 	//try any found versions if not same version found.
	// 	if(sameVersion.length){
	// 		versions = sameVersion;
	// 	}
	// 	//read manifest for widevine-cdm-version
	// 	manifest = require(path.join(chromeDir, versions.pop(), widevineDir, 'manifest.json'));	
	// } catch(e){
	// 	return false;
	// }
	// var org = path.join(chromeDir, versions[0], widevineDir, widevinePlugin);
	var org = 'C:\Program Files (x86)\Google\Chrome\Application\75.0.3770.142\WidevineCdm\_platform_specific\win_x64\widevinecdm.dll';
	// console.log(org);
	// You have to pass the filename of `widevinecdmadapter` here, it is
	// * `widevinecdmadapter.plugin` on macOS,
	// * `libwidevinecdmadapter.so` on Linux,
	// * `widevinecdmadapter.dll` on Windows.
	app.commandLine.appendSwitch('widevine-cdm-path', org);
	// The version of plugin can be got from `chrome://plugins` page in Chrome.
	app.commandLine.appendSwitch('widevine-cdm-version', '4.10.1440.18');
	return true;
}

var widevine = registerWidevine();


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {  
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 214,
		height: 321,
		minWidth: 200,
		minHeight: 300,
        sandbox: true,
		frame: false,
		alwaysOnTop: true,
		fullscreenable: false,
        transparent: false,
		opacity: 0.8,
        webPreferences: {
			zoomFactor: 0.7,
            nodeIntegration: true,
            plugins: true,
            webgl: true,
            devTools: true,
            webviewTag: true,
            experimentalFeatures: true,
            contextIsolation: false,
        },
	});
    
	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
    
//    mainWindow.loadURL('https://www.attwatchtv.com');
    
    //userAgent
    
    const filter = {
  		urls: []
	}
    
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
  details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13 Mobile/15E148 Safari/604.1'
  callback({ requestHeaders: details.requestHeaders })
});

//	 Open the DevTools.
//	mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});

	mainWindow.on('focus', function() {
		mainWindow.webContents.send('main', 'focus');
	});
}

// Enable sandbox mode
//app.enableSandbox();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
	const menuTemplate = [{
		label: "Mobile Browser",
		submenu: [
		    { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
		]}, {
		label: "Edit",
		submenu: [
		    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
		    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
		    { type: "separator" },
		    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
		    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
		    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
		    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
		]},
		{
		label: "View",
		submenu: [
		    { label: "Toggle fullscreen",
		      accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
		      click: function(){
		    	fullscreen();
		      }
			}
		]}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

	createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

/**
 * toggles fullscreen
 * @param  {bool} on if true sets fullscreen, if false leaves fullscreen, if not provided toggles
 */
function fullscreen(on){
	//send event to update menu elements
	mainWindow.webContents.send('main', 'toggle-fullscreen');

	if(typeof on == 'undefined') on = !mainWindow.isFullScreenable();
	if(on) mainWindow.setFullScreenable(on);
	mainWindow.setFullScreen(on);
	if(!on) mainWindow.setFullScreenable(on);
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('toggle', (event, arg) => {
	switch(arg){
		case 'pin':
			mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
			break;
		case 'fullscreen':
			fullscreen();
			break;
		case 'close':
			mainWindow.close();
			break;
		case 'widevine':
			if(!widevine){
				event.sender.send('main', 'widevineDisabled');
			}
			break;
		default:
			break;
	}
});

//TODO: save settings