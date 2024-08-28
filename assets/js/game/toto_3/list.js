// 定义常量
const pageName = 'list';
const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');


// 函数
// 函数
// 函数
// 函数
// 函数



// 写入数据到html
// 写入数据到html -- 状态：结束 -- 5条记录
function writeDataToHtmlStop() {

    const parentHTML = document.querySelector('.game_stop');

    const data = readDataFromLocal(keyName_1_00);

    for (let i = 0; i < (recordCount - 2); i++) {

        const roundNumberClass = `.var_round_number_index_${6 - i}`;
        const winNumberClass = `.var_round_win_number_index_${6 - i}`;

        const htmlVarRoundNumber = parentHTML.querySelector(roundNumberClass);

        const htmlVarWinNumber = parentHTML.querySelector(winNumberClass);

        if (data) {
    
            const record = data[6 - i];
            
            if (record) {

                // 填充轮次号码
                htmlVarRoundNumber.textContent = record[keyName_1_01];
                
                // 填充中奖号码
                const winNumberParts = splitNumberToParts(record[keyName_1_13], winningNumberParts);

                for (let j = 0; j < winningNumberParts; j++) {
                    const varWinNumberPartClass = `.var_win_number_part_${j + 1}`;
                    const varWinNumberPart = htmlVarWinNumber.querySelector(varWinNumberPartClass);
                    if (varWinNumberPart) {
                        varWinNumberPart.textContent = winNumberParts[j];
                    }
                }
            }
        }
    }
}

// 写入数据到html -- 状态：开奖中
function writeDataToHtmlBonus() {

    const parentHTML = document.querySelector('.game_bonus');

    const data = readDataFromLocal(keyName_1_00);

    const htmlVarRoundNumber = parentHTML.querySelector(`.var_round_number_index_1`);

    const htmlVarWinNumber = parentHTML.querySelector(`.var_round_win_number_index_1`);

    if (data) {

        const record = data[1];
        
        if (record) {

            // 填充轮次号码
            htmlVarRoundNumber.textContent = record[keyName_1_01];
            
            // 填充中奖号码
            const winNumberParts = splitNumberToParts(record[keyName_1_13], winningNumberParts);

            for (let i = 0; i < winningNumberParts; i++) {
                const varWinNumberPartClass = `.var_win_number_part_${i + 1}`;
                const varWinNumberPart = htmlVarWinNumber.querySelector(varWinNumberPartClass);
                if (varWinNumberPart) {
                    varWinNumberPart.textContent = winNumberParts[i];
                }
            }
        }
    }
        
    
}

// 写入数据到html -- 开盘或封盘
function writeDataToHtmlBet() {

    const parentHTML = document.querySelector('.game_bet');

    const data = readDataFromLocal(keyName_1_00);

    const htmlVarRoundNumber = parentHTML.querySelector(`.var_round_number_index_0`);

    const htmlVarStatus = parentHTML.querySelector(`.var_round_status_index_0`);

    if (data) {

        const record = data[0];
        
        if (record) {

            // 填充轮次号码
            htmlVarRoundNumber.textContent = record[keyName_1_01];

            // 填充轮次状态
            htmlVarStatus.textContent = i18n(record[keyName_1_06]);
        }
    }
}

// 更新本地记录 -- 第一条记录的状态 -- index = 0, from status: open to status: close
function updateRoundBetStatusInLocal() {
    updateIndexRoundStatusInLocal(0);
}


// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end



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





// 进入页面先做这些：

// 页面更新 -- 更新页面上的倒计时
updatePageRoundCountDown();




/*
按照频次更新：
1. 间隔时间为下一轮刚好产生的时候： 逻辑是算出当前时间和当前轮次的开奖开始时间之间的间隔，这样到点就会产生下一轮
2. 更新的内容有：
2.1 更新本地的全部记录；
2.2 写入对应的记录到相应的html模块
*/
executeEvery(intervalTimeToUpdateAllRound(), updateRoundRecordInLocal, writeDataToHtmlStop, writeDataToHtmlBonus, writeDataToHtmlBet);


/*
按照频次更新：
1. 间隔时间为本轮下注停止的时候： 逻辑是算出当前时间和当前轮次的下注停止时间之间的间隔，这样到点就会更新本轮的状态（open --> close)
2. 更新的内容有：
2.1 本地记录中 index = 0 的状态(close)；
2.2 写入对应的记录到相应的html模块
*/
executeEvery(intervalTimeToUpdateRoundBetStatus(), updateRoundBetStatusInLocal, writeDataToHtmlBet);


/*
按照频次更新：
1. 每秒更新一次倒计时；
*/

executeEvery(1, updatePageRoundCountDown);



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end