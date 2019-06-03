var Config = {
    getDomain: function (url) {
        let domain = url.split('.');

        if (domain[1]) {
            domain = domain[1];
        } else {
            domain = '';
        }
        return domain
    },
    return_Base: function (site) {
        // p582019.com
        // 50172019.com
        // b672019.com
        // b702019.com
        // y702019.com
        // df52019.com
        // j702019.com
        // w972019.com
        // b622019.com
        switch (site) {
            case 'b702019':
                return {
                    site: 'b70',
                    channel: 'WEB',
                    reg_url: 'https://www.b70aaa.com/signup',
                    // logo链接
                    logo_url: 'https://www.b70aaa.com/',
                    more_promo: 'https://www.b70aaa.com/promo#',
                    // logo
                    logo: ('../common/img/logos/bet_logo.png'),
                    // copyright
                    copy_right: 'BET365 ',

                    // 赚取积分链接
                    zuan_jifen_url: 'https://www.b70aaa.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000010&planId=15#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.b70sc.com'
                };

            case 'b622019':
                return {
                    site: 'b62',
                    channel: 'WEB',
                    reg_url: 'https://www.b62dd.com/signup',
                    // logo链接
                    logo_url: 'https://www.b62dd.com/',
                    more_promo: 'https://www.b62dd.com/promo#',
                    // logo
                    logo: ('../common/img/logos/bet_logo.png'),
                    // copyright
                    copy_right: 'BET365',

                    // 赚取积分链接
                    zuan_jifen_url: 'https://www.b62dd.com/',
                    custer_url: "javascript:window.open('https://messenger.providesupport.net/messenger/1i9sb9c6cmnaa09xy25iuq9sr1.html','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.b62sc.com'
                };

            case 'b672019':
                return {
                    site: 'b67',
                    channel: 'WEB',
                    reg_url: 'https://b67665.com/signup',

                    // logo链接
                    logo_url: 'https://b67665.com/',
                    more_promo: 'https://b67665.com/promo#',

                    // logo
                    logo: ('../common/img/logos/bet_logo.png'),

                    // copyright
                    copy_right: 'BET365',
                    // 赚取积分链接
                    zuan_jifen_url: 'https://b67665.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000004&planId=7#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.b67sc.com'
                };
            case 'j702019':
                return {
                    site: 'j70',
                    channel: 'WEB',
                    reg_url: 'https://www.j7053.com/signup#',
                    // logo链接
                    logo_url: 'https://www.j7053.com/',
                    more_promo: 'https://www.j7053.com/promo#',

                    // logo
                    logo: ('../common/img/logos/j70_logo.png'),
                    // copyright
                    copy_right: '澳门金沙',
                    // 赚取积分链接
                    zuan_jifen_url: 'https://www.j7053.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000009&planId=14#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.j70sc.com'
                };
            case '50172019':
                return {
                    site: 'tyc',
                    channel: 'WEB',

                    reg_url: 'https://5017605.com/signup#',

                    // logo链接
                    logo_url: 'https://5017605.com/',
                    more_promo: 'https://5017605.com/promo#',
                    // logo
                    logo: ('../common/img/logos/tyc_logo.png'),

                    // copyright
                    copy_right: '太阳城集团',

                    // 赚取积分链接
                    zuan_jifen_url: 'https://5017605.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000014&planId=19#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.5017sc.com'
                };
            case 'df52019':
                return {
                    site: 'daf',
                    channel: 'WEB',

                    reg_url: 'https://df5cc.com/signup#',

                    // logo链接
                    logo_url: 'https://df5cc.com/#',
                    more_promo: 'https://df5cc.com/#promo#',

                    // logo
                    logo: ('../common/img/logos/df5_logo.png'),

                    // copyright
                    copy_right: '大发',

                    // 赚取积分链接
                    zuan_jifen_url: 'https://df5cc.com/#',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000013&planId=18#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.df5sc.com'
                };
            case 'p582019':
                return {
                    site: 'p58',
                    channel: 'WEB',

                    reg_url: 'https://www.p58205.com/signup#',

                    // logo链接
                    logo_url: 'https://www.p58205.com/',
                    more_promo: 'https://www.p58205.com/promo#',
                    // logo
                    logo: ('../common/img/logos/p58_logo.png'),

                    // copyright
                    copy_right: '澳门新葡京',

                    // 赚取积分链接
                    zuan_jifen_url: 'https://www.p58205.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000011&planId=16#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.p58sc.com'
                };
            case 'y702019':
                return {
                    site: 'y70',
                    channel: 'WEB',
                    reg_url: 'https://www.y70105.com/signup#',

                    // logo链接
                    logo_url: 'https://www.y70105.com/',
                    more_promo: 'https://www.y70105.com/promo#',

                    // logo
                    logo: ('../common/img/logos/y70_logo.png'),

                    // copyright
                    copy_right: '澳门银河',

                    // 赚取积分链接
                    zuan_jifen_url: 'https://www.y70105.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000012&planId=17#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.y70sc.com'
                };
            case 'w972019':
                return {
                    site: 'w97',
                    channel: 'WEB',

                    reg_url: 'http://www.w9750.com/signup',

                    // logo链接
                    logo_url: 'http://www.w9750.com/',
                    more_promo: 'http://www.w9750.com/promo#',

                    // logo
                    logo: ('../common/img/logos/w97_logo.png'),

                    // copyright
                    copy_right: '澳门威尼斯人',

                    // 赚取积分链接
                    zuan_jifen_url: 'http://www.w9750.com/',
                    custer_url: "javascript:window.open('https://messenger.providesupport.net/messenger/0jnmaog6clale0wh3qcr252w0n.html','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.w97sc.com'
                }
            default:
                return {
                    site: 'b70',
                    channel: 'WEB',
                    reg_url: 'https://www.b70aaa.com/signup',
                    // logo链接
                    logo_url: 'https://www.b70aaa.com/',
                    more_promo: 'https://www.b70aaa.com/promo#',
                    // logo
                    logo: ('../common/img/logos/bet_logo.png'),
                    // copyright
                    copy_right: 'BET365 ',
                    // 赚取积分链接
                    zuan_jifen_url: 'https://www.b70aaa.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000010&planId=15#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.b70sc.com'
                };
        }
    },
    setIcon: function (site) {
        var meta = document.getElementsByTagName('meta')[0];
        var link = document.createElement('link');
        link.rel = "icon";
        link.type = "image/png";
        link.sizes = "16x16";
        switch (site) {
            case 'b62':
                link.href = "https://b67665.com/images/logo/icon.ico";
                document.head.insertBefore(link, meta);
                return

            case 'b67':
                link.href = "https://b67665.com/images/logo/icon.ico";
                document.head.insertBefore(link, meta);
                return

            case 'b70':
                link.href = "https://b67665.com/images/logo/icon.ico";
                document.head.insertBefore(link, meta);
                return

            case 'j70':
                link.href = "https://www.j7002.com/assets/img/favicon.ico";
                document.head.insertBefore(link, meta);
                return
            case 'tyc':

                link.href = "https://tycimg.clsj365.com/assets/img/favicon.ico";
                document.head.insertBefore(link, meta);
                return

            case 'daf':
                link.href = "https://df5jj.com/assets/img/favicon.ico";
                document.head.insertBefore(link, meta);
                return

            case 'p58':
                link.href = "https://p58img.clsj365.com/assets/img/favicon.ico";
                document.head.insertBefore(link, meta);
                return

            case 'y70':
                link.href = "https://www.y7093.com/common/img/logo/ico.ico";
                document.head.insertBefore(link, meta);
                return

            case 'w97':
                link.href = "https://www.w97g.com/assets/img/favicon.png";
                document.head.insertBefore(link, meta);
                return

            default:
                link.href = "https://b70665.com/images/logo/icon.ico";
                document.head.insertBefore(link, meta);
                return
        }
    },
    get_interface: function (site) {
        // p582019.com
        // 50172019.com
        // b672019.com
        // b702019.com
        // y702019.com
        // df52019.com
        // j702019.com
        // w972019.com
        // b622019.com
        switch (site) {
            case 'b62':
                return 'http://www.b622019.com';
            case 'b67':
                return 'http://www.b672019.com';
            case 'b70':
                return 'http://www.b702019.com';
            case 'j70':
                return 'http://www.j702019.com';
            case 'tyc':
                return 'http://www.50172019.com';
            case 'daf':
                return 'http://www.df52019.com';
            case 'p58':
                return 'http://www.p582019.com';
            case 'y70':
                return 'http://www.y702019.com';
            case 'w97':
                return 'http://www.w972019.com';
            default:
                return 'http://www.b702019.com';
        }
    }
}

var Base = Config.return_Base(Config.getDomain(window.location.href));
// var Base = Config.return_Base('b67sc')
Base.interface = Config.get_interface(Base.site);
Config.setIcon(Base.site);