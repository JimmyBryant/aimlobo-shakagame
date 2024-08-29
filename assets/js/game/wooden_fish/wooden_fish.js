// 定义常量
const keyName_1_00 = 'game_wooden_fish';
const pageName = 'list';
const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

const keyName_1_01 = 'click_count'; // 统计用户点击了多少次木鱼 -- 每天都会重置为0
const keyName_1_02 = 'last_reset_date'; // 上次重置的日期
const keyName_1_03 = 'last_exec_count'; // 上次执行统计的点击次数 -- 每满多少次点击给多少幸运值，游戏次数
const keyName_1_04 = 'user_input_game_title'; // 用户输入的标题
const keyName_1_05 = 'user_input_prayer'; // 用户选择/输入的祈祷文

const setNumberOfClickWhenBouns = 300; // -- 每满多少次点击给幸运值，游戏次数
const setBonusLuckyPoint = 1;
const setBonusGameTime = 1;

const setIntervalAutoClick = 1; // 自动敲击的间隔时间
const setIntervalAnimation = 0.2; // 动画效果间隔时间
const setIntervalPrayerMove = 1; // 祈祷文持续时间

let autoClick = DEFAULT_VALUE_FALSE;
let autoBgmMusic = DEFAULT_VALUE_FALSE;


// 选择元素
const varGameTitle = document.querySelector('.var_game_title');
const popupFormEditGameTitle = document.querySelector('.popup_form_edit_game_title');
const formEditGameTitle = popupFormEditGameTitle.querySelector('.form_edit_game_title');
const formEditGameTitleBtnSubmit = formEditGameTitle.querySelector('.btn_submit');
const formEditGameTitleBtnReset = formEditGameTitle.querySelector('.btn_reset');



const popupFormEditPrayer = document.querySelector('.popup_form_edit_prayer');
const formEditPrayer = popupFormEditPrayer.querySelector('.form_edit_prayer');
const formEditPrayerBtnSubmit = formEditPrayer.querySelector('.btn_submit');
const formEditPrayerBtnReset = formEditPrayer.querySelector('.btn_reset');
const prayerCustomizeInput = document.getElementById('prayer_customize_input');

const varCount = document.querySelector('.var_count');
const woodenFishElement = document.querySelector(".woodenFish");
const centerElement = document.querySelector(".center");

const autoCheckbox = document.querySelector('input[name="auto"]');
const bgmCheckbox = document.querySelector('input[name="bgm"]');


// const bgmClick = new Howl({ src: ["/audio/game/wooden_fish/sound.mp3"] });
const bgmClick = newSound('/audio/game/wooden_fish/sound', false, 1);
const bgmMusic = newSound('/audio/game/wooden_fish/1721013450', true, 0.3);

// 函数
// 函数
// 函数
// 函数
// 函数

// 初始化游戏数据
function initGameData() {

    const userData = readDataFromLocal(keyName_1_00);

    if (userData === DEFAULT_VALUE_NULL) {

        const data = {

            [keyName_1_01]: 0,
            [keyName_1_02]: getFormattedDateWithDash(),
            [keyName_1_03]: 0,
            [keyName_1_04]: varGameTitle.textContent,
            [keyName_1_05]: '🥰 + 1, 😭 - 1',
        }

        writeDataToLocal(keyName_1_00, data);

    } else if (readValueFromRecordInLocal(keyName_1_00, keyName_1_02) != getFormattedDateWithDash()) {

        const updateData = readDataFromLocal(keyName_1_00);
        
        updateData[keyName_1_01] = 0;
        updateData[keyName_1_02] = getFormattedDateWithDash();
        updateData[keyName_1_03] = 0;

        writeDataToLocal(keyName_1_00, updateData);

    }
}

// 动画效果 -- 初始化
function initAnimate() {

    varCount.style.transform = "scale(1)";

    woodenFishElement.style.transform = "scale(1)";
}

// 动画效果 -- 变化过程 -- 参数传递 -- 点击木鱼弹出的祈祷文 -- 每秒变化第一次
function startAnimate(message) {

    varCount.style.transform = "scale(1.2)";

    woodenFishElement.style.transform = "scale(.95)";

    const div = document.createElement("div");

    div.classList.add("subtitleCountTip");

    div.textContent = message;

    centerElement.appendChild(div);

    setTimeout(() => {

        div.remove();

    }, setIntervalPrayerMove * 1000);
}

// 返回用户的点击次数
function returnClickCount() {

    return readValueFromRecordInLocal(keyName_1_00, keyName_1_01);
}

// 返回用户上次执行过统计的点击次数
function returnLastExecClickCount() {

    return readValueFromRecordInLocal(keyName_1_00, keyName_1_03);
}

// 写入用户的点击次数到本地 -- 参数传递 -- 点击次数
function writeClickCountToLocal(count) {

    writeValueToRecordInLocal(keyName_1_00, keyName_1_01, count);
}

// 写入用户上次执行过统计的点击次数到本地 -- 参数传递 -- 点击次数
function writeLastExecClickCountToLocal(count) {

    writeValueToRecordInLocal(keyName_1_00, keyName_1_03, count);
}

// 更新用户输入标题到页面
function updateGameTitleInPage() {

    varGameTitle.textContent = readValueFromRecordInLocal(keyName_1_00, keyName_1_04);
}

// 更新用户的点击次数到页面
function updateClickCountInPage() {

    varCount.textContent = returnClickCount();
}

// 返回用户选择/输入的祈祷文
function returnUserPrayer() {

    return readValueFromRecordInLocal(keyName_1_00, keyName_1_05);
}

// 点击木鱼
function counter(message) {

    let clickCount = returnClickCount();

    clickCount++;

    bgmClick.play();

    writeClickCountToLocal(clickCount);

    updateClickCountInPage();

    startAnimate(message);

    // bgmClick.stop();
    
    // -- 每满多少次点击给一个幸运值，并增加一次游戏次数；
    if (clickCount % setNumberOfClickWhenBouns === 0 && clickCount > returnLastExecClickCount()) {

        updateUserLuckyPointToLocal(setBonusLuckyPoint);

        updateUserGameTimeToLocal(setBonusGameTime);

        writeLastExecClickCountToLocal(clickCount);
        
    }
}

// 更新用户信息
function updateUserInfo() {

    const userData = readDataFromLocal(keyName_1_00);

    if (userData) {

        const gameTitle = readValueFromRecordInLocal(keyName_1_00, keyName_1_04);

        updateClickCountInPage();

        if (gameTitle) {

            updateGameTitleInPage();
        }
    }
}




// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end




// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

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

// 初始化游戏数据
initGameData();


// 更新页面信息
updateUserInfo();

clickSetDisplay(varGameTitle, popupFormEditGameTitle, displayTypes.flex);

clickSetDisplay(varCount, popupFormEditPrayer, displayTypes.flex);

formEditGameTitle.addEventListener('submit', (event) => {

    event.preventDefault();

    siteBgmSelect.play();

    const gameTitleInput = document.querySelector('.game_title_input').value;

    if (gameTitleInput) {

        writeValueToRecordInLocal(keyName_1_00, keyName_1_04, gameTitleInput);

        updateGameTitleInPage();
    } 
    
    formEditGameTitle.reset();

    siteBgmSelect.stop();

});

formEditGameTitle.addEventListener('reset', () => {

    formEditGameTitle.reset();

    setDisplay(popupFormEditGameTitle, displayTypes.none);
});


formEditPrayer.addEventListener('change', (event) => {

    if (event.target.name === 'prayer') {

        if (event.target.id === 'prayer_customize') {

            prayerCustomizeInput.classList.remove('hide');

        } else {

            prayerCustomizeInput.classList.add('hide');
        }
    }
});

formEditPrayer.addEventListener('submit', (event) => {

    event.preventDefault();

    siteBgmSelect.play();

    const selectedPrayer = document.querySelector('input[name="prayer"]:checked').value;

    writeValueToRecordInLocal(keyName_1_00, keyName_1_05, selectedPrayer);

    if (selectedPrayer === 'prayer_customize') {

        writeValueToRecordInLocal(keyName_1_00, keyName_1_05, prayerCustomizeInput.value);
    }
    
    formEditPrayer.reset();

    siteBgmSelect.stop();

});

formEditPrayer.addEventListener('reset', () => {

    formEditPrayer.reset();

    setDisplay(popupFormEditPrayer, displayTypes.none);
});

autoCheckbox.addEventListener("change", () => {

    if (autoCheckbox.checked) {

        autoClick = true;

        autoClickInterval = setInterval(() => {

            counter(returnUserPrayer());

            setTimeout(initAnimate, setIntervalAnimation * 1000);

        }, setIntervalAutoClick * 1000);

    } else {

        autoClick = false;

        clearInterval(autoClickInterval);
    }
});

bgmCheckbox.addEventListener("change", () => {

    if (bgmCheckbox.checked) {

        if (bgmMusic.state() !== "loaded") {

            bgmMusic.load();
        }

        bgmMusic.play();

    } else {

        bgmMusic.pause();
    }
});

// 鼠标悬停和离开使用CSS效果来实现
woodenFishElement.style.cursor = "url('/image/game/wooden_fish/cursor.cur'), auto";

woodenFishElement.addEventListener("mousedown", () => {
    initAnimate();
});

woodenFishElement.addEventListener("click", () => {
    counter(returnUserPrayer());
    setTimeout(initAnimate, setIntervalAnimation * 1000);
});




// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end