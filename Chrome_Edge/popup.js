const bind = (id, key) => {
  const box = document.getElementById(id);
  chrome.storage.local.get({ [key]: true }, (v) => { box.checked = v[key]; });
  box.addEventListener('change', () => chrome.storage.local.set({ [key]: box.checked }));
};

bind('enabled', 'enabled');
bind('copy', 'copy');
