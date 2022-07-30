$(function ()  {

    var entries = [];
    var panels = 0;
    var openPanel = '';
    var savedState = ''

    loadEntries(location.search);

    function loadEntries(url) {
        var data = /data=([^&|^\/]*)/.exec(url);
        if (data && data[1]) {
            var d = JSON.parse(decodeURIComponent(data[1]));
            entries = d.entries;
            // console.dir(entries);
        }

        $.each(entries.reverse(), function(index, entry) {
            var newPanel = $('.panel-template').first().clone();
            addNewPanel(entry.title, newPanel, false);
            $.each(entry, function(index, value) {
                if (index == 'cb-enable') {
                    newPanel.find('#'+index).val(value).prop('checked', value == 'true');
                } else if (index == 'sampling-rate') {
                    newPanel.find('option[val='+value+']').prop('selected', 'selected');
                } else {
                    newPanel.find('#'+index).val(value);
                }
            });
        });

    }

    function togglePanel(panel) {
        if (openPanel == '') {
            var header = $(panel).first().collapse('show').parent();
            // header.find('.btn-test').show();
            // header.find('.grp-cb-enable').hide();
            openPanel = panel;
        } else if (openPanel == panel) {
            var header = $(panel).first().collapse('hide').parent();
            // header.find('.btn-test').hide();
            // header.find('.grp-cb-enable').show();
            openPanel = ''
        } else {
            var headerPrev = $(openPanel).first().collapse('hide').parent();
            // headerPrev.find('.btn-test').hide();
            // headerPrev.find('.grp-cb-enable').show();
            var headerNew = $(panel).first().collapse('show').parent();
            // headerNew.find('.btn-test').show();
            // headerNew.find('.grp-cb-enable').hide();
            openPanel = panel;
        }
    }

    function removeAllPanels() {
        $('#accordion').empty();
    }

    function addNewPanel(title, newPanel, toggle) {
        // console.log("adding a panel titled "+title);
        // newPanel.find('.accordion-toggle').attr('data-target', '#panel' + (++panels));
        newPanel.find('.accordion-toggle').attr('data-target', '#panel' + (++panels)).attr('data-parent', '#accordion');
        newPanel.find('.panel-collapse').attr('id', 'panel' + panels);
        newPanel.find('.panel-title').text(title ? title : 'Entry #' + panels);
        newPanel.removeClass('panel-template');
        newPanel.show().prependTo('#accordion');
        if (toggle) {
            togglePanel('#panel' + panels);
            // newPanel.find('#cb-enable').attr('checked', 'true').attr('value', 'on');
        } else {
            newPanel.find('.grp-cb-enable').show();
        }

        // set frequency default
        newPanel.find('option[val=60]').prop('selected', 'selected');

        newPanel.find('.grp-cb-enable').show();
        newPanel.find('#cb-enable').prop('checked', true).prop('value', true);
        newPanel.find('#cb-enable').change(function(e) {
            var cb = $(this);
            cb.prop('value', cb.prop('checked'));
        });

        newPanel.find('#itemName').change(function() {
            newPanel.find('.panel-title').text($(this).val());
        });
        newPanel.find('.btn-delete').click(function(e) {
            newPanel.remove();
        });
        newPanel.find('.accordion-toggle').click(function() {
            var panel = $(this).attr('data-target');
            togglePanel(panel);
        });
        // newPanel.find('.panel-heading').on('swipe', function() {
        //     if(newPanel.find('.btn-delete').is(':hidden')) { newPanel.find('.btn-delete').show(); } else { newPanel.find('.btn-delete').hide(); }
        // });
    }

    $('.btn-add-entry').on('click', function() {
        addNewPanel(null, $('.panel-template').first().clone(), true);
    });

    $('.btn-save').on('click', function() {

        var entries = $.map($('.panel', $('#accordion')), function(e) {
            // if ($(e).find('.panel-template').lenght ==)
            //     return;
            var entry = {};
            $(e).find('input').map(function() {
                entry[this.id] = $(this).val();
            });
            entry['sampling-rate'] = $(e).find(':selected').attr('val');
            return entry;
        });
        var ret = {
            entries: entries
        };

        // savedState = 'http://10.0.0.102:8085/index2.html?data=' + encodeURIComponent(JSON.stringify(ret));

        // removeAllPanels();

        // // restore
        // loadEntries(savedState);

        document.location = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(ret));

    });

});

