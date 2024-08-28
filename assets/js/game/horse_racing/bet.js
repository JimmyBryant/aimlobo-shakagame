const pageName = 'bet';

const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

const formBetAmount = document.querySelector(".form_bet_amount");

const popupInfoMatch = document.querySelector('.popup_info_match');



// 函数
// 函数
// 函数



// 模拟游戏下注数据
function simulateGame() {

    // 用户的下注信息
    const userBetHorse = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);
    const userBetAmount = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

    const totalPlayers = getRandomIntegerInRange(minPlayerNumber, maxPlayerNumber);
    const otherBets = [];

    // 模拟其他玩家的下注
    for (let i = 0; i < totalPlayers; i++) {
        otherBets.push({
            horse: getRandomIntegerInRange(1, horseNumber), 
            amount: getRandomIntegerInRange(minBetAmount, maxBetAmount)
        });
    }

    // 初始化每匹马的下注信息 -- 下注玩家数量，下注金额
    const pool = Array(horseNumber).fill(0).map(() => ({
        [keyName_1_03_01]: 0,
        [keyName_1_03_02]: 0
    }));

    // 计算所有下注的总人数和金额
    otherBets.forEach(bet => {
        pool[bet.horse - 1][keyName_1_03_01]++;
        pool[bet.horse - 1][keyName_1_03_02] += bet.amount;
    });

    // 更新玩家自己的下注信息 -- 玩家数量+1，用户自己的下注金额
    pool[userBetHorse - 1][keyName_1_03_01]++;
    pool[userBetHorse - 1][keyName_1_03_02] += userBetAmount;

    // 计算总的下注金额
    const totalBetAmount = pool.reduce((sum, horse) => sum + horse[keyName_1_03_02], 0);

    // 将数据存储到本地 localStorage
    writeValueToRecordInLocal(keyName_1_00, keyName_1_03_01, totalPlayers + 1);
    writeValueToRecordInLocal(keyName_1_00, keyName_1_03_02, totalBetAmount);
    writeValueToRecordInLocal(keyName_1_00, keyName_1_03, pool);
}

// 判断用户是否直接跳转到该页面
function isUserSelectdHorse() {

    const userBetHorseID = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    const roundEndOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_09);

    if (!userBetHorseID || roundEndOrNot) {

        showPopupMissData();
        
        return false;
    }

    return true;
}


// 函数 -- end 
// 函数 -- end 
// 函数 -- end 



// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

// 判断用户是否直接跳转到该页面 -- 没有选择马匹
isUserSelectdHorse();




// 页面提示 -- 可点击隐藏
clickHideInPageTips();


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


// 表单处理
formBetAmount.addEventListener("submit", (event) => {

    event.preventDefault();
    const amountInput = document.querySelector('input[name="bet_amount"]');
    let userBetAmount = parseInt(amountInput.value);

    if (userBetAmount >= minBetAmount && userBetAmount <= maxBetAmount) {

        // 检查幸运值
        if (userBetAmount > parseInt(readValueFromRecordInLocal(keyName_0_01, keyName_0_01_01))) {

            siteBgmInvalid.play();

            clickNotEnoughLuckyPoint();

            siteBgmInvalid.stop();

        } else {

            if (isUserSelectdHorse()) {

                siteBgmSelect.play();

                writeValueToRecordInLocal(keyName_1_00, keyName_1_02, userBetAmount);

                setDisplay(popupInfoMatch, displayTypes.flex);
    
                simulateGame();
    
                setTimeout(() => {
    
                    // 跳转到 match
                    window.location.href = "../match";
                }, 1000); // 延时1秒显示下注数模拟匹配过程

                siteBgmSelect.stop();

            }
  
        }      
    } 
    
});

formBetAmount.addEventListener('reset', () => {

    window.location.href = "../";

});




// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end




