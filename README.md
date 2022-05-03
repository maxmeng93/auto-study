# auto-study

自动刷国家开放大学课程进度

## session

在项目根目录新建 `.env` 文件，并在文件中配置如下变量：

```
SESSION=<session>
```

session 可以在登陆[国家开放大学](https://menhu.pt.ouchn.cn/site/ouchnPc/index)后，打开浏览器控制台，在 `Application` 的 `Cookies` 中找到，将其值粘贴到 `.env` 文件中，替换 `<session>`。

## 使用

```bash
# 安装依赖
yarn

# 开始学习
yarn start
```
