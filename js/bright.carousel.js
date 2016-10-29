$(document).ready(function(){
	$('.gallery-slider-block').brightCarousel();
});

// Ресайз окна
$(window).resize(function(){
	$('.gallery-slider-block').brightCarousel('redraw');
});

jQuery.fn.extend({
	brightCarousel: function(action){
		var $this = $(this);

		if(action){
			switch(action.toLowerCase()){
				case 'redraw':
					var deleteFrom = $this.find('li').size() / 2 -1;
					$this.find('li:gt('+deleteFrom+')').remove();
					$this.removeAttr('style')
						.children('ul').removeAttr('style')
						.children('li').removeAttr('style')
						.children('a').removeAttr('style').unbind()
						.children('img').removeAttr('style');
					$this.find('.prev').unbind();
					$this.find('.next').unbind();
					$this.brightCarousel();
					break;
					
				case 'removeinfo':
					$this.find('.description').remove();
					break;

				case 'addinfo':
					var title = $(this).find('a').attr('title');
					if (title) $(this).append('<div class="description"><span>'+title+'</span><span class="ah"></span></div>');
					break;
			}

			return;
		}

		options = {
			sideItemsCount : 2
		};


		$this.css('overflow','hidden');

		// Кнопки вперёд, назад
		var btnPrev = $this.find('.prev');
		var btnNext = $this.find('.next');

		var items =   $this.children('ul').children('li');
		var itemsWrap = $this.children('ul');

		var superWrapWidth = $this.width();
		var itemWidth = items.first().width();
		var itemHeight = items.first().height();
		var itemMarginTop = items.first().css('margin-top');
		var itemPadding = superWrapWidth - itemWidth * 4;

		var isAnimated = false;

		// Проверим, хватает ли слайдов, чтобы заполнить экран
		if (items.size() < options.sideItemsCount + 2) {

			// Если нет, добавим клонов
			var multy = options.sideItemsCount + 1 - items.size();
			multy += ((multy * items.size() + items.size()) < (options.sideItemsCount + 2)) ? 1 : 0;
			for (var l = 1; l <= multy; l++) {
				for (var i = 0; i < items.size(); i++) {
					items.eq(items.size() - i - 1).clone().prependTo(itemsWrap);
				}
			}

			// Обновим слайды
			items = $this.children('ul').children('li');
		}

		// Копируем в начало все слайды
		for (var i = 1; i <= items.size(); i++) {
			items.eq(items.size() - i).clone().prependTo(itemsWrap);
		}

		// Активируем первый слайд
		var currentItem = items.first().addClass('current');
		var currentItemWidth = currentItem.width();
		var currentItemHeight = currentItem.height();

		// Добавляем ему описание
		currentItem.brightCarousel('addinfo');

		// Вычислим доступный margin-right для элементов в зависимости от разрешения
		itemPadding = Math.floor((itemPadding - currentItem.width()) / 4);
		var itemFullWidth = itemWidth + itemPadding;

		// Обновим массив слайдов после копирования
		items = $this.children('ul').children('li');
		items.css('margin-right', itemPadding);

		// Вычисляем необходимую ширину для itemsWrap
		itemsWrap.width((items.size() - 1) * itemFullWidth + currentItem.width() + itemPadding);

		// Смещаем враппер влево, в соответствии с sideItemsCount
		var startMargin = itemFullWidth*((items.size() / 2)-options.sideItemsCount);

		$(this).width(itemFullWidth*4+currentItem.width());

		itemsWrap.css('margin-left','-='+startMargin);

		var itemLinks = items.children('a').attr('href', '#');
		currentItem.children('a').removeAttr('href');

		// Клик вперёд
		btnNext.click(function(){
			currentItem.next().children('a').click();
			return false;
		});

		// Клик назад
		btnPrev.click(function(){
			currentItem.prev().children('a').click();
			return false;
		});

		itemLinks.click(function(){
			if (!isAnimated && $(this).attr('href'))
			{

				isAnimated = true;

				$(this).removeAttr('href');
				var prevItem = currentItem;

				itemsWrap.width(itemsWrap.width()+itemFullWidth);
				var course = prevItem.index() - $(this).parent().index();

				itemsWrap.animate({marginLeft : '+='+(itemFullWidth * course)});
				prevItem.brightCarousel('removeinfo');

				prevItem.animate({
					width: itemWidth,
					height: itemHeight,
					marginTop: itemMarginTop
				}, function(){
					prevItem.removeAttr('class')
				});

				prevItem.find('img').animate({
					width: itemWidth,
					height: itemHeight
				}, function(){
					if (course < 0)
					{	
						itemsWrap.children().slice(0, -course).appendTo(itemsWrap);
					}

					else
					{
						itemsWrap.children().slice(-course).prependTo(itemsWrap);
					}

					itemsWrap.css('margin-left','+='+(itemFullWidth * -course));
					$(this).parent().attr('href', '#');
				});

				currentItem = $(this).parent();
				currentItem.animate({
					width: currentItemWidth,
					height: currentItemHeight,
					marginTop: 0
				},function(){
					currentItem.addClass('current').brightCarousel('addinfo');
				});

				currentItem.find('img').animate({
					width: currentItemWidth,
					height: currentItemHeight
				},function(){
					isAnimated = false
				});
			}
			return false;
		});

		$(window).keydown(function(e){
			switch(e.keyCode){
				case 39:
					btnNext.addClass('active').click();
					break;
				case 37:
					btnPrev.addClass('active').click();
					break;
			}
		});

		$(window).keyup(function(e){
			switch(e.keyCode){
				case 39:
					btnNext.removeClass('active');
					break;
				case 37:
					btnPrev.removeClass('active');
					break;
			}
		});
	}});