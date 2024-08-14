// 这个库用来写通用的函数，所有地方都可以通用的
// 所以只能写函数，并且一定要写函数的错误输出，便于定位和调试

// 设置网页的配置 -- 参数代表：应用名称，网页名称，配置名称，配置的值
function aimloboWritePageConfig(appName, pageName, configName, configValue) {

    const keyName = 'page_config';

    // 尝试从 localStorage 中获取整个配置对象
    let pageConfig = JSON.parse(localStorage.getItem(keyName)) || {};

    // 如果该应用不存在，则创建一个空对象
    if (!pageConfig[appName]) {
        pageConfig[appName] = {};
    }

    // 如果该网页不存在，则创建一个空对象
    if (!pageConfig[appName][pageName]) {
        pageConfig[appName][pageName] = {};
    }

    // 更新配置的值
    pageConfig[appName][pageName][configName] = configValue;

    // 将更新后的配置对象存回 localStorage
    localStorage.setItem(keyName, JSON.stringify(pageConfig));
}

// 读取网页的配置 -- 参数代表：应用名称，网页名称，配置名称
function aimloboReadPageConfig(appName, pageName, configName) {

    const keyName = 'page_config';
    
    // 获取 localStorage 中存储的所有配置
    const localConfig = JSON.parse(localStorage.getItem(keyName));

    // 检查应用名称、页面名称和配置名称是否存在
    if (localConfig && localConfig[appName] && localConfig[appName][pageName]) {
        // 返回对应的配置值，如果不存在，返回 undefined
        return localConfig[appName][pageName][configName];
    } else {
        console.log('Configuration not found.');
        return undefined;
    }
}

// 初始化网页的配置 -- 参数代表：应用名称，网页名称，配置名称 -- 注意传递的默认值是false
function aimloboInitPageConfig(appName, pageName, configName) {

    // 首先尝试读取现有的配置值
    let configValue = aimloboReadPageConfig(appName, pageName, configName);

    // 如果读取不到数据（configValue 为 undefined），则初始化为 false
    if (configValue === undefined) {
        configValue = false;
        aimloboWritePageConfig(appName, pageName, configName, configValue);
    }

    return configValue;
}


// 弹窗提示 -- 可点击关闭 -- 可用于展示提示信息
function aimloboClickHideInPageTips() {

    const inPageTipsAll = document.querySelectorAll('.in_page_tips');

    if (inPageTipsAll) {

        for (const inPageTips of inPageTipsAll) {

            const close = inPageTips.querySelector('.close');
    
            close.addEventListener('click', (event) => {
    
                inPageTips.style.display = "none";

                event.stopPropagation(); // 阻止事件冒泡
            });
        }
    }
}


// 显示/隐藏当前页面上所有的提示
// 使用前提： 预先写入默认值到local -- 因为这个函数是从本地取值
function aimloboHideOrShowAllTipsInCurrentPage(appName, pageName) {

    const configName = 'hide_or_show_all_tips_in_current_page';

    const tips = document.querySelectorAll('.in_page_tips');

    const hideOrShow = aimloboReadPageConfig(appName, pageName, configName);
    // true for show, false for hide

    if (tips) {

        if (!hideOrShow) {

            for (const tip of tips) {
    
                tip.style.display = "none";
            }

        } else {
    
            for (const tip of tips) {
    
                tip.style.display = "flex";
            }
        }

    }

}