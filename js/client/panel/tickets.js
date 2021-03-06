var tickets = function (data) {
	var tickets = new Array;
	var user = jQuery('user', data);
	var isInit = false;

	var ticket = function (params) {
		var self = this, params = params, node, messageNode;
		var x = params.x, y = params.y, width = params.width, height = params.height;
		
		var resetSelection = function () {
			var sel;
			if(document.selection && document.selection.empty) {
				document.selection.empty();
			} else if(window.getSelection) {
				sel = window.getSelection();
				if(sel && sel.removeAllRanges) {
					sel.removeAllRanges();
				}
			}
		};
		
		var createMessage = function () {
			messageNode = jQuery('<div class="u-ticket-comment"><div /><textarea /><a /></div>');
			jQuery(document.body).append(messageNode);
			
			if(params['message']) {
				jQuery('div', messageNode).html(params.message.authorName + ' (' + params.message.authorLogin + ')');
				jQuery('textarea', messageNode).attr('value', params.message.text);
			}
			
			jQuery('a', messageNode).html(getLabel('js-ticket-delete'));
			
			$('textarea', messageNode).bind('change', function () {
				self.save();
			});
			
			jQuery('a', messageNode).bind('click', function () {
				self.del();
			});			
		};
		
		self.del = function () {
			if(node) node.remove();
			if(messageNode) messageNode.remove();
			if(params.id) {
				var url = '/content/tickets/delete/' + params.id + '/';
				jQuery.get(url);
			}
		};
		
		self.save = function () {
			var mode = params.id ? 'modify' : 'create';
			var url = '/content/tickets/' + mode + '/' + params.id + '/';
			url += '?ts=' + Math.round(Math.random() * 1000);
			jQuery.ajax({
				type: 'POST',
				url: url,
				dataType: 'json',
				data: {
					x: x,
					y: y,
					width: width,
					height: height,
					message: jQuery('textarea', messageNode).attr('value'),
					referer: window.location.toString()
				},
				success: function (resp) {
					params.id = resp.id;
				}
			});
		};
		
		self.update = function () {
			node.css({
				top: parseInt(y), left: parseInt(x),
				width: width, height: height,
				opacity: 0.3
			});
			
			if(messageNode) {
				messageNode.css({
					top: parseInt(y) + parseInt(height),
					left: parseInt(x) + parseInt(width)
				});
			}
			// Отображение заметок выключено, прячем
			if (window.ticketsControl.disabled) {
				jQuery(node).add(messageNode).hide();
			}
		};
		
		self.listen = function () { 
			xFirst = x;
			yFirst = y;
			jQuery(document).bind('mousemove', function (event) {
				resetSelection();
				xLast = event.pageX;
				yLast = event.pageY;
				if (xLast > xFirst) { width = xLast - xFirst; } else {
					xLast = xFirst;
					x = event.pageX;
					width = xLast - x;
				}
				if (yLast > yFirst) { height = yLast - yFirst; } else {
					yLast = yFirst;
					y = event.pageY;
					height = yLast - y;
				}
				self.update();
			});
			
			jQuery(document).one('mouseup', function (event) {
				jQuery(document).unbind('mousemove');
				self.update();
				self.save();
				isInit = false;
			});
		};
		
		(function init() {
			node = jQuery('<div class="u-ticket" />');
			jQuery(document.body).append(node);
			
			if(params.message) {
				createMessage();
			}
			
			self.update();
		})();
	};

	var initNewTicket = function () {
		if(!window.ticketCreated) {
			alert(getLabel('js-panel-note-add'));
			window.ticketCreated = true;
		}
		// Если создание заметки уже запущено - не даем запустить повторно.
		if (isInit) return false;

		isInit = true;
		changeClassName(jQuery('#u-quickpanel #note').get(0));
		jQuery(document).one('mousedown', function (event) {
			var newTicket = new ticket({
				x: event.pageX,
				y: event.pageY,
				width: 0,
				height: 0,
				message: {
					authorName: user.attr('fname') + ' ' + user.attr('lname'),
					authorLogin: user.attr('login'),
					text: getLabel('js-ticket-empty')
				}
			});
			newTicket.listen();
			changeClassName(jQuery('#u-quickpanel #note').get(0));
		});
	};
	window.initNewTicket = initNewTicket;

	(function draw(data) {
		jQuery('ticket', data).each(function (index, node) {
			var node = jQuery(node);
			var pos = jQuery('position', node);
			var author = jQuery('author', node);
			var message = jQuery('message', node);
			
			var t = new ticket({
				id: node.attr('id'),
				x: pos.attr('x'),
				y: pos.attr('y'),
				width: pos.attr('width'),
				height: pos.attr('height'),
				message: {
					authorName: author.attr('fname') + ' ' + author.attr('lname'),
					authorLogin: author.attr('login'),
					text: message.text()
				}
			});
			t.update();
		});
	})(data);
};

// Управляет видимостью заметок и горячей клавишей shift+c 
var ticketsControl = function () {
	var self = this; 
	self.disabled = true; // Переменная состояния, видимы ли заметки

	// Переключает видимость заметок и активность горячей клавиши
	self.swapVisible = function() {
		self.disabled ? self.enable() : self.disable();
	};

	// Прячет заметки и снимает контроль за хоткеем
	self.disable = function () {
		jQuery('div.u-ticket, div.u-ticket-comment, #u-quickpanel #note').hide();
		jQuery(document).unbind('keydown', self.bindEvents);
		jQuery('#u-quickpanel #note').unbind('click', self.bindEvents);
		self.disabled = true;
	};

	// Отображает заметки и восстанавливает контроль за хоткеем
	self.enable = function () {
		jQuery('div.u-ticket, div.u-ticket-comment, #u-quickpanel #note').show();
		jQuery(document).bind('keydown', self.bindEvents);
		jQuery('#u-quickpanel #note').bind('click', self.bindEvents);
		self.disabled = false;
	};

	// Создает новый тикет по событию.
	self.bindEvents = function (event) {
		if ( (event.shiftKey && (event.keyCode == 67 || event.keyCode == 99)  && (event.target.nodeName != 'INPUT' && event.target.nodeName != 'TEXTAREA'))
			|| (event.type=='click' && document.getElementById('note').id=='note')) {
			window.initNewTicket();
		}
	};
};
window.ticketsControl = new ticketsControl();
