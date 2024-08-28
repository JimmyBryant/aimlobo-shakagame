// 选择元素
const formGodSelect = document.querySelector('.form_god_select');

// 初始化游戏数据
function initGameData() {

  const userData = readDataFromLocal(keyName_1_00);

  if (userData === DEFAULT_VALUE_NULL) {

    const data = {

      [keyName_1_01]: 0,
      [keyName_1_02]: DEFAULT_VALUE_NULL,
      [keyName_1_03]: 0,
      [keyName_1_05]: DEFAULT_VALUE_TRUE,
      [keyName_1_06]: 0,
      [keyName_1_07]: DEFAULT_VALUE_FALSE,
      [keyName_1_08]: DEFAULT_VALUE_FALSE
    }

    writeDataToLocal(keyName_1_00, data);

  } else {

    const updateData = {

      [keyName_1_01]: 0,
      [keyName_1_02]: DEFAULT_VALUE_NULL,
      [keyName_1_03]: 0,
      [keyName_1_05]: DEFAULT_VALUE_TRUE,
      [keyName_1_06]: 0,
      [keyName_1_07]: DEFAULT_VALUE_FALSE,
      [keyName_1_08]: DEFAULT_VALUE_FALSE
    }

    writeDataToLocal(keyName_1_00, updateData);

  }
}




// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行


// 初始化游戏数据
initGameData();



formGodSelect.addEventListener('submit', (event) => {

  event.preventDefault();

  const selectedGod = document.querySelector('input[name="select_god"]:checked');

  if (selectedGod) {

    userSelectGod = parseInt(selectedGod.value);

    writeValueToRecordInLocal(keyName_1_00, keyName_1_01, userSelectGod);

    // 跳转到.offering
    window.location.href = "./offering";

  } 

});


formGodSelect.addEventListener('reset', () => {

  siteBgmSelect.play();

  formGodSelect.reset();

  siteBgmSelect.stop();
});




// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end