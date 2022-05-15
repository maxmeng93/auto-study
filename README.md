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

## 配置

详情配置请查看 `config.js` 文件。

## 注意

- 视频播放必须配置本机 chrome 浏览器，否则无法播放。

## 其他

<!-- <div style="text-align: center;">
  <img src="./images/pay.jpeg" style="width: 300px;">
</div> -->

<figure style="text-align: center;">
  <figcaption>如果这个项目对你有用，可以请我喝杯☕️</figcaption>
  <img  src="./images/pay.jpeg" style="width: 300px;" />
</figure>
