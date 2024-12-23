官方文档：https://gohugo.io/documentation/；

快速开始：https://gohugo.io/getting-started/quick-start/

本地测试的命令：hugo server

部署到cloudfare: https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/
1. 将cloudfare 的pages和github仓库绑定（自动的）；
2. 构建配置：
构建命令: hugo
构建输出: public
3. 添加变量：HUGO_VERSION  （自己使用的hugo的版本）


网站内容结构：
1. 主题模板 - themes/layouts;

   - default: 全站基础框架
   - 模块：（每个模块下有各自应用的全部代码,一共19个单独的应用）

       - game;
       - luck;
       - my; 用户个人数据
       - rank; 用户排名
       - secret;
       - topic;

    - 插件：partials (用来插入如谷歌代码）
3. 网站内容 - content;

   结构同主题；
   
5. 网站翻译 - i18n;

   - 简体中文；
   - 繁体中文；
   - 英语；
6. 全站使用 - assets;

   - js;
   - css;
   - audio;(各个应用的音频）
   - image;(各个应用的封面图，内容图片）
