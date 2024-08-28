// 编辑用户头像
const varUserAvatar = document.querySelector('.var_user_avatar');
const formUserAvatar = document.querySelector('.form_user_avatar');
const popupFormUserAvatar = document.querySelector('.popup_form_user_avatar');

// 读取用户头像
varUserAvatar.textContent = readFromLocalStorage('user_avatar');

clickDisplayFlex(varUserAvatar, popupFormUserAvatar);

formUserAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  const selectedUserAvatar = document.querySelector('input[name="select_user_avatar"]:checked');
  let selectedUserAvatarValue = selectedUserAvatar.value
  if (selectedUserAvatar.value) {
    writeToLocalStorage('user_avatar', selectedUserAvatarValue);
    varUserAvatar.textContent = readFromLocalStorage('user_avatar'); // 更新用户头像
  } 

  hide(popupFormUserAvatar);
});

formUserAvatar.addEventListener('reset', () => {
    formUserAvatar.reset();
    hide(popupFormUserAvatar);
});

// 编辑用户头像 - end

// 编辑用户名称
const varUserName = document.querySelector('.var_user_name');
const formUserName = document.querySelector('.form_user_name');
const popupFormUserName = document.querySelector('.popup_form_user_name');

// 读取用户名
varUserName.textContent = readFromLocalStorage('user_name');

clickDisplayFlex(varUserName, popupFormUserName);

formUserName.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputUserName = document.querySelector('.input_user_name').value;
  if (inputUserName) {
    writeToLocalStorage('user_name', inputUserName);
    varUserName.innerHTML = readFromLocalStorage('user_name'); // 更新用户名
  } 
  
  hide(popupFormUserName);
});

formUserName.addEventListener('reset', () => {
    formUserName.reset();
    hide(popupFormUserName);
});

// 编辑用户名称 - end

// 编辑用户个性签名
const varUserSignature = document.querySelector('.var_user_signature');
const formUserSignature = document.querySelector('.form_user_signature');
const popupFormUserSignature = document.querySelector('.popup_form_user_signature');

// 读取用户个性签名
varUserSignature.textContent = readFromLocalStorage('user_description');

clickDisplayFlex(varUserSignature, popupFormUserSignature);

formUserSignature.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputUserSignature = document.querySelector('.input_user_signature').value;
  if (inputUserSignature) {
    writeToLocalStorage('user_description', inputUserSignature);
    varUserSignature.innerHTML = readFromLocalStorage('user_description'); // 更新用户个性签名
  } 

  hide(popupFormUserSignature);
});

formUserSignature.addEventListener('reset', () => {
    formUserName.reset();
    hide(popupFormUserSignature);
});

// 编辑用户个性签名 - end

// 编辑用户生日
const varUserBirthDate = document.querySelector('.var_user_birth_date');
const formUserBirthDate = document.querySelector('.form_user_birth_date');
const popupFormUserBirthDate = document.querySelector('.popup_form_user_birth_date');

// 读取用户生日
varUserBirthDate.textContent = readFromLocalStorage('user_birthday');

clickDisplayFlex(varUserBirthDate, popupFormUserBirthDate);

formUserBirthDate.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputUserBirthDate = document.querySelector('.input_user_birth_date').value;
  if (inputUserBirthDate) {
    writeToLocalStorage('user_birthday', inputUserBirthDate);
    varUserBirthDate.innerHTML = readFromLocalStorage('user_birthday'); // 更新用户生日
  }

  hide(popupFormUserBirthDate);
});

formUserBirthDate.addEventListener('reset', () => {
    formUserName.reset();
    hide(popupFormUserBirthDate);
});

// 编辑用户生日 - end

// 用户签到
const btnCheckInToday = document.querySelector('.btn_check_in_today');

// 读取签到状态
checkWhetherUserCheckInToday();

// 值是1，代表已经签到，值是其他代表没签到，存储用的值是0表示没签到
function checkWhetherUserCheckInToday() {

  // 通过日期进行校验，联动到状态，也就是说如果判断上次签到日期是今天，那么就已签到，否则为每签到
  const today = getTodayDate();
  const lastCheckInDate = readFromLocalStorage('last_check_in_date');

  if (lastCheckInDate === today) {
    writeToLocalStorage('user_check_in_today', 1);
    btnCheckInToday.disabled = true;
    btnCheckInToday.classList.add('disabled');
  } else {
    writeToLocalStorage('user_check_in_today', 0);
    btnCheckInToday.disabled = false;
    btnCheckInToday.classList.remove('disabled');
  }
}

// 点击签到按钮 -- 能点击，就代表一定还没签到
btnCheckInToday.addEventListener('click', () => {
  
  const today = getTodayDate();
  writeToLocalStorage('last_check_in_date', today);
  checkWhetherUserCheckInToday();

  // 签到成功后，增加10点幸运值，等级+1
  if (isUserDuoDiu()) {
    updateTotalLuckyPoint(1060);
    updateUserLevel(3);
  } else {
    updateTotalLuckyPoint(10);
    updateUserLevel(1);
  }


  // 记录事件
  writeEventLogLuckyPoint('check in today', 10);
  writeEventLogUserLevel('check in today', 1);
  

  // 刷新页面数据
  updatePageTotalLuckyPoint();
  updatePageUserLevel();
  updatePageAchievement();
});

// 用户签到 -- end

// 用户幸运值

// 读取用户当前幸运值
updatePageTotalLuckyPoint();
// 用户幸运值 -- end

// 用户等级

// 读取用户当前等级
updatePageUserLevel();
// 用户等级 -- end

// 游戏次数

// 读取用户当前游戏次数
updatePageUserGameTime();
// 游戏次数 -- end

// 阅读次数

// 读取用户当前阅读次数
updatePageUserReadTime();
// 阅读次数 -- end

// 用户成就

function clickOpenUserAchievement() {

  const btnOpenUserAchievement = document.querySelector('.btn_open_user_achievement');
  const popupUserAchievement = document.querySelector('.popup_user_achievement');
  const btnGetIt = popupUserAchievement.querySelector('.btn_get_it');

  clickDisplayFlex(btnOpenUserAchievement, popupUserAchievement);
  btnGetIt.addEventListener('click', (event) => {
    hide(popupUserAchievement);
    event.stopPropagation(); // 阻止事件冒泡
  });
}



// 用户等级不够的情况让荣誉icon的透明度是0.3，超过的情况下就移除该属性

function removeOpacityIfAchievementMatch(readkey, selector) {
  const userLevel = readFromLocalStorage(readkey);
  const icons = document.querySelectorAll(selector);

  icons.forEach(icon => {
    const idClass = Array.from(icon.classList).find(cls => cls.startsWith('id_'));
    if (idClass) {
      const id = parseInt(idClass.split('_').pop(), 10);
      if (userLevel >= id) {
        icon.classList.remove('opacity-_3');
      }
    }
  });
}

// 刷新页面上的成就
function updatePageAchievement() {
  removeOpacityIfAchievementMatch('total_lucky_point', '.var_achievement_lucky_point_icon');
  removeOpacityIfAchievementMatch('user_level', '.var_achievement_user_level_icon');
  removeOpacityIfAchievementMatch('game_time', '.var_achievement_game_time_icon');
  removeOpacityIfAchievementMatch('read_time', '.var_achievement_read_time_icon');
}

clickOpenUserAchievement();
updatePageAchievement();


// 用户荣誉 -- end


// 今天适合干什么，不适合干什么
renderLuckyForItems();
renderUnluckyForItems();

// 适合干什么
function renderLuckyForItems() {
  // 获取页面语言
  const language = getLanguageFromUrl();

  // 读取本地存储中的lucky_for_items数据
  const luckyForItems = JSON.parse(readFromLocalStorage('lucky_for_items'));

  // 获取目标容器
  const container = document.querySelector('.lucky_for_content');

  // 清空目标容器内容
  container.innerHTML = '';

  // 遍历lucky_for_items数据并生成HTML元素
  luckyForItems.forEach((item, index) => {
    const linkElement = document.createElement('a');
    linkElement.href = `/${language}/${item.link}`;

    // 根据索引计算背景颜色类
    const bgColorClass = `bg-color-0${(index % 4) + 1}`;
    linkElement.className = `text-center padding-_5rem color-white ${bgColorClass} border-radius-_5rem`;
    linkElement.textContent = translate(language, item.name);

    // 添加生成的元素到容器中
    container.appendChild(linkElement);
  });
}

// 不适合干什么
function renderUnluckyForItems() {
  // 获取页面语言
  const language = getLanguageFromUrl();

  // 读取本地存储中的unlucky_for_items数据
  const unluckyForItems = JSON.parse(readFromLocalStorage('unlucky_for_items'));

  // 获取目标容器
  const container = document.querySelector('.unlucky_for_content');

  // 清空目标容器内容
  container.innerHTML = '';

  // 遍历unlucky_for_items数据并生成HTML元素
  unluckyForItems.forEach((item) => {
      const itemElement = document.createElement('div');

      itemElement.className = `text-center padding-_5rem color-black bg-grey-1 border-radius-_5rem cursor-not-allowed`;
      itemElement.textContent = translate(language, item.name);

      // 添加生成的元素到容器中
      container.appendChild(itemElement);
  });
}


// 今天适合干什么，不适合干什么  -- end