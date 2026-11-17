// MAIN world: runs before page scripts and makes the page believe it is always
// visible, focused, and (when it asks) fullscreen.
(() => {
  'use strict';

  const getAttr = Element.prototype.getAttribute;
  const enabled = () => {
    const root = document.documentElement;
    return !root || getAttr.call(root, 'data-always-active') !== '0';
  };

  // Replace a getter, falling back to the native one when disabled.
  const overrideGetter = (proto, prop, fake) => {
    const orig = Object.getOwnPropertyDescriptor(proto, prop);
    if (!orig || !orig.get) return;
    Object.defineProperty(proto, prop, {
      configurable: true,
      enumerable: orig.enumerable,
      get() { return enabled() ? fake.call(this) : orig.get.call(this); },
    });
  };

  // Replace a method, falling back to the native one when disabled.
  const overrideMethod = (proto, name, fake) => {
    const orig = proto[name];
    if (typeof orig !== 'function') return;
    proto[name] = function (...args) {
      return enabled() ? fake.apply(this, args) : orig.apply(this, args);
    };
  };

  // 1. Fake fullscreen
  let fsElement = null;

  function fakeRequestFullscreen() {
    fsElement = this;
    const s = this.style;
    s.setProperty('position', 'fixed', 'important');
    s.setProperty('inset', '0', 'important');
    s.setProperty('width', '100vw', 'important');
    s.setProperty('height', '100vh', 'important');
    s.setProperty('z-index', '2147483647', 'important');
    this.dispatchEvent(new Event('fullscreenchange', { bubbles: true }));
    this.dispatchEvent(new Event('webkitfullscreenchange', { bubbles: true }));
    return Promise.resolve();
  }

  overrideMethod(Element.prototype, 'requestFullscreen', fakeRequestFullscreen);
  overrideMethod(Element.prototype, 'webkitRequestFullscreen', fakeRequestFullscreen);
  overrideMethod(Document.prototype, 'exitFullscreen', () => Promise.resolve());
  overrideMethod(Document.prototype, 'webkitExitFullscreen', () => {});

  overrideGetter(Document.prototype, 'fullscreenElement', () => fsElement);
  overrideGetter(Document.prototype, 'webkitFullscreenElement', () => fsElement);
  overrideGetter(Document.prototype, 'fullscreenEnabled', () => true);

  // 2. Always visible and focused
  overrideGetter(Document.prototype, 'hidden', () => false);
  overrideGetter(Document.prototype, 'visibilityState', () => 'visible');
  overrideMethod(Document.prototype, 'hasFocus', () => true);

  // 3. Swallow the events games use to pause. Capture on window runs before any
  // page listener. Only window/document blur is blocked so form fields still work.
  const block = (e) => {
    if (!enabled()) return;
    if (e.type === 'blur' && e.target !== window && e.target !== document) return;
    e.stopImmediatePropagation();
  };
  for (const type of ['visibilitychange', 'webkitvisibilitychange', 'blur', 'pagehide']) {
    window.addEventListener(type, block, true);
  }

  // 4. Allow copy: stop page handlers from cancelling copy/select/right-click, and
  // from swallowing Ctrl/Cmd+C/X/A. Capture on window runs before page listeners.
  const copyEnabled = () => {
    const root = document.documentElement;
    return !root || getAttr.call(root, 'data-allow-copy') !== '0';
  };
  const allowCopy = (e) => {
    if (!copyEnabled()) return;
    if (e.type === 'keydown') {
      const k = (e.key || '').toLowerCase();
      if (!(e.ctrlKey || e.metaKey) || !['c', 'x', 'a', 'insert'].includes(k)) return;
    }
    e.stopImmediatePropagation();
  };
  for (const type of ['copy', 'cut', 'selectstart', 'contextmenu', 'dragstart', 'mousedown', 'keydown']) {
    window.addEventListener(type, allowCopy, true);
  }
})();
