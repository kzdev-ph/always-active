// Toggles the setting from the keyboard shortcut and shows "OFF" on the
// toolbar icon while disabled.
const updateBadge = (enabled) => {
  chrome.action.setBadgeText({ text: enabled ? '' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#c42b1c' });
};

chrome.storage.local.get({ enabled: true }, ({ enabled }) => updateBadge(enabled));

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled) updateBadge(changes.enabled.newValue);
});

chrome.commands.onCommand.addListener((command) => {
  if (command !== 'toggle') return;
  chrome.storage.local.get({ enabled: true }, ({ enabled }) => {
    chrome.storage.local.set({ enabled: !enabled });
  });
});
