jQuery.fn.extend({
	src: function(src){
		return $(this).attr('src', src);
	},

	parseInt: function(){
		method = $(this).val() ? 'val' : 'text';
		return parseInt($(this)[method]().replace(/ /g, ''), 10)
	},

	onlyDigits: function(){
		return this.keypress(function(e){
			return Boolean((e.which > 47) & (e.which < 58));
		});
	},

	ajaxLoadingStart: function(){
		var frames = 12;
		var width = 15;
		var current_frame = 0;

		var $loading = $('<span class="ajax-loading"></span>').appendTo(this);
		$loading.css('opacity', 0).animate({opacity: 1}, 200);

		var interval = setInterval(function(){
			if(current_frame > (frames - 1)) current_frame = 0;
			$loading.css('background-position', -(current_frame * width) + 'px 0');
			current_frame++;
		}, 70);

		this.attr('disabled', true);
		$loading.data('interval-id', interval);
	},

	ajaxLoadingStop: function(){
		$loading = this.find('.ajax-loading');
		$loading.animate({opacity: 0}, function(){
			clearInterval($loading.data('interval-id'));
			$loading.remove();
		});

		this.attr('disabled', false);
	}
});

jQuery.ending = function(amount, ending1, ending2, ending3)
{

	var remain100 = amount % 100;
	var remain10 = amount % 10;

	if(!((remain10 == 0) || (9 < remain100 && remain100 < 20))){

		if(remain10 == 1){
			return ending1;
		}

		else if(remain10 < 5){
			return ending2;
		}
	}

	return ending3;
};

jQuery.ttr = function(amount){
	var regular = /(\d)(?=((\d{3})+)(\D|$))/g;
	return amount.toString().replace(regular, '$1 ');
};

$(function(){
	/* Брейки и нобрейки в меню */
	$('.menu li a').each(function(){
		var text = $(this).text();
		var words = text.split(' ');

		if(words.length > 1){
			var _words = words;
			var small_word = 5;
			var do_continue = 0;

			for(var i = 0; i < words.length; i++){

				if(!words[i+1]) break;

				if(do_continue){
					do_continue = 0;
					continue;
				};

				/*if((i == 0) && (words[i].length < small_word)){
					_words[i] += '&nbsp';
					continue;
				}*/

				if((words[i].length < small_word) || (words[i+1].length < small_word)){
					_words[i] += '&nbsp';
					_words[i+1] += '<br />';
					do_continue = 1;
				}

				else{
					_words[i] += '<br />';
				}
			}

			$(this).html(_words.join(''));
		}
	});

	/* Переключатель телефонов */
	$('.phone-switcher a').click(function(){
		var $this = $(this);
		var index = $this.parent().index() - 1;

		$this.parent().addClass('active')
		.siblings().removeClass('active');

		$this.closest('.phone-switcher').siblings('.phones')
		.find('li').removeClass('active').eq(index).addClass('active');

		return false;
	});

	/* Cтрелки к нижней границе */
	$('.page-arrow').each(function(){
		var $this = $(this);
		var cell_height = $this.parent().parent().height();
		var height = $this.height();
		$this.css('top', cell_height - height - 50);
	});

	/* Стили в зависимости от субменю */
	if(!$('#header .submenu').size()){
		$('#header .menu > ul').css({
			'text-align':'center',
			'width':'75%',
			'table-layout':'fixed'
		});

		$('#header .menu > ul > li')
			.first().css('text-align', 'left')
			.end()
			.last().css('text-align', 'right')
	}

	$('#header .menu').show();

	/* Переключатель городов в контактах */
	$('.contacts .switcher li a').click(function(){
		var $this = $(this);
		var index = $this.parent().index();

		if($this.parent().hasClass('active')) return false;

		$this.removeAttr('href').parent().addClass('active')
		.siblings().removeClass('active').find('a').attr('href', '#');

		$('.adresses-list li').hide().eq(index).show();
		$('.maps-lists li').hide().eq(index).show();

		return false;
	});

	/* Селекторы */
	$('.selector select').change(function(){
		$(this).parent().find('span').html($(this).find('option:selected').text() || '&nbsp;');
	});

	//$('.selector select').change();

	/* Слайдер */
	$('.slide-container .wrap > div').jcarousel({
		visible: 1,
		buttonNextHTML: null,
		buttonPrevHTML: null,
		scroll: 1,
		animation: 400,

		initCallback: function(carousel){
			$('.slide-arrow').click(function(){

				var method = $(this).hasClass('next') ? 'next' : 'prev';
				$('.slides-line li.active')[method]().click();

				return false;
			});

			$('.slides-line li').click(function(){
				var $this = $(this);
				var index = $this.index();

				$this.siblings().removeClass('active')

				$('.slides-line .marker').animate({
					left: 52 * index
				}, 400, function(){
					$this.addClass('active');
				});

				carousel.scroll(index + 1);
			});
		},

		itemVisibleInCallback: {
			onBeforeAnimation: function(carousel, item, idx, state){
				$(item).delay(200)
				.animate({
					opacity: 1
				}, 200);
			},

			onAfterAnimation: function(carousel, item, idx, state){
				$(item).addClass('active');
			}
		},
		itemVisibleOutCallback: {
			onBeforeAnimation: function(carousel, item, idx, state){
				$(item).animate({
					opacity: 0
				}, 200);
			},

			onAfterAnimation: function(carousel, item, idx, state){
				$(item).removeClass('active');
			}
		}
	});

	$('.technologies .slide-container .text').each(function(){
		$(this).clone().appendTo('.technologies .listed ol')
		.wrap('<li></li>');
	});

	/* Клик по переключателю в технологиях */
	$('.technologies .switcher li a').click(function(e){
		e.preventDefault();

		$this = $(this).parent();

		if($this.hasClass('active'))
		{
			return false;
		}

		else
		{
			$this.addClass('active')
			.siblings().removeClass('active');

			if($this.hasClass('list'))
			{
				$('.technologies .listed').show();
				$('.slide-arrow').hide();
				$('.technologies .slides-line').hide();
				$('.technologies .slide-container').hide();
			}

			else
			{
				$('.technologies .listed').hide();
				$('.slide-arrow').show();
				$('.technologies .slides-line').show();
				$('.technologies .slide-container').show();
			}
		}
	});

	$('.technologies .switcher li:first-child a').click();

	/* Установка скролла */
	function setScroll(){
		var jsp = $('.scroll-list .wrap').data('jsp');
		if(jsp) jsp.destroy();

		$('.scroll-list .wrap').jScrollPane({
			enableKeyboardNavigation: false
		});

		$('.scroll-list .jspHorizontalBar')
		.appendTo('.scroll-list .wrap');

		var $active = $('.scroll-list .active');

		if($active.size())
		{
			$('.scroll-list .wrap').data('jsp')
			.scrollToElement($active)
		};
	};

	/* Клик по переключателю в советах */
	$('.advices .switcher li a').click(function(e){
		e.preventDefault();
		
		$this = $(this).parent();

		if($this.hasClass('active'))
		{
			return false;
		}

		else
		{
			$this.addClass('active')
			.siblings().removeClass('active');

			if($this.hasClass('list'))
			{
				$(window).unbind('resize.advices-scroll');

				var jsp = $('.scroll-list .wrap').data('jsp');
				if(jsp) jsp.destroy();

				$('.advices-content')
				.removeClass('scroll-list')
				.addClass('listed')
				.appendTo('.list-place');

				$('.advice-text').hide();
			}

			else
			{
				$('.advices-content')
				.removeClass('listed')
				.addClass('scroll-list')
				.appendTo('.scroll-place');

				/* Скролл (Магия) */
				setScroll();

				var timeout;
				$(window).bind('resize.advices-scroll',	function(){
					clearTimeout(timeout);
					timeout = setTimeout(function(){
						setScroll();
					}, 50);
				});			

				$(window).resize();
				$('.advice-text').show();
			}
		}
	});

	$('.advices .switcher li:first-child a').click();

	if($.browser.msie && ($.browser.version == '7.0')){
		$('.advices .switcher, .technologies .switcher').hide();
		$('.advices .switcher li.list a').click();
		$('.technologies .switcher li.list a').click();
	};

	/* Клик по совету */
	$('.advices-content li a').click(function(){
		var $this = $(this).closest('li');

		if($this.hasClass('active')) return false;

		$this.addClass('active')
		.siblings().removeClass('active');

		var element_id = $(this).parents('li').attr('umi:element-id');
		$('.advice-text').html($this.find('.text').clone()).attr('umi:element-id', element_id);

		return false;
	});

	$('.advices-content li a:eq(2)').click();

	$('.scroll-list > button').click(function(){
		var $elem = $('.advices-content li.active a').closest('li')
		[$(this).hasClass('next') ? 'next' : 'prev']();

		$elem.find('a').click();

		var jsp = $('.scroll-list .wrap').data('jsp');
		if(jsp && $elem.size()) jsp.scrollToElement($elem);
	});

	$(window).keydown(function(e){
		switch(e.keyCode){
			case 39:
				$('.scroll-list button.next').click();
				break;
			case 37:
				$('.scroll-list button.prev').click();
				break;
		}	
	});

	/* Фильтр в каталоге */
	/*$('.type-switcher a').click(function(){
		$(this).parent().addClass('active')
		.siblings('.active').removeClass('active');

		$('#filter-type').val($(this).data('type'));

		return false;
	});*/

	$('.color-switcher a').click(function(){
		var $this = $(this);
		var $parent = $this.parent();

		$parent.toggleClass('active');

		if($parent.hasClass('active')){
			$this.siblings('input').attr('checked', 'checked');
		}

		else{
			$this.siblings('input').attr('checked', false);
		}

		return false;
	});

	/* Блок сортировки */
	/*$('.catalog .sort a').click(function(){
		var $this = $(this);

		if($this.hasClass('active'))
		{
			$this.toggleClass('asc desc');
		}

		else
		{
			$this.addClass('active')
			.siblings().removeClass('active');
		}

		$('#catalog-sort-field').val($this.data('sort-field'));
		$('#catalog-sort-direction').val($this.hasClass('asc') ? 'asc' : 'desc');

		return false;
	});*/

	$('.pic-preview li a').click(function(){
		var $this = $(this);

		$this.parent().addClass('active')
		.siblings().removeClass('active');

		$this.closest('.pic-preview')
		.siblings('.img').find('img').src($this.attr('href'));

		return false;
	});

	/* Кнопка для прикрепления файла */
	$('.filerator button').click(function(){
		$(this).siblings('input').click();
	});

	/* При прикреплении файла */
	$('.filerator input').change(function(){
		var file = $(this).val();
		reWin = '/.*(.*)/';
		var fileTitle = file.replace(reWin, "$1");
		reUnix = '/.*/(.*)/';
		fileTitle = fileTitle.replace(reUnix, "$1");
		$(this).siblings('span').text(fileTitle);
	});

	/* Показываем вакансию */
	$('.vacancies .respond').click(function(){
		var $form = $(this).hide().siblings('.form').show();

		$.scrollTo($form, {
			duration: 100,
			offset: {
				top: -(($(window).height() - $form.height())/2)
			}
		});

		return false;
	});

	/* Скрываем вакансию */
	$('.vacancies .form .hide').click(function(){
		$(this).parent().hide().siblings('.respond').show();
		return false;
	});

	$('.seeking-for .item').click(function(){
		$(this).addClass('active')
		.siblings().removeClass('active');

		var id = $(this).attr('id');
		var link = $(this).data('link');
		$.ajax({
			url: '/random-catalog.php',
			data: 'category=' + id,
			success: function(data){
				$('.random-goods').html(data);
				$('.catalog-link a').attr('href', link);
			}
		})

		return false;
	});

	$('.main-slider .arr').click(function(){
		var direction = $(this).hasClass('prev') ? 'prev' : 'next';
		$('.main-slider .contents .active')[direction]()
		.find('.link').click();
	});

	$('.main-slider .wrap li a').click(function(){
		var index = $(this).parent().index();
		$('.main-slider .contents li').eq(index)
		.find('.link').click();
	});

	$('.main-slider .contents .link').click(function(e){
		e.preventDefault();
		
		var $this = $(this).closest('li');

		if($this.hasClass('active')) return false;

		$this.addClass('active').find('.link').removeAttr('href').end()
		.siblings().removeClass('active').find('.link').attr('href', '#');

		var $active = $('.main-slider .wrap li').removeClass('active')
					  .find('a').attr('href', '#').end()
					  .eq($this.index()).addClass('active')
					  .find('a').removeAttr('href').end();
		
		$('.main-slider .marker').animate({
			'margin-left': $active.data('marker-position-offset'),
			'width': $active.find('img').width() + 50
		});

		/*$active.find('img').animate({
			'width': '100%',
			'margin-top': 0
		})
		.end().siblings().find('img').animate({
			'width': '97%',
			'margin-top': 10
		});*/

		$active.animate({
			'left': ($active.prevAll().size() - 1) * 30
		})

		$active.nextAll().each(function(i){
			$(this).animate({
				'left': 20 * (i + 1)
			});
		});

		$active.prevAll().each(function(i){
			$(this).animate({
				'left': -20 * (i + 1)
			});
		});

	});

	/* Переключатель в каталоге */
	$('.catalog .switcher a').click(function(){
		$(this).parent().addClass('active')
		.siblings().removeClass('active');

		var condition = $(this).parent().hasClass('listed');

		var $catalog = $('.catalog')
		[condition ? 'addClass' : 'removeClass']('listed');

		$.scrollTo($catalog, 100);

		var view_mode = condition ? 'listed' : null;
		$.cookie('view_mode', view_mode, {
			path: '/'
		});	

		return false;
	});

	/* Скрыть или показать список сравнения */
	$('.comparison-list .show')
	.add('.comparison-list .hide')
	.click(function(){
		$('.comparison-list .wrap').slideToggle();

		return false;
	});

	/* Показать попап для входа */
	$('.login-link a.popup').click(function(){
		$('#layout, .login-popup').show();
		$('.login-link').css('visibility', 'hidden');
		return false;
	});

	/* Скрыть попап для входа */
	$('.login-popup .hide, #layout').click(function(){
		$('.login-popup, #layout').hide();
		$('.login-link').css('visibility', 'visible');
		return false;
	});


	/* Клик по переключателю на странице восстановления пароля */
	$('.password-recovery .switcher li a').click(function(){
		var $this = $(this);

		if($this.parent().hasClass('active')) return false;

		$this.removeAttr('href').parent().addClass('active')
		.siblings().removeClass('active').find('a').attr('href', '#');

		$('.password-recovery .form .type').val($this.data('type'));

		var input = $('.password-recovery .form .input input')
		input.attr('name', 'forget_' + $this.data('type'));
		if($this.data('type') == 'email') input.addClass('email')
		else input.removeClass('email');

		return false;
	});

	$('.password-recovery .switcher li:eq(1) a').click();

	/* Счётчик колличества товара */
	$('.counter .input input')
	.onlyDigits().keyup(function(){
		var $this = $(this);

		var ending = $.ending($this.parseInt(), 'у', 'и', '');
		$this.closest('.counter').find('.word').text('штук' + ending);
	})
	.keyup()
	.change(function(){
		var $this = $(this);
		var $price = $this.closest('li').find('.price');
		var amount = $this.parseInt();
		var price = $price.find('input').parseInt();

		if(amount <= 0){
			amount = 1;
			$this.val(amount);
		}

		$price.find('ins').text($.ttr(price * amount));

		var total = 0;
		$('.items-list .price').each(function(){
			total += $(this).find('ins').parseInt();
		});

		$('.total .price ins').text($.ttr(total));

		var id = $this.parents('li').data('item');
		amountItem(id, 0, $this.val());

		$this.keyup();
	});

	$('.counter .button').click(function(){
		var $this = $(this);
		var $input = $this.closest('.counter').find('input');
		var value = $input.parseInt();

		var id = $(this).parents('li').data('item');
		if($this.hasClass('minus'))
		{
			amountItem(id, 2);
			value--
		}

		else if($this.hasClass('plus'))
		{
			amountItem(id, 1);
			value++	
		}

		if(value > 0 && value < 100) $input.val(value);

		$input.change();
	});

	$('.cart-page .items-list .delete').click(function(){
		$(this).closest('li').remove();

		var id = $(this).parents('li').data('item');
		removeFromBasket(id);

		return false;
	});

	$('.catalog .content li:nth-child(3n + 1)').addClass('cl');

	$('.ordering .delivery .radio input').change(function(){
		$(this).closest('.delivery').find('.hidden').hide();
		$(this).closest('.radio').next().show();

		var value = $(this).val();
		if(value == 416){
			$('input[name=delivery-address]').attr('value', 'new');
		} else {
			$('input[name=delivery-address]').attr('value', null);
		}

	});

	/* Установка скролла */
	function setJSPScroll(selector){

		function set(){
			var jsp = $(selector).data('jsp');
			if(jsp) jsp.destroy();

			$scroll = $(selector).jScrollPane({
				enableKeyboardNavigation: false
			});

			$scroll.find('.jspHorizontalBar')
			.appendTo($scroll);

			var $active = $scroll.find('.active');

			if($active.size())
			{
				$scroll.data('jsp').scrollToElement($active)
			};
		}

		set();

		var timeout;
		$(window).bind('resize', function(){
			clearTimeout(timeout);
			timeout = setTimeout(set, 50);
		});
	};

	setJSPScroll('.comparison .items-list .wrap');

	function makrSame(){
		$('.comparison .data tr').removeClass('same');
		$('.comparison .data tr').each(function(){
			var $tr = $(this);
			var diff;

			$tr.find('td:not(:first-child)').each(function(){
				var $td = $(this);

				if($td.text() != $td.prev().text()){
					diff = true;
					return;
				}
			});

			if(!diff){
				$('.comparison .features tr').eq($tr.index())
				.add($tr).addClass('same')
			}
		});
	}

	makrSame();

	/* Переключатель на странице каталога */
	$('.comparison .switcher a').click(function(){
		$(this).parent().addClass('active')
		.siblings().removeClass('active');

		$('.comparison')
		[$(this).data('all') ? 'removeClass' : 'addClass']
		('bright');

		//$(window).resize();

		return false;
	});

	/* Удаление товара из списка сравнения */
	$('.comparison .items-list .delete').click(function(){

		var id = $(this).parents('td').attr('umi:element-id');
		removeFromCompare(id);

		var $td = $(this).closest('td');
		var index = $td.index();

		$td.remove();

		$('.comparison .data tr').each(function(){
			$(this).find('td').eq(index).remove();
		});

		// ajax here

		makrSame();
		$(window).resize();
		return false;
	});

	/* Кнопка очистить список сравнения */
	$('.comparison .clear-list').click(function(){

		resetCompareList();

		$('.comparison .items-list table').remove();

		alert('Список очищен');

		// ajax here

		document.location.href = '/catalog';
	});
});

$(window).load(function(){
	try{$('.comparison .features').css('margin-top', $('.comparison .data').position().top)}
	catch(e){}

	$('.main-slider .contents li:eq(1) .link').click();
	$(window).resize();
});

$(window).bind('load resize', function(){

});