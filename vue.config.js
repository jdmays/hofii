//vue.config.js
module.exports = {
    publicPath: '/hofii/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Hounds of Fury II";
                return args;
            })
    }
}