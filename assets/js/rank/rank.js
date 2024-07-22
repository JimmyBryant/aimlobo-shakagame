// 更新或新增当前用户的信息到random_users的数据集里，方便后期rank排序
function updateCurrentUserInRandomUsers() {
  const userName = readFromLocalStorage('user_name');
  const userDescription = readFromLocalStorage('user_description');
  const userAvatar = readFromLocalStorage('user_avatar');
  const userLuckyPoint = parseInt(readFromLocalStorage('total_lucky_point'));
  const userLevel = parseInt(readFromLocalStorage('user_level'));
  const userGameTime = parseInt(readFromLocalStorage('game_time'));
  const userReadTime = parseInt(readFromLocalStorage('read_time'));

  const currentUser = {
      user_id: 31,
      user_name: userName,
      user_description: userDescription,
      user_avatar: userAvatar,
      total_lucky_point: userLuckyPoint,
      user_level: userLevel,
      game_time: userGameTime,
      read_time: userReadTime
  };

  const users = JSON.parse(readFromLocalStorage('random_users')) || [];

  const currentUserIndex = users.findIndex(user => user.user_id === 31);

  if (currentUserIndex === -1 && users.length < 31) {
      users.push(currentUser);
  } else {
      users[currentUserIndex] = currentUser;
  }

  writeToLocalStorage('random_users', JSON.stringify(users));
}

// 通用渲染排名的函数
function renderTopUsers(containerSelector, sortKey) {
  updateCurrentUserInRandomUsers();

  const container = document.querySelector(containerSelector);
  container.innerHTML = '';

  const users = JSON.parse(readFromLocalStorage('random_users'));

  // 按 sortKey 降序排序
  users.sort((a, b) => b[sortKey] - a[sortKey]);

  // 获取前5名用户
  const topUsers = users.slice(0, 5);

  topUsers.forEach((user, index) => {

      const userId = user.user_id;
      const userElement = document.createElement('div');
      userElement.className = `rank_item_${index + 1} user_id_${userId} flex gap-1rem align-items-center justify-content-center border-radius-_5rem padding-tb-_5rem padding-lr-1rem`;

      const rankNumberElement = document.createElement('div');
      rankNumberElement.className = `rank_number_${index + 1} font-size-1_2 flex align-items-center justify-content-center padding-_5rem border-round width-2rem height-2rem bg-grey-1`;

      // 设置奖牌图标或排名数字
      if (index === 0) {
          rankNumberElement.textContent = '🥇';
      } else if (index === 1) {
          rankNumberElement.textContent = '🥈';
      } else if (index === 2) {
          rankNumberElement.textContent = '🥉';
      } else {
          rankNumberElement.textContent = index + 1;
      }

      const avatarElement = document.createElement('div');
      avatarElement.className = 'font-size-1_2';
      avatarElement.textContent = user.user_avatar;

      const userNameElement = document.createElement('div');
      userNameElement.className = 'width-8rem overflow-hidden';
      userNameElement.textContent = user.user_name;

      const userValueElement = document.createElement('div');
      userValueElement.className = 'text-left width-4rem';
      userValueElement.textContent = user[sortKey];

      userElement.appendChild(rankNumberElement);
      userElement.appendChild(avatarElement);
      userElement.appendChild(userNameElement);
      userElement.appendChild(userValueElement);

      // 添加点击事件监听器
      userElement.addEventListener('click', () => showUserInfo(userId));

      container.appendChild(userElement);
  });
}

// 更新排名前五的幸运值
renderTopUsers('.var_rank_lucky_point', 'total_lucky_point');

// 更新排名前五的等级
renderTopUsers('.var_rank_user_level', 'user_level');

// 更新排名前五的游戏次数
renderTopUsers('.var_rank_game_time', 'game_time');

// 更新排名前五的阅读次数
renderTopUsers('.var_rank_read_time', 'read_time');

// 显示用户信息卡
function showUserInfo(userId) {
  const users = JSON.parse(readFromLocalStorage('random_users'));
  const user = users.find(user => user.user_id === userId);

  if (user) {
      document.querySelector('.user_info_card_user_avatar').textContent = user.user_avatar;
      document.querySelector('.user_info_card_user_name').textContent = user.user_name;
      document.querySelector('.user_info_card_user_description').textContent = user.user_description;
      document.querySelector('.user_info_card_lucky_point').textContent = user.total_lucky_point;
      document.querySelector('.user_info_card_user_level').textContent = user.user_level;
      document.querySelector('.user_info_card_game_time').textContent = user.game_time;
      document.querySelector('.user_info_card_read_time').textContent = user.read_time;

      // 显示用户信息卡片
      document.querySelector('.popup_user_info_card').style.display = 'flex';
  }
}

// 隐藏用户信息卡片
document.querySelector('.btn_get_it').addEventListener('click', () => {
  document.querySelector('.popup_user_info_card').style.display = 'none';
});
