// 解析URL参数，获取记录索引
function getRecordIndexFromURL() {

    const params = new URLSearchParams(window.location.search);

    let recordIndex =  parseInt(params.get('index'));

    // 如果用户私自变更网址中的序号，那么定位到最近的一期（status = stop)
    if (recordIndex < 2 || recordIndex > 6) {

        recordIndex = 2;
    }

    return recordIndex;

}


// 更新页面信息 -- 轮次号码信息 -- index = 
function updatePageRoundStopNumber() {
    const selector = `.var_round_number`;
    const varRoundNumber = document.querySelector(selector);     
    if (varRoundNumber) {
        varRoundNumber.textContent = readValueFromIndexRecordInLocal(keyName_1_00, getRecordIndexFromURL(), keyName_1_01);
    } 
}

// 更新页面信息 -- 中奖号码 -- index = 
function updatePageRoundStopWinNumber() {
    updatePageRoundWinNumber(getRecordIndexFromURL());
}


// 更新页面信息 -- 所有玩家参与和中奖 -- index = 
function updatePageRoundStopPlayerBetAndWinnerInfo() {
    updatePageRoundPlayerBetAndWinnerInfo(getRecordIndexFromURL());
}


/*
按照频次更新：
1. 间隔时间为下一轮刚好产生的时候： 逻辑是算出当前时间和当前轮次的开奖开始时间之间的间隔，这样到点就会产生下一轮
2. 更新的内容有：
2.1 更新本地的全部记录；
2.2 写入对应的记录到相应的html模块 -- 
*/
executeEvery(intervalTimeToUpdateAllRound(), updateRoundRecordInLocal, updatePageRoundStopNumber, updatePageRoundStopWinNumber, updatePageRoundStopPlayerBetAndWinnerInfo);

