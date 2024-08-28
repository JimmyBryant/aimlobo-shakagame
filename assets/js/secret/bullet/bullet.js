
let simulateBulletInterval;


function pauseSimulateBullet() {
    clearInterval(simulateBulletInterval);
}

function resumeSimulateBullet() {
    simulateBullet();
}

function handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
        pauseSimulateBullet();
    } else {
        resumeSimulateBullet();
    }
}


function playBGM() {

    const bgm = newSound('/audio/secret/bullet/6792_1868_41e6_fdf3179017ef8572d7b3a8a428615cfa', true, 0.3);
    bgm.play();
}

function getRandomAvatar() {
    return otherUserAvatars[Math.floor(Math.random() * otherUserAvatars.length)];
}

function getRandomPosition() {
    const maxHeight = window.innerHeight - 40; // 减少40px
    return Math.floor(Math.random() * (maxHeight - 30)) + 'px';
}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function getRandomFontSize() {
    return Math.floor(Math.random() * 29) + 12; // 随机字体大小12到40像素
}

function getRandomSpeed() {
    return Math.floor(Math.random() * 6) + 15; // 随机速度15到20秒
}

function createBullet(text, isUserInput = false) {
    const bulletContainer = document.querySelector('.bullet_container');
    const bulletText = document.createElement('div');
    bulletText.className = 'bullet_content' + (isUserInput ? ' user_input' : '');
    bulletText.style.color = getRandomColor();
    bulletText.style.top = getRandomPosition();
    bulletText.style.fontSize = `${getRandomFontSize()}px`;
    bulletText.style.animationDuration = `${getRandomSpeed()}s`;

    const avatar = isUserInput ? readValueFromRecordInLocal(keyName_0_01, keyName_0_01_02) || '🎃' : getRandomAvatar();
    bulletText.textContent = avatar + '  ' + text;

    bulletContainer.appendChild(bulletText);

    bulletText.addEventListener('animationend', () => {
        bulletText.remove();
    });
}

function sendBullet() {
    const input = document.getElementById('bulletInput');
    const text = input.value.trim();

    if (text === '') return false;

    createBullet(text, true);
    input.value = '';
    return true;
}

function simulateBullet() {
    simulateBulletInterval = setInterval(() => {
        const text = otherUserSendContent[Math.floor(Math.random() * otherUserSendContent.length)];
        createBullet(text);
    }, 1000 / 2); // 每秒产生2个弹幕
}

function userSendBullet() {
    const btnSend = document.querySelector('.btn_send');
    const input = document.getElementById('bulletInput');

    if (btnSend) {
        btnSend.addEventListener('click', (event) => {
            const success = sendBullet();
            if (success) {
                // 记录积分消耗
                // updateTotalLuckyPoint(-0.5);
                // writeEventLogLuckyPoint('send biu', -0.5);
            }
            event.stopPropagation(); // 阻止事件冒泡
        });
    }

    if (input) {
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const success = sendBullet();
                if (success) {
                    // 记录积分消耗
                    // updateTotalLuckyPoint(-0.5);
                    // writeEventLogLuckyPoint('send biu', -0.5);
                }
                event.preventDefault(); // 防止回车键的默认行为
            }
        });
    }
}


function initialize() {
    simulateBullet();
    userSendBullet();

    // 将背景音乐播放绑定到用户手势事件
    document.addEventListener('click', function playOnce() {
        playBGM();
        document.removeEventListener('click', playOnce); // 确保只播放一次
    });
}


initialize();


// 用户如果打开窗口但是焦点离开了，这时候就不产生弹幕；免得堆积大量弹幕
document.addEventListener('visibilitychange', handleVisibilityChange);