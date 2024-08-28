const varCurrentUserBetHorse = document.querySelector(".var_current_user_bet_horse");
const varCurrentUserBetAmount = document.querySelector(".var_current_user_bet_amount");
const btnStartGame = document.querySelector('.btn_start_game');



// 函数

// 判断用户是否直接跳转到该页面 
function isUserSelectdHorseAndBet() {

    const userBetHorseID = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    const userBetAmount = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

    const roundEndOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_09);

    if (!userBetHorseID || !userBetAmount || roundEndOrNot) {

        showPopupMissData();
        
        return false;
    }

    return true;
}

// 更新用户下注信息
function updateUserBetInfo() {

    varCurrentUserBetAmount.textContent = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

    const userBetHorse = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    varCurrentUserBetHorse.textContent = userBetHorse;

    varCurrentUserBetHorse.classList.add('horse_color_' + userBetHorse);

}

// 显示全部玩家下注信息
function displayBettingInfo() {

    const varTotalBetPlayer = document.querySelector(".var_total_bet_player");
    const varTotalBetAmount = document.querySelector(".var_total_bet_amount");

    varTotalBetPlayer.textContent = readValueFromRecordInLocal(keyName_1_00, keyName_1_03_01);
    varTotalBetAmount.textContent = readValueFromRecordInLocal(keyName_1_00, keyName_1_03_02);

    const pool = readValueFromRecordInLocal(keyName_1_00, keyName_1_03);


    pool.forEach((horse, index) => {
        const varPlayerNumberBetIndexHorse = document.querySelector(`.var_player_bet_horse_${index + 1}`);
        const varBetAmountIndexHorse = document.querySelector(`.var_bet_amount_horse_${index + 1}`);
        varPlayerNumberBetIndexHorse.textContent = horse[keyName_1_03_01];
        varBetAmountIndexHorse.textContent = horse[keyName_1_03_02];

    })
}

function initPage() {

    if (isUserSelectdHorseAndBet()) {

        updateUserBetInfo();

        displayBettingInfo();
    }
}

// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行


initPage();

// 点击开始游戏按钮
btnStartGame.addEventListener("click", () => {

    if (isUserSelectdHorseAndBet()) {

        updateUserLuckyPointToLocal(-readValueFromRecordInLocal(keyName_1_00, keyName_1_02));

        writeValueToRecordInLocal(keyName_1_00, keyName_1_05, true);

        // 跳转到 racing
        window.location.href = "../racing";
    }

});



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end

