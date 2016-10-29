<?php
include "../check.php";
include "../tpl/head.tpl";
if ($check == 'ok'){}
else{header ("Location: /");}
$id = $_GET['id'];
$query = "SELECT * FROM users WHERE user_id = '".$id."'";
$result = mysqli_query($con, $query);
while($row = mysqli_fetch_array($result)){
$user_login = $row['user_login'];
$user_id = $row['user_id'];
}
?>

<div id="header">
	<div class="columns">
		<div class="spacer"></div>
		<div class="column-left">
			
		</div>
		<div class="spacer"></div>
		<div class="column-center">
			<div class="logo">
				<a href="/"><img src="../images/logo.png" alt="" /></a>
			</div>
            <div class="specification">
			<form action="/users/users_active.php" method="POST">
               <table> 
<tr><td>
    <span>Введите новый логин и пароль для пользователя : <b><?=$user_login ?></b><span>
</td></tr>
<tr><td>
    <span>Логин :<span>
    <input name="login" type="text" value="<?=$user_login ?>">
</td></tr>
<tr><td>
    <span>Пароль :<span>
    <input name="password" type="password" value="">
</td></tr>
<tr><td>
<input name="active" type="hidden" value="edit">
<input name="id" type="hidden" value="<?=$user_id ?>">
<input name="submit" type="submit" value="Изменить">
</td></tr>
</table>
</form>
            
<form action="/users/users.php">
    <table>
    <tr><td>  
        <input type="submit" value="Отмена">
    </td></tr>
    </table>
</form>  
    <br>
    <br>
    <br>
    
</div>
            </div>
<div class="spacer"></div>


        
<div class="spacer"></div>
</div>
</div>
<?php
include "../tpl/footer.tpl";
?>