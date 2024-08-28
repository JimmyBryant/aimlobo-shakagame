// 选择元素
const formOfferingSelect = document.querySelector('.form_offerings_select');


// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

  const userSelectGod = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

  if (userSelectGod === DEFAULT_VALUE_NULL || userSelectGod < 1 || userSelectGod > setGodsNumber) {

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


formOfferingSelect.addEventListener('submit', (event) => {

  event.preventDefault();

  if(isUserJumpToThisPage()) {

    const selectedOfferings = document.querySelectorAll('input[name="select_offerings"]:checked');

    if (selectedOfferings.length > 0) {

      const offerings = Array.from(selectedOfferings).map((offering) => offering.value);

      writeValueToRecordInLocal(keyName_1_00, keyName_1_02, offerings);

      window.location.href = "../incense";

    } else {

      event.preventDefault();

      siteBgmInvalid.play();

      const userNOSelect = document.querySelector('.user_no_select');

      userNOSelect.click();

    }

    

  }
});


formOfferingSelect.addEventListener('reset', () => {

  formOfferingSelect.reset();

  window.location.href = "../";
});



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end