<?php 

include '../../conn.php';  // 引入数据库连接页面

// 已登陆用户退出注册

/* BUG undefined userId
if($_COOKIE["userId"]){
	$resultJSON = array("registerState"=>"no");
	exit();
};*/

// 注册信息

$user = $_POST["user"];
$pass = md5($_POST["pass"]);
if ($_POST["mail"]) {
	$mail = $_POST["mail"];
}
else {
	$mail = "init@berg.com";
}
//$mail = $_POST["content"];

/* 前端界面未完成，暂时使用模拟信息 */
/*
$user = "lloxafs";
$pass = "worlxdasfd";
$mail = "hello@wosas.coms";
*/
/* 执行添加语句 */

$sql = "insert into user (user_name,user_pass,user_mail) values ('$user','$pass','$mail')";
$result = mysql_query($sql);

/* 返回JSON状态*/

// mysql_fetch_array($result)
// mysql_affected_rows()

if($result){
	$sql = "select * from user where user_name = '$user'";  // 写入语句
	$resultId = mysql_query($sql);
	while($row = mysql_fetch_array($resultId)){
		//$user = urldecode($row["user_name"]);
		$user = $row["user_name"];
		$userId = $row["user_id"];
		setcookie("user",$user,time()+3600,"/","localhost",null,false);
		setcookie("userId",$userId,time()+3600,"/","localhost",null,false);
		$resultJSON = array("registerState"=>"yes");
	}
	
}
else {
	$resultJSON = array("registerState"=>"no");
}
echo json_encode($resultJSON);

mysql_close($conn);  // 断开数据库连接

 ?>