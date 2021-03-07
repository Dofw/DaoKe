## 项目名称： Bright-spot 亮点（生活）

### 项目简介

> 在这个物欲横飞的社会环境里，快节奏的生活压力下。亲爱的朋友你否累了，是否有很多 bright-spot 需要留存分享。不妨放慢脚步，记录下生活中的点点滴滴，也许这些当时看似没有意义的事情，或许在不久的将来会成为你生命道路上的一排排路灯。使其显得格外美好，幸福
>
> > 为此，提供一个平台用来分享生活中的 bright-spot。
> >
> > > 1.提供心情，照片分享功能。 2.聊天功能 3.分享个人收集的音乐。

### 项目准备

    1. 技术栈：
       1. 前端 （SPA）
          1. vue
          2. bootstrap
          3. scss
       2. 后端
          1. vue
          2. express、mongodb、 mongoose
          3. 后期要学习的：
             1. nest.js：[English](https://docs.nestjs.com/)/ [中文](https://docs.nestjs.cn/)
             2. swagger：通过配置路由接口，生成接口文档ui。用于直白的显示请求、响应数据变化，并展示的ui界面接口。

    2. 配置(常用)
       1. 代码格式风格babel、prettier

       2. 环境变量environment

        ```js

           第一 .env.development 配置文件（定义开发时的环境变量）
           > 内容: VUE_APP_API_URL = "http://localhost:3000/"
           > 使用: process.env.VUE_APP_API_URL || "/",
           在开发阶段会分析.env.development。在封装axios文件中，判断process.env.VUE_APP_API-URL是否存在，存在就用定义的baseUrl。

           第二 vue.config.js 配置文件
           > outputDir: __dirname + '/server/public',
           > publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
           目的是为了将项目中的路径统一设置在根目录下。即 http://localhost:3000/
           然后，后端配置 '/'路由指定的public路径。配合完成静态文件的展示。

        ```

       3. 代理proxy

          ```js
          module.exports = {
              devServer: {
                  open: true,
                  port: 5000,
                  proxy: {
                      '/api': {
                          target: 'http://localhost:3000',
                          // pathRewrite: {
                          //     '^/api': ''
                          // },
                          changeOrigin: true
                      }
                  }
              }
          }
          ```

### 页面设计

    bright
    1. 首页: 模板1 /bright
    2. 注册：模板2 /register
    3. 登录：模板2 /login
    4. 个人中心： 模板4 /user           任务1
    5. 聊天：模板3 /chat

### 后端路由接口设计

| web 接口  |      名称      |            功能            | 备注 |
| :-------: | :------------: | :------------------------: | :--: |
|  /bright  |      首页      |        返回展示数据        |      |
| /comment  | 首页/评论/点赞 |   保存数据，返回评论列表   |      |
|   /chat   |      聊天      |   保存数据，返回评论列表   |      |
|  /login   |      登录      | 验证 session、返回登录状态 |      |
| /register |      注册      |  保存客户端传来的账号信息  |      |

|  adim 接口   |   名称   |              功能              | 备注 |
| :----------: | :------: | :----------------------------: | :--: |
| /admin/spot  | 发表亮点 |  保存数据、音乐，并且返回数据  |  1   |
| /admin/music | 上传音乐 | 上传成功后，同时提供展示的数据 |      |
