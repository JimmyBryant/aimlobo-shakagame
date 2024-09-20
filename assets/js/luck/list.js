
// 获取随机索引的函数
function getRandomIndex(list) {
    return Math.floor(Math.random() * list.length);
}

// 填充格言内容
function populateDailyQuote() {

    const lang = returnLangFromUrl(); 

    const dailyQuoteList = dailyQuoteData[lang]; // 获取 每日格言 数据

    const varDailyQuote = document.querySelector('.var_daily_quote');

    varDailyQuote.textContent = dailyQuoteList[getRandomIndex(dailyQuoteList)];
}



populateDailyQuote();