function switchNightMode() {
  const body = document.body;
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  // 添加动画
  body.insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');
  console.log('DarkSky element added:', document.querySelector('.Cuteen_DarkSky')); // 调试日志

  setTimeout(() => {
    html.setAttribute('data-theme', newTheme);
    body.classList.toggle('DarkMode', !isDark);

    // 检查图标元素是否存在
    const modeIcon = document.getElementById('modeicon');
    if (modeIcon) {
      modeIcon.setAttribute('xlink:href', isDark ? '#icon-moon' : '#icon-sun');
    } else {
      console.error('Mode icon element not found!');
    }

    localStorage.setItem('isDark', isDark ? '0' : '1');

    if (isDark) {
      if (typeof activateLightMode === 'function') activateLightMode();
    } else {
      if (typeof activateDarkMode === 'function') activateDarkMode();
    }

    if (typeof saveToLocal !== 'undefined') {
      saveToLocal.set('theme', newTheme, 2);
    }

    if (!isDark && typeof GLOBAL_CONFIG !== 'undefined' && GLOBAL_CONFIG.Snackbar !== undefined && typeof btf !== 'undefined') {
      btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
    }

    // 移除动画
    setTimeout(() => {
      const darkSky = document.querySelector('.Cuteen_DarkSky');
      if (darkSky) {
        darkSky.style.transition = 'opacity 1s';
        darkSky.style.opacity = '0';
        setTimeout(() => darkSky.remove(), 1000);
      }
    }, 2000);
  }, 0); // 确保 DOM 更新后再执行

  handleThirdPartyComponents();
}