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
        // www.b62wy.com
        // www.b67wy.com
        // www.b70wy.com
        // www.y70wy.com
        // www.j70wy.com
        // www.df5wy.com
        // www.w97wy.com
        // www.p58wy.com
        // www.5017wyj.com
        switch (site) {
            case 'b70wy':
                return {
                    site: 'b70',
                    channel: 'WEB',
                    reg_url: 'https://b70665.com/signup',
                    // logo链接
                    logo_url: 'https://b70665.com/',
                    more_promo: 'https://b70665.com/promo#',
                    // logo
                    logo: ('../common/img/logos/bet_logo.png'),
                    // copyright
                    copy_right: 'BET365 ',

                    // 赚取积分链接
                    zuan_jifen_url: 'https://b70665.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000010&planId=15#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.b70sc.com',
                    slogan_img : './img/slogan/b70.png',
                    slogan_text: 'B70.COM'
                };

            case 'b62wy':
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
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000016&planId=21#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.b62sc.com',
                    slogan_img : './img/slogan/b62.png',
                    slogan_text: 'B62.COM'
                };

            case 'b67wy':
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
                    jifen_mall: 'http://www.b67sc.com',
                    slogan_img : './img/slogan/b67.png',
                    slogan_text: 'B67.COM'
                };
            case 'j70wy':
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
                    jifen_mall: 'http://www.j70sc.com',
                    slogan_img : './img/slogan/j70.png',
                    slogan_text: 'J70.COM'
                };
            case '5017wy':
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
                    jifen_mall: 'http://www.5017sc.com',
                    slogan_img : './img/slogan/5017.png',
                    slogan_text: '5017.COM'
                };
            case 'df5wy':
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
                    jifen_mall: 'http://www.df5sc.com',
                    slogan_img : './img/slogan/df5.png',
                    slogan_text: 'DF5.COM'
                };
            case 'p58wy':
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
                    jifen_mall: 'http://www.p58sc.com',
                    slogan_img : './img/slogan/p58.png',
                    slogan_text: 'P58.COM'
                };
            case 'y70wy':
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
                    jifen_mall: 'http://www.y70sc.com',
                    slogan_img : './img/slogan/y70.png',
                    slogan_text: 'Y70.COM'
                };
            case 'w97wy':
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
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000015&planId=20#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.w97sc.com',
                    slogan_img : './img/slogan/w97.png',
                    slogan_text: 'W97.COM'
                }
            default:
                return {
                    site: 'b70',
                    channel: 'WEB',
                    reg_url: 'https://b70665.com/signup',
                    // logo链接
                    logo_url: 'https://b70665.com/',
                    more_promo: 'https://b70665.com/promo#',
                    // logo
                    logo: ('../common/img/logos/bet_logo.png'),
                    // copyright
                    copy_right: 'BET365 ',
                    // 赚取积分链接
                    zuan_jifen_url: 'https://b70665.com/',
                    custer_url: "javascript:window.open('https://app.comm100.chat/chatserver/chatWindow.aspx?siteId=5000010&planId=15#','LIVECHAT','height=600,width=800')",
                    jifen_mall: 'http://www.b70sc.com',
                    slogan_img : './img/slogan/y70.png',
                    slogan_text: 'Y70.COM'
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
        // www.b62wy.com
        // www.b67wy.com
        // www.b70wy.com
        // www.y70wy.com
        // www.j70wy.com
        // www.df5wy.com
        // www.w97wy.com
        // www.p58wy.com
        // www.5017wyj.com
        switch (site) {
            case 'b62':
                return 'http://www.b62wy.com/';
            case 'b67':
                return 'http://www.b67wy.com/';
            case 'b70':
                return 'http://www.b70wy.com/';
            case 'j70':
                return 'http://www.j70wy.com/';
            case 'tyc':
                return 'http://www.5017wy.com/';
            case 'daf':
                return 'http://www.df5wy.com/';
            case 'p58':
                return 'http://www.p58wy.com/';
            case 'y70':
                return 'http://www.y70wy.com/';
            case 'w97':
                return 'http://www.w97wy.com/';
            default:
                return 'http://www.b70wy.com/';
        }
    }
}

var Base = window.location.href.indexOf('wy') == -1 ? Config.return_Base('b67wy') :  Config.return_Base(Config.getDomain(window.location.href));
Base.interface = Config.get_interface(Base.site);
Config.setIcon(Base.site);