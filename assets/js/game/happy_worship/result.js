// 选择元素
const varBaseBonus = document.querySelector('.var_base_bonus');
const varBubbleCount = document.querySelector('.var_bubble_count');
const varTotalBonus = document.querySelector('.var_total_bonus');
const btnBonus = document.querySelector('.btn_bonus');
const popupUserBonusInfo = document.querySelector('.popup_user_bonus_info');
const popupUserBonusInfoBtnGetIt = popupUserBonusInfo.querySelector('.btn_get_it');
const varAddLuckyPoint = document.querySelector('.var_add_lucky_point');




// 函数
// 函数
// 函数
// 函数
// 函数

// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

  const userSelectGod = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

  const userSelectOfferings = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

  const userSelectIncense = readValueFromRecordInLocal(keyName_1_00, keyName_1_03);

  const userEndGame = readValueFromRecordInLocal(keyName_1_00, keyName_1_07);

  if (userSelectGod === DEFAULT_VALUE_NULL || userSelectOfferings === DEFAULT_VALUE_NULL || userSelectIncense === DEFAULT_VALUE_NULL || userSelectGod < 1 || userSelectGod > setGodsNumber || userSelectOfferings.length === 0 || userSelectIncense < 1 || userSelectIncense > 3 || !userEndGame) {

      showPopupMissData();
      
      return false;
  }

  return true;
}

// 更新页面信息
function updatePageInfo() {

  const userClickBubble = readValueFromRecordInLocal(keyName_1_00, keyName_1_06);

  varBaseBonus.textContent = setBonusBaseLuckyPoint;

  varBubbleCount.textContent = userClickBubble;

  varTotalBonus.textContent = userClickBubble + setBonusBaseLuckyPoint;
}

// 更新页面信息 -- 兑奖按钮 -- 点过了就不能在点，没点就可以点
function updateBtnBonusClickable() {

  const userSelectGod = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

  const userSelectOfferings = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

  const userSelectIncense = readValueFromRecordInLocal(keyName_1_00, keyName_1_03);

  const userEndGame = readValueFromRecordInLocal(keyName_1_00, keyName_1_07);

  const userBonusOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_08);

  if (userSelectGod && userSelectOfferings && userSelectIncense && userEndGame && !userBonusOrNot) {

      btnBonus.disabled = false;

      btnBonus.classList.remove('disabled');

      return true;

  } else {

      btnBonus.disabled = true;

      btnBonus.classList.add('disabled');
      
      return false;
  }

}



function initPage() {

  if (isUserJumpToThisPage()) {

    updatePageInfo();
  }
}

initPage();

updateBtnBonusClickable();


// 兑奖按钮
btnBonus.addEventListener('click', () => {

  if (isUserJumpToThisPage()) {

    if (updateBtnBonusClickable()) {

      siteBgmWin.play();
  
      varAddLuckyPoint.textContent = setBonusBaseLuckyPoint + readValueFromRecordInLocal(keyName_1_00, keyName_1_06);
  
      setDisplay(popupUserBonusInfo, displayTypes.flex);

      updateUserLuckyPointToLocal(setBonusBaseLuckyPoint + readValueFromRecordInLocal(keyName_1_00, keyName_1_06));

      

      writeValueToRecordInLocal(keyName_1_00, keyName_1_08, DEFAULT_VALUE_TRUE);
  
      updateBtnBonusClickable();

      updateUserGameTimeToLocal(1);

      // 重置数据
      writeValueToRecordInLocal(keyName_1_00, keyName_1_01, DEFAULT_VALUE_NULL);
      writeValueToRecordInLocal(keyName_1_00, keyName_1_02, DEFAULT_VALUE_NULL);
      writeValueToRecordInLocal(keyName_1_00, keyName_1_03, DEFAULT_VALUE_NULL);
  
      siteBgmWin.stop();

    }
  }

  
  
});


// 点击 popupUserBonusInfo 的 btn_get_it
popupUserBonusInfoBtnGetIt.addEventListener('click', (event) => {

  setDisplay(popupUserBonusInfo, displayTypes.none);

  event.stopPropagation(); // 阻止事件冒泡
}); 