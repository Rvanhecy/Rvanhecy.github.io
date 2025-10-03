// source/js/snackbar.js
document.addEventListener('DOMContentLoaded', function() {
    // 显示snackbar函数
    function showSnackbar(message, duration = 3000) {
        const snackbar = document.createElement('div');
        snackbar.className = 'snackbar';
        snackbar.innerHTML = message;
        snackbar.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #323232;
            color: white;
            padding: 14px 24px;
            border-radius: 4px;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        document.body.appendChild(snackbar);
        
        setTimeout(() => {
            snackbar.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            snackbar.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(snackbar);d
            }, 300);
        }, duration);
    }
    
    // 示例：页面加载后显示欢迎信息
    setTimeout(() => {
        showSnackbar('着陆中..亲爱的勇者啊，准备好开启新的探索之旅了吗✨');
    }, 1000);
    
    // 示例：点击特定按钮显示snackbar
    const showBtn = document.getElementById('show-snackbar');
    if (showBtn) {
        showBtn.addEventListener('click', () => {
            showSnackbar('🎉 操作成功！');
        });
    }
});