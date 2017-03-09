<?php 

include '../../conn.php';  // 引入数据库连接页面
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句

$cookie_userId = (int)$_COOKIE["userId"];  // 获取用户ID

//$noteId = $_POST["noteId"];  // 获取文章ID
$noteId = 29;

/* 执行添加语句 */

$sql = "delete from note where user_id = $cookie_userId and note_id = $noteId";
$result = mysql_query($sql);

/* 返回JSON状态*/

if(mysql_affected_rows()){
	$resultJSON = array("modifyState"=>"yes");
}
else {
	$resultJSON = array("modifyState"=>"no");
}
echo json_encode($resultJSON);

mysql_close($conn);  // 断开数据库连接

 ?>