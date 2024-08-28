// 参数变量，写入local
// 一级名称
const keyName_1_00 = 'game_happy_worship';

const keyName_1_01 = 'user_select_god'; // 用户选择的神明 -- 单选 -- 储存编号
const keyName_1_02 = 'user_select_offerings'; // 用户选择的贡品列表 -- 可多选，储存值
const keyName_1_03 = 'user_select_incense'; // 用户选择的香 -- 单选 -- 储存编号
const keyName_1_04 = 'user_input_game_title'; // 用户提交的游戏标题
const keyName_1_05 = 'user_start_game'; // 用户开始了游戏
const keyName_1_06 = 'user_click_bubble'; // 用户点击气球的数量
const keyName_1_07 = 'user_end_game'; // 用户点击气球的数量
const keyName_1_08 = 'user_bonus_or_not'; // 用户是否兑奖





// 参数变量，方便调试和修改
const setGameDurationTime = 34; // 崇拜过程持续时间 单位是秒
const setBounsLukcyPoint = 1; // 点击一个幸运气球给予的奖励

const setGodsNumber = 18; // 这里并不是设置为多少个神明，而是和网页中的神明匹配，也就说如果网页中决定变更数量，那么这里记得变更

const setBonusBaseLuckyPoint = 5; // 完成崇拜过程就给这个幸运积分奖励 -- 即使用户没有点击幸运气球