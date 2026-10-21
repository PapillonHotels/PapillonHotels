/* Autoplay silently on every page opening; a visitor gesture enables sound. */
(() => {
  const video = document.getElementById('welcomeVideo');
  if (!video) return;
  let finished = false, pending = false, rewindOnMetadata = false;
  let inView = true;
  video.controls = false;
  video.loop = false;
  video.autoplay = true;
  video.playsInline = true;
  video.defaultMuted = true;
  video.muted = true;

  const play = async () => {
    if (finished || pending || document.hidden) return;
    pending = true;
    try { await video.play(); }
    catch {
      // A browser may revoke sound permission after backgrounding the page.
      if (!video.muted && !finished) {
        video.muted = true;
        try { await video.play(); } catch {}
      }
    } finally { pending = false; }
  };
  const open = () => {
    finished = false;
    video.muted = true;
    rewindOnMetadata = video.readyState === 0;
    try { video.currentTime = 0; } catch { rewindOnMetadata = true; }
    play();
  };
  const enableSound = () => {
    if (finished || document.hidden) return;
    video.muted = false;
    // Call play inside the trusted gesture, including after an autoplay refusal.
    try {
      const result = video.play();
      if (result) result.catch(() => { video.muted = true; play(); });
    } catch { video.muted = true; play(); }
  };
  ['pointerup', 'touchend', 'keydown'].forEach(name => {
    document.addEventListener(name, enableSound, { passive: true });
  });
  video.addEventListener('ended', () => { finished = true; });
  video.addEventListener('loadedmetadata', () => {
    if (rewindOnMetadata) { video.currentTime = 0; rewindOnMetadata = false; }
    play();
  });
  video.addEventListener('canplay', play);
  window.addEventListener('pageshow', open);
  window.addEventListener('pagehide', () => video.pause());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (inView) play();
  });
  // Mobile browsers can suspend an offscreen autoplay video until it is visible.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      if (inView) play();
    }, { threshold: 0.1 });
    observer.observe(video);
  }
  open();
})();
