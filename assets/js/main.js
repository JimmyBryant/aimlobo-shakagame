// functions
function hide(element) {
    element.style.display = "none";
}

function displayFlex(element) {
    element.style.display = "flex";
}

function displayBlock(element) {
    element.style.display = "block";
}

function displayGrid(element) {
    element.style.display = "grid";
}

function clickDisplayBlock(trigger, target) {
    trigger.addEventListener('click', () => displayBlock(target));
}

function clickDisplayFlex(trigger, target) {
    trigger.addEventListener('click', () => displayFlex(target));
}

function clickDisplayGrid(trigger, target) {
    trigger.addEventListener('click', () => displayGrid(target));
}

function clickHide(trigger, target) {
    trigger.addEventListener('click', () => hide(target));
}

//toggle mobile menu
function clickToggleMobileMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');

    menuIcon.addEventListener('click', function (event) {
        menu.classList.toggle('active');
        event.stopPropagation();
    });
}

// toggle popupTips: 包裹在tips_icon下边，点击.tips_icon后显示
function clickTogglePopupTips() {
    const tipsIcons = document.querySelectorAll('.tips_icon');
    for (const tipsIcon of tipsIcons) {
        const popupTips = tipsIcon.querySelector('.popup_tips');
        const btnGetIt = popupTips.querySelector('.btn_get_it');

        clickDisplayFlex(tipsIcon, popupTips);
        btnGetIt.addEventListener('click', (event) => {
            hide(popupTips);
            event.stopPropagation(); // 阻止事件冒泡
        });   
      }
}

// toggle popupInfoBtn: 包裹在info_icon_btn下边，与info_icon的区别是需要用户点击按钮来关闭信息
function clickTogglePopupInfoBtn() {
    const InfoIconsBtn = document.querySelectorAll('.info_icon_btn');
    for (const InfoIconBtn of InfoIconsBtn) {
        const popupTips = InfoIconBtn.querySelector('.popup_tips');
        const btnGetIt = popupTips.querySelector('.btn_get_it');

        clickDisplayFlex(InfoIconBtn, popupTips);
        btnGetIt.addEventListener('click', (event) => {
            hide(popupTips);
            event.stopPropagation(); // 阻止事件冒泡
        });   
      }
}

// toggle popupInfo: 包裹在info_icon下边，展示信息3s后关闭
function clickOpenPopupInfo() {
    const infoIcons = document.querySelectorAll('.info_icon');
    for (const infoIcon of infoIcons) {
        const popupInfo = infoIcon.querySelector('.popup_info');
        infoIcon.addEventListener('click', (event) => {
            displayFlex(popupInfo);
            event.stopPropagation(); // 阻止事件冒泡
            setTimeout(() => hide(popupInfo), 3000);
        });
        
      }
}

// 弹出一朵玫瑰花
clickOpenPopupRose();
function clickOpenPopupRose() {
    const roseIcon = document.querySelector('.rose_icon');

    if (roseIcon) {
        const popupRose = roseIcon.querySelector('.popup_rose');

        clickDisplayFlex(roseIcon, popupRose);
        fillContentRose();
        popupRose.addEventListener('click', (event) => {
            hide(popupRose);
            event.stopPropagation(); // 阻止事件冒泡
        });
    }
}

// 填充玫瑰花到网页
function fillContentRose() {
    const contentRose = document.querySelector('.content_rose');
    
    if (contentRose) {
        
        const canvas = contentRose.querySelector('.canvas_rose');
        canvas.innerHTML = '';
        
        var c = canvas;
        var a = c.getContext('2d');
        c.width = c.height = f = 600;
        var h = -250;
        document.body.clientWidth; 

        with(m=Math)C=cos,S=sin,P=pow,R=random;

        function p(a, b, c) {
            if (c > 60) return [S(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) - S(b) * 50, b * f + 50, 625 + C(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) + b * 400, a * 1 - b / 2, a];
            A = a * 2 - 1;
            B = b * 2 - 1;
            if (A * A + B * B < 1) {
                if (c > 37) {
                    n = (j = c & 1) ? 6 : 4;
                    o = .5 / (a + .01) + C(b * 125) * 3 - a * 300;
                    w = b * h;
                    return [o * C(n) + w * S(n) + j * 610 - 390, o * S(n) - w * C(n) + 550 - j * 350, 1180 + C(B + A) * 99 - j * 300, .4 - a * .1 + P(1 - B * B, -h * 6) * .15 - a * b * .4 + C(a + b) / 5 + P(C((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B), o / 1e3 + .7 - o * w * 3e-6];
                }
                if (c > 32) {
                    c = c * 1.16 - .15;
                    o = a * 45 - 20;
                    w = b * b * h;
                    z = o * S(c) + w * C(c) + 620;
                    return [o * C(c) - w * S(c), 28 + C(B * .5) * 99 - b * b * b * 60 - z / 2 - h, z, (b * b * .3 + P((1 - (A * A)), 7) * .15 + .3) * b, b * .7];
                }
                o = A * (2 - b) * (80 - c * 2);
                w = 99 - C(A) * 120 - C(b) * (-h - c * 4.9) + C(P(1 - b, 7)) * 50 + c * 2;
                z = o * S(c) + w * C(c) + 700;
                return [o * C(c) - w * S(c), B * 99 - C(P(b, 7)) * 50 - c / 3 - z / 1.35 + 450, z, (1 - b / 1.2) * .9 + a * .1, P((1 - b), 20) / 4 + .05];
            }
        }

        setInterval(function () {
            for (i = 0; i < 1e4; i++) {
                if (s = p(R(), R(), i % 46 / .74)) {
                    z = s[2];
                    x = ~~(s[0] * f / z - h);
                    y = ~~(s[1] * f / z - h);
                    if (!m[q = y * f + x] | m[q] > z) {
                        m[q] = z;
                        a.fillStyle = "rgb(" + ~(s[3] * h) + "," + ~(s[4] * h) + "," + ~(s[3] * s[3] * -80) + ")";
                        a.fillRect(x, y, 1, 1);
                    }
                }
            }
        }, 0);
    }
}




// 让用户可以通过点击popup box之外的地方来关闭popup box.
window.onclick = function (event) {
    const popupBoxs = document.querySelectorAll('.popup_box');
    for (const popupBox of popupBoxs) {
        if (event.target == popupBox) {
            hide(popupBox);
          }
    }
  };


// 让用户可以通过点击btn_get_it_no_affect之外的地方来关闭popup box.
window.onclick = function (event) {
    const popupBoxs = document.querySelectorAll('.popup_box');
    for (const popupBox of popupBoxs) {
        if (event.target == popupBox) {
            hide(popupBox);
          }
    }
  };

// 用户点击分享按钮,复制本网站的网址，可以个性化一点：首先是复制内容到剪贴板，然后弹出提示框，并给予2点幸运值奖励
function clickShareButton() {
    const shareButton = document.querySelector('.btn_share');
    
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            const lastClickTime = localStorage.getItem('last_click_share_button');
            const currentTime = new Date().getTime();

            shareThisSite();

            // 检查时间间隔，超过1分钟才给积分
            if (!lastClickTime || (currentTime - lastClickTime) > 60000) {
                updateTotalLuckyPoint(2);
                writeEventLogLuckyPoint('click share button', 2);
                // 更新本地存储的点击时间
                writeToLocalStorage('last_click_share_button', currentTime);
            }
        });
    }
}

clickShareButton();


function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function shareThisSite() {
    const enCopyContent = "Check this out! 🚀 Visit aimlobo.com for amazing content!";
    const zhCnCopyContent = "我刚发现了一个有趣的网站！🚀 访问 aimlobo.com 获取精彩内容！";
    const zhTwCopyContent = "我剛發現了一個有趣的網站！🚀 訪問 aimlobo.com 獲取精彩內容！";

    const lang = getLanguageFromUrl(); // 获取当前语言，例如 'en', 'zh-cn', 'zh-tw'

    let textToCopy = '';

    switch (lang) {
        case 'en':
            textToCopy = enCopyContent;
            break;
        case 'zh-cn':
            textToCopy = zhCnCopyContent;
            break;
        case 'zh-tw':
            textToCopy = zhTwCopyContent;
            break;
        default:
            textToCopy = enCopyContent; // 默认使用英文内容
    }

    copyToClipboard(textToCopy);
}

// 用户点击阅读+1, topic single
clickReadPlusOneButton();
function clickReadPlusOneButton() {
    const btn = document.querySelector('.btn_read_plus_one');
    
    if (btn) {
        btn.addEventListener('click', function() {
            const lastClickTime = localStorage.getItem('last_click_read_plus_one_button');
            const currentTime = new Date().getTime();

            // 检查时间间隔，超过1分钟之后的点击才会再次计入阅读次数
            if (!lastClickTime || (currentTime - lastClickTime) > 60000) {
                updateReadTime(1);
                updatePageUserReadTime();
                // 更新本地存储的点击时间
                writeToLocalStorage('last_click_read_plus_one_button', currentTime);
            }
        });
    }
}

// 用户点赞, topic single
clickLikeButton();
function clickLikeButton() {
    const btn = document.querySelector('.btn_like');
    
    if (btn) {
        btn.addEventListener('click', function() {
            const lastClickTime = localStorage.getItem('last_click_like_button');
            const currentTime = new Date().getTime();

            // 检查时间间隔，超过1分钟之后的点击才会再次计入阅读次数
            if (!lastClickTime || (currentTime - lastClickTime) > 60000) {
                updateTotalLuckyPoint(0.5);
                writeEventLogLuckyPoint('click like button', 0.5)
                // 更新本地存储的点击时间
                writeToLocalStorage('last_click_like_button', currentTime);
            }
        });
    }
}




clickToggleMobileMenu();
clickTogglePopupTips();
clickTogglePopupInfoBtn();
clickOpenPopupInfo();

// 翻译内容，前边是id，后边是对应语种的翻译内容
const i18n = {
    game: {
        'en': 'game',
        'zh-cn': '游戏',
        'zh-tw': '遊戲'
    },
    read: {
        'en': 'read',
        'zh-cn': '阅读',
        'zh-tw': '閱讀'
    },
    personalized_signature: {
        'en': 'personalized signature',
        'zh-cn': '个性签名',
        'zh-tw': '個性簽名'
    },
    username: {
        'en': 'username',
        'zh-cn': '用户名',
        'zh-tw': '用戶名'
    },
    happy: {
        'en': 'happy',
        'zh-cn': '快乐',
        'zh-tw': '快樂'
    },
    exercise: {
        'en': 'exercise',
        'zh-cn': '运动',
        'zh-tw': '運動'
    },
    sports: {
        'en': 'sports',
        'zh-cn': '运动',
        'zh-tw': '運動'
    },
    dating: {
        'en': 'dating',
        'zh-cn': '约会',
        'zh-tw': '約會'
    },
    laugh: {
        'en': 'laugh',
        'zh-cn': '大笑',
        'zh-tw': '大笑'
    },
    rich: {
        'en': 'rich',
        'zh-cn': '暴富',
        'zh-tw': '暴富'
    },
    match: {
        'en': 'match',
        'zh-cn': '配对',
        'zh-tw': '配對'
    },
    healthy: {
        'en': 'healthy',
        'zh-cn': '健康',
        'zh-tw': '健康'
    },
    show_love: {
        'en': 'Show love',
        'zh-cn': '表白',
        'zh-tw': '表白'
    },
    cry: {
        'en': 'cry',
        'zh-cn': '哭泣',
        'zh-tw': '哭泣'
    },
    sad: {
        'en': 'sad',
        'zh-cn': '难过',
        'zh-tw': '難過'
    },
    disappointment: {
        'en': 'disappointment',
        'zh-cn': '失望',
        'zh-tw': '失望'
    },
    poor: {
        'en': 'poor',
        'zh-cn': '贫穷',
        'zh-tw': '貧窮'
    },
    squabble: {
        'en': 'squabble',
        'zh-cn': '争吵',
        'zh-tw': '爭吵'
    },
    fight: {
        'en': 'fight',
        'zh-cn': '打斗',
        'zh-tw': '打斗'
    },
    mad: {
        'en': 'mad',
        'zh-cn': '生气',
        'zh-tw': '生氣'
    },
    waste_time: {
        'en': 'waste time',
        'zh-cn': '浪费时间',
        'zh-tw': '浪費時間'
    },
    exhausted: {
        'en': 'exhausted',
        'zh-cn': '疲惫',
        'zh-tw': '疲憊'
    },
    risky_behavior: {
        'en': 'risky behavior',
        'zh-cn': '危险行为',
        'zh-tw': '危險行為'
    },
    // 更多的id和对应的翻译
};

// 翻译函数，接收两个参数：语言和id
function translate(language, id) {
    const translation = i18n[id];
    if (translation) {
        return translation[language] || translation.en; // 如果当前语言没有翻译，返回英文
    } else {
        return id; // 如果找不到id，返回id本身
    }
}

// 初始化数据到本地
function initializeLocalStorageKey(key, initialValue) {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, initialValue);
    }
}

// 写入数据到本地
function writeToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

// 读取本地数据
function readFromLocalStorage(key) {
    return localStorage.getItem(key);
}

// 得到随机数
function getRandomValueInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// 获取今天的日期并格式化为字符串（如 "YYYY-MM-DD"）
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(today.getDate()).padStart(2, '0'); // 获取日期并确保是两位数
    return `${year}-${month}-${day}`;
}

// 获取昨天的日期并格式化为字符串（如 "YYYY-MM-DD"）
function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 将日期减去一天
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    const day = String(yesterday.getDate()).padStart(2, '0'); // 获取日期并确保是两位数
    return `${year}-${month}-${day}`;
}

// 定义：适合干什么，不适合干什么
let luckyForItems;
let unluckyForItems;

// 随机内容：lucky_for , unlucky_for
const dataItemsCollection = {
    // 适合做什么：数据结构是：name,link --->name表示展示在页面上的内容，link是给到<a>元素的href
    luckyForItems: [
        { name: 'game', link: 'game' },
        { name: 'happy', link: 'game/happy_worship' },
        { name: 'exercise', link: 'game/wooden_fish' },
        { name: 'show_love', link: 'secret/bullet' },
        { name: 'read', link: 'topic' },
        { name: 'dating', link: 'topic' },
        { name: 'laugh', link: 'rank' },
        { name: 'rich', link: 'secret' },
        { name: 'match', link: 'game/flying_book' },
        { name: 'healthy', link: 'topic' }
    ],
    // 不适合做什么：数据结构是：name,link --->name表示展示在页面上的内容，这里的link无效，因为没用上
    unluckyForItems: [
        { name: 'cry', link: 'cry' },
        { name: 'sad', link: 'sad' },
        { name: 'disappointment', link: 'disappointment' },
        { name: 'poor', link: 'poor' },
        { name: 'fight', link: 'fight' },
        { name: 'squabble', link: 'squabble' },
        { name: 'mad', link: 'mad' },
        { name: 'waste_time', link: 'waste_time' },
        { name: 'exhausted', link: 'exhausted' },
        { name: 'risky_behavior', link: 'risky_behavior' }
    ],
    
};


// 生成随机用户的信息
function generateRandomUsers() {
    const userLuckyPoint = parseInt(readFromLocalStorage('total_lucky_point'));
    const userLevel = parseInt(readFromLocalStorage('user_level'));
    const userGameTime = parseInt(readFromLocalStorage('game_time'));
    const userReadTime = parseInt(readFromLocalStorage('read_time'));

    const enNames = ['Tom and Jery', '_feelgood', 'John2469', 'aimlobo_username', 'Rojin_04', 'Jessica', 'Linda here', 'James go go', 'love and happiness', 'nobody342'];
    const zhCnNames = ['小小', '堕落的神话', '萝卜仔', 'aimlobo_用户名', '烟草的残香', '激浊扬清', '黄静fen', '朕很萌', '佛本是善', '好运lucky🥰'];
    const zhTwNames = ['二十四橋明月夜', '天選之人', '我愛吃叉燒', 'aimlobo_用戶名', '溫柔泛濫', '隨便寫的名字', '有朋自遠方來', '好事成雙', '浪漫是一種生活', '趙麗'];
    const avatars = ['🏖️', '🏜️', '🏔️', '👩‍💼', '🧑‍🌾', '🧝', '🦁', '🐶', '🐳', '🐲', '🐯', '🧸'];

    const descriptions = [
        // 英文描述
        "Love for all, hatred for none.",
        "Change the world by being yourself.",
        "Every moment is a fresh beginning.",
        "Never regret anything that made you smile.",
        "Die with memories, not dreams.",
        "Aspire to inspire before we expire.",
        "Whatever you do, do it well.",
        "What we think, we become.",
        "All limitations are self-imposed.",
        "Problems are not stop signs.",
        // 简体中文描述
        "我爱自由和梦想",
        "生活充满了惊喜",
        "心怀感恩，生活更美好",
        "快乐是一种选择",
        "奋斗是成功的唯一途径",
        "幸福在于追求",
        "活在当下",
        "笑对人生",
        "坚持就是胜利",
        "每一天都是新的开始",
        // 繁体中文描述
        "生活是個奇蹟",
        "心想事成",
        "知足常樂",
        "努力不懈，成就未來",
        "心態決定一切",
        "熱愛生活",
        "微笑面對每一天",
        "保持樂觀",
        "珍惜眼前人",
        "心有多大，舞台就有多大"
    ];

    const users = [];

    function getRandomAvatar() {
        const randomIndex = Math.floor(Math.random() * avatars.length);
        return avatars[randomIndex];
    }

    function getRandomDescription() {
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    }

    function generateUser(name, id) {
        return {
            user_id: id,
            user_name: name,
            user_avatar: getRandomAvatar(),
            user_description: getRandomDescription(),
            total_lucky_point: 0,
            user_level: 0,
            game_time: 0,
            read_time: 0
        };
    }

    function getRandomValueInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 一部分用户的数据大于当前用户的值
    function assignValuesGreaterThan(user) {
        user.total_lucky_point = getRandomValueInRange(500, 5000);
        user.user_level = getRandomValueInRange(50, 150);
        user.game_time = getRandomValueInRange(150, 1000);
        user.read_time = getRandomValueInRange(150, 600);
    }

    // 一部分用户的数据小于当前用户的值
    function assignValuesLessThan(user) {
        // 确保 userLuckyPoint, userLevel, userGameTime, userReadTime 至少为 1
        const min = 1;
        user.total_lucky_point = getRandomValueInRange(min, Math.max(120, userLuckyPoint - 1));
        user.user_level = getRandomValueInRange(min, Math.max(55, userLevel - 1));
        user.game_time = getRandomValueInRange(min, Math.max(230, userGameTime - 1));
        user.read_time = getRandomValueInRange(min, Math.max(110, userReadTime - 1));
    }

    let idCounter = 1;

    enNames.forEach(name => {
        users.push(generateUser(name, idCounter++));
    });

    zhCnNames.forEach(name => {
        users.push(generateUser(name, idCounter++));
    });

    zhTwNames.forEach(name => {
        users.push(generateUser(name, idCounter++));
    });

    // 打乱用户数组以确保名字和头像分布随机
    for (let i = users.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [users[i], users[j]] = [users[j], users[i]];
    }

    // 分配数值：一个随机数（5-10）
    const randomNumber10 = getRandomValueInRange(5, 10);
    users.slice(0, randomNumber10).forEach(assignValuesGreaterThan);
    users.slice(randomNumber10).forEach(assignValuesLessThan);

    writeToLocalStorage('random_users', JSON.stringify(users));
}


// 更新随机用户的信息
function updateRandomUsersInfo() {
    const users = JSON.parse(readFromLocalStorage('random_users'));

    users.slice(0, 30).forEach(user => {
        user.total_lucky_point += getRandomValueInRange(100, 800);
        user.user_level += getRandomValueInRange(1, 3);
        user.game_time += getRandomValueInRange(50, 200);
        user.read_time += getRandomValueInRange(10, 50);
    });

    writeToLocalStorage('random_users', JSON.stringify(users));
}

// 初始化用户系统， 检测是否初次登陆网站，如果是的话，就初始化值：幸运积分，用户头像，用户名，签名，生日，等级 -- 这些内容的更新在my.js里设置
function initializeUserSystem() {
    // 检查是否已经存在 lucky_for_items 和 unlucky_for_items
    let luckyItems = readFromLocalStorage('lucky_for_items');
    let unluckyItems = readFromLocalStorage('unlucky_for_items');

    if (!luckyItems || !unluckyItems) {
        // 不存在则进行初始化
        initializeLocalStorageKey('lucky_for_items', getRandomDataItems('luckyForItems', 3, 'lucky_for_items')); //适合干什么
        initializeLocalStorageKey('unlucky_for_items', getRandomDataItems('unluckyForItems', 3, 'unlucky_for_items')); //不适合干什么
    }

    // 检查是否已经存在 random_users --用在rank 页面
    let randomUsers = readFromLocalStorage('random_users');

    if (!randomUsers) {
        // 不存在则进行初始化
        initializeLocalStorageKey('random_users', generateRandomUsers()); 
    }

    // 用户系统，幸运积分，用户头像，用户名，签名，生日，等级 -- 积分记录待添加
    initializeLocalStorageKey('total_lucky_point', 10);//赠送10个积分
    initializeLocalStorageKey('user_avatar', '🎃');
    initializeLocalStorageKey('user_name', 'aimlobo_' + translate(getLanguageFromUrl(), 'username'));
    initializeLocalStorageKey('user_description', translate(getLanguageFromUrl(), 'personalized_signature'));
    initializeLocalStorageKey('user_birthday', getYesterdayDate()); //初始化为昨天，为以后的生日做准备
    initializeLocalStorageKey('user_check_in_today', 0); // 初始化用户尚未签到，0表示没有，1代表今日已经签到
    initializeLocalStorageKey('last_check_in_date', ''); // 初始化上次签到日期
    initializeLocalStorageKey('last_login_in_date', getTodayDate()); // 初始化上次登录日期
    initializeLocalStorageKey('user_level', 0);
    initializeLocalStorageKey('game_time', 0); //游戏次数
    initializeLocalStorageKey('read_time', 0); //阅读次数
    initializeLocalStorageKey('post_like', getRandomValueInRange(10000, 100000)); //文章获赞数量 - page topic
    initializeLocalStorageKey('visitor_number', getRandomValueInRange(2000, 5000)); //访客数量 - page topic
    
}

initializeUserSystem();

// 刷新页面上的用户头像
function updatePageUserAvatar() {
    const varUserAvatar =document.querySelector('.var_user_avatar');

    if (varUserAvatar) {
        varUserAvatar.textContent = readFromLocalStorage('user_avatar');
    }
    
}

// 刷新页面上的用户名称
function updatePageUserName() {
    const varUserName =document.querySelector('.var_user_name');

    if (varUserName) {
        varUserName.textContent = readFromLocalStorage('user_name');
    }
}

// 判断用户名
function isUserDuoDiu() {
    const userName = readFromLocalStorage('user_name');
    return userName === 'duo duo ❤️ diu diu';
}

// 首页弹出玫瑰: 首先判断用户名，然后模拟点击元素
showLoveToDuoDuo();
function showLoveToDuoDuo() {
    

    if (isUserDuoDiu()) {
        const roseIcon = document.querySelector('.rose_icon');

        if (roseIcon) {
            roseIcon.click();
        }
    }
}


// 更新幸运值
function updateTotalLuckyPoint(value) {
    // 读取并转换为浮点数
    let totalLuckyPoint = parseFloat(readFromLocalStorage('total_lucky_point'));

    // 如果读取失败，初始化为0
    if (isNaN(totalLuckyPoint)) {
        totalLuckyPoint = 0;
    }

    // 更新并确保小数点后只有一位数的精度
    totalLuckyPoint = (totalLuckyPoint + value).toFixed(1);

    // 写回
    writeToLocalStorage('total_lucky_point', parseFloat(totalLuckyPoint));
}


// 刷新页面上的幸运值
function updatePageTotalLuckyPoint() {
    const varTotalLuckyPoint =document.querySelector('.var_total_lucky_point');
    varTotalLuckyPoint.textContent = readFromLocalStorage('total_lucky_point');
}

// 更新等级
function updateUserLevel(value) {
    
    // 读取
    let userLevel = parseInt(readFromLocalStorage('user_level'));

    // 更新
    userLevel += value;

    // 写回
    writeToLocalStorage('user_level', userLevel);
}

// 刷新页面上的等级
function updatePageUserLevel() {
    const varUserLevel =document.querySelector('.var_user_level');

    if (varUserLevel) {
        varUserLevel.textContent = readFromLocalStorage('user_level');
    }
    
}

// 更新游戏次数
function updateGameTime(value) {

    // 读取
    let gameTime = parseInt(readFromLocalStorage('game_time'));

    // 更新
    gameTime += value;

    // 写回
    writeToLocalStorage('game_time', gameTime);

}

// 刷新页面上的游戏次数
function updatePageUserGameTime() {
    const varGameTime =document.querySelector('.var_game_time');

    if (varGameTime) {
        varGameTime.textContent = readFromLocalStorage('game_time');
    }
    
}

// 更新阅读次数
function updateReadTime(value) {

    // 读取
    let readTime = parseInt(readFromLocalStorage('read_time'));

    // 更新
    readTime += value;

    // 写回
    writeToLocalStorage('read_time', readTime);
}

// 刷新页面上的阅读次数
function updatePageUserReadTime() {
    const varReadTime =document.querySelector('.var_read_time');

    if (varReadTime) {
        varReadTime.textContent = readFromLocalStorage('read_time');
    }
    
}

// 更新文章获赞数量
function updatePostLike(value) {

    // 读取
    let postLike = parseInt(readFromLocalStorage('post_like'));

    // 更新
    postLike += value;

    // 写回
    writeToLocalStorage('post_like', postLike);
}

// 刷新页面上的文章获赞数量
function updatePagePostLike() {
    const varPostLike =document.querySelector('.var_post_like');
    varPostLike.textContent = readFromLocalStorage('post_like');
}

// 更新访客数量
function updateVisitorNumber(value) {

    // 读取
    let visitorNumber = parseInt(readFromLocalStorage('visitor_number'));

    // 更新
    visitorNumber += value;

    // 写回
    writeToLocalStorage('visitor_number', visitorNumber);
}

// 刷新页面上的访客数量
function updatePageVisitorNumber() {
    const varVisitorNumber =document.querySelector('.var_visitor_number');
    varVisitorNumber.textContent = readFromLocalStorage('visitor_number');
}

// 写入事件到本地
function writeEventLog(eventType, eventName, value) {
    // 构造本地存储的键名
    const storageKey = `eventLog${eventType}`;

    // 读取现有的日志数据
    let eventLog = localStorage.getItem(storageKey);

    // 如果不存在，则初始化为一个空数组
    if (eventLog === null) {
        eventLog = [];
    } else {
        // 解析现有的日志数据
        eventLog = JSON.parse(eventLog);
    }

    // 获取当前时间
    const eventTime = new Date().toISOString();

    // 创建新事件对象
    const newEvent = [eventName, value, eventTime];

    // 将新事件添加到日志数组中
    eventLog.push(newEvent);

    // 将更新后的日志数组存回Local Storage
    localStorage.setItem(storageKey, JSON.stringify(eventLog));
}

// 记录事件--幸运积分
function writeEventLogLuckyPoint(eventName, luckyPoint) {
    writeEventLog('LuckyPoint', eventName, luckyPoint);
}

// 记录事件--用户等级
function writeEventLogUserLevel(eventName, level) {
    writeEventLog('UserLevel', eventName, level);
}

// 记录事件--游戏次数
function writeEventLogGameTime(eventName, gameTime) {
    writeEventLog('GameTime', eventName, gameTime);
}

// 记录事件--阅读次数
function writeEventLogReadTime(eventName, readTime) {
    writeEventLog('ReadTime', eventName, readTime);
}




// 判断页面语言
function getLanguageFromUrl() {
    const url = window.location.href;
    
    if (url.includes('/en/')) {
        return 'en';
    } else if (url.includes('/zh-cn/')) {
        return 'zh-cn';
    } else if (url.includes('/zh-tw/')) {
        return 'zh-tw';
    } else {
        return 'unknown'; // 如果不包含任何已知的语言路径，则返回'unknown'
    }
}




// 得到随机内容,接收的参数是：数据集的名称，要获得几个随机值，存到local的key名称
function getRandomDataItems(dataItemsName, count, key) {
    const dataItems = dataItemsCollection[dataItemsName];
    if (!dataItems) {
        throw new Error(`Data items array named "${dataItemsName}" does not exist`);
    }

    if (count > dataItems.length) {
        throw new Error('Requested more unique data items than available');
    }

    const selectedItems = [];
    const remainingItems = [...dataItems]; // 创建数据项的副本

    while (selectedItems.length < count) {
        const randomIndex = Math.floor(Math.random() * remainingItems.length);
        const [selectedItem] = remainingItems.splice(randomIndex, 1); // 从剩余数据项中移除选中项
        selectedItems.push(selectedItem);
    }

    // 将结果数组写入 LocalStorage
    writeToLocalStorage(key, JSON.stringify(selectedItems));

    return selectedItems;
}

// topic single 页面，back to top
backToTopInSingle();
function backToTopInSingle() {
// 获取按钮
var backToTopBtn = document.getElementById("backToTopBtn");

if (backToTopBtn) {
    // 当用户向下滚动 100px 时显示按钮
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }

    // 点击按钮后滚动到顶部
    backToTopBtn.onclick = function() {
        scrollToTop();
    };

    function scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}
}




// 打开网站时需要更新的内容(每天): 首先查看数据是否上次登录是今天，如果是，就不更新内容，不是的话，就更新内容，然后更新上次登录日期为今天



// 查看数据是否上次登录是今天，返回ture or false
function isLastLogInDateIsToday() {
    const lastLogInDate = readFromLocalStorage('last_login_in_date');
    const today = getTodayDate(); 
    return lastLogInDate === today;
}

// 更新需要更新的内容（每天第一次登录）
function updateWhenLogInToday() {

    if (isLastLogInDateIsToday()) {
        // 无需更新内容
    } else {

        // 生成今天适合做什么，不适合做什么
        initializeLocalStorageKey('lucky_for_items', getRandomDataItems('luckyForItems', 3, 'lucky_for_items')); 
        initializeLocalStorageKey('unlucky_for_items', getRandomDataItems('unluckyForItems', 3, 'unlucky_for_items')); 

        // 更新随机用户的信息：幸运值，等级，游戏次数，阅读次数
        updateRandomUsersInfo();

        // 更新文章获赞数量 page topic list
        updatePostLike(getRandomValueInRange(1500,4000));

        // 更新访客数量 page topic list
        updateVisitorNumber(getRandomValueInRange(500,1000));


        // 更新最后一次登录日期
        writeToLocalStorage('last_login_in_date', getTodayDate());
    }

}

updateWhenLogInToday();

// 更新需要更新的内容（每次操作之后）
function updateWhenNow() {

    //刷新用户头像
    updatePageUserAvatar();

    //刷新用户名称
    updatePageUserName();

    //刷新游戏次数
    updatePageUserGameTime();

    //刷新阅读次数
    updatePageUserReadTime();


}


updateWhenNow();


// 首页更新电子时钟digital-clock
function updateClockElements(selector, value) {
    document.querySelector(selector).innerHTML = value;
}

function formatTimeUnit(unit) {
    return unit < 10 ? "0" + unit : unit;
}

function getFormattedDate(today) {
    return {
        dayName: today.toLocaleDateString(getLanguageFromUrl(), { weekday: "short" }),
        monthName: today.toLocaleDateString(getLanguageFromUrl(), { month: "2-digit" }),
        dayNum: today.toLocaleDateString(getLanguageFromUrl(), { day: "2-digit" }),
        year: today.getFullYear()
    };
}

function digitalClock() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = formatTimeUnit(today.getMinutes());
    var seconds = formatTimeUnit(today.getSeconds());
    var period = hours >= 12 ? "PM" : "AM";
    hours = formatTimeUnit(hours);

    var { dayName, monthName, dayNum, year } = getFormattedDate(today);

    updateClockElements(".hours", hours);
    updateClockElements(".minutes", minutes);
    updateClockElements(".seconds", seconds);
    updateClockElements(".period", period);
    updateClockElements(".month-name", monthName);
    updateClockElements(".day-name", dayName);
    updateClockElements(".day-num", dayNum);
    updateClockElements(".year", year);
}

function initializeDigitalClock() {
    if (document.querySelector('.digital-clock')) {
        digitalClock();
        setInterval(digitalClock, 1000);
    }
}

// Call the function to initialize the digital clock
initializeDigitalClock();




