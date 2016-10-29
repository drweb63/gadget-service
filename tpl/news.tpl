<ul>
<?php    
require "connect.php";    
$query = "SELECT name, full_name, price FROM kartridzh ORDER BY rand() LIMIT 3";
$result = mysqli_query($con, $query);
while($row = mysqli_fetch_array($result)){
echo	'<li>';
echo	'<div class="link">';
echo	'<a href="/catalog/kartridzh.php?name=',$row['name'],'">',$row['full_name'],'</a>';
echo	'</div>';
echo	'<div class="price">';
echo	$row['price'];
echo	'<span>руб</span>';
echo	'</div>';
echo    '</li>';
}
?>
</ul>