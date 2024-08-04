// 解析URL参数，获取记录索引
function getRecordIndexFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('index'));
}


// 主函数，执行页面更新
function main() {

    // 得到序号 index
    const recordIndex = getRecordIndexFromURL();

    // 更新页面上轮次信息 -- index
    updatePageRoundInfo(8 - recordIndex);
    
    updatePageRoundInfoAll(8 - recordIndex);
}

// 执行主函数
main();
