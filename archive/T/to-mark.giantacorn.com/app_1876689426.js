;(function($){$(function() {

// UTIL
var remove = function(array, elem)
{
  var idx = array.indexOf(elem);
  if (idx >= 0) array.splice(idx, 1);
};

// UI
// general
$(document).on('focus', 'input[type=text], input[type=number]', function()
{
  if ($(this).closest('#toolbar').length > 0) return;
  $('body').addClass('editing');
});
$(document).on('blur', 'input[type=text], input[type=number]', function() { $('body').removeClass('editing'); });

// groups
var newGroup = function(group)
{
  if (group == null) groups.push(group = { marks: [] });

  var groupElem = $('#templates .group').clone();
  $('.groups').append(groupElem);
  groupElem.data('group', group);

  groupElem.find('.group-name').val(group.name);
};
$('.add-group').on('click', function() { newGroup(); });
$(document).on('click', '.delete-group', function()
{
  var groupElem = $(this).closest('.group');
  remove(groups, groupElem.data('group'));
  groupElem.slideUp(function() { groupElem.remove(); });
});

$(document).on('input', '.group input.group-name', function()
{
  var input = $(this);
  input.closest('.group').data('group').name = input.val();
});

// marks
var newMark = function(group, mark)
{
  if (mark == null) group.marks.push(mark = { id: ++data.uid });

  var groupElem = $('.group').filter(function() { return $(this).data('group') === group; });
  var markElem = $('#templates .mark').clone();
  groupElem.find('.marks').append(markElem);
  markElem.data('mark', mark);

  for (var k in mark) markElem.find('.mark-' + k).val(mark[k]);
  updateDMS(mark, 'lat');
  updateDMS(mark, 'lon');
};
$(document).on('click', '.add-mark', function() { newMark($(this).closest('.group').data('group')); });
$(document).on('click', '.delete-mark', function()
{
  var markElem = $(this).closest('.mark');
  remove(markElem.closest('.group').data('group').marks, markElem.data('mark'));
  markElem.slideUp(function() { markElem.remove(); });
});

$(document).on('click', '.to-dms', function() { $(this).closest('.decimal').addClass('hide').next().removeClass('hide'); });
$(document).on('click', '.to-decimal', function() { $(this).closest('.dms').addClass('hide').prev().removeClass('hide'); });

$(document).on('input', '.mark input', function()
{
  var input = $(this);
  var mark = input.closest('.mark').data('mark');

  if (input.closest('.dms').length > 0)
  {
    var latLon = (input.closest('.dms-lat').length > 0) ? 'lat' : 'lon';
    var line = input.closest('.line');
    var d = parseFloat(line.find('.dms-d').val()) || 0;
    var m = parseFloat(line.find('.dms-m').val()) || 0;
    var s = parseFloat(line.find('.dms-s').val()) || 0;
    var sign = Math.sign(d);
    var result = d + (m / 60 * sign) + (s / 3600 * sign);

    mark[latLon] = result;
    input.closest('.mark').find('.mark-' + latLon).val(result);
  }
  else
  {
    var field = input.attr('class').match(/^mark-(.*)$/)[1];
    if (input.closest('.decimal').length > 0)
    {
      mark[field] = parseFloat(input.val()) || 0;
      updateDMS(mark, field);
    }
    else
    {
      mark[field] = input.val();
    }
  }
});

var updateDMS = function(mark, field)
{
  var markElem = $('.mark').filter(function() { return $(this).data('mark') === mark; });
  var container = markElem.find('.dms-' + field);

  var value = mark[field] || 0;
  container.find('.dms-d').val(Math.trunc(value));

  value = (value - Math.trunc(value)) * 60;
  container.find('.dms-m').val(Math.abs(Math.trunc(value)));

  value = (value - Math.trunc(value)) * 60;
  container.find('.dms-s').val(Math.abs(Math.round(value * 1000) / 1000));
};

// render elems
var renderAll = function()
{
  for (var i in groups)
  {
    newGroup(groups[i]);
    for (var j in groups[i].marks) newMark(groups[i], groups[i].marks[j]);
  }
};

// caltopo
var caltopoButton = $('#caltopo-activate');
var caltopoSection = $('#caltopo');
caltopoButton.on('click', function()
{
  var expanded = caltopoSection.hasClass('expanded');
  if (expanded)
  {
    caltopoButton.text('Import from Caltopo');
    caltopoSection.removeClass('expanded');
  }
  else
  {
    caltopoButton.text('Cancel');
    caltopoSection.addClass('expanded');
  }
});
caltopoSection.on('click', 'button', function()
{
  // with thanks to alex wetmore (phred.org) for the idea and some sample code:
  var replace = false;
  if ($(this).is('#caltopo-replace'))
  {
    if (!confirm('Are you sure you want to replace all your current marks with the imported set?')) return;
    replace = true;
  }

  var id = /([a-z0-9]+)\/?$/i.exec($('#caltopo-id').val());
  if (id == null)
    return alert('Could not recognize a Caltopo ID. Try just pasting the web address of your map.');

  $('body').addClass('loading');
  $.ajax({ type: 'get', url: '/fetch/caltopo/' + id[1], dataType: 'json',
    success: function(result)
    {
      if (replace) $('#main .delete-group').click();

      // because of how caltopo is structured, first create all empty groups then populate.
      var groupLookup = {};
      for (var i in result.Folder)
      {
        var group = { name: result.Folder[i].label, marks: [] };
        groupLookup[result.Folder[i].id] = group;
        data.groups.push(group);
        newGroup(group);
      }
      for (var i in result.Marker)
      {
        var marker = result.Marker[i];

        // merge label and comments to form a name.
        var name = [];
        if ((marker.label != null) && (marker.label !== '')) name.push(marker.label);
        if ((marker.comments != null) && (marker.comments !== '')) name.push(marker.comments);

        var mark = { id: ++data.uid, name: name.join(' '), lat: marker.position.lat, lon: marker.position.lng };
        var group = groupLookup[marker.folderId]; // caltopo disallows folderless marks
        group.marks.push(mark);
        newMark(group, mark);
      }
      caltopoButton.click();
    },
    error: function() { alert('Something went wrong. Please check your map and try again.'); },
    complete: function() { $('body').removeClass('loading'); }
  });
});


// DATA MODEL
// load data
var data = { uid: 0, groups: [{ name: "My first folder", marks: [{ id: 0, name: "My first mark" }] }] };
var groups;

if (window.location.hash !== '')
{
  $('body').addClass('loading');

  var id = window.location.hash.slice(1);
  var attemptFetch = function()
  {
    $.ajax({ type: 'get', url: '/config/' + id, dataType: 'json', success: function(result)
    {
      data = result;
      groups = data.groups;
      renderAll();
      $('body').removeClass('loading');
    }, error: function() { setTimeout(attemptFetch, 750); } });
  };
  attemptFetch(); // poll because holy fuck pebble conf "api' is bad
}
else
{
  groups = data.groups;
  renderAll();
}

// on save
$('#save').on('click', function()
{
  var buffer = new Uint8Array(24);
  window.crypto.getRandomValues(buffer);
  var id = btoa(String.fromCharCode.apply(this, buffer)).replace(/[^a-z0-9]/gi, '-');

  $('body').addClass('loading');
  $.ajax({ type: 'post', url: '/config/' + id, contentType: 'text/plain', data: JSON.stringify(data), success: function()
  {
    window.location = 'pebblejs://close#' + id;
  },
  error: function()
  {
    // TODO
  } });
});


// DEBUG
window.groups = groups;

}); })(jQuery);

