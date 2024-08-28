// 这个库用来储存参数
// 这样做的好处在于，将参数与函数分离，更易于使用



// 参数变量，方便调试和修改
const recordCount = 7; // 需要生成的记录数目
const intervalMinutes = 5; // 间隔时间（分钟）-- 非常重要 -- 一定要 >= 1,才能正确更新list页面的数据（按条）
const intervalMinutesClose = 0.5; // 提前多长时间封盘
const intervalMinutesValidBet = intervalMinutes - intervalMinutesClose; // 有效下注时间
const intervalMinutesValidBonus = intervalMinutes; // 有效兑奖时间
const minBetMultiple = 1; // 最低下注注数
const maxBetMultiple = 100; // 最高下注注数
const singleBetCost = 1; // 单注下注金额
const singleBetBonus = 1000; // 单注奖励
const taxRate = 0.03; // 扣去多少作为服务费
const minPlayerNumber = 2000; // 模拟的参与人数下限
const maxPlayerNumber = 8000; // 模拟的参与人数上限
const minWinners = 0; // 模拟的中奖人数下限
const maxWinners = 20; // 模拟的中奖人数上限
const statusOpen = 'lottery_open'; // 轮次状态信息：开盘
const statusClose = 'lottery_close'; // 轮次状态信息：封盘
const statusBonus = 'lottery_bonus'; // 轮次状态信息：开奖中
const statusStop = 'lottery_stop'; // 轮次状态信息：结束
const winningNumberParts = 3; // 中奖号码的位数
const winningNumberLowest = 0; // 中奖号码的最低数字
const winningNumberHighest = 999; // 中奖号码的最高数字



// 参数变量，写入local
// 一级名称
const keyName_1_00 = 'game_toto_3';

// 二级名称，用来记录最近7期的情况，其中5期是历史记录（已结束的轮次），一期是开奖中，一期是当前轮次（开盘，封盘）
// 每期的记录包括：轮次，下注开始时间，下注停止时间，开奖开始时间，开奖停止时间，状态，参与玩家总数，下注总注数，下注总金额，中奖人数，中奖注数，中奖金额，中奖号码，用户是否参与，参与记录，用户是否中奖，用户中奖记录, 用户是否兑奖;


const keyName_1_01 = 'round_number'; // 轮次号码
const keyName_1_02 = 'round_bet_begin_time'; // 下注开始时间
const keyName_1_03 = 'round_bet_close_time'; // 下注停止时间
const keyName_1_04 = 'round_bonus_begin_time'; // 开奖开始时间
const keyName_1_05 = 'round_bonus_close_time'; // 开奖停止时间
const keyName_1_06 = 'round_status'; // // 轮次状态
const keyName_1_07 = 'round_total_bet_player'; // 下注玩家总数
const keyName_1_08 = 'round_total_bet_multiple'; // 玩家下注总注数
const keyName_1_09 = 'round_total_bet_amount'; // 玩家下注总金额
const keyName_1_10 = 'round_total_win_player'; // 中奖玩家总数
const keyName_1_11 = 'round_total_win_multiple'; // 中奖玩家下注总注数
const keyName_1_12 = 'round_total_win_amount'; // 中奖玩家下注总金额
const keyName_1_13 = 'round_win_number'; // 中奖号码
const keyName_1_14 = 'round_user_bet_or_not'; // 用户是否下注
const keyName_1_15 = 'round_user_bet_record'; // 用户下注记录
const keyName_1_16 = 'round_user_win_or_not'; // 用户是否中奖
const keyName_1_17 = 'round_user_win_record'; // 用户中奖记录
const keyName_1_18 = 'round_user_bonus_or_not'; // 用户是否兑奖
const keyName_1_19 = 'round_page_bet_tip_go_to_bonus'; // 下注页面出现popup提示用户封盘了，可以去兑奖了

// 用户下注的键名
const keyName_1_15_01 = 'user_bet_number'; // 用户下注记录 -- 用户下注号码
const keyName_1_15_02 = 'user_bet_multiple'; // 用户下注记录 -- 用户下注注数
const keyName_1_15_03 = 'user_bet_amount'; // 用户下注记录 -- 用户下注金额

// 用来汇总统计用户的下注记录中，中奖的总下注注数, 总下注金额, 获奖金额
const keyName_1_15_04 = 'user_total_bet_multiple'; // 用户中奖记录 -- 用户中奖总注数
const keyName_1_15_05 = 'user_total_bet_amount'; // 用户中奖记录 -- 用户中奖总注数对应的总下注金额
const keyName_1_15_06 = 'user_bonus_amount'; // 用户中奖记录 -- 用户中奖总金额




