const gameArea = document.querySelector('.game_area');
const elements = [];

const infoIconForceClose = document.querySelector('.tips_icon_force_close');
const btnStartGame = infoIconForceClose.querySelector('.btn_get_it');


const bgmGame = newSound(bgmGameLocation, bgmGameLoop, bgmGameVolume);
const bgmElement1 = newSoundNoHtml5(bgmElement1Location, bgmElement1Loop, bgmElement1Volume);
const bgmElement2 = newSoundNoHtml5(bgmElement2Location, bgmElement2Loop, bgmElement2Volume);
const bgmElement3 = newSoundNoHtml5(bgmElement3Location, bgmElement3Loop, bgmElement3Volume);

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


// 初始化元素
function initElement() {

    for (let i = 0; i < INITIAL_COUNT; i++) {
        elementTypes.forEach(type => {
            const element = document.createElement('div');
            element.textContent = type;
            element.classList.add('element');
            element.style.left = `${Math.random() * (GAME_AREA_SIZE - ELEMENT_SIZE)}px`;
            element.style.top = `${Math.random() * (GAME_AREA_SIZE - ELEMENT_SIZE)}px`;
            gameArea.appendChild(element);
            elements.push(element);
        });
    }
}

// 元素移动逻辑：攻击优先于保护
function moveElements() {
    elements.forEach(element => {
        let x = parseFloat(element.style.left);
        let y = parseFloat(element.style.top);

        let targetX = x;
        let targetY = y;
        let nearestEnemy = null;
        let nearestEnemyDistance = Infinity;

        elements.forEach(other => {
            if (element !== other) {
                const otherX = parseFloat(other.style.left);
                const otherY = parseFloat(other.style.top);
                const distance = Math.sqrt((otherX - x) ** 2 + (otherY - y) ** 2);

                // 优先寻找最近的可以攻击的敌人
                if (canDefeat(element.textContent, other.textContent) && distance < nearestEnemyDistance && distance < DETECTION_RANGE) {
                    nearestEnemy = other;
                    nearestEnemyDistance = distance;
                } 
            }
        });

        // 如果找到了可以攻击的敌人，则优先攻击
        if (nearestEnemy) {
            const enemyX = parseFloat(nearestEnemy.style.left);
            const enemyY = parseFloat(nearestEnemy.style.top);
            const distance = Math.sqrt((enemyX - x) ** 2 + (enemyY - y) ** 2);

            // 攻击最近的可以消灭的元素
            targetX += (enemyX - x) / distance * ATTACK_MOVE_SPEED;
            targetY += (enemyY - y) / distance * ATTACK_MOVE_SPEED;
        } else {
            // 否则保护自己
            elements.forEach(other => {
                if (element !== other) {
                    const otherX = parseFloat(other.style.left);
                    const otherY = parseFloat(other.style.top);
                    const distance = Math.sqrt((otherX - x) ** 2 + (otherY - y) ** 2);

                    if (canDefeat(other.textContent, element.textContent) && distance < DETECTION_RANGE) {
                        targetX -= (otherX - x) / distance * PROTECT_MOVE_SPEED;
                        targetY -= (otherY - y) / distance * PROTECT_MOVE_SPEED;
                    }
                }
            });
        }

        element.style.left = `${Math.min(Math.max(targetX, 0), GAME_AREA_SIZE - ELEMENT_SIZE)}px`;
        element.style.top = `${Math.min(Math.max(targetY, 0), GAME_AREA_SIZE - ELEMENT_SIZE)}px`;

        checkCollisions(element);
    });
}

// 检查碰撞并应用游戏规则
function checkCollisions(element) {
    elements.forEach(other => {
        if (element !== other) {
            const rect1 = element.getBoundingClientRect();
            const rect2 = other.getBoundingClientRect();
            const overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);

            if (overlap) {
                applyGameRules(element, other);
            }
        }
    });
}

// 应用游戏规则，使用 elementTypes 数组来判断和转换元素类型
function applyGameRules2(element1, element2) {

    // 判断element1能否击败element2
    if (canDefeat(element1.textContent, element2.textContent)) {
        // element1 击败 element2，element2 转换为 element1 的类型
        element2.textContent = element1.textContent;
    } else if (canDefeat(element2.textContent, element1.textContent)) {
        // element2 击败 element1，element1 转换为 element2 的类型
        element1.textContent = element2.textContent;
    }

    checkGameEnd();
}

// 应用游戏规则，使用 elementTypes 数组来判断和转换元素类型
function applyGameRules(element1, element2) {

    // 判断 element1 能否击败 element2
    if (canDefeat(element1.textContent, element2.textContent)) {
        

        // 根据击败关系播放相应的音效
        const type1 = elementTypes.indexOf(element1.textContent);
        const type2 = elementTypes.indexOf(element2.textContent);

        if (type1 === 0 && type2 === 1) {
            bgmElement1.play(); // 石头击败剪刀
        } else if (type1 === 1 && type2 === 2) {
            bgmElement2.play(); // 剪刀击败纸
        } else if (type1 === 2 && type2 === 0) {
            bgmElement3.play(); // 纸击败石头
        }

        // element1 击败 element2，element2 转换为 element1 的类型
        element2.textContent = element1.textContent;

    } else if (canDefeat(element2.textContent, element1.textContent)) {
        

        // 根据击败关系播放相应的音效
        const type1 = elementTypes.indexOf(element2.textContent);
        const type2 = elementTypes.indexOf(element1.textContent);
        if (type1 === 0 && type2 === 1) {
            bgmElement1.play(); // 石头击败剪刀
        } else if (type1 === 1 && type2 === 2) {
            bgmElement2.play(); // 剪刀击败纸
        } else if (type1 === 2 && type2 === 0) {
            bgmElement3.play(); // 纸击败石头
        }

        // element2 击败 element1，element1 转换为 element2 的类型
        element1.textContent = element2.textContent;
    }

    checkGameEnd();
}



// 判断element1能否击败element2，使用索引比较
function canDefeat(element1, element2) {
    const type1 = elementTypes.indexOf(element1);
    const type2 = elementTypes.indexOf(element2);

    // 石头胜剪刀，剪刀胜纸，纸胜石头
    return (
        (type1 === 0 && type2 === 1) || // 石头胜剪刀
        (type1 === 1 && type2 === 2) || // 剪刀胜纸
        (type1 === 2 && type2 === 0)    // 纸胜石头
    );
}


// 检查游戏是否结束
function checkGameEnd() {

    const remainingTypes = new Set(elements.map(el => el.textContent));

    if (remainingTypes.size === 1) {

        const winner = [...remainingTypes][0];

        if (winner === readValueFromRecordInLocal(keyName_1_00, keyName_1_01)) {

            writeValueToRecordInLocal(keyName_1_00, keyName_1_05, true);
        }

        writeValueToRecordInLocal(keyName_1_00, keyName_1_07, winner);

        writeValueToRecordInLocal(keyName_1_00, keyName_1_03, true);

        clearInterval(gameLoop);

        window.location.href = '../result';
    }
}

// 启动游戏循环
const gameLoop = setInterval(moveElements, 100);






// 函数 -- end 
// 函数 -- end 
// 函数 -- end 



// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

// 判断用户是否直接跳转到该页面 -- 没有选择马匹
isUserJumpToThisPage();

infoIconForceClose.click();

btnStartGame.addEventListener('click', () => {

    if (isUserJumpToThisPage()) {

        updateUserLuckyPointToLocal(-readValueFromRecordInLocal(keyName_1_00, keyName_1_02));
        initElement();
        bgmGame.play();
    }
    
});







// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end




