// 选取元素
const formBet = document.querySelector('.form_bet');
const popupUserBetInfo = document.querySelector('.popup_user_bet_info');
const popupUserBetInfoBtnGetIt = popupUserBetInfo.querySelector('.btn_get_it');
const varCurrentRoundNumberInPopupUserBetInfo = popupUserBetInfo.querySelector('.var_current_round_number');


// 更新页面上轮次信息 --0
updatePageRoundInfo(0);

// 每秒钟更新一次轮次信息 -- 目的是反馈本轮的状态
executeEvery(1, updatePageRoundInfo(0));

// 更新页面上的可用积分，
updatePageTotalLuckyPoint(); 

// 更新显示用户下注历史记录
updatePageUserBetRecords(0);


// 表单：下注
formBet.addEventListener("submit", (event) => {
    event.preventDefault();
    const currentUserBetNumber = parseInt(document.querySelector('input[name="bet_number"]').value);
    const currentUserBetMultiple = parseInt(document.querySelector('input[name="bet_multiple"]').value);

    // 有有效值的情况下 -- 也就是用户有输入下注的号码
    if (currentUserBetNumber) {
        const betCost = singleBetCost * currentUserBetMultiple;
        const totalLuckyPoint = parseInt(readFromLocalStorage('total_lucky_point'));

        if (betCost > totalLuckyPoint) {
            // 积分不足的情况下：提示用户，重置表单，不允许进一步游戏
            const notEnoughLuckyPoint = document.querySelector('.not_enough_lucky_point');
            notEnoughLuckyPoint.click();
            formBet.reset();
        } else {

            // 检测提交的时间是否在运行下注的时间范围内，不然的话就是封盘了不允许下注
            const currentTime = getCurrentTimeInISO();
            const betBeginTime = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_2);
            const betCloseTime = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_3);

           

            if (betBeginTime <= currentTime && currentTime < betCloseTime) {

                // 允许下注，继续游戏

                // bgmSelect.play();

                // 扣除下注使用的幸运积分;
                updateTotalLuckyPoint(-betCost);

                writeEventLogLuckyPoint('game_lottery_3 cost', -betCost);

                // 更新页面上的可用积分，
                updatePageTotalLuckyPoint();

                // 更新游戏次数：参与一轮算一次游戏次数，判断方法就是：用户是否参与,如果是false,那么就增加一次，如果是true，那么就不增加。

                if (readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_14) === false) {
                    
                    updateGameTime(1);
                    writeEventLogGameTime(keyNameLevel_1_1, 1);
                } 
                


                // 将数据写入到本地 --> 用户是否参与（true),用户下注记录；

                // 用户是否参与
                writeValueToOneRecordToLocalStorageJson(0, keyNameLevel_2_3_14, true);

                

                // todo 用户下注记录：下注的号码，下注的注数，下注的金额（注意每次写入都是新增，原来的记录要保留）
                // 处理用户下注记录
                // 获取现有的下注记录
                const userBetRecords = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_15) || [];

                // 添加新的下注记录
                userBetRecords.push({
                    [keyNameLevel_2_3_15_1]: currentUserBetNumber,
                    [keyNameLevel_2_3_15_2]: currentUserBetMultiple,
                    [keyNameLevel_2_3_15_3]: betCost
                });

                // 更新本地存储中的下注记录
                writeValueToOneRecordToLocalStorageJson(0, keyNameLevel_2_3_15, userBetRecords);


                // 显示本轮轮次
                varCurrentRoundNumberInPopupUserBetInfo.innerText = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_1);

                // 显示用户下注的号码
                const currentUserBetNumberParts = splitNumberToParts(currentUserBetNumber, 3);
                currentUserBetNumberParts.forEach((part, index) => {
                    document.querySelector(`.var_current_user_bet_number_${index + 1}`).innerText = part;
                });

                // 显示用户下注的倍数
                document.querySelector('.var_current_user_bet_multiple').innerText = currentUserBetMultiple;

                // 显示用户下注花费的总金额
                document.querySelector('.var_current_user_bet_amount').innerText = betCost;

                // 显示popup 用户本次下注信息
                displayFlex(popupUserBetInfo);

                formBet.reset();

                



                // 更新显示用户下注历史记录
                updatePageUserBetRecords(0);

                // 可以选择弹出信息或进行其他处理
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
    // bgmSelect.play();
    formBet.reset();
    // bgmSelect.stop();
});

// 点击 popup_user_bet_info 的 btn_get_it
popupUserBetInfoBtnGetIt.addEventListener('click', (event) => {
    hide(popupUserBetInfo);
    event.stopPropagation(); // 阻止事件冒泡
}); 







