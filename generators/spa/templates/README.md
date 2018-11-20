# generator-spa

> 脚手架示例项目

## 分支说明
    不同模板在不同分支中
    |
    |--master
        |
        |--vue 分支：初始分支，主要做构建相关功能
            |
            |--vue-router 分支：基于初始分支 `vue` ， 增加 vue-router 配置
                |
                |--vue-router-vuex 分支：基于初始分支 `vue-router` ， 增加 vuex 配置
                    |
                    |
                    |--vue-vuex-mpa 分支：基于初始分支 `vue-router-vuex` ， 去除 vue-router 配置，多页面


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
