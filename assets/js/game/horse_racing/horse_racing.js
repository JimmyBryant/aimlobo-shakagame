

// 选择元素
const horses = document.querySelectorAll(".horse_img_in_lane");
const formHorseSelect = document.querySelector(".form_horse_select");
const formBetAmount = document.querySelector(".form_bet_amount");
const gameMatchSection = document.querySelector(".game_match");
const varCurrentUserBetHorses = document.querySelectorAll(".var_current_user_bet_horse");
const varCurrentUserBetAmount = document.querySelector(".var_current_user_bet_amount");
const gamePlayingSection = document.querySelector(".game_playing");
const gameResultSection = document.querySelector(".game_result");
const gameTitle = document.querySelector(".game_title");
const match = document.querySelector(".match");
const matchSuccess = document.querySelector(".match_success");
const txtRacing = document.querySelector(".txt_racing");
const countDown = document.querySelector(".count_down");
const readyStartButton = document.getElementById("readyToStart");
// const startGameButton = document.getElementById("startGame");
const resetGameButton = document.getElementById("resetGame");
const resultSuccess = document.querySelector(".result_success");
const varWinLuckyPoint = document.querySelector(".var_win_lucky_point");
const varWinner = document.querySelector(".var_winner");
const resultLose = document.querySelector(".result_lose");
const boostButton = document.getElementById("boostButton");


let userBetHorse = null;
let userBetAmount = null;
let raceFinished = false;
let horseSpeeds = Array(10).fill(0); // 更新为10匹马
let totalBetAmount = 0;
let userBetInfo = {};
let boostCount = 0; // 助力计数器

// 初始化音乐
// 选择音效-- 有效
const bgmSelect = new Howl({
    src: ["/audio/game/horse_racing/select-sound-121244.mp3"],
    html5: true,
    loop: false,
    volume: 0.4,
});

// 选择音效-- 无效
const bgmInvalid = new Howl({
    src: ["/audio/game/horse_racing/90s-game-ui-5-185098.mp3"],
    html5: true,
    loop: false,
    volume: 0.4,
});

// 游戏开始倒计时
const bgmCountDown = new Howl({
    src: ["/audio/game/horse_racing/race-start-beeps-125125.mp3"],
    html5: true,
    loop: false,
    volume: 0.3,
});

// 游戏中
const bgmGame = new Howl({
    src: ["/audio/game/horse_racing/bgm_game.mp3"],
    html5: true,
    loop: false,
    volume: 0.3,
});

// 游戏胜利
const bgmWin = new Howl({
    src: ["/audio/game/horse_racing/winning-218995.mp3"],
    html5: true,
    loop: false,
    volume: 0.3,
});

// 游戏失败
const bgmLose = new Howl({
    src: ["/audio/game/horse_racing/negative_beeps-6008.mp3"],
    html5: true,
    loop: false,
    volume: 0.3,
});


function bgmInvalidPlayOneSecond() {
    bgmInvalid.play();
    // 一秒以后关闭
    setTimeout(() => {
        bgmInvalid.stop();
    }, 1000);
}

// 第一个页面，选择马匹
formHorseSelect.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedHorse = document.querySelector('input[name="select_horse"]:checked');
    if (selectedHorse) {
        bgmSelect.play();
        userBetHorse = parseInt(selectedHorse.value);
        hide(formHorseSelect);
        hide(gameTitle);
        // 刷新页面上的幸运值
        updatePageTotalLuckyPoint();
        displayBlock(formBetAmount); // 第二个页面，选择下注金额
        bgmSelect.stop();
    } 
});

formHorseSelect.addEventListener('reset', () => {
    formHorseSelect.reset();
});

// 第二个页面，选择下注金额
formBetAmount.addEventListener("submit", (event) => {
    event.preventDefault();
    const amountInput = document.querySelector('input[name="bet_amount"]');
    userBetAmount = parseInt(amountInput.value);

    if (userBetAmount >= 1 && userBetAmount <= 100) {

        // 查看用户的幸运值够不够玩的，不够的话就弹出提示，重置游戏
        if (userBetAmount > parseInt(readFromLocalStorage('total_lucky_point'))) {
            const notEnoughLuckyPoint = document.querySelector('.not_enough_lucky_point');
            notEnoughLuckyPoint.click();
            formBetAmount.reset();
            bgmInvalidPlayOneSecond();

        } else {
            
            bgmSelect.play();
            // 扣减幸运值
            updateTotalLuckyPoint(-userBetAmount);
            writeEventLogLuckyPoint('horse racing cost', -userBetAmount);
            hide(formBetAmount);
            updateUserBetInfo();
            displayBlock(match); // 显示匹配中
            setTimeout(() => {
                hide(match); // 隐藏匹配中
                displayBlock(matchSuccess); // 显示匹配成功
                displayFlex(gameMatchSection); // 第三个页面，显示下注的所有数据
                simulateGame();
            }, 3000); // 延时3秒显示下注数模拟匹配过程
        }      
    } 
    
});

formBetAmount.addEventListener('reset', () => {
    formBetAmount.reset();
});

// 第三个页面，显示下注的所有数据

function resetHorseStyle() {
    horses.forEach(horse => {
        horse.classList.add("resetTransition");
        horse.style.left = "0";
        horse.offsetHeight; // 触发重新渲染以应用 resetTransition 类
        horse.classList.remove("resetTransition");
    });
}

// 显示用户的下注信息
function updateUserBetInfo() {
    varCurrentUserBetAmount.textContent = userBetAmount;

    varCurrentUserBetHorses.forEach(varCurrentUserBetHorse => {
        varCurrentUserBetHorse.textContent = userBetHorse;
    

        // 移除varCurrentUserBetHorse的所有现有类
        varCurrentUserBetHorse.className = ''; // 这将移除所有类
    
        // 添加新类
        varCurrentUserBetHorse.classList.add('font-size-1_2');
        varCurrentUserBetHorse.classList.add('horse_color');
        varCurrentUserBetHorse.classList.add('horse_color_' + userBetHorse);
    });
    
}

// 准备好游戏点击事件
readyStartButton.addEventListener("click", () => {
    hide(matchSuccess);
    hide(gameMatchSection);
    resetHorseStyle();
    displayFlex(gamePlayingSection);
    hide(txtRacing);
    startCountDown();
    
});

// 倒计时功能
function startCountDown() {
    let countdown = 4;
    countDown.textContent = countdown;
    displayBlock(countDown);
    bgmCountDown.play();

    const interval = setInterval(() => {
        countdown--;
        
        countDown.textContent = countdown;
        if (countdown === 0) {
            clearInterval(interval);
            hide(countDown);
            bgmCountDown.stop();
            babyBonus();
            displayBlock(txtRacing);
            startRace();
        }
    }, 1000);
}


// 开始游戏按钮点击事件
// startGameButton.addEventListener("click", () => {
//     startRace();
// });

// 重置游戏按钮点击事件
resetGameButton.addEventListener("click", () => {
    bgmSelect.play();
    resetGame();
});

// 助力按钮点击事件
function babyBonus() {
    hide(boostButton);
    if (isUserDuoDiu()) {
        displayBlock(boostButton);
        boostFunction();
    } 
}

function boostFunction() {
    if (boostButton) {
        boostButton.addEventListener("click", boostHorse);
    }
}


// 模拟游戏下注数据
function simulateGame() {
    raceFinished = false;
    horseSpeeds = Array(10).fill(0); // 更新为10匹马
    const totalPlayers = Math.floor(Math.random() * 151) + 50;
    const otherBets = [];
    for (let i = 0; i < totalPlayers - 1; i++) {
        otherBets.push({
            horse: Math.floor(Math.random() * 10) + 1, // 更新为10匹马
            amount: Math.floor(Math.random() * 100) + 1
        });
    }

    const pool = Array(10).fill(0).map(() => ({
        betters: 0,
        totalAmount: 0
    }));

    otherBets.forEach(bet => {
        pool[bet.horse - 1].betters++;
        pool[bet.horse - 1].totalAmount += bet.amount;
    });

    pool[userBetHorse - 1].betters++;
    pool[userBetHorse - 1].totalAmount += userBetAmount;

    totalBetAmount = pool.reduce((sum, horse) => sum + horse.totalAmount, 0);
    userBetInfo = pool[userBetHorse - 1];

    displayBettingInfo(totalPlayers, totalBetAmount, pool);
}

// 显示下注信息
function displayBettingInfo(totalPlayers, totalBetAmount, pool) {
    const totalPlayersElement = document.querySelector(".var_total_user_bet_horse");
    const totalBetAmountElement = document.querySelector(".var_total_user_bet_amount");

    totalPlayersElement.textContent = totalPlayers;
    totalBetAmountElement.textContent = totalBetAmount;

    pool.forEach((horse, index) => {
        const userHorseElement = document.querySelector(`.var_user_horse_${index + 1}`);
        const betAmountHorseElement = document.querySelector(`.var_bet_amount_horse_${index + 1}`);
        userHorseElement.textContent = horse.betters;
        betAmountHorseElement.textContent = horse.totalAmount;
    });
}


// 助力函数
// 助力函数
function boostHorse() {
    if (boostCount < 5 && userBetHorse !== null) {
        const userHorse = document.querySelector(`.lane[data-lane="${userBetHorse}"] .horse_img_in_lane`);
        const lane = document.querySelector(`.lane[data-lane="${userBetHorse}"]`);
        
        // 获取当前位置(px)
        const currentLeftPx = parseFloat(window.getComputedStyle(userHorse).left);

        // 获取赛道宽度
        const laneWidth = lane.getBoundingClientRect().width;

        // 将px转换为百分比
        const currentLeft = (currentLeftPx / laneWidth) * 100;

        // 计算剩余距离
        const remainingDistance = 100 - currentLeft;

        // 计算当前速度
        let currentSpeed = horseSpeeds[userBetHorse - 1];

        // 计算剩余时间 = 当前速度 * 剩余距离 / 100
        const remainingTime = (currentSpeed * remainingDistance) / 100;

        // 计算新速度
        let newSpeed = remainingTime * 0.99; // 提升2%的速度
        horseSpeeds[userBetHorse - 1] = newSpeed;

        // 重新设置动画
        userHorse.style.transition = 'none';
        userHorse.style.left = `${currentLeft}%`; // 确保马匹的位置已经更新
        userHorse.offsetHeight; // 触发重新渲染
        userHorse.style.transition = `left ${newSpeed}s linear`;
        userHorse.style.left = '100%'; // 移动到终点

        
        boostCount++;
    }
}





// 开始比赛
function startRace() {
    bgmGame.play();
    const lanes = document.querySelectorAll(".lane");
    lanes.forEach((lane, index) => {
        const horse = lane.querySelector(".horse_img_in_lane");
        let baseSpeed = Math.random() * 5 + 20; // 10-15秒 20-25s
        horseSpeeds[index] = baseSpeed;
        horse.style.transition = `left ${baseSpeed}s linear`;
        horse.style.left = '100%';

        horse.addEventListener('transitionend', () => {
            if (!raceFinished) {
                raceFinished = true;
                bgmGame.stop();
                announceWinner(index + 1);//这里直接确定谁赢,把index换成数字就行；
            }
        }, { once: true });
    });
}

// 宣布比赛结果
function announceWinner(winner) {
    hide(gamePlayingSection);
    displayFlex(gameResultSection);

    // 增加游戏次数
    updateGameTime(1);
    writeEventLogGameTime('horse racing', 1);

    if (userBetHorse === winner) {
        // 3%作为税收
        let userWinnings = (totalBetAmount / userBetInfo.totalAmount) * userBetAmount * 0.97;
        userWinnings = parseFloat(userWinnings.toFixed(1)); // 保留到小数点后一位

        bgmWin.play();

        // 填充内容
        varWinLuckyPoint.textContent = userWinnings;
        displayBlock(resultSuccess);
        // resultMessage.textContent = `恭喜！马${winner}赢了！您赢得了${userWinnings}元。`;
        // 增加幸运值
        updateTotalLuckyPoint(userWinnings);
        writeEventLogLuckyPoint('horse racing earn', userWinnings);

    } else {
        // resultMessage.textContent = `很遗憾，马${winner}赢了。您输了。`;
        bgmLose.play();
        varWinner.textContent = winner;
        displayBlock(resultLose);
    }
}



// 重置游戏
function resetGame() {
    userBetHorse = null;
    userBetAmount = null;
    raceFinished = false;
    boostCount = 0; // 重置助力计数器

    // 关闭音乐
    bgmWin.stop();
    bgmLose.stop();

    // 重置表单
    formHorseSelect.reset();
    formBetAmount.reset();

    // 显示内容
    displayFlex(gameTitle);
    displayBlock(formHorseSelect);

    // 隐藏内容
    hide(gameResultSection);
    hide(gamePlayingSection);
    hide(gameMatchSection);
    hide(formBetAmount);
    hide(resultLose);
    hide(resultSuccess);
    hide(boostButton);
    
    resetHorseStyle();
}

// 马儿归位
function resetHorseStyle() {
    horses.forEach(horse => {
        horse.classList.add("resetTransition");
        horse.style.left = "0";
        horse.offsetHeight; // 触发重新渲染以应用 resetTransition 类
        horse.classList.remove("resetTransition");
    });
}



