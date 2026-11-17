# Always Active

A small browser extension that keeps pages running when you alt-tab, switch windows, or leave fullscreen, plus an option to allow copying on pages that block it.

- **Always Active**: pages see themselves as always visible and focused, and fullscreen requests are faked so leaving fullscreen doesn't pause games.
- **Allow Copy**: re-enables text selection, right-click, and Ctrl/Cmd+C/X/A on pages that block them.

Both can be toggled separately from the toolbar popup. Always Active also has the shortcut `Alt+Shift+A`.

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
