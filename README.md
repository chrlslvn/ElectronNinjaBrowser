# Ninja Browser

This is an [electron-based](https://electron.atom.io/) minimal browser, that can be made sticky/always-on-top.

Browse like a Ninja

# Source
This repo is a fork of Sticky Browser by @ocjojo

Download original from [release page](https://github.com/ocjojo/sticky-browser/releases).

---

You can change the browser window size and scale from the app > main.js -> BrowserWindow function

Read more about Electron's Browser Window api -> [here](https://electronjs.org/docs/api/browser-window)

## Development

1. Clone this repo
2. run `npm install`
3. run `npm run start`

All relevant source files are within the `app` folder.

To create a distributable app [electron-builder](https://github.com/electron-userland/electron-builder) is used.
For macOS just run `npm run build` and see the files in `dist` folder.
