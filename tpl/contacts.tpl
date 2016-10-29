<div id="main">
				<div class="columns">
					<div class="spacer"></div>
					<div class="column-left"></div>
					<div class="spacer"></div>
					<div class="column-center">
						<div class="content">
							<div class="contacts">
								<h1>Контакты</h1>
								<div class="c"></div>
								<div class="adresses-list">
									<ul>
										<li class="active"><div><p>&nbsp;</p>
<h2>Тольятти, ул. Ленинградская, 15</h2>
<h2>(8482) 36-78-82, 36-78-11</h2></div></li>
										<li><div><p>&nbsp;</p>
<h2><br></h2></div></li>
									</ul>
								</div>
								<div class="feedback">
	<div class="block">
		<h2>Режим работы</h2>
		<div class="weekline">
			<ul>
				<li>пн</li>
				<li>вт</li>
				<li>ср</li>
				<li>чт</li>
				<li>пт</li>
				<li class="weekend">сб</li>
				<li class="weekend">вс</li>
			</ul>
			<div class="curly" style="width: 55%; margin: 0 4px;">
				9 - 18
			</div>
			<div class="curly" style="width: 12%; margin: 0 5px 0 1px;">
				9 - 17
			</div>
			<div class="curly-red fright" style="width: 26%; margin: 0 4px 0 0;">
				выходные
			</div>
		</div>
	</div>
	<div class="block">
		<h2>Задайте нам вопрос</h2>
		<form enctype="multipart/form-data" method="post" action="">
			<input type="hidden" name="system_form_id" value="125" />
			<input type="hidden" name="system_template" value="feedback" />
			<input type="hidden" value="/webforms/posted/" name="ref_onsuccess">
			<input type="hidden" name="system_email_to" value="582" />		
			<div class="input fleft">
				<input class="required" data-placeholder="Ваше имя" type="text" name="data[new][name]"/>
			</div>
			<div class="input fright">
				<input class="e-mail required" data-placeholder="Ваша электронная почта" type="text" name="data[new][email]"/>
			</div>
			<div class="c"></div>
			<div class="textarea">
				<textarea data-placeholder="Текст вашего вопроса" name="data[new][message]" class="required"></textarea>
			</div>
			<button class="send">Отправить</button>
			
		</form>
	</div>
</div>
							</div>
						</div>
					</div>
					<div class="spacer"></div>
					<div class="column-right"></div>
					<div class="spacer"></div>
				</div>
				<div class="columns">
					<div class="spacer"></div>
					<div class="maps-lists">
						<div class="wrap">
							<div class="decorator">
								<div></div>
							</div>
							<ul>
								<li><div id="map1" style="width: 100%; height: 100%;"></div></li>
							</ul>
							<script type="text/javascript" src="http://api-maps.yandex.ru/2.0-stable/?coordorder=longlat&load=package.full&lang=ru-RU"></script>
							<script type="text/javascript">
								ymaps.ready(function(){
									var map1 = new ymaps.Map('map1', {center: [49.391500, 53.503700], zoom: 16.5, type: 'yandex#map'});
									var placemark1 = new ymaps.Placemark([49.395400, 53.503700]);
										map1.geoObjects.add(placemark1);


									$('.maps-lists .decorator').show();
								});
							</script>
						</div>
					</div>
					<div class="spacer"></div>
				</div>
			</div>