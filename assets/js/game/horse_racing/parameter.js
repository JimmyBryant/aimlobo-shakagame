// 参数变量，写入local
// 一级名称
const keyName_1_00 = 'game_horse_racing';

const keyName_1_01 = 'user_bet_horst_id'; // 用户选择的马匹编号
const keyName_1_02 = 'user_bet_amount'; // 用户下注金额
const keyName_1_03 = 'pool'; // 奖池信息 -- 存储每匹马下注的玩家数量和下注金额
const keyName_1_03_01 = 'total_bet_player'; // 下注玩家总数
const keyName_1_03_02 = 'total_bet_amount';
const keyName_1_04 = 'win_horst_id'; 
const keyName_1_05 = 'user_match_or_not'; 
const keyName_1_06 = 'user_racing_or_not'; 
const keyName_1_07 = 'user_bonus_or_not'; 
const keyName_1_08 = 'user_win_or_not'; 
const keyName_1_09 = 'round_end_or_not'; 




// 参数变量，方便调试和修改
const minBetAmount = 1; // 最低下注金额
const maxBetAmount = 100; // 最高下注金额
const taxRate = 0.03; // 扣去多少作为服务费
const minPlayerNumber = 50; // 模拟的参与人数下限
const maxPlayerNumber = 200; // 模拟的参与人数上限
const horseNumber = 10; // 马匹数量
const minRacingTime = 20; // 游戏时间 -- 最短 -- 马匹的运动时间
const maxRacingTime = 25; // 游戏时间 -- 最长 -- 马匹的运动时间

const bgmGameLocation = '/audio/game/horse_racing/bgm_game'; // bgmGame所在位置
const bgmGameLoop = false;
const bgmGameVolume = 0.3;

const bgmJiaLocation = '/audio/game/horse_racing/bgm_jia'; // bgmJia所在位置 -- 助力
const bgmJiaLoop = false;
const bgmJiaVolume = 1;