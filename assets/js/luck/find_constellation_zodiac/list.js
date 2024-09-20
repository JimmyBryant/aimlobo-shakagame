const form = document.querySelector('.form_user_birth_date');
const resetButton = document.querySelector('.btn_reset');
const zodiacLink = document.querySelector('.link_zodiac');
const constellationLink = document.querySelector('.link_constellation');
const zodiacIcon = document.querySelector('.zodiac_icon');
const zodiacText = document.querySelector('.zodiac_text');
const constellationIcon = document.querySelector('.constellation_icon');
const constellationText = document.querySelector('.constellation_text');
const birthDateInput = document.querySelector('#input_user_birth_date');

const lang = returnLangFromUrl();

// 根据日期计算星座
function getConstellationSign(day, month) {
    const zodiacDates = [
        { name: 'capricorn', start: new Date(0, 0, 1), end: new Date(0, 0, 19) },    // 1月1日 - 1月19日
        { name: 'aquarius', start: new Date(0, 0, 20), end: new Date(0, 1, 18) },     // 1月20日 - 2月18日
        { name: 'pisces', start: new Date(0, 1, 19), end: new Date(0, 2, 20) },       // 2月19日 - 3月20日
        { name: 'aries', start: new Date(0, 2, 21), end: new Date(0, 3, 19) },        // 3月21日 - 4月19日
        { name: 'taurus', start: new Date(0, 3, 20), end: new Date(0, 4, 20) },       // 4月20日 - 5月20日
        { name: 'gemini', start: new Date(0, 4, 21), end: new Date(0, 5, 21) },       // 5月21日 - 6月21日
        { name: 'cancer', start: new Date(0, 5, 22), end: new Date(0, 6, 22) },       // 6月22日 - 7月22日
        { name: 'leo', start: new Date(0, 6, 23), end: new Date(0, 7, 22) },          // 7月23日 - 8月22日
        { name: 'virgo', start: new Date(0, 7, 23), end: new Date(0, 8, 22) },        // 8月23日 - 9月22日
        { name: 'libra', start: new Date(0, 8, 23), end: new Date(0, 9, 23) },        // 9月23日 - 10月23日
        { name: 'scorpio', start: new Date(0, 9, 24), end: new Date(0, 10, 22) },     // 10月24日 - 11月22日
        { name: 'sagittarius', start: new Date(0, 10, 23), end: new Date(0, 11, 21) },// 11月23日 - 12月21日
        { name: 'capricorn', start: new Date(0, 11, 22), end: new Date(0, 11, 31) }   // 12月22日 - 12月31日
    ];

    const birthDate = new Date(0, month - 1, day);
    for (const zodiac of zodiacDates) {
        if (birthDate >= zodiac.start && birthDate <= zodiac.end) {
            return zodiac.name;
        }
    }
}

// 根据年份计算生肖
function getChineseZodiacSign(year) {
    const zodiacs = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
    return zodiacs[(year - 4) % 12]; // 生肖按12年循环，2008年为鼠年(基准点)
}



// 提交表单事件
form.addEventListener('submit', function (event) {

    event.preventDefault();

    siteBgmSelect.play();

    // 获取用户的生日
    const birthDate = new Date(birthDateInput.value);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    // 计算星座和生肖
    const constellation = getConstellationSign(day, month);
    const zodiac = getChineseZodiacSign(year);

    // 更新链接
    zodiacLink.setAttribute('href', `../zodiac/${zodiac}`);
    constellationLink.setAttribute('href', `../constellation/${constellation}`);

    // 更新图标和文字
    zodiacIcon.textContent = zodiacIconMap[zodiac];  
    zodiacText.textContent = zodiacNameMap[zodiac][lang]; 
    constellationIcon.textContent = zodiacIconMap[constellation];
    constellationText.textContent = zodiacNameMap[constellation][lang];

});


form.addEventListener('reset', () => {

    siteBgmSelect.play();

    form.reset();

    // 恢复初始链接
    zodiacLink.setAttribute('href', '../zodiac/');
    constellationLink.setAttribute('href', '../constellation/');

    // 清空图标和文字
    zodiacIcon.textContent = '';
    zodiacText.textContent = '';
    constellationIcon.textContent = '';
    constellationText.textContent = '';
    
});