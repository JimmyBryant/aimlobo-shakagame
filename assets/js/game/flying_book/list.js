const btnStartGame = document.querySelector('.btn_start_game');


function initGame() {

    const data = {
        [keyName_1_01]: DEFAULT_VALUE_TRUE,
    }

    writeDataToLocal(keyName_1_00, data);
}



btnStartGame.addEventListener('click', () => { 
    
    updateUserLuckyPointToLocal(-setLuckyPointCost);

    updateUserGameTimeToLocal(1);

    initGame();

    window.location.href = "./result";

});