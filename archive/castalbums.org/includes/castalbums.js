function UpgradeNotice()
{if(!jQuery.support.opacity&&!jQuery.support.ajax)
{document.writeln('<div class="lead alert alert-info">'+
'<a class="close" data-dismiss="alert" href="#">&times;</a>'+
'You are using an outdated & unsupported web browser!  Try installing <a style="text-decoration: underline;" href="http://google.com/chrome">Google Chrome</a>.'+
'</div>');}}
$.fn.extend({insertAtCaret:function(startText,endText)
{if(typeof this[0].name!='undefined')me=this[0];else me=this;endText=typeof endText!=='undefined'?endText:'';if(document.selection)
{me.focus();sel=document.selection.createRange();if(!sel.text&&(endText==']'))
{startText=startText.trim();sel.text=startText+endText;}
else sel.text=startText+sel.text+endText;me.focus();}
else if(me.selectionStart||me.selectionStart=='0')
{var myValue=startText;var startPos=me.selectionStart;var endPos=me.selectionEnd;var scrollTop=me.scrollTop;var selectedText=me.value.substring(startPos,endPos);if(!selectedText&&(endText==']'))
{startText=startText.trim();me.value=me.value.substring(0,startPos)+startText+endText+me.value.substring(endPos,me.value.length);}
else me.value=me.value.substring(0,startPos)+startText+selectedText+endText+me.value.substring(endPos,me.value.length);me.focus();me.selectionStart=startPos;me.selectionEnd=startPos+startText.length+selectedText.length+endText.length;me.scrollTop=scrollTop;}
else
{if(!me.value&&(endText==']'))
{me.value=me.value+startText.trim()+endText;}
else me.value=me.value+startText+me.value+endText;me.focus();}},SelectedText:function()
{if(typeof this[0].name!='undefined')me=this[0];else me=this;var selectedText;if(document.selection)
{me.focus();sel=document.selection.createRange();selectedText=sel.text;}
else if(me.selectionStart||me.selectionStart=='0')
{var startPos=me.selectionStart;var endPos=me.selectionEnd;selectedText=me.value.substring(startPos,endPos);}
return selectedText;}});function Create_URL(textarea)
{var URL=prompt('Enter the URL','http://');var highlighted=$('#'+textarea).SelectedText();if(highlighted)
{$('#'+textarea).insertAtCaret('[url='+URL+']','[/url]');}
else
{var label=prompt('Enter the text for the link','');if(label)$('#'+textarea).insertAtCaret('[url='+URL+']'+link,'[/url]');else $('#'+textarea).insertAtCaret('[url='+URL+']');}}
function confirmSubmit(msg)
{if(msg)var agree=confirm(msg);else var agree=confirm("Are you sure you wish to continue?");if(agree)return true;else return false;}
function toggle(obj)
{var el=document.getElementById(obj);if(el)el.style.display=(el.style.display!='none'?'none':'');}
function unhide(obj,handle)
{var el=document.getElementById(obj);el.style.display='';var el=document.getElementById(handle);el.style.display='none';}
function clickclear(thisfield,defaulttext)
{if(thisfield.value==defaulttext)thisfield.value="";}
function clickrecall(thisfield,defaulttext)
{if(thisfield.value=="")thisfield.value=defaulttext;}
function saveNotes(recording_id,release_id)
{var notes=document.getElementById('form-'+recording_id+'-'+release_id).value;var dt=new Date().getTime();var url='http://castalbums.org/background/save_notes.php?notes='+encodeURI(notes)+'&recording_id='+recording_id+'&release_id='+release_id+"&dt="+dt;notes_http.open('get',url);notes_http.onreadystatechange=handleNotesResponse;notes_http.send(null);}
function formNotes(recording_id,release_id)
{alert('Collection/Wishlist management currently suspended while new website code is being implemented - 3/17');return;var Cell=document.getElementById("notes-"+recording_id+"-"+release_id);var parts=new Array();parts=Cell.innerHTML.split('&nbsp;');parts[1]=parts[1].replace('"','&quot;');Cell.innerHTML="<form action=\"javascript:saveNotes("+recording_id+","+release_id+");\" style=\"white-space: nowrap\">"+
"<input type='image' src='/images/edit.png' alt='Submit'/> "+
"<input type='text' name='notes' size=15 value=\""+parts[1]+"\" id='form-"+recording_id+"-"+release_id+"'>"+
"</form>";}
function handleNotesResponse()
{if(notes_http.readyState==4)
{var response=notes_http.responseText;var update=new Array();if(response.indexOf('|'!=-1))
{update=response.split('|');var Cell=document.getElementById("notes-"+update[0]);if(update[1])
{update[1].replace('\"','"');update[1].replace("\'","'");}
Cell.innerHTML=update[1];}}}
function disableEnterKey(e)
{var key;if(window.event)key=window.event.keyCode;else key=e.which;if(key==13)return false;else return true;}
function sanitize($element,options)
{var cleaned=$element.html().replace(/<script>.*?<\/script>/g,'');$element.html(cleaned);}
$(document).ready(function()
{var menu=$('#nav');if(menu)
{if(menu.offset())var origOffsetY=menu.offset().top;function scrollNavBar()
{if($(window).scrollTop()>=origOffsetY)
{menu.addClass('navbar-fixed-top');$('BODY').addClass('navbar-fixed-body-padding');}else
{menu.removeClass('navbar-fixed-top');$('BODY').removeClass('navbar-fixed-body-padding');}}
document.onscroll=scrollNavBar;}
$('html, body').scrollTop(0);if(window.location.hash)
{if($(window.location.hash).length)$('html, body').stop().animate({'scrollTop':$(window.location.hash).offset().top-200},800);}
$('a').bind('click.smoothscroll',function(e)
{if(this.hash)
{var target=this.hash;if(target!='#')
{$target=$(target);$('html, body').stop().animate({'scrollTop':$target.offset().top-200},800,function(){window.location.hash=target;});}}});$("input:radio.highlightable").on("click",function()
{$("input[name="+$(this).attr("name")+"]").parent().removeClass("highlightLabel");$(this).parent().addClass("highlightLabel");});$("input:checkbox.highlightable").on("click",function()
{$(this).parent().toggleClass("highlightLabel");});});function Update_List_Ajax(action,id,id_type,list)
{$.ajax({type:"POST",url:"/background/personal_lists/update_personal_list.php",data:{action:action,id:id,id_type:id_type,list:list}}).done(function(msg)
{update=msg.split("\n",4);if(update[4])
{var modal_id='modal'+id+id_type;var modal='<div id="'+modal_id+'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
'<div class="modal-header"><h3>List Error</h3></div>'+
'<div class="modal-body"><p>'+update[4]+'</p></div>'+
'<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Close</button></div>'+
'</div>';if($('#'+modal_id).length>0)$('#'+modal_id).remove();$('body').append(modal);$('#'+modal_id).modal('show');}
else
{if(action=='add')$('#'+update[0]).stop(true,true).toggleClass(update[1],1000);else $('#'+update[0]).removeClass(update[1]);$('#'+update[2]).replaceWith(update[3]);}});}
function Update_List_Notes(id,id_type)
{if($("#ListNotes").length==0)
{$('#footer').append('<div id="ListNotes"></div>');}
$('#ListNotes').load('/background/person_lists/update_list_notes.php?id='+id+'&id_type='+id_type);}
function star_rate(element,recording_id,rating,mini)
{var dt=new Date().getTime();var url='http://castalbums.org/background/save_rating.php?&id='+recording_id+'&rating='+rating+"&element="+element+"&mini="+mini+"&dt="+dt;$('#'+element).load(url);}