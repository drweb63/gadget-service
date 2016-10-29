<?php
include "../check.php";
if(isset($_GET["name"])){
    $name=$_GET["name"];
    $query = "SELECT * FROM kartridzh WHERE name='$name'";
    $result = mysqli_query($con, $query);
    while($row = mysqli_fetch_array($result)){
    
$full_name = $row['full_name'];
$article = $row['article'];
$info = $row['info'];
$img = $row['img'];
$price = $row['price'];
$type = $row['type'];
$cvet = $row['cvet'];
$proishozdenie = $row['proishozdenie'];
$resurs = $row['resurs'];
$sovmestimost = $row['sovmestimost'];
}
}
include "../tpl/head.tpl";
include "../tpl/nologin.tpl";
include "../tpl/menu.tpl";
include "../tpl/contacts_main.tpl";
include  "../tpl/kartridzh.tpl";
include "../tpl/footer.tpl";

?>