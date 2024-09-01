// 选择元素
var wishTxt = document.querySelector('.wish_txt')
var varWishContent = document.querySelector('.var_wish_content')
var pool = document.querySelector('.pool')
var moon1 = document.querySelector('.moon_1')
var moon2 = document.querySelector('.moon_2')
var star = document.querySelector('.star')
var candleArea = document.querySelector('.candle_area')
var meteorArea = document.querySelector('.meteor_area')
var btnArea = document.querySelector('.btn_area')
var btnRestartGame = document.querySelector('.btn_restart_game')


const bgm = newSound('/audio/secret/wish/quiet-stars-ai-203565', true, 0.5);

const infoIconForceClose = document.querySelector('.tips_icon_force_close');
const btnStartGame = infoIconForceClose.querySelector('.btn_get_it');


const pageName = 'wish';
const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');


// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

    const userStartGame = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    const userWishContent = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

    if (userStartGame === DEFAULT_VALUE_NULL || userWishContent === DEFAULT_VALUE_NULL || userStartGame === DEFAULT_VALUE_FALSE) {

        showPopupMissData();
        
        return false;

    } else if (userStartGame && userWishContent) {

        return true;
    }
}

// 生成星星
function generateStars() {
    var starContainer = document.querySelector('.star');

    var screenW = 320; // 和css设置的pool大小相关
    var screenH = 160;
    
    for (var i = 0; i < 50; i++) {
        var span = document.createElement('span');
        span.setAttribute('class', 'star_item');
        starContainer.appendChild(span);
    
        var x = Math.random() * screenW;
        var y = Math.random() * screenH;
    
        span.style.left = x + 'px';
        span.style.top = y + 'px';
    
        var scale = Math.random() * 1.5;
        span.style.transform = 'scale(' + scale + ')';
    
        var rate = Math.random() * 1.5;
        span.style.animation = 'flash 1s infinite alternate';
        span.style.animationDelay = rate + 's';
    }
}

// 生成流星
function generateMeteor2() {
    const lineList = [
        { c1: "#69E4F6", c2: "#69e4f600", l: "0px", d: 3 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", l: "60px", d: 5 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", r: "72px", d: 2 },
        { c1: "#69E4F6", c2: "#69e4f600", r: "30px", d: 0 },
        { c1: "#69E4F6", c2: "#69e4f600", r: "41px", d: 1 },
        { c1: "#69E4F6", c2: "#69e4f600", l: "105px", d: 4 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", l: "30px", d: 2 },
        { c1: "#FED258", c2: "rgba(254,210,88,0)", r: "111px", d: 5 },
        { c1: "#69E4F6", c2: "#69e4f600", r: "20px", d: 30 }
    ];

    const lineBox = document.getElementById('line-box');

    lineList.forEach(item => {
        const lineItem = document.createElement('span');
        lineItem.className = 'line-item';
        lineItem.style.setProperty('--c1', item.c1);
        lineItem.style.setProperty('--c2', item.c2);
        if (item.l) {
            lineItem.style.setProperty('--l', item.l);
        }
        if (item.r) {
            lineItem.style.setProperty('--r', item.r);
        }
        lineItem.style.setProperty('--d', item.d);
        lineBox.appendChild(lineItem);
    });
}


// 生成流星
function generateMeteor() {
    const windowWidth = window.innerWidth;
    const baseMeteorCount = 10; // 基础流星数量
    const additionalMeteors = Math.floor(windowWidth / 200); // 每200px宽度增加一个流星
    const totalMeteors = baseMeteorCount + additionalMeteors;

    const lineBox = document.getElementById('line-box');
    lineBox.innerHTML = ''; // 清空之前生成的流星

    for (let i = 0; i < totalMeteors; i++) {
        const item = generateRandomMeteor();
        const lineItem = document.createElement('span');
        lineItem.className = 'line-item';
        lineItem.style.setProperty('--c1', item.c1);
        lineItem.style.setProperty('--c2', item.c2);
        lineItem.style.left = item.left;
        lineItem.style.setProperty('--d', item.d);
        lineBox.appendChild(lineItem);
    }
}

// 生成随机流星数据
function generateRandomMeteor() {
    const colors = [
        { c1: "#69E4F6", c2: "#69e4f600" },
        { c1: "#FED258", c2: "rgba(254,210,88,0)" }
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const leftPosition = `${Math.random() * 100}vw`; // 生成随机的left位置，范围是0到100vw
    const delay = Math.floor(Math.random() * 6);

    return {
        c1: color.c1,
        c2: color.c2,
        left: leftPosition,
        d: delay
    };
}

// 调用生成流星
generateMeteor();


// 调用生成流星



// 蜡烛赋值
function generateCandle() {
    document.querySelectorAll('.candle').forEach(bulb => {
        const size = bulb.getAttribute('data-size');
        bulb.style.setProperty('--candle-body-width', size);
      });      
}



// 依次点亮蜡烛
function lightCandlesSequentially() {

    const candles = document.querySelectorAll('.candle');

    candles.forEach((candle, index) => {

        setTimeout(() => {

            candle.classList.remove('out');

            siteBgmSelect.play();

        }, index * 500); // 每隔0.5秒点亮一个蜡烛
    });
}

// 熄灭蜡烛
function outCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle) => {
        candle.classList.add('out');
    });
}





function initGame() {

    if (isUserJumpToThisPage()) {

        bgm.play();

        const userWishContent = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);
        
        const varWishContent = document.querySelector('.var_wish_content');

        varWishContent.textContent = userWishContent;

        generateStars();

        generateMeteor();

        generateCandle();

        lightCandlesSequentially();

        writeValueToRecordInLocal(keyName_1_00, keyName_1_01, false);

    }
}

// 显示/隐藏页面提示 -- 初始化到本地 -- 默认显示 
// 如果有值，就按照这个值来更新页面上的提示显示/隐藏 -- 包括：checkbox.checked
initTipsVisibilityConfig(keyName_1_00, pageName);
hideOrShowAllTipsInCurrentPage(keyName_1_00, pageName);
checkbox.checked = readTipsVisibilityConfig(keyName_1_00, pageName);


// 显示/隐藏页面提示 -- 用户选择的时候进行记录到本地并更新页面
checkbox.addEventListener('change', () => {
    const isVisible = checkbox.checked;
    writeTipsVisibilityConfig(keyName_1_00, pageName, isVisible);
    hideOrShowAllTipsInCurrentPage(keyName_1_00, pageName);
});

infoIconForceClose.click();

btnStartGame.addEventListener('click', () => {

    initGame();
});


moon1.addEventListener('click', () => {

    setDisplay(moon1, displayTypes.none);

    setDisplay(moon2, displayTypes.block);

    setDisplay(wishTxt, displayTypes.flex);
});

moon2.addEventListener('click', () => {

    setDisplay(moon2, displayTypes.none);

    setDisplay(moon1, displayTypes.block);

    setDisplay(wishTxt, displayTypes.none);
});