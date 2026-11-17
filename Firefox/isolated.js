// ISOLATED world: reads the on/off settings and exposes them to inject.js (MAIN world)
// and copy.css through data attributes on <html>. inject.js checks the attributes on
// every call, so both default to "on" until storage answers and follow later toggles live.
const apply = ({ enabled, copy }) => {
  const root = document.documentElement;
  if (!root) return;
  if (enabled !== undefined) root.setAttribute('data-always-active', enabled ? '1' : '0');
  if (copy !== undefined) root.setAttribute('data-allow-copy', copy ? '1' : '0');
};

chrome.storage.local.get({ enabled: true, copy: true }, apply);

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  apply({
    enabled: changes.enabled?.newValue,
    copy: changes.copy?.newValue,
  });
});
