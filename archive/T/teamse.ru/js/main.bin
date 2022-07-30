(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

$(function() {
    $(".js-away-link").each(function () {
        var linkHref = $(this).attr("href");
        $(this).attr("href", linkHref + "?utm_source=" + $.QueryString["ref"] + "&utm_medium=timeweb&utm_campaign=timeweb-parking");
    });
});