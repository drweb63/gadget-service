<?php
include "../check.php";
if ($check == 'ok'){
if(isset($_POST['submit'])){
if ($_POST["active"] == 'add'){
$login = $_POST['login'];
$password = md5(md5(trim($_POST['password'])));
$query = "INSERT INTO users SET user_login='".$login."', user_password='".$password."'";
$add = mysqli_query($con, $query);
header ("Location: users.php");
}
elseif ($_POST["active"] == 'edit'){
$id = $_POST['id'];  
$login = $_POST['login'];
$password = md5(md5(trim($_POST['password'])));
$query = "UPDATE users SET user_login='".$login."', user_password='".$password."' WHERE user_id = '".$id."' LIMIT 1";
$add = mysqli_query($con, $query);
header ("Location: users.php");    
}
}
elseif(isset($_GET['id'])){
if ($_GET["active"] == 'del'){
$id = $_GET["id"];
$query = "DELETE FROM users WHERE user_id = '".$id."' LIMIT 1";
$delete = mysqli_query($con, $query);
header ("Location: users.php");
}
}
}
else{header ("Location: /");}
?>