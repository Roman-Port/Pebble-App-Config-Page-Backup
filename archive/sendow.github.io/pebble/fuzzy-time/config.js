(function () {

    const APP_UUID = "9ccadcecd58545b2b0f7db34ea74528c";

    function loadConfig() {
        if (localStorage[APP_UUID]) {
            var config = JSON.parse(localStorage[APP_UUID]);
            $('#text-align').val('' + config.textAlign);
        } else if (typeof localStorage.textAlign !== 'undefined') {
            $('#text-align').val(localStorage.textAlign);
        } else {
            $('#text-align').val(0);
        }
    }

    function collectAndStoreConfig() {
        var config = {
            textAlign: +$('#text-align').val()
        };

        localStorage[APP_UUID] = JSON.stringify(config);
        localStorage.removeItem('textAlign');
        return config;
    }

    function saveHandler() {
        $('#save-button').on('click', function () {
            returnResult(collectAndStoreConfig());
        });
    }

    loadConfig();
    saveHandler();

})();