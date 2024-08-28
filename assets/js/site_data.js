// 这个库用来写网站主体需要的数据
/* 这个库与定义的常量有: -- 新增或变化需要在这里编辑 -- 可以直接使用

    - 其他用户的头像
    - 其他用户的名称
    - 其他用户的个性签名
    - 今天适合做什么 -- page: my 
    - 今天不适合做什么 -- page: my


--- 待添加

*/




// 其他用户的头像
const siteDataOtherUserAvatar = [

    '🏖️', 
    '🏜️', 
    '🏔️', 
    '👩‍💼', 
    '🧑‍🌾', 
    '🧝', 
    '🦁', 
    '🐶', 
    '🐳', 
    '🐲', 
    '🐯', 
    '🧸'

];

// 其他用户的名称
// 注意： 必须与  其他用户的个性签名  保持一致 -- 具体而言就是这里边的数量和对应语言的内容，要和 其他用户的个性签名 一致；
// 因为实际使用的时候出于简单处理，他们是对应关系
// 所以这里如果变化了，一定要同步检查更新 其他用户的个性签名
const siteDataOtherUserName = [

    '小小', 
    '堕落的神话', 
    '萝卜仔', 
    '用户名', 
    '烟草的残香', 
    '激浊扬清', 
    '黄静fen', 
    '朕很萌', 
    '佛本是善', 
    '好运lucky🥰',
    '二十四橋明月夜', 
    '天選之人', 
    '我愛吃叉燒', 
    '用戶名', 
    '溫柔泛濫', 
    '隨便寫的名字', 
    '有朋自遠方來', 
    '好事成雙', 
    '浪漫是一種生活', 
    '趙麗',
    'Tom and Jery', 
    '_feelgood', 
    'John2469', 
    'username', 
    'Rojin_04', 
    'Jessica', 
    'Linda here', 
    'James go go', 
    'love and happiness', 
    'nobody342'
];


// 其他用户的个性签名
// 注意 -- 见 其他用户的名称 -- 需要保持对应关系
const siteDataOtherUserSignature = [

    "我爱自由和梦想",
    "生活充满了惊喜",
    "心怀感恩，生活更美好",
    "快乐是一种选择",
    "奋斗是成功的唯一途径",
    "幸福在于追求",
    "活在当下",
    "笑对人生",
    "坚持就是胜利",
    "每一天都是新的开始",
    "生活是個奇蹟",
    "心想事成",
    "知足常樂",
    "努力不懈，成就未來",
    "心態決定一切",
    "熱愛生活",
    "微笑面對每一天",
    "保持樂觀",
    "珍惜眼前人",
    "心有多大，舞台就有多大",
    "Love for all, hatred for none.",
    "Change the world by being yourself.",
    "Every moment is a fresh beginning.",
    "Never regret anything that made you smile.",
    "Die with memories, not dreams.",
    "Aspire to inspire before we expire.",
    "Whatever you do, do it well.",
    "What we think, we become.",
    "All limitations are self-imposed.",
    "Problems are not stop signs."
];


// 今天适合做什么 -- page: my 
// 数据结构是：name,link --->name表示展示在页面上的内容，link是给到<a>元素的href
// name 需要在i18n.js 中写入翻译内容，方便在不同语言的页面展示匹配的内容
const siteDataGoodFor = [

    { name: 'game', link: 'game' },
    { name: 'happy', link: 'game/happy_worship' },
    { name: 'exercise', link: 'game/wooden_fish' },
    { name: 'show_love', link: 'secret/bullet' },
    { name: 'read', link: 'topic' },
    { name: 'dating', link: 'secret/wish' },
    { name: 'laugh', link: 'rank' },
    { name: 'rich', link: 'game/toto_3' },
    { name: 'match', link: 'game/flying_book' },
    { name: 'healthy', link: 'game/horse_racing' }
]


// 今天不适合做什么 -- page: my 
// 数据结构是：name,link --->name表示展示在页面上的内容，link是给到<a>元素的href
// name 需要在i18n.js 中写入翻译内容，方便在不同语言的页面展示匹配的内容
const siteDataBadFor = [

    { name: 'cry', link: 'cry' },
    { name: 'sad', link: 'sad' },
    { name: 'disappointment', link: 'disappointment' },
    { name: 'poor', link: 'poor' },
    { name: 'fight', link: 'fight' },
    { name: 'squabble', link: 'squabble' },
    { name: 'mad', link: 'mad' },
    { name: 'waste_time', link: 'waste_time' },
    { name: 'exhausted', link: 'exhausted' },
    { name: 'risky_behavior', link: 'risky_behavior' }
]