// 参数变量，写入local
// 一级名称
const keyName_1_00 = 'guess_who_win_animal';

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
const bonusMultiple = 2; // 如果赢了奖励的倍数


const GAME_AREA_SIZE = 320; // 游戏区域 - px
const ELEMENT_SIZE = 24; // 元素大小 -- 配合css做变更
const PLANT_COUNT = 49; // 植物数量
const HERBIVORE_COUNT = 1; // 数量 -- 每个食草动物
const MOVE_SPEED_HERBIVORE = 1.5; // 移动速度 -- 食草动物
const MOVE_SPEED_CARNIVORE = 1.6; // 移动速度 -- 食肉动物
const elementTypes = {
    plants: ['🌿'],
    herbivores: ['🦬', '🐏', '🐰', '🦌', '🦘', '🦒', '🦓'],
    carnivores: ['🦁', '🐯']
};


// bgmGame所在位置
const bgmGameLocation = '/audio/game/guess_who_win_animal/pathway-to-success-16sloop-162324'; 
const bgmGameLoop = true;
const bgmGameVolume = 0.2;

// 第一个元素的音效
const bgmElement1Location = '/audio/game/guess_who_win_animal/crunchy-bite-001-86703';
const bgmElement1Loop = false;
const bgmElement1Volume = 0.5;

// 第二个元素的音效
const bgmElement2Location = '/audio/game/guess_who_win_animal/tiger-87706';
const bgmElement2Loop = false;
const bgmElement2Volume = 3;

