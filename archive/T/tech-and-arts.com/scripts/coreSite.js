var initPageStructure = function ()
{
	$('.js-unhide').removeClass('js-unhide');
	$('.js-menuToggle').click(function ()
	{
		var targetSelector = $(this).data('menuTarget');

		if (targetSelector)
		{
			$(targetSelector).toggleClass('menuActive');
		}
	});
};
