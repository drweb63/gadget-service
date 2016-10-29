</div>
<div id="footer">
	<div class="container">
		<div class="columns border-box">
			<div class="spacer"></div>
			<div class="column-left">
				<p class="copyright" >“<span>Принт-Сервис</span>” © 2016</p>
			</div>
			<div class="spacer"></div>
			<div class="column-center">
				<div class="link"><a href="/contacts">Контактная информация</a></div>
				<div class="link" ><a href="mailto:mail@print-service.pro" target="_blank">mail@print-service.pro</a></div>
			</div>
			<div class="spacer"></div>
			<div class="column-right">
				<?php
				if ($check == 'ok'){
				echo '<div class="link"><a href="/login.php?login=exit">Выход</a></div>';
				}else{
				echo '<div class="link"><a href="/login.php">Админ?</a></div>';
				}
				?>
			</div>
			<div class="spacer"></div>
		</div>
	</div>
</div>
</body>
</html>