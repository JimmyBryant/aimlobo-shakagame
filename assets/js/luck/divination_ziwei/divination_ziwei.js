// 变量定义
var userBirthday;

var userBirthTime;

var userGender;

var astrolabe;

var horoscope;

var indexPalaceInfo;
    

// 选取元素
const appSlogan = document.querySelector('.app_slogan');
const btnStartApp = document.querySelector('.btn_start_app');

const formUserBirthDate = document.querySelector('.form_user_birth_date');
const inputUserBirthdate = formUserBirthDate.querySelector('.input_user_birth_date');

const userInputBirthTimeContainer = document.querySelector('.app_user_input.user_birth_time');

const userInputGenderContainer = document.querySelector('.app_user_input.user_gender');

const appDataLoading = document.querySelector('.app_data_loading');

const appDataNav = document.querySelector('.app_data_nav');

const palacesContainer = document.querySelector('.palaces_container');

const navZhongGong = document.querySelector('.nav_zhong_gong');

const allNavPalaceIndex = document.querySelectorAll('.nav_palace_index');

const appDataZhongGongContainer = document.querySelector('.app_data .zhong_gong_container');

const allPalaceInfoContainer = document.querySelectorAll('.palace_index_info_container');

const btnClosePalaceInfo = document.querySelectorAll('.btn_close_palace_info');
 
// 常量定义 - 名字
/**
 * 星盘对象
 *
 * @property
 * - solarDate 阳历日期
 * - lunarDate 农历日期
 * - chineseDate 干支纪年日期
 * - time 时辰
 * - timeRange 时辰对应的时间段
 * - sign 星座
 * - zodiac 生肖
 * - earthlyBranchOfSoulPalace 命宫地支
 * - earthlyBranchOfBodyPalace 身宫地支
 * - soul 命主
 * - body 身主
 * - palaces 十二宫数据
 *
 * @function
 * - horoscope() 获取运限数据
 * - palace() 获取宫位数据
 */

/**
 * 宫位对象
 *
 * @property
 * - name 宫位名称
 * - isBodyPalace 是否身宫
 * - isOriginalPalace 是否来因宫
 * - heavenlyStem 宫位天干
 * - earthlyBranch 宫位地支
 * - majorStars 主星
 * - minorStars 辅星
 * - adjectiveStars 杂耀
 * - changsheng12 长生12神之一
 * - boshi12 博士12神之一
 * - jiangqian12 将前12神之一
 * - suiqian12 岁前12神之一
 * - decadal 大限
 * - ages 小限
 */


btnStartApp.addEventListener('click', () => {

    setDisplay(appSlogan, displayTypes.none);

    // 更新用户生日的值为今天
    inputUserBirthdate.value = getFormattedDateWithDash();

    // 当触发时显示元素并激活动画
    if (formUserBirthDate.style.display === displayTypes.none || !formUserBirthDate.style.display) {
        
        setDisplay(formUserBirthDate, displayTypes.flex); // 确保元素显示
    }

    setTimeout(() => {
        formUserBirthDate.classList.add('active'); // 切换 active 类实现动画
    }, 10); // 加一点延迟，确保 display 切换生效

});

// 用户选择出生日期
formUserBirthDate.addEventListener('submit', (event) => {

    event.preventDefault();

    siteBgmSelect.play();

    const inputUserBirthDateValue = inputUserBirthdate.value;

    if (inputUserBirthDateValue) {

        inputUserBirthdate.value = inputUserBirthDateValue;

        userBirthday = formatDate(inputUserBirthDateValue);

    }

    // 辅助函数 - 转换日期 yyyy-mm-dd --> yyyy-m-d
    function formatDate(inputDate) {

        const [year, month, day] = inputDate.split('-');

        return `${year}-${parseInt(month)}-${parseInt(day)}`;
    }

    formUserBirthDate.classList.remove('active');

    userInputBirthTimeContainer.classList.add('active');

});


formUserBirthDate.addEventListener('reset', () => {

    setDisplay(appSlogan, displayTypes.block);

    formUserBirthDate.classList.remove('active');
});


// 用户选择出生时间
document.querySelectorAll('.user_birth_time_container').forEach(container => {

    container.addEventListener('click', function () {

        userBirthTime = parseInt(this.getAttribute('value'));

        userInputBirthTimeContainer.classList.remove('active');

        userInputGenderContainer.classList.add('active');
    });
});


// 用户选择性别
document.querySelectorAll('.user_gender_container_item').forEach(item => {

    item.addEventListener('click', function () {

        userGender = this.getAttribute('value');
  
        userInputGenderContainer.classList.remove('active');

        // appDataNav.classList.add('active');

        appDataLoading.classList.add('active');

        // 获取命盘数据
        astrolabe = astro.bySolar(userBirthday, userBirthTime, userGender, true, 'en-US');

        // 获取运限数据 - now
        horoscope = astrolabe.horoscope(new Date());

        // 获取十二宫数据
        indexPalaceInfo = astrolabe.palaces;

        console.log('astrolabe: ', astrolabe);
        console.log('horoscope: ', horoscope);

        // 填充中宫数据
        populateZhongGongInfo();

        // 填充十二宫数据
        populateAllPalaceInfo();

    });
});

// 用户点击加载过程
appDataLoading.addEventListener('click', () => {

    appDataLoading.classList.remove('active');

    setDisplay(appDataNav, displayTypes.grid);

    setTimeout(() => {
        appDataNav.classList.add('active'); // 切换 active 类实现动画
    }, 10); // 加一点延迟，确保 display 切换生效

});

// 用户点击中宫
navZhongGong.addEventListener('click', () => {

    appDataNav.classList.remove('active');

    appDataZhongGongContainer.classList.add('active');

});

// 用户点击十二宫
allNavPalaceIndex.forEach(navPalaceIndex => {
    navPalaceIndex.addEventListener('click', () => {
        
        // 移除 appDataNav 的 active 类
        appDataNav.classList.remove('active');

        // 获取当前点击元素的 value 属性并转换为整数
        var palaceIndex = parseInt(navPalaceIndex.getAttribute('value'));

        // 根据 palaceIndex 选择对应的元素并添加 active 类
        document.querySelector(`.palace_index_${palaceIndex}`).classList.add('active');
    });
});



// 用户关闭中宫和十二宫窗口
// 为每个 .btn_close_palace_info 按钮添加点击事件
btnClosePalaceInfo.forEach(button => {

    button.addEventListener('click', () => {

        appDataZhongGongContainer.classList.remove('active');

        allPalaceInfoContainer.forEach(container => {

            container.classList.remove('active');
        });

        appDataNav.classList.add('active');
        
    });
});


// 中宫数据
function populateZhongGongInfo() {

    const zhongGongInfo = [
        "solarDate",
        "lunarDate",
        "chineseDate",
        "fiveElementsClass",
        "time",
        "timeRange",
        "sign",
        "zodiac",
        "soul",
        "body",
        "earthlyBranchOfSoulPalace",
        "earthlyBranchOfBodyPalace"
    ];

    zhongGongInfo.forEach(info => {
        // 获取对应的 DOM 元素
        const element = appDataZhongGongContainer.querySelector(`.var_${info}`);
        
        // 检查 astrolabe 中是否有对应的数据，并将数据设置为元素的 textContent
        if (element && astrolabe[info] !== undefined) {
            element.textContent = astrolabe[info];
        }
    });
}


// 十二宫数据 - 固定数据
const palaceInfoPart1 = [
    "name",
    "isBodyPalace",
    "isOriginalPalace",
    "heavenlyStem",
    "earthlyBranch",
    "changsheng12",
    "boshi12",
    "jiangqian12",
    "suiqian12",
];

// 通用函数：创建包含亮度或突变信息的元素
function createInfoElement(content) {
    const element = document.createElement('span');
    element.textContent = content;
    return element;
}

// 填充宫名 - nav
function populatePalaceName(index) {

    const palaceIndexContainer = document.querySelector(`.nav_palace_index_${index}`);

    palaceIndexContainer.textContent = indexPalaceInfo[index]['name'];

}

// 填充主、辅、杂耀
function populateStarsInfo(index, starType, containerClass) {
    const indexPalaceContainer = document.querySelector(`.palace_index_${index}`);
    const starsContainer = indexPalaceContainer.querySelector(containerClass);

    // 判断适用哪个数据源
    // 主、辅、杂耀 - indexPalaceInfo[index][starType];
    // 大限 - horoscope['decadal']['stars'][index],
    // 流年 - horoscope['yearly']['stars'][index],

    const stars = indexPalaceInfo[index][starType] || [];

    stars.forEach(star => {
        const elementContainer = document.createElement('div');
        const elementName = document.createElement('span');

        elementName.textContent = star.name;
        elementName.classList.add(star.scope, star.type);
        elementContainer.appendChild(elementName);

        if (star.brightness) elementContainer.appendChild(createInfoElement(star.brightness));
        if (star.mutagen) elementContainer.appendChild(createInfoElement(star.mutagen));

        starsContainer.appendChild(elementContainer);
    });
}

// 填充流耀
function populateHoroscopeInfo(index, starType, containerClass) {
    const indexPalaceContainer = document.querySelector(`.palace_index_${index}`);
    const starsContainer = indexPalaceContainer.querySelector(containerClass);

    const stars = horoscope[starType]['stars'][index] || [];

    stars.forEach(star => {
        const elementContainer = document.createElement('div');
        const elementName = document.createElement('span');

        elementName.textContent = star.name;
        elementName.classList.add(star.scope, star.type);
        elementContainer.appendChild(elementName);

        if (star.brightness) elementContainer.appendChild(createInfoElement(star.brightness));
        if (star.mutagen) elementContainer.appendChild(createInfoElement(star.mutagen));

        starsContainer.appendChild(elementContainer);
    });
}


// 填充单一宫位信息
function populateIndexPalaceInfo(index) {
    const indexPalaceContainer = document.querySelector(`.palace_index_${index}`);
    
    // 填充 palaceInfoPart1 的基本信息
    palaceInfoPart1.forEach(info => {
        const element = indexPalaceContainer.querySelector(`.var_palace_${info}`);
        if (element && indexPalaceInfo[index][info] !== undefined) {
            element.textContent = indexPalaceInfo[index][info];
        }
    });

    // 填充主星、辅星、杂耀星体
    populateStarsInfo(index, 'majorStars', '.var_palace_majorStars');
    populateStarsInfo(index, 'minorStars', '.var_palace_minorStars');
    populateStarsInfo(index, 'adjectiveStars', '.var_palace_adjectiveStars');

    // 填充流耀
    populateHoroscopeInfo(index, 'decadal', '.var_palace_horoscope_decadal_stars');
    populateHoroscopeInfo(index, 'yearly', '.var_palace_horoscope_yearly_stars');

    // 填充年龄信息
    const agesContainer = indexPalaceContainer.querySelector('.var_palace_ages');
    indexPalaceInfo[index]['ages'].forEach(age => {
        const ageElement = document.createElement('span');
        ageElement.textContent = age;
        agesContainer.appendChild(ageElement);
    });

    // 填充大限范围
    const decadalRange = indexPalaceInfo[index]['decadal']['range'];
    indexPalaceContainer.querySelector('.var_palace_decadal_index_0').textContent = decadalRange[0];
    indexPalaceContainer.querySelector('.var_palace_decadal_index_1').textContent = decadalRange[1];
}

// 批量填充所有宫位信息
function populateAllPalaceInfo() {
    for (let index = 0; index < 12; index++) {

        populatePalaceName(index);

        populateIndexPalaceInfo(index);
    }
}

     