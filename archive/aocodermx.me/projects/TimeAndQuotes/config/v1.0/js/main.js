(function(){window.quotes=new Array();if(getQueryParam("watch_platform")=="aplite"){$("#bgcolor").parent().hide();$("#quoteUP,#quoteDOWN").attr("maxlength",121)}else{if(getQueryParam("watch_platform")=="basalt"){$("#quoteUP,#quoteDOWN").attr("maxlength",141)}}loadConfiguration();setEventHandlers()})();function loadConfiguration(){if(localStorage.config){$("#bgcolor")[0].value=localStorage.bgcolor;$("#time24hours")[0].checked=localStorage.time24hours==="1";$("#showcalendar")[0].checked=localStorage.showcalendar==="1";$("#showbattery")[0].checked=localStorage.showbattery==="1";$("#changequote")[0].value=localStorage.changequote;$("#changequotes")[0].value=localStorage.changequotes;window.quotes=JSON.parse(getQueryParam("quotes"));refreshquotes()}else{console.log("No configuration saved.")}}function saveConfiguration(a){localStorage.config=true;localStorage.bgcolor=a.bgcolor;localStorage.time24hours=a.time24hours;localStorage.showcalendar=a.showcalendar;localStorage.showbattery=a.showbattery;localStorage.changequote=a.changequote;localStorage.changequotes=a.changequotes}function refreshquotes(){console.log("Refreshing quotes "+window.quotes);$(".item_quote").remove();if(window.quotes.length!=0){$("#addquoteDOWN").css("display","block")}else{$("#addquoteDOWN").hide()}for(var a=0;a<window.quotes.length;a++){$("#addQuoteDialogUP").after('<label class="item item_quote"><blockquote><p>'+window.quotes[a][0]+"</p><footer><strong>"+window.quotes[a][1]+'</strong></footer></blockquote><div class="delete-item" id="deletequote'+a+'"><input type="hidden" id="index" value="'+a+'"></div></label>');$("#deletequote"+a).on("click",function(){var b=$(this).children("#index").val();console.log("Delete item called on "+b);window.quotes.splice(b,1);refreshquotes()})}$("#addQuoteDialogUP").hide();$("#addQuoteDialogDOWN").hide()}function setEventHandlers(){$("#save_button").on("click",function(){var h=$("#quoteUP").val(),i=$("#authorUP").val();if(h.length!=0&&i.length!=0){window.quotes.push([h,i])}var e=$("#quoteDOWN").val(),c=$("#authorDOWN").val();if(e.length!=0&&c.length!=0){window.quotes.unshift([e,c])}var d=$("#time24hours")[0].checked?1:0,b=$("#showcalendar")[0].checked?1:0,j=$("#showbattery")[0].checked?1:0,k=parseInt($("#changequote").val()),f=parseInt($("#changequotes").val()),a={bgcolor:$("#bgcolor").val(),time24hours:d,showcalendar:b,showbattery:j,changequote:k,changequotes:f,quotes:window.quotes};saveConfiguration(a);var g=getQueryParam("return_to","pebblejs://close#");document.location=g+encodeURIComponent(JSON.stringify(a))});$("#addquoteUP").on("click",function(){$("#quoteUP").focus();$("#addQuoteDialogUP").toggle();$("#addQuoteDialogDOWN").hide();location.href="#addQuoteDialogAnchorUP"});$("#quoteUP").on("input",function(){$("#remainingUP").text(parseInt($("#quoteUP").attr("maxlength"))-parseInt($("#quoteUP").val().length))});$("#quoteDOWN").on("input",function(){$("#remainingDOWN").text(parseInt($("#quoteDOWN").attr("maxlength"))-parseInt($("#quoteDOWN").val().length))});$("#addquoteDOWN").on("click",function(){$("#quoteDOWN").focus();$("#addQuoteDialogUP").hide();$("#addQuoteDialogDOWN").toggle();location.href="#addQuoteDialogAnchorDOWN"});$("#addquoteconfirmUP").on("click",function(){var a=$("#quoteUP").val(),b=$("#authorUP").val();if(a.length!=0&&b.length!=0){window.quotes.push([a,b]);$("#quoteUP").val("");$("#authorUP").val("");refreshquotes()}else{console.log("Add a valid author and quote.")}});$("#addquoteconfirmDOWN").on("click",function(){var a=$("#quoteDOWN").val(),b=$("#authorDOWN").val();if(a.length!=0&&b.length!=0){window.quotes.unshift([a,b]);$("#quoteDOWN").val("");$("#authorDOWN").val("");refreshquotes()}else{console.log("Add a valid author and quote.")}});$("#addquotecancelUP").on("click",function(){$("#quoteUP").val("");$("#authorUP").val("");$("#addQuoteDialogUP").hide()});$("#addquotecancelDOWN").on("click",function(){$("#quoteDOWN").val("");$("#authorDOWN").val("");$("#addQuoteDialogDOWN").hide()})}function getQueryParam(b,a){var d=location.search.substring(1);var e=d.split("&");for(var c=0;c<e.length;c++){var f=e[c].split("=");if(f[0]===b){return decodeURIComponent(f[1])}}return a||false};