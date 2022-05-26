if (/\.68design\.net$/i.test(window.location.hostname)) document.domain = '68design.net';
if (typeof _68 == 'undefined') _68 = {};

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1,                 //月份 
		"d+": this.getDate(),                    //日 
		"h+": this.getHours(),                   //小时 
		"m+": this.getMinutes(),                 //分 
		"s+": this.getSeconds(),                 //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds()             //毫秒 
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

//$.cookie('name', 'value', {expires: 7(day), path: '/', domain: 'jquery.com', secure: true});
jQuery.cookie = function (name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

$.rand = function (len) {
	len = len || 32;
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var pwd = '';
	for (i = 0; i < len; i++)
		pwd += chars.charAt(Math.floor(Math.random() * chars.length));
	return pwd;
}

//Html编码获取Html转义实体
$.htmlEncode = function (value) {
	return $('<div/>').text(value).html();
}
//Html解码获取Html实体
$.htmlDecode = function (value) {
	return $('<div/>').html(value).text();
}

$.Date = function (jsondate) {
	return new Date(parseInt(jsondate.replace('/Date(', '').replace(')/', ''), 10));
}


$.json = function (url, data, callback, sync, processdata) {
	var w = sync == true && $('iframe#crossframe').length > 0 ? $('iframe#crossframe')[0].contentWindow : window;
	w.$.ajax({
		type: "POST",
		url: url,
		cache: false,
		async: (typeof sync == 'undefined') ? true : !sync,
		data: data,
		success: function (r) {
			if (typeof callback != 'function' || callback(r) === false) return;
			if (typeof r == 'object' && r != null) {
				if (r.s || r.status == -1024) _68.fb.show('/float/login');
				else if (r.s || r.status == -1023) _68.fb.show('/float/typeneed');
			}
		},
		error: function (xhr, ts, tr) { if (ts == 'timeout') alert('操作超时，请重新尝试。'); else if (tr != '') alert('操作失败：\r\n您可能没有权限或者重复提交！\r\n\r\n请刷新页面重新尝试。'); },
		timeout: 5000,
		dataType: 'json',
		processData: (typeof processdata == 'undefined') ? true : processdata
	});
}

$.ajaxSetup({ xhrFields: { withCredentials: true }, crossDomain: true });
$(function () {
	_68.init();
	var gt = $('#gotop.gotop').click(function () { $('html,body').animate({ scrollTop: 0 }, 300); return false; });
	$(window)
		.resize(function () {
			_68.center($('.floatbox'));
			_68.center($('#upMsg'));
			$('.g_ucard,.g_docardsucrate').remove();
			$('.-tier-').length ? $('.-tier-').data('expand')() : null;
		})
		.scroll(function () {
			if (_68.toplock != null) $(window).scrollTop(_68.toplock);
			if (gt.length > 0) {
				if ($(window).scrollTop() > 50) gt.slideDown(300);
				else gt.slideUp(200);
			}
		})
	;
	$(document)
		.on('touchend click', function () {
			$('select[size]').click();
			_68.cover.remove();
		})
		.on('mouseenter', '[docardsucrate]', function () {
			$('.g_docardsucrate').remove();
			var card = $('<div class="g_docardsucrate">\
				<p class="light g_mb10"><img src="/do/img/ico-sucrate.png" class="ico g_mr5" /> 最高评分的设计师</p>\
				<p style="padding-left:1.8em;">该设计师工作 <b>100%</b> 的成功</p>\
			</div>');
			var _t = $(this).mouseleave(function () { window.setTimeout(function () { card.stop().fadeOut(100, function () { card.remove(); }); }, 300); });
			_68.init(card.appendTo(document.body));
			var pl = _t.offset().left; var pw = card.outerWidth(true); var wr = $(window).width() + $(window).scrollLeft(); var pam = _t.width() / 2;
			if (wr < pl + pw) {
				pam = pam + pl - wr + pw;
				pl = wr - pw;
			}
			if (pam < 15) pam = 15;
			card.css({ left: pl, top: _t.offset().top - card.outerHeight(true) - 10 }).fadeIn(200);
		})
		.on('keydown', function (e) {
			var s = false;
			for (var i = 0; !s && _68.event.keydown.data && i < _68.event.keydown.data.length; i++) s = (_68.event.keydown.data[i].call(e) == false);
			if (s) return false;
			if (e.keyCode == 27) _68.fb.hide($('.floatbox:last'));
		})
		.on('click', function () {
			$('.-tier-').remove();
		})
	;
	$('form[search]').each(function () {
		var f = this;
		$(f).submit(function () {
			_68.form.trim($(f).find('input'));
			if (f.k.value == '' || f.k.value.length < 2) { f.k.focus(); return false; }
			switch ($(f.t).val()) {
				case 'p': $(f).attr('action', '/u/designer'); break;
				case 'dworker': $(f).attr('action', '/do/searchworker'); break;
				case 'dwork': $(f).attr('action', '/do/searchwork'); break;
				case 'w': $(f).attr('action', '/work/'); break;
			}
			$(f.t).attr('disabled', true);
			f.submit();
		}).find('input[name=k]').blur(function () { $(this).parents('.nav-right:first').removeClass('on'); }).focus(function () { $(this).parents('.nav-right:first').addClass('on'); });
	});
	$('a[feedback]').click(function () {
		_68.fb.show('/float/feedback');
		return false;
	});
});

var _68 = {
	me: true,
	hang: null, //挂起的操作，成功登录调用。
	toplock: null,
	event: {
		keydown: {
			data: [],
			add: function (name, call) { this.data.push({ name: name, call: call }) },
			remove: function (name) { for (var i = 0; this.data && i < this.data.length; i++) { if (this.data[i].name == name) this.data.splice(i, 1); } }
		}
	},
	tree: {
		init: function (array, p) {
			if (!$.isArray(array)) return;
			$.each(array, function (i, t) { t.parent = p; _68.tree.init(t.child, t); });
			return array;
		},
		node: function (array, val) {
			if (!$.isArray(array) || !val) return null;
			val = val.toLowerCase();
			var t;
			$.each(array, function (i, n) {
				if (n.code && val.indexOf(n.code.toLowerCase()) == 0) {
					t = val != n.code.toLowerCase() && $.isArray(n.child) ? _68.tree.node(n.child, val) : n;
					return false;
				}
			});
			return t;
		},
		name: function (array, val, split) {
			var t = this.node(array, val);
			if (!t) return null;
			if (typeof split == 'undefined') return t.name;
			var r = '';
			for (; t; t = t.parent) r = (t.parent ? (split ? split : '') : '') + t.name + r;
			return r;
		},
		get: function (key, val, split) {
			if (!$(window).data('tier-' + key)) $.ajax({
				url: '/do?' + key + '.all', type: "POST", dataType: 'json', async: false,
				success: function (r) { $(window).data('tier-' + key, _68.tree.init(r)); },
				error: function (xhr, ts, tr) { alert('初始化异常！'); }
			});
			var d = $(window).data('tier-' + key);
			if (val) return this.name(d, val, split);
			else return d;
		}
	},
	init: function (e) {
		_68.me = false;
		if (typeof e == 'undefined') e = $(document);
		e.find('form input').attr('autocomplete', 'off');
		e.find('select').each(function () {
			var s = $(this);
			s.find('option').css('color', function () { return this.style.color == '' ? s.css('color') : this.style.color; });
		}).change(function () {
			var s = $(this).blur();
			s.css('color', function () {
				var o = s.find('option:selected');
				return o.length > 0 ? o[0].style.color : '';
			});
		}).change();

		e.find('input[verifycode]').focus(function () {
			var vimg = $(this.form).find('img[verifycode]');
			if (!vimg.is(':visible')) {
				vimg.click(function () {
					$(this).attr('src', '/verify?' + Math.random())
				}).click().show().css({ verticalAlign: 'top', cursor: 'pointer' }).attr('title', '点击刷新');
			}
		});

		e.find('select[child]').change(function () { //带child属性的select项子项获取事件处理，忽略大小写，暂时只支持两级。
			var s = $(this), c = s.attr('child'), v = s.attr('val');
			s.parent('label').height('auto').width('auto');
			var o = s.find(':selected');
			if (typeof o.attr('ischd') != 'undefined') return;
			s.find('[ischd]').remove();
			if (o.val() == '') return;
			$.json('/do?' + c, { c: o.val() }, function (r) {
				if (typeof r == 'object' && r != null) {
					var t = o;
					for (var i = 0; i < r.length; i++)
						t = $('<option />').text('　' + r[i].name).attr('value', r[i].code.toLowerCase()).attr('ischd', '').insertAfter(t);

					if (typeof v == 'string') {
						if (v != '') s.val(v.toLowerCase());
						s.removeAttr('val');
					}

					if (typeof s.attr('click') != 'undefined') {
						s.parent('label').height(s.outerHeight(true)).width(s.outerWidth(true));
						s.css({ zIndex: 65536, backgroundColor: '#fff', position: 'absolute', height: 'auto', padding: s.css('padding-left') }).attr('size', s.children().length > 20 ? 20 : s.children().length);
					}
				}
				return false;
			});
		}).click(function () {
			var s = $(this); s.attr('click', '');
			if (typeof s.attr('size') != 'undefined')
				s.css({ position: '', height: '', padding: '' }).removeAttr('size');
		}).parent('label').css('display', 'inline-block').css('vertical-align', 'middle');

		e.find('select[val]').each(function () { //带val属性的select项赋值操作，忽略大小写，并触发change事件。
			var s = $(this), v = s.attr('val').toLowerCase();
			if (v != '') {
				s.find('option').each(function () {
					var ov = $(this).val();
					if (ov != '' && v.indexOf(ov.toLowerCase()) == 0) {
						$(this).attr('selected', true);
						return false;
					}
				});
			}
		}).change();

		e.find('input[tier-data]').each(function () {
			var _t = $(this), _tb, _k = _t.attr('tier-data'), _arr;
			_t.val('').prop('readonly', true).css({ cursor: _t.css('cursor') != 'text' ? _t.css('cursor') : 'default' })
			_arr = _68.tree.get(_k);
			if (!_t.data('bind') && (_t.attr('name') || _t.attr('tier-bind'))) {
				_tb = _t.attr('name') ? $('<input type="hidden" />').attr('name', _t.attr('name')).val(_t.attr('val')).insertAfter(_t.removeAttr('name')) : eval(_t.attr('tier-bind')).val(_t.attr('val'));
				_t.change(function () { _t.val(_t.attr('val') ? _68.tree.get(_k, _t.attr('val'), _t.attr('tier-split')) : ''), _tb.val(_t.attr('val')).change().click(); }).change();
			}

			if (!_t.data('bind'))
				_t.data('bind', _tb).on('click', function (e) {
					$('.-tier-').remove();
					var dom = document.body, _td = _t.parent();
					for (; _td && _td.length && _td[0] != dom; _td = _td.parent()) if (/fixed|absolute/ig.test(_td.css('position'))) { dom = _td; break; }

					var tier = $('<div class="-tier-"><p class="-select"></p><p class="-option"></p></div>')
						.on('click', function (e) {
							var t = $(e.target), cc;
							if (t.is('a') && t.parents('.-select').length) t.prev('a[val]').length ? tier.attr('val', t.prev('a[val]').attr('val')) : tier.attr('val', ''), cc = t.is('a.-var');
							else if (t.is('a[val]')) tier.attr('val', t.attr('val')), cc = !t.data('tnode') || !t.data('tnode').child;
							return (cc ? _t.attr('val', tier.attr('val')).change() : tier.data('expand')()), false;
						})
						.data('for', _t).attr('val', _t.attr('val') ? _t.attr('val') : '')
						.data('expand', function () {
							tier.find('.-clear').remove();
							var sl = tier.find('.-select').empty(), ol = tier.find('.-option').empty(), cl, t;
							if (tier.attr('val')) t = _68.tree.node(_arr, tier.attr('val'));
							for (; t; t = t.parent) $('<a></a>').data('tnode', t).attr('val', t.code).text(t.name).prependTo(sl);

							if (sl.find('a:last').length) {
								var l = sl.find('a:last');
								if (l.data('tnode').child) {
									cl = l.data('tnode').child;
									if (_t.is('[tier-var]')) $('<a class="-on -var">不限</a>').appendTo(sl);
									else $('<a class="-on -no">请选择</a>').appendTo(sl);
								}
								else _t.is('[tier-var]') ? l.text('不限').addClass('-var') : null, cl = l.addClass('-on').data('tnode').parent ? l.addClass('-on').data('tnode').parent.child : _arr;
							}
							else {
								cl = _arr;
								if (_t.is('[tier-var]')) $('<a class="-on -var">不限</a>').appendTo(sl);
								else $('<a class="-on -no">请选择</a>').appendTo(sl);
							}

							if (_t.is('[tier-clear]') && _t.val()) $('<a class="-clear" val="">清除</a>').appendTo(tier);

							$.each(cl, function (i, t) {
								var o = $('<a></a>').data('tnode', t).attr('val', t.code).text(t.name);
								if (t.code && tier.attr('val') && t.code.toLowerCase() == tier.attr('val').toLowerCase()) o.addClass('-on');
								if (i > 0 && i % parseInt(_t.attr('tier-col')) == 0) o.addClass('-l');
								ol.append(o);
							});
							tier.css('width', _t.attr('tier-width') ? _t.attr('tier-width') : 'auto').css('min-height', 'auto').css('min-width', _t.attr('tier-widthmin') ? _t.attr('tier-widthmin') : 'auto');

							return dom == document.body ? tier.css({
								top: _t.offset().top + _t.outerHeight(true) - parseInt(_t.css('margin-bottom')),
								left: _t.attr('tier-align') != 'right' ? _t.offset().left : _t.offset().left - tier.outerWidth(true) + _t.outerWidth(true),
							}) : tier.css({
								top: _t.position().top + _t.outerHeight(true) - parseInt(_t.css('margin-bottom')) + parseInt(_t.css('margin-top')) + $(dom).scrollTop(),
								left: (_t.attr('tier-align') != 'right' ? _t.position().left : _t.position().left - tier.outerWidth(true) + _t.outerWidth(true)) + parseInt(_t.css('margin-left')) + $(dom).scrollLeft(),
							});
						})
						.attr('style', 'display:' + (_t.attr('tier-display') ? _t.attr('tier-display') + ' !important' : 'table !important'))
						.appendTo(dom);
					tier.data('expand')();
					return false;
				});
		});



		e.find('a[linkout]').each(function () { $(this).attr('href', $(this).attr('linkout') == '' ? $(this).text() : $(this).attr('linkout')).attr('target', '_blank'); });

		//预定义操作
		e.find('[checklogin]').each(function () {
			var t = $(this);
			t.off(t.attr('checklogin')).on(t.attr('checklogin'), function () {
				if (typeof t.attr('loggedin') != 'undefined') return false;
				var v = false;
				$.json('/do?check.login', null, function (r) {
					if (r.status != 1) {
						_68.hang = function () { t.trigger(t.attr('checklogin')); };
						_68.fb.show('/float/login');
					}
					else {
						v = true;
						t.attr('loggedin', '');
						t.trigger(t.attr('checklogin'));
						t.removeAttr('loggedin');
					}
					return false;
				}, true);
				return v;
			});
		});
		e.find('[addworkfav]').on('click', function () {
			if (typeof $(this).attr('loggedin') != 'undefined') {
				$.json('/do?workfav.add', { wid: $(this).attr('addworkfav'), t: typeof $(this).attr('isshare') == 'undefined' ? '' : 1 }, function (r) {
					if (r.status == 1) alert('已成功收藏。');
					else if (r.msg) alert(r.msg);
				});
			}
			return false;
		});
		e.find('[addfriend]').on('click', function () {
			if (typeof $(this).attr('loggedin') != 'undefined') {
				$.json('/do?friend.add', { uid: $(this).attr('addfriend') }, function (r) {
					if (r.status == 1) alert('已成功添加，请等待对方通过。');
					else if (r.msg) alert(r.msg);
				});
			}
			return false;
		});
		e.find('[addfocus]').on('click', function () {
			if (typeof $(this).attr('loggedin') != 'undefined') {
				$.json('/do?focus.add', { uid: $(this).attr('addfocus') }, function (r) {
					if (r.status == 1) alert('已成功添加。');
					else if (r.msg) alert(r.msg);
				});
			}
			return false;
		});
		e.find('[certsupport]').on('click', function () {
			if (typeof $(this).attr('loggedin') != 'undefined') {
				$.json('/do?cert.support', { uid: $(this).attr('certsupport') }, function (r) {
					if (r.status == 1) alert('已成功辅助。');
					else if (r.msg) alert(r.msg);
				});
			}
			return false;
		});
		e.find('[voteassent]').on('click', function () {
			var e = $(this);
			$.json('/do?vote.assent', { t: $(this).attr('voteassent') }, function (r) {
				if (r.status == 1) {
					var n = e.find('[num]');
					if (n.length <= 0) n = e;
					n.text(parseInt(r.msg));
				}
			});
			return false;
		});
		e.find('[sendmsg]').on('click', function () {
			_68.fb.show('/float/msg?uid=' + $(this).attr('sendmsg'));
			return false;
		});
		e.find('[invitation]').on('click', function () {
			_68.fb.show('/float/invitation?uid=' + $(this).attr('invitation'));
			return false;
		});

		e.find('a[pwdfundforgot]').on('click', function () {
			_68.fb.show('/float/pwdfundforgot');
			return false;
		});
		e.find('[ucard]').on('mouseleave', function () { window.clearInterval(_68.ucardcall); }).on('mouseenter', function () {
			var e = $(this);
			window.clearInterval(_68.ucardcall);
			_68.ucardcall = window.setInterval(function () {
				window.clearInterval(_68.ucardcall);
				if (typeof e.data('ucarddata') == 'undefined') {
					$.json('/do?user.card', { uid: e.attr('ucard') }, function (r) {
						e.data('ucarddata', r);
						_68.ucardshow(e, r);
						return false;
					});
				} else _68.ucardshow(e, e.data('ucarddata'));
			}, 300);
		});
		e.find('a[disabled]').on('click', function () { return false; });

		e.find('a.g_share34').on('click', function () {
			if ($(this).hasClass('weibo')) window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(window.location) + '&title=' + encodeURIComponent(document.title));
			else if ($(this).hasClass('qzone')) window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(window.location) + '&title=' + encodeURIComponent(document.title));
			else if ($(this).hasClass('qq')) window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(window.location) + '&title=' + encodeURIComponent(document.title));
			else if ($(this).hasClass('weixin')) _68.fb.show('/float/qrcode?c=' + encodeURIComponent(window.location.toString().replace(/\w+\.68design\.net/i, 'm.68design.net')) + '&d=' + encodeURIComponent('微信扫一扫后分享'));
			return false;
		}).each(function () { if ($(this).hasClass('weibo')) $(this).attr('title', '分享到新浪微博'); else if ($(this).hasClass('qzone')) $(this).attr('title', '分享到QQ空间'); else if ($(this).hasClass('qq')) $(this).attr('title', '分享到QQ好友'); else if ($(this).hasClass('weixin')) $(this).attr('title', '分享到微信'); })


		_68.upfile.init(e);

		//end

		_68.me = true;
	},
	ucardcall: null,
	ucardshow: function (e, c) {
		$('.g_ucard').remove();
		if (c == null) return;
		var uc = $('<div class="g_ucard">\
			<em class="arr"></em>\
			<ul>\
				<li class="pfile">\
					<img class="face" />'+ (c.isperson ? '\
					<button ' + (c.fs == 0 ? ' addfocus="' + c.uid + '" checklogin="click"' : ' class="dsb" disabled') + '>' + (c.fs == 2 ? '已' : '加') + '关注</button>' : '') + '\
					<p><em class="name"></em></p>\
					<p><em class="city"></em></p>\
				</li>\
				<li class="work"></li>\
				<li class="rank"></li>\
			</ul>\
		</div>');
		uc.find('.face').attr('src', c.face);
		uc.find('.name').text(c.name);
		uc.find('.city').text(c.city);
		for (var i = 0; c.works != null && i < c.works.length; i++)
			$('<a target="_blank"></a>').attr('href', '/u/' + c.uid + '/').append($('<img />').attr('src', c.works[i].thum)).appendTo(uc.find('.work'));
		if (c.isperson)
			uc.find('.rank').css('display', 'block').html('影响力 <em>全国 ' + c.rankall + '</em><em>' + c.rankregion + '</em>');
		uc.on('mouseleave', function () { $('.g_ucard').fadeOut(200, function () { $('.g_ucard').remove(); }); }).appendTo(document.body);
		_68.init(uc);
		var pl = e.offset().left; var pw = uc.outerWidth(true); var wr = $(window).width() + $(window).scrollLeft(); var pam = e.width() / 2;
		if (wr < pl + pw) {
			pam = pam + pl - wr + pw;
			pl = wr - pw;
		}
		if (pam < 15) pam = 15;
		uc.css({ left: pl, top: e.offset().top + e.outerHeight(true) + 10 }).fadeIn(200).find('.arr').css({ marginLeft: pam }).on('mouseleave', function () { return false; });
	},
	con: {
		regemail: /^[a-zA-Z0-9-_]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]+)+$/,
		regurl: new RegExp('^https?://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$'),
		regmobile: /^(13[0-9]|14[56789]|15[0-3,5-9]|16[6]|17[012345678]|18[0-9]|19[1589])\d{8}$/
	},
	cookie: function (name, value) {
		$.cookie(name, value, { path: '/', domain: '68design.net' });
	},
	scroll: function (v, f) {
		var f = f;
		$('html,body').animate({ scrollTop: v }, 300, function () { if (typeof f == 'function') { f(); f = null; } });
	},
	center: function (v) {
		v.each(function () {
			var e = $(this);
			e.css('height', 'auto');
			var x = 0, y = 0;
			if ($.browser && $.browser.msie && $.browser.version == '6.0') {
				x = $(window).scrollLeft() + ($(window).width() - e.outerWidth(true)) / 2;
				y = $(window).scrollTop() + ($(window).height() - e.outerHeight(true)) / 2;
			}
			else {
				x = ($(window).width() - e.outerWidth(true)) / 2;
				y = ($(window).height() - e.outerHeight(true)) / 2;
			}
			if (y < 0) { y = 0; e.css('height', $(window).height() - (e.outerHeight(true) - e.height()))/*.css('overflow', 'auto')*/; }
			e.css('top', y).css('left', x);
		});
		return v;
	},
	//遮罩层显示或者取消处理
	shelter: function () {
		if ($('.floatbox').length > 0) { if ($('#dvShelter').length <= 0) $('<div id="dvShelter"></div>').appendTo(document.body); }
		else $('#dvShelter').remove();
	},
	cover: {
		create: function () { var e = $('body>.g_cover:first'); if (e.length <= 0) e = $('<table class="g_cover"><tr><td></td></tr></table>').appendTo(document.body); return e; },
		remove: function (e) {
			if (!e) e = $('body>.g_cover:not(:has(>[keep]))');
			e.removeClass('show'); window.setTimeout(function () { e.remove(); }, 300);
		},
		qr: function (img, txt) {
			(window.event || arguments.callee.caller.arguments[0]).stopPropagation();
			_68.cover.create().addClass('show').find('td').empty().append($('<div></div>').append(img)).append(txt ? $('<p style="margin:10px 0;color:#fff;"></p>').text(txt) : null);
			return false;
		}
	},
	form: {
		trim: function (el) {
			$(el).filter('input[type=text], textarea').each(function () { $(this).val($.trim($(this).val())); });
		}
	},
	fmsg: {
		show: function (obj, msg, suc) {
			this.clear(obj);
			if (!suc) $(obj).addClass('g_err');
			if (typeof msg == 'string' && msg != '') {
				var m = $('<div class="g_fmsg' + (suc ? ' g' : '') + '"><div class="c"> ' + msg + '</div><div class="a"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3"></div><div class="line2"></div><div class="line1"></div></div></div>');
				$(obj).after(m);
				m.css({ 'marginTop': -m.outerHeight(true) - $(obj).outerHeight(true), 'marginLeft': $(obj).outerWidth(true) - 20 }).show();
			}
		},
		clear: function (obj) {
			if (typeof obj == 'undefined') {
				$('form .g_err').removeClass('g_err');
				$('form .g_fmsg').remove();
			}
			else if ($(obj).is("form")) {
				$(obj).find('.g_err').removeClass('g_err');
				$(obj).find('.g_fmsg').remove();
			}
			else $(obj).removeClass('g_err').next('.g_fmsg').remove();
		}
	},
	tip: {
		show: function (e, text, bgcolor) {
			e = $(e).offset();
			$('<div class="g_ftip"' + (typeof bgcolor != 'undefined' ? ' style="background:' + bgcolor + ';"' : '') + '>' + text + '</div>').appendTo(document.body).css({ left: e.left, top: e.top }).fadeIn(300, function () { $(this).delay(3000).fadeOut(300, function () { $(this).remove(); }); });
		}
	},
	scrollwidth: function () {
		try {
			var el = document.createElement("p"), styles = { width: "100px", height: "100px", overflowY: "scroll" }, i;
			for (i in styles) el.style[i] = styles[i];
			document.body.appendChild(el);
			var w = el.offsetWidth - el.clientWidth;
			el.remove();
			return w;
		} catch (e) { return ''; }
	},
	fb: {
		callback: null, //显示后要执行的
		clear: function () { $('.floatbox').each(function () { _68.fb.hide($(this)); }); },
		//显示一个指定url的浮动框，参数fbox为可选现有浮动框。
		show: function (url, fbox) {
			if (fbox == null || typeof fbox == 'undefined') {
				if (url == '') return;
				fbox = $('<div class="floatbox"><a href="#" onclick="return false;" class="close" cancel>×</a><div class="fview"></div></div>');
			}
			if (url == '') url = fbox.find('div[url]').attr('url');
			fbox.find('.fview').load(url, fbox.find('form').serializeArray(), function (rt, ts, xhr) {
				if (ts == 'error' || ts == 'timeout') { _68.fb.hide(fbox); alert('操作失败：\r\n您可能没有权限或者重复提交！\r\n\r\n请刷新页面重新尝试。'); return; }
				if ($(document.body).find(fbox).length <= 0) {
					_68.center(fbox.appendTo(document.body));
					fbox.fadeIn(300, function () {
						$(window).resize(); _68.fb.bind(fbox);
						if (fbox.find('[focus]').eq(0).focus().length <= 0)
							fbox.find('input[type=text]:enabled,input[type=password]:enabled,select:enabled,textarea:enabled,input[type=submit]').eq(0).focus();
					}).focus();
					_68.shelter();
				}
				else _68.fb.bind(fbox);
			});
			$('html').css({ overflow: 'hidden', paddingRight: _68.scrollwidth() });
			_68.toplock = $(window).scrollTop();
			return fbox;
		},
		bind: function (fbox) {
			if ($.trim(fbox.find('.fview > div').children().not('script').text()) == '') {
				fbox.hide();
				if (typeof _68.fb.callback == 'function') { _68.fb.callback(fbox); _68.fb.callback = null; }
				_68.fb.hide(fbox);
				return;
			}
			_68.init(fbox);
			fbox.find('[cancel]').click(function () { _68.fb.hide(fbox); });
			if (typeof _68.fb.callback == 'function') { _68.fb.callback(fbox); _68.fb.callback = null; }
			fbox.find('form').submit(function () {
				if ($(this).attr('valid') != 'true') return false;
				$(this).find('input[type=submit]').attr('disabled', true);
				_68.fb.show('', fbox);
				return false;
			});
			fbox.find(".title").mousedown(function (e) {
				var px = e.pageX - fbox.offset().left;
				var py = e.pageY - fbox.offset().top;
				$(document).mousemove(function (e) { fbox.offset({ left: (e.pageX - px), top: (e.pageY - py) }); }).mouseup(function () { $(document).unbind("mousemove"); });
			});
		},
		hide: function (fbox, callback) {
			$('html').css({ overflow: '', paddingRight: '' });
			_68.toplock = null;
			_68.fb.callback = null;
			if ($(document.body).find(fbox).length > 0) {
				fbox.stop().fadeOut(300, function () {
					fbox.remove();
					_68.shelter();
					//if ($('#dvShelter').length <= 0) $('.ui-datepicker').remove();
					if (typeof callback == 'function') callback();
				});
			}
		}
	},
	checkall: function (all, array) {
		all.click(function () { array.prop('checked', all.prop('checked') ? true : false); });
	},
	checkallval: function (array) {
		var v = '';
		array.each(function () { v += (v == '' ? '' : ',') + $(this).val(); });
		return v;
	},
	inputlength: function (input, maxlength, tip) {
		input.keyup(function (event) { var cl = input.val().replace(/\r?\n/g, "00").length; tip.html(maxlength - cl < 0 ? ('<em style="color:red;">' + (maxlength - cl) + '</em>') : maxlength - cl); }).keyup();
	},
	picview: {
		show: function (ct, ch, call) {
			_68.picview.hide();
			var ms = ct.find('img');
			if (!ch.is('img')) ch = ch.find('img');
			var i = -1; var vsrc = (typeof ch.attr('org') == 'undefined' ? ch.attr('src') : ch.attr('org'));
			for (j = 0; j < ms.length; j++) if ((typeof ms.eq(j).attr('org') == 'undefined' ? ms.eq(j).attr('src') : ms.eq(j).attr('org')) == vsrc) i = j;
			var v = $('<div class="_picView"><a href="#" onclick="return false;" class="close"></a><a href="#" onclick="return false;" class="prev"></a><img src="/img/loading4.gif" class="load" /><div class="pbox"><img onmousedown="return false;" onmousemove="return false;" src=' + vsrc + ' /></div><a href="#" onclick="return false;" class="next"></a></div>').appendTo(document.body).bind('mousewheel', function (event, delta, deltaX, deltaY) {
				var pb = v.find('.pbox');
				var o = delta > 0 ? 100 : -100;
				var y = parseInt(pb.css('marginTop').replace('px', '')) + o;
				if (y > 0) y = 0;
				else if (y < v.height() - pb.height()) y = v.height() - pb.height();
				pb.css('marginTop', y);
				return false;
			});
			v.find('.close').click(function () { _68.picview.hide(); });
			if (i <= 0) v.find('.prev').hide(); else v.find('.prev').bind('click', function () { _68.picview.show(ct, ms.eq(i - 1), call); });
			if (i < 0 || i >= ms.length - 1) v.find('.next').hide(); else v.find('.next').bind('click', function () { _68.picview.show(ct, ms.eq(i + 1), call); });
			_68.event.keydown.add('picview', function (e) { if (e.keyCode == 27) { _68.picview.hide(); } else if (e.keyCode == 37 && i > 0) { _68.picview.show(ct, ms.eq(i - 1), call); } else if (e.keyCode == 39 && i >= 0 && i < ms.length - 1) { _68.picview.show(ct, ms.eq(i + 1), call); } });
			v.find('.pbox img').load(function () {
				v.find('.load').hide();
				var pb = v.find('.pbox');
				var x, y, mx, my;
				pb.bind('mouseenter mouseleave', function () { $(document).unbind('mousemove'); });
				v.bind('mouseenter mouseleave', function () { $(document).unbind('mousemove'); });
				pb.css('marginTop', v.height() > pb.outerHeight(true) ? (v.height() - pb.outerHeight(true)) / 2 : 0).css('marginLeft', (v.width() - pb.outerWidth(true)) / 2).bind('mouseup touchend', function () { $(document).unbind('mousemove touchmove'); }).bind('mousedown touchstart', function (event) { event.preventDefault(); x = event.pageX || event.originalEvent.changedTouches[0].pageX; y = event.pageY || event.originalEvent.changedTouches[0].pageY; mx = parseInt(pb.css('marginLeft').replace('px', '')); my = parseInt(pb.css('marginTop').replace('px', '')); $(document).bind('mousemove touchmove', function (event) { pb.css({ marginLeft: (event.pageX || event.originalEvent.changedTouches[0].pageX) - x + mx, marginTop: (event.pageY || event.originalEvent.changedTouches[0].pageY) - y + my }); }); }).fadeIn(200);
			});
			if (typeof call == 'function') call(v, ms.length, i);
		},
		hide: function () { _68.event.keydown.remove('picview'); $(document).unbind('mousemove mouseenter'); $('._picView').unbind('mousewheel').remove(); }
	},
	//set: { imgs: 预览的jquery元素集合, idx: 当前显示的索引, suffix: 后缀的元素（将在翻到最后显示） }
	imgsview: function (set) {
		if (!$.isPlainObject(set) || $.type(set.imgs) != 'object' || !set.imgs.length) return null;
		$('.-imgsview-').length ? $('.-imgsview-').destroy() : null;
		var v = $('<div class="-imgsview-"><button onclick="return false;" class="-close"></button><button onclick="return false;" class="-prev"></button><button onclick="return false;" class="-next"></button><img src="/img/loading4.gif" class="-load" /><p class="-page"></p><p class="-hscroll"></p><p class="-vscroll"></p></div>');
		v.find('.-prev,.-next').click(function () { v.display(parseInt(v.attr('idx')) + ($(this).is('.-prev') ? -1 : 1)); });
		v.find('.-close').click(function () { v.destroy(); });
		var pb = $('<div class="-pbox"><img onmousedown="return false;" onmousemove="return false;" /></div>').appendTo(v)
			.on('mouseup touchend', function () { $(document).off('mousemove touchmove'); })
			.on('click', function () { if (pb.hasClass('-zoom')) pb.tomove(); v.upscroll(); })
			.on('mousedown touchstart', function (event) {
				event.preventDefault();
				if (!pb.is(':visible') || pb.hasClass('-zoom')) return;
				var x = event.pageX || event.originalEvent.changedTouches[0].pageX, y = event.pageY || event.originalEvent.changedTouches[0].pageY, mx = parseInt(pb.css('left')), my = parseInt(pb.css('top'));
				$(document).on('mousemove touchmove', function (event) {
					try { v.upscroll(); pb.css({ left: (event.pageX || event.originalEvent.changedTouches[0].pageX) - x + mx, top: (event.pageY || event.originalEvent.changedTouches[0].pageY) - y + my }); }
					catch (err) { }
				});
			}).extend({
				tomove: function () {
					pb
						.css('line-height', '0')
						.removeClass('-zoom')
						.css('top', v.height() > pb.height() ? (v.height() - pb.height()) / 2 : 0)
						.css('left', (v.width() - pb.width()) / 2)
						.fadeIn(200)
					;
				},
				tozoom: function () {
					pb.addClass('-zoom').css('line-height', v.height() + 'px').fadeIn(200);
				}
			})
		;
		var rs = function () { if (pb.is(':visible') && pb.hasClass('-zoom')) pb.css('line-height', v.height() + 'px'); v.upscroll(); }
		$(window).on('resize', rs);
		pb.find('img').load(function () {
			pb.css('line-height', '0').attr('loaded', '');
			v.find('.-load').hide();
			if (pb.height() > v.height() || pb.width() > v.width()) pb.tozoom();
			else pb.tomove();
			v.upscroll();
		});

		_68.event.keydown.add('imgsview', function (e) {
			if (e.keyCode == 27) v.destroy();
			else if (e.keyCode == 37) v.display(parseInt(v.attr('idx')) - 1);
			else if (e.keyCode == 39) v.display(parseInt(v.attr('idx')) + 1);
			if (e.stopImmediatePropagation) e.stopImmediatePropagation();
			return false;
		});

		v.on('mousewheel', function (e) {
			if (!pb.is(':visible') || pb.hasClass('-zoom')) return false;
			var y = parseInt(pb.css('top')) + (e.originalEvent.deltaY > 0 ? -100 : 100);
			if (y > 0 && e.originalEvent.deltaY < 0) y = 0;
			else if (y < v.height() - pb.height() && e.originalEvent.deltaY > 0) y = v.height() - pb.height();
			pb.css('top', y), v.upscroll();
			return false;
		}).extend({
			display: function (idx) {
				var max = set.imgs.length + (set.suffix ? 1 : 0) - 1;
				if (idx < 0 || idx > max) return;
				v.find('>.-suffix').remove();
				if (idx >= set.imgs.length) {
					v.find('.-load').hide(), $('<div class="-suffix"></div>').append(set.suffix).appendTo(v);
				}
				else {
					if (idx >= 0 && idx <= set.imgs.length - 1 && parseInt(pb.attr('idx')) != idx) {
						pb.removeClass('-zoom').hide();
						var t = set.imgs.eq(idx);
						pb.attr('idx', idx).removeAttr('loaded').find('img').attr('src', t.attr('org') ? t.attr('org') : t.attr('src'));
					}
					pb.is('[loaded]') ? v.find('.-load').hide() : v.find('.-load').show();
				}
				idx <= 0 ? v.find('.-prev').removeClass('-show') : v.find('.-prev').addClass('-show');
				idx >= max ? v.find('.-next').removeClass('-show') : v.find('.-next').addClass('-show');
				v.upscroll().find('.-page').text((idx + 1) + ' / ' + (max + 1));
				return v.attr('idx', idx).trigger('display');
			},
			upscroll: function () {
				var vs = v.find('.-vscroll'), hs = v.find('.-hscroll');
				if (!pb.is(':visible') || pb.hasClass('-zoom')) vs.hide(), hs.hide();
				else {
					var l = parseInt(pb.css('left')), w = (pb.width() + l > v.width()) ? (pb.width() + (l < 0 ? 0 : l)) : (v.width() - (l < 0 ? l : 0));
					w > v.width() ? hs.width(v.width() * v.width() / w).css('left', l > 0 ? 0 : (-l / w) * v.width()).show() : hs.hide();
					var t = parseInt(pb.css('top')), h = (pb.height() + t > v.height()) ? (pb.height() + (t < 0 ? 0 : t)) : (v.height() - (t < 0 ? t : 0));
					h > v.height() ? vs.height(v.height() * v.height() / h).css('top', t > 0 ? 0 : (-t / h) * v.height()).show() : vs.hide();
				}
				return v;
			},
			destroy: function () {
				$(window).off('resize', rs);
				return _68.event.keydown.remove('imgsview'), $(document).off('mousemove touchmove'), v.off('mousewheel').trigger('destroy').remove(), v;
			}
		}).appendTo(document.body);
		return v.display($.type(set.idx) == 'number' && set.idx >= 0 && set.idx < set.imgs.length ? set.idx : 0);
	},
	upfile: {
		init: function (e) {
			if (typeof e != 'object' || e.length <= 0) return;
			e.find('[upframe]').each(function () {
				var _e = $(this);
				if (_e.find('>iframe').length) return;
				_e.append($('<p></p>')).append($('<iframe src="/up" style="display:none;"></iframe>'));
			});
		},
		create: function (e, n, create, complete, data, refresh) {
			if (typeof e != 'object' || e.length <= 0) return;
			var h = '';
			$.ajax({ url: '/up?new', type: 'POST', cache: false, async: false, data: data ? $.extend({ n: n }, (typeof data == 'string' ? $.parseJSON(data) : data)) : { n: n }, success: function (r) { h = r; } });
			if (h == '') { alert('失败'); return; }
			if (typeof create == 'function') create();
			var um = e.find('>p');
			var uf = e.find('>iframe');
			$(uf[0].contentWindow.document).find('body').html(h).find('form input[type=file]').change(function () {
				var g = $(this.form).attr('g');
				this.form.submit();
				um.html('正在上传');
				if (typeof refresh == 'function') refresh();
				var i = function () {
					if (uf.parents('body').length <= 0) return; //已移除
					$.json('/up?status', { g: g }, function (r) {
						if (r == null) {
							uf.attr('src', '/up');
							um.html('已取消');
						}
						else if (r.status == 'Uploading') {
							um.html('<em class="progress"><i class="p" style="width:' + r.progress + '%;"></i><i class="t">' + r.progress + '%</i></em>');
							window.setTimeout(i, 1000);
						}
						else if (r.status == 'Completed') {
							uf.attr('src', '/up');
							um.html('已完成');
							if (typeof complete == 'function') complete(r, n);
						}
						else if (r.status == 'Destroyed') {
							uf.attr('src', '/up');
							um.html('已取消 [' + r.error + ']');
						}
						if (typeof refresh == 'function') refresh();
						return false;
					});
				};
				window.setTimeout(i, 1000);
			}).click();
		},
		del: function (n, g, call, idx) {
			$.json('/up?del', { n: n, g: g, i: idx }, function (r) { if (typeof call == 'function') call(); return false; });
		}
	},
	flw: {
		//评论留言回复
		reply: {
			temp: null,
			show: function (e, tid, pc) {
				e = $(e);
				var r = e.nextAll('.hf-box').length > 0;
				if (this.temp != null) { this.temp.remove(); e.nextAll('.hf-box').remove(); }
				if (r) return;
				$.get('/load/flwreply', function (h) {
					_68.flw.reply.temp = $(h).appendTo(e.parent('.box-hf'));
					var f = _68.flw.reply.temp.find('form');
					_68.init(f);
					f.find('input[name=tid]').val(tid);
					f.submit(function () { return _68.flw.submit(f[0], pc); });
					f.find('textarea').focus();
				})
			}
		},
		submit: function (f, pc) {
			f.body.value = $.trim(f.body.value);
			if (f.body.value == '') { f.body.focus(); return false; }
			$.json('/do?flw.submit', $(f).serializeArray(), function (r) {
				if (r.status == 1) {
					$(f.body).val('').blur();
					alert('已成功提交。');
					pc(0);
				}
				else if (r.msg) alert(r.msg);
			});
			return false;
		}
	},
	trun: function (spage, sbar, offy, incall) {
		if (!window.history.replaceState || !spage || !sbar) return;
		var page = $(spage).eq(0);
		if (!page || !page.length) return;
		var bar = page.find(sbar);
		if (!bar || !bar.length) return;
		if (!page.parent().is('.-turn-')) page.wrap('<div class="-turn-"></div>').addClass('-turn-page');
		$(window).on('scroll resize', function () { page.parent('.-turn-').height(page.outerHeight(true)); }).resize();
		bar.click(function () {
			var _t = $(this);
			var url = _t.attr('href');
			window.history.replaceState({}, null, url);
			$.ajax({
				type: "GET",
				url: url,
				success: function (h) {
					if (/<body\s*[^>]*?>([\s\S]*)<[/]body\s*>/i.test(h)) h = $('<div>' + RegExp.$1 + '</div>');
					else h = $(h);
					var f = function () {
						var pout = page;
						var pin = h.find(spage).addClass('-turn-page in').insertBefore(pout);
						_68.trun(spage, sbar, offy, incall);
						pout.addClass('out');
						_68.init(pin);
						if (typeof incall == 'function') incall(pin);
						window.setTimeout(function () { pin.removeClass('in'); }, 100);
						window.setTimeout(function () { pout.remove(); }, 500);
					};
					$('html,body').animate({ scrollTop: page.offset().top + (isNaN(offy) ? 0 : offy) }, 100, function () { if (typeof f == 'function') f(); f = null; });
				},
				error: function (xhr, ts, tr) { alert(ts == 'timeout' ? '超时了' : '出错了'); }
			});

			return false;
		});
	}
}