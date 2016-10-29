<?php
if ($_GET['login']=='exit'){
setcookie("id", "");
header("Location: /");
}
else{
function generateCode($length=6) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
    $code = "";
    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {
            $code .= $chars[mt_rand(0,$clen)];
    }
    return $code;
}

require "connect.php";

if(isset($_POST['submit']))
{
    $query = mysqli_query($con,"SELECT user_id, user_password FROM users WHERE user_login='".mysqli_real_escape_string($con,$_POST['login'])."' LIMIT 1");
    $data = mysqli_fetch_assoc($query);

    if($data['user_password'] === md5(md5($_POST['password'])))
    {
        $hash = md5(generateCode(10));

        if(!@$_POST['not_attach_ip'])
        {
            $insip = ", user_ip=INET_ATON('".$_SERVER['REMOTE_ADDR']."')";
        }

        mysqli_query($con, "UPDATE users SET user_hash='".$hash."' ".$insip." WHERE user_id='".$data['user_id']."'");

        setcookie("id", $data['user_id'], time()+60*60*24*30);
        setcookie("hash", $hash, time()+60*60*24*30);

        header("Location: /");
    }
    else
    {
        $err = "Вы ввели неправильный логин/пароль";

    }
}
}
?>
<?php
include "tpl/head.tpl";
?>
<div id="header">
	<div class="columns">
		<div class="spacer"></div>
		<div class="column-left">
			
		</div>
		<div class="spacer"></div>
		<div class="column-center">
			<div class="logo">
				<a href="/"><img src="/images/logo.png" alt="" /></a>
			</div>
            <form method="POST">
Логин <input name="login" type="text"><br>
Пароль <input name="password" type="password"><br>
Не прикреплять к IP(не безопасно) <input type="checkbox" name="not_attach_ip"><br>
<input name="submit" type="submit" value="Войти">
</form>
			<br>
			<br>
			<br>
            <?=$err ?>
            </div>
<div class="spacer"></div>


        
<div class="spacer"></div>
</div>
</div>
<?php
include "tpl/footer.tpl";
?>