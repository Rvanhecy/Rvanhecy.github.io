if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser)/i)) {
    // 移动端不显示雪花特效
} else {
    document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none;"></canvas>');
}

window && (() => {
    // 雪花参数配置
    let config = {
        flakeCount: 50,        // 雪花数量
        minDist: 150,          // 最小距离
        color: "255, 255, 255", // 雪花颜色（RGB）
        size: 1.5,             // 雪花大小
        speed: 0.5,            // 下落速度
        opacity: 0.7,          // 透明度
        stepsize: 0.5          // 移动步长
    };

    let snowflakes = [];
    
    let init = () => {
        let canvas = document.getElementById("snow");
        if (!canvas) return;
        
        // 设置画布尺寸
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let ctx = canvas.getContext("2d");
        
        // 初始化雪花
        for (let i = 0; i < config.flakeCount; i++) {
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * config.speed,
                vy: (Math.random() * 0.5 + 0.5) * config.speed,
                radius: Math.random() * config.size + 0.5,
                opacity: Math.random() * config.opacity + 0.3
            });
        }
        
        // 动画循环
        let animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < config.flakeCount; i++) {
                let flake = snowflakes[i];
                
                // 更新位置
                flake.x += flake.vx;
                flake.y += flake.vy;
                
                // 边界检测
                if (flake.x > canvas.width) flake.x = 0;
                if (flake.x < 0) flake.x = canvas.width;
                if (flake.y > canvas.height) flake.y = 0;
                if (flake.y < 0) flake.y = canvas.height;
                
                // 绘制雪花
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${config.color}, ${flake.opacity})`;
                ctx.fill();
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    };
    
    // 窗口大小改变时重置画布
    window.addEventListener("resize", () => {
        let canvas = document.getElementById("snow");
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
    
    init();
})();