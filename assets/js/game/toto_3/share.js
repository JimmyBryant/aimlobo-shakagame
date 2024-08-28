// 这个库用来作为几个页面都会使用到的一些函数集合，方便大家一起使用
/* 

该函数库的目录：

    - 根据 winningNumberParts 动态生成 fixedPart 的值，也就是说这里是3位数的博彩，生成'03'，5位数的，生成'05'
    - 拆分数字成几位，不足就用0补充，比如121拆分成：1 2 1,  80拆分成 0 8 0, 5拆分成 0 0 5
    - 生成轮次信息
        - 生成轮次信息 -- 指定轮次的号码: -- 参数代表序号： 0 表示当前，1表示上一轮，2表示上上轮...
        - 生成轮次信息 -- 指定轮次的下注开始时间
        - 生成轮次信息 -- 指定轮次的下注停止时间
        - 生成轮次信息 -- 指定轮次的开奖开始时间
        - 生成轮次信息 -- 指定轮次的开奖停止时间
        - 生成轮次信息 -- 指定轮次的当前状态
    - 生成模拟数据
        - 生成模拟数据 - 参与下注的玩家数量
        - 生成模拟数据 - 参与下注的玩家下注的总注数: 模拟每个人都选择1-100的注；传递一个参数 -- 参与下注的玩家数量
        - 生成模拟数据 - 参与下注的玩家下注的总金额, 传递参数 -- 参与下注的玩家下注的总注数
        - 生成模拟数据 - 中奖的号码
        - 生成模拟数据 - 中奖的玩家数量
        - 生成模拟数据 - 中奖的玩家下注的总注数, 传递参数 -- 获奖的玩家数量
        - 生成模拟数据 - 中奖的总金额, 传递参数 -- 中奖的玩家下注的总注数
    - 历史信息 -- 生成模拟的数据 -- 参数代表: 要写进到本地的数据的条数 -- core 重要
    - 初始化游戏 -- 生成模拟的数据 -- 参数代表: 要生成几条记录
    - 本地记录的更新
        - 更新本地记录 -- 某条记录的状态
        - 更新本地记录 -- 某条记录中的用户中奖信息: 是否中奖, 中奖记录(中奖号码对应的下注总注数，下注总金额，中奖金额)
        - 更新本地记录 -- 全部记录 -- 下一轮或者过了很多轮开始了 -- core 重要
    - 辅助函数 -- 本地记录的更新
        - 轮次更新的时候更新中奖号码 -- 彩蛋位置
        - 汇总统计用户的下注信息（统计每个下注号码的总下注注数，总下注金额）, 返回一个汇总后的数组 -- 参数代表获取第几条记录
        - 得到当前时间应该有哪些轮次号码，返回一个数组（按照时间从现在到之前）
        - 得到当前记录里的轮次号码，返回一个数组（按照时间从现在到之前）
        - 判断两个数组是否一致
        - 判断两个数组是否完全不一致
        - 获取需要更新的类型和需要保留的记录内容
    - 页面信息的更新
        - 页面信息的更新 -- 更新页面记录中的轮次号码信息 -- 参数传递需要获取第几条记录
        - 页面信息的更新 -- 更新页面记录中的轮次状态信息 -- 参数传递需要获取第几条记录
        - 更新页面信息 -- 下一轮更新时间倒计时
        - 页面信息的更新 -- 更新页面记录中的轮次中奖号码信息 -- 参数传递需要获取第几条记录 -- 使用范围：页面上只有一个中奖号码 -- bonus, history
        - 页面信息的更新 -- 更新页面记录中的所有玩家参与和中奖信息 -- 参数传递需要获取第几条记录
        - 页面信息的更新 -- 更新页面记录中的用户参与和中奖信息 -- 参数传递需要获取第几条记录
        - 页面信息的更新 -- 更新页面记录中的轮次的用户下注记录 -- 参数传递需要获取第几条记录 
        - 页面信息的更新 -- 更新页面记录中的轮次的用户下注记录 -- 参数传递需要获取第几条记录 
    辅助函数 -- 页面信息的更新
        - 更新时间间隔 -- 轮次重排 -- 适用： list，bet
        - 更新时间间隔 -- 轮次状态 -- index = 0 -- 适用： list，bet


*/ 




// 函数
// 函数
// 函数
// 函数
// 函数




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



// 基础函数 -- 时间
// 基础函数 -- 时间
// 基础函数 -- 时间
// 基础函数 -- 时间
// 基础函数 -- 时间



// 获取当前时间 -- 返回Date对象 -- 如果需要比较时间，用这个函数
function getCurrentTime() {
    return new Date();
}

// 获取当前时间 - iso格式 -- 返回的是一个时间的字符串格式
function getCurrentTimeInISO() {
    return new Date().toISOString();
}


// 基础函数 -- 时间 -- end 
// 基础函数 -- 时间 -- end 
// 基础函数 -- 时间 -- end 
// 基础函数 -- 时间 -- end 
// 基础函数 -- 时间 -- end 




// 生成轮次信息
// 生成轮次信息
// 生成轮次信息
// 生成轮次信息
// 生成轮次信息

// 生成轮次信息 -- 指定轮次的号码: -- 参数代表序号： 0 表示当前，1表示上一轮，2表示上上轮...
function generateRoundNumber(index) {

    const currentTimestamp = currentTime(); // 获取当前时间戳

    const hours = currentTimestamp.getHours();

    const minutes = currentTimestamp.getMinutes();

    const totalMinutes = hours * 60 + minutes;

    const currentRoundSequence = Math.floor(totalMinutes / intervalMinutes) + 1;

    const totalRoundsPerDay = Math.ceil(24 * 60 / intervalMinutes);

    let targetRoundSequence = currentRoundSequence - index;

    const fixedPart = getFixedPart(winningNumberParts);
    
    // 处理跨天情况
    while (targetRoundSequence < 1) {

        targetRoundSequence += totalRoundsPerDay;

        datePart = getYesterdayDateWithoutDash();
    }

    const sequenceNumber = String(targetRoundSequence).padStart(Math.ceil(Math.log10(totalRoundsPerDay + 1)), '0');

    return `${fixedPart}${sequenceNumber}`;
}




// 生成轮次信息 -- 指定轮次的下注开始时间
// 返回的是一个Date对象
// 生成本轮轮次的下注开始时间(推算)（计算方法为：每天的00:00:00开始生成第一轮的轮次，序号为001，也就是说001的下注开始时间是00:00:00；按照intervalMinutesValidBet(这个值是有效下注时间，是用intervalMinutes（每个轮次的间隔时间）减去intervalMinutesClose（提前封盘时间）的时间算出来的，比如在这里，intervalMinutes 暂定为10分钟，intervalMinutesClose暂定为0.5分钟，那么有效下注时间就是9.5分钟，那么在这个时间范围(00:00:00 - 00:09:59)都是这个序号(001),可以下注的最后时间就是00:09:30,下一轮的开始时间就是00:10:00,在00:10:00 - 00:19:59时间范围内的序号就该是002,可以下注的最后时间就是00:19:30,以此类推...)
function generateBetBeginTime(roundNumber) {

    const sequenceLength = Math.ceil(Math.log10(1440 / intervalMinutes));

    const roundNumberPart = parseInt(roundNumber.slice(-sequenceLength), 10);

    const todayStartTime = getTodayStartTime();

    const betBeginTime = new Date(todayStartTime.getTime() + (roundNumberPart - 1) * intervalMinutes * 60 * 1000);

    return betBeginTime;
}

// 生成轮次信息 -- 指定轮次的下注停止时间
// (推算)(下注开始时间 + ntervalMinutesValidBet)
function generateBetCloseTime(betBeginTime) {

    const betCloseTime = new Date(betBeginTime.getTime() + intervalMinutesValidBet * 60 * 1000);

    return betCloseTime;
}

// 生成轮次信息 -- 指定轮次的开奖开始时间
// (推算)(下注开始时间 + intervalMinutes，也就是下一轮的下注开始时间，比如第一轮001，他的开奖开始时间就该是00:10:00，开奖停止时间就该是 00:19:30)
function generateBonusBeginTime(betBeginTime) {

    const bonusBeginTime = new Date(betBeginTime.getTime() + intervalMinutes * 60 * 1000);

    return bonusBeginTime;
}

// 生成轮次信息 -- 指定轮次的开奖停止时间
// (推算)(下注开始时间 + intervalMinutes+ ntervalMinutesValidBonus，也就是下一轮的下注停止时间)
function generateBonusCloseTime(betBeginTime) {

    const bonusCloseTime = new Date(betBeginTime.getTime() + intervalMinutes * 60 * 1000 + intervalMinutesValidBonus * 60 * 1000);

    return bonusCloseTime;
}


// 生成轮次信息 -- 指定轮次的当前状态
// 首先是获取当前时间，然后判断该轮次属于什么状态。
// 因为每个轮次都有下注开始时间，下注停止时间，开奖开始时间，开奖停止时间。
// 所以，就看当前时间在上述哪个时间范围内；
// 下注开始时间 <= 当前时间 < 下注停止时间，那么该轮次的状态就是接受下注的状态；
// 下注停止时间 <= 当前时间 < 开奖开始时间，那么该轮次的状态就是停止下注的状态；
// 开奖开始时间 <= 当前时间 < 开奖停止时间，那么该轮次的状态就是开奖状态；
// 开奖停止时间 <= 当前时间，那么该轮次的状态就是结束状态；
function getRoundStatus(roundNumber) {
    
    const currentTimestamp = currentTime(); // 获取当前时间戳

    const betBeginTime = generateBetBeginTime(roundNumber);

    const betCloseTime = generateBetCloseTime(betBeginTime);

    const bonusBeginTime = generateBonusBeginTime(betBeginTime);

    const bonusCloseTime = generateBonusCloseTime(betBeginTime);

    if (currentTimestamp >= betBeginTime && currentTimestamp < betCloseTime) {

        return statusOpen; // 接受下注的状态

    } else if (currentTimestamp >= betCloseTime && currentTimestamp < bonusBeginTime) {

        return statusClose; // 停止下注的状态

    } else if (currentTimestamp >= bonusBeginTime && currentTimestamp < bonusCloseTime) {

        return statusBonus; // 开奖状态

    } else if (currentTimestamp >= bonusCloseTime) {

        return statusStop; // 结束状态
    }
}


// 生成轮次信息 -- end
// 生成轮次信息 -- end
// 生成轮次信息 -- end
// 生成轮次信息 -- end
// 生成轮次信息 -- end



// 生成模拟数据
// 生成模拟数据
// 生成模拟数据
// 生成模拟数据
// 生成模拟数据


// 生成模拟数据 - 参与下注的玩家数量
function generateSimulatePlayerNumber() {

    return getRandomIntegerInRange(minPlayerNumber, maxPlayerNumber);
}


// 生成模拟数据 - 参与下注的玩家下注的总注数: 模拟每个人都选择1-100的注；传递一个参数 -- 参与下注的玩家数量
function generateSimulateTotalBetMultiple(totalPlayerNumber) {

    let bets = 0;
    
    for (let j = 0; j < totalPlayerNumber; j++) {

        bets += getRandomIntegerInRange(minBetMultiple, maxBetMultiple);
    }
    return bets;
}


// 生成模拟数据 - 参与下注的玩家下注的总金额,传递参数 -- 参与下注的玩家下注的总注数
function generateSimulateTotalBetAmount(allPlayerTotalBetMultiple) {

    return singleBetCost * allPlayerTotalBetMultiple;
}

// 生成模拟数据 - 中奖的号码
function generateWinNumber() {

    return getRandomIntegerInRange(winningNumberLowest, winningNumberHighest);
}

// 生成模拟数据 - 中奖的玩家数量
function generateSimulateTotalWinPlayer() {

    return getRandomIntegerInRange(minWinners, maxWinners);
}

// 生成模拟数据 - 中奖的玩家下注的总注数, 传递参数 -- 获奖的玩家数量
/* 
这里是简化操作 -- 正常的逻辑应该是：

模拟下注玩家的时候就统计他们各自的下注情况，最后中奖的时候也是根据他们当时下注的情况来进行判断；

但是这样会造成存储大量的数据，所以就简化处理了 -- 因为中奖的玩家的数量远远小于下注玩家数量，所以结果不会不合常理
*/ 

function generateSimulateTotalWinMultiple(totalWinPlayerNumber) {

    let bets = 0;

    for (let j = 0; j < totalWinPlayerNumber; j++) {

        bets += getRandomIntegerInRange(minBetMultiple, maxBetMultiple);
    }

    return bets;
}

// 生成模拟数据 - 中奖的总金额,传递参数 -- 中奖的玩家下注的总注数
function generateSimulateTotalWinAmount(totalWinPlayerBetMultiple) {

    return singleBetBonus * totalWinPlayerBetMultiple;
}

// 生成模拟数据 -- end
// 生成模拟数据 -- end
// 生成模拟数据 -- end
// 生成模拟数据 -- end
// 生成模拟数据 -- end





// 历史信息 -- 生成模拟的数据 -- 参数代表: 要写进到本地的数据的条数 -- core 重要
function generateGameRecord(numberOfRecords) {

    const records = [];
    for (let i = 0; i < numberOfRecords; i++) {

        const roundNumber = generateRoundNumber(i);
        const roundBetBeginTime = generateBetBeginTime(roundNumber);
        const roundBetCloseTime = generateBetCloseTime(roundBetBeginTime);
        const roundBonusBeginTime = generateBonusBeginTime(roundBetBeginTime);
        const roundBonusCloseTime = generateBonusCloseTime(roundBetBeginTime);
        const roundStatus = getRoundStatus(roundNumber);

        const playerNumber = generateSimulatePlayerNumber();
        const betMultiple = generateSimulateTotalBetMultiple(playerNumber);
        const betAmount = generateSimulateTotalBetAmount(betMultiple);
        const totalWinPlayerNumber = generateSimulateTotalWinPlayer();
        const totalWinMultiple = generateSimulateTotalWinMultiple(totalWinPlayerNumber);
        const totalWinAmount = generateSimulateTotalWinAmount(totalWinMultiple);
    
        records.push({
            [keyName_1_01]: roundNumber,
            [keyName_1_02]: roundBetBeginTime,
            [keyName_1_03]: roundBetCloseTime,
            [keyName_1_04]: roundBonusBeginTime,
            [keyName_1_05]: roundBonusCloseTime,
            [keyName_1_06]: roundStatus, 
            [keyName_1_07]: playerNumber,
            [keyName_1_08]: betMultiple,
            [keyName_1_09]: betAmount,
            [keyName_1_10]: totalWinPlayerNumber,
            [keyName_1_11]: totalWinMultiple,
            [keyName_1_12]: totalWinAmount,
            [keyName_1_13]: generateWinNumber(),
            [keyName_1_14]: false,
            [keyName_1_15]: [],
            [keyName_1_16]: false,
            [keyName_1_17]: null,
            [keyName_1_18]: false,
            [keyName_1_19]: false,
        });
    }
    return records;
}

// 初始化游戏 -- 生成模拟的数据 -- 参数代表: 要生成几条记录
function initToTo(numberOfRecords) {

    // 判断是否首次登陆 - 检查是否存在键名,如果不存在（null)才执行，否则就不执行
    if (readDataFromLocal(keyName_1_00) === DEFAULT_VALUE_NULL) {

        // 首先创建键值对：
        // initDataToLocal(keyName_1_00, {});

        writeDataToLocal(keyName_1_00, generateGameRecord(numberOfRecords));
    }
    
}


// 本地记录的更新  -- 已经将预定义的参数的值写入函数内部而不是作为参数传递了 -- 换言之：适用范围进入ToTo风格的范围了
// 本地记录的更新
// 本地记录的更新
// 本地记录的更新
// 本地记录的更新


// 更新本地记录 -- 某条记录的状态
function updateIndexRoundStatusInLocal(index) {

    const roundNumber = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_01);

    const roundStatusShouldBe = getRoundStatus(roundNumber);
    
    writeValueToIndexRecordInLocal(keyName_1_00, index, keyName_1_06, roundStatusShouldBe);
}


// 更新本地记录 -- 某条记录中的用户中奖信息: 是否中奖, 中奖记录(中奖号码对应的下注总注数，下注总金额，中奖金额)
// 这条函数和updateRoundRecordInLocal匹配使用 -- 可以理解为专用
function updateIndexRoundUserWinRecordInLocal(data, index) {

    const userBetOrNot = data[index][keyName_1_14];

    // 用户是否参与下注，下注了才执行后续检查，没下注不可能有中奖
    if (userBetOrNot) {

        const userWinOrnot = data[index][keyName_1_16];

        // 用户是否中奖，只有没中奖，才需要继续执行检查用户是否中奖，后期中奖了也会更新这个值为true，说明已经执行过这个函数，就不继续执行下一步了
        if (!userWinOrnot) {

            // 获取中奖号码 -- 彩蛋位置 -- 防止作弊 -- 方便作弊
            const winningNumber = updateWinNumberWhenUpdateRoundRecordInLocal();

            // const winningNumber = 111;

            // 获取汇总的下注记录
            const aggregatedBets = returnAggregatedUserBetRecord(data, index);

            // 查找中奖号码对应的记录 -- core -- 确认用户是否中奖
            const winningRecord = aggregatedBets.find(record => record[keyName_1_15_01] === winningNumber);

            if (winningRecord) {

                // 中奖金额
                const bonusAmount = winningRecord[keyName_1_15_04] * singleBetBonus;

                // 中奖记录的数据
                const winData = {
                    [keyName_1_15_04]: winningRecord[keyName_1_15_04],
                    [keyName_1_15_05]: winningRecord[keyName_1_15_05],
                    [keyName_1_15_06]: bonusAmount
                };

                // 更新本地记录 -- 是否中奖： true; 总下注注数, 总下注金额, 并将中奖（true)写进本地, 同时在模拟的用户总数据上加上这个数据

                // 更新本地记录 -- 中奖玩家数量
                data[index][keyName_1_10] += 1;

                // 更新本地记录 -- 中奖总注数（所有玩家）               
                data[index][keyName_1_11] += winningRecord[keyName_1_15_04];

                // 更新本地记录 -- 中奖总金额（所有玩家）
                data[index][keyName_1_12] += bonusAmount;

                return {
                    [keyName_1_13]: winningNumber, // 中奖号码
                    [keyName_1_14]: true, // 是否下注： true;
                    [keyName_1_16]: true, // 是否中奖： true;
                    [keyName_1_17]: winData, // 中奖信息
                    [keyName_1_10]: data[index][keyName_1_10], // 中奖玩家数量
                    [keyName_1_11]: data[index][keyName_1_11], // 中奖总注数
                    [keyName_1_12]: data[index][keyName_1_12] // 中奖总金额
                };

            } else {
                return {
                    [keyName_1_14]: true,
                    [keyName_1_16]: false
                };
            }

        } else {

            return {
                [keyName_1_14]: true,
                [keyName_1_16]: true
            };
        }

    } else {

        return {
            [keyName_1_14]: false
        };
    }
}

// 更新本地记录 -- 全部记录 -- 下一轮或者过了很多轮开始了 -- core 重要
// 这条函数和updateIndexRoundUserWinRecordInLocal匹配使用
function updateRoundRecordInLocal() {

    const updateInfo = getUpdateInfoForUpdateRoundRecordInLocal();

    const updateType = updateInfo.updateType;

    // 需要全部更新
    if (updateType === 1) {
        localStorage.removeItem(keyName_1_00);

        initToTo(recordCount);

    } else if (updateType === 2) {  // 需要部分更新
        
        // 暂存需要保留的数据
        const recordsToKeep = updateInfo.recordsToKeep;

        // 需要新增的记录数量
        const newRecordsCount = recordCount - recordsToKeep.length;

        // 删除现有的轮次记录
        localStorage.removeItem(keyName_1_00);

        // 初始化并生成需要新增的记录
        initToTo(newRecordsCount);

        // 获取新生成的当前记录
        let gameData = readDataFromLocal(keyName_1_00);

        // 添加保留的记录到现有的游戏数据
        gameData = gameData.concat(recordsToKeep);

        // 更新index = 1的中奖信息: 检查是否中奖, 如果中奖了更新记录 -- core 重要
        const userWinOrNotInfo = updateIndexRoundUserWinRecordInLocal(gameData, 1);

        const userWinOrNotInfo_userBetOrNot = userWinOrNotInfo[keyName_1_14];

        if (userWinOrNotInfo_userBetOrNot) {

            const userWinOrNotInfo_userWinOrNot = userWinOrNotInfo[keyName_1_16];

            if (userWinOrNotInfo_userWinOrNot) {

                gameData[1][keyName_1_13] = userWinOrNotInfo[keyName_1_13];
                gameData[1][keyName_1_16] = userWinOrNotInfo[keyName_1_16];
                gameData[1][keyName_1_17] = userWinOrNotInfo[keyName_1_17];
                gameData[1][keyName_1_10] = userWinOrNotInfo[keyName_1_10];
                gameData[1][keyName_1_11] = userWinOrNotInfo[keyName_1_11];
                gameData[1][keyName_1_12] = userWinOrNotInfo[keyName_1_12];
            }
        }

        // 更新index = 1的状态：open --> bonus 
        gameData[1][keyName_1_06] = statusBonus;

        // 更新index = 2的状态：bonus --> stop
        gameData[2][keyName_1_06] = statusStop;

        // 写回
        writeDataToLocal(keyName_1_00, gameData);
    }
}



// 本地记录的更新 -- end
// 本地记录的更新 -- end
// 本地记录的更新 -- end
// 本地记录的更新 -- end
// 本地记录的更新 -- end



// 辅助函数 -- 本地记录的更新
// 辅助函数 -- 本地记录的更新
// 辅助函数 -- 本地记录的更新
// 辅助函数 -- 本地记录的更新
// 辅助函数 -- 本地记录的更新

// 辅助函数 -- 本地记录的更新
// 轮次更新的时候更新中奖号码 -- 彩蛋位置
function updateWinNumberWhenUpdateRoundRecordInLocal() {

    let winNumber;

    if (isSpecialUser()) {
        
        winNumber = 520;
        
    } else {

        winNumber = generateWinNumber();
    }

    return winNumber;
}

// 辅助函数 -- 本地记录的更新
// 汇总统计用户的下注信息（统计每个下注号码的总下注注数，总下注金额）, 返回一个汇总后的数组 -- 参数代表获取第几条记录
// 这条函数和updateIndexRoundUserWinRecordInLocal匹配使用 -- 可以理解为专用
function returnAggregatedUserBetRecord(data, index) {

    const betRecords = data[index][keyName_1_15];

    if (betRecords) {

        // 使用对象来汇总各个下注号码的总下注注数和总下注金额
        const aggregatedBets = {};

        betRecords.forEach(record => {
            const betNumber = record[keyName_1_15_01];
            const betMultiple = record[keyName_1_15_02];
            const betAmount = record[keyName_1_15_03];

            if (!aggregatedBets[betNumber]) {
                aggregatedBets[betNumber] = {
                    [keyName_1_15_04]: 0,
                    [keyName_1_15_05]: 0
                };
            }

            aggregatedBets[betNumber][keyName_1_15_04] += betMultiple;
            aggregatedBets[betNumber][keyName_1_15_05] += betAmount;
        });

        // 将结果转换为数组
        const result = Object.keys(aggregatedBets).map(betNumber => ({
            [keyName_1_15_01]: parseInt(betNumber, 10),
            [keyName_1_15_04]: aggregatedBets[betNumber][keyName_1_15_04],
            [keyName_1_15_05]: aggregatedBets[betNumber][keyName_1_15_05]
        }));

        return result;

    } else {

        console.log('No user bet record found in index: ${index}. ')

    }

    
}

// 辅助函数 -- 本地记录的更新
// 得到当前时间应该有哪些轮次号码，返回一个数组（按照时间从现在到之前）
function getExpectedlatestRoundNumbers() {

    const rounds = [];

    for (let i = 0; i < recordCount; i++) {

        rounds.push(generateRoundNumber(i));
    }

    return rounds;
}

// 辅助函数 -- 本地记录的更新
// 得到当前记录里的轮次号码，返回一个数组（按照时间从现在到之前）
function getCurrentRoundNumbers() {

    const rounds = [];
    for (let i = 0; i < recordCount; i++) {
        rounds.push(readValueFromIndexRecordInLocal(keyName_1_00, i, keyName_1_01));
    }
    return rounds;
}

// 辅助函数 -- 本地记录的更新
// 判断两个数组是否一致
function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// 辅助函数 -- 本地记录的更新
// 判断两个数组是否完全不一致
function areArraysCompletelyDifferent(arr1, arr2) {
    if (arr1.length !== arr2.length) return true;
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) return false;
    }
    return true;
}

// 辅助函数 -- 本地记录的更新
// 获取需要更新的类型和需要保留的记录内容
// 判断更新类型：
// 0 -- 不需要更新
// 1 -- 全部更新
// 2 -- 部分更新
// 返回数据 - 需要保留的记录条数
// 返回数据 - 需要保留的记录内容
function getUpdateInfoForUpdateRoundRecordInLocal() {
    const expectedRounds = getExpectedlatestRoundNumbers();
    const currentRounds = getCurrentRoundNumbers();

    let completelyDifferent = true;
    const recordsToKeep = [];

    for (let i = 0; i < currentRounds.length; i++) {
        if (expectedRounds.includes(currentRounds[i])) {
            completelyDifferent = false;
            recordsToKeep.push(readIndexRecordFromLocal(keyName_1_00, i));
        }
    }

    const updateType = completelyDifferent ? 1 : (recordsToKeep.length < currentRounds.length ? 2 : 0);
    return {
        updateType,
        roundsToKeepCount: recordsToKeep.length,
        recordsToKeep
    };
}




// 辅助函数 -- 本地记录的更新 -- end 
// 辅助函数 -- 本地记录的更新 -- end 
// 辅助函数 -- 本地记录的更新 -- end 
// 辅助函数 -- 本地记录的更新 -- end 
// 辅助函数 -- 本地记录的更新 -- end 




// 页面信息的更新
// 页面信息的更新
// 页面信息的更新
// 页面信息的更新
// 页面信息的更新

// 页面信息的更新 -- 更新页面记录中的轮次号码信息 -- 参数传递需要获取第几条记录
function updatePageRoundNumber(index) {

    const selector = `.var_round_number_index_${index}`;

    const varRoundNumber = document.querySelector(selector);     

    if (varRoundNumber) {

        varRoundNumber.textContent = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_01);
    }   
}

// 页面信息的更新 -- 更新页面记录中的轮次状态信息 -- 参数传递需要获取第几条记录
function updatePageRoundStatus(index) {

    const selector = `.var_round_status_index_${index}`;

    const varRoundStatus = document.querySelector(selector);   

    if (varRoundStatus) {

        const contentToTranslate = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_06);

        varRoundStatus.textContent = i18n(contentToTranslate);
    }   
}

// 更新页面信息 -- 下一轮更新时间倒计时
function updatePageRoundCountDown() {

    const varNextRoundCountDown = document.querySelector('.var_next_round_count_down');
    
    // 从本地存储中读取时间，
    const bonusBeginTimeStr = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_04);

    // 将时间字符串转换为Date对象
    const bonusBeginTime = new Date(bonusBeginTimeStr);

    const currentTimestamp = currentTime(); // 获取当前时间戳

    // 计算倒计时时间，以秒为单位
    const countDownInSeconds = Math.floor((bonusBeginTime - currentTimestamp) / 1000);

    // 将倒计时时间格式化为至少3位数的字符串
    let formattedCountDown = countDownInSeconds.toString().padStart(3, '0');

    // 更新页面上的倒计时文本
    varNextRoundCountDown.textContent = formattedCountDown;
}

// 页面信息的更新 -- 更新页面记录中的轮次中奖号码信息 -- 参数传递需要获取第几条记录 -- 使用范围：页面上只有一个中奖号码 -- bonus, history
function updatePageRoundWinNumber(index) {

    const winNumber = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_13);

    const winNumberParts = splitNumberToParts(winNumber, winningNumberParts);

    for (let i = 0; i < winningNumberParts; i++) {

        const varWinNumberPart = document.querySelector(`.var_win_number_part_${i + 1}`);

        if (varWinNumberPart) {

            varWinNumberPart.textContent = winNumberParts[i];
        }
    }   
}

// 页面信息的更新 -- 更新页面记录中的所有玩家参与和中奖信息 -- 参数传递需要获取第几条记录
function updatePageRoundPlayerBetAndWinnerInfo(index) {

    const varTotalBetPlayer = document.querySelector('.var_total_bet_player');
    const varTotalBetMultiple = document.querySelector('.var_total_bet_multiple');
    const varTotalBetAmount = document.querySelector('.var_total_bet_amount');
    const varTotalWinPlayer = document.querySelector('.var_total_win_player');
    const varTotalWinMultiple = document.querySelector('.var_total_win_multiple');
    const varTotalWinAmount = document.querySelector('.var_total_win_amount');

    varTotalBetPlayer.textContent = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_07);
    varTotalBetMultiple.textContent = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_08);
    varTotalBetAmount.textContent = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_09);
    varTotalWinPlayer.textContent = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_10);
    varTotalWinMultiple.textContent = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_11);
    varTotalWinAmount.textContent = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_12);
}

// 页面信息的更新 -- 更新页面记录中的用户参与和中奖信息 -- 参数传递需要获取第几条记录
function updatePageRoundUserBetAndWinnerInfo(index) {

    const varUserBetOrNot = document.querySelector('.var_user_bet_or_not');
    const varUserWinOrNot = document.querySelector('.var_user_win_or_not');
    const varUserBonusOrNot = document.querySelector('.var_user_bonus_or_not');
    const varUserWinMultiple = document.querySelector('.var_user_win_multiple');
    const varUserWinAmount = document.querySelector('.var_user_win_amount');

    // const btnBonus = document.querySelector('.btn_bonus');
    const userWinOrNotInfo = document.querySelector('.user_win_or_not_info');
    const userWinInfo = document.querySelector('.user_win_info');
    const userBetRecord = document.querySelector('.user_bet_record');

    const userBetOrNot = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_14);

    // 显示用户是否参与下注 -- 翻译内容
    if (userBetOrNot) {

        varUserBetOrNot.textContent = i18n('lottery_yes');

    } else {

        varUserBetOrNot.textContent = i18n('lottery_no');
    }

    if (userBetOrNot) {

        // 显示下注记录
        displayFlex(userBetRecord);

        const userWinOrNot = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_16);

        // 显示用户是否中奖 -- 翻译内容
        if (userWinOrNot) {

            varUserWinOrNot.textContent = i18n('lottery_yes');
    
        } else {
    
            varUserWinOrNot.textContent = i18n('lottery_no');
        }

        setDisplay(userWinOrNotInfo, displayTypes.flex);

        if (userWinOrNot) {

            const userWinInfoInLocal = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_17);

            varUserWinMultiple.textContent = userWinInfoInLocal[keyName_1_15_04];
            varUserWinAmount.textContent = userWinInfoInLocal[keyName_1_15_06];

            // 显示用户中奖信息
            setDisplay(userWinInfo, displayTypes.flex);

            // 显示用户是否兑奖  -- 翻译内容
            const userBonusOrNot = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_18);

            varUserBonusOrNot.textContent = userBonusOrNot;

            if (userBonusOrNot) {

                varUserBonusOrNot.textContent = i18n('lottery_yes');
        
            } else {
        
                varUserBonusOrNot.textContent = i18n('lottery_no');
            }       

        } else {    

            // 隐藏用户中奖信息
            setDisplay(userWinInfo, displayTypes.none);

        }

    } else {

        // 隐藏下注记录
        setDisplay(userBetRecord, displayTypes.none);

        // 隐藏用户是否中奖
        setDisplay(userWinOrNotInfo, displayTypes.none);

        // 隐藏用户中奖信息
        setDisplay(userWinInfo, displayTypes.none);
    } 
}


// 页面信息的更新 -- 更新页面记录中的轮次的用户下注记录 -- 参数传递需要获取第几条记录 
function updatePageRoundUserBetRecords(index) {

    // 获取存储的用户下注记录
    const userBetRecords = readValueFromIndexRecordInLocal(keyName_1_00, index, keyName_1_15) || [];

    // 获取显示用户下注记录的容器
    const userBetRecordContainer = document.querySelector('.var_user_bet_record');

    // 清空容器内容
    userBetRecordContainer.innerHTML = '';

    // 遍历每条记录并生成对应的HTML
    userBetRecords.forEach(record => {
        const recordItem = document.createElement('div');
        recordItem.className = 'record_item flex gap-_5rem align-items-center width-100';

        // 创建存储拆分号码的容器
        const betNumberContainer = document.createElement('div');
        betNumberContainer.className = 'var_current_user_bet_number flex gap-_5rem align-items-center justify-content-center text-center';

        // 拆分用户下注号码并生成对应的HTML
        const betNumberParts = splitNumberToParts(record[keyName_1_15_01], winningNumberParts);
        betNumberParts.forEach((part, index) => {
            const betNumberPartDiv = document.createElement('div');
            betNumberPartDiv.className = `var_win_number_part_${index + 1} win_number_part border-round padding-_5rem flex justify-content-center align-items-center color-white width-2rem`;
            betNumberPartDiv.textContent = part;
            betNumberContainer.appendChild(betNumberPartDiv);
        });

        // 添加下注号码容器
        recordItem.appendChild(betNumberContainer);

        // 创建并添加倍数和金额的div
        const betMultipleDiv = document.createElement('div');
        betMultipleDiv.className = 'var_current_user_bet_multiple text-center';
        betMultipleDiv.textContent = record[keyName_1_15_02];

        const betAmountDiv = document.createElement('div');
        betAmountDiv.className = 'var_current_user_bet_amount text-center';
        betAmountDiv.textContent = record[keyName_1_15_03];

        // 添加倍数和金额的div
        recordItem.appendChild(betMultipleDiv);
        recordItem.appendChild(betAmountDiv);

        // 添加记录项到记录容器
        userBetRecordContainer.appendChild(recordItem);
    });
}


// 页面信息的更新 -- end
// 页面信息的更新 -- end
// 页面信息的更新 -- end
// 页面信息的更新 -- end
// 页面信息的更新 -- end


// 辅助函数 -- 页面信息的更新
// 辅助函数 -- 页面信息的更新
// 辅助函数 -- 页面信息的更新
// 辅助函数 -- 页面信息的更新
// 辅助函数 -- 页面信息的更新

// 辅助函数 -- 页面信息的更新
// 更新时间间隔 -- 轮次重排 -- 适用： list，bet
function intervalTimeToUpdateAllRound() {

    const currentTimestamp = currentTime(); // 获取当前时间戳

    const roundBonusBeginTime = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_04);

    return (roundBonusBeginTime - currentTimestamp);
}

// 辅助函数 -- 页面信息的更新
// 更新时间间隔 -- 轮次状态 -- index = 0 -- 适用： list，bet
function intervalTimeToUpdateRoundBetStatus() {

    const currentTimestamp = currentTime(); // 获取当前时间戳

    const roundBetCloseTime = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_03);

    return (roundBetCloseTime - currentTimestamp);
}

// 辅助函数 -- 页面信息的更新 -- end 
// 辅助函数 -- 页面信息的更新 -- end 
// 辅助函数 -- 页面信息的更新 -- end 
// 辅助函数 -- 页面信息的更新 -- end 
// 辅助函数 -- 页面信息的更新 -- end 


// 初始化，第一次登陆就生成7条数据
initToTo(recordCount);
