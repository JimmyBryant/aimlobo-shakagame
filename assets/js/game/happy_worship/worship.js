// 选择元素
const overlay = document.querySelector('.overlay');
const timerElement = document.querySelector('.count-down');
const bgmThumb = document.querySelector('.bgm-thumb');
const bubbleCountInPage = document.querySelector('.bubble-count');
const bubbleContainer = document.getElementById('bubble-container');

// const infoIcon = document.querySelector('.info_icon');

const infoIconForceClose = document.querySelector('.tips_icon_force_close');
const btnStartGame = infoIconForceClose.querySelector('.btn_get_it');




let messages;
let timerInterval;
const bubbleCount = 10;
const minBubbles = 4;
const baseDuration = 15000; // Base duration in milliseconds
const speedFactor = 3; // Adjust this factor to control speed (1 is normal, >1 is faster, <1 is slower)
let clickCount = 0; // Counter for clicked bubbles

// 预定义气球的颜色
const colors = ["#FF6347", "#FF69B4", "#FFD700", "#FF4500", "#E5D1FA", "#F9F07A", "#FFFFD2"];


// 背景音乐
const bgm = newSound('/audio/game/happy_worship/light-tune-no1-14485', true, 1);

// 点击气球的音乐
const bubbleSound = newSound('/audio/game/happy_worship/balloon-pop-48030', false, 1);

// 函数
// 函数
// 函数
// 函数
// 函数

// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

  const userSelectGod = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

  const userSelectOfferings = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

  const userSelectIncense = readValueFromRecordInLocal(keyName_1_00, keyName_1_03);

  if (userSelectGod === DEFAULT_VALUE_NULL || userSelectOfferings === DEFAULT_VALUE_NULL || userSelectIncense === DEFAULT_VALUE_NULL || userSelectGod < 1 || userSelectGod > setGodsNumber || userSelectOfferings.length === 0 || userSelectIncense < 1 || userSelectIncense > 3) {

      showPopupMissData();
      
      return false;
  }

  return true;
}


// 填充神明
function updateGodInPage() {

  const userSelectGod = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);
  
  const godImgElement = document.querySelector('.god_img img');
  
  // 构建新的图片路径
  const newSrc = `/image/game/happy_worship/god_${userSelectGod}.png`;
  
  // 更新 img 元素的 src 属性
  godImgElement.src = newSrc;
}


// 填充贡品
function updateOfferingsInPage() {

  const offeringsInPage = document.querySelector('.offerings-in-page');

  const offerings = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);
  
  offeringsInPage.textContent = offerings.join('');
}


// 填充香火
function updateIncenseInPage() {

  const incenseValue = readValueFromRecordInLocal(keyName_1_00, keyName_1_03);

  const htmlIncense = `.incense_${incenseValue}`;

  const varHtmlIncense = document.querySelector(htmlIncense);
  
  setDisplay(varHtmlIncense, displayTypes.flex);
}

// 香火燃烧动画
function burnIncense() {
  const incenseBodies = document.querySelectorAll('.incense-in-page .incense-body');
  incenseBodies.forEach(body => {
    body.style.setProperty('--burn-duration', `${setGameDurationTime}s`);
    body.classList.add('burn');
  });
}


// 新增函数用于显示 🧧 +1
function showPlusOne(x, y) {
  const plusOne = document.createElement('div');
  plusOne.className = 'plus-one';
  plusOne.textContent = '🧧 + 1';
  plusOne.style.left = `${x}px`;
  plusOne.style.top = `${y}px`;
  document.body.appendChild(plusOne);

  // 1秒后移除该元素
  setTimeout(() => {
      plusOne.remove();
  }, 1000);
}

// 返回气球的文字内容 -- createBubble()中会用到 -- 所以执行顺序一定在其之前
function returnMessages() {

  messages = worshipData[returnLangFromUrl()];
}


// 函数：生成气球
function createBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = messages[Math.floor(Math.random() * messages.length)];
  bubble.style.left = Math.random() * 60 + 'vw'; // Random horizontal position
  bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random color
  bubble.style.animationDuration = `${baseDuration / speedFactor / 1000}s`; // Set animation duration based on speedFactor
  bubble.addEventListener('click', (event) => {
      bubbleSound.play(); // Play sound on click
      bubble.remove(); // Remove bubble on click
      clickCount++; // Increment click counter
      showPlusOne(event.clientX, event.clientY); // 显示 🧧 +1
  });
  bubble.addEventListener('animationend', () => bubble.remove());
  bubbleContainer.appendChild(bubble);
}

// 确保最低数量的气球
function ensureMinimumBubbles() {
  const bubbles = bubbleContainer.getElementsByClassName('bubble');
  if (bubbles.length < minBubbles) {
      for (let i = bubbles.length; i < minBubbles; i++) {
          createBubble();
      }
  }
}

// 开始出现气球
function startBubbleGame() {
  for (let i = 0; i < bubbleCount; i++) {
    setTimeout(createBubble, i * (baseDuration / bubbleCount));
  }
  setInterval(ensureMinimumBubbles, 1000);

  // Stop the game after setGameDurationTime
  setTimeout(() => {
    clearInterval(ensureMinimumBubbles);

  }, setGameDurationTime);
}


// 开始游戏
function startWorship() {

  if (isUserJumpToThisPage()) {

    updateGodInPage();

    updateOfferingsInPage();

    updateIncenseInPage();

    // 重置 clickCount
    clickCount = 0;

    // 香火动画
    burnIncense();

    // 获取气球文字内容
    returnMessages();

    // 开始出现气球 -- 动画
    startBubbleGame();

    // 背景音乐
    bgm.seek(0);
    bgm.play();


    let timeLeft = setGameDurationTime;

    // 更新倒计时
    function updateTimer(timeLeft) {
      timerElement.textContent = timeLeft; // 更新剩余时间显示
    }

    // 每秒更新一次剩余时间
    timerInterval = setInterval(() => {
      updateTimer(timeLeft);
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval); // 倒计时结束时停止计时器
        endWorship();
      }
    }, 1000);
  }

}

// 结束游戏
function endWorship() {

  writeValueToRecordInLocal(keyName_1_00, keyName_1_06, clickCount);

  // 说明用户崇拜过了
  writeValueToRecordInLocal(keyName_1_00, keyName_1_07, DEFAULT_VALUE_TRUE);

  window.location.href = '../result';

}


// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end







// 翻译秒
updateTimeSecondInpage();

// 提示用户点击气球
// infoIcon.click();

infoIconForceClose.click();

console.log('infoIconForceClose exec');

btnStartGame.addEventListener('click', () => {

  startWorship();
});

// 确保所有资源加载完成后再运行
// window.addEventListener('load', function() {

//   startWorship();
// });




// 点击图片开启/关闭BGM
bgmThumb.addEventListener('click', () => {
  if (bgm.playing()) {
    bgm.pause();
    bgmThumb.classList.remove('rotate-animation'); // 停止旋转动画
  } else {
    bgm.play();
    bgmThumb.classList.add('rotate-animation'); // 开始旋转动画
  }
});
