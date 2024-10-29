// 基础设置
const bgCanvasWidth = 1024; // 背景画布的宽度 - pc
const bgCanvasHeight = 512; // 背景画布的高度 - pc


// 获取元素
const container = document.getElementById('container');
const lotMain = document.querySelector('.lot_main');
const lotLabels = document.querySelector('.lot_labels');
const lotLabel1 = document.querySelector('.lot_label_1');
const lotLabel2 = document.querySelector('.lot_label_2');
const btnOpenLot = document.getElementById('btn_open_lot_content');
const lotContent = document.querySelector('.lot_content');
const lotContent1 = document.querySelector('.lot_content_1');
const lotContent2 = document.querySelector('.lot_content_2');
const btnOpenLotContent = document.getElementById('btn_open_lot_content');



// 画布 - 背景
const canvas = document.getElementById("bg_canvas");
const ctx = canvas.getContext("2d");

// 读取设备信息 - 屏幕高度和宽度
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

console.log("屏幕宽度:", screenWidth);
console.log("屏幕高度:", screenHeight);

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

console.log("窗口宽度:", windowWidth);
console.log("窗口高度:", windowHeight);

// 读取设备信息 - 分辨率
const dpr = window.devicePixelRatio || 1;

// 读取设备信息 - rem
const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
console.log("1rem 等于：", rem, "px");

// 函数 - 设置container 和 canvas 的高度和宽度 - 一个屏幕的宽度和高度 - 针对屏幕宽度< 1024的设备
setContainerWidthAndHeight();
function setContainerWidthAndHeight() {

    if (screenWidth < 1024) {
        container.style.width = `${windowWidth - rem}px`; // 这里要减去 1rem是因为css中的main设置了最大宽度, 这里利用的宽度是窗口宽度和高度，是因为移动端读取窗口的高度比读取设备的高度更适合，设备的高度因为顶部和底部的原因会高于窗口高度
        container.style.height = `${windowHeight}px`;

        canvas.width = (windowWidth - rem) * dpr; 
        canvas.height = windowHeight * dpr; 

        canvas.style.width = `${windowWidth - rem}px`;
        canvas.style.height = `${windowHeight}px`;

    } else {
        container.style.width = `${bgCanvasWidth}px`;
        container.style.height = `${bgCanvasHeight}px`;

        canvas.width = bgCanvasWidth * dpr;
        canvas.height = bgCanvasHeight * dpr;

        canvas.style.width = `${bgCanvasWidth}px`;
        canvas.style.height = `${bgCanvasHeight}px`;
    }
}


// 画背景图
// 画背景图
// 画背景图

// const rect = canvas.getBoundingClientRect();
// canvas.width = rect.width * dpr;
// canvas.height = rect.height * dpr;

ctx.scale(dpr, dpr);

var img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = "/image/luck/draw_lots/bg.jpg";
var CanvasXSize = canvas.width;
var CanvasYSize = canvas.height;
var speed = screenWidth >= 1024 ? 30 : 60; // lower is faster - 背景图的移动速度
var numberOfLots = screenWidth >= 1024 ? 60 : 30; // 生成签的数量
const numberOfLights = screenWidth >= 1024 ? 60 : 30; // 生成孔明灯的数量
var scale = 0.7;
var y = 0; // vertical offset

// Main program

var dx = 0.25; // 这里是水平移动的距离 - 可以理解为控制画面移动速度
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
// var ctx;

// img.onload = function () {
//   imgW = img.width * scale;
//   imgH = img.height * scale;

//   if (imgW > CanvasXSize) {
//     // image larger than canvas
//     x = CanvasXSize - imgW;
//   }
//   if (imgW > CanvasXSize) {
//     // image width larger than canvas
//     clearX = imgW;
//   } else {
//     clearX = CanvasXSize;
//   }
//   if (imgH > CanvasYSize) {
//     // image height larger than canvas
//     clearY = imgH;
//   } else {
//     clearY = CanvasYSize;
//   }

//   // get canvas context
// //   ctx = document.getElementById("canvas").getContext("2d");

//   // set refresh rate
//   return setInterval(draw, speed);
// };

// function draw() {
//   ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

//   // if image is <= Canvas Size
//   if (imgW <= CanvasXSize) {
//     // reset, start from beginning
//     if (x > CanvasXSize) {
//       x = -imgW + x;
//     }
//     // draw additional image1
//     if (x > 0) {
//       ctx.drawImage(img, -imgW + x, y, imgW, imgH);
//     }
//     // draw additional image2
//     if (x - imgW > 0) {
//       ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
//     }
//   }

//   // image is > Canvas Size
//   else {
//     // reset, start from beginning
//     if (x > CanvasXSize) {
//       x = CanvasXSize - imgW;
//     }
//     // draw aditional image
//     if (x > CanvasXSize - imgW) {
//       ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
//     }
//   }
//   // draw image
//   ctx.drawImage(img, x, y, imgW, imgH);
//   // amount to move
//   x += dx;
// }

function draw() {
    ctx.clearRect(0, 0, clearX, clearY); // 清除画布

    if (imgW <= CanvasXSize) {
        if (x > CanvasXSize) {
            x = -imgW + x;
        }
        if (x > 0) {
            ctx.drawImage(img, -imgW + x, y, imgW, imgH);
        }
        if (x - imgW > 0) {
            ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    } else {
        if (x > CanvasXSize) {
            x = CanvasXSize - imgW;
        }
        if (x > CanvasXSize - imgW) {
            ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }
    ctx.drawImage(img, x, y, imgW, imgH);
    x += dx;
    requestAnimationFrame(draw); // 使用 requestAnimationFrame 进行动画刷新
}
  
img.onload = function () {
    imgW = img.width * scale;
    imgH = img.height * scale;

    if (imgW > CanvasXSize) {
        x = CanvasXSize - imgW;
    }
    if (imgW > CanvasXSize) {
        clearX = imgW;
    } else {
        clearX = CanvasXSize;
    }
    if (imgH > CanvasYSize) {
        clearY = imgH;
    } else {
        clearY = CanvasYSize;
    }

    requestAnimationFrame(draw); // 初始化时启动动画
};

// 画背景图 - end
// 画背景图 - end
// 画背景图 - end

// 生成孔明灯
// 生成孔明灯
// 生成孔明灯

// // 生成随机数的辅助函数
// function getRandom(min, max) {
//     return Math.random() * (max - min) + min;
// }

// // 生成随机小方块
// function createRandomBoxes(numBoxes) {
//     for (let i = 0; i < numBoxes; i++) {
//         const box = document.createElement('div');
//         const size = getRandom(30, 60); // 方块随机大小

//         // 随机生成背景颜色和透明度
//         const randomColor = `rgba(${Math.floor(getRandom(0, 255))}, ${Math.floor(getRandom(0, 255))}, ${Math.floor(getRandom(0, 255))}, ${getRandom(0.4, 0.9).toFixed(2)})`;
        
//         // 设置方块的样式
//         box.classList.add('box');
//         box.style.width = `${size}px`;
//         box.style.height = `${size * 2}px`;
//         box.style.backgroundColor = randomColor;  // 应用随机颜色和透明度
//         // box.textContent = '上上';

//         // 随机生成方块的位置，确保方块不会出现在边界
//         let left, top;
//         do {
//             left = getRandom(0, container.clientWidth - size);
//             top = getRandom(0, container.clientHeight - size);
//         } while (checkCollision(left, top, size));

//         // 设置初始位置
//         box.style.left = `${left}px`;
//         box.style.top = `${top}px`;

//         // 给每个方块添加点击事件
//         box.addEventListener('click', () => {
//             getFirstLotsKind(); // 生成第一个签文的种类
//             // 当触发时显示元素并激活动画
//             if (lotUnlock.style.display === 'none' || !lotUnlock.style.display) {
//                 lotUnlock.style.display = 'flex'; // 确保元素显示
//             }

//             setTimeout(() => {
//                 lotUnlock.classList.toggle('active'); // 切换 active 类实现动画
//             }, 10); // 加一点延迟，确保 display 切换生效
//         });

//         // 将方块添加到容器中
//         container.appendChild(box);

//         // 让方块从左到右移动
//         moveBox(box);
//     }
// }


// // 检查方块是否与其他方块碰撞
// function checkCollision(left, top, size) {
//     const boxes = document.querySelectorAll('.box');
//     for (let box of boxes) {
//         const boxRect = box.getBoundingClientRect();
//         const padding = 10; // 方块间隔

//         if (
//             left < boxRect.right + padding &&
//             left + size > boxRect.left - padding &&
//             top < boxRect.bottom + padding &&
//             top + size > boxRect.top - padding
//         ) {
//             return true;
//         }
//     }
//     return false;
// }

// // 方块从左到右移动
// function moveBox(box) {
//     const speed = getRandom(0.5, 1); // 随机速度
//     let left = parseFloat(box.style.left);

//     function animate() {
//         left += speed;
//         if (left > container.clientWidth) {
//             left = -box.offsetWidth; // 重置位置回到左边
//         }
//         box.style.left = `${left}px`;
//         requestAnimationFrame(animate);
//     }
//     animate();
// }

// 生成随机数的辅助函数
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// 生成随机小方块（这里改成了随机生成图片）
function createRandomImages(numImages) {
    for (let i = 0; i < numImages; i++) {
        const img = document.createElement('img');
        const size = getRandom(30, 120); // 图片的随机大小
        img.src = '/image/luck/draw_lots/light.svg'; // 设置图片路径

        // 随机生成透明度
        // img.style.opacity = getRandom(0.8, 1).toFixed(2);
        img.style.opacity = 1;

        // 设置图片的样式
        img.classList.add('image');
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;

        // 随机生成图片的位置，确保不会出现在边界
        let left, top;
        do {
            left = getRandom(0, container.clientWidth - size);
            top = getRandom(0, container.clientHeight - size);
        } while (checkCollision(left, top, size));

        // 设置初始位置
        img.style.position = 'absolute';
        img.style.left = `${left}px`;
        img.style.top = `${top}px`;

        // 给每张图片添加点击事件
        img.addEventListener('click', () => {
            // getFirstLotsKind(); // 生成第一个签文的种类
            
            // // 当触发时显示元素并激活动画
            // if (lotUnlock.style.display === 'none' || !lotUnlock.style.display) {
            //     lotUnlock.style.display = 'flex'; // 确保元素显示
            // }

            // setTimeout(() => {
            //     lotUnlock.classList.toggle('active'); // 切换 active 类实现动画
            // }, 10); // 加一点延迟，确保 display 切换生效


            // 获得签文内容， 并生成签印的第一个字符
            returnLotContent(); 

            // 当触发时显示元素并激活动画
            if (lotMain.style.display === 'none' || !lotMain.style.display) {
                lotMain.style.display = 'flex'; // 确保元素显示
            }

            setTimeout(() => {
                lotMain.classList.toggle('active'); // 切换 active 类实现动画
            }, 10); // 加一点延迟，确保 display 切换生效

        });

        // 将图片添加到容器中
        container.appendChild(img);

        // 让图片从左到右移动
        moveImage(img);
    }
}

// 检查图片是否与其他图片碰撞
function checkCollision(left, top, size) {
    const images = document.querySelectorAll('.image');
    for (let image of images) {
        const imgRect = image.getBoundingClientRect();
        const padding = 10; // 图片间隔

        if (
            left < imgRect.right + padding &&
            left + size > imgRect.left - padding &&
            top < imgRect.bottom + padding &&
            top + size > imgRect.top - padding
        ) {
            return true;
        }
    }
    return false;
}

// 图片从左到右移动
// function moveImage(image) {
//     const speed = getRandom(0.5, 1); // 随机速度
//     let left = parseFloat(image.style.left);

//     function animate() {
//         left += speed;
//         if (left > container.clientWidth) {
//             left = -image.offsetWidth; // 重置位置回到左边
//         }
//         image.style.left = `${left}px`;
//         requestAnimationFrame(animate);
//     }
//     animate();
// }

// 图片从下到上移动
function moveImage(image) {
    const speed = getRandom(0.2, 0.7); // 随机速度
    let top = parseFloat(image.style.top);

    function animate() {
        top -= speed;
        if (top < -image.offsetHeight) { // 如果图片超出上边界，重置位置到底部
            top = container.clientHeight;
        }
        image.style.top = `${top}px`;
        requestAnimationFrame(animate);
    }
    animate();
}

// 执行生成图片的函数
createRandomImages(numberOfLights); 


// 生成孔明灯 - end
// 生成孔明灯 - end
// 生成孔明灯 - end

const lotContentInLang = data[returnLangFromUrl()];
// 获得签文
function returnLotContent() {

    const getLotContent = lotContentInLang[Math.floor(Math.random() * lotContentInLang.length)];

    lotContent1.textContent = getLotContent[0];
    lotContent2.textContent = getLotContent[1];

    lotLabel1.textContent = lotContent1.textContent.trim().charAt(0);
    lotLabel2.textContent = lotContent2.textContent.trim().charAt(0);

    console.log('lotContent1.textContent: ', lotContent1.textContent);
    console.log('lotContent2.textContent: ', lotContent2.textContent);
    console.log('lotLabel1.textContent: ', lotLabel1.textContent);
    console.log('lotLabel2.textContent: ', lotLabel2.textContent);

}




// 点击钥匙按钮时启动动画
btnOpenLotContent.addEventListener('click', () => {

    btnOpenLotContent.style.display = 'none';
    // lotContent.style.display = 'flex';
    // lotContent.classList.toggle('expanded');

    // 当触发时显示元素并激活动画
    if (lotContent.style.display === 'none' || !lotContent.style.display) {
        lotContent.style.display = 'flex'; // 确保元素显示
    }

    setTimeout(() => {
        lotContent.classList.toggle('expanded'); // 切换 active 类实现动画
    }, 10); // 加一点延迟，确保 display 切换生效


});




// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行



// 初始化游戏界面

// infoIconForceClose.click();



// initGame();



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end

