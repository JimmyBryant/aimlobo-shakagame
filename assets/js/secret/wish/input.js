const formWish = document.querySelector('.form_wish');



// 判断用户是否直接跳转到该页面
function isUserJumpToThisPage() {

    const userStartGame = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    if (userStartGame === DEFAULT_VALUE_NULL) {

        showPopupMissData();
        
        return false;

    } else if (userStartGame) {

        return true;
    }
}

isUserJumpToThisPage();

// 表单处理
formWish.addEventListener("submit", (event) => {

    event.preventDefault();

    const wishContent = document.getElementById('wish_content').value;

    if (isUserJumpToThisPage()) {

        writeValueToRecordInLocal(keyName_1_00, keyName_1_02, wishContent);

        window.location.href = "../wish";
    } 
    
});

formWish.addEventListener('reset', () => {

    window.location.href = "../";

});
