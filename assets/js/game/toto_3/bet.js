// 选取元素
const userBetArea = document.querySelector('.user_bet_area');
const formBet = document.querySelector('.form_bet');
const popupUserBetInfo = document.querySelector('.popup_user_bet_info');
const popupUserBetInfoBtnGetIt = popupUserBetInfo.querySelector('.btn_get_it');
const varCurrentRoundNumberInPopupUserBetInfo = popupUserBetInfo.querySelector('.var_current_round_number');
const popupGoToPageBonus = document.querySelector('.popup_go_to_page_bonus');
const popupGoToPageBonusBtnGetIt = popupGoToPageBonus.querySelector('.btn_get_it');

// 用来记录页面上用户是显示还是隐藏所有提示
const pageName = 'bet';
const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

// 函数

// 更新本地记录 -- 用户下注后 -- 更新用户本轮已经参与下注，本轮参与玩家 + 1
function updateRoundBetUserBetStatusAndTotalPlayerNumberInLocal() {

    const recordBet = readIndexRecordFromLocal(keyName_1_00, 0);

    recordBet[keyName_1_14] = true;

    recordBet[keyName_1_07] = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_07) + 1;

    writeIndexRecordToLocal(keyName_1_00, 0, recordBet);

}

// 更新本地记录 -- 用户下注后 -- 更新用户本轮下注记录 ，玩家总下注注数和总下注金额 -- 参数代表：用户下注的号码，下注的注数，下注的金额
function updateRoundBetUserBetRecordAndTotalPlayerBetMultipleAndTotalPlayerBetAmountInLocal(userBetNumber, userBetMultiple, userBetAmount) {

    const record = readIndexRecordFromLocal(keyName_1_00, 0);

    const userBetRecords = record[keyName_1_15];

    // 添加新的下注记录
    userBetRecords.push({
        [keyName_1_15_01]: userBetNumber,
        [keyName_1_15_02]: userBetMultiple,
        [keyName_1_15_03]: userBetAmount
    });

    record[keyName_1_08] = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_08) + userBetMultiple;
    record[keyName_1_09] = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_09) + userBetAmount;

    writeIndexRecordToLocal(keyName_1_00, 0, record);

}

// 更新页面信息 -- 轮次号码信息 -- index = 0
function updatePageRoundBetNumber() {
    updatePageRoundNumber(0);
}

// 更新页面信息 -- 轮次状态信息 -- index = 0
function updatePageRoundBetStatus() {
    updateIndexRoundStatusInLocal(0);
    updatePageRoundStatus(0);
}

// 更新页面信息 -- form bet 的背景颜色 -- 可以下注是紫色(open)，不可下注是灰色(close)
function updateFormBetBgColor() {

    const roundStatus = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_06);

    if (roundStatus === statusOpen) {

        userBetArea.classList.add('bg-color-04');

    } else {

        userBetArea.classList.remove('bg-color-04');
    }
}

// 更新页面信息 -- 封盘的时候弹出提示用户不可下注，可以前往兑奖页面
function showPopupGoToPageBonus() {

    const roundStatus = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_06);

    const userBetOrNot = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_14);

    const pageBetTipGoToBonus = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_19);

    if (!pageBetTipGoToBonus && userBetOrNot && roundStatus === statusClose) {

        displayFlex(popupGoToPageBonus);

        writeValueToIndexRecordInLocal(keyName_1_00, 0, keyName_1_19, true);

    }


}
 
// 更新页面信息 -- 用户下注记录 -- index = 0
function updatePageRoundBetUserBetrecords() {
    updatePageRoundUserBetRecords(0);
}




// 表单：下注
formBet.addEventListener("submit", (event) => {

    event.preventDefault();

    const currentUserBetNumberInPageBet = parseInt(document.querySelector('input[name="bet_number"]').value);
    const currentUserBetMultipleInPageBet = parseInt(document.querySelector('input[name="bet_multiple"]').value);

    if (currentUserBetNumberInPageBet >= winningNumberLowest && currentUserBetNumberInPageBet <= winningNumberHighest) {

        const betCost = singleBetCost * currentUserBetMultipleInPageBet;
        const totalLuckyPoint = parseInt(readFromLocalStorage('total_lucky_point'));

        // 积分不足
        if (betCost > totalLuckyPoint) {

            const notEnoughLuckyPoint = document.querySelector('.not_enough_lucky_point');
            notEnoughLuckyPoint.click();
            formBet.reset();

        } else {

            // 轮次状态: Open
            const roundStatus = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_06);           

            if (roundStatus === statusOpen) {

                bgmSelect.play();

                // 本地扣除积分, 写入事件, 更新扣减后的积分到页面 ;
                updateTotalLuckyPoint(-betCost);

                const logName = `${keyName_1_00} cost`;

                writeEventLogLuckyPoint(logName, -betCost);

                updatePageTotalLuckyPoint();

                if (readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_14) === false) {
                    
                    // 更新本地记录 -- 游戏次数， 游戏记录；
                    // 参与一轮算一次游戏次数；
                    // 判断方法就是：读取用户本轮是否参与,如果是false（默认值）,那么就增加一次;
                    updateGameTime(1);
                    writeEventLogGameTime(keyName_1_00, 1);

                    // 更新本地记录 -- 用户本轮已经参与下注，本轮参与玩家 + 1
                    updateRoundBetUserBetStatusAndTotalPlayerNumberInLocal();
                } 

                
                // 更新本地记录 -- 用户下注后 -- 更新用户本轮下注记录 ，玩家总下注注数和总下注金额 -- 参数代表：用户下注的号码，下注的注数，下注的金额
                updateRoundBetUserBetRecordAndTotalPlayerBetMultipleAndTotalPlayerBetAmountInLocal(currentUserBetNumberInPageBet, currentUserBetMultipleInPageBet, betCost);

                // 更新页面信息 -- 页面上的本轮用户投注记录
                updatePageRoundBetUserBetrecords();

                // 更新popup的内容

                // 更新popup的内容 -- 轮次号码
                varCurrentRoundNumberInPopupUserBetInfo.textContent = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_01);

                // 更新popup的内容 -- 用户下注的号码
                const currentUserBetNumberInPageBetParts = splitNumberToParts(currentUserBetNumberInPageBet, winningNumberParts);
                currentUserBetNumberInPageBetParts.forEach((part, index) => {
                    popupUserBetInfo.querySelector(`.var_current_user_bet_number_${index + 1}`).textContent = part;
                });

                // 更新popup的内容 -- 用户下注的注数
                popupUserBetInfo.querySelector('.var_current_user_bet_multiple').textContent = currentUserBetMultipleInPageBet;

                // 显示用户下注花费的总金额
                popupUserBetInfo.querySelector('.var_current_user_bet_amount').textContent = betCost;

                // 显示popup 用户本次下注信息
                displayFlex(popupUserBetInfo);

                formBet.reset();

                bgmSelect.stop();

            } else {

                // 提示封盘，不可下注
                const betStop = document.querySelector('.bet_stop');
                betStop.click();
                formBet.reset();

            }   
        }
    } 
});

formBet.addEventListener('reset', () => {
    bgmSelect.play();
    formBet.reset();
    bgmSelect.stop();
});

// 点击 popup_user_bet_info 的 btn_get_it
popupUserBetInfoBtnGetIt.addEventListener('click', (event) => {
    hide(popupUserBetInfo);
    event.stopPropagation(); // 阻止事件冒泡
}); 

// 点击 popup_go_to_page_bonus 的 btn_get_it
popupGoToPageBonusBtnGetIt.addEventListener('click', (event) => {
    hide(popupGoToPageBonus);
    event.stopPropagation(); // 阻止事件冒泡
}); 


// 更新用户的配置：显示还是隐藏所有提示 -- 并进行更新
checkbox.addEventListener('change', function() {
    updatePageConfigToLocalHideOrShowAllTipsInCurrentPage(pageName);
    updatePageConfigInPageHideOrShowAllTipsInCurrentPage(pageName);
});


 

// 进入页面先做这些：

// 页面更新 -- 更新页面上的轮次号码
updatePageRoundBetNumber();

// 页面更新 -- 更新页面上的轮次状态
updatePageRoundBetStatus();

// 页面更新 -- 更新页面上的下一轮轮更新倒计时
updatePageRoundCountDown();

// 页面更新 -- 更新页面上的可用积分，
updatePageTotalLuckyPoint(); 

// 页面更新 -- 更新页面上的投注记录
updatePageRoundBetUserBetrecords();

// 弹窗提示 -- 可点击关闭
aimloboClickHideInPageTips(); 

// 初始化用户的配置：显示还是隐藏所有提示
initPageConfigValueToLocalHideOrShowAllTipsInCurrentPage(pageName);
updatePageConfigInPageHideOrShowAllTipsInCurrentPage(pageName);

/*
按照频次更新：
1. 间隔时间为本轮下注停止的时候： 逻辑是算出当前时间和当前轮次的下注停止时间之间的间隔，这样到点就会更新本轮的状态（open --> close)
2. 更新的内容有：
2.1 index = 0 的状态(close)；
2.2 写入对应的记录到相应的html模块
--- 这里把 2.1, 2.2 写到了一起
2.3 更新下注区域的背景颜色
2.4 弹出提示 -- 封盘时间用户可以前往兑奖页面
*/
executeEvery(intervalTimeToUpdateRoundBetStatus(), updatePageRoundBetStatus, updateFormBetBgColor, showPopupGoToPageBonus);


/*
按照频次更新：
1. 间隔时间为下一轮刚好产生的时候： 逻辑是算出当前时间和当前轮次的开奖开始时间之间的间隔，这样到点就会产生下一轮
2. 更新的内容有：
2.1 更新本地的全部记录；
2.2 写入对应的记录到相应的html模块 -- 轮次号码, 下注记录
*/
executeEvery(intervalTimeToUpdateAllRound(), updateRoundRecordInLocal, updatePageRoundBetNumber, updatePageRoundBetUserBetrecords);


/*
按照频次更新：
1. 每秒更新一次倒计时；
*/

executeEvery(1, updatePageRoundCountDown);







