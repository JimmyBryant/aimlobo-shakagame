// 定义常量

const keyName_1_00 = 'rank';

const pageName = 'list';

const configName_01 = 'update_other_user_info_date';

const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

const classNamePrefix_01 = 'rank_user_lucky_point'; // 页面中的变化主体
const classNamePrefix_02 = 'rank_user_level';
const classNamePrefix_03 = 'rank_user_game_time';
const classNamePrefix_04 = 'rank_user_read_time';

const popupBonus = document.querySelector('.popup_bonus');
const popupBonusBtnGetIt = popupBonus.querySelector('.btn_get_it');
const varPopupBonusRankLuckyPoint = popupBonus.querySelector('.var_popup_bonus_rank_lucky_point');
const varPopupBonusRankUserLevel = popupBonus.querySelector('.var_popup_bonus_rank_user_level');
const varPopupBonusRankGameTime = popupBonus.querySelector('.var_popup_bonus_rank_game_time');
const varPopupBonusRankReadTime = popupBonus.querySelector('.var_popup_bonus_rank_read_time');
const varPopupBonusAddLuckyPoint = popupBonus.querySelector('.var_add_lucky_point');
const varPopupBonusAddUserLevel = popupBonus.querySelector('.var_add_user_level');



// 函数
// 函数
// 函数
// 函数
// 函数

// 更新其他用户的信息 -- 初始化 -- 第一次登录
function returnOtherUserInfoInit() {
    const otherUserData = {};
    const totalUsers = siteDataOtherUserName.length;

    for (let i = 0; i < totalUsers; i++) {
        const userId = i + 1;
        const userAvatar = siteDataOtherUserAvatar[getRandomIntegerInRange(0, siteDataOtherUserAvatar.length - 1)];
        const userName = siteDataOtherUserName[i];
        const userSignature = siteDataOtherUserSignature[i];
        const userLuckyPoint = getRandomIntegerInRange(setMinLuckyPointForOtherUserInit, setMaxLuckyPointForOtherUserInit);
        const userLevel = getRandomIntegerInRange(setMinUserLevelForOtherUserInit, setMaxUserLevelForOtherUserInit);
        const userGameTime = getRandomIntegerInRange(setMinUserGameTimeForOtherUserInit, setMaxUserGameTimeForOtherUserInit);
        const userReadTime = getRandomIntegerInRange(setMinUserReadTimeForOtherUserInit, setMaxUserReadTimeForOtherUserInit);

        otherUserData[userId] = {
            [keyName_0_02_01]: userId,
            [keyName_0_01_02]: userAvatar,
            [keyName_0_01_03]: userName,
            [keyName_0_01_04]: userSignature,
            [keyName_0_01_01]: userLuckyPoint,
            [keyName_0_01_06]: userLevel,
            [keyName_0_01_07]: userGameTime,
            [keyName_0_01_08]: userReadTime
        };
    }

    return otherUserData;
}

// 更新其他用户的信息-- 每天
function returnOtherUserInfoDaily() {

    const existingUserData = readDataFromLocal(keyName_0_02);

    // 如果没有找到用户数据，返回空对象
    if (!existingUserData) {
        return {};
    }

    // 遍历现有用户数据，更新每个用户的信息
    for (const userId in existingUserData) {
        if (existingUserData.hasOwnProperty(userId)) {
            const userData = existingUserData[userId];

            // 生成新的幸运值、等级、游戏次数和阅读次数
            const newLuckyPoint = getRandomIntegerInRange(setMinLuckyPointForOtherUserDaily, setMaxLuckyPointForOtherUserDaily);
            const newUserLevel = getRandomIntegerInRange(setMinUserLevelForOtherUserDaily, setMaxUserLevelForOtherUserDaily);
            const newUserGameTime = getRandomIntegerInRange(setMinUserGameTimeForOtherUserDaily, setMaxUserGameTimeForOtherUserDaily);
            const newUserReadTime = getRandomIntegerInRange(setMinUserReadTimeForOtherUserDaily, setMaxUserReadTimeForOtherUserDaily);

            // 更新用户信息
            userData[keyName_0_01_01] += newLuckyPoint;
            userData[keyName_0_01_06] += newUserLevel;
            userData[keyName_0_01_07] += newUserGameTime;
            userData[keyName_0_01_08] += newUserReadTime;
        }
    }

    // 返回更新后的用户数据
    return existingUserData;
}



// 更新其他用户的信息到本地
// 读取不到 -- 第一次登录 -- 初始化
// 日期不是今天 -- 需要更新
function updateOtherUserInfoToLocal() {

    const updatedDate = readPageConfig(keyName_1_00, pageName, configName_01);

    if (updatedDate === DEFAULT_VALUE_UNDEFINED) {

        writeDataToLocal(keyName_0_02, returnOtherUserInfoInit());

        writePageConfig(keyName_1_00, pageName, configName_01, getFormattedDateWithDash());

    } else if (updatedDate != getFormattedDateWithDash()) {

        // 执行奖励
        // 更新用户在榜单中的上榜名次和奖励信息到页面 -- 如果有值也会写入本地 -- 因为会执行函数
        updateCurrentUserRankingInfoInPage();

        setDisplay(popupBonus,displayTypes.flex);

        writeDataToLocal(keyName_0_02, returnOtherUserInfoDaily());

        writePageConfig(keyName_1_00, pageName, configName_01, getFormattedDateWithDash());

    }
}


// 返回排名前5的用户数据 -- 参数传递类别
/*
'user_lucky_point';
'user_level';
'user_game_time';
'user_read_time';
*/ 
function getTop5UsersByCriteria(criteria) {
    // 读取当前用户信息
    const currentUserData = readDataFromLocal(keyName_0_01);

    // 获取所有其他用户的信息
    const otherUserData = readDataFromLocal(keyName_0_02);

    // 将当前用户信息添加到其他用户信息中
    const allUserData = { ...otherUserData, current_user: currentUserData };

    // 根据指定的criteria对用户进行排序 -- 倒序排列
    const sortedUsers = Object.entries(allUserData).sort(([, userA], [, userB]) => {
        return parseFloat(userB[criteria]) - parseFloat(userA[criteria]);
    });

    // 筛选出前5名用户
    const top5Users = sortedUsers.slice(0, 5).map(([userId, user]) => ({
        userId,
        avatar: user.user_avatar,
        name: user.user_name,
        [criteria]: user[criteria]
    }));

    return top5Users;
}

// 填充数据 -- 参数传递类别，hmtl元素前缀（同样的部分）
function populateRankings(criteria, classNamePrefix) {
    const top5Users = getTop5UsersByCriteria(criteria);

    top5Users.forEach((user, index) => {
        // 获取每个排名项的容器
        const rankItem = document.querySelector(`.${classNamePrefix} .rank_item_${index + 1}`);

        if (rankItem) {
            // 动态添加 user_id_x 类名 -- 方便加入参数跳转到detail
            rankItem.classList.add(`user_id_${user.userId}`);

            // 填充用户头像
            const userAvatar = rankItem.querySelector('.var_rank_user_avatar');
            if (userAvatar) userAvatar.textContent = user.avatar;

            // 填充用户名称
            const userName = rankItem.querySelector('.var_rank_user_name');
            if (userName) userName.textContent = user.name;

            // 填充对应的排名内容
            const userCriteria = rankItem.querySelector(`.var_rank_${criteria}`);
            if (userCriteria) userCriteria.textContent = parseInt(user[criteria]);
        }
    });
}


// 填充所有数据到页面
function updateTop5UserInfoInPage() {

    populateRankings(keyName_0_01_01, classNamePrefix_01);
    populateRankings(keyName_0_01_06, classNamePrefix_02);
    populateRankings(keyName_0_01_07, classNamePrefix_03);
    populateRankings(keyName_0_01_08, classNamePrefix_04);

}


// 获取当前用户在指定分类中的排名
function getCurrentUserRanking() {
    const currentUserId = 'current_user'; // 当前用户ID
    const criteriaList = [
        keyName_0_01_01, // user_lucky_point
        keyName_0_01_06, // user_level
        keyName_0_01_07, // user_game_time
        keyName_0_01_08  // user_read_time
    ];
    const rankings = {};

    criteriaList.forEach(criteria => {
        // 获取前5名用户
        const top5Users = getTop5UsersByCriteria(criteria);

        // 找到当前用户在当前标准中的排名
        const userIndex = top5Users.findIndex(user => user.userId === currentUserId);

        // 如果找到了当前用户
        if (userIndex !== -1) {
            rankings[criteria] = userIndex + 1; // 排名从1开始
        } else {
            rankings[criteria] = DEFAULT_VALUE_NULL; // 如果当前用户不在前5名中
        }
    });

    return rankings;
}


// 计算用户的排名和对应的奖励
/*
参数在site_parameter中已定义
1. 每个榜一奖励50积分；
2. 每个榜二奖励30积分；
3. 每个榜三奖励10积分；
4. 至少双榜第一奖励等级+1；
5. 至少双榜第一奖励50积分；
*/
function bonusCurrentUserRanking() {

    // 获取当前用户在四个分类中的排名
    const rankings = getCurrentUserRanking();

    // 初始化总奖励
    let totalBonusLuckyPoint = 0;
    let totalBonusLevel = 0;

    // 计算积分奖励
    let top1Count = 0; // 记录用户登顶榜单的次数
    Object.keys(rankings).forEach(criteria => {
        const rank = rankings[criteria];
        if (rank === 1) {
            totalBonusLuckyPoint += setBonusLuckyPointForRankTop1;
            top1Count++;
        } else if (rank === 2) {
            totalBonusLuckyPoint += setBonusLuckyPointForRankTop2;
        } else if (rank === 3) {
            totalBonusLuckyPoint += setBonusLuckyPointForRankTop3;
        }
    });

    // 如果用户至少双榜第一，增加等级奖励
    if (top1Count >= 2) {
        totalBonusLevel += setBonuslevelForRankMoreThanOneTop1;
        totalBonusLuckyPoint += setBonusLuckyPointForRankMoreThanOneTop1;
    }

    // 增加幸运分
    updateUserLuckyPointToLocal(totalBonusLuckyPoint);

    // 增加用户等级
    updateUserLevelToLocal(totalBonusLevel);

    // 返回总的奖励结果
    return {
        bonusLuckyPoint: totalBonusLuckyPoint,
        bonusLevel: totalBonusLevel
    };
}

// 更新用户在榜单中的上榜名次和奖励信息到页面 -- 如果有值也会写入本地 -- 因为会执行函数
function updateCurrentUserRankingInfoInPage() {

    varPopupBonusRankLuckyPoint.textContent = getCurrentUserRanking()[keyName_0_01_01];
    varPopupBonusRankUserLevel.textContent = getCurrentUserRanking()[keyName_0_01_06];
    varPopupBonusRankGameTime.textContent = getCurrentUserRanking()[keyName_0_01_07];
    varPopupBonusRankReadTime.textContent = getCurrentUserRanking()[keyName_0_01_08];

    const bonus = bonusCurrentUserRanking();

    varPopupBonusAddLuckyPoint.textContent = bonus.bonusLuckyPoint;
    varPopupBonusAddUserLevel.textContent = bonus.bonusLevel;

}



// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end



// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

// 页面提示 -- 可点击隐藏
clickHideInPageTips();

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

// 更新其他用户的信息到本地 -- 用户上榜的奖励也在这里执行 -- 原理是更新其他用户数据的时候，也就是到了第二天，这个时候就执行
updateOtherUserInfoToLocal();


// 填充所有数据到页面
updateTop5UserInfoInPage();


clickSetDisplay(popupBonusBtnGetIt, popupBonus, displayTypes.none);


// 添加点击事件监听器到所有的rank_item元素 -- 跳转到detail 或者my
document.querySelectorAll('.list_item').forEach(item => {
    item.addEventListener('click', () => {
        // 获取class列表
        const classList = item.classList;

        // 查找包含'user_id_'的class
        const userIdClass = Array.from(classList).find(cls => cls.startsWith('user_id_'));

        if (userIdClass) {
            // 提取user_id_后面的部分
            const userId = userIdClass.replace('user_id_', '');

            // 判断是否为current_user
            if (userId === 'current_user') {
                // 跳转到/my页面
                window.location.href = '../my';
            } else {
                // 跳转到./detail/?index=指定的userId
                window.location.href = `./detail/?index=${userId}`;
            }
        }
    });
});




// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end