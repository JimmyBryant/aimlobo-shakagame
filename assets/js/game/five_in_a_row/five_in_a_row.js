// 常量定义
const win_number = 5; // 几个子为赢，五子棋就是5 -- 没用上
const canvasWidth_demarcation = 768; // pc 和 mobile 的屏幕宽度区分
const canvasWidth_pc = 450; // pc 上的 canvas 的宽度和高度
const canvasWidth_mobile = 300; // mobile 上的 canvas 的宽度和高度
const cell_size_pc = 30; // pc 上的棋盘格子的宽度和高度
const cell_size_mobile = 20; // mobile 上的棋盘格子的宽度和高度
const cell_count = 15; // 棋盘格数
const bonus_lucky_point = 5; // 用户赢了奖励的幸运值
const play_label = "five_in_a_row_playing"; // 对战中的提示 -- 翻译
const user_win_label = "five_in_a_row_user_win_label"; // 用户赢了的提示 -- 翻译
const ai_win_label = "five_in_a_row_ai_win_label"; // AI赢了的提示 -- 翻译

const canvas = document.getElementById("chess"); // 获取画布
const context = canvas.getContext('2d');
context.strokeStyle = '#000000'; //棋盘的线条颜色

const infoIconForceClose = document.querySelector('.tips_icon_force_close');
const btnGetIt = infoIconForceClose.querySelector('.btn_get_it');

const btnRestart = document.getElementById("restart");
const btnBack = document.getElementById("goback");
const btnReturn = document.getElementById("return");

const bgmGame = newSound('/audio/game/five_in_a_row/lucky-days-happy-acoustic-latin-233737', true, 0.2);

let userBonused = false;


// 获取屏幕宽度
const screenWidth = window.innerWidth; 

// 确定棋格宽度和高度
const cell_size = screenWidth > canvasWidth_demarcation ? cell_size_pc : cell_size_mobile;


// let backbtn = document.getElementById("goback");
// let returnbtn = document.getElementById("return");



let over = false;
let me = true; //我
let _nowi = 0, _nowj = 0; //记录自己下棋的坐标
let _compi = 0, _compj = 0; //记录计算机当前下棋的坐标
let _myWin = [], _compWin = []; //记录我，计算机赢的情况
let backAble = false, returnAble = false;
let resultTxt = document.getElementById('result-wrap');

let chessBoard = []; // 棋盘格子的占据情况

//赢法的统计数组
let myWin = [];
let computerWin = [];
//赢法数组
let wins = [];

let count = 0; //赢法总数



// 用户赢了 - 给予奖励
function bounsUserWin() {

    if (!userBonused) {

        updateUserLuckyPointToLocal(bonus_lucky_point);
        updateUserLuckyPointInPage();
        userBonused = true;
    }
}

// 根据屏幕宽度设置 canvas 尺寸和绘图区域
function setCanvasWidth() {

    if (screenWidth > canvasWidth_demarcation) {

        canvas.width = canvasWidth_pc;

        canvas.height = canvasWidth_pc;

    } else {
        
        canvas.width = canvasWidth_mobile;

        canvas.height = canvasWidth_mobile;  
    }
}


// // 初始化悔棋和撤销晦气按钮的状态
// function initBtnStatus() {

//     btnBack.disabled = true;
//     btnReturn.disabled = true;
// }

// 更新悔棋和撤销悔棋按钮的状态
function updateBtnStatus() {

    if (backAble) {

        btnBack.disabled = false;

    } else {

        btnBack.disabled = true;
    }

    if (returnAble) {

        btnReturn.disabled = false;

    } else {

        btnReturn.disabled = true;
    }
}

// 初始化棋盘格子的占据情况
function initchessBoard() {

    for (let i = 0; i < cell_count; i++) {
        chessBoard[i] = [];
        for (let j = 0; j < cell_count; j++) {
            chessBoard[i][j] = 0;
        }
    }
}


/*
context.moveTo(15 + i * 30 , 15);: 设置当前绘制位置为棋盘的一条竖线的起点。15 + i * 30 是 x 坐标，15 是 y 坐标。这里的 30 是每个棋格的宽度。

context.lineTo(15 + i * 30 , 435);: 从刚才设置的起点绘制到 y 坐标为 435 的地方，形成一条竖线。

context.stroke();: 这条命令会将前面定义的路径绘制出来。

context.moveTo(15 , 15 + i * 30);: 设置当前绘制位置为棋盘的一条横线的起点。15 是 x 坐标，15 + i * 30 是 y 坐标。

context.lineTo(435 , 15 + i * 30);: 从起点绘制到 x 坐标为 435 的地方，形成一条横线。

*/


function drawChessBoard() {

    for (let i = 0; i < cell_count; i++) {
        // 绘制竖线
        context.moveTo(cell_size / 2 + i * cell_size, cell_size / 2);
        context.lineTo(cell_size / 2 + i * cell_size, cell_size * cell_count - cell_size / 2);
        context.stroke();

        // 绘制横线
        context.moveTo(cell_size / 2, cell_size / 2 + i * cell_size);
        context.lineTo(cell_size * cell_count - cell_size / 2, cell_size / 2 + i * cell_size);
        context.stroke();
    }

}



function initWins() {

    for (let i = 0; i < 15; i++) {
        wins[i] = [];
        for (let j = 0; j < 15; j++) {
            wins[i][j] = [];
        }
    }

    //横线赢法
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
            for (let k = 0; k < 5; k++) {
                wins[i][j + k][count] = true;
            }
            count++;
        }
    }
    //竖线赢法
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 11; j++) {
            for (let k = 0; k < 5; k++) {
                wins[j + k][i][count] = true;
            }
            count++;
        }
    }
    //正斜线赢法
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            for (let k = 0; k < 5; k++) {
                wins[i + k][j + k][count] = true;
            }
            count++;
        }
    }
    //反斜线赢法
    for (let i = 0; i < 11; i++) {
        for (let j = 14; j > 3; j--) {
            for (let k = 0; k < 5; k++) {
                wins[i + k][j - k][count] = true;
            }
            count++;
        }
    }

}



function initAllWins() {
    for (let i = 0; i < count; i++) {
        myWin[i] = 0;
        _myWin[i] = 0;
        computerWin[i] = 0;
        _compWin[i] = 0;
    }
}



// 计算机下棋
function computerAI() {

    let myScore = [];
    let computerScore = [];
    let max = 0;
    let u = 0, v = 0;
    for (let i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (let j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (let k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }

                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }

                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }

                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }

            }
        }
    }
    _compi = u;
    _compj = v;
    oneStep(u, v, false);
    chessBoard[u][v] = 2;  //计算机占据位置
    for (let k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            _myWin[k] = myWin[k];
            myWin[k] = 6;//这个位置对方不可能赢了
            if (computerWin[k] == 5) {
                resultTxt.textContent = i18n(ai_win_label);
                siteBgmFail.play();
                over = true;
            }
        }
    }
    if (!over) {
        me = !me;
    }
    backAble = true;
    returnAble = false;
    // let hasClass = new RegExp('unable').test(' ' + returnbtn.className + ' ');
    // if (!hasClass) {
    //     returnbtn.className += ' ' + 'unable';
    // }
    updateBtnStatus();
}

//画棋子
function oneStep(i, j, me) {

    context.beginPath();
    // 使用 cell_size 代替硬编码的 30
    context.arc(cell_size / 2 + i * cell_size, cell_size / 2 + j * cell_size, cell_size / 2 - 2, 0, 2 * Math.PI); // 画圆
    context.closePath();

    // 渐变
    let gradient = context.createRadialGradient(
        cell_size / 2 + i * cell_size + 2,
        cell_size / 2 + j * cell_size - 2,
        cell_size / 2 - 2,
        cell_size / 2 + i * cell_size + 2,
        cell_size / 2 + j * cell_size - 2,
        0
    );

    if (me) {
        gradient.addColorStop(0, '#0a0a0a'); // 黑色棋子
        gradient.addColorStop(1, '#636766');
    } else {
        gradient.addColorStop(0, '#d1d1d1'); // 白色棋子
        gradient.addColorStop(1, '#f9f9f9');
    }

    context.fillStyle = gradient;
    context.fill();
}

// 销毁棋子
function minusStep(i, j) {

    // 擦除该圆
    context.clearRect(i * cell_size, j * cell_size, cell_size, cell_size);

    // 重画该圆周围的格子线
    context.beginPath();
    // 画竖线
    context.moveTo(cell_size / 2 + i * cell_size, j * cell_size);
    context.lineTo(cell_size / 2 + i * cell_size, j * cell_size + cell_size);

    // 画横线
    context.moveTo(i * cell_size, cell_size / 2 + j * cell_size);
    context.lineTo((i + 1) * cell_size, cell_size / 2 + j * cell_size);

    context.stroke();
}


// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行



// 初始化游戏界面

infoIconForceClose.click();


// 更新悔棋和撤销悔棋按钮的状态
updateBtnStatus();

// 根据屏幕宽度设置 canvas 尺寸和绘图区域
setCanvasWidth();

// 画棋盘
drawChessBoard();

// 初始化棋盘格子的占据情况
initchessBoard();

// 统计赢法
initWins();

// 初始化双方胜利的数据
initAllWins();


// 事件处理

// 点击 知道了 按钮
btnGetIt.addEventListener('click', () => {
    bgmGame.play();
    siteBgmSuccess.play();
});


// 点击 restart 按钮
btnRestart.addEventListener('click', () => {
    window.location.reload();
});

// 下棋 - 用户
chess.addEventListener('click', (e) => {
    if (over) {
        return;
    }
    if (!me) {
        return;
    }

    siteBgmSelect.play();

    // 悔棋功能可用
    // backbtn.className = backbtn.className.replace(new RegExp("(\\s|^)unable(\\s|$)"), " ");
    btnBack.disabled = false;
    let x = e.offsetX;
    let y = e.offsetY;
    let i = Math.floor(x / cell_size);
    let j = Math.floor(y / cell_size);
    _nowi = i;
    _nowj = j;
    if (chessBoard[i][j] == 0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1; //我，已占位置        

        for (let k = 0; k < count; k++) { // 将可能赢的情况都加1
            if (wins[i][j][k]) {
                // debugger;
                myWin[k]++;
                _compWin[k] = computerWin[k];
                computerWin[k] = 6;//这个位置对方不可能赢了
                if (myWin[k] == 5) {
                    // window.alert('你赢了');
                    resultTxt.textContent = i18n(user_win_label) + bonus_lucky_point;

                    bounsUserWin();

                    siteBgmSuccess.play();
                    over = true;
                }
            }
        }
        if (!over) {
            me = !me;
            computerAI();

        }
    }
});

// 点击 悔棋 按钮
btnBack.addEventListener('click', (e) => {
    if (!backAble) { return; }
    over = false;
    me = true;

    siteBgmInvalid.play();
    // resultTxt.innerHTML = 'o(╯□╰)o，悔棋中';
    // 撤销悔棋功能可用
    // returnbtn.className = returnbtn.className.replace(new RegExp("(\\s|^)unable(\\s|$)"), " ");
    btnReturn.disabled = false;
    // 我，悔棋
    chessBoard[_nowi][_nowj] = 0; //我，已占位置 还原
    minusStep(_nowi, _nowj); //销毁棋子                                  
    for (let k = 0; k < count; k++) { // 将可能赢的情况都减1
        if (wins[_nowi][_nowj][k]) {
            myWin[k]--;
            computerWin[k] = _compWin[k];//这个位置对方可能赢
        }
    }
    // 计算机相应的悔棋
    chessBoard[_compi][_compj] = 0; //计算机，已占位置 还原
    minusStep(_compi, _compj); //销毁棋子                                  
    for (let k = 0; k < count; k++) { // 将可能赢的情况都减1
        if (wins[_compi][_compj][k]) {
            computerWin[k]--;
            myWin[k] = _myWin[k];//这个位置对方可能赢
        }
    }
    resultTxt.textContent = i18n(play_label);
    // btnBack.disabled = true;
    // btnReturn.disabled = false;
    returnAble = true;
    backAble = false;
    updateBtnStatus();
});

// 点击 撤销悔棋 按钮
btnReturn.addEventListener('click', () => {
    if (!returnAble) { return; }
    // 我，撤销悔棋
    siteBgmSelect.play();
    chessBoard[_nowi][_nowj] = 1; //我，已占位置 
    oneStep(_nowi, _nowj, me);
    for (let k = 0; k < count; k++) {
        if (wins[_nowi][_nowj][k]) {
            myWin[k]++;
            _compWin[k] = computerWin[k];
            computerWin[k] = 6;//这个位置对方不可能赢
        }
        if (myWin[k] == 5) {
            resultTxt.textContent = i18n(user_win_label) + bonus_lucky_point;
            bounsUserWin();
            siteBgmSuccess.play();
            over = true;
        }
    }
    // 计算机撤销相应的悔棋
    chessBoard[_compi][_compj] = 2; //计算机，已占位置   
    oneStep(_compi, _compj, false);
    for (let k = 0; k < count; k++) { // 将可能赢的情况都减1
        if (wins[_compi][_compj][k]) {
            computerWin[k]++;
            _myWin[k] = myWin[k];
            myWin[k] = 6;//这个位置对方不可能赢
        }
        if (computerWin[k] == 5) {
            resultTxt.textContent = i18n(ai_win_label);
            siteBgmFail.play();
            over = true;
        }
    }
    // returnbtn.className += ' ' + 'unable';
    // btnReturn.disabled = true;
    // btnBack.disabled = false;
    returnAble = false;
    backAble = true;
    updateBtnStatus();
});



// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
