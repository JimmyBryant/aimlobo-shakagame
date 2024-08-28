const keyName_1_00 = 'topic';

const pageName = 'list';

const configName_01 = 'update_post_like_and_site_visitor_number_date';

const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

// 函数
// 函数
// 函数
// 函数
// 函数

// 更新每天的文章点赞和网站访客数量
function updatePostLikeAndSiteVisitorNumberDaily() {

    const updatedDate =  readPageConfig(keyName_1_00, pageName, configName_01);

  // 读取不到 -- 第一次登录 -- 初始化已经有值了 -- 所以不用再添加 -- 但是要更新：updateDate
  // 日期不是今天 -- 需要更新
  if (updatedDate === DEFAULT_VALUE_UNDEFINED) {

    writePageConfig(keyName_1_00, pageName, configName_01, getFormattedDateWithDash());

  } else if (updatedDate != getFormattedDateWithDash()) {

    const postLikeNumber = readValueFromRecordInLocal(keyName_0_03, keyName_0_03_01);

    const siteVisitorNumber = readValueFromRecordInLocal(keyName_0_03, keyName_0_03_02);

    const addPostLikeNumberDaily = getRandomIntegerInRange(setMinPostLikeNumberForUserDaily, setMaxPostLikeNumberForUserDaily);

    const addSiteVisitorNumberDaily = getRandomIntegerInRange(setMinSiteVisitorNumberForUserDaily, setMaxSiteVisitorNumberForUserDaily);

    writeValueToRecordInLocal(keyName_0_03, keyName_0_03_01, postLikeNumber + addPostLikeNumberDaily);

    writeValueToRecordInLocal(keyName_0_03, keyName_0_03_02, siteVisitorNumber + addSiteVisitorNumberDaily);

    writePageConfig(keyName_1_00, pageName, configName_01, getFormattedDateWithDash());

  }

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


// 更新每天的文章点赞和网站访客数量
updatePostLikeAndSiteVisitorNumberDaily();


// 更新文章点赞数量到本地
updatePostLikeToLocal(getRandomIntegerInRange(setMinPostLikeNumberForUserEveryTime, setMaxPostLikeNumberForUserEveryTime));

// 更新网站访客数量到本地
updateSiteVisitorNumberToLocal(getRandomIntegerInRange(setMinSiteVisitorNumberForUserEveryTime, setMaxSiteVisitorNumberForUserEveryTime));


// 更新文章点赞数量到页面
updatePostLikeInPage();

// 更新网站访客数量到页面
updateSiteVisitorNumberInPage();



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end

