function switchNightMode() {
  const body = document.body;
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const isDark = currentTheme === 'dark';
  
  // 添加动画元素
  body.insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>');
  
  setTimeout(function() {
    if (isDark) {
      // 切换到浅色模式
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      localStorage.setItem('isDark', '0');
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    } else {
      // 切换到深色模式
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('isDark', '1');
      document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
    }
    
    // 移除动画元素
    setTimeout(function() {
      const darkSky = document.querySelector('.Cuteen_DarkSky');
      if (darkSky) {
        darkSky.style.transition = 'opacity 1s';
        darkSky.style.opacity = '0';
        setTimeout(function() {
          darkSky.remove();
        }, 1000);
      }
    }, 2000);
  });
  
  // 处理其他组件
  typeof utterancesTheme === 'function' && utterancesTheme();
  typeof FB === 'object' && window.loadFBComment();
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}