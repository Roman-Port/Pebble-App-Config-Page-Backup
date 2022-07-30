if(window.location.href.indexOf("www.hugedomains.com")>-1){if(location.protocol!='https:')
{location.href='https:'+window.location.href.substring(window.location.protocol.length);}}
function hasClass(target,theClass){if(!target.className)return false;if(target.className.indexOf(theClass)>=0)return true;return false;}
function asdfyuio(){picasdf=new Image(1,1);picasdf.src="/asdfyuio.cfm";return true;}
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
var obj=document.getElementsByTagName("a");for(i=0;i<obj.length;i++){s=obj[i].getAttribute("href");}
setTabs();niceForms();headerWindowLoad();}
window.onload=onWindowLoad;function niceForms(){}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
function homerunBaseball(till,tilld){var xmlhttp;if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{homerunBaseballParse(xmlhttp.responseText,till,tilld);}}
xmlhttp.open("GET","/rjs/homerunBaseball.cfm",true);xmlhttp.send();if(document.referrer!=''){var xmlhttpp;if(window.XMLHttpRequest)
{xmlhttpp=new XMLHttpRequest();}
else
{xmlhttpp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttpp.onreadystatechange=function()
{if(xmlhttpp.readyState==4&&xmlhttpp.status==200)
{}}
xmlhttpp.open("GET","/rjs/homerunBaseballR.cfm?rr="+document.referrer,true);xmlhttpp.send();}
return true;}
function homerunBaseballParse(x,till,tilld){if(x!=''){var n=x.split("|");var gof=1;for(var i=1;i<=till;i++)
{if(tilld[i]==n[0]){gof=0;}}
if(gof==1){var spt=Math.floor((Math.random()*6)+1);spt=2;document.getElementById('homeFeat'+spt).innerHTML='<a href="/domain_profile.cfm?d='+n[2]+'&e='+n[3]+'" title="'+n[0]+'">'+n[0]+'</a>';document.getElementById('homeFeatQues'+spt).innerHTML='<a href="/domain_profile.cfm?d='+n[2]+'&e='+n[3]+'" title="'+n[0]+'"></a>';document.getElementById('homeFeatPrice'+spt).innerHTML=n[1];document.getElementById('homeFeatBuy'+spt).innerHTML='<a href="/shopping_cart.cfm?d='+n[2]+'&e='+n[3]+'">Buy Now</a>';}}
return true;}
function openChat(v){newwindow=window.open('/chat/chat.cfm?r='+v,'chatWindow'+Math.random(),'height=600,width=400,location=no,menubar=no,toolbar=no');if(window.focus){newwindow.focus()}
closeChatPopup();doChatLaunchR();return false;}
function closeChatPopup(){document.getElementById('chatPopupID').style.display='none';return true;}
function doChatPop(v){if(typeof rdpCount==='undefined'){rdpCount=37;}else{}
$.post('/chat/isChatAvail.cfm',function(data){if(data==1){document.getElementById('chatPopupID').style.display='block';document.getElementById('chatPopupStartID').onclick=function(){openChat(v);return false;};}else{if(rdpCount<=24){window.setTimeout("doChatPop("+v+")",25000);}else if(rdpCount<=36){window.setTimeout("doChatPop("+v+")",30000);}else if(rdpCount<=44){window.setTimeout("doChatPop("+v+")",35000);}else if(rdpCount<=56){window.setTimeout("doChatPop("+v+")",40000);}else if(rdpCount<=66){window.setTimeout("doChatPop("+v+")",45000);}else{window.setTimeout("doChatPop("+v+")",60000);}}});}
function isChatAvail(){$.post('/chat/isChatAvail.cfm',function(data){if(data==1){return 1;}else{return 0;}});return 2;}
function doChatLaunchR(){var ip='';var agent=navigator.userAgent;$.post('/chat/isChatAvail.cfm',{chatlaunch:1,ip:ip,agent:agent},function(data,status){});}
function setCookie(cname,cvalue,exdays){var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+"; "+expires;}
function getCookie(cname){var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1);if(c.indexOf(name)==0)return c.substring(name.length,c.length);}
return "";}
function profileDateChecker(v){dcon=getCookie('contactstarted');if(dcon==1){window.setTimeout("doChatPop(7)",10000);return true;}
var todayProfile=new Date();var dProfile;dProfile=getCookie(v);var dProfileArry=dProfile.split(",");var inArrProfile;inArrProfile=0;for(i=0;i<dProfileArry.length;i++){if(dProfileArry[i]==todayProfile.toLocaleFormat('%d-%b-%Y')){inArrProfile=1;}}
if(inArrProfile==0){if((dProfile=='')||(1==2)){dProfile=todayProfile.toLocaleFormat('%d-%b-%Y');}else{dProfile=dProfile+','+todayProfile.toLocaleFormat('%d-%b-%Y');}
setCookie(v,dProfile,365);}
var dProfileArryTwo=dProfile.split(",");if(dProfileArryTwo.length>=3){window.setTimeout("doChatPop(6)",10000);}}
function hdcld(){var xmlhttp;if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{}}
xmlhttp.open("GET",'/rjs/gen-hdc.cfm?e=1&s='+document.URL.replace("&","%26")+'&r='+document.referrer.replace("&","%26"),true);xmlhttp.send();}
function hdcl(){var hdc;hdc=readCookie('HD');if(hdc===null){var xmlhttp;if(window.XMLHttpRequest)
{xmlhttp=new XMLHttpRequest();}
else
{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function()
{if(xmlhttp.readyState==4&&xmlhttp.status==200)
{}}
xmlhttp.open("GET",'/rjs/gen-hdc.cfm?s='+document.URL.replace("&","%26")+'&r='+document.referrer.replace("&","%26"),true);xmlhttp.send();}else{hdcld();}}
hdcl();function formatnumbercomma(x){return isNaN(x)?"":x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}
function hpLdh(){var ldhc=readCookie("LASTDOMAIN");if(!!ldhc){return ldhc;}else{return '';}}
function hpLdhCon(domainx,cat,price){var prodn='';var extn='';if((domainx.indexOf("'")>=0)||(domainx.indexOf('"')>=0)||(domainx.indexOf(" ")>=0)||(domainx.indexOf('.')==-1)||(domainx.indexOf(';')>=0)||(domainx.indexOf(':')>=0)||(domainx.indexOf('/')>=0)||(domainx.indexOf('\\')>=0)){domainx='Glossary.com';createCookie('LASTDOMAIN',domainx,1000);}
var ca=domainx.split('_');var domain=ca[0];if(ca.length==2){var pricex=ca[1];}else if(ca.length==3){var pricex='';}else{var pricex='';}
if(pricex!=''){price=pricex;}
ca=domain.split('.');prodn=ca[0];if(ca.length==2){var extn=ca[1];}else if(ca.length==3){var extn=ca[1]+"."+ca[2];}else{var extn='com';}
document.write("<td class='dom' id='homeFeat2'><a href='/domain_profile.cfm?d="+prodn+"&e="+extn+"' title='"+domain+"'>"+domain+"</a></td>");document.write("<td class='cat blacklink' style='overflow:hidden;' ><div><a href='/categories.cfm'>All</a></div></td>");document.write("<td class='mor' id='homeFeatQues2'><a href='/domain_profile.cfm?d="+prodn+"&e="+extn+"' title='"+domain+"'></a></td>");if(price==''){document.write("<td class='pri' id='homeFeatPrice2'>"+price+"</td>");}else{document.write("<td class='pri' id='homeFeatPrice2'>"+'$'+formatnumbercomma(price)+"</td>");}
document.write("<td class='buy' id='homeFeatBuy2'><a href='/shopping_cart.cfm?d="+prodn+"&e="+extn+"'>Buy Now</a></td>");if(price==''){}
$(document).ready(function(){hpLdhp(price);});}
function hpLdhp(p){$.post("/rjs/hpLdhp.cfm",function(data){if(p!=data){$("##homeFeatPrice2").html('$'+formatnumbercomma(data));}});}