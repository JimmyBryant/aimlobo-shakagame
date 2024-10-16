// 参数变量，写入local
// 一级名称
const keyName_1_00 = 'guess_who_win_rock';

const keyName_1_01 = 'user_bet_element'; // 用户选择的赢家
const keyName_1_02 = 'user_bet_amount'; // 用户下注金额
const keyName_1_03 = 'user_play_or_not'; 
const keyName_1_04 = 'user_bonus_or_not'; 
const keyName_1_05 = 'user_win_or_not'; 
const keyName_1_06 = 'round_end_or_not'; 
const keyName_1_07 = 'winning_element'; 




// 参数变量，方便调试和修改
const minBetAmount = 1; // 最低下注金额
const maxBetAmount = 100; // 最高下注金额
const taxRate = 0.03; // 扣去多少作为服务费
const bonusMultiple = 3; // 如果赢了奖励的倍数


const GAME_AREA_SIZE = 320; // 游戏区域 - px
const ELEMENT_SIZE = 24; // 元素大小 -- 配合css做变更
const INITIAL_COUNT = 15; // 生成各个元素的数量
const ATTACK_MOVE_SPEED = 2; // 攻击敌人的速度
const PROTECT_MOVE_SPEED = 1.8; // 保护自己的速度
const DETECTION_RANGE = 600; // 攻击/保护的侦查范围
const elementTypes = ['🪨', '✂️', '📜']; // 重要 -- 顺序 -- 按照 前边吃后边的顺序


// bgmGame所在位置
const bgmGameLocation = '/audio/game/guess_who_win_rock/joyful-spy-melody-for-lighthearted-fun-15s-232565'; 
const bgmGameLoop = true;
const bgmGameVolume = 0.4;

// 第一个元素的音效
const bgmElement1Location = '/audio/game/guess_who_win_rock/stone-dropping-6843';
const bgmElement1Loop = false;
const bgmElement1Volume = 0.7;

// 第二个元素的音效
const bgmElement2Location = '/audio/game/guess_who_win_rock/scissors-cutting-paper-1-101193';
const bgmElement2Loop = false;
const bgmElement2Volume = 0.7;

// 第三个元素的音效
const bgmElement3Location = '/audio/game/guess_who_win_rock/clothes-drop-2-40202';
const bgmElement3Loop = false;
const bgmElement3Volume = 0.7;

