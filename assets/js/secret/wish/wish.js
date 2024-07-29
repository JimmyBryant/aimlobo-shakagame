// 选择元素
var gameTitle = document.querySelector('.game_title')
var btnStartGame = document.querySelector('.btn_start_game')
var wishContent = document.querySelector('.wish_content')
var formWish = document.querySelector('.form_wish')
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




// 生成星星
generateStars();
function generateStars() {
    var starContainer = document.querySelector('.star');
    var screenW = 320;
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
generateMeteor();
function generateMeteor() {
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


// 灯球赋值
generateBulb();
function generateBulb() {
    document.querySelectorAll('.bulb').forEach(bulb => {
        const color = bulb.getAttribute('data-color');
        const size = bulb.getAttribute('data-size');
        
        bulb.style.setProperty('--bulb-color', color);
        bulb.style.setProperty('--bulb-width', size);
      });      
}

// 蜡烛赋值
generateCandle();
function generateCandle() {
    document.querySelectorAll('.candle').forEach(bulb => {
        const size = bulb.getAttribute('data-size');
        bulb.style.setProperty('--candle-body-width', size);
      });      
}


// 初始化音乐
// 选择音效-- 有效
const bgmSelect = new Howl({
    src: ["/audio/game/horse_racing/select-sound-121244.mp3"],
    html5: true,
    loop: false,
    volume: 0.4,
});

// 游戏中
const bgmGame = new Howl({
    src: ["/audio/secret/wish/quiet-stars-ai-203565.mp3"],
    html5: true,
    loop: true,
    volume: 0.5,
});

// 第1步，点击许愿按钮
btnStartGame.addEventListener("click", () => {
    hide(gameTitle);
    bgmSelect.play();
    hide(btnStartGame);
    displayFlex(wishContent);
    bgmSelect.stop();
});

// 第2步，输入愿望
formWish.addEventListener("submit", (event) => {
    event.preventDefault();
    const userInputWishContent = document.querySelector('input[name="wish_content"]');
    let userInputWish = userInputWishContent.value;

    if (userInputWish) {
        bgmSelect.play();
        varWishContent.textContent = userInputWish;
        bgmSelect.stop();
        hide(wishContent);
        // displayBlock(pool);
        displayBlock(moon1);
        hide(wishTxt);
        displayFlex(candleArea);
        lightCandlesSequentially(); // 点亮蜡烛
        displayBlock(meteorArea);
        bgmGame.play();
        displayFlex(btnArea);
    }
    
});

formWish.addEventListener('reset', () => {
    bgmSelect.play();
    formWish.reset();
    hide(wishContent);
    displayInlineBlock(btnStartGame);
    displayFlex(gameTitle);
    bgmSelect.stop();
});

// 依次点亮蜡烛
function lightCandlesSequentially() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.remove('out');
            bgmSelect.play();
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


// 点击月亮
moonClick();
function moonClick() {
    moon1.addEventListener('click', () => {
        hide(moon1);
        displayBlock(moon2);
        displayFlex(wishTxt);
    });

    moon2.addEventListener('click', () => {
        hide(moon2)
        hide(wishTxt);
        displayBlock(moon1);
    });
}

// 再来一次
btnRestartGame.addEventListener('click', () => {
    bgmGame.stop();

    // 隐藏内容
    hide(candleArea);

    // 恢复蜡烛的熄灭状态
    outCandles();
    hide(moon1);
    hide(moon2);
    hide(wishTxt);
    hide(btnArea);

    formWish.reset();


    // 显示内容
    displayFlex(gameTitle);
    displayInlineBlock(btnStartGame);
    

});


