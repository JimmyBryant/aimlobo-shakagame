
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

// 用户如果打开窗口但是焦点离开了，这时候就不产生弹幕；免得堆积大量弹幕
document.addEventListener('visibilitychange', handleVisibilityChange);

function initialize() {
    simulateBullet();
    userSendBullet();

    // 将背景音乐播放绑定到用户手势事件
    document.addEventListener('click', function playOnce() {
        playBGM();
        document.removeEventListener('click', playOnce); // 确保只播放一次
    });
}

// 保留这个语句来启动弹幕系统
initialize();

const avatars = ['🏖️', '🏜️', '🏔️', '👩‍💼', '🧑‍🌾', '🧝', '🦁', '🐶', '🐳', '🐲', '🐯', '🧸'];
const texts = [
    "💌 to duo duo 💘",
    "弹幕卡住啦",
    "这是一个模拟弹幕",
    "Hello World!",
    "这是一条测试信息",
    "随机弹幕测试",
    "弹幕系统",
    "更多的测试内容",
    "试试看吧",
    "有趣的弹幕",
    "新的模拟弹幕",
    "这是另外一个测试",
    "大家好！",
    "我是萝卜丝",
    "俺是萝卜丝",
    "ai m lobo, 我是萝卜丝",
    "aimlobo--I'm lobo fans",
    "有点意思",
    "hahaha",
    "干啥呢",
    "都能看到我吗，试试",
    "发现新大陆了",
    "有趣",
    "哈哈",
    "随便写点看看",
    "祝我自己生日快乐",
    "各位萝卜丝们大家好😄",
    "厉害了lobo",
    "funny",
    "interesting site",
    "I'm lobo fans too now",
    "lobo fans, hah",
    "我觉得我应该写额额🤔",
    "张三在此，谁敢横刀立马",
    "法外狂徒张三",
    "You are the ONE",
    "弹幕不够，我来凑凑",
    "hi啊考虑考虑",
    "6666666",
    "9999",
    "6翻了",
    "1111",
    "2222",
    "lobo s",
    "萝卜斯",
    "ONE PIECE",
    "我们的目标是星辰大海",
    "膜拜大佬",
    "幸运值不够了怎么办",
    "站长走开，见过站长夫人orz",
    "這是一個模擬彈幕",
    "Hello World!",
    "這是一條測試信息",
    "隨機彈幕測試",
    "彈幕系統",
    "更多的測試內容",
    "試試看吧",
    "有趣的彈幕",
    "新的模擬彈幕",
    "這是另外一個測試",
    "大家好！",
    "我是蘿蔔絲",
    "俺是蘿蔔絲",
    "ai m lobo, 我是蘿蔔絲",
    "aimlobo--I'm lobo fans",
    "有點意思",
    "hahaha",
    "幹啥呢",
    "都能看到我嗎，試試",
    "發現新大陸了",
    "有趣",
    "哈哈",
    "隨便寫點看看",
    "祝我自己生日快樂",
    "各位蘿蔔絲們大家好😄",
    "厲害了lobo",
    "funny",
    "interesting site",
    "I'm lobo fans too now",
    "lobo fans, hah",
    "我覺得我應該寫額額🤔",
    "張三在此，誰敢橫刀立馬",
    "法外狂徒張三",
    "You are the ONE",
    "彈幕不夠，我來湊湊",
    "hi啊考慮考慮",
    "6666666",
    "9999",
    "6翻了",
    "1111",
    "2222",
    "lobo s",
    "蘿蔔斯",
    "ONE PIECE",
    "我們的目標是星辰大海",
    "膜拜大佬",
    "幸運值不夠了怎麽辦",
    "站長走開，見過站長夫人orz",
    "各位小伙伴们大家好",
    "世界和平",
    "Biu Biu",
    "Biu 🚅",
    "💘🎉🎊🎈",
    "🧧🧧🧧🧧🧧🧧+++++",
    "🧧🧧 +++",
    "岁月静好",
    "往事随风",
    "Amazing, keep going",
    "just do it",
    "Hello lobo fans, nice to meet you all",
    "zzzzzzzZZZ",
    "BGM is good",
    "好听",
    "Singapor say hi",
    "May be I should let you go",
    "HK say hi",
    "湾湾发来贺电",
    "灣灣發來賀電",
    "Taiwan sends greetings",
    "台湾からの挨拶",
    "대만에서 온 인사",
    
    "美国发来贺电",
    "美國發來賀電",
    "USA sends greetings",
    "アメリカからの挨拶",
    "미국에서 온 인사",
    
    "香港发来贺电",
    "香港發來賀電",
    "Hong Kong sends greetings",
    "香港からの挨拶",
    "홍콩에서 온 인사",
    
    "新加坡发来贺电",
    "新加坡發來賀電",
    "Singapore sends greetings",
    "シンガポールからの挨拶",
    "싱가포르에서 온 인사",
    
    "日本发来贺电",
    "日本發來賀電",
    "Japan sends greetings",
    "日本からの挨拶",
    "일본에서 온 인사",
    
    "韩国发来贺电",
    "韓國發來賀電",
    "South Korea sends greetings",
    "韓国からの挨拶",
    "한국에서 온 인사",
    
    "澳大利亚发来贺电",
    "澳大利亞發來賀電",
    "Australia sends greetings",
    "オーストラリアからの挨拶",
    "호주에서 온 인사",
    
    "加拿大发来贺电",
    "加拿大發來賀電",
    "Canada sends greetings",
    "カナダからの挨拶",
    "캐나다에서 온 인사",
    
    "德国发来贺电",
    "德國發來賀電",
    "Germany sends greetings",
    "ドイツからの挨拶",
    "독일에서 온 인사",
    
    "法国发来贺电",
    "法國發來賀電",
    "France sends greetings",
    "フランスからの挨拶",
    "프랑스에서 온 인사",
    
    "英国发来贺电",
    "英國發來賀電",
    "UK sends greetings",
    "イギリスからの挨拶",
    "영국에서 온 인사",
    
    "意大利发来贺电",
    "意大利發來賀電",
    "Italy sends greetings",
    "イタリアからの挨拶",
    "이탈리아에서 온 인사",
    
    "西班牙发来贺电",
    "西班牙發來賀電",
    "Spain sends greetings",
    "スペインからの挨拶",
    "스페인에서 온 인사",
    
    "俄罗斯发来贺电",
    "俄羅斯發來賀電",
    "Russia sends greetings",
    "ロシアからの挨拶",
    "러시아에서 온 인사",
    
    "巴西发来贺电",
    "巴西發來賀電",
    "Brazil sends greetings",
    "ブラジルからの挨拶",
    "브라질에서 온 인사",
    
    "印度发来贺电",
    "印度發來賀電",
    "India sends greetings",
    "インドからの挨拶",
    "인도에서 온 인사",
    
    "墨西哥发来贺电",
    "墨西哥發來賀電",
    "Mexico sends greetings",
    "メキシコからの挨拶",
    "멕시코에서 온 인사",
    
    "南非发来贺电",
    "南非發來賀電",
    "South Africa sends greetings",
    "南アフリカからの挨拶",
    "남아프리카에서 온 인사",
    
    "阿根廷发来贺电",
    "阿根廷發來賀電",
    "Argentina sends greetings",
    "アルゼンチンからの挨拶",
    "아르헨티나에서 온 인사",
    
    "土耳其发来贺电",
    "土耳其發來賀電",
    "Turkey sends greetings",
    "トルコからの挨拶",
    "터키에서 온 인사"
];

function initialize() {
    simulateBullet();
    userSendBullet();

    // 将背景音乐播放绑定到用户手势事件
    document.addEventListener('click', function playOnce() {
        playBGM();
        document.removeEventListener('click', playOnce); // 确保只播放一次
    });
}

function playBGM() {
    const bgm = new Howl({
        src: ["/audio/secret/bullet/6792_1868_41e6_fdf3179017ef8572d7b3a8a428615cfa.mp3"],
        html5: true,
        loop: true,
        volume: 0.3,
    });
    bgm.play();
}

function getRandomAvatar() {
    return avatars[Math.floor(Math.random() * avatars.length)];
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

    const avatar = isUserInput ? readFromLocalStorage('user_avatar') || '🎃' : getRandomAvatar();
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
        const text = texts[Math.floor(Math.random() * texts.length)];
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
                updateTotalLuckyPoint(-0.5);
                writeEventLogLuckyPoint('send biu', -0.5);
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
                    updateTotalLuckyPoint(-0.5);
                    writeEventLogLuckyPoint('send biu', -0.5);
                }
                event.preventDefault(); // 防止回车键的默认行为
            }
        });
    }
}
