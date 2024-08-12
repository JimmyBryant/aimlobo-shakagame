// 这个库用来写声音相关的内容
// ** 重要 ** -- 这个js文件必须放在howler.min.js文件之后，因为这个库依赖它
/* 这个库与定义的常量有: -- 新增或变化需要在这里编辑 -- 可以直接使用

选择音效 -- bgmSelect
无效选择 -- bgmInvalid
游戏倒计时(4s) -- bgmCountDown4s
游戏胜利 -- bgmWin
游戏失败 -- bgmLose

--- 待添加

*/

/*
使用方法:

开始播放 -- sound.play()
暂停播放 -- sound.pause()
停止播放 -- sound.stop()

*/






// 函数
// 函数
// 函数
// 函数
// 函数

// 返回sound对象 -- 支持webm的情况下，返回webm格式的文件，不支持或者没找到webm的情况下,返回mp3格式的文件
function newSound(audioBaseName, loop = false, volume = 1) {

    const webmSrc = `${audioBaseName}.webm`;
    const mp3Src = `${audioBaseName}.mp3`;

    return new Howl({
        src: [webmSrc, mp3Src], // 尝试加载webm文件，如果失败自动回退到mp3
        html5: true,
        loop: loop,
        volume: volume
    });
}

/*
// 示例使用：
const bgmSelectLoopFalse = newSound('/audio/game/horse_racing/select-sound-121244');
const bgmSelectLoopTrue = newSound('/audio/game/horse_racing/select-sound-121244', true, 0.4);

*/



// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end
// 函数 -- end


// 选择音效-- 有效
const bgmSelect = newSound('/audio/share/select-121244', false, 0.4);

// const bgmSelect = new Howl({
//     src: ["/audio/game/horse_racing/select-sound-121244.mp3"],
//     html5: true,
//     loop: false,
//     volume: 0.4,
// });

// 选择音效-- 无效
const bgmInvalid = newSound('/audio/share/invalid-185098', false, 0.4);
// const bgmInvalid = new Howl({
//     src: ["/audio/game/horse_racing/90s-game-ui-5-185098.mp3"],
//     html5: true,
//     loop: false,
//     volume: 0.4,
// });

// 倒计时4s
const bgmCountDown4s = newSound('/audio/share/count_down_4s-125125', false, 0.3);
// const bgmCountDown4s = new Howl({
//     src: ["/audio/game/horse_racing/race-start-beeps-125125.mp3"],
//     html5: true,
//     loop: false,
//     volume: 0.3,
// });

// 游戏胜利
const bgmWin = newSound('/audio/share/win-218995', false, 0.3);
// const bgmWin = new Howl({
//     src: ["/audio/game/horse_racing/winning-218995.mp3"],
//     html5: true,
//     loop: false,
//     volume: 0.3,
// });

// 游戏失败
const bgmLose = newSound('/audio/share/lose-6008', false, 0.3);
// const bgmLose = new Howl({
//     src: ["/audio/game/horse_racing/negative_beeps-6008.mp3"],
//     html5: true,
//     loop: false,
//     volume: 0.3,
// });