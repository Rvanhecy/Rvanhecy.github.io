function switchNightMode() {
  const body = document.body;
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  
  // 添加动画
  body.insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');
  
  // 切换主题
  setTimeout(() => {
    // 更新DOM状态
    html.setAttribute('data-theme', newTheme);
    body.classList.toggle('DarkMode', !isDark);
    
    // 更新图标
    document.getElementById('modeicon').setAttribute('xlink:href', isDark ? '#icon-moon' : '#icon-sun');
    
    // 保存设置
    localStorage.setItem('isDark', isDark ? '0' : '1');
    
    // 调用主题函数（如果存在）
    if (isDark) {
      if (typeof activateLightMode === 'function') activateLightMode();
    } else {
      if (typeof activateDarkMode === 'function') activateDarkMode();
    }
    
    // 保存到主题的本地存储
    if (typeof saveToLocal !== 'undefined') {
      saveToLocal.set('theme', newTheme, 2);
    }
    
    // 显示提示
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
  });
  
  // 处理第三方组件
  handleThirdPartyComponents();
}

// 处理第三方组件的函数
function handleThirdPartyComponents() {
  if (typeof utterancesTheme === 'function') utterancesTheme();
  if (typeof FB === 'object') window.loadFBComment();
  if (window.DISQUS && document.getElementById('disqus_thread')?.children.length) {
    setTimeout(() => window.disqusReset(), 200);
  }
}