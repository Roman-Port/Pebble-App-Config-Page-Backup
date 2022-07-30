function returnResult(result) {
    function getReturnUrl() {
        var query = location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (pair[0] === 'return_to') {
                return decodeURIComponent(pair[1]);
            }
        }
        return 'pebblejs://close#';
    }

    document.location = getReturnUrl() + encodeURIComponent(JSON.stringify(result));
}

