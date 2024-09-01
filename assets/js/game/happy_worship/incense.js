// 选择元素
const formIncenseSelect = document.querySelector('.form_incense_select');


// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

  const userSelectGod = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

  const userSelectOfferings = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

  if (userSelectGod === DEFAULT_VALUE_NULL || userSelectGod < 1 || userSelectGod > setGodsNumber || userSelectOfferings === DEFAULT_VALUE_NULL || userSelectOfferings.length === 0) {

      showPopupMissData();
      
      return false;
  }

  return true;
}



// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行


// 判断用户是否直接跳转到该页面
isUserJumpToThisPage();


formIncenseSelect.addEventListener('submit', (event) => {

  event.preventDefault();

  const selectedIncense = document.querySelector('input[name="select_incense"]:checked');

  if (selectedIncense) {

    const userSelectIncense = parseInt(selectedIncense.value);

    writeValueToRecordInLocal(keyName_1_00, keyName_1_03, userSelectIncense);

    // 跳转到.worship
    window.location.href = "../worship";

  } else {

    siteBgmInvalid.play();

    const userNOSelect = document.querySelector('.user_no_select');

    userNOSelect.click();
  }
});


formIncenseSelect.addEventListener('reset', () => {

  formIncenseSelect.reset();

  window.location.href = "../";
});



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end