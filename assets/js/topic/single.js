

// 函数
// 函数
// 函数
// 函数
// 函数

// 更新用户信息到页面
function updateUserInfoInPage() {

  updateUserAvatarInPage();
  updateUserNameInPage();
  updateUserReadTimeInPage();

}


// 点击阅读+1按钮
function clickBtnReadPlus() {

  const btnReadPlus = document.querySelector('.btn_read_plus');

  if (btnReadPlus) {

      btnReadPlus.addEventListener('click', () => {
  
        const varInterval = document.querySelector('.var_interval_click_btn_read_plus');

        varInterval.textContent = intervalClickBtnReadPlus;

        const lastClickTime = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_12);
        const currentTimestamp = currentTime(); // 获取当前时间戳

        // 检查上次点击时间是否存在，且是否已经超过了间隔时间
        if (!lastClickTime || (currentTimestamp - new Date(lastClickTime)) > intervalClickBtnReadPlus * 1000) {

            updateUserReadTimeToLocal(1);
            
            // 将当前时间以 ISO 格式存储
            writeValueToRecordInLocal(keyName_0_01, keyName_0_01_12, currentTimestamp.toISOString());

            updateUserReadTimeInPage();
        }
      });
  }
}

// 点击post_like按钮
function clickBtnPostLike() {

  const btnPostLike = document.querySelector('.btn_post_like');

  if (btnPostLike) {

    btnPostLike.addEventListener('click', () => {
  
      const varBonus = document.querySelector('.var_bonus_lucky_point_click_btn_post_like');

      const varInterval = document.querySelector('.var_interval_click_btn_post_like');

      varBonus.textContent = bonusLuckyPointClickBtnPostLike;

      varInterval.textContent = intervalClickBtnPostLike;

      const lastClickTime = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_13);
      const currentTimestamp = currentTime(); // 获取当前时间戳

      // 检查上次点击时间是否存在，且是否已经超过了间隔时间
      if (!lastClickTime || (currentTimestamp - new Date(lastClickTime)) > intervalClickBtnPostLike * 1000) {

          updateUserLuckyPointToLocal(bonusLuckyPointClickBtnPostLike);
          
          // 将当前时间以 ISO 格式存储
          writeValueToRecordInLocal(keyName_0_01, keyName_0_01_13, currentTimestamp.toISOString());
      }
    });
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

// 更新用户信息到页面
updateUserInfoInPage();

// 点击阅读+1按钮
clickBtnReadPlus();

// 点击post_like按钮
clickBtnPostLike();

// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end

