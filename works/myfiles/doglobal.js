
$(function () {

	$(document)
		.on('click', 'a', function () {
			if ($(this).attr('href') == '' || $(this).is('[disabled]')) return false;
			else if ($(this).attr('href') == '#') return false;
		})
	;


	(function () {
		var _sf = $('.do_header form.search');
		if (_sf.parents('.main').length) {
			var _sb = _sf.find('.box');
			var _st = _sf.find('.box .txt').focus(function () { _sb.addClass('focus'); }).blur(function () { $(this).change(); }).change(function () {
				_sf[0].k.value ? _sb.addClass('focus') : _sb.removeClass('focus');
			}).change();
			_sf.find('span.hot a').click(function () {
				_st.val($(this).text()).change();
				_sf.submit();
			});
			_sf.submit(function () {
				var f = this;
				f.k.value = $.trim(f.k.value);
				if (!f.k || f.k.value.length < 2) { $(f.k).focus(); return false; }
				$(f).attr('action', $.cookie('do.search.tag') == 'work' ? '/do/searchwork' : '/do/searchworker');
				f.submit();
				return false;
			});
		}
		else if (_sf.parents('.dept').length) {
			var uc = false;
			$(_sf.submit(function (e, tt) {
				_sf[0].k.value = $.trim(_sf[0].k.value);
				if (tt && !_sf[0].k.value) return uc = true, $(_sf[0].k).attr('placeholder', tt).trigger('focus'), false;
				else if (_sf[0].k.value.length < 2) return uc = true, $(_sf[0].k).attr('placeholder', '搜索不能少于2个字符').trigger('focus'), false;
				_sf.attr('action', (_sf.find('.-combox .-citem.on').length ? _sf.find('.-combox .-citem.on') : _sf.find('.-combox .-citem')).attr('action'));
				return _sf[0].submit(), false;
			})[0].k).on('focus click', function (e) { _sf.addClass('-out'), !uc && _sf.addClass('-expand'), uc = false; }).blur(function () { _sf.removeClass('-out').removeClass('-expand'); }),
			_sf.find('.-combox .-citem').click(function () { return _sf.find('.-combox .-citem').removeClass('on'), _sf.trigger('submit', $(this).addClass('on').find('.-d').text()), false; });
		}
	})();

	(function () {
		var qb = $('body>.do_header>.outbar').on('mouseleave', function () { nb.removeClass('hover'), $(this).stop().slideUp(100); }),
		nb = $('body>.do_header .dept .nav [bar]')
			.on('mouseenter', function () {
				nb.removeClass('hover'), qb.stop().slideUp(100).filter('[bar=' + $(this).addClass('hover').attr('bar') + ']').stop().css('z-index', '10').slideDown(300);
			})
			.on('mouseleave', function (e) {
				if (e.relatedTarget && (e.relatedTarget == $(this).parent()[0] || $(e.relatedTarget).is('body>.do_header>.outbar[bar=' + $(this).attr('bar') + ']') || $(e.relatedTarget).parents('body>.do_header>.outbar[bar=' + $(this).attr('bar') + ']').length)) return;
				nb.removeClass('hover'), qb.stop().css('z-index', '0').slideUp(100);
			})
		;
		qb.find('.menu [menu]').on('mouseenter', function () {
			var qb = $(this).parents('body>.do_header>.outbar');
			qb.find('.menu [menu]').removeClass('on'), $(this).addClass('on');
			qb.find('.body [menu]').removeClass('on').filter('[menu=' + $(this).attr('menu') + ']').addClass('on');
		});
	}());
});