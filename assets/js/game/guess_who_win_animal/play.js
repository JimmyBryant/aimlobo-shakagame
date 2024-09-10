const gameArea = document.querySelector('.game_area');
const scoreBoard = document.querySelector('.score_board');
const elements = [];

const infoIconForceClose = document.querySelector('.tips_icon_force_close');
const btnStartGame = infoIconForceClose.querySelector('.btn_get_it');


const bgmGame = newSound(bgmGameLocation, bgmGameLoop, bgmGameVolume);
const bgmElement1 = newSoundNoHtml5(bgmElement1Location, bgmElement1Loop, bgmElement1Volume);
const bgmElement2 = newSoundNoHtml5(bgmElement2Location, bgmElement2Loop, bgmElement2Volume);


// 每个食草动物和食肉动物的积分
const herbivorePoints = {};
const carnivorePoints = {};

// 函数
// 函数
// 函数


// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

    const userBetWinner = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    const userBetAmount = readValueFromRecordInLocal(keyName_1_00, keyName_1_02);

    const roundEndOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_06);

    if (!userBetWinner || !userBetAmount || roundEndOrNot) {

        showPopupMissData();
        
        return false;
    }

    return true;
}



// 创建元素
function createElement(type, className) {
    const element = document.createElement('div');
    element.textContent = type;
    element.classList.add('element', className);
    element.style.left = `${Math.random() * (GAME_AREA_SIZE - ELEMENT_SIZE)}px`;
    element.style.top = `${Math.random() * (GAME_AREA_SIZE - ELEMENT_SIZE)}px`;
    gameArea.appendChild(element);
    elements.push(element);
    return element;
}

// 元素移动逻辑
function moveElements() {
    elements.forEach(element => {
        if (element.classList.contains('herbivore')) {
            // 寻找最近的草
            const nearestPlant = findNearestElement(element, 'plant');
            if (nearestPlant) {
                moveTowards(element, nearestPlant, MOVE_SPEED_HERBIVORE);
            }
        } else if (element.classList.contains('carnivore')) {
            // 寻找最近的食草动物
            const nearestHerbivore = findNearestElement(element, 'herbivore');
            if (nearestHerbivore) {
                moveTowards(element, nearestHerbivore, MOVE_SPEED_CARNIVORE);
            }
        }

        checkCollisions(element);
    });
}

// 寻找最近的目标元素
function findNearestElement(element, className) {
    let nearestElement = null;
    let minDistance = Infinity;
    elements.forEach(other => {
        if (other !== element && other.classList.contains(className)) {
            const distance = getDistance(element, other);
            if (distance < minDistance) {
                minDistance = distance;
                nearestElement = other;
            }
        }
    });
    return nearestElement;
}

// 计算两个元素之间的距离
function getDistance(element1, element2) {
    const x1 = parseFloat(element1.style.left);
    const y1 = parseFloat(element1.style.top);
    const x2 = parseFloat(element2.style.left);
    const y2 = parseFloat(element2.style.top);
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// 元素移动到目标
function moveTowards(element, target, speed) {
    const x = parseFloat(element.style.left);
    const y = parseFloat(element.style.top);
    const targetX = parseFloat(target.style.left);
    const targetY = parseFloat(target.style.top);
    const distance = getDistance(element, target);

    if (distance > 0) {
        const dx = (targetX - x) / distance * speed;
        const dy = (targetY - y) / distance * speed;

        element.style.left = `${x + dx}px`;
        element.style.top = `${y + dy}px`;
    }
}

// 检查碰撞并应用游戏规则
function checkCollisions(element) {
    elements.forEach(other => {
        if (element !== other && isColliding(element, other)) {
            applyGameRules(element, other);
        }
    });
}

// 判断两个元素是否碰撞
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

// 应用游戏规则
function applyGameRules(element1, element2) {
    const text1 = element1.textContent;
    const text2 = element2.textContent;

    if (element1.classList.contains('herbivore') && element2.classList.contains('plant')) {
        // 食草动物吃草
        herbivorePoints[text1] += 1;
        updateScores();
        removeElement(element2); // 吃掉草
        bgmElement1.play();
    } else if (element1.classList.contains('carnivore') && element2.classList.contains('herbivore')) {
        // 食肉动物吃食草动物
        carnivorePoints[text1] += herbivorePoints[text2];
        updateScores();
        removeElement(element2); // 吃掉食草动物
        bgmElement2.play();
    } else if (element2.classList.contains('carnivore') && element1.classList.contains('herbivore')) {
        // 食肉动物吃食草动物
        carnivorePoints[text2] += herbivorePoints[text1];
        updateScores();
        removeElement(element1); // 吃掉食草动物
        bgmElement2.play();
    }

    checkGameEnd();
}

// 移除元素
function removeElement(element) {
    const index = elements.indexOf(element);
    if (index > -1) {
        elements.splice(index, 1);
        element.remove();
    }
}


// 检查游戏是否结束
function checkGameEnd() {
    const herbivoresLeft = elements.filter(el => el.classList.contains('herbivore')).length;

    // 如果没有剩余的食草动物，游戏结束
    if (herbivoresLeft === 0) {
        let lionScore = carnivorePoints['🦁'];
        let tigerScore = carnivorePoints['🐯'];

        let winner;
        if (lionScore > tigerScore) {
            winner = '🦁';
        } else if (tigerScore > lionScore) {
            winner = '🐯';
        }

        if (winner === readValueFromRecordInLocal(keyName_1_00, keyName_1_01)) {

            writeValueToRecordInLocal(keyName_1_00, keyName_1_05, true);
        }

        writeValueToRecordInLocal(keyName_1_00, keyName_1_07, winner);

        writeValueToRecordInLocal(keyName_1_00, keyName_1_03, true);

        window.location.href = '../result';
    }
}


// 初始化积分板内容
function initializeScoreBoard() {
    let scoreboardHTML = '';

    // 食草动物积分板
    elementTypes.herbivores.forEach(type => {
        scoreboardHTML += `
            <div class="flex align-items-center justify-content-between">
                <div>${type}&nbsp;</div>
                <div id="herbivore-${type}" class='width-2rem'>0</div>
            </div>`;
    });

    // 食肉动物积分板
    elementTypes.carnivores.forEach(type => {
        scoreboardHTML += `
            <div class="flex align-items-center justify-content-between">
                <div>${type}&nbsp;</div>
                <div id="carnivore-${type}" class='width-2rem'>0</div>
            </div>`;
    });

    // 将生成的内容插入到页面中
    scoreBoard.innerHTML = scoreboardHTML;
}

// 更新积分显示
function updateScores() {
    // 更新食草动物积分
    elementTypes.herbivores.forEach(type => {
        document.getElementById(`herbivore-${type}`).textContent = herbivorePoints[type];
    });

    // 更新食肉动物积分
    elementTypes.carnivores.forEach(type => {
        document.getElementById(`carnivore-${type}`).textContent = carnivorePoints[type];
    });
}


// 生成元素
function initElement() {

    // 初始化草
    for (let i = 0; i < PLANT_COUNT; i++) {
        createElement('🌿', 'plant');
    }

    // 初始化食草动物
    elementTypes.herbivores.forEach(type => {
        for (let i = 0; i < HERBIVORE_COUNT; i++) {
            createElement(type, 'herbivore');
            herbivorePoints[type] = herbivorePoints[type] || 0; // 初始化积分为0
        }
    });

    // 初始化食肉动物
    elementTypes.carnivores.forEach(type => {
        createElement(type, 'carnivore');
    });
}








// 函数 -- end 
// 函数 -- end 
// 函数 -- end 



// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

// 判断用户是否直接跳转到该页面 
isUserJumpToThisPage();

infoIconForceClose.click();

// 初始化积分对象
elementTypes.herbivores.forEach(type => herbivorePoints[type] = 0);
elementTypes.carnivores.forEach(type => carnivorePoints[type] = 0);

initializeScoreBoard();

btnStartGame.addEventListener('click', () => {

    if (isUserJumpToThisPage()) {

        updateUserLuckyPointToLocal(-readValueFromRecordInLocal(keyName_1_00, keyName_1_02));
        initElement();
        bgmGame.play();
    }
    
});

setInterval(moveElements, 50);







// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end




