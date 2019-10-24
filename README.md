# Ninja Browser

<div align="center">
    <img src="https://user-images.githubusercontent.com/44912259/67528702-ba656f00-f67f-11e9-92d7-bd1b5e1931a5.png">
    <h3>Browse like a Ninja</h3>
</div>

This is an [electron-based](https://electron.atom.io/) minimal browser, updated to use the latest Electron/Chromium builds.

# Source
This repo is a fork of Sticky Browser by [@ocjojo](https://github.com/ocjojo)

Download original from [release page](https://github.com/ocjojo/sticky-browser/releases).

---

Browser Features:

## Transparency and Grayscale filter

![](https://user-images.githubusercontent.com/44912259/67528106-4080b600-f67e-11e9-9530-ee0c03da7eb6.png)
you can enable/disable transparency from the main.js file and grayscale filter from index.html


## Hidden Scrollbars**

![](https://user-images.githubusercontent.com/44912259/67528147-5a21fd80-f67e-11e9-84e3-7037af2ffadb.png)
you can disable this from index.html

## ** 
* You can change the browser window size, transparency and content scale from the app > main.js -> BrowserWindow function
* Hidden Scrollbars/Grayscale filter will load on **DOM ready** event, expect a delay if the webpage loads slow

Read more about Electron's Browser Window api -> [here](https://electronjs.org/docs/api/browser-window)

## Development

1. Clone this repo
2. run `npm install`
3. run `npm run start`

All relevant source files are within the `app` folder.

To create a distributable app [electron-builder](https://github.com/electron-userland/electron-builder) is used.
For macOS just run `npm run build` and see the files in `dist` folder.

## Known Issues

- [ ] Disable Menu feature on the navigation bar is known to break when disabled. This also disables all mouse/keyboard events to the webview