// 这个库用来作为几个页面都会使用到的一些函数集合，方便大家一起使用

// 当前轮次的号码
let currentRoundNumber;

// 完整的键名
let fullKeyName;





// 参数变量，方便调试和修改
const recordCount = 7; // 需要生成的记录数目
const intervalMinutes = 0.3; // 间隔时间（分钟）
const intervalMinutesClose = 0.1; // 提前多长时间封盘
const intervalMinutesValidBet = intervalMinutes - intervalMinutesClose; // 有效下注时间
const intervalMinutesValidBonus = intervalMinutes - intervalMinutesClose; // 有效兑奖时间
const singleBetCost = 2; // 单注下注金额
const singleBetBonus = 50; // 单注奖励
const minPlayNumber = 1000; // 模拟的参与人数下限
const maxPlayNumber = 5000; // 模拟的参与人数上限
const minWinners = 0; // 模拟的中奖人数下限
const maxWinners = 20; // 模拟的中奖人数上限


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



// 函数

/**
 * 每隔指定时间（秒）执行给定的一系列回调函数
 * @param {number} interval - 时间间隔（单位：秒）
 * @param  {...function} callbacks - 需要执行的回调函数和其参数
 */
function executeEvery(interval, ...callbacks) {
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
    const fixedPart = '03'; // 这里的数字可编辑，因为现在是三位数的博彩，所以序号里用的03
    
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
    return getRandomValueInRange(0,999);
}

// 得到某个轮次的当前状态。首先是获取当前时间，然后判断该轮次属于什么状态。
// 因为每个轮次都有下注开始时间，下注停止时间，开奖开始时间，开奖停止时间。
// 所以，就看当前时间在上述哪个时间范围内；
// 下注开始时间 <= 当前时间 < 下注停止时间，那么该轮次的状态就是open，也就是接受下注的状态；
// 下注停止时间 <= 当前时间 < 开奖开始时间，那么该轮次的状态就是stop，也就是停止下注的状态；
// 开奖开始时间 <= 当前时间 < 开奖停止时间，那么该轮次的状态就是bonus，也就是开奖状态；
// 开奖停止时间 <= 当前时间，那么该轮次的状态就是close，也就是结束状态；
function getRoundNumberStatus(roundNumber) {
    const currentTime = getCurrentTime();
    const betBeginTime = generateBetBeginTime(roundNumber);
    const betCloseTime = generateBetCloseTime(betBeginTime);
    const bonusBeginTime = generateBonusBeginTime(betBeginTime);
    const bonusCloseTime = generateBonusCloseTime(betBeginTime);

    if (currentTime >= betBeginTime && currentTime < betCloseTime) {
        return 'open'; // 接受下注的状态
    } else if (currentTime >= betCloseTime && currentTime < bonusBeginTime) {
        return 'stop'; // 停止下注的状态
    } else if (currentTime >= bonusBeginTime && currentTime < bonusCloseTime) {
        return 'bonus'; // 开奖状态
    } else if (currentTime >= bonusCloseTime) {
        return 'close'; // 结束状态
    }
}

// 生成模拟数据
// 生成模拟数据 - 参与下注的玩家数量
function generateSimulatePlayerNumber() {
    return getRandomValueInRange(minPlayNumber, maxPlayNumber);
}


// 生成模拟数据 - 参与下注的玩家下注的总注数: 模拟每个人都选择1-100的注；传递一个参数 -- 参与下注的玩家数量
function generateSimulateTotalBetMultiple(n) {
    let bets = 0;
        for (let j = 0; j < n; j++) {
            bets += getRandomValueInRange(1, 100);
        }
    return bets;
}


// 生成模拟数据 - 参与下注的玩家下注的总金额,传递参数 -- 参与下注的玩家下注的总注数
function generateSimulateTotalBetAmount(n) {
    return singleBetCost * n;
}

// 生成模拟数据 - 中奖的玩家数量
function generateSimulateTotalWinPlayer() {
    return getRandomValueInRange(minWinners, maxWinners);
}

// 生成模拟数据 - 中奖的玩家下注的总注数 , 传递参数 -- 获奖的玩家数量
function generateSimulateTotalWinMultiple(n) {
    let bets = 0;
        for (let j = 0; j < n; j++) {
            bets += getRandomValueInRange(1, 100);
        }
    return bets;
}

// 生成模拟数据 - 中奖的总金额,传递参数 -- 中奖的玩家下注的总注数
function generateSimulateTotalWinAmount(n) {
    return singleBetBonus * n;
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

// 函数
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
            [keyNameLevel_2_3_6]: getRoundNumberStatus(generateRoundNumber(i)), 
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

// 更新页面上轮次信息 -- 
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



// 初始化，第一次登陆就生成7条数据
initializeGameLottery3(recordCount);


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
// getExpectedlatest7RoundNumbers();
// getCurrent7RoundNumbers();


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



// needUpdateLocalStorageRoundRecordType();


/*需要更新本地记录的情况下，更新记录，分两种情况：

1. 当前记录里的轮次号码和当前时间应该有哪些轮次号码完全不一致，那么就直接执行初始化的操作；-- 所以这里应该有个函数判断是完全不一致，还是部分不一致。

2. 当前记录里的轮次号码和当前时间应该有哪些轮次号码部分一致，部分不一致，那么就需要按照顺序进行更新；
*/

function updateLocalStorageRoundRecord() {

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

    const RoundCountToKeep = roundsToKeep.length;

    console.log('expectedRounds', expectedRounds);
    console.log('currentRounds', currentRounds);
    console.log('roundsToKeep', roundsToKeep);
    console.log('roundsToKeepCount', RoundCountToKeep);
    
    return RoundCountToKeep;

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

// 部分更新本地记录 -- core
function updatePartialRecords() {
    const roundsToKeepCount = getRoundCountToKeep();
    const recordsToKeep = getRecordsToKeep();

    // 需要新增的记录数量
    const newRecordsCount = recordCount - roundsToKeepCount;

    // 删除现有的轮次记录
    localStorage.removeItem(keyNameLevel_1_1);

    // 初始化并生成需要新增的记录
    initializeGameLottery3(newRecordsCount);

    // 获取当前的游戏数据
    const gameData = readFromLocalStorageJson(keyNameLevel_1_1);

    // 如果不存在，创建空数组
    if (!gameData[keyNameLevel_2_3]) {
        gameData[keyNameLevel_2_3] = [];
    }

    // 添加保留的记录到现有的游戏数据
    gameData[keyNameLevel_2_3] = gameData[keyNameLevel_2_3].concat(recordsToKeep);

    // 写入本地存储
    writeToLocalStorageJson(keyNameLevel_1_1, gameData);

    // console.log('Updated local storage round records');
}

updateLocalStorageRoundRecord();
//每秒执行一次：更新本地记录
// executeEvery(1, { func: updateLocalStorageRoundRecord, args: [] });

