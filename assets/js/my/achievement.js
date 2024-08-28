const keyName_1_00 = 'my';

const pageName = 'achievement';

const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

// 函数
// 函数
// 函数
// 函数
// 函数



// 用户成就达成的情况下移除icon透明度
function removeOpacityIfAchievementMatch(keyName, selector) {

  const userInfo = readValueFromRecordInLocal(keyName_0_01, keyName);

  const icons = document.querySelectorAll(selector);

  icons.forEach(icon => {

    const idClass = Array.from(icon.classList).find(cls => cls.startsWith('id_'));

    if (idClass) {

      const id = parseInt(idClass.split('_').pop(), 10);

      if (userInfo >= id) {

        icon.classList.remove('opacity-_3');
      }
    }
  });
}

// 刷新页面上的成就
function updateAchievementInPage() {
  removeOpacityIfAchievementMatch(keyName_0_01_01, '.var_achievement_user_lucky_point_icon');
  removeOpacityIfAchievementMatch(keyName_0_01_06, '.var_achievement_user_level_icon');
  removeOpacityIfAchievementMatch(keyName_0_01_07, '.var_achievement_user_game_time_icon');
  removeOpacityIfAchievementMatch(keyName_0_01_08, '.var_achievement_user_read_time_icon');
}


// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end




// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行


// 刷新页面上的成就
updateAchievementInPage();

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







// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end