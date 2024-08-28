/*
 这个库用来写通用的函数，所有地方都可以通用的

 所以只能写函数，并且一定要写函数的错误输出，便于定位和调试 -- 变更：用到常量 -- 在js/site_parameter.js中定义
 
 使用顺序注意：
    - 1. 导入常量 js/site_parameter.js;
    - 2. 导入数据 js/site_data.js
    - 3. 导入翻译库 js/site_i18n_data.js
    - 4. 导入音频库 js/site_sound.js -- 这个库可以直接导入的前提： 在 head 中已经预先放置了 howler.min.js
    - 5. （可选，但必须放在这一步）其他子页面的 parameter.js, 其他页面的其他 js 库 (比如 share.js)

*/ 
/*
该函数库的目录：


1. 数据读取和写入
    - 普通读/写/删除本地全部数据； -- 键名下的所有内容
    - 普通读/写本地数据中的值 -- no index record
    - 普通读/写本地数据中的某条记录 -- index record
    - 普通读/写本地数据中的某条记录中的某个值 -- index record 
2. 页面配置：读取，写入，初始化 -- 本地
3. 页面提示相关：
    - 点击X关闭页面上某条提示 -- 'in_page_tips'
    - 显示/隐藏页面的所有提示 -- 'hide_or_show_all_tips_in_current_page'
    - 页面配置中的：显示/隐藏页面的所有提示 -- 在用户操作的时候记录用户的选择到本地
4. 功能性函数
    - 得到一个区间的随机整数
    - 日期函数
        - 获取日期（ "YYYY-MM-DD"）-- 可以传递任意日期作为参数，默认值是今天
        - 获取昨天的日期（ "YYYY-MM-DD"）
        - 获取日期（ "YYYYMMDD"）-- 可以传递任意日期作为参数，默认值是今天
        - 获取昨天的日期（ "YYYYMMDD"）
        - 获取当天的凌晨0点时间
        - ISO字符串转换为Date对象
        - Date对象转换为ISO字符串
    - 返回页面语种
    - i18n -- 翻译js中的内容 -- 依赖 site_i18n_data.js 这个库

5. 元素样式函数：
    - 设置HTML元素的所有样式
    - 设置HTML元素的展示样式 -- 预定义了常量 displayTypes 可以快捷使用
    - 点击某个HTML元素，设置某个HTML元素的展示样式

6. 特定目的函数：
    - 点击跳转到页面顶部
    - 移动端点击汉堡图标显示/隐藏菜单栏
    - 初始化用户数据 -- 用户第一次登陆该网站
    - 初始化网站数据 -- 用户第一次登录网站
    - 转移操作 -- 用户有历史数据 -- 转移到新键名
    - 更新用户幸运值到本地
    - 更新用户等级到本地
    - 更新用户游戏次数到本地
    - 更新用户阅读次数到本地
    - 更新文章点赞数量到本地
    - 更新网站访客数量到本地
    - 更新用户头像到页面
    - 更新用户名称到页面
    - 更新用户签名到页面
    - 更新用户生日到页面
    - 更新用户幸运值到页面
    - 更新用户等级到页面
    - 更新用户游戏次数到页面
    - 更新用户阅读次数到页面
    - 更新文章点赞数量到页面
    - 更新网站访客数量到页面
    - 每隔指定时间（秒）执行给定的一系列回调函数
    - 点击分享网站按钮
    - 点击积分不足 -- 弹出popup_info -- 显示积分不足
    - 是否是特别用户 -- ['DFMGJX', 'duo duo ❤️ diu diu'] -- 可修改
    - 更新用户上次登录日期到本地
    - 填充玫瑰花到网页
    - 点击弹出玫瑰花
    - 更新时间(秒)到页面 -- 翻译时间(秒)
    - 点击阅读+1按钮
    - 点击post_like按钮
    - 显示缺乏数据 -- 游戏中，用户直接跳转到游戏的非首页（需要首页初始化数据），就弹出提示

7. 特定事件处理
    - 用户点击 popup_box(弹出框）之外的地方来隐藏 popup_box
    - 用户点击 info_icon 后展示信息3s后关闭 -- 参数可以变更展示时长
    - 用户点击 tips_icon 后弹出 popupTips, 包裹在tips_icon下边 -- 有 btn_get_it  

8. 全局执行
    - 移动端点击汉堡图标显示/隐藏菜单栏 
    - 转移操作 -- 用户有历史数据 -- 转移到新键名
    - 初始化用户数据 -- 用户第一次登陆该网站
    - 初始化网站数据 -- 用户第一次登录网站 
    - 点击跳转到页面顶部
    - 更新用户幸运值到页面
    - 点击分享网站按钮
    - 更新用户上次登录日期到本地
    - 点击弹出玫瑰花
    - 更新时间(秒)到页面 -- 翻译时间(秒)
    - 更新用户头像到页面
    - 更新用户名称到页面
    - 更新用户阅读次数到页面
    - 点击阅读+1按钮
    - 点击post_like按钮
    - 弹窗提示 -- 可点击关闭 -- 可用于展示提示信息

*/




// 数据读取和写入
// 数据读取和写入
// 数据读取和写入
// 数据读取和写入
// 数据读取和写入

// 通用的函数：从 localStorage 中读取数据并解析
// 没有值的情况下返回 DEFAULT_VALUE_NULL(null)
function readDataFromLocal(keyName) {

    try {

        const value = localStorage.getItem(keyName);

        return value ? JSON.parse(value) : DEFAULT_VALUE_NULL;

    } catch (error) {

        console.error(`Error read data from localStorage key: ${keyName}`);

        return DEFAULT_VALUE_NULL;
    }
}

// 通用的函数：写入数据到 localStorage
function writeDataToLocal(keyName, data) {

    try {

        localStorage.setItem(keyName, JSON.stringify(data));

    } catch (error) {

        console.error(`Error write data to localStorage key: ${keyName}`);
    }
}

// 通用的函数：从 localStorage 中删除指定键
function removeDataFromLocal(keyName) {

    try {

        localStorage.removeItem(keyName);

    } catch (error) {

        console.error(`Error removing key: ${keyName} from localStorage`, error);
    }
}

// 通用的函数：删除所有 localStorage 中的数据
function removeAllDataFromLocal() {

    try {

        localStorage.clear();

    } catch (error) {

        console.error('Error remove all data from localStorage', error);
    }
}


// 初始化写入数据到本地
function initDataToLocal(firstLevelKeyName, initialValue) {

    if (!localStorage.getItem(firstLevelKeyName)) {

        writeDataToLocal(firstLevelKeyName, initialValue);
    }
}

// 获取该键名下的某个键的值 -- 参数代表: 要从 local 读取的键名; 该记录下的键名 
// 没有值的情况下返回 DEFAULT_VALUE_NULL(null)
// 注意区别：没有Index, 也就是说这个键名下不会从index record 读取，而是直接读取某个键的值
function readValueFromRecordInLocal(firstLevelKeyName, secondLevelKeyName) {
    
    const data = readDataFromLocal(firstLevelKeyName);

    if (data && data.hasOwnProperty(secondLevelKeyName)) {

        return data[secondLevelKeyName];

    } else {

        console.warn(`Key ${secondLevelKeyName} not found under ${firstLevelKeyName}`);

        return DEFAULT_VALUE_NULL;
    }
}

// 写入该键名下的某个键的值 -- 参数代表: 要从 local 读取的键名; 该记录下的键名; 要写入的值
function writeValueToRecordInLocal(firstLevelKeyName, secondLevelKeyName, value) {

    const data = readDataFromLocal(firstLevelKeyName) || {};  // 如果没有数据则初始化为空对象

    // 设置指定键的值
    data[secondLevelKeyName] = value;

    // 将更新后的数据写回 localStorage
    writeDataToLocal(firstLevelKeyName, data);
}


// 读取某一条记录 -- 参数代表: 要从 local 读取的键名; 该键名的 value 中的第几条记录
// 没有值的情况下返回 DEFAULT_VALUE_NULL(null)
function readIndexRecordFromLocal(firstLevelKeyName, index) {

    const data = readDataFromLocal(firstLevelKeyName);

    if (Array.isArray(data) && index >= 0 && index < data.length) {

        return data[index];

    } else {

        console.warn(`Invalid index: ${index} for key: ${firstLevelKeyName}`);

        return DEFAULT_VALUE_NULL;
    }
}

// 写入某一条记录 -- 参数代表: 要从 local 读取的键名; 该键名的 value 中的第几条记录, 该记录的内容
function writeIndexRecordToLocal(firstLevelKeyName, index, recordValue) {

    const data = readDataFromLocal(firstLevelKeyName);

    if (Array.isArray(data) && index >= 0 && index < data.length) {

        data[index] = recordValue;

        writeDataToLocal(firstLevelKeyName, data);

    } else {

        console.warn(`Invalid index: ${index} for key: ${firstLevelKeyName}`);
    }
}

// 读取某一条记录的某个值 -- 参数代表: 要从 local 读取的键名; 第几条记录, 该记录下的键名（二级）
// 没有值的情况下返回 DEFAULT_VALUE_NULL(null)
function readValueFromIndexRecordInLocal(firstLevelKeyName, index, secondLevelKeyName) {

    const record = readIndexRecordFromLocal(firstLevelKeyName, index);

    if (record && record.hasOwnProperty(secondLevelKeyName)) {

        return record[secondLevelKeyName];

    } else {

        console.warn(`Key ${secondLevelKeyName} not found in record at index ${index}`);

        return DEFAULT_VALUE_NULL;
    }
}

// 写入某一条记录的某个值到该记录中去 -- 参数代表: 要从 local 读取的键名; 第几条记录, 该记录下的键名（二级）,要写入的值
function writeValueToIndexRecordInLocal(firstLevelKeyName, index, secondLevelKeyName, value) {

    const record = readIndexRecordFromLocal(firstLevelKeyName, index);

    if (record) {

        record[secondLevelKeyName] = value;

        writeIndexRecordToLocal(firstLevelKeyName, index, record);

    } else {

        console.warn(`Cannot write value to index ${index} for key ${firstLevelKeyName}`);
    }
}



// 数据读取和写入 -- end
// 数据读取和写入 -- end
// 数据读取和写入 -- end
// 数据读取和写入 -- end
// 数据读取和写入 -- end



// 页面配置
// 页面配置
// 页面配置
// 页面配置
// 页面配置


// 设置网页的配置 -- 参数代表：应用名称，网页名称，配置名称，配置的值
function writePageConfig(appName, pageName, configName, configValue) {

    let pageConfig = readDataFromLocal(keyName_0_04) || {};

    // 使用链式赋值以减少嵌套
    pageConfig[appName] = pageConfig[appName] || {};
    pageConfig[appName][pageName] = pageConfig[appName][pageName] || {};

    // 更新配置值
    pageConfig[appName][pageName][configName] = configValue;

    writeDataToLocal(keyName_0_04, pageConfig);
}

// 读取网页的配置 -- 参数代表：应用名称，网页名称，配置名称 -- 找不到返回 DEFAULT_VALUE_UNDEFINED
function readPageConfig(appName, pageName, configName) {

    const localConfig = readDataFromLocal(keyName_0_04);

    return localConfig?.[appName]?.[pageName]?.[configName] ?? DEFAULT_VALUE_UNDEFINED;
}

// 初始化网页的配置 -- 参数代表：应用名称，网页名称，配置名称 -- 注意传递的默认值是false
function initPageConfig(appName, pageName, configName) {

    let configValue = readPageConfig(appName, pageName, configName);

    if (configValue === undefined) {
        configValue = DEFAULT_VALUE_FALSE;
        writePageConfig(appName, pageName, configName, configValue);
    }

    return configValue;
}


// 页面配置 -- end
// 页面配置 -- end
// 页面配置 -- end
// 页面配置 -- end
// 页面配置 -- end


// 页面提示
// 页面提示
// 页面提示
// 页面提示
// 页面提示

// 弹窗提示 -- 可点击关闭 -- 可用于展示提示信息
function clickHideInPageTips() {

    document.querySelectorAll('.in_page_tips .close').forEach(closeBtn => {

        closeBtn.addEventListener('click', (event) => {

            closeBtn.closest('.in_page_tips').style.display = "none";

            event.stopPropagation(); // 阻止事件冒泡
        });
    });
}


// 显示/隐藏当前页面上所有的提示
// 使用前提： 预先写入默认值到local -- 因为这个函数是从本地取值
function hideOrShowAllTipsInCurrentPage(appName, pageName) {

    const hideOrShow = readPageConfig(appName, pageName, keyName_0_04_01);

    // true for show, false for hide
    const displayStyle = hideOrShow ? "flex" : "none";

    document.querySelectorAll('.in_page_tips').forEach(tip => {

        tip.style.display = displayStyle;
    });

}

// 读取某个页面的配置 'hide_or_show_all_tips_in_current_page'
// 用来记录用户是显示还是隐藏当前页面的所有提示
// 找不到返回 DEFAULT_VALUE_UNDEFINED
function readTipsVisibilityConfig(appName, pageName) {

    return readPageConfig(appName, pageName, keyName_0_04_01);
}

// 写入某个页面的配置 'hide_or_show_all_tips_in_current_page'
// 用来记录用户是显示还是隐藏当前页面的所有提示
function writeTipsVisibilityConfig(appName, pageName, configValue) {

    writePageConfig(appName, pageName, keyName_0_04_01, configValue);
}

// 初始化某个页面的配置 'hide_or_show_all_tips_in_current_page', 默认值是 true, 表示显示
function initTipsVisibilityConfig(appName, pageName) {

    const configValue = readTipsVisibilityConfig(appName, pageName);

    if (configValue === DEFAULT_VALUE_UNDEFINED) {

        writeTipsVisibilityConfig(appName, pageName, DEFAULT_VALUE_TRUE);
    }
}

// 更新某个页面的配置 'hide_or_show_all_tips_in_current_page' -- 在用户选择的时候记录值到本地
function updateTipsVisibilityConfig(appName, pageName) {

    const checkbox = document.getElementById(keyName_0_04_01);
    
    checkbox.addEventListener('change', () => {

        const isVisible = checkbox.checked;

        writeTipsVisibilityConfig(appName, pageName, isVisible);
    });
}


// 页面提示 -- end
// 页面提示 -- end
// 页面提示 -- end
// 页面提示 -- end
// 页面提示 -- end



// 功能性函数
// 功能性函数
// 功能性函数
// 功能性函数
// 功能性函数

// 得到一个区间范围内的随机整数
function getRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 获取并格式化今天的日期为字符串（如 "YYYY-MM-DD"）-- 可以传递任意日期作为参数，默认值是今天
// 传递一个 Date 对象作为参数（例如 new Date('2024-08-10')）
function getFormattedDateWithDash(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 获取昨天日期，格式为YYYY-MM-DD
function getYesterdayDateWithDash() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return getFormattedDateWithDash(yesterday);
}

// 获取并格式化今天的日期为字符串（如 "YYYYMMDD"）-- 可以传递任意日期作为参数，默认值是今天
function getFormattedDateWithoutDash(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 获取昨天日期，格式为YYYYMMDD
function getYesterdayDateWithoutDash() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return getFormattedDateWithoutDash(yesterday);
}

// 获取当天的凌晨0点时间
function getTodayStartTime() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

// ISO字符串转换为Date对象
function isoToDate(isoString) {
    return new Date(isoString);
}

// Date对象转换为ISO字符串
function dateToISO(date = new Date()) {
    return date.toISOString();
}


// 返回页面语种
// 目前支持的语言有: en, zh-cn, zh-tw, --- 待增加
// 后期有需要了在这里新增别的语言
function returnLangFromUrl() {

    const url = window.location.href;

    const languages = ['en', 'zh-cn', 'zh-tw']; // 支持的语言 -- 后期在这里添加

    for (const lang of languages) {

        if (url.includes(`/${lang}/`)) {

            return lang;
        }
    }
    
    return 'en'; // 默认语言
}

// i18n -- 翻译js中的内容 -- 依赖i18N.js 这个库
// 返回翻译内容 -- 参数代表: 该内容在 i18N.js 中的id 
function i18n(id) {

    const language = returnLangFromUrl();

    const translation = site_i18n_data[id];

    if (translation) {

        return translation[language] || translation.en; // 如果当前语言没有翻译，返回英文

    } else {

        console.log(`No ID "${id}" found in site_i18n_data.`);

        return id; // 如果找不到id，返回id本身
    }
}


// 功能性函数 -- end
// 功能性函数 -- end
// 功能性函数 -- end
// 功能性函数 -- end
// 功能性函数 -- end

// 元素样式函数
// 元素样式函数
// 元素样式函数
// 元素样式函数
// 元素样式函数

// 设置元素所有样式
/*
示例：

setStyle(element, { display: "flex", color: "red", backgroundColor: "yellow" });
*/
function setStyle(element, styles) {
    Object.assign(element.style, styles);
}


// 设置元素展示样式
function setDisplay(element, displayType) {
    element.style.display = displayType;
}

// 设置元素展示样式 -- 点击某个元素，展示某个元素的样式
function clickSetDisplay(trigger, target, displayType) {
    trigger.addEventListener('click', () => setDisplay(target, displayType));
}

/*
示例：

setDisplay(element, "flex"); 
setDisplay(element, "block"); 
clickSetDisplay(trigger, target, "grid"); 


结合预定义的常量 -- displayTypes -- 可以这样使用

setDisplay(element, displayTypes.flex);
clickSetDisplay(trigger, target, displayTypes.block);

*/ 



function hide(element) {
    element.style.display = "none";
}

function displayFlex(element) {
    element.style.display = "flex";
}

function displayBlock(element) {
    element.style.display = "block";
}

function displayInlineBlock(element) {
    element.style.display = "inline-block";
}

function displayGrid(element) {
    element.style.display = "grid";
}

function clickTriggerElementDisplayTargetElementStyle(triggerElement, targetElement, style) {
    triggerElement.addEventListener('click', () => displayElementStyle(targetElement, style));
}

function clickDisplayBlock(trigger, target) {
    trigger.addEventListener('click', () => displayBlock(target));
}

function clickDisplayFlex(trigger, target) {
    trigger.addEventListener('click', () => displayFlex(target));
}

function clickDisplayGrid(trigger, target) {
    trigger.addEventListener('click', () => displayGrid(target));
}

function clickHide(trigger, target) {
    trigger.addEventListener('click', () => hide(target));
}


// 元素样式函数 -- end
// 元素样式函数 -- end
// 元素样式函数 -- end
// 元素样式函数 -- end
// 元素样式函数 -- end


// 特定目的函数
// 特定目的函数
// 特定目的函数
// 特定目的函数
// 特定目的函数

// 点击跳转到页面顶部 -- 默认值是100px，可根据需要自己传递参数，单位是px
function clickBtnBackToTop(scrollThreshold = 100) {

    const btnBackToTop = document.getElementById("btnBackToTop");

    if (!btnBackToTop) return;

    // 显示或隐藏按钮
    const scrollFunction = () => {
        setDisplay(btnBackToTop, window.scrollY > scrollThreshold ? displayTypes.block : displayTypes.none);
    };

    // 平滑滚动到顶部
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    // 绑定事件监听器
    window.addEventListener('scroll', scrollFunction);
    btnBackToTop.addEventListener('click', scrollToTop);
}

// 移动端点击汉堡图标显示/隐藏菜单栏 -- 这里结合css
function clickToggleMobileMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');

    if (!menuIcon || !menu) return;

    menuIcon.addEventListener('click', (event) => {
        menu.classList.toggle('active');
        event.stopPropagation();
    });
}

// 初始化用户数据 -- 用户第一次登录网站
function initUserInfo() {
    const userFirstLogin = readDataFromLocal(keyName_0_01);

    if (!userFirstLogin) {
        const data = {
            [keyName_0_01_01]: setLuckyPointForUserFirstLogin,
            [keyName_0_01_02]: setAvatarForUserFirstLogin,
            [keyName_0_01_03]: `${i18n('username')}`,
            [keyName_0_01_04]: i18n('personalized_signature'),
            [keyName_0_01_05]: getYesterdayDateWithDash(),
            [keyName_0_01_06]: 0,
            [keyName_0_01_07]: 0,
            [keyName_0_01_08]: 0,
            [keyName_0_01_09]: DEFAULT_VALUE_NULL,
            [keyName_0_01_10]: getFormattedDateWithDash(),
            [keyName_0_01_11]: DEFAULT_VALUE_NULL,
            [keyName_0_01_12]: DEFAULT_VALUE_NULL,
            [keyName_0_01_13]: DEFAULT_VALUE_NULL,
            [keyName_0_01_14]: setGenderForUserFirstLogin,

        };

        writeDataToLocal(keyName_0_01, data);
    }
}

// 初始化网站数据 -- 用户第一次登录网站
function initSiteInfo() {

    const userFirstLogin = readDataFromLocal(keyName_0_03);

    if (!userFirstLogin) {

        const data = {
            [keyName_0_03_01]: getRandomIntegerInRange(setMinPostLikeNumberForUserFirstLogin, setMaxPostLikeNumberForUserFirstLogin),
            [keyName_0_03_02]: getRandomIntegerInRange(setMinSiteVisitorNumberForUserFirstLogin, setMaxSiteVisitorNumberForUserFirstLogin),
        };

        writeDataToLocal(keyName_0_03, data);
    }

}

// 转移操作 -- 用户有历史数据 -- 转移到新键名
// 先读取用户的数据，暂存，清空后执行写入到新键名下
function transferOldDataToNewData() {

    const oldLuckyPoint = readDataFromLocal(keyName_0_00_01);

    if (oldLuckyPoint) {

        // 以前代码的原因，默认是写入了''给到last_check_in_date
        const lastCheckInDateValue = localStorage.getItem(keyName_0_00_09) === '' 
            ? DEFAULT_VALUE_NULL 
            : getFormattedDateWithDash(new Date(localStorage.getItem(keyName_0_00_09)));

        // 以前代码的原因，user_birthday
        const userBirthdayValue = localStorage.getItem(keyName_0_00_05) === '' 
            ? DEFAULT_VALUE_NULL 
            : getFormattedDateWithDash(new Date(localStorage.getItem(keyName_0_00_05)));

        const userInfo = {

            [keyName_0_01_01]: readDataFromLocal(keyName_0_00_01),
            [keyName_0_01_02]: localStorage.getItem(keyName_0_00_02), // 以前代码的原因，导致存储的内容样式上不是字符串
            [keyName_0_01_03]: localStorage.getItem(keyName_0_00_03), // 以前代码的原因，导致存储的内容样式上不是字符串
            [keyName_0_01_04]: localStorage.getItem(keyName_0_00_04), // 以前代码的原因，导致存储的内容样式上不是字符串
            [keyName_0_01_05]: userBirthdayValue,
            [keyName_0_01_06]: readDataFromLocal(keyName_0_00_06),
            [keyName_0_01_07]: readDataFromLocal(keyName_0_00_07),
            [keyName_0_01_08]: readDataFromLocal(keyName_0_00_08),
            [keyName_0_01_09]: lastCheckInDateValue,
            [keyName_0_01_10]: getFormattedDateWithDash(),
            [keyName_0_01_11]: DEFAULT_VALUE_NULL,
            [keyName_0_01_12]: DEFAULT_VALUE_NULL,
            [keyName_0_01_13]: DEFAULT_VALUE_NULL,
            [keyName_0_01_14]: setGenderForUserFirstLogin, 
        };

        const siteInfo = {

            [keyName_0_03_01]: readDataFromLocal(keyName_0_00_11),
            [keyName_0_03_02]: readDataFromLocal(keyName_0_00_12),

        };

        removeAllDataFromLocal();

        writeDataToLocal(keyName_0_01, userInfo);

        writeDataToLocal(keyName_0_03, siteInfo);
    }
}

// 更新用户幸运值到本地
function updateUserLuckyPointToLocal(value) {
    const userLuckyPoint = parseFloat(readValueFromRecordInLocal(keyName_0_01, keyName_0_01_01)) || 0;

    if (isNaN(value)) {
        console.error(`Invalid value provided: ${value}`);
        return;
    }

    const updatedUserLuckyPoint = (userLuckyPoint + parseFloat(value)).toFixed(1);

    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_01, updatedUserLuckyPoint);
}


// 更新用户等级到本地
function updateUserLevelToLocal(value) {

    // 验证输入是否为数字
    if (typeof value !== 'number' || isNaN(value)) {
        console.error('Invalid value:', value);
        return;
    }

    // 读取并转换用户等级
    const userLevel = parseInt(readValueFromRecordInLocal(keyName_0_01, keyName_0_01_06)) || 0;

    // 计算更新后的等级，确保等级不为负数
    const updatedUserLevel = Math.max(userLevel + value, 0);
    
    // 将更新后的等级写入本地存储
    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_06, updatedUserLevel);
}


// 更新用户游戏次数到本地
function updateUserGameTimeToLocal(value) {

    if (typeof value !== 'number' || isNaN(value)) {
        console.error('Invalid value:', value);
        return;
    }

    const userGameTime = parseInt(readValueFromRecordInLocal(keyName_0_01, keyName_0_01_07)) || 0;

    const updatedUserGameTime = Math.max(userGameTime + value, 0);
    
    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_07, updatedUserGameTime);
}


// 更新用户阅读次数到本地
function updateUserReadTimeToLocal(value) {

    if (typeof value !== 'number' || isNaN(value)) {
        console.error('Invalid value:', value);
        return;
    }

    const userReadTime = parseInt(readValueFromRecordInLocal(keyName_0_01, keyName_0_01_08)) || 0;

    const updatedUserReadTime = Math.max(userReadTime + value, 0);
    
    writeValueToRecordInLocal(keyName_0_01, keyName_0_01_08, updatedUserReadTime);
}


// 更新文章点赞数量到本地
function updatePostLikeToLocal(value) {

    if (typeof value !== 'number' || isNaN(value)) {
        console.error('Invalid value:', value);
        return;
    }

    const postLikeNumber = parseInt(readValueFromRecordInLocal(keyName_0_03, keyName_0_03_01)) || 0;

    const updatedPostLikeNumber = Math.max(postLikeNumber + value, 0);
    
    writeValueToRecordInLocal(keyName_0_03, keyName_0_03_01, updatedPostLikeNumber);
}


// 更新网站访客数量到本地
function updateSiteVisitorNumberToLocal(value) {

    if (typeof value !== 'number' || isNaN(value)) {
        console.error('Invalid value:', value);
        return;
    }

    const siteVisitorNumber = parseInt(readValueFromRecordInLocal(keyName_0_03, keyName_0_03_02)) || 0;

    const updatedSiteVisitorNumber = Math.max(siteVisitorNumber + value, 0);
    
    writeValueToRecordInLocal(keyName_0_03, keyName_0_03_02, updatedSiteVisitorNumber);
}


// 更新用户头像到页面
function updateUserAvatarInPage() {

    const varUserAvatar = document.querySelector('.var_user_avatar');

    if (varUserAvatar) {

        varUserAvatar.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_02);
    }
}


// 更新用户名称到页面
function updateUserNameInPage() {

    const varUserName = document.querySelector('.var_user_name');

    if (varUserName) {

        varUserName.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_03);
    }
}


// 更新用户签名到页面
function updateUserSignatureInPage() {

    const varUserSignature = document.querySelector('.var_user_signature');

    if (varUserSignature) {

        varUserSignature.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_04);
    }
}


// 更新用户生日到页面
function updateUserBirthdayInPage() {

    const varUserBirthday = document.querySelector('.var_user_birthday');

    if (varUserBirthday) {

        varUserBirthday.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_05);
    }
}


// 更新用户幸运值到页面
function updateUserLuckyPointInPage() {

    const varUserLuckyPoint = document.querySelector('.var_user_lucky_point');

    if (varUserLuckyPoint) {

        varUserLuckyPoint.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_01);
    }
}

// 更新用户等级到页面
function updateUserLevelInPage() {

    const varUserLevel = document.querySelector('.var_user_level');

    if (varUserLevel) {

        varUserLevel.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_06);
    }
}


// 更新用户游戏次数到页面
function updateUserGameTimeInPage() {

    const varUserGameTime = document.querySelector('.var_user_game_time');

    if (varUserGameTime) {

        varUserGameTime.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_07);
    }
}


// 更新用户阅读次数到页面
function updateUserReadTimeInPage() {

    const varUserReadTime = document.querySelector('.var_user_read_time');

    if (varUserReadTime) {

        varUserReadTime.textContent = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_08);
    }
}


// 更新文章点赞数量到页面
function updatePostLikeInPage() {

    const varPostLike = document.querySelector('.var_post_like');

    if (varPostLike) {

        varPostLike.textContent = readValueFromRecordInLocal(keyName_0_03, keyName_0_03_01);
    }
}


// 更新网站访客数量到页面
function updateSiteVisitorNumberInPage() {

    const varVisitorNumber = document.querySelector('.var_visitor_number');

    if (varVisitorNumber) {

        varVisitorNumber.textContent = readValueFromRecordInLocal(keyName_0_03, keyName_0_03_02);
    }
}

/**
 * 每隔指定时间（秒）执行给定的一系列回调函数
 * @param {number} interval - 时间间隔（单位：秒）
 * @param  {...function} callbacks - 需要执行的回调函数
 * 不能传递参数 -- 重要
 */
function executeEvery(interval, ...callbacks) {
    // 将时间间隔转换为毫秒
    const intervalInMs = interval * 1000;

    // 对每个回调函数使用 setInterval
    callbacks.forEach(callback => {
        setInterval(callback, intervalInMs);
    });
}

/*

// 示例用法
function fun1() {
    console.log('fun1 执行');
}

function fun2() {
    console.log('fun2 执行');
}

executeEvery(5, fun1, fun2);

*/


// 点击分享网站按钮
function clickBtnShareSite() {

    const btnShareSite = document.querySelector('.btn_share_site');

    if (btnShareSite) {

        btnShareSite.addEventListener('click', () => {

            siteBgmSelect.play();

            navigator.clipboard.writeText(i18n('share_site'));

            const varBonus = document.querySelector('.var_bonus_lucky_point_click_btn_share_site');
            const varInterval = document.querySelector('.var_interval_click_btn_share_site');

            varBonus.textContent = bonusLuckyPointClickBtnShareSite;
            varInterval.textContent = intervalClickBtnShareSite;

            const lastClickTime = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_11);
            const currentTimestamp = currentTime(); // 获取当前时间戳

            // 检查上次点击时间是否存在，且是否已经超过了间隔时间
            if (!lastClickTime || (currentTimestamp - new Date(lastClickTime)) > intervalClickBtnShareSite * 1000) {

                updateUserLuckyPointToLocal(bonusLuckyPointClickBtnShareSite);
                
                // 将当前时间以 ISO 格式存储
                writeValueToRecordInLocal(keyName_0_01, keyName_0_01_11, currentTimestamp.toISOString());
            }

            siteBgmSelect.stop();
        });
    }
}

// 点击积分不足 -- 弹出popup_info -- 显示积分不足
function clickNotEnoughLuckyPoint() {

    const selector = `.${htmlNameNotEnoughLuckyPoint}`;

    const notEnoughLuckyPoint = document.querySelector(selector);

    if(notEnoughLuckyPoint) {

        notEnoughLuckyPoint.click();
    }
}

// 是否是特别用户
function isSpecialUser() {

    const userName = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_03);

    const specialUsers = ['DFMGJX', 'duo duo ❤️ diu diu'];
    
    return specialUsers.includes(userName);
}


// 更新用户上次登录日期到本地
function updateLastLoginDateToLocal() {

    const lastLogInDate = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_10);

    if (lastLogInDate != getFormattedDateWithDash()) {

        writeValueToRecordInLocal(keyName_0_01, keyName_0_01_10, getFormattedDateWithDash());
    }
}

// 填充玫瑰花到网页
function fillRoseInPage() {

    const contentRose = document.querySelector('.content_rose');
    
    if (contentRose) {
        
        const canvas = contentRose.querySelector('.canvas_rose');

        canvas.innerHTML = '';
        
        var c = canvas;
        var a = c.getContext('2d');
        c.width = c.height = f = 600;
        var h = -250;
        document.body.clientWidth; 

        with(m=Math)C=cos,S=sin,P=pow,R=random;

        function p(a, b, c) {
            if (c > 60) return [S(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) - S(b) * 50, b * f + 50, 625 + C(a * 7) * (13 + 5 / (.2 + P(b * 4, 4))) + b * 400, a * 1 - b / 2, a];
            A = a * 2 - 1;
            B = b * 2 - 1;
            if (A * A + B * B < 1) {
                if (c > 37) {
                    n = (j = c & 1) ? 6 : 4;
                    o = .5 / (a + .01) + C(b * 125) * 3 - a * 300;
                    w = b * h;
                    return [o * C(n) + w * S(n) + j * 610 - 390, o * S(n) - w * C(n) + 550 - j * 350, 1180 + C(B + A) * 99 - j * 300, .4 - a * .1 + P(1 - B * B, -h * 6) * .15 - a * b * .4 + C(a + b) / 5 + P(C((o * (a + 1) + (B > 0 ? w : -w)) / 25), 30) * .1 * (1 - B * B), o / 1e3 + .7 - o * w * 3e-6];
                }
                if (c > 32) {
                    c = c * 1.16 - .15;
                    o = a * 45 - 20;
                    w = b * b * h;
                    z = o * S(c) + w * C(c) + 620;
                    return [o * C(c) - w * S(c), 28 + C(B * .5) * 99 - b * b * b * 60 - z / 2 - h, z, (b * b * .3 + P((1 - (A * A)), 7) * .15 + .3) * b, b * .7];
                }
                o = A * (2 - b) * (80 - c * 2);
                w = 99 - C(A) * 120 - C(b) * (-h - c * 4.9) + C(P(1 - b, 7)) * 50 + c * 2;
                z = o * S(c) + w * C(c) + 700;
                return [o * C(c) - w * S(c), B * 99 - C(P(b, 7)) * 50 - c / 3 - z / 1.35 + 450, z, (1 - b / 1.2) * .9 + a * .1, P((1 - b), 20) / 4 + .05];
            }
        }

        setInterval(function () {
            for (i = 0; i < 1e4; i++) {
                if (s = p(R(), R(), i % 46 / .74)) {
                    z = s[2];
                    x = ~~(s[0] * f / z - h);
                    y = ~~(s[1] * f / z - h);
                    if (!m[q = y * f + x] | m[q] > z) {
                        m[q] = z;
                        a.fillStyle = "rgb(" + ~(s[3] * h) + "," + ~(s[4] * h) + "," + ~(s[3] * s[3] * -80) + ")";
                        a.fillRect(x, y, 1, 1);
                    }
                }
            }
        }, 0);
    }
}


// 点击弹出玫瑰花
function clickOpenPopupRose() {

    const roseIcon = document.querySelector('.rose_icon');

    if (roseIcon) {

        const popupRose = roseIcon.querySelector('.popup_rose');

        clickSetDisplay(roseIcon, popupRose, displayTypes.flex)

        fillRoseInPage();

        popupRose.addEventListener('click', (event) => {

            setDisplay(popupRose, displayTypes.none);

            event.stopPropagation(); 
        });
    }
}

// 更新时间(秒)到页面 -- 翻译时间(秒)
function updateTimeSecondInpage() {

    const varI18nTimeSeconds = document.querySelectorAll('.var_i18n_time_second');

    varI18nTimeSeconds.forEach(element => {
        element.textContent = i18n('time_second');
    });
}


// 点击阅读+1按钮
function clickBtnReadPlus() {

    const btnReadPlus = document.querySelector('.btn_read_plus');

    if (btnReadPlus) {

        btnReadPlus.addEventListener('click', () => {

            siteBgmSelect.play();

            const varInterval = document.querySelector('.var_interval_click_btn_read_plus');

            varInterval.textContent = intervalClickBtnReadPlus;

            const lastClickTime = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_12);
            const currentTimestamp = currentTime(); // 获取当前时间戳

            // 检查上次点击时间是否存在，且是否已经超过了间隔时间
            if (!lastClickTime || (currentTimestamp - new Date(lastClickTime)) > intervalClickBtnReadPlus * 1000) {

                updateUserReadTimeToLocal(1);

                // 将当前时间以 ISO 格式存储
                writeValueToRecordInLocal(keyName_0_01, keyName_0_01_12, currentTimestamp.toISOString());

                updateUserReadTimeInPage();
            }

            siteBgmSelect.stop();
        });
    }
}


// 点击post_like按钮
function clickBtnPostLike() {

    const btnPostLike = document.querySelector('.btn_post_like');

    if (btnPostLike) {

        btnPostLike.addEventListener('click', () => {

            siteBgmSelect.play();

            const varBonus = document.querySelector('.var_bonus_lucky_point_click_btn_post_like');

            const varInterval = document.querySelector('.var_interval_click_btn_post_like');

            varBonus.textContent = bonusLuckyPointClickBtnPostLike;

            varInterval.textContent = intervalClickBtnPostLike;

            const lastClickTime = readValueFromRecordInLocal(keyName_0_01, keyName_0_01_13);
            const currentTimestamp = currentTime(); // 获取当前时间戳

            // 检查上次点击时间是否存在，且是否已经超过了间隔时间
            if (!lastClickTime || (currentTimestamp - new Date(lastClickTime)) > intervalClickBtnPostLike * 1000) {

                updateUserLuckyPointToLocal(bonusLuckyPointClickBtnPostLike);

                // 将当前时间以 ISO 格式存储
                writeValueToRecordInLocal(keyName_0_01, keyName_0_01_13, currentTimestamp.toISOString());
            }

            siteBgmSelect.stop();
        });
    }
}

// 显示缺乏数据 -- 游戏中，用户直接跳转到游戏的非首页（需要首页初始化数据），就弹出提示
function showPopupMissData() {

    const popupMissData = document.querySelector('.popup_miss_data');

    if (popupMissData) {

        setDisplay(popupMissData, displayTypes.flex);
    }
}



// 特定目的函数 -- end
// 特定目的函数 -- end
// 特定目的函数 -- end
// 特定目的函数 -- end
// 特定目的函数 -- end



// 特定事件处理 -- 直接执行该函数
// 特定事件处理 -- 直接执行该函数
// 特定事件处理 -- 直接执行该函数
// 特定事件处理 -- 直接执行该函数
// 特定事件处理 -- 直接执行该函数

// 用户点击popup_box(弹出框）之外的地方来隐藏popup_box
window.addEventListener('click', (event) => {

    const popupBoxes = document.querySelectorAll('.popup_box');

    popupBoxes.forEach(popupBox => {

        if (event.target === popupBox) {

            setDisplay(popupBox, displayTypes.none);
        }
    });
});


// popupInfo: 包裹在info_icon下边，展示信息3s后关闭 -- 参数可以变更展示时长
clickOpenPopupInfo();
function clickOpenPopupInfo(timeout = 3) { 

    const infoIcons = document.querySelectorAll('.info_icon');

    infoIcons.forEach(infoIcon => {

        const popupInfo = infoIcon.querySelector('.popup_info');

        if (popupInfo) {

            infoIcon.addEventListener('click', (event) => {

                setDisplay(popupInfo, displayTypes.flex);

                event.stopPropagation(); // 阻止事件冒泡

                setTimeout(() => setDisplay(popupInfo, displayTypes.none), timeout * 1000); 
            });
        }
    });
}

// popupInfoBtn: 与 clickOpenPopupInfo 的区别在于有一个按钮可以点击关闭
clickOpenPopupInfoBtn();
function clickOpenPopupInfoBtn() {

    const infoIconsBtn = document.querySelectorAll('.info_icon_btn');

    infoIconsBtn.forEach(infoIconBtn => {

        const popupTips = infoIconBtn.querySelector('.popup_tips');

        const btnGetIt = popupTips ? popupTips.querySelector('.btn_get_it') : null;

        if (popupTips && btnGetIt) {

            infoIconBtn.addEventListener('click', () => {

                setDisplay(popupTips, displayTypes.flex);
            });

            btnGetIt.addEventListener('click', (event) => {

                setDisplay(popupTips, displayTypes.none);

                event.stopPropagation(); // 阻止事件冒泡
            });
        }
    });
}

// popupTips: 包裹在tips_icon下边 -- 有 btn_get_it
clickOpenPopupTips();
function clickOpenPopupTips() {

    const tipsIcons = document.querySelectorAll('.tips_icon');

    tipsIcons.forEach(tipsIcon => {

        const popupTips = tipsIcon.querySelector('.popup_tips');

        const btnGetIt = popupTips ? popupTips.querySelector('.btn_get_it') : null;

        if (popupTips && btnGetIt) {

            tipsIcon.addEventListener('click', () => {

                setDisplay(popupTips, displayTypes.flex);

                // event.stopPropagation(); 这里只要加上就可以强制用户只能点击btn才能关闭
            });

            btnGetIt.addEventListener('click', (event) => {

                setDisplay(popupTips, displayTypes.none);

                event.stopPropagation(); // 阻止事件冒泡
            });
        }
    });
}










// 特定事件处理 -- 直接执行该函数 -- end
// 特定事件处理 -- 直接执行该函数 -- end
// 特定事件处理 -- 直接执行该函数 -- end
// 特定事件处理 -- 直接执行该函数 -- end
// 特定事件处理 -- 直接执行该函数 -- end



// 全局执行
// 全局执行
// 全局执行
// 全局执行
// 全局执行

// 移动端点击汉堡图标显示/隐藏菜单栏 
clickToggleMobileMenu();

// - 转移操作 -- 用户有历史数据 -- 转移到新键名
transferOldDataToNewData();

// - 初始化用户数据 -- 用户第一次登陆该网站
initUserInfo();

// - 初始化网站数据 -- 用户第一次登录网站 
initSiteInfo();


// 点击跳转到页面顶部
clickBtnBackToTop();


// 更新用户幸运值到页面
updateUserLuckyPointInPage();

// 点击分享网站按钮
clickBtnShareSite();

// 更新用户上次登录日期到本地
updateLastLoginDateToLocal();

// 点击弹出玫瑰花
clickOpenPopupRose();

// 更新时间(秒)到页面 -- 翻译时间(秒)
updateTimeSecondInpage();

// 更新用户头像到页面
updateUserAvatarInPage();

// 更新用户名称到页面
updateUserNameInPage();

// 更新用户阅读次数到页面
updateUserReadTimeInPage();

// 点击阅读+1按钮
clickBtnReadPlus();

// 点击post_like按钮
clickBtnPostLike();

// 弹窗提示 -- 可点击关闭 -- 可用于展示提示信息
clickHideInPageTips();

// 全局执行 -- end
// 全局执行 -- end
// 全局执行 -- end
// 全局执行 -- end
// 全局执行 -- end

