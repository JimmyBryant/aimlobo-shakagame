const formHorseSelect = document.querySelector(".form_horse_select");


// 函数

function initGameHorseRacing() {

    const data = {
        [keyName_1_01]: DEFAULT_VALUE_NULL,
        [keyName_1_02]: DEFAULT_VALUE_NULL,
        [keyName_1_05]: DEFAULT_VALUE_FALSE,
        [keyName_1_06]: DEFAULT_VALUE_FALSE,
        [keyName_1_07]: DEFAULT_VALUE_FALSE,
        [keyName_1_08]: DEFAULT_VALUE_FALSE,
        [keyName_1_09]: DEFAULT_VALUE_FALSE,
    }

    writeDataToLocal(keyName_1_00, data);

}

// 函数 -- end 


formHorseSelect.addEventListener("submit", (event) => {

    event.preventDefault();

    const selectedHorse = document.querySelector('input[name="select_horse"]:checked');

    if (selectedHorse) {

        userBetHorse = parseInt(selectedHorse.value);

        writeValueToRecordInLocal(keyName_1_00, keyName_1_01, userBetHorse);

        // 跳转到.bet
        window.location.href = "./bet";

    } else {

        siteBgmInvalid.play();
    
        const userNOSelect = document.querySelector('.user_no_select');
    
        userNOSelect.click();
      } 
});

formHorseSelect.addEventListener('reset', () => {

    siteBgmSelect.play();

    formHorseSelect.reset();

});



// 初始化游戏
initGameHorseRacing();