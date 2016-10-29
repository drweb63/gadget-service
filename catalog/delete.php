<?php
include "../check.php";
if ($check == 'ok'){
if ($_GET["del"]){
$del = $_GET["del"];
$id = $_GET["id"];
$query = "DELETE FROM ".$del." WHERE id = '".$id."' LIMIT 1";
$delete = mysqli_query($con, $query);
if ($del == 'kartridzh'){header ("Location: /catalogc.php");}
else {header ("Location: /catalogz.php");}
}
}else{
if ($_GET["del"]){
if ($del == 'kartridzh'){header ("Location: /catalogc.php");}
else {header ("Location: /catalogz.php");}
}
}
?>