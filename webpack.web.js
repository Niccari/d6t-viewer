const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
      },
      meta: {
        'description': { name: 'description', content: 'D6T MEMSセンサから取得した温度分布CSVデータを可視化するためのツールです'},
        'keyword': { name: 'keywords', content: 'D6T,MEMS,Omron D6T,Thermopile Array'},
        'og:title': { property: 'og:title', content: 'D6T MEMSセンサ データ可視化ソフト' },
        'og:description': { property: 'og:description', content: 'D6T MEMSセンサから取得した温度分布CSVデータを可視化するためのツールです' },
        'og:site_name': { property: 'og:site_name', content: 'niccari.net' },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'https://niccari.net/d6t_viewer/' },
        'og:image': { property: 'og:image', content: 'https://niccari.net/d6t_viewer/ogp.jpg' },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': { name: 'twitter:title', content: 'D6T MEMSセンサ データ可視化ソフト' },
        'twitter:description': { name: 'twitter:description', content: 'D6T MEMSセンサから取得した温度分布CSVデータを可視化するためのツールです' },
        'twitter:image': { name: 'twitter:image', content: 'https://niccari.net/d6t_viewer/ogp.jpg' },
        'twitter:site': { name: 'twitter:site', content: 'niccari1' }
      }
    })
  ]
};
