const bgmCheckbox = document.querySelector('input[name="bgm"]');


// 函数

// 生成星星
function generateStars() {
    var starContainer = document.querySelector('.star');

    var screenW = 320; // 和css设置的pool大小相关
    var screenH = 160;
    
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

// 函数：填充表白墙内容
function populateWallContent() {
    const records = readDataFromLocal(keyName_1_00); // 从本地存储获取记录数据
    const wallContents = document.querySelectorAll('.wall_content'); // 获取所有 wall_content 元素

    // 遍历 wall_content 元素，按顺序从 records 填充内容
    wallContents.forEach((wallContent, index) => {
        // 由于 wall_content_1 对应 index=9，因此我们从 records 的最后一个元素开始
        const recordIndex = records.length - 1 - index;

        // 获取相应的记录数据
        const fromText = records[recordIndex][keyName_1_01] || readValueFromRecordInLocal(keyName_0_01, keyName_0_01_03);
        const toText = records[recordIndex][keyName_1_02] || 'shakagame';
        const contentText = records[recordIndex][keyName_1_03] || '❤️‍🔥 shakagame.com';

        // 填充到相应的 HTML 结构中
        wallContent.querySelector('.var_user_from').textContent = fromText;
        wallContent.querySelector('.var_user_to').textContent = toText;
        wallContent.querySelector('.content').textContent = contentText;
    });
}



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