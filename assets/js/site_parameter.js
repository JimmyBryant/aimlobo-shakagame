// 这个库用来储存参数
// 这样做的好处在于，将参数与函数分离，更易于使用
// **重要**： 这里命名的常量全网站通用，所以不能在其他地方也这样命名

// 预定义的常量
// 预定义的常量
// 预定义的常量
// 预定义的常量
// 预定义的常量

const DEFAULT_VALUE_FALSE = false; 
const DEFAULT_VALUE_TRUE = true; 
const DEFAULT_VALUE_NULL = null; 
const DEFAULT_VALUE_UNDEFINED = undefined; 

// 元素展示样式 -- 预定义展示类型
const displayTypes = {
    none: "none",
    flex: "flex",
    block: "block",
    inlineBlock: "inline-block",
    grid: "grid"
};

// 获取当前时间 -- 返回Date对象 -- 注意这是函数，调用的时候是：currentTime()
const currentTime = () => new Date();

// 获取当前时间 - iso格式 -- 返回ISO时间字符串 -- 注意这是函数，调用的时候是：currentTimeInISO()
const currentTimeInISO = () => new Date().toISOString();



// 预定义的常量 -- end
// 预定义的常量 -- end
// 预定义的常量 -- end
// 预定义的常量 -- end
// 预定义的常量 -- end





// 参数变量，方便调试和修改
const setLuckyPointForUserFirstLogin = 100; // 用户第一次登陆网站赠送的幸运积分数量
const setAvatarForUserFirstLogin = '🎃'; // 用户第一次登陆网站默认的头像
const setGenderForUserFirstLogin = 'male'; // 用户第一次登陆网站默认的性别
const setMinPostLikeNumberForUserFirstLogin = 10000; // 用户第一次登陆网站的文章点赞数量 min
const setMaxPostLikeNumberForUserFirstLogin = 50000; // 用户第一次登陆网站的文章点赞数量 max
const setMinSiteVisitorNumberForUserFirstLogin = 5000; // 用户第一次登陆网站的访客数量 min
const setMaxSiteVisitorNumberForUserFirstLogin = 10000; // 用户第一次登陆网站的访客数量 max
const intervalClickBtnShareSite = 60; // 用户点击间隔时间 -- 分享网站
const intervalClickBtnPostLike = 60; // 用户点击间隔时间 -- 文章点赞
const intervalClickBtnReadPlus = 60; // 用户点击间隔时间 -- 阅读 + 1
const bonusLuckyPointClickBtnShareSite = 5; // 奖励 5 -- 用户点击分享网站
const bonusLuckyPointClickBtnPostLike = 1; // 奖励 1 -- 用户给文章点赞
const htmlNameNotEnoughLuckyPoint = 'not_enough_lucky_point'; // html元素名称
const setBaseAddLuckyPointCheckIn = 10; // 每次点击 check_in 增加的基础幸运值
const setBonusAddLuckyPointCheckIn = 10; // 每次点击 check_in 增加的额外幸运值被除数，比如等级1，就加0.1;
const setBaseAddUSerLevelCheckIn = 1; // 每次点击 check_in 增加的基础等级 -- 暂无额外等级

const setMinLuckyPointForOtherUserInit = 1000; // 初始化其他用户的幸运值 min
const setMaxLuckyPointForOtherUserInit = 200000; // 初始化其他用户的幸运值 max
const setMinUserLevelForOtherUserInit = 20; // 初始化其他用户的用户等级 min
const setMaxUserLevelForOtherUserInit = 100; // 初始化其他用户的用户等级 max
const setMinUserGameTimeForOtherUserInit = 200; // 初始化其他用户的游戏次数 min
const setMaxUserGameTimeForOtherUserInit = 1000; // 初始化其他用户的游戏次数 max
const setMinUserReadTimeForOtherUserInit = 100; // 初始化其他用户的阅读次数 min
const setMaxUserReadTimeForOtherUserInit = 500; // 初始化其他用户的阅读次数 max

const setMinLuckyPointForOtherUserDaily = 50; // 每天更新其他用户的幸运值 min
const setMaxLuckyPointForOtherUserDaily = 5000; // 每天更新其他用户的幸运值 max
const setMinUserLevelForOtherUserDaily = 1; // 每天更新其他用户的用户等级 min
const setMaxUserLevelForOtherUserDaily = 2; // 每天更新其他用户的用户等级 max
const setMinUserGameTimeForOtherUserDaily = 50; // 每天更新其他用户的游戏次数 min
const setMaxUserGameTimeForOtherUserDaily = 200; // 每天更新其他用户的游戏次数 max
const setMinUserReadTimeForOtherUserDaily = 30; // 每天更新其他用户的阅读次数 min
const setMaxUserReadTimeForOtherUserDaily = 100; // 每天更新其他用户的阅读次数 max

const setBonusLuckyPointForRankTop1 = 50; // 用户登上排行榜第一名的积分奖励
const setBonusLuckyPointForRankTop2 = 30; // 用户登上排行榜第二名的积分奖励
const setBonusLuckyPointForRankTop3 = 10; // 用户登上排行榜第三名的积分奖励
const setBonusLuckyPointForRankMoreThanOneTop1 = 50; // 用户至少2榜第一，再额外增加的积分奖励
const setBonuslevelForRankMoreThanOneTop1 = 1; // 用户至少2榜第一，就增加的用户等级

const setMinPostLikeNumberForUserEveryTime = 3; // 用户每次刷新网页都更新的文章点赞数量 min
const setMaxPostLikeNumberForUserEveryTime = 5; // 用户每次刷新网页都更新的文章点赞数量 max
const setMinSiteVisitorNumberForUserEveryTime = 1; // 用户每次刷新网页都更新的网站访客数量 min
const setMaxSiteVisitorNumberForUserEveryTime = 3; // 用户每次刷新网页都更新的网站访客数量 max
const setMinPostLikeNumberForUserDaily = 3000; // 用户每天刷新网页都更新的文章点赞数量 min
const setMaxPostLikeNumberForUserDaily = 9000; // 用户每天刷新网页都更新的文章点赞数量 max
const setMinSiteVisitorNumberForUserDaily = 2000; // 用户每天刷新网页都更新的网站访客数量 min
const setMaxSiteVisitorNumberForUserDaily = 5000; // 用户每天刷新网页都更新的网站访客数量 max


// 参数变量，写入local

// 旧keyname
const keyName_0_00_01 = 'total_lucky_point';
const keyName_0_00_02 = 'user_avatar';
const keyName_0_00_03 = 'user_name';
const keyName_0_00_04 = 'user_description';
const keyName_0_00_05 = 'user_birthday';
const keyName_0_00_06 = 'user_level';
const keyName_0_00_07 = 'game_time';
const keyName_0_00_08 = 'read_time';
const keyName_0_00_09 = 'last_check_in_date';
const keyName_0_00_10 = 'last_login_in_date';
const keyName_0_00_11 = 'post_like';
const keyName_0_00_12 = 'visitor_number';



// 新keyname
const keyName_site_DN = 'shakagame';
const keyName_0_01 = 'user_info';
const keyName_0_02 = 'other_user_info';
const keyName_0_03 = 'site_info'; // 用来储存网站的一些信息 -- 比如之前的'post_like', 'visitor_number'...; 
const keyName_0_04 = 'page_config';


const keyName_0_01_01 = 'user_lucky_point';
const keyName_0_01_02 = 'user_avatar';
const keyName_0_01_03 = 'user_name';
const keyName_0_01_04 = 'user_signature';
const keyName_0_01_05 = 'user_birthday';
const keyName_0_01_06 = 'user_level';
const keyName_0_01_07 = 'user_game_time';
const keyName_0_01_08 = 'user_read_time';
const keyName_0_01_09 = 'user_last_check_in_date';
const keyName_0_01_10 = 'user_last_login_date';
const keyName_0_01_11 = 'user_last_time_click_btn_share_site'; // 点击分享网站按钮
const keyName_0_01_12 = 'user_last_time_click_btn_read_plus'; // 点击阅读 + 1 按钮
const keyName_0_01_13 = 'user_last_time_click_btn_post_like'; // 点击文章点赞 + 1 按钮
const keyName_0_01_14 = 'user_gender'; // 补充用户性别


const keyName_0_02_01 = 'user_id';


const keyName_0_03_01 = 'post_like_number';
const keyName_0_03_02 = 'site_visitor_number';


const keyName_0_04_01 = 'hide_or_show_all_tips_in_current_page';





