// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Deep Store',
  plugins: [{
    use: '@gridsome/source-graphql',
    options: {
      url:
      'https://api-ap-northeast-1.graphcms.com/v2/cksg0kjl407ic01xr6xko5c3r/master',
      fieldName: 'deep',
      typeName: 'deepTypes'
    }
  }],
  chainWebpack: config => {
    config.module
    .rule("vue")
    .use("vue-svg-inline-loader")
    .loader("vue-svg-inline-loader")
    .options({ /* ... */ });
  }
}
