$(document).ready(function(){

	photos();

	if($('#u-quickpanel #edit').hasClass('act')){
		$('.eip-wysiwyg_buttons').each(function(){
			var top = $(this).css('top');
			console.log(top);
		})
	}

	$.validator.addClassRules({
		'e-mail': {email: true}
	});

	$('div.feedback div.block form, .password-recovery form, .registration form').validate();
	$('.login-popup form').validate();
	$('#fast_purchase').validate({
		submitHandler: function(form) {
			var html = '';
			var delivery = valButton($(form).find('input[name=delivery-id]'));
			var payment = valButton($(form).find('input[name=payment-id]'));
			if(delivery == null) html += '<p>Выберите способ доставки</p>';
			if(payment == null) html += '<p>Выберите способ оплаты</p>';
			if(html == ''){
				form.submit();
			} else {
				$('div.error').html(html);
				return false;
			}
		}
	});
	
	$('ul.wrap li').eq(0).addClass('active');

	$('.vacancies .content ul li').each(function(){
		var job = $(this).find('h2').text();
		$(this).find('.form form input#job').val(job);
	})
	$('.form.hidden').each(function(){
		$(this).find('form').validate();
	})

/*----- работа с интернет магазином
---------------------------------*/

	/*----- переход в корзину
	-----------------------*/
			$('.cart .top button.issue').click(function(){
				document.location.href = '/cart/purchase';
			})

	/*----- добавление товара в корзину
	---------------------------------*/
			$('button.add-to-cart, button.add-to-cart-blue').click(function(){
				var $this = $(this);

				if($this.hasClass('product')) var itemId = $this.attr('id');
				else var itemId = $this.parents('li').attr('umi:element-id');
				$.ajax({
					url: '/emarket/basket/put/element/' + itemId,
					beforeSend: function(){
						$this.ajaxLoadingStart();
					},
					success: function(){
						$this.ajaxLoadingStop();
						getBasket();
					}
				})
			})

			/*----- добавление товара в корзину из списка сравнения
			-----------------------------------------------------*/
					$('.compare-button').click(function(){
						var id = $(this).parents('td').attr('umi:element-id');
						$.ajax({
							async: false,
							url: '/emarket/basket/put/element/' + id
						})
					})

	/*----- добавление/удаление товара к сравнению
	--------------------------------------------*/
			$('.add-to-compare-list').click(function(){
				var $this = $(this);

				if($this.hasClass('product'))	var itemId = $this.attr('id').replace('compare_', '');
				else var itemId = $this.parents('li').attr('umi:element-id');
				var action = '';
				if($this.hasClass('checked')){
					action = 'removeFromCompare';
					$this.removeClass('checked');
				} else {
					action = 'addToCompare';
					$this.addClass('checked');
				}
				$.ajax({
					url: '/emarket/' + action + '/' + itemId,
					beforeSend: function(){
						$this.ajaxLoadingStart();
					},
					success: function(){
						getCompareList();
						$this.ajaxLoadingStop();
					}
				})
			})

	/*----- удаление товара  из списка сравнение
	------------------------------------------*/
			$('.comparison-list li a.close').live('click', function(){
				var itemId = $(this).parents('li').attr('umi:element-id');
				$.ajax({
					url: '/emarket/removeFromCompare/' + itemId,
					success: function(){
						getCompareList();
						removeChecked(itemId);
					}
				})				
				return false;
			})

	/*----- количество выводимых элементов в каталоге
	-----------------------------------------------*/
			$('.count-select select').change(function(){
				var value = $(this).find('option:selected').val();
				document.location.href = '?per_page=' + value;
			})

			$('.selector select').each(function(){
				var text = $(this).parent().find('span').text();
				if(text == ''){
					$(this).parent().find('span').html($(this).find('option:selected').text() || '&nbsp;');
				}
			})
			
})

/*----- обновление списка сравнения
---------------------------------*/
		function getCompareList(){
			var compare = $('.comparison-list');
			$.ajax({
				url: '/udata/emarket/getCompare',
				async: true,
				success: function(xml){
					var items = $(xml).find('items item');
					var size = items.length;
					compare.find('.quantity').text(size);
					if(size == 0){
						$('.wrap.hidden').slideUp();
						compare.find('a.show').css('visibility', 'hidden');
					} else compare.find('a.show').css('visibility', 'visible');				
					$('.wrap.hidden ul').html('');
					items.each(function(){
						var id = $(this).attr('id');
						var name = $(this).find('name').text();
						var link = $(this).find('link').text();
						var img = $(this).find('img src').text();
						var newLi = '<li umi:element-id="' + id + '"><a href="' + link + '" class="white"><div class="img img-small"><img src="' + img + '" alt="" umi:field-name="header_pic"></div><span umi:field-name="h1">' + name + '</span></a><a href="/emarket/removeFromCompare/' + id + '" class="close"></a></li>';
						compare.find('ul').append(newLi);
					})
					eip();
				}
			})
		}

/*----- обновление корзины
------------------------*/ 
		function getBasket(){
			var cart = $('.cart');
			$.ajax({
				url: '/udata/emarket/cart',
				success: function(xml){
					var amount = $(xml).find('summary amount').text();
					var price = $.ttr($(xml).find('summary price actual').text());
					cart.find('.top a').attr('href', '/cart');
					if(amount > 0){
						$('button.issue').css('visibility', 'visible');
					}
					cart.find('#amount').text(amount);
					cart.find('#price span').text(price);
				}
			})
		}

/*----- +/- товара в корзине
--------------------------*/
		function amountItem(id, mode, amount){
			if(mode != 0){
				$.ajax({
					async: false,
					url: '/udata/emarket/basket_custom/put/item/' + id + '/?change_item=' + mode,
					success: function(xml){
						var sizeItems = $(xml).find('summary amount').text();
						var ending = $.ending(sizeItems, '', 'а', 'ов');
						$('.total .amount .size').text(sizeItems);
						$('.total .amount .word').text('товар' + ending);
					}
				})
			} else {
				$.ajax({
					async: false,
					url: '/udata/emarket/basket/put/item/' + id + '/?amount=' + amount,
					success: function(xml){
						var sizeItems = $(xml).find('summary amount').text();
						var ending = $.ending(sizeItems, '', 'а', 'ов');
						$('.total .amount .size').text(sizeItems);
						$('.total .amount .word').text('товар' + ending);
					}					
				})				
			}
		}

/*----- удаление из корзины
-------------------------*/
		function removeFromBasket(id){
			$.ajax({
				async: false,
				url: '/udata/emarket/basket/remove/item/' + id,
				success: function(xml){
					var sizeItems = $(xml).find('summary amount').text();
					if(sizeItems == 0){
						$('.total').html('<p>Корзина пуста!</p>')
					} else {
						var price = $(xml).find('summary price actual').text();
						var ending = $.ending(sizeItems, '', 'а', 'ов');
						$('.total .amount .size').text(sizeItems);
						$('.total .amount .word').text('товар' + ending);
						$('.total .price ins').text($.ttr(price));
					}
				}
			})
		}	

/*----- снятие чекбокса сравнения у удаленного товара
---------------------------------------------------*/
		function removeChecked(id){
			$('div.add-to-compare-list#compare_' + id).removeClass('checked');
		}

/*----- удаление элемента из списка сравнения
-------------------------------------------*/
		function removeFromCompare(id){
			$.ajax({
				async: false,
				url: '/emarket/removeFromCompare/' + id
			})			
		}

/*----- очистка списка сравнения
------------------------------*/
		function resetCompareList(){
			$.ajax({
				async: false,
				url: '/emarket/resetCompareList/'
			})				
		}

/*----- перезагрузка eip
----------------------*/
		function eip(){
			if($('#u-quickpanel #edit').hasClass('act')){
				$('#u-quickpanel #edit').click().click();
			}
		}

/*----- инициализация галереи фотографий
--------------------------------------*/
		function photos(){
			var photos = $('.pic-preview ul li').eq(0);
			photos.addClass('active');
			$('.main-pic .img img').attr('src', photos.find('a').attr('href'));
		}

/*----- валидация чекбоксов
-------------------------*/
		function valButton(btn) {
			var cnt = -1;
			for (var i = btn.length-1; i > -1; i--) {
				if (btn[i].checked) {
					cnt = i; 
					i = -1;
				}
			}
			if (cnt > -1) return btn[cnt].value;
			else return null;
		}
