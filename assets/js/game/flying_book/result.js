
// 函数
// 函数
// 函数


// 背景音乐 + 鸟叫声
function playBGM() {

    const bgmBird = new newSound('/audio/game/flying_book/audio_d27edefa4c', true, 0.3);

    const bgmBG= new newSound('/audio/game/flying_book/serene-sky-relaxing-piano-176513', true, 0.5);

    bgmBird.play();

    bgmBG.play();
}


// 获取指定语言的随机内容
function getRandomContent(language) {

    const contents = flying_book_jsonData[language];
    
    if (contents && contents.length > 0) {

        const randomIndex = Math.floor(Math.random() * contents.length);

        return contents[randomIndex];

    } else {

        return 'No content available for this language';
    }
}


// 显示book-content: 为了让它显示在页面中间位置，让总体的.game_flying_book变为flex，同时隐藏book_cover
function showBookContent() {

    const varBookContent = document.querySelector('.var_book_content');

    varBookContent.textContent = getRandomContent(returnLangFromUrl());

}

function startGame() {

    const userStartGame = readValueFromRecordInLocal(keyName_1_00, keyName_1_01);

    if (userStartGame) {

        playBGM();

        showBookContent();

        writeValueToRecordInLocal(keyName_1_00, keyName_1_01, DEFAULT_VALUE_FALSE);

    } else {

        showPopupMissData();
    }

    
}



startGame();





