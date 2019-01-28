(function () {

    const APP_UUID = "6ca7b8e2c01045e78f1cc1ae99c3a38f";

    function loadConfig() {
        if (localStorage[APP_UUID]) {
            var config = JSON.parse(localStorage[APP_UUID]);
            $('#day-of-week-enabled').prop('checked', !!config.dayOfWeekEnabled);
        } else {
            $('#day-of-week-enabled').prop('checked', false);
        }
    }

    function collectAndStoreConfig() {
        var config = {
            dayOfWeekEnabled: +$('#day-of-week-enabled').prop('checked')
        };

        localStorage[APP_UUID] = JSON.stringify(config);
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