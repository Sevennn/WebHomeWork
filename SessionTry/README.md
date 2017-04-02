###mongodb 默认端口号为 27017， collection 为 users
###端口号为8000， 页面默认的几个访问路径：
1. signin
2. regist
3. detail

####说明： 当用户登录之后，只能访问详情页面，想要跳转至其余页面首先需要退出登录。session存储使用其默认的存储方式。

####连接好mongo后，根目录下，次序执行：
1. npm install
2. npm start 
###即可开始