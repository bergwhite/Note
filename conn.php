<?php 

/* 数据库连接信息 */

$host = "localhost";
$user = "root";
$pass = "root";
$data = "Note";

$conn = mysql_connect($host,$user,$pass);  // 开始连接
mysql_select_db($data,$conn);  // 指定数据库
 ?>