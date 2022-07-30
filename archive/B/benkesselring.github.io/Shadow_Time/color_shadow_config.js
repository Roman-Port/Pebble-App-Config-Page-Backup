var SHADOW = {
    LENGTH: 100,
    DIRECTON: {
        TO_BOTTOM_RIGHT: 1,
        TO_BOTTOM_LEFT: 2,
        TO_TOP_LEFT: 3,
        TO_TOP_RIGHT: 4
    }
}

var settings;

// to get value of query string
function getURLVariable(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(window.location.href);
    if (results == null) return "";
    else return results[1];
}

// drawing shadow of given color and direction for given digit
function draw_shadow(element_id, color, direction) {
    var style = ''; // style of shadow
    var dx, dy; // direction of shadow, empty or negative

    switch (direction) {
        case SHADOW.DIRECTON.TO_BOTTOM_RIGHT:
            dx = ' '; dy = ' '
            break;
        case SHADOW.DIRECTON.TO_BOTTOM_LEFT:
            dx = ' -'; dy = ' '
            break;
        case SHADOW.DIRECTON.TO_TOP_LEFT:
            dx = ' -'; dy = ' -'
            break;
        case SHADOW.DIRECTON.TO_TOP_RIGHT:
            dx = ' '; dy = ' -'
            break;
    }


    for (var i=1; i<=SHADOW.LENGTH; i++) {
        style += color + dx + i + 'px' + dy + i + 'px'
        if (i<SHADOW.LENGTH) style += ',';
    }
    
    $('#' + element_id).css('textShadow', style);
}

// displaying current time
function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    $('#h1').text(Math.floor(h/10));
    $('#h2').text(h % 10);
    $('#m1').text(Math.floor(m/10));
    $('#m2').text(m % 10);
    
    setTimeout(function(){startTime()},1000);
}

// drawing shadows for all 4 digit
function draw_all_shadows() {

    // depending on shadow direction assuring that shadow don't overlap digits
    switch (settings.shadowdirecton) {
        case SHADOW.DIRECTON.TO_BOTTOM_RIGHT:
            $('#h1').css('z-index', 0);
            $('#h2').css('z-index', 0);
            $('#m1').css('z-index', 0);
            $('#m2').css('z-index', 0);
            break;
        case SHADOW.DIRECTON.TO_BOTTOM_LEFT:
            $('#h1').css('z-index', 1);
            $('#h2').css('z-index', 0);
            $('#m1').css('z-index', 1);
            $('#m2').css('z-index', 0);
            break;
        case SHADOW.DIRECTON.TO_TOP_LEFT:
            $('#h1').css('z-index', 2);
            $('#h2').css('z-index', 1);
            $('#m1').css('z-index', 1);
            $('#m2').css('z-index', 0);
            break;
        case SHADOW.DIRECTON.TO_TOP_RIGHT:
            $('#h1').css('z-index', 0);
            $('#h2').css('z-index', 1);
            $('#m1').css('z-index', 0);
            $('#m2').css('z-index', 0);
            break;
    }

    //drawing shadows
    draw_shadow('h1', '#' + GColor.toHex(settings.h1shadowcolor), settings.shadowdirecton);
    draw_shadow('h2', '#' + GColor.toHex(settings.h2shadowcolor), settings.shadowdirecton);
    draw_shadow('m1', '#' + GColor.toHex(settings.m1shadowcolor), settings.shadowdirecton);
    draw_shadow('m2', '#' + GColor.toHex(settings.m2shadowcolor), settings.shadowdirecton);

}

// saving new shadow direction and redrawing shadows
function changeShadowDirection(direction) {
    settings.shadowdirecton = direction;

    //displaying current settings
    $('#code').val(JSON.stringify(settings));

    draw_all_shadows();
}

function changeColor(picker_id, color) {
    var hcolor = color.toHex();
    var gcolor = GColor.fromHex(hcolor);

    switch (picker_id) {
        case 'bgcolor':
            settings.bgcolor = gcolor;
            $(".screen").css("background-color", '#' + hcolor);
            break;
        case 'timecolor':
            settings.timecolor = gcolor;
            $(".number").css("color", '#' + hcolor);
            break;
        case 'datecolor':
            settings.datecolor = gcolor;
            break;
        case 'barcolor':
            settings.barcolor = gcolor;
            break;
        case 'h1shadowcolor':
            settings.h1shadowcolor = gcolor;
            draw_shadow('h1', '#' + hcolor, settings.shadowdirecton)
            break;
        case 'h2shadowcolor':
            settings.h2shadowcolor = gcolor;
            draw_shadow('h2', '#' + hcolor, settings.shadowdirecton)
            break;
        case 'm1shadowcolor':
            settings.m1shadowcolor = gcolor;
            draw_shadow('m1', '#' + hcolor, settings.shadowdirecton)
            break;
        case 'm2shadowcolor':
            settings.m2shadowcolor = gcolor;
            draw_shadow('m2', '#' + hcolor, settings.shadowdirecton)
            break;

    }

    //displaying current settings
    $('#code').val(JSON.stringify(settings));

}

function applySettingsToPreview() {
    $(":radio[value=" + settings.shadowdirecton + "]").attr('checked', true);
    
    $("#datecolor").spectrum("set", '#' + GColor.toHex(settings.datecolor));
    $("#barcolor").spectrum("set", '#' + GColor.toHex(settings.barcolor));

    $(".number").css("color", '#' + GColor.toHex(settings.timecolor));
    $("#timecolor").spectrum("set", '#' + GColor.toHex(settings.timecolor));

    $(".screen").css("background-color", '#' + GColor.toHex(settings.bgcolor));
    $("#bgcolor").spectrum("set", '#' + GColor.toHex(settings.bgcolor));

    $("#h1shadowcolor").spectrum("set", '#' + GColor.toHex(settings.h1shadowcolor));
    $("#h2shadowcolor").spectrum("set", '#' + GColor.toHex(settings.h2shadowcolor));
    $("#m1shadowcolor").spectrum("set", '#' + GColor.toHex(settings.m1shadowcolor));
    $("#m2shadowcolor").spectrum("set", '#' + GColor.toHex(settings.m2shadowcolor));
}

var pebble_palette = [
          ['000', '005', '00a', '00f', '050', '055', '05a', '05f'],
          ['500', '505', '50a', '50f', '550', '555', '55a', '55f'],
          ['a00', 'a05', 'a0a', 'a0f', 'a50', 'a55', 'a5a', 'a5f'],
          ['f00', 'f05', 'f0a', 'f0f', 'f50', 'f55', 'f5a', 'f5f'],
          ['0a0', '0a5', '0aa', '0af', '0f0', '0f5', '0fa', '0ff'],
          ['5a0', '5a5', '5aa', '5af', '5f0', '5f5', '5fa', '5ff'],
          ['aa0', 'aa5', 'aaa', 'aaf', 'af0', 'af5', 'afa', 'aff'],
          ['fa0', 'fa5', 'faa', 'faf', 'ff0', 'ff5', 'ffa', 'fff']
];

$(document).ready(function () {

    $('#xbtnSave').click(function () {

        if (settings.bgcolor == settings.timecolor) {
            alert('Please select different colors for time and background');
            return
        }

        //if (settings.bgcolor == settings.h1shadowcolor || settings.bgcolor == settings.h2shadowcolor || settings.bgcolor == settings.m1shadowcolor || settings.bgcolor == settings.m2shadowcolor) {
        //    alert('Please select different colors for shadows and background');
        //    return
        //}

        if (settings.timecolor == settings.h1shadowcolor || settings.timecolor == settings.h2shadowcolor || settings.timecolor == settings.m1shadowcolor || settings.timecolor == settings.m2shadowcolor) {
            alert('Please select different colors for shadows and time');
            return
        }

        localStorage.setItem("settings", JSON.stringify(settings));
        
        var location = (decodeURIComponent(getURLVariable('return_to')) || "pebblejs://close#") + encodeURIComponent(JSON.stringify(settings));
        document.location = location;

    })

    function applyCode() {
        settings = JSON.parse($('#code').val());
        applySettingsToPreview();
        draw_all_shadows();
    }

    
    $('#xbtnApplyCode').click(applyCode);


    $('#code').click(function () {
        $(this).select();
    });

    $('#code').on('paste', function () { setTimeout(applyCode, 0) });


    $('#xbtnCancel').click(function () {

        var location = decodeURIComponent(getURLVariable('return_to')) || "pebblejs://close#";
        document.location = location;

    })

    $('#selThemes').change(function () {
        if (this.value == '') return;

        $('#code').val(this.value);
        applyCode();
    })

    
    // defining color pickers
    $(".picker").spectrum({
        showPaletteOnly: true,
        hideAfterPaletteSelect: true,
        preferredFormat: "hex3",
        change: function (color) {
            changeColor(this.id, color);
        },
        palette: pebble_palette
    });

    try {
        settings = JSON.parse(localStorage.getItem("settings"));
    }
    catch(err) {
        settings = null;
    }
        

    if(settings==null) {
        settings = {};
      
        settings.bgcolor = GColor.fromHex("550000");
        settings.timecolor = GColor.fromHex("FFFFFF");
        settings.datecolor = GColor.fromHex("550000");
        settings.barcolor = GColor.fromHex("FFFFFF");
        settings.h1shadowcolor = GColor.fromHex("000000");
        settings.h2shadowcolor = GColor.fromHex("000000");
        settings.m1shadowcolor = GColor.fromHex("000000");
        settings.m2shadowcolor = GColor.fromHex("000000");
        settings.shadowdirecton = SHADOW.DIRECTON.TO_BOTTOM_RIGHT;
    }

    
    $('#imgpebble').attr('src', 'pebbletime.png');
    $('#tblColorSelection').show();
    $('#ptblColorSelection').show();
    $('#codecont').show();
    $('#presetcont').show();

    $('.number').css({
        top:'-290px',
        left: '77px'
    });

    $('#tblDir').css({
        left: "0",
        top: "-25px"
    });

    //displaying current settings
    $('#code').val(JSON.stringify(settings));

    $("input[type='radio']").checkboxradio();
    $("input[type='button']").button({ inline: true, mini: true, theme: "b" });
    $("textarea").textinput();
    $('.sp-replacer').unwrap();

    applySettingsToPreview();
     
    //starting clock
    startTime();

    // drawing initial shadows
    draw_all_shadows();

    $('#main').show();

});
