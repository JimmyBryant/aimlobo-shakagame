// 这个库用来写js中需要翻译的内容
// 这个库可以也应该放在最前边，因为它不依赖其他库，但是它有定义常量 'i19N'， 所以应该尽可能靠前；
// 目前支持的语言有: en, zh-cn, zh-tw, --- 待增加
/*
使用方法:

1. 通过函数从当前网址中获取语言；
2. 查询该语言对应的翻译内容；

*/


// 函数
// 函数
// 函数
// 函数
// 函数

// 返回页面语种
// main.js 有同样功能的函数 -- getLanguageFromUrl()
// 后期有需要了在这里新增别的语言
function returnLangFromUrl() {

    const url = window.location.href;
    
    if (url.includes('/en/')) {
        return 'en';
    } else if (url.includes('/zh-cn/')) {
        return 'zh-cn';
    } else if (url.includes('/zh-tw/')) {
        return 'zh-tw';
    } else {
        return 'unknown'; // 如果不包含任何已知的语言路径，则返回'unknown'
    }
}


// 返回翻译内容 -- 参数代表: 该内容在 i19N 中的id
// main.js 有同样功能的函数 -- translate(language, id)
function i19n(id) {

    const language = returnLangFromUrl();

    const translation = i19N[id];

    if (translation) {

        return translation[language] || translation.en; // 如果当前语言没有翻译，返回英文

    } else {

        console.log(`No ID "${id}" found in i19N.`);

        return id; // 如果找不到id，返回id本身
    }
}



// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end


// i19N
//main.js 有同样定义的常量 -- i18n
const i19N = {

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
    // 更多的id和对应的翻译
};