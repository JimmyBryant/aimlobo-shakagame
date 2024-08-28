// 这个库用来写js中需要翻译的内容
// 这个库可以也应该放在最前边，因为它不依赖其他库，但是它有定义常量 'i18N'， 所以应该尽可能靠前；
// 目前支持的语言有: en, zh-cn, zh-tw, --- 待增加
/*
使用方法:

1. 通过函数从当前网址中获取语言；-- main.js -- returnLangFromUrl()
2. 查询该语言对应的翻译内容；-- main.js -- i18n(id)

*/



// i18N -- 翻译内容 -- 常量
const site_i18n_data = {

    // game_ToTo_3

    lottery_yes: {
        'en': 'Yes',
        'zh-cn': '是',
        'zh-tw': '是'
    },

    lottery_no: {
        'en': 'No',
        'zh-cn': '否',
        'zh-tw': '否'
    },

    lottery_open: {
        'en': 'Open',
        'zh-cn': '开盘',
        'zh-tw': '開盤'
    },

    lottery_close: {
        'en': 'Close',
        'zh-cn': '封盘',
        'zh-tw': '封盤'
    },

    lottery_bonus: {
        'en': 'Bonus',
        'zh-cn': '兑奖',
        'zh-tw': '兌獎'
    },

    lottery_stop: {
        'en': 'Stop',
        'zh-cn': '结束',
        'zh-tw': '結束'
    },

    read: {
        'en': 'read',
        'zh-cn': '阅读',
        'zh-tw': '閱讀'
    },

    // game_ToTo_3 -- end

    // page: my 
    male: {
        'en': 'Male',
        'zh-cn': '男',
        'zh-tw': '男'
    },

    female: {
        'en': 'Female',
        'zh-cn': '女',
        'zh-tw': '女'
    },

    game: {
        'en': 'game',
        'zh-cn': '游戏',
        'zh-tw': '遊戲'
    },

    personalized_signature: {
        'en': 'personalized signature',
        'zh-cn': '个性签名',
        'zh-tw': '個性簽名'
    },

    username: {
        'en': 'username',
        'zh-cn': '用户名',
        'zh-tw': '用戶名'
    },

    happy: {
        'en': 'happy',
        'zh-cn': '快乐',
        'zh-tw': '快樂'
    },

    exercise: {
        'en': 'exercise',
        'zh-cn': '运动',
        'zh-tw': '運動'
    },

    sports: {
        'en': 'sports',
        'zh-cn': '运动',
        'zh-tw': '運動'
    },

    dating: {
        'en': 'dating',
        'zh-cn': '约会',
        'zh-tw': '約會'
    },

    laugh: {
        'en': 'laugh',
        'zh-cn': '大笑',
        'zh-tw': '大笑'
    },

    rich: {
        'en': 'rich',
        'zh-cn': '暴富',
        'zh-tw': '暴富'
    },

    match: {
        'en': 'match',
        'zh-cn': '配对',
        'zh-tw': '配對'
    },

    healthy: {
        'en': 'healthy',
        'zh-cn': '健康',
        'zh-tw': '健康'
    },

    show_love: {
        'en': 'Show love',
        'zh-cn': '表白',
        'zh-tw': '表白'
    },

    cry: {
        'en': 'cry',
        'zh-cn': '哭泣',
        'zh-tw': '哭泣'
    },

    sad: {
        'en': 'sad',
        'zh-cn': '难过',
        'zh-tw': '難過'
    },

    disappointment: {
        'en': 'disappointment',
        'zh-cn': '失望',
        'zh-tw': '失望'
    },

    poor: {
        'en': 'poor',
        'zh-cn': '贫穷',
        'zh-tw': '貧窮'
    },

    squabble: {
        'en': 'squabble',
        'zh-cn': '争吵',
        'zh-tw': '爭吵'
    },

    fight: {
        'en': 'fight',
        'zh-cn': '打斗',
        'zh-tw': '打斗'
    },

    mad: {
        'en': 'mad',
        'zh-cn': '生气',
        'zh-tw': '生氣'
    },

    waste_time: {
        'en': 'waste time',
        'zh-cn': '浪费时间',
        'zh-tw': '浪費時間'
    },

    exhausted: {
        'en': 'exhausted',
        'zh-cn': '疲惫',
        'zh-tw': '疲憊'
    },

    risky_behavior: {
        'en': 'risky behavior',
        'zh-cn': '危险行为',
        'zh-tw': '危險行為'
    },

    // page: my  -- end


    // share site -- 注意域名变换
    share_site: {
        'en': 'Check this out! 🚀 Visit shakagame.com for amazing content!',
        'zh-cn': '我刚发现了一个有趣的网站！🚀 访问 shakagame.com 获取精彩内容！',
        'zh-tw': '我剛發現了一個有趣的網站！🚀 訪問 shakagame.com 獲取精彩內容！'
    },

    // 时间 - 秒
    time_second: {
        'en': 's',
        'zh-cn': '秒',
        'zh-tw': '秒',
    }


    // 更多的id和对应的翻译
};