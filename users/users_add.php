<?php
include "../check.php";
include "../tpl/head.tpl";
if ($check == 'ok'){}
else{header ("Location: /");}
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
    <span>Введите логин и пароль для нового пользователя<span>
</td></tr>
<tr><td>
    <span>Логин :<span>
    <input name="login" type="text">
</td></tr>
<tr><td>
    <span>Пароль :<span>
    <input name="password" type="password"><br>
</td></tr>
<tr><td>
<input name="active" type="hidden" value="add">
<input name="submit" type="submit" value="Добавить">
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
    
</div>
            </div>
<div class="spacer"></div>


        
<div class="spacer"></div>
</div>
</div>
<?php
include "../tpl/footer.tpl";
?>