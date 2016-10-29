			<div id="main">
				<div class="catalog ">
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left oh"><div class="banner"><a href="/about/" style="background-image: url(/images/cms/headers/banners/banner1.png);" ><img src="/images/cms/headers/banners/banner1.png" alt=""  /></a></div></div>
						<div class="spacer"></div>
						<div class="column-center">
							<div class="filter">	
	<div class="type-switcher">
		<ul>
	<li>
	<a class="white" href="/catalogc.php" data-type="printers">
		<span>Картриджи</span>
	</a>
    </li>
    <li class="active">
	<a class="white" href="/catalogz.php" data-type="">
		<span>Заправка</span>
	</a>
</li>
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
						<div class="column-center">
						<div class="catalog-search">
	<form action="/catalogz.php" method="get">
		<button class="find">Найти</button>
		<div class="input">
			<input type="text" name="search" data-placeholder="Искать в каталоге" value="" />
		</div>
	</form>
</div>
						</div>
						<div class="spacer"></div>
						<div class="column-right">
							<div class="sort">
	<input id="catalog-sort-field" type="hidden" name="sort[field]"/>
	<input id="catalog-sort-direction" type="hidden" name="sort[direction]"/>
	<span>Сортировать по:</span>
	<?php
	if ($_GET["sort"] == "h0") { echo
	'<a href="?sort=h0" class="active asc" data-sort-field="denotation">названию</a>
	<a href="?sort=h1" class="desc" data-sort-field="denotation">названию</a>';}
	elseif ($_GET["sort"] == "h1") { echo
	'<a href="?sort=h0" class="asc" data-sort-field="denotation">названию</a>
	<a href="?sort=h1" class="active desc" data-sort-field="denotation">названию</a>';}
	else { echo
	'<a href="?sort=h0" class="active asc" data-sort-field="denotation">названию</a>
	<a href="?sort=h1" class="desc" data-sort-field="denotation">названию</a>';}
	
	?>
</div>
<div class="c"></div>
						</div>
						<div class="spacer"></div>
					</div>
					<div class="columns">
						<div class="spacer"></div>
						<div class="column-left oh">
							<div class="info-block">
	<ul>
		<li class="dal">
	<a href="" >Гарантийное обслуживание</a>
	<p>Гарантийное обслуживание осуществляется специалистами Центра бесплатно.</p>
</li><li class="dal">
	<a href="" >Бесплатная доставка</a>
	<p>Доставка оборудования по территории Тольятти осуществляется нашим транспортом бесплатно.</p>
</li><li class="dal">
	<a href="" >Бесплатные консультации</a>
	<p>Консультации и выезд специалистов по заявкам для оперативного устранения неисправности оборудования также осуществляется бесплатно.</p>
</li>
	</ul>
</div>
							<div class="banner"><a href="/about.php" style="background-image: url(/images/cms/headers/banners/banner2.png);" ><img src="/images/cms/headers/banners/banner2.png" alt=""  /></a></div>
						</div>
						<div class="spacer"></div>
						<div class="column-center dual-right">
			
	<?php include $zapravki ?>
	<div class="c"></div>
</div>
					</div>
						<div class="spacer"></div>
					</div>
				</div>
			</div>