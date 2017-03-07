# 伯格笔记（bergnote）

### 项目进度

> 2017.03.07

1. 用PHP返回JSON进行前后端分离，前端使用xhr获取数据
2. 后端API设计使用REST风格

```
/api
	/note
		add.php  // 添加文章
		delete.php  // 删除文章
		modify.php  // 修改文章
		search.php  // 搜索文章
	/user
		login.php  // 处理用户登陆，成功则设置COOKIE标记登陆状态
		login_check.php  // 检查用户是否登陆
		register.php  // 处理用户注册
		forget.php  // 忘记密码（验证邮箱）
		password.php  // 修改密码（需要输入原密码）
```

3. 后端API只剩忘记密码（这个打算先放一放）和修改密码未做完。明天把后端代码优化一下，接着就开始做前端的活了。是用原生JS，还是直接BS,JS一套上，还没有决定。或者用Vue。

### 在线预览

为了方便对项目进行预览，代码放在了个人网站。 [Note在线预览](http://berg-lab.com/demo/note/)

### 项目重构

为了更好的学习工具链，将逐步对项目进行重构。通过实践来加深对工具链的理解。

> 目前的项目结构

```

前端 > 页面（HTML） / 脚本（JS Localstorage API） / 样式（CSS） / 工具（Gulp）

```



> 逐步转换的结构

```

后台 > PHP
前端 > 页面（Pug） / 脚本（jQuery store.js） / 样式（Less） / 工具（Gulp）

```