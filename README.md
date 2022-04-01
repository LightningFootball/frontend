<div  style="text-align:center">

# EduOJ Frontend

</div>

# 项目简介

该项目是一个基于[EduOJ](https://github.com/EduOJ/frontend) 的分支项目，为本人的毕设项目。 该项目目的是在原项目基础上添加附加功能和改进。 更多关于项目的开发信息，请参考原项目，恕不赘述。

# 部署

1. 准备环境 安装 [node.js](https://nodejs.org) 及 [yarn](https://yarnpkg.com)
2. 拉去前端

  ```shell
  git clone https://github.com/LightningFootball/frontend
  cd frontend
  ```

3. 修改配置文件

  ```shell
  cp ./src/config/config.example.js ./src/config/config.js
  nano ./src/config/config.js
  ```

4. 项目启动

  ```shell
  yarn build
  ```
