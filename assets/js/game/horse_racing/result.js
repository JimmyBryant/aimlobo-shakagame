// 选择元素
const btnBonus = document.querySelector('.btn_bonus');
const popupUserBonusInfo = document.querySelector('.popup_user_bonus_info');
const popupUserBonusInfoBtnGetIt = popupUserBonusInfo.querySelector('.btn_get_it');
const popupUserBonusInfoNoWin = document.querySelector('.popup_user_bonus_info_no_win');
const popupUserBonusInfoNoWinBtnGetIt = popupUserBonusInfoNoWin.querySelector('.btn_get_it');
const varAddLuckyPoint = popupUserBonusInfo.querySelector('.var_add_lucky_point');


const userBetHorse = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);
const userBetAmount = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);
const winningHorse = readValueFromRecordInLocal(keyName_1_00, keyName_1_04);
const pool = readValueFromRecordInLocal(keyName_1_00, keyName_1_03);
const totalWinPlayer = pool[winningHorse - 1][keyName_1_03_01];
const totalWinPlayerBetAmount = pool[winningHorse - 1][keyName_1_03_02];
const totalWinAmount = readValueFromRecordInLocal(keyName_1_00, keyName_1_03_02);
const userRacingOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_06);
const userMatchOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_05);


// 函数
// 函数
// 函数

// 用户是否直接跳转到这个页面
function isUserJumpToThisPage() {


    if (!userBetHorse || !userBetAmount || !userMatchOrNot || !userRacingOrNot) {

        showPopupMissData();
        
        return false;
    }

    return true;
}


// 更新页面信息 -- 所有玩家和用户的信息
function updateWinningInfoInPage() {

    const varWinningHorse = document.querySelector('.var_winning_horse');

    const varTotalWinPlayer = document.querySelector('.var_total_win_player');

    const varTotalWinPlayerBetAmount = document.querySelector('.var_total_win_player_bet_amount');

    const varTotalWinAmount = document.querySelector('.var_total_win_amount');

    const varTotalBetPlayer = document.querySelector('.var_total_bet_player');

    const varUserBetHorse = document.querySelector('.var_user_bet_horse');

    const varUserBetAmount = document.querySelector('.var_user_bet_amount');

    

    varWinningHorse.textContent = winningHorse;

    varWinningHorse.classList.add('horse_color_' + winningHorse);

    

    varTotalWinPlayer.textContent = totalWinPlayer;

    varTotalWinPlayerBetAmount.textContent = totalWinPlayerBetAmount;

    varTotalWinAmount.textContent = totalWinAmount;

    varTotalBetPlayer.textContent = readValueFromRecordInLocal(keyName_1_00, keyName_1_03_01);

    

    varUserBetHorse.textContent = userBetHorse;

    varUserBetHorse.classList.add('horse_color_' + userBetHorse);

    varUserBetAmount.textContent = userBetAmount;
}

// 更新页面信息 -- 兑奖按钮 -- 点过了就不能在点，没点就可以点
function updateBtnBonusClickable() {

    const userBonusOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_07);

    if (userBetHorse && userBetAmount && userMatchOrNot && userRacingOrNot && !userBonusOrNot) {

        btnBonus.disabled = false;

        btnBonus.classList.remove('disabled');

        return true;
    } else {
        btnBonus.disabled = true;

        btnBonus.classList.add('disabled');
        
        return false;
    }

}

function initPage() {

    if (isUserJumpToThisPage()) {

        updateWinningInfoInPage();

        writeValueToRecordInLocal(keyName_1_00, keyName_1_09, true);
        
    }
}



// 函数
// 函数
// 函数





// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

updateBtnBonusClickable();

initPage();



// 兑奖按钮
btnBonus.addEventListener('click', () => {

    if (updateBtnBonusClickable()) {

        const userWinOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_08);

        if (userWinOrNot) {

            const addLuckyPoint = parseFloat((userBetAmount / totalWinPlayerBetAmount * totalWinAmount).toFixed(1));


            siteBgmWin.play();

            updateUserLuckyPointToLocal(parseFloat(addLuckyPoint * (1 - taxRate)).toFixed(1));

            varAddLuckyPoint.textContent = parseFloat(addLuckyPoint * (1 - taxRate)).toFixed(1);

            writeValueToRecordInLocal(keyName_1_00, keyName_1_07, DEFAULT_VALUE_TRUE);

            setDisplay(popupUserBonusInfo, displayTypes.flex);

            updateBtnBonusClickable();

        } else {

            siteBgmLose.play();

            writeValueToRecordInLocal(keyName_1_00, keyName_1_07, DEFAULT_VALUE_TRUE);

            setDisplay(popupUserBonusInfoNoWin, displayTypes.flex);

            updateBtnBonusClickable();
        }

        updateUserGameTimeToLocal(1);
        
    }
    
});




// 点击 popupUserBonusInfo 的 btn_get_it
popupUserBonusInfoBtnGetIt.addEventListener('click', (event) => {

    setDisplay(popupUserBonusInfo, displayTypes.none);

    event.stopPropagation(); // 阻止事件冒泡
}); 


// 点击 popupUserBonusInfoNoWin 的 btn_get_it
popupUserBonusInfoNoWinBtnGetIt.addEventListener('click', (event) => {

    setDisplay(popupUserBonusInfoNoWin, displayTypes.none);

    event.stopPropagation(); // 阻止事件冒泡
}); 



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end