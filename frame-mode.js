// iPhone / iPad Frame Mode - shared preview script
(function initFrameMode() {
  const params = new URLSearchParams(window.location.search);
  const frameType = params.get('frame');
  if (!frameType) return;

  const frameClass =
    frameType === '1' ? 'frame-iphone' :
    frameType === 'ipad' ? 'frame-ipad' :
    frameType === 'ipad-landscape' ? 'frame-ipad-landscape' : null;
  if (!frameClass) return;

  document.body.classList.add('framed', frameClass);

  const appContainer = document.querySelector('.app-container');
  if (!appContainer) return;

  const host = document.createElement('div');
  host.className = 'frame-host';

  const wrapper = document.createElement('div');
  wrapper.className = 'frame-wrapper';

  const screen = document.createElement('div');
  screen.className = 'frame-screen';

  const island = document.createElement('div');
  island.className = 'dynamic-island';

  const indicator = document.createElement('div');
  indicator.className = 'home-indicator';

  const gloss = document.createElement('div');
  gloss.className = 'screen-gloss';

  appContainer.parentNode.insertBefore(host, appContainer);
  screen.appendChild(appContainer);
  wrapper.appendChild(screen);
  wrapper.appendChild(island);
  wrapper.appendChild(indicator);
  wrapper.appendChild(gloss);
  host.appendChild(wrapper);

  // Dynamic scaling: fit the device frame within the viewport
  const FRAME_SIZES = {
    'frame-iphone': [402, 822],
    'frame-ipad': [580, 800],
    'frame-ipad-landscape': [800, 580]
  };
  const [FRAME_WIDTH, FRAME_HEIGHT] = FRAME_SIZES[frameClass];
  const PADDING = 24; // small breathing room around the frame

  function updateFrameScale() {
    const availableHeight = window.innerHeight - PADDING * 2;
    const availableWidth = window.innerWidth - PADDING * 2;
    const scale = Math.min(
      availableHeight / FRAME_HEIGHT,
      availableWidth / FRAME_WIDTH,
      1 // never upscale beyond actual size
    );

    host.style.width = Math.round(FRAME_WIDTH * scale) + 'px';
    host.style.height = Math.round(FRAME_HEIGHT * scale) + 'px';
    wrapper.style.transform = 'scale(' + scale + ')';
  }

  updateFrameScale();
  window.addEventListener('resize', updateFrameScale);
})();
