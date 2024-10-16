const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pin = document.querySelector('.pin');

const dpr = window.devicePixelRatio || 1;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;



const rotationDuration = 4; // 转盘旋转的时间
const numSmallCircles = 30; // 装饰的小圆数量
const smallCircleRadius = 5; // 装饰的小圆半径

// const wheelWidth = 450;
const wheelWidth = rect.width === 540 ? 450 : 280;

const wheelHeight = wheelWidth;
const wheelCenterX = rect.width / 2; // 轮盘中心点 - 横坐标
const wheelCenterY = rect.height / 2; // 轮盘中心点 - 纵坐标
const radius = wheelWidth / 2 - 1; // 轮盘半径
const outerCircleRadius = radius + 20; // 大盘半径
// const fanContent = [1,2,3,4,5,6, 7, 8, 9, 10, 11, 12]; 
let fanContent = getFanContent(); // 获得扇形内容
let fanNum = fanContent.length; // 扇形数量
let fanAngle = (2 * Math.PI) / fanNum; // 每个扇形的弧度大小


const infoIconForceClose = document.querySelector('.tips_icon_force_close');
const btnGetIt = infoIconForceClose.querySelector('.btn_get_it');


const varGameTitle = document.querySelector('.var_game_title');
const popupFormEditGameTitle = document.querySelector('.popup_form_edit_game_title');
const formEditGameTitle = popupFormEditGameTitle.querySelector('.form_edit_game_title');

const outputContainer = document.querySelector('.data_content');

const btnSubmit = document.getElementById('submitBtn');
const btnClear = document.getElementById('clearBtn');

const bgmGame = newSound('/audio/game/lucky_wheel/bgm_game', true, 0.4);
const bgmSpin = newSoundNoHtml5('/audio/game/fruit_slot/bgm_spin', false, 1.5);
const bgmDing = newSoundNoHtml5('/audio/game/lucky_wheel/ding-36029', false, 0.5);

let rotationAngle = 0; // 当前旋转的弧度
let accumulatedRotation = 0; // 累计旋转的弧度
let accumulatedDegree = 0; // 累计旋转的角度
let isRotating = false;

const fanColors = ['#72BF78', '#FFF100', '#7695FF', '#E4B1F0', '#FF6600']; 

// 获取扇形内容
function getFanContent() {
    // 获取 class 为 data_content 的 div 中的所有 span 元素
    const spans = document.querySelectorAll('.data_content span');
    
    // 使用 Array.from 将 NodeList 转换为数组，并获取每个 span 的文本内容
    const fanContent = Array.from(spans, span => span.textContent.trim());
    
    return fanContent;
}


// 设置画布清晰度
function setupCanvas() {

    ctx.scale(dpr, dpr);
}

// 画外围装饰
function drawDecoration() {

    ctx.clearRect(0, 0, canvas.width, wheelHeight);
    ctx.fillStyle = '#EC6C5D';
    ctx.beginPath();
    ctx.moveTo(wheelCenterX, wheelCenterY);
    ctx.arc(wheelCenterX, wheelCenterY, outerCircleRadius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill(); 

    //绘制小圆
    for (let i = 0; i < numSmallCircles; i++) {
        const angle = (i * 2 * Math.PI) / numSmallCircles; // 每个小圆的位置角度
        const x = wheelCenterX + (outerCircleRadius - 10) * Math.cos(angle); // 计算小圆的x坐标
        const y = wheelCenterY + (outerCircleRadius - 10) * Math.sin(angle); // 计算小圆的y坐标
        
        // 画小圆
        ctx.beginPath();
        ctx.arc(x, y, smallCircleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#FCDE70'; // 小圆颜色
        ctx.fill(); // 填充小圆
    }

}


// 画转盘
function drawWheel() {

    // ctx.clearRect(0, 0, canvas.width, wheelHeight);

    // ctx.save();

    // // 画圆环
    // ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    // ctx.lineWidth = 4;
    // // ctx.shadowOffsetX = 3;
    // // ctx.shadowOffsetY = 3;
    // // ctx.shadowBlur = 3;
    // // ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    // ctx.beginPath();
    // // ctx.moveTo(wheelCenterX, wheelCenterY);
    // ctx.arc(wheelCenterX, wheelCenterY, radius, 0, 2 * Math.PI);
    // ctx.closePath();
    // ctx.stroke(); 

    // // 恢复上下文，防止影响其他扇形
    // ctx.restore();

    
    // 画扇形 和 文字
    for (let i = 0; i < fanNum; i++) {

        const startAngle = i * fanAngle + rotationAngle + accumulatedRotation;
        const endAngle = (i + 1) * fanAngle + rotationAngle + accumulatedRotation;

        // 创建扇形的渐变颜色
        function createSegmentGradient(startAngle, endAngle) {
            const gradient = ctx.createRadialGradient(wheelCenterX, wheelCenterY, 0, wheelCenterX, wheelCenterY, radius);
            gradient.addColorStop(0, '#ffffff'); // 中心颜色
            gradient.addColorStop(1, `hsl(${(startAngle * 180 / Math.PI) % 360}, 100%, 50%)`); // 外边缘颜色
            // gradient.addColorStop(0, 'rgba(242, 168, 85, 0.5)');
            // gradient.addColorStop(1, 'rgba(249, 217, 118, 1)');
            return gradient;
        }

        // 画扇形
        // ctx.fillStyle = fanColors[i % fanColors.length]; // 颜色循环
        // 创建渐变填充
        ctx.fillStyle = createSegmentGradient(startAngle, endAngle);
        
        ctx.beginPath();
        ctx.moveTo(wheelCenterX, wheelCenterY);
        ctx.arc(wheelCenterX, wheelCenterY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill(); // 填充颜色

        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.save();

        const textAngle = startAngle + fanAngle / 2;
        ctx.translate(wheelCenterX, wheelCenterY); // 移动到中心点
        ctx.rotate(textAngle); // 旋转到与扇形一致的角度

        // 画扇形内的文字
        ctx.fillStyle = "#000";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        const textX = radius / 1.5; // 文字距离中心的距离
        ctx.fillText(fanContent[i], textX, 0, radius * (1 - 1 / 1.5));

        // 恢复上下文，防止影响其他扇形
        ctx.restore();
    }

    ctx.save();


    // 画指针
    ctx.beginPath();
    ctx.moveTo(wheelCenterX, wheelCenterY - radius / 15);
    ctx.lineTo(wheelCenterX, wheelCenterY + radius / 15);
    ctx.lineTo(wheelCenterX + radius / 15 * 6, wheelCenterY);
    ctx.closePath();
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.fillStyle = "#D91656";
    ctx.fill();

    // 恢复上下文，防止影响其他扇形
    ctx.restore();

    // 画中心点
    ctx.beginPath();
    ctx.arc(wheelCenterX, wheelCenterY, radius / 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#C0EBA6";
    // ctx.shadowOffsetX = 3;
    // ctx.shadowOffsetY = 3;
    // ctx.shadowBlur = 3;
    // ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.fill();

    // 画中心点
    ctx.beginPath();
    ctx.arc(wheelCenterX, wheelCenterY, radius / 15, 0, 2 * Math.PI);
    ctx.fillStyle = "#D91656";
    // ctx.shadowOffsetX = 3;
    // ctx.shadowOffsetY = 3;
    // ctx.shadowBlur = 3;
    // ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
    ctx.fill();
    // ctx.strokeStyle = "#000";
    // ctx.stroke();

    

    
}

// 旋转逻辑
function rotateWheel(duration) {
    let startTime = null;
    const randomRotation = getRandomRotation(); // 获取随机旋转角度

    function rotate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutProgress = easeOutCubic(progress);
        rotationAngle = randomRotation * easeOutProgress;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(rotate);
        } else {
            accumulatedRotation += randomRotation; // 累加总旋转角度
            isRotating = false;

            accumulatedDegree += Math.round(randomRotation / (Math.PI / 180));
            pin.textContent = fanContent[fanNum - Math.ceil((accumulatedDegree % 360 )/ (360 / fanNum))];

            bgmSpin.stop();
            bgmDing.play();

            // 增加游戏次数
            updateUserGameTimeToLocal(1);
            
        }
    }

    requestAnimationFrame(rotate);
}


// 随机生成旋转的弧度
function getRandomRotation() {
    const randomPart = Math.floor(Math.random() * 360); // 0-360的随机数
    const baseRotation = 10 * 360; // 至少转5圈
    return (baseRotation + randomPart) * (Math.PI / 180); // 转换为弧度
}

// 缓动函数
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}
   
infoIconForceClose.click();

setupCanvas();

drawDecoration();
drawWheel();

// 点击 知道了 按钮
btnGetIt.addEventListener('click', () => {
    bgmGame.play();
    siteBgmSuccess.play();
});

 // 点击转盘开始旋转
 canvas.addEventListener('click', () => {
    if (!isRotating) {

        isRotating = true;
        pin.textContent = '';
        bgmSpin.play();
        rotateWheel(rotationDuration * 1000); 
        
    }
});

// 点击 提交 按钮
btnSubmit.addEventListener('click', function() {
    // 获取用户输入
    const input = document.getElementById('userInput').value;

    // 按换行符分割内容，并存储到数组
    const content = input.split('\n').filter(line => line.trim() !== '');

    // 清空之前的输出
    
    outputContainer.innerHTML = '';

    // 显示内容在网页上
    content.forEach(line => {
        const p = document.createElement('span');
        p.textContent = line;
        outputContainer.appendChild(p);
    });

    // 获取扇形内容
    fanContent = getFanContent(); // 获得扇形内容
    fanNum = fanContent.length; // 扇形数量
    fanAngle = (2 * Math.PI) / fanNum; // 每个扇形的弧度大小
    
    drawWheel();
});

// 点击 清空 按钮
btnClear.addEventListener('click', function() {
    
    // 清空文本框内容
    document.getElementById('userInput').value = '';
});


clickSetDisplay(varGameTitle, popupFormEditGameTitle, displayTypes.flex);

formEditGameTitle.addEventListener('submit', (event) => {

    event.preventDefault();

    const gameTitleInput = document.querySelector('.game_title_input').value;

    if (gameTitleInput) {

        varGameTitle.textContent = gameTitleInput;
    } 
    
    formEditGameTitle.reset();

});

formEditGameTitle.addEventListener('reset', () => {

    formEditGameTitle.reset();

    siteBgmSelect.play();

    setDisplay(popupFormEditGameTitle, displayTypes.none);
});