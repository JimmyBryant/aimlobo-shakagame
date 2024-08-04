// 选取元素


// 参数变量，写入local

// 一级名称
// const keyNameLevel_1_1 = 'game_lottery_3';

// 二级名称，用来记录本轮的信息：轮次，下注开始时间，下注停止时间，开奖开始时间，开奖停止时间，状态，参与玩家总数，下注总注数，下注总金额;
// const keyNameLevel_2_1 = 'current_round_info'; 

// 三级名称，属于该二级名称下
// const keyNameLevel_2_1_1 = 'this_round_number';
// const keyNameLevel_2_1_2 = 'this_round_bet_begin_time';
// const keyNameLevel_2_1_3 = 'this_round_bet_close_time';
// const keyNameLevel_2_1_4 = 'this_round_bonus_begin_time';
// const keyNameLevel_2_1_5 = 'this_round_bonus_close_time';
// const keyNameLevel_2_1_6 = 'this_round_status';
// const keyNameLevel_2_1_7 = 'this_round_total_bet_player';
// const keyNameLevel_2_1_8 = 'this_round_total_bet_multiple';
// const keyNameLevel_2_1_9 = 'this_round_total_bet_amount';

// 二级名称，用来记录当前用户的信息：参与下注的轮次，该轮次对应的下注记录;
// 只保留2轮的记录，一个是上轮记录，用来记录在上一轮的下注情况，后期用来做用户兑奖用；一个是本轮记录，用来记录用户在本轮的下注情况: 下注号码，下注注数，下注金额
// const keyNameLevel_2_2 = 'current_user_info'; 

// 三级名称，属于该二级名称下
// const keyNameLevel_2_2_1 = 'last_round_info';

// const keyNameLevel_2_2_1_1 = 'this_round_number';
// const keyNameLevel_2_2_1_2 = 'current_user_play_or_not';
// const keyNameLevel_2_2_1_3 = 'current_user_record';

// const keyNameLevel_2_2_1_3_1 = 'current_user_bet_number';
// const keyNameLevel_2_2_1_3_2 = 'current_user_bet_multiple';
// const keyNameLevel_2_2_1_3_3 = 'current_user_bet_amount';

// const keyNameLevel_2_2_2 = 'current_round_info';

// const keyNameLevel_2_2_2_3_1 = 'current_user_bet_number';
// const keyNameLevel_2_2_2_3_2 = 'current_user_bet_multiple';
// const keyNameLevel_2_2_2_3_3 = 'current_user_bet_amount';

// 这里的当前用户信息记录分几种情况；
// 1. 用户上一轮没有参与，那么last_round_info的值就应该记录：上期轮次，用户是否参与（false)；
// 2. 用户上一轮有参与，那么记录应该来自于上一轮的当期，也就是第4，5点；
// ['this_round_number', 'current_user_play_or_not', 'current_user_record']

// 3. 用户本轮如果没有参与，那么current_round_info的值就应该记录：本期轮次，用户是否参与（false)；
// 4. 用户本轮参与了，那么就应该记录如下数据： 本期轮次，用户是否参与(true)，参与的记录（一个列表，用来记录用户在本期的每次投注记录，每次记录的具体内容包括：下注号码，下注倍数，下注金额;
// ['this_round_number', 'current_user_play_or_not', 'current_user_record']
// 这里的current_user_record下边应该记录的内容（每一条记录）：['this_round_number', 'this_round_bet_multiple','this_round_bet_amount']

// 5. 本轮开奖后，用户的本轮记录(current_round_info)就应该更新到上一轮(last_round_info)中去；然后产生新的本轮（也就是下一期）

// 二级名称，用来记录最近5期的情况，每期的记录包括：轮次，下注开始时间，下注停止时间，开奖开始时间，开奖停止时间，状态，参与玩家总数，下注总注数，下注总金额，中奖人数，中奖注数，中奖金额，中奖号码，用户是否参与，参与记录，用户是否中奖，用户中奖记录;
// const keyNameLevel_2_3 = 'past_record';

// const keyNameLevel_2_3_1 = 'this_round_number';
// const keyNameLevel_2_3_2 = 'this_round_bet_begin_time';
// const keyNameLevel_2_3_3 = 'this_round_bet_close_time';
// const keyNameLevel_2_3_4 = 'this_round_bonus_begin_time';
// const keyNameLevel_2_3_5 = 'this_round_bonus_close_time';
// const keyNameLevel_2_3_6 = 'this_round_status';
// const keyNameLevel_2_3_7 = 'this_round_total_bet_player';
// const keyNameLevel_2_3_8 = 'this_round_total_bet_multiple';
// const keyNameLevel_2_3_9 = 'this_round_total_bet_amount';
// const keyNameLevel_2_3_10 = 'this_round_total_win_player';
// const keyNameLevel_2_3_11 = 'this_round_total_win_multiple';
// const keyNameLevel_2_3_12 = 'this_round_total_win_amount';
// const keyNameLevel_2_3_13 = 'this_round_win_number';
// const keyNameLevel_2_3_14 = 'this_round_user_bet_or_not';
// const keyNameLevel_2_3_15 = 'this_round_user_bet_record';
// const keyNameLevel_2_3_16 = 'this_round_user_win_or_not';
// const keyNameLevel_2_3_17 = 'this_round_user_win_record';





// 示例：写入和更新数据

// 生成当前轮次相关数据

// const betBeginTime = generateBetBeginTime(generateRoundNumber(0));
// const betCloseTime = generateBetCloseTime(betBeginTime);
// const bonusBeginTime = generateBonusBeginTime(betBeginTime);
// const bonusCloseTime = generateBonusCloseTime(betBeginTime);



// 当前轮次信息 -- 要写进去本地的数据
// const currentRoundInfo = {
//     [keyNameLevel_2_1_1]: generateRoundNumber(0),
//     [keyNameLevel_2_1_2]: generateBetBeginTime(generateRoundNumber(0)),
//     [keyNameLevel_2_1_3]: generateBetCloseTime(generateBetBeginTime(generateRoundNumber(0))),
//     [keyNameLevel_2_1_4]: generateBonusBeginTime(generateBetBeginTime(generateRoundNumber(0))),
//     [keyNameLevel_2_1_5]: generateBonusCloseTime(generateBetBeginTime(generateRoundNumber(0))),
//     [keyNameLevel_2_1_6]: 'open', // 示例状态
//     [keyNameLevel_2_1_7]: 0,
//     [keyNameLevel_2_1_8]: 0,
//     [keyNameLevel_2_1_9]: 0
// };









// 初始化并写入数据




// 初始化并写入数据 -- 当前轮次信息
// updateNestedLocalStorageData(keyNameLevel_1_1, keyNameLevel_2_1, currentRoundInfo);

// 初始化并写入数据 -- 历史记录，5条




// 写入数据到html
// 写入数据到html -- 结束 -- 传递的参数是和html要展示的数量有关

function writeDataToHtmlClose() {

    // 获取元素
    const htmlGameClose = document.querySelector('.game_close');

    // 重要 -- 这里的5需要手动变更
    for (let i = 0; i < 5; i++) {

        const roundNumberClass = `.var_round_number_${6 - i}`;
        const winNumberClass = `.var_win_number_${6 - i}`;

        const htmlVarRoundNumber = htmlGameClose.querySelector(roundNumberClass);

        const htmlVarWinNumber = htmlGameClose.querySelector(winNumberClass);

        const htmlVarWinNumber1 = htmlVarWinNumber.querySelector('.var_win_number_part_1');
        const htmlVarWinNumber2 = htmlVarWinNumber.querySelector('.var_win_number_part_2');
        const htmlVarWinNumber3 = htmlVarWinNumber.querySelector('.var_win_number_part_3');
    
        // 获取local storage中的数据
        const gameData = readFromLocalStorageJson(keyNameLevel_1_1);
    
        // 如果有数据，处理past_record
        if (gameData && gameData[keyNameLevel_2_3]) {
            // 找到状态为bonus的记录
            // const bonusRecord = gameData[keyNameLevel_2_3].find(record => record[keyNameLevel_2_3_6] === 'bonus');
    
            const bonusRecord = gameData[keyNameLevel_2_3][i+2];
            
            // 如果找到记录
            if (bonusRecord) {
                // 填充轮次号码
                htmlVarRoundNumber.textContent = bonusRecord[keyNameLevel_2_3_1];
                
                // 填充中奖号码
                const winNumberParts = splitNumberToParts(bonusRecord[keyNameLevel_2_3_13], 3);
                htmlVarWinNumber1.textContent = winNumberParts[0];
                htmlVarWinNumber2.textContent = winNumberParts[1];
                htmlVarWinNumber3.textContent = winNumberParts[2];
                
                // 填充状态
                // document.querySelector('.var_status').textContent = bonusRecord.this_round_status;
            }
        }
    }
    

}

// 写入数据到html -- 开奖中

function writeDataToHtmlBonus() {

    // 获取元素
    const htmlGameBonus = document.querySelector('.game_bonus');

    const htmlVarRoundNumber = htmlGameBonus.querySelector('.var_round_number');
    const htmlVarWinNumber1 = htmlGameBonus.querySelector('.var_win_number_part_1');
    const htmlVarWinNumber2 = htmlGameBonus.querySelector('.var_win_number_part_2');
    const htmlVarWinNumber3 = htmlGameBonus.querySelector('.var_win_number_part_3');

    // 获取local storage中的数据
    const gameData = readFromLocalStorageJson(keyNameLevel_1_1);

    // 如果有数据，处理past_record
    if (gameData && gameData[keyNameLevel_2_3]) {
        // 找到状态为bonus的记录
        // const bonusRecord = gameData[keyNameLevel_2_3].find(record => record[keyNameLevel_2_3_6] === 'bonus');

        const bonusRecord = gameData[keyNameLevel_2_3][1];
        
        // 如果找到状态为bonus的记录
        if (bonusRecord) {
            // 填充轮次号码
            htmlVarRoundNumber.textContent = bonusRecord[keyNameLevel_2_3_1];
            
            // 填充中奖号码
            const winNumberParts = splitNumberToParts(bonusRecord[keyNameLevel_2_3_13], 3);
            htmlVarWinNumber1.textContent = winNumberParts[0];
            htmlVarWinNumber2.textContent = winNumberParts[1];
            htmlVarWinNumber3.textContent = winNumberParts[2];
            
            // 填充状态
            // document.querySelector('.var_status').textContent = bonusRecord.this_round_status;
        }
    }

}

// 写入数据到html -- 开盘或封盘

function writeDataToHtmlOpenOrStop() {

    // 获取元素
    const htmlGameBeting = document.querySelector('.game_beting');

    const htmlVarRoundNumber = htmlGameBeting.querySelector('.var_round_number');
    // const htmlVarWinNumber1 = htmlGameBeting.querySelector('.var_win_number_part_1');
    // const htmlVarWinNumber2 = htmlGameBeting.querySelector('.var_win_number_part_2');
    // const htmlVarWinNumber3 = htmlGameBeting.querySelector('.var_win_number_part_3');
    const htmlVarStatus = htmlGameBeting.querySelector('.var_status');

    // 获取local storage中的数据
    const gameData = readFromLocalStorageJson(keyNameLevel_1_1);

    // 如果有数据，处理past_record
    if (gameData && gameData[keyNameLevel_2_3]) {
        // 找到状态为bonus的记录
        // const bonusRecord = gameData[keyNameLevel_2_3].find(record => record[keyNameLevel_2_3_6] === 'bonus');

        const bonusRecord = gameData[keyNameLevel_2_3][0];
        
        // 如果找到状态为open or stop的记录
        if (bonusRecord) {
            // 填充轮次号码
            htmlVarRoundNumber.textContent = bonusRecord[keyNameLevel_2_3_1];
            
            // 填充中奖号码
            // const winNumberParts = splitNumberToParts(bonusRecord[keyNameLevel_2_3_13], 3);
            // htmlVarWinNumber1.textContent = winNumberParts[0];
            // htmlVarWinNumber2.textContent = winNumberParts[1];
            // htmlVarWinNumber3.textContent = winNumberParts[2];
            
            // 填充状态
            htmlVarStatus.textContent = bonusRecord[keyNameLevel_2_3_6];
        }
    }

}


executeEvery(1, writeDataToHtmlClose, writeDataToHtmlBonus, writeDataToHtmlOpenOrStop);

// executeEvery(1, { func: writeDataToHtmlClose, args: [5] }, { func: writeDataToHtmlBonus, args: [] }, { func: writeDataToHtmlOpenOrStop, args: [] });



















// 生成历史记录
function generateHistoricalRecords(currentPeriodNumber, numRecords = 5) {
    const records = [];
    const totalPeriodsInDay = 24 * 60 / intervalMinutes; // 动态计算每天的轮次数量
    const oneDayMillis = 24 * 60 * 60 * 1000; // 一天的毫秒数

    let currentDate = new Date();
    let currentPeriod = parseInt(currentPeriodNumber.slice(-3), 10);

    for (let i = 0; i < numRecords; i++) {
        currentPeriod--;

        if (currentPeriod < 1) {
            currentPeriod = totalPeriodsInDay;
            currentDate = new Date(currentDate.getTime() - oneDayMillis);
        }

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateStr = `${year}${month}${day}`;
        const periodNumber = `${dateStr}03${String(currentPeriod).padStart(3, '0')}`;

        const winningNumber = getRandomValueInRange(0, 999);
        const participants = getRandomValueInRange(minParticipants, maxParticipants);
        let bets = 0;
        for (let j = 0; j < participants; j++) {
            bets += getRandomValueInRange(1, 100);
        }
        const jackpot = bets * singleBetCost; // 奖池金额
        const winners = getRandomValueInRange(minWinners, maxWinners);
        let winningBets = 0;
        for (let j = 0; j < winners; j++) {
            winningBets += getRandomValueInRange(1, 100);
        }
        const winningAmount = winningBets * singleBetBonus; // 中奖金额

        records.push({
            periodNumber,
            winningNumber,
            participants,
            bets,
            jackpot,
            winners,
            winningBets,
            winningAmount,
            status: closed, //默认已经封盘
            userParticipated: false, // 默认情况下用户没有参与
            userBetHistory: []
        });
    }

    return records;
}

// 更新历史记录
function updateHistoricalRecords(currentPeriodNumber) {
    const recordsKey = 'game_lottery_3';
    let historicalRecords = readFromLocalStorage(recordsKey);
    historicalRecords = historicalRecords ? JSON.parse(historicalRecords) : { pastRecords: [], currentRecord: null };

    const newRecord = generateHistoricalRecords(currentPeriodNumber, 1)[0];

    historicalRecords.pastRecords.push(historicalRecords.currentRecord);
    historicalRecords.pastRecords = historicalRecords.pastRecords.filter(record => record !== null);

    if (historicalRecords.pastRecords.length > 5) {
        historicalRecords.pastRecords.shift(); // 移除最早的一条记录
    }

    historicalRecords.currentRecord = newRecord;

    writeToLocalStorage(recordsKey, JSON.stringify(historicalRecords));
}

// 示例用法
// const currentPeriodNumber = generateRoundNumber(0);
// updateHistoricalRecords(currentPeriodNumber);

// 初始化本地存储
// const initialRecords = {
//     pastRecords: generateHistoricalRecords(generateRoundNumber(0), 5),
//     currentRecord: generateHistoricalRecords(generateRoundNumber(0), 1)[0]
// };
// initializeLocalStorageKey('game_lottery_3', JSON.stringify(initialRecords));
