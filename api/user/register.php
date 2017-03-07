<?php 

include '../../conn.php';  // 引入数据库连接页面
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句

$cookie_userId = (int)$_COOKIE["userId"];  // 获取用户ID

// echo gettype($cookie_userId);

/* 注册信息

$user = $_POST["user"];
$pass = $_POST["pass"];
$mail = $_POST["content"];

 */

/* 前端界面未完成，暂时使用模拟信息 */

$user = "lloxafs";
$pass = "worlxdasfd";
$mail = "hello@wosas.coms";

/* 执行添加语句 */

$sql = "insert into user (user_name,user_pass,user_mail) values ('$user','$pass','$mail')";
$result = mysql_query($sql);

/* 返回JSON状态*/

// mysql_fetch_array($result)
// mysql_affected_rows()

if($result){
	$resultJSON = array("addState"=>"yes");
}
else {
	$resultJSON = array("addState"=>"no");
}
echo json_encode($resultJSON);

mysql_close($conn);  // 断开数据库连接

 ?>