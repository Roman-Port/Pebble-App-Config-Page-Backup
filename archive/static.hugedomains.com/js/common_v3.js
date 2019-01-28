function asdfyuio(){picasdf=new Image(1,1);picasdf.src="/asdfyuio.cfm";return true;}
function hasClass(target,theClass){if(!target.className)return false;if(target.className.indexOf(theClass)>=0)return true;return false;}
function addClass(target,theClass){if(!target.className)
target.className=theClass;else
if(target.className.indexOf(theClass)==-1)target.className+=' '+theClass;}
function removeClass(target,theClass){var pattern=new RegExp("(^| )"+theClass+"( |$)");target.className=target.className.replace(pattern,"$1");target.className=target.className.replace(/ $/,"");}
var links=new Array();var conts=new Array();function setTabs(){var divs=document.getElementsByTagName("div");var i,j,k,tabs;for(i=0;i<divs.length;i++)
if(hasClass(divs[i],'tabbed')){divs_ch=divs[i].childNodes;for(j=0;j<divs_ch.length;j++)
if(hasClass(divs_ch[j],'tabs_cont'))
conts[conts.length]=divs_ch[j];conts[0].style.display='block';for(j=0;j<divs_ch.length;j++)
if(hasClass(divs_ch[j],'ttabs')){tab=divs_ch[j].getElementsByTagName('div');for(k=0;k<tab.length;k++){links[links.length]=tab[k];tab[k].onmouseover=function(){if(!hasClass(this,'active'))
addClass(this,'hover');}
tab[k].onmouseout=function(){removeClass(this,'hover');}
tab[k].onclick=function(){removeClass(this,'hover');for(i=0;i<links.length;i++)
if(this.parentNode.parentNode==links[i].parentNode.parentNode)
if(links[i]==this){conts[i].style.display='block';addClass(links[i],'active');}
else{removeClass(links[i],'active');conts[i].style.display='none';}
return false;}
as=tab[k].getElementsByTagName('a');for(l=0;l<as.length;l++)
as[l].onclick=function(){newDestination=this.getAttribute("href");if(newDestination!="#")
location.href=newDestination;event.cancelBubble=true;return false;}}}}}
function onWindowLoad(){if(!document.getElementsByTagName||!document.getElementById)return false;var ie6=(document.body.className.indexOf("ie6")>=0);var obj=document.getElementsByTagName("input");for(i=0;i<obj.length;i++){if(obj[i].type=="submit"){obj[i].onmouseover=function(){this.style.backgroundPosition='left bottom';}
obj[i].onmouseout=function(){this.style.backgroundPosition='left top';}}
if(obj[i].className.indexOf("bg_remove")>=0)
obj[i].onfocus=function(){this.style.background='none';}
if(obj[i].value!='')
obj[i].onfocus=function(){if(this.className.indexOf('value_do_not_clear')==-1){this.value='';addClass(this,'value_do_not_clear');}}}
var obj=document.getElementsByTagName("a");for(i=0;i<obj.length;i++){s=obj[i].getAttribute("href");if(s.charAt(s.length-1)=='#')
obj[i].onclick=function(){return false;}}
setTabs();niceForms();popupNewSet();}
window.onload=onWindowLoad;function niceForms(){}
function popupNewSet(){$('div.popupNew a.close').bind('click',function(){popupClose();return false;});$(window).bind('resize scroll',function(){popupFix();});}
function overlayPopupShow(){var ScrollTop=document.body.scrollTop;if(ScrollTop==0){if(window.pageYOffset){ScrollTop=window.pageYOffset;}else{ScrollTop=(document.body.parentElement)?document.body.parentElement.scrollTop:0;}}
ScrollTop=ScrollTop+100;if(jQuery('#pop_30days').length>0){document.getElementById('pop_30days').style.top=ScrollTop+'px';}
if(jQuery('#pop_whats_cvc').length>0){document.getElementById('pop_whats_cvc').style.top=ScrollTop+'px';}
if(jQuery('#pop_bbb').length>0){document.getElementById('pop_bbb').style.top=ScrollTop+'px';}
if(jQuery('#pop_verisign').length>0){document.getElementById('pop_verisign').style.top=ScrollTop+'px';}
if(jQuery('#pop_terms').length>0){document.getElementById('pop_terms').style.top=ScrollTop+'px';}
if(jQuery('#pop_testim').length>0){document.getElementById('pop_testim').style.top=ScrollTop+'px';}
if(jQuery('#pop_privacywhois').length>0){document.getElementById('pop_privacywhois').style.top=ScrollTop+'px';}
X=Math.max($('div.global').eq(0).width(),$(window).width());Y=Math.max($('div.global').eq(0).height(),$(window).height());$('#overlay').css({'width':X,'height':Y,opacity:0.4}).show();}
function popupShow(par){$(par).show();overlayPopupShow();}
function popupFix(){if($("#overlay").css('display')!='none')
overlayPopupShow();}
function popupClose(){$('#overlay').hide();$('div.popupNew:visible').hide();}
function niceFormFocus(targetDi){if(document.getElementById(targetDi).className==''){document.getElementById(targetDi).className='focused';}else if(document.getElementById(targetDi).className=='error'){document.getElementById(targetDi).className='error focused';}else if(document.getElementById(targetDi).className=='value_do_not_clear'){document.getElementById(targetDi).className='value_do_not_clear focused';}}
function niceFormBlur(targetDi){if(document.getElementById(targetDi).className=='focused'){document.getElementById(targetDi).className='';}else if(document.getElementById(targetDi).className=='error focused'){document.getElementById(targetDi).className='error';}else if(document.getElementById(targetDi).className=='value_do_not_clear focused'){document.getElementById(targetDi).className='value_do_not_clear';}}