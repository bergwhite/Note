<?php 

include '../../conn.php'; // 引入数据库连接页面

if(!empty($_COOKIE["userId"])){

	/* 已经登陆 */

	$arr = array("loginState"=>"yes");
	echo json_encode($arr);
}
else {

	/* 正在登陆 */

	$arr = array("loginState"=>"login...");
	echo json_encode($arr);

	/* 获取登陆信息

	$user = $_POST['user'];
	$pass = $_POST['pass']

	 */

	/* 前端界面未完成，暂时使用模拟信息 */

	$user = "berg";
	$pass = md5("2333");


	/* 验证登陆信息 */

	$sql = "select * from user where user_name='$user' and user_pass='$pass'";
	$result = mysql_query($sql);

	/* 保存登陆信息 */

	while($row = mysql_fetch_array($result)){

		$userId = $row["user_id"];

		setcookie("user",$user,time()+3600,"/","localhost",null,true);
		setcookie("userId",$userId,time()+3600,"/","localhost",null,true);

		// echo $row['user_name'].' '.$row['user_pass']; // 测速登陆结果

	};
}
 ?>