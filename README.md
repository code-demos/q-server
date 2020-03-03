# @chosan/server

一键启动的文件服务器，通过浏览器提供文件上传和下载功能。UI 兼容 `IE9+`，服务端 Node 版本 `>= 8.3.0`
## 功能

- 内外网文件共享
  - 接收文件上传
  - 提供文件下载

## 使用场景案例

基于两者网络可以相互访问的情况下（如可以通过内网访问或分享方具有公网 IP）：

- 没有 U 盘的情况下一键快速共享文件
- PC、手机、平板等设备之间快速共享文件
- 无法使用 QQ、微信等其它方式共享文件（例如：无法访问外网）或操作不便（如FTP服务器需要耗时走流程申请权限等）时，一键快速共享文件
- 通过 QQ、微信等分享文件速度过慢时可以尝试一键内网共享
- 作为初创公司、团队临时内部文件共享系统或作为寝室私人内网文件服务器
- 使用树莓派 + 外接硬盘（可选）的方式搞个低成本家庭小型 NAS 系统，配合 DDNS 食用更佳！
- 其他 ^_^

## 安装

`npm i -g @chosan/server` 或者 `yarn global add @chosan/server`

## 用法

安装完成后，即可使用 `server` 命令快速启动一个 HTTP 服务器，可携带命令行参数。**启动服务器之后就可以通过网页访问服务器上的资源啦~**

### 参数介绍

- `-p`：指定端口号（默认 `8888`）
- `-u`：启用上传功能（默认关闭）
- `-l`：设置文件上传大小（默认 `200MB`）
- `-h`：设置隐藏文件可下载(默认关闭)
- `-k`：指定自动关闭时间（默认关闭）
- `-d`：指定服务根目录（默认当前目录），相对路径或绝对路径均可
- `-t`：自定义网页标题（默认为 `@chosan/server`）
- `--help`：查看帮助

## 使用示例

### 基本示例

- 启动服务：`server`
- 修改默认端口为 `8000`：`server -p 8000`
- 开启文件上传：`server -u`
- 隐藏文件可下载：`server -h`
- `10` 秒后自动关闭：`server -k 10s`
- 修改默认上传大小为 `20M`：`server -l 20m`
- 指定下载目录（根目录）为当前目录父级：`server -d ..`
- 修改默认网页标题为 `xx公司文件共享系统`：`server -t xx公司文件共享系统`

### 组合示例

- 在 8000 端口启动服务，可上传大小限制为 20M 以内的文件，30 分钟后自动关闭：`server -p 8000 -l 20m -k 30m`

## ChangeLog

### v0.0.3

#### 新特性
- 添加批量选中功能，支持 `win`、`⌘` 或 `alt` 键多选，支持鼠标左键范围选择。
- 添加 `win + a` 或 `⌘ + a` 全选功能
- 添加批量下载、鼠标右键菜单按钮功能
- 添加系统设置按钮，可以设置视图方式、排序方式等
- 添加过渡动画
- 添加 `-t` 参数可以自定义前端网页标题
- 对返回内容进行压缩

#### 优化
- 添加更完善的接口越权校验
- 校正 iconfont 图标映射

### v0.0.2

### v0.0.1

![example_home](https://raw.githubusercontent.com/Cinux-Chosan/git-statics/master/%40chosan/server/example1.jpeg)
![example_upload](https://raw.githubusercontent.com/Cinux-Chosan/git-statics/master/%40chosan/server/example2.jpeg)

**所有参数均可任意搭配，更多功能敬请期待**
