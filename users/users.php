<?php
include "../check.php";
include "../tpl/head.tpl";
include "../tpl/nologin.tpl";
include "../tpl/menu.tpl";
?>
<div class="column-right">
</div>
		<div class="spacer"></div>
	</div>
</div>
			<div id="main">
				<div class="catalog">
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left oh"><div class="banner"></div></div>
						<div class="spacer"></div>
						<div class="column-center">
							<div class="filter">	
	
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
						<div class="column-center">
						<div class="catalog-search">
	<form action="/users/users.php" method="get">
		<button class="find">Найти</button>
		<div class="input">
		<input type="text" name="search" data-placeholder="Искать пользователя" value="" />
		</div>
	</form>
</div>
						</div>
						<div class="spacer"></div>
						<div class="column-right">
							
<div class="c"></div>
						</div>
						<div class="spacer"></div>
					</div>
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left oh">
							
							<div class="banner"></div>
						</div>
						<div class="spacer"></div>
						<div class="column-center dual-right">
                            <div class="specification">
			<table>
  <tr>
	<td>
	<div class="login-link">
		<a href="/users/users_add.php" class="tspt-btn">
		<span>Добавить</span>
		<img src="" alt="" />
		</a>
	</div>
	</td><td></td><td></td>
  </tr>
  
<?php
if ($check == 'ok'){
$search=trim($_GET["search"]);
if ($_GET["search"] ){$query = "SELECT * FROM users WHERE user_login LIKE '%$search%'";}
    else {$query = "SELECT * FROM users ORDER BY user_login ";}
$result = mysqli_query($con, $query);
while($row = mysqli_fetch_array($result)){
echo '<tr>';
echo '<td>';
echo '<a class="white">';
echo '<span>',$row['user_login'],'</span>';
echo '</a>';
echo '</td>';
echo '<td>';
echo '<a href="/users/users_edit.php?id=',$row['user_id'],'">Изменить</a>';
echo '</td>';
echo '<td>';
echo '<a href="/users/users_active.php?active=del&id=',$row['user_id'],'">Удалить</a>';
echo '</td>';
echo '</tr>';
    }
}else{ header ("Location: /");}
?>
</table>
                            </div>
<div class="c"></div>
</div>
</div>
<div class="spacer"></div>
</div>
</div>
</div>
<?php
include "../tpl/footer.tpl";
?>