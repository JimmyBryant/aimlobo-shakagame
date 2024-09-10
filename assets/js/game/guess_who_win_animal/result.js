// 选择元素
const btnBonus = document.querySelector('.btn_bonus');
const popupUserBonusInfo = document.querySelector('.popup_user_bonus_info');
const popupUserBonusInfoBtnGetIt = popupUserBonusInfo.querySelector('.btn_get_it');
const popupUserBonusInfoNoWin = document.querySelector('.popup_user_bonus_info_no_win');
const popupUserBonusInfoNoWinBtnGetIt = popupUserBonusInfoNoWin.querySelector('.btn_get_it');
const varAddLuckyPoint = popupUserBonusInfo.querySelector('.var_add_lucky_point');


const userBetElement = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);
const userBetAmount = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);
const userPlayOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_03);
const userWinOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_05);
const winningElement = readValueFromRecordInLocal(keyName_1_00, keyName_1_07);


// 函数
// 函数
// 函数

// 用户是否直接跳转到这个页面
function isUserJumpToThisPage() {

    if (!userBetElement || !userBetAmount || !userPlayOrNot) {

        showPopupMissData();
        
        return false;
    }

    return true;
}


// 更新页面信息
function updatePageInfo() {

    const varUserBetElement = document.querySelector('.var_user_bet_element');
    const varUserBetAmount = document.querySelector('.var_user_bet_amount');
    const varWinningElement = document.querySelector('.var_winning_element');
    const varUserWinOrNot = document.querySelector('.var_user_win_or_not');

    varUserBetElement.textContent = userBetElement;
    varUserBetAmount.textContent = userBetAmount;
    varWinningElement.textContent = winningElement;

    if (userWinOrNot) {

        varUserWinOrNot.textContent = i18n('lottery_yes');

    } else {

        varUserWinOrNot.textContent = i18n('lottery_no');
    }

}

// 更新页面信息 -- 兑奖按钮 -- 点过了就不能在点，没点就可以点
function updateBtnBonusClickable() {

    const userBonusOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_04);

    if (userBetElement && userBetAmount && userPlayOrNot && !userBonusOrNot) {

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

        updatePageInfo();

        writeValueToRecordInLocal(keyName_1_00, keyName_1_06, DEFAULT_VALUE_TRUE);
        
    }
}


// 函数 -- end
// 函数 -- end
// 函数 -- end


// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

updateBtnBonusClickable();

initPage();



// 兑奖按钮
btnBonus.addEventListener('click', () => {

    if (updateBtnBonusClickable()) {

        if (userWinOrNot) {

            const addLuckyPoint = parseFloat((userBetAmount * bonusMultiple).toFixed(1));

            siteBgmWin.play();

            updateUserLuckyPointToLocal(parseFloat(addLuckyPoint * (1 - taxRate)).toFixed(1));

            varAddLuckyPoint.textContent = parseFloat(addLuckyPoint * (1 - taxRate)).toFixed(1);

            writeValueToRecordInLocal(keyName_1_00, keyName_1_04, DEFAULT_VALUE_TRUE);

            setDisplay(popupUserBonusInfo, displayTypes.flex);

            updateBtnBonusClickable();

        } else {

            siteBgmLose.play();

            writeValueToRecordInLocal(keyName_1_00, keyName_1_04, DEFAULT_VALUE_TRUE);

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