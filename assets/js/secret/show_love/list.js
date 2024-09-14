const bgmCheckbox = document.querySelector('input[name="bgm"]');

// 函数

// 生成星星
function generateStars() {
    var starContainer = document.querySelector('.star');

    var screenW = 320; // 和css设置的pool大小相关
    var screenH = 32;
    
    for (var i = 0; i < 50; i++) {
        var span = document.createElement('span');
        span.setAttribute('class', 'star_item');
        starContainer.appendChild(span);
    
        var x = Math.random() * screenW;
        var y = Math.random() * screenH;
    
        span.style.left = x + 'px';
        span.style.top = y + 'px';
    
        var scale = Math.random() * 1.5;
        span.style.transform = 'scale(' + scale + ')';
    
        var rate = Math.random() * 1.5;
        span.style.animation = 'flash 1s infinite alternate';
        span.style.animationDelay = rate + 's';
    }
}


// 获取随机索引的函数
function getRandomIndex(list) {
    return Math.floor(Math.random() * list.length);
}

// 填充表白墙内容
function populateWallContent() {
    const lang = returnLangFromUrl(); // 获取当前语言
    const userFromList = userFromData[lang]; // 获取 "from" 数据
    const userToList = userToData[lang]; // 获取 "to" 数据
    const showLoveList = showLoveData[lang]; // 获取内容数据

    const wallContents = document.querySelectorAll('.wall_content'); // 获取所有 wall_content 元素

    

    // 遍历 wall_content 元素，填充内容
    wallContents.forEach((wallContent) => {
        const fromText = userFromList[getRandomIndex(userFromList)]; // 随机取 from 数据
        const toText = userToList[getRandomIndex(userToList)]; // 随机取 to 数据
        const contentText = showLoveList[getRandomIndex(showLoveList)]; // 随机取 content 数据

        // 填充到相应的 HTML 结构中
        wallContent.querySelector('.var_user_from').textContent = fromText;
        wallContent.querySelector('.var_user_to').textContent = toText;
        wallContent.querySelector('.content').textContent = contentText;
    });

    

    const firstIndexRecord = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_01);

    if (firstIndexRecord != DEFAULT_VALUE_NULL) {

        const userWallContent = document.querySelector('.wall_content_10');

        const fromText = firstIndexRecord;
        const toText = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_02);
        const contentText = readValueFromIndexRecordInLocal(keyName_1_00, 0, keyName_1_03);

        userWallContent.querySelector('.var_user_from').textContent = fromText;
        userWallContent.querySelector('.var_user_to').textContent = toText;
        userWallContent.querySelector('.content').textContent = contentText;

    }
}

// 被选中的表白墙z-index = 10 (处于最上层)
function enableWallContentZIndexControl() {
    const wallContents = document.querySelectorAll('.wall_content');

    wallContents.forEach(content => {
        content.addEventListener('click', function() {
            // 重置所有 wall_content 的 z-index
            wallContents.forEach(c => c.style.zIndex = 1);
            // 将当前点击的 wall_content 的 z-index 设为 10
            this.style.zIndex = 10;
        });
    });
}

// 初始化用户数据
function initUserData() {

    const userData = readDataFromLocal(keyName_1_00);

    if (userData === DEFAULT_VALUE_NULL) {

        const records = [];

        for (let i = 0; i < setNumberOfWallContent; i++) {

            records.push({

                [keyName_1_01]: DEFAULT_VALUE_NULL,
                [keyName_1_02]: DEFAULT_VALUE_NULL,
                [keyName_1_03]: DEFAULT_VALUE_NULL,
            });
        }

        writeDataToLocal(keyName_1_00, records);
    }

    
}

initUserData();

generateStars();

populateWallContent();

enableWallContentZIndexControl();


bgmCheckbox.addEventListener("change", () => {

    if (bgmCheckbox.checked) {

        bgmBG.play();

    } else {
        
        bgmBG.stop();
    }
});