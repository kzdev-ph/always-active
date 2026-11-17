# Always Active

## Folders

| Folder | Browser |
| --- | --- |
| `Chrome_Edge/` | Chrome, Edge and other Chromium browsers |
| `Firefox/` | Firefox 128+ (desktop and Android) |

The code is the same in both. Only `manifest.json` differs.

## Install

**Chrome / Edge:** open `chrome://extensions` (or `edge://extensions`), turn on Developer mode, click **Load unpacked**, and pick `Chrome_Edge`.

**Firefox:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on**, and pick `Firefox/manifest.json`. Temporary add-ons are removed when Firefox closes. Allow access to all sites if Firefox asks.

Reload the page you want to use it on after installing or changing a setting.

Add this to your browser shortcut --disable-features=CalculateNativeWinOcclusion --disable-backgrounding-occluded-windows --source-shortcut-location=taskbar
(i have only tested this in edge and chrome and both works although i haven't tested it on github)
