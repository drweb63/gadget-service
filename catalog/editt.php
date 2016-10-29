<?php
include "../check.php";
if ($check == 'ok'){
if (isset ($_POST["name"])){
$name =$_POST["name"];
$id = $_POST["id"];
$full_name = $_POST["full_name"];
$article = $_POST["article"];
$info = $_POST["info"];
$price = $_POST["price"];
$type = $_POST["type"];
$cvet = $_POST["cvet"];
$proishozdenie = $_POST["proishozdenie"];
$resurs = $_POST["resurs"];
$sovmestimost = $_POST["sovmestimost"];
$table = $_POST["table"];

if (empty($_FILES['img']['name'])){$img = $_POST["image"];}
else {
if ($_FILES['img']['type'] == 'image/jpeg'){$mime = ".jpg";}
elseif($_FILES['img']['type'] == 'image/png'){$mime = ".png";}
elseif($_FILES['img']['type'] == 'image/gif'){$mime = ".gif";}
elseif($_FILES['img']['type'] == 'image/bmp'){$mime = ".bmp";}
$img = $name.$mime;
$uploadfile = "../images/catalog/".$img;
move_uploaded_file($_FILES['img']['tmp_name'], $uploadfile);
}

$query = "UPDATE ".$table." SET name='".$name."',full_name='".$full_name."',article='".$article."',info='".$info."',price='".$price."',
img='".$img."',type='".$type."',cvet='".$cvet."',proishozdenie='".$proishozdenie."',resurs='".$resurs."',sovmestimost='".$sovmestimost."'
WHERE id='".$id."'";
$add = mysqli_query($con, $query);
if ($table == 'kartridzh'){header ("Location: /catalogc.php");}
else {header ("Location: /catalogz.php");}
}
}else{
 $table = $_POST["table"];
 if ($table == 'kartridzh'){header ("Location: /catalogc.php");}
 else {header ("Location: /catalogz.php");}
}
?>