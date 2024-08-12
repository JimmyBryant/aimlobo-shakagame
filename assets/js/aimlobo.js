// 这个库用来写通用的函数，所有地方都可以通用的
// 所以只能写函数，并且一定要写函数的错误输出，便于定位和调试


// 弹窗提示 -- 可点击关闭
function clickHideInPageTips() {

    const inPageTipsAll = document.querySelectorAll('.in_page_tips');

    if (inPageTipsAll) {

        for (const inPageTips of inPageTipsAll) {

            const close = inPageTips.querySelector('.close');
    
            close.addEventListener('click', (event) => {
    
                inPageTips.style.display = "none";

                event.stopPropagation(); // 阻止事件冒泡
            });
        }
    }
}