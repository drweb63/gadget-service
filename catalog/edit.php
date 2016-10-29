<?php
include "../check.php";
include "../tpl/head.tpl";
include "../tpl/nologin.tpl";
include "../tpl/menu.tpl";
if ($_GET["edit"]){$edit = $_GET["edit"];} else {$edit = 'kartridzh';}
if ($check == 'ok'){
$id = $_GET["id"];
$query = "SELECT * FROM ".$edit." WHERE id = ".$id." ";
$result = mysqli_query($con, $query);
while($row = mysqli_fetch_array($result)){
$name =$row['name'];
$full_name = $row["full_name"];
$article = $row["article"];
$info = $row["info"];
$img = $row["img"];
$price = $row["price"];
$type = $row["type"];
$cvet = $row["cvet"];
$proishozdenie = $row["proishozdenie"];
$resurs = $row["resurs"];
$sovmestimost = $row["sovmestimost"];
}
}else{
if ($edit == 'kartridzh'){header ("Location: /catalogc.php");}
else {header ("Location: /catalogz.php");}
}
?>
<div class="column-right">
</div>
		<div class="spacer"></div>
	</div>
</div>
<div id="main">
				<div class="product-page">
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left oh"><div class="banner"></div></div>
						<div class="spacer"></div>
						<div class="column-center">
							<div class="filter">
									
	<div class="type-switcher">
		<ul>
     <?php
    if ($edit == 'kartridzh'){
    echo'<li class="active">';
	echo'<a class="white" href="/catalogc.php" data-type="printers">';
	echo'<span>Картриджи</span>';
	echo'</a>';
    echo'</li><li>';
	echo'<a class="white" href="/catalogz.php" data-type="">';
	echo'<span>Заправка</span>';
	echo'</a>';
    echo'</li>';
     }
    elseif ($edit == 'zapravka'){
    echo'<li>';
	echo'<a class="white" href="/catalogc.php" data-type="printers">';
	echo'<span>Картриджи</span>';
	echo'</a>';
    echo'</li><li class="active">';
	echo'<a class="white" href="/catalogz.php" data-type="">';
	echo'<span>Заправка</span>';
	echo'</a>';
    echo'</li>';   
     }
    else{
    echo'<li class="active">';
	echo'<a class="white" href="/catalogc.php" data-type="printers">';
	echo'<span>Картриджи</span>';
	echo'</a>';
    echo'</li><li>';
	echo'<a class="white" href="/catalogz.php" data-type="">';
	echo'<span>Заправка</span>';
	echo'</a>';
    echo'</li>';   
     }
    ?>
</ul>
	</div>
	</div>
						</div>
						<div class="spacer"></div>
						<div class="column-right">
							<div class="cart"></div>
						</div>
						<div class="spacer"></div>
					</div>
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left">
						</div>
						<div class="spacer"></div>
                        <form action="/catalog/editt.php" method="post" enctype="multipart/form-data">
						<div class="column-center product-page-top" >
								<div class="specification">
								<table>
								<tr>
								<td>Название :</td>
								<td><input name= "full_name" size= "32" maxlength= "64" value= "<?=$full_name ?>"><td>
								</tr>
								<tr>
								<td>Сокращение :</td>
								<td><input name= "name" size= "32" maxlength= "64" value= "<?=$name ?>"></td>
								</tr>
							</table>
								</div>
								</div>
						<div class="spacer"></div>
						<div class="column-right"></div>
						<div class="spacer"></div>
					</div>
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left">
							<div class="small-text">
	<h5>Описание</h5>
	<div ><h1><textarea name="info" cols="30" rows="20" maxlength= "256"><?=$info ?></TEXTAREA></h1></div>
</div>
							<div class="banner"></div>
						</div>
						<div class="spacer"></div>
						<div class="column-center dual-right">
							<div class="content">
                                <input type="file" name="img" value =""> 
								<div class="main-pic">
	<div class="pic-preview">
		<ul>
			<li>
    
       
</li>
          
		</ul>
        <div class="c"></div>
	</div>
	<div class="img">
		<img src="../images/catalog/<?=$img ?>" alt="" />
        
	</div>
    
</div>
								<div class="right-side">
									<div class="price">
										<input name= "price" size= "6" maxlength= "10" value= "<?=$price ?>">
										<span>руб</span>
									</div>
									<div class="c"></div>
									<div class="specification">
										<h5>Характеристики</h5>
										<table>
											<tr>
	<td>Артикул</td>
	<td><input name= "article" size= "20" maxlength= "20" value= "<?=$article ?>"></td>
</tr><tr>
	<td>Тип картриджа</td>
	<td><input name= "type" size= "20" maxlength= "32" value= "<?=$type ?>"></td>
</tr><tr>
	<td>Цвет печати</td>
	<td><input name= "cvet" size= "20" maxlength= "32" value= "<?=$cvet ?>"></td>
</tr><tr>
	<td>Происхождение</td>
	<td><input name= "proishozdenie" size= "20" maxlength= "32" value= "<?=$proishozdenie ?>"></td>
</tr><tr>
	<td>Ресурс печати</td>
	<td><input name= "resurs" size= "20" maxlength= "10" value= "<?=$resurs ?>"></td>
</tr><tr>
	<td>Совместимость с устройством печати</td>
	<td><input name= "sovmestimost" size= "20" maxlength= "256" value= "<?=$sovmestimost ?>"></td>
</tr><tr>
    <td><input name="id" type="hidden" value="<?=$id ?>"></td>
	<td><input name="image" type="hidden" value="<?=$img ?>"></td>
</tr><tr>
    <td><input name="table" type="hidden" value="<?=$edit ?>"></td>
    <td><div class="login-link"><a class="tspt-btn"><input type="submit" value="Изменить"></a></div></td>
</tr>
										</table>
									</div>
								</div>
								<div class="c"></div>
							</div>
							
						</div>
						<div class="spacer"></div>
					</div>
                    </form>
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left"></div>
						<div class="spacer"></div>
						<div class="column-center dual-right">
							
							
						</div>
						<div class="spacer"></div>
					</div>
				</div>
			</div>
	<?php
include "../tpl/footer.tpl";
?>	