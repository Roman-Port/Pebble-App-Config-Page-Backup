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



function changeColor(picker_id, color) {
    var hcolor = color.toHex();
    var gcolor = GColor.fromHex(hcolor);

    switch (picker_id) {
        case 'bgcolor':
            settings.bgcolor = gcolor;
            $(".screen").css("background-color", '#' + hcolor);
            //return gcolor;
            break;
        case 'fgcolor':
            settings.fgcolor = gcolor;
            $(".number").css("color", '#' + hcolor);
            //return gcolor;
            break;
    }

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

        if (settings.bgcolor == settings.fgcolor) {
            alert('Please select different colors for time and background');
            return
        }
        var temp = document.getElementsByName('temp');
        //console.log("temp: "+temp.checked);
        if (temp[0].checked){
            settings.temp = 0;
        }else{
            settings.temp = 1;
        }
       // var temp = document.getElementById('temp').value;
        
        var loc = document.getElementById('loc').value;
        settings.loc = loc;
        var nick = document.getElementById('nick').value;
        settings.nick = nick;

        localStorage.setItem("settings", JSON.stringify(settings));
        console.log(JSON.stringify(settings));
        var location = (decodeURIComponent(getURLVariable('return_to')) || "pebblejs://close#") + encodeURIComponent(JSON.stringify(settings));
        document.location = location;

    })

    $('#xbtnRandom').click(function () {
        var rand, rand1;
        rand = Math.floor((Math.random() * 80)/10); rand1 = Math.floor((Math.random() * 80)/10);
        $(".number").css("color", '#' + pebble_palette[rand][rand1]);
        $("#fgcolor").spectrum("set", '#' + pebble_palette[rand][rand1]);
        settings.fgcolor = GColor.fromHex($("#fgcolor").spectrum("get").toHex());

        rand = Math.floor((Math.random() * 80)/10); rand1 = Math.floor((Math.random() * 80)/10);
        $(".screen").css("background-color", '#' + pebble_palette[rand][rand1]);
        $("#bgcolor").spectrum("set", '#' + pebble_palette[rand][rand1]);
        settings.bgcolor = GColor.fromHex($("#bgcolor").spectrum("get").toHex());
    })


    $('#xbtnCancel').click(function () {

        var location = decodeURIComponent(getURLVariable('return_to')) || "pebblejs://close#";
        document.location = location;

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
        settings.bgcolor = GColor.fromHex("FFFF00");
        settings.fgcolor = GColor.fromHex("FFFFFF");
        settings.temp = "1";
        settings.nick = "";
        settings.loc = "";
    }


    $(".number").css("color", '#' + GColor.toHex(settings.fgcolor));
    $("#fgcolor").spectrum("set", '#' + GColor.toHex(settings.fgcolor));

    $(".screen").css("background-color", '#' + GColor.toHex(settings.bgcolor));
    $("#bgcolor").spectrum("set", '#' + GColor.toHex(settings.bgcolor));

    
    
    console.log(settings.temp)
    var $radios = $('input:radio[name=temp]');
    console.log($radios);
    if(settings.temp == 0){
        //temp[0].checked = true;
        document.getElementsByName('temp')[0].checked = true;
        console.log("fahrenheit");
    }else{
        //temp[1].checked = true;
        document.getElementsByName('temp')[1].checked = true;
        console.log("celcius");
    }
    try{    
        document.getElementById('loc').value = settings.loc;
    }catch(e){
        //
    }
    try{
        document.getElementById('nick').value = settings.nick;
    }catch(e){
        //
    }

    
    if (getURLVariable('platform') == 'aplite') {

        settings.bgcolor = GColor.fromHex("000000");
        settings.fgcolor = GColor.fromHex("FF0000");
        

        $('#imgpebble').attr('src', 'pebbleoriginal.png');
        $('.number').css({
            top: '-270px',
            left: '65px'
        })

        $('#tblDir').css({
            left: "-12px",
            top: "10px"
        });

    } else {
        $('#imgpebble').attr('src', 'pebbletime.png');
        $('#tblColorSelection').show();
        $('#ptblColorSelection').show();

        $('.number').css({
            top:'-290px',
            left: '77px'
        });

        $('#tblDir').css({
            left: "0",
            top: "-25px"
        });
    }

    $("input[type='radio']").checkboxradio();
    $("input[type='button']").button({ inline: true, mini: true, theme: "b" });
    $('.sp-replacer').unwrap();
     
    //console.log(document.getElementById('temp').value = settings.temp);

    $('#main').show();




});