# Yisi Ai Portfolio

## 打开作品集
解压后打开 index.html。首页包含 PoliteChat、Chaos in Common、Shadow Market、Spark、Bio 和 Artist Statement。

- index.html：作品集首页
- chaos-in-common.html：Chaos in Common 单人演示
- shadow-market.html：Shadow Market 作品说明、四张原作截图和课程原作入口
- assets/：页面样式、脚本和作品图片
- multiplayer/：Thomas Keyboard 原版客户端和 Node.js 多人服务器

PoliteChat 和 Spark 的在线原型，以及 Shadow Market 的课程原作，都通过外部链接打开。本包包含作品集页面和已有素材，不包含这些外部项目的完整源码。

## 发布
静态网站托管时，上传本文件夹内的 index.html、两个作品页面和 assets/，保持相对路径。访问 HTTPS 链接并确认老师能打开后再提交 Canvas。multiplayer/ 不需要上传到静态网站。

## 本地测试多人版
进入 multiplayer/，运行 npm install，再运行 npm start。在两个浏览器窗口打开 http://localhost:3000。
