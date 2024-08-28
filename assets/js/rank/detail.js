// 选择元素
const varOtherUserAvatar = document.querySelector('.var_other_user_avatar');
const varOtherUserName = document.querySelector('.var_other_user_name');
const varOtherUserSignature = document.querySelector('.var_other_user_signature');
const varOtherUserLuckyPoint = document.querySelector('.var_other_user_lucky_point');
const varOtherUserLevel = document.querySelector('.var_other_user_level');
const varOtherUserGameTime = document.querySelector('.var_other_user_game_time');
const varOtherUserReadTime = document.querySelector('.var_other_user_read_time');

// 解析URL参数，获取记录索引 -- 其他用户的id
function getRecordIndexFromURL() {

    const params = new URLSearchParams(window.location.search);

    let recordIndex =  parseInt(params.get('index'));

    // 如果用户私自变更网址中的序号，那么显示index=0
    if (recordIndex < 1 || recordIndex > (siteDataOtherUserName.length)) {

        recordIndex = 1;
    }

    return recordIndex;

}


// 返回特定其他用户的信息 -- 参数代表其他用户的id
function returnSpecailOtherUserInfo(userId) {

    const otherUserData = readDataFromLocal(keyName_0_02);

    if (otherUserData[userId][keyName_0_02_01] === userId) {

        return otherUserData[userId];
    }
}

// 填充特定其他用户的信息到页面 -- 参数代表其他用户的id
function updateSpecialOtherUserInfoInPage(userId) {

    const specialOtherUserInfo = returnSpecailOtherUserInfo(userId);

    varOtherUserAvatar.textContent = specialOtherUserInfo[keyName_0_01_02];
    varOtherUserName.textContent = specialOtherUserInfo[keyName_0_01_03];
    varOtherUserSignature.textContent = specialOtherUserInfo[keyName_0_01_04];
    varOtherUserLuckyPoint.textContent = specialOtherUserInfo[keyName_0_01_01];
    varOtherUserLevel.textContent = specialOtherUserInfo[keyName_0_01_06];
    varOtherUserGameTime.textContent = specialOtherUserInfo[keyName_0_01_07];
    varOtherUserReadTime.textContent = specialOtherUserInfo[keyName_0_01_08];
}


// 用户成就达成的情况下移除icon透明度
function removeOpacityIfAchievementMatch(keyName, selector) {

    const userInfo = returnSpecailOtherUserInfo(getRecordIndexFromURL())[keyName];
  
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



// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

// 填充特定其他用户的信息到页面 -- 参数代表其他用户的id
updateSpecialOtherUserInfoInPage(getRecordIndexFromURL());

 // 刷新页面上的成就
updateAchievementInPage();

// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end