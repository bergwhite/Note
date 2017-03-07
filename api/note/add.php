<?php 

include '../../conn.php';  // 引入数据库连接页面
include '../user/login_check.php';  // 引入登陆检查页面，未登录不执行sql语句

$cookie_userId = (int)$_COOKIE["userId"];  // 获取用户ID

echo gettype($cookie_userId);

/* 文章信息

$tag = $_POST["tag"];
$title = $_POST["title"];
$content = $_POST["content"];
$date = $_POST["date"];

 */

/* 前端界面未完成，暂时使用模拟信息*/

$tag = "CSS";
$title = "这是一篇测速文章";
$content = "通过后台添加进来的";
date_default_timezone_set("UTC");
$dates = date("Y-m-d");

/* 执行添加语句 */

//$sql = "INSERT INTO `note` (`note_id`,`user_id`,`note_tag`,`note_title`,`note_content`,`note_date`) VALUES (NULL,'$cookie_userId','$tag','$title','$content','2017-03-20')";
$sql = "INSERT INTO `note` (`note_id`,`user_id`,`note_tag`,`note_title`,`note_content`,`note_date`) VALUES (NULL,2,'CSS','这是一篇测速文章','通过后台添加进来的','2017-03-20')";
//$sql = "insert into note (note_id,user_id,tag_name,note_title,note_content,note_date) values (4,2,'css','not','work','2017-03-07')";
$result = mysql_query($sql);

/* 返回JSON状态*/

while ($row = mysql_fetch_array($result)) {
	$resultJSON = array("addState","yes");
	echo json_encode($resultJSON);
}

mysql_close($conn);  // 断开数据库连接

 ?>