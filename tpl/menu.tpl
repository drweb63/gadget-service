<div class="menu" >
	<ul>
		<li>
	<a href="/">Главная</a>
</li><li>
	<a href="/about.php">О компании</a>
</li><li>
	<a href="/catalogc.php">Каталог</a>
</li><li>
	<a href="/contacts.php">Контакты</a>
</li>
		<?php
		if ($check == 'ok'){
		echo '<li>';
		echo '<a href="/users/users.php">Пользователи</a>';
		echo '</li>';
		}
		?>
	</ul>
</div>