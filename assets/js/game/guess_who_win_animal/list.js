const formSelectWinner = document.querySelector(".form_select_winner");


// 函数

function initGame() {

    const data = {
        [keyName_1_01]: DEFAULT_VALUE_NULL,
        [keyName_1_02]: DEFAULT_VALUE_NULL,
        [keyName_1_03]: DEFAULT_VALUE_FALSE,
        [keyName_1_04]: DEFAULT_VALUE_FALSE,
        [keyName_1_05]: DEFAULT_VALUE_FALSE,
        [keyName_1_06]: DEFAULT_VALUE_FALSE,
        [keyName_1_07]: DEFAULT_VALUE_NULL,
    }

    writeDataToLocal(keyName_1_00, data);

}

// 函数 -- end 


formSelectWinner.addEventListener("submit", (event) => {

    event.preventDefault();

    const selectedWinner = document.querySelector('input[name="select_winner"]:checked');

    if (selectedWinner) {

        const userBetWinner = selectedWinner.value;

        writeValueToRecordInLocal(keyName_1_00, keyName_1_01, userBetWinner);

        // 跳转到.bet
        window.location.href = "./bet";

    } else {

        event.preventDefault();

        siteBgmInvalid.play();
    
        const userNOSelect = document.querySelector('.user_no_select');
    
        userNOSelect.click();
      } 
});

formSelectWinner.addEventListener('reset', () => {

    siteBgmSelect.play();

    formSelectWinner.reset();

});



// 初始化游戏
initGame();