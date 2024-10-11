const fruits = ['🍞', '🍗', '🍔', '🍟', '🌭', '🥟', '🦞', '🍥', '🥗', '🍜']; // 水果列表
const fruitHeight = 60; // 每个水果的高度
const step = 20; // 每次移动20px
const intervalTime = 20; // 每0.02s移动一次
const bonusMatchThreeInRange = 10;
const bonusMatchThreeInSameRow = 30;

let bonus = 0; // 用户中奖金额

let isRolling = false; // 用于标记是否正在滚动

const imageBonus = document.querySelector('.image_bonus');
const infoIconForceClose = document.querySelector('.tips_icon_force_close');
const btnGetIt = infoIconForceClose.querySelector('.btn_get_it');
const tipsWin = document.querySelector('.tips_win');

const varUserWinAmount = document.querySelector('.var_user_win_amount');
const varUserBetAmount = document.querySelector('.var_user_bet_amount');
const bonusButton = document.getElementById('bonus');
const minusButton = document.getElementById('minus_bonus');
const addButton = document.getElementById('add_bonus');
const startButton = document.getElementById('startBtn');
let betAmount = parseInt(varUserBetAmount.textContent, 10);

const bgmGame = newSound('/audio/game/fruit_slot/bgm_game', true, 0.4);
const bgmSpin = newSoundNoHtml5('/audio/game/fruit_slot/bgm_spin', false, 1.5);
const bgmWin = newSoundNoHtml5('/audio/game/fruit_slot/bgm_win', false, 0.8);
const bgmBonus = newSoundNoHtml5('/audio/game/fruit_slot/bgm_bonus', false, 0.8);


// 点击 知道了 按钮
btnGetIt.addEventListener('click', () => {
    bgmGame.play();
});

// 点击-按钮
minusButton.addEventListener('click', () => {
    if (betAmount > 1) {

        siteBgmSelect.play();
        betAmount -= 1;
        varUserBetAmount.textContent = betAmount;
        updateAddMinusButtonStatus();
    }
});

// 点击+按钮
addButton.addEventListener('click', () => {
    if (betAmount < 10) {
        siteBgmSelect.play();
        betAmount += 1;
        varUserBetAmount.textContent = betAmount;
        updateAddMinusButtonStatus();
    }
});

// 点击兑奖按钮 - bonus
bonusButton.addEventListener('click', () => {
    
    bgmBonus.play();

    updateUserLuckyPointToLocal(parseInt(varUserWinAmount.textContent));

    varUserWinAmount.textContent = 0;

    updateUserLuckyPointInPage();

    updateBonusButtonStatus();
});

// 更新 + / - 按钮的状态
function updateAddMinusButtonStatus() {

    if (parseInt(varUserBetAmount.textContent) >= 10) {

        addButton.disabled = true;
        minusButton.disabled = false;

    } else if (parseInt(varUserBetAmount.textContent) <= 1){

        addButton.disabled = false;
        minusButton.disabled = true;

    } else {

        addButton.disabled = false;
        minusButton.disabled = false;
    }
}


// 更新兑奖按钮 / 开始按钮 的状态
function updateBonusButtonStatus() {

    if (parseInt(varUserWinAmount.textContent) > 0) {

        bonusButton.disabled = false;
        startButton.disabled = true;

    } else {

        bonusButton.disabled = true;
        startButton.disabled = false;
    }
}

// 随机生成水果排列
function shuffleFruits() {
    const shuffled = [...fruits];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 填充每列的初始水果
function initColumn(columnId) {
    const column = document.getElementById(columnId);
    const shuffledFruits = shuffleFruits();
    column.innerHTML = ''; // 清空之前的水果
    shuffledFruits.forEach(fruit => {
        const fruitDiv = document.createElement('div');
        fruitDiv.classList.add('fruit');
        fruitDiv.innerHTML = fruit;
        column.appendChild(fruitDiv);
    });
}

// 初始化所有列
function initGame() {
    initColumn('column1');
    initColumn('column2');
    initColumn('column3');
}

// 获取可见区域内的水果
function getVisibleFruits(columnId) {
    const column = document.getElementById(columnId);
    const visibleFruits = [];
    for (let i = 0; i < 3; i++) {
        const fruitDiv = column.children[i];
        visibleFruits.push(fruitDiv.innerHTML);
    }
    return visibleFruits;
}

// 检查是否中奖
function checkForWin() {
    const visibleFruits1 = getVisibleFruits('column1');
    const visibleFruits2 = getVisibleFruits('column2');
    const visibleFruits3 = getVisibleFruits('column3');
    
    let score = 0;
    
    // 比对第一列的每个水果
    visibleFruits1.forEach((fruit, index) => {
        const secondColumnMatch = visibleFruits2.includes(fruit);
        const thirdColumnMatch = visibleFruits3.includes(fruit);

        if (secondColumnMatch && thirdColumnMatch) {
            score += bonusMatchThreeInRange; // 如果匹配，奖励

            // 如果在同一排上
            const secondColumnSameRow = visibleFruits2[index] === fruit;
            const thirdColumnSameRow = visibleFruits3[index] === fruit;

            if (secondColumnSameRow && thirdColumnSameRow) {
                score += bonusMatchThreeInSameRow; // 额外奖励
            }
        }
    });
    
    // 输出得分
    if (score > 0) {

        bgmWin.play();
        // 让元素显示
        imageBonus.style.display = 'block';

        // 1秒后隐藏元素
        setTimeout(() => {
            imageBonus.style.display = 'none';
        }, 1000); 

        // tipsWin.click();

        // 用户中奖金额 - 下注金额 * 中奖金额 - 倍数
        const userBonusAmount = score * parseInt(varUserBetAmount.textContent);

        varUserWinAmount.textContent = userBonusAmount;
        
    } else {
        
    }
}

// 实现滚动动画
function startRolling(columnId, duration, onFinish) {
    const column = document.getElementById(columnId);
    let topPosition = 0;
    const startTime = Date.now();
    const originalFruits = Array.from(column.children).map(child => child.innerHTML);
    let fruitIndex = 0;

    const interval = setInterval(() => {
        topPosition -= step;
        column.style.transform = `translateY(${topPosition}px)`;

        // 当移动的距离超过一个水果的高度时
        if (Math.abs(topPosition) >= fruitHeight) {
            topPosition += fruitHeight; // 调整位置
            column.style.transform = `translateY(${topPosition}px)`;

            // 删除顶部水果
            const firstFruit = column.firstElementChild;
            column.removeChild(firstFruit);

            // 添加新水果到末尾，保持顺序
            const newFruit = document.createElement('div');
            newFruit.classList.add('fruit');
            newFruit.innerHTML = originalFruits[fruitIndex % originalFruits.length];
            fruitIndex++;
            column.appendChild(newFruit);
        }

        // 检查是否达到滚动持续时间
        if (Date.now() - startTime >= duration) {
            clearInterval(interval); // 滚动完成，停止
            // 调整列的位置，使水果对齐
            const remainder = Math.abs(topPosition) % fruitHeight;
            topPosition += remainder;
            column.style.transform = `translateY(${topPosition}px)`;

            if (onFinish) onFinish(); // 回调函数，滚动完成后执行
        }
    }, intervalTime);
}

// 生成随机滚动时间
function getRandomDuration(min, max) {
    return Math.random() * (max - min) + min;
}

// 点击开始按钮时启动动画
document.getElementById('startBtn').addEventListener('click', () => {

    // 检查积分是否足够
    if (parseInt(varUserBetAmount.textContent) > parseInt(readValueFromRecordInLocal(keyName_0_01, keyName_0_01_01))) {

        siteBgmInvalid.play();

        clickNotEnoughLuckyPoint();

    } else {

        if (isRolling) return; // 如果正在滚动，直接返回，防止重复点击
        isRolling = true; // 标记为正在滚动

        bgmSpin.play();

        // 游戏中 - 禁用按钮
        updateBonusButtonStatus(); // 兑奖按钮/开始按钮的状态
        startButton.disabled = true;
        addButton.disabled = true;
        minusButton.disabled = true;

        // 扣减积分
        updateUserLuckyPointToLocal(-parseInt(varUserBetAmount.textContent));
        updateUserLuckyPointInPage();

        // 增加游戏次数
        updateUserGameTimeToLocal(1);


        // 第一列滚动时间在 1 到 1.5 秒之间
        const firstColumnDuration = getRandomDuration(1000, 1500);

        // 第二列滚动时间比第一列多 0.1 到 0.3 秒
        const secondColumnDuration = firstColumnDuration + getRandomDuration(100, 300);

        // 第三列滚动时间比第二列多 0.1 到 0.3 秒
        const thirdColumnDuration = secondColumnDuration + getRandomDuration(100, 300);

        let columnsFinished = 0;

        const checkColumnsFinished = () => {
            columnsFinished++;
            if (columnsFinished === 3) {
                checkForWin(); // 所有列滚动结束后检查是否中奖
                isRolling = false; // 游戏结束，允许再次点击

                bgmSpin.stop();

                // 重新启用按钮
                updateBonusButtonStatus(); // 兑奖按钮/开始按钮的状态更新
                updateAddMinusButtonStatus();

            }
        };

        startRolling('column1', firstColumnDuration, checkColumnsFinished); // 第一列随机滚动时间
        startRolling('column2', secondColumnDuration, checkColumnsFinished); // 第二列随机滚动时间
        startRolling('column3', thirdColumnDuration, checkColumnsFinished); // 第三列随机滚动时间


    }


});


// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行



// 初始化游戏界面

infoIconForceClose.click();

updateBonusButtonStatus();

updateAddMinusButtonStatus();

initGame();



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
