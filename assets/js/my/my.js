// 定义常量

const keyName_1_00 = 'my';

const pageName = 'list';

const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

const setGoodOrBadForItemsNumber = 3; // 设置生成几条数据

const configName_01 = 'good_bad_items';

const configName_01_01 = 'good_items';

const configName_01_02 = 'bad_items';

const configName_02 = 'update_good_bad_items_date';



// 选择元素
const varUserAvatar = document.querySelector('.var_user_avatar');
const formUserAvatar = document.querySelector('.form_user_avatar');
const popupFormUserAvatar = document.querySelector('.popup_form_user_avatar');

const varUserName = document.querySelector('.var_user_name');
const formUserName = document.querySelector('.form_user_name');
const popupFormUserName = document.querySelector('.popup_form_user_name');

const varUserSignature = document.querySelector('.var_user_signature');
const formUserSignature = document.querySelector('.form_user_signature');
const popupFormUserSignature = document.querySelector('.popup_form_user_signature');

const varUserBirthDate = document.querySelector('.var_user_birth_date');
const formUserBirthDate = document.querySelector('.form_user_birth_date');
const popupFormUserBirthDate = document.querySelector('.popup_form_user_birth_date');

const varUserGender = document.querySelector('.var_user_gender');
const formUserGender = document.querySelector('.form_user_gender');
const popupFormUserGender = document.querySelector('.popup_form_user_gender');

const btnCheckIn = document.querySelector('.btn_check_in');
const popupBtnCheckIn = document.querySelector('.popup_btn_check_in');
const popupBtnCheckInBtnGetIt = popupBtnCheckIn.querySelector('.btn_get_it');

const varUserLevel = document.querySelector('.var_user_level');
const varUserGameTime = document.querySelector('.var_user_game_time');
const varUserReadTime = document.querySelector('.var_user_read_time');






// 函数
// 函数
// 函数
// 函数
// 函数


// 更新签到按钮状态
function updateBtnCheckIn() {

  const lastCheckInDate = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_09);

  const lastLogInDate = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_10);

  if (lastCheckInDate === null || lastCheckInDate != lastLogInDate) {

    btnCheckIn.disabled = false;
    btnCheckIn.classList.remove('disabled');

  } else {

    btnCheckIn.disabled = true;
    btnCheckIn.classList.add('disabled');

  }
}


// 更新页面上的用户信息
function updateUserInfoInPage() {

  varUserAvatar.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_02);

  varUserName.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_03);

  varUserSignature.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_04);

  varUserBirthDate.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_05);

  varUserGender.textContent = i18n(`${readValueFromRecordInLocal(keyName_0_01, keyName_0_01_14)}`);

  varUserLevel.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_06);

  varUserGameTime.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_07);

  varUserReadTime.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_08);
}

// 更新今天适合，不适合 做什么 到本地 -- 参数传递生成的内容
function updateGoodOrBadForToLocal(goodOrBadContent) {

  const updatedDate =  readPageConfig(keyName_1_00, pageName, configName_02);

  // 读取不到 -- 第一次登录
  // 日期不是今天 -- 需要更新
  if (updatedDate === DEFAULT_VALUE_UNDEFINED || updatedDate != getFormattedDateWithDash()) {

    writePageConfig(keyName_1_00, pageName, configName_01, goodOrBadContent);

    writePageConfig(keyName_1_00, pageName, configName_02, getFormattedDateWithDash());
  }
}



// 生成今天的适合，不适合 做什么
function generateGoodOrBadContent() {

  const goodItems = getRandomItems(siteDataGoodFor, setGoodOrBadForItemsNumber);
  const badItems = getRandomItems(siteDataBadFor, setGoodOrBadForItemsNumber);

  return {
      [configName_01_01]: goodItems,
      [configName_01_02]: badItems,
  };

}

// 辅助函数 -- 洗牌算法 -- 返回随机内容 -- 后附函数解释
/*

功能：
这个函数的作用是从给定的数组 arr 中随机挑选 num 个元素，并返回一个包含这些元素的新数组。
语法和逻辑：
函数参数：

arr：这是一个数组，表示你要从中随机挑选元素的集合。
num：这是一个数字，表示你希望返回的随机元素的个数。
数组排序 (arr.sort()):

arr.sort() 是 JavaScript 中的一个数组排序方法。它接受一个比较函数作为参数，根据比较函数的返回值来排序数组中的元素。
在这个函数中，arr.sort(() => 0.5 - Math.random()) 使用了一个自定义的比较函数。这个比较函数随机返回正值或负值，导致数组中的元素被随机重新排序。
0.5 - Math.random() 的逻辑：

Math.random() 是一个生成 0 到 1 之间的随机数（不包括1）的函数。
0.5 - Math.random() 会生成一个介于 -0.5 到 0.5 之间的随机数。如果这个值大于 0，sort 方法会认为第一个元素应该排在后面；如果小于 0，则认为第一个元素应该排在前面。
这种方式会随机地打乱数组的顺序（称为洗牌算法）。
数组切片 (arr.slice()):

slice() 是 JavaScript 数组的一个方法，用于返回数组的一部分。
arr.slice(0, num) 返回 arr 中从索引 0 开始的 num 个元素。也就是说，它返回了打乱顺序后的前 num 个元素。
代码工作流程：
打乱数组顺序：

arr.sort(() => 0.5 - Math.random()) 随机地打乱数组 arr 的元素顺序。
打乱顺序后，将结果存储在 shuffled 变量中。
获取前 num 个元素：

shuffled.slice(0, num) 提取 shuffled 数组中的前 num 个元素，形成一个新数组。
返回结果：

返回包含 num 个随机元素的数组。
例子：
假设我们有一个数组 [1, 2, 3, 4, 5]，并且我们希望随机选取其中的两个元素：


const result = getRandomItems([1, 2, 3, 4, 5], 2);
arr.sort(() => 0.5 - Math.random()) 可能会将数组打乱为 [4, 1, 3, 2, 5]。
slice(0, 2) 将返回 [4, 1]，这是打乱后数组的前两个元素。
每次运行这个函数，返回的结果都会有所不同，因为排序是随机的。
*/
function getRandomItems(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// 更新今天的适合，不适合 做什么 到页面
function updateGoodOrBadForInpage() {

  const goodOrBadForContent = readPageConfig(keyName_1_00, pageName, configName_01);
  const goodForContent = goodOrBadForContent[configName_01_01];
  const badForContent = goodOrBadForContent[configName_01_02];

  const varGoodFor = document.querySelector('.var_good_for');
  const varBadFor = document.querySelector('.var_bad_for');

  const language = returnLangFromUrl(); // good_for 需要跳转到对应的页面

  if (!varGoodFor || !varBadFor) {
    console.error("Target containers not found");
    return;
  }

  // 清空目标容器内容
  varGoodFor.innerHTML = '';
  varBadFor.innerHTML = '';

  // 创建带链接的元素
  goodForContent.forEach((item, index) => {
    const linkElement = createElementWithClass('a', `/${language}/${item.link}`, `text-center padding-_5rem color-white bg-color-0${(index % 4) + 1} border-radius-_5rem`, i18n(item.name));
    varGoodFor.appendChild(linkElement);
  });

  // 创建没有链接的元素
  badForContent.forEach((item) => {
    const itemElement = createElementWithClass('div', null, 'text-center padding-_5rem color-black bg-grey-1 border-radius-_5rem cursor-not-allowed', i18n(item.name));
    varBadFor.appendChild(itemElement);
  });
}

// 辅助函数：用于创建元素并添加类名和文本内容
function createElementWithClass(tagName, href, className, textContent) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = textContent;
  if (href) {
    element.href = href;
  }
  return element;
}



// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end


// 编辑用户头像


// 读取用户头像


clickSetDisplay(varUserAvatar, popupFormUserAvatar, displayTypes.flex);

formUserAvatar.addEventListener('submit', (event) => {

  event.preventDefault();

  siteBgmSelect.play();

  const selectedUserAvatar = document.querySelector('input[name="select_user_avatar"]:checked');

  let selectedUserAvatarValue = selectedUserAvatar.value

  if (selectedUserAvatar.value) {

    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_02, selectedUserAvatarValue);

    varUserAvatar.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_02); // 更新用户头像
  } 

  formUserAvatar.reset();

  siteBgmSelect.stop();

});

formUserAvatar.addEventListener('reset', () => {

    formUserAvatar.reset();

    setDisplay(popupFormUserAvatar, displayTypes.none);
});

// 编辑用户头像 - end

// 编辑用户名称


// 读取用户名


clickSetDisplay(varUserName, popupFormUserName, displayTypes.flex);

formUserName.addEventListener('submit', (event) => {

  event.preventDefault();

  siteBgmSelect.play();

  const inputUserName = document.querySelector('.input_user_name').value;

  if (inputUserName) {

    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_03, inputUserName);

    varUserName.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_03); // 更新用户名
  } 
  
  formUserName.reset();

  siteBgmSelect.stop();
});

formUserName.addEventListener('reset', () => {

    formUserName.reset();

    setDisplay(popupFormUserName, displayTypes.none);
});

// 编辑用户名称 - end

// 编辑用户个性签名


// 读取用户个性签名


clickSetDisplay(varUserSignature, popupFormUserSignature, displayTypes.flex);

formUserSignature.addEventListener('submit', (event) => {

  event.preventDefault();

  siteBgmSelect.play();

  const inputUserSignature = document.querySelector('.input_user_signature').value;

  if (inputUserSignature) {

    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_04, inputUserSignature);

    varUserSignature.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_04); // 更新用户个性签名
  } 

  formUserSignature.reset();

  siteBgmSelect.stop();
});

formUserSignature.addEventListener('reset', () => {

  formUserSignature.reset();

  setDisplay(popupFormUserSignature, displayTypes.none);
});

// 编辑用户个性签名 - end

// 编辑用户生日


// 读取用户生日


clickSetDisplay(varUserBirthDate, popupFormUserBirthDate, displayTypes.flex);

formUserBirthDate.addEventListener('submit', (event) => {

  event.preventDefault();

  siteBgmSelect.play();

  const inputUserBirthDate = document.querySelector('.input_user_birth_date').value;

  if (inputUserBirthDate) {

    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_05, inputUserBirthDate);

    varUserBirthDate.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_05); // 更新用户生日
  }

  formUserBirthDate.reset();

  siteBgmSelect.play();
});

formUserBirthDate.addEventListener('reset', () => {

  formUserBirthDate.reset();

  setDisplay(popupFormUserBirthDate, displayTypes.none);
});

// 编辑用户生日 - end



// 编辑用户性别


// 读取用户性别


clickSetDisplay(varUserGender, popupFormUserGender, displayTypes.flex);

formUserGender.addEventListener('submit', (event) => {

  event.preventDefault();

  siteBgmSelect.play();

  const userGender = document.querySelector('input[name="choose_gender"]:checked');

  if (userGender) {

    const userGenderValue = userGender.value;

    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_14, userGenderValue);

    varUserGender.textContent = i18n(`${readValueFromRecordInLocal(keyName_0_01, keyName_0_01_14)}`); // 更新用户性别
  }

  formUserGender.reset();

  siteBgmSelect.stop();
});

formUserGender.addEventListener('reset', () => {

  formUserGender.reset();

  setDisplay(popupFormUserGender, displayTypes.none);
});



// 编辑用户性别 - end

// 用户签到按钮


clickSetDisplay(popupBtnCheckInBtnGetIt, popupBtnCheckIn, displayTypes.none);

btnCheckIn.addEventListener('click', () => {

  siteBgmWin.play();

  const userLevel = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_06);

  const varAddLuckyPoint = document.querySelector('.var_add_lucky_point');

  const varAddUserLevel = document.querySelector('.var_add_user_level');

  let addLuckyPoint;

  let addUserLevel;

  // 彩蛋位置

  if (isSpecialUser()) {

    addLuckyPoint = (1060 + userLevel / setBonusAddLuckyPointCheckIn).toFixed(1);

    addUserLevel = 5;

  } else {

     addLuckyPoint = (setBaseAddLuckyPointCheckIn + userLevel / setBonusAddLuckyPointCheckIn).toFixed(1);

     addUserLevel = setBaseAddUSerLevelCheckIn;
  }
  

  varAddLuckyPoint.textContent = addLuckyPoint;

  varAddUserLevel.textContent = addUserLevel;

  updateUserLuckyPointToLocal(addLuckyPoint);

  updateUserLuckyPointInPage();

  updateUserLevelToLocal(addUserLevel);

  updateUserLevelInPage();

  writeValueToRecordInLocal(keyName_0_01, keyName_0_01_09, getFormattedDateWithDash());

  setDisplay(popupBtnCheckIn, displayTypes.flex);

  updateBtnCheckIn();

  siteBgmWin.stop();
});


// 用户签到 -- end




// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行



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


// 更新页面上的用户信息
updateUserInfoInPage();

// 更新签到按钮状态
updateBtnCheckIn();

// 更新今天适合，不适合 做什么 到本地 -- 参数传递生成的内容
updateGoodOrBadForToLocal(generateGoodOrBadContent());


// 更新今天的适合，不适合 做什么 到页面
updateGoodOrBadForInpage();



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end