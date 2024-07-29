// 游戏持续时间
const worshipDuration = 34; 

// 编辑标题
const gameTitle = document.querySelector('.game-title .title');
const popupFormGameTitle = document.querySelector('.popup-form-game-title');
const formGameTitle = document.querySelector('.form-game-title');


gameTitle.addEventListener('click', () => {
  bgmSelect.play();
  displayFlex(popupFormGameTitle);
  bgmSelect.stop();
});

formGameTitle.addEventListener('submit', (event) => {
  event.preventDefault();
  bgmSelect.play();
  const gameTitleInput = document.querySelector('.game-title-input').value;
  gameTitle.innerHTML = gameTitleInput;
  hide(popupFormGameTitle);
  bgmSelect.stop();
});

formGameTitle.addEventListener('reset', () => {
  bgmSelect.play();
  formGameTitle.reset();
  hide(popupFormGameTitle);
  bgmSelect.stop();
});
// 编辑标题 end

// 编辑供品
const tableImg = document.querySelector('.table-img');
const btnOpenFormOfferings = document.querySelector('.btn_open_form_offerings');
const offeringsInPage = document.querySelector('.offerings-in-page');
const popupFormOfferings = document.querySelector('.popup-form-offerings');
const formOfferings = document.querySelector('.form-offerings');

btnOpenFormOfferings.addEventListener('click', () => {
  bgmSelect.play();
  displayFlex(popupFormOfferings);
  bgmSelect.stop();
});

offeringsInPage.addEventListener('click', () => {
  bgmSelect.play();
  displayFlex(popupFormOfferings);
  bgmSelect.stop();
});

tableImg.addEventListener('click', () => {
  bgmSelect.play();
  displayFlex(popupFormOfferings);
  bgmSelect.stop();
});



formOfferings.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedOfferings = document.querySelectorAll('input[name="select-offerings"]:checked');
  if (selectedOfferings.length > 0) {
    bgmSelect.play();
    offeringsInPage.innerHTML = '';
    hide(btnOpenFormOfferings);
    selectedOfferings.forEach((selectedOffering) => {
      const offeringDiv = document.createElement('div'); // 创建新的 div 元素
      offeringDiv.innerHTML = selectedOffering.value; // 将选中项的值作为 div 内容
      offeringsInPage.appendChild(offeringDiv); // 将创建的 div 元素添加到页面中
    });
    bgmSelect.stop();
  } else {
    offeringsInPage.innerHTML = '';
    displayBlock(btnOpenFormOfferings);
  }
  
  hide(popupFormOfferings);
  checkShowBtnWorship();
});

formOfferings.addEventListener('reset', () => {
  bgmSelect.play();
  formOfferings.reset();
  hide(popupFormOfferings);
  bgmSelect.stop();
});
// 编辑编辑供品 end

// 编辑香火
const stove = document.querySelector('.stove');
const btnOpenFormIncense = document.querySelector('.btn_open_form_incense');
const incenseInPage = document.querySelector('.incense-in-page');
const incenseItemsInPage = incenseInPage.querySelectorAll('.incense-item');
const popupFormIncense = document.querySelector('.popup-form-incense');
const formIncense = document.querySelector('.form-incense');



btnOpenFormIncense.addEventListener('click', () => {
  bgmSelect.play();
  displayFlex(popupFormIncense);
  bgmSelect.stop();
});

incenseInPage.addEventListener('click', () => {
  bgmSelect.play();
  displayFlex(popupFormIncense);
  bgmSelect.stop();
});

stove.addEventListener('click', () => {
  bgmSelect.play();
  displayFlex(popupFormIncense);
  bgmSelect.stop();
});


formIncense.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedIncense = document.querySelector('input[name="select-incense"]:checked');
  if (selectedIncense.value) {
    bgmSelect.play();
    displayFlex(incenseInPage);
    incenseInPage.innerHTML = '';
    hide(btnOpenFormIncense);
    
    const incenseValue = selectedIncense.value;
    for (let i = 0; i < incenseValue; i++) {
      const incenseHead = document.createElement('div');
      incenseHead.classList.add('incense-head');
      const incenseBody = document.createElement('div');
      incenseBody.classList.add('incense-body');
      const incenseItem = document.createElement('div');
      incenseItem.classList.add('incense-item');
      incenseItem.appendChild(incenseHead);
      incenseItem.appendChild(incenseBody);
      incenseInPage.appendChild(incenseItem);
    }
    
    // 调整香火在页面上的展示css：只有一根香火的情况下，应该居中，超过一根香火，就有left和right= 3vh;
    adjustIncenseItemInPage();
    bgmSelect.stop();
  } else {
    hide(incenseInPage);
    incenseInPage.innerHTML = '';
    displayBlock(btnOpenFormIncense);
  }

  hide(popupFormIncense);
  checkShowBtnWorship();
});

formIncense.addEventListener('reset', () => {
  bgmSelect.play();
  formIncense.reset();
  hide(popupFormIncense);
  bgmSelect.stop();
});
// 编辑编辑香火 end

// 调整香火在页面上的展示css：只有一根香火的情况下，应该居中，超过一根香火，就有left和right= 3vh;
function adjustIncenseItemInPage() {
  const incenseInPage = document.querySelector('.incense-in-page');
  const incenseItemsInPage = incenseInPage.querySelectorAll('.incense-item');
  if (incenseItemsInPage.length === 1) {
    incenseItemsInPage[0].style.left = 'auto';
    incenseItemsInPage[0].style.right = 'auto';
  } else if (incenseItemsInPage.length > 1) {
    incenseItemsInPage[0].style.left = '3vh';
    incenseItemsInPage[incenseItemsInPage.length - 1].style.right = '3vh';
  }
}




// 检查offering,incense的值，都有内容的情况下展示btn_open_worship_box
const btnOpenWorshipBox = document.querySelector('.btn_open_worship_box');
function checkShowBtnWorship() {
  if (offeringsInPage.innerHTML.trim() === '' || incenseInPage.innerHTML.trim() === '') {
    hide(btnOpenWorshipBox);
  } else {
    displayBlock(btnOpenWorshipBox);
  }
}





const worshipBox = document.querySelector('.worship_box');
const overlay = document.querySelector('.overlay');
const timerElement = document.querySelector('.count-down');
const bgmThumb = document.querySelector('.bgm-thumb');
const msgEndWorship = document.querySelector('.msg_end_worship');
const bubbleCountInPage = document.querySelector('.bubble-count');

// worship的时候需要隐藏的内容: god-imgs的翻页
const arrow = document.querySelector('.splide__arrows');



let timerInterval;


// 游戏过程中需要隐藏的内容
const tipsIcon = document.querySelector('.tips_icon');
function hideWhenPlaying() {
  hide(tipsIcon);
  hide(arrow);
  hide(btnOpenWorshipBox);
}

// 游戏过程中需要显示的内容
function displayWhenPlaying() {
  displayFlex(worshipBox);
  displayFlex(overlay);
  displayFlex(incenseInPage);
}

// 游戏结束后需要隐藏的内容
function hideWhenPlayEnd() {
  hide(btnOpenWorshipBox);
  hide(worshipBox);
  hide(overlay);
  offeringsInPage.innerHTML = '';
  incenseInPage.innerHTML = '';
  formOfferings.reset();
  formIncense.reset();
}


// 游戏结束后需要显示的内容
function displayWhenPlayEnd() {
  displayBlock(tipsIcon);
  displayBlock(arrow);
  displayBlock(btnOpenFormOfferings);
  displayBlock(btnOpenFormIncense);
}

// 游戏结束后需要重置的内容
function initializeGame() {
  offeringsInPage.innerHTML = '';
  incenseInPage.innerHTML = '';
  formOfferings.reset();
  formIncense.reset();
  displayBlock(btnOpenFormOfferings);
  displayBlock(btnOpenFormIncense);
}

// 香火燃烧动画
function burnIncense() {
  const incenseBodies = document.querySelectorAll('.incense-in-page .incense-body');
  incenseBodies.forEach(body => {
    body.style.setProperty('--burn-duration', `${worshipDuration}s`);
    body.classList.add('burn');
  });
}

// 选择音效-- 有效
const bgmSelect = new Howl({
  src: ["/audio/game/horse_racing/select-sound-121244.mp3"],
  html5: true,
  loop: false,
  volume: 0.4,
});

// 初始化背景音乐
const bgm = new Howl({
  src: ['/audio/game/happy_worship/light-tune-no1-14485.mp3'],
  html5: true,
  loop: true,
  volume: 1,
});

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

// 幸运气球动画
const bubbleContainer = document.getElementById('bubble-container');

let messages;
const language = getLanguageFromUrl();

if (language === 'en') {
  messages = ["Good health", "Career advancement", "Happiness every day", "All the best", "Prosperity", "Peace and joy", "Good luck", "Wish fulfillment", "Good fortune", "🎊 +1", "Happy 🎉", "💵💵💵", "🎁🧧🎊"];
} else if (language === 'zh-cn') {
  messages = ["身体健康", "事业进步", "天天开心", "万事如意", "财源广进", "平安喜乐", "好运连连", "心想事成", "福星高照", "🎊 +1", "开心🎉", "💵💵💵", "🎁🧧🎊"];
} else if (language === 'zh-tw') {
  messages = ["身體健康", "事業進步", "天天開心", "萬事如意", "財源廣進", "平安喜樂", "好運連連", "心想事成", "福星高照", "🎊 +1", "開心🎉", "💵💵💵", "🎁🧧🎊"];
} else {
  messages = ["Default message"]; // 如果语言不匹配，则使用默认消息
}

const bubbleCount = 15;
const minBubbles = 6;
const baseDuration = 15000; // Base duration in milliseconds
const speedFactor = 3; // Adjust this factor to control speed (1 is normal, >1 is faster, <1 is slower)
let clickCount = 0; // Counter for clicked bubbles

// 预定义气球的颜色
const colors = ["#FF6347", "#FF69B4", "#FFD700", "#FF4500", "#E5D1FA", "#F9F07A", "#FFFFD2"];

// 初始化气球破裂的声音
const bubbleSound = new Howl({ src: ["/audio/game/happy_worship/balloon-pop-48030.mp3"] });

// 新增函数用于显示 🧧 +1
function showPlusOne(x, y) {
  const plusOne = document.createElement('div');
  plusOne.className = 'plus-one';
  plusOne.textContent = '🧧 + 0.1';
  plusOne.style.left = `${x}px`;
  plusOne.style.top = `${y}px`;
  document.body.appendChild(plusOne);

  // 1秒后移除该元素
  setTimeout(() => {
      plusOne.remove();
  }, 1000);
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = messages[Math.floor(Math.random() * messages.length)];
    bubble.style.left = Math.random() * 90 + 'vw'; // Random horizontal position
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

function ensureMinimumBubbles() {
    const bubbles = bubbleContainer.getElementsByClassName('bubble');
    if (bubbles.length < minBubbles) {
        for (let i = bubbles.length; i < minBubbles; i++) {
            createBubble();
        }
    }
}

function startBubbleGame() {
    for (let i = 0; i < bubbleCount; i++) {
        setTimeout(createBubble, i * (baseDuration / bubbleCount));
    }
    setInterval(ensureMinimumBubbles, 1000);

    // Stop the game after worshipDuration
    setTimeout(() => {
        clearInterval(ensureMinimumBubbles);
        
    }, worshipDuration);
}
// 幸运气球动画 end


// 开始崇拜：首先检测积分条件决定是否可以开始游戏，如果不行就退出，可以的话就正常游戏
function startWorship() {

  // 用户将要花费的积分
  const selectedOfferings = document.querySelectorAll('input[name="select-offerings"]:checked').length;
  const selectedIncense = parseInt(document.querySelector('input[name="select-incense"]:checked').value);
  const totalCost = selectedOfferings + selectedIncense;

  // 读取用户当前积分
  const currentLuckyPoints = parseInt(readFromLocalStorage('total_lucky_point'));

  // 不允许进行游戏的情况：用户积分<需要花费的积分并且花费的积分>2 这种情况就弹出提示，结束游戏。--这里的2是因为也许用户第一次玩，所以要留个小bug给用户。
  if (currentLuckyPoints < totalCost && totalCost > 2) {
    const notEnoughLuckyPoint = document.querySelector('.not_enough_lucky_point');
    notEnoughLuckyPoint.click();
    hideWhenPlayEnd();
    displayWhenPlayEnd();
    return;
  } else {
    
  // 允许游戏：用户积分>=需要花费的积分

  // 重置 clickCount
  clickCount = 0;

  // 扣除相应的幸运值
  updateTotalLuckyPoint(-totalCost);
  writeEventLogLuckyPoint('happy worship cost', -totalCost);

  // 增加游戏次数
  updateGameTime(1);

  // 写入游戏记录 - 记录游戏次数
  writeEventLogGameTime('happy worship', 1);

  // 隐藏和显示内容
  displayWhenPlaying();
  hideWhenPlaying()

  // 香火动画
  burnIncense();

  // 幸运气球
  startBubbleGame();

  // 背景音乐
  bgm.seek(0);
  bgm.play();


  let timeLeft = worshipDuration;

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
  bgm.stop();
  hideWhenPlayEnd();
  displayWhenPlayEnd();

  bubbleCountInPage.textContent = clickCount / 10 + 5;
  msgEndWorship.click(); // 弹出对话框
  updateTotalLuckyPoint(5 + clickCount / 10); // 增加幸运值，崇拜过程+5，点击气球每个+1
  writeEventLogLuckyPoint('complete happy worship', 5+ clickCount / 10); // write event
}

// 结束游戏 - end


// 开始游戏
btnOpenWorshipBox.addEventListener('click', () => {
  startWorship();
});


