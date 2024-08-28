
const txtRacing = document.querySelector(".txt_racing");

const btnBoost = document.querySelector('.btn_boost');

let horseSpeeds = Array(horseNumber).fill(0);

let raceFinished = false;

const userBetHorseID = parseInt(readValueFromRecordInLocal(keyName_1_00, keyName_1_01));

const bgmGame = newSound(bgmGameLocation, bgmGameLoop, bgmGameVolume);

const bgmJia = newSound(bgmJiaLocation, bgmJiaLoop, bgmJiaVolume);

// 函数
// 函数
// 函数

// 判断用户是否直接跳转到该页面 
function isUserJumpToThisPage() {

    try {

        const userBetHorseID = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

        const userBetAmount = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);
    
        const userMatchOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_05);
    
        const roundEndOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_09);
    
        if (!userBetHorseID || !userBetAmount || !userMatchOrNot || roundEndOrNot) {
    
            showPopupMissData();
            
            return false;
        }
    
        return true;
    } catch (error) {

        showPopupMissData();
            
        return false;
    }

    
}


// 更新用户下注信息
function updateUserBetInfo() {

    const varCurrentUserBetHorse = document.querySelector(".var_current_user_bet_horse");

    const userBetHorse = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    varCurrentUserBetHorse.textContent = userBetHorse;

    varCurrentUserBetHorse.classList.add('horse_color_' + userBetHorse);

}

// 倒计时功能
function startCountDown() {

    let countdown = 4;

    siteBgmCountDown4s.play();

    const interval = setInterval(() => {
   
        countdown--;

        // 显示当前倒计时数字对应的圆圈
        document.querySelector(`.count_down_circle_item_${countdown}`).style.visibility = 'visible';

        if (countdown === 0) {

            clearInterval(interval);

            siteBgmCountDown4s.stop();

            if (isSpecialUser()) {

                setDisplay(btnBoost, displayTypes.inlineBlock); // 彩蛋
            }

            startRace();
        }
    }, 1000);
}


// 开始比赛
function startRace() {
    bgmGame.play();
    const lanes = document.querySelectorAll(".lane");
    lanes.forEach((lane, index) => {
        const horse = lane.querySelector(".horse_img_in_lane");
        let baseSpeed = getRandomIntegerInRange(minRacingTime, maxRacingTime); 
        horseSpeeds[index] = baseSpeed;
        horse.style.transition = `left ${baseSpeed}s linear`;
        horse.style.left = '100%';

        horse.addEventListener('transitionend', () => {
            if (!raceFinished) {
                raceFinished = true;
                bgmGame.stop();
                //这里直接确定谁赢,把index换成数字就行；
                writeValueToRecordInLocal(keyName_1_00, keyName_1_04, index + 1);

                // 用户已经参与比赛 - racing
                writeValueToRecordInLocal(keyName_1_00, keyName_1_06, true);

                // 判断用户是否赢
                if (readValueFromRecordInLocal(keyName_1_00, keyName_1_01) === (index + 1)) {

                    writeValueToRecordInLocal(keyName_1_00, keyName_1_08, DEFAULT_VALUE_TRUE);

                }

                // 跳转到 result
                window.location.href = "../result";
            }
        }, { once: true });
    });
}

// 助力
function boostHorse() {

    if (userBetHorseID) {

        const userHorse = document.querySelector(`.lane[data-lane="${userBetHorseID}"] .horse_img_in_lane`);

        const lane = document.querySelector(`.lane[data-lane="${userBetHorseID}"]`);
        
        // 获取当前位置(px)
        const currentLeftPx = parseFloat(window.getComputedStyle(userHorse).left);

        // 获取赛道宽度
        const laneWidth = lane.getBoundingClientRect().width;

        // 将px转换为百分比
        const currentLeft = (currentLeftPx / laneWidth) * 100;

        // 计算剩余距离
        const remainingDistance = 100 - currentLeft;

        // 计算当前速度
        let currentSpeed = horseSpeeds[userBetHorseID - 1];

        // 计算剩余时间 = 当前速度 * 剩余距离 / 100
        const remainingTime = (currentSpeed * remainingDistance) / 100;

        // 计算新速度
        let newSpeed = remainingTime * 0.99; // 提升2%的速度
        horseSpeeds[userBetHorseID - 1] = newSpeed;

        // 重新设置动画
        userHorse.style.transition = 'none';
        userHorse.style.left = `${currentLeft}%`; // 确保马匹的位置已经更新
        userHorse.offsetHeight; // 触发重新渲染
        userHorse.style.transition = `left ${newSpeed}s linear`;
        userHorse.style.left = '100%'; // 移动到终点

    }
}

// 初始化游戏
function initGame() {

    if (isUserJumpToThisPage()) {

        updateUserBetInfo();

        startCountDown();
        
    }
}


// 函数 -- end 
// 函数 -- end 
// 函数 -- end 


// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行



initGame();

btnBoost.addEventListener('click', function() {
    if (isSpecialUser()) {

        bgmJia.play();

        boostHorse();

        bgmJia.stop();
    }
});





// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end