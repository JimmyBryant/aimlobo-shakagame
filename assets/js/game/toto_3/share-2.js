// 这个库用来作为几个页面都会使用到的一些函数集合，方便大家一起使用

// 当前轮次的号码
let currentRoundNumber;

// 完整的键名
let fullKeyName;

// 是否已经执行检查用户本轮是否中奖
let statusExeCheckUserWin = false; 

// 是否已经执行检查用户本轮将参与记录更新到模拟数据中去
let statusExeCheckUserbet = false; 

// 用户是否已经领取本轮奖励
let userAlreadyGetThisRoundBonus = false; 





// 参数变量，方便调试和修改
const recordCount = 7; // 需要生成的记录数目
const intervalMinutes = 1; // 间隔时间（分钟）-- 非常重要 -- 一定要 >= 1,才能正确更新list页面的数据（按条）
const intervalMinutesClose = 0.1; // 提前多长时间封盘
const intervalMinutesValidBet = intervalMinutes - intervalMinutesClose; // 有效下注时间
const intervalMinutesValidBonus = intervalMinutes - intervalMinutesClose; // 有效兑奖时间
const minBetMultiple = 1; // 最低下注注数
const maxBetMultiple = 100; // 最高下注注数
const singleBetCost = 2; // 单注下注金额
const singleBetBonus = 50; // 单注奖励
const minPlayerNumber = 1000; // 模拟的参与人数下限
const maxPlayerNumber = 5000; // 模拟的参与人数上限
const minWinners = 0; // 模拟的中奖人数下限
const maxWinners = 0; // 模拟的中奖人数上限
const statusOpen = 'open'; // 轮次状态信息：开盘
const statusClose = 'close'; // 轮次状态信息：封盘
const statusBonus = 'bonus'; // 轮次状态信息：开奖中
const statusStop = 'stop'; // 轮次状态信息：结束
const winningNumberParts = 3; // 中奖号码的位数
const winningNumberLowest = 0; // 中奖号码的最低数字
const winningNumberHighest = 999; // 中奖号码的最高数字



// 参数变量，写入local
// 一级名称
const keyNameLevel_1_1 = 'game_lottery_3';

// 二级名称，用来记录最近7期的情况，其中5期是历史记录（已结束的轮次），一期是开奖中，一期是当前轮次（开盘，封盘）
// 每期的记录包括：轮次，下注开始时间，下注停止时间，开奖开始时间，开奖停止时间，状态，参与玩家总数，下注总注数，下注总金额，中奖人数，中奖注数，中奖金额，中奖号码，用户是否参与，参与记录，用户是否中奖，用户中奖记录;
const keyNameLevel_2_3 = 'past_record';

const keyNameLevel_2_3_1 = 'this_round_number';
const keyNameLevel_2_3_2 = 'this_round_bet_begin_time';
const keyNameLevel_2_3_3 = 'this_round_bet_close_time';
const keyNameLevel_2_3_4 = 'this_round_bonus_begin_time';
const keyNameLevel_2_3_5 = 'this_round_bonus_close_time';
const keyNameLevel_2_3_6 = 'this_round_status';
const keyNameLevel_2_3_7 = 'this_round_total_bet_player';
const keyNameLevel_2_3_8 = 'this_round_total_bet_multiple';
const keyNameLevel_2_3_9 = 'this_round_total_bet_amount';
const keyNameLevel_2_3_10 = 'this_round_total_win_player';
const keyNameLevel_2_3_11 = 'this_round_total_win_multiple';
const keyNameLevel_2_3_12 = 'this_round_total_win_amount';
const keyNameLevel_2_3_13 = 'this_round_win_number';
const keyNameLevel_2_3_14 = 'this_round_user_bet_or_not';
const keyNameLevel_2_3_15 = 'this_round_user_bet_record';
const keyNameLevel_2_3_16 = 'this_round_user_win_or_not';
const keyNameLevel_2_3_17 = 'this_round_user_win_record';

// 用户下注的键名
const keyNameLevel_2_3_15_1 = 'current_user_bet_number';
const keyNameLevel_2_3_15_2 = 'current_user_bet_multiple';
const keyNameLevel_2_3_15_3 = 'current_user_bet_amount';

// 用来汇总统计用户的下注记录中，中奖的总下注注数, 总下注金额, 获奖金额
const keyNameLevel_2_3_15_4 = 'total_current_user_bet_multiple';
const keyNameLevel_2_3_15_5 = 'total_current_user_bet_amount';
const keyNameLevel_2_3_15_6 = 'total_current_user_bonus_amount';



// 函数

/**
 * 每隔指定时间（秒）执行给定的一系列回调函数
 * @param {number} interval - 时间间隔（单位：秒）
 * @param  {...function} callbacks - 需要执行的回调函数
 */
function executeEvery(interval, ...callbacks) {
    // 将时间间隔转换为毫秒
    const intervalInMs = interval * 1000;

    // 对每个回调函数使用 setInterval
    callbacks.forEach(callback => {
        setInterval(callback, intervalInMs);
    });
}

/*

// 示例用法
function fun1() {
    console.log('fun1 执行');
}

function fun2() {
    console.log('fun2 执行');
}

executeEvery(5, fun1, fun2);

*/





/**
 * 每隔指定时间（秒）执行给定的一系列回调函数
 * @param {number} interval - 时间间隔（单位：秒）
 * @param  {...function} callbacks - 需要执行的回调函数和其参数
 */
function executeEvery2(interval, ...callbacks) {
    // 将时间间隔转换为毫秒
    const intervalInMs = interval * 1000;

    // 对每个回调函数使用 setInterval
    callbacks.forEach(callback => {
        // 使用闭包来传递参数
        const { func, args } = callback;
        setInterval(() => func(...args), intervalInMs);
    });
}

/*
// 示例用法
function fun1() {
    console.log('fun1 执行');
}

function fun2(n) {
    console.log(`fun2 执行，参数：${n}`);
}

// 传递回调函数和参数
executeEvery(5, { func: fun1, args: [] }, { func: fun2, args: [42] });

*/


// 根据 winningNumberParts 动态生成 fixedPart 的值，也就是说这里是3位数的博彩，生成'03'，5位数的，生成'05'
function getFixedPart(winningNumberParts) {
    return winningNumberParts.toString().padStart(2, '0'); // 可以更改这里的2变成3改成类似'003'这种效果
}

// 拆分数字成几位，不足就用0补充，比如121拆分成：1 2 1,  80拆分成 0 8 0, 5拆分成 0 0 5.
function splitNumberToParts(number, bit) {
    let numberStr = number.toString().padStart(bit, '0');
    let parts = numberStr.split('').map(Number);
    return parts;
}

// 获取今天的日期并格式化为字符串（如 "YYYYMMDD"）
function getTodayDateWithoutDash() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 获取昨天日期，格式为YYYYMMDD
function getYesterdayDateWithoutDash() {
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() - 1);
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentTime.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 获取当天的凌晨0点时间
function getTodayStartTime() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

// 获取当前时间
function getCurrentTime() {
    return new Date();
}

// 获取当前时间 - iso格式
function getCurrentTimeInISO() {
    return new Date().toISOString();
}

// 生成指定轮次的号码: 0 表示当前，1表示上一轮，2表示上上轮...
function generateRoundNumber(n) {
    const todayDate = getTodayDateWithoutDash();
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const currentRoundSequence = Math.floor(totalMinutes / intervalMinutes) + 1;
    const totalRoundsPerDay = Math.ceil(24 * 60 / intervalMinutes);
    let targetRoundSequence = currentRoundSequence - n;
    let datePart = todayDate;
    const fixedPart = getFixedPart(winningNumberParts);
    
    // 处理跨天情况
    while (targetRoundSequence < 1) {
        targetRoundSequence += totalRoundsPerDay;
        datePart = getYesterdayDateWithoutDash();
    }

    const sequenceNumber = String(targetRoundSequence).padStart(Math.ceil(Math.log10(totalRoundsPerDay + 1)), '0');
    return `${datePart}${fixedPart}${sequenceNumber}`;
}

// 生成本轮轮次的下注开始时间(推算)（计算方法为：每天的00:00:00开始生成第一轮的轮次，序号为001，也就是说001的下注开始时间是00:00:00；按照intervalMinutesValidBet(这个值是有效下注时间，是用intervalMinutes（每个轮次的间隔时间）减去intervalMinutesClose（提前封盘时间）的时间算出来的，比如在这里，intervalMinutes 暂定为10分钟，intervalMinutesClose暂定为0.5分钟，那么有效下注时间就是9.5分钟，那么在这个时间范围(00:00:00 - 00:09:59)都是这个序号(001),可以下注的最后时间就是00:09:30,下一轮的开始时间就是00:10:00,在00:10:00 - 00:19:59时间范围内的序号就该是002,可以下注的最后时间就是00:19:30,以此类推...)
function generateBetBeginTime(roundNumber) {
    const sequenceLength = Math.ceil(Math.log10(1440 / intervalMinutes));
    const roundNumberPart = parseInt(roundNumber.slice(-sequenceLength), 10);
    const todayStartTime = getTodayStartTime();
    const betBeginTime = new Date(todayStartTime.getTime() + (roundNumberPart - 1) * intervalMinutes * 60 * 1000);
    return betBeginTime;
}

// 生成本轮轮次的下注停止时间(推算)(下注开始时间 + ntervalMinutesValidBet)
function generateBetCloseTime(betBeginTime) {
    const betCloseTime = new Date(betBeginTime.getTime() + intervalMinutesValidBet * 60 * 1000);
    return betCloseTime;
}

// 生成本轮轮次的开奖开始时间(推算)(下注开始时间 + intervalMinutes，也就是下一轮的下注开始时间，比如第一轮001，他的开奖开始时间就该是00:10:00，开奖停止时间就该是 00:19:30)
function generateBonusBeginTime(betBeginTime) {
    const bonusBeginTime = new Date(betBeginTime.getTime() + intervalMinutes * 60 * 1000);
    return bonusBeginTime;
}

// 生成本轮轮次的开奖停止时间(推算)(下注开始时间 + intervalMinutes+ ntervalMinutesValidBonus，也就是下一轮的下注停止时间)
function generateBonusCloseTime(betBeginTime) {
    const bonusCloseTime = new Date(betBeginTime.getTime() + intervalMinutes * 60 * 1000 + intervalMinutesValidBonus * 60 * 1000);
    return bonusCloseTime;
}

// 生成中奖的号码
function generateWinNumber() {
    return getRandomValueInRange(winningNumberLowest, winningNumberHighest);
}

// 得到某个轮次的当前状态。首先是获取当前时间，然后判断该轮次属于什么状态。
// 因为每个轮次都有下注开始时间，下注停止时间，开奖开始时间，开奖停止时间。
// 所以，就看当前时间在上述哪个时间范围内；
// 下注开始时间 <= 当前时间 < 下注停止时间，那么该轮次的状态就是接受下注的状态；
// 下注停止时间 <= 当前时间 < 开奖开始时间，那么该轮次的状态就是停止下注的状态；
// 开奖开始时间 <= 当前时间 < 开奖停止时间，那么该轮次的状态就是开奖状态；
// 开奖停止时间 <= 当前时间，那么该轮次的状态就是结束状态；
function getRoundStatus(roundNumber) {
    const currentTime = getCurrentTime();
    const betBeginTime = generateBetBeginTime(roundNumber);
    const betCloseTime = generateBetCloseTime(betBeginTime);
    const bonusBeginTime = generateBonusBeginTime(betBeginTime);
    const bonusCloseTime = generateBonusCloseTime(betBeginTime);

    if (currentTime >= betBeginTime && currentTime < betCloseTime) {
        return statusOpen; // 接受下注的状态
    } else if (currentTime >= betCloseTime && currentTime < bonusBeginTime) {
        return statusClose; // 停止下注的状态
    } else if (currentTime >= bonusBeginTime && currentTime < bonusCloseTime) {
        return statusBonus; // 开奖状态
    } else if (currentTime >= bonusCloseTime) {
        return statusStop; // 结束状态
    }
}

// 生成模拟数据
// 生成模拟数据 - 参与下注的玩家数量
function generateSimulatePlayerNumber() {
    return getRandomValueInRange(minPlayerNumber, maxPlayerNumber);
}


// 生成模拟数据 - 参与下注的玩家下注的总注数: 模拟每个人都选择1-100的注；传递一个参数 -- 参与下注的玩家数量
function generateSimulateTotalBetMultiple(totalPlayerNumber) {
    let bets = 0;
        for (let j = 0; j < totalPlayerNumber; j++) {
            bets += getRandomValueInRange(minBetMultiple, maxBetMultiple);
        }
    return bets;
}


// 生成模拟数据 - 参与下注的玩家下注的总金额,传递参数 -- 参与下注的玩家下注的总注数
function generateSimulateTotalBetAmount(allPlayerTotalBetMultiple) {
    return singleBetCost * allPlayerTotalBetMultiple;
}

// 生成模拟数据 - 中奖的玩家数量
function generateSimulateTotalWinPlayer() {
    return getRandomValueInRange(minWinners, maxWinners);
}

// 生成模拟数据 - 中奖的玩家下注的总注数, 传递参数 -- 获奖的玩家数量
function generateSimulateTotalWinMultiple(totalWinPlayerNumber) {
    let bets = 0;
        for (let j = 0; j < totalWinPlayerNumber; j++) {
            bets += getRandomValueInRange(minBetMultiple, maxBetMultiple);
        }
    return bets;
}

// 生成模拟数据 - 中奖的总金额,传递参数 -- 中奖的玩家下注的总注数
function generateSimulateTotalWinAmount(totalWinPlayerBetMultiple) {
    return singleBetBonus * totalWinPlayerBetMultiple;
}

// 构建完整的键名, eg:
// let fullKeyName = buildFullKeyName(keyNameLevel_1_1, keyNameLevel_2_3, keyNameLevel_3_4, keyNameLevel_4_5);
function buildFullKeyName(...parts) {
    return parts.join('.');
}



// 初始化数据到本地
function initializeLocalStorageKeyJson(key, initialValue) {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(initialValue));
    }
}

// 写入数据到本地
function writeToLocalStorageJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// 读取本地数据
function readFromLocalStorageJson(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// 更新localStorage中的嵌套数据
function updateNestedLocalStorageData(parentKey, nestedKey, data) {
    const parentData = readFromLocalStorageJson(parentKey) || {};
    parentData[nestedKey] = data;
    writeToLocalStorageJson(parentKey, parentData);
}


// 得到某一条的记录 -- 只到past_records 下边的某条记录
function readOneRecordFromLocalStorageJson(n) {
    // 获取local storage中的数据
    const gameData = readFromLocalStorageJson(keyNameLevel_1_1);

    // 如果有数据，处理past_record
    if (gameData && gameData[keyNameLevel_2_3]) {
        return gameData[keyNameLevel_2_3][n];
    }
}

// 得到某一条的记录的某个值 -- 只到past_records 下边的某条记录的某个值
function readValueFromOneRecordFromLocalStorageJson(n, key) {

    // 调用得到某条记录
    const bonusRecord = readOneRecordFromLocalStorageJson(n);

    // 得到该条记录的值
    if (bonusRecord) {
        return bonusRecord[key];
    }
}


// 写入某一条的记录的某个值 -- 只到past_records 下边的某条记录的某个值
function writeValueToOneRecordToLocalStorageJson(n, key, value) {

    // 获取local storage中的数据
    const gameData = readFromLocalStorageJson(keyNameLevel_1_1);

    // 调用得到某条数据
    const bonusRecord = gameData[keyNameLevel_2_3][n];

    // 如果有数据，处理past_record
    if (gameData && gameData[keyNameLevel_2_3] && bonusRecord) {
        bonusRecord[key] = value;

        // 将更新后的 gameData 写回到 local storage
        writeToLocalStorageJson(keyNameLevel_1_1, gameData);
    }
   
}


// 用户初次登陆 -- 生成7条数据并写入到local
function initializeGameLottery3(n) {

    // 判断是否首次登陆 - 检查是否存在键名,如果不存在（null)才执行，否则就不执行
    if (readFromLocalStorageJson(keyNameLevel_1_1) === null) {

        // 首先创建键值对：
        initializeLocalStorageKeyJson(keyNameLevel_1_1, {});

        // 写入7条数据
        updateNestedLocalStorageData(keyNameLevel_1_1, keyNameLevel_2_3, generateGameRecord(n));
        }
    
}

// 历史记录信息 -- 要写进去本地的数据的条数
function generateGameRecord(n) {
    const pastRecords = [];
    for (let i = 0; i < n; i++) {
    
        const playerNumber = generateSimulatePlayerNumber();
        const betMultiple = generateSimulateTotalBetMultiple(playerNumber);
        const betAmount = generateSimulateTotalBetAmount(betMultiple);
        const totalWinNumber = generateSimulateTotalWinPlayer();
        const totalWinMultiple = generateSimulateTotalWinMultiple(totalWinNumber);
    
        // 中奖金额不能超过本轮用户下注的总金额
        const totalWinAmount = Math.min(generateSimulateTotalWinAmount(totalWinMultiple), betAmount);
    
        pastRecords.push({
            [keyNameLevel_2_3_1]: generateRoundNumber(i),
            [keyNameLevel_2_3_2]: generateBetBeginTime(generateRoundNumber(i)),
            [keyNameLevel_2_3_3]: generateBetCloseTime(generateBetBeginTime(generateRoundNumber(i))),
            [keyNameLevel_2_3_4]: generateBonusBeginTime(generateBetBeginTime(generateRoundNumber(i))),
            [keyNameLevel_2_3_5]: generateBonusCloseTime(generateBetBeginTime(generateRoundNumber(i))),
            [keyNameLevel_2_3_6]: getRoundStatus(generateRoundNumber(i)), 
            [keyNameLevel_2_3_7]: playerNumber,
            [keyNameLevel_2_3_8]: betMultiple,
            [keyNameLevel_2_3_9]: betAmount,
            [keyNameLevel_2_3_10]: totalWinNumber,
            [keyNameLevel_2_3_11]: totalWinMultiple,
            [keyNameLevel_2_3_12]: totalWinAmount,
            [keyNameLevel_2_3_13]: generateWinNumber(),
            [keyNameLevel_2_3_14]: false,
            [keyNameLevel_2_3_15]: [],
            [keyNameLevel_2_3_16]: false,
            [keyNameLevel_2_3_17]: []
        });
    }
    return pastRecords;
}



// 更新页面上轮次信息 -- n
function updatePageRoundInfo(n) {
    const roundInfo = document.querySelector('.round_info');
    const varCurrentRoundNumberInRoundInfo = roundInfo.querySelector('.var_current_round_number');
    const varStatusInRoundInfo = roundInfo.querySelector('.var_status');

    varCurrentRoundNumberInRoundInfo.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_1);
    varStatusInRoundInfo.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_6);
}

// 更新本地记录中的状态信息 -- 第一条记录，超过下注停止时间后变为封盘
function updateRoundBetStatusInLocal() {
    const currentTime = getCurrentTimeInISO();
    const betCloseTime = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_3);
    if (currentTime > betCloseTime) {
        writeValueToOneRecordToLocalStorageJson(0, keyNameLevel_2_3_6, statusClose);
    }    
}

// 更新页面记录中的状态信息 -- 第一条记录，超过下注停止时间后变为封盘
function updatePageRoundBetStatus() {

    // 先执行状态更新
    updateRoundBetStatusInLocal();
    varRoundBetStatus = document.querySelector('.var_round_bet_status');
    if (varRoundBetStatus) {
        varRoundBetStatus.innerText = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_6);
    }
}

// 更新页面记录中的下注信息 -- 第一条记录
function updatePageRoundBetRecord() {
    updatePageUserBetRecords(0);
}


// 更新页面记录中的轮次信息 -- 第一条记录，更新第一条记录的轮次号码
function updatePageRoundBetNumber() {
    const varRoundBetNumber = document.querySelector('.var_round_bet_number');   
    if (varRoundBetNumber) {
        varRoundBetNumber.textContent = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_1);
    }    
}

// 更新页面记录中的轮次信息 -- 第一条记录，更新第一条记录的轮次号码
function updatePageRoundBetNumber() {
    const varRoundBetNumber = document.querySelector('.var_round_bet_number');   
    if (varRoundBetNumber) {
        varRoundBetNumber.textContent = readValueFromOneRecordFromLocalStorageJson(0, keyNameLevel_2_3_1);
    }    
}

// 更新页面记录中的轮次信息 -- 第2条记录，更新第2条记录的轮次号码
function updatePageRoundBonusNumber() {
    const varRoundBonusNumber = document.querySelector('.var_round_bouns_number');   
    if (varRoundBonusNumber) {
        varRoundBonusNumber.textContent = readValueFromOneRecordFromLocalStorageJson(1, keyNameLevel_2_3_1);
    }    
}

// 更新页面记录中的轮次信息 -- 第3-7条记录，更新第3-7条记录的轮次号码
function updatePageRoundStopNumber() {
    const varRoundStopNumber = document.querySelector('.var_round_Stop_number');   
    if (varRoundStopNumber) {
        varRoundStopNumber.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_1);
    }    
}

// 更新页面记录中的轮次信息 -- 参数传递需要获取第几条记录：适用范围是页面上只存在一个轮次号码，也就是页面：bet,bonus,close
function updatePageRoundNumber(n) {
    const varRoundNumber = document.querySelector('.var_round_number');   
    if (varRoundNumber) {
        varRoundNumber.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_1);
    }   
}

// 更新页面记录中的中奖号码 -- 第2条记录，更新第2条记录的中奖号码
function updatePageRoundBonusWinNumber() {  
    // 得到本轮中奖的号码
    const winNumber = readValueFromOneRecordFromLocalStorageJson(1, keyNameLevel_2_3_13);

    // 填充中奖号码
    const winNumberParts = splitNumberToParts(winNumber, winningNumberParts);

    for (let i = 0; i < winningNumberParts; i++) {
        const varWinNumberPart = document.querySelector(`.var_win_number_part_${i + 1}`);
        if (varWinNumberPart) {
            varWinNumberPart.textContent = winNumberParts[i];
        }
    }
}

// 更新页面记录中的中奖号码 -- 参数传递需要获取第几条记录：适用范围是页面上只存在一个中奖号码，也就是页面：bonus,close
function updatePageWinNumber(n) {  
    // 得到本轮中奖的号码
    const winNumber = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_13);

    // 填充中奖号码
    const winNumberParts = splitNumberToParts(winNumber, winningNumberParts);

    for (let i = 0; i < winningNumberParts; i++) {
        const varWinNumberPart = document.querySelector(`.var_win_number_part_${i + 1}`);
        if (varWinNumberPart) {
            varWinNumberPart.textContent = winNumberParts[i];
        }
    }
}

// 更新页面记录中的玩家信息-- 玩家总数，总下注注数，总下注金额，中奖玩家数量，中奖总注数，中奖总金额
function updatePageAllUserInfo(n) {
    const varTotalBetPlayer = document.querySelector('.var_total_bet_player');
    const varTotalBetMultiple = document.querySelector('.var_total_bet_multiple');
    const varTotalBetAmount = document.querySelector('.var_total_bet_amount');
    const varTotalWinPlayer = document.querySelector('.var_total_win_player');
    const varTotalWinMultiple = document.querySelector('.var_total_win_multiple');
    const varTotalWinAmount = document.querySelector('.var_total_win_amount');

    varTotalBetPlayer.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_7);
    varTotalBetMultiple.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_8);
    varTotalBetAmount.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_9);
    varTotalWinPlayer.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_10);
    varTotalWinMultiple.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_11);
    varTotalWinAmount.textContent = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_12);
}




// 更新页面上的轮次信息 -- 
function updatePageRoundInfoAll(n) {

    const roundInfo = document.querySelector('.round_info');
    const varCurrentRoundNumberInRoundInfo = roundInfo.querySelector('.var_current_round_number');
    const varStatusInRoundInfo = roundInfo.querySelector('.var_status');
    const varUserBetOrNot = document.querySelector('.var_user_bet_or_not');
    const varTotalBetPlayer = document.querySelector('.var_total_bet_player');
    const varTotalBetMultiple = document.querySelector('.var_total_bet_multiple');
    const varTotalBetAmount = document.querySelector('.var_total_bet_amount');
    const varTotalWinPlayer = document.querySelector('.var_total_win_player');
    const varTotalWinMultiple = document.querySelector('.var_total_win_multiple');
    const varTotalWinAmount = document.querySelector('.var_total_win_amount');
    const varWinNumber1 = document.querySelector('.var_win_number_part_1');
    const varWinNumber2 = document.querySelector('.var_win_number_part_2');
    const varWinNumber3 = document.querySelector('.var_win_number_part_3');

    // 得到本轮中奖的号码
    const winNumber = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_13);

    // 填充中奖号码
    const winNumberParts = splitNumberToParts(winNumber, 3);
    varWinNumber1.textContent = winNumberParts[0];
    varWinNumber2.textContent = winNumberParts[1];
    varWinNumber3.textContent = winNumberParts[2];


    varCurrentRoundNumberInRoundInfo.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_1);
    varStatusInRoundInfo.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_6);
    varUserBetOrNot.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_14);
    varTotalBetPlayer.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_7);
    varTotalBetMultiple.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_8);
    varTotalBetAmount.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_9);
    varTotalWinPlayer.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_10);
    varTotalWinMultiple.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_11);
    varTotalWinAmount.innerText = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_12);
}

// 更新页面上的用户下注历史记录
function updatePageUserBetRecords(n) {
    // 获取存储的用户下注记录
    const userBetRecords = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_15) || [];

    // 获取显示用户下注记录的容器
    const userBetRecordContainer = document.querySelector('.var_user_bet_record');

    // 清空容器内容
    userBetRecordContainer.innerHTML = '';

    // 遍历每条记录并生成对应的HTML
    userBetRecords.forEach(record => {
        const recordItem = document.createElement('div');
        recordItem.className = 'record_item flex gap-_5rem align-items-center';

        // 创建存储拆分号码的容器
        const betNumberContainer = document.createElement('div');
        betNumberContainer.className = 'var_current_user_bet_number flex gap-_5rem align-items-center justify-content-center';

        // 拆分用户下注号码并生成对应的HTML
        const betNumberParts = splitNumberToParts(record[keyNameLevel_2_3_15_1], 3);
        betNumberParts.forEach((part, index) => {
            const betNumberPartDiv = document.createElement('div');
            betNumberPartDiv.className = `var_win_number_part_${index + 1} bg-purple border-round padding-_5rem flex justify-content-center align-items-center color-white width-2rem height-2rem`;
            betNumberPartDiv.innerText = part;
            betNumberContainer.appendChild(betNumberPartDiv);
        });

        // 添加下注号码容器
        recordItem.appendChild(betNumberContainer);

        // 创建并添加倍数和金额的div
        const betMultipleDiv = document.createElement('div');
        betMultipleDiv.className = 'var_current_user_bet_multiple';
        betMultipleDiv.innerText = record[keyNameLevel_2_3_15_2];

        const betAmountDiv = document.createElement('div');
        betAmountDiv.className = 'var_current_user_bet_amount';
        betAmountDiv.innerText = record[keyNameLevel_2_3_15_3];

        // 添加倍数和金额的div
        recordItem.appendChild(betMultipleDiv);
        recordItem.appendChild(betAmountDiv);

        // 添加记录项到记录容器
        userBetRecordContainer.appendChild(recordItem);
    });
}


// 汇总统计用户的下注信息（统计每个下注号码的总下注注数，总下注金额）-- 参数代表获取第几条记录
function getAggregatedBets(n) {
    // 从 localStorage 中获取下注记录
    const betRecords = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_15);

    // 使用对象来汇总各个下注号码的总下注注数和总下注金额
    const aggregatedBets = {};

    betRecords.forEach(record => {
        const betNumber = record[keyNameLevel_2_3_15_1];
        const betMultiple = record[keyNameLevel_2_3_15_2];
        const betAmount = record[keyNameLevel_2_3_15_3];
        // const betNumber = record.current_user_bet_number;
        // const betMultiple = record.current_user_bet_multiple;
        // const betAmount = record.current_user_bet_amount;

        if (!aggregatedBets[betNumber]) {
            aggregatedBets[betNumber] = {
                [keyNameLevel_2_3_15_4]: 0,
                [keyNameLevel_2_3_15_5]: 0
            };
        }

        // aggregatedBets[betNumber].total_current_user_bet_multiple += betMultiple;
        // aggregatedBets[betNumber].total_current_user_bet_amount += betAmount;

        aggregatedBets[betNumber][keyNameLevel_2_3_15_4] += betMultiple;
        aggregatedBets[betNumber][keyNameLevel_2_3_15_5] += betAmount;
    });

    // 将结果转换为数组
    const result = Object.keys(aggregatedBets).map(betNumber => ({
        [keyNameLevel_2_3_15_1]: parseInt(betNumber, 10),
        [keyNameLevel_2_3_15_4]: aggregatedBets[betNumber][keyNameLevel_2_3_15_4],
        [keyNameLevel_2_3_15_5]: aggregatedBets[betNumber][keyNameLevel_2_3_15_5]
    }));

    return result;
}

// 示例：调用函数并输出结果
// console.log(getAggregatedBets(0));

// 检查用户是否中奖 -- 参数代表获取第几条记录的中奖号码, 没中奖直接输出false, 中奖了会更新本地记录中的中奖信息并返回true
function checkIfUserWin(n) {

    // 执行时间在该轮的开奖开始时间之后，开奖停止时间之前
    const currentTime = getCurrentTimeInISO();
    const bonusBeginTime = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_4);
    const bonusCloseTime = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_5);

    if (currentTime >= bonusBeginTime && currentTime < bonusCloseTime) {

        // 是否已经执行过了该函数,如果还没执行过，才执行，避免多次运行，默认是还没运行过
        if (!statusExeCheckUserWin) {

            // 生成中奖号码
            // writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_13, generateWinNumber());
            const winNumber1 = 132;
            writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_13, winNumber1);


            // 获取中奖号码
            const winningNumber = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_13);

            if (winningNumber === null) {
                console.error("No winning number found in localStorage.");
                return;
            }

            // 获取汇总的下注记录
            const aggregatedBets = getAggregatedBets(n);

            // 查找中奖号码对应的记录
            const winningRecord = aggregatedBets.find(record => record[keyNameLevel_2_3_15_1] === winningNumber);

            if (winningRecord) {

                // 如果找到中奖记录，则返回总下注注数和总下注金额, 并将中奖（true)写进本地, 同时在模拟的用户总数据上加上这个数据

                // 用户本轮是否中奖 - true
                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_16, true);

                const bonusAmount = winningRecord[keyNameLevel_2_3_15_5] * singleBetBonus;

                const winData = {
                    [keyNameLevel_2_3_15_4]: winningRecord[keyNameLevel_2_3_15_4],
                    [keyNameLevel_2_3_15_5]: winningRecord[keyNameLevel_2_3_15_5],
                    [keyNameLevel_2_3_15_6]: bonusAmount
                };

                // 用户的中奖信息
                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_17, winData);

                // 添加数据到模拟数据中去：中奖玩家数量，中奖注数，中奖金额

                const totalWinPlayerExcetpCurrentUser = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_10);
                const totalWinMultipleExcetpCurrentUser = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_11);
                const totalWinAmountExcetpCurrentUser = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_12);

                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_10, totalWinPlayerExcetpCurrentUser + 1);

                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_11, totalWinMultipleExcetpCurrentUser + winningRecord[keyNameLevel_2_3_15_4]);

                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_12, totalWinAmountExcetpCurrentUser + bonusAmount);

                // 更新为已经执行过了
                statusExeCheckUserWin = true;

                return true;
            } else {
                // 如果没有找到中奖记录
                return false;
            }
        } else {
            // 更新为还没执行过
            statusExeCheckUserWin = false;
        }
    }



    
}

// 更新中奖信息到页面 -- index = 1
function updatePageBonusInfo() {
    checkIfUserWin(1);
}

// 检查用户是否下注 -- 参数传递要读取第几条记录
function checkIfUserBet(n) {
    return readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_14);
}

// 用户参与下注的情况下，需要更新参与游戏的数据到本地的模拟数据中去， -- 参数传递要写入第几条记录
function updateWhenUserbetToLocal(n) {
    
    // 执行时间要在该轮的bet_close_time 之后,开奖时间之前，这样算作清盘时间
    const currentTime = getCurrentTimeInISO();
    const betCloseTime = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_3);
    const bonusBeginTime = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_4);

    if (currentTime > betCloseTime && currentTime < bonusBeginTime) {

        // 用户是否参与了本轮的下注
        if (checkIfUserBet(n)) {

            // 是否已经执行过了该函数,如果还没执行过，才执行，避免多次运行，默认是还没运行过
            if (!statusExeCheckUserbet) {
                // 获取汇总的下注记录
                const aggregatedBets = getAggregatedBets(n);
        
                // 计算用户总下注注数和总下注金额
                let totalBetMultiple = 0;
                let totalBetAmount = 0;
        
                aggregatedBets.forEach(record => {
                    totalBetMultiple += record[keyNameLevel_2_3_15_4];
                    totalBetAmount += record[keyNameLevel_2_3_15_5];
                });
        
                // 添加数据到模拟数据中去：下注玩家数量，下注注数，下注金额
        
                const totalWinBetExcetpCurrentUser = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_7);
                const totalBetMultipleExcetpCurrentUser = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_8);
                const totalBetAmountExcetpCurrentUser = readValueFromOneRecordFromLocalStorageJson(n, keyNameLevel_2_3_9);
        
                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_7, totalWinBetExcetpCurrentUser + 1);
        
                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_8, totalBetMultipleExcetpCurrentUser + totalBetMultiple);
        
                writeValueToOneRecordToLocalStorageJson(n, keyNameLevel_2_3_9, totalBetAmountExcetpCurrentUser + totalBetAmount);


                // 更新为已经执行过了
                statusExeCheckUserbet = true;
            } else {
                // 更新为还没执行过
                statusExeCheckUserbet = false;
            }
        }
    }
}




// 得到当前时间应该有哪些轮次号码，返回一个数组（按照时间从现在到之前）
function getExpectedlatest7RoundNumbers() {

    // 获取最近 7 个轮次的号码
    const rounds = [];
    for (let i = 0; i < recordCount; i++) {
        rounds.push(generateRoundNumber(i));
    }
    return rounds;
}

// 得到当前记录里的轮次号码，返回一个数组（按照时间从现在到之前）
function getCurrent7RoundNumbers() {

    // 获取最近 7 个轮次的号码
    const rounds = [];
    for (let i = 0; i < recordCount; i++) {
        rounds.push(readValueFromOneRecordFromLocalStorageJson(i, keyNameLevel_2_3_1));
    }
    return rounds;
    
}

// 判断两个数组是否一致
function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// 判断两个数组是否完全不一致
function areArraysCompletelyDifferent(arr1, arr2) {
    if (arr1.length !== arr2.length) return true;
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) return false;
    }
    return true;
}

// 判断两个数组是否部分不一致
function areArraysPartiallyDifferent(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) return true;
    }
    return false;
}

// 判断是否需要更新本地记录
function needUpdateLocalStorageRoundRecord() {
    const need = !areArraysEqual(getExpectedlatest7RoundNumbers(), getCurrent7RoundNumbers());
    return need;
}

// 判断更新类型：完全不一致返回1，部分不一致返回2
function needUpdateLocalStorageRoundRecordType() {
    const expected = getExpectedlatest7RoundNumbers();
    const current = getCurrent7RoundNumbers();

    let completelyDifferent = true;
    for (let i = 0; i < current.length; i++) {
        if (expected.includes(current[i])) {
            completelyDifferent = false;
            break;
        }
    }

    return completelyDifferent ? 1 : 2;
}


/*需要更新本地记录的情况下更新记录，分两种情况：

1. 当前记录里的轮次号码和当前时间应该有哪些轮次号码完全不一致，那么就直接执行初始化的操作；-- 所以这里应该有个函数判断是完全不一致，还是部分不一致。

2. 当前记录里的轮次号码和当前时间应该有哪些轮次号码部分一致，部分不一致，那么就需要按照顺序进行更新；
*/

// 更新本地记录 -- core,重要
function updateLocalStorageRoundRecord() {

    console.log('updateLocalStorageRoundRecord called at', new Date().toISOString());
    if (needUpdateLocalStorageRoundRecord) {

        const updateType = needUpdateLocalStorageRoundRecordType();

        // 需要完全更新，直接执行初始化
        if (updateType === 1) {
            // 如果轮次记录完全不一致，删除现有的记录
            localStorage.removeItem(keyNameLevel_1_1);
            // 执行初始化操作
            initializeGameLottery3(recordCount);
        } else if (updateType === 2) {
            updatePartialRecords();
        }
    }
    
}

// 获取需要保留的轮次号码的个数
function getRoundCountToKeep() {
    const expectedRounds = getExpectedlatest7RoundNumbers();
    const currentRounds = getCurrent7RoundNumbers();

    const roundsToKeep = [];

    // 找到需要保留的轮次号码（在两个数组中都存在）
    for (const round of currentRounds) {
        if (expectedRounds.includes(round)) {
            roundsToKeep.push(round);
        }
    }
    
    return roundsToKeep.length;
}

// 获取需要保留的轮次号码的记录内容
function getRecordsToKeep() {
    const expectedRounds = getExpectedlatest7RoundNumbers();
    const currentRounds = getCurrent7RoundNumbers();

    const recordsToKeep = [];

    // 找到需要保留的记录内容
    for (let i = 0; i < currentRounds.length; i++) {
        if (expectedRounds.includes(currentRounds[i])) {
            recordsToKeep.push(readOneRecordFromLocalStorageJson(i));
        }
    }

    return recordsToKeep;
}

// 部分更新本地记录 -- core, 重要
function updatePartialRecords() {
    const roundsToKeepCount = getRoundCountToKeep();
    const recordsToKeep = getRecordsToKeep(); // 这里保留了需要保留的记录的内容

    // 需要新增的记录数量
    const newRecordsCount = recordCount - roundsToKeepCount;

    // 删除现有的轮次记录
    localStorage.removeItem(keyNameLevel_1_1);

    // 初始化并生成需要新增的记录
    initializeGameLottery3(newRecordsCount);


    // 获取新生成的当前记录
    const gameData = readFromLocalStorageJson(keyNameLevel_1_1);

    // 如果不存在，创建空数组
    if (!gameData[keyNameLevel_2_3]) {
        gameData[keyNameLevel_2_3] = [];
    }

    // 添加保留的记录到现有的游戏数据
    gameData[keyNameLevel_2_3] = gameData[keyNameLevel_2_3].concat(recordsToKeep);

    // 写入本地存储
    writeToLocalStorageJson(keyNameLevel_1_1, gameData);

    /* 
    如果保留的记录的数量是6，那么需要在这个时候重新生成获奖号码（避免用户从local读取数据然后投注）；
    保留的记录条数是6才需要这样重新生成获奖号码；
    因为用户每次可以下注的轮次只有index=0;
    所以在index=0这一轮重新生成获奖号码就可以确保用户不能从本地取数；
    其实这里也可以不操作，原因是本地记录每秒被删除更新一次，用户应该看不到；
    但是出于严谨，如果是每分钟更新一次呢，那用户就可以看到本地数据，所以还是需要避免；
    另外，如果想要出彩蛋，也需要在这里操作。

    --- 发生变化，在用户在list/bonus页面的时候生成，更符合逻辑
    */
    // const a = recordCount - 1;
    // if (roundsToKeepCount === a) {
    //     // writeValueToOneRecordToLocalStorageJson(1, keyNameLevel_2_3_13, generateWinNumber());
    //     const winNumber1 = 132;
    //     writeValueToOneRecordToLocalStorageJson(1, keyNameLevel_2_3_13, winNumber1);
    //     console.log('win number 132');
    // }
}


// 初始化，第一次登陆就生成7条数据
initializeGameLottery3(recordCount);
