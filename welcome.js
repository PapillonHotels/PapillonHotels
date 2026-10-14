/* One welcome playback; try sound first, then enable it on the first gesture. */
(() => {
  const video = document.getElementById('welcomeVideo');
  if (!video) return;
  let started = false, finished = false, pending = false;
  video.controls = false;
  video.loop = false;
  video.muted = false;
  video.defaultMuted = false;
  const gestures = ['pointerup', 'touchend', 'keydown'];
  const clean = () => gestures.forEach(name => document.removeEventListener(name, enableSound));
  const enableSound = () => {
    if (finished) { clean(); return; }
    video.muted = false;
    video.defaultMuted = false;
    video.play().then(clean).catch(() => { video.muted = true; });
  };
  const start = async () => {
    if (started || finished || pending) return;
    pending = true;
    try { await video.play(); clean(); }
    catch {
      if (!finished) {
        video.muted = true;
        try { await video.play(); } catch {}
      }
    } finally { pending = false; }
  };
  gestures.forEach(name => document.addEventListener(name, enableSound));
  video.addEventListener('play', () => { started = true; });
  video.addEventListener('ended', () => { finished = true; clean(); });
  video.addEventListener('canplay', start);
  start();
})();
