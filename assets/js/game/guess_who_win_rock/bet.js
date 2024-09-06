const pageName = 'bet';

const checkbox = document.getElementById('hide_or_show_all_tips_in_current_page');

const formBetAmount = document.querySelector(".form_bet_amount");



// 函数
// 函数
// 函数


// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

    const userBetWinner = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    const roundEndOrNot = readValueFromRecordInLocal(keyName_1_00, keyName_1_06);

    if (!userBetWinner || roundEndOrNot) {

        showPopupMissData();
        
        return false;
    }

    return true;
}


// 函数 -- end 
// 函数 -- end 
// 函数 -- end 



// 进入页面按顺序执行
// 进入页面按顺序执行
// 进入页面按顺序执行

// 判断用户是否直接跳转到该页面 -- 没有选择马匹
isUserJumpToThisPage();



// 显示/隐藏页面提示 -- 初始化到本地 -- 默认显示 
// 如果有值，就按照这个值来更新页面上的提示显示/隐藏 -- 包括：checkbox.checked
initTipsVisibilityConfig(keyName_1_00, pageName);
hideOrShowAllTipsInCurrentPage(keyName_1_00, pageName);
checkbox.checked = readTipsVisibilityConfig(keyName_1_00, pageName);


// 显示/隐藏页面提示 -- 用户选择的时候进行记录到本地并更新页面
checkbox.addEventListener('change', () => {
    const isVisible = checkbox.checked;
    writeTipsVisibilityConfig(keyName_1_00, pageName, isVisible);
    hideOrShowAllTipsInCurrentPage(keyName_1_00, pageName);
});


// 表单处理
formBetAmount.addEventListener("submit", (event) => {

    event.preventDefault();
    const amountInput = document.querySelector('input[name="bet_amount"]');
    let userBetAmount = parseInt(amountInput.value);

    if (userBetAmount >= minBetAmount && userBetAmount <= maxBetAmount) {

        // 检查幸运值
        if (userBetAmount > parseInt(readValueFromRecordInLocal(keyName_0_01, keyName_0_01_01))) {

            siteBgmInvalid.play();

            clickNotEnoughLuckyPoint();

        } else {

            if (isUserJumpToThisPage()) {

                writeValueToRecordInLocal(keyName_1_00, keyName_1_02, userBetAmount);

                window.location.href = "../play";

            }
  
        }      
    } 
    
});

formBetAmount.addEventListener('reset', () => {

    window.location.href = "../";

});




// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end
// 进入页面按顺序执行 -- end




