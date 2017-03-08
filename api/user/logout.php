<?php 

include '../../conn.php';  // 引入数据库连接页面
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句

/* 把Cookie的值设置为空来注销Cookie */

// TODO not work

setcookie("user", "", time()-3600);
setcookie("user", "", time()-3600);

/* 判断是否注销成功并且返回值 */

if($_COOKIE['user']){
	$arr = array("logoutState"=>"no");
	echo json_encode($arr);
	exit();
}
else {
	$arr = array("logoutState"=>"yes");
	echo json_encode($arr);
}

 ?>