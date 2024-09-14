const formShowLove = document.querySelector('.form_show_love_to');

// 初始化用户数据
function initUserData() {

    const userData = readDataFromLocal(keyName_1_00);

    if (userData === DEFAULT_VALUE_NULL) {

        const records = [];

        for (let i = 0; i < setNumberOfWallContent; i++) {

            records.push({

                [keyName_1_01]: DEFAULT_VALUE_NULL,
                [keyName_1_02]: DEFAULT_VALUE_NULL,
                [keyName_1_03]: DEFAULT_VALUE_NULL,
            });
        }

        writeDataToLocal(keyName_1_00, records);
    }

    
}

initUserData();

// 表单处理
formShowLove.addEventListener("submit", (event) => {

    event.preventDefault();

    const userFrom = document.getElementById('user_from').value;

    const userTo = document.getElementById('user_to').value;

    const loveWords = document.getElementById('love_words').value;

    // 读取现有记录
    let records = readDataFromLocal(keyName_1_00);

    // 创建新的记录
    const newData = {
        [keyName_1_01]: userFrom,
        [keyName_1_02]: userTo,
        [keyName_1_03]: loveWords,
    };

    // 插入新记录到数组头部
    records.unshift(newData);

    // 保留最新的10条记录
    if (records.length > setNumberOfWallContent) {
        records.pop(); // 移除最后一条
    }

    // 更新本地存储
    writeDataToLocal(keyName_1_00, records);

    // 给予奖励
    updateUserLuckyPointToLocal(bounsLuckyPoint);
    updateUserGameTimeToLocal(bonusGameTime);

    window.location.href = "../";
    
});

formShowLove.addEventListener('reset', () => {

    window.location.href = "../";

});