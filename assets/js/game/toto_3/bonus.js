// 选择元素
const btnBonus = document.querySelector('.btn_bonus');
const popupUserBonusInfo = document.querySelector('.popup_user_bonus_info');
const popupUserBonusInfoBtnGetIt = popupUserBonusInfo.querySelector('.btn_get_it');
const popupUserBonusInfoNoWin = document.querySelector('.popup_user_bonus_info_no_win');
const popupUserBonusInfoNoWinBtnGetIt = popupUserBonusInfoNoWin.querySelector('.btn_get_it');
const varAddLuckyPoint = popupUserBonusInfo.querySelector('.var_add_lucky_point');


// 更新页面信息 -- 轮次号码信息 -- index = 1
function updatePageRoundBonusNumber() {
    updatePageRoundNumber(1);
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

function updateBtnBonusClickable2() {

    const userWinOrNot = readValueFromIndexRecordInLocal(keyName_1_00, 1, keyName_1_16);

    const userClickedBtnBonus = readValueFromIndexRecordInLocal(keyName_1_00, 1, keyName_1_18);

    if (userWinOrNot && !userClickedBtnBonus) {
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
    hide(popupUserBonusInfo);
    event.stopPropagation(); // 阻止事件冒泡
}); 


// 点击 popupUserBonusInfoNoWin 的 btn_get_it
popupUserBonusInfoNoWinBtnGetIt.addEventListener('click', (event) => {
    hide(popupUserBonusInfoNoWin);
    event.stopPropagation(); // 阻止事件冒泡
}); 

// 兑奖按钮
btnBonus.addEventListener('click', () => {

    if (updateBtnBonusClickable()) {

        const winRecord = readValueFromIndexRecordInLocal(keyName_1_00, 1, keyName_1_17);

        if (winRecord) {

            const addLuckyPoint = winRecord[keyName_1_15_06];

            if (addLuckyPoint) {

                bgmWin.play();

                updateTotalLuckyPoint(addLuckyPoint * 0.97);
                writeEventLogLuckyPoint(`${keyName_1_00} bonus`, addLuckyPoint * 0.97);

                writeValueToIndexRecordInLocal(keyName_1_00, 1, keyName_1_18, true);

                varAddLuckyPoint.textContent = addLuckyPoint * 0.97;

                displayFlex(popupUserBonusInfo);

                updateBtnBonusClickable();

                bgmWin.stop();

            } else {

                


                // console.log('ERR: no record found in ', `${keyName_1_15_06}`);
            }

        } else {

            bgmLose.play();

            writeValueToIndexRecordInLocal(keyName_1_00, 1, keyName_1_18, true);

            displayFlex(popupUserBonusInfoNoWin);

            updateBtnBonusClickable();

            bgmLose.stop();

            // console.log('ERR: no record found in ', `${keyName_1_17}`);
        }
        
    }
    





});


// 进入页面先做这些：

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