// 选择元素
const btnBonus = document.querySelector('.btn_bonus');
const popupUserBonusInfo = document.querySelector('.popup_user_bonus_info');
const popupUserBonusInfoBtnGetIt = popupUserBonusInfo.querySelector('.btn_get_it');
const popupUserBonusInfoNoWin = document.querySelector('.popup_user_bonus_info_no_win');
const popupUserBonusInfoNoWinBtnGetIt = popupUserBonusInfoNoWin.querySelector('.btn_get_it');
const varAddLuckyPoint = popupUserBonusInfo.querySelector('.var_add_lucky_point');

// 用来记录页面上用户是显示还是隐藏所有提示
const pageName = 'bonus';
const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

// 更新页面信息 -- 轮次号码信息 -- index = 1 & index = 0
function updatePageRoundBonusNumber() {
    updatePageRoundNumber(1);
    updatePageRoundNumber(0);
}

// 更新页面信息 -- 中奖号码 -- index = 1
function updatePageRoundBonusWinNumber() {
    updatePageRoundWinNumber(1);
}


// 更新页面信息 -- 所有玩家参与和中奖 -- index = 1
function updatePageRoundBonusPlayerBetAndWinnerInfo() {
    updatePageRoundPlayerBetAndWinnerInfo(1);
}


// 更新页面信息 -- 用户参与和中奖 -- index = 1
function updatePageRoundBonusUserBetAndWinnerInfo() {
    updatePageRoundUserBetAndWinnerInfo(1);
}


// 更新页面信息 -- 用户下注记录 -- index = 1
function updatePageRoundBonusUserBetRecords() {
    updatePageRoundUserBetRecords(1);
}

// 更新页面信息 -- 兑奖按钮 -- 点过了就不能在点，没点就可以点
function updateBtnBonusClickable() {

    const userBetOrNot = readValueFromIndexRecordInLocal(keyName_1_00, 1, keyName_1_14);

    const userClickedBtnBonus = readValueFromIndexRecordInLocal(keyName_1_00, 1, keyName_1_18);

    if (userBetOrNot && !userClickedBtnBonus) {
        btnBonus.disabled = false;
        btnBonus.classList.remove('disabled');
        return true;
    } else {
        btnBonus.disabled = true;
        btnBonus.classList.add('disabled');
        return false;
    }
}



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

// 兑奖按钮
btnBonus.addEventListener('click', () => {

    if (updateBtnBonusClickable()) {

        const winRecord = readValueFromIndexRecordInLocal(keyName_1_00, 1, keyName_1_17);

        if (winRecord) {

            const addLuckyPoint = winRecord[keyName_1_15_06];

            if (addLuckyPoint) {

                siteBgmWin.play();

                updateUserLuckyPointToLocal(addLuckyPoint * (1 - taxRate));

                writeValueToIndexRecordInLocal(keyName_1_00, 1, keyName_1_18, true);

                varAddLuckyPoint.textContent = addLuckyPoint * (1 - taxRate);

                setDisplay(popupUserBonusInfo, displayTypes.flex);

                updateBtnBonusClickable();

                siteBgmWin.stop();

            } 
        } else {

            siteBgmLose.play();

            writeValueToIndexRecordInLocal(keyName_1_00, 1, keyName_1_18, true);

            setDisplay(popupUserBonusInfoNoWin, displayTypes.flex);

            updateBtnBonusClickable();

            siteBgmLose.stop();
        }  
    }
});





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


// 页面更新 -- 更新页面上的// 兑奖按钮
updateBtnBonusClickable();

// 页面信息 -- 下一轮更新时间倒计时
updatePageRoundCountDown();


/*
按照频次更新：
1. 间隔时间为下一轮刚好产生的时候： 逻辑是算出当前时间和当前轮次的开奖开始时间之间的间隔，这样到点就会产生下一轮
2. 更新的内容有：
2.1 更新本地的全部记录；
2.2 写入对应的记录到相应的html模块 -- 
*/
executeEvery(intervalTimeToUpdateAllRound(), updateRoundRecordInLocal, updatePageRoundBonusNumber, updatePageRoundBonusWinNumber, updatePageRoundBonusPlayerBetAndWinnerInfo, updatePageRoundBonusUserBetAndWinnerInfo, updatePageRoundBonusUserBetRecords, updateBtnBonusClickable);


/*
按照频次更新：
1. 每秒更新一次倒计时；
*/

executeEvery(1, updatePageRoundCountDown);

// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end