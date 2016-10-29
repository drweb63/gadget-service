jQuery.fn.extend({
	placeholder: function (text){
		return $(this).each(function(){
			var $this = $(this);

			var $label = $('<label class="placeholder">' + text + '</label>').css({
				'display' : 'none',
				'position':'absolute',
				'left': 0,
				'top': 0,
				'cursor': 'text',
				'border': '0px solid transparent',
				'border-width': $this.css('border-width'),
				'margin-top': $this.css('margin-top'),
				'margin-bottom': $this.css('margin-bottom'),
				'margin-left': $this.css('margin-left'),
				'margin-right': $this.css('margin-right'),
				'padding-top': $this.css('padding-top'),
				'padding-bottom': $this.css('padding-bottom'),
				'padding-left': $this.css('padding-left'),
				'padding-right': $this.css('padding-right'),
				'font-size': $this.css('font-size'),
				'line-height': $this.css('line-height'),
				'z-index' : 10
			});

			$label.find('a').click(function(){
				var text = $(this).text();
				$(this).parents('div.input').find('input[type=text]').val(text);
				$this.focus();
				return false;
			});

			$label.click(function(){
				$this.focus();
				return false;
			});
			
			$this.after($label);


			$this.focus(function(){
				$(this).addClass('focus')
				.parent().find('.placeholder').hide()

			});

			$this.blur(function(){
				if($(this).val() == ''){
					$(this).removeClass('focus')
					.parent().find('.placeholder').show();
				};
			});

			$this.blur();
		});
	}});

$(window).load(function(){
	setTimeout(function(){		
		$('[data-placeholder]').each(function(){
			$(this).placeholder($(this).data('placeholder'));
		});
	}, 10);	
});