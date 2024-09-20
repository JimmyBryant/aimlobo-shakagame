document.addEventListener("DOMContentLoaded", function() {
    // 选择所有 lucky_index_title_item 和 lucky_index_content 元素
    const titleItems = document.querySelectorAll('.lucky_index_title_item');
    const contentItems = document.querySelectorAll('.lucky_index_content');

    // 功能 1: 激活元素并移除其他的 active 类
    titleItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 移除其他 titleItem 的 active 类
            titleItems.forEach(el => el.classList.remove('active'));
            // 给当前点击的 item 添加 active 类
            item.classList.add('active');

            // 同时处理对应的 contentItems
            contentItems.forEach(el => el.classList.remove('active'));
            // 激活与点击的 titleItem 对应的 contentItem
            contentItems[index].classList.add('active');

            // 功能 2: 进度条动态变化
            animateProgressBars(contentItems[index]);
        });
    });

    // 功能 2: 动态更新进度条
    function animateProgressBars(contentItem) {
        // 获取该 contentItem 内的所有 progress 标签
        const progressBars = contentItem.querySelectorAll('progress');

        progressBars.forEach(progress => {
            const maxValue = progress.getAttribute('value');
            let currentValue = 0;

            // 先将进度条的值重置为 0
            progress.value = currentValue;

            // 使用定时器动态更新进度条值
            const interval = setInterval(function() {
                if (currentValue >= maxValue) {
                    clearInterval(interval);
                } else {
                    currentValue += maxValue / 50;  // 动态更新速度
                    progress.value = currentValue;
                }
            }, 40);  // 设置动画时间 2 秒（50 * 40ms = 2000ms）
        });
    }

    // 页面加载时，模拟点击 today 选项
    titleItems[0].click();
});
